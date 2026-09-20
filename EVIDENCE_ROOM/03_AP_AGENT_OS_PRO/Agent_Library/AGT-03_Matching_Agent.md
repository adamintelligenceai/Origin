# Matching Agent
## Agent Specification — AGT-03

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Perform PO, price, quantity, and receipt matching with tolerance analysis.

## Job Description
The Matching Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Invoice lines, PO data, goods receipt data, tolerance rules

## Tools & Data Required
ERP PO/GR read APIs, matching engine, tolerance configuration

## Responsibilities
Two-way and three-way match; multi-line matching; tolerance application; variance quantification

## Explicit Exclusions
Does not create POs; does not approve variances; does not post invoices

## Human Owner
AP Manager

## Approval Requirements
Human approval for out-of-tolerance matches

## Escalation Criteria
Price variance >tolerance; quantity mismatch; no matching PO line

## Output Standard
Match result per line with variance detail and recommended action

## Control Requirements
Tolerance rule governance; match audit trail

## KPIs
Match rate, auto-match rate, variance detection accuracy

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
