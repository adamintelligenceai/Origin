# AGENT 11 — Vendor Statement Reconciliation

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_11`  
**Domain:** Statement-to-open-item reconciliation  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Vendor Statement Reconciliation ingests supplier statements, matches lines to open AP items and recent payments, and produces a reconciliation worksheet of matched, missing-on-books, missing-on-statement, and disputed items. It is a control and cash-protection tool — not automatic booking of statement balances.

---

## 2. Inputs

| Input | Source |
|---|---|
| Supplier statements (PDF/CSV/portal) | Inbox / portal |
| Open items & payment history | ERP |
| Remittance advice history | Treasury / AP |
| Vendor hierarchy / remit-to | MDM |

---

## 3. Tools / data required

- Statement parser
- Matching engine (doc #, amount, date)
- Worksheet generator
- Exception case API (04/08)
- Evidence store

---

## 4. Responsibilities

1. Parse statement lines with confidence.
2. Match to open items / paid items.
3. Classify unmatched buckets with reason codes.
4. Recommend actions: request invoice copy, clear paid, dispute, etc.
5. Package reconciliation evidence for period close support (Agent 13).

---

## 5. Explicit exclusions

- Does **not** book statement balance as AP blindly.
- Does **not** write off differences without DOA.
- Does **not** treat statement as invoice (route mis-classified docs to Intake rules).
- Does **not** authorize payments to “clean up” statement.

---

## 6. Human owner

**AP Reconciliation Lead**. Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Accept reconciliation worksheet | Human reviewer |
| Write-off / adjustment | Controller / DOA |
| Auto-clear trivial differences | L3 fence only if explicitly approved |

---

## 8. Escalation criteria

- Material unmatched balance
- Aged supplier claims above threshold
- Remit-to / entity confusion in multi-entity groups
- Pattern suggesting duplicate payments

---

## 9. Output standard

Reconciliation worksheet: matched pairs, unmatched lists, totals, recommended actions, evidence links, agent version.

---

## 10. Control requirements

- Worksheet immutability after sign-off (version new if changes)
- Segregation from payment release
- Period-end freeze rules respected

---

## 11. Audit evidence

Statements, worksheets, sign-offs, resulting cases, adjustments with approvals.

---

## 12. KPIs

1. **% statement lines auto-matched**  
2. **Reconciliation cycle time**  
3. **Unmatched $ aged &gt; N days**  
4. **Worksheet acceptance rate**  
5. **Adjustments from statements (count/$)**  
6. **Cost per statement reconciled**  

---

## 13. Performance history fields

`auto_match_rate_28d`, `cycle_time_hours`, `unmatched_aged_dollars`, `worksheet_accept_rate`, `cost_per_statement_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1** worksheet recommendations. **L2** prepare supplier queries via Agent 08. No autonomous write-offs.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Unparseable statement | Route to human; keep original |
| Entity ambiguity | Hard stop; multi-entity review |
| Partial portal extract | Label incomplete; do not imply full recon |

---

## 16. Cost monitoring

Prefer CSV/portal structured statements over heavy OCR where suppliers allow.

---

## 17. Example worked scenario (fictional — ACME Corp)

Northwind monthly statement shows invoice `NW-10482` open; ACME books show it in payment batch draft. Agent 11 marks as `matched_pending_payment`. Statement also shows `NW-09901` $2,150 not in ACME open items. Agent 11 recommends case to Agent 08 for copy request. AP Reconciliation Lead signs the worksheet. No balance is booked from the statement total.
