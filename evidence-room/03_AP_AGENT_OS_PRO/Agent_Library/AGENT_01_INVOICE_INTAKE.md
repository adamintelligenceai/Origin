# AGENT 01 — Invoice Intake

**Stack position:** First operational agent. Upstream of Validation, Duplicate & Anomaly, and Matching.  
**Default autonomy:** L1 Recommend (commission at L0).  
**Human owner (typical):** AP Operations Lead  
**Payment authority:** None.  
**Northline instance:** Cleveland SSC, Dynamics 365 Finance, 15,000 invoices/month inbound.

---

## 1. Position in the stack

Intake is the front door. It turns inbound artefacts — PDF, image, EDI 810, cXML, portal XML, email body — into a **capture record** attached to an Orchestrator work object. It does not decide whether the invoice is payable, matched, or duplicated. It does not register the accounting document in the ERP unless a later, separate L3 subclass is earned (and even then, only a named low-risk register action).

If Intake is noisy, every downstream agent inherits the noise. If Intake is over-trusted, Validation becomes decorative. Treat capture confidence as a field, not as a posting licence.

---

## 2. Job description

The Invoice Intake Agent monitors agreed inbound channels, classifies each artefact (invoice, credit, statement, reminder, junk, duplicate-of-file), extracts header and line fields against a written schema, attaches the original, and opens or updates a work object for Agent 02.

It routes obvious non-invoices to a human miscellaneous queue. It does not invent a vendor if the extract does not resolve. It does not key a document into the ERP at L0/L1. It does not reply to suppliers.

The job is complete when every in-scope artefact from the day’s channels is either (a) a capture record with a work object or (b) a coded intake exception with an owner. Silence — an email that vanished — is a failure.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Channel poll | Every 15 minutes during SSC hours; hourly off-hours | New artefacts listed |
| Extract | Near-real-time after poll | Capture record |
| Human low-confidence review | Continuous during SSC hours | Accept / correct / reject extract |
| Daily completeness | 16:30 ET | Channel vs work-object reconcile |
| Weekly | Friday | Channel mix, exception codes, cost |

Northline SSC hours: 07:00–18:00 ET, Monday–Friday. Off-hours poll continues; human review waits for the next shift. Do not auto-register overnight at L1.

---

## 4. Inputs

| Input | Description | Source | Mandatory |
|---|---|---|---|
| Inbound artefact | File or message | Email, portal, EDI, scan | Y |
| Channel metadata | From, received time, message ID, envelope | Mail gateway / EDI VAN / portal | Y |
| Vendor identity hints | VAT/GST/RFC, name, email domain, vendor ID on face | Artefact | N |
| Vendor master (read) | For *suggestion* of vendor ID only | ERP | N at extract; Y before Validation pass |
| Capture schema | Field list, types, legal-entity variants | Controlled doc `AP-CAP-001` | Y |
| Prior artefact hash | Detect file-level duplicate of the same PDF | Evidence store | Y |
| Work object store | Open or create | Orchestrator | Y |
| Exclusion list | Employee expense, customs broker packs, bank advices | Charter | Y |

Header fields typically extracted: vendor name, vendor identifier on face, invoice number, invoice date, due date, currency, header net, tax, gross, PO number(s), ship-to, bill-to, tax registration numbers, payment terms on face, credit-note indicator.

Line fields: line number, description, quantity, UOM, unit price, line net, tax code on face, PO line (if printed), item/SKU (if printed), account assignment hints (do not post from hints).

---

## 5. Tools / data required

| Tool / data | Purpose | Privilege | Notes |
|---|---|---|---|
| Shared mailbox / graph API | Read invoice@ / country boxes | Read + move-to-folder | No send at L0/L1 |
| Vendor portal retrieve | Pull available invoices | Read | Portal T&Cs are human |
| EDI 810 / cXML listener | Structured intake | Read | Map version-pinned |
| OCR / IDR engine | Unstructured extract | Inference | Confidence per field |
| Hash service | SHA-256 of payload | — | File-level dup of artefact |
| ERP vendor search | Suggest vendor | Read | Do not create vendor |
| Evidence store | Image + extract | Write | Retention 7 years typical |
| Orchestrator | Work object | Write | Status `intake_new` |
| Channel inventory | Which pipes are in scope | Read | Controlled list |

ERP-agnostic mapping:

| ERP | Typical register target (later wave, human or earned L3 only) | Intake still reads |
|---|---|---|
| D365 F&O | Pending vendor invoice / document attachment | VendTable, document types |
| SAP S/4 | Parked / incoming invoice (MIRO park) / VIM | LFA1, BKPF attachments |
| Oracle Fusion | Payables invoice in incomplete | Suppliers, attachments |
| NetSuite | Vendor bill pending | Vendor, files |
| Workday | Supplier invoice draft | Supplier, attachments |

Intake’s job is the capture record. The ERP document is a downstream, chartered action.

---

## 6. Responsibilities

1. Poll each in-scope channel on the cadence. Record poll success/fail.
2. Classify artefact: `invoice`, `credit`, `statement`, `dunning`, `remittance`, `junk`, `unreadable`, `file_duplicate`.
3. Compute payload hash. If hash exists, attach to the existing object as `file_duplicate`; do not open a second financial object.
4. Extract fields to schema `AP-CAP-001`. Store per-field confidence.
5. Suggest a vendor ID only when a deterministic key hits (VAT/GST/RFC + name match, or printed vendor number that exists). Otherwise `vendor_unresolved`.
6. Open work object: channel, hash, extract, image URI, classification, confidence vector, suggested vendor, legal-entity guess.
7. Route `statement` to Agent 11 queue seed; `dunning` to Agent 08 seed; `junk`/`unreadable` to human miscellaneous.
8. Produce the daily completeness reconcile: artefacts received vs objects opened vs leftover in channel.
9. Write audit evidence.
10. Stop and fail closed if the IDR vendor, mailbox, or store is unavailable (see failure handling).

---

## 7. Explicit exclusions

1. Payment authorisation or release.
2. Vendor create or vendor bank change.
3. Posting or parking in ERP at L0/L1 (parking is a separate earned subclass, not implied by “intake”).
4. Matching, tax determination, or duplicate *financial* decision (file hash ≠ financial duplicate).
5. Replying to the supplier (“we have your invoice”).
6. Changing PO, creating GR, or assigning GL accounts from a header guess.
7. Treating a statement or dunning letter as an invoice.
8. Splitting a multi-invoice PDF into posted documents without a human confirm of split boundaries (at L1, split *proposals* are allowed).
9. Processing employee T&E, payroll, or customs entries.
10. Claiming the extract is “accurate” or “compliant with e-invoicing law.” Jurisdiction e-invoice mandates are a Tax/IT control, not this agent’s outcome.
11. Deleting the original artefact.
12. Raising its own autonomy.

---

## 8. Human owner

| Field | Northline (illustrative) | Generic |
|---|---|---|
| Role | AP Operations Lead | Same |
| Named | Marcus Bell, Cleveland | Named in charter |
| Backup | Shift lead, invoices | Named |
| Escalation | AP Manager | AP Manager |
| Time-to-cover | Same day | Same day — Intake cannot sit ownerless |
| Owns | Channel inventory, extract schema, low-confidence desk, completeness reconcile | Same |
| Does not own | Vendor master, tax position, payment | Same |

The low-confidence desk (typically 2–3 specialists at Northline volume) corrects extracts. They are not “the bot’s assistants”; they are the control.

---

## 9. Approval requirements

| Agent output | Human action required | Who | When |
|---|---|---|---|
| High-confidence extract, known vendor, single invoice PDF | Review not required at L1 *for use by Agent 02*; still subject to sample | Ops Lead sample plan | Sample daily |
| Any field confidence < floor (Northline: 0.85 header ID fields, 0.80 lines) | Correct or reject | Low-confidence desk | Before Agent 02 starts |
| `vendor_unresolved` | Assign vendor or return to sender procedure | Vendor Master + Ops | Same day |
| Multi-invoice PDF split proposal | Confirm page boundaries | Low-confidence desk | Before split objects go live |
| Legal-entity ambiguous (bill-to matches two companies) | Assign company | Ops Lead | Before Validation |
| First invoice from vendor < 90 days | Mandatory review | Ops + Vendor Master | Before Validation |
| Proposed L3 auto-register (not in force at commissioning) | Separate promotion case | Process Owner + Controller | After gates |

No approval in Intake authorises payment.

---

## 10. Escalation criteria

| Condition | To | Timing | Packet |
|---|---|---|---|
| Channel poll fail > 45 minutes in SSC hours | IT + Ops Lead | 45 min | Job log |
| Daily completeness gap (artefacts > objects) | Ops Lead | 16:45 ET | Reconcile |
| Unreadable rate > 8% of a day’s volume | IDR vendor owner + Ops | Next morning | Sample images |
| Sudden volume > 2× 20-day average on one channel | Ops Lead | Same day | Channel dump — possible flood or misdirected mailbox |
| Suspected mailbox compromise / unexpected sender pattern | IT Security + Ops | Immediate | Headers |
| Schema cannot represent a new legal e-invoice format | Tax + IT + Ops | Before forcing a mapping | Sample + regulation note |
| Low-confidence queue > 1 business day aging | AP Manager | Daily | Aging |

---

## 11. Output standard

### 11.1 Capture record (minimum)

| Field | Rule |
|---|---|
| `object_id` | Orchestrator ID |
| `agent_id` | `01` |
| `autonomy_level` | `L0` or `L1` |
| `channel` | `email` / `edi` / `cxml` / `portal` / `scan` |
| `received_at` | Channel timestamp |
| `payload_hash` | SHA-256 |
| `classification` | Enum in §6 |
| `legal_entity_guess` | Company code or `unresolved` |
| `vendor_suggest` | ERP ID or `unresolved` |
| `header{}` | Schema fields + per-field confidence |
| `lines[]` | Schema fields + per-field confidence |
| `image_uri` | Immutable store |
| `extract_uri` | JSON |
| `file_duplicate_of` | Object ID or null |
| `human_review_state` | `not_required` / `pending` / `corrected` / `rejected` |
| `owner` | Role + name |
| `timestamp` | UTC |

### 11.2 Daily completeness report

Channels, artefacts in, objects out, leftovers, unreadable count, file-duplicates, cost estimate, poll failures.

### 11.3 Naming

`NL-I1-{channel}-{yyyyMMdd}-{seq}` for artefacts; work object ID is system-assigned and never reused.

---

## 12. Control requirements

| Control | Agent behaviour | Test |
|---|---|---|
| Completeness of inbound | Daily reconcile | Sample 3 days/month: mailbox vs objects |
| Original retained | No delete | Quarterly store test |
| File-level duplicate | Hash attach, no second object | Inject known PDF |
| Least privilege | Read channels; no ERP write at L1 | Access review |
| SoD | Intake staff ≠ payment releasers | HR/role review |
| Change control | Schema and IDR prompt/version hashed | Version log |
| PII / pricing | Store access logged | SIEM sample |

Intake does not satisfy e-invoicing legal archival on its own. Tax and Legal specify the archive. Intake feeds it.

---

## 13. Audit evidence

| Evidence | Retention | Location |
|---|---|---|
| Original artefact | Per legal archive + min 7 years | Evidence store |
| Extract JSON + confidence | 7 years | Evidence store |
| Human corrections (before/after) | 7 years | Orchestrator |
| Channel poll logs | 1 year | SIEM / job |
| Completeness reports | 7 years | Close-adjacent folder |
| Schema versions | Life of programme | Controlled docs |
| File-duplicate joins | 7 years | Orchestrator |

Retrieval target: from invoice number or message ID to image + extract in 15 minutes.

---

## 14. KPIs

Operating discipline. Not savings. Not “straight-through.”

| KPI | Definition | Cadence | Use |
|---|---|---|---|
| Channel completeness | Objects / artefacts (ex junk) | Daily | Coverage |
| Time to work object | Receipt → object | Daily | Freshness |
| Low-confidence rate | % below floor | Daily | IDR health |
| Correction rate | Fields changed by human / fields presented | Weekly | Extract quality |
| Misclassification rate | Human flips class | Weekly | Classifier health |
| Unreadable rate | % | Weekly | Image / vendor issue |
| File-duplicate rate | % | Weekly | Sender behaviour |
| Leftover artefacts | Count at 16:30 | Daily | Silent loss |
| Cost per 1,000 artefacts | IDR + connector + desk minutes | Monthly | Pause brake |

Forbidden: “capture accuracy guaranteed,” “touchless rate,” ROI.

---

## 15. Performance history fields

Period; artefacts by channel; objects opened; file-duplicates; unreadable; leftover; low-confidence volume; correction rate; misclass; poll failures; IDR version; schema version; autonomy level; incidents; pause events; cost; companies processed; first-invoice-from-new-vendor count.

---

## 16. Autonomy level

| Level | Allowed | Northline commissioning |
|---|---|---|
| L0 | Shadow extracts, no work objects as SOR (parallel folder) | First 10 days |
| L1 | Work objects + recommendations; human on low-confidence, unresolved vendor, splits, new vendors | Default live |
| L2 | Prepare ERP register packet (attachments, suggested fields) for a human clerk | After gates, optional |
| L3 | Auto-register *named subclass* (e.g. structured EDI 810 from 12 listed vendors, hash-unique, vendor resolved) | Separate case; no payment |
| L4 | Exception-only review of that same EDI subclass | Recert |

Default: **L1**. Ceiling without a new charter: **L1**. File-hash duplicate handling is not L3 financial matching.

---

## 17. Failure handling

| Failure | Detect | Immediate | Notify | Resume |
|---|---|---|---|---|
| Mailbox / portal down | Poll fail | Stop claiming completeness; mark channel `red` | IT + Ops 45 min | After poll success + leftover sweep |
| IDR timeout | Job SLA | Retry once; then `unreadable` | Ops | Object-level |
| Store write fail | 5xx | Freeze intake (do not extract without archive) | IT | After write test |
| Schema mismatch | Validation of JSON | Fail object to human | Ops | After schema fix (change control) |
| Clock skew / missing received_at | Parse | Use poll time; flag `time_inferred` | Ops weekly | n/a |
| Flood | 2× volume | Do not drop; enlarge queue; extra desk | AP Manager | After source confirmed |
| Suspected malicious payload | AV / sandbox | Quarantine; do not open in ERP | Security | After clearance |

Never “skip archive and key it anyway.”

---

## 18. Cost monitoring

| Element | Meter | Pause threshold (illustrative) |
|---|---|---|
| IDR / model | Pages × unit cost | 2× baseline for 3 weeks *and* correction rate worsening |
| Portal / EDI | Connector fees | Error rate > 5% sustained |
| Desk minutes | Low-confidence + leftover | Desk > 40% of artefacts for 2 weeks → IDR is not earning L1 |
| Rework | Downstream Validation rejects for capture error | Cluster ≥ 20/week → L0 |

Cost is a brake. Do not write a savings case into this table.

---

## 19. Handoffs

| From | To | Trigger | Artefact |
|---|---|---|---|
| Channel | Agent 01 | New artefact | Payload |
| Agent 01 | Agent 02 | Capture record ready (and human review if required) | Capture record |
| Agent 01 | Agent 10 | Object exists | Image + extract (parallel) |
| Agent 01 | Agent 11 | Class `statement` | Seed |
| Agent 01 | Agent 08 | Class `dunning` | Seed |
| Agent 01 | Human misc | Junk / unreadable | Artefact |
| Agent 01 | Agent 16 | All status changes | Events |

---

## 20. Configuration parameters (charter these)

| Parameter | Northline starting value | Change control |
|---|---|---|
| Header confidence floor | 0.85 on invoice #, date, gross, vendor name | Yes |
| Line confidence floor | 0.80 | Yes |
| Poll interval | 15 min / 60 min off hours | IT |
| Channels in scope | `apinvoices@northline.example`, EDI 810 VAN, two OEM portals | Yes |
| Max PDF pages auto-split proposal | 40 | Yes |
| File-hash algorithm | SHA-256 | Yes |
| New-vendor review window | 90 days | Yes |

---

## 21. First 90 days

**Days 1–14 (L0):** Shadow extract on US-OH + US-AL email + EDI only. Completeness reconcile built. No specialist relies on the extract.

**Days 15–45 (L1):** Work objects live. Low-confidence desk staffed. CA/MX email still L0 until GST/IVA fields are in schema.

**Days 46–90:** Open L2 register-packet case only if G1.* gates pass. Do not discuss L3 except for a short EDI vendor list. Agent 15 may look at unreadable clusters (bad fax from two foundries).

Success: leftover ≈ 0 at 16:30; correction reasons coded; no ERP write privilege on the service account.

---

## 22. Worked example — Northline Industrials

**Tuesday 09:12 ET.** Mailbox receives a 4-page PDF from `ar@lakeshoresteel.example`, subject “Inv 459102.”

1. Poll picks up message ID `AAMk-771`. Hash `9f3c…` is new.
2. Classifier: `invoice` (0.96). Not a statement.
3. Extract: vendor name Lakeshore Steel Co.; invoice 459102; date 2026-04-06; PO 45007821; USD; net 18,400; tax 1,196; gross 19,596; 12 lines, EA, item numbers printed.
4. Vendor suggest: VAT/EIN + name hits `V-10442` in D365. Legal entity: bill-to Dayton plant → company 1000.
5. Confidences: invoice # 0.97, gross 0.94, lines 0.88–0.93. All above floor.
6. Not a first invoice (vendor age 6 years). Work object `WO-1048821` opened. Image stored.
7. Agent 02 and Agent 10 subscribed.
8. Completeness: this artefact is one of 612 before 16:30; leftover 0.

**Same morning, second mail:** identical PDF forwarded by a buyer. Hash matches. Classification `file_duplicate`. Attached to `WO-1048821`. No second invoice will be validated. (Financial duplicate of a *different* number is Agent 10’s problem, not hash.)

**Same morning, third mail:** 18-page PDF, three invoices, low split confidence. Desk confirms pages 1–6 / 7–12 / 13–18. Three objects. Agent does not guess.

**Birmingham portal:** 40 OEM invoices retrieved. Structured XML. Extract floors met. Company 1100. Same path.

**Hamilton box (out of Wave 1 live):** still L0 shadow. GST fields not forced into US schema.

No payment, no post, no supplier reply occurred.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1048821
agent_id: 01
autonomy_level: L1
channel: email
received_at: 2026-04-07T13:12:04Z
payload_hash: 9f3c…
classification: invoice
legal_entity_guess: 1000
vendor_suggest: V-10442
header.invoice_number: 459102 (0.97)
header.gross: 19596.00 USD (0.94)
header.po: 45007821 (0.91)
lines: 12
image_uri: evidence://nl/01/2026/04/WO-1048821.pdf
human_review_state: not_required
owner: Marcus Bell / low-confidence desk on duty
file_duplicate_of: null
downstream: [02, 10]
```

---

## 24. What this agent does not replace

Mailroom policy, legal e-invoice archive, vendor onboarding, EDI mapping project, mailbox security, or the specialist who corrects a bad extract. It does not replace Validation.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_01 Invoice Intake |
| Default autonomy | L1 (start L0) |
| Review | Quarterly or on channel/schema change |
| Related | Agents 02, 10, 11, 08, 16; charter template |
