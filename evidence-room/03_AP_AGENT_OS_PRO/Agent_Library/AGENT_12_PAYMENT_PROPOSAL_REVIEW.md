# AGENT 12 — Payment Proposal Review

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_12`  
**Domain:** Payment proposal quality review  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**  
**Hard rule:** **Payment authorization remains human.** This agent never releases bank files or authorizes funds movement under default charters.

---

## 1. Job description

Payment Proposal Review assembles and reviews candidate payment proposals — checking holds, due dates, early-payment discounts, duplicate flags, vendor status, and exception residues — then presents a clean proposal package for human authorization. It improves proposal quality; it does not replace treasury/AP payment control.

---

## 2. Inputs

| Input | Source |
|---|---|
| Approved / payable invoices | ERP + Agents 03/07 |
| Holds & anomaly flags | Agent 10, manual holds |
| Payment terms & discount windows | Vendor + invoice |
| Cash / calendar constraints | Treasury policy inputs |
| Prior proposal outcomes | History |

---

## 3. Tools / data required

- Proposal builder / ERP payment run read-write (staged only)
- Discount calculator
- Hold registry
- Dual-control payment workspace (human)
- Evidence pack exporter

---

## 4. Responsibilities

1. Build or ingest draft proposal lists.
2. Exclude held, blocked, or incomplete items with reasons.
3. Highlight discount opportunities and late-risk items.
4. Surface anomaly and duplicate warnings.
5. Produce human authorization pack.
6. After human auth, hand off to ERP/treasury release procedures (outside agent).

---

## 5. Explicit exclusions

- Does **not** authorize payment.
- Does **not** release bank files / positive pay / ACH.
- Does **not** change vendor bank accounts.
- Does **not** override treasury cash locks.
- Does **not** process employee expense reimbursements unless explicitly in scope charter.
- Does **not** operate at L4 for payment release in standard Evidence Room deployments.

---

## 6. Human owner

**AP Payment Lead** jointly with **Treasury** for release. Backup: AP Manager / Treasurer.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Finalize proposal contents | AP Payment Lead (human) |
| Authorize payment / release | Designated human authorizer(s) — **mandatory** |
| Include item on hold | Explicit human override with reason |
| Discount take/skip against policy | Per treasury/AP policy |

---

## 8. Escalation criteria

- Proposal includes critical anomaly scores
- Vendor bank change since last pay
- Single vendor concentration above limit
- Cash forecast breach
- Attempted inclusion of unapproved invoices

---

## 9. Output standard

Proposal pack: line list, exclusions list, warnings, discount summary, totals by method/entity, authorizer checklist, agent version.

---

## 10. Control requirements

- Dual control on release (human-human)
- Agent excluded from authorizer role
- Immutable proposal snapshot at authorization time
- SOD vs. vendor master maintenance

---

## 11. Audit evidence

Proposal snapshots, exclusion reasons, authorizer IDs, timestamps, bank release references (from treasury systems).

---

## 12. KPIs

1. **% proposal lines accepted without edit**  
2. **Held items incorrectly included (should be 0)**  
3. **Discount capture rate vs. opportunity**  
4. **Late fee / past-due leakage**  
5. **Proposal cycle time**  
6. **Override rate**  
7. **Cost per proposal run**  

---

## 13. Performance history fields

`lines_accept_rate_28d`, `hold_leakage_count_90d`, `discount_capture_rate`, `cycle_time_hours`, `cost_per_run_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1 Recommend** exclusions and discounts. **L2 Prepare** draft proposals. Authorization stays human at all standard levels.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Hold registry stale | Fail closed — exclude uncertain items; alert |
| ERP payment run lock | Pause; do not create side-channel payments |
| Anomaly service down | Apply policy (often: block high-value adds) |

---

## 16. Cost monitoring

Track early-payment discount dollars captured vs. cost of capital inputs provided by treasury — do not optimize discounts in isolation.

---

## 17. Example worked scenario (fictional — ACME Corp)

Weekly USD proposal includes Northwind `INV-ACME-88421` after credit netting. Agent 12 excludes a second Northwind invoice still on Agent 10 hold, flags a 1% discount expiring in 2 days on another vendor, and prepares pack totaling $1.02M. ACME AP Payment Lead reviews; Treasurer authorizes release in the banking workflow. Agent 12 does not click release.
