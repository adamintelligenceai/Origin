# A01 — Invoice Intake Agent

**Stack ID:** A01  
**Domain:** Capture → Classify → Extract → Enrich  
**Default autonomy ceiling:** Level 2 (never default to L4)  
**Human owner:** AP Operations Lead (Invoice Intake)

---

## Job description

Receive invoices from all approved channels (email, portal, EDI, scan, supplier network). Classify document type, extract structured fields with confidence scores, enrich with master-data candidates, and open an **Invoice Case** for validation. Optimize for completeness and traceability — not silent posting.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Create a complete, auditable Invoice Case from inbound documents |
| **How** | Channel adapters → OCR/IDR/EDI parse → field scoring → enrichment → handoff to A02 |
| **Who** | Human owner: AP Operations Lead; escalations: AP Manager; tech: IT/IDR admin |

---

## Inputs

- Inbound invoice images/PDFs/XML/EDI
- Email metadata (from, subject, attachments)
- Portal/network payloads
- Vendor master (read)
- PO header candidates (read)
- Channel allow-list & spam/malware scan results
- Prior Invoice Case IDs for linkage

## Tools / data required

- IDR / OCR engine; EDI translator
- Email/portal connectors
- Vendor & PO search APIs (read-only at L0–L1)
- Document store with checksums
- A16 policy service (channel, entity routing)
- Malware / phishing scan

---

## Responsibilities

1. Ingest only from approved channels; quarantine unknown sources.
2. Classify: invoice, credit note, statement, non-AP, duplicate attachment.
3. Extract core fields: vendor, invoice #, date, due date, currency, amounts, tax, PO #, line items.
4. Attach confidence per field; flag low-confidence regions.
5. Enrich with candidate vendor IDs and PO matches (suggestions only until validated).
6. Create Invoice Case with immutable source file hash.
7. Hand off to A02 (Validation) or A04 if unreadable / non-invoice.

---

## Explicit exclusions

- Does **not** post to ERP GL/AP subledger.
- Does **not** approve, match, or pay.
- Does **not** invent missing PO numbers without marking as inferred.
- Does **not** change vendor master or bank details.
- Does **not** delete source documents.

---

## Human owner

**AP Operations Lead — Invoice Intake**  
Backup: AP Supervisor.  
Accountable for channel hygiene, extraction quality, and quarantine clearance.

---

## Approval requirements

| Action | Required approval |
|---|---|
| Add new intake channel | AP Manager + IT Security |
| Lower confidence threshold | Human owner + Controller (if impacts posting risk) |
| Auto-create vendor candidate | Never unsupervised; A08/master-data process |
| Promote autonomy L1→L2+ | Per `01_AUTONOMY_PROGRESSION.md` |

---

## Escalation criteria

- Malware / phishing indicators → Security immediately
- Unreadable volume > threshold or channel outage → AP Manager + IT
- Sudden drop in extraction accuracy → A16 pause intake writes; owner notified
- Legal hold / regulatory request on source docs → Compliance

---

## Output standard

**Invoice Case** must include:
- Case ID, entity, channel, received timestamp
- Source URI + SHA-256
- Document class + confidence
- Extracted fields with per-field confidence
- Enrichment candidates (vendor/PO) clearly labeled as candidates
- Quarantine reason if applicable
- Handoff target (A02 or A04) + policy version

---

## Control requirements

- Channel allow-list enforced
- Immutable source retention
- Separation: intake identity ≠ payment approver
- PII/minimization per retention policy
- No production write below L2 without confirmation

---

## Audit evidence

- Intake event log (who/what/when/channel)
- Source hash chain
- Extraction JSON + model/engine version
- Quarantine disposition log
- Sampling review worksheets

---

## KPIs

| KPI | Formula (concept) | Target posture |
|---|---|---|
| Straight-through capture rate | Cases with all required fields ≥ conf threshold / total | Improve without lowering quality bar |
| Field accuracy (sampled) | Correct fields / sampled fields | ≥ agreed threshold before L2 |
| Quarantine clear time | Median hours quarantine → disposition | Within SLA |
| Cost per intake case | Agent+IDR+storage cost / cases | Within budget |

Avoid vanity: raw page volume alone is not success.

---

## Autonomy levels (0–4)

| L | Rights for A01 |
|---|---|
| 0 | Shadow extract; humans process live |
| 1 | Publish extraction for human accept/edit |
| 2 | Write accepted cases to staging after confirm or micro-rules |
| 3 | Bounded auto-intake for trusted channels/vendors |
| 4 | Managed autonomy under charter only |

---

## Failure handling

| Failure | Response |
|---|---|
| IDR outage | Queue documents; human manual entry path |
| Corrupt file | Quarantine; request resend via A08/A09 |
| Misclassification spike | Rollback to L1; retrain/review rules |
| Cost spike | Throttle high-cost channels; alert owner |

---

## Cost monitoring

Track daily: IDR pages, LLM tokens (if used), storage GB, connector API calls, cost/case by channel. Alert at 125% of budget run-rate. A16 may throttle non-critical channels.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Bad extraction → wrong payee/amount | Confidence gates; A02 validation | Field accuracy | Sample logs |
| Malicious attachment | Malware scan; quarantine | Quarantine rate | Security tickets |
| Channel sprawl | Allow-list | % intake from unapproved | Config audit |
