# Decision Tree Template

**Product:** AP Agent OS — Evidence Room  
**Use in:** Methodology Step 4  
**Rule:** Every diamond on the process map has a tree here. Trees are written as tests a second processor can apply without calling the author.

---

## How to write a tree

- Start from a binary or short-list question. If the question needs a paragraph, split the tree.
- Each leaf is a state, a taxonomy code, or a chase — never “handle accordingly”.
- Record the source of the rule: policy, ERP configuration, process-owner instruction, or undocumented (must be resolved).
- Tolerances are tables, not adjectives.
- Agents may evaluate a tree; they may not add a branch.

---

# Part A — Blank tree

## Tree header

| Field | Value |
|---|---|
| Tree ID | DT- |
| Decision name | |
| Process path | |
| Version / date | |
| Owner | |
| Rule source | Policy / ERP / owner instruction / undocumented |
| Related controls | |
| In-scope agents (after Step 5) | |

## Inputs required

| Input | Object | System of record | If unavailable |
|---|---|---|---|
| | | | |

## Tests (in order)

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

## Leaves

| Leaf ID | Outcome | Next state or code | Who may declare |
|---|---|---|---|
| L1 | | | |
| L2 | | | |

## Residual cases

| Case | Treatment |
|---|---|
| | Escalate / park as EX- / out of scope |

## Change control

| Date | Change | Approver |
|---|---|---|
| | | |

---

# Part B — Northline trees (worked)

## DT-CLASS — Document type

| Field | Value |
|---|---|
| Tree ID | DT-CLASS |
| Decision name | What document is this? |
| Process path | All NIL intake |
| Version / date | v02 / 2026-04-14 |
| Owner | Marcus Chen |
| Rule source | Owner instruction |
| Related controls | CM-INTAKE-01 |
| In-scope agents | Classification |

**Inputs:** Face title, presence of “credit”, presence of opening/closing balance, invoice number.

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | Document shows opening balance, invoices listed, and closing balance | Statement path | Step 2 |
| 2 | Document reduces amount payable (credit note, credit memo, adjustment credit) | Credit-note path | Step 3 |
| 3 | Document requests payment for goods or services with an invoice number | Invoice path | EX-IQ (unclassifiable) |

**Residual:** Debit notes that increase a payable follow the invoice path and are labelled “debit note” on the stub. Pro-forma documents are EX-IQ and returned.

---

## DT-ID — Entity and supplier

| Field | Value |
|---|---|
| Tree ID | DT-ID |
| Decision name | Can we identify bill-to entity and supplier account? |
| Process path | NIL PO goods |
| Owner | Marcus Chen |
| Rule source | Owner instruction + master-data procedure |
| Related controls | CM-ID-01 |
| In-scope agents | Quality, Extraction |

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | Bill-to legal name or registered number matches NIL | Step 2 | EX-ILE |
| 2 | Supplier exists in master data on a unique account (or unique site) | Step 3 | EX-WSP or EX-MDI |
| 3 | Supplier account is not blocked for posting | S3 capture | EX-MDI (blocked supplier) |

**Residual:** Trading-name-only invoices with a clear registered number may proceed after AP lead confirmation. Logo-only identification is not accepted.

---

## DT-QUAL — Invoice quality

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | Invoice number, date, supplier identity, bill-to, and payable amount are present and readable | Step 2 | EX-IQ |
| 2 | Lines (or a single valid summary line allowed for that supplier) are readable | Step 3 | EX-IQ or EX-OCR |
| 3 | Currency is entity currency (this path) | Step 4 | Out of path — foreign-currency queue |
| 4 | Extraction confidence, if used, meets the field floor in the extraction SOP | Quality pass | EX-OCR |

---

## DT-DUP — Duplicate

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | Same supplier account + same invoice number already posted or in process | EX-DUP | Step 2 |
| 2 | Same supplier + same amount + same date + similar invoice number (one-character variance or OCR-likely) | EX-PDUP | Step 3 |
| 3 | Same invoice number under a different site of the same supplier group | EX-PDUP | Duplicate gate pass |

Confirmed EX-DUP is closed by AP lead (X4). EX-PDUP remains parked until AP lead clears or confirms.

Bank-detail differences are not resolved in this tree; they raise EX-BNK in parallel.

---

## DT-PO — PO usability

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | PO number present on face or in a buyer-confirmed reference on the record | Step 2 | EX-MPO |
| 2 | PO exists in ERP for this entity | Step 3 | EX-IPO |
| 3 | PO is not closed for invoicing | Step 4 | EX-POC |
| 4 | Remaining PO value/quantity can cover this invoice under the match tree | PO usable | EX-POE |

**Residual:** A PO in a related entity is EX-ILE or EX-IPO, not a silent switch.

---

## DT-GRN — Receipt sufficiency

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | This supplier/line is on the “receipt required” list (goods) | Step 2 | Skip to match on PO only (not used on this NIL goods path) |
| 2 | Receipt quantity ≥ invoice quantity on each required line | Receipt sufficient | Step 3 |
| 3 | Receipt quantity > 0 and < invoice quantity | EX-PRX | EX-MRX |

Service-without-GRN is out of this path.

---

## DT-MATCH — Quantity, price, amount

**Tolerance table (NIL, owner: Procurement + Controller, last changed 2026-01-09)**

| Test | Tolerance | Unit |
|---|---|---|
| Quantity | 0 | Invoice qty may not exceed received qty |
| Unit price | 0.5% or 10 entity-currency units per line, lesser of the two | Against PO unit price |
| Header amount | Derived from accepted lines + tax | Must equal invoice payable |

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | Invoice qty ≤ received qty on every required line | Step 2 | EX-QTM (or EX-PRX if receipt is the cause) |
| 2 | Unit price within tolerance on every line | Step 3 | EX-PRM |
| 3 | Header payable equals sum of accepted lines + tax | Match pass | EX-IQ or EX-TAX depending on the break |

Informal buyer comments (“looks fine”) are not a tolerance.

---

## DT-TAX — Tax compare

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | Tax amount on face is present | Step 2 | EX-TAX |
| 2 | Tax code inherited from PO or standing table is populated | Step 3 | EX-TAX |
| 3 | Calculated tax from lines and code agrees to face within 1.00 entity-currency unit | Tax pass | EX-TAX |

02 Invoice Validation flags disagreement. It does not change the tax master. Tax team resolves EX-TAX above the processor’s standing instruction.

---

## DT-POST — Ready to post

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | All prior gates passed or an authorised waiver is on the invoice record | Step 2 | Remain parked |
| 2 | Coding block complete and cost centre valid | Step 3 | EX-CDM / EX-ICC |
| 3 | Approval complete if required beyond PO release | Step 4 | EX-APM / EX-DOA |
| 4 | No active payment-relevant hold that blocks posting (dispute, legal) | Post (X1) | EX-HLD / EX-DIS |

Waivers are issued by the control owner or a named delegate, for a named invoice, with an expiry. Standing “just post it” is not a waiver.

---

## DT-HOLD — Payment-pack input (not payment release)

| Step | Test | If true | If false |
|---|---|---|---|
| 1 | Invoice is disputed, on legal hold, or has an unresolved EX-BNK | Hold candidate | Step 2 |
| 2 | Supplier or AP lead has requested a hold | Hold candidate | No hold flag |

12 Payment Proposal Review lists candidates. AP lead or controller sets the hold. Treasury remains outside this tree.

---

## Writing trees for other paths

Copy Part A. Do not reuse NIL tolerances on another entity without an owner signature. Foreign-currency, intercompany, and non-PO paths each need their own DT-MATCH and DT-POST.
