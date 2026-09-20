# AGENT 15 — Root Cause

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_15`  
**Domain:** Pattern analysis & corrective-action drafts  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Root Cause Agent analyzes exception and cycle-time patterns to propose systemic fixes — PO quality drives, supplier onboarding gaps, plant receipt discipline, coding issues — and drafts corrective-action plans for human owners. It turns recurring firefighting into an improvement backlog.

---

## 2. Inputs

| Input | Source |
|---|---|
| Exception histories | Agent 04 |
| PO quality findings | Agent 06 |
| Follow-up bottlenecks | Agent 09 |
| Duplicate trends | Agent 10 |
| KPI trends | Agent 14 |
| Prior CAPAs | Improvement register |

---

## 3. Tools / data required

- Analytics / clustering with explainability
- Pareto and cohort analysis
- CAPA register
- Experiment / pilot tracking (optional)

---

## 4. Responsibilities

1. Identify top recurring failure modes by volume and dollars.
2. Hypothesize causes with evidence (not storytelling alone).
3. Draft corrective actions with owners and success metrics.
4. Track whether actions reduced recurrence.
5. Feed Orchestrator (16) with improvement priorities.

---

## 5. Explicit exclusions

- Does **not** implement process changes without owners.
- Does **not** punish individuals; focuses on systems and codes.
- Does **not** claim statistical certainty beyond method limits.
- Does **not** bypass change-management for policy edits.

---

## 6. Human owner

**AP Continuous Improvement Lead** / AP Manager. Backup: Process Excellence partner.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Open CAPA | Process owner |
| Policy change from CAPA | Policy owner (often Controller/Procurement) |
| Close CAPA | Owner + AP Manager effectiveness review |

---

## 8. Escalation criteria

- Recurring material control failure
- Worsening trend after “fix”
- Cross-functional deadlock on ownership

---

## 9. Output standard

RCA brief: problem statement, evidence, Pareto, hypothesized causes, proposed CAPA, metrics, review date, agent version.

---

## 10. Control requirements

- CAPA register integrity
- Effectiveness reviews mandatory before close
- Separation from blame-oriented HR processes

---

## 11. Audit evidence

RCA briefs, CAPA records, before/after metrics, approvals.

---

## 12. KPIs

1. **% exceptions covered by active CAPA themes**  
2. **Recurrence reduction after CAPA**  
3. **Time to assign CAPA owner**  
4. **CAPA effectiveness pass rate**  
5. **Dollars associated with top themes**  
6. **Cost per RCA brief**  

---

## 13. Performance history fields

`capa_coverage_rate`, `recurrence_reduction_90d`, `time_to_owner_days`, `effectiveness_pass_rate`, `cost_per_brief_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1** draft RCAs. Humans select and fund CAPAs. No autonomous policy publishing.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Insufficient data | Label confidence low; request deeper sample |
| Conflicting causes | Present alternatives; do not force single narrative |

---

## 16. Cost monitoring

Limit briefs to material themes; avoid RCA spam.

---

## 17. Example worked scenario (fictional — ACME Corp)

Agent 15 finds 38% of ACME match exceptions are `GR_MISSING` at Plant 1200, correlated with ASN ignore rates. It drafts CAPA: warehouse scan compliance pilot, owner Plant Ops Manager, success metric −50% GR-missing in 60 days. AP Manager accepts. After 60 days Agent 14 shows improvement; CAPA marked effective.
