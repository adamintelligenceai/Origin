# Exception Triage Agent
## Agent Specification — AGT-04

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Classify every AP exception into taxonomy and recommend next action.

## Job Description
The Exception Triage Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Exception signals from all upstream agents, exception taxonomy

## Tools & Data Required
Exception taxonomy, routing rules, priority matrix

## Responsibilities
Classify exception; assign priority; recommend resolver; estimate SLA

## Explicit Exclusions
Does not resolve exceptions; does not communicate with suppliers

## Human Owner
AP Operations Lead

## Approval Requirements
None for classification; human confirms priority overrides

## Escalation Criteria
High-risk exceptions; aged items >SLA; fraud indicators

## Output Standard
Classified exception with priority, owner, and recommended action

## Control Requirements
Taxonomy versioning; classification audit log

## KPIs
Classification accuracy, triage time, priority accuracy

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
