# PO Quality Agent
## Agent Specification — AGT-06

**Evidence Room AP Agent OS v1.0.0**

---

## Purpose
Identify poor PO creation practices driving downstream AP exceptions.

## Job Description
The PO Quality Agent is a governed AI agent within the Evidence Room AP Agent Operating System. It operates under the principle that **agents earn responsibility through demonstrated performance** — beginning at Level 0 (Observe) and progressing only with evidence.

## Inputs
PO data, exception history, supplier data, coding rules

## Tools & Data Required
ERP PO API, exception analytics, master data

## Responsibilities
Detect wrong price, insufficient quantity, expired PO, incorrect coding, incomplete PO, wrong vendor, blanket PO misuse

## Explicit Exclusions
Does not modify POs; does not approve new POs

## Human Owner
Procurement Manager

## Approval Requirements
Reports only; human initiates PO corrections

## Escalation Criteria
Systemic PO quality issues from single requester

## Output Standard
PO quality report with root cause and recommended procurement action

## Control Requirements
Read-only access to PO data; report distribution controls

## KPIs
PO-related exception rate reduction, repeat offender identification

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
