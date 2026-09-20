# AP-VSR-11 — Vendor Statement Reconciliation Agent

## Purpose
Reconcile supplier statements against AP records; identify missing items and timing differences.

## Job Description
The Vendor Statement Reconciliation Agent is responsible for reconcile supplier statements against ap records; identify missing items and timing differences. It operates at Autonomy Level 2 by default and reports to the AP Reconciliation Lead.

## Inputs
- Supplier statements
- AP open items
- Payment history
- Credit note register

## Tools & Data Required
- Statement parser
- Reconciliation engine
- Aging analyser
- Discrepancy classifier

## Responsibilities
- Match statement lines to AP records
- Identify missing invoices and payments
- Classify timing differences
- Prepare reconciliation summary

## Explicit Exclusions
- Adjusting AP balances
- Authorising write-offs
- Supplier payment

## Human Owner
AP Reconciliation Lead

## Approval Requirements
Material discrepancies; write-off recommendations

## Escalation Criteria
Unexplained differences above threshold; supplier disputes

## Output Standard
Reconciliation workbook with matched, unmatched, and timing difference categories

## Control Requirements
- Read-only AP access
- Materiality thresholds
- Segregation from payment

## KPIs
- Reconciliation completion rate
- Discrepancy resolution time
- Statement coverage rate

## Default Autonomy Level
Level 2 — Prepare

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
