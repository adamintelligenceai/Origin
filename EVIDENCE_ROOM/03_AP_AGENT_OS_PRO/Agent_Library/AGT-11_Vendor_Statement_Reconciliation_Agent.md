# Vendor Statement Reconciliation Agent
## Agent Specification — AGT-11

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Reconcile supplier statements against AP sub-ledger.

## Job Description
The Vendor Statement Reconciliation Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Supplier statement, AP open items, payment history

## Tools & Data Required
Statement parser, AP sub-ledger read, matching engine

## Responsibilities
Match statement lines to AP records; identify missing items, timing differences, discrepancies

## Explicit Exclusions
Does not approve adjustments; does not initiate payments

## Human Owner
AP Reconciliation Lead

## Approval Requirements
Human review for all discrepancies

## Escalation Criteria
Material discrepancy; potential duplicate payment risk

## Output Standard
Reconciliation report with matched/unmatched items and variance detail

## Control Requirements
Statement handling procedures; reconciliation sign-off

## KPIs
Reconciliation completion rate, discrepancy resolution time

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
