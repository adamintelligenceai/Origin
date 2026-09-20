# AGENT 02 — Invoice Validation

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_02`  
**Domain:** Completeness, tax, vendor fit, policy checks  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Invoice Validation verifies that a registered invoice is complete, internally consistent, and fit for matching — vendor status, mandatory fields, tax logic, currency, bill-to entity, and policy checks. It prevents dirty invoices from consuming matcher and approver time.

---

## 2. Inputs

| Input | Source |
|---|---|
| Canonical invoice draft | Agent 01 |
| Vendor master (status, terms, tax IDs) | ERP / MDM (read) |
| Company code / entity calendar | Finance config |
| Tax rule pack / matrix | Tax engine or policy tables |
| Validation policy | Mandatory fields, thresholds |
| Anomaly signals | Agent 10 (optional) |

---

## 3. Tools / data required

- Validation rules engine
- Tax calculation / verification service (or deterministic matrix)
- Vendor status API (read-only)
- Currency and FX reference (if required by policy)
- Exception case creator (for handoff to 04)

---

## 4. Responsibilities

1. Check mandatory header/line fields.
2. Verify vendor is active and payable.
3. Validate tax totals vs. lines within tolerance.
4. Confirm bill-to / entity coding candidates where policy requires.
5. Flag currency, date logic (invoice date vs. service date), and credit-note sign.
6. Pass clean invoices to Matching (03); fail to Exception Triage (04) with reason codes.

---

## 5. Explicit exclusions

- Does **not** perform 2-/3-way match (Agent 03).
- Does **not** approve invoices or release payment.
- Does **not** create or edit vendor bank details.
- Does **not** provide tax advice or legal opinions — only rule-pack application.
- Does **not** silently “fix” amounts to force balance.

---

## 6. Human owner

**AP Validation Lead** / Senior AP Specialist. Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Accept validation pass recommendation | Human at L1; fences at L3 |
| Policy override (e.g., missing tax ID with waiver) | Per DOA / Controller rules |
| Change validation rule pack | AP Manager + Controller (tax rules: Tax lead) |

---

## 8. Escalation criteria

- Vendor blocked / on hold
- Tax discrepancy above tolerance
- Entity ambiguity across multi-entity ACME-style groups
- Invoice date in future / aged beyond stale policy
- Anomaly score above threshold from Agent 10
- Credit note without referenced original (if policy requires)

---

## 9. Output standard

Validation result object: `pass | fail | pass_with_warnings`, reason codes, field-level findings, recommended next agent, evidence links, agent version.

---

## 10. Control requirements

- Rule-pack versioning and change control
- No bypass without recorded override
- Maker-checker on rule changes
- Sensitive tax ID display masking in UI logs where required

---

## 11. Audit evidence

Rule-pack version used, pass/fail detail, overrides with approver ID, timestamps, input invoice hash.

---

## 12. KPIs

1. **First-pass validation rate**  
2. **False fail rate** (sampled — clean invoices wrongly failed)  
3. **False pass rate** (sampled — dirty invoices wrongly passed)  
4. **Mean validation cycle time**  
5. **Override rate by reason code**  
6. **Tax discrepancy detection precision**  
7. **Cost per validation**  

---

## 13. Performance history fields

`first_pass_rate_28d`, `false_pass_rate_90d`, `override_rate_28d`, `avg_cycle_seconds`, `cost_per_validation_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1 Recommend** after brief L0 calibration on rule-pack. Auto-pass (L3) only for low-value, high-confidence, approved vendor tiers.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Tax engine unavailable | Fail closed to Triage or queue with “tax unchecked” hold — never silent pass |
| Vendor service timeout | Retry with backoff; then escalate |
| Conflicting rules | Block; alert rule owner |

---

## 16. Cost monitoring

Monitor rules-engine calls and specialist minutes on false fails. Tune rules that generate high-noise fails without control value.

---

## 17. Example worked scenario (fictional — ACME Corp)

Invoice `INV-ACME-88421` from Northwind arrives from Agent 01. Agent 02 confirms vendor active, PO present, tax $1,140.00 matches 10% on taxable lines within $0.50 tolerance, currency USD matches PO, bill-to = ACME Manufacturing US. Result: `pass`. Routes to Agent 03. Separately, a non-PO facilities invoice missing cost center fails with reason `MISSING_COST_OBJECT` and opens case for Agent 04.
