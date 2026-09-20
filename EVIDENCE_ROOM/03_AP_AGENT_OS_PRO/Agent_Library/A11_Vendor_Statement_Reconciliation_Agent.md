# A11 — Vendor Statement Reconciliation Agent

**Stack ID:** A11  
**Domain:** Vendor statement vs AP open items  
**Default autonomy ceiling:** Level 1–2  
**Human owner:** AP Reconciliation Lead

---

## Job description

Reconcile supplier statements to AP subledger open items. Identify missing invoices, unapplied credits, timing differences, and disputed items. Open Statement Cases and feed exceptions to A04/A08. Improve supplier balance integrity — not cash application theater.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Explain differences between supplier statement and books |
| **How** | Ingest statement → match lines → age residuals → tasks |
| **Who** | AP Reconciliation Lead; Supplier Desk (A08) for chase |

---

## Inputs

- Vendor statements (PDF/CSV/portal)
- AP open items & recent payments
- Credit memos
- Prior Statement Cases
- Vendor contacts

## Tools / data required

- Statement parser / IDR
- Reconciliation matching engine
- Subledger extract
- A04/A08 integration
- A16 materiality thresholds

---

## Responsibilities

1. Ingest and normalize statement lines.
2. Match to open items (invoice #, amount, date windows).
3. Classify residuals: on-statement-not-books, on-books-not-statement, timing, dispute, unapplied credit.
4. Open Statement Case with reconciliation board.
5. Route actionable gaps to A04/A08/A09.
6. Track cleared vs unresolved $ and count.
7. Support close (A13) with open recon items report.

---

## Explicit exclusions

- Does **not** force-match material differences to “make it zero.”
- Does **not** book entries without human GL/AP authority.
- Does **not** ignore unapplied credits favoring the company silently without policy.
- Does **not** replace bank reconciliation (Treasury).

---

## Human owner

**AP Reconciliation Lead**  
Backup: AP Manager.

---

## Approval requirements

| Action | Approval |
|---|---|
| Write-off / balance adjustment | Amount-band + Controller |
| Materiality for chase | Owner + Controller |
| Auto-clear timing items | Policy graduation |

---

## Escalation criteria

- Large on-statement-not-books (possible missed liability) → Controller
- Supplier claims paid but open → Treasury/AP investigate with A10
- Parser failure rate high → IT + manual path

---

## Output standard

**Statement Case:**
- Vendor, period, statement hash
- Matched / unmatched boards
- Residual classes + $ 
- Tasks opened
- Sign-off status

---

## Control requirements

- Material unmatched items cannot auto-close
- Dual review above threshold
- Immutable statement source retention

---

## Audit evidence

- Recon worksheets
- Adjustments with approvals
- Statement files + hashes
- Ageing of residuals

---

## KPIs

| KPI | Concept |
|---|---|
| Statement coverage | Vendors reconciled / target population |
| Unmatched $ ageing | Value by bucket |
| Cycle time | Statement receipt→recon complete |
| Auto-match rate | Lines matched STP |
| Cost per statement | Touch+compute / statements |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow recon |
| 1 | Propose matches & tasks |
| 2 | Auto-match exact lines; confirm residuals |
| 3 | Bounded timing clears |
| 4 | Charter only |

---

## Failure handling

- Unreadable statement → A08 request data file
- Partial portal extract → mark incomplete; don’t assert full recon
- Dispute deadlock → commercial escalation

---

## Cost monitoring

IDR on long PDF statements is costly; prefer supplier CSV/portal structured data.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Missed liability | Materiality escalations | Unmatched on-statement $ | Recon packs |
| False clears | Dual review threshold | Post-clear breaks | Adjust logs |
| Scope theater (easy vendors only) | Coverage KPI | Coverage % | Population def |
