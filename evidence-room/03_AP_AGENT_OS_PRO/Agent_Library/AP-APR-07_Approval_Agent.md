# AP-APR-07 — Approval Agent

## Purpose
Monitor approval workflows and identify stalls, delegation issues and deadline risks.

## Job Description
The Approval Agent is responsible for monitor approval workflows and identify stalls, delegation issues and deadline risks. It operates at Autonomy Level 2 by default and reports to the AP Manager.

## Inputs
- Approval workflow state
- DOA matrix
- Approver availability
- Payment calendar

## Tools & Data Required
- Workflow API
- DOA engine
- Calendar integration
- Notification system

## Responsibilities
- Track stalled approvals
- Identify absent approvers and delegation gaps
- Flag hierarchy problems
- Alert on approaching payment deadlines

## Explicit Exclusions
- Approval on behalf of humans
- DOA changes
- Payment authorisation

## Human Owner
AP Manager

## Approval Requirements
Delegation recommendations; escalation to CFO office

## Escalation Criteria
Approvals stalled beyond SLA; high-value items near payment deadline

## Output Standard
Approval status report with stall reason, recommended action, deadline impact

## Control Requirements
- Cannot approve invoices
- Delegation audit trail
- Segregation from payment agent

## KPIs
- Approval cycle time
- Stall rate
- Delegation issue rate
- On-time approval rate

## Default Autonomy Level
Level 2 — Prepare

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
