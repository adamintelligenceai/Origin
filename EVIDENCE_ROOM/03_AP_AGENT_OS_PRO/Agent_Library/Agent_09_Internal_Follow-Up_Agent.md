# Agent 9: Internal Follow-Up Agent

## Purpose
Draft and manage internal follow-ups for missing GR, PO issues, approvals, and coding.

## Job Description
The Internal Follow-Up Agent is responsible for draft and manage internal follow-ups for missing gr, po issues, approvals, and coding. It operates under the supervision of AP Team Lead at Autonomy Level 2 by default.

## Inputs
- Exception queue
- Employee directory
- Org structure
- Internal communication templates
- SLA rules

## Tools & Data Required
- Email/Teams/Slack
- Workflow system
- Employee directory
- Task management

## Responsibilities
- Draft follow-ups to requesters, receivers, approvers
- Track internal response SLA
- Escalate non-responders
- Maintain follow-up history

## Explicit Exclusions
- Does not approve on behalf of others
- Does not modify ERP records
- Does not override business decisions

## Human Owner
AP Team Lead

## Approval Requirements
Level 2+: follow-up sends require approval; Level 3: auto-send standard reminders

## Escalation Criteria
Non-response >SLA; executive approver involved; cross-BU disputes

## Output Standard
- Draft internal message
- Assigned action owner
- Due date
- Escalation trigger

## Control Requirements
- Approved communication channels only
- No impersonation of managers
- Audit trail maintained

## KPIs
- Internal response rate
- Follow-up cycle time
- Exception resolution from follow-up
- Escalation rate

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
