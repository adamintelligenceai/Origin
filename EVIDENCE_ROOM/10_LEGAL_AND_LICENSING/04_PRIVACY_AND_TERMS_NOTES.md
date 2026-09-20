# Privacy & Terms Notes — Website and Store

**Status:** Planning outline for counsel — **NOT A PRIVACY POLICY, NOT TERMS OF SERVICE, NOT LEGAL ADVICE.**  
**Do not** paste this file live as your policy. Use it as a briefing to draft compliant documents with a lawyer (and, where needed, a privacy specialist).

---

## 1. Context

Evidence Room expects to operate:

1. A **marketing website** (product explanation, blog/resources, contact).  
2. A **Lemon Squeezy** checkout (MoR) for digital downloads.  
3. Optional **email** capture for the free AP AI Readiness scorecard.  
4. Possibly **analytics** and lightweight support email.

At launch, the paid products are primarily **digital file delivery**, not a hosted multi-tenant AP application processing invoice data. If that changes, privacy design must be revisited (**FLAG**).

---

## 2. Roles (to confirm with counsel + Lemon Squeezy)

| Activity | Likely actor | Notes |
|---|---|---|
| Website visitor analytics | You (controller) ± analytics processor | Depends on tool (e.g., privacy-friendly vs ad pixels) |
| Email list for free download | You as controller; ESP as processor | Need DPA if EU/UK persons |
| Payment & tax invoices | **Lemon Squeezy as MoR** | Buyer pays LS; LS provides seller dashboard data — confirm controller/processor narratives in LS docs |
| Download delivery | LS ± your fulfilment email | |
| Support email | You | Minimize data retained |

**FLAG:** Map international transfers (US/EU/UK) for ESP, analytics, and LS.

---

## 3. Website Privacy Policy — outline (draft topics)

Counsel should cover at least:

1. **Who we are** — legal entity, contact, EU/UK representative if required.  
2. **Data we collect** — account/contact forms; email; diagnostics; cookies.  
3. **Purposes & legal bases** (GDPR) — e.g., contract, legitimate interests, consent for non-essential cookies/marketing.  
4. **Free scorecard funnel** — what is collected, whether email is required, marketing opt-in separate from download where required.  
5. **Payments** — statement that checkout is via Lemon Squeezy (MoR); link to LS privacy policy; what buyer data you receive post-purchase.  
6. **Processors** — ESP, hosting, analytics, support; categories not necessarily every subprocessors list if counsel prefers “categories + request.”  
7. **Retention** — email list, support tickets, purchase records (align to tax/commercial needs).  
8. **Security** — appropriate measures; no absolute security promise.  
9. **International transfers** — mechanisms (SCCs, etc.).  
10. **Rights** — access, deletion, portability, objection, complaint to supervisory authority.  
11. **Children** — not directed at children.  
12. **Do Not Track / GPC / US state laws** — CCPA/CPRA and other US state requirements if applicable (sale/share definitions — carefully: many B2B digital sellers still need a US state addendum).  
13. **Changes** — how you notify.  
14. **Contact** — privacy@…  

**Product honesty:** State clearly that downloadable templates do **not** require uploading your invoice AP data to Evidence Room to function.

---

## 4. Website Terms of Use — outline

1. Acceptance of terms.  
2. Informational nature of site; disclaimers (link full AP Agent OS disclaimers).  
3. IP ownership of site content.  
4. Acceptable use (no scraping abuse, no malware, no reverse engineering of download packs beyond licence).  
5. Third-party links (vendors, research hosts).  
6. Purchases governed by Lemon Squeezy checkout terms + our Licence Terms.  
7. Free materials licence (evaluation, no resale).  
8. Limitation of liability; governing law (**FLAG**).  
9. No professional advice.  

---

## 5. Cookie / tracking notes

Prefer **minimal** analytics consistent with institutional brand.

- Default: privacy-respecting analytics or server logs only.  
- If using advertising pixels: consent banner where required; document “sale/share” under US laws.  
- Ban dark-pattern consent walls.  

---

## 6. Marketing email notes

- Separate **transactional** (delivery, licence) from **marketing**.  
- Double opt-in where required or as best practice.  
- Unsubscribe in every marketing mail.  
- Do not buy shady AP email lists — brand and legal risk.  

---

## 7. Lemon Squeezy-specific privacy/terms interactions

Per Lemon Squeezy public pricing/docs (re-verify at launch):

- LS charges platform fees (**5% + $0.50**, plus international / PayPal / subscription / marketing add-ons as applicable).  
- LS acts as **Merchant of Record** — buyers’ payment relationship is with LS as described in LS terms.  

**Your site should:**
- Say that purchases are processed by Lemon Squeezy.  
- Link LS terms/privacy at checkout context.  
- Still present **your** Licence Terms for the digital Materials (what the buyer may do with files).  
- Align refund language with LS + counsel (`07_LEMON_SQUEEZY/01_STORE_BLUEPRINT.md`).  

**FLAG:** Confirm whether your Licence Terms are presented as a checkbox at checkout or inside the product; MoR does not remove your IP licensing job.

---

## 8. Data you should avoid collecting (launch)

- Government IDs  
- Full payment card data (LS handles)  
- Customer invoice PDFs “for personalization” unless a future hosted product is designed with security review  
- Unnecessary employee personal data in support tickets  

---

## 9. Security & breach readiness (non-policy)

Even without a hosted AP app:

- Protect email list exports.  
- Protect LS API keys and dashboard access (2FA).  
- Have a counsel-approved breach notification sketch if contact databases leak.  

---

## 10. Deliverables checklist for launch counsel pack

- [ ] Privacy Policy (web)  
- [ ] Terms of Use (web)  
- [ ] Cookie notice / AUP if needed  
- [ ] Licence Terms (Individual / Professional / Team) finalized  
- [ ] Disclaimers finalized  
- [ ] LS MoR + refund alignment memo  
- [ ] DPA template for ESP  
- [ ] Trademark / entity name confirmation  

---

## 11. Suggested public language (until policies exist)

Use only a temporary holding statement if the site is pre-launch:

> Privacy Policy and Terms are in preparation. For purchase-related data handled at checkout, see Lemon Squeezy’s policies. Contact us at [privacy email] for requests.

Replace with counsel-approved policies before paid traffic.

---

*This note feeds legal workstreams; it is not itself compliance.*
