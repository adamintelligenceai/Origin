# Supplier Resolution Agent
## Agent Specification — AGT-08

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Draft supplier communications for invoice-related issues.

## Job Description
The Supplier Resolution Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Exception details, supplier contact data, communication templates

## Tools & Data Required
Email draft system, supplier portal, template library

## Responsibilities
Draft communications for missing PO, duplicates, incorrect invoices, missing info, credit notes, statement differences

## Explicit Exclusions
Does not send without human approval; does not commit to payment terms

## Human Owner
AP Team Lead

## Approval Requirements
Mandatory human approval before any supplier communication

## Escalation Criteria
Disputed high-value invoice; legal/compliance concern

## Output Standard
Draft supplier communication with context and recommended resolution

## Control Requirements
Mandatory approval gate; communication archive; brand compliance

## KPIs
Supplier response rate, resolution time, communication quality score

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
