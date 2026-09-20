# Evidence Room — AP Agent OS  
## Refined Master Operating Brief (Execution Contract)

**Status:** Production brief — supersedes sprawling multi-section drafts  
**Audience:** Product, research, brand, legal, store ops, and build agents  
**Standard:** Finance-native, evidence-bound, commercially honest  
**Product principle:** *Agents that earn responsibility.*

---

## 1. Purpose

Build and sell **Evidence Room AP Agent OS**: a commercial product suite that helps Accounts Payable (AP), Finance Operations, and Controllership teams design, govern, measure, and progressively trust **AI agents** that assist — never silently own — invoice-to-pay work.

Evidence Room is **not** an AP automation platform, ERP, invoice OCR engine, or payments rail. It is the **governed operating-model layer** for an agent workforce that sits *alongside* Tipalti, Coupa, SAP, Oracle, Bill.com, Ramp, Medius, Stampli, and peers.

**Commercial outcome:** Digital products sold via Lemon Squeezy (Merchant of Record), with clear licence tiers, defensible claims, and materials a CFO, Controller, or AP Director can put in front of Audit/Risk without embarrassment.

---

## 2. Non-Goals (Hard)

Do **not**:

1. Replace, integrate as middleware, or claim parity with AP/ERP vendors.
2. Promise guaranteed cost/cycle/fraud/compliance/ROI outcomes.
3. Invent statistics, survey sizes, or “industry averages” without a ledger row.
4. Ship prompts that instruct agents to bypass controls, forge approvals, or hide exceptions.
5. Copy competitor UI, proprietary playbooks, vendor training decks, or copyrighted report text.
6. Position as legal, tax, audit, or SOX advice.
7. Use AI cliché branding (robots, neon purple, “autonomous finance,” “set and forget”).
8. Treat “agent” as synonymous with “fully autonomous payment authority.”
9. Bundle personal data processing as a core product promise without a privacy design.
10. Over-claim market size from Grand View Research (or similar) without methodology caveats.

---

## 3. Buyer & Job

| Layer | Primary | Secondary |
|---|---|---|
| **Economic buyer** | CFO / VP Finance / Controller | Finance Transformation lead |
| **Champion** | AP Manager / AP Director / Procure-to-Pay lead | Shared Services lead |
| **Influencers** | Internal Audit, IT Security, Risk, Procurement | External auditor (indirect) |
| **Anti-buyer** | Teams seeking “magic OCR + pay” with zero governance work | Prompt-marketplace tourists |

**Job to be done:**  
*When we introduce AI into AP, help us decide what agents may do, under what evidence, with whom accountable, how we measure improvement against known AP benchmarks, and how we expand responsibility only after proof — without ripping out our existing stack.*

---

## 4. Product Principle

### Agents that earn responsibility

Responsibility is **progressive**, **evidenced**, and **revocable**.

| Stage | Agent may | Human must | Evidence required |
|---|---|---|---|
| **Observe** | Summarize, classify, flag | Decide all actions | Trace of inputs/outputs |
| **Recommend** | Propose coding, match, route | Approve / reject | Rationale + exception codes |
| **Draft** | Prepare emails, coding packs, audit notes | Send / post | Dual control on external/commit |
| **Execute (narrow)** | Run pre-approved micro-actions in sandbox/tooling | Own outcome | Change log + rollback path |
| **Expand** | Broader scope only after KPI gates | Explicit promotion | Promotion record in Evidence Room |

**Default:** Start left. Move right only when KPIs, exception quality, and control tests clear defined gates. Demote freely.

---

## 5. Deliverable Architecture

### 5.1 Product ladder (store SKUs)

| SKU | Role | Buyer intent |
|---|---|---|
| **01 — Free AP AI Readiness** | Lead magnet: scorecard + gap map | Self-assess without purchase |
| **02 — AP Agent Starter** | Individual: first governed agents + templates | Pilot one workflow |
| **03 — AP Agent OS Pro** | Professional: full OS (agents, controls, KPIs, business case) | Serious single-team rollout |
| **04 — AP Agent OS Team** | Multi-seat: playbooks, RACI, shared Evidence Room | Shared services / multi-entity |
| **05 — Custom Blueprint** | Scoped advisory pack / workshop artifact | Complex or regulated environments |

Detailed store mechanics: `07_LEMON_SQUEEZY/01_STORE_BLUEPRINT.md`.

### 5.2 Pro / Team content spine (minimum)

```
Process_Mapping/     → current-state AP lifecycle, exception taxonomy
Agent_Library/       → role cards, prompts, tool boundaries, earn-up paths
Governance/          → RACI, promotion gates, demotion triggers, audit trail design
Controls/            → SoD, approval matrices, fraud/red-flag checklists (non-guarantee)
KPI_Measurement/     → metric definitions tied to research ledger
Business_Case/       → illustrative models only; sourced benchmarks labeled
Templates/           → steering decks, policy stubs, supplier comms drafts
Testing/             → UAT scripts, shadow-mode protocol, go-live checklist
```

### 5.3 Supporting workstreams

| Folder | Job |
|---|---|
| `09_RESEARCH/` | Ledger, competitors, problem definition — claim authority |
| `11_BRAND/` | Verbal + visual identity — institutional, not startup-AI |
| `10_LEGAL_AND_LICENSING/` | Licences, disclaimers, IP, privacy notes — lawyer-flagged |
| `06_SALES_AND_MARKETING/` | Honest copy from research + brand; no hype |
| `08_WEBSITE/` | Trust-first product site |
| `12_FINANCIAL_MODEL/` | Unit economics incl. Lemon Squeezy fees |
| `exports/` | PDF / PPTX-md / XLSX packaging |

---

## 6. Evidence Rules (Non-Negotiable)

1. **Every quantitative claim** used in marketing, decks, or business-case templates must exist as a row in `09_RESEARCH/01_RESEARCH_LEDGER.md`.
2. **Cite source name, year, host, and independence** (vendor-hosted analyst report ≠ peer-reviewed journal).
3. **Distinguish** sourced benchmarks vs **illustrative models** (clear label: *Illustrative — not a measured customer result*).
4. **Allowed sourced AP benchmarks (current ledger):**
   - Ardent Partners *State of ePayables* **2024** (Medius-hosted PDF): avg cost/invoice **$9.40**; cycle **9.15 days**; exception **14.0%**; STP **32.6%**; PO-linked **61.0%**; Best-in-Class cost **$2.78** vs All Others **$12.88**; BiC exception **9%** vs **22%**; BiC STP **49.2%** vs **23.4%**.
   - Ardent Partners *State of ePayables* **2025** (Bottomline-hosted): avg cost **$9.84**; cycle **8.2 days**; exception **18.4%**; STP **35.4%**; e-invoice suppliers **57.4%**; PO-linked **65.4%**; BiC cost **$2.65** vs All Others **$12.42**.
   - Forrester blog *What's New For AP Invoice Automation In 2026*: qualitative note that vendors are deploying agentic capabilities for exception handling, fraud detection, supplier management — **vendor/analyst direction, not a quantified guarantee**.
   - Grand View Research / market reports: AP automation market growth — **cite cautiously; methodology varies; do not over-claim**.
5. **Never** present Best-in-Class vs All Others as “what Evidence Room customers achieve.”
6. **Lemon Squeezy fees** for financial models: 5% + $0.50; MoR; +1.5% international; +1.5% PayPal; +0.5% subscriptions; marketing add-ons — per lemonsqueezy.com/pricing and docs.

---

## 7. Quality Gates — “9/10 Commercial Test”

A deliverable ships only if a skeptical Controller would score it ≥9/10 on:

| Gate | Pass criteria |
|---|---|
| **G1 Clarity** | One reader can state what the product is / is not in 30 seconds |
| **G2 Honesty** | No unsourced stats; illustrative math labeled; no guaranteed savings |
| **G3 Usability** | Templates are fillable; agents have explicit boundaries; next step is obvious |
| **G4 Control fit** | SoD, approvals, audit trail, and human accountability are first-class |
| **G5 Stack respect** | Explicitly complements existing AP/ERP; no “rip and replace” |
| **G6 Brand fit** | Institutional tone; passes verbal + visual identity |
| **G7 IP clean** | Checklist in `10_LEGAL_AND_LICENSING/03_IP_CLEANLINESS_CHECKLIST.md` |
| **G8 Legal hygiene** | Disclaimers present; licence tier correct; privacy notes considered |
| **G9 Commercial** | SKU, price logic, fulfilment path, and refund stance are coherent |

**Fail any gate → revise. Do not ship on vibes.**

---

## 8. IP Cleanliness

- Original frameworks, taxonomies, prompts, and diagrams only.
- Competitor names for **comparison** (nominative fair use) — never logos or scraped UI.
- Analyst figures: paraphrase + cite; do not paste report tables verbatim.
- No training on or redistribution of customer confidential data in product packs.
- Third-party trademarks: “X is a trademark of its owner; Evidence Room is independent.”

Full checklist: `10_LEGAL_AND_LICENSING/03_IP_CLEANLINESS_CHECKLIST.md`.

---

## 9. Trust & Safety

| Risk | Control in product design |
|---|---|
| Agent overreach | Earn-up stages; hard “never” lists (payments without dual control, master-data wipe, etc.) |
| Fraud / social engineering | Red-flag checklists as **aids**, not detectors of record |
| Hallucinated coding / matching | Shadow mode + sample testing before promotion |
| Compliance theater | Disclaimers: not legal/audit advice; human accountability remains |
| Data leakage in prompts | Guidance: minimize PII; prefer synthetic examples in shared packs |
| Shadow IT | Team licence expects IT/Security awareness path |

---

## 10. Execution Stages

| Stage | Outcome | Exit criteria |
|---|---|---|
| **0 — Foundation** | This brief + research ledger + brand + legal stubs + store blueprint | Files exist; claims locked |
| **1 — Free + Starter** | Readiness scorecard + Starter pack sellable | G1–G9 on Free/Starter |
| **2 — Pro** | Full OS content spine | Pro passes commercial test |
| **3 — Team** | Multi-seat governance + shared Evidence Room artifacts | Team distinct from Pro |
| **4 — Custom** | Blueprint scoping template + sales path | Not conflated with self-serve |
| **5 — Go-to-market** | Site, emails, LS store live, financial model | Fees math verified; MoR notes |
| **6 — Iterate** | Research refresh; claim review quarterly | Ledger dated; demote stale claims |

---

## 11. Positioning One-Pager (Internal)

**Category:** AP Agent Operating System (governance & operating model)  
**For:** Mid-market to enterprise AP / Finance Ops with an existing AP stack  
**Unlike:** Tipalti, Coupa, Medius, Stampli, Ramp, Bill.com, RPA vendors, and prompt marketplaces  
**We:** Design the governed agent layer — evidence, promotion gates, KPIs, controls — so AI assists AP work without pretending to replace systems of record  
**Proof style:** Sourced Ardent benchmarks for *context*; customer-specific baselines for *claims*; illustrative ROI models only  

**Tagline:** Agents that earn responsibility.  
**Supporting:** Observe → Recommend → Draft → Execute (narrow) → Expand. Always with a human owner.

---

## 12. Writing & Build Standards

- **Tone:** Executive, specific, calm. Prefer “exception rate” over “revolutionize.”
- **Banned:** See `11_BRAND/02_VERBAL_IDENTITY.md`.
- **Numbers:** Ledger or labeled illustrative — nothing else.
- **Files:** Markdown primary; CSS tokens for brand; exports generated later.
- **Reviewers:** Product lead (claim fit), brand (voice), legal flag (licences/disclaimers).

---

## 13. Decision Log Defaults

When ambiguous, prefer:

1. **Human accountability** over agent convenience  
2. **Complement stack** over displace stack  
3. **Narrow earn-up** over broad autonomy  
4. **Cite or cut** over “approximate industry knowledge”  
5. **Plain English licences** over clever growth hacks  
6. **Institutional design** over AI aesthetic trends  

---

## 14. Definition of Done (Suite)

The Evidence Room commercial suite is “done” for launch when:

- [ ] Free, Starter, Pro, Team, Custom are specified and packaged  
- [ ] Research ledger governs all public numbers  
- [ ] Brand system + verbal identity applied consistently  
- [ ] Licence tiers + disclaimers + IP checklist applied  
- [ ] Lemon Squeezy store blueprint implemented (products, emails, refunds, fee math)  
- [ ] Every paid SKU passes the 9/10 commercial test  

---

## 15. Canonical References

| Doc | Path |
|---|---|
| Research ledger | `09_RESEARCH/01_RESEARCH_LEDGER.md` |
| Competitor landscape | `09_RESEARCH/02_COMPETITOR_LANDSCAPE.md` |
| Customer problem | `09_RESEARCH/03_CUSTOMER_PROBLEM_DEFINITION.md` |
| Brand system | `11_BRAND/01_BRAND_SYSTEM.md` |
| Verbal identity | `11_BRAND/02_VERBAL_IDENTITY.md` |
| Visual tokens | `11_BRAND/03_VISUAL_TOKENS.css` |
| Licence terms | `10_LEGAL_AND_LICENSING/01_LICENCE_TERMS.md` |
| Disclaimers | `10_LEGAL_AND_LICENSING/02_DISCLAIMERS.md` |
| IP checklist | `10_LEGAL_AND_LICENSING/03_IP_CLEANLINESS_CHECKLIST.md` |
| Privacy/terms notes | `10_LEGAL_AND_LICENSING/04_PRIVACY_AND_TERMS_NOTES.md` |
| Store blueprint | `07_LEMON_SQUEEZY/01_STORE_BLUEPRINT.md` |

---

*End of refined master brief. All downstream agents execute against this contract.*
