# Evidence Room — AP Agent OS Professional

## Process Mapping — 00 Methodology

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Process Mapping  
**Standard:** Proof before permission  
**Audience:** Head of AP, Shared Services lead, Transformation lead, Process Excellence, Internal Audit  
**ERP stance:** Agnostic. Record the buyer’s system names in the process register; do not assume a vendor.  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Internal operating standard. Buyer completes placeholders marked `[BUYER]`.

---

### How to use this document

This is the ten-step Evidence Room method for converting a live Accounts Payable operation into a governed agent workflow. Use it as the master sequence. The other files in this folder are the working instruments:

| Step | Template / instrument |
|---|---|
| Observe | `01_PROCESS_DISCOVERY_GUIDE.md` |
| Transcribe | `02_TRANSCRIPT_TO_WORKFLOW.md` |
| Extract / Structure / SOP | `03_SOP_GENERATOR_FRAMEWORK.md` |
| RACI | `04_RACI_STANDARD.md` |
| Agentise / autonomy | `../Governance/01_AUTONOMY_POLICY.md` |
| Test / Shadow / Pilot | `../Governance/02_RELEASE_AND_CHANGE.md` and `../Testing/` |
| Measure | `../KPI_and_Measurement/` |
| Expand responsibility | `../Governance/01_AUTONOMY_POLICY.md` |

Do not skip steps to “get to the agent faster.” Permission to act is earned by evidence produced in earlier steps.

---

### Operating rule for every step

Each step below answers the same seven questions:

1. **What to do** — the work itself.  
2. **How** — the method.  
3. **Who** — named role, not “the team.”  
4. **What can go wrong** — failure modes that invalidate later steps.  
5. **Control** — the check that the step was done properly.  
6. **Measure** — the evidence that the step completed.  
7. **Evidence** — the artefact stored in the Evidence Room.

Timeboxes are **ILLUSTRATIVE** planning ranges. Replace them with the buyer’s calendar.

---

## The ten-step method

```
Observe → Transcribe → Extract → Structure → Agentise
    → Test → Shadow → Controlled Pilot → Measure → Expand responsibility
```

Responsibility expands only after Measure produces a signed evidence pack. If Measure fails, return to Test or Agentise. Do not jump to Expand.

---

## STEP 1 — Observe

**Purpose.** Record how invoices, exceptions, approvals and payments actually move today — not how the SOP says they move.

**What to do.** Sit with AP clerks, exception handlers, buyers, goods-receipt owners and the payment preparer. Watch a complete cycle: intake → validation → match/exception → approval → payment proposal → close items.

**How.** Use `01_PROCESS_DISCOVERY_GUIDE.md`. Run at least one live walkthrough per material channel (email, portal, EDI, scan). Photograph or export screens only where policy allows. Timestamp every observation.

**Who.**

| Role | Duty |
|---|---|
| Transformation / Process Excellence lead | Designs the observation plan and timebox |
| AP process owner | Grants access and names the observed operators |
| Observed operator | Works normally; does not “perform the SOP” |
| Internal Audit (optional observer) | Confirms control points are not staged |

**Inputs.** Current SOP (if any), org chart, system access list, sample invoice IDs, exception queue export, payment calendar.

**Outputs.** Observation log; channel inventory; system/touch inventory; “as-done vs as-written” gap list.

**Timebox.** **ILLUSTRATIVE:** 3–5 working days for a single legal entity and one AP team. Multi-entity shared services: one additional day per material entity.

**Failure modes.**

- Operators demonstrate the happy path only.  
- Observer records system clicks but misses informal Slack/email workarounds.  
- Sample is all PO-matched invoices; non-PO and intercompany are skipped.  
- Observation is of UAT, not production.

**Template used.** Observation log and interview pack in `01_PROCESS_DISCOVERY_GUIDE.md`.

**Control.** Process owner signs that the observed sample covers the agreed channels and exception types.

**Measure.** Count of observed invoices, exception types seen, systems touched, informal workarounds noted.

**Evidence.** Signed observation log stored under `[BUYER]/Evidence/Observe/`.

**ACME — ILLUSTRATIVE.** Observer watches 12 invoices: 6 PO-match, 3 missing GR, 2 non-PO, 1 duplicate suspect. Discovers clerks paste VAT IDs from a desktop spreadsheet that is not in the SOP.

---

## STEP 2 — Transcribe

**Purpose.** Produce a durable, reviewable record of how people describe the work, the rules they apply, and the exceptions they recognise.

**What to do.** Transcribe walkthroughs, exception huddles and payment-prep meetings. Keep speaker labels and timestamps.

**How.** Use `02_TRANSCRIPT_TO_WORKFLOW.md`. Prefer recorded sessions with consent. If recording is refused, produce a contemporaneous structured note using the same headings. Do not polish language; preserve decision language (“we usually…”, “if it’s over…”, “I ask Jane”).

**Who.**

| Role | Duty |
|---|---|
| Scribe / analyst | Produces the transcript and speaker map |
| Session owner (AP Manager) | Confirms attendees and consent |
| Legal / HR (if required) | Confirms recording is permitted |

**Inputs.** Observation schedule, consent record, audio/video or live notes, speaker roster.

**Outputs.** Timestamped transcript; speaker map; rule-candidate list (raw); unresolved questions.

**Timebox.** **ILLUSTRATIVE:** same-day draft; review within 2 working days of the session.

**Failure modes.**

- Transcript merges speakers; rules cannot be attributed.  
- “Usually” and “always” are treated as the same.  
- Confidential supplier or payroll content is stored without redaction.  
- Transcript is rewritten into a clean SOP before Extract, destroying evidence of variation.

**Template used.** Transcript header, speaker map and redaction rules in `02_TRANSCRIPT_TO_WORKFLOW.md`.

**Control.** Session owner initials the speaker map. Privacy owner confirms redaction of personal and banking data.

**Measure.** Hours recorded vs hours transcribed; open questions remaining; redaction completeness check.

**Evidence.** Transcript file + consent + redaction log under `[BUYER]/Evidence/Transcribe/`.

---

## STEP 3 — Extract

**Purpose.** Pull discrete, testable objects from the transcript and observation log. No design yet.

**What to do.** Identify steps, systems, decisions, business rules, inputs, outputs, exceptions, controls and dependencies.

**How.** Tag the transcript with the object types below. One object per row. Quote the source line. Do not invent a rule that nobody stated.

| Object | Extract as |
|---|---|
| Step | Verb + object + system (“park invoice in ERP”) |
| System | Named application or mailbox, not “the system” |
| Decision | Condition + outcomes |
| Business rule | Threshold, tolerance, policy clause, or local habit |
| Input | Document, field, or data feed required to start the step |
| Output | Artefact the step produces |
| Exception | Condition that stops STP, mapped later to `03_EXCEPTION_TAXONOMY.md` |
| Control | Check that is supposed to prevent or detect error |
| Dependency | Person, team, or system the step waits on |

**Who.** Analyst extracts; AP process owner reviews object list; control owner reviews control objects.

**Inputs.** Transcript, observation log, sample documents, current policy excerpts.

**Outputs.** Object register (one row per object, with source quote and timestamp).

**Timebox.** **ILLUSTRATIVE:** 1–2 days per recorded session.

**Failure modes.**

- Analyst “corrects” a stated rule to match policy.  
- Informal rules are discarded as “not real.”  
- Exception names do not match the taxonomy codes.  
- Controls are listed without saying who performs them.

**Template used.** Extract register in `02_TRANSCRIPT_TO_WORKFLOW.md` (Extract section).

**Control.** Dual review: process owner for operational objects; control owner for control objects. Unquoted objects are rejected.

**Measure.** Objects extracted; objects rejected for missing source; % of exception objects mapped to a taxonomy code.

**Evidence.** Object register under `[BUYER]/Evidence/Extract/`.

**ACME — ILLUSTRATIVE.** Transcript line 00:41:12: “If the price is more than a couple of percent I send it back to the buyer.” Extracted rule: price-tolerance exists but is not quantified. Flagged as an open policy gap, not written as “2%.”

---

## STEP 4 — Structure

**Purpose.** Convert extracted objects into artefacts a second person can operate, test and audit.

**What to do.** Produce a process map, decision tree, exception map, control map, RACI and draft SOP.

**How.** Use `03_SOP_GENERATOR_FRAMEWORK.md` and `04_RACI_STANDARD.md`. Exception codes must come from `../Controls/03_EXCEPTION_TAXONOMY.md`. Do not create local exception names.

**Who.**

| Artefact | Author | Approver |
|---|---|---|
| Process map | Analyst | AP process owner |
| Decision tree | Analyst | Policy owner (Procurement / Tax / Treasury as relevant) |
| Exception map | Exception lead | AP Manager |
| Control map | Control owner | Internal Audit (review) |
| RACI | AP Manager | Finance Controller |
| SOP | Process owner | Controller / Head of AP |

**Inputs.** Object register; taxonomy; current DOA; current SoD matrix.

**Outputs.** Versioned process pack: map, trees, exception map, control map, RACI, SOP draft.

**Timebox.** **ILLUSTRATIVE:** 5–8 working days for one end-to-end AP path (intake to payment proposal).

**Failure modes.**

- Process map shows the target state disguised as current state.  
- RACI assigns an agent as Accountable. Agents are never Accountable.  
- SOP includes “use judgement” with no decision tree.  
- Exception map uses free-text reasons instead of taxonomy codes.

**Template used.** `03_SOP_GENERATOR_FRAMEWORK.md`, `04_RACI_STANDARD.md`, `../Controls/03_EXCEPTION_TAXONOMY.md`.

**Control.** Pack checklist signed: current-state labelled as current-state; every exception has a code; every control has an owner.

**Measure.** Open policy gaps remaining; unmapped exceptions; RACI conflicts (two Accountables, or none).

**Evidence.** Versioned process pack under `[BUYER]/Evidence/Structure/`.

---

## STEP 5 — Agentise

**Purpose.** Decide, per step, what remains human, what an agent may recommend, prepare or execute, and where a deterministic rule is preferable to a model.

**What to do.** Score each structured step against the autonomy ladder in `../Governance/01_AUTONOMY_POLICY.md`. Default every new agent to Level 0 (Observe) or Level 1 (Recommend). Execution is not a design-time gift.

**How.** For each step record:

| Field | Rule |
|---|---|
| Human-retained | Irreversible money movement, bank-detail change, policy exception above DOA, override of a control |
| Deterministic automation preferred | Exact field compares, tolerance maths, duplicate exact-key match, calendar ageing |
| Model / agent candidate | Classification, draft communication, root-cause clustering, incomplete-document review |
| Proposed autonomy | L0–L4, with required evidence to promote |
| Explicit exclusions | What the agent must never do |

**Who.** AP Manager proposes; Control owner and SoD owner challenge; Head of AP / Controller approves the agent charter. IT / security reviews tool access.

**Inputs.** Structured pack; risk register; DOA; data-access inventory.

**Outputs.** Agent charter(s); human/agent/deterministic split; tool and data list; exclusions; proposed test set.

**Timebox.** **ILLUSTRATIVE:** 3–5 working days per agent after the structured pack is signed.

**Failure modes.**

- Designer grants Level 3 because “the use case is simple.”  
- LLM is used for exact PO-price compare.  
- Agent is given ERP posting rights “for the pilot.”  
- Exclusions are omitted; the charter is therefore untestable.

**Template used.** Agent charter fields in `../Governance/01_AUTONOMY_POLICY.md`; control rows in `../Controls/01_CONTROL_MATRIX.md`.

**Control.** Charter cannot be approved if Accountable is an agent, if payment execution is in scope, or if exclusions are blank.

**Measure.** Steps classified; % deterministic vs model; number of L2+ proposals (should be zero at first design unless evidence already exists).

**Evidence.** Signed agent charter under `[BUYER]/Evidence/Agentise/`.

**ACME — ILLUSTRATIVE.** Matching Agent: price/qty/receipt compare = deterministic. Exception classification = agent at L1. Supplier email draft = L2 (prepare, human send). ERP park/post = out of scope.

---

## STEP 6 — Test

**Purpose.** Prove the agent and the structured rules against historical cases before they see live work.

**What to do.** Build a labelled case file. Run the agent and the deterministic rules. Score accuracy, false positives, false negatives, and handling of out-of-scope items.

**How.** Pull a stratified historical sample: STP, each material exception code, high value, intercompany, credit notes, foreign currency if used. Humans label the expected outcome first. Then run the agent. Disagreements are adjudicated by the process owner, not the model vendor.

**Who.** Analyst builds the file; AP specialists label; Control owner reviews scoring rules; IT provisions a non-production or read-only environment.

**Inputs.** Historical invoice IDs; taxonomy; agent charter; scoring definitions from `../KPI_and_Measurement/01_KPI_DICTIONARY.md`.

**Outputs.** Test report: n, accuracy, FPR, FNR, residual error list, out-of-scope handling, go/no-go.

**Timebox.** **ILLUSTRATIVE:** 5–10 working days including labelling. Do not start Shadow until the agreed gates are met.

**Failure modes.**

- Sample is only recent easy invoices.  
- Labels are created after seeing the agent output.  
- Production credentials are used.  
- “Close enough” is scored as correct.

**Template used.** Testing pack in `../Testing/` (where present) and KPI dictionary definitions.

**Control.** Labelling precedes model output. Environment is read-only or non-production. Scorecard uses dictionary formulas, not vendor dashboards.

**Measure.** Sample size by exception code; accuracy; FPR; FNR; residual high-risk errors.

**Evidence.** Test report + labelled file IDs under `[BUYER]/Evidence/Test/`.

Gates are buyer-set. **Do not treat any percentage in an ACME example as a target.**

---

## STEP 7 — Shadow

**Purpose.** Run the agent on live work with **no action permissions**. Compare agent output to human output in real time.

**What to do.** Agent reads the same queue the humans work. It writes recommendations to the Evidence Room only. Humans work as today. Daily reconciliation of agree / disagree / not-comparable.

**How.** Autonomy locked at L0 or L1 with write-block. No email send, no ERP change, no workflow status change. Shadow period covers a full payment cycle if the agent touches payment-adjacent work.

**Who.** AP Manager runs the shadow; operators continue their jobs; Control owner reviews disagreements that touch SoD, bank data, or high-value items.

**Inputs.** Live queue; agent charter; test-gate evidence; access locked to read + write-to-evidence-only.

**Outputs.** Shadow log; disagreement file; operator feedback; promote / hold / redesign recommendation.

**Timebox.** **ILLUSTRATIVE:** one full AP cycle (often 2–4 weeks). Extend if volume is too low to see material exception codes.

**Failure modes.**

- Agent silently gains a “send” or “post” permission.  
- Humans start following the agent before promotion.  
- Shadow covers only quiet weeks.  
- Disagreements are discarded as “user error” without review.

**Template used.** Shadow log fields in `../Governance/01_AUTONOMY_POLICY.md` and weekly report in `../KPI_and_Measurement/03_WEEKLY_AGENT_REPORT.md`.

**Control.** Access review at start and mid-point: agent identities have no execution entitlements. Daily shadow log signed by AP Manager.

**Measure.** Agreement rate; material disagreements; exception codes not seen; operator minutes spent reviewing the agent (should be recorded, not assumed to be “free”).

**Evidence.** Shadow log + access review under `[BUYER]/Evidence/Shadow/`.

---

## STEP 8 — Controlled Pilot

**Purpose.** Allow a narrow, reversible set of agent actions under human ownership.

**What to do.** Promote only the actions that Shadow supported. Limit by user, legal entity, supplier segment, invoice type, value cap and calendar window.

**How.** Follow `../Governance/02_RELEASE_AND_CHANGE.md`. Pilot scope is written as allow-lists, not deny-lists. Fallback and override are live before the first pilot transaction (`../Governance/03_INCIDENT_AND_OVERRIDE.md`).

**Who.** Head of AP / Controller is Accountable for the pilot. AP Manager is Responsible for daily operation. Control owner and IT are Consulted. Internal Audit is Informed.

**Inputs.** Shadow evidence pack; signed pilot charter; rollback plan; communication to affected suppliers/internal users if they will receive agent-drafted mail.

**Outputs.** Pilot charter; daily exception of pilot vs non-pilot; incident log; mid-pilot review; exit report.

**Timebox.** **ILLUSTRATIVE:** 4–8 weeks. Do not expand scope mid-pilot because “it looks fine.”

**Failure modes.**

- Scope creeps to all suppliers in week two.  
- Override is used as the normal path.  
- Pilot success is declared on activity (“emails sent”) not outcomes.  
- Rollback is untested.

**Template used.** Release record in `../Governance/02_RELEASE_AND_CHANGE.md`; incident/override in `../Governance/03_INCIDENT_AND_OVERRIDE.md`.

**Control.** Change Advisory (or Finance Systems equivalent) records the pilot as a change. Value cap and entity allow-list are technically enforced, not “agreed in a meeting.”

**Measure.** Pilot volume; override rate; incidents; outcome KPIs vs baseline for the same segment.

**Evidence.** Pilot charter + mid-point review + exit report under `[BUYER]/Evidence/Pilot/`.

**ACME — ILLUSTRATIVE.** Goods Receipt Agent drafts chasers only for domestic inventory POs under a buyer-set value cap, one plant, two named requesters copied. No chasers to Directors. No ERP receipt creation.

---

## STEP 9 — Measure

**Purpose.** Compare pilot (or shadow, if still pre-action) against the pre-agreed baseline using the KPI dictionary. Decide with numbers the buyer owns.

**What to do.** Score Activity, Operational, Financial and Risk-control outcomes separately. Do not offset a control breach with a cycle-time improvement.

**How.** Use `../KPI_and_Measurement/00_KPI_FRAMEWORK.md` and `01_KPI_DICTIONARY.md`. Baseline is frozen before Pilot. Savings are recorded only when validated by Finance; inferred “hours released” stay in a separate, labelled line.

**Who.** AP Reporting owner compiles; AP Manager explains variances; Controller / Head of AP decides; Internal Audit may review the pack.

**Inputs.** Baseline worksheet; dictionary; agent cost ledger; incident/override log; sample QA file.

**Outputs.** Measurement pack; promote / hold / roll back recommendation; updated risk register entries.

**Timebox.** **ILLUSTRATIVE:** 5 working days after pilot window closes, plus however long Finance needs to validate any claimed cash effect.

**Failure modes.**

- Vendor dashboard replaces dictionary definitions.  
- Baseline was never frozen.  
- Financial lines include unvalidated “opportunity.”  
- Small-n exception codes are reported as rates without a count.

**Template used.** `../KPI_and_Measurement/02_SCORECARD_GUIDE.md`, `03_WEEKLY_AGENT_REPORT.md`, `04_MANAGEMENT_DASHBOARD.md`.

**Control.** Every reported KPI cites its dictionary ID. Financial lines require a Finance sign-off field. Risk-control lines cannot be hidden.

**Measure.** Completeness of the scorecard; number of KPIs with n below the buyer’s minimum; unvalidated financial claims (must be zero on the signed pack).

**Evidence.** Signed measurement pack under `[BUYER]/Evidence/Measure/`.

---

## STEP 10 — Expand responsibility

**Purpose.** Increase autonomy or scope only when the measurement pack shows the agent earned it.

**What to do.** Apply the promotion rules in `../Governance/01_AUTONOMY_POLICY.md`. Expansion is a change, not a setting toggle. Each expansion has its own Test → Shadow (if scope is new) → Pilot → Measure cycle, sized to the increment.

**How.** Allowed increments (one at a time unless the change board records a reason):

1. Autonomy +1 level, same scope.  
2. Same autonomy, one added legal entity or channel.  
3. Same autonomy, one added exception code.  
4. Same autonomy, higher value cap.

Never combine “higher autonomy + broader scope + higher value” in one change.

**Who.** AP Manager proposes; Control owner and SoD owner must approve; Head of AP / Controller is Accountable; Change record required.

**Inputs.** Measurement pack; residual error list; incident history; current entitlements; updated charter.

**Outputs.** New charter version; change record; communication; next evidence plan.

**Timebox.** **ILLUSTRATIVE:** decision within 10 working days of a complete measurement pack. Implementation time is a separate change window.

**Failure modes.**

- Promotion because a senior stakeholder “wants to see AI working.”  
- Scope and autonomy raised together.  
- Previous incidents closed as “user training” without a control change.  
- Model or prompt changed in the same release as a promotion.

**Template used.** Autonomy policy; release and change; control matrix (updated rows).

**Control.** Promotion checklist: measurement pack complete; no open Critical incidents; entitlements match the new level; model/prompt hash unchanged unless separately tested.

**Measure.** Autonomy level before/after; scope delta; time since last material incident; residual FNR on high-risk codes.

**Evidence.** Signed promotion record under `[BUYER]/Evidence/Expand/`.

---

## Sequence controls (the method as a control)

| Gate | Cannot start until | Evidence |
|---|---|---|
| Transcribe | Observation plan signed; consent in place | Observe pack |
| Extract | Transcript accepted; redaction complete | Transcribe pack |
| Structure | Object register dual-reviewed | Extract pack |
| Agentise | Current-state pack signed (not target-state) | Structure pack |
| Test | Charter signed; environment confirmed non-executing | Agentise pack |
| Shadow | Test go/no-go passed; access review | Test pack |
| Controlled Pilot | Shadow pack; rollback tested; allow-lists enforced | Shadow + release record |
| Measure | Baseline frozen before pilot start | Pilot data + baseline |
| Expand | Measurement pack signed; one-increment rule | Measure pack |

If a gate artefact is missing, the next step is unauthorised — even if the software is technically able to run.

---

## Roles that persist across all ten steps

| Role | Accountability |
|---|---|
| Head of AP / Controller | Accountable for the operating model and any agent that touches AP work |
| AP Manager | Responsible for daily method discipline and agent performance |
| Control / Risk owner | Challenges autonomy, SoD, and evidence quality |
| Finance Systems / IT | Access, logging, environments, model/vendor change |
| Internal Audit | Periodic inspection of the Evidence Room, not day-to-day operation |
| Agent (any) | Never Accountable. Never the owner of a control. |

---

## What this method is not

- A promise that agents will reduce cost or cycle time.  
- A compliance certification.  
- A licence to bypass ERP controls.  
- A substitute for DOA, SoD, or payment authorisation.

Proof before permission.

---

*End of 00_METHODOLOGY.md*
