# Evidence Room — Lemon Squeezy Storefront Spec

**Document ID:** `07_LEMON_SQUEEZY/01_STOREFRONT_SPEC`  
**Version:** 1.0  
**Merchant platform:** [Lemon Squeezy](https://www.lemonsqueezy.com) — a valid **merchant-of-record (MoR)** option for digital products.  
**Fee citation (research-backed, verify live):** Platform fee typically **5% + US$0.50** per transaction on total order value; additional fees may apply (e.g. international +1.5%, PayPal +1.5%, subscriptions +0.5%, abandoned-cart recovery +5%, affiliate +3%). Sources: [Pricing](https://www.lemonsqueezy.com/pricing), [Docs: Fees](https://docs.lemonsqueezy.com/help/getting-started/fees), [Docs: Merchant of Record](https://docs.lemonsqueezy.com/help/payments/merchant-of-record), [Docs: Sales Tax and VAT](https://docs.lemonsqueezy.com/help/payments/sales-tax-vat).  

**This document is not legal, tax, or accounting advice.** Engage qualified professionals before go-live. MoR handling of VAT/GST/sales tax does not replace advice on income tax, corporate structure, or consumer law in your jurisdictions.

**Preferred storefront domain / brand URL:** `evidenceroom.ai` — **availability needs verification.**

---

## 1. Store structure

```
Evidence Room (Store)
├── Free
│   └── AP AI Readiness Diagnostic (US$0 lead magnet — may live on site form, not LS)
├── Digital products
│   ├── AP Agent Starter Kit — US$79
│   ├── AP Agent OS — Professional — US$199
│   └── AP Agent OS — Team — US$499
├── Services (if LS used for deposit / full fee)
│   └── AP Transformation Blueprint — US$1,500–3,000 (variants or manual invoice)
└── Pages
    ├── Home / About blurb
    ├── Licence summary
    ├── Refund policy
    └── Link to Privacy & Terms on owned site
```

**Recommendation:** Host Diagnostic on owned site (email capture). Sell Starter / Professional / Team on Lemon Squeezy. Blueprint may use LS one-time variants **or** invoice — pick one ops path and document it.

---

## 2. Five commercial offers (SKU map)

| SKU code | Customer-facing name | Price | LS product type | Licence tier |
|---|---|---|---|---|
| `ER-DIAG-0` | AP AI Readiness Diagnostic | Free | Site form (optional US$0 LS) | Personal evaluation |
| `ER-START-79` | AP Agent Starter Kit | US$79 | Digital download | Individual |
| `ER-PRO-199` | AP Agent OS — Professional | US$199 | Digital download | Professional |
| `ER-TEAM-499` | AP Agent OS — Team | US$499 | Digital download | Team |
| `ER-BLUE-1500` / `ER-BLUE-3000` | AP Transformation Blueprint | US$1,500–3,000 | Service / custom | SOW-defined |

---

## 3. Product names & short descriptions (store cards)

### Starter — US$79
**Name:** AP Agent Starter Kit  
**Short:** First-corridor toolkit — charter templates, responsibility ladder, and a focused agent set to begin with operating evidence. Not autonomous payments. Not an ERP.

### Professional — US$199
**Name:** AP Agent OS — Professional  
**Short:** Full AP Agent Operating System for Controllers and Heads of AP — 16-agent library, governance, exception taxonomy, KPIs, pilot protocol, templates. ERP-agnostic.

### Team — US$499
**Name:** AP Agent OS — Team  
**Short:** Mobilisation layer on the OS — workshop, training, executive, implementation, and change artefacts for multi-owner rollout. Facilitation not included unless purchased separately.

### Blueprint — US$1,500–3,000
**Name:** AP Transformation Blueprint  
**Short:** Productised design service fitting the AP Agent OS to your entities, ERP constraints, and control environment. Scoped after intake.

### Diagnostic — Free
**Name:** AP AI Readiness Diagnostic  
**Short:** Score process, data, controls, and ownership before you expand autonomy.

---

## 4. Thumbnail / cover system

| Element | Spec |
|---|---|
| Aspect | 1:1 store tile + 16:9 product header |
| Background | Paper `#F4F6F8` or Ink `#0B1220` |
| Brand | Wordmark top-left; evidence-bar mark |
| Title | Tiempos Headline; product name only |
| Tier rule | Bottom hairline: price + licence tier |
| Forbidden | Robots, neon brains, purple gradients, “AI powered” stickers |

**File naming:** `ER_LS_{SKU}_tile.png` / `ER_LS_{SKU}_header.png`

---

## 5. Checkout copy (shared microcopy)

**Above fold confirmation line:**  
“Instant download after payment. Digital toolkit — not software hosting. Payment authorisation in your AP process stays human.”

**Order bump ideas (optional, non-spammy):**  
- Starter checkout → bump Professional (+US$120 difference messaging: “Upgrade to full OS”)  
- Professional → soft note Team for workshops (link, not aggressive bump)

**Trust lines:**  
- Licence summary link  
- Refund policy link  
- “Lemon Squeezy is merchant of record for this purchase” (accurate MoR disclosure)

---

## 6. Licence tiers (checkout display)

| Tier | Display blurb |
|---|---|
| Individual | One named individual; internal employer use; no resale/redistribution |
| Professional | Purchaser + limited internal collaborators per licence terms; no public redistribution |
| Team | Organisation / business unit within seat caps; internal workshop use; no resale as competing product |
| Blueprint | Per SOW |

Full plain-English terms: `10_LEGAL_AND_LICENSING/01_LICENCE_TERMS.md` — **lawyer review required.**

---

## 7. Fulfilment & download structure

```
/ER_{SKU}_v1.0/
  00_README.pdf
  01_... (tier contents)
  LICENCE.txt
  VERSION.txt
```

- Deliver ZIP via Lemon Squeezy secure download.  
- Version pin in filename.  
- Optional: signed URL expiry per LS defaults.  
- Blueprint: deliver via shared drive / email per SOW — not a single impulse ZIP unless deposit product.

Detail: `03_FULFILMENT_AND_ONBOARDING.md`

---

## 8. Customer emails (LS + owned)

| Trigger | Owner | Purpose |
|---|---|---|
| Receipt / tax invoice | Lemon Squeezy | MoR receipt |
| Download ready | LS | Access link |
| Onboarding #1 | Owned ESP | Friday→Monday path / contents map |
| Onboarding #2 (D+3) | Owned ESP | Responsibility & exclusions reminder |
| Upsell (D+10) | Owned ESP | Soft Team/Blueprint if fit |

Do not duplicate LS transactional mail with confusing second receipts.

---

## 9. Onboarding (post-purchase)

1. Confirm SKU and licence tier  
2. Point to `01_START_HERE` / Friday→Monday path (Pro)  
3. State non-negotiables (human payments; no guaranteed ROI)  
4. Support email / office hours policy  
5. Invite Diagnostic completion if they skipped it  

---

## 10. Upsells & launch offer

**Launch offer (optional, factual):**  
“Launch window: Professional US$199 — early buyers receive the next minor template pack update free for 90 days.”  
No fake countdown abuse; state real end date.

**Upsell path:** Diagnostic → Starter/Pro → Team → Blueprint (see Funnel Architecture).

---

## 11. Affiliate notes

Lemon Squeezy supports affiliates; merchant-side affiliate fee commonly **+3%** on referred sales ([Fees docs](https://docs.lemonsqueezy.com/help/getting-started/fees) — verify current).  
**Policy draft:** Invite only trusted finance creators; ban hype ROI claims; require disclosure; approve creatives.  
Affiliate programme is optional at launch — default **off** until brand voice proven.

---

## 12. VAT / GST / sales tax — high-level MoR implications (not advice)

As MoR, Lemon Squeezy typically calculates, collects, and remits applicable sales taxes (including many VAT/GST scenarios) on qualifying digital sales, and provides receipts. Platform fee examples in LS docs are calculated on **total order value including tax**.  

**Implications to discuss with advisors (not conclusions):**
- Reduced operational burden of multi-jurisdiction sales-tax collection for digital goods sold via MoR.  
- You may still owe **income / corporate tax** on payouts.  
- Consumer rights, distance-selling, and refunds still need policy alignment.  
- Blueprint **services** may have different tax treatment than pure digital downloads — classify correctly with a professional.  

**Not legal or tax advice — professional review required.**

---

## 13. Refund policy recommendation (draft)

Align LS refund settings with `10_LEGAL_AND_LICENSING/04_REFUND_POLICY_DRAFT.md`:

- **Starter / Pro / Team:** 14-day refund if not abused (no bulk redistribution; download access considered).  
- **Blueprint:** SOW-governed; deposit typically non-refundable after kickoff.  

Enable LS refund workflow; state policy on product pages.

---

## 14. Terms / Privacy requirements checklist

Before go-live:

- [ ] Privacy Policy linked (owned site) — legal review  
- [ ] Terms of Sale / Terms of Use linked — legal review  
- [ ] Licence terms linked per SKU  
- [ ] Disclaimer (no accounting/legal advice; no autonomous payments)  
- [ ] Refund policy published  
- [ ] MoR disclosure accurate  
- [ ] Business entity / address as required by LS and consumer law  
- [ ] Cookie notice if site tracks EU/UK users  
- [ ] Marketing consent separate from purchase where required  
- [ ] Domain `evidenceroom.ai` verified or interim domain disclosed  

---

## 15. Analytics & ops

- UTM on all LS checkout links  
- Track `checkout_start` / `purchase`  
- Monthly fee reconciliation vs LS dashboard (5% + US$0.50 baseline + add-ons)  
- Payout fees may apply (LS docs: e.g. US flat payout fee; non-US percentage capped — verify current)

---

*End of Storefront Spec v1.0.*
