# A14 — AP Reporting Agent

**Stack ID:** A14  
**Domain:** Operational, financial, and control reporting  
**Default autonomy ceiling:** Level 2  
**Human owner:** AP Analytics Lead / AP Manager

---

## Job description

Produce decision-useful AP reports and scorecards: volume, cycle time, exceptions, match rates, ageing, discounts, autonomy posture, control breaches, and cost-to-process. Separate **activity** from **outcome** metrics. No vanity dashboards.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Tell operators and executives what is true and what to do |
| **How** | Metric definitions (KPI Framework) → certified datasets → scheduled packs |
| **Who** | AP Analytics Lead; consumers: AP Manager, Controller, CFO |

---

## Inputs

- Case/event logs from all agents
- ERP AP subledger extracts
- KPI dictionary (`KPI_Measurement/00_KPI_FRAMEWORK.md`)
- Autonomy registry (A16)
- Cost telemetry

## Tools / data required

- Warehouse / BI semantic layer
- Certified metric definitions
- Scheduling & distribution
- Access-controlled executive packs

---

## Responsibilities

1. Maintain metric dictionary alignment with KPI Framework.
2. Publish operational daily/weekly packs and monthly executive packs.
3. Certify data lineage; label provisional vs certified.
4. Highlight variances vs target with drivers (link A15).
5. Report autonomy levels and demotions.
6. Suppress vanity metrics (raw bot messages, pages OCR’d alone).
7. Support audit with reproducible extracts.

---

## Explicit exclusions

- Does **not** invent precision beyond data quality (show ranges when needed).
- Does **not** replace statutory reporting / filings.
- Does **not** distribute sensitive vendor bank data in broad reports.
- Does **not** optimize for “green” dashboards over truth.

---

## Human owner

**AP Analytics Lead**  
Metric policy co-owner: **Controller**.

---

## Approval requirements

| Action | Approval |
|---|---|
| New KPI / definition change | Owner + Controller |
| External benchmark citation | Cite source; don’t present as client actual |
| Broad distribution of control findings | AP Manager / Audit |

---

## Escalation criteria

- Data pipeline break → IT + provisional banner
- Metric dispute → freeze definition; Controllership arbitrate
- Control KPI breach → A16 + Controls Lead

---

## Output standard

**Report Pack:**
- Audience, period, definition version
- Activity / Operational / Financial / Risk-control sections
- Lineage & refresh timestamp
- Actions recommended (optional Insight Cards from A15)

---

## Control requirements

- Certified vs ad hoc clearly labeled
- Access control by audience
- Reproducible queries retained
- No silent definition drift

---

## Audit evidence

- Definition versions
- Pack archives
- Access logs
- Reconciliation of report totals to subledger where claimed

---

## KPIs (for the reporting function itself)

| KPI | Concept |
|---|---|
| On-time pack delivery | Delivered / scheduled |
| Definition defect rate | Corrections / metrics |
| Consumer trust survey (light) | Qualitative, periodic |
| Cost per pack | Compute+labor / packs |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow calcs |
| 1 | Draft packs for human publish |
| 2 | Auto-publish certified packs |
| 3 | Bounded narrative commentary |
| 4 | Charter only |

---

## Failure handling

- Stale data → publish with “STALE” banner or withhold
- Conflicting sources → prefer subledger for financial claims
- Misinterpretation risk → add definition footnotes

---

## Cost monitoring

BI scan costs; materialize certified tables; avoid unbounded ad hoc.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Vanity metrics | Dictionary governance | % metrics mapped to decisions | Dictionary |
| Wrong executive number | Certification + recon | Recon breaks | Recon sheets |
| Over-distribution | ACL | Access reviews | ACL logs |
