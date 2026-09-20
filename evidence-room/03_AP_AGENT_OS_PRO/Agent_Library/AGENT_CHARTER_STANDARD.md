# Agent Charter Standard

**Evidence Room · AP Agent OS · Pro**  
**Document ID:** ER-APOS-LIB-CS  
**Version:** 1.0 · September 2026  
**Classification:** Licensed material  
**Companion:** `00_AGENT_STACK_OVERVIEW.md` · `RESPONSIBILITY_MODEL.md`

---

## 1. Why a standard exists

Sixteen agents will drift unless they are written to the same contract. This document is that contract. Every file `A01`–`A16` must contain every required section, filled with AP-specific content — not a restatement of this standard.

A charter is the answer to seven questions. Each section must answer at least one of them. If a section answers none, delete it or rewrite it.

| Question | Typical sections |
|---|---|
| What should I do? | Purpose, job description, responsibilities, output standard |
| How? | Inputs, tools/systems, failure handling, worked example |
| Who owns it? | Human owner, approval requirements, escalation |
| What can go wrong? | Explicit exclusions, failure handling, escalation |
| How do I control it? | Control requirements, approval by level, exclusions |
| How do I measure it? | KPIs, performance history, cost monitoring |
| What evidence proves it works? | Audit evidence, output standard, performance history |

---

## 2. File rules

| Rule | Requirement |
|---|---|
| Location | `/workspace/evidence-room/03_AP_AGENT_OS_PRO/Agent_Library/` |
| Filename | `Axx_snake_case_name.md` matching the index in the overview |
| Length | 250–450 lines. Shorter is incomplete. Longer is not editing. |
| Voice | Intelligent, concise, executive, finance-native. No hype. |
| Claims | No guaranteed savings, cycle-time, exception, fraud, compliance, or ROI. |
| Statistics | Invent none. Cite Ardent Partners 2024 Best-in-Class (78% lower cost, 82% faster cycle, 59% lower exceptions, 9% exception rate) or Forrester March 2025 AI AP use cases (capture, matching, reporting, fraud management, payment management, e-invoicing/tax), or label **Evidence Room framework / illustrative**. |
| Worked example | Always **Northline Industrial Group** (fictional: 4,200 employees, ~18,000 invoices/month, SAP S/4HANA + one NetSuite entity, 14-person shared-services AP team). Never a real employer or client. |
| ERP | Agnostic. Name SAP, D365, Oracle, NetSuite, Workday, and “other” in the tools section. |
| Autonomy | Starting level is 0 or 1 unless the overview records a written exception (there are none in v1.0). |
| Cross-refs | Use agent IDs (`A03`) and reason codes (`GR-MISS`) from the overview taxonomy. |

---

## 3. Required header block

Every charter opens with this table. Values are instance data, not copies of the standard.

```
# Axx — <Agent name>

| Field | Value |
|---|---|
| Agent ID | Axx |
| Name | <full name> |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | <capture / matching / reporting / fraud management / payment management / e-invoicing-tax / plus Evidence Room extension> |
| Starting autonomy | Level 0 or Level 1 |
| Human owner (role) | <role> |
| Backup owner (role) | <role> |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |
```

---

## 4. Required sections (normative)

A charter that omits a section is not implementation-ready. Section numbers below are the product standard. Keep them so Internal Audit and implementers can diff agents.

### 4.1 Purpose

**One sentence.** Name the job and the boundary.

Fail: “Uses AI to streamline AP.”  
Pass: “Capture inbound invoices from every live channel, extract a structured header and lines, and create a parked work object for validation — without posting or paying.”

### 4.2 Job description

A hiring-grade description: scope, daily rhythm, neighbours (which agents it calls and which call it), and what “done” means at Level 0 vs Level 1. One to four short paragraphs plus a scoped / not-scoped list.

Must state the document population (PO, non-PO, recurring, credit notes, intercompany, employee expenses — in or out).

### 4.3 Inputs / required data

Table of required vs optional fields, source system, and what happens if missing (`HDR-ERR`, hard stop, or degrade). Include inbound-channel list where relevant. Include the work-object fields consumed from upstream agents.

Minimum columns: `Data`, `Required?`, `Source`, `If missing`.

### 4.4 Tools / systems

ERP-agnostic mapping table with at least: SAP S/4HANA, D365, Oracle Fusion, NetSuite, Workday, Other. Plus capture, tax, mail, workflow, and bank tools where the job needs them.

State **read** vs **write** vs **write-never**. Payment file and bank-detail writes are write-never for every agent except the human payments process.

### 4.5 Responsibilities

Numbered. Each item is an action the agent performs at its *current default starting level*, with a note on what changes at Level 2+. Prefer verbs finance recognises: park, match, age, accrue, reconcile, chase, challenge, escalate.

### 4.6 Explicit exclusions

The “must NEVER” list. Mandatory inclusions for every agent:

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in examples or prompts shipped with the product.

Then add job-specific exclusions (A10 never silently deletes a suspected duplicate; A08 never changes vendor bank details without the configured human approval; A13 never signs the close).

### 4.7 Human owner

Named **role**, backup role, and the decision rights that cannot be delegated to the agent. Name the Northline person only in the worked example, not as a product default.

### 4.8 Approval requirements by autonomy level

A five-row table (Levels 0–4) with: what the agent may do, what the human must approve, and the artefact that proves approval. Copy the responsibility model; do not soften it.

### 4.9 Escalation criteria

Hard triggers (value, age, reason code, SOD, completeness break) and where the object goes (role + agent). Include the A16 path. Include a “do not escalate” line for noise.

### 4.10 Output standard

Exact artefacts: object types, filenames or report IDs, field lists, and “done” criteria. An implementer should be able to build the object without a workshop.

### 4.11 Control requirements

Policy versions, SOD, sampling, change control, completeness, untrusted-input handling. Tie to the stack spine in the overview.

### 4.12 Audit evidence to retain

What Internal Audit can pull, from where, for how long (state “follow local financial-record retention; do not assume a year count”). Include override classification and envelope-break logs.

### 4.13 KPIs

Four families. No vanity metrics.

| Family | Question |
|---|---|
| Activity | Did it touch the work? |
| Operational | Did the process move? |
| Financial | Did money move correctly? |
| Risk | Did controls hold? |

Each KPI needs: **name, formula, source, cadence, owner, promotion relevance**. If you cannot name the source system, drop the KPI.

### 4.14 Performance history fields

The data model for the monthly score. Include the stack-common fields plus agent-specific fields. These fields are what A16 reads at promotion review.

### 4.15 Starting autonomy level

Restate the default, the envelope (if any — usually none at start), and the first promotion target. Link to `RESPONSIBILITY_MODEL.md`. Do not invent a Level 2 start.

### 4.16 Failure handling

Table of failure modes: extract garbage, ERP timeout, ambiguous vendor, mail bounce, model outage, conflicting ledger vs extract, poison PDF. For each: detect, degrade, notify, resume.

### 4.17 Cost monitoring

Unit costs the owner must see: compute/API per object, human minutes, false-positive hours, rework documents, idle running. Who reports (usually A14) and who acts.

### 4.18 Worked example — Northline Industrial Group

A specific document or week, with fictional IDs and amounts, showing:

- the trigger
- the objects created
- the human action at the starting level
- what would have been illegal at a higher level
- the artefact names
- one thing that goes wrong and how it is controlled

Do not use a real company. Do not imply Northline is a customer.

---

## 5. Optional but recommended blocks

Use when they add control or implementation value. Do not add them as decoration.

| Block | Use when |
|---|---|
| Decision table | Matching, triage, payment challenge, close |
| State machine | Objects with waiting-external states (A05, A08, A09, A11) |
| Reason-code subset | Agent owns a slice of the taxonomy |
| Channel list | A01, A08, A14 |
| Sample plan | Any agent proposed for Level 3 later |
| Cross-ledger notes | Population exists in more than one book (Northline SAP + NetSuite) |

---

## 6. Shared field libraries (copy, then specialise)

### 6.1 Common performance-history fields

Every agent includes at least:

```
period_id
agent_id
source_system
company_code
autonomy_level_in_force
objects_in_population
objects_touched
recommendations_issued
recommendations_accepted
recommendations_edited
recommendations_rejected
overrides_agent_error
overrides_policy
overrides_missing_data
overrides_preference
false_positives
false_negatives_known
escalations
envelope_breaks
unauthorised_level_attempts
human_minutes
agent_compute_cost
sample_n
sample_defects
kill_switch_events
review_date
```

### 6.2 Common work-object header

```
object_id
object_type
source_system
source_doc_id
company_code
vendor_id
vendor_alias
amount
currency
due_date
reason_code
autonomy_level_in_force
recommended_action
confidence
evidence_refs[]
human_owner
sla_due
state
parent_object_id
created_by_agent
updated_at
```

### 6.3 Forbidden vanity metrics

Do not put these in a charter KPI table:

- Number of AI conversations / messages / “insights generated”
- Unanchored “accuracy %” (no denominator, no gold set)
- “Hours saved” without a measured baseline and a method
- “Fraud prevented $” that counts *suspected* anomalies
- “Compliance achieved” as a boolean
- NPS of the agent
- Token count as a success metric (token count is a **cost** metric)

---

## 7. Conformance checklist (print at the end of each charter)

Every A01–A16 file ends with this checklist, ticked for that file:

- [ ] Purpose is one sentence and names a boundary
- [ ] Job description names population in / out
- [ ] Inputs table has required/optional and “if missing”
- [ ] Tools table covers SAP, D365, Oracle, NetSuite, Workday, Other, and read/write
- [ ] Responsibilities are verbs at the starting level
- [ ] Exclusions include payment release, fraud conclusion, self-promotion
- [ ] Human owner is a role with a backup
- [ ] Levels 0–4 approval table is present and not softer than the responsibility model
- [ ] Escalation has hard triggers and a do-not-escalate line
- [ ] Outputs are named artefacts with fields
- [ ] Controls include SOD, completeness, change control, untrusted input
- [ ] Audit evidence is pullable
- [ ] KPIs cover activity / operational / financial / risk and name a source
- [ ] Performance history includes the common fields
- [ ] Starting autonomy is 0 or 1
- [ ] Failure handling has detect / degrade / notify / resume
- [ ] Cost monitoring is present
- [ ] Northline example is fictional and specific
- [ ] No guaranteed savings / fraud / compliance / ROI claim
- [ ] Statistics cited or labelled illustrative

A16 may refuse to mark an agent “configurable” until this list is true.

---

## 8. Change control for charters

| Change | Who approves |
|---|---|
| Clarifying text, examples, ERP aliases | Product + AP Manager (customer copy) |
| New exclusion or tighter starting level | AP Manager (always allowed) |
| Looser starting level or removed exclusion | Controller — discouraged; not in product default |
| New reason code | AP Manager + A16 taxonomy owner |
| KPI definition change | AP Manager + Controls (breaks history) |
| Envelope template change | Same as autonomy level that uses it |

Customer copies of charters are versioned. The licensed product files remain the Evidence Room default.

---

## 9. Northline names used across charters (fictional)

Use these consistently. Do not expand into a real org chart.

| Name | Role |
|---|---|
| Priya Menon | AP Manager (A16 owner) |
| Maya Chen | Intake processor (A01) |
| Diego Alvarez | Matching lead (A02/A03) |
| Marcus Hale | Exception lead (A04/A09) |
| Tomoko Sato | Payments lead (A12) |
| Hannah Cole | Reconciliations & close (A11/A13) |
| Samuel Wright | Controls / quality (A10) |
| Lina Park | Vendor master (A08) |
| Owen Briggs | Warehouse liaison (A05) |
| Greta Holm | Procurement operations (A06) |
| Elena Voss | Assistant Controller (A13 sign-off) |

Illustrative vendors: Helion Fasteners NA, Cinder River Logistics, Quay Chemical, Oakbridge Facilities, Veston IT, Pacific Castings (NetSuite entity supplier).  
Illustrative company codes: NL10, NL20, NL30 (SAP); NPC (NetSuite — Northline Pacific Components).

---

## 10. Document control

| Item | Value |
|---|---|
| Owner | Evidence Room — AP Agent OS product |
| Related testing | `../Testing` uses this standard as the charter review checklist |
| Advice status | Not legal, tax, accounting, or investment advice |
