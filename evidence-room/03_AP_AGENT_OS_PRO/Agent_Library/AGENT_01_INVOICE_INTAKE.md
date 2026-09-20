# AGENT 01 — Invoice Intake

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_01`  
**Domain:** Capture & registration  
**ERP posture:** Agnostic (canonical invoice object)  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Invoice Intake captures inbound supplier invoices from approved channels, extracts structured fields, classifies document type, attaches source evidence, and registers a normalized invoice record for downstream validation. It creates a reliable digital first touch — not a posting decision.

---

## 2. Inputs

| Input | Source (illustrative) |
|---|---|
| Email invoices / PDF / e-invoice / portal upload / scan | Mailbox, OCR/IDR, supplier portal, EDI/XML |
| Channel metadata | Sender, timestamp, mailbox rules |
| Vendor directory (read) | ERP / MDM sync |
| Intake policy | Allowed channels, file types, size limits |
| Prior duplicates watchlist | Agent 10 signals (read) |

---

## 3. Tools / data required

- Document ingestion connectors (email, SFTP, portal, API)
- OCR / intelligent document recognition with confidence scores
- Canonical invoice schema mapper
- File hash / evidence store
- Read-only vendor lookup
- Work queue API for handoff to Agent 02

---

## 4. Responsibilities

1. Ingest from allow-listed channels only.
2. Extract header and line candidates with field-level confidence.
3. Classify: PO invoice, non-PO, credit note, statement (misrouted), other.
4. Create intake record with source artifact hash and lineage.
5. Route to Validation (02) or Exception Triage (04) if unreadable / wrong channel.
6. Tag potential duplicate signals from Agent 10 without concluding fraud.

---

## 5. Explicit exclusions

- Does **not** post invoices to the ERP as final accounting entries at L0–L1.
- Does **not** change vendor master data.
- Does **not** authorize payment.
- Does **not** accept invoices from non-approved channels without human exception.
- Does **not** guarantee OCR correctness — confidence thresholds drive human review.
- Does **not** treat “statement” as an invoice.

---

## 6. Human owner

**AP Intake Lead** (or AP Operations Manager). Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Register draft intake record | Per level: L1 human accept if below confidence; L2+ per fence |
| Accept new intake channel | AP Manager + IT/Security |
| Override “unreadable” to force through | AP specialist |
| Promote autonomy | Per `RESPONSIBILITY_MODEL.md` |

---

## 8. Escalation criteria

- Confidence below threshold on amount, vendor, or invoice number
- Suspected malware / unexpected file type
- High-value invoice above policy threshold at intake
- Duplicate score above hold threshold (coordinate with Agent 10)
- Supplier not found / multiple vendor matches
- Volume spike &gt; agreed band (possible flood / attack)

---

## 9. Output standard

Every intake produces:

1. Canonical invoice draft object  
2. Source file URI + hash  
3. Field confidence map  
4. Classification label  
5. Routing decision + timestamp  
6. Agent version ID  

---

## 10. Control requirements

- Channel allow-list enforced
- Immutable evidence store for originals
- Separation: intake agent identity ≠ payment releaser
- PII/tax ID handling per data policy
- Retention aligned to statutory AP retention

---

## 11. Audit evidence

Intake log, original artifact, extraction JSON, confidence map, human overrides, routing history.

---

## 12. KPIs (target bands set locally)

1. **Straight-through intake rate** — % reaching Validation without manual rekey  
2. **Field accuracy (sampled)** — critical fields correct  
3. **Mean time to register** — receipt → intake record  
4. **Unreadable / reject rate**  
5. **Channel compliance rate** — % from allow-listed sources  
6. **Evidence completeness** — % with hash + lineage  
7. **Cost per intake**  

---

## 13. Performance history fields

`acceptance_rate_28d`, `ocr_critical_field_accuracy_90d`, `mttr_register_hours`, `channel_breach_count`, `cost_per_intake_28d`, `current_level`, `ceiling_level`, `last_sample_qa_score`

---

## 14. Autonomy starting recommendation

**L0** for first 2–4 weeks (observe extraction quality).  
**L1** when sample accuracy meets gate.  
**L2** only after sustained accuracy — prepare ERP draft registration.  
**L3+** rare; never default.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| OCR service down | Queue raw artifacts; alert owner; no silent drop |
| Schema map failure | Route to Triage (04); preserve original |
| Partial extract | Create record with gaps flagged; do not invent amounts |
| Duplicate flood | Rate-limit; escalate to Orchestrator (16) |

---

## 16. Cost monitoring

Track IDR/OCR unit cost, storage cost, and human rework minutes per invoice. Flag when cost per successful intake exceeds budget band for 2 consecutive weeks.

---

## 17. Example worked scenario (fictional — ACME Corp)

ACME Corp receives a PDF from `billing@northwind-supplies.example` in the AP mailbox. Agent 01 ingests the file, hashes it, extracts vendor “Northwind Supplies,” invoice `NW-10482`, amount `$12,440.00`, PO `450021887`. Confidence on amount is 0.96; on PO 0.91. Classification = PO invoice. Agent 10 returns duplicate score 0.12 (low). Agent 01 registers draft `INV-ACME-88421` and routes to Agent 02. No posting occurs. The AP Intake Lead sees the item in the L1 queue only if any critical field had fallen below 0.85 — in this case it proceeds under ACME’s L1 auto-recommend policy for review sampling.
