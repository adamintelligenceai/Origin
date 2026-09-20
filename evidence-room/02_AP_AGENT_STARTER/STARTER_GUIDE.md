# AP Agent Starter Guide

**Product:** Evidence Room — AP Agent Starter  
**Price:** $79 USD  
**Version:** 1.0.0 · **Date:** 2026-03-20  
**Positioning:** Design one governed AI agent for a single Accounts Payable use case — with evidence, exceptions, KPIs, and promotion rules — before you expand scope.  
**Tagline:** AI that earns responsibility.

This guide is intentionally dense. Complete it once for **one** agent. Do not skip the seven product questions. Do not expand autonomy and scope in the same change window.

---

## Contents

1. Operating model overview (summary)  
2. Exception taxonomy summary  
3. Readiness diagnostic pointer  
4. Human-vs-agent framework  
5. Process-mapping template  
6. Agent job description (JD) template  
7. Agent instruction template  
8. KPI scorecard (Starter)  
9. Governance checklist  
10. Transformation roadmap (90-day sketch)  
11. Implementation checklist  
12. Licence and disclaimers  

Companion deep-dive: `OPERATING_MODEL_OVERVIEW.md` in this folder.  
Free prerequisite: `01_FREE_AP_AI_READINESS/AP_AI_READINESS_DIAGNOSTIC.md`.

---

## 1. Operating model overview (summary)

Evidence Room treats AI agents as **workforce roles with earned authority**, not as magic automation toggles.

| Layer | What it is | Starter obligation |
|---|---|---|
| **Systems of process** | Your ERP / AP automation / payment platforms | Remain owners of workflow and payment |
| **Agent layer** | Scoped roles with evidence and stop conditions | Design **one** agent thoroughly |
| **Human control plane** | Exception ownership, approvals, promotion decisions | Name owners before pilot |
| **Evidence plane** | Artefacts, logs, KPI definitions | Required for every run class |
| **Governance plane** | Charter lite, change control, audit trail | Checklist in §9 |

**Non-goals for Starter:** multi-agent orchestration, silent payment release, master-data writes, replacing Tipalti/Coupa/Basware/Stampli/Medius/HighRadius/Esker/AvidXchange/BILL/Ramp/SAP/Oracle/Microsoft Dynamics.

Industry climate (context only — Ardent Partners 2025): peer cost/invoice **$9.84**, BIC **$2.65**, exception **18.4%**, STP **35.4%**, AI adoption **44%**. Your pilot uses **your** baselines.

Full narrative: `OPERATING_MODEL_OVERVIEW.md`.

---

## 2. Exception taxonomy summary

Exceptions are not UI noise. They are the work design.

### Starter taxonomy (adapt names; keep structure)

| Code | Class | Typical cause | Default owner | Agent allowed action | KPI treatment |
|---|---|---|---|---|---|
| EX-DATA | Incomplete / invalid data | Capture or supplier packet | AP Analyst | Flag + request fields | Count; track reopen |
| EX-MATCH | Price / qty / PO mismatch | Tolerance, bad PO, partial GR | AP Analyst / Buyer | Classify; propose options | Count by subtype |
| EX-POL | Policy / SoD conflict | Wrong approver, limit breach | Controller / Approver | **Stop**; escalate | Critical count |
| EX-DUP | Possible duplicate | Same invoice signals | AP Analyst | Flag only | Confirm rate |
| EX-MDM | Master data defect | Vendor bank/tax/address | Master Data owner | **Never** self-fix | Route out |
| EX-AMB | Ambiguous / conflicting evidence | Two systems disagree | Human adjudicator | Stop; present both | Time-to-resolve |
| EX-SYS | System / integration failure | API or export gap | IT + AP Ops | Retry policy only | Availability |

**Rule:** Every exception in the pilot must map to a code. “Other” above 10% of exceptions means the taxonomy is incomplete — revise before promoting the agent.

---

## 3. Readiness diagnostic pointer

If you have not scored readiness, complete the Free diagnostic first:

`../01_FREE_AP_AI_READINESS/AP_AI_READINESS_DIAGNOSTIC.md`

**Starter gate:** Overall maturity ≥ Level 3 **and** Controls, Governance, and Data each ≥ 3.0.  
If below gate: remediate; do not purchase more autonomy — purchase more clarity.

Carry forward into this guide:

- Overall score and level  
- Lowest dimension  
- One heatmap quadrant activity (High clarity / Low–medium risk preferred)  
- Baseline KPI worksheet values  

---

## 4. Human-vs-agent framework

### Decision test

For each task step ask:

1. Is the evidence complete and machine-retrievable?  
2. Is the decision reversible or low-value?  
3. Is a wrong action detectable within the control window?  
4. Does policy require a human identity?

If any answer is no → **human owns**; agent may assist (draft, assemble, flag).

### Authority bands (Starter default)

| Band | Agent may | Agent must not |
|---|---|---|
| **Observe** | Read, summarise, cite SoR | Write anything |
| **Assist** | Draft, classify, assemble packets | Approve, post, pay |
| **Act-with-evidence** | Write to a **sandbox or queue** with full trail | Bypass stop conditions |
| **Act-in-production** | Out of Starter scope unless charter explicitly grants a narrow write after KPI hold | Expand silently |

Starter pilots should remain in **Observe / Assist**, optionally **Act-with-evidence** into a human review queue.

### Seven product questions (mandatory)

Answer all seven before writing the JD:

1. What work is permitted?  
2. What evidence is required?  
3. Who owns exceptions, and how are they classified?  
4. Which KPIs prove earned responsibility?  
5. What are promotion and demotion rules?  
6. What happens on failure, ambiguity, or policy conflict?  
7. How is the trail auditable six months later?

---

## 5. Process-mapping template

### 5.1 Scope card

| Field | Entry |
|---|---|
| Use case name | |
| Document types in scope | |
| Document types out of scope | |
| Entities / ledgers | |
| Systems touched (read) | |
| Systems touched (write — if any) | |
| Value band (min–max) | |
| Volume / month (est.) | |
| Human owner | |
| Audit observer (optional) | |

### 5.2 Stage map (fill)

| Stage | Trigger | Human action today | Proposed agent action | Evidence required | Exception codes | Stop condition |
|---|---|---|---|---|---|---|
| Intake | | | | | | |
| Validate | | | | | | |
| Match / link | | | | | | |
| Exception | | | | | | |
| Approve packet | | | | | | |
| Handoff | | | | | | |

### 5.3 Swimlane sketch (text)

```
Supplier / Portal → [Capture system] → Agent lane: ________
                                      → Human lane: ________
                                      → Control lane: ________
→ Queue / ERP status → Measurement (KPI sheet)
```

---

## 6. Agent job description (JD) template

**Agent ID:** AG-AP-___  
**Title:**  
**Version:** 0.1  
**Status:** Draft / Supervised pilot / Frozen  

### Mission
One sentence: what outcome the agent is employed to improve (process quality), not a savings claim.

### Permitted work
Bullet list of allowed actions.

### Prohibited work
Must include at least: silent payment release; inventing approvals; master-data writes; ignoring stop conditions.

### Inputs
Systems, fields, artefacts, identity context.

### Outputs
Queues, drafts, flags, structured logs — with schema notes.

### Evidence standard
Minimum packet for a “complete” run.

### Exception ownership
Map to taxonomy codes + named human routes.

### KPI accountability
Link to scorecard metrics in §8.

### Promotion / demotion
Reference §9 checklist thresholds.

### Failure modes
Ambiguity, conflict, timeout, low confidence — prescribed stops.

### Audit trail
What is logged, where retained, who can retrieve, retention period.

### RACI (lite)

| Activity | Agent | AP Analyst | Approver | Controller | IT |
|---|---|---|---|---|---|
| Classify | R | A | C | I | C |
| Resolve EX-* | C | R/A | C | I | C |
| Promote agent | I | C | C | A | C |

---

## 7. Agent instruction template

Use this as the controlled prompt / policy text. Version it. Change-control every edit.

```text
ROLE
You are [Agent Title], an Accounts Payable assistive agent operating under Evidence Room controls.
You do not replace the ERP/AP platform. You do not execute payments.

MISSION
[One sentence]

PERMITTED ACTIONS
- ...

PROHIBITED ACTIONS
- Silent payment release or payment instruction finalisation
- Approving invoices or impersonating approvers
- Creating or editing vendor master / bank details
- Inventing missing facts; if unknown, say unknown and stop
- Expanding scope beyond this instruction set

EVIDENCE REQUIRED BEFORE ANY RECOMMENDATION
- ...

EXCEPTION CODES
Use only: EX-DATA | EX-MATCH | EX-POL | EX-DUP | EX-MDM | EX-AMB | EX-SYS
For each exception: code, evidence cited, recommended human owner, urgency.

STOP CONDITIONS
Stop and escalate when: policy conflict; missing required evidence; conflicting systems of record;
value above [threshold]; confidence below [rule]; any EX-POL or EX-MDM.

OUTPUT FORMAT
1) Summary (≤5 lines)
2) Evidence list with system citations
3) Proposed next human action
4) Exception codes (if any)
5) Log fields: agent_id, run_id, timestamp, doc_id, decision, evidence_refs

AUDIT
Assume every output will be reviewed six months later. Prefer cite-and-stop over guess-and-continue.
```

**Change control:** Instruction version · Author · Reviewer · Date · Diff summary · Rollback pointer.

---

## 8. KPI scorecard (Starter)

Define formulas before the pilot. Industry figures are optional context columns only.

| Metric | Formula | Baseline | Pilot target (directional) | Actual | Owner | Review cadence |
|---|---|---|---|---|---|---|
| Assisted volume | Count of in-scope docs touched | | | | | Weekly |
| Exception rate (in scope) | Exceptions ÷ docs | | | | | Weekly |
| Taxonomy coverage | Coded exceptions ÷ all exceptions | | ≥90% | | | Weekly |
| False flag rate | Human-rejected flags ÷ flags | | | | | Weekly |
| Missed critical | Critical issues found late ÷ opportunities | | Aim ↓ | | | Weekly |
| Cycle contribution | Median hours from intake to ready-for-approve (in scope) | | | | | Biweekly |
| Evidence completeness | Runs with full packet ÷ runs | | ≥95% | | | Weekly |
| Stop-condition hits | Count of hard stops | | Monitor | | | Weekly |
| Human override rate | Overrides ÷ agent recommendations | | | | | Weekly |

**Context only (do not set as guaranteed outcomes):** Ardent 2025 peer exception **18.4%**, STP **35.4%**, cost/invoice **$9.84** vs BIC **$2.65**.

**Promotion hold rule (Starter default suggestion):** No move from Assist → Act-with-evidence until taxonomy coverage ≥90%, evidence completeness ≥95%, and false flag rate is understood and accepted by the Controller for **four consecutive weeks**.

---

## 9. Governance checklist

| # | Item | Done |
|---|---|---|
| 1 | Executive / Controller sponsor named | ☐ |
| 2 | Human exception owner named with backup | ☐ |
| 3 | Seven product questions answered in writing | ☐ |
| 4 | JD + instruction versioned and stored | ☐ |
| 5 | Taxonomy codes agreed with Ops | ☐ |
| 6 | Stop conditions tested with at least three scenarios | ☐ |
| 7 | Audit trail location and retention set | ☐ |
| 8 | SoD: agent cannot approve what it prepares | ☐ |
| 9 | Payment execution explicitly out of scope | ☐ |
| 10 | KPI sheet baselined with **internal** numbers | ☐ |
| 11 | Promotion / demotion rules dated | ☐ |
| 12 | Change control for instructions enabled | ☐ |
| 13 | Internal Audit informed (or scheduled brief) | ☐ |
| 14 | Acceptable-use / data handling noted for AI tools used | ☐ |
| 15 | Pilot end date and review meeting booked | ☐ |

---

## 10. Transformation roadmap (90-day sketch)

| Window | Focus | Exit criteria |
|---|---|---|
| Days 1–14 | Design | JD, instructions, map, KPI baselines complete |
| Days 15–45 | Supervised pilot | Scorecard live; taxonomy ≥90% coverage |
| Days 46–75 | Stabilise | False flags understood; stop conditions proven |
| Days 76–90 | Decide | Promote narrowly, remediate, or pause — documented |

**Upgrade path**

- Need full library, controls pack, testing, business-case artefacts → **Pro ($199)**  
- Need workshop, training, change, executive packs → **Team ($499)**  
- Multi-entity facilitated design → **Custom Blueprint ($1,500–$3,000)**

---

## 11. Implementation checklist

### Before go-live (supervised)

- [ ] Readiness gate passed or waiver signed by Controller  
- [ ] Scope card locked  
- [ ] Process map reviewed with Ops  
- [ ] JD approved  
- [ ] Instructions v1.0 change-controlled  
- [ ] Access: least privilege; no payment entitlements  
- [ ] Logging destination verified  
- [ ] Sample of 20 historical cases dry-run  
- [ ] Failure injection: missing evidence, conflict, EX-POL  
- [ ] Comms to AP team: what changes, what does not  

### During pilot

- [ ] Daily/weekly exception coding hygiene  
- [ ] No silent scope creep  
- [ ] Capture overrides with reason codes  
- [ ] Mid-pilot review with sponsor  

### At decision gate

- [ ] Scorecard complete  
- [ ] Lessons logged  
- [ ] Promotion / demotion / pause decision recorded  
- [ ] If promoting: new instruction version + training note  

---

## 12. Licence and disclaimers

**Licence:** Individual / Professional use per `10_LEGAL_AND_LICENSING/LICENCE_TERMS.md`. No resale or redistribution of the pack as a competing product.

**Disclaimers:** Evidence Room does not guarantee savings, fraud reduction, compliance certification, ROI, or autonomous payment safety. Industry statistics are external context only. You remain responsible for controls, payments, and regulatory obligations. AI systems can err; design for detection and stop conditions.

**Commerce:** Sold via Lemon Squeezy (Merchant of Record). Platform fee context for sellers: **5% + $0.50**, plus possible **+1.5%** international, **+1.5%** PayPal, affiliate **+3%** merchant — see `07_LEMON_SQUEEZY/STOREFRONT_SPEC.md`.

---

*Evidence Room — evidenceroom.ai — Governed agents. Measurable outcomes.*
