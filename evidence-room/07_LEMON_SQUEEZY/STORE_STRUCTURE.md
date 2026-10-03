# Lemon Squeezy Store Structure

**Store name:** EVIDENCE ROOM — AP AGENT OS  
**Public site:** evidenceroom.ai  
**Storefront (proposed LS subdomain):** evidenceroom.lemonsqueezy.com (or custom store domain — confirm)  
**Currency:** USD  
**Product type:** Digital files + licence keys (not subscriptions at launch)  
**Merchant of record:** Lemon Squeezy (see `FEES_AND_MoR_NOTES.md`)

This is an implementation brief, not a Lemon Squeezy support contract and not tax advice.

---

## 1. Why Lemon Squeezy for this product

- Digital downloads with signed, throttled links  
- Licence key issuance after payment  
- Checkout links or embeds from evidenceroom.ai  
- MoR handling of much VAT/GST/sales tax collection and filing (confirm current coverage for your entity and product tax codes)  
- Affiliate and discount tools if we turn them on later  

We are **not** using Lemon Squeezy as an ERP, and we are **not** describing their fraud tools as our AP fraud product.

---

## 2. Store information architecture

| LS object | Name | Buyer-facing |
|---|---|---|
| Store | Evidence Room — AP Agent OS | Lockup visible in checkout header |
| Collection: Start | Assess & Start | Diagnostic is fulfilled on-site; optional $0 LS product if we want an email capture inside LS |
| Collection: Licences | AP Agent OS Licences | Starter, Professional, Team |
| Collection: Facilitated | By Application | Custom Blueprint (use a $0 or deposit variant — see listings) |
| Collection: Hidden | Internal | Test SKU, upgrade SKUs |

Do not create a collection called “Fraud Tools” or “ROI Packs.”

---

## 3. Products (catalogue)

| Code | Product | Price | LS type | Licence | Visibility |
|---|---|---|---|---|---|
| ER-DIAG | AP Agent Readiness Diagnostic | $0 | Digital (or site-only) | None | Public; prefer on-site form |
| ER-START | Starter — AP Agent OS | $79 | Digital + licence key | Individual | Public |
| ER-PRO | Professional — AP Agent OS | $199 | Digital + licence key | Individual (full) | Public · **featured** |
| ER-TEAM | Team — AP Agent OS | $499 | Digital + licence key | Team | Public |
| ER-BLUE | Custom Blueprint — Application | $0 application or scoped invoice $1,500–$3,000 | Prefer off-cart application; if LS, use a custom price / invoice | Scoped | Public page, not impulse |
| ER-TEST | Internal test $1 | $1 | Digital | Test | Hidden |

**Launch featured product:** ER-PRO.

**Do not** create a subscription SKU at launch. The toolkit is a licence with a stated 12-month update window (confirm in Terms). Subscriptions would attract Lemon Squeezy’s extra +0.5% subscription fee and imply a SaaS we do not operate.

---

## 4. Variants and overlays

| Product | Variants | Notes |
|---|---|---|
| Professional | None at launch | One price, one archive |
| Team | None | Seat count is a licence term, not a variant until we can enforce it |
| Starter | None | |
| Blueprint | Do not use variants for $1500 / $2000 / $3000 as self-serve | Quote after application; take payment as a custom LS invoice or payment link |

Upsells at checkout (allowed):

- Professional → offer Team (“If AP, Controls, and Audit will share the register”)  
- Starter → offer Professional  

Forbidden upsells:

- “Add fraud module +$X”  
- “Add ROI guarantee”  
- Mystery zip

---

## 5. Files and delivery

| Product | File object (proposed) |
|---|---|
| Starter | `ER-START-vX.zip` — diagnostic debrief, core canvases, Wave 1 blank charters, human-held list |
| Professional | `ER-PRO-vX.zip` — full library + START HERE + frameworks + KPI language |
| Team | `ER-TEAM-vX.zip` — Professional archive + facilitation notes + shared-register workbook |
| Diagnostic | No zip if on-site; if LS $0, a one-page PDF + link |

Version the zip. Keep a private current-version folder. Old keys still open the then-current download policy we publish (12-month updates for Pro/Team — confirm).

Enable LS licence keys on paid SKUs. See `LICENCE_KEYS_AND_FULFILMENT.md`.

---

## 6. Checkout links and placement

| Page | Button | LS link |
|---|---|---|
| /professional | Buy Professional — $199 | Overlay or hosted checkout for ER-PRO |
| /team | Buy Team — $499 | ER-TEAM |
| Home / Diagnostic result | Optional Starter | ER-START |
| /custom-blueprint | Apply | Form, not a $3000 one-click |
| Email 6–7 | Buy Professional | ER-PRO with UTM |

Button colours: quiet. No “50% off today only” unless a real, dated launch offer exists (`LAUNCH_OFFER_AND_AFFILIATES.md`).

---

## 7. Receipt and payment descriptor

**Statement descriptor (request / confirm with LS):** `EVIDENCEROOM.AI` or `ER AP AGENT OS`  
**Avoid:** `EVIDENCE ROOM` alone (collision with Evidence Room LLC forensic animation).

Receipt must include: product name with “AP Agent OS,” evidenceroom.ai, licence type, support email.

---

## 8. Tax category and product classification

Digital download / electronically supplied professional information. Choose the Lemon Squeezy / tax product category that counsel and LS docs specify for written methodology (not SaaS login, not tangible goods, not a payment service).

**Professional confirmation required** before first live sale: tax code, entity, nexus story (MoR reduces but does not replace all advice).

---

## 9. Store policies (LS fields)

Paste drafts from `10_LEGAL_AND_LICENSING/` once counsel signs:

- Refund policy  
- Privacy  
- Terms  
- Disclaimer  

Until then, LS store should stay in **test mode**.

---

## 10. Test mode checklist

1. Create ER-TEST $1 and ER-PRO in test.  
2. Buy with LS test card.  
3. Confirm key issuance, download, receipt language, tax line appearance.  
4. Refund the test if needed.  
5. Confirm webhook (if any) to a fulfilment log we control.  
6. Only then flip live.

---

## 11. Roles

| Role | Does |
|---|---|
| Store owner | Payouts, tax IDs, live flip — [entity to confirm] |
| Fulfilment | Re-issue links, licence questions |
| Support | hello@evidenceroom.ai |
| Counsel | Policies, trademark, tax confirmation |
| Affiliates | Off until rules exist |

---

## 12. What this store will not sell

- Prompt packs as a standalone “100 prompts for AP”  
- ERP connectors  
- Payment-release software  
- Certification badges  
- Forensic-animation services (not our trade)
