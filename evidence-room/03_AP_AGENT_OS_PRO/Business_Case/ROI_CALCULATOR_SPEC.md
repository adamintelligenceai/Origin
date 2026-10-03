# ROI calculator specification

**Product:** Evidence Room — AP Agent OS · Professional  
**Use:** Build a local workbook (Excel or equivalent) from this spec.  
**Not:** A shipped calculator. Evidence Room does not provide a hosted model and does not certify your file.

Every results sheet must display this banner:

> Outputs are arithmetic on your inputs. They are not a forecast and not a promise of savings, payback, or ROI. Duplicate-suspect lines do not create savings. Leave unknown inputs blank; do not replace them with industry averages.

---

## 1. Workbook structure

| Sheet | Name | Purpose |
|---|---|---|
| 0 | `COVER` | Banner, edition, owner, date, envelope (Narrow/Central/Inclusive) |
| 1 | `INPUTS` | I1–I13, yellow = required for baseline, blue = optional, orange = I13 cases |
| 2 | `DERIVED` | D1–D7, hours-per-FTE, hourly rate |
| 3 | `CASES` | Conservative / Base / Upside side by side |
| 4 | `SENSITIVITY` | One-way shocks |
| 5 | `CPI` | Cost per invoice envelopes |
| 6 | `RESEARCH` | Locked text of permitted citations — **no formulas that use these numbers** |
| 7 | `AUDIT` | Input source, date, who attested |

Do not add a `FRAUD` sheet. Do not add a `BENCHMARK_TARGET` sheet that subtracts Ardent $2.78 from D5.

---

## 2. Named ranges (`INPUTS`)

| Name | Cell type | Validation |
|---|---|---|
| `vol_invoices` | Integer ≥ 0 | Blank allowed |
| `fte_path` | Number ≥ 0 | |
| `loaded_cost_fte` | Currency ≥ 0 | |
| `hours_per_fte` | Number, default 1800 | Must be visible, not hidden |
| `manual_touch_pct` | 0–1 | |
| `minutes_per_touch` | Number ≥ 0 | Required to compute T |
| `exception_rate` | 0–1 | |
| `minutes_per_exception` | Number ≥ 0 | |
| `mechanical_share_of_exc` | 0–1 | Default 0 until justified |
| `dup_suspect_rate` | 0–1 | Display only; **not used in savings** |
| `late_pay_cost` | Currency | Blank = 0 credit |
| `early_pay_captured` | Currency | Blank = 0 credit; do not assume uplift |
| `late_pay_change_c/b/u` | Currency | Default 0, 0, 0 |
| `discount_change_c/b/u` | Currency | Default 0, 0, 0 |
| `cpi_given` | Currency or blank | If present, overrides derived CPI for display only |
| `tool_cost` | Currency / year | |
| `impl_cost` | Currency | |
| `eff_c` `eff_b` `eff_u` | 0–1 | I13 |
| `amort_years` | Integer ≥ 1, default 3 | For ROI only; state it |

Colour: inputs yellow/blue/orange; all other sheets protected.

---

## 3. Formulas (`DERIVED`)

```
hourly = loaded_cost_fte / hours_per_fte
D1_people = fte_path * loaded_cost_fte
D2_exc = vol_invoices * exception_rate
D3_exc_hours = D2_exc * minutes_per_exception / 60
D4_exc_labour = D3_exc_hours * hourly
T_minutes = vol_invoices * manual_touch_pct * minutes_per_touch
T_hours = T_minutes / 60
D5_cpi = IF(cpi_given="", D1_people / vol_invoices, cpi_given)
         // Note: D5 using only D1 is Narrow. Document envelope on COVER.
D6_run = tool_cost
D7_y1 = tool_cost + impl_cost
```

If `vol_invoices` is blank or 0, `D5_cpi` is `NA()`.

Check: `D4_exc_labour` should be ≤ `D1_people`. If not, flag `INPUT_INCONSISTENT` on `DERIVED!A1`.

---

## 4. Formulas (`CASES`) — one column per case

Let `eff` be `eff_c`, `eff_b`, or `eff_u`.

```
capacity_hours = T_hours * eff
capacity_fte = capacity_hours / hours_per_fte
proc_cost_change = - capacity_hours * hourly
exc_cost_change = - (D4_exc_labour * mechanical_share_of_exc * eff)
late_change = late_pay_change_[case]     // default 0
disc_change = discount_change_[case]     // default 0
dup_change = 0                           // HARDCODED
gross_benefit = proc_cost_change + exc_cost_change + late_change + disc_change
                 // signs: cost_change is negative when costs fall;
                 // for "benefit" display use = -proc_cost_change + ...
// Prefer displaying "cost_out" as positive reductions:
reduction_processing = capacity_hours * hourly
reduction_exception = D4_exc_labour * mechanical_share_of_exc * eff
gross_reduction = reduction_processing + reduction_exception + late_change + disc_change
net_y1 = gross_reduction - D7_y1
net_steady = gross_reduction - D6_run
payback_years = IF(net_steady<=0, "undefined", impl_cost / net_steady)
roi_steady = IF((D6_run + impl_cost/amort_years)<=0, "undefined",
                net_steady / (D6_run + impl_cost/amort_years))
```

Display `payback_years` as one decimal or `undefined`. Display `roi_steady` as a percent with **no more than two significant figures** (e.g. 40% not 37.42%).

Redeployment note (required text cell): user types where capacity_fte would go, or `unallocated`.

---

## 5. `SENSITIVITY`

Table: rows = shocks; columns = `net_steady` Base after shock.

| Shock | Implementation |
|---|---|
| I13 Base −10pp | `eff_b - 0.10`, floor 0 |
| Exception rate +25% relative | `exception_rate * 1.25` (recompute D2–D4 and exception reduction) |
| Tool cost × 2 | `tool_cost * 2` |
| Volume −20% | `vol_invoices * 0.8` (recompute T and D2) |
| Minutes-per-touch = 0 (no T) | `capacity` and processing reduction → 0; show `T unknown` |

Chart: tornado on `net_steady`. Title: “Sensitivity of modelled steady net — not a forecast.”

---

## 6. `CPI`

Compute Narrow = `D1_people / vol_invoices`.  
Central and Inclusive are **manual adds** (licence allocation, liaison hours). Provide input rows `alloc_capture`, `alloc_liaison_hours`.  

```
cpi_narrow = D1_people / vol_invoices
cpi_central = (D1_people + alloc_capture) / vol_invoices
cpi_inclusive = (D1_people + alloc_capture + alloc_liaison_hours * hourly) / vol_invoices
layer_per_k = (tool_cost / vol_invoices) * 1000
```

No cell may read from `RESEARCH`.

---

## 7. `RESEARCH` (text only)

Paste, locked:

1. Ardent Partners, *State of ePayables 2024*, as cited by Tipalti (vendor-originated citation of independent research): $2.78 vs $12.88 cost/invoice; 3.1 vs 17.4 days.
2. Ardent Partners, *AP Metrics that Matter 2025*, as cited by Tipalti (vendor-originated citation): exception 22% → 9% in that comparison.
3. McKinsey, Nov 2025 finance AI: 44% of 102 CFOs, 5+ gen AI use cases (from 7%); 65% increasing investment.
4. McKinsey, *State of AI 2025*, Jun–Jul 2025, n=1993: 88% regular use; ~2/3 not scaling; 62% experimenting with agents; 23% scaling an agent somewhere; 39% any EBIT impact; workflow redesign as high-performer differentiator.

---

## 8. `AUDIT`

| Input | Source system / file | Date | Attested by |
|---|---|---|---|
| vol_invoices | | | |
| … | | | |

A workbook without `AUDIT` rows for I1–I6 is not ready for steering.

---

## 9. Protection and distribution

- Protect all non-input cells.
- Do not hide I13.
- Filename: `AP_agent_layer_model_[org]_[date]_NOT_A_FORECAST.xlsx`
- Cover footer: Evidence Room — AP Agent OS · evidenceroom.ai · Proof before permission. Northline numbers, if copied in for training, labelled fictional.

---

## 10. Acceptance test for the built file

1. All I13 = 0 → Conservative `net_y1` equals `−D7_y1` (negative if costs exist).
2. `dup_suspect_rate` changing does not change `gross_reduction`.
3. Blank `late_pay_cost` does not create a reduction.
4. `RESEARCH` values do not appear in any formula.
5. Banner visible on `CASES` when printed.

If any test fails, the file is not this spec.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | ROI calculator specification |
| Status | Edition 1.0.0 |
| Not | A guarantee, a hosted tool, or financial advice |
