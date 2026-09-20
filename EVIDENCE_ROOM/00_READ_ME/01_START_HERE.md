# Evidence Room — START HERE

**Document ID:** `00_READ_ME/01_START_HERE`  
**Version:** 1.0  
**Audience:** Buyers, implementers, and internal builders of the Evidence Room — AP Agent OS ecosystem.

---

## What this is

**Evidence Room** is the operating system for designing, governing, measuring, and scaling AI agents across Accounts Payable.

It is **not** a ChatGPT prompt pack, AI ebook, consulting jargon deck, autonomous payment system, accounting system, or ERP replacement.

It **is** an implementation-ready toolkit for CFOs, Controllers, Heads of AP / Shared Services, and Finance Transformation leaders in complex, ERP-backed organisations.

**Brand idea:** Operating Evidence — charters, controls, exception logic, KPIs, and earned responsibility before autonomy expands.

---

## Product index (commercial ladder)

| Tier | Folder | Product | Price | Who it is for |
|---|---|---|---|---|
| 0 | `01_FREE_AP_AI_READINESS/` | AP AI Readiness Diagnostic | Free | Anyone testing seriousness of fit |
| 1 | `02_AP_AGENT_STARTER/` | AP Agent Starter Kit | US$79 | Solo AP lead needing a credible first kit |
| 2 | `03_AP_AGENT_OS_PRO/` | AP Agent OS — Professional | US$199 | Finance Director / Controller redesigning the agent operating model |
| 3 | `04_AP_AGENT_OS_TEAM/` | AP Agent OS — Team | US$499 | Transformation lead mobilising a workshop and rollout |
| 4 | `05_CUSTOM_BLUEPRINT/` | AP Transformation Blueprint | US$1,500–3,000 | Productised service fitted to entities / ERP / controls |

**Supporting systems (not customer SKUs):**

| Folder | Contents |
|---|---|
| `06_SALES_AND_MARKETING/` | Funnel, email, content engine |
| `07_LEMON_SQUEEZY/` | Merchant-of-record packaging & fee notes |
| `08_WEBSITE/` | Public site source |
| `09_RESEARCH/` | Research Ledger, competitor landscape, customer/problem |
| `10_LEGAL_AND_LICENSING/` | Licence terms, IP checklist |
| `11_BRAND/` | Brand system + visual tokens |
| `_build/` | Build/export scratch |

---

## How to navigate tiers

```
Start → Free Diagnostic
          ↓ ready / serious
        Starter (optional if already clear)
          ↓ redesigning the operating model yourself
        Professional  ←———— most Controllers land here
          ↓ need to mobilise people
        Team
          ↓ need context-specific design
        Custom Blueprint
```

**Rules of thumb**
- If you need artefacts *you* will operate Monday → **Professional**.  
- If you need to run a workshop and assign owners across a team → **Team**.  
- If your estate is multi-entity / highly constrained → **Blueprint**.  
- Do not buy Team hoping it is “better software.” It is a mobilisation layer on the same OS.

---

## Non-negotiables (all tiers)

1. Human accountability first. Agents earn responsibility (L0→L4).  
2. Payment authorisation stays human.  
3. No invented statistics — market claims live in `09_RESEARCH/01_RESEARCH_LEDGER.md`.  
4. ERP-agnostic design.  
5. Every artefact answers at least one operating question: What / How / Who owns / What can go wrong / How to control / How to measure / What evidence proves it.

---

## Friday → Monday path — Professional buyers

**Audience:** Finance Director, Controller, or Head of AP who purchased **AP Agent OS — Professional** (US$199).  
**Outcome by Monday close:** A scoped agent operating design for a controlled pilot — not a production autonomy rollout.

### The 12 steps

| Step | When | Action | Where in the product |
|---|---|---|---|
| **1. Orient** | Friday 16:00 | Read this file and the Professional contents map. Confirm you are *not* seeking autonomous payments or ERP replacement. | `00_READ_ME/` · `03_AP_AGENT_OS_PRO/` |
| **2. Baseline honesty** | Friday 16:30 | Capture current KPIs you actually have (cycle time, exception rate, STP, inquiry load). Leave blanks — do not invent. | `KPI_Measurement/` |
| **3. Market context (optional)** | Friday 17:00 | Skim Research Ledger entries RL-001–RL-008 for Best-in-Class *context*. Attribute if you brief anyone. | `09_RESEARCH/01_RESEARCH_LEDGER.md` |
| **4. Pick the pilot slice** | Friday 17:30 | Choose one invoice corridor (e.g. PO-backed domestic, single entity). Write exclusions. | `Process_Mapping/` |
| **5. Select first agents** | Saturday AM | Choose 3–5 agents from the 16-agent library — typically Intake, Validation, Matching, Exception Triage, plus one reporting/close adjacency if needed. | `Agent_Library/` |
| **6. Charter them** | Saturday AM–PM | Complete job, inputs, tools, responsibilities, **exclusions**, human owner, escalation, output standard for each. | `Agent_Library/` · `Governance/` |
| **7. Set responsibility caps** | Saturday PM | Assign starting levels. Default ≤ **L1 Recommend** or **L2 Prepare**. No L3/L4 without evidence. Payment proposal stays human-gated. | `Governance/` |
| **8. Install exception taxonomy** | Sunday AM | Adopt the taxonomy; map your top exception codes into it. Retire vague “other.” | `Process_Mapping/` · Exception materials in Pro |
| **9. Define controls & evidence** | Sunday AM | For each agent: control points, audit evidence artefacts, failure handling. | `Controls/` |
| **10. Write the pilot protocol** | Sunday PM | Shadow → Controlled Pilot plan with entry/exit criteria, rollback, and sample size. | `Testing/` |
| **11. Build the Monday brief** | Sunday PM | One-page brief for CFO/Controller/Audit: scope, exclusions, responsibility levels, KPIs, ask. | `Business_Case/` · templates |
| **12. Monday launch** | Monday | Socialise the brief; start shadow mode only; schedule mid-week checkpoint; log issues in the exception taxonomy. | Live operation |

### Monday definition of done

- [ ] 3–5 agents chartered with named human owners  
- [ ] Responsibility levels written and capped  
- [ ] Exception taxonomy in use for the pilot queue  
- [ ] KPI baseline sheet opened (even if partially blank)  
- [ ] Shadow/pilot protocol approved by Controller (or delegate)  
- [ ] Explicit statement: **no autonomous payment authorisation**

If any box is unchecked, stay in shadow — do not expand responsibility.

---

## Agent stack (reference)

1 Invoice Intake · 2 Validation · 3 Matching · 4 Exception Triage · 5 Goods Receipt · 6 PO Quality · 7 Approval · 8 Supplier Resolution · 9 Internal Follow-Up · 10 Duplicate & Anomaly · 11 Vendor Statement Reconciliation · 12 Payment Proposal Review · 13 AP Close · 14 AP Reporting · 15 Root Cause · 16 AP Manager / Orchestrator

## Responsibility model (reference)

**L0** Observe → **L1** Recommend → **L2** Prepare → **L3** Execute within guardrails → **L4** Managed autonomy (earned only)

## Methodology (reference)

Observe → Transcribe → Extract → Structure → Agentise → Test → Shadow → Controlled Pilot → Measure → Expand responsibility

---

## Where to go next

| Need | Open |
|---|---|
| Sourced market claims | `09_RESEARCH/01_RESEARCH_LEDGER.md` |
| Competitive positioning | `09_RESEARCH/02_COMPETITOR_LANDSCAPE.md` |
| Buyer / JTBD detail | `09_RESEARCH/03_CUSTOMER_AND_PROBLEM.md` |
| Brand & visual system | `11_BRAND/01_BRAND_SYSTEM.md` · `11_BRAND/02_VISUAL_TOKENS.css` |
| Master constraints | `00_READ_ME/00_REFINED_MASTER_PROMPT.md` |

---

*Evidence Room — Operating Evidence for Accounts Payable agents.*
