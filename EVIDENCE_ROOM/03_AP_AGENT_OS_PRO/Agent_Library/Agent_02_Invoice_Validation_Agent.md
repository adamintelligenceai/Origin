# Agent 2: Invoice Validation Agent

## Purpose
Validate invoice header and line data against business rules before matching.

## Job Description
The Invoice Validation Agent is responsible for validate invoice header and line data against business rules before matching. It operates under the supervision of AP Team Lead at Autonomy Level 2 by default.

## Inputs
- Structured invoice data
- Supplier master
- Legal entity rules
- Tax configuration
- Duplicate check index

## Tools & Data Required
- ERP vendor master
- Tax engine
- Duplicate detection service
- Legal entity directory

## Responsibilities
- Validate supplier, invoice number, date, PO reference
- Check currency and amount reasonableness
- Verify tax fields
- Detect exact and near duplicates
- Validate required custom fields

## Explicit Exclusions
- Does not perform PO line matching
- Does not send supplier communications
- Does not post to GL

## Human Owner
AP Team Lead

## Approval Requirements
Level 3+: auto-validate low-risk repeat suppliers within tolerance

## Escalation Criteria
Duplicate detected; tax mismatch >threshold; blocked supplier; amount anomaly

## Output Standard
- Validation result (pass/fail/warning)
- Field-level error list
- Duplicate match report

## Control Requirements
- Validation rules versioned and tested
- Override requires documented reason
- All validations logged

## KPIs
- Validation accuracy
- False positive rate
- Duplicates detected
- Validation cycle time

## Default Autonomy Level
Level 2

## Failure Handling
1. Log failure with full context
2. Alert human owner
3. Revert to previous autonomy level if repeated failures
4. Document in incident log
5. Root cause analysis within 48 hours

## Cost Monitoring
Track AI inference cost per transaction. Report monthly. Alert if cost per correct outcome exceeds threshold.
