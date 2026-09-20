# Root Cause Agent
## Agent Specification — AGT-15

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Analyse recurring exceptions to identify systemic causes.

## Job Description
The Root Cause Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Exception history, resolution data, process maps, master data quality metrics

## Tools & Data Required
Analytics engine, process documentation, trend analysis

## Responsibilities
Identify patterns in supplier quality, PO discipline, employee behaviour, receipt discipline, system config, master data, approval structures

## Explicit Exclusions
Does not implement fixes; recommends only

## Human Owner
Process Excellence / AP Manager

## Approval Requirements
Human prioritises improvement initiatives

## Escalation Criteria
Systemic issue affecting >10% of exceptions

## Output Standard
Root cause analysis report with Pareto breakdown and improvement recommendations

## Control Requirements
Analysis methodology versioning; recommendation tracking

## KPIs
Repeat exception rate reduction, root cause identification accuracy

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
