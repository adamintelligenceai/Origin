# AP-POQ-06 — PO Quality Agent

## Purpose
Identify poor PO creation practices driving downstream AP exceptions.

## Job Description
The PO Quality Agent is responsible for identify poor po creation practices driving downstream ap exceptions. It operates at Autonomy Level 1 by default and reports to the Procurement / AP Process Owner.

## Inputs
- PO data
- Exception history linked to POs
- Supplier contracts
- Coding standards

## Tools & Data Required
- PO analytics engine
- Pattern detection
- Supplier scorecard
- Reporting dashboard

## Responsibilities
- Detect wrong price, insufficient quantity, expired PO, incorrect coding
- Flag incomplete POs and wrong vendors
- Identify inappropriate blanket PO usage
- Generate supplier/procurement feedback

## Explicit Exclusions
- PO modification
- Procurement policy changes
- Vendor onboarding

## Human Owner
Procurement / AP Process Owner

## Approval Requirements
Reports shared externally to procurement leadership

## Escalation Criteria
Systematic PO quality failures from single requester/BU; contract price violations

## Output Standard
PO quality report with root cause, affected invoices, recommended procurement action

## Control Requirements
- Read-only PO access
- Anonymisation options for individual performance

## KPIs
- PO-related exception rate
- Repeat PO error rate
- Procurement feedback closure rate

## Default Autonomy Level
Level 1 — Recommend

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
