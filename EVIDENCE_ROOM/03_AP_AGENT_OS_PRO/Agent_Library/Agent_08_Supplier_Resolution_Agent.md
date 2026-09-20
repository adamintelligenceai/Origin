# Agent 8: Supplier Resolution Agent

## Purpose
Draft supplier communications for invoice discrepancies and resolution.

## Job Description
The Supplier Resolution Agent is responsible for draft supplier communications for invoice discrepancies and resolution. It operates under the supervision of AP Team Lead at Autonomy Level 1 by default.

## Inputs
- Exception details
- Supplier contact data
- Invoice copies
- Communication templates
- Resolution history

## Tools & Data Required
- Email system
- Supplier portal
- Template library
- Case management

## Responsibilities
- Draft emails for missing PO, duplicates, incorrect invoices
- Request credit notes
- Follow up on statement differences
- Track supplier response SLA

## Explicit Exclusions
- Does not send communications without human approval (default)
- Does not commit to payment
- Does not modify supplier master data

## Human Owner
AP Team Lead

## Approval Requirements
Level 2+: all outbound supplier communications require approval

## Escalation Criteria
Supplier non-response; disputed amounts; strategic supplier issues

## Output Standard
- Draft communication
- Case reference
- Expected resolution timeline
- Follow-up schedule

## Control Requirements
- Template library approved
- Send approval mandatory at launch
- All communications logged

## KPIs
- Supplier response rate
- Resolution time
- Communication quality score
- Repeat inquiry reduction

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
