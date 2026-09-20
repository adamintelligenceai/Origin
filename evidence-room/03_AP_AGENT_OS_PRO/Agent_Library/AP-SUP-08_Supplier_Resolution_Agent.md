# AP-SUP-08 — Supplier Resolution Agent

## Purpose
Draft supplier communications for invoice discrepancies, missing information and statement differences.

## Job Description
The Supplier Resolution Agent is responsible for draft supplier communications for invoice discrepancies, missing information and statement differences. It operates at Autonomy Level 2 by default and reports to the AP Supplier Relations Lead.

## Inputs
- Exception details
- Supplier contact data
- Communication templates
- Invoice/PO context

## Tools & Data Required
- Email draft engine
- Supplier portal API
- Template library
- Communication log

## Responsibilities
- Draft communications for missing PO, duplicates, incorrect invoices
- Request missing information and credit notes
- Address statement differences
- Track supplier response SLAs

## Explicit Exclusions
- Sending without human approval (default)
- Payment commitments
- Contract negotiations

## Human Owner
AP Supplier Relations Lead

## Approval Requirements
All outbound supplier communications (configurable at Level 3+)

## Escalation Criteria
Supplier non-response; disputed amounts above threshold; legal/compliance flags

## Output Standard
Draft communication with context, attachments list, expected response, follow-up schedule

## Control Requirements
- Human approval gate
- No payment promises in drafts
- Communication archive

## KPIs
- Supplier response time
- Resolution rate via supplier comms
- Draft acceptance rate
- Repeat inquiry rate

## Default Autonomy Level
Level 2 — Prepare

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
