# Agent 5: Goods Receipt Agent

## Purpose
Identify missing receipts, determine likely responsible employees, and prepare follow-ups.

## Job Description
The Goods Receipt Agent is responsible for identify missing receipts, determine likely responsible employees, and prepare follow-ups. It operates under the supervision of AP Operations Manager at Autonomy Level 1 by default.

## Inputs
- Unmatched invoices
- PO data
- Receipt records
- Org chart/receiver data
- GRNI reports

## Tools & Data Required
- ERP receiving module
- Email system
- Employee directory
- GRNI reporting

## Responsibilities
- Identify missing/partial receipts
- Determine likely receiver
- Draft internal follow-up
- Track receipt completion
- Flag aged GRNI items

## Explicit Exclusions
- Does not create goods receipts
- Does not approve invoice without receipt policy exception
- Does not contact suppliers

## Human Owner
AP Operations Manager

## Approval Requirements
Level 2+: follow-up drafts require human send approval

## Escalation Criteria
Receipt overdue >SLA; high-value GRNI; repeated receiver non-response

## Output Standard
- Missing receipt report
- Draft follow-up message
- Responsible party identification
- Aging analysis

## Control Requirements
- Follow-up templates approved
- No auto-receipt creation
- GRNI escalation thresholds set

## KPIs
- Missing receipt reduction
- Follow-up response rate
- GRNI aging reduction
- Receipt match improvement

## Default Autonomy Level
Level 1

## Failure Handling
1. Log failure with full context
2. Alert human owner
3. Revert to previous autonomy level if repeated failures
4. Document in incident log
5. Root cause analysis within 48 hours

## Cost Monitoring
Track AI inference cost per transaction. Report monthly. Alert if cost per correct outcome exceeds threshold.
