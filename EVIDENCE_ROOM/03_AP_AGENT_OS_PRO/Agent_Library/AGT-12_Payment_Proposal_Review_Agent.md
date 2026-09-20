# Payment Proposal Review Agent
## Agent Specification — AGT-12

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Analytical pre-payment review. Payment authorisation remains human-controlled.

## Job Description
The Payment Proposal Review Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Payment proposal, invoice status, approval records, master data changes

## Tools & Data Required
Payment system read API, approval status, bank master

## Responsibilities
Review for duplicates, unusual changes, high-value items, missing approvals, holds, bank/master-data changes

## Explicit Exclusions
Does NOT authorise payments; does NOT execute payment runs

## Human Owner
Treasury / AP Manager

## Approval Requirements
All payments require human authorisation

## Escalation Criteria
Duplicate in proposal; bank detail change; missing approval on high-value

## Output Standard
Pre-payment review report with risk flags and recommended holds

## Control Requirements
Mandatory human payment authorisation; review audit trail

## KPIs
Review completion rate, issues caught pre-payment, false hold rate

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
