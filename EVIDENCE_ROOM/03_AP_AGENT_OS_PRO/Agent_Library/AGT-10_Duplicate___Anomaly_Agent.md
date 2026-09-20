# Duplicate & Anomaly Agent
## Agent Specification — AGT-10

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Identify duplicate invoices and payment anomalies. Not a fraud guarantee.

## Job Description
The Duplicate & Anomaly Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Invoice history, payment history, supplier patterns

## Tools & Data Required
Duplicate detection engine, anomaly scoring, historical analytics

## Responsibilities
Detect exact/near duplicates, repeated amounts, suspicious number variations, supplier anomalies, unusual payment characteristics

## Explicit Exclusions
Does not block payments autonomously; does not guarantee fraud detection

## Human Owner
AP Manager / Internal Audit liaison

## Approval Requirements
Human review for all flagged items before hold

## Escalation Criteria
High-confidence duplicate; bank detail change + invoice

## Output Standard
Anomaly report with confidence score and evidence package

## Control Requirements
Detection rule governance; false-positive review process

## KPIs
Duplicate detection rate, false-positive rate, payments reviewed

## Default Autonomy Level
**Level 0 — Observe**

The agent begins in Observe mode. Progression to higher levels requires:
1. Documented performance against KPIs for minimum 4-week period
2. Control effectiveness validation
3. Human owner sign-off
4. Recorded in Agent Registry

## Autonomy Progression Criteria

| To Level | Requirement |
|----------|-------------|
| 1 — Recommend | >85% accuracy in Observe mode for 4+ weeks |
| 2 — Prepare | >90% recommendation acceptance rate for 4+ weeks |
| 3 — Execute within guardrails | >95% accuracy, zero control breaches for 8+ weeks |
| 4 — Managed autonomy | Executive approval, full control audit, 12+ weeks at Level 3 |

## Failure Handling
- On KPI breach: automatic revert to previous autonomy level
- On control incident: immediate suspension pending investigation
- On ambiguous outcome: flag for human review; do not retry autonomously

## Cost Monitoring
Track AI inference cost per outcome. Review monthly against cost-per-correct-outcome target.

---
*Evidence Room — AP Agent OS. Agents earn responsibility. Evidence over hype.*
