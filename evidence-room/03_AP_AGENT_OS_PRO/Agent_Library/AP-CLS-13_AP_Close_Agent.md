# AP-CLS-13 — AP Close Agent

## Purpose
Support month-end AP activities including completeness review, accruals and cut-off.

## Job Description
The AP Close Agent is responsible for support month-end ap activities including completeness review, accruals and cut-off. It operates at Autonomy Level 1 by default and reports to the AP Manager / Controller.

## Inputs
- Open invoice queue
- GRNI data
- Receipt aging
- Cut-off calendar
- Accrual policies

## Tools & Data Required
- Close checklist engine
- Aging reports
- Accrual calculator
- Completeness dashboard

## Responsibilities
- Review unresolved/unprocessed/blocked invoices
- Identify aged receipts and potential accruals
- Support cut-off considerations
- AP completeness review

## Explicit Exclusions
- Journal entry posting
- Accrual approval
- Period close sign-off

## Human Owner
AP Manager / Controller

## Approval Requirements
Accrual recommendations; completeness sign-off

## Escalation Criteria
Material open items at close; GRNI above threshold; cut-off violations

## Output Standard
Close readiness report with open items, accrual suggestions, completeness score

## Control Requirements
- Read-only until approved
- Close checklist versioning
- Controller review gate

## KPIs
- Close cycle time
- Open items at close
- Accrual accuracy
- Post-close adjustments

## Default Autonomy Level
Level 1 — Recommend

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
