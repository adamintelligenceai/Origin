# Business Case Model — AP Agent Programme

**Evidence Room · AP Agent OS Professional**  
**Companion:** `spreadsheets/ER_AP_Business_Case_ROI.xlsx`

---

## 1. Purpose

Build a **transparent, assumption-labelled** business case for an AP agent programme. This model supports internal investment decisions. It is **not** a guarantee of ROI, savings, or payback.

---

## 2. Case structure

1. Problem statement (quantified where possible)  
2. Scope and non-goals  
3. Baseline economics  
4. Initiative costs  
5. Benefit hypotheses by class  
6. Sensitivity  
7. Risks / dependencies  
8. Decision ask  

---

## 3. Baseline economics

| Input | Source | Value | Notes |
|-------|--------|-------|-------|
| Annual invoice volume | ERP | | |
| Fully loaded AP FTE cost | Finance | | |
| AP FTEs (or FTE-equivalent) on transactional work | Org chart / time study | | |
| Tooling cost (capture, AP automation) | Contracts | | |
| Cost per invoice (labour) | Labour ÷ volume | | |
| Cost per invoice (fully loaded) | (Labour + tools) ÷ volume | | |
| Median cycle time (days) | KPI baseline | | |
| Exception rate | KPI baseline | | |
| Discount opportunity pool | AP / Treasury | | |

---

## 4. Initiative cost categories

| Category | Year 0 | Year 1 run | Notes |
|----------|--------|------------|-------|
| Evidence Room licences (Starter/Pro/Team) | | | Digital product |
| Custom Blueprint (if any) | | | Service |
| Internal project time (AP, IT, Control) | | | Opportunity cost |
| Integration / logging / IAM | | | Often underestimated |
| LLM / platform usage | | | Variable |
| Training / change | | | Team pack helps |
| Contingency (10–20%) | | | |

---

## 5. Benefit hypotheses (separate classes)

### 5.1 Operational → financial bridge

Only convert operational gains to financial when the mechanism is explicit.

| Benefit ID | Mechanism | Formula sketch | Confidence (H/M/L) | Class |
|------------|-----------|----------------|--------------------|-------|
| B1 | Touch-rate reduction frees capacity | Δ minutes × volume × loaded rate × realisation % | | Financial (derived) |
| B2 | Cycle-time improvement | Usually **non-cash** unless tied to discount/working capital policy | | Operational / optional WC |
| B3 | Discount capture uplift | Δ capture % × pool | | Financial |
| B4 | Duplicate leakage reduction | Expected $ × detection uplift × recovery % | | Financial (conservative) |
| B5 | Avoided late fees | Historical fees × reduction assumption | | Financial |
| B6 | Control evidence efficiency | Audit prep hours × rate | | Financial (soft) |

**Realisation %** defaults: Year 1 often 40–70% of theoretical labour capacity — capacity becomes cash only if hours are reallocated or headcount flexes.

### 5.2 Non-financial benefits (do not force into $)

- Stronger audit evidence packs  
- Faster close readiness  
- Reduced key-person risk on tribal rules  
- Clearer supplier experience on queries  

List these separately for the Steering pack.

---

## 6. Worked example (illustrative placeholders)

Replace with your numbers. Figures below are **structure only**, not market claims.

| Item | Example |
|------|---------|
| Volume | 120,000 inv/year |
| Labour cost / inv | $4.50 |
| Touch minutes baseline | 8 |
| Touch minutes target Y1 | 6 |
| Δ minutes | 2 |
| Theoretical hours freed | 120,000 × 2 / 60 = 4,000 h |
| Loaded hourly | $55 |
| Theoretical $ | $220,000 |
| Realisation | 50% |
| Year-1 benefit (labour) | $110,000 |
| Programme cost Y1 | $85,000 |
| Simple surplus | $25,000 *(illustrative)* |

Always show **range** (downside / base / upside).

---

## 7. Sensitivity table

| Driver | −20% | Base | +20% |
|--------|------|------|------|
| Volume | | | |
| Realisation % | | | |
| LLM/platform cost | | | |
| Discount uplift | | | |

---

## 8. Decision ask template

```
Ask: Approve Phase 1 shadow+pilot for [agents] in [BU]
Investment: $_____ (Y0) + $_____ (Y1 run)
Expected operational targets (not financial guarantees):
  - Cycle time median: __ → __
  - Touch rate: __ → __
  - Sample pass rate: ≥ __%
Financial: base case surplus $__ (assumptions attached); downside still strategic because __.
Kill criteria: __
```

---

## 9. Related

- `KPI_Measurement/00_KPI_FRAMEWORK.md`
- `04_AP_AGENT_OS_TEAM/Implementation/BENEFITS_REALISATION.md`
- `00_READ_ME/FINANCIAL_MODEL.md` (vendor-side model)
