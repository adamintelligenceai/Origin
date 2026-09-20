# AGENT 03 — Matching

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_03`  
**Domain:** 2-way / 3-way match  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Matching compares validated invoices to purchase orders and goods receipts within configured tolerances. It recommends match outcomes, prepares match evidence, and routes exceptions with precise reason codes. It is the core control between procurement truth and supplier billing.

---

## 2. Inputs

| Input | Source |
|---|---|
| Validated invoice | Agent 02 |
| PO header/lines | Procurement / ERP |
| Goods receipts | Warehouse / ERP (Agent 05 may prompt creation) |
| Match tolerance policy | Price %, qty %, absolute $ |
| Historical match decisions | Learning / audit trail (optional) |

---

## 3. Tools / data required

- PO and GR read APIs
- Tolerance engine
- Line-association heuristics (with explainability)
- Exception case API
- Evidence pack builder

---

## 4. Responsibilities

1. Determine required match type (2-way vs 3-way) from policy / item category.
2. Associate invoice lines to PO/GR lines with explainable logic.
3. Evaluate qty, price, and amount variances vs. tolerances.
4. Recommend: `matched` | `matched_with_tolerance` | `exception`.
5. On exception, emit structured reasons for Triage (04).
6. On success, route to Approval (07) or Payment Proposal path per policy.

---

## 5. Explicit exclusions

- Does **not** create goods receipts (Agent 05 prepares/prompts; humans or authorized systems post).
- Does **not** rewrite PO prices (Agent 06 flags PO quality; procurement owns PO change).
- Does **not** approve payment.
- Does **not** blanket-match “short pay” without policy and human rules.
- Does **not** hide variance by reallocating lines without audit trail.

---

## 6. Human owner

**AP Match Lead** / AP Supervisor. Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Accept match within tolerance | L1 human or L3 fence |
| Accept match outside tolerance | DOA by amount / % |
| Change tolerance policy | AP Manager + Controller + Procurement lead |

---

## 8. Escalation criteria

- Variance above absolute or % fence
- Partial receipt with remaining qty risk
- Multiple GR candidates / ambiguous association
- Service-based PO without clear acceptance evidence
- High-value invoice (threshold)
- Duplicate/anomaly hold from Agent 10

---

## 9. Output standard

Match decision object: type, line associations, variance table, tolerance evaluation, evidence links, next hop, agent version.

---

## 10. Control requirements

- Tolerances version-controlled
- Every override captured with user + reason
- Three-way required categories cannot be silently downgraded to two-way
- Segregation from payment release identity

---

## 11. Audit evidence

PO/GR snapshots (or immutable references), variance calc, tolerance version, decision, human action.

---

## 12. KPIs

1. **Auto-match rate** (within policy)  
2. **Match accuracy (sampled)**  
3. **Exception rate by reason code**  
4. **Mean time to match decision**  
5. **Tolerance override rate**  
6. **False match rate** (critical)  
7. **Rework loops per invoice**  
8. **Cost per match decision**  

---

## 13. Performance history fields

`auto_match_rate_28d`, `false_match_count_90d`, `override_rate_28d`, `avg_decision_hours`, `cost_per_match_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1** for match recommendations. **L2** to stage match clearances. **L3** only for low-value SKUs with tight historical accuracy. Never default L4.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| PO not found | Exception `PO_MISSING` → 04 / 06 / 08 as triaged |
| GR missing | Exception `GR_MISSING` → 05 |
| Ambiguous lines | Fail to Triage; do not guess silently |
| ERP read outage | Pause queue; alert Orchestrator |

---

## 16. Cost monitoring

Track matcher compute plus specialist time on avoidable exceptions (bad PO, missing GR). Feed Agent 15 root-cause themes.

---

## 17. Example worked scenario (fictional — ACME Corp)

Northwind invoice `NW-10482` / `INV-ACME-88421` references PO `450021887` line 10: 1,000 units @ $11.00. GR `5008891` shows 1,000 received. Invoice unit price $11.20 (+1.8% / +$200). ACME tolerance is 1% or $50. Agent 03 recommends `exception` with reason `PRICE_VARIANCE_ABOVE_TOLERANCE`, variance table attached, and routes to Agent 04. No short-pay is applied automatically.
