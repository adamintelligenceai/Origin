# Business Case Model — AP Agent OS

**Purpose:** Estimate value and cost of Evidence Room AP Agent OS using **client inputs**. Provide Conservative / Base / Upside scenarios with transparent formulas and **no false precision**.

**External context only (not a client result):** Ardent Partners AP research has published industry cost-to-process figures of **$9.84** and **$9.40** per invoice (performance cohorts in their AP metrics studies). Treat as **external orientation only**, not your baseline. Always replace with measured or estimated **client CPI**.

> Citation: Ardent Partners, Accounts Payable metrics research (cost to process a single invoice; figures $9.84 / $9.40 as published by Ardent). Cite the specific report year your firm licenses when presenting externally. Do not imply Evidence Room measured these figures or that they equal client savings.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Directional ROI model for agentic AP transformation |
| **How** | Inputs → scenarios → formulas → sensitivity; refresh with actuals |
| **Who** | AP Manager + Finance BP build; Controller validates; CFO decides |

---

## Modeling principles

1. **User inputs drive the model** — never hard-code Ardent as client CPI.  
2. **Scenarios, not single points** — Conservative / Base / Upside.  
3. **Ranges beat fake precision** — round; show assumptions.  
4. **Separate benefit classes** — labor productivity, leakage reduction, discount capture, risk avoidance (qualitative if unmeasured).  
5. **Include run-cost of agents** — tools, IDR, platform, oversight labor.  
6. **Benefits lag** — L0–L1 periods realize little automation benefit.  
7. **No double counting** — e.g., don’t count full FTE removal and full exception cost collapse on same hours.

---

## Inputs (client-provided)

### Volume & baseline

| Input | Symbol | Example unit |
|---|---|---|
| Annual invoice volume | `V` | invoices/year |
| Current cost per invoice | `CPI_0` | currency/invoice |
| Current FPY / exception rate | `E_0` | exceptions/invoice |
| Average fully loaded AP FTE cost | `W` | currency/FTE-year |
| AP FTEs in scope | `F_0` | FTE |
| Average invoice value (optional) | `AIV` | currency |
| Confirmed duplicate losses (trailing 12m) | `D_0` | currency |
| Missed discount estimate | `MD_0` | currency/year |
| Late fees / other leakage | `L_0` | currency/year |

If `CPI_0` unknown: estimate `CPI_0 ≈ (F_0 × W + outsource + tools) / V` (label **Estimated**).

### Program costs

| Input | Symbol |
|---|---|
| One-time implementation | `I` |
| Annual platform / licenses | `P` |
| Annual IDR/LLM/variable | `C_var` (or rate × volume) |
| Ongoing oversight FTEs | `F_oversight` |
| Training / change | `T` |

### Improvement assumptions (scenario-specific)

| Assumption | Symbol | Notes |
|---|---|---|
| Labor hours freed (net) | `H` | As % of baseline AP hours or FTE equivalent |
| Exception rate reduction | `ΔE` | Absolute or relative — state which |
| Duplicate loss reduction | `ΔD` | Only on **confirmed** addressable losses |
| Discount capture improvement | `ΔMD` | $ |
| Realization factor | `R` | 0–1, benefits actually harvested |
| Years to steady state | `Y_ss` | typically 1–2 |

---

## Scenarios (default shape — replace with client judgment)

| Lever | Conservative | Base | Upside |
|---|---|---|---|
| Net FTE-equivalent freed | 5–10% | 10–20% | 20–30% |
| Exception rate reduction | 10% relative | 20–30% | 40%+ |
| Duplicate loss reduction | 25% of addressable | 50% | 70% |
| Discount improvement | Small / none | Partial | Strong Treasury alignment |
| Realization factor `R` | 0.5 | 0.7 | 0.85 |
| Time to steady state | 24 months | 18 months | 12 months |
| Variable cost overrun | +20% | +10% | +0% |

These are **starting prompts**, not promises.

---

## Formulas

### Baseline annual AP processing cost
```text
Cost_0 = CPI_0 × V
# or
Cost_0 = F_0 × W + Tools_0 + Outsource_0
```

### Annual benefit (steady state)
```text
Benefit_labor = (FTE_freed × W) × R
# where FTE_freed = F_0 × pct_freed  (net of F_oversight if not already netted)

Benefit_exception = (touch_cost_per_exception × E_0 × V × pct_exception_reduction) × R
# Only if not already fully inside Benefit_labor — pick one primary framing

Benefit_duplicate = (D_0 × pct_dup_reduction) × R

Benefit_discount = (ΔMD) × R

Benefit_leakage = (L_0 × pct_leakage_reduction) × R

Benefit_total = sum of selected non-overlapping benefits
```

### Annual run cost
```text
Cost_run = P + C_var + (F_oversight × W) + Other_run
```

### Net annual value (steady state)
```text
NAV = Benefit_total − Cost_run
```

### Simple payback (undiscounted)
```text
Payback_years ≈ I_total / max(NAV, ε)
# I_total = I + T + other one-time
# If NAV ≤ 0, payback undefined — say so
```

### Multi-year NPV (optional)
```text
NPV = −I_total + Σ_{t=1..N} (Benefit_t − Cost_run_t) / (1 + r)^t
# Benefit_t = Benefit_total × ramp_t
# ramp_t rises from ~0 in observe phase to 1.0 at steady state
```

Show **one decimal year** or round to quarters — not fake day-level precision.

---

## Ramp (default)

| Phase | Autonomy posture | Benefit ramp |
|---|---|---|
| Months 0–3 | L0 observe | ~0–10% |
| Months 3–9 | L1 recommend | ~20–40% |
| Months 9–18 | L2 bounded | ~60–90% |
| Steady state | Per earned ceilings | 100% of scenario benefit |

Align with methodology — do not assume L3 day one.

---

## Worked structure (illustrative numbers — not a forecast)

```text
V = 100,000
CPI_0 = 12.00          # client measured/estimated — NOT Ardent
Cost_0 = 1,200,000

Base: FTE_freed = 1.5; W = 90,000; R = 0.7
Benefit_labor ≈ 1.5 × 90,000 × 0.7 = 94,500

D_0 = 80,000; pct_dup = 50%; R = 0.7
Benefit_duplicate ≈ 28,000

Cost_run ≈ 120,000
NAV ≈ 94,500 + 28,000 − 120,000 = 2,500  → roughly breakeven; test sensitivity
```

Recalculate with real inputs; this block is pedagogy only.

---

## Sensitivity (minimum)

Vary one at a time ±20%: `V`, `pct_freed`, `R`, `P+C_var`, `D_0`.  
Report which three drivers dominate NAV.

---

## What not to do

- Present Ardent Partners **$9.84 / $9.40** as “your savings baseline” or as Evidence Room-measured CPI.  
- Promise fraud elimination $ from A10.  
- Count payment float games that violate supplier terms/ethics policy.  
- Hide oversight labor as “free.”  
- Use four-decimal ROI percentages.

---

## Control / Measure / Evidence

| Dimension | Standard |
|---|---|
| **Control** | Controller review of assumptions; scenario discipline |
| **Measure** | Refresh NAV with actual CPI, FPY, agent cost quarterly |
| **Evidence** | Input sheet versions; actuals vs plan; A14 packs |

---

## Related

- KPI Framework for actuals  
- Methodology step 10 expansion decisions  
- Governance for external claims  

---

## One-page decision checklist

1. Client `CPI_0` and `V` entered?  
2. Benefits non-overlapping?  
3. Agent run-cost included?  
4. Ramp matches autonomy plan?  
5. Conservative case still acceptable strategically?  
6. External benchmarks cited only as context?
