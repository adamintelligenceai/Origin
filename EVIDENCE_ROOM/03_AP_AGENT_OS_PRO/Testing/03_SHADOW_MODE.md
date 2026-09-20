# Evidence Room — AP Agent OS Professional

## Testing — 03 Shadow Mode

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Testing  
**Standard:** Proof before permission. Responsibility is earned.  
**Audience:** AP Manager, processors, Control owner, Finance Systems, Head of AP  
**ERP stance:** Agnostic. Shadow reads the same objects humans use; it writes only to the Evidence Room.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Binding operating mode. Shadow is **not** a silent production go-live.

---

### Purpose

Run the agent on **live** work with **no action permissions**. Compare agent output to human output in calendar time. Decide whether a listed verb has earned a Controlled Pilot — or whether to Hold / Redesign.

Shadow is Methodology Step 7. It sits after Historical Go and UAT Go (`00_TESTING_STANDARD.md`).

---

## 1. What to do

Stand up `agt.[charter].shadow` on a frozen scope. Humans work **as today**. The agent writes recommendations and packets to the evidence store only. Every working day, reconcile agree / disagree / not-comparable.

**How.** Lock autonomy at L0 or L1 with a technical write-block. No email send, no ERP change, no workflow status change, no “helper” bot in the team chat that people start obeying.

**Who.**

| Role | Duty |
|---|---|
| Head of AP | Accountable for starting and stopping Shadow |
| AP Manager | Daily log, disagreement file, mid-point access review |
| Processors | Continue the live process; optional comment on usefulness — they do **not** follow the agent |
| Control owner | Reviews disagreements on DUP / PAY / TAX / high value |
| Finance Systems | Identity, read access, write-evidence only, hash pin |

**What can go wrong.** Humans start following the agent. Agent silently gains send. Shadow runs only on a quiet week.

**Control.** Access review at start and mid-point. Daily log signed. Communication: “Shadow advice is not an instruction.”

**Measure.** Agreement rate; material disagreements; codes not seen; **operator minutes spent reviewing the agent** (record; do not assume zero).

**Evidence.** `[BUYER]/Evidence/Shadow/[Shadow ID]/`.

---

## 2. Entry criteria

- [ ] Historical pack Go (`01_HISTORICAL_TEST_SCRIPTS.md`)  
- [ ] UAT Go (`02_UAT_TEMPLATES.md`)  
- [ ] Charter signed; exclusions explicit  
- [ ] Access extract: no send/park/post/status  
- [ ] Kill-switch owner named and reachable  
- [ ] Baseline KPI freeze **already done** if you intend to compare later (`../KPI_and_Measurement/00_KPI_FRAMEWORK.md`)  
- [ ] Team briefing completed (see §7)  
- [ ] Change record C2/C3 as required (`../Governance/02_RELEASE_AND_CHANGE.md`)  

If entry criteria fail, Shadow is unauthorised even if the connector works.

---

## 3. How — scope and duration

Scope is an **allow-list**:

- Legal entity  
- Channel  
- Invoice type  
- Supplier segment (or “all in entity” if volume requires — record the choice)  
- Exception codes the agent may **comment on**  
- Value cap for *which items are shadowed* (not an action cap — there is no action)

**Duration.** **ILLUSTRATIVE:** one full AP cycle (often 2–4 weeks). Extend if material exception codes have n = 0. Do not shorten because a steering date moved.

If the agent is payment-adjacent (Agent 12, or any agent that will later draft supplier mail), Shadow should cover a **payment run**, not only mid-cycle intake.

**Who.** AP Manager proposes window; Head of AP approves.

**What can go wrong.** “Two quiet days then we pilot.”

**Control.** Minimum code-sight rule: each in-scope family seen or explicitly waived with reason.

**Measure.** Days run; invoices in allow-list vs shadowed; codes seen.

**Evidence.** Scope sheet in the Shadow ID folder.

---

## 4. How — daily operating rhythm

### 4.1 Morning (AP Manager, 15–20 minutes)

1. Confirm identity still write-blocked (hash + entitlement ping, or FinSys digest).  
2. Confirm kill-switch not in force.  
3. Open yesterday’s disagreement file. Assign C/H items to Control / exception owner.  
4. Tell the floor: work the live queue, not the shadow pane.

### 4.2 During the day (processors)

- Process as SOP CS-1.0.  
- Optional: mark `useful / noise / wrong` on the shadow card **after** they have decided.  
- Do not wait for the agent. If they wait, Shadow is contaminating the baseline — record as a defect.

### 4.3 End of day (analyst or AP Manager)

Reconcile each shadowed item:

| Outcome | Definition |
|---|---|
| **Agree** | Same primary code or STP, and same human_required flag |
| **Disagree-material** | Different code family, missed high-risk, invented fact, or human_required mismatch |
| **Disagree-minor** | Same family, different secondary tag or wording |
| **Not-comparable** | Human used info the agent was not allowed to see, or item left the allow-list |
| **Agent-fail** | Schema/cite/timeout |

**Who.** AP Manager signs the daily sheet.

**What can go wrong.** Disagreements discarded as “user error.”

**Control.** Material disagreements require an owner and a disposition (agent wrong / human wrong / policy gap / both).

**Measure.** Daily counts by outcome; minutes of review labour.

**Evidence.** `shadow_daily_YYYYMMDD` in the Shadow folder.

---

## 5. Shadow log (minimum fields)

```
shadow_id
date
case_id / invoice_id
entity / channel / type
gross / currency
human_primary_code (or STP)
agent_primary_code (or STP)
human_required human / agent
outcome (agree / disagree-material / disagree-minor / not-comparable / agent-fail)
disposition (if disagree)
reviewer_minutes
evidence_refs (human artefact, agent packet)
notes
```

Do not store full IBAN in the log. Store a reference.

---

## 6. Mid-point and exit

### Mid-point (halfway, or weekly if longer)

**What to do.** Repeat access extract. Review disagreement mix. Decide continue / extend / stop.

**How.** One-hour review: codes not seen, FNR-like misses vs human, review-minute burden, any identity drift.

**Who.** AP Manager, Control owner, FinSys.

**What can go wrong.** Quietly adding send “so we can see the email.”

**Control.** Any verb change is a new C2/C3, not a Shadow tweak.

### Exit recommendation

| Recommendation | When |
|---|---|
| **Promote to Pilot (named verbs only)** | Agreement and residual misses meet **buyer** gates; review minutes understood; access clean; rollback for Pilot already tested |
| **Extend Shadow** | Codes not seen; volume too low; new policy issued mid-window |
| **Hold** | Material miss pattern; UX still causes waiting |
| **Redesign** | Policy gaps, wrong charter, deterministic work being done by a model |
| **Stop** | Incident, leak, or identity breach |

**Measure.** Exit pack completeness (daily sheets, mid-point access, recommendation).  
**Evidence.** Signed exit under `[BUYER]/Evidence/Shadow/[Shadow ID]/exit/`.

---

## 7. Team briefing (10 minutes, mandatory)

Read this aloud. Do not paraphrase into “the AI is helping us now.”

1. Shadow writes to the Evidence Room only. It cannot send or post.  
2. You remain responsible for the live item.  
3. Do not delay a GR chase or a match because the shadow pane is empty.  
4. If you notice the agent is right more often than you, **tell the AP Manager** — that is evidence, not permission to stop checking.  
5. Bank details, payment release, policy exceptions, legal mail stay human.  
6. If you see a send or a post from the agent identity, it is an **incident** (`../Governance/03_INCIDENT_AND_OVERRIDE.md`).

Attendance list stored with the Shadow ID.

---

## 8. What can go wrong (mode-level)

| Failure | Detection | Control |
|---|---|---|
| Silent execute | Send/post events from shadow identity | Identity allow-list; alert |
| Contaminated baseline | Cycle time drops because people wait then rush | Review-minute log; “do not wait” rule |
| Selection bias | Only easy invoices connected | Allow-list vs live mix table |
| Authority creep | Supervisor tells staff to “just do what it says” | Briefing + override culture |
| Quiet week | n too small on EX-DUP | Extend |
| Cost blindness | Re-prompting live invoices 40 times | Cost envelope; Orchestrator stop |

---

## 9. How you measure Shadow

Use dictionary IDs where they fit. Shadow agreement is **not** STP.

| Question | Metric | Notes |
|---|---|---|
| Does it agree? | Agree / (agree + disagree-material + disagree-minor) | State if minors excluded |
| Did we miss high-risk? | Disagree-material on DUP/PAY/TAX/MDM | Veto-eligible |
| Are we seeing the work? | Codes seen vs charter | |
| What does review cost? | Sum reviewer_minutes × loaded rate **or** minutes if no rate | Label ESTIMATE if used in a case |
| Is identity clean? | Write events = 0 | Incident if not |

Do not convert agreement % into a savings claim.

---

## 10. ACME Manufacturing — ILLUSTRATIVE

Fictional ACME shadowed Invoice Intake + Duplicate on email PDFs, one entity, three weeks including a payment run. Agreement high on extraction; two material disagrees on near-duplicates (humans had a desktop spreadsheet the agent could not see). Disposition: **policy gap** — spreadsheet brought into the evidence store as a controlled input, then re-shadowed two weeks. They did not pilot send.

---

## 11. Exit evidence checklist

- [ ] Scope sheet  
- [ ] Daily logs  
- [ ] Disagreement file with dispositions  
- [ ] Start + mid access extracts  
- [ ] Briefing attendance  
- [ ] Review-minute total  
- [ ] Mix table (live vs shadowed)  
- [ ] Signed recommendation  
- [ ] Change record reference  

Proof before permission. Agents earn responsibility. Evidence decides.

---

*End of 03_SHADOW_MODE.md*
