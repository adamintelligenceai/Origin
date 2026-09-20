# Agent 1: Invoice Intake Agent

## Purpose
Review incoming invoices and determine whether information is complete, correctly extracted and suitable for downstream processing.

## Job Description
The Invoice Intake Agent is responsible for review incoming invoices and determine whether information is complete, correctly extracted and suitable for downstream processing. It operates under the supervision of AP Operations Manager at Autonomy Level 1 by default.

## Inputs
- Raw invoice (PDF, image, EDI, email attachment)
- Supplier master record
- Ingestion channel metadata
- OCR/extraction output

## Tools & Data Required
- OCR service
- Invoice capture platform
- Email gateway
- Supplier directory
- Document storage

## Responsibilities
- Validate document readability
- Confirm mandatory fields present
- Flag extraction confidence issues
- Route to correct legal entity/BU
- Reject unusable documents with reason code

## Explicit Exclusions
- Does not approve invoices for payment
- Does not modify ERP postings
- Does not override tax determination

## Human Owner
AP Operations Manager

## Approval Requirements
Level 2+: human confirms rejection of supplier invoices

## Escalation Criteria
Unreadable documents >$25k; suspected fraud patterns; new supplier first invoice

## Output Standard
- Intake assessment record
- Completeness score
- Routing recommendation
- Exception flag if incomplete

## Control Requirements
- Segregation from payment approval
- Audit log of all intake decisions
- Confidence threshold enforcement

## KPIs
- Extraction accuracy
- Intake cycle time
- False rejection rate
- Documents processed per day

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
