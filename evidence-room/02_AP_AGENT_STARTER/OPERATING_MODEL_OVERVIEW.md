# Operating Model Overview — AP Agent Layer

**Product:** Evidence Room — AP Agent Starter companion  
**Version:** 1.0.0 · **Date:** 2026-03-20  
**Audience:** Controller, Head of AP, Shared Services, Internal Audit, IT (influencer)  
**Related:** `STARTER_GUIDE.md` · Free diagnostic · Pro Agent Library

---

## 1. The problem this model solves

Most organisations already own capture, workflow, and payment systems. The unresolved problem is **agent authority**: what an AI agent may do, what evidence it must produce, who owns exceptions, and how responsibility expands without theatre.

Industry climate (Ardent Partners *State of ePayables 2025*, context only): average cost per invoice **$9.84**, Best-in-Class **$2.65**, exception rate **18.4%**, STP **35.4%**, AI adoption **44%**. Headroom exists; an operating model for agents is still rare.

Evidence Room supplies that model. It does not replace your AP suite.

---

## 2. Five planes

```
┌─────────────────────────────────────────────────────────┐
│  Governance plane — charter, promotion, audit, change   │
├─────────────────────────────────────────────────────────┤
│  Evidence plane — artefacts, citations, retention       │
├─────────────────────────────────────────────────────────┤
│  Human control plane — exceptions, approvals, judgement │
├─────────────────────────────────────────────────────────┤
│  Agent layer — scoped roles, instructions, stop rules   │
├─────────────────────────────────────────────────────────┤
│  Systems of process — ERP / AP automation / payments    │
└─────────────────────────────────────────────────────────┘
```

| Plane | Primary question | Failure mode if ignored |
|---|---|---|
| Systems of process | Who owns posting and payment? | Shadow processes; dual SoRs |
| Agent layer | What is permitted? | Scope creep; hallucinated actions |
| Human control | Who owns exceptions? | Inbox chaos; silent errors |
| Evidence | Can we reconstruct decisions? | Audit failure; unverifiable demos |
| Governance | When does responsibility expand? | Autonomy by enthusiasm |

---

## 3. Design principles

1. **Evidence over hype** — No orphan metrics; no guaranteed ROI claims.  
2. **Earn responsibility** — Autonomy follows measured thresholds, not demos.  
3. **Exceptions are work** — Taxonomy and ownership before “AI deflection.”  
4. **Stack honesty** — Agents work across tools you own; they are not a rip-and-replace.  
5. **Stop conditions are features** — Prefer cite-and-stop over guess-and-continue.  
6. **One change at a time** — Do not expand scope and autonomy together.  
7. **Payment caution** — Payment execution remains human- and platform-owned unless a separate, explicit charter says otherwise (out of Starter default).

---

## 4. Responsibility progression

| Stage | Mode | Typical Starter posture |
|---|---|---|
| S0 | Design only | JD + instructions; no production touch |
| S1 | Observe | Read-only summaries with citations |
| S2 | Assist | Drafts, classifications, packet assembly |
| S3 | Act-with-evidence | Writes only to review queues |
| S4 | Narrow production act | Out of default Starter; Pro/Team governance required |
| S5 | Orchestrate | Multi-agent; Team / Custom |

**Promotion:** Requires KPI hold period, taxonomy hygiene, evidence completeness, and sponsor approval.  
**Demotion:** Automatic candidate after critical miss, SoD breach, or unexplained stop bypass.

---

## 5. Where agents sit in the AP lifecycle

| Lifecycle stage | Agent-appropriate work | Explicit non-goals |
|---|---|---|
| Intake | Classify, route, completeness check | Invent missing supplier facts |
| Validate | Policy checks against documented rules | Override policy |
| Match | Exception triage and explanation | Force-match out of tolerance |
| Approve | Assemble evidence packs | Self-approve |
| Supplier inquiry | Draft status replies with SoR cites | Fabricate payment dates |
| Payment prep | Flag anomalies on **proposals** | Release payments |
| Close / report | Draft reconciliations / packs | Sign certifications |
| Improve | Cluster root causes | Change master config alone |

---

## 6. Control objectives (Starter set)

| ID | Objective | Agent implication |
|---|---|---|
| CO-1 | SoD preserved | Agent cannot approve its own preparation |
| CO-2 | Complete evidence | No recommendation without required artefacts |
| CO-3 | Traceability | Run ID, doc ID, evidence refs logged |
| CO-4 | Master data integrity | No vendor bank/tax writes |
| CO-5 | Value banding | Hard stop above configured threshold |
| CO-6 | Change control | Instruction versions reviewed |
| CO-7 | Payment boundary | No silent payment execution |

---

## 7. Measurement philosophy

KPIs exist to **prove earned responsibility**, not to decorate slides.

Minimum Starter set:

- Assisted volume  
- Exception rate (in scope)  
- Taxonomy coverage  
- Evidence completeness  
- False flag rate  
- Human override rate  
- Stop-condition hits  

Optional context columns may cite Ardent 2025 peers (**$9.84** cost, **18.4%** exceptions, **35.4%** STP, BIC **$2.65**) — never as promised customer outcomes.

---

## 8. Roles

| Role | Accountability |
|---|---|
| Sponsor (Controller / CFO delegate) | Approves scope and promotions |
| AP Process Owner | Maintains map, taxonomy, JD |
| Exception Owner | Clears EX-* within SLA |
| Agent Operator | Runs supervised cycles; logs issues |
| IT / IAM | Access, logging destinations |
| Internal Audit | Advises on evidence and SoD; may observe pilots |

---

## 9. Relationship to commercial tiers

| Tier | Operating-model depth |
|---|---|
| Free ($0) | Readiness score; heatmap; baseline worksheet |
| Starter ($79) | One agent; this overview + Starter Guide |
| Pro ($199) | Full library patterns, controls, KPI OS, testing |
| Team ($499) | Workshop, training, change, executive steering |
| Custom ($1,500–$3,000) | Facilitated multi-entity workforce design |

---

## 10. One-page briefing (copy for executives)

**What we are doing:** Designing a governed AI agent layer for Accounts Payable across systems we already own.  
**What we are not doing:** Replacing our AP platform; promising guaranteed savings; enabling autonomous payments.  
**Why now:** Industry AI adoption is material (Ardent 2025: **44%**), while peer exception rates remain elevated (**18.4%**) and STP sits at **35.4%** — the gap is operating discipline, not another demo.  
**Ask:** Approve a supervised pilot for one use case under Starter controls, with a dated promotion gate.

---

*Evidence Room — evidenceroom.ai — Evidence over hype.*
