# AP Business Case Model

**Evidence Room — AP Agent OS Pro**  
**Document type:** Business case model  
**Audience:** Controllers, CFO/FP&A, AP leaders, Steering Committee  
**Discipline:** No false precision. Separate **validated**, **estimated**, and **illustrative**. Industry benchmarks are context — not your savings.

---

## 1. Purpose

Provide a structured model to decide whether to invest in governed AP agents. The model connects volumes, labour, exception drag, platform cost, and risk — without inventing performance guarantees.

---

## 2. External benchmarks (cited)

From Ardent Partners *State of ePayables 2025*:

| Metric | Peer average | Best-in-Class |
|---|---|---|
| Cost per invoice | **$9.84** | **$2.65** |
| Exception rate | **18.4%** | **11.1%** |
| STP | **35.4%** | **51%** |
| Cycle time | **8.2 days** | BIC cohort materially faster (report) |

Use these to frame the **industry gap**. Your business case must use **your** measured cost, cycle, exception, and STP.

---

## 3. Evidence Room commercial inputs (list prices)

| Offering | List price (USD) |
|---|---|
| Free Diagnostic | **$0** |
| Starter | **$79** |
| Professional (AP Agent OS Pro) | **$199** |
| Team | **$499** |
| Custom Blueprint | **$1,500–$3,000** |

SKU price is rarely the dominant cost. Include internal labour, integration, change management, inference, and ongoing control operation.

---

## 4. Model inputs

### 4.1 Volume & mix

| Input | Unit | Notes |
|---|---|---|
| Invoices per month | count | State PO vs non-PO |
| Exception rate (baseline) | % | Measured |
| STP (baseline) | % | Dictionary-defined |
| Average cycle time | days | Receipt → post or pay — define |
| Average invoice value | $ | For risk framing, not “savings % of spend” theatre |

### 4.2 Cost baseline

| Input | Unit | Notes |
|---|---|---|
| Fully loaded AP labour cost | $/year | In-scope team |
| Outsourced AP cost | $/year | If any |
| Current AP platform cost | $/year | Allocated |
| Cost per invoice (computed) | $ | Labour+alloc / invoices |
| Cost per exception (computed) | $ | Optional but powerful |

### 4.3 Program cost (forward)

| Input | Unit | Notes |
|---|---|---|
| Evidence Room licence | $ | Tier above |
| Implementation labour | hours × rate | Internal + partner |
| Integration / IT | $ | One-time + run |
| Model inference | $/month | Metered |
| Training / change | $ | Team tier helps |
| Ongoing governance effort | hours/month | Non-optional |

### 4.4 Benefit levers (choose honestly)

| Lever | Mechanism | Evidence needed |
|---|---|---|
| Labour productivity | Hours released on in-scope tasks | Time study / system timestamps |
| Exception reduction | Fewer touches / faster resolve | Taxonomy KPIs |
| Cycle time | Working capital / discount capture | Define carefully |
| Duplicate prevention | Avoided overpayments | Incident history |
| Audit / control | Fewer findings / faster evidence | Qualitative + hours |

**Do not** claim working-capital interest savings without Treasury agreement on methodology.

---

## 5. Scenario design — Conservative / Base / Upside

Vary **only a few drivers**; keep others fixed. State assumptions.

| Driver (example) | Conservative | Base | Upside |
|---|---|---|---|
| Exception rate change | Mild improvement | Moderate | Strong toward BIC gap close |
| Hours released | Low validated | Partial | Higher with L2 maturity |
| Inference + run cost | Higher | Expected | Optimized |
| Implementation duration | Longer | Planned | Faster (bounded agent) |
| Risk holdback | Larger contingency | Standard | Smaller |

**Rule:** Upside is not “BIC tomorrow.” Closing from peer-like performance toward BIC economics is multi-quarter work.

---

## 6. Outputs

| Output | Description |
|---|---|
| Run-rate benefit (annual) | Validated/estimated separately |
| Year-1 net (benefit − cost) | Include one-time costs |
| Payback (months) | Range across scenarios |
| Cost/invoice trajectory | Vs own baseline; Ardent as footnote |
| Risk notes | What could erase benefits |
| Decision | Proceed / pilot only / defer |

---

## 7. Worked illustrative example — 15,000 invoices/month

> **Label: ILLUSTRATIVE ONLY.** Not a customer result. Figures chosen for teaching the model. Replace with measured data.

### 7.1 Illustrative baseline

| Item | Illustrative value |
|---|---|
| Volume | 15,000 invoices/month → 180,000/year |
| Baseline cost per invoice | $9.50 (near Ardent 2025 peer **$9.84**, not identical) |
| Implied annual AP processing cost | 180,000 × $9.50 ≈ **$1.71m** |
| Baseline exception rate | 20% (≈ 3,000 exceptions/month) |
| Baseline STP | 30% (below Ardent peer **35.4%**) |
| Cycle time | 9 days |

### 7.2 Illustrative program cost (Year 1)

| Item | Conservative | Base | Upside |
|---|---|---|---|
| Evidence Room Professional | $199 | $199 | $199 |
| Team (optional training pack) | $0 | $499 | $499 |
| Internal + IT implementation | $80,000 | $55,000 | $40,000 |
| Inference & platform ops | $36,000 | $24,000 | $18,000 |
| Governance / QA labour | $40,000 | $30,000 | $25,000 |
| **Total Year-1 cost (approx.)** | **~$156k** | **~$110k** | **~$84k** |

Numbers rounded; licence is immaterial vs delivery.

### 7.3 Illustrative benefit (annual run-rate, Year 2 framing)

Assume cost/invoice moves only on the labour/exception component you can actually influence:

| Scenario | Illustrative cost/invoice | Δ vs $9.50 | Annual benefit vs baseline cost |
|---|---|---|---|
| Conservative | $8.80 | $0.70 | ~$126k |
| Base | $7.90 | $1.60 | ~$288k |
| Upside | $6.50 | $3.00 | ~$540k |

**Still far from** Ardent BIC **$2.65** — intentionally. The model teaches gap honesty.

### 7.4 Illustrative Year-1 net (simple)

| Scenario | Benefit recognized Year 1 (partial ramp) | Cost | Net (illustrative) |
|---|---|---|---|
| Conservative | ~$60k (partial) | ~$156k | Negative / investment year |
| Base | ~$160k | ~$110k | Modest positive |
| Upside | ~$300k | ~$84k | Stronger positive |

Payback, if Base holds into Year 2 run-rate ~$288k vs ~$70k run cost, is typically **well under a year after steady state** — still illustrative.

### 7.5 What would falsify this case

- Exception rate does not improve because PO/GR root causes untouched  
- Hours “released” are not removed from staffing plan (no cash benefit)  
- Duplicate FN worsens while STP “improves”  
- Control incidents trigger rollback  

---

## 8. Narrative structure for Steering

1. Our measured baseline (volume, cost/invoice, exception, STP, cycle)  
2. Industry context (Ardent 2025 table) — one slide max  
3. Scope of first agents (narrow)  
4. Conservative/Base/Upside with shared assumptions  
5. Control posture and kill-switch  
6. Ask: fund pilot / Professional OS / Team  

---

## 9. Related documents

- `ROI_CALCULATOR_GUIDE.md`  
- `AGENT_ECONOMICS.md`  
- `IMPLEMENTATION_ROADMAP.md`  
- `Templates/BOARD_CFO_SUMMARY.md`
