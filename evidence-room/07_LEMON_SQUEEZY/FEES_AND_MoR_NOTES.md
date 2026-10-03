# Fees and Merchant-of-Record Notes

**Lockup:** EVIDENCE ROOM — AP AGENT OS  
**Purpose:** Working commercial notes for Evidence Room’s use of Lemon Squeezy.  
**Not:** Tax advice, legal advice, accounting advice, or a Lemon Squeezy support commitment.  
**Confirmation required:** A qualified tax adviser and counsel must confirm how MoR, fees, invoices, and your entity interact **before** live sales and before you treat any net-revenue figure as bookable.

Figures below were read from Lemon Squeezy’s public pages and Stripe’s public Managed Payments materials on 20 September 2026. **Re-read the live pages before you price or forecast.** Providers change fees.

---

## 1. Official sources (cite these)

| Topic | URL | What it said when read |
|---|---|---|
| Headline platform fee | https://www.lemonsqueezy.com/pricing | **5% + 50¢** per transaction. $0/month for ecommerce features. “Some payments may be subject to additional fees.” MoR: LS collects/calculates tax and states they file/pay as merchant of record. Payouts described as twice monthly, bank wire or PayPal, 200+ countries (pricing FAQ). |
| Additional fee schedule | https://docs.lemonsqueezy.com/help/getting-started/fees | Platform fee on **total order value** (example includes tax in the fee base). Add-ons: **+1.5% international (outside the US)**, **+1.5% PayPal**, **+0.5% subscription payments**. Worked example: $20 product + 20% VAT = $24 total; fee $0.50 + 5% + 1.5% intl = **$2.06**; net **$17.94** after tax and fee. |
| Payout fees (same docs page) | https://docs.lemonsqueezy.com/help/getting-started/fees | **Stripe payouts:** free for US bank accounts; **1% per payout** for banks outside the US. **PayPal payouts:** $0.50 flat (US); 3% capped at $30 (outside US). |
| Marketing add-on fees (same page) | https://docs.lemonsqueezy.com/help/getting-started/fees | **+5%** payments recovered via abandoned-cart emails; **+3%** affiliate referrals (merchants); **+2%** affiliate payouts (affiliates). |
| Acquisition | https://www.lemonsqueezy.com/blog/stripe-acquires-lemon-squeezy | Stripe acquired Lemon Squeezy; post dated **26 July 2024** (JR Farr). |
| LS / Stripe evolution | https://www.lemonsqueezy.com/blog/stripe-lemon-squeezy-update-2025 | **29 April 2025:** announcement of **Stripe Managed Payments**, described as a MoR experience built into Stripe; LS said existing LS customers need no action and LS continues. |
| Stripe Managed Payments | https://docs.stripe.com/payments/managed-payments and changelog https://docs.stripe.com/payments/managed-payments/changelog | Stripe’s own MoR product for digital goods (tax/VAT/GST in 80+ countries per Stripe docs). Changelog records **general availability on 22 April 2026** (39 countries at that note) and further 2026 updates (e.g. 2 June 2026 AI-as-a-service tax codes; 3 September 2026 API notes). |

If a number in a spreadsheet disagrees with those pages, the pages win until your accountant says otherwise.

---

## 2. Fee stack we will model

Assume **one-time** digital sales (no LS subscription SKU at launch).

### 2.1 Always-on (per LS pricing + docs)

`platform = 0.50 + 0.05 × (total charged, including tax if LS treats tax as in the base)`

The docs example computes 5% on **total including VAT**, plus the 50¢, plus extras. **Do not model 5% on net-of-tax unless LS and your adviser confirm a different treatment for your tax-inclusive settings.**

### 2.2 Conditional extras (docs)

| Extra | When | Rate |
|---|---|---|
| International | Customer / transaction outside the US (LS wording: “international (outside of the US) transactions”) | +1.5% |
| PayPal | PayPal tender | +1.5% |
| Subscription | Recurring LS subscription payments | +0.5% — **avoid at launch** |
| Abandoned-cart recovery | Only on recovered payments if that feature is on | +5% |
| Affiliate (merchant side) | Only on referred sales if affiliates are on | +3% |

These extras **stack** in the docs’ logic (the France + card example uses 5% + 1.5% intl on the $24 total). A France + PayPal sale would be modelled as 5% + 1.5% + 1.5% unless LS support confirms otherwise. **Flag for confirmation.**

### 2.3 Payout extras (docs)

| Method | US | Non-US |
|---|---|---|
| Bank via Stripe payouts | $0 per payout | **1% of the payout** |
| PayPal payout | $0.50 per payout | 3% capped at $30 per payout |

Payouts are batched (pricing FAQ: twice a month). The 1% non-US bank fee is on the **payout**, not an extra 1% on every order — model it as a periodic drag.

### 2.4 What LS headline pricing does **not** remove

- Your own entity’s corporate income tax  
- Your own bookkeeping  
- Chargebacks / dispute operational cost  
- Refunded fees — **confirm whether LS returns the platform fee on refunds**  
- Volume or prohibited-product exceptions  
- Future fee changes after a migration to Stripe Managed Payments  

---

## 3. Worked unit economics (illustrative)

Assumptions for these rows: **US buyer, card, no tax on the $ list price, no affiliate, no abandoned-cart extra, one-time SKU.** If LS adds sales tax, the 5% (+extras) may apply to a higher total — nets worse than this table. **Recompute with live checkout tax.**

`fee = 0.50 + 0.05 × price`  
`net = price − fee`

| SKU | Price | LS fee (US card) | Net before payout | Effective % |
|---|---|---|---|---|
| Starter | $79.00 | $4.45 | $74.55 | 5.63% |
| Professional | $199.00 | $10.45 | $188.55 | 5.25% |
| Team | $499.00 | $25.45 | $473.55 | 5.10% |
| Blueprint (low) | $1,500.00 | $75.50 | $1,424.50 | 5.03% |
| Blueprint (mid) | $2,250.00 | $113.00 | $2,137.00 | 5.02% |
| Blueprint (high) | $3,000.00 | $150.50 | $2,849.50 | 5.02% |
| Diagnostic | $0.00 | $0.00 | $0.00 | n/a |

**International card (add 1.5%):** `fee = 0.50 + 0.065 × price`

| SKU | Fee | Net |
|---|---|---|
| $79 | $5.635 | $73.365 |
| $199 | $13.435 | $185.565 |
| $499 | $32.935 | $466.065 |
| $2,250 | $146.75 | $2,103.25 |

**PayPal + US (add 1.5%):** same arithmetic as international card unless both apply.

**PayPal + international (model 5% + 1.5% + 1.5% = 8% + $0.50) — confirm stacking:**

| SKU | Fee | Net |
|---|---|---|
| $199 | $16.42 | $182.58 |
| $499 | $40.42 | $458.58 |

**Non-US bank payout drag (example):** if a $5,000 payout incurs 1%, that is $50 off the batch — allocate across orders in the forecast, do not ignore it if the entity is not US-banked.

Full scenarios: `FINANCIAL_MODEL.md`.

---

## 4. Merchant of record — what we can say, what we cannot

Lemon Squeezy’s pricing page states they are merchant of record, take on tax collection and calculation liability, and are registered to file and pay taxes on the merchant’s behalf. The fees doc says the platform fee covers, among other things, “taxes (yes, we cover taxes)” in the sense of their MoR economics — **that is their marketing language, not your advice.**

**Reasonable operating interpretation (still confirm):**

- LS is the seller of record on the customer receipt for covered checkouts.  
- LS calculates and collects applicable VAT/GST/sales tax on those transactions and remits in the jurisdictions they cover.  
- You receive a net payout. You still have books, income tax, and possible obligations LS does **not** cover.

**Do not tell customers:** “You never pay tax.” They may see tax on the LS checkout.  
**Do not tell ourselves:** “We never think about tax again.” MoR is not a substitute for an adviser. Product classification, entity residency, and non-covered cases exist.

**Professional confirmation required:**

1. Entity that owns the store and receives payouts  
2. Whether a US bank can be used (payout fee implication)  
3. Product tax category for a digital methodology  
4. Whether Blueprint facilitation is a digital good, a service, or mixed — **this can change MoR fit**  
5. Invoices your organisation may still need to issue  
6. VAT/GST treatment if you later sell from a non-US entity  
7. What happens if you migrate to Stripe Managed Payments  

---

## 5. Stripe acquisition and the 2026 Managed Payments update

- **July 2024:** Stripe announced acquisition of Lemon Squeezy (LS blog, 26 July 2024).  
- **April 2025:** LS described Stripe Managed Payments as a MoR experience *inside Stripe*, and said LS would continue with no required action for current LS users.  
- **2026:** Stripe’s Managed Payments changelog records **general availability on 22 April 2026** and ongoing 2026 API/tax-code updates. Stripe docs describe Managed Payments as Stripe acting as MoR for digital products (sales tax, VAT, GST in more than 80 countries per Stripe’s page).

**Operating implication for Evidence Room:**

- Launch on **Lemon Squeezy** is still a coherent choice: licence keys, digital downloads, and a current public fee card we can model.  
- Treat **Stripe Managed Payments** as a 2026-and-after strategic option, not as a silent replacement. Migration would change checkout, tax UX, fee card, webhooks, and customer communications.  
- Do not promise customers “we will always be on LS” or “we already are on Stripe MoR.”  
- Revisit fees and ToS if LS or Stripe publish a migration deadline. **None is assumed here.**

**Professional confirmation required** before any migration decision.

---

## 6. Feature-fee decisions for this store

| Feature | Default for launch | Why |
|---|---|---|
| Subscriptions | Off | We sell a licence, not SaaS; avoids +0.5% and product confusion |
| Abandoned-cart emails | Off until conversion data exists | +5% on recovered payments |
| Affiliates | Off until rules exist | +3% merchant-side on referred sales |
| PayPal | Optional | +1.5%; useful globally; model the drag |
| Custom domain on LS store | Optional | Brand; no fee cited on the pricing page for the store itself |
| Volume pricing | Not needed at our volume | Contact LS if that changes |

---

## 7. Refunds and chargebacks (fee unknown — confirm)

Ask LS support and read current docs before launch:

- Is the 5% + 50¢ (and extras) returned on a full refund?  
- Chargeback fee amount?  
- How MoR tax reverses on refund (Stripe’s Managed Payments changelog notes a withheld-tax behaviour on some refunds — LS may differ)?  

Until answered, the financial model uses a **gross refund reserve**, not a clever net.

---

## 8. Internal saying (allowed) vs public saying (careful)

**Internal:** “Assume about 5.3% + 50¢ on a US card Pro sale, worse if tax-inclusive, PayPal, or international; plus payout drag if non-US banked.”

**Public:** “Checkout is processed by Lemon Squeezy as merchant of record. Taxes may be collected at checkout. Their fees are their fees; our list prices are as shown.”

Do not publish this fee file on the marketing site.

---

## 9. Re-read list (every quarter or before a price change)

1. https://www.lemonsqueezy.com/pricing  
2. https://docs.lemonsqueezy.com/help/getting-started/fees  
3. LS payouts help article (pricing page “How and when do I get paid?”)  
4. Stripe Managed Payments changelog if migration is in discussion  
5. Your adviser’s last memo  

Document the date you re-read. Stale fee models create silent margin holes.
