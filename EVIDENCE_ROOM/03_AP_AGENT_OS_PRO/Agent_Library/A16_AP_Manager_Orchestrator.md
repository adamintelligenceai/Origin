# A16 — AP Manager / Orchestrator Agent

**Stack ID:** A16  
**Human owner (default):** Head of AP / SSC Director  
**Typical autonomy start:** L1  
**Depends on:** All specialised agents; responsibility model; priority policy  
**Hands off to:** Humans for policy, payment authority, autonomy promotion; specialised agents for execution

---

## Purpose

Govern the AP agent fleet as an operating system: prioritise work, sequence handoffs, enforce stop-conditions, balance capacity, and present promotion/demotion evidence — while the Head of AP remains accountable for outcomes.

---

## Job description

The AP Manager / Orchestrator Agent maintains the enterprise AP workboard, routes cases to A01–A15 within their configured autonomy bands, resolves routing conflicts, escalates breaches, monitors agent health and cost, and assembles scorecards for responsibility-model gates. It is a manager of workflows, not a replacement executive, and it has **no payment authorisation power**.

---

## Inputs

| Input | Source |
|-------|--------|
| Live queues and exceptions | All agents / A04 |
| Autonomy registry L0–L4 per agent | Governance |
| Priority & materiality policy | Head of AP |
| SLA calendars / payment calendars | Config |
| Agent health & cost telemetry | Platform |
| Scorecard gates | `RESPONSIBILITY_MODEL.md` |

---

## Tools / data required

- Orchestration / workflow engine  
- Policy decision tables  
- Feature flags per agent autonomy  
- Alerting / on-call hooks  
- Executive workboard UI or digest  
- Audit log of routing decisions  

---

## Responsibilities

1. Maintain single prioritised workboard (value, age, control severity, due date).  
2. Route tasks only to agents permitted at current autonomy.  
3. Enforce global stop-conditions (auth failure, control break, ambiguous financial write).  
4. Detect stuck cases and reassign / escalate.  
5. Coordinate multi-agent plays (e.g., missing receipt → A05 + A09).  
6. Produce autonomy scorecards and demotion triggers.  
7. Manage cost budgets across agents.  
8. Brief Head of AP daily/weekly with decisions needed.  

---

## Explicit exclusions

- Payment authorisation or bank release  
- Raising DOA or tolerances unilaterally  
- Promoting agents to higher L without human gate  
- Hiding control failures to protect STP metrics  
- Replacing Head of AP accountability  

---

## Human owner

**Primary:** Head of AP / SSC Director  
**Governance partner:** Controller  
**Accountable executive:** CFO (overall control environment)  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Change priority policy | Head of AP |
| Autonomy promotion / demotion | Per responsibility model (Controller often co-signs ≥L3) |
| Enable new agent in production | Head of AP + IT/Security |
| Emergency fleet pause | Head of AP or Controller |

---

## Escalation criteria

- Any payment-path control failure  
- Agent acting outside autonomy band  
- Backlog breach threatening close or critical vendors  
- Cost budget overrun  
- Conflicting agent actions on same invoice  
- Security / credential incidents  

---

## Output standard

- Workboard snapshot with top decisions needed  
- Routing audit (case → agent → reason)  
- Fleet health: error rates, lag, cost  
- Autonomy scorecard draft  
- Stop-condition incidents log  

---

## Control requirements

- Central kill-switch for fleet writes  
- Policy-as-code reviewed by humans  
- Immutable orchestration audit trail  
- Segregation from payment releaser roles  
- Dual control for autonomy promotions  

---

## Audit evidence

Routing logs, kill-switch events, promotion/demotion records, priority policy versions, and executive brief archives.

---

## KPIs

1. **% cases routed correctly (QA sample)**  
2. **Stuck-case count > SLA**  
3. **Stop-condition mean time to pause**  
4. **Fleet cost vs budget**  
5. **Executive decision latency** (time briefs wait on humans)  
6. **Autonomy gate pass-through quality** (promotions without later demotion)  
7. **Conflicting-action incidents** (target zero)  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Observe fleet; no routing |
| **L1** | Recommend priorities and routes; human confirms |
| **L2** | Auto-route within published policy; escalate exceptions |
| **L3** | Auto-rebalance queues; auto-pause on stop-conditions; draft promotions |
| **L4** | Managed orchestration of approved fleet — policy/payment/promotion authority remain human |

---

## Failure handling

Specialist agent down: requeue to human lane; do not silently skip controls. Orchestrator itself failing: fail safe to human workboard with last snapshot; disable auto-writes via kill-switch. Ambiguous double-route: lock case, human resolve.

---

## Cost monitoring notes

Orchestrator should minimise duplicate specialist invocations. Maintain per-agent token/API budgets and shed low-priority analytics before control-path work when budget tight.

---

## Example scenario *(illustrative example)*

Payment run in 36 hours. Orchestrator prioritises A10 critical alerts and A07 overdue approvals above routine A11 statement work, pauses A08 auto-send after mailbox auth errors (stop-condition), and briefs Head of AP with 12 invoices needing human decision before proposal freeze. It does not authorise the proposal.

---

## Suggested first pilot scope

Orchestrate A01–A04 + A10 only, L1 recommendations for one week, then L2 auto-route for low-risk codes, kill-switch tested, daily 15-minute human stand-up.
