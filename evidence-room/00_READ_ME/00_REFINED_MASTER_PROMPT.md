# Evidence Room — Refined Master Prompt

**Product:** AP Agent OS  
**Version:** 1.0.0  
**Date:** 2026-03-20  
**Status:** Locked brief for suite production

This document is the executable brief. Every artefact in the Evidence Room suite must satisfy it. Prefer precision over volume. Prefer evidence over assertion.

---

## 1. North Star

Build the operating system for designing, governing, and scaling AI agents across Accounts Payable — without replacing the customer’s existing AP, ERP, or payment stack.

Evidence Room sells an **agent layer**: responsibility progression, exception taxonomy, governance controls, and a KPI operating system for an agent workforce. Capture, workflow, and payment platforms remain Tipalti, Coupa, Basware, Stampli, Medius, HighRadius, Esker, AvidXchange, BILL, Ramp, SAP, Oracle, Microsoft, and peers. We sit across them, ERP-agnostic.

**Outcome buyers buy:** agents that earn responsibility through measured performance — not agents that are “rolled out” and hoped for.

---

## 2. Brand decision (locked)

| Element | Decision |
|---|---|
| Brand idea | **Evidence over hype.** |
| Positioning | The operating system for building, governing and scaling AI agents across Accounts Payable. |
| Primary tagline | **AI that earns responsibility.** |
| Supporting line | Governed agents. Measurable outcomes. |

### Tagline evaluation (then selection)

| Candidate | Fit to ICP | Specificity | Risk of hype | Verdict |
|---|---|---|---|---|
| AI that earns responsibility. | High — mirrors how Controllers actually expand authority | High — implies progression, not magic | Low | **Selected (primary)** |
| Governed agents. Measurable outcomes. | High — audit and KPI language | High | Low | **Selected (supporting)** |
| Automate AP with confidence. | Medium | Medium — generic automation claim | Medium | Rejected — table stakes |
| The AP agent control plane. | Medium-High | High for technical buyers | Low | Reserved for product prose, not headline |
| Stop guessing. Start proving. | Medium | Medium | Medium | Rejected — confrontational without substance |

Voice: institutional, calm, specific. No purple. No glow. No unverified percentages. Cite Ardent Partners and Lemon Squeezy (and any future sources) exactly as recorded in `09_RESEARCH/RESEARCH_LEDGER.md`.

---

## 3. Non-negotiables

1. **Do not invent statistics.** Use only claims logged in the Research Ledger, with source, date, and context.
2. **Do not claim Evidence Room replaces AP software.** Position as the agent operating layer across the stack.
3. **Do not ship ungoverned “prompt packs” as the product.** Prompts are artefacts inside a governance and measurement system.
4. **Every agent definition must answer the seven product questions** (Section 5).
5. **Quality gate is 9/10** before any commercial SKU ships (Section 7).
6. **Buyer language over vendor language.** Controllers, AP Managers, CFO/FP&A, Internal Audit — not “disruption.”
7. **Responsibility is earned.** Progression rules, not blanket autonomy.
8. **ERP-agnostic.** Design for NetSuite, SAP, Oracle, Microsoft Dynamics, and mid-market ERPs without hard dependency.
9. **Exceptions are first-class.** Taxonomy, routing, and KPI treatment are product, not footnotes.
10. **Commercial honesty.** Lemon Squeezy fees and MoR tax handling are disclosed where pricing is discussed; affiliates add merchant cost as documented.

---

## 4. Buyer ICP

### Primary buyer

- **Title:** Controller, Head of AP, AP Operations Manager, Shared Services Lead  
- **Company:** Mid-market to enterprise; multi-entity or high invoice volume; existing AP/ERP stack already purchased  
- **Trigger:** AI pilots stalling, exception backlog, audit concern about agent authority, pressure to cut cost-per-invoice without cutting control  

### Economic buyer

- CFO, VP Finance, or Shared Services Director when Team or Custom Blueprint is in play  

### Influencers

- Internal Audit / SOX / controls owners  
- IT / ERP owners (integration feasibility, not product substitution)  
- Procurement / Vendor Management (supplier inquiry load)

### Explicit non-ICP

- Teams seeking a full AP suite replacement  
- Buyers who want “ChatGPT for invoices” with no measurement  
- Pure RPA shops looking only for bot scripts  

### Problem context (cited)

Ardent Partners *State of ePayables 2025* (with Bottomline): average cost per invoice **$9.84**; cycle time **8.2 days**; exception rate **18.4%**; straight-through processing **35.4%**; e-invoice supplier adoption **57.4%**; PO-linked invoices **65.4%**; time spent on supplier inquiries **21.9%**. Best-in-Class: cost **$2.65**, exception **11.1%**, STP **51.0%** — BIC costs **79% lower** and cycles **79% faster** than peers. AI adoption **44%** now, with **>75%** expected within 12 months; **65%** hope AI increases automation.

Ardent Partners *State of ePayables 2024* (Medius distribution): average cost **$9.40**; cycle **9.15 days**; exception **14.0%**; STP **32.6%**; automation can cost **50–80% less** than manual processing.

These figures frame the gap; they are not Evidence Room performance claims.

---

## 5. Product principle — seven questions

Every agent, playbook, and control in the suite must be designable by answering:

1. **What work is this agent permitted to perform?** (scope, document types, value thresholds)  
2. **What evidence must it produce on every run?** (artefacts, citations, system of record fields)  
3. **Who owns exceptions, and how are they classified?** (taxonomy + human route)  
4. **Which KPIs prove the agent is earning more responsibility?** (STP, exception rate, cycle contribution, inquiry deflection — defined in KPI OS)  
5. **What are the promotion and demotion rules?** (responsibility progression)  
6. **What happens on failure, ambiguity, or policy conflict?** (stop conditions, escalation)  
7. **How is the trail auditable six months later?** (logging, retention, control mapping)

If an artefact cannot answer all seven, it does not ship.

---

## 6. Commercial hierarchy (prices locked for v1.0.0)

Sold via Lemon Squeezy (Merchant of Record; platform fee **5% + $0.50**, plus documented add-ons — see Research Ledger). Evidence Room does not replace Lemon Squeezy economics; pricing below is **list price to buyer**.

| Tier | SKU | List price (USD) | Intent |
|---|---|---|---|
| 01 | **AP AI Readiness** | **$0** | Lead magnet: readiness score, gap map, glossary, next-step path |
| 02 | **AP Agent Starter** | **$297** | First governed agent design for one AP use case + basic KPI sheet |
| 03 | **AP Agent OS Pro** | **$997** | Full OS: agent library patterns, process maps, controls, governance, KPI OS, testing, business case |
| 04 | **AP Agent OS Team** | **$2,997** | Pro + workshop kit, training paths, change management, executive pack, multi-agent implementation guide |
| 05 | **Custom Blueprint** | **From $15,000** | Facilitated engagement: current-state map, agent workforce design, governance charter, 90-day responsibility roadmap |

**Upsell logic:** Free → Starter (prove one agent) → Pro (install the OS) → Team (scale people + agents) → Custom (enterprise specificity).

**What is not sold:** unlimited “prompt dumps,” fake ROI calculators with invented baselines, or software that displaces Tipalti/Coupa/etc.

---

## 7. Quality gate — 9/10

Before any SKU is marked shippable, score each criterion 0–10. **Ship only if composite ≥ 9.0** and no criterion below 8.

| # | Criterion | Bar for 9+ |
|---|---|---|
| 1 | Evidence discipline | Every numeric claim ledgered; no orphan stats |
| 2 | ICP clarity | Buyer can see themselves in first screen of copy |
| 3 | Seven-question completeness | All agents/templates answer Q1–Q7 |
| 4 | Stack honesty | Clear “works with / does not replace” language |
| 5 | Governance depth | Roles, RACI, promotion rules, audit trail present |
| 6 | Exception taxonomy | Named classes, routes, KPI treatment |
| 7 | KPI OS coherence | Definitions, formulas, cadences, BIC context (cited) |
| 8 | Commercial clarity | Price, licence, Lemon Squeezy fee disclosure where relevant |
| 9 | Editorial quality | Executive tone; no hype; consistent brand system |
| 10 | Navigability | README / Quick Start / Product Index allow unaided use |

---

## 8. Execution sequence

1. Lock brand system and Research Ledger (this release).  
2. Produce Free Readiness kit → validate language with ICP phrasing.  
3. Produce Starter (one agent, end-to-end, seven questions answered).  
4. Produce Pro OS modules (Process Mapping → Agent Library → Controls → Governance → KPI → Testing → Business Case → Templates).  
5. Produce Team overlays (Workshop, Training, Change, Executive, Implementation).  
6. Produce Custom Blueprint SOW and delivery artefacts.  
7. Wire Lemon Squeezy products, licence text, and sales funnel.  
8. Ship website pages that mirror Evidence Standard (no uncited charts).  
9. Run quality gate; remediate; version bump only when ≥ 9/10.

---

## 9. What NOT to build

- A competing AP invoice-capture or payment platform  
- A closed ERP connector product as the core offer  
- Unscoped “AI AP bots” without promotion rules  
- Benchmark claims that imply Evidence Room achieved Ardent BIC numbers  
- Purple/glow consumer-AI visual language  
- Affiliate-hidden pricing that ignores Lemon Squeezy’s **+3%** affiliate merchant cost when used  
- Content that treats prompt marketplaces as equivalent to an agent OS  

---

## 10. Evidence Standard rules

1. **Claim → Ledger.** Any number, %, dollar, or day figure must appear in `09_RESEARCH/RESEARCH_LEDGER.md` before use in marketing or product copy.  
2. **Cite precisely.** Name the report year and distributor when relevant (e.g. Ardent 2025 / Bottomline; Ardent 2024 / Medius distribution).  
3. **Separate peer averages from BIC.** Never blend $9.84 and $2.65 into one vague “savings” claim.  
4. **Separate 2024 and 2025.** Do not present multi-year figures as a single snapshot.  
5. **Vendor-originated vs independent.** Mark Medius-distributed and Bottomline-associated releases carefully; still usable, with origin noted.  
6. **Platform fees are facts, not margins.** Lemon Squeezy: **5% + $0.50**; **+1.5%** international; **+1.5%** PayPal; **+0.5%** subscriptions; MoR handles tax; affiliates **+3%** to merchant — source: docs.lemonsqueezy.com.  
7. **Gap claims are structural, not share stats.** Competitor gap analysis states what categories miss (agent OS, responsibility progression, governance toolkit, exception taxonomy + KPI OS). Do not invent market-share or “X% of AP teams lack Y.”  
8. **No fabricated customer quotes or case-study ROIs** until real evidence exists.  
9. **Charts must label source and year** in the visual or caption.  
10. **When evidence is thin, say so.** Prefer “not yet evidenced” over filler.

---

## 11. Market gap (positioning constraint)

AP software vendors sell capture, workflow, and payment platforms. The underserved layer is:

- ERP-agnostic **agent operating model**  
- **Responsibility progression** for AI workers  
- **Agent governance toolkit**  
- **Exception taxonomy + KPI OS** for agent workforce design  

Evidence Room fills that layer. It designs how agents work across the stack the customer already owns.

---

## 12. Definition of done (suite)

The commercial product is done for v1.0.0 when:

- All tiers in `PRODUCT_INDEX.md` exist at quality gate ≥ 9/10  
- Research Ledger covers every shipped numeric claim  
- Brand system applied to covers and web  
- Lemon Squeezy SKUs match Section 6 prices  
- A buyer can complete `QUICK_START.md` without vendor support  

---

*End of refined master prompt. Downstream authors: treat contradictions with this document as defects.*
