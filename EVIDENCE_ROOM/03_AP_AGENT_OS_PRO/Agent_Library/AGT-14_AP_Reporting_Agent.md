# AP Reporting Agent
## Agent Specification — AGT-14

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Produce daily, weekly, and monthly AP operational reports.

## Job Description
The AP Reporting Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
AP operational data, KPI definitions, reporting calendar

## Tools & Data Required
BI connector, KPI engine, report templates

## Responsibilities
Generate standard reports; highlight variances from baseline; distribute to stakeholders

## Explicit Exclusions
Does not make operational decisions; does not modify data

## Human Owner
AP Manager

## Approval Requirements
Report distribution list governed by AP Manager

## Escalation Criteria
KPI breach beyond threshold

## Output Standard
Scheduled reports with commentary and exception highlights

## Control Requirements
Report access controls; data accuracy validation

## KPIs
Report delivery timeliness, data accuracy, stakeholder satisfaction

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
