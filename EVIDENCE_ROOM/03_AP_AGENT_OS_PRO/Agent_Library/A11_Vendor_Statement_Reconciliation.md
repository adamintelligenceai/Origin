# A11 — Vendor Statement Reconciliation Agent

**Stack ID:** A11  
**Human owner (default):** AP Reconciliation Lead / Senior AP Analyst  
**Typical autonomy start:** L0 → L1  
**Depends on:** Vendor statements; open AP items; payment history  
**Hands off to:** A04, A08, A10, A12 (hold/include recommendations), A13

---

## Purpose

Reconcile supplier statements to the AP subledger, produce clear discrepancy packs, and drive clearance of missing invoices, unapplied credits, and disputed items — without silently adjusting the ledger.

---

## Job description

The Vendor Statement Reconciliation Agent ingests supplier statements (PDF/portal/CSV), matches lines to open items and recent payments, classifies unmatched statement lines and unmatched ledger items, and opens exceptions for investigation. It prepares reconciliation workpapers for human sign-off. It does not post adjustments or authorise payments to “clear” statement noise.

---

## Inputs

| Input | Source |
|-------|--------|
| Vendor statements | Email/portal/A01 type divert |
| Open AP items + paid history window | ERP |
| Remit vendor mapping | Vendor master |
| Prior reconciling items | Case system |
| Materiality thresholds | Config |

---

## Tools / data required

- Statement parser (structured first, OCR second)  
- Matching engine (invoice number, amount, date windows)  
- Workpaper generator  
- Exception emitter  
- Secure storage for statements  

---

## Responsibilities

1. Register statement with vendor, period, currency.  
2. Match statement lines to ERP items.  
3. Identify: on-statement-not-in-ledger; in-ledger-not-on-statement; amount mismatches; already-paid items still listed.  
4. Open taxonomy exceptions (`statement_discrepancy`, etc.).  
5. Recommend actions (request copy invoice, apply credit, query supplier).  
6. Produce reconciling workpaper for human approval.  
7. Track aged reconciling items into close (A13).  

---

## Explicit exclusions

- Posting journals / write-offs  
- Automatic payment of unmatched statement balances  
- Netting agreements execution without authority  
- Declaring ledger “correct” without human sign-off  

---

## Human owner

**Primary:** AP Reconciliation Lead  
**Secondary:** Entity Controller (sign-off at period end)  
**Accountable executive:** Controller  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Sign-off of completed reconciliation | Reconciliation Lead (+ Controller for key vendors) |
| Write-off / adjustment | DOA |
| Exclude vendor from cycle | Head of AP |
| Parser mapping changes | AP Systems + Recon Lead |

---

## Escalation criteria

- Large unmatched balance near payment run  
- Statement shows invoices already paid (possible duplicate pay risk → A10)  
- Chronic unresponsive vendor  
- Multi-currency unexplained breaks  
- Suspected wrong account / factoring party  

---

## Output standard

Workpaper: matched pairs, unmatched lists, proposed clearing plan, risk flags, sign-off block, statement hash, ERP extract timestamp.

---

## Control requirements

- Dual review for material vendors  
- No payment from statement alone without invoice artifact  
- Retention of statements and workpapers  
- Segregation from payment release  

---

## Audit evidence

Statements, extracts, workpapers, sign-offs, exception clearances.

---

## KPIs

1. **% statement lines auto-matched**  
2. **Reconciling item aging**  
3. **Cycle time statement → signed workpaper**  
4. **Unmatched value**  
5. **Repeat discrepancy vendors**  
6. **Adjustment rate post-recon**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Shadow match stats |
| **L1** | Draft workpapers; recommend exceptions |
| **L2** | Auto-match clear lines; auto-open exceptions for breaks |
| **L3** | Full draft recon for approved vendors; human sign-off still required |
| **L4** | Managed recon programme; postings/write-offs remain human |

---

## Failure handling

Parse failure: route to manual with `ocr_extraction_issue`. Partial statement: mark incomplete, do not claim full recon. ERP extract stale: refresh before matching.

---

## Cost monitoring notes

Prioritise vendors by spend and dispute frequency. Prefer CSV/portal over OCR PDF when suppliers can provide it.

---

## Example scenario *(illustrative example)*

Monthly statement from a logistics vendor lists 42 invoices. Agent matches 39; one is a credit not in ledger; two invoices missing from AP. It opens exceptions, requests copy invoices via A08 (with approval), and holds payment proposal lines for unmatched open statement amounts pending intake — human signs the workpaper.

---

## Suggested first pilot scope

5–10 high-volume vendors, CSV/portal statements preferred, L1 workpapers, monthly cadence aligned to payment runs.
