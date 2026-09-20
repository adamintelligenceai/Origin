# Financial model — Evidence Room (seller revenue)

**Purpose:** Internal planning for Evidence Room’s own revenue.  
**Not:** a customer ROI model. Do not paste this into a sales deck.  
**Prices:** Diagnostic $0; Starter $79; Professional $199; Team $499; Custom $1,500–$3,000.  
**Fees:** Lemon Squeezy facts as of September 2026 — see `07_LEMON_SQUEEZY/STORE_BLUEPRINT.md`.  
**Currency:** USD. Figures are planning scenarios, not forecasts we will publish.

---

## 1. Unit economics (US card, no extras)

Platform fee = 5% + $0.50 ([LS pricing](https://www.lemonsqueezy.com/pricing)).

| SKU | Price | LS fee | Net before payout |
|---|---|---|---|
| Diagnostic | 0 | 0 | 0 |
| Starter | 79 | 4.45 | 74.55 |
| Professional | 199 | 10.45 | 188.55 |
| Professional w/ EARNED20 | 159.20 | 8.46 | 150.74 |
| Team | 499 | 25.45 | 473.55 |
| Blueprint low | 1,500 | 75.50 | 1,424.50 |
| Blueprint mid | 2,250 | 113.00 | 2,137.00 |
| Blueprint high | 3,000 | 150.50 | 2,849.50 |

**Add when true:** +1.5% international; +1.5% PayPal; +5% on abandoned-cart recoveries; +3% on affiliate-referred sales; payout 1% if Stripe non-US; PayPal payout fees ([LS fees](https://docs.lemonsqueezy.com/help/getting-started/fees)).

**Tax:** LS may collect VAT/GST/sales tax on top. In their worked example the platform fee is calculated on the tax-inclusive total. Cash to us is after tax remittance and fees. Do not treat list price as cash.

**Refund reserve:** model 5% of toolkit revenue in conservative; 3% base; 2% stretch. Custom: 1% (mostly pre-kickoff cancels).

---

## 2. Mix assumptions

Diagnostic is the top of funnel, not revenue.

| Scenario | Diag / month (by month 3) | Paid conversion from new diag (90 days) | Paid mix (units) |
|---|---|---|---|
| Conservative | 80 | 6% | 50% Starter / 40% Pro / 10% Team |
| Base | 200 | 10% | 25% Starter / 55% Pro / 20% Team |
| Stretch | 400 | 14% | 15% Starter / 55% Pro / 30% Team |

Custom Blueprints: conservative 0.5/month; base 1.5; stretch 3. Average fee modelled at $2,000.

Launch month may include `EARNED20` on 40% of Professional units. After day 14, 0%.

Affiliates: **off**. If turned on, subtract 3% LS + commission (e.g. 20%) from referred units.

---

## 3. Ninety-day unit build (illustrative)

Think of month 1 as comprehension, month 2 as method, month 3 as decision (see 90-day system).

### Conservative (90 days)

| | M1 | M2 | M3 | Total |
|---|---|---|---|---|
| Diagnostic | 40 | 60 | 80 | 180 |
| Starter | 2 | 3 | 4 | 9 |
| Professional | 2 | 3 | 4 | 9 |
| Team | 0 | 1 | 1 | 2 |
| Custom | 0 | 0 | 1 | 1 |

Gross: 9×79 + 9×199 + 2×499 + 1×2,000 = **$5,768**  
Less LS ~5%+$0.50 per paid order (21 orders ≈ $115 + $10.50) ≈ **$5,640** before refunds/payout.  
Less 5% refund reserve ≈ **$5,360**.  
This is a toolkit launch, not a venture forecast.

### Base (90 days)

| | M1 | M2 | M3 | Total |
|---|---|---|---|---|
| Diagnostic | 80 | 140 | 200 | 420 |
| Starter | 4 | 8 | 10 | 22 |
| Professional (list) | 4 | 10 | 16 | 30 |
| Professional (EARNED20, M1 only) | 6 | 0 | 0 | 6 |
| Team | 1 | 3 | 5 | 9 |
| Custom | 0 | 1 | 2 | 3 |

Gross: 22×79 + 30×199 + 6×159.20 + 9×499 + 3×2,000 = **$18,229**  
Fees rough 5.3% + $0.50×70 ≈ **$17,230**  
Refund 3% ≈ **$16,710** after reserve.

### Stretch (90 days)

| | M1 | M2 | M3 | Total |
|---|---|---|---|---|
| Diagnostic | 150 | 280 | 400 | 830 |
| Starter | 6 | 12 | 16 | 34 |
| Professional | 12 | 28 | 40 | 80 |
| Team | 3 | 8 | 14 | 25 |
| Custom | 1 | 3 | 5 | 9 |

Gross: 34×79 + 80×199 + 25×499 + 9×2,000 = **$46,561**  
After fees ~5.3% + per-order 50¢ ≈ **$43,950**  
Refund 2% ≈ **$43,070**.

Stretch assumes the articles and LinkedIn actually compound and that Custom does not consume all founder time. If Custom hits 9 in a quarter, toolkit quality will slip unless volume is declined.

---

## 4. Year-one sketch (base run-rate after Q1)

If base month-3 run-rate holds and grows 5% month-on-month on paid units for the next nine months (a planning convenience, not a law):

- Approximate paid units/month by M12: ~1.05^9 × (10+16+5) ≈ 48 units mix-weighted + Custom ~2  
- Rough annual gross if Q1 is $18k and Q2–Q4 average $14–18k/month: **$150k–$200k** list.

Treat anything above that as stretch and anything below $40k year-one as a conservative “the content did not compound” case.

**Do not** publish a year-one target as a customer-facing number.

---

## 5. Cost stack (seller)

| Cost | Notes |
|---|---|
| LS fees | Section 1 |
| Domain evidenceroom.ai | Registrar (Vercel registrar noted available at build) |
| Hosting | Low |
| Email | $0 to 500 subscribers on LS pricing page (Sep 2026) |
| Paid LinkedIn | $0 until day 84; then cap $1,000/month test |
| Counsel / tax | Budget as a real launch cost; not optional |
| Founder time | Custom is the scarce resource — price it and decline |
| Refunds | Reserve above |
| Chargebacks | Rare if copy is honest; still budget 0.5% |

There is no COGS in the SaaS sense. Fulfilment is a zip.

---

## 6. Contribution rules

- Never discount Custom.  
- Do not let Starter become 70% of units in base — that means the Diagnostic is sending people to the wrong rung.  
- If refunds > 8% on a SKU, stop ads and fix the page.  
- If Custom calendar exceeds 6 hours/week, raise the floor toward $3,000 or close applications.  
- Marketplace derivatives (`MARKETPLACE_DERIVATIVES.md`) are a separate P&L. If they exceed 15% of units and pull support questions, throttle them.

---

## 7. What this model is not

- Not a promise to an investor.  
- Not a customer business case.  
- Not adjusted for tax on the seller’s income.  
- Not adjusted for a non-US payout (add 1% Stripe or PayPal schedule).  
- Not a reason to hire.

Revisit after 90 days with actual mix. Replace every assumption that lost contact with the store report.
