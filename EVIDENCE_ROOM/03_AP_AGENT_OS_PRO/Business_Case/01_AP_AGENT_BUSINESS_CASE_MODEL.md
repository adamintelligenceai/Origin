# AP Agent Business Case Model

**Product:** Evidence Room — AP Agent OS · Professional  
**Document ID:** ER-AP-BC-001  
**Version:** 1.0  
**Audience:** CFO, Controller, Finance Transformation, Head of AP  
**Purpose:** Provide a transparent planning model for AP agent investment decisions — inputs, scenarios, outputs, and sensitivity — without guaranteed ROI or savings claims.

---

## 1. Critical framing

**All numeric examples in this document are illustrative planning ranges for structuring a business case. They are not forecasts, benchmarks you should adopt uncritically, or guarantees of savings, ROI, payback, or audit outcomes.**

- Where an external market statistic is used, it must be cited in `09_RESEARCH/` (Research Ledger) with source, date, URL, and independence flag.  
- Where no ledger entry exists, label the figure **Model assumption**.  
- Separate **capacity released** from **cash savings realised**.  
- Align metric definitions with `KPI_Measurement/01_AGENT_PERFORMANCE_SCORECARD.md`.  
- Refresh the model with **Validated** actuals after pilot; until then, treat outputs as decision support only.

---

## 2. Model scope

| In scope | Out of scope |
|----------|--------------|
| AP labour capacity and exception cost hypotheses | Guaranteed fraud-loss reduction |
| Platform / model / licence cost hypotheses | ERP replacement business case |
| Pilot and scale programme cost | Autonomous payment benefits |
| Control/rework cost hypotheses | Tax advice outcomes |
| Scenario comparison (Conservative / Base / Upside) | Vendor sales quotes presented as Evidence Room results |

---

## 3. Inputs

### 3.1 Volume & baseline operations

| Input ID | Input | Unit | Source type | Notes |
|----------|-------|------|-------------|-------|
| V1 | Invoices / month (in-scope entities) | # | Validated preferred | Define invoice vs credit note treatment |
| V2 | Exception rate (baseline) | % | Validated / Estimated | From workflow if possible |
| V3 | Exceptions / month | # | Calc: V1×V2 | |
| V4 | Median touch time — STP invoice | minutes | Time study / Estimated | |
| V5 | Median touch time — exception | minutes | Time study / Estimated | |
| V6 | AP FTE (in-scope) | FTE | Validated | |
| V7 | Fully loaded cost per FTE / year | currency | Finance | Exclude one-offs |
| V8 | Temporary / overtime AP cost / year | currency | Validated | |
| V9 | Baseline duplicate incidents / year (confirmed) | # / $ | Validated if known | Do not invent |
| V10 | Baseline aged >60 days open items | # / $ | Validated | Attribution later optional |

### 3.2 Quality & automation hypotheses (model assumptions unless measured)

| Input ID | Input | Unit | Typical use |
|----------|-------|------|-------------|
| Q1 | Expected Δ STP rate (points) | pp | Scenario-specific |
| Q2 | Expected Δ exception handling time | % | Scenario-specific |
| Q3 | Expected human intervention rate after agent | % | From shadow/pilot when available |
| Q4 | Expected extraction/match accuracy | % | Gate from scorecard — not a savings driver alone |
| Q5 | Share of hours released convertible to cash (mgmt action) | % | Often low initially — be explicit |

### 3.3 Cost inputs

| Input ID | Input | Unit | Source type |
|----------|-------|------|-------------|
| C1 | Evidence Room licence (tier) | currency / year | Commercial fact for buyer |
| C2 | Model / OCR / orchestration run cost | currency / month | Vendor + Estimated usage |
| C3 | Integration / implementation internal days | person-days | Estimated |
| C4 | External implementation support (if any) | currency | Quote |
| C5 | Ongoing Agent Owner / platform support | FTE fraction | Estimated |
| C6 | Training / change cost | currency | Estimated |
| C7 | Audit / control enhancement cost | currency | Estimated |
| C8 | Contingency on one-time costs | % | Model assumption |

### 3.4 Timing

| Input ID | Input | Notes |
|----------|-------|-------|
| T1 | One-time investment period | Months until steady state |
| T2 | Benefits ramp | e.g. 0% → 50% → 100% over N months — **assumption** |
| T3 | Evaluation horizon | e.g. 24 or 36 months — planning choice |

### 3.5 External benchmarks

If you insert third-party cost-per-invoice or automation rates, **add a Research Ledger ID** in the assumption table. If none, leave blank and use only internal baselines.

| Benchmark pointer | Ledger ID | Used in input | Independence |
|-------------------|-----------|---------------|--------------|
| *(add rows as needed)* | | | |

---

## 4. Scenarios

Define three scenarios with **explicit assumption sets**. Do not present a single “expected ROI.”

### 4.1 Conservative

- Smaller STP improvement; slower ramp; lower convertibility of hours to cash  
- Higher contingency; includes rework/control cost drag  
- Limited agent scope (e.g. 1–2 agents, L1–L2 only)  
- Duplicate-prevention value counted only if baseline confirmed duplicates exist  

### 4.2 Base

- Midpoint operational improvement from pilot-informed assumptions  
- Partial FTE capacity reuse (not full cash removal)  
- 3–5 agents over horizon; L2 with selective L3 on low-risk slices  
- Inference costs scale with volume  

### 4.3 Upside

- Stronger STP and exception-time improvements **conditional on** data quality and Procurement cooperation  
- Higher convertibility of capacity to avoided backfill/temps  
- Broader agent coverage — still **no** autonomous payment benefits  
- Still includes platform and control costs (do not zero them out)

**Rule:** Upside is not “remove all controls and assume perfection.”

---

## 5. Core calculations

Use consistent currency and annualisation. Show formulas in the working spreadsheet.

### 5.1 Baseline cost

\[
\text{Baseline AP labour cost} = V6 \times V7 + V8
\]

Optional activity-based view:

\[
\text{Baseline effort hours/month} = \frac{V1 \times V4 \times (1-V2) + V3 \times V5}{60}
\]

\[
\text{Implied labour $ / month} = \text{effort hours} \times \text{loaded hourly rate}
\]

Loaded hourly rate from V7 (and local hours/FTE assumption — **model assumption**, state it).

### 5.2 Capacity released (hours)

\[
\text{Hours released/month} = \text{Baseline effort hours} - \text{Post-agent effort hours}
\]

Post-agent effort uses Q1–Q3. Label **Estimated** until time study refreshes.

### 5.3 Cost changes (ongoing)

\[
\text{Ongoing AI cost/year} = 12 \times C2 + C1 + (C5 \times V7)
\]

\[
\text{Net operating cost change/year} = \text{Ongoing AI cost} + \Delta\text{rework/control cost} - \text{Validated cash savings} - (\text{Hours released} \times \text{hourly} \times Q5)
\]

Keep the Q5 term visually separate from Validated cash savings.

### 5.4 One-time investment

\[
\text{One-time} = (C3 \times \text{daily loaded rate}) + C4 + C6 + C7
\]

\[
\text{One-time with contingency} = \text{One-time} \times (1+C8)
\]

### 5.5 Savings (planning)

| Savings line | Treatment |
|--------------|-----------|
| Reduced temp/overtime | Validated when budget lines drop |
| Avoided backfill | Estimated until hiring plan changes |
| Blocked duplicate payments | Validated per incident evidence; do not extrapolate from one event without history |
| Discount capture | Multi-factor; attribution Estimated |
| Hours × rate × Q5 | Capacity value — **Estimated**; disclose Q5 |

\[
\text{Planning benefit/year} = \sum \text{savings lines (tagged V or E)}
\]

### 5.6 Payback (planning)

\[
\text{Payback months} \approx \frac{\text{One-time with contingency}}{\text{Average monthly net benefit after ramp}}
\]

If net benefit ≤ 0 in Conservative, report **payback not achieved within horizon** — do not force a number.

### 5.7 ROI (planning)

\[
\text{ROI}_{horizon} = \frac{\text{Cumulative net benefit over horizon} - \text{One-time}}{\text{One-time}}
\]

State horizon (T3). Present Conservative / Base / Upside as a range, not a point.

### 5.8 Sensitivity

Minimum sensitivity tornado (vary ± inputs):

| Driver | Suggest vary |
|--------|--------------|
| V1 volume | ±20% |
| Q1 STP improvement | ±50% relative |
| Q2 exception time reduction | ±50% relative |
| Q5 convertibility to cash | 0% / Base / +absolute |
| C2 inference cost | ±50% |
| C3–C4 implementation cost | ±30% |
| Ramp speed T2 | slower / base / faster |

Report which drivers move ROI/payback most. If ROI is only positive when Q5 is high **and** inference cost is low **and** STP uplift is high, say so plainly.

---

## 6. Outputs checklist (what the finished case must show)

1. **Baseline cost** — labour and, if used, activity-based view (lineage noted)  
2. **Capacity released** — hours and FTE-equivalent (Estimated unless measured)  
3. **Cost changes** — one-time, ongoing AI, support, control  
4. **Savings** — table with Validated vs Estimated tags; no double count  
5. **Payback** — per scenario or “not within horizon”  
6. **ROI** — per scenario at stated horizon  
7. **Sensitivity** — tornado or table  
8. **Non-financial value** — control evidence quality, auditability, scalability of operating model (qualitative; not monetised unless evidenced)  
9. **Risks to the case** — data quality, adoption, model change, governance delay  
10. **Decision ask** — e.g. fund Phase 0–8 for Wave A; not “approve perpetual L4”

---

## 7. Illustrative worked skeleton (fictional numbers)

> **Fictional organisation for format only. Model assumptions throughout. Not a result.**

| Input | Value | Tag |
|-------|-------|-----|
| V1 Invoices/month | 12,000 | Assumption |
| V2 Exception rate | 28% | Assumption |
| V6 AP FTE in scope | 14 | Assumption |
| V7 Loaded cost/FTE | 85,000 | Assumption |
| C1 Licence | 199 (product) + internal platform | Mixed |
| Horizon | 24 months | Choice |

| Scenario | Planning payback | Planning ROI (24m) |
|----------|------------------|---------------------|
| Conservative | Not within 24m **or** long | Low / negative possible |
| Base | Mid-horizon possible | Modest positive possible |
| Upside | Faster possible | Higher possible |

**Replace every assumption with local data before any executive decision. Do not cite this skeleton externally as Evidence Room performance.**

---

## 8. Governance of the business case

| Rule | Practice |
|------|----------|
| Owner | Finance BP + Process Owner jointly |
| Update cadence | After pilot; then semi-annual |
| Actuals feed | Scorecard Validated lines only for “results” slides |
| Forbidden | Guaranteed savings language; single-point ROI without scenarios; counting payment automation benefits |
| Audit | Keep versioned model file with assumption log |

---

## 9. Linkage to programme phases

| Phase | Business case use |
|-------|-------------------|
| 0–4 | Directional Conservative/Base only; high uncertainty |
| 6–7 | Replace Q-inputs with shadow measurements where possible |
| 8 | Pilot actuals; narrow ranges |
| 9–10 | Validated savings tracking; revisit scale funding |

---

## 10. Related documents

- `KPI_Measurement/01_AGENT_PERFORMANCE_SCORECARD.md`  
- `Process_Mapping/02_IMPLEMENTATION_ROADMAP.md`  
- `Governance/01_AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `09_RESEARCH/` Research Ledger  
- `Templates/` business case workbook (when packaged)

---

## Document control

| Version | Change |
|---------|--------|
| 1.0 | Initial business case model |

**Disclaimer:** This model is a planning toolkit. Evidence Room does not guarantee cost reduction, ROI, payback, duplicate prevention value, or discount capture. Decisions remain with the buyer’s finance leadership under their risk appetite and validated measurements.
