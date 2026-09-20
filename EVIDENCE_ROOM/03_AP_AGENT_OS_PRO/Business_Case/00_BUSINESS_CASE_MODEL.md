# Evidence Room — AP Agent OS Professional

## Business Case — 00 Model

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Business Case  
**Standard:** Proof before permission. Evidence decides.  
**Audience:** CFO / Finance Director, Controller, Head of AP, Transformation lead  
**ERP stance:** Agnostic. Costs come from the buyer’s ledgers and time study, not from a vendor benchmark.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** arithmetic only.  
**Version:** 1.0  
**Classification:** Planning model. **Does not promise savings, ROI, payback, fraud reduction, or compliance.** No line becomes KPI-FIN-SAV until the Controller validates it after operation.

---

### Position

A business case is a **structured estimate** used to decide whether to fund discovery, a first agent, or a wider programme. It is not evidence that an agent works. Evidence is produced in Test → Shadow → Pilot → Measure.

Three scenarios — **Conservative / Base / Upside** — keep you honest. False precision (ROI to two decimals, payback to a week) is a defect.

Use with:

| Topic | File |
|---|---|
| Cost per invoice build | `01_COST_PER_INVOICE.md` |
| Inference vs human minutes | `02_AGENT_ECONOMICS.md` |
| Phases 0–10 | `03_IMPLEMENTATION_ROADMAP.md` |
| Dictionary | `../KPI_and_Measurement/01_KPI_DICTIONARY.md` |
| Measurement rules | `../KPI_and_Measurement/00_KPI_FRAMEWORK.md` |

Every section: **what / how / who / wrong / control / measure / evidence.**

---

## 1. What to do

1. Complete the input sheet from **buyer data** (or mark the input `ASSUMED` and keep it out of the signed case).  
2. Compute outputs for Conservative / Base / Upside.  
3. Run sensitivity on the three inputs that move the result most.  
4. Separate **capacity released** (hours) from **cash** (only where a mechanism exists).  
5. Take the case to funding. After go-live, replace estimates with Measure packs.

**How.** Formulas in §4. Do not paste a blog’s “cost per invoice” as your baseline.

**Who.**

| Duty | Accountable | Responsible |
|---|---|---|
| Cost model integrity | Controller | FP&A / AP Reporting |
| Volume and rates | Head of AP | AP Manager |
| AI / tool / implementation cost | Finance Systems + Procurement | FinSys |
| Signing the case for funding | CFO / FD or delegated Controller | Transformation lead compiles |
| Later validation of benefits | Controller | Benefits owner (`04_AP_AGENT_OS_TEAM/Implementation/02_BENEFITS_REALISATION.md`) |

**What can go wrong.** Hours × loaded rate published as P&L savings with no overtime or FTE change. Industry averages invented. Guaranteed ROI language.

**Control.** Every cash line needs a **mechanism** (overtime down, vacancy not filled, discount actually taken, late fee actually avoided, duplicate actually removed from a proposal). No mechanism → ESTIMATE / capacity only.

**Measure.** Share of inputs with a source ID; unsigned cash lines (must be zero on the funding pack).

**Evidence.** Versioned workbook + this narrative under `[BUYER]/Evidence/BusinessCase/`.

---

## 2. Research context (not Evidence Room results)

Use these **only** as context for why a buyer might invest in measurement, not as default inputs and not as “what AP Agent OS delivers.”

| Source | What it reported | How you may use it |
|---|---|---|
| Deloitte, 8 Oct 2025, on 2026 outlook | **63%** of organisations had deployed AI; **21%** reported measurable ROI | Label: *external research on AI deployment vs measurable ROI — not an Evidence Room outcome.* Explains why this OS insists on Measure packs. |
| The Hackett Group, Nov 2025 | Among **software adopters** studied: **60%** touchless processing; **3.5×** productivity at **≥30%** touchless | Label: *software-adopter research, not Evidence Room results, not your baseline.* Do not set KPI-OPS-STP = 60% because Hackett published a figure. |

Do **not** invent other industry statistics. If you lack a source, leave the cell blank or mark ASSUMED.

---

## 3. Inputs (complete every row)

| ID | Input | Unit | Source (required) | Conservative | Base | Upside | Buyer value |
|---|---|---|---|---|---|---|---|
| I-01 | Invoice volume | invoices / year | ERP extract | | | | `[BUYER]` |
| I-02 | AP headcount (in-scope work) | FTE | Org chart / time split | | | | `[BUYER]` |
| I-03 | Fully loaded labour | currency / FTE / year | FP&A | | | | `[BUYER]` |
| I-04 | Manual-touch % | % of invoices with a human exception or keying step | Workflow / study | | | | `[BUYER]` |
| I-05 | Exception rate | exceptions / invoice or % with ≥1 exception | Exception store | | | | `[BUYER]` |
| I-06 | Average resolution minutes | minutes / exception (median preferred) | Time study or timestamps | | | | `[BUYER]` |
| I-07 | Duplicate rate | confirmed EX-DUP-001 / invoices | QA + store | | | | `[BUYER]` |
| I-08 | Late-payment costs | currency / year **actually incurred** | AP/Treasury (fees, contractual) | | | | `[BUYER]` |
| I-09 | Early-pay discount **opportunity** | currency / year **available per terms** | Terms extract | | | | `[BUYER]` |
| I-10 | Processing cost (current) | currency / invoice or / year | `01_COST_PER_INVOICE.md` | | | | `[BUYER]` |
| I-11 | AI / tool cost | currency / year (seats, pages, tokens, platform) | Vendor quotes + ledger design | | | | `[BUYER]` |
| I-12 | Implementation cost | currency (once) + internal days | Roadmap | | | | `[BUYER]` |
| I-13 | Expected efficiency range | % reduction in **in-scope** manual minutes | **Range**, not a point — from Shadow/Pilot evidence if you have it; else ASSUMED and wide | low | mid | high | `[BUYER]` |

**Rules for inputs**

- I-08: if you cannot see fees actually paid, enter **0** and move discussion to operational ageing — do not estimate “reputation cost.”  
- I-09: opportunity is **not** a saving. Saving = discounts **taken** that were not taken before, Controller-validated.  
- I-07: do not convert duplicate *flags* into cash. Cash requires proposal-removal or recovered funds (KPI-RSK-DPP / KPI-FIN-SAV).  
- I-13: if you have no Shadow/Pilot, Conservative should assume **little or no** minute reduction after adding **new review minutes**.

**Who.** AP Manager populates volume/rates; FP&A labour; Controller challenges cash-like inputs.

**What can go wrong.** I-13 set to 50% because a demo was smooth.

**Control.** ASSUMED cells highlighted. Funding pack lists them on page one.

**Measure.** Count of ASSUMED vs sourced inputs.

**Evidence.** Source extract IDs on each row.

---

## 4. How — outputs (compute, then label)

All outputs are **model outputs**. They become operational facts only through Measure.

### 4.1 Baseline cost (annual)

```
Labour_AP = I-02 × I-03
# If I-10 is a fully specified annual processing cost, prefer it over Labour_AP alone.
Baseline_cost = I-10_annual   (or Labour_AP + allocated AP systems already in I-10)
```

State what I-10 includes (`01_COST_PER_INVOICE.md`). Do not double-count.

### 4.2 Capacity released (hours / year) — ESTIMATE

```
Exception_hours_now = I-01 × I-05 × (I-06 / 60)
  # if I-05 is a %, use I-01 × I-05 × I-06 / 60
Manual_hours_now    = I-01 × I-04 × (minutes_per_touched_invoice / 60)
  # minutes_per_touched_invoice from time study; if missing, do not invent — use exception_hours only

Hours_released = (Manual_or_exception_hours_now) × I-13
                 − new_review_hours
                 − new_governance_hours
```

`new_review_hours` and `new_governance_hours` are mandatory subtractions. Shadow itself consumes minutes (`03_SHADOW_MODE.md`).

Label **KPI-FIN-HHR** class: ESTIMATE.

### 4.3 Processing-cost change (annual, modelled)

```
Processing_cost_after = Baseline_cost
                        − (Hours_released × hourly_loaded)
                        + I-11
                        + (I-12 / amortisation_years)
```

`hourly_loaded` = I-03 / `[BUYER productive hours]` (state the hours convention).

**Only treat the labour term as cash if** a mechanism exists (overtime, contractor, FTE). Otherwise show:

- Line A: capacity (hours)  
- Line B: modelled £/$ if monetised — **NOT FOR STEERING** until Controller agrees the mechanism  

### 4.4 Exception-cost change

```
Exception_cost_now = I-01 × I-05 × (I-06 / 60) × hourly_loaded
Exception_cost_after = same with I-06 and/or I-05 adjusted by I-13
                     + review time on remaining exceptions
```

Pair with quality: cheaper closes that fail QA are not a benefit (`KPI-OPS-EXR` + rework).

### 4.5 Estimated savings (three drawers)

| Drawer | Contents | Steering? |
|---|---|---|
| **D1 Capacity** | Hours_released | Yes, as hours |
| **D2 Modelled labour $** | Hours × rate if mechanism stated | Only with mechanism |
| **D3 Cash operations** | Late fees avoided (≤ I-08, evidenced) + discounts **taken** (≤ I-09, evidenced) + validated duplicate removals | Only itemised |

```
Estimated_savings_model = D2 + D3 − I-11 − amortised I-12
```

Publish D1 always. Publish the model total only with scenario labels.

### 4.6 Payback (modelled, not a promise)

```
Net_implementation = I-12
Annual_net_benefit_model = D2 + D3 − I-11   (steady year; say so)
Payback_years = Net_implementation / Annual_net_benefit_model
```

If denominator ≤ 0 in Conservative, write **“payback not shown — Conservative net negative or zero.”** Do not invent a payback.

### 4.7 ROI (modelled, not a promise)

```
ROI_year_1 = (Annual_net_benefit_model − I-12) / I-12
```

Or use a buyer-standard NPV. State the convention. **No false precision:** round money to thousands (or buyer materiality); round ROI to whole percent or “n/m”; round payback to a quarter-year.

### 4.8 Sensitivity

Vary, one at a time, across a buyer-chosen band:

1. I-13 efficiency  
2. I-11 tool cost  
3. I-06 resolution minutes (or volume I-01)

Report: which input flips Conservative from negative to positive. That is the management conversation.

---

## 5. Scenario rules

| Scenario | How to set I-13 and cash drawers | Typical use |
|---|---|---|
| **Conservative** | Low I-13; include full I-11 and I-12; **no** D3 unless already evidenced; subtract review/governance hours generously | Funding floor; “we still do this for control” |
| **Base** | Mid I-13; D3 only with a named mechanism and a **haircut** (buyer %) | Planning |
| **Upside** | High I-13 still inside a **range the owner will defend**; D3 still capped by I-08/I-09 actuals | Not the headline |

Upside is not a sales case. If Base needs Upside to look acceptable, the project is a control/capacity bet — say that.

**Who.** Controller refuses a pack that headlines Upside.

**Control.** Cover page shows Conservative first.

**Measure.** Presence of all three columns.

**Evidence.** Scenario tab in the workbook.

---

## 6. Worked example — ACME Manufacturing (ILLUSTRATIVE)

Fictional ACME Manufacturing. Figures are **ILLUSTRATIVE arithmetic**, not a market rate and not a result.

| Input | ILLUSTRATIVE value |
|---|---|
| I-01 Volume | 8,400 invoices/month → 100,800 / year |
| I-02 Headcount in scope | 9 FTE |
| I-03 Loaded labour | 65,000 / FTE / year |
| I-04 Manual-touch | 70% |
| I-05 Exception rate | 0.45 exceptions / invoice |
| I-06 Median resolution | 18 minutes |
| I-07 Duplicate confirmed | 0.3% of invoices (count only here) |
| I-08 Late fees actually paid | 12,000 / year |
| I-09 Early-pay opportunity | 40,000 / year available on terms |
| I-10 Processing cost | built in `01` — assume 720,000 / year all-in AP process cost |
| I-11 AI/tool | 48,000 / year |
| I-12 Implementation (one agent + OS discipline) | 90,000 + internal time already in labour |
| I-13 Efficiency on exception minutes | Conservative 8% / Base 18% / Upside 30% **ASSUMED** (no Shadow yet) |
| Productive hours | 1,600 / FTE / year → hourly ≈ 40.6 |

**Exception hours now** ≈ 100,800 × 0.45 × 18 / 60 ≈ **13,608 hours/year**.

| Output (rounded) | Conservative | Base | Upside |
|---|---|---|---|
| Hours released after +2,000 review/gov hours | ~900 | ~2,450 | ~4,080 |
| Monetised labour if overtime/contractor mechanism | ~36k | ~99k | ~166k |
| D3 cash (Conservative: 0; Base: 25% of I-08 + none of I-09; Upside: 50% I-08 + 25% I-09) | 0 | 3k | 16k |
| Minus I-11 | 48k | 48k | 48k |
| Annual net (before amortising I-12) | negative | ~54k | ~134k |
| Payback on 90k | n/m | ~1.5–2 years | <1 year |
| ROI year 1 | n/m | do not quote as a promise | do not headline |

ACME’s Controller would **reject** converting 2,450 hours into 99k savings unless overtime or a vacancy plan exists. The funding conversation is then: **capacity + control evidence**, not ROI.

Hackett’s 60% touchless and Deloitte’s 21% measurable-ROI figures **do not appear** as ACME inputs.

---

## 7. What can go wrong

| Failure | Control |
|---|---|
| Industry average as baseline | Source ID required |
| Guarantee language | This file forbids it |
| Duplicate flags as cash | KPI-RSK-DPP rules |
| Discount opportunity as saving | I-09 vs taken |
| Ignoring review minutes | Mandatory subtraction |
| Headline Upside | Cover page order |
| False precision | Rounding rule |
| Using the case as Measure | Different folder; dictionary |

---

## 8. How you measure the case later

| Model line | After operation, use |
|---|---|
| Hours released | KPI-FIN-HHR with time-study ID |
| Processing cost | KPI-FIN-CPI same model version |
| Exception cost | KPI-FIN-CPE |
| Tool cost | KPI-FIN-AIC |
| Cash | KPI-FIN-SAV only |
| Quality veto | KPI-ERR-FNR, KPI-RSK-BRH |

A project that misses Conservative hours but holds risk-control may still be a **correct** investment. Say so in the Steer pack.

---

## 9. Evidence checklist

- [ ] Input sheet with source IDs / ASSUMED flags  
- [ ] Three scenarios  
- [ ] Sensitivity  
- [ ] Mechanism notes for any $ labour line  
- [ ] Research citations labelled as external, unused as inputs  
- [ ] Controller review  
- [ ] Version and date  

Proof before permission.

---

*End of 00_BUSINESS_CASE_MODEL.md*
