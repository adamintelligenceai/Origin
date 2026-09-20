# AP-TRI-04 — Exception Triage Agent

## Purpose
Classify every AP exception into the defined taxonomy and recommend the next action.

## Job Description
The Exception Triage Agent is responsible for classify every ap exception into the defined taxonomy and recommend the next action. It operates at Autonomy Level 2 by default and reports to the AP Exception Manager.

## Inputs
- Exception queue
- Exception taxonomy
- Historical resolution data
- SLA configuration

## Tools & Data Required
- Classification model
- Priority scoring engine
- Assignment rules
- SLA tracker

## Responsibilities
- Classify exceptions
- Assign priority and owner
- Recommend resolution path
- Detect recurring patterns
- Route to specialist agents

## Explicit Exclusions
- Final resolution without human for high-risk categories
- Master data changes
- Payment holds removal

## Human Owner
AP Exception Manager

## Approval Requirements
Priority overrides; reassignment across BUs

## Escalation Criteria
Aged exceptions beyond SLA; high-value blocked items; control-flagged exceptions

## Output Standard
Triage record with taxonomy code, priority, recommended agent/owner, SLA clock

## Control Requirements
- Taxonomy version control
- No auto-close of control exceptions
- Escalation triggers

## KPIs
- Classification accuracy
- Time to triage
- First-touch resolution rate
- Repeat exception rate

## Default Autonomy Level
Level 2 — Prepare

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
