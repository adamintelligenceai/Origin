# Internal Follow-Up Agent
## Agent Specification — AGT-09

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Draft and manage internal follow-ups for AP exceptions.

## Job Description
The Internal Follow-Up Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Exception details, employee directory, internal templates

## Tools & Data Required
Email/Teams integration, task management, template library

## Responsibilities
Follow up on missing GR, incorrect PO, approvals, coding, requester clarification, business-owner action

## Explicit Exclusions
Does not approve; does not modify ERP records

## Human Owner
AP Operations Lead

## Approval Requirements
Human approval for follow-up dispatch

## Escalation Criteria
No response after 2 follow-ups; executive-level blocker

## Output Standard
Draft internal communication with tracking ID and SLA

## Control Requirements
Approval before send; internal communication logging

## KPIs
Internal response rate, resolution time, repeat follow-up rate

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
