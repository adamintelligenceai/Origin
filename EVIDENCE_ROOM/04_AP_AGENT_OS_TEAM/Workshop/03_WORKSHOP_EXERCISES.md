# Evidence Room — AP Agent OS Team Edition

## Workshop — 03 Exercises

**Product:** Evidence Room AP Agent OS — Team Edition  
**Module:** Workshop  
**Standard:** Proof before permission  
**Audience:** Facilitator and table leads  
**Version:** 1.0  

Each exercise: **object, time, method, roles, failure modes, control, measure, evidence.** Do not invent a ninth exercise that sets an ROI target.

---

## E1 — Facts vs assumptions (30 min)

**What / object.** A wall with two columns: **FACT** (source ID) and **ASSUMPTION**. Topics: volume, channels, exception mix, headcount in AP, payment calendar, current SOP existence.

**How.** AP Manager posts extracts first (5 min). Others add sticky notes. Facilitator challenges any number without a source: move to ASSUMPTION.

**Who.** AP Manager leads content; all contribute; Head of AP does not overwrite extracts.

**Wrong.** Using Hackett 60% touchless as a FACT about this company. Using ACME 8,400 as if it were the buyer.

**Control.** Colour rule. Unknown is allowed.

**Measure.** Count of FACTs with sources vs ASSUMPTIONS.

**Evidence.** Photo + table exported to workshop folder.

**Prompt questions**

- Invoices last complete quarter, by entity and channel?  
- What share already have a workflow exception?  
- Is there a SOP version date or “none”?  
- Who releases payments, by name?

---

## E2 — As-done discovery (60 min)

**What / object.** (1) Ten unofficial rules. (2) Money-adjacent map. (3) Systems including side-files.

**How.**

1. Processor narrates the last ugly invoice (10 min). No interruption except clarifying questions.  
2. Exception owner adds the queue that never dies (10 min).  
3. Group harvests unofficial rules: “we usually…”, “I ask [name]…” (20 min).  
4. Map payment release, bank change, policy exception, legal (10 min).  
5. Side systems: spreadsheets, chats, personal mail (10 min).

**Who.** Processor and exception owner speak first. Managers write last.

**Wrong.** Rewriting into a future state. Punishing the operator for the unofficial rule.

**Control.** Verbatim quotes on the wall.

**Measure.** Unofficial rules ≥ 5 or an explicit “we only watched happy path — day invalid.”

**Evidence.** Quote list; money-adjacent map.

**Facilitator prompts**

- Show me where the SOP is wrong.  
- Who do you text that is not on the org chart?  
- When do you ignore capture output?  
- What happens if GR never arrives?

**ACME ILLUSTRATIVE seed (only if buyer has no examples):** VAT IDs pasted from a desktop file; “a couple of percent” price habit; statements keyed as invoices in month-end panic. Label ILLUSTRATIVE.

---

## E3 — First-slice allow-list (45 min)

**What / object.** Completed slice sheet.

```
Entity:
Channel:
Invoice type:
Supplier segment (or all-in-entity — justify):
Value cap:
First agent:
Autonomy this increment: L0
Verbs: none (observe/recommend to evidence only)
Out: payment release, bank write, [add]
Why this slice (one sentence, operational not “quick win AI”):
Why not a wider slice:
```

**How.** Silent write 5 min (individuals). Cluster 15. Head of AP proposes 10. Challenge 10. Head of AP **writes the final sheet** 5.

**Who.** Head of AP decides. FinSys flags “cannot technically isolate that segment.”

**Wrong.** “All AP, we’ll configure later.” Two agents. L2 “because it’s only email.”

**Control.** Allow-list language only. FinSys isolation note.

**Measure.** All fields non-blank; Out list includes the four human classes.

**Evidence.** Signed slice sheet.

---

## E4 — First agent and L0 sanity (50 min)

**What / object.** Charter skeleton: purpose, exclusions, tools forbidden, L0/L1 rows, 90-day subset.

**How.** Pick from stack using Professional overview — prefer 01, 10, 16, then 02/03. Walk L0–L4 table: for each level, one “may” and one “must not.” Strike any “execute” at L0–L1.

**Who.** AP Manager drafts on the wall; Control challenges tools; Head of AP accepts skeleton (full charter later).

**Wrong.** Payment Proposal as first agent. LLM for exact price compare if Matching is chosen.

**Control.** Forbidden-tools line cannot be blank. 90-day ⊂ in-scope.

**Measure.** Checklist from `19_AGENT_CHARTER_STANDARD.md` attempted; gaps listed.

**Evidence.** Photo of skeleton + gap list.

**Decision aid**

| If the pain is… | Candidate | Not first |
|---|---|---|
| Capture quality / split PDFs | 01 Intake | 07 Approval |
| Double posts / double pay fear | 10 Duplicate | “Fraud agent” (does not exist) |
| Queue chaos | 16 + 04 later | 16 without specialists |
| Price/qty | 03 only if tolerance **documented** | 03 if POLICY GAP |
| Missing GR | 05 draft later (L2) | GR create |
| Cycle time at payment | Still not 12 execute | 12 L3+ |

---

## E5 — Human classes and SoD (30 min)

**What / object.** Four-class table for **this slice** + incompatible pairs.

**How.** For each class: can this agent *see* it? *Recommend*? *Execute*? Execute must be **No**. Name the human who does execute today.

**Who.** Control owner chairs. Payment authoriser if present.

**Wrong.** “We’ll let the agent release below $500.” That is still payment release.

**Control.** If anyone writes Execute = Yes on a human class, Control **halts** E8 planning for that verb.

**Measure.** Four rows complete; SoD pairs initialled.

**Evidence.** Table in workshop folder.

---

## E6 — Risk top 8 (50 min)

**What / object.** Eight rows from `Templates/RISK_ASSESSMENT.md` catalogue, scored with a **buyer** 1–5 (define 3 in the room).

**How.** Start from catalogue, not a blank page. Star “Pilot blocker if residual High/Critical and no technical control.”

**Who.** Control owner. Privacy if data-out discussed.

**Wrong.** Single row “AI risk.” Residual Low because “we’ll train users.”

**Control.** Every High needs an owner.

**Measure.** 8 rows; owners; blocker flags.

**Evidence.** Risk sheet v0.

---

## E7 — Baseline metrics, no targets (40 min)

**What / object.** A list of **dictionary IDs** to freeze, with data source, not a target %.

**How.** Must include: KPI-ACT-INV (milestone stated), one operational (e.g. TTP or STP if definable), KPI-ERR-FNR for any DUP in scope, KPI-FIN-CPI **or** a plan to build it, KPI-FIN-AIC = 0 if no tools yet. Ban “industry average” targets.

**Who.** AP Manager; FP&A on CPI.

**Wrong.** “Target 60% touchless.” Using Deloitte 21% ROI as a KPI.

**Control.** Facilitator rejects any cell that is a target without a baseline method.

**Measure.** IDs ≥ 5; each has a source or “not available — plan.”

**Evidence.** Baseline worksheet v0.

---

## E8 — 30-day evidence plan (55 min)

**What / object.** Task list covering Professional steps 01–08 (through Historical Test **start**), named R, dates, caveats from Roadmap §4.

**How.** Walk Phase 0–6. FinSys writes access tasks with real queue times. Labeller names. No “TBD owner.”

**Who.** Transformation scribes; FinSys; AP Manager; Head of AP accepts.

**Wrong.** Day 30 = “agent live sending mail.”

**Control.** Last line of the plan cannot be a production execute verb.

**Measure.** Every task has R and A; Phase 5 present.

**Evidence.** Plan v0 in `Templates/IMPLEMENTATION_PLAN.md` form.

**Minimum tasks to leave with**

- Complete Observe coverage  
- Redact/store extracts  
- SOP current-state draft  
- Charter v1  
- RA v1  
- Identity request  
- Label plan (n by stratum)  
- Training date for processors (before Shadow, may fall after day 30)  

---

## Cross-exercise control

If E3 slice and E4 agent disagree at playback, **do not** paper over. Hold.

Proof before permission.

---

*End of 03_WORKSHOP_EXERCISES.md*
