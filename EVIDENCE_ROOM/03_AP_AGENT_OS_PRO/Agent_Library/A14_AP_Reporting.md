# A14 — AP Reporting Agent

**Stack ID:** A14  
**Human owner (default):** AP Analytics Lead / Head of AP (consumer)  
**Typical autonomy start:** L1  
**Depends on:** Agent logs, ERP extracts, exception ledger, KPI definitions  
**Hands off to:** A15 Root Cause, A16 Orchestrator, management humans

---

## Purpose

Produce trustworthy operational and control reporting for AP — throughput, quality, aging, agent performance, and cost-to-serve — so leaders manage by evidence rather than anecdote.

---

## Job description

The AP Reporting Agent compiles standardised dashboards and narrative exception commentaries from agreed data marts: volume, STP rates, exception mix, SLA performance, autonomy levels, payment proposal quality, and close readiness. It distributes packs on schedule and answers governed metric definitions. It does not invent benchmarks or ROI claims, and it does not change operational data.

---

## Inputs

| Input | Source |
|-------|--------|
| KPI dictionary | `KPI_Measurement` / config |
| Invoice and payment facts | ERP / warehouse |
| Exception ledger | A04 |
| Agent run logs / costs | Observability |
| Autonomy scorecards | A16 / responsibility model |
| Calendar (daily/weekly/monthly) | Config |

---

## Tools / data required

- BI / warehouse models with versioned metric SQL  
- Agent telemetry  
- Distribution lists and channels  
- Narrative template optional (facts first)  
- Access control by entity/sensitivity  

---

## Responsibilities

1. Refresh certified datasets on schedule.  
2. Calculate KPIs per dictionary (no shadow metrics).  
3. Produce role-based packs (AP lead, Controller, Procurement partner).  
4. Highlight breaches and movers with links to cases.  
5. Provide drill-through IDs, not screenshots alone.  
6. Archive report versions for audit.  
7. Feed A15 with aggregated exception themes.  

---

## Explicit exclusions

- Inventing external benchmark statistics  
- Promising savings / ROI  
- Changing source transactions  
- Publishing drafts as “audited”  
- Exposing payment bank details in open dashboards  

---

## Human owner

**Primary:** AP Analytics Lead / Process Excellence  
**Metric owners:** Per KPI dictionary  
**Accountable executive:** Head of AP  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| KPI definition change | Metric owner + Head of AP |
| External distribution of packs | Head of AP |
| New data source certification | Data governance + AP |
| Autonomy of narrative commentary L2+ | Head of AP |

---

## Escalation criteria

- Metric refresh failure  
- Reconciliation break vs ERP control totals  
- Sudden KPI discontinuity after deploy  
- Conflicting definitions across teams  

---

## Output standard

Each pack: period, filter scope, KPI table with definitions link, exception mix chart data, top actions, data freshness timestamp, known limitations.

---

## Control requirements

- Certified metrics only in “official” packs  
- Row-level security  
- Change log for metric logic  
- Segregation of report publisher vs payment roles  

---

## Audit evidence

Report archives, metric git/SQL versions, distribution logs, and recon checks to ERP totals.

---

## KPIs *(of the reporting function itself)*

1. **On-time refresh %**  
2. **Metric recon break count**  
3. **Time-to-publish**  
4. **Stakeholder defect tickets on reports**  
5. **Adoption (active viewers)** — optional  
6. **Cost per refresh**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Manual pulls observed |
| **L1** | Draft packs for human publish |
| **L2** | Auto-publish internal certified packs |
| **L3** | Auto-alert on KPI breaches to owners |
| **L4** | Managed reporting ops; definition changes remain human |

---

## Failure handling

Refresh fail: publish stale-with-banner or hold — never silently stale as current. Metric disagreement: halt official pack; escalate.

---

## Cost monitoring notes

Prefer incremental warehouse models; restrict generative commentary to executive summaries with token caps. Cache heavy extracts.

---

## Example scenario *(illustrative example)*

Monday pack shows STP match rate down 6pp WoW, driven by `missing_receipt` at Plant B. Links open the top 20 cases. Head of AP triggers ops huddle — no ROI claim attached.

---

## Suggested first pilot scope

One weekly Head-of-AP pack: volume, STP, top 10 taxonomy codes, aged >30 days, agent cost — L1 draft then L2 auto-publish.
