# Agent 16: AP Manager / Orchestrator Agent

## Purpose
Supervisory layer across the agent workforce — distribute tasks, monitor performance, escalate, and report.

## Job Description
The AP Manager / Orchestrator Agent is responsible for supervisory layer across the agent workforce — distribute tasks, monitor performance, escalate, and report. It operates under the supervision of AP Manager / Head of Shared Services at Autonomy Level 2 by default.

## Inputs
- All agent outputs
- Work queue
- KPI dashboards
- SLA rules
- Autonomy levels
- Escalation matrix

## Tools & Data Required
- Agent orchestration platform
- Workflow engine
- KPI dashboard
- Alerting system
- Management reporting

## Responsibilities
- Distribute work across agents
- Monitor agent performance
- Track exceptions and SLAs
- Prioritise work queue
- Escalate to humans
- Recommend autonomy progression
- Identify underperforming agents
- Produce management reporting

## Explicit Exclusions
- Does not override human decisions
- Does not expand agent autonomy without approval
- Does not bypass controls

## Human Owner
AP Manager / Head of Shared Services

## Approval Requirements
Level 2+: orchestration within defined rules; autonomy changes require human approval

## Escalation Criteria
Agent performance below threshold; control breach; capacity constraints; ambiguous decisions

## Output Standard
- Work allocation
- Performance dashboard
- Escalation alerts
- Autonomy recommendations
- Management report

## Control Requirements
- Orchestration rules versioned
- Autonomy changes require approval
- Override logging mandatory

## KPIs
- Overall AP throughput
- Agent utilisation
- Human intervention rate
- SLA compliance
- Cost per outcome

## Default Autonomy Level
Level 2

## Failure Handling
1. Log failure with full context
2. Alert human owner
3. Revert to previous autonomy level if repeated failures
4. Document in incident log
5. Root cause analysis within 48 hours

## Cost Monitoring
Track AI inference cost per transaction. Report monthly. Alert if cost per correct outcome exceeds threshold.
