---
title: Agent Performance Scorecard
subtitle: Activity is not an outcome. Outcomes are not a control.
tier: Professional
code: ER-AP-KPI-00
---

# Four families

Do not mix these on one vanity tile.

| Family | Question | Examples |
|---|---|---|
| Activity | Did the agent work? | Invoices handled, exceptions touched, drafts prepared |
| Operational | Did the process improve? | STP, cycle time, exception resolution, ageing, on-time follow-up |
| Financial | Did economics move? | Cost per invoice, hours released, validated savings, inference cost |
| Risk / control | Did we stay safe? | Control breaches, audit exceptions, false negatives on high-risk codes, override rate |

# Definitions and formulas

Let `N` be items in the measurement window. Use the same window for numerator and denominator.

## Activity

| Metric | Formula | Notes |
|---|---|---|
| Invoices handled | Count of invoices with an agent output | Not a success metric |
| Exceptions handled | Count of exceptions with a classification or draft | Pair with recode rate |
| Human intervention rate | Interventions / handled | Intervention = edit or reject |

## Quality (mostly operational + control)

| Metric | Formula | Notes |
|---|---|---|
| Classification accuracy | Correct codes / sampled codes | Against gold or dual-human |
| Extraction accuracy | Fields correct / fields sampled | Field-weighted; amounts weigh more |
| Matching explanation accuracy | Accepted explanations / sampled | Not ERP match rate |
| False-positive rate | FP / (FP+TN) or, for queues, rejected candidates / candidates | State which |
| False-negative rate | FN / (FN+TP) | Critical for duplicates, bank, tax |
| Rework rate | Items returned to agent queue / handled | After human reject |

## Operational outcomes

| Metric | Formula | Notes |
|---|---|---|
| STP rate | Invoices posting without human touch / invoices | Define “touch” |
| Exception resolution rate | Closed in SLA / exceptions | Need taxonomy |
| Repeat exception rate | Exceptions with same supplier+code in 90 days / exceptions | Root-cause signal |
| Average resolution time | Sum of hours from create to close / n | Clock stops on hold if policy says so |
| Time to invoice posting | Receipt → post | Align to Ardent “cycle” only if you measure the same way |
| On-time supplier follow-up | Sent within SLA / required | Draft ≠ sent |
| On-time internal follow-up | Same | |
| Ageing reduction | Δ of $ or count >X days vs baseline | Always vs baseline |
| Payment-on-time rate | Paid on or before terms / paid | Agents do not pay |
| Missing-receipt reduction | Δ open GRNI lines vs baseline | |
| PO compliance improvement | Δ PO-backed % or Δ EX-PO-* | |

## Financial outcomes

| Metric | Formula | Notes |
|---|---|---|
| Cost per invoice | AP operating cost / invoices | Be honest about allocations |
| Cost per exception resolved | Exception labour + tool / resolved | |
| AI inference cost | Invoiced model + tool cost | |
| Cost per correct outcome | (Labour_agent_ops + inference) / correct outcomes | Prefer this to “cost per run” |
| Estimated human hours released | Baseline minutes − current minutes, × volume | Label **estimated** until validated |
| Validated financial savings | Savings with a finance-approved method | Discounts captured, late fees avoided, FTE not backfilled — pick a method and stick to it |

## Risk / control outcomes

| Metric | Formula | Notes |
|---|---|---|
| Control breaches | Count of failed key controls | Including SoD and unapproved send |
| Escalation rate | Escalated / handled | Spike can be healthy |
| Audit exceptions | IA findings related to agents | |
| Duplicate invoices detected | Confirmed duplicates / candidates | Precision matter |
| Duplicate payments prevented | Confirmed would-have-paid, after human action | Rare; do not forecast |

# Benchmarks (orientation only)

Ardent Partners *State of ePayables 2025* (n=204, June 2025): average cost $9.84; cycle 8.2 days; exceptions 18.4%; STP 35.4%; Best-in-Class cost $2.65 and cycle 2.9 days. These are **not** your targets until you measure yourself the same way.

# Scorecard cadence

- Daily: queue, stalls, high-risk codes, incidents  
- Weekly: accuracy sample, hours, inference cost, top codes  
- Monthly: financial + control pack to sponsor  
- Autonomy review: only on evidence pack

# Vanity list (do not report to a CFO as success)

- “Prompts written”
- “AI invoices processed” without quality
- Vendor-stated capture accuracy
- Tokens consumed
- Number of agents live
