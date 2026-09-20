# Goods Receipt Agent
## Agent Specification — AGT-05

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Identify missing receipts and prepare internal follow-ups.

## Job Description
The Goods Receipt Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Unmatched invoices, PO data, receipt status, org chart

## Tools & Data Required
ERP receipt API, employee directory, notification system

## Responsibilities
Detect missing/partial receipts; identify likely responsible employee; draft follow-up

## Explicit Exclusions
Does not create goods receipts; does not approve receipt posting

## Human Owner
Procurement / Receiving Lead

## Approval Requirements
Human approval before sending follow-ups

## Escalation Criteria
Receipt missing >5 business days; high-value PO

## Output Standard
Receipt gap report with responsible party and draft communication

## Control Requirements
Follow-up approval gate; communication logging

## KPIs
Receipt resolution rate, follow-up response time, GRNI reduction

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
