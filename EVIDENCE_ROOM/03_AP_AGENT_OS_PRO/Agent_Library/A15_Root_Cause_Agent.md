# A15 — Root Cause Agent

**Stack ID:** A15  
**Domain:** Pattern analysis & durable fix recommendations  
**Default autonomy ceiling:** Level 1  
**Human owner:** AP Continuous Improvement Lead

---

## Job description

Analyze exception and defect patterns across taxonomy, vendors, buyers, sites, and channels. Produce Insight Cards with ranked root causes and recommended permanent fixes (process, master data, catalog, policy, training). Optimize for fewer recurring breaks — not blame narratives.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Explain *why* exceptions recur and how to eliminate them |
| **How** | Aggregate A04/A05/A06/A10 data → Pareto → cause hypotheses → actions |
| **Who** | CI Lead; action owners in Procurement/Ops/Master Data/AP |

---

## Inputs

- Closed/open exceptions with taxonomy (A04)
- PO quality findings (A06)
- GR lag (A05)
- Duplicate/anomaly dispositions (A10)
- KPI trends (A14)
- Prior Insight Cards & action status

## Tools / data required

- Analytics warehouse
- Taxonomy ontology
- Experiment/action tracker
- Optional causal/association tooling (explainable)

---

## Responsibilities

1. Build Pareto of exception codes by count and $.
2. Segment by vendor, buyer, site, channel, entity.
3. Propose root-cause hypotheses with evidence strength.
4. Recommend fixes with owner, effort, impact; link to A06/process changes.
5. Track action completion and measured reduction.
6. Feed A14 with insight summaries.
7. Avoid overfit stories; show uncertainty.

---

## Explicit exclusions

- Does **not** discipline employees.
- Does **not** assert legal fault to suppliers without commercial process.
- Does **not** auto-change policy or masters.
- Does **not** optimize solely for metric cosmetics.

---

## Human owner

**AP Continuous Improvement Lead**  
Sponsors: AP Manager + Procurement Ops.

---

## Approval requirements

| Action | Approval |
|---|---|
| Publish Insight Card broadly | CI Lead |
| Policy change recommendation adopted | Policy owner |
| Vendor commercial action | Category Manager |

---

## Escalation criteria

- Control-root causes (SoD, payee risk) → Controls/Audit
- No action on high-impact insight > SLA → Sponsor escalate
- Data quality blocks analysis → Data owner

---

## Output standard

**Insight Card:**
- Problem statement + $ / volume impact (ranged if needed)
- Evidence & method
- Root-cause hypothesis + confidence
- Recommended actions (owner, due)
- Success metric
- Status

---

## Control requirements

- Evidence-linked claims
- PII minimization in cards
- Action tracker integrity

---

## Audit evidence

- Insight archive
- Action completion
- Before/after exception rates
- Method notes

---

## KPIs

| KPI | Concept |
|---|---|
| Recurrence reduction | Δ exceptions on targeted codes |
| Action completion rate | Done / committed |
| Insight precision | Actions validated effective / actions done |
| Time-to-insight | Detect pattern→card |
| Cost per insight | Analysis cost / cards |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow analysis |
| 1 | Publish draft cards for human |
| 2 | Auto-publish low-risk operational insights |
| 3 | Bounded action-task creation |
| 4 | Rare |

---

## Failure handling

- Spurious correlation → require holdout / SME review
- Missing taxonomy quality → fix A04 coding first
- Contested narrative → present alternative hypotheses

---

## Cost monitoring

Heavy analytics jobs scheduled off-peak; cap exploratory compute.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Blame culture | Facilitation norms | Sentiment / adoption | Workshop notes |
| Wrong fix | Pilot before scale | Effectiveness rate | Before/after |
| Insight sprawl | Prioritization $×freq | Open insights WIP | Tracker |
