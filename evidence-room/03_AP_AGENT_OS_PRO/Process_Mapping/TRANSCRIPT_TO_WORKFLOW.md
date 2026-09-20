# Transcript to Workflow

**Product:** AP Agent OS — Evidence Room  
**Use after:** Observation and walkthrough transcripts  
**Produces:** Workflow objects that bind to process maps, agents, and test cases  
**Example organisation:** Northline Industrials (fictional)

This document is the conversion method. It turns narrative into objects a second person can implement, test, and govern. It does not generate an SOP by itself; use `SOP_GENERATOR_FRAMEWORK.md` once the workflow is stable.

---

## Conversion rule

A transcript sentence becomes a workflow object only if it names at least one of:

- a **trigger**
- an **actor** (human role or agent)
- a **system**
- an **object** (invoice, PO, GRN, credit note, statement, hold)
- a **decision**
- a **control**
- an **output** (status, message, park reason, evidence pack)

Colour, complaint, and redesign wishes go to the parking lot.

---

## Object model

Use these objects and no others until the process owner adds one.

| Object | Meaning | Typical identifier |
|---|---|---|
| Invoice | Supplier tax invoice or equivalent bill | Invoice number + supplier + entity |
| Credit note | Supplier credit | Credit number + supplier + entity |
| Statement | Supplier account statement | Statement date + supplier + entity |
| Purchase order | Commitment | PO number + line |
| Receipt | Goods or service receipt | Receipt number + PO line |
| Supplier | Trading party in master data | Supplier account (+ site if used) |
| Legal entity | Bill-to company | Entity code |
| Coding block | GL / cost centre / project / tax | Combination as posted |
| Approval | Authorisation instance | Approver + amount + date + system |
| Hold | Payment or process hold | Hold type + setter + reason |
| Exception | Parked variance | Taxonomy code + invoice |
| Evidence pack | Objects an auditor would be handed | Pack id |

Agents may read and draft against these objects. They do not become a new object type.

---

## Eight-pass conversion

Work the transcript in eight passes. Do not combine passes on the first conversion; mixing them recreates narrative.

### Pass 1 — Timeline

List events in time order. Each line: `timestamp or sequence | actor | action | system | object`.

Northline extract:

```
01 | Shared mailbox | Invoice PDF arrives | Mail | Invoice
02 | Processor | Opens PDF, reads bill-to | PDF viewer | Invoice, Legal entity
03 | Processor | Searches supplier + invoice number | ERP | Invoice, Supplier
04 | Processor | Keys header | ERP | Invoice
05 | ERP        | PO match attempted | ERP | Invoice, PO
06 | ERP        | Quantity variance on line 2 | ERP | Exception (quantity mismatch)
07 | Processor | Opens GRN enquiry | ERP | Receipt
08 | Processor | Emails buyer after no GRN | Mail | Exception
```

### Pass 2 — Triggers and exits

Name the start events and the terminal states.

| Trigger | Terminal states |
|---|---|
| Invoice arrives in intake channel | Posted; parked with taxonomy code; returned to supplier; on payment hold; duplicate-closed |
| Credit note arrives | Allocated; parked; returned |
| Statement arrives | Reconciled; discrepancy opened |
| Ageing threshold hit | Escalated; remain in queue with reason |

If a transcript ends at “I sent an email”, the workflow is incomplete. Name the wait state.

### Pass 3 — Decisions

Extract every fork. Format:

```
Decision: <name>
Input: <fields>
Rule: <as stated by operator, then as confirmed by owner>
If unknown: <what they actually do>
Owner: <role>
System of record: <where the yes/no lives>
```

Northline example:

```
Decision: Is this a PO invoice?
Input: PO number on face, supplier history, buyer name
Rule: PO number present and found in ERP → PO path; else non-PO path
If unknown: Processor searches last 3 POs for that supplier; if still unknown, parks as missing PO
Owner: AP processor
System of record: Invoice document type in ERP
```

### Pass 4 — Data contract

For each object, list fields required to move to the next state. Mark source: face of invoice, ERP, buyer, supplier, inferred.

| Field | Object | Source | If missing |
|---|---|---|---|
| Invoice number | Invoice | Face | Quality exception |
| Invoice date | Invoice | Face | Quality exception |
| Bill-to legal name | Invoice | Face | Incorrect legal entity path |
| Supplier account | Supplier | Lookup | Master-data issue |
| PO number | PO | Face or history | Missing PO |
| Line quantity | Invoice / PO / Receipt | Face + ERP | Quantity mismatch or missing receipt |
| Unit price | Invoice / PO | Face + ERP | Price mismatch |
| Bank details on face | Invoice | Face | Banking-change concern if they differ from master |
| Tax amount | Invoice | Face | Tax issue |
| Cost centre (non-PO) | Coding block | Requisition / buyer / standing rule | Coding missing |

Inferred fields are allowed only if the inference rule is written. “We usually use 6400-FIN” is not a rule until the owner writes it.

### Pass 5 — Controls

Convert “I check” into a control row. Use `CONTROL_MAP_TEMPLATE.md`. A check that leaves no evidence is still a control — mark evidence as “none today”.

### Pass 6 — Exceptions

Assign each parked or delayed case a taxonomy code. If two codes apply, pick the one that blocks posting first, and record the second as related.

Order of blocking at Northline (illustrative):

1. Duplicate invoice
2. Wrong supplier / incorrect legal entity
3. Invoice quality / OCR issue
4. Missing or invalid PO
5. Missing or partial receipt
6. Price or quantity mismatch
7. Tax / coding / approval
8. Payment hold and statement issues

This order is an operating choice, not a universal rule. Write the local order.

### Pass 7 — Hands and systems

Translate actors into RACI roles and systems into interfaces.

- Human roles: processor, AP lead, buyer, receiver, master-data steward, tax, controller, treasurer
- Agents: from the sixteen-agent stack only (`../Agent_Library/00_AGENT_STACK_OVERVIEW.md`)
- Systems: intake, ERP, GRN source, tax table, DOA table, mailbox, supplier portal

Every hand-off needs a wait state and a chase path.

### Pass 8 — Workflow statement

Write the workflow as numbered states, not as a paragraph.

Northline PO goods path (compressed):

```
S0 Intake received
S1 Classified as invoice / credit / statement
S2 Entity and supplier identified
S3 Header and lines extracted or keyed
S4 Quality gate
S5 Duplicate gate
S6 PO located and open
S7 Receipt position read
S8 Match attempted (qty, price, amount)
S9 Coding inherited from PO (or exception)
S10 Tax compared
S11 Approval state read (if required beyond PO)
S12 Post or park
S13 Chase if parked
S14 Hold assessment for payment pack (input only)
```

Each state gets: actor, allowed agent action, forbidden action, evidence written, next states.

---

## From workflow to agent tasks

Only after Pass 8.

| State | Candidate agent | Allowed in first release (L0/L1) | Forbidden |
|---|---|---|---|
| S0–S3 | 01 Invoice Intake | File, classify, extract, register | Delete source mail; post |
| S4 | 02 Invoice Validation | Raise completeness / identity / tax-field fail | Override a fail; change tax master |
| S5 | 10 Duplicate & Anomaly | Flag exact and potential duplicates / patterns | Void an invoice; clear a high-value flag |
| S6–S8 | 03 Matching; 05 Goods Receipt; 06 PO Quality | Propose match / mismatch; GR and PO defect packets | Create GR; change PO |
| S9–S10 | 02 Invoice Validation | Propose coding inherit / tax compare flag | Invent a cost centre; write tax master |
| S11 | 07 Approval | Route and chase packets | Approve; edit DOA |
| S12 | 04 Exception Triage | Park with code, owner, clock | Post or waive without human |
| S13 | 08 Supplier Resolution; 09 Internal Follow-up | Draft from templates | Negotiate; treat email as GR/approval |
| S14 | 12 Payment Proposal Review | Annotate hold / unclear candidates | Release payment |

Vendor Statement (11), AP Close (13), AP Reporting (14), Root Cause (15), and Orchestrator (16) attach to periodic or cross-path objects, not to every PO-goods invoice.

---

## Quality tests for a converted workflow

A workflow is ready to map when:

1. A person who was not in the walkthrough can simulate a case at a whiteboard.
2. Every wait has a chase owner and an ageing point.
3. Every park reason is a taxonomy code.
4. Every commit to the ERP names a human role.
5. Personal data used in the workflow is listed.
6. The process owner has initialled the state list.

A workflow is not ready when:

- States are named after agents (“03 Matching runs”)
- Terminal state is “email sent”
- Duplicate check is “processor remembers”
- Legal entity is “obvious from the logo”
- Tolerances are “about five percent” with no table

---

## Worked conversion — Northline mailbox line

**Transcript line:**  
“If it’s Helion I already know the PO, so I don’t search, I just type 451-something from the last delivery and fix it if the match fails.”

**Pass 1:** Processor keys a remembered PO fragment for a familiar supplier.  
**Pass 3:** Decision “locate PO” has an undocumented heuristic.  
**Pass 4:** PO number source is sometimes *inferred*, not from the face.  
**Pass 5:** No control evidence for the inference.  
**Pass 6:** When inference fails it appears as invalid PO or wrong supplier, which mis-tags the root cause.  
**Pass 8:** State S6 must require a PO from the face or a recorded buyer confirmation. Remembered fragments are a finding, not a rule.

**Workflow rule written:**  
PO number is taken from the invoice face or from a buyer-confirmed reference stored on the invoice record. Processor recollection is not a source.

**Agent implication:**  
Invoice Intake proposes PO only from document text or a linked message. Matching does not scrape the operator’s last-used PO list.

---

## Filing

Store, for each process path:

- Source transcript id
- Eight-pass workbook
- State list (Pass 8)
- Agentisation rows
- Open questions
- Process-owner sign-off date

File names follow `NL-I2P-<entity>-<path>-<version>`, for example `NL-I2P-NIL-PO-GOODS-v03`.
