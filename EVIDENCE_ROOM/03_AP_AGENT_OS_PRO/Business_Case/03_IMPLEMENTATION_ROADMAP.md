# Evidence Room — AP Agent OS Professional

## Business Case — 03 Implementation Roadmap

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Business Case  
**Standard:** Proof before permission  
**Audience:** Transformation lead, Head of AP, Controller, Finance Systems, Control owner  
**ERP stance:** Agnostic. Phases do not assume a vendor implementation methodology.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Programme sequence. Timeboxes are planning ranges, not commitments. A 4–6 week path applies to **one well-bounded agent** only, with the caveats in §4.

---

### Purpose

Give the programme a single spine: **Phase 0–10**. This is the ten-step method (`../Process_Mapping/00_METHODOLOGY.md`) plus an explicit mobilise phase and an operate/expand phase.

Do not start Phase 6 Test because a vendor booked consultants for next Monday.

---

## 1. What to do

Run phases in order. Each phase has an exit pack. The next phase is unauthorised without it.

**How.** Tables below. Detailed instruments live in Process Mapping, Governance, Testing, KPI, Templates.

**Who.** Head of AP / Controller Accountable for the programme. Transformation lead Responsible for the plan. AP Manager Responsible from Phase 6 onward for daily evidence. Agents never Accountable.

**What can go wrong.** Parallel “we’ll structure later.” Combining autonomy + scope + value in one release.

**Control.** Gate table §3. Change classes C2/C3.

**Measure.** Phases with missing exit packs; calendar slip vs gate slip (gate slip is correct if evidence is missing).

**Evidence.** `[BUYER]/Evidence/Roadmap/` plus per-step folders.

---

## 2. How — Phase 0–10

```
0 Mobilise → 1 Observe → 2 Transcribe/Extract → 3 Structure
 → 4 Agentise → 5 Environment → 6 Test → 7 Shadow
 → 8 UAT + Controlled Pilot → 9 Measure → 10 Expand / Operate
```

Phase 8 includes UAT (people) and Pilot (narrow action). UAT may start at the end of Phase 6 if Historical is Go; Pilot cannot start before Phase 7 exit.

### Phase 0 — Mobilise and preconditions

**What.** Name Accountables, deputies, first slice, privacy/vendor constraints, Evidence Room store, decision rights.

**How.** Kick-off using Team Edition playbook if a workshop is booked. Complete `[BUYER]` on governance header. Approved-tool list started.

**Who.** CFO/FD (sponsor), Head of AP (A), Transformation (R), Control, FinSys, Privacy.

**Wrong.** Sponsor is “Innovation.” No AP owner.

**Control.** Incumbency list signed. First slice written as allow-list.

**Measure.** Roles named / still blank.

**Evidence.** Mobilise pack; RACI draft.

**ILLUSTRATIVE duration:** 3–8 working days (calendar longer if privacy review queues).

### Phase 1 — Observe

**What.** As-done operation.  
**How.** `../Process_Mapping/01_PROCESS_DISCOVERY_GUIDE.md` and `../Templates/PROCESS_DISCOVERY.md`.  
**Who.** Transformation + AP process owner + operators.  
**Wrong.** Happy path only; UAT tenant.  
**Control.** Coverage sign-off.  
**Measure.** Invoices observed; workarounds noted.  
**Evidence.** `/Observe/`.  
**ILLUSTRATIVE:** 3–5 days one entity / one team.

### Phase 2 — Transcribe and extract

**What.** Durable record + object register.  
**How.** `02_TRANSCRIPT_TO_WORKFLOW.md`.  
**Who.** Scribe; session owner AP Manager; Privacy on redaction.  
**Wrong.** Polished SOP too early.  
**Control.** Unquoted objects rejected.  
**Measure.** Objects with source quotes.  
**Evidence.** `/Transcribe/`, `/Extract/`.  
**ILLUSTRATIVE:** 1–2 days per session plus review.

### Phase 3 — Structure

**What.** Map, trees, exception map, control map, RACI, current-state SOP.  
**How.** SOP framework + `../Templates/SOP_TEMPLATE.md`, `RACI.md`.  
**Who.** Process owner accepts SOP; Controller on RACI A’s.  
**Wrong.** Target-state disguised as current; agent as Accountable.  
**Control.** Pack checklist.  
**Measure.** Unmapped exceptions; RACI conflicts.  
**Evidence.** `/Structure/`.  
**ILLUSTRATIVE:** 5–8 days one end-to-end path.

### Phase 4 — Agentise

**What.** Charter(s) at L0/L1; human/deterministic/model split.  
**How.** `19_AGENT_CHARTER_STANDARD.md`, `../Templates/AGENT_CHARTER.md`, Autonomy policy.  
**Who.** AP Manager proposes; Control + SoD challenge; Head of AP approves.  
**Wrong.** L3 “for the pilot.” LLM on exact price compare.  
**Control.** Charter gate (no payment execute, exclusions non-blank).  
**Measure.** L2+ proposals (should be zero without prior evidence).  
**Evidence.** `/Agentise/`.  
**ILLUSTRATIVE:** 3–5 days per agent after Structure.

### Phase 5 — Environment, identity, evidence store

**What.** Non-executing identities, store, logging, model pin, cost ledger hook.  
**How.** Governance §§3, 11, 12, 21. Least privilege.  
**Who.** FinSys R; Control approves access; Privacy on inventory.  
**Wrong.** Production write for demo. Shared human credentials.  
**Control.** Access extract.  
**Measure.** Write verbs on test identities (0).  
**Evidence.** Identity sheets.  
**ILLUSTRATIVE:** 3–10 days depending on IdP/ERP queue — **this is the usual critical path.**

### Phase 6 — Historical test

**What.** Labelled pack, score, go/no-go.  
**How.** `../Testing/00_TESTING_STANDARD.md`, `01_HISTORICAL_TEST_SCRIPTS.md`.  
**Who.** Labellers before output; Control on gates.  
**Wrong.** Vendor demo set only.  
**Control.** Labels-first attestation.  
**Measure.** Coverage; FNR high-risk.  
**Evidence.** `/Test/`.  
**ILLUSTRATIVE:** 5–10 days including labelling.

### Phase 7 — Shadow

**What.** Live compare, no action.  
**How.** `../Testing/03_SHADOW_MODE.md`.  
**Who.** AP Manager daily.  
**Wrong.** Silent send.  
**Control.** Mid-point access review.  
**Measure.** Agreement; review minutes.  
**Evidence.** `/Shadow/`.  
**ILLUSTRATIVE:** one AP cycle, often 2–4 weeks.

### Phase 8 — UAT and Controlled Pilot

**What.** People operability, then named verbs only.  
**How.** `02_UAT_TEMPLATES.md`, `04_PILOT_METHODOLOGY.md`. UAT may be a single day if the agent is narrow.  
**Who.** Head of AP A for Pilot; Treasury I if payment-adjacent.  
**Wrong.** Mid-pilot expand.  
**Control.** Allow-list enforced; rollback drill.  
**Measure.** Override; incidents; mix.  
**Evidence.** `/UAT/`, `/Pilot/`.  
**ILLUSTRATIVE:** UAT 1–3 days; Pilot 4–8 weeks.

### Phase 9 — Measure

**What.** Four families; promote / hold / roll back.  
**How.** KPI framework + dictionary.  
**Who.** Controller on any cash.  
**Wrong.** Vendor dashboard as source.  
**Control.** Dictionary IDs; `validated_by`.  
**Measure.** Unsigned financials = 0.  
**Evidence.** `/Measure/`.  
**ILLUSTRATIVE:** 5 working days after window + Finance validation time.

### Phase 10 — Expand responsibility / operate

**What.** One increment or a steady operating cadence (weekly report, quarterly certs).  
**How.** Methodology Step 10; Governance operating cycle.  
**Who.** Change record; CFO/FD if L3+ or payment-adjacent.  
**Wrong.** “The stack is L4.”  
**Control.** One-increment rule; hash match.  
**Measure.** Autonomy/scope delta; incidents since last change.  
**Evidence.** `/Expand/`.  
**ILLUSTRATIVE:** decision in 10 working days after a complete Measure pack; implementation is a separate window.

---

## 3. Gate table

| From → to | Cannot start until |
|---|---|
| 0 → 1 | Sponsor + AP Accountable named; first slice written |
| 1 → 2 | Observation coverage signed; consent if recorded |
| 2 → 3 | Transcript accepted; object register dual-reviewed |
| 3 → 4 | Current-state pack signed |
| 4 → 5 | Charter signed |
| 5 → 6 | Non-executing identity + store live |
| 6 → 7 | Historical Go; access review |
| 7 → 8 Pilot | Shadow recommendation; UAT Go; rollback tested |
| 8 → 9 | Pilot window closed or mid-point if pre-agreed |
| 9 → 10 | Signed Measure pack |

---

## 4. Four-to-six week path — ONE well-bounded agent

This is **ILLUSTRATIVE** scheduling for a single agent that is already almost “structure-ready.” It is **not** a programme promise and **not** a path for the 16-agent stack.

### What “well-bounded” means (all must be true)

- One legal entity, one channel, one invoice type (e.g. domestic PO email PDF).  
- One agent whose writes, if any, are **drafts only** (typical: Intake L0–L1, Validation L1, Duplicate L1, or GR **draft chaser** L2).  
- Process owner available daily.  
- Historical artefacts exportable without a six-week IT project.  
- Privacy has already approved the tool.  
- No payment release, no bank write, no new ERP posting verb.  
- Exception taxonomy mapping is mostly obvious (or you accept UNMAPPED + Q-rows).

If any bullet is false, **do not use this calendar**. Use Phase 0–10 full ranges.

### Illustrative calendar (6 weeks)

| Week | Phases | Output |
|---|---|---|
| 0 (pre-week) | Phase 0 started | Names, slice, tool approval **already done** |
| 1 | 1 Observe + 2 start | Observation log; first transcripts |
| 2 | 2 finish + 3 Structure | Current-state SOP draft; RACI; charter draft |
| 3 | 4 Agentise + 5 Environment | Signed L0/L1 charter; `agt.*.test` live |
| 4 | 6 Historical test | Pack + Go/Hold |
| 5 | 7 Shadow start + UAT day | Daily shadow log; UAT exit |
| 6 | 7 Shadow continue | Exit recommendation — **Pilot is not automatic in week 6** |

A 4-week compression drops Shadow coverage. That is a **quality cut**, not efficiency. Record it as residual risk.

### Dependency caveats (explicit)

1. **IdP / ERP role request** longer than 5 days → Phase 5 slips; Weeks 4–6 slip with it.  
2. **No export of historical PDFs** → labelling cannot start; do not score on ten emails in someone’s inbox.  
3. **Labellers unavailable at month-end** → do not steal close week; move Test.  
4. **Model vendor not on approved list** → stop; do not use a personal chatbot.  
5. **Policy gap on tolerance** (`[POLICY GAP — DO NOT OPERATE A NUMBER]`) → Matching Agent cannot be the “well-bounded” agent.  
6. **Works council / recording consent** delayed → Transcribe uses structured notes; allow extra days.  
7. **Shared-service multi-entity** → this calendar is invalid.  
8. **Desire to “go live sending mail” in week 6** → refuse. Shadow exit is the earliest Pilot conversation.  
9. **Parallel ERP upgrade / close** → freeze the window.  
10. **Second agent “while we’re here”** → new roadmap. One increment.

**Who.** Transformation states which caveats apply on day one.  
**Wrong.** Selling “AP agents in 30 days” using this section.  
**Control.** Caveat checklist initialled.  
**Measure.** Caveats triggered (count).  
**Evidence.** Plan version + caveat log.

---

## 5. Multi-agent programme (do not flatten into 6 weeks)

After one agent has a Measure pack:

1. Promote **01 and 10** before matching execute.  
2. Add 02/03/04 as a **qualification** slice.  
3. Leave 12 at L1/L2.  
4. 08/09 outbound only after draft QA.  
5. 13–15 after operating metrics exist.

Each new agent repeats 4→9 sized to the increment. Phase 0 is not repeated in full; recertify owners.

---

## 6. What can go wrong

| Failure | Control |
|---|---|
| Date-driven Phase 8 | Gate table |
| Environment as afterthought | Phase 5 before Test |
| Stack-wide L3 | Autonomy policy |
| Roadmap used as a contract penalty schedule | This file is not a commercial SLA |

---

## 7. Evidence checklist

- [ ] Phase register with exit pack IDs  
- [ ] First-slice allow-list  
- [ ] Caveat log if using §4  
- [ ] Change records from Phase 6 onward  
- [ ] No guaranteed-date language in Steer materials  

Proof before permission.

---

*End of 03_IMPLEMENTATION_ROADMAP.md*
