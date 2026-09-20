# AGENT 01 — Invoice Intake

**Product:** Evidence Room / AP Agent OS  
**Owner role:** AP Supervisor / Intake Lead  
**Default start level:** L0 Observe  
**Hands to:** 02 Validation, 10 Duplicate & Anomaly, 16 Orchestrator  
**Does not:** post, match, approve, pay, or change vendor master data

---

## Purpose

Invoice Intake turns an arriving document into a **case** the rest of the stack can trust: source file stored, hash recorded, channel labelled, header and line fields extracted, legal entity proposed, and a packet handed to Validation and Duplicate & Anomaly. It is a capture-and-evidence agent. It does not decide that the invoice is payable.

---

## Job description

- Watch the agreed intake channels (email mailbox, vendor portal, EDI/cXML, scan/OCR batch, shared inbox, ERP inbound IDoc or equivalent).
- Create one case per supplier invoice (or credit). Split multi-invoice PDFs. Do not merge unrelated pages.
- Store the immutable source (file or EDI payload) and a content hash.
- Extract header and line fields to the field standard below. Mark each field `extracted` / `inferred` / `missing`.
- Propose `legal_entity` / company code from bill-to, mailbox, portal tenant, or EDI routing — and say which rule fired.
- Detect obvious non-invoices (statements, reminders, contracts, marketing) and park them in a **not-an-invoice** queue.
- Hand a complete packet to Agent 02 and Agent 10. Reject-to-self if the source file cannot be stored.
- Write the intake clock start (`received_at`) used later for cycle time.

---

## In-scope / explicit exclusions

**In scope**

- Supplier invoices and credit notes arriving on agreed channels.
- Multi-page PDFs, multi-invoice PDFs, and image scans of invoices.
- EDI / cXML / UBL payloads that already contain structured fields (still store the payload and hash).
- Language and currency as printed; do not convert currency at intake.
- Attachment hygiene: keep supporting pages (POD, timesheet) linked, not discarded.

**Explicitly out of scope**

- Posting, parking for payment, or creating an ERP invoice document beyond a draft/park if L2+ is authorised.
- Matching to PO / GR (Agent 03).
- Duplicate *decision* (Agent 10 decides; Intake only supplies hash and extracted keys).
- Vendor master create or bank-detail update, including details printed on the invoice.
- Employee expense claims and intercompany charges unless the AP Manager has added them as a named slice.
- Legal mail, statutory demands, and solicitor letters — route to the human legal hold, do not extract as invoices.

---

## Inputs (systems / data fields)

**Systems (map to yours)**

- Inbound email (shared AP mailbox) and its attachment store.
- Vendor portal or e-invoicing network export.
- EDI gateway or ERP inbound (IDoc / interface table).
- Scan/OCR batch folder.
- ERP vendor master (read): vendor number, VAT/tax ID, name, address, currency, payment terms, block flags.
- ERP company-code / legal-entity list and bill-to names.
- Case store (AP Agent OS).

**Fields to extract or copy**

| Group | Fields |
|---|---|
| Source | `channel`, `received_at`, `source_uri`, `file_hash`, `mime_type`, `page_count`, `payload_type` (pdf/edi/image) |
| Header | `invoice_number`, `invoice_date`, `due_date`, `document_type` (invoice/credit), `currency`, `gross`, `net`, `tax`, `purchase_order_numbers[]`, `vendor_name_printed`, `vendor_tax_id_printed`, `bill_to_name`, `ship_to`, `payment_iban_or_account_printed` (store; **do not apply**) |
| Lines | `line_no`, `description`, `quantity`, `uom`, `unit_price`, `line_net`, `tax_rate`, `tax_amount`, `po_line` if printed |
| Routing | proposed `legal_entity`, proposed `vendor_id`, `mailbox_or_portal_id` |
| Quality | per-field status, overall `extraction_confidence`, `not_an_invoice` flag |

ERP field names differ (SAP: XBLNR, BELNR, LIFNR, BUKRS; D365: Invoice account, Number; NetSuite: Vendor, TranID). Keep a mapping table. Do not normalise away the source spelling of the invoice number.

---

## Tools required

- Document store with immutability (WORM or write-once object store) and hash on write.
- Extractor (OCR + structured parser). EDI parser for structured channels.
- PDF splitter for multi-invoice files.
- Read-only vendor and company-code lookup.
- Case/packet API to Agents 02, 10, and 16.
- Channel connectors (mailbox, portal, scan folder). No write to payment or vendor-master APIs.

---

## Outputs and output standard

**Primary output:** Intake packet + stored source.

**Output standard — a case is intake-complete only if all are true**

1. Source file or EDI payload stored; `file_hash` recorded.
2. `received_at` set from the channel timestamp, not from model time.
3. `document_type` set to invoice, credit, or `not_an_invoice`.
4. Every header field is `extracted`, `inferred`, or `missing` — never silently blank.
5. Line table present, or an explicit `lines_not_extracted` reason.
6. Proposed `legal_entity` has a rule ID, or is `unassigned`.
7. Packet handed to 02 and 10, or to the not-an-invoice human queue.
8. If an IBAN/account is printed, it is stored as `payment_detail_on_document` and `human_required` remains false for master data — Agent 10 / master-data team own the risk flag.

**Reject the output** if the source cannot be stored, the hash fails, or the file is empty.

---

## Decision rights by autonomy level

| Level | Intake may | Intake may not |
|---|---|---|
| **L0 Observe** | Write a shadow extraction beside the human-indexed invoice. No live queue. | Create cases operators act on |
| **L1 Recommend** | Show extracted fields and proposed vendor/entity for a human indexer to accept | Write to ERP |
| **L2 Prepare** | Create the ERP draft/park (or AP Agent OS case) with extracted fields; human submits | Post; send supplier mail |
| **L3 Execute within guardrails** | Create the draft/park unaided when: known vendor, known entity, required header fields extracted (not inferred), confidence ≥ gate, amount ≤ slice cap, channel is an agreed structured or high-quality channel | Infer a vendor on a first-time name; split a damaged PDF without review; apply printed bank details |
| **L4 Managed autonomy** | L3 across the published channel mix, with sampling | Anything in the four human classes; unsigned channels; kill-switch |

**Illustrative L3 slice (replace with yours):** domestic PDF invoices, existing vendor, header fields extracted not inferred, gross below a published cap.

---

## Human owner

**AP Supervisor / Intake Lead.** Back-up: AP Team Lead.  
The owner sets channel list, slice caps, and the not-an-invoice review queue. They do not need to see every invoice at L3+.

---

## Approval requirements

| Action | Approval |
|---|---|
| Add or retire an intake channel | AP Manager |
| Promote autonomy for a slice | AP Manager + Controls (see `17_AUTONOMY_PROGRESSION.md`) |
| Accept an inferred vendor on a new name | Human indexer |
| Treat a statement or reminder as an invoice | Human indexer |
| Any vendor payment-data change suggested by the document | Vendor-master dual control (human class) |

---

## Escalation criteria

Escalate to the Intake Lead (and Orchestrator) when:

- Source cannot be stored or hash mismatches on retry.
- Multi-invoice split confidence is below the gate.
- Bill-to maps to more than one legal entity.
- Printed vendor name does not match a vendor within the matching rule, or matches more than one.
- Channel volume drops to zero in a window that normally has traffic (mailbox down).
- A legal or threat document is detected.
- Cost envelope for the case is exhausted (repeat OCR).

---

## Control requirements and audit evidence to retain

**Controls**

- Immutable source + hash. Re-extraction never overwrites the first file.
- Invoice number stored exactly as printed (leading zeros, spaces) plus a normalised search key.
- Printed payment details never flow to vendor master.
- SoD: intake operator is not the vendor-master bank approver.
- Channel access listed and reviewed.

**Retain (per case)**

- Source file URI and hash.
- Raw extractor output and the field-level status map.
- Entity-assignment rule ID.
- Who accepted or overrode extraction (user ID, timestamp).
- Packet IDs to Agents 02 and 10.
- Not-an-invoice decision and reviewer.

Retention period: your finance / records policy. This charter does not set a legal period.

---

## Failure handling

| Failure | Immediate action | Recovery |
|---|---|---|
| OCR / parser down | Park inbound files; do not invent fields | Drain queue at L1 when service returns |
| Mailbox unreachable | Alert Intake Lead; Orchestrator marks channel red | Human monitors the mailbox; no assumed "no invoices" |
| Split error (two invoices in one case) | Split case; notify 10 (duplicate risk) and 02 | Re-hash each part; do not delete the original file |
| Duplicate file (same hash) | Do not create a second live case; notify 10 | Keep the second file as evidence |
| Wrong entity proposed | Human reassigns; log as intake defect | Feed rule-miss to Agent 15 if repeated |
| Corrupt or encrypted PDF | Escalation queue; no inference | Supplier or sender asked via Agent 08 only after triage |

Never delete an inbound file because extraction failed.

---

## Cost monitoring

Track per case and per channel:

- **Inference / tool:** OCR pages, parser calls, retries. Cap retries (illustrative: 2) then escalate.
- **Exception cost:** human minutes to index a failed extract × loaded rate.
- **Unit:** (tool + inference + human exception) / invoices received.

A channel whose exception cost exceeds a published multiple of a clean structured invoice should stay at L1 until quality improves. Do not "spend more model" on a bad scan without a manager decision.

---

## KPIs

| KPI | Formula | Notes |
|---|---|---|
| Intake yield | Cases intake-complete / documents received (excl. not-an-invoice) | |
| Field completeness | Required header fields extracted (not inferred) / required header fields | Define the required set |
| Line capture rate | Invoices with usable lines / invoices with printed lines | |
| Split accuracy | Correctly split multi-invoice files / multi-invoice files sampled | Sample-based |
| Channel uptime | Intervals with successful poll / intervals scheduled | |
| Re-work rate | Cases edited by a human after intake / cases | |
| Cost per intake | See cost monitoring | |

Do not report "straight-through" from this agent alone. Straight-through is a stack metric after match and approval.

---

## Typical first-90-day scope

Narrow and safe:

- One legal entity.
- One channel (usually the shared AP mailbox PDFs).
- Existing vendors only; new vendors stay human.
- Invoices and credits only; statements go to the not-an-invoice / Agent 11 queue by human sort.
- L0 for two review cycles, then L1, then L2 park-only.
- No L3 until field completeness and split accuracy meet the published gate on a sample the owner defines.
- EDI, portal, and scan channels added one at a time after the mailbox slice is stable.

---

## Worked example — ACME Manufacturing (fictional)

ACME Manufacturing (fictional, not a client) processes **8,400 invoices/month** (ILLUSTRATIVE) on SAP with a shared-services AP team. Mailbox, a vendor portal, and a small EDI set all land in the same intake store.

**Case.** A 14-page PDF arrives at `ap@acme.example` from a steel supplier. Pages 1–7 are invoice `4500123`. Pages 8–14 are invoice `4500124`. Both cite PO `4500099100`.

**What Intake does (L2).**

1. Stores the original 14-page PDF. Hash recorded.
2. Splits into two cases, each with a derived PDF plus a pointer to the original.
3. Extracts headers: invoice numbers, dates, currency EUR, gross amounts, PO number. Lines extracted for both.
4. Proposes company code `DE01` from the bill-to name "ACME Manufacturing GmbH" (rule `BILLTO-DE01`).
5. Looks up vendor `000034215` from VAT ID printed. Name match agrees.
6. Notes an IBAN in the footer. Stores as `payment_detail_on_document`. Does not update LFBK / bank master.
7. Hands both cases to Agent 02 and Agent 10. Agent 10 will later compare hash and invoice-number+vendor keys.

**What can go wrong here.** A naive splitter treats page 8 as a continuation and one invoice is understated. Control: split confidence below gate → human view of thumbnails before L2 park.

**Evidence that it worked.** Two case IDs, original hash, two child hashes, field-status maps, vendor and entity rule IDs, packet receipts from 02 and 10.

---

## Instruction skeleton

**Starting operating instruction — adapt to your systems. Not a magic prompt.**

```
You are Invoice Intake for Evidence Room AP Agent OS.

Mission
Create an evidence-complete case from each inbound supplier invoice or credit.
You do not post, match, approve, pay, or change vendor master data.

Autonomy
Operate only at the configured level for this legal entity and channel: {L0|L1|L2|L3|L4}.
Never raise your own level. If the kill-switch is on, behave as L0.

Rules
1. Store the source first. If you cannot store it, stop and escalate.
2. Write file_hash. Do not overwrite an existing source.
3. Extract header and lines. Mark each field extracted, inferred, or missing.
4. Do not convert currency. Do not "correct" invoice numbers.
5. Propose legal_entity only with a named rule. Otherwise unassigned.
6. Printed bank details are evidence, not a master-data update.
7. Legal, threat, or solicitor documents: stop extraction; human legal hold.
8. Hand the packet to Validation (02) and Duplicate & Anomaly (10).
9. Stay inside the case cost envelope. After {N} extractor retries, escalate.
10. Output the packet standard: case_id, source, fields, confidence, evidence_refs,
    human_required, next_action.

Escalation
Mailbox down, hash fail, multi-entity bill-to, no vendor match, split doubt,
not-an-invoice uncertainty, cost-envelope breach.

Language
Be specific. Cite field names and rule IDs. Do not claim fraud or compliance.
```
