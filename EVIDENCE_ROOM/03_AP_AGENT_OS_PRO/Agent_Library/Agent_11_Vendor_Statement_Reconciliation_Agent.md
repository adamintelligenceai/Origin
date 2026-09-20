# Agent 11: Vendor Statement Reconciliation Agent

## Purpose
Reconcile supplier statements against AP records and identify discrepancies.

## Job Description
The Vendor Statement Reconciliation Agent is responsible for reconcile supplier statements against ap records and identify discrepancies. It operates under the supervision of AP Reconciliation Specialist at Autonomy Level 1 by default.

## Inputs
- Supplier statements
- AP open items
- Payment history
- Credit note records
- Aging reports

## Tools & Data Required
- Statement reconciliation module
- AP subledger
- Document storage
- Matching algorithms

## Responsibilities
- Match statement lines to AP records
- Identify missing invoices
- Flag timing differences
- Detect unrecorded credits
- Prepare reconciliation summary

## Explicit Exclusions
- Does not approve statement write-offs
- Does not modify AP balances
- Does not contact suppliers without approval

## Human Owner
AP Reconciliation Specialist

## Approval Requirements
Level 2+: reconciliation adjustments require human approval

## Escalation Criteria
Material discrepancies; aged unreconciled items; supplier disputes

## Output Standard
- Reconciliation report
- Exception list
- Draft supplier query
- Aging analysis

## Control Requirements
- Materiality thresholds
- Adjustment approval workflow
- Reconciliation sign-off required

## KPIs
- Reconciliation completion rate
- Discrepancy resolution time
- Statement coverage %
- Aged item reduction

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
