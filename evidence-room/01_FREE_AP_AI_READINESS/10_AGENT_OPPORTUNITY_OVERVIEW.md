# Ten-agent opportunity overview

**Product:** Evidence Room — AP Agent OS  
**Audience:** Diagnostic taker; Transformation lead choosing a first wave  
**Use:** See ten roles as *design options*. Tick only what owners and holds support.  
**Not:** A mandate to stand ten agents, a software bill of materials, or a savings menu.

The full operating system specifies sixteen agents. This free overview covers the ten that appear most often in a first two waves. Full specifications ship in Professional (`03_AP_AGENT_OS_PRO/Agent_Library/`). Starter contains working blueprints for the same ten (`02_AP_AGENT_STARTER/TOP_10_AGENT_BLUEPRINTS.md`).

Northline Industrials is fictional. Its “fit” notes are illustrations.

---

## How to read a row

| Field | Meaning |
|---|---|
| Default autonomy | Where a new charter starts. Never L3. |
| Human owner | A role, then a name. “The SSC” is not an owner. |
| Opportunity | The *work object* that becomes inspectable — not a promised dollar. |
| Do not | Hard exclusion. If a vendor demo contradicts it, the demo loses. |
| Fit test | Diagnostic signals that the option is even discussable. |

---

## 1. Invoice Intake (Agent 01)

| | |
|---|---|
| Job | Capture, classify, extract, register inbound invoices. |
| Default autonomy | L1, or L0 if extract quality is unsampled. |
| Typical owner | AP Operations Lead |
| Opportunity | Every inbound invoice becomes a work object with a source and an extract. |
| Do not | Decide match. Post. Create vendors. |
| Fit test | You can name intake sources (B1 ≥ 2). |
| Northline (fictional) | Email + portal; paper at Monterrey is a separate object type, not silently in-scope. |

---

## 2. Invoice Validation (Agent 02)

| | |
|---|---|
| Job | Test completeness, supplier identity, tax *fields*, posting readiness. |
| Default autonomy | L1 |
| Typical owner | AP Quality Lead |
| Opportunity | Fail reasons become codes. The mix becomes analysable. |
| Do not | Decide tax position on ambiguous or cross-border items. Post. |
| Fit test | You will maintain a checklist (A1 or a decision to write codes this month). |
| Northline | US sales/use, GST/HST, IVA — flags only; Tax desk decides. |

---

## 3. Matching (Agent 03)

| | |
|---|---|
| Job | Apply 2-way / 3-way / GR-IR logic and the written tolerance table. |
| Default autonomy | L1 |
| Typical owner | AP Match Lead |
| Opportunity | Inspectable worksheets on a sample; clean vs. break is explicit. |
| Do not | Invent a GR or a PO. Edit tolerances. Force-match. |
| Fit test | Match policy written (A4 ≥ 2) and PO/GR queryable (B4 ≥ 2). |
| Northline | 3-way inventory; 2-way contracted services ≤ $10,000 (illustrative policy). |

---

## 4. Exception Triage (Agent 04)

| | |
|---|---|
| Job | Classify the break, assign owner, set next action and SLA. |
| Default autonomy | L1 |
| Typical owner | Exception Desk Lead |
| Opportunity | Parks stop being a pile. Aging is by owner and code. |
| Do not | Resolve the break. Waive PO. Approve price. |
| Fit test | A code list exists or will exist before go-live. |
| Northline | EX-MPO, EX-PRM, missing GR dominate the fictional mix. |

---

## 5. Goods Receipt (Agent 05)

| | |
|---|---|
| Job | Detect missing or aged receipts; assemble a receiver packet. |
| Default autonomy | L1; L2 prepare only when chartered. |
| Typical owner | Plant / warehouse finance liaison |
| Opportunity | Receivers see facts, not a nag. Dummy GRs become a visible refusal. |
| Do not | Create a GR to make an invoice match. |
| Fit test | Missing GR is a material code. Wave 2, not Wave 1. |
| Northline | Birmingham warehouse silence is the worked example. |

---

## 6. Approval (Agent 07)

| | |
|---|---|
| Job | Route non-PO and over-tolerance items per DOA; chase complete packets. |
| Default autonomy | L1 |
| Typical owner | AP Approvals Coordinator |
| Opportunity | Packets wait for a deputy in the table, not a convenient manager. |
| Do not | Approve. Invent a deputy. Edit DOA. |
| Fit test | Non-PO share is material; DOA table exists. |
| Northline | Cost-centre owner on leave → wait; do not climb the tree. |

---

## 7. Supplier Resolution (Agent 08)

| | |
|---|---|
| Job | Draft supplier queries; track replies. |
| Default autonomy | L1; send remains human or human-approved. |
| Typical owner | Vendor Master / AP supplier desk |
| Opportunity | Queries contain facts. Tone is request, not concession. |
| Do not | Agree price, quantity, due date, or a pay date. Change bank details. |
| Fit test | Supplier latency is a measured delay, not a vibe. |
| Northline | “Please confirm the PO number” — never “we will update the PO.” |

---

## 8. Duplicate & Anomaly (Agent 10)

| | |
|---|---|
| Job | Flag possible duplicates and unusual patterns for human review. |
| Default autonomy | **L0** |
| Typical owner | AP Controls Lead |
| Opportunity | Flags become a register with four human outcomes. |
| Do not | Say “fraud.” Clear a high-value flag. Hold or release payment on its own. |
| Fit test | Always discussable. Commission at L0 even if C4 is weak — especially then. |
| Northline | 0.8% suspect rate is illustrative observation, not a detection claim. |

---

## 9. Payment Proposal Review (Agent 12)

| | |
|---|---|
| Job | Annotate a payment proposal: holds, open flags, yesterday’s bank changes. |
| Default autonomy | L1; ceiling L2 annotate. |
| Typical owner | Treasury / AP Payments Lead |
| Opportunity | Humans see a marked proposal. The release click stays human. |
| Do not | Approve, deselect-and-release, transmit, or “pay to keep the discount.” |
| Fit test | C1 ≥ 3 (payment hold real). Otherwise do not open this agent. |
| Northline | Tuesday run, 612 lines, two uncleared flags — humans deselect (illustrative). |

---

## 10. Orchestrator (Agent 16)

| | |
|---|---|
| Job | Sequence work, enforce SLAs, record handoffs and evidence URIs. |
| Default autonomy | L1 |
| Typical owner | AP Process Owner |
| Opportunity | A work object for every invoice, exception, statement line, and proposal line on the path. |
| Do not | Post, pay, change vendors, or pick an approver outside DOA. |
| Fit test | E1 ≥ 2 (process owner exists). |
| Northline | System of record for *state*; D365 remains system of record for *accounting*. |

---

## Six you are not being asked to stand from this pack

| ID | Agent | Why it waits |
|---|---|---|
| 06 | PO Quality | Procurement-owned; Wave 3 diagnostic |
| 09 | Internal Follow-up | Needs triage codes and packets first |
| 11 | Vendor Statement | Periodic; easy to confuse with “the statement is the invoice” |
| 13 | AP Close | Attestation stays human; easy to over-scope |
| 14 | AP Reporting | Only as good as definitions |
| 15 | Root Cause | Needs a coded history |

Professional contains their specifications. Curiosity is not a Wave 1 plan.

---

## Choosing among the ten

Use this order, not a heat map of “value.”

1. If payment hold (C1) is weak → only 01–04, 10, 16 at L0. No Agent 12.
2. If owners E1/E2 are missing → write names before any charter.
3. If match policy or PO/GR data is weak → Intake + Validation + Orchestrator only, until A4/B4 move.
4. Otherwise → standard Wave 1 (01, 02, 03, 04, 10, 16).
5. Add 05, 07, 08 only after two weeks of shadow and a coded mix.
6. Add 12 only when C1 is used, not merely documented.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Ten-agent opportunity overview (free) |
| Related | Diagnostic; Starter blueprints; Professional library |
| Status | Edition 1.0.0 |
