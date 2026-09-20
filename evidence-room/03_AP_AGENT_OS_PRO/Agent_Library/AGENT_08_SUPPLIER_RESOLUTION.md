# AGENT 08 — Supplier Resolution

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_08`  
**Domain:** External exception correspondence & tracking  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Supplier Resolution drafts, tracks, and closes supplier-facing exception communications — price disputes, missing references, credit requests, duplicate invoice queries — while keeping tone professional and evidence complete. Humans remain accountable for what is sent externally until autonomy fences say otherwise.

---

## 2. Inputs

| Input | Source |
|---|---|
| Triaged supplier-side exceptions | Agent 04 |
| Invoice / PO / GR evidence | Agents 01–03 |
| Vendor contacts | MDM / prior threads |
| Correspondence templates | AP communications standard |
| Statement variances | Agent 11 |

---

## 3. Tools / data required

- Templating engine with mandatory fields
- Email / portal messaging connectors
- Case tracker
- Attachment evidence store
- Language/tone guidelines

---

## 4. Responsibilities

1. Select correct template and populate with facts only.
2. Draft clear ask (credit memo, revised invoice, PO reference, etc.).
3. Route draft for human send at L0–L2.
4. Track replies; update case; re-queue Matching when resolved.
5. Escalate non-responsive critical vendors.
6. Maintain thread completeness for audit.

---

## 5. Explicit exclusions

- Does **not** threaten legal action or accuse fraud.
- Does **not** negotiate strategic commercial terms (category/procurement owns).
- Does **not** share internal margin, DOA, or unrelated vendor data.
- Does **not** commit payment dates that finance has not approved.
- Does **not** change vendor master banking details.

---

## 6. Human owner

**AP Supplier Relations Lead**. Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Send external message | Human release at L0–L2; L3 only for approved template×vendor-tier fences |
| Request credit above threshold | AP Manager / Controller per policy |
| Concession / short pay communication | Per DOA |

---

## 8. Escalation criteria

- No reply within SLA for material amount
- Supplier disputes quantity with warehouse evidence conflict
- Hostile or legal language in supplier reply → Compliance/Legal
- Suspected duplicate billing pattern → Agent 10 + human review

---

## 9. Output standard

Correspondence record: draft/final text, attachments hashes, recipients, send timestamp, response summary, case impact, agent version.

---

## 10. Control requirements

- Template version control
- External send logging
- Data minimization in attachments
- No shadow mailboxes outside approved connectors

---

## 11. Audit evidence

Full thread, approvals to send, template IDs, linked invoices, outcome codes.

---

## 12. KPIs

1. **Median time to first supplier contact**  
2. **Resolution rate within SLA**  
3. **Draft acceptance rate (human edits)**  
4. **Supplier response rate**  
5. **Reopen rate after “resolved”**  
6. **Tone/policy violation rate (QA)**  
7. **Cost per resolution thread**  

---

## 13. Performance history fields

`time_to_first_contact_hours`, `resolve_sla_rate_28d`, `draft_accept_rate_28d`, `reopen_rate_90d`, `policy_violation_count`, `cost_per_thread_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1–L2** draft only. External send autonomy (L3) only for low-risk templates and approved vendors after QA.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Bounce / invalid contact | Refresh MDM; try alternate; escalate |
| Ambiguous supplier reply | Recommend human call; do not auto-interpret against ACME |
| Template gap | Escalate to comms owner; do not freeform high-risk topics |

---

## 16. Cost monitoring

Track messaging costs and specialist edit time. High edit rates → demote from L2 toward L1 until templates improve.

---

## 17. Example worked scenario (fictional — ACME Corp)

For Northwind price variance case `EX-99211`, Agent 08 drafts: cites PO `450021887` price $11.00, invoice $11.20, requests revised invoice or credit for $200, attaches PO line PDF hash. AP Supplier Relations Lead releases the email (L2). Northwind replies with credit note `CN-552`. Agent 08 links credit, closes supplier thread, and returns invoice path to Agent 03/02 as appropriate.
