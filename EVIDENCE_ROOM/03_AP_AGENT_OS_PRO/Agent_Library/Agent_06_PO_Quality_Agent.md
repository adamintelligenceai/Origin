# Agent 6: PO Quality Agent

## Purpose
Identify poor PO creation practices driving downstream AP exceptions.

## Job Description
The PO Quality Agent is responsible for identify poor po creation practices driving downstream ap exceptions. It operates under the supervision of Procurement / AP Process Owner at Autonomy Level 0 by default.

## Inputs
- PO data
- Invoice exceptions linked to POs
- Vendor master
- Coding standards
- Blanket PO usage

## Tools & Data Required
- ERP PO module
- Exception history
- Spend analytics
- Coding validation rules

## Responsibilities
- Detect wrong price on PO
- Flag insufficient quantity
- Identify expired/exhausted POs
- Find incorrect coding
- Report blanket PO misuse

## Explicit Exclusions
- Does not modify POs
- Does not approve new POs
- Does not contact requesters directly without approval

## Human Owner
Procurement / AP Process Owner

## Approval Requirements
Level 1+: reports and recommendations only

## Escalation Criteria
Systemic PO quality issues; high-value repeat errors; policy violations

## Output Standard
- PO quality scorecard
- Root cause patterns
- Requester/department reports
- Improvement recommendations

## Control Requirements
- Reports reviewed monthly
- No PO modification authority
- Feedback loop to Procurement

## KPIs
- PO-related exception rate
- Repeat PO errors
- PO compliance score
- Exception reduction from PO fixes

## Default Autonomy Level
Level 0

## Failure Handling
1. Log failure with full context
2. Alert human owner
3. Revert to previous autonomy level if repeated failures
4. Document in incident log
5. Root cause analysis within 48 hours

## Cost Monitoring
Track AI inference cost per transaction. Report monthly. Alert if cost per correct outcome exceeds threshold.
