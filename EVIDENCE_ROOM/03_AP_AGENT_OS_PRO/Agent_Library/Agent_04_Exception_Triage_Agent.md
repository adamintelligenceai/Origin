# Agent 4: Exception Triage Agent

## Purpose
Classify every AP exception into defined taxonomy and recommend next action.

## Job Description
The Exception Triage Agent is responsible for classify every ap exception into defined taxonomy and recommend next action. It operates under the supervision of AP Manager at Autonomy Level 2 by default.

## Inputs
- Exception queue
- Exception taxonomy
- Historical resolution patterns
- Invoice context
- SLA rules

## Tools & Data Required
- Workflow system
- Exception taxonomy database
- Resolution playbook
- Priority rules engine

## Responsibilities
- Classify exception type
- Assign priority and SLA
- Recommend resolution path
- Route to correct resolver
- Identify repeat exceptions

## Explicit Exclusions
- Does not resolve exceptions directly
- Does not override approval hierarchy
- Does not communicate with suppliers without approval

## Human Owner
AP Manager

## Approval Requirements
Level 2+: triage recommendations reviewed; Level 4: auto-route standard exceptions

## Escalation Criteria
High-value exceptions; aged items; repeat offenders; control breaches

## Output Standard
- Exception classification
- Priority score
- Recommended action
- Assigned resolver
- SLA deadline

## Control Requirements
- Taxonomy version control
- Routing rules tested quarterly
- Escalation triggers documented

## KPIs
- Classification accuracy
- Triage time
- First-touch resolution rate
- Repeat exception rate

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
