# AGENT 11 — Vendor Statement

**Stack position:** Periodic / event-driven. Reconciles supplier statements to the AP subledger. Seeds Supplier Resolution and Triage. Never treats a statement line as an invoice or a payment instruction.  
**Default autonomy:** L1 Recommend.  
**Human owner (typical):** AP Reconciliations Lead  
**Payment authority:** None.  
**Northline instance:** Weekly for top 40 vendors by spend; on-receipt for others; Wave 3 in the stack plan.

---

## 1. Position in the stack

Statements are the supplier’s picture of the world. They are useful because they show what AP does not have — and dangerous because AP teams sometimes pay from them. This agent produces a reconciliation worksheet: matched lines, in-AP-not-on-statement, on-statement-not-in-AP, amount disagreements, and credits parked on one side only. Humans decide what to query. Nobody adds a statement-only line to a payment proposal.

---

## 2. Job description

The Vendor Statement Agent intakes a statement (from Agent 01 classification or a portal pull), identifies the vendor and period, matches lines to open and recently paid items using a written key set, and emits a reconciling packet with coded differences. It does not create invoices from statement lines. It does not change due dates because the statement says “overdue.”

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| On statement artefact | Event | Worksheet |
| Top-40 pull | Weekly Monday | Request list + completed recons |
| Aging of unreconciled | Daily | Open packets |
| Month-end | Close calendar | Status to Agent 13 (completeness of *work*, not of AP) |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Statement artefact + extract | Agent 01 or portal | Y |
| AP open items + paid in statement period | ERP | Y |
| Unapplied credits / debit memos | ERP | Y |
| In-flight exceptions on that vendor | Orchestrator | Y — explain “overdue” |
| Match keys `AP-STM-001` | Controlled | Y |
| Vendor contact | Master | For later 08 |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| Statement extract | Read |
| AP inquiry | Read |
| Orchestrator | Write worksheet |
| Portal pull (top 40) | Read |

ERP: D365 vendor transactions; SAP FBL1N-equivalent; Oracle Payables activities; NetSuite vendor bill/bill payments; Workday supplier invoices. Read only.

---

## 6. Responsibilities

1. Identify vendor uniquely. If not, QUERY — do not recon against the wrong vendor.
2. Pin statement date and currency. Multi-currency statements split or QUERY.
3. Apply keys in order: invoice number exact; invoice number fuzzy (same as Agent 10 list); amount+date; PO+amount. Record which key matched.
4. Classify each statement line: `MATCHED_OPEN`, `MATCHED_PAID`, `ON_STMT_NOT_IN_AP`, `AMOUNT_BREAK`, `CREDIT_ONE_SIDED`.
5. Classify each AP open item not on statement: `IN_AP_NOT_ON_STMT` (may be timing).
6. Link `ON_STMT_NOT_IN_AP` to possible Intake leftovers or Intake never-received. Seed Agent 01 completeness if the supplier claims they sent it.
7. Link “overdue” on statement to open exceptions (05/07/10). Annotate; do not treat as AP negligence by default.
8. Hand `ON_STMT_NOT_IN_AP` material items to Triage → Agent 08 draft “please send invoice artefact.”
9. Never create a parked invoice from the statement line.
10. Produce a vendor-level balance bridge: statement close vs AP close, with timing explanation where possible.

---

## 7. Explicit exclusions

1. Payment authorisation or adding statement-only lines to a proposal.
2. Creating invoices or credits from the statement.
3. Changing due dates or terms.
4. Promising payment of “overdue” on the statement.
5. Vendor bank details on a statement remittance advice — divert to Vendor Master.
6. Intercompany statements (separate charter).
7. Declaring the AP subledger “accurate.”
8. Auto-clearing differences within a quiet tolerance without a written rule (Northline: no quiet tolerance at commissioning).

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | AP Reconciliations Lead / David Chen |
| Backup | Olivia Grant (Supplier Desk) |
| Escalation | AP Manager; Controller at month-end if top-40 incomplete |
| Owns | Key set, top-40 list, worksheet standard |
| Does not own | Cash, invoice create |

---

## 9. Approval requirements

| Action | Human |
|---|---|
| Accept worksheet | Reconciliations specialist |
| Query supplier | Via Agent 08 human send |
| Write off difference | Controller per threshold — not this agent |
| Change top-40 list | AP Manager |
| Any invoice create | Intake/Validation path only, with artefact |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Vendor unresolved | Vendor Master | Same day |
| `ON_STMT_NOT_IN_AP` > $25k single line | AP Manager | Same day |
| Top-40 weekly pack incomplete Friday | AP Manager | Friday |
| Statement shows paid item still open in AP | Payments + Match | Same day (possible unapplied) |
| Bank details on statement | Vendor Master + Controls | Immediate |

---

## 11. Output standard

Worksheet: vendor; period; currency; statement URI; line table with class + key used; AP-only lines; bridge; open exception links; “not an invoice”; “not a payment instruction”; agent `11`; level; hash of `AP-STM-001`.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| No pay-from-statement | Join with Agent 12 (no statement-only IDs on proposal) | Each run |
| No invoice-from-statement | Access | Quarterly |
| Top-40 coverage | Weekly | Close |
| Bank divert | Inject | Annual |

---

## 13. Audit evidence

Worksheets 7 years; statements 7 years; key versions life-of-programme; join-to-payment-run 7 years.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Top-40 on-time | | Coverage |
| Specialist accept rate | | Quality |
| `ON_STMT_NOT_IN_AP` resolved via real invoice artefact | | Process (not a savings claim) |
| Statement-only items appearing on a proposal | Must be 0 | Control |
| Cost | | Brake |

---

## 15. Performance history fields

Period; statements; vendors; classes; accepts; $ ON_STMT_NOT_IN_AP; proposal leaks (0); level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow recon |
| L1 | Live worksheets | **Default** |
| L2 | Prepare Agent 08 packets for `ON_STMT_NOT_IN_AP` |
| L3 | Not for invoice create or pay |
| L4 | n/a for those actions |

---

## 17. Failure handling

| Failure | Action |
|---|---|
| Extract of statement poor | Human key lines; do not guess |
| ERP open-item fail | No worksheet from stale balances |
| Duplicate statements | Latest + delta |

---

## 18. Cost monitoring

IDR on long PDFs, specialist minutes. If accept rate < 70%, stay L0 and fix extract.

---

## 19. Handoffs

01→11; 11→human; 11→04/08; 11→13 status; 11→12 negative join; 11→16.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| Top 40 | Named list, quarterly |
| Quiet tolerance | None |
| History for `MATCHED_PAID` | 180 days |

---

## 21. First 90 days

Five vendors only, L0 then L1. Prove the proposal join is zero. Then expand toward 40.

---

## 22. Worked example — Northline Industrials

**Lakeshore Steel April statement.** Close $214,400. AP open $194,804. Bridge: $19,596 invoice 459102 open and on statement (match); $27,000 “overdue” line `inv 44011` **not in AP** — no artefact in Intake. Class `ON_STMT_NOT_IN_AP`. David accepts. Agent 08 drafts “send invoice copy.” Agent 12 cannot add $27,000. Agent 13 sees the item as a *possible* unrecorded liability *candidate* — Controller decides accrual, not this agent.

Dunning $27,000 the same week is the same line, not a second fact.

---

## 23. Sample output artefact (abridged)

```
vendor: V-10442
period: 2026-04
bridge_gap: 27600
lines:
  - 459102 MATCHED_OPEN
  - 44011 ON_STMT_NOT_IN_AP 27000
not_invoice: true
not_payment_instruction: true
agent_id: 11
autonomy_level: L1
```

---

## 24. What this agent does not replace

Subledger recon to GL (different control), accrual judgement, or Intake. It replaces spreadsheet archaeology on a Monday.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_11 Vendor Statement |
| Default autonomy | L1 (start L0) |
