# Evidence Room Method

**Product:** AP Agent OS  
**Audience:** AP lead, process owner, controller, internal audit, implementation lead  
**Purpose:** Convert an observed invoice-to-pay process into a governed, testable agent operating model.  
**Company used in examples:** Northline Industrials (fictional)

This method does not certify controls, guarantee savings, or authorise autonomous payment. Agents propose, assemble, chase, and draft. Humans remain accountable for posting, approval, and payment release.

---

## Operating principles

1. **Observe before you automate.** Map the work as it is done, not as the SOP says it is done.
2. **One process owner.** Every workflow has a named human owner who can stop, override, or refuse expansion.
3. **Evidence before expansion.** An agent gains responsibility only after recorded test, shadow, and pilot evidence.
4. **Exceptions are first-class.** Unmapped exceptions become the work. Do not hide them in “other”.
5. **ERP-agnostic design.** Capture fields, decisions, and controls. Bind to a specific ERP only at implementation.
6. **No silent authority.** If an agent cannot show the rule, the source record, and the confidence basis, it escalates.

---

## The 10 steps

| Step | Name | Outcome |
|---|---|---|
| 1 | Observe | Timed, permissioned observation of live work |
| 2 | Transcribe | Verbatim working record with timestamps and systems |
| 3 | Extract | Facts, decisions, data, exceptions, and controls isolated from narrative |
| 4 | Structure | Process map, decision trees, RACI, control map |
| 5 | Agentise | Candidate agent tasks bounded by human authority |
| 6 | Test | Historical and synthetic cases scored against gold labels |
| 7 | Shadow | Agent runs in parallel; humans remain the system of record |
| 8 | Controlled Pilot | Narrow live scope with kill-switch and daily review |
| 9 | Measure | Scorecard against pre-agreed baselines |
| 10 | Expand responsibility | Incremental authority only where evidence supports it |

---

## Step 1 — Observe

**Intent.** See the invoice-to-pay work as performed: screens, workarounds, side-channel email, and informal approvals.

### Facilitation notes

- Sit with one experienced processor and one less experienced processor. The gap between them is where undocumented rules live.
- Observe a full cycle for at least one PO invoice, one non-PO invoice, one credit note, and one statement query. Do not observe only “clean” items.
- Record system names, queue names, and field labels exactly as shown. Do not normalise yet.
- Ask “what would you do if this were wrong?” at each hold point. That question surfaces controls the SOP omits.
- Do not correct the operator. Observation is not training.
- Timebox each session to 90 minutes. Fatigue produces reconstructed memory, not observation.

### Artifacts

- Observation log (date, operator role, location/remote, systems in view)
- Screenshot index (redact bank details, personal data beyond what AP already holds)
- Timed activity notes
- Exception sightings list

### Exit criteria

- At least two operators observed on the same process path
- All in-scope channels named (email, portal, EDI, scan, shared mailbox)
- At least five live exceptions noted, even if unresolved
- Process owner has confirmed the observation set is representative, or has listed the missing cases

---

## Step 2 — Transcribe

**Intent.** Produce a working transcript that another analyst can reconstruct the process from, without having been in the room.

### Facilitation notes

- Transcribe in operator language first. Translation to control language happens in Step 3.
- Capture *clicks, waits, and lookups*, not only decisions. Waiting on GRN or a buyer reply is the process.
- Mark every point where the operator leaves the ERP (spreadsheet, inbox, chat, phone).
- If recording is used, obtain documented consent and store the file under the evidence-retention rule.
- Separate “what I do” from “what I wish I could do”. Both are useful; they are not the same artifact.

### Artifacts

- Timestamped transcript
- Channel inventory
- Open-question log (“unclear who approves freight over 10k”)

### Exit criteria

- Transcript covers start event → posted invoice or parked exception → any payment-pack touchpoint
- Every system touch has a name and a purpose
- Open questions are listed, not buried in prose
- Process owner has reviewed the transcript for material omission

---

## Step 3 — Extract

**Intent.** Pull structured facts from the transcript: objects, decisions, data fields, controls, and exception types.

### Facilitation notes

- Use four extraction columns: **Object**, **Decision**, **Data**, **Control**. A sentence that fits none of them is colour, not process.
- Name each exception with the taxonomy code from `EXCEPTION_TAXONOMY.md`. Do not invent parallel names.
- Extract the *actual* approval path, including verbal and chat approvals. Note whether they are evidenced.
- Identify master-data lookups (supplier, bank, tax, legal entity) as separate objects. They fail independently of matching.
- Flag any step where the operator “just knows” a rule. That is an undocumented decision.

### Artifacts

- Extraction table (object / decision / data / control / source line)
- Exception inventory mapped to taxonomy
- Undocumented-rule list
- Personal-data inventory (what the process actually touches)

### Exit criteria

- Every decision in the transcript has a named decision-maker or a documented gap
- Every exception sighted has a taxonomy code
- Data fields required for matching, coding, and payment proposal are listed
- Privacy reviewer (or AP manager if no privacy role exists) has seen the personal-data inventory

---

## Step 4 — Structure

**Intent.** Produce the operating pictures: process map, decision trees, control map, RACI.

### Facilitation notes

- Draw the process at the level where work changes hands or a control fires. Do not map every keystroke.
- One happy path, then exception branches. Do not draw a single diagram that tries to hold every case.
- Controls are named as *who checks what, using which evidence, before which event*.
- RACI is for the live operating model, including agents. Agents are never Accountable.
- Walk the draft maps with the processor *and* the process owner in separate sessions. They will disagree. Record the disagreement.

### Artifacts

- Completed `PROCESS_MAP_TEMPLATE.md`
- Completed `DECISION_TREE_TEMPLATE.md` for each high-volume decision
- Completed `CONTROL_MAP_TEMPLATE.md`
- Completed `RACI_TEMPLATE.md`
- Gap register (unresolved disagreements and missing rules)

### Exit criteria

- Happy path and top ten exception paths are mapped
- Every control has an owner, evidence source, and failure action
- RACI has one Accountable name per activity
- Gap register is accepted by the process owner; residual gaps are explicit

---

## Step 5 — Agentise

**Intent.** Assign candidate agent work to bounded tasks. Authority stays with named humans.

### Facilitation notes

- For each process step ask four questions: Can an agent **see** the data? **Propose** an action? **Execute** inside a sandbox? **Commit** to the ERP? Only the last requires a control change.
- Default stance: propose and draft. Commit is earned in Step 10, never assumed here.
- Use the 16-agent roster. Do not create a seventeenth agent to avoid a hard exception.
- Write the non-goal in the same sentence as the goal. Example: “Supplier Comms Agent drafts a missing-PO enquiry; it does not negotiate price.”
- Payment release, bank-detail change, and legal-entity override are never agent-commitable in this method.

### Artifacts

- Agentisation sheet (step → agent → allowed action → forbidden action → human owner)
- Draft SOP stubs via `SOP_GENERATOR_FRAMEWORK.md`
- Authority boundary statement signed by the process owner

### Exit criteria

- Every mapped step has an owner: human, agent-propose, or out of scope
- Forbidden actions are written, not implied
- Segregation-of-duties clashes (if any) are listed
- Controller or delegate has accepted the authority boundary

---

## Step 6 — Test

**Intent.** Score agents against historical and synthetic cases before they see live queues.

### Facilitation notes

- Build a gold-label set from closed invoices. Prefer messy months over clean ones.
- Separate accuracy (did the agent get the field/decision right?) from usefulness (would a processor have used the proposal?).
- Include known hard cases: intercompany, freight, partial receipts, recurring duplicates, foreign currency, and credit notes.
- Do not tune on the evaluation set. Hold out a sealed pack.
- Record false-positive and false-negative rates for matching, duplicates, and exception classification. Volume accuracy alone is not enough.

### Artifacts

- Gold-label pack and hold-out pack
- Completed scripts from `../Testing/TESTING_SCRIPTS.md`
- Score sheet against `../KPI_and_Measurement/KPI_FRAMEWORK.md`
- Defect log with severity

### Exit criteria

- Hold-out pack scored; results filed
- Pre-agreed accuracy floors met or a written waiver lists residual risk
- No Critical defect open
- Test lead and process owner both sign the test record

---

## Step 7 — Shadow

**Intent.** Run the agent in parallel with the live process. The ERP and payment file remain human-operated.

### Facilitation notes

- Shadow is not a quiet week. Sample daily. Compare agent output to the human outcome on the same invoice.
- Processors should not see agent suggestions during the first shadow window if the goal is an unbiased baseline. Open the suggestions only after the baseline is locked.
- Log every disagreement as a case, not a score. The case is the improvement unit.
- Watch for silent agreement that is still wrong (human and agent share a bad habit). Use the gold-label pack as a third reference.
- Follow `../Testing/SHADOW_MODE_METHODOLOGY.md`.

### Artifacts

- Shadow log (invoice id, human outcome, agent proposal, agree/disagree, notes)
- Disagreement case file
- Updated exception taxonomy mappings
- Shadow exit memo

### Exit criteria

- Agreed shadow duration completed (minimum ten working days or 200 in-scope invoices, whichever is later)
- Disagreement rate trend is understood, not merely recorded
- No unlogged agent access to write systems
- Process owner recommends proceed, remediate, or stop

---

## Step 8 — Controlled Pilot

**Intent.** Allow the agent a narrow live role under a kill-switch.

### Facilitation notes

- Scope by supplier set, legal entity, invoice type, or value band — not “all AP”.
- Write the kill-switch as a named person, a named action, and a maximum time to effect.
- Daily 15-minute stand-up for the first ten working days: volume, exceptions, overrides, incidents.
- Pilot success is measured against the pre-registered scorecard, not against a feeling that “it looks fine”.
- Follow `../Testing/PILOT_METHODOLOGY.md`.

### Artifacts

- Pilot charter (scope, owners, scorecard, kill-switch)
- Daily pilot log
- Incident and override register
- Pilot close report

### Exit criteria

- Charter signed before first live action
- Scorecard complete for the pilot window
- Open incidents have owners and due dates
- Go / no-go recorded by the process owner and the control owner

---

## Step 9 — Measure

**Intent.** Read the operating system through Activity, Operational, Financial, and Risk-control measures. Vanity counts are not a scorecard.

### Facilitation notes

- Lock definitions from `../KPI_and_Measurement/KPI_FRAMEWORK.md` before the pilot starts. Changing a formula mid-pilot invalidates the comparison.
- Separate *volume handled* from *correct outcomes*. An agent that classifies 2,000 invoices incorrectly is not productive.
- Financial figures require a validation method. Unvalidated “hours saved” does not enter the management pack.
- Risk-control measures can veto expansion even when operational measures look favourable.
- Review the scorecard with AP, procurement, and control — not AP alone.

### Artifacts

- Weekly agent performance report
- Management dashboard extract
- Measure pack (definitions, sources, exclusions)
- Commentary on movements that are mix-driven rather than performance-driven

### Exit criteria

- At least one full reporting cycle after pilot close
- Every KPI on the scorecard has a source system and an owner
- Residual measurement gaps are listed
- Leadership pack issued with commentary, not charts only

---

## Step 10 — Expand responsibility

**Intent.** Increase agent authority only where evidence supports it, and only inside the governance standard.

### Facilitation notes

- Expansion is a change request, not a setting. It uses the same release path as a workflow change.
- Typical expansions: more suppliers, higher value band, propose-to-park, park-to-post (still human-released), additional exception types.
- Typical non-expansions: payment release, bank-master change, tax-code invent, legal-entity override.
- If shadow or pilot evidence is stale (process, ERP, or model changed), re-test. Do not inherit old evidence.
- Record the new forbidden list. Expansion without a tightened boundary is scope creep.

### Artifacts

- Expansion request (from / to authority, evidence cited, residual risk)
- Updated RACI, control map, and SOP
- Re-test or waiver record
- Communication note to processors and approvers

### Exit criteria

- Evidence cited is current and on file
- Control owner and process owner both approve
- Monitoring and rollback are specified
- Access and logging confirmed for the new actions

---

## Method governance

| Role | Duty in this method |
|---|---|
| Process owner (usually AP manager) | Accepts maps, authority boundaries, go/no-go |
| Control owner (usually controller or delegate) | Accepts control map, expansion, waivers |
| Test lead | Owns gold-label integrity and score sheets |
| Implementation lead | Owns facilitation quality and artifact completeness |
| Processor cohort | Supplies observation and challenges maps |
| Internal audit (optional reviewer) | Reviews evidence completeness, not the commercial case |

Artifacts from this method are retained under the Evidence Retention rule in `../Governance/GOVERNANCE_FRAMEWORK.md`.

---

## Suggested calendar (illustrative, Northline Industrials)

Northline Industrials ran the method on invoice-to-pay for one legal entity, PO invoices first.

| Window | Steps | Notes |
|---|---|---|
| Days 1–3 | Observe, start Transcribe | Two processors, shared mailbox, ERP, GRN screen |
| Days 4–6 | Extract, Structure | Taxonomy applied; freight and intercompany left as gaps |
| Days 7–8 | Agentise | Propose-only for Match, Duplicate, Exception, Internal Chase |
| Days 9–15 | Test | 350 historical PO invoices; 80-case hold-out |
| Days 16–30 | Shadow | Same entity, PO only, value ≤ 25,000 entity currency |
| Days 31–50 | Controlled Pilot | 12 named suppliers; daily stand-up |
| Day 51+ | Measure, then Expansion request | No payment-file authority requested |

This calendar is a worked example, not a delivery commitment.

---

## What this method refuses

- Treating a vendor demo as observation
- Agentising from an SOP that processors do not use
- Skipping shadow because historical accuracy “looked strong”
- Expanding to payment release on the back of matching accuracy
- Reporting estimated hours as validated financial savings
- Claiming fraud detection, guaranteed recovery, or compliance certification
