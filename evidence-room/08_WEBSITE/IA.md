# Evidence Room — Website Information Architecture

**Domain:** evidenceroom.ai  
**Primary product:** AP Agent OS  
**Voice:** intelligent, concise, credible, executive, specific, non-hype  
**Master line:** Responsibility is earned.  
**Supporting line:** Governed agents. Measurable outcomes.  
**Status:** Ready for implementation. All page copy lives in the sibling `COPY_*.md` files.

This document is the site map, navigation, URL plan, conversion logic, and content rules. It is not legal advice.

---

## 1. What the site must do

The site has one job: help a finance, AP, controllership, or audit leader decide whether Evidence Room is the right operating system for designing a governed agent layer across an existing AP stack.

In the first five seconds, every primary page should make four things obvious:

1. **What it is** — an operating system for building, governing, and scaling AI agents across Accounts Payable.
2. **Who it is for** — finance and AP leaders who already have (or are about to buy) automation, OCR, ERP, or “AI AP” tools.
3. **What it improves** — design quality, governance, measurement, and operating discipline of agent work.
4. **Why it is different** — it does not replace the ERP or AP stack, and it does not sell hype. It sells responsibility, evidence, and a method.

Primary conversion: **Assess Your AP Agent Readiness** (free diagnostic).  
Secondary conversion: **Explore the AP Agent OS** (paid toolkit).  
Tertiary conversion: **Request a Custom Blueprint** (application, $1,500–$3,000).

---

## 2. Site map

```
evidenceroom.ai
│
├── /                                 Home
├── /ap-agent-os                      Product overview (all tiers)
├── /diagnostic                       Free AP Agent Readiness Diagnostic
├── /starter                          AP Agent Starter ($79) — optional deep page; also covered on /ap-agent-os
├── /professional                     AP Agent OS Professional ($199)
├── /team                             AP Agent OS Team ($499)
├── /custom                           Custom Blueprint ($1,500–$3,000)
├── /method                           Method, responsibility model, KPI, governance
├── /about                            Company, brand idea, what we will not claim
├── /governed-ap                      Conversion landing (paid / campaign)
│
├── /privacy                          Privacy policy (public)
├── /terms                            Terms of use and sale (public)
├── /disclaimer                       Disclaimers (public)
├── /licence                          Licence summary + link to full terms
│
└── /legal                            Index of legal documents (optional)
```

**Campaign aliases (same landing, different entry):**

- `/lp/readiness`
- `/lp/agentic-ap`
- `/lp/governed-agents`

These resolve to the same conversion landing as `/governed-ap` (`COPY_LANDING.md`).

**Do not create** a `/roi`, `/savings-calculator`, `/fraud`, or `/autonomous-payments` page. Those claims are out of scope.

---

## 3. Primary navigation

**Desktop / header**

| Item | URL | Note |
|---|---|---|
| Product | `/ap-agent-os` | Dropdown: Diagnostic, Starter, Professional, Team, Custom |
| Method | `/method` | Responsibility model, KPI, governance, roadmap |
| Diagnostic | `/diagnostic` | Also the primary CTA style |
| About | `/about` | Secondary weight |

**Header actions**

| Action | Style | Destination |
|---|---|---|
| Assess Your AP Agent Readiness | Primary button | `/diagnostic` |
| Explore the AP Agent OS | Text link | `/ap-agent-os` |

**Mobile**

Same items, stacked. Primary button remains visible in the collapsed header.

**Do not** put pricing in the top nav as a standalone item. Pricing lives on product pages and the landing page. Curiosity should land on method or diagnostic first.

---

## 4. Footer

Four columns.

**Column 1 — Brand**

- Wordmark: EVIDENCE ROOM
- Master line: Responsibility is earned.
- Supporting line: Governed agents. Measurable outcomes.
- Domain: evidenceroom.ai

**Column 2 — Product**

- AP Agent OS
- Diagnostic
- Professional
- Team
- Custom Blueprint

**Column 3 — Company**

- Method
- About
- Contact: hello@evidenceroom.ai

**Column 4 — Legal**

- Privacy
- Terms
- Disclaimer
- Licence terms
- Refund policy (section of Terms, also linked)

**Footer legal line (required on every page):**

> © 2026 Evidence Room. Independently authored operating materials. Not legal, tax, accounting, audit, or investment advice. Does not replace your ERP, AP, or control environment. Checkout for digital products is processed by Link, LLC f/k/a Lemon Squeezy LLC, acting as merchant of record. Confirm your own tax position with a qualified adviser.

**Checkout / store pages** must also include the Lemon Squeezy merchant-of-record footer language required by the platform at the time of launch. See `07_LEMON_SQUEEZY/STORE_BLUEPRINT.md`.

---

## 5. Page jobs

| Page | Job | Primary CTA | Secondary CTA | Copy file |
|---|---|---|---|---|
| Home | 5-second comprehension + diagnostic | Assess Your AP Agent Readiness | Explore the AP Agent OS | `COPY_HOME.md` |
| AP Agent OS | Explain the system and tiers | Explore Professional | Assess readiness | `COPY_AP_AGENT_OS.md` |
| Diagnostic | Convert to free lead magnet | Get the Diagnostic | See Professional | `COPY_DIAGNOSTIC.md` |
| Professional | Convert $199 purchase | Get Professional | Compare Team | `COPY_PROFESSIONAL.md` |
| Team | Convert $499 purchase | Get Team | Book a walkthrough | `COPY_TEAM.md` |
| Custom | Qualify $1,500–$3,000 applications | Request a Blueprint | See Team | `COPY_CUSTOM.md` |
| Method | Teach the operating idea | Assess readiness | Explore the OS | `COPY_METHOD.md` |
| About | Trust, scope, anti-hype | Assess readiness | Read the method | `COPY_ABOUT.md` |
| Landing | Campaign conversion | Assess readiness / Get Professional | Explore tiers | `COPY_LANDING.md` |
| Privacy | Lawful notice | — | — | `COPY_PRIVACY.md` |
| Terms | Lawful notice | — | — | `COPY_TERMS.md` |
| Disclaimer | Scope and non-promises | — | — | `COPY_DISCLAIMER.md` |

Starter does not need a standalone marketing page at launch. It is a rung on `/ap-agent-os` and a Lemon Squeezy product. Add `/starter` later if paid ads need a dedicated URL.

---

## 6. Conversion architecture

```
LinkedIn / articles / search / referral
              │
              ▼
     Home  or  Landing  or  Method
              │
              ▼
         Diagnostic (free)
              │
     ┌────────┼────────┐
     ▼        ▼        ▼
  Starter   Professional   Team
   $79        $199         $499
              │
              ▼
        Custom Blueprint
        $1,500–$3,000
```

**Rules**

- The diagnostic is the default ask. It is a product, not a newsletter signup dressed as a product.
- Never gate the method page. Teaching builds the brand.
- Never put a savings calculator, ROI slider, or “detect fraud” claim on any path.
- Northline Industrial Group is the only worked example. Label it fictional on every page that uses it.
- Paid checkout happens on Lemon Squeezy (hosted or overlay). The site never stores card data.

---

## 7. Shared modules

Use the same modules across pages so the site feels like one document, not a campaign kit.

1. **Five-second block** — what / who / improves / why different.
2. **What this is not** — does not replace ERP; no guaranteed savings, fraud detection, compliance, accounting accuracy, autonomous payments, or ROI.
3. **Responsibility model** — short version of the method.
4. **Workforce diagram** — human roles + agent roles + control plane.
5. **Tier table** — Diagnostic / Starter / Professional / Team / Custom.
6. **Northline vignette** — one fictional scene, clearly labelled.
7. **FAQ** — objections in plain English.
8. **Legal strip** — advice + MoR + non-promises.

---

## 8. Content and visual rules

**Do**

- Serif headlines, sans body, mono labels — institutional research, not a startup landing.
- Paper, ink, forest, rule-gold. See `brand/design-system.css`.
- Specific nouns: invoice, exception, three-way match, steward, control owner, evidence pack.
- Name the stack as something you design *across*: ERP, AP automation, OCR, banks, shared services.

**Do not**

- Robots, neon brains, purple gradients, “AI-powered” as a badge, rocket emojis, “10x”, “guaranteed”.
- Stock photos of people pointing at glass dashboards.
- Customer logos. There are no customers to invent.
- Testimonials. Do not fabricate them.
- Competitor attack pages.

---

## 9. Metadata defaults

| Field | Pattern |
|---|---|
| Title | `{Page} · Evidence Room` |
| Description | One sentence. Include “Accounts Payable” and “governed agents”. No savings claims. |
| OG image | Wordmark + master line on paper. No product collage. |
| Canonical | `https://evidenceroom.ai{path}` |
| Robots | Index all marketing and legal pages. Noindex checkout, thank-you, and application-received. |

**Home title:** Evidence Room · The operating system for AP agents  
**Home description:** Evidence Room is the operating system for building, governing and scaling AI agents across Accounts Payable. Responsibility is earned.

---

## 10. Thank-you and post-purchase

| Event | URL | Job |
|---|---|---|
| Diagnostic requested | `/thanks/diagnostic` | Confirm email delivery; point to START HERE 01 |
| Starter purchased | `/thanks/starter` | Licence reminder + START HERE |
| Professional purchased | `/thanks/professional` | Licence reminder + START HERE |
| Team purchased | `/thanks/team` | Seat instructions + workshop note |
| Custom application | `/thanks/custom` | “We review applications; this is not a booking.” |
| Checkout abandoned return | `/continue` | Soft return to the last tier, no countdown timer |

Thank-you pages are operational, not marketing. No upsell modal on the Team or Custom thank-you pages.

---

## 11. Launch sequence for the site

1. Ship Home, Diagnostic, AP Agent OS, Method, About, legal pages.
2. Ship Professional, Team, Custom.
3. Ship conversion landing for LinkedIn and email.
4. Connect Lemon Squeezy overlay/hosted checkout.
5. Add `/starter` only if ad diagnostics show it earns its own URL.

---

## 12. Open questions for counsel and tax (not blockers for copy)

Flagged in legal files. Do not invent answers on the site.

- Seller legal entity name and jurisdiction.
- Whether the seller’s own VAT/GST/sales-tax position is fully covered by Lemon Squeezy as merchant of record.
- Cookie / analytics vendor list.
- Exact refund window and digital-goods exceptions by jurisdiction.

Until those are confirmed, the site uses “Evidence Room” as the brand, “Link, LLC f/k/a Lemon Squeezy LLC” as the checkout merchant of record, and the draft legal pages marked for professional review.
