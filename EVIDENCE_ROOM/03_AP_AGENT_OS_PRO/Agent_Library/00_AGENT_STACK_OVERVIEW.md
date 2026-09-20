# Agent Stack Overview — AP Agent OS Professional

**Product:** Evidence Room — AP Agent OS Professional  
**Artifact:** Agent Library · Architecture Overview  
**Audience:** CFO, Controller, Head of AP / Shared Services, Finance Transformation  
**Version:** 1.0

---

## 1. Purpose of this document

This overview defines how the sixteen AP agents form a coherent operating system across invoice-to-pay — what each agent owns, how work moves between them, where humans remain accountable, and how the stack stays ERP-agnostic.

Use it as the architectural reference before configuring individual agent charters (A01–A16), the responsibility model (L0–L4), and the exception taxonomy.

---

## 2. Design principles

| Principle | Operating meaning |
|-----------|-------------------|
| Human accountability first | Agents earn scope. Full autonomy is never the default. Every material AP decision has a named human owner. |
| Payment authorisation stays human | No agent may release, approve, or execute payment. Payment Proposal Review prepares and flags; treasury / AP leadership authorises. |
| Control before speed | Throughput gains that weaken segregation of duties, audit trail, or exception clarity are rejected. |
| ERP-agnostic by construction | Agents consume and produce normalised AP objects (invoice, PO, receipt, vendor, coding, approval, payment proposal). ERP-specific connectors are implementation detail, not product identity. |
| Exception-first operations | Clean straight-through work is measured; value concentrates on classified, owned, aged exceptions. |
| Evidence over narrative | Every material recommendation or action leaves durable evidence: inputs used, rule applied, confidence, human decision, timestamp. |

---

## 3. The sixteen-agent stack

Agents are numbered for governance and KPI mapping, not for rigid sequential batching. Many run in parallel; the Orchestrator sequences handoffs and escalations.

| ID | Agent | Primary job |
|----|-------|-------------|
| A01 | Invoice Intake | Capture, classify, and register inbound invoices into a controlled work queue |
| A02 | Invoice Validation | Verify completeness, coding readiness, tax fields, and supplier identity signals |
| A03 | Matching | Perform PO / non-PO match logic against PO, receipt, and invoice lines |
| A04 | Exception Triage | Classify exceptions, assign owners, set SLA clocks, route work |
| A05 | Goods Receipt | Chase and reconcile receipt evidence for receipt-required invoices |
| A06 | PO Quality | Detect and prevent PO defects that create downstream match failures |
| A07 | Approval | Drive approval routing within DOA; never invent authority |
| A08 | Supplier Resolution | Coordinate supplier queries with configurable human approval gates |
| A09 | Internal Follow-Up | Chase requesters, buyers, and GR clerks with evidence packs |
| A10 | Duplicate & Anomaly | Surface duplicate and anomaly candidates — not a fraud guarantee |
| A11 | Vendor Statement Reconciliation | Reconcile statements to open items and propose discrepancy packs |
| A12 | Payment Proposal Review | Prepare payment batches for human authorisation only |
| A13 | AP Close | Support period-end completeness, accruals signals, and aged WIP |
| A14 | AP Reporting | Produce operating dashboards and exception analytics |
| A15 | Root Cause | Aggregate exception patterns into preventable causes and actions |
| A16 | AP Manager / Orchestrator | Prioritise, sequence, escalate, and govern the agent fleet |

---

## 4. How agents interact

### 4.1 Core invoice flow (happy path)

```
Inbound channel
    → A01 Invoice Intake
    → A02 Invoice Validation
    → A03 Matching
    → [clean match]
    → A07 Approval (if required)
    → A12 Payment Proposal Review (batch prep)
    → Human payment authorisation (outside agent autonomy)
```

### 4.2 Exception path

```
A02 / A03 / A10 / A11 detect defect
    → A04 Exception Triage (classify, own, age)
    → specialised resolver:
         A05 Goods Receipt
         A06 PO Quality
         A07 Approval
         A08 Supplier Resolution
         A09 Internal Follow-Up
         A10 Duplicate & Anomaly (investigation pack)
    → resolution evidence returned to A04
    → invoice returns to A02/A03 or proceeds to A07/A12
```

### 4.3 Analytical / period loop

```
A04 exception ledger + ERP open items
    → A11 Vendor Statement Reconciliation
    → A13 AP Close
    → A14 AP Reporting
    → A15 Root Cause
    → A16 Orchestrator (capacity, pilot scope, promotion/demotion signals)
```

### 4.4 Orchestrator role (A16)

The AP Manager / Orchestrator does **not** replace the Head of AP. It:

- Maintains the workboard: priority queues by value, age, SLA breach risk, and control severity.
- Routes tasks to specialised agents within configured autonomy levels.
- Enforces stop-conditions (auth failure, control break, ambiguous payment outcome, policy gap).
- Surfaces promotion/demotion evidence for the responsibility model.
- Escalates to humans when confidence, amount, vendor risk, or policy requires it.

Humans set policy, approve scope changes, authorise payments, and own residual risk.

---

## 5. Human-in-the-loop principle

Every agent operates inside an explicit autonomy band (L0–L4). Promotion is earned with evidence; demotion is automatic on control failure.

**Always human-owned:**

- Payment authorisation and bank file release  
- Master-data banking changes (final approve)  
- DOA exceptions and override of approval policy  
- Write-offs, credit settlements above threshold, disputed legal positions  
- Agent autonomy promotion beyond L2 (typical gate; organisations may set stricter)  
- Any action that would post irreversible financial impact outside pre-agreed guardrails  

**Typically agent-assisted first:**

- Intake classification and duplicate *candidates*  
- Match suggestions and variance explanations  
- Exception classification and chase drafts  
- Statement discrepancy packs  
- Close checklists and reporting drafts  

The operating rule: *agents prepare; humans decide on material risk; earned autonomy expands only where error rates and controls permit.*

---

## 6. ERP-agnostic integration pattern

### 6.1 Canonical objects

Integrate via a thin **AP object layer**, not ERP screens:

| Object | Minimum fields (illustrative) |
|--------|-------------------------------|
| Invoice header/lines | Supplier, entity, dates, amounts, tax, currency, PO refs, attachments |
| Purchase order | Status, lines, prices, qty, remaining, buyer, entity |
| Goods receipt | Receipt ID, qty, date, PO line link, receiver |
| Vendor master | Legal name, VAT/tax IDs, remit-to, bank tokens (masked), hold flags |
| Coding / dimensions | Cost centre, GL, project, tax code |
| Approval / DOA | Approver, amount band, status, timestamp |
| Payment proposal | Invoice IDs, net amount, pay date, method, hold reasons |
| Exception record | Code, owner, age, status, evidence links |

### 6.2 Connector posture

- **Read-heavy first.** Prefer read APIs / exports for observation and recommendation (L0–L1).  
- **Write with guardrails.** ERP writes (status, coding suggestion accept, park codes) only at L2+ with idempotency keys and dry-run mode.  
- **No dual auth families** where the platform forbids them; follow each ERP’s auth model exactly.  
- **Environment awareness.** Demo/sandbox vs production credentials never mixed.  
- **Idempotent outbound actions.** Re-sends after timeout must not create duplicate ERP documents.

### 6.3 Compatible estates

Designed to sit across Dynamics 365, SAP (ECC/S/4), Oracle Cloud/EBS, NetSuite, Workday Financials, and mid-market ERPs with AP modules — provided invoice, PO, receipt, vendor, and payment proposal data can be read (and optionally written) through API, RPA with controls, or controlled file exchange.

Evidence Room does **not** replace the ERP, OCR vendor, or payment bank gateway. It governs how agents use them.

---

## 7. Control and evidence spine

Across the stack, every material agent output must carry:

1. **Trace ID** linking invoice / exception / batch  
2. **Inputs referenced** (document versions, master-data snapshot IDs)  
3. **Rule or model version**  
4. **Confidence / match quality** where applicable  
5. **Proposed action vs executed action**  
6. **Human decision** (approve / reject / amend) with actor and time  
7. **Retention** aligned to audit policy  

A14 Reporting and A16 Orchestrator consume this spine for KPI and promotion gates.

---

## 8. Suggested sequencing for first deployment

Do not deploy all sixteen at once.

**Pilot wave (typical):** A01 Intake → A02 Validation → A03 Matching → A04 Exception Triage → A10 Duplicate & Anomaly (candidate-only) → A16 Orchestrator (light).

**Second wave:** A05, A09, A07, A14.

**Third wave:** A06, A08, A11, A12 (prep-only), A13, A15.

Expand autonomy only after shadow and controlled pilot gates in `RESPONSIBILITY_MODEL.md`.

---

## 9. Related artifacts

| Artifact | Path |
|----------|------|
| Responsibility model L0–L4 | `Agent_Library/RESPONSIBILITY_MODEL.md` |
| Agent charters A01–A16 | `Agent_Library/A01_…` through `A16_…` |
| Exception taxonomy | `Controls/01_EXCEPTION_TAXONOMY.md` |

---

*Evidence Room — AP Agent OS Professional. Operating layer for AP agents. Not an ERP, not a payment system, not a fraud guarantee.*
