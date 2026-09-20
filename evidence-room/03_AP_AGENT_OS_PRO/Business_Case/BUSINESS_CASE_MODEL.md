# Business-case model

**Evidence Room · AP Agent OS Pro**  
Version 1.0 · September 2026 · Licensed material · ERP-agnostic  
Answers: *What should I do? How? Who owns it? How measure? What can go wrong?*

---

## Purpose

Build a *proposal* for time and money to introduce AP agents, using the customer’s own baseline, three explicit scenarios, and a short list of sensitivities.

This model does **not** produce ROI as a fact. It does not guarantee savings, payment safety, fraud recovery, or accounting accuracy. A signed **F6 Validated savings** line in the KPI pack (after the fact) is a different object from the proposal here.

If a slide needs a single internal rate of return to “get through IC,” this is the wrong artefact. Use the scenario table and the list of what would have to be true.

---

## Principles

1. **Inputs are theirs.** Volume, loaded cost, exception mix, cycle time, vendor fees, wages. Not a blog.
2. **Absolute industry $ / invoice is not an input.** Vendor blogs recycle **$10–$15 vs $2–$3** (and near cousins). Treat those as folklore. If a sponsor asks, show Ardent Partners 2024 *relative* Best-in-Class gaps — **78% lower cost, 82% faster, 59% lower exceptions, 9% vs 22% exception rate** — as independent context, then return to the customer’s F1_b.
3. **No false precision.** Round money to thousands (or tens of thousands above $1m). Round rates to whole percentage points unless the denominator is huge *and* the method is tight. Do not show seven-digit IRR.
4. **Hours are not cash** until the cost base changes (role closed, overtime stopped, contractor ended, fee cancelled).
5. **Control cost is in the model.** Certification, IA time, golden-set labour, inference (F3), platform, and the cost of *not* doing unattended payment are features, not footnotes.
6. **Three scenarios, one population.** Conservative / Base / Upside share the same slice definition. Upside is not “also add NetSuite and payments.” That is a different case.
7. **Label working examples ILLUSTRATIVE.** Northline is fictional.

Owner of the model: FP&A. Process owner supplies volumes. AI product owner supplies F3 and platform. Control owner supplies the “cannot save our way out of C-A12-01” constraint.

---

## What you should do (sequence)

1. Freeze the **slice** (entity, ERP, document type, channel) — method Steps 1–4.
2. Complete the **input sheet** below from Finance systems, not from memory.
3. Agree **levers** that this slice can actually move (STP, exception time, external fees). Strike levers you will not measure.
4. Fill Conservative / Base / Upside as *ranges of those levers*, not as three marketing stories.
5. Run **sensitivities** on the three inputs that move the result most.
6. State **cash vs non-cash**. Take only cash to any investment committee that cares about cash.
7. Revisit after pilot with KPI actuals. Replace proposal lines with F6 or withdraw them.

---

## Input sheet

All figures in **one currency**. Name it. Period: **annual run-rate of the slice**, unless stated.

| ID | Input | Source | Unit | Notes |
|---|---|---|---|---|
| V1 | Invoices / year in slice | ERP | count | Not group total if the slice is smaller |
| V2 | Exception rate baseline | Tickets / ERP | % of V1 | Primary codes; disclose |
| V3 | Exceptions / year | V1 × V2 | count | |
| V4 | Median time-to-post baseline | ERP timestamps | days | O10_b |
| V5 | STP rate baseline | Definition O7 | % | |
| C1 | Loaded AP cost for the slice | FP&A | currency / year | Same definition as F1 |
| C2 | of which exception labour | Time study or allocation | currency / year | |
| C3 | External process fees (OCR, BPO, lockbox) | AP | currency / year | Only if the slice would cancel them |
| C4 | Overtime / contractor in slice | HR / AP | currency / year | |
| C5 | Late fees / lost discounts (optional) | Treasury | currency / year | Only if policy will not change for other reasons |
| P1 | One-off implementation (internal + Evidence Room / SI) | Project | currency | Include Observe–Pilot labour |
| P2 | Annual platform + vendor | Contracts | currency / year | |
| P3 | Annual inference (F3) at expected volume | AI owner | currency / year | Scale with V1 and Execute vs Prepare |
| P4 | Annual control / cert / IA / golden-set | IA + QA | currency / year | Do not set to 0 |
| P5 | Contingency on P1 | FP&A | % | Conservative higher |
| H1 | Hours on in-scope tasks baseline | Time study | hours / year | |
| H2 | Review hours the agent will *add* | Estimate, then measure | hours / year | Prepare-class is not zero |
| W1 | Loaded hourly rate | FP&A | currency / hour | For **illustrative** capacity only |

**Optional, rarely reliable at proposal stage:** duplicate-payment recoveries. Put in Upside only if a sample already found recoverable items, and still do not call it fraud detection.

**Never an input:** “industry cost per invoice,” “typical 3–5× ROI,” “autonomous payment will release Treasury.”

---

## Cost-per-invoice (customer)

`F1_b = C1 / V1`

Use F1_b in the pack and in the case. If someone quotes $12 vs $3, write: *those figures are recycled in vendor blogs; our F1_b is [F1_b]. Ardent 2024 reports relative BIC gaps, not our ledger.*

---

## Levers (what may change)

| Lever | KPI link | May enter **cash** case when… | Stays **non-cash** when… |
|---|---|---|---|
| Exception volume down | O6, O15, V2 | Exception labour or BPO actually reduced | Clerks keep the same hours |
| Time-to-post down | O10 | Overtime/late fees actually reduced | Ageing looks better, cost base same |
| STP up | O7 | Headcount or contractor actually reduced | Interventions become “confirmations” of the same duration |
| External fees down | F1, C3 | Contract cancelled or volume-priced down | You added a platform and kept OCR |
| Inference / platform up | F3, P2, P3 | Always — this is incremental cost | — |
| Duplicate blocks | O18 | Recovered cash, or a second payment stopped **and** evidenced | Queue items not proposal-eligible |
| Discount capture | F7 | Terms unchanged and capture evidenced | Treasury moved policy |

Each lever has a **Conservative / Base / Upside** assumption, written as a *percentage of the baseline lever*, not as “we will be BIC.”

---

## Scenarios

Define for a **steady year after pilot** (year 2). Year 1 is implementation + partial volume — model it separately as a ramp (e.g. 0 / 40 / 70% of steady benefits, 100% of P1 in year 1).

| Lever | Conservative | Base | Upside |
|---|---|---|---|
| Exception rate vs V2 | Small reduction or flat if the slice is already match-heavy | Modest reduction on codes the agents actually touch | Larger reduction, still below “Ardent BIC 9%” unless V2 is already close |
| Hours on touched tasks | Review time offsets most gross hours | Net hours down on touched tasks only | Net hours down and a role / OT line actually cut |
| External fees | 0 change | Partial | Contract change signed |
| F3 + platform | High (Prepare everywhere, poor caching) | Expected canvas | Lower because of deterministic share |
| O18 / discounts | 0 | 0 unless sampled | Only if sampled |
| Ramp year 1 benefit | 0–25% | ~40% | ~70% |
| P1 contingency | 30% | 20% | 15% |

**Rule of thumb for honesty:** if Upside requires a second ERP, A12, or a headcount programme, it is a second case.

### Formulas (steady year)

Gross capacity hours (illustrative, non-cash):

`H_gross = H1 × share_of_hours_on_touched_tasks × hour_reduction_factor`  
`H_net = H_gross − H2`  
`Capacity_$ = H_net × W1`  ← label **ILLUSTRATIVE, NON-CASH** unless converted.

Cash benefits (only signed lines):

`B_cash = ΔC2_realised + ΔC3_realised + ΔC4_realised + ΔC5_realised + O18_recovered`  
(each Δ is a line that survived the “cost base changed” test)

Cash costs:

`K_year1 = P1 × (1 + P5) + (P2 + P3 + P4) × year1_fraction`  
`K_steady = P2 + P3 + P4`

`Net_cash_steady = B_cash − K_steady`  
`Net_cash_y1 = B_cash × ramp − K_year1`

Payback (only if Net_cash_steady > 0 **and** B_cash is signed methodology):

`Simple payback ≈ K_year1 / Net_cash_steady` years  
Round to half-years. If Net_cash_steady ≤ 0, write **“no cash payback under this scenario.”** Do not compute IRR on non-cash capacity.

---

## Sensitivity

Hold Base, vary one input at a time:

| Sensitivity | Typical test | Why |
|---|---|---|
| S1 Volume | V1 −20% / +20% | M&A, demand, scope cut |
| S2 Inference | P3 × 0.5 / × 2 | Model mix, re-extracts, poor caching |
| S3 Hour realisation | 0% / 50% / 100% of H_net converted to C4/C2 | The usual place cases die |
| S4 Exception rate | No change / Base / Upside | Agents that only file and extract may not move V2 |
| S5 Implementation | P1 × 1.3 | Dual-ERP, messy intake |
| S6 Control event | One prevented duplicate (evidenced) vs one duplicate paid | Fat tail; do not average into Base |

Tornado: rank S1–S6 by impact on Net_cash_steady. If S3 dominates — and it usually does — the honest story is **capacity and control**, not cash, until a manager changes the cost base.

---

## What can go wrong (in the case itself)

| Failure | Prevention |
|---|---|
| Double-counting hours and F1 | F1 already includes labour; do not add Capacity_$ to B_cash |
| Using Ardent 78% as a multiplier on C1 | Forbidden |
| Putting A12 “payment automation savings” in Upside | Forbidden; authorisation stays human |
| Counting O17 as cash | Only O18 with a rule |
| Year-1 benefits at steady-state | Use the ramp |
| Ignoring P4 | Certification is not optional (governance) |
| Precision theatre | Rounding rules above |

---

## Decision rules for sponsors

| If you see… | Do this |
|---|---|
| Net_cash_steady < 0 in Base, but R and O cases are strong | Fund as a **control and cycle-time** programme with a cost cap; do not call it ROI |
| Only Upside is cash-positive, and Upside needs headcount out | Require a named workforce action or drop the cash claim |
| S3 = 0% conversion still “shows ROI” | Recheck double-count; you probably used Capacity_$ as cash |
| Dual-ERP group, case on one ERP only | Keep R-SCOPE residual explicit; do not claim group duplicate risk is treated |

---

## Worked example — Northline Industrial Group

**ILLUSTRATIVE. Fictional company. Not a case study. Not a result. Numbers are rounded on purpose.**

### Situation (given)

- 4,200 employees  
- ~18,000 invoices / month group-wide (~216,000 / year)  
- SAP S/4HANA (core) + NetSuite (acquired Northline Pacific Components)  
- First case **slice:** SAP PO invoices, company code 1000, inbound inbox — **not** the 216k

### ILLUSTRATIVE inputs (slice only)

| ID | Illustrative value | Comment |
|---|---|---|
| V1 | 72,000 / year | ~6,000 / month of the 18,000 are this slice — **invented split** |
| V2 | 24% | From the methodology’s illustrative ticket mix |
| V3 | ~17,000 | Rounded |
| V4 | 6 days median | Invented |
| V5 | 31% STP | Invented |
| C1 | $2.4m / year | Loaded NL10 shared-services × slice share — **invented** |
| C2 | $1.1m | Exception-heavy — invented |
| C3 | $80k | OCR — invented |
| C4 | $120k | OT / contractor — invented |
| C5 | $0 | Not evidenced; leave out |
| P1 | $350k | Observe→pilot, internal + external — invented |
| P2 | $90k | Platform — invented |
| P3 | $40k Base / $70k Conservative / $25k Upside | Inference — invented |
| P4 | $60k | Cert, IA, golden set — invented |
| P5 | see scenarios | |
| H1 | 28,000 hours | Invented |
| share touched | 45% | Intake, extract, match, chase — invented |
| W1 | $55 / hour | Invented loaded rate |

`F1_b ≈ 2,400,000 / 72,000 ≈ $33 / invoice` on **this slice definition**.  
That number is **not** comparable to blog $10–$15 / $2–$3 (different cost base, different mix). It is also **not** a promise of the post-state.

Ardent 2024 context (not applied as a multiplier): BIC relative gaps of 78% cost, 82% cycle, 59% exceptions, 9% vs 22% exception rate. Northline’s illustrative V2 is 24% on this slice — in the neighbourhood of Ardent’s “others” 22%, **which does not mean** the slice will move to 9%.

### ILLUSTRATIVE lever assumptions (steady year, SAP PO 1000 only)

| Lever | Conservative | Base | Upside |
|---|---|---|---|
| Exception rate | 24% → 22% | 24% → 19% | 24% → 16% |
| Hour reduction on touched tasks (gross) | 15% | 30% | 40% |
| H2 added review | 3,000 h | 2,200 h | 1,500 h |
| C3 OCR | 0 change | −$20k | −$40k (renegotiate) |
| C4 OT/contractor | 0 (hours not taken out) | −$40k | −$120k (contractor line ended) |
| C2 cash take-out | 0 | −$80k | −$180k |
| O18 / C5 | 0 | 0 | 0 (no sample yet) |
| Ramp y1 on benefits | 20% | 40% | 60% |
| P5 | 30% | 20% | 15% |

A12 is **out of scope**. No payment-automation benefit line exists. Payment release stays human.

### ILLUSTRATIVE capacity (non-cash)

Touched hours baseline ≈ 28,000 × 0.45 ≈ 13,000 h (rounded).

| | Conservative | Base | Upside |
|---|---|---|---|
| H_gross | ~1,900 h | ~3,800 h | ~5,200 h |
| H_net | < 0 after H2 (review dominates) | ~1,600 h | ~3,700 h |
| Capacity_$ at W1 | **n/a / small negative** | ~$90k **NON-CASH** | ~$200k **NON-CASH** |

Conservative non-cash capacity can be **negative** (Prepare-class confirmations). That is an acceptable finding. It means the case, if any, is control and cycle time — or you do not do it yet.

### ILLUSTRATIVE cash

| | Conservative | Base | Upside |
|---|---|---|---|
| B_cash steady | $0 | $80k + $20k + $40k = **~$140k** | $180k + $40k + $120k = **~$340k** |
| K_steady (P2+P3+P4) | 90+70+60 = **~$220k** | 90+40+60 = **~$190k** | 90+25+60 = **~$175k** |
| Net_cash_steady | **~$−220k** | **~$−50k** | **~$165k** |
| K_year1 (P1×(1+P5) + K_steady) | ~350×1.3 + 220 ≈ **$680k** | ~350×1.2 + 190 ≈ **$610k** | ~350×1.15 + 175 ≈ **$580k** |
| Y1 benefit | 0 | ~$60k | ~$200k |
| Net_cash_y1 | **negative, large** | **negative, large** | **negative** |

**Reading (still ILLUSTRATIVE):** under these invented numbers, Base does **not** show cash payback in a steady year. Upside does only if contractor and exception labour actually leave the cost base. Conservative is a cost of control. A sponsor who needs a 12-month cash ROI should **not** be sold this slice as that.

Simple payback: Conservative/Base — **no cash payback**. Upside — on the order of **3–4 years** if (and only if) Upside labour actions occur; do not quote a narrower figure.

### ILLUSTRATIVE sensitivities (Base)

| Test | Direction of Net_cash_steady |
|---|---|
| S3 0% labour take-out | ~$−170k (only −$20k fees vs $190k cost) |
| S3 100% of Capacity_$ treated as cash (incorrect) | Looks better — **reject this test as a case method** |
| S2 P3 × 2 | ~$−90k |
| S5 P1 × 1.3 | Year-1 worse; steady unchanged |
| S4 no exception-rate move | C2 take-out in Base probably fails → toward Conservative |
| S6 one $250k duplicate paid | Dominates any year of this case — reason C-A12-01 and A10 exist |

### What Northline should do (method, not a promise)

1. Fund Observe–Shadow from a **control and learning** budget, not from a committed F6.  
2. Keep payment release human (A12 challenge only, if ever in scope); do not put payment ROI in v2 of the case.  
3. Do not add NetSuite to this case; write a second case after A10 / A02 span both ERPs (R-SCOPE).  
4. After a 30-day pilot, replace C2/C4 assumptions with measured H_net and a manager decision on OT/contractor.  
5. If H_net is near zero, decide whether the remaining reason to proceed is control evidence and cycle time. That can still be a good decision. It is not a savings story.

---

## Document footer (every customer case)

```
Slice:
Currency:
Input sheet version:
Scenario date:
FP&A owner:
Process owner:
Control owner (confirms no payment-automation line):
This document is a proposal. It is not validated savings (KPI F6).
Industry $ / invoice figures were not used as inputs.
ILLUSTRATIVE examples, if any, are labelled and are not this customer.
```

---

## Related documents

- `../KPI_and_Measurement/KPI_FRAMEWORK.md` — F1–F6, O7, O18
- `../Process_Mapping/ER_METHODOLOGY.md` — Steps 8–10
- `../Controls/RISK_REGISTER.md` — residual risk is not a line item you “save”
- `../Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`
