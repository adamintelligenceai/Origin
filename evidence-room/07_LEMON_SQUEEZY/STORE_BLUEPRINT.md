# Lemon Squeezy store blueprint — Evidence Room

**Researched:** September 2026  
**Store:** Evidence Room  
**Domain:** evidenceroom.ai  
**First catalogue:** AP Agent OS family  
**Status:** Operating blueprint. Not legal or tax advice. Confirm fees and MoR language on official pages before each launch, and confirm the seller’s own tax position with a qualified adviser.

---

## 1. Why Lemon Squeezy

Evidence Room sells digital downloads, licence keys, a free lead magnet, and a productised high-ticket application. Lemon Squeezy is built for that mix: hosted and overlay checkout, licence keys, lead magnets, discount codes, bundles/upsells, affiliates, and email (free to 500 subscribers on their published pricing).

It is also a **merchant of record** for the store transaction, which matters if buyers are in VAT/GST and sales-tax jurisdictions. That is a commercial convenience. It is **not** a complete answer to the seller’s own corporate tax, income tax, or permanent-establishment questions.

---

## 2. Official facts used in this file (cite these)

Read these on the day you configure the store. Fees change.

| Fact | Source |
|---|---|
| Platform fee **5% + 50¢** per transaction; no monthly ecommerce fee; email **$0/m up to 500 subscribers** | [https://www.lemonsqueezy.com/pricing](https://www.lemonsqueezy.com/pricing) |
| Additional fees: **+1.5% international**, **+1.5% PayPal**, **+0.5% subscriptions** | [https://docs.lemonsqueezy.com/help/getting-started/fees](https://docs.lemonsqueezy.com/help/getting-started/fees) |
| Marketing fees: **+5% abandoned-cart recovery**, **+3% merchant affiliate referrals**, **+2% affiliate payouts (affiliates)** | Same fees page |
| Payout fees: Stripe **free US / 1% non-US**; PayPal **$0.50 US / 3% capped at $30 non-US** | Same fees page |
| Payouts processed **twice a month**; bank wire and PayPal | [https://www.lemonsqueezy.com/pricing](https://www.lemonsqueezy.com/pricing) FAQ “How and when do I get paid?” → [https://docs.lemonsqueezy.com/help/getting-started/getting-paid](https://docs.lemonsqueezy.com/help/getting-started/getting-paid) |
| Merchant of Record: LS collects/calculates tax and states they file/pay on your behalf for the transaction | Pricing page, MoR feature, [https://docs.lemonsqueezy.com/help/payments/merchant-of-record](https://docs.lemonsqueezy.com/help/payments/merchant-of-record) |
| **2026 update:** Lemon Squeezy + Stripe Managed Payments | [https://www.lemonsqueezy.com/blog/2026-update](https://www.lemonsqueezy.com/blog/2026-update) |
| Footer legal entity on LS site (Sep 2026): **“Sold through Link, LLC f/k/a Lemon Squeezy LLC”** | Site footer on [https://www.lemonsqueezy.com/pricing](https://www.lemonsqueezy.com/pricing) |
| Related public reporting: Stripe acquired Lemon Squeezy (industry press; confirm current corporate description with counsel) | Use LS’s own 2026 update + counsel, not a tweet |

**Professional confirmation still required:** whether MoR coverage matches the seller entity’s facts (residence, VAT registration, digital-services rules, economic nexus). Do not tell founders “you have no tax obligations”.

---

## 3. Store identity

| Field | Value |
|---|---|
| Store name | Evidence Room |
| Store URL (LS) | evidenceroom.lemonsqueezy.com (or LS-assigned) until custom domain |
| Custom domain | store.evidenceroom.ai (preferred) or checkout overlays from evidenceroom.ai |
| Support email | hello@evidenceroom.ai |
| Brand | Paper / ink / forest. No lemon-yellow UI on *our* site. LS checkout will look like LS; overlay is acceptable. |
| Footer on LS store | Evidence Room · Responsibility is earned. · Sold through Link, LLC f/k/a Lemon Squeezy LLC |
| Customer-facing promise | Digital operating materials. Not software hosting. Not ERP. |

---

## 4. Product catalogue

Configure **five products**. No subscription SKUs at launch (avoids the +0.5% subscription fee until we have a reason).

### 4.1 AP Agent Readiness Diagnostic

| | |
|---|---|
| LS name | AP Agent Readiness Diagnostic |
| Type | Lead magnet / free digital product ($0) |
| Price | $0 |
| Licence | Evaluation — personal use, no redistribution |
| Thumbnail | Wordmark + “DIAGNOSTIC” + level ladder 0–4 on paper. No robot. |
| Short description | A structured assessment of how ready your Accounts Payable environment is for governed AI agents. You leave with a level, a gap map, and a next step. |
| Long description | See website `COPY_DIAGNOSTIC.md`. Include the non-promise list. |
| Checkout copy (button) | Get the Diagnostic |
| Checkout microcopy | Free. Email required for delivery. No card charge. Not a consultation. Not a savings calculator. |
| Fulfilment | `ER-DIAGNOSTIC.zip` |
| Thank-you | `/thanks/diagnostic` + email 01 of the sequence |
| Upsell after download email (not on the $0 receipt) | Professional $199, 7 days later in the sequence — not a hostile overlay on the free file |

### 4.2 AP Agent Starter

| | |
|---|---|
| LS name | AP Agent Starter |
| Type | Digital download + licence key |
| Price | $79 |
| Licence | Individual |
| Thumbnail | “STARTER” + fence diagram (box inside a box). |
| Short description | Design and fence your first AP agent. For one owner who needs a serious start without the full operating system. |
| Checkout copy | Get Starter — $79 |
| Checkout microcopy | Individual licence. Instant download. Not a software installation. No guaranteed savings. |
| Fulfilment | `ER-STARTER.zip` |
| Upsell on receipt page | Professional at launch-offer code if eligible; otherwise full $199 |
| Don’t | Bundle Starter+Pro on the same cart in a way that double-licences. Offer upgrade credit only if operations can honour it. **Launch rule:** no upgrade credit in month one unless fulfilment can handle it. |

### 4.3 AP Agent OS Professional

| | |
|---|---|
| LS name | AP Agent OS Professional |
| Type | Digital download + licence key |
| Price | $199 |
| Licence | Professional — one practitioner |
| Thumbnail | Full OS grid (eight packs) in mono labels. |
| Short description | The full operating system for a single practitioner: agent library, process mapping, controls, governance, measurement, testing, business case, templates. |
| Checkout copy | Get Professional — $199 |
| Checkout microcopy | Professional licence. One practitioner. No resale or republishing. Instant download. Merchant of record: Link, LLC f/k/a Lemon Squeezy LLC. |
| Fulfilment | `ER-PROFESSIONAL.zip` |
| Receipt upsell | Team $499 (“If others will work from the files”) |
| Launch offer | Code `EARNED20` — 20% off Professional for 14 days from public launch. Do not put 20% on Team or Custom. |

### 4.4 AP Agent OS Team

| | |
|---|---|
| LS name | AP Agent OS Team |
| Type | Digital download + licence keys (seat count) |
| Price | $499 |
| Licence | Team — one organisation, draft maximum eight named seats |
| Thumbnail | Eight-seat mark + “WORKSHOP” label. |
| Short description | Professional plus workshop, training, implementation sequence, change notes, and executive briefing for a working group. |
| Checkout copy | Get Team — $499 |
| Checkout microcopy | Team licence. Internal use. Named seats. Not a consulting engagement. We do not attend the workshop unless you buy a separate Blueprint. |
| Fulfilment | `ER-TEAM.zip` |
| Receipt upsell | Soft: Custom Blueprint application link. No discount. |
| Licence keys | Issue a team key plus instructions to register seats by email. Confirm LS licence-key seat model before launch. |

### 4.5 Custom Blueprint (application / checkout)

| | |
|---|---|
| LS name | Custom Blueprint — Application Fee / Scoped Design |
| Type | Do **not** put an open $3,000 buy button on the storefront. Use an application form on evidenceroom.ai/custom. After acceptance, send a **hidden LS checkout link** or an invoice. |
| Price | $1,500 / $2,250 / $3,000 variants (three LS products, unlisted) |
| Names | `Custom Blueprint — Single class` $1,500; `Custom Blueprint — Dual class` $2,250; `Custom Blueprint — Multi-entity` $3,000 |
| Licence | Named-entity design. Internal use of the delivered documents. No republishing of the method. |
| Thumbnail | Not public. If needed: “BLUEPRINT” + blank map. |
| Checkout copy (private link) | Pay the Blueprint fee |
| Checkout microcopy | Scoped design for the named organisation in your application. Not an implementation. Not a savings engagement. Not legal or audit advice. Refunds follow the scoped-work policy counsel approves — usually **no** digital-goods 14-day window once work has started. |
| Fulfilment | No zip at purchase. Delivery is the Blueprint pack by email / secure link when complete. Use LS “file” only for a one-page statement of work if counsel wants delivery on-platform. |

---

## 5. Thumbnail system

All 1200×1200 and 1600×900 versions.

- Background: `#f3efe6`
- Ink: `#14171c`
- Rule: `#b8a888`
- Forest mark (the cover-mark square from the design system)
- IBM Plex Mono label (DIAGNOSTIC / STARTER / PROFESSIONAL / TEAM)
- Source Serif 4 product name
- No photographs. No people. No robots. No purple.

File names: `thumb-diagnostic-sq.png`, `thumb-starter-sq.png`, `thumb-pro-sq.png`, `thumb-team-sq.png`, plus `-og` landscape crops.

---

## 6. Licence mapping (LS licence keys)

| Product | LS licence type (configure) | Activation (draft) | Seat rule |
|---|---|---|---|
| Diagnostic | Optional (can skip keys) | — | Evaluation, one person |
| Starter | Standard key | 1 activation | Individual |
| Professional | Standard key | 1 activation | Professional |
| Team | Key with higher activation count **or** one key + seat register | 8 (confirm) | Team |
| Custom | No software key | — | Named entity in the SOW |

Keys are a **record of licence**, not DRM that can survive a zip being forwarded. The legal terms do the real work. Still issue keys: they make support and refund conversations factual.

Paste into each product’s “license terms” box a short pointer:

> Licensed materials. Individual / Professional / Team terms apply as sold. No resale, redistribution, sublicensing, or republishing. Not legal, tax, accounting, or audit advice. Full terms: evidenceroom.ai/terms and the LICENCE file in the download.

Counsel reviews that box.

---

## 7. Fulfilment zip structure

Build these exact trees so onboarding docs can point to paths.

```
ER-DIAGNOSTIC.zip
├── 00_START_HERE.md
├── AP_AGENT_READINESS_DIAGNOSTIC.pdf
├── AP_AGENT_READINESS_DIAGNOSTIC.docx   (if offered)
├── LICENCE.txt
├── DISCLAIMER.txt
└── HOW_WE_USE_YOUR_EMAIL.txt

ER-STARTER.zip
├── 00_START_HERE.md
├── 01_First_Agent_Brief.md
├── 02_Live_Process_Map.md
├── 03_Scope_Fence.md
├── 04_Minimum_Controls.md
├── 05_14_Day_Operating_Log.md
├── templates/
├── LICENCE.txt
└── DISCLAIMER.txt

ER-PROFESSIONAL.zip
├── 00_START_HERE.md
├── Process_Mapping/
├── Agent_Library/
├── Controls/
├── Governance/
├── KPI_and_Measurement/
├── Testing/
├── Business_Case/
├── Templates/
├── LICENCE.txt
└── DISCLAIMER.txt

ER-TEAM.zip
├── 00_START_HERE.md
├── (all Professional folders)
├── Workshop/
├── Training/
├── Implementation/
├── Change_Management/
├── Executive/
├── SEATS.md
├── LICENCE.txt
└── DISCLAIMER.txt
```

Each `00_START_HERE.md` points at `06_SALES_AND_MARKETING/CUSTOMER_ONBOARDING.md` steps 01–12, trimmed to the tier.

Maximum zip size: stay well under LS limits; prefer PDF + Markdown, not 4K video.

---

## 8. Checkout copy blocks (reuse)

**Trust line (every paid checkout):**

> Digital operating materials for designing a governed AP agent layer. Not a replacement ERP. Not a promise of savings, fraud detection, compliance, accounting accuracy, autonomous payments, or ROI. Sold through Link, LLC f/k/a Lemon Squeezy LLC as merchant of record.

**Order bump (Professional only, launch):**

> Add the Diagnostic annotated key? — No. The Diagnostic is free. Do not charge for it as a bump.

**Order bump allowed:**

> None in month one. Bumps that add “1:1 time” create a service we are not staffed for.

**Exit-intent:** off. Abandoned-cart emails: **on** only after you accept the **+5%** recovery fee (see fees page). Recommendation: enable from week 3, not day 1, so you can read the fee against recovered revenue.

---

## 9. Email (LS + our sequence)

LS email is **free to 500 subscribers** per the September 2026 pricing page. Use it for:

- Receipt / download (transactional; LS default)
- Abandoned cart (optional, +5% on recovered payments)
- Broadcasts until 500

Our **7-email sequence** lives in `06_SALES_AND_MARKETING/email/SEQUENCE.md`. Load it into LS or a later ESP. Do not send all seven as LS “receipt extras”.

Transactional vs marketing: counsel + privacy page.

---

## 10. Onboarding after payment

1. LS receipt + signed download link.  
2. Our email 01: START HERE 01–03 only.  
3. Site thank-you page matching the SKU.  
4. Days 2–14: remainder of sequence, or quieter if they bought Team/Custom.  
5. Support: hello@evidenceroom.ai, 2 business-day target. No Slack community at launch.

Do not add a Circle/Discord. It creates a second product.

---

## 11. Upsell and path rules

```
Diagnostic ($0)
    → email education
    → Starter $79   or   Professional $199
Professional
    → Team $499 if they write “my team needs this”
Team
    → Custom application (no coupon)
Custom
    → stop. Do not upsell a second Blueprint in the receipt.
```

**Launch offer:** `EARNED20` = 20% off **Professional only**, 14 days, 200 redemptions, one per customer. Not stackable with affiliate codes if LS cannot prevent double dipping — test this.

Do not discount Custom. Do not put Team at 50% off to “drive volume”; it trains the wrong buyer.

---

## 12. Affiliates

LS merchant affiliate fee: **+3%** of the referred payment on top of the platform fee ([fees page](https://docs.lemonsqueezy.com/help/getting-started/fees)).

**Recommendation at launch: affiliates off.**

Reasons:

- The buyer is a finance professional. Random coupon sites will attract refunds and licence leakage.
- You would be paying 3% plus whatever you offer the affiliate (you set the commission; LS’s 3% is *their* take on the referred sale).
- Brand risk if an affiliate promises savings or ROI.

**Turn on later only for named partners** (a known AP educator, a newsletter you respect) at 15–20% commission, with a written rule: no savings/ROI/fraud claims, must use our copy deck. Review every landing they run.

If you ignore this and go open-affiliate, budget the extra 3% + commission in the financial model and expect to police claims weekly.

---

## 13. Discount codes (planned)

| Code | Effect | Window | Notes |
|---|---|---|---|
| `EARNED20` | 20% off Professional | 14 days from launch | Public, LinkedIn, email 06–07 |
| `DIAGNOSTIC` | $0 (not needed if product is free) | — | Don’t create |
| Partner codes | 10% Professional | Named | Only with a contract |
| `TEAMSEAT` | none | — | Don’t discount Team at launch |

---

## 14. VAT / GST / sales tax — high level (not advice)

Lemon Squeezy, as merchant of record, **calculates and collects** many transaction taxes and states that it **files and remits** them ([pricing](https://www.lemonsqueezy.com/pricing), [MoR docs](https://docs.lemonsqueezy.com/help/payments/merchant-of-record)).

Practical meaning for store setup:

- Show prices **exclusive of tax** in USD; let LS add tax at checkout from buyer location.
- Put the MoR footer on the LS store and on our legal pages.
- Issue / let LS issue tax invoices to buyers who need them.
- Do **not** tell EU/UK/AU buyers “this is tax-free because digital”.

**Still confirm with a tax professional:**

- Seller entity, tax residence, VAT/GST registration duties
- Whether any of our products could be treated as a *service* (especially Custom Blueprint) rather than a digital good
- US sales-tax economic nexus if you ever sell *off* MoR
- Income-tax treatment of receipts (MoR does not make revenue non-taxable to you)
- 1099/K-forms and LS tax-form docs: [https://docs.lemonsqueezy.com/help](https://docs.lemonsqueezy.com/help) (Tax Forms section)

International card payments may add **+1.5%**. That is a seller cost, not a buyer VAT question.

---

## 15. Merchant of Record implications (commercial)

**Helps**

- One checkout for many countries
- Less of the “do we charge VAT” operational load on day one
- Buyer support on some billing/tax questions goes to LS

**Does not do**

- Remove the need for a legal entity
- Remove income tax
- Make our disclaimers unnecessary
- Make Custom Blueprint “not a service” if it looks like consulting
- Allow us to skip refund and consumer-law analysis

**2026:** LS describes a Stripe Managed Payments update ([blog](https://www.lemonsqueezy.com/blog/2026-update)). Before launch, read that post in full and confirm whether payout timing, dispute handling, or footer language changed. Related reporting that Stripe acquired Lemon Squeezy should be treated as corporate context for counsel, not as a reason to drop MoR language.

---

## 16. Refund policy recommendation (for counsel to turn into terms)

| Product | Recommendation | Why |
|---|---|---|
| Diagnostic | N/A (free) | — |
| Starter / Professional / Team | **14 days**, if the buyer says the product is not as described **or** they have not been able to use it for a licence reason we caused | Professional buyers. Reduces chargebacks. Digital-goods exceptions vary by country — counsel must write the real rule. |
| After 14 days | No, except file corruption we can fix by re-delivery | — |
| Licence breach (redistribution) | No refund; key revoked | |
| Custom Blueprint | Refund **application/checkout only if work has not started**. After kickoff: no refund of the fee; deliver or negotiate as counsel says. | It is scoped work. |

Publish the approved policy at evidenceroom.ai and in the LS product refund-policy field so they match.

Do not advertise “30-day no questions” — it invites harvest-and-refund of the zip.

---

## 17. Fee worksheet (seller math)

Illustrative **US card, no extra fees**, platform 5% + $0.50:

| Product | Price | Platform fee | Net before payout fees / tax |
|---|---|---|---|
| Diagnostic | $0 | $0 | $0 |
| Starter | $79 | $4.45 | $74.55 |
| Professional | $199 | $10.45 | $188.55 |
| Team | $499 | $25.45 | $473.55 |
| Blueprint | $1,500 | $75.50 | $1,424.50 |
| Blueprint | $3,000 | $150.50 | $2,849.50 |

Add when they apply:

- +1.5% international
- +1.5% PayPal
- +0.5% if you later add subscriptions
- +5% of *recovered* abandoned-cart payments
- +3% of affiliate-referred payments (merchant)
- Payout: 0% Stripe US; 1% Stripe non-US; PayPal $0.50 US or 3% cap $30 non-US

Example from LS docs (France VAT 20%, $20 product, card, +1.5% intl): tax is collected and remitted; platform fee is taken on the **total** including tax in their worked example. **Model tax-inclusive totals when you forecast cash**, not just list price. See their table on the [fees page](https://docs.lemonsqueezy.com/help/getting-started/fees).

`EARNED20` on Professional: $159.20 list after 20%. Fee ≈ $8.46. Net ≈ $150.74 before payout.

---

## 18. Launch week checklist

1. Entity, bank, LS identity verification, payout method (prefer Stripe US if that is the fact).  
2. Five products configured; Custom unlisted.  
3. Licence text in each product + zip.  
4. Thumbnails in the design system.  
5. Overlay checkout on `/professional`, `/team`, `/diagnostic`.  
6. Thank-you URLs.  
7. Webhook to a simple spreadsheet or inbox for “new Professional / Team”.  
8. `EARNED20` created, cap 200.  
9. Abandoned cart **off** until week 3.  
10. Affiliates **off**.  
11. Footer: Link, LLC f/k/a Lemon Squeezy LLC.  
12. Counsel has signed off privacy, terms, licence, refund — or you sell only the free Diagnostic until they have.

---

## 19. Items that require professional legal / tax confirmation

Not advice. A list of questions to take to counsel and a tax adviser:

1. Seller legal name, jurisdiction, and who is the *controller* of site personal data.  
2. Whether Custom Blueprint must be sold on contract/invoice rather than LS digital checkout.  
3. Digital-goods refund and consumer-law position in the EU, UK, and other target countries.  
4. Whether MoR coverage is complete for our facts.  
5. Income-tax, VAT registration, and bookkeeping treatment of LS payouts.  
6. Licence enforceability (Individual / Professional / Team; no resale).  
7. Seat-count and “named seat” mechanics.  
8. Whether we need a DPA with LS (they publish a DPA link in the site footer).  
9. US FTC / advertising claims — our non-promise list is a feature; keep it.  
10. Export of materials and any sanctions screening LS does vs what we must do.  
11. Footer and checkout language after the 2026 Stripe Managed Payments change.  
12. Affiliate agreements if we ever enable them.

---

## 20. What not to configure

- Pay-what-you-want on Professional  
- Subscription “membership”  
- A $9 impulse PDF that cannibalises Starter (see marketplace derivatives — those stay off the LS core store)  
- Fake scarcity  
- A “savings guarantee” badge  
- Bundling Custom with Team at a discount
