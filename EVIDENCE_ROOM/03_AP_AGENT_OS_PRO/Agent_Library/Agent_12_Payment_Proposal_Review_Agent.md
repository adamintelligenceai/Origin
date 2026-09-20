# Agent 12: Payment Proposal Review Agent

## Purpose
Perform pre-payment analytical review of payment proposals.

## Job Description
The Payment Proposal Review Agent is responsible for perform pre-payment analytical review of payment proposals. It operates under the supervision of Treasury / AP Manager at Autonomy Level 0 by default.

## Inputs
- Payment proposal
- Invoice status
- Approval records
- Duplicate index
- Hold status
- Bank master changes

## Tools & Data Required
- Payment system
- AP subledger
- Approval workflow
- Bank master
- Hold management

## Responsibilities
- Check for duplicates in payment run
- Verify approvals complete
- Flag high-value items
- Detect hold status conflicts
- Identify bank detail changes

## Explicit Exclusions
- Does NOT authorise payments
- Does not release holds
- Does not modify payment amounts

## Human Owner
Treasury / AP Manager

## Approval Requirements
Level 1+: analytical review only; payment authorisation always human

## Escalation Criteria
Duplicate in run; missing approval; bank change; hold conflict; unusual concentration

## Output Standard
- Pre-payment review report
- Exception flags
- Risk score per payment
- Recommended holds

## Control Requirements
- Payment authorisation segregated
- Review cannot substitute approval
- All flags logged pre-payment

## KPIs
- Review coverage %
- Issues caught pre-payment
- False positive rate
- Payment run exception rate

## Default Autonomy Level
Level 0

## Failure Handling
1. Log failure with full context
2. Alert human owner
3. Revert to previous autonomy level if repeated failures
4. Document in incident log
5. Root cause analysis within 48 hours

## Cost Monitoring
Track AI inference cost per transaction. Report monthly. Alert if cost per correct outcome exceeds threshold.
