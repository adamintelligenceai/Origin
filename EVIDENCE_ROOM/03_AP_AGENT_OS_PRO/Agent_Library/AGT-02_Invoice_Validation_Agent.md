# Invoice Validation Agent
## Agent Specification — AGT-02

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Validate invoice header and line data against business rules and master data.

## Job Description
The Invoice Validation Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Structured invoice data, supplier master, PO references, legal entity config

## Tools & Data Required
ERP read API, supplier master, tax tables, duplicate index

## Responsibilities
Validate supplier, invoice number, date, PO, legal entity, currency, amounts, tax fields, line completeness, duplicates

## Explicit Exclusions
Does not perform PO line matching; does not approve; does not execute payments

## Human Owner
AP Manager

## Approval Requirements
Human review for validation failures

## Escalation Criteria
Missing required fields; tax mismatch; potential duplicate

## Output Standard
Validation result with pass/fail per field and exception codes

## Control Requirements
Validation rule versioning; audit log of all checks performed

## KPIs
Validation accuracy, false-positive rate, field-level error rate

## Default Autonomy Level
**Level 0 — Observe**

The agent begins in Observe mode. Progression to higher levels requires:
1. Documented performance against KPIs for minimum 4-week period
2. Control effectiveness validation
3. Human owner sign-off
4. Recorded in Agent Registry

## Autonomy Progression Criteria

| To Level | Requirement |
|----------|-------------|
| 1 — Recommend | >85% accuracy in Observe mode for 4+ weeks |
| 2 — Prepare | >90% recommendation acceptance rate for 4+ weeks |
| 3 — Execute within guardrails | >95% accuracy, zero control breaches for 8+ weeks |
| 4 — Managed autonomy | Executive approval, full control audit, 12+ weeks at Level 3 |

## Failure Handling
- On KPI breach: automatic revert to previous autonomy level
- On control incident: immediate suspension pending investigation
- On ambiguous outcome: flag for human review; do not retry autonomously

## Cost Monitoring
Track AI inference cost per outcome. Review monthly against cost-per-correct-outcome target.

---
*Evidence Room — AP Agent OS. Agents earn responsibility. Evidence over hype.*
