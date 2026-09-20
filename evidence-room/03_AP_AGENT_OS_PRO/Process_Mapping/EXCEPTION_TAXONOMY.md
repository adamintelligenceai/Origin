# Exception Taxonomy

**Product:** AP Agent OS — Evidence Room  
**Owner of the list:** Process owner (local codes may be added; these names are not to be aliased)  
**Use:** Park reasons, chase design, agent training labels, KPI splits  
**Example organisation:** Northline Industrials (fictional)

An exception is a reason the invoice cannot move to the next signed state. It is not a suspicion of fraud, a compliance finding, or an accounting adjustment.

**Risk levels** describe the *process and financial-exposure risk of handling the case badly* (wrong post, wrong entity, wrong payee data, silent override). They are not residual-risk scores for the organisation.

**Automation potential** is a design hint: High = rules and data usually suffice for a proposal; Low = commercial or master-data judgement dominates. It is not a commitment to automate.

**Potential agent** is the first agent that should draft or flag. The human in **Responsible party** remains Accountable per the RACI.

---

## How to apply a code

1. Apply the code that **blocks posting first**. Record related codes in the same pack.
2. Do not invent a synonym. If the case is new, add a code through change control.
3. When two codes fit equally, use the order in `TRANSCRIPT_TO_WORKFLOW.md` Pass 6, or the local signed order.
4. “Potential duplicate” is not “duplicate”. Do not collapse them for convenience.
5. Ageing starts on the day the code is set, not on invoice date, unless the local SOP says otherwise.

---

## Catalogue

### EX-MPO — Missing PO

| Field | Content |
|---|---|
| Definition | Invoice is on a PO path (or should be) and no usable PO number is present on the face or on a buyer-confirmed reference stored on the record. |
| Probable root cause | Supplier omitted the PO; buyer did not raise a PO; PO number unreadable; processor recollection used and failed. |
| Required data | Invoice face, supplier account, buyer identity if known, recent POs for that supplier (for investigation only, not as a silent source). |
| Suggested resolution | Ask supplier for the PO number; if none exists, buyer raises a PO or redirects to the non-PO path under that path’s controls. |
| Responsible party | AP processor (chase); buyer (commercial source). |
| Escalation | AP lead at 3 working days; process owner at 10 if still unreferenced. |
| Potential agent | Exception Agent (code); Supplier Comms Agent (draft request); Internal Chase Agent (buyer). |
| Automation potential | Medium — chase drafts are standard; deciding to waive PO is not. |
| Risk level | Medium |

---

### EX-IPO — Invalid PO

| Field | Content |
|---|---|
| Definition | A PO number is present but does not exist in the ERP for the billed entity, or does not belong to this supplier relationship. |
| Probable root cause | Typo; OCR error; PO from another entity; supplier reused an old number; quotation number presented as PO. |
| Required data | Presented PO number, entity, supplier account, ERP PO search result. |
| Suggested resolution | Re-read the face; confirm with supplier or buyer; do not switch entity to make the PO valid. |
| Responsible party | AP processor; buyer if the number was issued internally. |
| Escalation | AP lead at 2 working days when the number is structurally valid but unmatched. |
| Potential agent | Match Agent (lookup); Extraction Agent (re-read); Supplier Comms Agent. |
| Automation potential | High for lookup and re-extraction; Low for commercial confirmation. |
| Risk level | Medium |

---

### EX-POC — PO closed

| Field | Content |
|---|---|
| Definition | PO exists but is closed for invoicing (or equivalent local status). |
| Probable root cause | Final invoice already processed; buyer closed early; returns closed the residual; status error. |
| Required data | PO status, closure date, residual history, prior invoices against the PO. |
| Suggested resolution | Buyer re-opens with a reason, or supplier issues a credit and a new PO invoice, or the invoice is returned. Processors do not re-open POs. |
| Responsible party | Buyer (status); AP processor (park and chase). |
| Escalation | AP lead at 5 working days; procurement lead if closure is disputed. |
| Potential agent | Match Agent (status); Internal Chase Agent. |
| Automation potential | High for detection; Low for re-open. |
| Risk level | Medium |

---

### EX-POE — PO exhausted

| Field | Content |
|---|---|
| Definition | PO is open but remaining quantity or value cannot cover this invoice under the signed match tree. |
| Probable root cause | Overbill; additional delivery not added to the PO; prior invoices consumed residual; tolerance misunderstood. |
| Required data | PO original qty/value, invoiced-to-date, receipts, this invoice lines, tolerance table. |
| Suggested resolution | Buyer amends PO, or supplier revises invoice, or a new PO is raised for the excess. Do not “force match” by ignoring residual. |
| Responsible party | Buyer; AP processor. |
| Escalation | AP lead at 5 working days; controller if value exceeds a named band. |
| Potential agent | Match Agent; Exception Agent; Internal Chase Agent. |
| Automation potential | High for residual arithmetic; Low for amendment. |
| Risk level | High |

---

### EX-PRM — Price mismatch

| Field | Content |
|---|---|
| Definition | Invoice unit price (or priced line) differs from the PO beyond the signed tolerance. |
| Probable root cause | Price increase not on PO; discount omitted; wrong catalogue; freight blended into unit price; currency or unit-of-measure confusion. |
| Required data | Invoice unit price, PO unit price, UoM, currency, tolerance table, buyer price file if used. |
| Suggested resolution | Buyer accepts and amends PO, or supplier issues a revised invoice or credit. Informal “looks fine” is not acceptance. |
| Responsible party | Buyer (commercial); AP processor (park). |
| Escalation | AP lead at 5 working days; procurement lead for repeat supplier variance. |
| Potential agent | Match Agent; Internal Chase Agent; Supplier Comms Agent after buyer instruction. |
| Automation potential | High for detection; Low for acceptance. |
| Risk level | High |

---

### EX-QTM — Quantity mismatch

| Field | Content |
|---|---|
| Definition | Invoice quantity differs from the comparable PO or receipt quantity in a way DT-MATCH rejects. Distinct from partial receipt when the receipt is the constraint. |
| Probable root cause | Overbill; short shipment already invoiced in full; UoM (e.g. packs vs each); duplicate line; service quantity estimated. |
| Required data | Invoice qty, PO qty, received qty, UoM conversion, prior invoices on the lines. |
| Suggested resolution | Align to received qty (credit / revised invoice) or complete receipt if goods are actually received and unrecorded. |
| Responsible party | AP processor; receiver if GRN is short; buyer if PO qty is wrong. |
| Escalation | AP lead at 5 working days. |
| Potential agent | Match Agent; Internal Chase Agent. |
| Automation potential | High for detection and UoM checks; Medium for chase. |
| Risk level | High |

---

### EX-MRX — Missing receipt

| Field | Content |
|---|---|
| Definition | A receipt is required on this path and none exists against the PO lines being billed. |
| Probable root cause | Goods not received; received but not recorded; receipt in another plant/entity; service path misclassified as goods. |
| Required data | PO lines, GRN enquiry, delivery note on the invoice if any, plant/location. |
| Suggested resolution | Receiver records the GRN if goods are in; otherwise return or hold the invoice. Do not post on an email assurance alone. |
| Responsible party | Receiver first; buyer if receiver is silent; AP processor chases. |
| Escalation | Internal Chase at day 0; AP lead at day 3; process owner at day 10. |
| Potential agent | Match Agent (detect); Internal Chase Agent (draft). |
| Automation potential | High for detection and templated chase; Low for creating a GRN. |
| Risk level | Medium |

---

### EX-PRX — Partial receipt

| Field | Content |
|---|---|
| Definition | Receipt quantity is greater than zero and less than invoice quantity on a required line. |
| Probable root cause | Split delivery; invoice for a full order after first drop; GRN incomplete. |
| Required data | Invoice qty, received qty, outstanding inbound if visible, prior partial invoices. |
| Suggested resolution | Park the excess (credit / revised invoice) or wait for remaining GRN. Local SOP may allow line-level partial post if the ERP and control owner permit — write that rule if used. |
| Responsible party | AP processor; receiver; buyer. |
| Escalation | Day 5 AP lead if neither GRN nor credit is moving. |
| Potential agent | Match Agent; Exception Agent; Internal Chase Agent. |
| Automation potential | High for line arithmetic; Medium for partial-post proposals if authorised. |
| Risk level | Medium |

---

### EX-DUP — Duplicate invoice

| Field | Content |
|---|---|
| Definition | The same supplier account (or confirmed same legal supplier) and the same invoice number already exist as posted or in-process. |
| Probable root cause | Supplier reissued PDF; second channel (mail + portal); processor re-keyed; credit-and-rebill confusion. |
| Required data | Supplier account/group, invoice number, existing document id and status, amounts, dates. |
| Suggested resolution | AP lead confirms and closes as X4. Do not post. If the original is wrong, that is a separate correction. |
| Responsible party | AP lead to confirm; processor to park. |
| Escalation | Same day to AP lead; controller if a duplicate has already posted. |
| Potential agent | Duplicate Agent; Exception Agent. |
| Automation potential | High for exact-key detection; confirmation remains human. |
| Risk level | Critical if a second post is possible; High at the park stage |

---

### EX-PDUP — Potential duplicate

| Field | Content |
|---|---|
| Definition | Strong similarity without an exact supplier+invoice-number match: near-identical amount and date, one-character invoice-number variance, same number under another site, or OCR-likely collision. |
| Probable root cause | Site-code split; OCR of similar glyphs; supplier number-format change; genuine separate invoices that look alike. |
| Required data | Candidate pair, site/group hierarchy, images of both faces, amounts, dates, POs. |
| Suggested resolution | AP lead inspects both faces and statuses. Promote to EX-DUP or clear with a reason on the record. |
| Responsible party | AP lead. |
| Escalation | Controller if the pair includes a posted item and doubt remains. |
| Potential agent | Duplicate Agent. |
| Automation potential | Medium — scoring is useful; the call is human. |
| Risk level | High |

---

### EX-WSP — Wrong supplier

| Field | Content |
|---|---|
| Definition | Invoice does not belong to the supplier account selected, or the trading party on the face is not the party in master data. |
| Probable root cause | Similar names; factoring/assignment not on master; invoice from a subcontractor presented as the PO supplier; site vs head-office confusion. |
| Required data | Face legal name and identifiers, master-data legal name, PO supplier, any remit-to party. |
| Suggested resolution | Recode to the correct account, or raise master-data work. Do not pay a different party to “make it match”. |
| Responsible party | AP processor; master-data steward if a new account is required. |
| Escalation | AP lead at 2 working days; controller if remit-to differs from supplier. |
| Potential agent | Quality Agent; Extraction Agent; Exception Agent. |
| Automation potential | Medium for name/identifier compare; Low for new-party decisions. |
| Risk level | High |

---

### EX-ILE — Incorrect legal entity

| Field | Content |
|---|---|
| Definition | Bill-to name or registered number is not the entity in scope for this invoice record. |
| Probable root cause | Shared brand across entities; supplier billed the wrong company; processor selected the familiar company code. |
| Required data | Bill-to name, registered number, entity register, PO entity. |
| Suggested resolution | Recreate in the correct entity or return to supplier. Do not post in the convenient entity. |
| Responsible party | AP processor; entity accountant if allocation is disputed. |
| Escalation | AP lead at 2 working days; controller if intercompany is being used as a shortcut. |
| Potential agent | Quality Agent; Classification Agent. |
| Automation potential | High when identifiers are printed; Low when only a logo is present. |
| Risk level | Critical |

---

### EX-TAX — Tax issue

| Field | Content |
|---|---|
| Definition | Tax amount, tax code, or taxability on the invoice does not agree with the applied coding under DT-TAX, or required tax fields are missing. |
| Probable root cause | Wrong code inherited; supplier tax treatment changed; mixed-rate invoice; rounding; extraction error on the tax total. |
| Required data | Face tax, line nets, applied tax code, rate table, supplier tax identifier. |
| Suggested resolution | Processor applies the standing instruction if one exists; otherwise tax specialist sets the code. Agent does not invent a code. |
| Responsible party | AP processor (standing cases); tax specialist (the rest). |
| Escalation | Tax specialist same day above a named amount; AP lead for standing-instruction gaps. |
| Potential agent | Tax Agent (flag and calculate); Extraction Agent if the face total is the issue. |
| Automation potential | Medium — compare is automatable; treatment is not always. |
| Risk level | High |

This code is a process exception. It is not a tax-authority filing and not a compliance attestation.

---

### EX-APM — Approval missing

| Field | Content |
|---|---|
| Definition | An approval instance required by DT-POST / the DOA table is not present in the system of record. |
| Probable root cause | Approver not routed; email approval not transcribed; approver left; non-PO path used without a requisition. |
| Required data | Invoice amount, DOA table, current approver, any side-channel approval (to be transcribed, not used raw). |
| Suggested resolution | Route in the system of record. Side-channel yes becomes evidence only after the approver repeats it there, unless the control owner has a written compensating rule. |
| Responsible party | Approval Agent routes; human approver approves; AP processor parks. |
| Escalation | Day 3 AP lead; day 7 process owner; DOA owner if the table is wrong. |
| Potential agent | Approval Agent; Internal Chase Agent. |
| Automation potential | High for routing and chase; none for the approval itself. |
| Risk level | High |

---

### EX-DOA — DOA issue

| Field | Content |
|---|---|
| Definition | Delegation of authority cannot be applied: table missing, approver lacks limit, split designed to evade a limit, or expired delegate. |
| Probable root cause | Stale DOA; acting-role not updated; invoice split; currency conversion not applied to the limit. |
| Required data | DOA table version, approver limit, invoice amount and currency, delegate record. |
| Suggested resolution | DOA owner corrects the table or names a valid approver. Processors do not raise limits. |
| Responsible party | Control owner / DOA owner; AP lead parks. |
| Escalation | Immediate to control owner when evasion is suspected; otherwise day 2. |
| Potential agent | Approval Agent (detect); Exception Agent. |
| Automation potential | Medium for limit tests; Low for table repair. |
| Risk level | Critical |

---

### EX-CDM — Coding missing

| Field | Content |
|---|---|
| Definition | Required coding-block segments are empty (GL, cost centre, project, or local equivalent). |
| Probable root cause | Non-PO invoice without a requisition; PO without account assignment; standing rule expired. |
| Required data | Path type, PO account assignment, requisition, standing coding rule if any. |
| Suggested resolution | Inherit from PO; else buyer or budget holder provides coding in the system of record. |
| Responsible party | AP processor (inherit); buyer/budget holder (non-PO). |
| Escalation | Day 3 AP lead. |
| Potential agent | Coding Agent (propose); Internal Chase Agent. |
| Automation potential | High on PO inherit; Medium on standing rules; Low on novel spend. |
| Risk level | Medium |

---

### EX-ICC — Invalid cost centre

| Field | Content |
|---|---|
| Definition | Cost centre (or equivalent) is present but closed, not valid for the entity, or not valid for the GL. |
| Probable root cause | Reorganisation; wrong entity; copied from an old invoice; agent proposed a look-alike code. |
| Required data | Cost-centre master, entity, GL combination rules. |
| Suggested resolution | Budget holder supplies a valid combination. Do not substitute a neighbouring cost centre. |
| Responsible party | Budget holder; AP processor. |
| Escalation | Day 3 AP lead; finance ops if the master is wrong. |
| Potential agent | Coding Agent (validate); Exception Agent. |
| Automation potential | High for validation; Low for substitution. |
| Risk level | Medium |

---

### EX-IQ — Invoice quality

| Field | Content |
|---|---|
| Definition | Required commercial or legal-face fields are missing, contradictory, or unreadable for reasons other than an extraction-engine failure. |
| Probable root cause | Pro-forma sent as invoice; missing invoice number; unreadable scan from the supplier; contradictory totals. |
| Required data | Quality checklist, face image, required-field list for the path. |
| Suggested resolution | Return to supplier or request a reissue. Do not construct an invoice number. |
| Responsible party | AP processor; Supplier Comms Agent drafts the return. |
| Escalation | AP lead if the supplier disputes that the document is incomplete. |
| Potential agent | Quality Agent; Supplier Comms Agent. |
| Automation potential | High for checklist; Medium for return drafts. |
| Risk level | Medium |

---

### EX-OCR — OCR / extraction issue

| Field | Content |
|---|---|
| Definition | A machine extraction was attempted and failed the field-level confidence floor, or a human review shows systematic field error, while the face itself is usable. |
| Probable root cause | Poor image, unusual layout, multi-page totals, stamp over amount, model drift. |
| Required data | Image, extraction log, confidence by field, gold-label if in test. |
| Suggested resolution | Manual capture from the face; re-scan if the file is degraded; log for extraction review. Not a supplier return unless the face is also unusable (then EX-IQ). |
| Responsible party | AP processor (capture); implementation lead (model/quality review). |
| Escalation | Implementation lead if field-fail rate exceeds the weekly threshold. |
| Potential agent | Extraction Agent; Quality Agent. |
| Automation potential | Medium — re-extract and highlight; capture remains human until floors are met. |
| Risk level | Medium |

---

### EX-MDI — Master-data issue

| Field | Content |
|---|---|
| Definition | Supplier, site, tax identifier, or payment-term master data is missing, blocked, duplicated, or inconsistent, and the invoice cannot proceed. |
| Probable root cause | New supplier not created; blocked for a reason; duplicate accounts; expired identifier. |
| Required data | Face identifiers, master record, block reason, duplicate-account search. |
| Suggested resolution | Master-data steward amends via the master-data procedure. Processors do not edit bank or tax identifiers on the master. |
| Responsible party | Master-data steward; AP processor parks. |
| Escalation | Day 2 AP lead; control owner if the block is risk-related. |
| Potential agent | Quality Agent (flag); Exception Agent. |
| Automation potential | Low on writes; High on detecting empty or blocked fields. |
| Risk level | High |

---

### EX-BNK — Banking-change concern

| Field | Content |
|---|---|
| Definition | Bank details on the invoice or in an accompanying message differ from the supplier master, or a change is requested in the same episode as an invoice. |
| Probable root cause | Genuine change; factoring; layout of remittance advice; social-engineering attempt. The code does **not** decide which. |
| Required data | Face remittance details (masked in display), master bank record (masked), channel of the request, invoice id. |
| Suggested resolution | Park. Raise a master-data change request if, and only if, the steward follows the independent verification procedure. Agent never writes the bank master. Invoice may later post with a payment hold until the master is resolved. |
| Responsible party | Master-data steward; AP lead sets hold; control owner for the procedure. |
| Escalation | Immediate to AP lead and steward. Controller if the request arrived through an unusual channel. |
| Potential agent | Quality Agent (flag difference); Payment Pack Agent (hold candidate). |
| Automation potential | High for comparison flags; none for the change. |
| Risk level | Critical |

This control reduces a specific payee-data error. It is not a fraud-detection programme and must not be described as one.

---

### EX-CNR — Credit note required

| Field | Content |
|---|---|
| Definition | The payable cannot be righted by posting the invoice as presented; a supplier credit (or equivalent) is required. |
| Probable root cause | Pricing or quantity already billed in error; returns; agreed rebate; duplicate that the supplier must credit rather than AP closing locally. |
| Required data | Original invoice, variance arithmetic, buyer or supplier agreement if any. |
| Suggested resolution | Request the credit; match it via the credit-note path when it arrives. Do not silently reduce the invoice in the ERP unless the local SOP and control owner allow a documented adjustment type. |
| Responsible party | AP processor; buyer if commercial; Credit Note Agent when the credit arrives. |
| Escalation | Day 5 AP lead; statement path if the credit is missing at statement time. |
| Potential agent | Exception Agent; Supplier Comms Agent; Credit Note Agent. |
| Automation potential | Medium for request drafts and later matching. |
| Risk level | Medium |

---

### EX-STD — Statement discrepancy

| Field | Content |
|---|---|
| Definition | Supplier statement does not agree to open items in the ERP for that supplier and entity (missing invoices, missing credits, amount differences, unallocated cash). |
| Probable root cause | Timing; invoices sent to another mailbox; credits not issued; wrong entity on the statement. |
| Required data | Statement, open-item list, recent intake log, entity filter. |
| Suggested resolution | Reconcile line by line; raise missing-invoice or credit requests; do not post from a statement line alone. |
| Responsible party | AP processor / AP lead; Statement Agent proposes matches. |
| Escalation | Day 7 AP lead; process owner for chronic suppliers. |
| Potential agent | Statement Agent; Supplier Comms Agent. |
| Automation potential | Medium for pairing; Low for disputed balances. |
| Risk level | Medium |

---

### EX-HLD — Payment hold

| Field | Content |
|---|---|
| Definition | Item is flagged to be excluded from AP’s input to the payment proposal, or already has a hold in the ERP. |
| Probable root cause | Dispute, banking concern, legal request, supplier query, control-owner instruction. |
| Required data | Hold type, setter, reason, related exception codes, expiry if any. |
| Suggested resolution | Keep the hold until the setter or control owner lifts it. Payment Pack Agent lists; it does not lift. |
| Responsible party | AP lead or controller (set/lift). |
| Escalation | Treasurer informed if a due item is held into a payment run; they do not lift an AP hold. |
| Potential agent | Payment Pack Agent; Exception Agent. |
| Automation potential | High for listing; none for lift. |
| Risk level | High |

---

### EX-DIS — Disputed invoice

| Field | Content |
|---|---|
| Definition | A named party (buyer, receiver, supplier, or control) has recorded a dispute against the invoice’s validity, amount, or performance. |
| Probable root cause | Goods rejected; service not delivered; commercial disagreement; billing outside contract. |
| Required data | Dispute owner, reason, related PO/GRN, correspondence id. |
| Suggested resolution | Park or hold; commercial owner leads; AP does not settle the dispute. May spawn EX-CNR. |
| Responsible party | Buyer or named dispute owner; AP processor maintains the park/hold. |
| Escalation | Procurement lead at day 10; controller if legal correspondence appears. |
| Potential agent | Exception Agent; Internal Chase Agent; Supplier Comms Agent (after owner instruction). |
| Automation potential | Low on the dispute; High on status and ageing. |
| Risk level | High |

---

### EX-AGE — Aged unresolved item

| Field | Content |
|---|---|
| Definition | An exception has exceeded the signed ageing trigger for its original code and still has no terminal state. |
| Probable root cause | Chase silence; unclear owner; oscillating codes; waiting on a credit that never arrives. |
| Required data | Original code, age, last chase, current owner, value. |
| Suggested resolution | Re-validate the original code; assign a single owner; escalate on the original path. Do not use EX-AGE as the first code. |
| Responsible party | AP lead. |
| Escalation | Process owner at first EX-AGE; controller above a named value band. |
| Potential agent | Exception Agent (ageing); Evidence Agent (pack for review). |
| Automation potential | High for detection; Low for unblock. |
| Risk level | High |

---

### EX-SYS — System / interface error

| Field | Content |
|---|---|
| Definition | A system or interface failed: timeout, incomplete message, status not returned, posting rejected for a technical reason, or a downstream queue is stuck. |
| Probable root cause | ERP job failure; mailbox connector; extraction service; identity/permission error; schema change. |
| Required data | Error payload, request id, time, invoice id, last successful similar transaction. |
| Suggested resolution | Do not retry a posting commit without checking whether the first attempt landed. Technical owner restores the interface; AP lead decides whether to re-submit. |
| Responsible party | Systems owner; AP lead for the business retry decision. |
| Escalation | Immediate if the intake or posting channel is down; otherwise same day. |
| Potential agent | Exception Agent (flag); Evidence Agent (payload). |
| Automation potential | Medium for detection and ticket drafts; Low for retry-of-commit. |
| Risk level | High |

---

## Code index

| Code | Name | Typical first agent | Risk |
|---|---|---|---|
| EX-MPO | Missing PO | Exception, Supplier Comms | Medium |
| EX-IPO | Invalid PO | Match, Extraction | Medium |
| EX-POC | PO closed | Match, Internal Chase | Medium |
| EX-POE | PO exhausted | Match | High |
| EX-PRM | Price mismatch | Match | High |
| EX-QTM | Quantity mismatch | Match | High |
| EX-MRX | Missing receipt | Match, Internal Chase | Medium |
| EX-PRX | Partial receipt | Match | Medium |
| EX-DUP | Duplicate invoice | Duplicate | Critical / High |
| EX-PDUP | Potential duplicate | Duplicate | High |
| EX-WSP | Wrong supplier | Quality | High |
| EX-ILE | Incorrect legal entity | Quality | Critical |
| EX-TAX | Tax issue | Tax | High |
| EX-APM | Approval missing | Approval | High |
| EX-DOA | DOA issue | Approval | Critical |
| EX-CDM | Coding missing | Coding | Medium |
| EX-ICC | Invalid cost centre | Coding | Medium |
| EX-IQ | Invoice quality | Quality | Medium |
| EX-OCR | OCR / extraction issue | Extraction | Medium |
| EX-MDI | Master-data issue | Quality | High |
| EX-BNK | Banking-change concern | Quality, Payment Pack | Critical |
| EX-CNR | Credit note required | Exception, Credit Note | Medium |
| EX-STD | Statement discrepancy | Statement | Medium |
| EX-HLD | Payment hold | Payment Pack | High |
| EX-DIS | Disputed invoice | Exception | High |
| EX-AGE | Aged unresolved item | Exception | High |
| EX-SYS | System / interface error | Exception | High |

---

## Local extension rule

Northline (or any adopter) may add codes with the prefix `EX-X-` plus a three-letter local stem, a full eight-field definition, a risk level, and a signed owner. Do not reuse an existing meaning. Review extensions quarterly; promote or retire them.

Related-code fields and multi-code packs are encouraged. A second taxonomy is not.
