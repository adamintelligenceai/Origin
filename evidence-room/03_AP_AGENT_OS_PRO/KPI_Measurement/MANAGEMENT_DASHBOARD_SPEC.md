# Management Dashboard Specification

**Evidence Room — AP Agent OS Pro**  
**Document type:** Dashboard / data product spec  
**Audience:** Analytics/IT builders, AP Manager, Controller  
**Companion:** `KPI_FRAMEWORK.md`, `SCORECARD_GUIDE.md`

---

## 1. Purpose

Specify a management dashboard that is **decision-grade**, reconciled to ERP where it matters, and resistant to vanity metrics. This is a specification for build in Power BI, Tableau, Looker, or equivalent — not a software product from Evidence Room.

---

## 2. Audiences and views

| View | Primary user | Cadence | Focus |
|---|---|---|---|
| V1 Operations Wall | AP Manager / Specialists | Intra-day / daily | Queues, ageing, SLA, breaches |
| V2 Agent Scoreboard | AP Manager / Prompt Steward | Daily / weekly | Per-agent quadrants |
| V3 Controller | Controller / Audit | Weekly / monthly | Gates, cost, risk, promotions |
| V4 Executive | CFO / Steering | Monthly | Outcomes, investment, risk posture |

All views consume the **same metric dictionary**. No private definitions.

---

## 3. Global filters

- Date range (default: week-to-date; month-to-date)  
- Legal entity / ledger  
- Document type (PO, non-PO, credit note)  
- Agent ID  
- Responsibility level  
- Vendor tier (if available)  
- Mode: Production / Shadow / Pilot  

**Freshness banner:** every page shows `last_refresh_utc` and source lag. If lag &gt; SLA, banner = Amber/Red.

---

## 4. V1 — Operations Wall

### Tiles

| Tile | Metric | Visualization | Alert |
|---|---|---|---|
| Inflow | Invoices received today | Number + sparkline | — |
| Open exceptions | Count / $ | Number | Ageing breach |
| P90 exception age | Hours/days | Number | &gt; SLA |
| STP today | % | Number | Below floor |
| Awaiting human | Count | Number | Capacity |
| Gate breaches (24h) | Count | Number | Any Crit = Red |
| Payment proposal holds | Count | Number | Bank-change holds highlighted |

### Detail tables

- Aged exceptions by taxonomy code  
- Approvals past SLA  
- Duplicate suspects awaiting review  

Drill-through → case ID in ERP/ticket system.

---

## 5. V2 — Agent Scoreboard

One row per agent; columns map to scorecard quadrants (A–D). Conditional formatting: Green/Amber/Red/Grey.

Drill-through → agent detail:

- Accuracy trend (8–12 weeks)  
- FP/FN for primary detectors  
- Override rate  
- Inference cost  
- Top failure modes  
- Version / prompt hash currently deployed  

---

## 6. V3 — Controller view

| Section | Content |
|---|---|
| Control gate | Breaches, audit exceptions, duplicate payments, evidence completeness |
| Financial | Cost/invoice trend; inference cost; validated savings only |
| Autonomy | Current levels vs ceilings; pending promotion packs |
| Benchmark context | Optional footnote: Ardent 2025 peer/BIC cost, exception, STP — clearly labelled external |
| Risk | Top risks from register with residual status |

**No** blended “AI index” that can be Green while gates are Red.

---

## 7. V4 — Executive one-pager

- Narrative strip (4 bullets max)  
- Outcome KPIs: cycle time, STP, exception rate, payment-on-time  
- Economics: validated run-rate savings vs program cost (incl. licences + inference + change cost)  
- Risk posture: open Critical items  
- Ask: decision required  

Commercial footnote when program cost discussed (list prices): Free Diagnostic **$0**; Starter **$79**; Professional **$199**; Team **$499**; Custom Blueprint **$1,500–$3,000** — plus internal delivery cost (always larger than SKU price).

---

## 8. Data model (logical)

### Facts

| Fact | Grain | Key measures |
|---|---|---|
| `fact_invoice` | invoice_id | amounts, dates, flags (STP, exception) |
| `fact_agent_run` | run_id | agent_id, version, latency, cost, outcome |
| `fact_exception` | exception_id | taxonomy_code, opened/closed, age |
| `fact_human_decision` | decision_id | accept/reject/override |
| `fact_payment` | payment_id | on_time flag, holds |
| `fact_control_event` | event_id | severity, agent_id |

### Dimensions

`dim_agent`, `dim_taxonomy`, `dim_entity`, `dim_vendor`, `dim_date`, `dim_version`, `dim_user_role`

### Reconciliation

Daily job compares `count(fact_invoice)` to ERP invoice count for the same filters; publish `recon_status`.

---

## 9. Non-functional requirements

| Topic | Spec |
|---|---|
| Security | RBAC aligned to Governance roles; row-level entity security if required |
| PII | Mask bank accounts; restrict vendor tax IDs on broad views |
| Performance | Ops wall &lt; 5s interactive on standard filters (illustrative target) |
| Lineage | Each metric tooltip shows dictionary ID + version |
| Audit | Export of scorecard snapshots immutable weekly |

---

## 10. Build phases (illustrative)

| Phase | Deliverable |
|---|---|
| 0 | Metric dictionary in governed sheet/db |
| 1 | V1 with exceptions + ageing + breaches |
| 2 | V2 agent scoreboard + run facts |
| 3 | V3/V4 + cost and validated savings |
| 4 | Automated weekly snapshot → report pack |

---

## 11. Acceptance tests

- [ ] STP definition matches dictionary (not “all posted”)  
- [ ] Gate Red forces overall Red on V2/V3  
- [ ] Freshness banner works when ETL stopped  
- [ ] Drill-through opens correct case  
- [ ] Executive view contains no unvalidated savings labelled as fact  
- [ ] Ardent figures appear only as cited external context  

---

## 12. Related documents

- `KPI_FRAMEWORK.md`  
- `SCORECARD_GUIDE.md`  
- `WEEKLY_AGENT_PERFORMANCE_REPORT.md`  
- `Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`
