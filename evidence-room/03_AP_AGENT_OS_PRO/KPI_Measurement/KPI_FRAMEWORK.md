# KPI Framework — AP Agent Operating System

**Evidence Room — AP Agent OS Pro**  
**Document type:** Metric dictionary and operating framework  
**Audience:** Controllers, AP managers, FP&A, Internal Audit, Steering Committee  
**Doctrine:** Measure what proves responsibility is earned. Avoid vanity metrics.

---

## 1. Design principles

| Principle | Meaning |
|---|---|
| Decision-grade | Every KPI must change a decision: promote, demote, fix process, or fund. |
| Layered | Separate **Activity**, **Operational outcomes**, **Financial outcomes**, and **Risk-control**. Do not blend into one “AI score.” |
| Defined once | Single metric dictionary; Agent 14 may only publish approved definitions. |
| Denominator honesty | State inclusions/exclusions (credit notes, non-PO, intercompany). |
| External context ≠ your target | Industry figures frame aspiration; your baseline is measured on your volumes. |
| No false precision | Round appropriately; show ranges for forecasts; label illustrative examples. |

**Industry context (Ardent Partners, *State of ePayables 2025*):** peer average cost per invoice **$9.84**, cycle **8.2 days**, exception rate **18.4%**, STP **35.4%**; Best-in-Class cost **$2.65**, exception **11.1%**, STP **51%**. Use for benchmarking conversations only — not as Evidence Room performance claims.

---

## 2. Metric layers

```text
Activity  →  Operational outcomes  →  Financial outcomes
                      ↓
                 Risk-control (gates promotion)
```

Promotion requires **Operational + Risk-control** health. Financial outcomes validate investment — they do not excuse control breaches.

---

## 3. Activity metrics (necessary, not sufficient)

| KPI | Definition | Formula | Good use | Vanity trap |
|---|---|---|---|---|
| Invoices processed by agent | Invoices that entered agent workflow | Count of invoices with ≥1 agent run in period | Capacity planning | “AI touched X” without quality |
| Agent runs | Execution count | Count(`run_id`) | Cost/infra | Equating runs with value |
| Recommendations issued | L1+ outputs awaiting human | Count(recommendations) | Workload | High volume of low-value recs |
| Drafts prepared | L2 artefacts staged | Count(drafts) | Throughput design | Drafts never released |
| Human interventions | Human decision required | Count(human_decisions) | Load on specialists | Treating lower as always better without quality |
| Volumes by channel/type | Mix | Count by PO/non-PO, entity, source | Stratify all other KPIs | Ignoring mix shifts |

**Rule:** Activity metrics appear on operational dashboards; they do **not** alone justify promotion.

---

## 4. Operational outcome metrics

### 4.1 Quality / accuracy

| KPI | Definition | Formula | Notes |
|---|---|---|---|
| **Classification accuracy** | Correct doc type / entity / category at intake | `(correct classifications / sampled classifications) × 100` | Sample or gold-set; stratify |
| **Extraction accuracy** | Critical fields correct (vendor, invoice #, dates, amounts, tax, PO) | `(correct critical fields / critical fields evaluated) × 100` | Define “critical field” list |
| **Matching accuracy** | Correct match decision vs human/gold | `(correct match decisions / match decisions evaluated) × 100` | Include “correctly excepted” |
| **False positive rate (FP)** | Incorrect flags/holds among flagged | `FP / (FP + TP)` | By detector (duplicate, GR missing, etc.) |
| **False negative rate (FN)** | Missed true issues among true issues | `FN / (FN + TP)` | Often more costly than FP for duplicates |
| **Precision / Recall** | Standard detection framing | Precision `TP/(TP+FP)`; Recall `TP/(TP+FN)` | Prefer over vague “AI accuracy” |

### 4.2 Flow / exceptions

| KPI | Definition | Formula | Notes |
|---|---|---|---|
| **STP rate** | Invoices posted without human exception handling | `(STP invoices / invoices in scope) × 100` | Define STP narrowly; exclude “human clicked OK on everything” theatre |
| **Exception rate** | Invoices with ≥1 exception case | `(invoices with exception / invoices in scope) × 100` | Compare directionally to Ardent peer **18.4%** / BIC **11.1%** (2025) as context |
| **Exception resolution rate** | Exceptions closed in period | `(exceptions closed / exceptions available-to-close) × 100` | Watch ageing, not just close rate |
| **Repeat exception rate** | Same root cause reappears on vendor/PO/buyer | `(repeat exceptions / exceptions) × 100` | Ties to Agent 15 CARs |
| **Duplicates detected** | Suspected + confirmed | Count + `$` at risk | Split suspected vs confirmed |
| **GR missing reduction** | Change in GR-missing exception incidence | `(prior rate − current rate) / prior rate` | Attribute carefully |
| **PO compliance rate** | Invoices with valid PO linkage where required | `(PO-compliant / PO-required invoices) × 100` | Policy-defined |
| **Human intervention rate** | Share requiring human decision | `(invoices with human decision / invoices) × 100` | Expected high at L0–L1 |

### 4.3 Time

| KPI | Definition | Formula | Notes |
|---|---|---|---|
| **Average resolution time** | Exception open → resolved | Mean or median hours | Prefer median + P90 |
| **Time to posting** | Invoice receipt → posted | Mean/median days | Context: Ardent peer cycle **8.2 days** (2025) |
| **Time to payment proposal inclusion** | Posted → on approved proposal | Mean/median days | Treasury calendar matters |
| **Approval cycle time** | Routed → approved/rejected | Mean/median hours | Agent 07 |

---

## 5. Financial outcome metrics

| KPI | Definition | Formula | Notes |
|---|---|---|---|
| **Cost per invoice** | Fully loaded AP cost / invoice | `AP operating cost / invoices processed` | Include labour, platform, AI inference allocated; compare contextually to Ardent avg **$9.84** / BIC **$2.65** (2025) |
| **Cost per exception** | Cost attributable to exception handling | `exception-handling cost / exceptions closed` | Reveals backlog economics |
| **AI inference cost** | Model/API cost | Sum of inference $ in period | Track per agent and per correct outcome |
| **Cost per correct outcome** | Economic efficiency of quality | `(labour_alloc + platform_alloc + inference) / correct_outcomes` | Define correct_outcomes (e.g., correct STP posts) |
| **Hours released** | Hours no longer spent on automated tasks | `baseline hours − current hours` on in-scope tasks | Must be validated (see below) |
| **Validated savings** | Savings accepted by Finance | Per savings protocol | **Not** model-projected fantasy |
| **Payment-on-time rate** | Paid by due date (or agreed terms) | `(on-time payments / payments) × 100` | Protect supplier relationships |
| **Ageing (AP)** | Open invoices by bucket | $ and count by 1–30, 31–60, etc. | Exception ageing separate from payment ageing |
| **Discount capture** | Eligible discounts taken | `(discounts taken $ / eligible $) × 100` | Avoid invalid discount taking |

### Validated savings protocol (minimum)

Savings count only if:

1. Baseline period documented (volume, mix, hours, cost).  
2. Method approved by Controller/FP&A.  
3. Adjustments for volume/mix stated.  
4. One-time vs run-rate separated.  
5. Labelled **validated** vs **estimated** vs **illustrative**.

---

## 6. Risk-control metrics (gates)

| KPI | Definition | Formula / measure | Gate idea |
|---|---|---|---|
| **Control breaches** | Policy/SoD/fence violations | Count and severity | Any Critical blocks promotion |
| **Escalations** | Cases hitting escalation matrix | Count; % of exceptions | Spike = design or capacity issue |
| **Audit exceptions** | Findings tied to agent process | Count open/closed | Open material finding = demotion review |
| **Override rate** | Human overrides of agent recs | `overrides / recommendations` | Very high = poor agent; very low may mean weak challenge |
| **Override quality** | % overrides upheld on review | Sample | Detect rubber-stamping or agent blindness |
| **Rework rate** | Work returned / reversed | `rework items / items` | Posting reversals, reposts |
| **Duplicate payments (confirmed)** | True duplicates paid | Count / $ | Prefer zero |
| **Unauthorized action attempts** | Blocked tool calls / policy denies | Count | Investigate clusters |
| **Evidence completeness** | % runs with full mandatory log | `(complete runs / runs) × 100` | &lt;100% on material actions is a defect |

---

## 7. KPI ownership and cadence

| Layer | Primary owner | Cadence |
|---|---|---|
| Activity | AP Manager | Daily |
| Operational | AP Manager; quality with Prompt Steward | Daily / Weekly |
| Financial | Controller + FP&A | Monthly |
| Risk-control | Controller; Audit challenge | Weekly signals / Monthly attestation |

---

## 8. Target setting guidance

1. **Baseline first** — 4–8 weeks measured baseline before aggressive targets.  
2. **Stratify** — PO vs non-PO; domestic vs cross-border; high-value vs micro.  
3. **Use industry as context** — e.g., if your STP is far below Ardent peer **35.4%** (2025), prioritize exception root cause before raising autonomy.  
4. **Avoid single-number heroics** — pair STP↑ with FN(duplicate) and control breaches.  
5. **Promotion thresholds** — written in agent charter; evaluated on a defined window (illustrative: 4–8 consecutive weeks).

---

## 9. Anti-vanity list (do not promote on these alone)

- Total LLM tokens consumed  
- “Automations run” without quality  
- Chat messages sent  
- Hours of “AI uptime”  
- Unvalidated “productivity gains”  
- Composite “AI health score” that hides control breaches  

---

## 10. Data quality requirements

Each KPI entry in the warehouse/dashboard must store: definition ID, version, filter predicates, last refresh timestamp, source systems, known limitations.

Reconciliation: invoice counts on dashboards must match ERP within agreed tolerance or display a break banner (Agent 14 control).

---

## 11. Related documents

- `KPI_Measurement/SCORECARD_GUIDE.md`  
- `KPI_Measurement/WEEKLY_AGENT_PERFORMANCE_REPORT.md`  
- `KPI_Measurement/MANAGEMENT_DASHBOARD_SPEC.md`  
- `Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `Process_Mapping/EXCEPTION_TAXONOMY.md`
