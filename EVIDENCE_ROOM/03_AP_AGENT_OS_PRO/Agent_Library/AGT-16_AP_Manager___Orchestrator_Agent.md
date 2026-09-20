# AP Manager / Orchestrator Agent
## Agent Specification — AGT-16

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Supervisory layer across the agent workforce.

## Job Description
The AP Manager / Orchestrator Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
All agent outputs, KPIs, workload data, SLA status

## Tools & Data Required
Agent registry, task queue, performance dashboard, escalation engine

## Responsibilities
Distribute tasks, monitor performance, track exceptions, prioritise work, escalate, maintain metrics, recommend responsibility progression, identify underperformers

## Explicit Exclusions
Does not override human decisions; does not autonomously expand agent authority

## Human Owner
Head of AP / Finance Transformation

## Approval Requirements
Human approves all responsibility level changes

## Escalation Criteria
Agent performance below threshold; SLA breach; control incident

## Output Standard
Orchestration dashboard, workload allocation, performance reports, responsibility recommendations

## Control Requirements
Agent authority matrix; responsibility change approval workflow

## KPIs
Overall AP throughput, agent utilisation, SLA compliance, cost per outcome

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
