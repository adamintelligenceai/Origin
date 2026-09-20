# A01 — Invoice Intake Agent

**Stack ID:** A01  
**Human owner (default):** AP Supervisor / Invoice Processing Lead  
**Typical autonomy start:** L0 → L1  
**Depends on:** Inbound channels, document store, vendor directory (read)  
**Hands off to:** A02 Invoice Validation, A04 Exception Triage, A10 Duplicate & Anomaly

---

## Purpose

Capture every inbound supplier invoice into a controlled, complete, auditable work queue — with channel provenance, document integrity, and early classification — so nothing enters AP processing as an orphan attachment or undocumented email.

---

## Job description

The Invoice Intake Agent monitors agreed inbound channels (AP mailbox, portal upload, EDI/e-invoice, shared drive drop, scanner queue), registers each document as an invoice candidate, extracts or receives header-level identity fields, assigns a unique intake ID, stores the immutable source file, and routes the case to Validation or Exception Triage.

It is the front door of the AP Agent OS. It does not approve invoices, match POs, or authorise payment.

---

## Inputs

| Input | Source | Notes |
|-------|--------|-------|
| Raw invoice files (PDF, image, XML, UBL, EDI) | Email, portal, EDI gateway, scan | Preserve original bytes |
| Channel metadata | Mail headers, portal user, EDI partner ID | Provenance for audit |
| Known remit addresses / supplier aliases | Vendor master / intake allow-list | Soft match only at intake |
| Legal entity / mailbox mapping | Config | Multi-entity routing |
| Duplicate fingerprint seeds | Prior intake hashes, invoice numbers | Candidate only — A10 owns deep check |
| Intake SLA policy | Config | Age clocks start at intake |

---

## Tools / data required

- Secure document store with immutability / WORM option for originals  
- OCR / e-invoice parser (vendor-agnostic interface)  
- Hashing for file-level duplicate candidates  
- Vendor directory read access (name, VAT, email domains)  
- Work-queue / case system (or ERP park document API)  
- Channel connectors with retry and dead-letter queues  
- Secrets vault for mailbox / API credentials  

---

## Responsibilities

1. Poll / receive from approved channels only.  
2. Persist original document and channel metadata with intake timestamp.  
3. Create intake record with unique ID and status `Received`.  
4. Run first-pass extraction (supplier name, invoice number, date, amount, currency, PO number if present, tax ID).  
5. Classify document type: invoice, credit note, statement, non-AP (reject/divert).  
6. Soft-match supplier and legal entity; flag low confidence rather than invent IDs.  
7. Emit duplicate-*candidate* signal to A10 when hash or invoice-number collision appears.  
8. Route valid candidates to A02; route unreadable / non-AP / multi-doc packs to A04 with taxonomy codes.  
9. Maintain intake completeness report for the period (A13/A14 consumers).  

---

## Explicit exclusions

- Final supplier master creation or banking updates  
- PO matching or price/qty decisions  
- Approval routing or DOA interpretation  
- Payment proposal or payment release  
- Declaring a document “not a duplicate” with certainty (A10 + human)  
- Processing channels not on the approved list  
- Silent discard of documents without exception record  

---

## Human owner

**Primary:** AP Supervisor / Invoice Processing Lead  
**Secondary:** Shared Services Operations Manager  
**Accountable executive:** Head of AP  

The human owner defines approved channels, retention, and escalation SLAs; reviews intake failure queues daily.

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Add/remove intake channel | Head of AP + IT Security |
| Change entity↔mailbox map | Controller / entity finance lead |
| Auto-create ERP draft invoice at L2+ | Documented policy + L2 promotion gate |
| Suppress a channel permanently | Head of AP |

Routine intake registration at L1 does not require per-document human approval when confidence ≥ threshold.

---

## Escalation criteria

Escalate to human owner within SLA when:

- Unreadable document after retry OCR  
- Multi-invoice PDF without split rules  
- Channel authentication / mailbox failure > 15 minutes  
- Volume spike > configured % vs 30-day baseline  
- Suspected malware / password-protected file policy hit  
- Entity cannot be determined and amount ≥ threshold  
- Supplier email domain not on allow-list and amount ≥ threshold  

---

## Output standard

Every intake record must include:

- Intake ID, received-at (UTC), channel, source URI  
- Original file hash and storage pointer  
- Extracted fields + confidence per field  
- Document type classification  
- Soft supplier / entity match IDs or `unmatched`  
- Next agent / queue  
- Exception codes if any  
- Trace ID for downstream agents  

Status vocabulary: `Received` · `Extracted` · `Routed` · `Exception` · `Rejected-NonAP` · `Held-Security`.

---

## Control requirements

- Segregation: intake channel admins ≠ payment releasers  
- Immutable storage of originals  
- No processing from personal inboxes  
- Encryption in transit and at rest  
- Access logs for document download  
- Dead-letter queue reviewed daily  
- PII / bank detail masking in logs  

---

## Audit evidence

Retain for policy period: original file, hash, channel metadata, extraction JSON, routing decision, operator overrides, connector health logs, and daily intake completeness reconciliation (count in vs count registered).

---

## KPIs (suggested)

1. **Intake completeness %** — documents registered / documents received (channel-reconciled)  
2. **Median time to register** — receipt → intake ID  
3. **Extraction field completeness %** — critical fields present above confidence threshold  
4. **Misclassification rate** — non-AP or wrong type corrected by humans  
5. **Channel failure minutes** — downtime of primary mailbox/portal  
6. **Exception rate at intake** — % routed to A04 at intake  
7. **Cost per 1,000 intakes** — connector + OCR + compute  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0 Observe** | Log inbound volumes; shadow-extract; no queue writes |
| **L1 Recommend** | Create intake records in work queue; propose supplier/entity; humans confirm low-confidence |
| **L2 Prepare** | Auto-route high-confidence invoices to A02; draft ERP “parked” documents where API allows; split multi-page packs per approved rules |
| **L3 Execute within guardrails** | Auto-register and route within amount/entity/channel guardrails; auto-divert clear non-AP with notice |
| **L4 Managed autonomy** | Full intake for approved channels with exception-only human review; still no payment or master-data banking writes |

---

## Failure handling

| Failure | Response |
|---------|----------|
| OCR / parser down | Queue raw files; alert; do not invent fields |
| Mailbox auth failure | Page IT + AP Supervisor; pause agent writes |
| Partial extract | Route to A04 with `invoice_quality` / `ocr_extraction_issue` |
| Duplicate connector delivery | Idempotent intake ID by hash+channel message-id |
| Poison message | Dead-letter; never infinite retry |

On ambiguous ERP write (timeout): **do not retry create**; reconcile by hash/search before any re-post.

---

## Cost monitoring notes

Track OCR pages, LLM tokens (if used for classification), mailbox API calls, and storage GB. Cap model calls on low-value / high-volume noise channels. Prefer native e-invoice XML parse over OCR when both exist.

---

## Example scenario *(illustrative example)*

A multi-entity group receives 400 PDFs/day in `ap@company.com`. The agent registers each file, maps DE mailbox tag to legal entity DE01 with high confidence, soft-matches vendor “ACME GmbH” to vendor V-10422, extracts invoice number and gross amount, finds no hash collision, and routes to A02. A password-protected PDF is held with `Held-Security` and escalated — not forced open.

---

## Suggested first pilot scope

Single legal entity, single mailbox, PDF invoices only, top 50 suppliers by volume, L1 autonomy, no ERP write — intake queue + extraction report only for two weeks shadow, then controlled pilot with human confirmation on supplier mismatch.
