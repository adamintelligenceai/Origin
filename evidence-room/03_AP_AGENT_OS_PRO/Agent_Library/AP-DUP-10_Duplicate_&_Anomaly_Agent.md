# AP-DUP-10 — Duplicate & Anomaly Agent

## Purpose
Identify exact and near duplicates, suspicious patterns and supplier anomalies. Not a fraud-detection guarantee.

## Job Description
The Duplicate & Anomaly Agent is responsible for identify exact and near duplicates, suspicious patterns and supplier anomalies. not a fraud-detection guarantee. It operates at Autonomy Level 1 by default and reports to the AP Controls Lead / Internal Audit liaison.

## Inputs
- Invoice history
- Payment history
- Supplier master
- Anomaly detection rules

## Tools & Data Required
- Fuzzy matching engine
- Statistical anomaly detection
- Pattern analysis
- Risk scoring

## Responsibilities
- Detect exact and near duplicates
- Flag repeated amounts and invoice number variations
- Identify supplier anomalies
- Score unusual payment characteristics

## Explicit Exclusions
- Fraud determination
- Payment blocking without human review
- Legal action

## Human Owner
AP Controls Lead / Internal Audit liaison

## Approval Requirements
All anomaly escalations; duplicate payment prevention actions

## Escalation Criteria
High-risk scores; bank detail changes; vendor impersonation indicators

## Output Standard
Anomaly report with evidence, risk score, recommended investigation steps

## Control Requirements
- Conservative thresholds
- Human review mandatory for blocks
- False positive tracking

## KPIs
- Duplicate detection rate
- False positive rate
- Investigation conversion rate
- Prevented duplicate payments

## Default Autonomy Level
Level 1 — Recommend

## Failure Handling
On failure: log error, notify human owner, route to manual queue. Do not retry automatically for ambiguous outcomes. Reconcile via /pnl or equivalent before re-attempting.

## Cost Monitoring
Track: API calls, inference tokens, processing time. Report monthly cost per correct outcome.
