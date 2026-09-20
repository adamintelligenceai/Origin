# Invoice Intake Agent
## Agent Specification — AGT-01

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Review incoming invoices for completeness, extraction quality, and downstream suitability.

## Job Description
The Invoice Intake Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
Raw invoice (PDF/email/EDI), OCR output, supplier metadata

## Tools & Data Required
OCR engine, email parser, supplier directory, document store

## Responsibilities
Classify intake channel; validate minimum fields present; flag extraction confidence; route to validation queue

## Explicit Exclusions
Does not approve payments; does not post to ERP; does not modify master data

## Human Owner
AP Operations Lead

## Approval Requirements
None for routing; human review for low-confidence extractions

## Escalation Criteria
Extraction confidence <85%; unreadable document; unknown supplier

## Output Standard
Intake assessment record with confidence score and routing decision

## Control Requirements
Document retention; access logging; PII handling

## KPIs
Extraction confidence rate, intake cycle time, misroute rate

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
