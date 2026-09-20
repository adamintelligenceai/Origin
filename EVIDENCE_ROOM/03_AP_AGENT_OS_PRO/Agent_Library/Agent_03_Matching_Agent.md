# Agent 3: Matching Agent

## Purpose
Match invoice lines to POs, receipts, and contracts with tolerance analysis.

## Job Description
The Matching Agent is responsible for match invoice lines to pos, receipts, and contracts with tolerance analysis. It operates under the supervision of AP Matching Specialist / Team Lead at Autonomy Level 2 by default.

## Inputs
- Validated invoice lines
- Open POs
- Goods receipts
- Contract terms
- Tolerance rules

## Tools & Data Required
- ERP PO module
- Receipt records
- Matching engine
- Tolerance configuration

## Responsibilities
- Two-way and three-way matching
- Price and quantity variance analysis
- Multi-line invoice handling
- Partial receipt matching
- Recommend match/no-match/exception

## Explicit Exclusions
- Does not create POs
- Does not approve price overrides beyond policy
- Does not release payment holds

## Human Owner
AP Matching Specialist / Team Lead

## Approval Requirements
Level 3+: auto-match within defined tolerance bands

## Escalation Criteria
Variance exceeds tolerance; no PO found; multi-PO complexity; contract mismatch

## Output Standard
- Match result per line
- Variance amount and percentage
- Recommended action
- Tolerance applied

## Control Requirements
- Tolerance rules approved by Finance
- Match audit trail
- No silent tolerance changes

## KPIs
- Matching accuracy
- Auto-match rate
- False exception rate
- Average match time

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
