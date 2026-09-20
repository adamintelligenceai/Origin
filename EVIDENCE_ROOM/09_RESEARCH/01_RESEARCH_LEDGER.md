# Research Ledger — Evidence Room AP Agent OS

**Purpose:** Single source of truth for quantitative and directional claims used in products, marketing, and business-case templates.  
**Rule:** If it is not in this ledger (or clearly labeled *Illustrative model*), it does not appear in customer-facing materials.  
**Last structured review:** 2026-03 (update when refreshing Ardent / fee pages).

---

## How to use this ledger

| Field | Meaning |
|---|---|
| **Claim** | What we are allowed to say, in precise language |
| **Value** | Exact figure or qualitative bound |
| **Source** | Publisher / report title |
| **Date/year** | Report or page year |
| **URL** | Host location (verify live before launch copy freeze) |
| **Independence** | Who paid/hosted; bias note |
| **Exact context** | What the number measures — and what it does **not** |
| **Use-in-product** | Where OK; required caveats |

**Independence legend:** `Analyst-primary` · `Vendor-hosted analyst` · `Vendor/analyst blog` · `Market-research firm` · `Commercial fee schedule`

---

## Ledger

| Claim | Value | Source | Date/year | URL | Independence | Exact context | Use-in-product guidance |
|---|---|---|---|---|---|---|---|
| Average cost per invoice (all respondents, 2024 survey wave) | **$9.40** | Ardent Partners, *State of ePayables 2024* (PDF hosted by Medius) | 2024 | Medius-hosted Ardent report PDF (confirm current Medius resource URL at publish time) | Vendor-hosted analyst | Average processing cost per invoice across surveyed organizations in that report wave — not Evidence Room customers; not a savings guarantee | OK in problem framing & benchmark context. Always “Ardent Partners State of ePayables 2024 (Medius-hosted).” Never “typical Evidence Room result.” |
| Average invoice cycle time (2024) | **9.15 days** | Same as above | 2024 | Same | Vendor-hosted analyst | Cycle time as defined in report methodology (receipt-to-ready/paid definitions per Ardent) | Use for “cycle time pressure” narrative; pair with customer’s own baseline for any business case |
| Invoice exception rate (2024) | **14.0%** | Same as above | 2024 | Same | Vendor-hosted analyst | Share of invoices requiring exception handling per Ardent definition | Map to Agent OS exception taxonomy; do not claim agents will cut this by X% |
| Straight-through processing / STP rate (2024) | **32.6%** | Same as above | 2024 | Same | Vendor-hosted analyst | STP as defined by Ardent for that year | Contrast with BiC; useful for earn-up KPI design |
| PO-linked invoice rate (2024) | **61.0%** | Same as above | 2024 | Same | Vendor-hosted analyst | Invoices linked to purchase orders | Process-design context; not an Evidence Room feature metric |
| Best-in-Class cost per invoice vs All Others (2024) | **BiC $2.78** vs **All Others $12.88** | Same as above | 2024 | Same | Vendor-hosted analyst | Ardent’s BiC cohort vs remainder — selection criteria are Ardent’s, not ours | **Illustrative gap only.** Say: “Ardent reports a wide gap between Best-in-Class and All Others.” Never imply purchase of Evidence Room moves a buyer into BiC |
| Best-in-Class exception rate vs others (2024) | **BiC 9%** vs **22%** | Same as above | 2024 | Same | Vendor-hosted analyst | Exception rates for BiC cohort vs others | Same caveat as BiC cost |
| Best-in-Class STP vs others (2024) | **BiC 49.2%** vs **23.4%** | Same as above | 2024 | Same | Vendor-hosted analyst | STP for BiC vs others | Use in “maturity spread” slides; label source |
| Average cost per invoice (2025) | **$9.84** | Ardent Partners, *State of ePayables 2025* (hosted by Bottomline) | 2025 | Bottomline-hosted Ardent report (confirm URL at publish) | Vendor-hosted analyst | 2025 survey wave average cost/invoice | Prefer citing **both** 2024 and 2025 when discussing trend; note cost moved $9.40 → $9.84 (do not invent causes) |
| Average cycle time (2025) | **8.2 days** | Same as above | 2025 | Same | Vendor-hosted analyst | Cycle time in 2025 wave | OK for “still multi-day” framing |
| Exception rate (2025) | **18.4%** | Same as above | 2025 | Same | Vendor-hosted analyst | Exception rate rose vs 2024’s 14.0% in Ardent’s published averages — do not assert causal story without Ardent text | May note year-over-year published averages differ; avoid speculative “AI made exceptions worse” claims unless Ardent states it |
| STP rate (2025) | **35.4%** | Same as above | 2025 | Same | Vendor-hosted analyst | STP in 2025 wave | Modest improvement vs 2024 32.6% — still minority STP |
| E-invoice supplier share (2025) | **57.4%** | Same as above | 2025 | Same | Vendor-hosted analyst | Suppliers submitting e-invoices (per report definition) | Supplier onboarding / channel strategy context |
| PO-linked rate (2025) | **65.4%** | Same as above | 2025 | Same | Vendor-hosted analyst | PO linkage in 2025 wave | Process maturity context |
| Best-in-Class cost vs All Others (2025) | **BiC $2.65** vs **All Others $12.42** | Same as above | 2025 | Same | Vendor-hosted analyst | BiC vs All Others cost gap remains large | Same BiC caveats as 2024 |
| Agentic capabilities in AP invoice automation (directional) | Vendors deploying agentic capabilities for **exception handling**, **fraud detection**, and **supplier management** | Forrester blog: *What's New For AP Invoice Automation In 2026* | 2026 (blog framing) | Forrester blog post titled as above (verify live URL) | Vendor/analyst blog | Qualitative market/vendor direction — **not** a quantified performance guarantee, adoption rate, or ROI figure | Use only as **market direction**: “Analyst commentary notes vendors adding agentic capabilities in ….” Never convert into % savings or risk reduction |
| AP automation market growth | Market reports (incl. Grand View Research and peers) cite growth in AP automation | Grand View Research / adjacent market reports | Varies by report edition | Publisher pages (verify edition) | Market-research firm | Sizing methodologies differ (scope: software vs services; geography; invoice vs P2P). Figures are **not** interchangeable | **Cautious use only.** Prefer: “Market researchers describe growth in AP automation; methodologies vary — treat size figures carefully.” Do **not** put a single TAM/CAGR on the homepage without edition, year, and methodology note. Prefer omitting headline TAM if uncertain |
| Lemon Squeezy platform fee | **5% + $0.50** per transaction (base) | Lemon Squeezy Pricing | Current as published on pricing page; re-verify at launch | https://lemonsqueezy.com/pricing | Commercial fee schedule | Platform fee for sales processed through LS | Use in `12_FINANCIAL_MODEL` and store blueprint net-revenue math |
| Lemon Squeezy Merchant of Record | LS acts as **Merchant of Record (MoR)** | Lemon Squeezy docs / positioning | Current | LS docs / pricing | Commercial fee schedule | MoR handles aspects of tax/payments collection as described by LS — confirm exact MoR scope in LS docs for your entity | State in store ops: “Sold via Lemon Squeezy as MoR” — confirm with counsel what seller still remains responsible for |
| International fee | **+1.5%** | Lemon Squeezy fees help | Current | https://docs.lemonsqueezy.com/help/getting-started/fees | Commercial fee schedule | Additional fee on international transactions as defined by LS | Model separately in unit economics |
| PayPal fee | **+1.5%** | Same | Current | Same | Commercial fee schedule | When buyer pays with PayPal | Scenario analysis in financial model |
| Subscription fee add-on | **+0.5%** | Same | Current | Same | Commercial fee schedule | Additional fee for subscription products | Apply if any SKU is subscription-billed |
| Marketing add-ons | Extra fees for LS marketing add-ons (per pricing) | Lemon Squeezy Pricing | Current | https://lemonsqueezy.com/pricing | Commercial fee schedule | Optional growth/marketing features beyond base fee | Do not include in base margin until opted in |

---

## Illustrative models (not research)

These are **allowed** in Pro/Team business-case worksheets **only** when labeled:

> **Illustrative model — not a measured customer result. Replace inputs with your baseline. Sourced benchmarks below are Ardent Partners survey averages for context, not predicted outcomes.**

| Model type | Allowed inputs | Forbidden |
|---|---|---|
| Cost-gap scenario | User’s invoices/year × (user cost − target cost); optional reference to Ardent avg / BiC / All Others as **external context** | Claiming “you will reach BiC $2.65” |
| Cycle-time scenario | User baseline days → user target days × volume assumptions | Guaranteeing 8.2-day or BiC cycle |
| Exception scenario | User exception % × handle-time assumptions | Guaranteeing fraud reduction or STP uplift |
| Fee net-revenue | List price − LS fees (5%+$0.50 ± adders) | Ignoring international/PayPal/subscription adders when relevant |

---

## Claim hygiene checklist (before any public page ships)

- [ ] Number appears in ledger or is labeled illustrative  
- [ ] Year and source name appear in foot or appendix  
- [ ] BiC figures never framed as product outcomes  
- [ ] Forrester used only qualitatively  
- [ ] Grand View / TAM omitted or heavily caveated  
- [ ] LS fees re-checked on live pricing/docs pages  

---

## Refresh protocol

1. Re-open Ardent 2024 (Medius) and 2025 (Bottomline) PDFs or successor hosts annually.  
2. Diff averages; update ledger rows; version the date in this file header.  
3. Demote any marketing line that relied on a superseded figure.  
4. Re-verify Lemon Squeezy fee page before each pricing change.

---

*Ledger authority: Research workstream. Marketing may not invent rows.*
