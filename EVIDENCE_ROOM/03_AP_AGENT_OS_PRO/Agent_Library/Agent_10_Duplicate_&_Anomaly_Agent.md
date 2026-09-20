# Agent 10: Duplicate & Anomaly Agent

## Purpose
Identify exact duplicates, near duplicates, and suspicious payment patterns.

## Job Description
The Duplicate & Anomaly Agent is responsible for identify exact duplicates, near duplicates, and suspicious payment patterns. It operates under the supervision of AP Manager / Internal Controls at Autonomy Level 0 by default.

## Inputs
- Invoice history
- Payment history
- Supplier master
- Bank details
- Amount/date patterns

## Tools & Data Required
- Duplicate detection engine
- Analytics platform
- Supplier master
- Payment file data

## Responsibilities
- Detect exact and near duplicates
- Flag repeated amounts
- Identify invoice number variations
- Surface supplier anomalies
- Highlight unusual payment characteristics

## Explicit Exclusions
- NOT a fraud detection guarantee
- Does not block payments autonomously
- Does not accuse suppliers of fraud

## Human Owner
AP Manager / Internal Controls

## Approval Requirements
Level 1+: alerts and recommendations only; human investigates all flags

## Escalation Criteria
High-confidence duplicate; bank detail change; round-sum anomalies; new supplier high value

## Output Standard
- Anomaly alert with confidence score
- Supporting evidence
- Recommended investigation steps
- Risk classification

## Control Requirements
- Human review mandatory for all payment blocks
- False positive tracking
- Model performance monitoring

## KPIs
- Duplicates detected
- False positive rate
- Investigation conversion rate
- Near-duplicate catch rate

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
