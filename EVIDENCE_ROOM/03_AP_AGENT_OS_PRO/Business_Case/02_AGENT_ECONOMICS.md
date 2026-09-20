# Evidence Room — AP Agent OS Professional

## Business Case — 02 Agent Economics

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Business Case  
**Standard:** Proof before permission  
**Audience:** AP Manager, Finance Systems, Controller, Head of AP  
**ERP stance:** Agnostic.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Unit economics for agents. Complements I-11 / I-13 in `00_BUSINESS_CASE_MODEL.md`. Not a pricing quote. Not a promise that agents are cheaper.

---

### Purpose

Decide, per agent and per case, whether the **cost envelope** (inference + tools + human review/exception minutes) is acceptable for the outcome you actually want: a **correct** packet, not a cheap wrong one.

Dictionary companions: KPI-FIN-AIC, KPI-FIN-CCO, KPI-FIN-HHR, cost_envelope on the stack packet.

---

## 1. What to do

For each in-scope agent, write a cost envelope and a review-labour budget. Track actuals weekly. Stop a case that blows the envelope (Orchestrator). Do not fund “retry until it works.”

**How.** Envelope formula §3. Decision table §5.

**Who.**

| Duty | A | R |
|---|---|---|
| Envelope policy | Head of AP | AP Manager |
| Inference ledger | FinSys | FinSys |
| Review-minute capture | AP Manager | Processors (log) / timestamps |
| Accepting CCO as “good enough” | Controller (if used in Steer) | AP Manager |

**What can go wrong.** Token cost only. Review treated as free. 40 re-prompts on a hard invoice.

**Control.** Envelope on every packet. Orchestrator stop. Approved-tool list.

**Measure.** AIC vs budget; CCO; envelope breaches; minutes/case.

**Evidence.** Ledger + weekly report lines.

---

## 2. How — cost objects

| Object | Include | Exclude |
|---|---|---|
| **Inference** | Tokens, pages, OCR clicks, reranks attributable to the case | Dev/experiment spend (project) |
| **Tool** | Connector, store, vendor API for that case | ERP licence already in CPI allocation (don’t double-count unless you choose a full-absorption view and say so) |
| **Human review** | Minutes to read, accept, reject, correct | General team meetings not about the case |
| **Human exception** | Minutes to resolve the remaining exception | Work the agent did not touch |
| **Governance** | Sampling QA minutes allocated | Internal Audit programme (optional Out) |
| **Incident** | Containment labour | Do not bury in “ops” |

```
case_cost = inference + tool + (review_min + exception_min + qa_min) × hourly_loaded
KPI-FIN-CCO (period) = sum(case_cost for scored items) / correct_outcomes
```

If you lack a loaded hourly rate, report **minutes** and inference **currency** as two lines.

---

## 3. How — envelope (per case)

Set on the charter:

| Gate | Conservative starting point (buyer replaces) | Hard stop |
|---|---|---|
| Max inference / case | `[BUYER]` | Orchestrator parks case |
| Max human review minutes before manager | `[BUYER]` | Escalate; do not keep prompting |
| Max retries | 0 on writes; `[BUYER]` on reads | Fail closed |
| Forbidden: widen envelope in the prompt | — | Control incident |

**Who.** AP Manager proposes; Control owner reviews for perverse incentives (too tight → people bypass).  
**What can go wrong.** Envelope so tight the agent returns empty packets that look “cheap.”  
**Control.** Pair envelope with schema-fail rate.  
**Measure.** Breach count; empty-packet rate.  
**Evidence.** Charter + Orchestrator logs.

---

## 4. How — when an agent is economically **not** worth promoting

Promotion is an evidence decision (`01_AUTONOMY_POLICY.md`). Economics can **veto** a promotion that is technically accurate but absurdly expensive.

Hold or redesign when any of these are true (buyer may tighten):

1. CCO (inference + review) **exceeds** the current human-only minute cost for the **same** correct outcome, **and** there is no control reason to keep the agent (e.g. duplicate last-look).  
2. Review minutes **exceed** baseline handling minutes (the agent added work).  
3. Envelope breaches are common (the work is not modellable at this autonomy).  
4. High-risk FNR requires so much sampling that economics collapse — still **do not** cut sampling to save money.

A control-only agent (Duplicate last-look before payment) may run at a **net cost** and still be justified. Write that justification in the charter. Do not hide it in “efficiency.”

**Who.** Head of AP decides; Controller if the Steer pack claims cheaper CPI.  
**What can go wrong.** Turning off Agent 10 to save tokens.  
**Control.** Risk-control family vetoes cost-only decisions.  
**Measure.** Agents running with an explicit “control cost” flag.  
**Evidence.** Charter economics section.

---

## 5. How — decision table (per agent, per quarter)

| Situation | Action |
|---|---|
| Accurate, envelope healthy, hours down, quality holds | Eligible for **one** increment (still needs Measure pack) |
| Accurate, expensive, control value clear | Keep; do not claim savings |
| Inaccurate, cheap | Disable or L0; not a bargain |
| Accurate on easy mix, expensive on exceptions | Narrow scope; don’t average |
| Review minutes disappearing from the log | Incident — economics are false |

---

## 6. What can go wrong

| Failure | Control |
|---|---|
| Shadow SaaS spend | Approved-tool list (Governance §24) |
| Training-data / extra vendor features on by default | Vendor file |
| Batching that hides per-case cost | Require case_id on ledger lines |
| Double-count ERP allocation + tool | CPI component notes |
| Monetising HHR without mechanism | Business case §4.3 |

---

## 7. ACME Manufacturing — ILLUSTRATIVE envelopes

Fictional ACME, **ILLUSTRATIVE** — not recommended targets.

| Agent | Max inference / case | Max review min | Note |
|---|---|---|---|
| 01 Intake | 0.08 currency | 2 | Exceed → EX-QLT-002 human |
| 03 Matching | ~0 (deterministic) | 1 | Model explanation optional, not in the compare path |
| 04 Triage | 0.05 | 4 | |
| 10 Duplicate | 0.06 | 3 | May be net cost; keep |
| 08 Supplier draft | 0.04 | 5 | L2; human send |
| 12 Payment review | 0.03 | 8 | Human release; do not “save” the 8 minutes |

---

## 8. Evidence checklist

- [ ] Envelope on each live charter  
- [ ] Ledger maps to case_id  
- [ ] Review minutes captured  
- [ ] CCO or minutes+currency on weekly pack  
- [ ] Control-cost agents flagged  
- [ ] No ROI language in the economics sheet  

Proof before permission.

---

*End of 02_AGENT_ECONOMICS.md*
