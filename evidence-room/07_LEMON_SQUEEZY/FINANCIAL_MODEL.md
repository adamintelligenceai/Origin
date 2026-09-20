# Financial Model — Evidence Room — AP Agent OS

**Lockup:** EVIDENCE ROOM — AP AGENT OS  
**Horizon:** first 90 days after launch, plus a simple annualisation.  
**Currency:** USD.  
**Status:** Illustrative planning model. Not a forecast, not a guarantee, not investment advice, not tax advice.  
**Fee basis:** Lemon Squeezy public card as read 20 September 2026 — see `FEES_AND_MoR_NOTES.md` and https://www.lemonsqueezy.com/pricing · https://docs.lemonsqueezy.com/help/getting-started/fees

Recompute if fees, tax-inclusive treatment, or mix change.

---

## 1. Price book

| SKU | List | Notes |
|---|---|---|
| Diagnostic | $0 | Traffic, not revenue |
| Starter | $79 | Individual, partial |
| Professional | $199 | Default |
| Team | $499 | Working group |
| Blueprint | $1,500–$3,000 | Use **$2,250** as planning midpoint unless quoted otherwise |

No subscriptions at launch (avoids +0.5% LS subscription extra and SaaS confusion).

---

## 2. Unit net after LS (planning rates)

### 2.1 US card, no tax on list, no affiliate, no abandoned-cart extra

`fee = 0.50 + 0.05 × list`  
`net = list − fee`

| SKU | List | Fee | Net | Keep % |
|---|---|---|---|---|
| Starter | 79.00 | 4.45 | 74.55 | 94.4% |
| Professional | 199.00 | 10.45 | 188.55 | 94.7% |
| Team | 499.00 | 25.45 | 473.55 | 94.9% |
| Blueprint mid | 2,250.00 | 113.00 | 2,137.00 | 95.0% |

### 2.2 Blended “live mix” rate (planning)

Assume a conservative tender/geo mix on paid checkouts:

- 70% US card (base fee)  
- 20% international card (+1.5%)  
- 10% PayPal international (model **8% + $0.50** — stacking **flagged for confirmation**)

Blended fee ≈  
`0.70×(0.50+0.05p) + 0.20×(0.50+0.065p) + 0.10×(0.50+0.08p)`  
`= 0.50 + 0.056p`

| SKU | Blended fee | Blended net |
|---|---|---|
| Starter | $4.92 | $74.08 |
| Professional | $11.64 | $187.36 |
| Team | $28.44 | $470.56 |
| Blueprint mid | $126.20 | $2,123.80 |

**Scenarios below use blended nets** unless labelled “US-card only.”

### 2.3 Other drags (applied at scenario level, not per SKU)

| Drag | Conservative | Base | Upside |
|---|---|---|---|
| Refunds / chargebacks (% of gross) | 8% | 5% | 3% |
| Non-US payout 1% on nets | Apply 1% if entity is non-US banked; **0% if US banked** | same | same |
| Affiliates | Off | Off | Off (if on, recompute — see launch file) |
| Abandoned-cart extra | Off | Off | Off |
| Tax on checkout | Not modelled in gross; if LS charges tax, 5%+ may apply to a higher total — **downside not in these nets** | | |

**Default payout assumption:** US bank, **0%** payout fee. If that is false, multiply scenario nets by 0.99 after refunds.

**Refund treatment:** subtract `refund_rate × gross`, and assume LS fees on refunded orders are **not recovered** (until confirmed). So refunds cost list + wasted fee. Approximation used: `net_after_refunds = blended_net × units × (1 − refund_rate) − blended_fee × units × refund_rate`  
which simplifies to `units × (blended_net − refund_rate × list)`.

---

## 3. Volume scenarios — first 90 days

Volumes are **planning cases**, not targets we will publish as promises.

### Traffic hypothesis (informs conversion, not a KPI promise)

| | Conservative | Base | Upside |
|---|---|---|---|
| Diagnostic completions | 180 | 400 | 900 |
| Email sequence opts-in | 120 | 280 | 650 |

Paid conversion is set **directly** (not as a fake “industry 3%”).

### Paid units (90 days)

| SKU | Conservative | Base | Upside |
|---|---|---|---|
| Starter | 8 | 18 | 35 |
| Professional | 12 | 28 | 55 |
| Team | 2 | 6 | 12 |
| Blueprint (mid $2,250) | 0 | 1 | 3 |

---

## 4. 90-day P&L sketches

`Gross = Σ (list × units)`  
`Net after LS & refunds ≈ Σ units × (blended_net − refund_rate × list)`

### Conservative (8% refunds)

| SKU | Units | Gross | Net after LS+refunds |
|---|---|---|---|
| Starter | 8 | 632 | 8 × (74.08 − 0.08×79) = **541.28** |
| Professional | 12 | 2,388 | 12 × (187.36 − 0.08×199) = **2,057.28** |
| Team | 2 | 998 | 2 × (470.56 − 0.08×499) = **861.28** |
| Blueprint | 0 | 0 | 0 |
| **Total** | | **4,018** | **3,459.84** |

US-card-only, 0% refunds (ceiling, not a plan):  
8×74.55 + 12×188.55 + 2×473.55 = **3,407.70** wait that's lower because... wait 8*74.55=596.4, 12*188.55=2262.6, 2*473.55=947.1, total 3806.1. Good. Conservative with refunds and blend is ~3.46k.

### Base (5% refunds)

| SKU | Units | Gross | Net after LS+refunds |
|---|---|---|---|
| Starter | 18 | 1,422 | 18 × (74.08 − 0.05×79) = **1,262.34** |
| Professional | 28 | 5,572 | 28 × (187.36 − 0.05×199) = **4,967.48** |
| Team | 6 | 2,994 | 6 × (470.56 − 0.05×499) = **2,673.66** |
| Blueprint | 1 | 2,250 | 1 × (2,123.80 − 0.05×2,250) = **2,011.30** |
| **Total** | | **12,238** | **10,914.78** |

### Upside (3% refunds)

| SKU | Units | Gross | Net after LS+refunds |
|---|---|---|---|
| Starter | 35 | 2,765 | 35 × (74.08 − 0.03×79) = **2,509.85** |
| Professional | 55 | 10,945 | 55 × (187.36 − 0.03×199) = **9,976.45** |
| Team | 12 | 5,988 | 12 × (470.56 − 0.03×499) = **5,467.08** |
| Blueprint | 3 | 6,750 | 3 × (2,123.80 − 0.03×2,250) = **6,168.90** |
| **Total** | | **26,448** | **24,122.28** |

### 90-day summary

| Case | Gross | Net after LS + refunds (US payout) | If 1% non-US payout |
|---|---|---|---|
| Conservative | $4,018 | **~$3,460** | ~$3,425 |
| Base | $12,238 | **~$10,915** | ~$10,806 |
| Upside | $26,448 | **~$24,122** | ~$23,881 |

---

## 5. Simple annualisation (mechanical, not a growth model)

If Q1 run-rate merely repeats four times (no improvement, no decay):

| Case | Annual gross | Annual net (US payout, same refunds) |
|---|---|---|
| Conservative | $16,072 | ~$13,840 |
| Base | $48,952 | ~$43,660 |
| Upside | $105,792 | ~$96,489 |

This is **not** a year-two story. It ignores seasonality, content compounding, and the chance that Blueprint does not repeat.

---

## 6. Contribution mix (base, 90 days)

| SKU | Share of gross | Share of net |
|---|---|---|
| Starter | 11.6% | 11.6% |
| Professional | 45.5% | 45.5% |
| Team | 24.5% | 24.5% |
| Blueprint | 18.4% | 18.4% |

Professional remains the volume engine; Team and Blueprint are margin-similar on a percent basis (flat LS %) but larger tickets. Do not chase Blueprint volume with 20% affiliates.

---

## 7. Sensitivity

| Change | Effect on base 90-day net (~$10.9k) |
|---|---|
| All sales international card (+1.5% vs blend) | Slightly down (~1% of gross) |
| Affiliates on, 30% of Pro/Team referred, 20% commission + ~3% LS | Severe: ~$0.23 × referred gross extra out the door — could remove $1.5k+ |
| 15% refunds | Base net falls by ~0.10 × gross ≈ $1.2k plus wasted fees already in formula |
| Pro price $249 | Only if conversion holds — do not model a raise as free money |
| Diagnostic $0 → paid | Likely kills the magnet; do not |
| Non-US payout 1% | −1% of net |
| Tax-inclusive 5% on $199+tax | Nets worse; recompute from a live FR/DE checkout |

---

## 8. Cost map outside LS (not estimated as dollars here)

These do **not** appear in the nets above and will dominate early:

- Counsel (licence, privacy, trademark clearance vs Evidence Room LLC)  
- Domain evidenceroom.ai  
- Design / site  
- Accounting  
- Time to answer hello@  
- Office hour (if offered) — real hours  
- Chargeback operations  

Until those are budgeted, “$10.9k net” is **platform-net**, not founder profit.

---

## 9. Unit-level “is this SKU worth selling?”

| SKU | Blended net | Support burden | Verdict |
|---|---|---|---|
| Diagnostic | $0 | Low–medium | Keep. Magnet. |
| Starter | ~$74 | Medium (confusion vs Pro) | Keep as a step, not the headline |
| Professional | ~$187 | Medium (START HERE) | **Hero SKU** |
| Team | ~$471 | Medium–high (seats, sharing) | Worth it when the group is real |
| Blueprint | ~$2,124 | High (facilitation) | Price the time; do not let it become unpaid consulting |

A Blueprint sold at $1,500 that consumes five long sessions may have **worse labour economics** than four Professionals. Track hours.

---

## 10. Cash timing

LS pricing FAQ: payouts **twice a month** (confirm current article). Model a **2–6 week** lag from sale to usable cash depending on first-payout and reserve policies. **Confirm reserves and hold periods with LS.** Do not spend Month 1 gross as if it were in the bank.

---

## 11. What we will not put on a slide

- “Path to $1m ARR” from these cases  
- ROI of the toolkit for *buyers*  
- Implied valuation  
- Northline invoice volumes as our TAM math  

---

## 12. Recalc checklist

1. Re-read LS pricing + fees docs.  
2. Run one live test checkout in US and one EU (tax-inclusive behaviour).  
3. Confirm refund fee clawback.  
4. Confirm payout geography.  
5. Replace midpoint Blueprint with actual quotes.  
6. If affiliates or abandoned-cart turn on, rebuild section 4.  

Owner: [finance / founder]. Date of last recalc: _20 September 2026 (desk model only)_.
