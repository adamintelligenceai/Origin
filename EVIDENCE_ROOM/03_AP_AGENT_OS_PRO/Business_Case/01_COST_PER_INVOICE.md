# Evidence Room — AP Agent OS Professional

## Business Case — 01 Cost per Invoice

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Business Case  
**Standard:** Proof before permission  
**Audience:** Controller, FP&A, Head of AP, AP Manager  
**ERP stance:** Agnostic. Volume milestone must match the ERP/workflow status you can extract.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Cost-model working paper for KPI-FIN-CPI. Not a benchmark study. Not a savings claim.

---

### Purpose

Build a **fully specified** AP processing cost for a stated scope and period, then divide by invoices at a stated milestone. This is the denominator discipline for every later “we got cheaper” sentence.

Dictionary: `KPI-FIN-CPI` = `ap_cost_P / invoices_P` with components listed.

---

## 1. What to do

1. Freeze **scope S** and **period P** (same as the KPI framework).  
2. List cost components (include / exclude / allocate).  
3. Count invoices at **one** milestone.  
4. Compute unit cost and a **cost per correct outcome** companion (KPI-FIN-CCO) when QA exists.  
5. Version the workbook. Do not change allocations mid-comparison.

**How.** Component table §3. Allocation rules §4.

**Who.** Controller Accountable for the model; AP Manager Responsible for volume; FP&A for labour; FinSys for tool/vendor invoices.

**What can go wrong.** Compared to a blog’s “world-class cost.” Project costs hidden. Milestone switched from “received” to “posted” to look cheaper.

**Control.** Frozen cost-model version ID on every pack that quotes CPI. Same milestone as volume.

**Measure.** Components with a source; invoices with unique keys; allocation changes in P (should be zero or explained).

**Evidence.** Workbook version under `[BUYER]/Evidence/BusinessCase/CPI/`.

---

## 2. How — define the unit

| Decision | Instruction | Buyer |
|---|---|---|
| Milestone | received / extracted / posted / ready-for-payment — **pick one** | `[BUYER]` |
| Unique key | vendor + invoice # + entity, or local | `[BUYER]` |
| Credits | include / exclude / separate CPI | `[BUYER]` |
| Intercompany | include / exclude | `[BUYER]` |
| Employee payments | default **exclude** from AP CPI unless AP truly processes them | `[BUYER]` |
| Period | calendar month / 4-4-5 / quarter | `[BUYER]` |

**Who.** Head of AP + Controller.  
**What can go wrong.** Credits excluded in volume but credit-work included in cost.  
**Control.** Credits policy written on the version page.  
**Measure.** Reconciliation: ERP count vs model count.  
**Evidence.** Extract + reconciling item list.

---

## 3. How — cost components

Mark each: **In** / **Out** / **Allocated**. “Out” items stay visible so nobody “finds” them later.

| Component | Typical treatment | Source | In/Out/Alloc | Amount P |
|---|---|---|---|---|
| AP processor + supervisor labour (loaded) | In, time-split if shared | Payroll + time split | | `[BUYER]` |
| Exception / query desk | In | Same | | |
| Payment **preparation** (not Treasury dealing) | In if AP-owned | Org | | |
| Payment **authorisation** / bank fees | Out of AP CPI unless you explicitly want “end-to-end payables cost” — then **rename** the KPI | Treasury | | |
| Capture / OCR / portal vendor | In | Vendor invoice | | |
| Workflow / archive licences attributable to AP | Allocated | IT chargeback | | |
| ERP licence slice | Allocated or Out (buyer policy) | IT | | |
| Temporary / overtime / BPO | In | Invoices / OT | | |
| AI inference + agent platform (KPI-FIN-AIC) | In **after** tools exist; baseline may be 0 | Ledger | | |
| Internal Audit / Controls standing team | Out of unit cost; do not hide QA labour that **is** AP | | | |
| Transformation project (build) | **Out** of run-rate CPI; show separately (I-12) | Project | | |
| Occupancy / desktop | Allocated or Out | FP&A | | |

**Rule.** Implementation (I-12) is not run-rate CPI. Mixing them makes the first year look worse and the second year like a miracle.

**Who.** Controller signs the In/Out/Alloc column.  
**What can go wrong.** Move cost to “project” to game CPI.  
**Control.** Any reclass in P listed on the version page.  
**Measure.** Reclass count.  
**Evidence.** Signed component sheet.

---

## 4. How — labour split

If people do AP plus T&E plus “other”:

```
AP_labour = Σ (FTE_i × loaded_rate_i × percent_time_AP_i)
```

`percent_time_AP` needs a basis: week diary, system timestamps, or a dated management estimate marked **ESTIMATE**.

**Who.** AP Manager proposes splits; Controller accepts.  
**What can go wrong.** 100% AP on people who close cash and payroll.  
**Control.** Sample two people against a week diary once per year.  
**Measure.** Splits marked ESTIMATE vs measured.  
**Evidence.** Diary IDs.

---

## 5. How — formulas

```
ap_cost_P        = sum(In) + sum(Allocated accepted)
invoices_P       = unique invoices at milestone
KPI-FIN-CPI      = ap_cost_P / invoices_P

exception_cost_P = labour and vendor cost tagged to exception handling
KPI-FIN-CPE      = exception_cost_P / valid_closes_P

KPI-FIN-CCO      = (inference_P + allocated_agent_ops_P) / correct_outcomes_P
```

Report CPI **and** the bill of materials. A single number without components is not usable.

Round to a level that matches invoice volume (e.g. 0.10 of currency, not 0.01 theatre).

---

## 6. What can go wrong

| Failure | Detection | Control |
|---|---|---|
| External benchmark shopping | Sentence cites “world class” without source | Ban unless buyer has a dated subscription study — still not a target |
| Volume definition drift | CPI jump with no cost change | Milestone lock |
| Double count capture + labour | Both include keying | Component notes |
| Hide AI cost | Shadow tools | Approved-tool list |
| CPI down, errors up | CPI used as a target | Pair with FNR / rework / breaches |

---

## 7. ACME Manufacturing — ILLUSTRATIVE build

Fictional ACME, one month, milestone = **posted**.

| Component | ILLUSTRATIVE |
|---|---|
| AP labour (9 FTE × 65k / 12 × 90% AP) | 43,875 |
| Capture vendor | 4,200 |
| Workflow allocation | 1,800 |
| Overtime | 1,100 |
| AI tools | 0 (baseline month) |
| **ap_cost_P** | 50,975 |
| Posted invoices | 8,400 |
| **CPI** | **≈ 6.1** per posted invoice |

Credits separately: 420 credits, not in 8,400. Project spend that month: 15,000 — **out** of CPI.

These numbers are **ILLUSTRATIVE**. They are not a market benchmark.

---

## 8. How you use CPI after agents exist

- Keep the same component list. Add I-11 as a new **In** row.  
- If hours fall but FTE cash does not, CPI will **not** fall. That is correct. Report hours (HHR) separately.  
- If quality QA is funded from AP, keep it **In**. Cutting QA to improve CPI is gaming.

**Who.** Same as §1.  
**Measure.** CPI vs baseline on the **same version**.  
**Evidence.** Version diff.

---

## 9. Evidence checklist

- [ ] Scope, period, milestone  
- [ ] Component In/Out/Alloc signed  
- [ ] Volume reconciling to ERP  
- [ ] Labour split basis  
- [ ] Version ID  
- [ ] No unsigned comparison to an invented industry average  

Proof before permission.

---

*End of 01_COST_PER_INVOICE.md*
