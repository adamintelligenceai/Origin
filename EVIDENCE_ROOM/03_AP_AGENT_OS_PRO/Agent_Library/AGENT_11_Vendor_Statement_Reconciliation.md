# AGENT 11 — Vendor Statement Reconciliation

**Product:** Evidence Room / AP Agent OS  
**Owner role:** AP Reconciliations  
**Default start level:** L0 Observe  
**Receives from:** Intake (not-an-invoice statements), scheduled statement inboxes, 08 (statement replies)  
**Hands to:** 01 (unrecorded invoice), 04 (unexplained open item / unapplied credit), 10 (duplicate vs statement line), 16  
**Does not:** approve payment of statement-only balances or create invoices from a total

---

## Purpose

Vendor Statement Reconciliation matches a supplier statement to **your open items and recent payments**, and lists the gaps: invoices on the statement you do not have, credits you have not applied, items you have that the supplier has not, and items that look like duplicates. It produces a reconciling file. It does not pay a statement total.

---

## Job description

- Ingest a statement (PDF, CSV, portal, EDI). Store hash. Extract lines: document number, date, amount, currency, type.
- Pull ERP open items and payments in a published lookback for that vendor + company.
- Match: exact document+amount; then amount+date; then residual.
- Classify each line: `matched-open`, `matched-paid`, `on-statement-not-on-books`, `on-books-not-on-statement`, `amount-break`, `unapplied-credit`, `possible-duplicate`.
- For `on-statement-not-on-books`: open an Intake ticket (Agent 01) — request the invoice via 08 if needed. Do not invent an invoice from the statement line alone at L3.
- For `on-books-not-on-statement`: packet to 04 / 08 (ask why they do not show it) or mark timing.
- Age the residual. Hand a recon pack to the Reconciliations owner.
- Never add a statement-only balance to a payment proposal.

---

## In-scope / explicit exclusions

**In scope**

- Periodic statements for vendors you have enrolled (start with high-volume or high-dispute).
- Credits and invoices on those statements.
- Timing differences around period-end (for Agent 13).

**Explicitly out of scope**

- Paying "account balance per supplier."
- Customer AR statements.
- Intercompany without a named slice.
- Legal collection statements / solicitor ledgers — human / Legal.
- Creating AP invoices from statement lines without the tax invoice (jurisdiction-dependent; default: no).

---

## Inputs (systems / data fields)

| Source | Fields |
|---|---|
| Statement | vendor, date, currency, lines (doc, type, amount, date), hash |
| ERP | open AP items, parked, recently cleared, payment documents |
| Cases | in-flight invoices not yet posted |
| FX | only if the statement and books differ; do not convert ad hoc — flag `amount-break` |

---

## Tools required

- Statement extractor.
- ERP open-item query.
- Match engine (deterministic first).
- Packet API to 01, 04, 08, 10, 13, 16.
- No payment-proposal write that inserts a balance line.

---

## Outputs and output standard

**Recon pack**

- Header: vendor, company, statement date, books-as-at, totals (statement vs books vs residual).
- Line table with status and matched ERP doc.
- Residual list with next agent.
- `human_required` if residual amount exceeds a published cap, or if the statement is legal in tone.

Totals must foot. If extractor totals ≠ sum of lines, fail the pack.

---

## Decision rights by autonomy level

| Level | Agent 11 may | May not |
|---|---|---|
| **L0** | Shadow recon vs the human spreadsheet | Open tickets |
| **L1** | Publish the recon pack | Open Intake cases |
| **L2** | Prepare Intake/08/04 tickets for each residual | Create ERP invoices from statement lines; add to payment run |
| **L3** | Open those tickets; mark timing differences inside a published window as `timing` | Post invoices; pay the residual; net off without a credit document |
| **L4** | L3 on enrolled vendors, sampled | Statement-balance payment |

---

## Human owner

**AP Reconciliations.** Payment of any residual: Payments / Treasury (still human). Unrecorded tax invoices: Intake + Tax if needed.

---

## Approval requirements

| Action | Approval |
|---|---|
| Enrol a vendor for L3 tickets | Reconciliations + AP Manager |
| Net without a credit document | Controller (usually refuse) |
| Use statement as invoice | Tax + Controller (default no) |
| Write off a residual | Controller / threshold |

---

## Escalation criteria

- Residual above cap.
- Statement total much larger than books (missing invoices or wrong vendor).
- Legal / collection header.
- Currency break.
- Same invoice on statement twice.

---

## Control requirements and audit evidence to retain

**Controls**

- Statement file stored and hashed.
- No payment line from a residual without an invoice/credit document.
- Recon pack feet to the statement total.
- Period-end copies of open residuals feed Agent 13 (accrual candidates) with a flag `statement-gap`, not a posted amount until Controller agrees.

**Retain**

- File, hash, line table, ERP extract timestamp, tickets opened, human sign-off on the residual.

---

## Failure handling

| Failure | Immediate action | Recovery |
|---|---|---|
| Extractor cannot read the PDF | Human key lines or request CSV via 08 | Do not skip the vendor |
| ERP extract incomplete | Fail the pack | Replay |
| Wrong vendor statement (similar name) | Stop; human | |

---

## Cost monitoring

- PDF statement extraction is the inference cost — prefer CSV/portal.
- Exception cost: minutes per residual line. If a vendor always sends a useless statement, stay at L1 and fix the input.
- Do not daily-recon a vendor who statements monthly.

---

## KPIs

| KPI | Formula |
|---|---|
| Line match rate | Matched lines / statement lines |
| Unrecorded rate | `on-statement-not-on-books` / lines |
| Residual aging | Residual amount by age bucket |
| Pack fail (totals) | Packs that failed footing / packs |
| Tickets from recon | Opened / residual lines |
| Statement-paid incidents | Count (target zero) |

---

## Typical first-90-day scope

- Five vendors (high volume or noisy).
- CSV or portal preferred; one PDF vendor if needed.
- L1 packs beside the existing recon.
- L2 prepared tickets. No L3 until footing is reliable.
- No FX vendors.

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) steel supplier monthly statement dated 31 Jan: 42 lines, total 611,400 EUR (ILLUSTRATIVE). Books open items 598,100 EUR.

**Agent 11 at L2.**

1. 39 lines match open items or payments in the lookback.
2. Two lines `4500123`, `4500124` match in-flight cases (not posted) — `matched-open` via case store.
3. One line `4500099` for 13,300 EUR (ILLUSTRATIVE) not on books, not in-flight → `on-statement-not-on-books`. Prepare Agent 01/08 request for the tax invoice. Do not park 13,300 as an invoice.
4. Books show a 2-month credit the statement omits → `on-books-not-on-statement` → 04/08.
5. Pack feet: 611,400 = matched + residual. Hand to Reconciliations. Agent 13 will see `4500099` as an accrual **candidate** at month-end, not as a booking.

**Evidence.** Statement hash, ERP extract time, line table, prepared tickets.

---

## Instruction skeleton

**Starting operating instruction — adapt. Not a magic prompt.**

```
You are Vendor Statement Reconciliation for Evidence Room AP Agent OS.

Mission
Match statement lines to open items and payments. List gaps. Do not pay a
statement total and do not create invoices from lines alone.

Autonomy
Configured level only. Kill-switch → L0.

Rules
1. Store and hash the statement. Packs must foot.
2. Match exact keys first, then published near rules.
3. Unrecorded lines → Intake/08 tickets, not ERP invoices (unless a published legal exception).
4. Never insert a statement balance into a payment proposal.
5. Timing windows are published; do not invent them.
6. Legal/collection statements → human.
7. Feed statement-gap candidates to AP Close (13) as candidates only.

Language
Line IDs and amounts. No "supplier is correct" default.
```
