# Evidence Room Methodology

**Evidence Room · AP Agent OS Pro**  
Version 1.0 · September 2026 · Licensed material · ERP-agnostic  
Answers: *What should I do? How? Who owns it? What can go wrong?*

---

## Purpose

This is the operating method for introducing agents into accounts payable without pretending the process is already understood, already controlled, or already safe to automate.

Use it when a finance leader wants agents in AP and cannot yet answer, in writing: what the process actually does, where judgement sits, which exceptions are common, and which actions must remain human.

It is not a software implementation plan. It is not a guarantee of savings, fraud detection, compliance, accounting accuracy, autonomous payment safety, or ROI. It is a sequence for making those claims *testable* — or, more often, for discovering they should not be made.

---

## Design principles

1. **Observe before you agentise.** If the map is a workshop reconstruction, it is a hypothesis. Treat it as such.
2. **Prefer deterministic automation.** Matching rules, duplicate keys, DOA tables, and tax matrices beat a model guessing the same thing. Use a model where language, judgement support, or unstructured documents are the work.
3. **Authority is a design choice, not a feature.** Every action is classified as Human / AI recommends / AI prepares / AI executes. Payment *authorisation* is always Human.
4. **Evidence is the product.** If a step cannot produce an artefact an auditor can pick up, it did not happen.
5. **Expand responsibility last.** Scope, accuracy, and controls come before volume and autonomy.

---

## The 16-agent reference set

These codes are the product stack (`../Agent_Library/00_AGENT_STACK_OVERVIEW.md`). Do not invent a parallel numbering. Rename locally only as a display label; keep the code.

| Code | Agent | Default start (see Responsibility Model) |
|---|---|---|
| A01 | Invoice Intake | Level 1 Recommend (capture, classify, extract, park) |
| A02 | Invoice Validation | Level 1 Recommend (completeness, tax, vendor, currency, coding readiness) |
| A03 | Matching | Level 1 Recommend; deterministic tolerances first |
| A04 | Exception Triage | Level 1 Recommend |
| A05 | Goods Receipt | Level 0 Observe (chase receivers; never create GR) |
| A06 | PO Quality | Level 0 Observe |
| A07 | Approval | Level 0 Observe (prepare routing; humans approve) |
| A08 | Supplier Resolution | Level 1 Recommend (draft queries and master-data *requests*) |
| A09 | Internal Follow-Up | Level 1 Recommend |
| A10 | Duplicate & Anomaly | Level 1 Recommend; exact-key is deterministic |
| A11 | Vendor Statement Reconciliation | Level 0 Observe |
| A12 | Payment Proposal Review | Level 0 Observe. **Never authorise, release, or transmit payment.** |
| A13 | AP Close | Level 0 Observe (checklist; humans sign the close) |
| A14 | AP Reporting | Level 1 Recommend (pack from ledger facts) |
| A15 | Root Cause | Level 0 Observe |
| A16 | AP Manager / Orchestrator | Level 1 Recommend (dispatch, SLA, autonomy gates — does not promote itself) |

---

## Decision rules (apply at every step)

Use this ladder. It is the same idea as Responsibility Model Levels 0–4. Do not skip rungs because a demo looked fluent.

| Authority | Responsibility Model | Meaning | Allowed examples | Forbidden examples |
|---|---|---|---|---|
| **Human** | Always human | A named person decides and is accountable. | Payment authorisation; bank-detail changes; override of a hard control; posting a master-data change; signing a tax position or the close. | Delegating the same action to an agent “for speed.” |
| **AI recommends** | Level 1 | Agent proposes a labelled option with evidence. Human accepts, edits, or rejects. | Exception class, tax flag, coding readiness, next-best owner, duplicate hold. | Silent acceptance of a recommendation as a posting. |
| **AI prepares** | Level 2 | Agent assembles a complete packet. A human reviews and submits. | Parked invoice, approval packet, payment-proposal *challenge*, supplier query, GR chase, close checklist. | Submitting the packet to the ERP or bank without the human action. |
| **AI executes** | Level 3 (Level 4 = exception-only review) | Agent performs a bounded action inside a written envelope, with logging and a kill-switch. | File an invoice to a queue; match in certified tolerance; send an approved-template chase; write an evidence record. | Anything that moves money, changes bank details, signs the close, or expands its own envelope. |
| **Prefer deterministic** | All levels | Rules, keys, and tables — not generation. | Exact invoice-number + supplier + amount + date duplicate key; 3-way match tolerances; DOA matrix; closed-PO status. | Asking a model “does this look like a duplicate?” as the primary control. |

**Hard rules (non-negotiable in this toolkit):**

- Payment authorisation remains human. A12 may challenge a proposal. It may not release a payment run, approve a payment, or transmit a file to a bank or payment provider.
- Bank-detail changes remain human, dual-controlled. A08 drafts the request only.
- Overrides of failed matches, failed duplicates, or failed SoD checks remain human and logged.
- Period-close sign-off remains human (A13 prepares).
- If a deterministic check can decide the case, do not ask a model to decide it.
- If the model is used, its output is validated against schema, policy, and (where material) a second method before any downstream execute step.
- Authority promotions are Step 10 / the Responsibility Model register — A16 does not promote agents.

---

## Method at a glance

| Step | Name | Timebox | Primary owner | Exit criterion |
|---|---|---|---|---|
| 1 | Observe | 3–5 working days | AP process owner + facilitator | Observed path documented; shadow vs official SOP noted |
| 2 | Transcribe | 2–3 days | Facilitator | Searchable transcript + timestamped clip index |
| 3 | Extract | 2–4 days | Facilitator + AP lead | Structured extraction sheet complete |
| 4 | Structure | 3–5 days | Process owner + controls | Signed process map, decision tree, exception taxonomy, control map, RACI |
| 5 | Agentise | 3–5 days | Process owner + AI product owner | Agentisation canvas per in-scope agent; authority signed |
| 6 | Test | 5–10 days | QA + AP SMEs | Golden set scored; fail cases written; go/no-go recorded |
| 7 | Shadow | 10–20 working days | AP lead | Shadow vs human agreement measured; no production writes |
| 8 | Controlled pilot | 20–40 working days | AP Director + CFO sponsor | Volume, entity, and authority caps held; incident log empty or closed |
| 9 | Measure | Continuous from day 1 of shadow | FP&A + AP + IA | KPI pack on customer baseline; no vanity metrics |
| 10 | Expand responsibility | Quarterly, gated | CFO + IA | Written promotion of authority; never automatic |

Total elapsed time for a single process slice (e.g. PO invoices in one ERP company code) is typically 8–14 weeks. Do not compress Observe–Structure to “a workshop week.” That is how unofficial workarounds become encoded as policy.

---

## Step 1 — Observe

**What you should do.** Sit with the people who actually process invoices. Watch a live day, not a rehearsed demo. Follow one invoice from arrival to posted (or parked), and one exception from raise to close.

**How.** Two facilitators. One watches the screen and the ERP; one watches the side channels (email, chat, shared drives, printouts, “just ask Maria”). Record with consent. Note every system, every unofficial spreadsheet, every pause while someone “just knows.”

**Facilitation notes.**

- Ask for the *worst* Tuesday of the month, not the cleanest. Month-end and payment-run days are more truthful than mid-cycle.
- Do not correct the operator. You are not training them.
- When someone says “the system does that,” ask them to show the click. Often the system does not.
- Capture volume context while you watch: invoices on the desk, ageing, who is covering leave.
- Separate *official SOP* from *practised path*. Both go into the notes. Only the practised path is a candidate for agentisation — and only after controls review.

**Who owns it.** AP process owner books access and consent. Facilitator runs the observation. Information Security signs the recording method.

**What can go wrong.** The team performs the SOP because you are watching. Mitigate by pairing observation with a sample of last month’s tickets and a silent review of email folders.

**How you control it.** Written consent; recordings stored in the evidence room with retention and access list; no recordings leave the tenant.

**How you measure it.** Observation coverage: % of invoice types, entities, and channels seen. Target: every in-scope channel and at least one of each high-volume exception class.

**Artefacts.** Process walkthrough notes (see `TEMPLATES.md`). Recording index. System inventory. Informal-control list.

**Timebox.** 3–5 working days for one process slice. Add 2 days per extra ERP or shared-service site.

### Northline — Observe (illustrative)

Northline Industrial Group (fictional): 4,200 employees, ~18,000 invoices/month, SAP S/4HANA for core companies, NetSuite for acquired Northline Pacific Components; 14-person shared-services AP team (illustrative staffing, not a recommendation).

The team observed SAP PO invoices (company NL10) and a sample of Pacific Components NetSuite bills. Official SOP said all invoices arrive via the AP inbox. Practised path: ~30% of NetSuite invoices arrived as forwards from buyers; utilities were processed from a shared mailbox that was not in the SOP; one plant still emailed scanned PDFs to a named clerk. Side channel discovered: a spreadsheet of “known price-variance suppliers” used to skip the mismatch workflow. That spreadsheet is an unofficial control and a SoD concern — it is logged, not agentised.

---

## Step 2 — Transcribe

**What you should do.** Turn observation into a timestamped, searchable record. Do not summarise yet. Summaries hide the unofficial steps.

**How.** Human-reviewed transcript. Auto-transcription is acceptable as a draft; a person who understands AP corrects entity names, document numbers, and system labels. Index each clip: `HH:MM — action — system — actor — artefact`.

**Facilitation notes.**

- Preserve exact phrases for decision points (“I always code this to 6400 because that’s what we did last year”).
- Tag every moment of hesitation. Hesitation is usually a missing rule or a missing data field.
- Redact personal gossip. Do not redact control-relevant shortcuts.

**Who owns it.** Facilitator. AP lead reviews for factual system names only — they do not “clean up” the story.

**What can go wrong.** A polished transcript that reads like the SOP. If it is smoother than the day you watched, it is wrong.

**How you control it.** Version the transcript. Reviewer name and date on the cover. Store with the recording.

**How you measure it.** Completeness: every observed invoice and exception has a transcript segment. Accuracy sample: AP lead spot-checks 10 timestamps.

**Artefacts.** Transcript file. Clip index. Redaction log.

**Timebox.** 2–3 days.

### Northline — Transcribe (illustrative)

Transcripts distinguished SAP MIR7 park / MIRO post language from NetSuite vendor-bill language. A 14-minute segment showed a clerk resolving a price mismatch by calling the buyer on mobile, then keying the buyer’s verbal “it’s fine” with no PO change and no written approval. That segment becomes a control finding before it becomes an agent story.

---

## Step 3 — Extract

**What you should do.** Pull structured facts from the transcript: triggers, inputs, systems, decisions, exceptions, outputs, waits, and informal controls.

**How.** One extraction row per observed action, using the transcript extraction template. Map each exception mention to a code in `EXCEPTION_TAXONOMY.md`. If it does not fit, propose a new code — do not force-fit.

**Facilitation notes.**

- Extract *waits* as first-class objects. Missing GR, missing approval, and supplier silence are most of the cycle time.
- Extract *data actually used*, not data the ERP could have used. Agents fail when they are given the data model instead of the data the clerk opened.
- Mark each decision: rule-like, judgement, or political (a named person always wins).

**Who owns it.** Facilitator drafts. AP lead and a controls analyst challenge.

**What can go wrong.** Extracting the happy path only. Require at least one row per taxonomy category that appeared in the last 90 days of tickets, even if it was not observed live.

**How you control it.** Dual review on a 20% sample. Disagreements go to the process owner, not the more senior facilitator.

**How you measure it.** Extraction coverage vs 90-day ticket sample. Target: 100% of ticket reasons mapped to a taxonomy code or an explicit “new code” proposal.

**Artefacts.** Transcript extraction sheet. Draft exception-frequency table.

**Timebox.** 2–4 days.

### Northline — Extract (illustrative)

90-day ticket sample (illustrative counts, not a benchmark): missing receipt 22%, price mismatch 14%, PO exhausted 9%, duplicate / potential duplicate 7%, coding missing 8%, invoice quality / extraction 6%, approval missing 5%, remainder fragmented. Informal control: Pacific Components buyers approved NetSuite bills in email; SAP NL10 used a formal release strategy. Two different approval realities — one group, two control designs.

---

## Step 4 — Structure

**What you should do.** Convert extraction into objects other people can run: process map, decision tree, exception taxonomy (localised), control map, RACI, SOP header.

**How.** Workshop of 3–4 hours, not a day of redesign. The workshop *confirms* the practised path and decides which unofficial steps are retired, which become policy, and which become findings. Draw the map from the extraction sheet, not from memory.

**Facilitation notes.**

- Start the map at *channel entry*, not at “invoice is in the ERP.” Intake is where duplicates and wrong entities begin.
- Put exception handling on the main page. A happy-path map with an “exceptions” box is a brochure.
- For each decision diamond, write the rule or write “judgement — owner: [role].”
- RACI the *control*, not just the task. Who is Accountable if a duplicate is paid?

**Who owns it.** Process owner signs the map. Internal Audit or Controls signs the control map. Do not proceed to Agentise without both signatures.

**What can go wrong.** A future-state map disguised as current-state. Label current vs target in the title. Current-state is what you agentise first; target-state is a later project.

**How you control it.** Sign-off page with date, version, and “this is current-state as practised on [dates].” Store in version control.

**How you measure it.** Completeness checklist: every extraction row appears on the map or is explicitly out of scope. Every in-scope exception code has a decision-tree branch.

**Artefacts.** Process map, decision tree, localised exception taxonomy, control map, RACI, SOP header — all from `TEMPLATES.md`.

**Timebox.** 3–5 days including sign-off.

### Northline — Structure (illustrative)

Two current-state maps, not one: SAP NL10 PO path and Pacific Components NetSuite path. A combined map hid the email-approval gap. Control map listed the unofficial price-variance spreadsheet as *detective, unowned, retire*. Decision tree for price mismatch: tolerance table first (deterministic), then buyer confirmation (human), then AP supervisor override (human, logged). No agent executes a price override.

---

## Step 5 — Agentise

**What you should do.** For each in-scope slice of work, decide whether an agent should exist, which of the 16 it is, what it may do, and what it must never do.

**How.** One canvas per agent (see `TEMPLATES.md`). Fill in: job, inputs, tools, authority, deterministic vs model, human owner, controls, evidence, KPIs, fallback. Then apply the decision ladder. If the work is a table lookup, do not create an “AI agent” for it — create a rule and give A16 the job of proving the rule fired.

**Facilitation notes.**

- Agentise *jobs*, not job titles. “The AP clerk” is five agents and a lot of waiting.
- Start with A01–A04, A10, and A16. Do not start with A12. Payment-proposal review is last because it concentrates residual risk.
- Write the “never” list before the “does” list. If the never list is short, it is incomplete.
- Bind each agent to named systems and named fields. “Has ERP access” is not a design.

**Who owns it.** Process owner (accountable for the job). AI product owner (accountable for the agent configuration). Control owner (accountable for the boundary).

**What can go wrong.** Authority inflation: a recommend-agent quietly becomes execute because “the accuracy looked good.” Prevent this with a written authority field that only Step 10 can change.

**How you control it.** Canvas signed. Mapped into `AGENT_CONTROL_MATRIX.md` and `RISK_REGISTER.md` before any test data leaves the room.

**How you measure it.** % of in-scope jobs with a signed canvas. % of canvases where deterministic options were explicitly considered and accepted or rejected.

**Artefacts.** Agentisation canvas per agent. Authority register. Tool/permission request.

**Timebox.** 3–5 days for a first slice (typically A01–A04, A10, A16).

### Northline — Agentise (illustrative)

First slice: SAP PO invoices, company NL10. Agents in scope: A01, A02, A03, A04, A05, A10, A16. Out of scope: A12 (payment proposal), A13 (close), A08 master-data posts. A03 is specified as deterministic 3-way match with Northline’s existing SAP tolerances; the model is used only to *explain* a mismatch and draft the buyer question (A04 + A09), not to decide the match. A10 uses a composite key plus a near-duplicate recommend queue. Authority for A01 extract: Level 1/2 (Recommend/Prepare). Clerks confirm extraction on a sample and on low-confidence fields.

---

## Step 6 — Test

**What you should do.** Prove the agent on a golden set *before* it sits next to a live clerk. Test the controls, not just the model’s fluency.

**How.** Build a golden set from real, redacted historical invoices: happy path, each high-volume exception, known duplicates, known wrong-entity cases, adversarial documents (prompt-like text in invoice headers, swapped bank details, lookalike suppliers). Score with the definitions in `KPI_FRAMEWORK.md`. Run schema validation, policy validation, and (for execute-class actions) a dry-run against a non-production environment.

**Facilitation notes.**

- A “demo that impressed the CFO” is not a test.
- Include cases the current team *already gets wrong*. If the agent repeats the same error, you have automated the defect.
- Test the fallback: kill-switch, queue overflow, model-provider outage.
- Test SoD: the same identity must not extract, match, *and* prepare payment.

**Who owns it.** QA lead designs the set. AP SMEs label it. Controls reviews negative cases. AI product owner may not mark their own golden set.

**What can go wrong.** Training on the test set. Freeze the golden set. Version it. New cases go to a hold-out.

**How you control it.** Written go/no-go with thresholds agreed *before* scores are seen. Typical first-slice thresholds (illustrative, set locally): extraction field accuracy on required fields ≥ agreed floor; duplicate exact-key precision 100% on the exact-key definition; zero payment-direction actions in the log.

**How you measure it.** Classification / extraction / matching accuracy, FPR, FNR — see `KPI_FRAMEWORK.md`. Control tests pass/fail.

**Artefacts.** Golden-set register. Score sheet. Fail-case library. Go/no-go record.

**Timebox.** 5–10 days. Do not start Shadow on a failed go/no-go.

### Northline — Test (illustrative)

Golden set: 400 SAP PO invoices, stratified, plus 40 adversarial. A10 exact-key test: 28 known duplicates, 0 misses on the defined key; 12 near-duplicates scored as recommend, 1 false exact (a legitimate credit-and-rebill with reused invoice number — rule refined to include document type). A01 line-level quantity misses on multi-page scans: below floor; extract remains Prepare, not Execute. Go/no-go: Shadow approved for A01 (file/class), A02, A03 (deterministic match), A10, A16; A01 extract shadow with mandatory field confirmation; A04 draft-only.

---

## Step 7 — Shadow

**What you should do.** Run the agent in parallel with the existing process. The agent writes to an evidence store and a comparison queue. It does not write to the ERP, does not email suppliers, does not touch payments.

**How.** Same invoices, same day. Human completes the work as today. Agent produces its output. A reviewer scores agreement daily for the first week, then on a sample. Disagreements become fail cases or rule changes — not silent overrides.

**Facilitation notes.**

- Tell the team the agent is on trial, not that they are. Shadow fails if clerks stop doing the job “because the agent will catch it.”
- Review a sample of *agreements* as well as disagreements. Agreement can be two parties making the same mistake.
- Keep the never-list visible on the wall or the queue header.

**Who owns it.** AP lead operates the queue. QA maintains scores. Process owner decides rule changes.

**What can go wrong.** Quiet production writes “just to save a paste.” Technical control: read-only credentials in Shadow. A16 alerts on any write attempt.

**How you control it.** Read-only access. Daily exception of write-attempt logs. No supplier contact.

**How you measure it.** Agreement rate, FPR/FNR vs human (human is not ground truth — dual review a sample). Time the human still spends; do not claim hours-released in Shadow.

**Artefacts.** Shadow scorebook. Disagreement log. Credential review.

**Timebox.** 10–20 working days. Extend if volume is thin or scores move.

### Northline — Shadow (illustrative)

NL10 SAP PO slice, 15 working days. A03 deterministic match agreed with posted outcomes on in-tolerance cases; residual mismatches were already human. A01 misclassified a small set of debit notes as invoices — rule added. Extract still required confirmation on line quantities. No ERP writes. No supplier mail. A16 recorded 0 write attempts.

---

## Step 8 — Controlled pilot

**What you should do.** Give the agent the *minimum* production authority that the signed canvas allows, on a capped population, with named humans on the hook.

**How.** Cap by entity, channel, invoice type, amount, and calendar. Example cap: one company code, PO invoices under a stated amount, inbound email channel only, two payment cycles. Execute-class actions only where Shadow scores and control tests held. Keep A12 out unless the CFO and IA have signed a Level-2 (prepare/challenge only) pilot with dual human release unchanged.

**Facilitation notes.**

- Write the rollback in one paragraph before go-live: who turns it off, how work returns to the old queue, how in-flight items are finished.
- Brief suppliers only if they will receive agent-prepared mail. Most first pilots should not mail suppliers.
- Sit with the pod for the first two payment runs even if the agent does not pay.

**Who owns it.** AP Director (operational). CFO (sponsor). IA (control observer). AI product owner (configuration freeze except emergency).

**What can go wrong.** Scope creep mid-pilot (“just add NetSuite”). That is a new Observe cycle, not a toggle.

**How you control it.** Change freeze except Sev-1. Incident process from `AP_AGENT_GOVERNANCE_FRAMEWORK.md`. Dual control on any authority change.

**How you measure it.** Pilot KPIs from `KPI_FRAMEWORK.md` against the *same entity’s* baseline, not against a vendor blog. Control breaches = 0 tolerance for payment-direction and bank-detail events.

**Artefacts.** Pilot charter. Rollback note. Daily control digest. Incident log.

**Timebox.** 20–40 working days. One or two month-ends should fall inside the window if month-end is material to the process.

### Northline — Controlled pilot (illustrative)

Charter (illustrative): SAP company NL10, PO invoices, inbound AP inbox, amount cap aligned to existing release strategy, 30 days. A01 files and classifies inside the validated class set with fallback to human; extract remains Prepare. A02 recommends validation. A03 executes in-tolerance match; out-of-tolerance to A04. A10 executes exact-key block; near-duplicates to human. A04 recommends. A05 prepares GR chases for named receivers, human sends. A16 dispatches and logs. A12 remains out of scope — payment release stays entirely human and unchanged. Rollback: disable A01 filing rule; mail drops to the pre-pilot inbox rule.

---

## Step 9 — Measure

**What you should do.** Measure activity, operational outcomes, financial outcomes, and risk-control outcomes separately. Do not average them into a single “AI score.”

**How.** Use `KPI_FRAMEWORK.md`. Inputs are the customer’s own baseline. Ardent Partners 2024 Best-in-Class *relative* gaps (78% lower cost, 82% faster cycle, 59% lower exceptions, 9% BIC exception rate vs 22% for others) are independent context for ambition — not a forecast and not a substitute for Northline’s numbers.

**Facilitation notes.**

- Hours-released is a measured residual, not a headcount announcement.
- Validated savings require a finance owner and a method (see business-case model). Unvalidated “could save” figures do not enter the KPI pack.
- If a metric cannot be wrong, it is a vanity metric. Drop it.

**Who owns it.** FP&A designs the pack with AP. IA owns control metrics. AI product owner owns inference-cost metrics. No one owner reports their own success without a second signature.

**What can go wrong.** Measuring only STP and invoices handled — activity without outcome, or outcome without control.

**How you control it.** Metric dictionary frozen per quarter. Changes go through the same version control as the agents.

**How you measure it.** The pack itself is audited: source, formula, last refresh, owner.

**Artefacts.** KPI dictionary (local). Monthly pack. Data-lineage note.

**Timebox.** Continuous from Shadow day 1. First formal pack at pilot mid-point and pilot close.

### Northline — Measure (illustrative)

Baseline taken from NL10 SAP PO invoices for the prior two quarters (customer numbers, not industry averages). Pack reports STP, exception resolution, time-to-posting, FPR/FNR on duplicates, GR chase on-time, control breaches, inference cost, and cost per *correct* outcome. Cost-per-invoice is calculated from Northline’s loaded AP cost and volume — not from a $10–$15 vendor-blog figure. No ROI is claimed at pilot close; a *measured delta* is reported with caveats. A14 (Reporting) produces the pack from ledger facts; humans certify it.

---

## Step 10 — Expand responsibility

**What you should do.** Promote authority only by written decision: more volume, more entities, more exception classes, or a move up the ladder (Recommend → Prepare → Execute). Never auto-promote on a score threshold.

**How.** Quarterly gate. Evidence required: KPI pack, incident log, control certification, golden-set re-score on the current model/workflow versions, residual-risk review. A promotion of authority is a change record. A promotion of volume without authority change is a smaller change record.

**Facilitation notes.**

- Expanding to a second ERP (NetSuite at Northline) is a new slice. Restart Observe for that slice. Reuse canvases only where the job is truly the same.
- Moving A12 from “out of scope” to Level 2 (challenge the proposal) is a CFO-level control decision, not a product increment. A12 never releases cash.
- If scores regress after a model change, authority steps *down* automatically to the last certified level until re-certified. That rule is written here so it is not negotiated in an incident.

**Who owns it.** CFO (authority promotions). AP Director (volume promotions within the same authority). IA (veto on control grounds).

**What can go wrong.** “The model got better” used as a reason to skip recertification. Model changes are in-scope events — see governance framework.

**How you control it.** Change record, recertification, updated control matrix, updated risk residual.

**How you measure it.** % of agents operating within signed authority. Count of unauthorised promotions (target: 0). Re-score delta vs last certification.

**Artefacts.** Promotion paper. Updated canvases. Updated `AGENT_CONTROL_MATRIX.md` instance. Recertification pack.

**Timebox.** Quarterly by default. Emergency restriction can happen same day; emergency expansion cannot.

### Northline — Expand (illustrative)

After one clean pilot month (illustrative), the gate approved: (a) lift the amount cap to the next release-strategy band, still SAP NL10 PO only; (b) keep A01 extract at Prepare; (c) allow A05 to *send* approved-template GR chases to a named receiver list. Rejected: NetSuite inclusion; A12 challenge privilege; A08 send-as-company. Pacific Components NetSuite scheduled as a new Observe in the following quarter.

---

## Facilitation kit

**Room.** One process owner, one AP SME who still touches invoices, one controls/IA person, one AI product owner, one facilitator. More people produce a future-state workshop.

**Materials.** Last 90 days of tickets, last two payment-run samples, current SOP, DOA table, duplicate policy, tax matrix if any, org chart, system list.

**Questions that usually surface the real process.**

- Show me the last invoice you would not want your name on.
- What do you do when the buyer does not answer?
- Who can tell you to “just pay it”?
- Where do bank-detail change requests actually arrive?
- Which spreadsheet would break AP if it disappeared this afternoon?

**Anti-patterns.**

- Starting with a vendor demo and reverse-engineering a process to fit it.
- Agentising month-end journals and AP in the same canvas.
- Calling a chatbot on the ERP “an AP agent operating system.”
- Using industry cost-per-invoice figures as the business case.

---

## Artefact register (what “done” looks like)

| Step | Artefact | Template | Signed by |
|---|---|---|---|
| 1 | Walkthrough notes + recording index | Walkthrough notes | Facilitator, AP owner |
| 2 | Transcript + clip index | — | Facilitator |
| 3 | Extraction sheet | Transcript extraction | Facilitator, AP lead |
| 4 | Map, tree, taxonomy, controls, RACI, SOP header | All structure templates | Process owner, Controls/IA |
| 5 | Agentisation canvases + authority register | Agentisation canvas | Process owner, AI owner, Controls |
| 6 | Golden set + scores + go/no-go | — | QA, AP SME, Controls |
| 7 | Shadow scorebook | — | AP lead, QA |
| 8 | Pilot charter + rollback + incidents | — | AP Director, CFO, IA |
| 9 | KPI pack + dictionary | See KPI framework | FP&A, AP, IA |
| 10 | Promotion paper + recertification | — | CFO, IA |

Store every artefact in the client evidence room with version, date, and access list. If it is not there, the step is open.

---

## Using the Northline example

Northline Industrial Group is fictional. Figures in this document are labelled illustrative. They exist so a working team can see how a dual-ERP, high-volume AP organisation would *use* the method — not so anyone can quote a result.

When you work a real client, replace Northline’s numbers with theirs. Do not keep the illustrative STP, exception mix, or FTE counts in a customer pack without relabelling.

---

## Related documents

- `TEMPLATES.md` — forms used at each step
- `EXCEPTION_TAXONOMY.md` — exception codes and default owners
- `../Agent_Library/00_AGENT_STACK_OVERVIEW.md` — the sixteen agents this method agentises
- `../Agent_Library/RESPONSIBILITY_MODEL.md` — Levels 0–4
- `../Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md` — accountability, privacy, incidents, certification
- `../Controls/AGENT_CONTROL_MATRIX.md` — controls per agent
- `../Controls/RISK_REGISTER.md` — inherent and residual risk
- `../KPI_and_Measurement/KPI_FRAMEWORK.md` — what to measure
- `../Business_Case/BUSINESS_CASE_MODEL.md` — how to cost a proposal without false precision
