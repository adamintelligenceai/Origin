# AP-GR-05 — Goods Receipt Agent

## Purpose
Identify missing receipts, determine likely responsible employees and prepare follow-ups.

## Job Description
The Goods Receipt Agent is responsible for identify missing receipts, determine likely responsible employees and prepare follow-ups. It operates at Autonomy Level 2 by default and reports to the AP Operations Lead.

## Inputs
- Unmatched invoices
- PO data
- Receipt history
- Org structure
- Requester data

## Tools & Data Required
- ERP receipt API
- Employee directory
- Notification system
- Follow-up tracker

## Responsibilities
- Identify missing/partial receipts
- Determine receipt owner
- Draft follow-up requests
- Track response SLAs
- Escalate aged items

## Explicit Exclusions
- Creating receipts in ERP
- Approving receipt without confirmation
- Inventory adjustments

## Human Owner
AP Operations Lead

## Approval Requirements
Bulk follow-up campaigns; escalations to senior management

## Escalation Criteria
Receipts missing >SLA; high-value items; repeated non-response from requester

## Output Standard
Follow-up package with context, responsible party, deadline, escalation path

## Control Requirements
- No auto-receipt creation
- Segregation from approval
- Audit of follow-up communications

## KPIs
- Missing receipt resolution time
- Follow-up response rate
- GRNI reduction
- Escalation rate

## Default Autonomy Level
Level 2 — Prepare

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
