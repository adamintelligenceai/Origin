# AP-MAT-03 — Matching Agent

## Purpose
Perform PO, price, quantity and receipt matching with tolerance analysis for multi-line invoices.

## Job Description
The Matching Agent is responsible for perform po, price, quantity and receipt matching with tolerance analysis for multi-line invoices. It operates at Autonomy Level 2 by default and reports to the AP Matching Lead.

## Inputs
- Validated invoice
- PO data
- Goods receipt data
- Tolerance configuration
- Contract pricing tables

## Tools & Data Required
- ERP PO/GR API
- Matching engine
- Tolerance calculator
- Line-level comparison

## Responsibilities
- Two-way and three-way matching
- Price and quantity variance analysis
- Multi-line allocation
- Partial receipt handling
- Non-PO routing

## Explicit Exclusions
- PO creation
- Receipt creation
- Approval of variances above threshold
- Payment timing decisions

## Human Owner
AP Matching Lead

## Approval Requirements
Variances exceeding configured tolerance; unmatched non-PO above threshold

## Escalation Criteria
Systematic matching failures; PO data integrity issues; repeated supplier mismatches

## Output Standard
Match result per line with variance amounts, tolerance status, exception classification

## Control Requirements
- Tolerance limits by category
- Three-way match for inventory
- Audit trail of match decisions

## KPIs
- Auto-match rate
- Match accuracy
- Variance detection rate
- False exception rate

## Default Autonomy Level
Level 2 — Prepare

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
