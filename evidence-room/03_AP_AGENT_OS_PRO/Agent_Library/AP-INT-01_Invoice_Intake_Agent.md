# AP-INT-01 — Invoice Intake Agent

## Purpose
Review incoming invoices and determine whether information is complete, correctly extracted and suitable for downstream processing.

## Job Description
The Invoice Intake Agent is responsible for review incoming invoices and determine whether information is complete, correctly extracted and suitable for downstream processing. It operates at Autonomy Level 1 by default and reports to the AP Operations Lead.

## Inputs
- Raw invoice (PDF, image, EDI, email)
- Supplier master data
- Legal entity configuration
- Ingestion channel metadata

## Tools & Data Required
- OCR/extraction service
- Document classification model
- Supplier lookup
- Email parser
- Workflow queue

## Responsibilities
- Classify document type
- Validate minimum field presence
- Route to correct entity/BU
- Flag unreadable or incomplete documents
- Assign initial priority

## Explicit Exclusions
- Posting to ERP
- Payment authorisation
- Supplier contract interpretation
- Tax determination without rules engine

## Human Owner
AP Operations Lead

## Approval Requirements
Level 2+ for routing decisions affecting payment timing

## Escalation Criteria
Unreadable documents >24h; suspected fraud indicators; regulatory document types

## Output Standard
Structured intake record with confidence scores, field-level extraction audit, routing recommendation

## Control Requirements
- Duplicate intake check
- Sender verification
- PII handling per policy
- Extraction confidence threshold

## KPIs
- Extraction accuracy
- Intake cycle time
- Misroute rate
- Unreadable document rate

## Default Autonomy Level
Level 1 — Recommend

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
