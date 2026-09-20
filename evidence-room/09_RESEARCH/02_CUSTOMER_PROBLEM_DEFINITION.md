# Customer Problem Definition — Evidence Room / AP Agent OS

## Who hurts

| Persona | Title examples | Job to be done | Failure mode without Evidence Room |
|---|---|---|---|
| **Economic buyer** | CFO, VP Finance, Controller | Reduce AP cost/risk without creating audit findings | Buys AI; cannot prove control or outcome |
| **Process owner** | AP Manager, Procure-to-Pay lead | Clear exceptions, hit cycle-time and STP targets | Agents create opaque exception queues |
| **Risk / audit** | Internal Audit, SOX / IC lead | Traceable decisions, SoD intact | Cannot answer “who approved what the bot did?” |
| **Systems owner** | Finance Systems, IT | Integrate tools without shadow AI | Prompt packs and copilots bypass change control |
| **Champion** | Transformation / FP&A ops | Ship a credible AI pilot | Pilot dies at governance review |

**Primary beachhead:** Mid-market to enterprise finance orgs with **existing** AP tooling (ERP and/or AP suite) that are piloting AI/agents and hitting a **responsibility wall**.

---

## Problem statement (one paragraph)

Accounts payable teams are under pressure to adopt AI agents for capture, coding, matching, vendor queries, and payment prep — but **ownership, controls, and measurement did not ship with the prompts**. Suites automate *their* workflow; RPA runs *tasks*; copilots draft *text*. None of these give the Controller a purchasable operating system for **who is responsible**, **which controls apply**, and **which KPIs prove the agent helped** — so pilots stall, get limited to low-risk toys, or run as ungoverned shadow automation.

---

## Jobs, pains, gains

### Jobs

1. Deploy AP agents without breaking SoD or auditability.
2. Measure agent impact with the same rigor as human AP KPIs (cost/invoice, cycle time, exception rate, STP%).
3. Standardize exception handling when agents fail or escalate.
4. Brief executives with evidence, not vendor ROI slides.
5. Reuse governance when swapping tools (suite ↔ RPA ↔ LLM).

### Pains

| Pain | Symptom | Why current tools fail |
|---|---|---|
| **Responsibility vacuum** | “The bot posted it” / no RACI for agent acts | Suites assume human workflow actors |
| **Control theater** | Policies in SharePoint; agents in ChatGPT | Prompt packs have zero control plane |
| **Unmeasurable pilots** | “Feels faster” with no baseline | No KPI pack or instrumentation plan |
| **Exception thrash** | Agents create new exception types | No taxonomy + routing design |
| **Vendor lock narrative** | “Wait for our AI roadmap” | Execution vendors optimize for retention |
| **Audit fear** | Blocked go-lives | No evidence trail design |

### Gains (desired outcomes — not guarantees)

- Clear human + agent responsibility map before go-live.
- Control catalog mapped to agent failure modes.
- KPI baseline and review cadence agreed with Finance + Audit.
- Portable playbooks usable across Tipalti/Coupa/ERP/UiPath/LLM stack.
- Sales and delivery language that refuses unverified savings/fraud/compliance claims.

---

## Problem decomposition (four gaps)

```
AP Agent OS gaps
├── Governance gap     — policies, escalation, kill switch, change control for agents
├── Responsibility gap — RACI for propose / approve / post / pay with non-human actors
├── Control gap        — SoD, thresholds, dual-control, vendor-master change guards
└── KPI / evidence gap — baseline, instrumentation, review, claim discipline
```

Evidence Room products (Free Readiness → Starter → Pro → Team → Custom) map onto these gaps; they do **not** replace invoice engines.

---

## Current workarounds (and why they fail)

| Workaround | Breaks when… |
|---|---|
| “We’ll use the AP suite’s AI” | Need multi-tool agents or suite AI lacks governance artifacts finance will sign |
| “UiPath/AA Automation Ops is enough” | Horizontal ops ≠ AP responsibility/KPI packs Controllers accept |
| “Internal AI policy PDF” | Policy without operating procedures, controls, and metrics |
| “SI will build a RACI in the SOW” | One-off, not productized, not maintained, not sold as OS |
| “Prompt pack + tribal knowledge” | Staff turnover; audit sample fails; fraud/vendor-change scenarios |

---

## Buying triggers

- Board / CFO mandate to “use AI in finance” with risk language attached.
- Failed or stalled AP AI pilot (accuracy OK, governance not).
- Audit finding or near-miss involving automated posting / vendor change.
- Consolidation after buying both an AP suite *and* RPA.
- Marketplace purchase intent for a lightweight, opinionated pack (Lemon Squeezy / digital product motion).

## Anti-triggers (do not force-fit)

- Buyer wants a cheaper Tipalti/Stampli replacement.
- Buyer wants guaranteed % fraud reduction or ROI.
- Buyer needs only OCR/capture.
- Buyer will not baseline KPIs or name owners.

---

## Success definition (customer)

A successful Evidence Room engagement means:

1. Named owners for each agent-touching AP step.
2. Documented controls for top agent failure modes.
3. KPI baseline captured **before** expansion of agent scope.
4. Evidence pack that maps external claims to the Research Ledger (or marks them as framework).
5. Explicit non-claims: no guaranteed savings, fraud prevention, compliance certification, or ROI.

---

## Problem → product traceability

| Problem gap | Product surface (folder) |
|---|---|
| Readiness / “are we ready?” | `01_FREE_AP_AI_READINESS` |
| Lightweight operating pack | `02_AP_AGENT_STARTER` |
| Full OS: agents, controls, KPI, governance | `03_AP_AGENT_OS_PRO` |
| Org rollout / change / training | `04_AP_AGENT_OS_TEAM` |
| Bespoke design | `05_CUSTOM_BLUEPRINT` |

---

## Voice of customer (hypotheses to validate — not evidence)

Use these as interview prompts; do not publish as stats:

- “We can’t tell audit what the agent is allowed to do.”
- “Our pilot improved coding suggestions but exceptions got weirder.”
- “Procurement bought automation; nobody bought accountability.”
- “Every vendor shows a ROI calculator; none survive diligence.”

Promote to Claim IDs only after primary interviews or third-party sources are logged in `00_RESEARCH_LEDGER.md`.
