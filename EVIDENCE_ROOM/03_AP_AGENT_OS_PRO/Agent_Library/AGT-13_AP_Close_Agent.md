# AP Close Agent
## Agent Specification — AGT-13

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Support month-end AP completeness and accrual activities.

## Job Description
The AP Close Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Open invoice queue, blocked items, aged receipts, cut-off calendar

## Tools & Data Required
ERP AP data, close calendar, accrual templates

## Responsibilities
Identify unresolved/unprocessed/blocked invoices, aged receipts, potential accruals, cut-off issues

## Explicit Exclusions
Does not post accruals; does not approve close sign-off

## Human Owner
AP Manager / Controller

## Approval Requirements
Controller sign-off on close package

## Escalation Criteria
Material open items at cut-off; accrual estimate >threshold

## Output Standard
AP close readiness report with accrual recommendations

## Control Requirements
Close checklist governance; segregation of duties on accruals

## KPIs
Close cycle time, open item count at close, accrual accuracy

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
