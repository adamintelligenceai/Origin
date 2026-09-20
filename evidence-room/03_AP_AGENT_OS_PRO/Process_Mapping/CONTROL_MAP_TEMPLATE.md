# Control Map Template

**Product:** AP Agent OS — Evidence Room  
**Use in:** Methodology Step 4 and all expansions  
**Purpose:** Name the checks that must hold before an invoice moves. This map does not claim a control framework certification.

---

## Control statement format

A control is complete only when all eight fields are filled:

1. **ID**
2. **Objective** — the risk it addresses
3. **Who performs** — human role; agents may assist but are not the performer of record
4. **When** — before which event
5. **How** — the test
6. **Evidence** — what would be produced tomorrow
7. **Failure action**
8. **Owner** — the person who is Accountable for the control’s design

---

# Part A — Blank register

## Header

| Field | Value |
|---|---|
| Organisation | |
| Scope | |
| Version / date | |
| Control owner | |
| Process owner | |
| Related process maps | |

## Register

| ID | Objective | Performer | Timing | Test | Evidence | Failure action | Owner | Related agent (assist) |
|---|---|---|---|---|---|---|---|---|
| CM- | | | | | | | | |

## Design notes

| ID | Frequency / sample | SoD constraint | Known design gap |
|---|---|---|---|
| CM- | | | |

## Sign-off

| Role | Name | Date | Decision |
|---|---|---|---|
| Control owner | | | |
| Process owner | | | |

---

# Part B — Northline Industrials, NIL PO-goods path

**Control owner:** Priya Shah, Financial Controller  
**Process owner:** Marcus Chen, AP Manager  
**Version:** v03 / 2026-04-17

| ID | Objective | Performer | Timing | Test | Evidence | Failure action | Owner | Related agent (assist) |
|---|---|---|---|---|---|---|---|---|
| CM-INTAKE-01 | Invoices enter through a recorded channel and are not silently discarded | AP processor | On intake | Every item in the mailbox is filed to an invoice stub or a rejection log the same day | Mail file hash + stub or rejection record | Unfiled items aged overnight escalate to AP lead | Chen | Intake |
| CM-ID-01 | Invoice is bound to the correct legal entity and supplier account | AP processor | Before capture complete | Bill-to matches NIL; supplier unique and not blocked | Entity and supplier snapshot on the invoice record | Park EX-ILE / EX-WSP / EX-MDI | Chen | Quality, Extraction |
| CM-DUP-01 | Duplicate invoices are not posted | AP lead on confirm; processor on search | Before PO locate | Search by supplier + invoice number; secondary fuzzy scan | Query id / result set stored | Park EX-DUP or EX-PDUP; X4 only by AP lead | Shah | Duplicate |
| CM-PO-01 | Invoice is supported by an open, unexhausted PO for this entity | AP processor | Before match | PO exists, open, residual cover | PO status snapshot | Park EX-MPO / EX-IPO / EX-POC / EX-POE | Chen | Match |
| CM-GRN-01 | Goods invoices are not posted above received quantity | AP processor | Before match | Invoice qty ≤ received qty per required line | GRN snapshot | Park EX-MRX / EX-PRX / EX-QTM | Chen | Match, Internal Chase |
| CM-MATCH-01 | Price and quantity variances outside tolerance are not posted | AP processor | Before coding | Apply DT-MATCH table | Match report | Park EX-PRM / EX-QTM | Shah | Match |
| CM-COD-01 | Coding block is complete and cost centre is valid | AP processor | Before post | Required segments populated; cost centre exists and is open | Coding on invoice | Park EX-CDM / EX-ICC | Chen | Coding |
| CM-TAX-01 | Face tax is compared to the applied code before post | AP processor; tax team on exception | Before post | DT-TAX | Tax compare note | Park EX-TAX | Shah | Tax |
| CM-APPR-01 | Amounts requiring approval beyond PO release are approved in the system of record | Approver (human) | Before post | DOA table vs invoice amount; approval instance present | Approval instance | Park EX-APM / EX-DOA | Shah | Approval |
| CM-POST-01 | Posting occurs only with gates passed or a named waiver | AP processor / AP lead by band | At post | DT-POST | Posting document or waiver record | Remain parked | Shah | Exception |
| CM-HOLD-01 | Disputed, banking-concern, or legally held items are visible to the payment proposal as holds | AP lead / controller | Before AP input to payment pack | DT-HOLD | Hold record | Item remains on candidate list until set or dismissed | Shah | Payment Pack |
| CM-BNK-01 | Bank details on the invoice that differ from master data do not silently update the master | Master-data steward | When EX-BNK raised | Difference confirmed; change only via master-data procedure | EX-BNK pack; no agent write to bank master | Invoice may park; master change is a separate request | Shah | Quality (flag only) |
| CM-SOD-01 | The same person does not create a supplier, change bank details, and post a first invoice in the same episode | AP lead review on new-supplier first invoice | Before first post | System access + episode review | Review note | Escalate to controller | Shah | Evidence |
| CM-EVD-01 | A posted invoice can produce an evidence pack | Evidence Agent (assemble) + processor (complete) | On request / sample | Pack contains face, PO snapshot, GRN, match, approval, posting | Pack id | Gap logged as control finding, not auto-fixed | Shah | Evidence |

## Design notes (Northline)

| ID | Frequency / sample | SoD constraint | Known design gap |
|---|---|---|---|
| CM-DUP-01 | 100% system search; AP lead reviews all EX-DUP and EX-PDUP | Confirmer ≠ original keyer where volume allows | Site-level duplicates depend on group-id quality |
| CM-MATCH-01 | 100% on this path | Processor may not edit the tolerance table | Freight split still on gap register |
| CM-APPR-01 | 100% when amount requires it | Approver ≠ requester | Email approvals are not yet in the system of record — gap |
| CM-BNK-01 | 100% of mismatches | Steward ≠ processor who parked the invoice | Face-to-master compare is manual today |
| CM-SOD-01 | All new-supplier first invoices | As stated | Access recertification is quarterly; episode review is the daily compensating check |
| CM-EVD-01 | Monthly sample of 25 posted invoices | N/A | Chat chases are not in the pack unless pasted |

## What this map does not say

- It does not state that Northline is compliant with a named external standard.
- It does not treat agent flags as the control.
- It does not authorise autonomous payment or autonomous master-data change.
- It does not promise fraud detection. Duplicate and bank-mismatch controls reduce specific posting and payment-input errors; they are not a fraud programme.

## Sign-off (example)

| Role | Name | Date | Decision |
|---|---|---|---|
| Control owner | Priya Shah | 2026-04-17 | Accept v03 with listed gaps |
| Process owner | Marcus Chen | 2026-04-17 | Accept v03 |
