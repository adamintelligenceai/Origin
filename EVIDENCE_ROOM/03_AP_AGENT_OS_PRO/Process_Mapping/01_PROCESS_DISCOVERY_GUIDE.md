# Evidence Room — AP Agent OS Professional

## Process Mapping — 01 Process Discovery Guide

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Process Mapping  
**Standard:** Proof before permission  
**Audience:** Transformation lead, AP Manager, Process Excellence, Internal Audit observer  
**ERP stance:** Agnostic. Replace bracketed system names with the buyer’s register.  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Working instrument for Step 1 (Observe) and the intake to Step 2.

---

### Purpose

Discover the **as-done** AP operation: channels, people, systems, queues, unofficial rules, and where work waits. Discovery that only reads the SOP will produce an agent that automates fiction.

### How to use

1. Complete the pre-discovery register.  
2. Run interviews and live observation using the scripts.  
3. Collect artefacts using the artefact list.  
4. Close with a signed coverage statement before Transcribe.

---

## 1. What to do

Build a current-state picture that a second person can audit:

- Who does the work, by role and named deputy.  
- Which channels invoices enter.  
- Which systems and side-files are touched.  
- Which queues exist and who owns them.  
- Which exception types actually occur (map later to taxonomy codes).  
- Where money-adjacent decisions are made.  
- Where the SOP and the floor disagree.

Do **not** design the agent in this step. Do **not** “fix” the process on the whiteboard and call that discovery.

---

## 2. How

### 2.1 Pre-discovery register (complete before the first interview)

| Field | Instruction | Buyer value |
|---|---|---|
| Legal entities in scope | List, do not say “group” | `[BUYER]` |
| AP locations / towers | Shared service, plant AP, outsourced | `[BUYER]` |
| Invoice volume (last complete quarter) | Count, by entity if available | `[BUYER]` |
| Channels | Email, vendor portal, EDI, scan, punch-out | `[BUYER]` |
| ERP and satellite systems | ERP, OCR/capture, workflow, archive, bank, tax engine | `[BUYER]` |
| Payment runs per week/month | Calendar | `[BUYER]` |
| Current SOP version and date | Or “none” | `[BUYER]` |
| DOA / SoD owner | Named | `[BUYER]` |
| Observation window | Dates | `[BUYER]` |
| Recording permitted? | Yes/No + policy reference | `[BUYER]` |
| Privacy constraints | Personal data, bank data, employee IDs | `[BUYER]` |

### 2.2 Coverage rule

The observation sample must include, if they exist in the operation:

| Must-see | Why |
|---|---|
| At least one invoice per live channel | Channel-specific failure modes |
| PO-match and non-PO | Different controls |
| Missing / partial GR | Highest volume exception in many plants |
| Duplicate or suspected duplicate | Payment risk |
| Credit note | Reverse path |
| High-value item (buyer-defined) | DOA and attention bias |
| Aged item | Work that people hide |
| Month-end or payment-prep day | Different behaviour under deadline |
| One “ask Jane” workaround | Informal control / single point of failure |

If a must-see type does not occur in the window, record **Not observed — scheduled follow-up** rather than assuming it does not exist.

### 2.3 Live observation protocol

**What to do.** Sit with the operator. They work their real queue. The observer is silent except to ask “what are you looking at?” and “what would make you stop?”

**How.**

1. Note start time, operator role, queue name, system screens.  
2. For each invoice: ID (or masked ID), channel, exception if any, systems touched, people contacted, time on task, outcome.  
3. Capture unofficial artefacts: desktop spreadsheets, email folders, chat pins, printed tolerance lists.  
4. Do not correct the operator.  
5. End with a five-minute recap: “I saw X. What did I miss?”

**Who.** Observer (Transformation / Process Excellence); operator; AP Manager available for access issues only.

**What can go wrong.** Operator switches to the training script. Observer coaches. High-value items are pulled out of the sample “because they are sensitive.”

**Control.** AP Manager confirms the queue is production. Observer logs any time the operator left the live queue.

**Measure.** Invoices observed; unofficial artefacts listed; must-see types covered.

**Evidence.** Observation sheet per session (template below).

### 2.4 Interview protocol

Use interviews to explain **why**, not to replace observation.

Hold separate conversations. Do not interview the clerk and the Controller in the same room if that will sanitise the clerk’s answers.

| Session | Duration **ILLUSTRATIVE** | Primary questions |
|---|---|---|
| AP clerk / processor | 45–60 min | Walk one hard invoice from memory. What stops you? Who do you chase? What do you never touch? |
| Exception handler | 45–60 min | Which codes are real vs dumped in “other”? What repeats? What gets paid anyway? |
| AP Manager | 60 min | Queues, SLAs, who is Accountable, what you escalate, what you hide from month-end |
| Procurement / buyer | 30–45 min | PO quality, after-the-fact POs, price changes, vendor picks |
| Goods receipt / warehouse or requester | 30–45 min | Why receipts lag, who can receipt, GRNI fights |
| Payment preparer / Treasury liaison | 30–45 min | Proposal checks, holds, bank-detail changes, who can release |
| Controller / Head of AP | 45 min | DOA, SoD, what “good” means, what must never be automated |
| Tax / master data (if separate) | 30 min | Tax fails, vendor create/change, entity coding |
| Finance Systems | 30 min | Interfaces, failed jobs, who has privileged access |

### 2.5 Artefact collection list

Collect copies or screenshots **only** under the buyer’s information-handling rules. Prefer system extracts over photos.

| Artefact | Minimum content | Owner |
|---|---|---|
| Invoice sample pack | Masked IDs, all must-see types | AP Manager |
| Exception queue export | Reason codes, age, owner, value | AP Manager |
| Open GRNI / uninvoiced receipts | If the ERP holds it | AP / Procurement |
| Payment proposal (last two runs) | Holds, removals, additions | Payment preparer |
| Vendor statement sample | One strategic, one noisy | AP |
| DOA table | Current, dated | Controller |
| SoD / access extract | AP roles vs incompatible pairs | IT / Control |
| Interface failure log | Last 90 days if available | Finance Systems |
| Current SOP / desk aids | Including unofficial | Process owner |
| Month-end close checklist | AP tasks | Controller |

---

## 3. Who

| Role | Responsible for | Not responsible for |
|---|---|---|
| Transformation / Process Excellence lead | Plan, coverage, neutrality | Approving the future agent |
| AP process owner | Access, sample selection, sign-off that the sample is real | Writing the target operating model during discovery |
| Operators | Working normally | Designing controls |
| Control owner | Confirming control points were visible | Running interviews |
| Privacy / InfoSec | Redaction and storage rules | Process content |
| Internal Audit | Optional observation of method | Performing discovery |

---

## 4. What can go wrong

| Failure | Why it matters | Detection |
|---|---|---|
| Discovery is a workshop, not observation | Agents inherit the slide, not the work | No invoice-level observation sheets |
| Sample is “clean” invoices | Exception agents fail in week one | Must-see checklist incomplete |
| Single-site discovery for a multi-entity group | Hidden entity-specific tax/DOA rules | Entity list vs sessions attended |
| Outsourcer excluded | Real work is off-site | Contracted tower not in register |
| Unofficial files ignored | Agent will not see the real rule | Artefact list has only ERP extracts |
| Discovery scoped to “AI opportunities” | Confirmation bias | Agenda mentions use cases before as-done map |
| Personal or bank data stored in the project folder | Privacy incident | Privacy review of the evidence store |

---

## 5. Control

Discovery is not complete until all of the following are true:

1. Pre-discovery register filled (no blank mandatory fields).  
2. Must-see coverage statement signed (observed / not observed + follow-up date).  
3. Unofficial artefact inventory attached, even if “none found” (that statement is itself evidence).  
4. Privacy review of stored samples.  
5. Process owner signature: “This sample is production work, not a demonstration.”

A discovery pack without those five items cannot open Step 2.

---

## 6. Measure

| Metric | Definition | Source |
|---|---|---|
| Sessions completed vs planned | Count | Calendar |
| Invoices observed | Count, by channel and type | Observation sheets |
| Must-see coverage | % of required types observed or formally deferred | Coverage statement |
| Unofficial artefacts found | Count | Artefact inventory |
| Open questions | Count still unanswered at close | Question log |
| Policy gaps found | Stated rule with no written policy (e.g. unquantified tolerance) | Gap list |

Do not report “insights generated.” That is not a measure.

---

## 7. Evidence

Store under `[BUYER]/Evidence/Observe/`:

- Pre-discovery register  
- Observation sheets  
- Interview notes (or pointer to transcripts if already in Step 2)  
- Artefact inventory and file pointers  
- Coverage statement (signed)  
- Privacy review  
- Question and gap log  

Retention follows `../Governance/00_GOVERNANCE_FRAMEWORK.md` (evidence retention).

---

## Templates

### A. Observation sheet

```
Session ID:          [ ]
Date / time:         [ ]
Legal entity:        [ ]
Operator role:       [ ]
Queue / worklist:    [ ]
Channel(s):          [ ]
Systems in view:     [ ]
Unofficial files:    [ ]
Production confirmed by: [name]

Invoice / item ID (masked): [ ]
Type (PO / non-PO / CN / other): [ ]
Taxonomy hint (if known): [ ]
Steps actually taken: [ ]
Systems touched: [ ]
People contacted (role): [ ]
Decision / rule spoken: [ ]
Wait / blockage: [ ]
Outcome: [ ]
Elapsed minutes: [ ]
Observer notes (no coaching): [ ]
```

### B. Interview note header

```
Session ID:     [ ]
Role:           [ ]
Name:           [ ]   (or “role only” if privacy requires)
Consent:        recorded / notes only
Date:           [ ]
Interviewer:    [ ]

Q1  Walk a difficult item from last week.
Q2  What do you never approve, post, or send?
Q3  Who is the real approver when the named approver is away?
Q4  Which reason codes are junk?
Q5  What would break if you were absent for two weeks?
Q6  What do you check before a payment run that is not in the SOP?

Spoken rules (quote): [ ]
Systems named:        [ ]
Exceptions named:     [ ]
Dependencies named:   [ ]
Disputes with SOP:    [ ]
```

### C. Coverage statement

```
I confirm the discovery sample is production work for the entities listed.
Must-see types observed:     [list]
Must-see types not observed: [list + follow-up date]
Unofficial artefacts:        [count + pointer]
I have not directed operators to demonstrate a target process.

Process owner: [name, date]
Discovery lead: [name, date]
Privacy review: [name, date]
```

### D. Question and policy-gap log

| ID | Source (session) | Question or gap | Owner | Due | Status |
|---|---|---|---|---|---|
| Q-001 | | | | | Open |

---

## ACME walkthrough — ILLUSTRATIVE

ACME Industrial Holdings, three legal entities, one shared-services AP tower.

Discovery lead spends four days at the tower and one morning at Plant North goods-in. Observation covers email intake, vendor portal, and a weekly EDI file. Must-see “intercompany” is not seen; follow-up booked for the next intercompany run. Unofficial artefacts: a spreadsheet titled `tolerances_do_not_delete.xlsx` on a shared drive, and a Teams pin listing who covers whose approvals. Those two artefacts become Extract objects. No agent is designed this week.

---

## Related documents

- `00_METHODOLOGY.md` — Step 1 in the ten-step sequence  
- `02_TRANSCRIPT_TO_WORKFLOW.md` — next step  
- `../Controls/03_EXCEPTION_TAXONOMY.md` — codes used after Extract  
- `../Governance/00_GOVERNANCE_FRAMEWORK.md` — privacy, retention, access  

---

*End of 01_PROCESS_DISCOVERY_GUIDE.md*
