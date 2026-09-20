# AP Agent Stack Overview

**Evidence Room · AP Agent OS · Pro**  
**Document ID:** ER-APOS-LIB-00  
**Version:** 1.0 · September 2026  
**Classification:** Licensed material  
**Audience:** AP Manager, Controller, Internal Audit, Systems Owner  
**Companion files:** `AGENT_CHARTER_STANDARD.md` · `RESPONSIBILITY_MODEL.md` · A01–A16 charters

---

## 1. What this library is

This library is the operating specification for sixteen named AP agents. Each agent has one job, one human owner, a defined starting autonomy level, and a written list of things it must never do.

The stack is ERP-agnostic. It is designed to sit beside SAP S/4HANA, Microsoft Dynamics 365, Oracle Fusion Cloud, NetSuite, Workday, and equivalent payables ledgers. Agents do not replace the ledger. They read from it, prepare work for it, and — only after earned promotion and an explicit control decision — write to it within guardrails.

This is not a chatbot overlay. It is a responsibility model for invoice-to-pay work: who does what, at what autonomy, with what evidence.

Forrester (March 2025) maps current AI use in accounts payable to six clusters: capture, matching, reporting, fraud management, payment management, and e-invoicing/tax. The sixteen agents below cover those clusters and add the work Forrester’s list does not name: exception triage, goods-receipt chase, PO quality, supplier and internal follow-up, vendor-statement reconciliation, period close, and root-cause. Fraud-adjacent work is limited to duplicate and anomaly screening. It is not a fraud-detection guarantee.

---

## 2. Design rules

1. **One job per agent.** An agent that extracts invoice fields does not release a payment. An agent that flags a duplicate does not conclude fraud. An agent that prepares a close checklist does not sign the close.
2. **Responsibility is earned.** Every agent starts at Level 0 (Observe) or Level 1 (Recommend). Promotion requires measured history, not a vendor demo. See `RESPONSIBILITY_MODEL.md`.
3. **Full autonomy is never the default.** Level 4 is a scoped, time-boxed privilege for a named population of documents. It is not a product setting you switch on at go-live.
4. **Payment authorisation stays human.** The Payment Proposal Review Agent may assemble, score, and challenge a proposal. A human releases the payment file, bank batch, or positive-pay file.
5. **Supplier master changes stay human unless a written policy says otherwise.** The Supplier Resolution Agent drafts communications and change requests. Creation, bank-detail change, and tax-ID change require a named approver. That approval may be configured; the default is human.
6. **No agent is a control.** Agents produce evidence that controls operated. Internal Audit still tests the control. SOX / ICFR ownership remains with the process owner.
7. **ERP is the book of record.** If the agent and the ledger disagree, the ledger wins until a human posts a correcting document.
8. **No guaranteed savings, cycle-time, exception, fraud, compliance, or ROI claims.** Ardent Partners (2024) reports that Best-in-Class AP organisations run at 78% lower cost, 82% faster cycle time, and 59% lower exceptions than their peers, with a 9% exception rate. Those are industry observations, not a forecast for this stack. Measure your own baseline before you claim a result.

---

## 3. The sixteen agents

| ID | Agent | Primary job | Starts at | Human owner |
|---|---|---|---|---|
| A01 | Invoice Intake | Capture, classify, extract, and park inbound invoices | 1 | AP Intake Lead |
| A02 | Invoice Validation | Test completeness, tax, vendor, currency, and coding readiness | 1 | AP Quality Lead |
| A03 | Matching | 2-way / 3-way match, tolerances, multi-line allocation | 1 | AP Matching Lead |
| A04 | Exception Triage | Classify, route, and age exceptions | 1 | AP Exception Lead |
| A05 | Goods Receipt | Detect missing / late / split GRs and chase receivers | 0 | Warehouse / Receiving Lead |
| A06 | PO Quality | Detect POs that will fail match before the invoice arrives | 0 | Procurement Operations |
| A07 | Approval | Route, remind, and evidence non-PO and exception approvals | 0 | AP Manager |
| A08 | Supplier Resolution | Draft supplier queries; propose master-data fixes | 1 | Vendor Master / AP Communications |
| A09 | Internal Follow-Up | Chase requesters, buyers, and receivers | 1 | AP Exception Lead |
| A10 | Duplicate & Anomaly | Screen for duplicates and unusual patterns | 1 | AP Controls Lead |
| A11 | Vendor Statement Reconciliation | Match statements to open items and disputes | 0 | AP Reconciliations |
| A12 | Payment Proposal Review | Challenge the payment proposal before human release | 0 | Payments Lead |
| A13 | AP Close | Drive the period-close checklist and accrual completeness | 0 | Assistant Controller / AP Manager |
| A14 | AP Reporting | Produce the operating pack from ledger facts | 1 | AP Manager |
| A15 | Root Cause | Cluster repeating exceptions and propose process fixes | 0 | AP Manager / Process Excellence |
| A16 | AP Manager / Orchestrator | Queue, SLA, hand-off, and autonomy-gate supervision | 1 | AP Manager |

A16 is not a seventeenth processor. It is the dispatcher and the conscience of the stack: it assigns work, enforces autonomy gates, and escalates when an agent is outside its charter.

---

## 4. How they interact

### 4.1 Invoice path (happy path)

```
Inbound invoice
    → A01 Intake          capture, classify, extract, create parked document
    → A10 Duplicate       early duplicate / anomaly screen (blocks or flags)
    → A02 Validation      completeness, tax, vendor, currency, coding
    → A03 Matching        2-way or 3-way against PO / GR
    → A07 Approval        only if policy requires (non-PO, over-tolerance, new vendor)
    → Ledger post         human or Level-3 agent under guardrails
    → A12 Payment review  proposal challenge; human releases
```

A01 may call A10 before extraction is complete when a header-level duplicate is obvious (same vendor + invoice number + amount). A10 also runs after A02 once lines are reliable.

### 4.2 Exception path

```
A02 or A03 or A10 raises exception
    → A04 Triage          assign reason code, owner, SLA, next action
        ├─ GR missing / split     → A05 Goods Receipt
        ├─ PO incomplete / wrong  → A06 PO Quality + buyer
        ├─ Supplier data / invoice error → A08 Supplier Resolution
        ├─ Requester / receiver silence  → A09 Internal Follow-Up
        ├─ Duplicate / anomaly hold      → A10 (investigation pack) + human
        └─ Approval outstanding          → A07
A04 ages the item. A16 escalates when SLA or value gates trip.
A15 reads closed exceptions weekly and proposes causes, not journal entries.
```

### 4.3 Periodic path (not invoice-triggered)

| Cadence | Agents | Output |
|---|---|---|
| Daily | A16, A14 (flash), A05, A09 | Queue health, GR backlog, open chases |
| Payment run | A12, A10 (payee / bank-detail screen), A07 if needed | Challenged proposal; human release |
| Weekly | A11 (priority suppliers), A15, A06 | Statement gaps, repeating defects, PO quality pack |
| Month-end | A13, A11, A14, A16 | Close checklist, accruals, operating pack |
| Quarter / promotion review | A16 + process owner + Internal Audit | Autonomy evidence pack |

### 4.4 Data hand-off contract

Agents pass **work objects**, not chat. A work object is a structured record with:

- `object_id`, `object_type` (invoice, exception, GR chase, statement line, payment proposal line, close task)
- `source_system` + `source_doc_id`
- `company_code` / `subsidiary`
- `vendor_id`, `amount`, `currency`, `due_date`
- `reason_code` (from the shared taxonomy)
- `autonomy_level_in_force`
- `recommended_action` + `confidence` + `evidence_refs[]`
- `human_owner` + `sla_due`
- `state` (`new` / `in_review` / `waiting_external` / `ready_to_post` / `posted` / `rejected` / `escalated`)

A16 is the only agent allowed to reassign `human_owner` or change `state` to `escalated`. Downstream agents may propose a state change; they do not silently close another agent’s object.

### 4.5 Shared exception taxonomy

Use these codes everywhere. Do not invent local synonyms.

| Code | Meaning | Typical next agent |
|---|---|---|
| `HDR-ERR` | Header incomplete or unreadable | A01, A08 |
| `LINE-ERR` | Line, UoM, or tax-line extraction failure | A01, A08 |
| `VND-UNK` | Vendor not found or ambiguous | A08 |
| `VND-BLK` | Vendor blocked, one-time, or payment hold | A08, A12 |
| `TAX-ERR` | Tax code, jurisdiction, or e-invoice tax mismatch | A02 |
| `CUR-ERR` | Currency / FX / company-code mismatch | A02 |
| `PO-MISS` | No PO, invalid PO, or PO closed | A06, A09 |
| `PO-QLTY` | PO exists but cannot match (account, vendor, price, qty, date) | A06 |
| `GR-MISS` | Expected GR not posted | A05 |
| `GR-SPLIT` | Partial / multi-GR allocation needed | A05, A03 |
| `QTY-VAR` | Quantity outside tolerance | A03, A09 |
| `PRC-VAR` | Price outside tolerance | A03, A09 |
| `DUP-SUS` | Duplicate suspected | A10 |
| `ANOM-SUS` | Pattern anomaly, not a known duplicate | A10 |
| `APPR-PEND` | Approval outstanding | A07 |
| `STMT-UNM` | Statement line unmatched | A11 |
| `ACCR-GAP` | Received-not-invoiced or invoiced-not-received gap | A13 |
| `PAY-HOLD` | Payment-proposal challenge | A12 |
| `CTRL-BRK` | Control or SOD concern | A16 + Controls Lead |

---

## 5. What stays human

The following remain human at every autonomy level. An agent may prepare the file. It may not complete the act.

| Decision | Why it stays human | Agent that prepares |
|---|---|---|
| Payment file / bank batch / positive-pay release | Cash leaves the company | A12 |
| Approval of invoices above the written matrix | Delegation of authority is a human control | A07 |
| Vendor create; bank-detail or tax-ID change | Classic fraud path; configurable but default human | A08 |
| Write-off, tolerance override above policy, or account reclass above limit | P&L / balance-sheet judgement | A03, A04, A13 |
| Fraud conclusion, SAR/internal-investigation referral | Legal and HR process | A10 |
| Period-close sign-off | Controller accountability | A13 |
| Autonomy promotion or demotion | Governance, not a model score | A16 + owner + Audit |
| Prompt / rule / tolerance table change | Change control | Process owner |
| Legal, tax-position, or statutory interpretation | Licensed advice is out of scope | A02 may flag; Tax owns |
| SOD override (same person create + approve + pay) | Control failure | A16 blocks; Audit reviews |

If a local policy wants an agent to do any of the above, that is a Level-4 request and requires the promotion pack in `RESPONSIBILITY_MODEL.md` plus Internal Audit acknowledgement. The Evidence Room default is: **do not**.

---

## 6. ERP-agnostic operating notes

### 6.1 Two books, one stack

Many groups run more than one ledger. The worked example in every charter — **Northline Industrial Group** — runs SAP S/4HANA for the core companies and NetSuite for one acquired entity. The agents share a taxonomy and a work-object schema. They do **not** share a single posting API.

Implementation rule: one **adapter per ledger**. The charter stays the same. The adapter translates:

| Stack concept | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday Financials |
|---|---|---|---|---|---|
| Parked / draft invoice | MIR7 / parked MIRO / FB60 hold | Pending vendor invoice | Incomplete Payables invoice | Vendor bill (pending approval) | Supplier invoice (draft) |
| Posted invoice | RBKP / BSEG | Posted vendor invoice | Payables invoice | Vendor bill | Supplier invoice |
| Purchase order | EKKO / EKPO | Purch table | PO header / line | Purchase order | Purchase order |
| Goods receipt | MIGO / MKPF / MSEG | Product receipt | Receiving | Item receipt | Receipt |
| 2-/3-way match | MIRO match + OMR6 tolerances | Invoice matching policy | Matching rules | Vendor bill matching | Receipt / invoice match |
| Vendor | Business Partner / LFA1 | Vendor | Supplier | Vendor | Supplier |
| Payment proposal | F110 proposal | Payment journal | Payment process request | Payment batch | Settlement run |
| Statement | Vendor line items + FBL1N | Vendor aged / statement | Payables trial | Vendor statement | Supplier statement |
| Close | MMRV / GR/IR / F.13 | Period close workspace | Close monitor | Period close | Close |

### 6.2 Identity and keys

Do not assume a global vendor number. Northline’s SAP vendor `4002187` (Helion Fasteners NA) is NetSuite vendor `V-1184` at the acquired entity. The adapter stores a **cross-walk**. Agents key work objects on `(source_system, source_vendor_id)` and display the group alias.

Invoice numbers are not unique across vendors. The natural key is `(company_code, vendor_id, invoice_number, invoice_date, gross_amount, currency)` plus any legal e-invoice UUID where one exists.

### 6.3 Comma lists, attachments, and e-invoices

- Header PDF / XML / UBL / PEPPOL / country e-invoice formats land in A01. Do not force a single capture engine. The charter requires an extract, a confidence, and a human-review path — not a named OCR brand.
- Attachment stores (OpenText, VIM, ReadSoft, native ERP attach) are tools, not agents.
- Where a statutory e-invoice identifier exists, A01 persists it. A02 tests it. A10 uses it as a hard duplicate key.

### 6.4 What the adapter must never do

- Post in one ledger because a twin document posted in another.
- Recycle a payment proposal across systems.
- Treat a NetSuite “pending approval” bill as a SAP-posted invoice.
- Write back to the ledger without the autonomy gate and the named posting user (system user with logged human authoriser).

---

## 7. Operating model for a 14-person AP team

The Northline worked example is illustrative (Evidence Room framework). It is the same company used in every agent charter so the library reads as one system.

**Northline Industrial Group** — 4,200 employees; about 18,000 invoices per month; SAP S/4HANA plus one NetSuite entity (Northline Pacific Components); 14-person shared-services AP team.

Suggested role map (illustrative, not a staffing recommendation):

| Role | Headcount (illustrative) | Owns agents |
|---|---|---|
| AP Manager | 1 | A16, A14, A15, A07 |
| Intake / capture | 2 | A01 |
| Validation / matching | 3 | A02, A03 |
| Exception specialists | 3 | A04, A09 |
| Vendor master & supplier comms | 2 | A08 |
| Payments & bank | 1 | A12 |
| Reconciliations & close | 1 | A11, A13 |
| Controls / quality | 1 | A10, A02 (second) |
| Warehouse liaison (not AP headcount) | — | A05 |
| Procurement operations (not AP headcount) | — | A06 |

A16’s queue should make this split visible. If matching staff are working supplier emails, the orchestrator is mis-routed — that is a control and a productivity issue.

---

## 8. Autonomy at go-live (default)

| Level | Meaning | Agents at go-live |
|---|---|---|
| 0 Observe | Read, log, report. No recommendations that look like instructions to the ledger. | A05, A06, A07, A11, A12, A13, A15 |
| 1 Recommend | Propose an action. Human accepts, edits, or rejects. | A01, A02, A03, A04, A08, A09, A10, A14, A16 |
| 2 Prepare | Draft the document, email, or parking entry. Human posts or sends. | None at go-live |
| 3 Execute within guardrails | Post / send inside written limits. | None at go-live |
| 4 Managed autonomy | Operate a named population with exception-only review. | Never default |

Promotion criteria, demotion triggers, and the evidence pack live in `RESPONSIBILITY_MODEL.md`. A16 refuses to dispatch a Level-3 action if the agent’s current authorised level is lower.

---

## 9. Control spine

Every agent charter repeats a control block. The stack-level spine is:

1. **Written policy** — tolerance table, approval matrix, vendor-change policy, payment-release policy. Versioned. Dated. Owner named.
2. **Autonomy register** — which agent, which company code, which document population, which level, review date. Owned by AP Manager; visible to Internal Audit.
3. **Immutable work log** — every recommendation, override, post, and escalation. Retention aligned to financial-record policy (set locally; do not assume a number).
4. **SOD** — the system user that posts is not the user that releases cash. Agents inherit this. A16 blocks a path that would collapse maker and checker.
5. **Change control** — prompts, match rules, reason codes, and tolerance numbers change through the same path as an ERP configuration change.
6. **Completeness** — inbound invoice count (mailroom / e-invoice / portal / EDI) reconciled to A01 created objects, daily.
7. **Evidence pack** — each agent lists what Internal Audit can pull without a screen-share.

Ardent Partners (2024) Best-in-Class exception rate is 9%. Use that as an external benchmark when you present your own exception rate. Do not treat 9% as a target the agents are warranted to hit.

---

## 10. Measurement spine

Four KPI families. No vanity metrics (messages sent, “AI interactions”, unanchored “accuracy %”).

| Family | Question | Typical stack measures |
|---|---|---|
| Activity | Did the agent touch the work? | Objects ingested, recommendations issued, coverage of inbound volume |
| Operational | Did the process move? | Cycle time receipt-to-post, first-pass match, exception aging, chase response |
| Financial | Did money move correctly? | Duplicate $ prevented (confirmed, not suspected), discount captured vs offered, GR/IR balance, on-time pay |
| Risk | Did controls hold? | Override rate, false-positive investigation load, SOD blocks, unauthorised-level attempts, late close tasks |

Each agent charter defines formula, source, cadence, and owner. A14 publishes the pack. A16 uses the pack to recommend promotion or demotion — it does not promote itself.

---

## 11. Implementation sequence (Evidence Room framework)

Do not stand up sixteen agents on day one. Sequence is a control decision.

| Wave | Stand up | Why this order |
|---|---|---|
| 0 | A16 + autonomy register + work-object schema + inbound completeness | Without a dispatcher and a log, you cannot evidence anything |
| 1 | A01, A02, A10 | You cannot match or triage garbage extract; you must screen duplicates early |
| 2 | A03, A04 | Matching and triage are the volume engines |
| 3 | A05, A09, A08 | Most exceptions die in GR, requester silence, or supplier data |
| 4 | A06, A07 | Upstream PO quality and approval routing once exception codes are stable |
| 5 | A12, A11, A13 | Payment, statements, close — after the daily path is trusted |
| 6 | A14, A15 | Reporting and root-cause require a quarter of clean objects |

Wave dates are local. The order is not.

---

## 12. Failure modes of the stack (not of a single agent)

| Failure | What goes wrong | Who owns the fix |
|---|---|---|
| Adapter drift | Field mapping silently drops tax or PO line | Systems Owner + A02 completeness test |
| Taxonomy fork | Teams invent local reason codes; A15 becomes noise | A16 + AP Manager |
| Autonomy creep | A processor “just lets it post” without a register update | Controls Lead; demote |
| Completeness gap | Portal invoices bypass A01; late invoices appear at close | A01 + A13 |
| Cross-ledger double pay | Same supplier invoice in SAP and NetSuite | A10 + A12 + cross-walk |
| Chat instead of objects | Work happens in email; audit trail dies | A16 rejects non-object hand-offs |
| Vendor demo promotion | Level 3 granted because extraction “looked good” | Promotion pack refused |

---

## 13. Cost monitoring (stack)

Monitor agent cost the same way you monitor a BPO invoice: unit cost, exception cost, and rework.

| Cost object | What to capture | Owner |
|---|---|---|
| Capture / model / API | Cost per invoice ingested (A01) and per exception classified (A04) | Systems Owner |
| ERP API volume | Reads vs writes; write spikes are a control event | Systems Owner |
| Human minutes | Review, override, chase, investigation | AP Manager |
| False-positive load | Hours spent clearing A10 / A03 noise | Controls Lead |
| Rework | Reversal / credit / re-post after agent-prepared documents | Assistant Controller |
| Idle licence | Agents switched on with no objects | A16 |

A14 reports these monthly. Cost reduction is a measurement, not a claim.

---

## 14. What “implementation-ready” means here

A charter is implementation-ready when a project team can:

1. Name the human owner and the backup.
2. Map every required input to an ERP field or a file.
3. Configure the reason codes and the routing table.
4. Produce the listed artifacts on day one at Level 0 or 1.
5. Show Internal Audit the evidence list.
6. Refuse any action in the exclusions list.
7. Score the agent after 60–90 days using the KPI block and decide stay / promote / demote.

If a section does not tell you what to do, how, who owns it, what can go wrong, how you control it, how you measure it, or what evidence proves it, the section is incomplete. Fix the charter before you configure the agent.

---

## 15. Document control

| Item | Value |
|---|---|
| Owner | Evidence Room — AP Agent OS product |
| Change path | Version increment; changelog; no silent edits to autonomy defaults |
| Related product folders | `../Governance` · `../Controls` · `../KPI_and_Measurement` · `../Process_Mapping` · `../Testing` |
| Worked example | Northline Industrial Group (fictional). Never replace with a real employer or client. |
| Advice status | Not legal, tax, accounting, or investment advice. Independently authored. |

---

## 16. File index

| File | Contents |
|---|---|
| `00_AGENT_STACK_OVERVIEW.md` | This document |
| `RESPONSIBILITY_MODEL.md` | Levels 0–4; promotion; demotion; evidence pack |
| `AGENT_CHARTER_STANDARD.md` | Required fields for every agent |
| `A01_invoice_intake.md` | Invoice Intake Agent |
| `A02_invoice_validation.md` | Invoice Validation Agent |
| `A03_matching.md` | Matching Agent |
| `A04_exception_triage.md` | Exception Triage Agent |
| `A05_goods_receipt.md` | Goods Receipt Agent |
| `A06_po_quality.md` | PO Quality Agent |
| `A07_approval.md` | Approval Agent |
| `A08_supplier_resolution.md` | Supplier Resolution Agent |
| `A09_internal_follow_up.md` | Internal Follow-Up Agent |
| `A10_duplicate_anomaly.md` | Duplicate & Anomaly Agent |
| `A11_vendor_statement_reconciliation.md` | Vendor Statement Reconciliation Agent |
| `A12_payment_proposal_review.md` | Payment Proposal Review Agent |
| `A13_ap_close.md` | AP Close Agent |
| `A14_ap_reporting.md` | AP Reporting Agent |
| `A15_root_cause.md` | Root Cause Agent |
| `A16_ap_manager_orchestrator.md` | AP Manager / Orchestrator |
