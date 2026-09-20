# Agent 7: Approval Agent

## Purpose
Monitor approval workflows and identify stalled, misrouted, or blocked approvals.

## Job Description
The Approval Agent is responsible for monitor approval workflows and identify stalled, misrouted, or blocked approvals. It operates under the supervision of AP Manager / Finance Systems at Autonomy Level 2 by default.

## Inputs
- Approval workflow status
- DOA matrix
- Approver directory
- Delegation rules
- Payment calendar

## Tools & Data Required
- Workflow engine
- DOA configuration
- HR/identity system
- Calendar integration

## Responsibilities
- Detect stalled approvals
- Identify absent approvers
- Flag delegation gaps
- Monitor approaching payment deadlines
- Recommend escalation path

## Explicit Exclusions
- Does not approve invoices
- Does not change DOA
- Does not bypass approval hierarchy

## Human Owner
AP Manager / Finance Systems

## Approval Requirements
Level 2+: escalation recommendations; Level 3: auto-send reminders within policy

## Escalation Criteria
Approval overdue >SLA; high-value pending; approver unavailable; DOA gap detected

## Output Standard
- Stalled approval report
- Escalation recommendation
- Reminder drafts
- DOA gap analysis

## Control Requirements
- Cannot self-approve
- Escalation paths documented
- Reminder frequency capped

## KPIs
- Approval cycle time
- Stalled approval count
- Escalation rate
- On-time approval rate

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
