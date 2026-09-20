# AP Agent OS — 16-Agent Stack Overview

**Product:** Evidence Room — AP Agent OS (digital toolkit, not software)  
**Audience:** Finance Transformation lead, AP Manager, Controller, Internal Audit, IT/ERP owner  
**Use:** Specify, charter, and govern a portfolio of AP agents. This document is the architectural brief. Individual agent files are the working specifications.  
**Principle:** Agents earn responsibility. The default is never full autonomy. Payment authorisation always remains human.

---

## 1. What this stack is — and is not

AP Agent OS is an operating design for accounts payable work. It defines sixteen named roles, the handoffs between them, the evidence each must produce, and the human decisions that never leave the control environment.

It is not an ERP module, a bot catalogue, or a promise that invoices will post themselves. It does not replace the general ledger, the bank, the delegation of authority, or the people who sign payment runs.

A Finance Transformation lead should be able to take this overview on Monday, assign owners, and open the individual agent charters the same week. Implementation may use any combination of ERP workflow, RPA, document capture, iPaaS, and human procedures. The architecture is ERP-agnostic: SAP, Oracle, Dynamics 365, NetSuite, and Workday all map to the same roles.

---

## 2. Design principles

1. **Observe before you act.** Every agent starts at L0 (Observe) or L1 (Recommend). Promotion is evidence-gated. See `AUTONOMY_PROGRESSION.md`.
2. **Prepare is not execute.** L2 means a complete packet sits with a named human. Nothing posts, pays, or changes master data at L2.
3. **Guardrails are written, not implied.** L3 is limited to pre-approved, low-risk actions with hard stops. L4 is exception-based oversight of that same bounded set — not a new class of work.
4. **Payment authorisation is not an agent job.** The Payment Proposal Review Agent may annotate a proposal. It may not release, approve, or transmit payment.
5. **Duplicate & Anomaly is a signal, not a verdict.** Flags are hypotheses. They do not constitute fraud detection, and they do not authorise a hold or a release on their own.
6. **One human owner per agent.** Accountability does not sit with “the SSC” or “Finance.” It sits with a named role.
7. **Exclusions are as important as duties.** If an action is not listed, the agent does not do it.
8. **Cost is a control.** Token, licence, and exception-handling cost are monitored. An agent that is expensive and wrong is retired or demoted, not scaled.

---

## 3. The five-stage autonomy model

| Level | Name | Agent may | Agent may not | Human role |
|---|---|---|---|---|
| L0 | Observe | Read, classify, log, produce shadow reports | Recommend a specific action as the system of record | Reviews reports; no reliance |
| L1 | Recommend | Propose an action with rationale and evidence | Change ERP state; contact counterparties as the company | Accepts, edits, or rejects each recommendation |
| L2 | Prepare | Assemble a complete, ready-to-act packet; draft communications | Execute the action; send external mail without approval | Approves the packet, then a human or downstream control executes |
| L3 | Execute within guardrails | Perform a named, pre-approved, low-risk action inside written limits | Act outside the limit table; touch payment release; change bank details | Samples, exception review, limit maintenance |
| L4 | Managed autonomy | Same bounded actions as L3, with exception-only human review | Expand its own scope; authorise payment; change policy | Oversight by exception; periodic recertification |

Default for a new agent is **L0 or L1**. No agent is commissioned at L3 or L4. Payment-related actions have a hard ceiling: recommendation and preparation only.

---

## 4. The sixteen agents

| ID | Agent | Primary job | Default autonomy | Typical human owner |
|---|---|---|---|---|
| 01 | Invoice Intake | Capture, classify, extract, and register inbound invoices | L1 | AP Operations Lead |
| 02 | Invoice Validation | Test completeness, supplier identity, tax fields, and posting readiness | L1 | AP Quality Lead |
| 03 | Matching | Apply 2-way / 3-way / GR-IR match logic and tolerance | L1 | AP Match Lead |
| 04 | Exception Triage | Classify breaks, assign owner, set next action and SLA | L1 | Exception Desk Lead |
| 05 | Goods Receipt | Detect missing or aged receipts and assemble receiver packets | L1 | Plant / Warehouse Finance Liaison |
| 06 | PO Quality | Detect PO defects that will become AP exceptions | L0 | Procurement Operations Lead |
| 07 | Approval | Route non-PO and over-tolerance items per DOA; chase packets | L1 | AP Approvals Coordinator |
| 08 | Supplier Resolution | Draft supplier queries; track replies; never commit the company | L1 | Vendor Master / AP Supplier Desk |
| 09 | Internal Follow-up | Chase unresponsive internal owners with a complete fact pack | L1 | Exception Desk Lead |
| 10 | Duplicate & Anomaly | Flag possible duplicates and unusual patterns for human review | L0 | AP Controls Lead |
| 11 | Vendor Statement | Reconcile supplier statements to the AP subledger | L1 | AP Reconciliations Lead |
| 12 | Payment Proposal Review | Annotate payment proposals; never authorise payment | L1 | Treasury / AP Payments Lead |
| 13 | AP Close | Drive the period-end checklist and accrual candidate list | L1 | Assistant Controller — Payables |
| 14 | AP Reporting | Produce operational and control reports from defined sources | L1 | AP Analytics / Controller's office |
| 15 | Root Cause | Cluster exceptions and propose process fixes | L0 | Finance Transformation Lead |
| 16 | Orchestrator | Sequence work, enforce SLAs, and record handoffs | L1 | AP Process Owner |

Each agent has a full specification in this folder. Do not charter an agent from this table alone.

---

## 5. How work moves through the stack

### 5.1 Invoice lifecycle (operational path)

```
Inbound invoice
    │
    ▼
[01 Intake] ──extract / classify──► [02 Validation]
    │                                    │
    │                                    ▼
    │                            [10 Duplicate & Anomaly]  (parallel signal)
    │                                    │
    │                                    ▼
    │                              [03 Matching]
    │                               /    |    \
    │                              /     |     \
    │                    clean match   break    non-PO
    │                         │         │         │
    │                         ▼         ▼         ▼
    │                    ready queue  [04 Triage] [07 Approval]
    │                                   │
    │                    ┌──────────────┼──────────────┐
    │                    ▼              ▼              ▼
    │               [05 GR]       [06 PO Quality]  [08 Supplier]
    │                    │              │              │
    │                    └──────────────┼──────────────┘
    │                                   ▼
    │                            [09 Internal Follow-up]
    │                                   │
    │                                   ▼
    │                         resolved → return to [03] or [07]
    │
Periodic / event-driven (not every invoice)
    │
    ├─ [11 Vendor Statement]  (weekly / on statement receipt)
    ├─ [12 Payment Proposal Review]  (each proposed payment run)
    ├─ [13 AP Close]  (period-end)
    ├─ [14 AP Reporting]  (daily ops / weekly control / monthly pack)
    └─ [15 Root Cause]  (weekly cluster, monthly recommendation)

[16 Orchestrator] sits across all of the above: work object, owner, SLA, status, evidence link.
```

### 5.2 Interaction rules

- **Intake does not decide match.** It produces a validated capture record or a capture exception.
- **Validation does not post.** It produces a pass / fail / query against a written checklist.
- **Matching does not invent receipts or POs.** Missing GR or defective PO is handed to Agents 05 and 06.
- **Triage does not resolve.** It names the break type, the owner, the next action, and the clock.
- **Supplier Resolution drafts; humans send or approve sending.** No commercial commitment in an agent draft.
- **Duplicate & Anomaly never releases or pays.** A flag adds a review task. Clearing the flag is human.
- **Payment Proposal Review annotates.** Dual human approvers release the run.
- **Orchestrator routes and records.** It does not post invoices, change vendors, or release cash.
- **Root Cause does not implement process change.** It proposes. Process owners accept or reject.

### 5.3 Work object

Every invoice, exception, statement line, and payment-proposal line is a **work object** with:

| Field | Purpose |
|---|---|
| Object ID | Stable identifier (invoice, exception, statement item, proposal line) |
| Source system | ERP company, legal entity, source mailbox, or portal |
| Current agent | Which agent is accountable for the next action |
| Human owner | Named role or named person |
| Status | `new / in_review / waiting_internal / waiting_supplier / ready / held / closed` |
| Autonomy context | Level in force for this object type |
| Evidence pack URI | Link to extraction, match worksheet, correspondence, approval |
| SLA clock | Start, due, breach |
| Escalation state | None / L1 / L2 / L3 as defined in the owning agent spec |
| Cost token | Capture, match, exception-minutes, model-cost estimate |

The Orchestrator is the system of record for work-object state. ERP remains the system of record for accounting.

---

## 6. RACI across the stack

R = does the work · A = owns the outcome · C = consulted · I = informed  
“Agent” in the R column means the agent prepares or recommends; a human still A-owns.

### 6.1 Invoice-to-match

| Activity | Intake | Validation | Matching | Triage | Dup/Anom | AP Ops Lead | Controller | Internal Audit |
|---|---|---|---|---|---|---|---|---|
| Capture & extract | R | C | I | I | I | A | I | I |
| Completeness / tax field check | C | R | I | I | C | A | C | I |
| Duplicate / anomaly flag | I | C | C | I | R | A | I | I |
| 2-way / 3-way match | I | C | R | I | C | A | I | I |
| Tolerance application | I | I | R | I | I | A | C | I |
| Exception classification | I | C | C | R | C | A | I | I |
| Post invoice (ERP) | — | — | C* | — | — | R/A | I | I |

\*Matching may recommend post at L1/L2. Posting at L3 is only for a pre-approved clean-match class after evidence gates. Controller remains A for the posting policy.

### 6.2 Exception resolution

| Activity | GR | PO Quality | Approval | Supplier Res | Internal FU | Exception Lead | Buyer / Receiver | Plant Controller |
|---|---|---|---|---|---|---|---|---|
| Missing GR chase pack | R | I | I | I | C | A | C | I |
| PO defect diagnosis | I | R | I | I | C | A | C | I |
| DOA routing packet | I | I | R | I | C | A | C | C |
| Supplier query draft | I | C | I | R | I | A | C | I |
| Internal chase | C | C | C | I | R | A | R (response) | I |
| Write-off / concession | — | — | — | C | I | C | C | A |

### 6.3 Periodic control

| Activity | Vendor Stmt | Pymt Review | Close | Reporting | Root Cause | Orchestrator | AP Mgr | Treasury | Controller |
|---|---|---|---|---|---|---|---|---|---|
| Statement reconcile | R | I | C | I | C | I | A | I | I |
| Annotate payment proposal | I | R | I | I | I | I | C | A* | I |
| Authorise / release payment | — | — | — | — | — | — | C | **Human R/A** | C |
| Close checklist & accruals | C | I | R | C | C | I | C | I | A |
| Ops / control pack | I | I | C | R | C | I | C | I | A |
| Process-fix proposal | C | C | C | C | R | I | C | I | A |
| Work routing & SLA | I | I | I | I | I | R | A | I | I |

\*Treasury (or the named Payments Lead) is accountable for the integrity of the *proposal review*. Authorisation of the run is a separate human control and is never an agent R or A.

---

## 7. What stays human — non-negotiable

These decisions are outside every agent’s authority, at every autonomy level:

1. **Payment authorisation and release.** Dual (or policy-specified) human approval. Bank file transmission. Positive Pay exception decisions.
2. **Vendor bank-detail create or change.** Any payment-method or beneficiary-account change.
3. **New vendor creation (or its approval).** Agents may assemble a request pack. They do not create the vendor.
4. **Delegation of authority changes.** Limit tables, substitute approvers, and emergency DOA are human policy.
5. **Tolerance and match-policy changes.** Agents apply the table; they do not edit it.
6. **Period-close attestation.** The Controller (or delegate) signs the close. Agent 13 prepares the file.
7. **Write-off, credit, and commercial concession above the written threshold.**
8. **Tax position on ambiguous or cross-border invoices.** Agent 02 flags; Tax decides.
9. **Legal dispute, formal collection, or settlement language.**
10. **Clearing a high-value duplicate or anomaly flag.** Agent 10 raises; a named control owner clears.
11. **Override of a payment hold placed by policy** (audit hold, stop-pay, sanctioned-party review).
12. **Expansion of an agent’s own scope or autonomy level.** Promotion follows `AUTONOMY_PROGRESSION.md`.

If a vendor, integrator, or internal team proposes that an agent “just release the run if everything looks fine,” the answer is no.

---

## 8. Shared services operating picture — Northline Industrials

Northline Industrials is a fictional mid-market manufacturer used throughout this library. Figures are illustrative, not a benchmark and not a promise.

| Item | Value |
|---|---|
| Business | Precision fasteners, fabricated assemblies, industrial MRO components |
| Legal entities | US (Dayton OH HQ + plant), US (Birmingham AL), Canada (Hamilton ON), Mexico (Monterrey) |
| ERP | Dynamics 365 Finance; shared services on a single AP instance with four company codes |
| Volume | 15,000 invoices / month (~180,000 / year) |
| Active vendors | ~2,400 |
| Invoice mix | 72% PO; 18% non-PO services; 7% utilities / rent / recurring; 3% other (T&E out of scope) |
| Match policy | 3-way for inventory and direct materials; 2-way for contracted services ≤ $10,000; GR-based consignment |
| SSC | Cleveland; 18 AP specialists, 3 team leads, AP Manager; plant finance liaisons at four sites |
| Payment runs | Tuesday and Thursday; dual human approval; Positive Pay |
| Currencies | USD, CAD, MXN |
| Tax regimes | US sales/use, Canadian GST/HST, Mexican IVA |
| Starting baseline (observational) | First-time match 61%; exception rate 28%; average cycle 9.4 days; duplicate-suspect rate 0.8% of invoices |

The stack is commissioned in waves, not as sixteen concurrent L3 agents.

**Wave 1 (observe and recommend):** Agents 01, 02, 03, 04, 10, 16 — L0/L1.  
**Wave 2 (prepare):** Agents 05, 07, 08, 09, 12 — L1, selected object types to L2.  
**Wave 3 (periodic):** Agents 11, 13, 14, 15, 06 — L0/L1.  
**Wave 4 (earned execute):** Only clean-match posting and low-risk reminder send, and only after evidence gates in `AUTONOMY_PROGRESSION.md`.

Northline does not set a savings target as a success criterion for commissioning. Success is defined as evidence quality, cycle-time visibility, exception-mix clarity, and control completeness. Any later cost discussion is a management judgement, not an agent KPI that implies guaranteed savings.

---

## 9. Control environment the stack must respect

| Control | How the stack treats it |
|---|---|
| Delegation of authority | Agent 07 applies the table; does not edit it |
| Segregation of duties | Intake/match vs. payment release vs. vendor master vs. bank file remain separate human roles |
| Three-way match policy | Agent 03 applies; Agents 05/06 explain breaks; humans resolve policy exceptions |
| Vendor master dual control | Agent 08 never writes bank details; change packs go to Vendor Master |
| Duplicate review | Agent 10 flags; AP Controls Lead clears above threshold |
| Payment dual approval | Agent 12 annotates; two humans release |
| Period-end cut-off | Agent 13 lists candidates; Controller attests |
| Audit trail | Every agent writes an evidence record (see each spec) |
| Access | Agents use service accounts with least privilege, logged, and reviewed quarterly |
| Model / prompt change | Treated as a change-controlled configuration, not an informal tweak |

This toolkit does not assert that use of the stack constitutes compliance with any standard. It produces evidence that a control owner can present. The control owner decides sufficiency.

---

## 10. Data domains the stack consumes

| Domain | Typical sources | Consumed by |
|---|---|---|
| Invoice image / XML / EDI / PDF | Email, vendor portal, OCR/IDR, cXML, EDI 810 | 01, 02, 10 |
| Capture extract | IDR / human keying | 01, 02, 03, 10 |
| Vendor master | ERP | 02, 08, 10, 11, 12 |
| PO / contract / outline agreement | ERP / CLM | 03, 06, 07 |
| Goods receipt / service entry | ERP / WMS | 03, 05 |
| AP open items / parked documents | ERP | 03, 04, 11, 12, 13 |
| Approval log / DOA table | ERP / workflow | 07, 12 |
| Payment proposal / payment batch | ERP / treasury | 12 |
| Vendor statements | Email / portal | 11 |
| Correspondence | Shared mailbox / ticket | 08, 09 |
| GL / close calendar | ERP / close manager | 13, 14 |
| Exception history | Orchestrator store | 04, 15, 16 |

Comma-separated or multi-ID queries against ERP APIs must follow that ERP’s own parameter rules. Do not assume one client wrapper fits every host.

---

## 11. What “good” looks like at 90 days (Northline, Wave 1)

These are operating-discipline measures, not financial promises.

| Measure | Intent |
|---|---|
| Every inbound invoice has a work object within the Intake SLA | Completeness of capture |
| Validation fail reasons are coded, not free-text only | Exception mix is analysable |
| Match worksheets exist for a defined sample of PO invoices | Matching is inspectable |
| Duplicate flags have a clear / confirm / escalate outcome recorded | No silent ignore |
| Orchestrator can show aging by owner, not only by queue | Management visibility |
| No payment released without two human approvers | Control held |
| Autonomy register shows every agent at L0 or L1 | No silent promotion |
| Cost per 1,000 invoices (licence + model + exception minutes) is recorded | Cost is visible |

If first-time match or cycle time moves, that is an observed outcome. It is not a commissioning target that implies the stack “delivers ROI.”

---

## 12. How to use this library on Monday

1. Appoint the AP Process Owner (Orchestrator A) and the AP Controls Lead (Duplicate & Anomaly A).
2. Complete a charter from `AGENT_CHARTER_TEMPLATE.md` for Agents 01, 02, 03, 04, 10, and 16 only.
3. Apply `HUMAN_VS_AGENT_DECISION_FRAMEWORK.md` to ten recent exceptions and one payment run. Record where the human must remain.
4. Stand the agents at L0 for two weeks: shadow reports, no recommendations in the system of record.
5. Promote individually to L1 only when the evidence gates in `AUTONOMY_PROGRESSION.md` are met.
6. Do not open Agents 12 or 13 at anything above L1. Do not discuss L3 for payment-adjacent work.
7. Schedule a 30-day control review with Internal Audit as an observer, not as the operator.

---

## 13. File map

| File | Contents |
|---|---|
| `00_AGENT_STACK_OVERVIEW.md` | This document |
| `AGENT_01_INVOICE_INTAKE.md` … `AGENT_16_ORCHESTRATOR.md` | Working specifications |
| `AGENT_CHARTER_TEMPLATE.md` | Blank charter + completed Matching Agent example |
| `HUMAN_VS_AGENT_DECISION_FRAMEWORK.md` | Decision rights, examples, refusal rules |
| `AUTONOMY_PROGRESSION.md` | Evidence gates from L0 to L4 |

---

## 14. Language discipline

Do not write, present, or allow vendors to write:

- guaranteed savings, guaranteed cycle-time reduction, or ROI
- fraud detection, fraud prevention, or “the agent will catch fraud”
- compliance as an outcome of using the stack
- accounting accuracy as a property of the agent
- autonomous payment safety
- “touchless AP” as a committed operating state

Write instead: observed rates, sampled accuracy, evidence completeness, hold rates awaiting human decision, and control exceptions.

---

## 15. Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Agent Library — stack overview |
| Owner | AP Process Owner (named at commissioning) |
| Review cadence | Quarterly, or when an agent is promoted |
| Related | All files in this folder |
| Fictional operating example | Northline Industrials |
| Status | Working specification |
