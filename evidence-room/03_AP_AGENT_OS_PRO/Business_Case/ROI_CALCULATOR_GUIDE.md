# ROI Calculator Guide

**Evidence Room — AP Agent OS Pro**  
**Document type:** Calculator specification (for Excel/Sheets build)  
**Discipline:** Transparent formulas; scenario toggles; no hidden “AI uplift” cells.

---

## 1. Purpose

Explain how to build a buyer-owned ROI calculator that supports Conservative / Base / Upside cases. Evidence Room does not ship a black-box that invents savings.

---

## 2. Suggested workbook tabs

| Tab | Content |
|---|---|
| `Inputs_Baseline` | Volumes, rates, costs — measured |
| `Inputs_Program` | Licences, delivery, inference |
| `Scenarios` | Driver toggles |
| `Calc_Benefits` | Benefit lines with sources |
| `Calc_Costs` | Cost lines |
| `Outputs_Summary` | Net, payback, sensitivity |
| `Assumptions_Log` | Versioned assumptions |
| `Benchmark_Context` | Ardent citations (locked text) |

---

## 3. Core formulas

### Cost per invoice

```text
CPI = (AP_Labour + AP_Outsource + Allocated_Platform + Allocated_Other) / Invoices
```

### Exception rate

```text
Exception_Rate = Invoices_With_Exception / Invoices_In_Scope
```

### STP

```text
STP = STP_Invoices / Invoices_In_Scope
```

(Use dictionary definitions — not “posted somehow.”)

### Hours released (estimated)

```text
Hours_Released = Σ (Baseline_Minutes_Per_Task − Current_Minutes_Per_Task) × Task_Volume / 60
```

### Labour benefit ($)

```text
Labour_Benefit = Hours_Released × Fully_Loaded_Hourly_Rate × Realization_Factor
```

`Realization_Factor` ≤ 1 (Conservative often 0.4–0.6; Base ~0.7; Upside ~0.85 — **illustrative bands**, set locally). Hours not removed from budget ⇒ factor near 0 for cash ROI.

### Inference cost

```text
Inference_Cost = Σ Tokens_Or_Calls × Unit_Price
```

(Or vendor invoice total.)

### Cost per correct outcome

```text
CPCO = (Labour_Alloc_Agent_Scope + Platform_Alloc + Inference) / Correct_Outcomes
```

### Net Year-1

```text
Net_Y1 = Benefit_Y1_Recognized − (One_Time + Run_Y1)
```

### Payback (months)

```text
Payback = One_Time / Monthly_Run_Rate_Net_Benefit
```

Show as range across scenarios; avoid single false-precise month.

---

## 4. Scenario toggle design

| Cell | Conservative | Base | Upside |
|---|---|---|---|
| Exception_Rate_Delta_pp | small | medium | larger |
| Realization_Factor | low | mid | high |
| Ramp_Months_To_Steady | longer | planned | shorter |
| Risk_Contingency_% | higher | mid | lower |

All benefit lines multiply by scenario factors — do not hardcode three disconnected models that drift.

---

## 5. Benefit line catalogue (enable/disable)

| ID | Line | Default |
|---|---|---|
| B1 | Labour hours released | On |
| B2 | Outsource unit reduction | Optional |
| B3 | Avoided duplicate payments | On if history exists |
| B4 | Discount capture improvement | Optional / Treasury |
| B5 | Audit evidence hours | Optional |
| B6 | Working capital interest | Off unless Treasury method |

---

## 6. Cost line catalogue

| ID | Line |
|---|---|
| C1 | Evidence Room licence (Starter $79 / Professional $199 / Team $499 / Custom $1,500–$3,000) |
| C2 | Free Diagnostic $0 (always available) |
| C3 | Implementation internal |
| C4 | Implementation partner |
| C5 | Integration/IT |
| C6 | Inference |
| C7 | Training/change |
| C8 | Ongoing governance QA |
| C9 | Contingency |

---

## 7. Sensitivity (minimum)

Tornado or table on:

1. Realization factor  
2. Exception rate delta  
3. Inference cost  
4. Implementation cost  
5. Volume (±20%)  

---

## 8. Validation checks (workbook QA)

- [ ] CPI reconciles to finance view within tolerance  
- [ ] Invoice counts match ERP extract  
- [ ] No benefit line double-counts same hours  
- [ ] Ardent cells are text citations, not formula drivers  
- [ ] Upside cannot exceed physical capacity constraints  
- [ ] “Validated” flag separate from “Modeled”  

---

## 9. Presentation rules

- Round money to nearest $1k for exec views when appropriate.  
- Show **three** nets, not one.  
- Label illustrative examples clearly.  
- Pair ROI with control gate status — ROI is void if Critical breaches ongoing.  

---

## 10. Related documents

- `AP_BUSINESS_CASE_MODEL.md`  
- `AGENT_ECONOMICS.md`  
- `KPI_Measurement/KPI_FRAMEWORK.md`
