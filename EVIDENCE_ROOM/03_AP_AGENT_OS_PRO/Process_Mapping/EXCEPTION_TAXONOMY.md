---
title: AP Exception Taxonomy v1.0
subtitle: One primary code per item. Secondary codes allowed.
tier: Professional
code: ER-AP-EX-01
---

# How to use

Code the **presenting problem**, not the suspected personality of the buyer. Root cause is a separate field. Escalation is a role, not a name.

Risk: L = low operational, M = medium (cash/supplier), H = high (control, payment, fraud-adjacent, financial reporting).

Automation potential: D = deterministic, A = agent assist, H = human judgment.

# Codes

| Code | Name | Definition | Probable root cause | Required data | Suggested resolution | Responsible | Escalation | Agent | Auto | Risk |
|---|---|---|---|---|---|---|---|---|---|---|
| EX-PO-MISS | Missing PO | Invoice has no usable PO and policy requires one | Supplier skipped PO; requester bought off-contract | Invoice, policy, requester clues | Request PO or route as non-PO if policy allows | Buyer / requester | After SLA to Procurement Ops | 04, 08, 09 | A | M |
| EX-PO-INV | Invalid PO | PO number present but not found or not for this vendor/entity | Typo; wrong PO; recycled number | PO master, vendor, entity | Correct PO or reject | AP Validation + Buyer | High value to Procurement | 02, 04 | D/A | M |
| EX-PO-CLSD | PO closed | PO exists but is closed for invoicing | Over-receipt/invoice; early close | PO status, remaining, history | Reopen per policy or credit | Buyer / Procurement | Controller if accrued | 03, 06 | D | M |
| EX-PO-EXH | PO exhausted | Value or qty remaining insufficient | Under-ordered; split invoices; price rise | Remaining qty/value, invoice lines | Amend PO or split | Buyer | Category manager if recurring | 03, 06 | D | M |
| EX-PRC | Price mismatch | Invoice unit/price differs from PO beyond tolerance | Catalogue error; unapproved increase; UOM | PO price, invoice price, UOM, tolerance | Confirm with buyer; credit; amend | Buyer | Above tolerance band 2 to Procurement | 03 | D/A | M |
| EX-QTY | Quantity mismatch | Invoice qty differs from PO/GR | Overship; partial; UOM | PO qty, GR qty, invoice qty | Wait GR; return; credit | Receiver + Buyer | Aged to AP Manager | 03, 05 | D | M |
| EX-GR-MISS | Missing receipt | Match needs GR; none posted | Goods not received; receiver delay; service PO misused | PO, GR, location, receiver | Chase receiver; service confirm | Receiver | Manager then site lead | 05, 09 | A | M |
| EX-GR-PART | Partial receipt | GR exists but insufficient | Partial delivery; staged project | GR history, invoice | Wait; split; credit | Receiver | Project POs to PM | 03, 05 | D/A | L |
| EX-DUP-EX | Duplicate invoice | Exact or policy-exact duplicate | Resubmit; statement chase | Invoice key, paid/open index | Block and notify supplier | AP Validation | Payments if already paid | 02, 10 | D/A | H |
| EX-DUP-NEAR | Potential duplicate | Similar features, not exact | Copy/paste; revised invoice; shared amounts | Fuzzy keys, dates, amounts | Human review | AP Controls | If paid path, Payments | 10 | A | H |
| EX-VEND | Wrong supplier | Vendor on invoice ≠ expected / PO vendor | Shared remit; factoring; lookalike name | Vendor master, PO vendor, remit | Recode or reject | AP Master Data | Lookalike + bank to Controls | 02, 10 | A | H |
| EX-LE | Incorrect legal entity | Bill-to entity ≠ processing entity | Supplier master; shared SSC inbox | Entity directory, bill-to | Redirect; re-register | AP Intake | Tax if cross-border | 01, 02 | A | H |
| EX-TAX | Tax issue | VAT/GST/sales tax missing, wrong rate, or arithmetic fail | Supplier error; exemption; jurisdiction | Tax table, entity, vendor tax ID | Supplier correction or tax team | Tax / AP | Tax lead | 02 | D/A | H |
| EX-APR-MISS | Approval missing | Required approval not complete | Workflow skip; approver left | Workflow, DOA | Route correctly | Approver | After SLA to delegate admin | 07 | D | M |
| EX-DOA | DOA issue | Approver lacks authority or path is wrong | Stale DOA; split invoices | DOA table, amount, account | Re-route; update DOA | Controls | Internal Audit if patterned | 07 | D | H |
| EX-COD-MISS | Coding missing | GL / cost object not provided | Non-PO without coding; requester silence | Coding rules, requester | Chase requester | Requester / AP coder | After SLA to cost owner | 09 | A | M |
| EX-CC-INV | Invalid cost centre | Cost object closed, wrong entity, or not allowed | Reorg; stale cheat-sheet | Cost object master | Recode | Finance BP | Controller | 02, 09 | D | M |
| EX-IQ | Invoice quality | Unreadable, missing pages, non-invoice, mixed docs | Scan; supplier pack | File, page count | Return to supplier | Intake | High value same day | 01 | A | L |
| EX-OCR | OCR / extraction issue | Fields extracted wrongly or low confidence | Image quality; unusual layout | Extractor confidences, raw file | Human extract or re-scan | Intake | If systematic, IDP owner | 01, 02 | A | M |
| EX-MD | Master-data issue | Vendor / item / tax / bank master blocks processing | Stale master; duplicate vendors | Master records, change log | MDM ticket | Master Data | Bank changes to Controls | 02, 10, 12 | A | H |
| EX-BANK | Banking-change concern | Vendor bank or remit change near a payment | Fraud attempt or genuine change | Change log, verification policy | Hold and verify out-of-band | Payments + Controls | CISO/Fraud if unverified | 10, 12 | A | H |
| EX-CN | Credit note required | Overcharge, return, or duplicate needs credit | Returns; pricing | Correspondence, RMA | Request credit | Buyer / AP | Aged to AP Manager | 08 | A | M |
| EX-STMT | Statement discrepancy | Statement does not agree to AP | Timing; missing invoice; unapplied credit | Statement, AP subledger | Reconcile; request copy | Statements | Material balance to Controller | 11 | A | M |
| EX-HOLD | Payment hold | Item on hold (dispute, tax, quality, legal) | Various | Hold code | Manage hold reason | Hold owner | Per hold policy | 12 | D | H |
| EX-DISP | Disputed invoice | Business disputes liability | Service quality; contract | Dispute notes | Commercial resolution | Buyer / Legal | Legal if letter before action | 04, 08 | H | H |
| EX-AGED | Aged unresolved item | Open beyond policy with no current owner action | Lost ticket; hero left | Age, last action | Re-triage | AP Manager | Steering if systemic | 04, 16 | A | M |
| EX-SYS | System / interface error | Integration, lock, period, workflow technical fail | Release, interface, period close | Error codes | IT / support | IT + AP | If payment file, Payments | 16 | D | M |
| EX-CUT | Cut-off / completeness | Period-end item affecting completeness or accrual | Late invoice; missing GR | Period, GRNI, statements | Accrue or reject per policy | Close Lead | Controller | 13 | A | H |
| EX-UOM | Unit of measure | UOM incomparable without conversion | Catalogue vs invoice | UOM tables | Convert or credit | Buyer | Recurring to MDM | 03 | D/A | L |
| EX-CUR | Currency | Invoice currency ≠ PO or unconfigured | Vendor error; FX | Currency tables | Reject or treasury rule | AP / Treasury | Material FX to Treasury | 02 | D | M |
| EX-IC | Intercompany | IC invoice fails pairing or policy | Timing; wrong entity | IC guide | IC desk | IC accountant | Controller | 02, 13 | A | M |
| EX-PIJ | Prompt-injection / hostile content | Invoice or email attempts to instruct the agent | Malicious or accidental | Raw text | Quarantine, do not follow | Security + AP | CISO | all | H | H |

# Decision tree (first split)

1. Is the file a valid invoice? No → EX-IQ / EX-OCR  
2. Hostile instruction in text? Yes → EX-PIJ  
3. Exact duplicate? Yes → EX-DUP-EX  
4. Entity / vendor identity fail? → EX-LE / EX-VEND / EX-MD  
5. Tax arithmetic or ID fail? → EX-TAX  
6. PO required but missing/invalid/closed/exhausted? → PO codes  
7. Match fail? Price / qty / GR  
8. Approval / DOA / coding?  
9. Hold / dispute / statement / close  
10. Else EX-AGED or EX-SYS

# Starter subset

If you only implement ten codes in week one: EX-PO-MISS, EX-PRC, EX-QTY, EX-GR-MISS, EX-DUP-EX, EX-DUP-NEAR, EX-APR-MISS, EX-COD-MISS, EX-TAX, EX-AGED.
