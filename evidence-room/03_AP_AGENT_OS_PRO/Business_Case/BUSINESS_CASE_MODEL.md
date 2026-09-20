# Business-case model

**Product:** Evidence Room — AP Agent OS · Professional  
**Audience:** Transformation lead, Controller, finance business partner  
**Use:** Structure a *local* model from the organisation’s own inputs. Produce Conservative / Base / Upside cases without false precision.  
**Not:** A promise of savings, payback, or ROI. Evidence Room does not stand behind any output of this model as a forecast.

If a sponsor requires a guaranteed return, stop. Do not “fix” the model until it shows one.

Northline Industrials figures in §8 are **illustrative and fictional**. They are not a benchmark.

---

## 1. What this model is allowed to do

- Make **baseline cost** visible from inputs the organisation already believes.
- Show **capacity** that *might* be released if manual-touch and exception minutes change — labelled as a range.
- Show **processing-cost and exception-cost change** as arithmetic on those ranges.
- Compute **payback and ROI** only as outputs of those arithmetic cases, labelled as management judgements.
- Run **sensitivity** so one heroic assumption cannot hide.

It is not allowed to import a vendor’s “typical 40% saving,” invent a fraud-loss avoided, or treat Northline as a customer result.

---

## 2. Inputs (organisation-supplied)

Use trailing twelve months or the last two full quarters. If you do not have a number, leave the cell blank and **drop the output that depends on it**. Do not fill with an industry midpoint.

| ID | Input | Unit | Notes |
|---|---|---|---|
| I1 | Invoice volume | invoices / year | In-scope only. State exclusions (T&E, intercompany if out). |
| I2 | AP headcount on the path | FTE | Specialists + leads on in-scope work. Not the whole SSC. |
| I3 | Fully loaded cost per FTE | currency / year | The number Finance already uses. |
| I4 | Manual-touch share | % of invoices | Invoices that need a human key, edit, or chase. Define it. |
| I5 | Exception rate | % of invoices | First-pass fail / park. Same definition as diagnostic F3. |
| I6 | Exception resolution time | minutes / exception | Observed average or a sampled median. Say which. |
| I7 | Duplicate-suspect rate | % of invoices | Suspects, not confirmed duplicates, not fraud. |
| I8 | Late-payment costs | currency / year | Fees + measurable commercial penalties you already book. If unknown, blank. |
| I9 | Early-pay discount captured | currency / year | Amount actually taken. If unknown, blank. |
| I10 | Processing cost (current) | currency / invoice **or** leave blank | If you already compute cost/invoice, use it. Else derive from I1–I6. |
| I11 | AI / tool cost | currency / year | Licences + estimated model spend for the layer. |
| I12 | Implementation cost | currency | Internal hours at loaded rate + external, one-time. |
| I13 | Efficiency range | % reduction in *touch minutes* | **Three** numbers: conservative / base / upside. Not a vendor promise. Choose from *your* shadow data once you have it; until then, keep conservative near 0. |

**I13 is the honest hard input.** Before any shadow data, set Conservative = 0%, Base = a small planning figure you can defend in a room, Upside = still modest. After 90 days of measured accept/edit/reject, replace I13 with observed ranges.

Do not set I13 from the Ardent or McKinsey citations. Those citations do not describe this toolkit.

---

## 3. Derived quantities

Round to **two significant figures** for money at annual scale (e.g. $1.2m not $1,184,772). Round rates to whole percents unless you measured more tightly.

| ID | Output | Formula (conceptual) |
|---|---|---|
| D1 | Baseline people cost | `I2 × I3` |
| D2 | Exception count | `I1 × I5` |
| D3 | Exception hours | `D2 × I6 / 60` |
| D4 | Exception labour cost | `D3 × (I3 / 1,800)` — use your hours-per-FTE if not 1,800 |
| D5 | Implied processing cost / invoice | If I10 blank: `(D1 + other allocated AP cost you name) / I1` |
| D6 | Layer run cost | `I11` |
| D7 | Layer year-1 cash | `I11 + I12` |

If D5 cannot be computed without inventing “other allocated cost,” leave D5 blank and say so.

---

## 4. Case arithmetic (Conservative / Base / Upside)

For each case, apply that case’s I13 to **touch minutes**, not to headcount and not to invoice volume.

Let `T` = estimated annual human minutes on in-scope manual touches (from I1, I4, and a stated minutes-per-touch, **or** from a time study). If `T` is unknown, you may not compute capacity released. Stop that output.

| Output | Conservative | Base | Upside |
|---|---|---|---|
| Capacity released (hours) | `T × I13_c / 60` | `T × I13_b / 60` | `T × I13_u / 60` |
| Capacity released (FTE-equivalent) | hours / hours-per-FTE | same | same |
| Processing-cost change | − (capacity hours × hourly loaded) **range** | same | same |
| Exception-cost change | Apply I13 only to the *share of I6 you believe is mechanical* (state the share). If unknown, do not take exception-cost credit. | same | same |
| Late-pay / discount change | **Only** if you have a causal chain you already manage (e.g. a measured queue). Otherwise **zero in all cases**. | | |
| Duplicate “savings” | **Zero in all cases.** Suspects are not recoveries. Confirmed recoveries belong in a finance-validated line after the fact. | | |
| Estimated net year-1 | processing-cost change + exception-cost change − D7 | same | same |
| Estimated net steady | processing-cost change + exception-cost change − D6 | same | same |
| Payback | `I12 / max(steady net, 0)` if steady net > 0; else **undefined** | same | same |
| ROI (steady) | `steady net / (D6 + amortised I12)` if you choose to amortise; state the period | same | same |

**If Conservative net is negative or undefined, write that.** A model that cannot show a negative case is marketing.

Capacity released is not a redundancy plan. It is hours that *might* be redeployed. Write the redeployment assumption (close support, vendor-master hygiene, sampling) or write “unallocated.”

---

## 5. Sensitivity

Vary one input at a time. Report the output as a band, not a point.

| Shock | What you learn |
|---|---|
| I13 Base −10 percentage points (absolute) | Whether the case survives modest over-optimism |
| I5 +25% relative | Whether exception mix dominates |
| I11 × 2 | Whether tool cost eats the layer |
| I1 −20% | Volume risk (divestment, insource change) |
| I6 measured vs. guessed | Whether minutes were folklore |

If flipping I13 to Conservative removes the entire “saving,” the board pack must show that. Do not hide the table.

---

## 6. External research — permitted citations only

Use these for **context**, in a footnote or a separate slide labelled “third-party research, not our baseline.” Do not use them as I5, I10, or I13.

### 6.1 Ardent Partners, *State of ePayables 2024* — via Tipalti

**Vendor-originated citation of independent research.** Tipalti cites Ardent Partners’ *State of ePayables 2024* for:

- Cost per invoice: **$2.78** (best-in-class electronic) versus **$12.88** (laggards).
- Cycle time: **3.1 days** versus **17.4 days**.

These figures describe Ardent’s research population as relayed by a vendor. They are not Evidence Room measurements and not Northline results. If you quote them, keep both ends of each pair and keep the attribution chain: *Ardent via Tipalti*.

### 6.2 Ardent Partners, *AP Metrics that Matter 2025* — via Tipalti

**Vendor-originated citation of independent research.** Tipalti cites Ardent’s *AP Metrics that Matter 2025* for an exception-rate comparison of **22% → 9%**.

Do not write “we will go from 22% to 9%.” You may write: “independent research, as cited by a vendor, reported exception rates of 22% and 9% in that comparison.”

### 6.3 McKinsey, November 2025, finance AI

- **44%** of **102 CFOs** reported using gen AI for **five or more** use cases, up from **7%**.
- **65%** were increasing gen AI investment.

This is adoption and intent, not AP cost.

### 6.4 McKinsey, *State of AI 2025* (survey June–July 2025, n=1,993)

- **88%** regular AI use in the business.
- Roughly **two-thirds** not scaling.
- **62%** experimenting with agents.
- **23%** scaling an agent *somewhere* in the enterprise.
- **39%** report **any** EBIT impact.
- Workflow redesign is identified as a **high-performer differentiator**.

Cite this to explain why undocumented agents appear, and why redesign (charters, holds, packets) matters more than a tool switch. Do not cite it as “39% will see EBIT from AP Agent OS.”

No other external statistics may be added in local copies without naming publication, date, sample, and path (direct vs. vendor-originated).

---

## 7. Outputs — how to present

| Slide / section | Must include | Must not include |
|---|---|---|
| Baseline | I1–I6, D1, D5 if known | A single “industry cost/invoice” as ours |
| Layer cost | I11, I12, D6, D7 | “Pays for itself” |
| Cases | Three columns; units; I13 visible | One column “expected” |
| Capacity | Hours and FTE-equivalent; redeployment note | Headcount reduction commitment |
| Payback / ROI | Formula + “undefined if net ≤ 0” + “not a promise” | A single ROI % in the title |
| Sensitivity | At least I13 and I11 | Hidden sheet |
| Research | §6 block if used | Research numbers in the results row |

---

## 8. Northline illustration (fictional — not a target)

The following is a **made-up** workbook so a practitioner can see the shape. Do not present it to a board as comparables.

| Input | Illustrative value |
|---|---|
| I1 Volume | 180,000 / year |
| I2 Headcount | 18 specialists + 3 leads on AP path (use 21 FTE) |
| I3 Loaded cost | $85,000 / FTE (round, fictional) |
| I4 Manual-touch | 70% |
| I5 Exception rate | 28% |
| I6 Resolution | 18 minutes (sampled fiction) |
| I7 Suspects | 0.8% |
| I8 Late-pay | blank (unknown) |
| I9 Discount | blank (unknown) |
| I10 | blank — derive later |
| I11 Tools | $40,000 / year (fictional mix) |
| I12 Implementation | $60,000 internal (fictional) |
| I13 | Conservative 0% · Base 10% · Upside 20% of *touch minutes*, planning figures only |

D1 ≈ $1.8m people cost (two significant figures).  
D2 ≈ 50,000 exceptions.  
I8/I9/I7 contribute **$0** to savings in all cases (unknown or forbidden).  
Conservative net year-1 is **negative** by about D7 ($100k) if I13=0 — *show that*.  
Base/Upside depend entirely on whether the 10–20% minute change is later observed. Until observed, they are scenarios, not forecasts.

Northline’s commissioning success criterion remains evidence quality and control completeness — not this workbook.

---

## 9. Companion files

| File | Job |
|---|---|
| `COST_PER_INVOICE_MODEL.md` | How to compute I10 / D5 properly |
| `AGENT_ECONOMICS.md` | Per-agent cost tokens |
| `ROI_CALCULATOR_SPEC.md` | Sheet layout for Excel |
| `IMPLEMENTATION_ROADMAP.md` | Phases 0–10 |
| `NINETY_DAY_PLAN.md` | First 90 days without a savings gate |
| `BOARD_CFO_SUMMARY.md` | Language that survives the Disclaimer |

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Business-case model |
| Status | Edition 1.0.0 |
| Not | Financial advice, a forecast, or a guarantee |
