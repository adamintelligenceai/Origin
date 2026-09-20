# Process Map Template

**Product:** AP Agent OS — Evidence Room  
**Use in:** Methodology Step 4  
**Instruction:** Complete the blank map first. Copy the Northline example only as a reference for density and wording, not as a target process.

---

## How to draw

- One path per map (for example: PO goods invoice, non-PO expense, credit note).
- Swimlanes are **roles and systems**, not agents. Agents are annotated on steps after Agentise.
- A box is a state or activity. A diamond is a decision already listed in the decision-tree file.
- Park reasons use taxonomy codes only.
- Value bands, entities, and channels are filters on the header, not extra boxes.

---

# Part A — Blank template

## Header

| Field | Value |
|---|---|
| Organisation | |
| Legal entity / scope | |
| Process path | |
| Channel(s) | |
| Version | |
| Date | |
| Author | |
| Process owner | |
| Control owner | |
| Related transcript ids | |
| In-scope invoice types | |
| Explicitly out of scope | |
| ERP / adjacent systems (names only) | |

## Start events

| ID | Event | Source | Notes |
|---|---|---|---|
| T1 | | | |
| T2 | | | |

## Swimlanes (list)

1.
2.
3.
4.

## States

| ID | State / activity | Swimlane | Input objects | Output objects | Wait? | Evidence written |
|---|---|---|---|---|---|---|
| S0 | | | | | Y/N | |
| S1 | | | | | Y/N | |
| S2 | | | | | Y/N | |
| S3 | | | | | Y/N | |
| S4 | | | | | Y/N | |
| S5 | | | | | Y/N | |
| S6 | | | | | Y/N | |
| S7 | | | | | Y/N | |
| S8 | | | | | Y/N | |
| S9 | | | | | Y/N | |
| S10 | | | | | Y/N | |

Add rows as required. Do not skip IDs.

## Decisions (index only)

| ID | Decision | Tree file section | If yes | If no / unknown |
|---|---|---|---|---|
| D1 | | | | |
| D2 | | | | |
| D3 | | | | |

## Exception exits

| From state | Taxonomy code | Next chase | Ageing trigger |
|---|---|---|---|
| | | | |

## Terminal states

| ID | Name | Meaning | Who can declare it |
|---|---|---|---|
| X1 | Posted | | |
| X2 | Parked | | |
| X3 | Returned to supplier | | |
| X4 | Duplicate-closed | | |
| X5 | On payment hold | | |

## Controls on this path

List control IDs from the control map. Do not redefine them here.

|

## Agent annotations (complete only after Step 5)

| State | Agent | Action (propose / draft / route / chase) | Human committer |
|---|---|---|---|
| | | | |

## Sign-off

| Role | Name | Date | Decision |
|---|---|---|---|
| Process owner | | | Accept / return |
| Control owner | | | Accept / return |
| Facilitator | | | Complete / incomplete |

---

# Part B — Northline Industrials example

## Header

| Field | Value |
|---|---|
| Organisation | Northline Industrials |
| Legal entity / scope | Northline Industrials Ltd (NIL) only |
| Process path | PO goods invoice, domestic, entity currency |
| Channel(s) | Shared mailbox `ap.invoices@northline.example`; procurement-forwarded portal PDFs |
| Version | v03 |
| Date | 2026-04-14 |
| Author | Implementation lead |
| Process owner | Marcus Chen, AP Manager |
| Control owner | Priya Shah, Financial Controller |
| Related transcript ids | NL-TR-041, NL-TR-044 |
| In-scope invoice types | Supplier tax invoices with a PO for goods |
| Explicitly out of scope | Non-PO, services without GRN, intercompany, foreign currency, credit notes, statements, payment execution |
| ERP / adjacent systems | ERP of record (unnamed), mailbox, GRN enquiry, DOA table maintained in finance |

## Start events

| ID | Event | Source | Notes |
|---|---|---|---|
| T1 | PDF or e-invoice image lands in shared mailbox | Supplier or procurement forward | Portal is not a direct interface |
| T2 | Processor opens next unworked item | Mail queue | No auto-assignment |

## Swimlanes

1. Shared mailbox
2. AP processor
3. ERP of record
4. Buyer / receiver
5. AP lead (escalation only)

## States

| ID | State / activity | Swimlane | Input objects | Output objects | Wait? | Evidence written |
|---|---|---|---|---|---|---|
| S0 | Intake received and filed to invoice id | Mailbox / processor | Message, PDF | Invoice stub | N | Mail item id, file hash |
| S1 | Classify as invoice vs credit vs statement | Processor | Face of document | Document type | N | Type on stub |
| S2 | Identify legal entity and supplier | Processor | Bill-to name, ABN/VAT, supplier name | Entity, supplier account | N | Entity code, supplier account |
| S3 | Capture header and lines | Processor | Face | Invoice fields | N | Keyed/extracted field log |
| S4 | Quality gate | Processor | Required field list | Pass or EX-IQ / EX-OCR | N | Quality checklist |
| S5 | Duplicate gate | Processor + ERP | Supplier + invoice number + amount + date | Pass, EX-DUP, or EX-PDUP | N | Search screenshot / query id |
| S6 | Locate PO and confirm open / not exhausted | Processor + ERP | PO on face | PO + lines, or EX-MPO / EX-IPO / EX-POC / EX-POE | N | PO status snapshot |
| S7 | Read receipt position | Processor + ERP | PO lines | Receipt qty, or EX-MRX / EX-PRX | Y if missing | GRN snapshot |
| S8 | Match quantity, price, amount | ERP + processor | Invoice, PO, receipt | Match or EX-PRM / EX-QTM | N | Match report |
| S9 | Inherit coding from PO | ERP | PO account assignment | Coding block, or EX-CDM / EX-ICC | N | Coding on invoice |
| S10 | Compare tax | Processor | Face tax vs code | Pass or EX-TAX | N | Tax compare note |
| S11 | Confirm approval state if required beyond PO | Processor | DOA table, PO release | Pass or EX-APM / EX-DOA | Y if missing | Approval instance |
| S12 | Post or park | Processor | All gates | X1 or X2 | N | Posting doc or park code |
| S13 | Chase | Processor / AP lead | Parked invoice | Update or escalate | Y | Chase log |
| S14 | Flag payment-pack concern | Processor | Holds, disputes, bank mismatch | Hold candidate | N | Hold record (AP input only) |

## Decisions (index)

| ID | Decision | Tree file section | If yes | If no / unknown |
|---|---|---|---|---|
| D1 | Is the document an invoice? | DT-CLASS | S2 | Credit or statement path |
| D2 | Is entity NIL and supplier known? | DT-ID | S3 | EX-WSP / EX-ILE / EX-MDI |
| D3 | Quality complete? | DT-QUAL | S5 | EX-IQ / EX-OCR |
| D4 | Exact or potential duplicate? | DT-DUP | X4 or EX-PDUP | S6 |
| D5 | PO usable? | DT-PO | S7 | EX-MPO / EX-IPO / EX-POC / EX-POE |
| D6 | Receipt sufficient? | DT-GRN | S8 | EX-MRX / EX-PRX |
| D7 | Match within tolerance? | DT-MATCH | S9 | EX-PRM / EX-QTM |
| D8 | Ready to post? | DT-POST | X1 | X2 + chase |

## Exception exits (extract)

| From state | Taxonomy code | Next chase | Ageing trigger |
|---|---|---|---|
| S6 | EX-MPO | 08 Supplier Resolution + buyer | 3 working days |
| S7 | EX-MRX | 09 Internal Follow-up → receiver then buyer | 3 working days |
| S8 | EX-PRM | Buyer then supplier | 5 working days |
| S5 | EX-DUP | AP lead review | Same day |
| S2 | EX-ILE | AP lead + entity accountant | 2 working days |

## Terminal states

| ID | Name | Meaning | Who can declare it |
|---|---|---|---|
| X1 | Posted | Invoice in ERP as posted | AP processor within DOA; above band, AP lead |
| X2 | Parked | Exception code set, not posted | AP processor |
| X3 | Returned to supplier | Document rejected with reason | AP lead |
| X4 | Duplicate-closed | Confirmed duplicate, not posted | AP lead |
| X5 | On payment hold | Posted or parked, excluded from proposal input | AP lead or controller |

## Controls on this path

CM-INTAKE-01, CM-ID-01, CM-DUP-01, CM-PO-01, CM-MATCH-01, CM-TAX-01, CM-POST-01, CM-HOLD-01

## Agent annotations (post Step 5, L0/L1)

| State | Agent | Action | Human committer |
|---|---|---|---|
| S0–S3 | 01 Invoice Intake | File, classify, extract | Processor accepts type and fields |
| S4 | 02 Invoice Validation | Propose fail codes | Processor |
| S5 | 10 Duplicate & Anomaly | Flag EX-DUP / EX-PDUP / pattern | AP Controls Lead on confirm / X4 |
| S6–S8 | 03 Matching; 05 GR; 06 PO Quality | Propose match result and defect packets | Processor |
| S13 | 08 Supplier Resolution; 09 Internal Follow-up | Draft chases from templates | Processor sends or approves send |
| S14 | 12 Payment Proposal Review | Annotate hold / unclear | AP lead or treasurer per payment policy |

## Sign-off (example)

| Role | Name | Date | Decision |
|---|---|---|---|
| Process owner | Marcus Chen | 2026-04-16 | Accept NIL PO-goods v03 |
| Control owner | Priya Shah | 2026-04-17 | Accept with freight split remaining on gap register |
| Facilitator | Implementation lead | 2026-04-17 | Complete |

---

## Drawing notes for the Northline path

Happy path in one line:

`T1 → S0 → S1 → S2 → S3 → S4 → S5 → S6 → S7 → S8 → S9 → S10 → S11 → S12 → X1`

Most volume leaves at S7 (missing receipt) and S8 (price mismatch). Draw those exits thicker than exotic codes. Do not draw payment execution on this map.
