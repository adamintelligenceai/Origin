# Exception taxonomy

**Evidence Room · AP Agent OS Pro**  
Version 1.0 · September 2026 · Licensed material · ERP-agnostic  
Answers: *What should I do? Who owns it? What can go wrong? How control? How measure?*

---

## How to use this taxonomy

Use these codes in tickets, extraction sheets, decision trees, agent canvases, and KPI packs. Local ERP reason codes map *to* these codes; they do not replace them.

A local extract (see `TEMPLATES.md`) records frequency, ageing, and owners. This file is the definition. Do not delete a code because this month’s volume is zero.

**Automation potential** is a design hint, not a promise:

| Label | Meaning |
|---|---|
| Deterministic | Rule, key, or table should do the work. |
| Assist | Agent recommends or prepares; human decides. |
| Bounded execute | Agent may act inside a signed policy (chase, file, log). |
| None | Human only. Usually money, identity, or legal position. |

**Risk level** is inherent typical risk if the exception is mishandled — not residual after controls.

| Level | If mishandled |
|---|---|
| High | Wrong payment, duplicate payment, wrong entity, control failure, or regulatory exposure. |
| Medium | Material mis-posting, delayed payment, supplier dispute, weak audit trail. |
| Low | Rework and delay without a probable payment or entity error. |

Risk can be raised locally (e.g. a “low” invoice-quality issue on a high-value invoice).

Payment authorisation is never an exception resolution. Closing an exception does not authorise a payment.

---

## Index

| Code | Category | Typical agent | Library code (if used) | Default risk |
|---|---|---|---|---|
| E01 | Missing PO | A04, A06, A09 | `PO-MISS` | Medium |
| E02 | Invalid PO | A03, A04, A06 | `PO-MISS` | Medium |
| E03 | PO closed | A03, A04, A06 | `PO-MISS` | Medium |
| E04 | PO exhausted | A03, A04, A06 | `PO-QLTY` | High |
| E05 | Price mismatch | A03, A04, A09 | `PRC-VAR` | High |
| E06 | Quantity mismatch | A03, A04, A05 | `QTY-VAR` | High |
| E07 | Missing receipt | A05, A04 | `GR-MISS` | Medium |
| E08 | Partial receipt | A03, A05, A04 | `GR-SPLIT` | Medium |
| E09 | Duplicate invoice | A10 | `DUP-SUS` | High |
| E10 | Potential duplicate | A10, A04 | `DUP-SUS` / `ANOM-SUS` | High |
| E11 | Wrong supplier | A02, A08, A04 | `VND-UNK` | High |
| E12 | Incorrect legal entity | A02, A04 | `CUR-ERR` / entity check | High |
| E13 | Tax issue | A02, A04 | `TAX-ERR` | High |
| E14 | Approval missing | A07, A04 | `APPR-PEND` | High |
| E15 | DOA issue | A07, A16 | `CTRL-BRK` | High |
| E16 | Coding missing | A02, A04 | `HDR-ERR` / coding | Medium |
| E17 | Invalid cost centre | A02, A08 | `PO-QLTY` / coding | Medium |
| E18 | Invoice quality | A01, A08 | `HDR-ERR` | Low–Medium |
| E19 | OCR / extraction issue | A01, A04 | `LINE-ERR` | Medium |
| E20 | Master-data issue | A08, A02 | `VND-UNK` / `VND-BLK` | High |
| E21 | Banking-change concern | A08, A10, A12, A16 | `ANOM-SUS` / `PAY-HOLD` | High |
| E22 | Credit note required | A04, A08, A11 | `STMT-UNM` related | Medium |
| E23 | Statement discrepancy | A11, A04 | `STMT-UNM` | Medium |
| E24 | Payment hold | A12 (flag only), A04 | `PAY-HOLD` | High |
| E25 | Disputed invoice | A04, A08 | — | Medium |
| E26 | Aged unresolved item | A04, A16 | SLA via A16 | Medium |
| E27 | System / interface error | A16, A04 | `CTRL-BRK` | Medium |

This file is the **operating taxonomy** (E01–E27) required for process mapping and KPI packs. The Agent Library also publishes shorter reason codes (`PO-MISS`, `DUP-SUS`, …). Map local ERP reasons → **E-code first**, then to the library code if the stack needs one. Do not collapse E01–E04 into a single `PO-MISS` in the KPI pack — volume and treatment differ.

---

## E01 — Missing PO

**Definition.** Invoice claims or requires a purchase order, and no usable PO number is present or the number supplied does not exist in the system of record.

**Probable root cause.** Buyer purchased outside process; supplier omitted PO; wrong document sent; PO lives in a different ERP (common in dual-ERP groups).

**Required data.** Invoice image and extracted header; supplier ID; legal entity; amount; date; any referenced order; open PO list for that supplier/entity; buyer identity if known.

**Suggested resolution.** Confirm whether a PO should exist. If yes, locate or raise it before match. If the spend is genuinely non-PO, reclassify and send through the non-PO approval tree — do not invent a PO number.

**Responsible party.** Buyer / requestor to supply or raise the PO. AP owns triage. Procurement owns policy exceptions.

**Escalation.** Unresolved after the local chase SLA → AP supervisor → Procurement lead. High-value or repeat offenders → process owner (policy, not a one-off post).

**Potential agent.** A04 (classify and route), A06 (PO quality), A09 (internal chase for the number), A08 (if the PO exists but is invisible because of master-data / org mapping).

**Automation potential.** Assist. Bounded execute for a template chase. Not deterministic: “missing” can mean several things.

**Risk level.** Medium (High if posted as non-PO to bypass match).

**Measure / evidence.** Time-to-PO-identified; repeat rate by buyer/supplier; evidence of chase and response. KPI: missing-PO count, repeat exception rate.

---

## E02 — Invalid PO

**Definition.** A PO number is present but is not valid for this invoice: wrong supplier on the PO, wrong company code / entity, wrong currency, deleted, or otherwise not usable for match.

**Probable root cause.** Supplier reused an old PO; buyer gave the wrong number; intercompany confusion; ERP change left stale numbers in circulation.

**Required data.** PO header (supplier, entity, currency, status, account assignment); invoice header; vendor master; entity calendar.

**Suggested resolution.** Match to the correct PO if the buyer confirms it. Otherwise return to supplier or convert to the correct path (new PO or non-PO). Do not overwrite PO supplier to force a match.

**Responsible party.** Buyer confirms intended PO. AP does not “fix” PO identity.

**Escalation.** Buyer silent → requester’s manager. Suspected misuse of another cost centre’s PO → Procurement + Controls.

**Potential agent.** A03 (deterministic validity checks), A04 (route), A06.

**Automation potential.** Deterministic for validity flags. Assist for choosing the replacement PO.

**Risk level.** Medium.

**Measure / evidence.** Invalid-PO rate by supplier; evidence that validity checks ran before any model suggestion.

---

## E03 — PO closed

**Definition.** Referenced PO is closed, finally invoiced, or otherwise blocked for further invoicing, and the invoice still cites it.

**Probable root cause.** Late invoice after close; supplier billing a residual; buyer closed the PO after a short-ship; credit-and-rebill using the old number.

**Required data.** PO status history; invoiced-to-date; GR history; close reason; invoice date vs close date.

**Suggested resolution.** Determine whether the close was correct. If residual is legitimate, reopen under policy or raise a new PO. If the invoice is late and unowed, return / credit.

**Responsible party.** Buyer / Procurement own reopen-or-refuse. AP parks the invoice.

**Escalation.** Reopen requests above a local threshold → Procurement controller. Pattern of late invoices after close → supplier performance, not a standing reopen.

**Potential agent.** A03 (status check), A04, A06, A08 (request credit or revised PO reference).

**Automation potential.** Deterministic detection. Assist on reopen vs refuse. Execute never reopens a PO.

**Risk level.** Medium.

---

## E04 — PO exhausted

**Definition.** PO is open but remaining value or quantity is insufficient for this invoice (after considering tolerances and prior invoices).

**Probable root cause.** Scope increase not reflected on the PO; duplicate billing against the same lines; tolerance abuse; original PO under-raised.

**Required data.** PO line remaining qty/value; tolerance table; prior invoices against the PO; contract if any; change-order policy.

**Suggested resolution.** Change order or new PO for legitimate extra spend. If the invoice exceeds what was received and ordered, treat as price/qty mismatch or dispute. Do not raise remaining value “to clear the queue.”

**Responsible party.** Buyer / Procurement for change order. AP for parking and evidence.

**Escalation.** Exhaustion above DOA of the original approver → new approval under current DOA, not a rubber stamp of the old PO.

**Potential agent.** A03 (remaining-value calc), A04, A06.

**Automation potential.** Deterministic detection and remaining-value arithmetic. Assist on treatment.

**Risk level.** High — this is a common path to paying unauthorised spend.

**Control.** A03 must not silently apply a tolerance that effectively creates budget. Tolerance tables are certified (see control matrix).

---

## E05 — Price mismatch

**Definition.** Invoice unit price or line/header amount differs from the PO (or contract) beyond the certified tolerance.

**Probable root cause.** Price change not on PO; tax/freight treated as price; UoM confusion; supplier error; unofficial “known variance” lists.

**Required data.** PO price, invoice price, currency and FX date, UoM, freight/tax split, tolerance table, contract price if governing.

**Suggested resolution.** Recalculate with tax and freight stripped to the comparison basis. If still out of tolerance, buyer confirms and a PO change or credit follows. Human override only, logged.

**Responsible party.** Buyer confirms commercial position. AP does not accept a verbal “it’s fine” as a price change.

**Escalation.** Override above local band → AP supervisor + documented buyer approval. Repeat supplier variances → Procurement.

**Potential agent.** A03 (deterministic compare), A04 (explain), A09 (draft the buyer question).

**Automation potential.** Deterministic compare. Assist for explanation. None for override.

**Risk level.** High.

**Measure.** Price-mismatch rate; override rate; $ value overridden (customer currency, customer baseline).

---

## E06 — Quantity mismatch

**Definition.** Invoice quantity differs from PO remaining quantity and/or received quantity beyond tolerance.

**Probable root cause.** Partial shipment invoiced in full; packing-slip vs PO UoM; services billed on a different unit; duplicate line.

**Required data.** PO qty, GR qty, previously invoiced qty, UoM conversion, service entry if used.

**Suggested resolution.** Align with receipts (E07/E08) or correct the invoice. Do not goods-receipt “to match” after the fact without the receiving policy allowing it.

**Responsible party.** Receiver / buyer for quantity truth. AP for the document.

**Escalation.** Negative GR remaining → treat as potential duplicate or overbill (E09/E10/E25).

**Potential agent.** A03, A04, A05.

**Automation potential.** Deterministic compare. Assist on treatment.

**Risk level.** High.

---

## E07 — Missing receipt

**Definition.** A receipt (goods receipt or service entry) is required for match and is not present.

**Probable root cause.** Goods at the dock unreceived; service delivered without entry; receipt in another plant/system; invoice arrived before goods.

**Required data.** PO, inbound delivery if any, receiver identity, invoice date vs promised date, prior chase history.

**Suggested resolution.** Chase the named receiver (A12). Do not auto-receipt. If policy allows a time-boxed wait, park — do not post.

**Responsible party.** Receiver / buyer. AP owns the chase clock.

**Escalation.** SLA breach → receiver’s manager. Repeat missing GR on a plant → operations, not AP overtime.

**Potential agent.** A05 (prepare/send approved-template chase), A04, A09.

**Automation potential.** Bounded execute for chases. None for creating the receipt.

**Risk level.** Medium (High if someone receipts without goods to clear ageing).

**Measure.** Missing-receipt reduction vs customer baseline; on-time chase; time-to-receipt after chase.

---

## E08 — Partial receipt

**Definition.** Receipt exists but covers only part of the invoiced quantity/value, and policy does not allow posting the unmatched remainder.

**Probable root cause.** Split deliveries; invoice for a full order after first drop; services milestone vs full bill.

**Required data.** Receipt lines vs invoice lines; policy on partial-bill posting; remaining expected receipts.

**Suggested resolution.** Post only what policy allows against received qty, or park pending further GR, or request a split invoice. Prefer a supplier split over a forced full post.

**Responsible party.** AP applies policy. Buyer/receiver confirm remaining goods.

**Escalation.** Supplier refuses to split → AP supervisor + Procurement.

**Potential agent.** A03 (partial-match arithmetic), A05, A04.

**Automation potential.** Deterministic arithmetic. Assist on whether to request a split.

**Risk level.** Medium.

---

## E09 — Duplicate invoice

**Definition.** The invoice is the same payable as one already parked, posted, or paid, under the organisation’s *exact* duplicate definition.

**Probable root cause.** Supplier re-sent; dual channels (portal + email); clerk re-entered after a park; credit-and-rebill without cancelling the first.

**Required data.** Composite key as certified (typically supplier + invoice number + amount + date + entity, plus document type). Existing documents in all in-scope ERPs. Payment status of the first document.

**Suggested resolution.** Block. Do not post. Notify supplier if a statement will otherwise re-claim it. If the first document is wrong and this is the correction, cancel/reverse under policy — do not keep both.

**Responsible party.** AP supervisor on confirmation of exact-key hit. Payments/Treasury informed if the first is already in a proposal.

**Escalation.** Exact-key hit after payment of the first → incident (possible duplicate payment). IA informed.

**Potential agent.** A10.

**Automation potential.** Deterministic block on the certified key. This is not a job for a model as the primary control.

**Risk level.** High.

**Measure.** Duplicates detected; duplicate payments prevented *where measurable* (first unpaid and blocked, or recovered). Do not count “potential” as prevented.

---

## E10 — Potential duplicate

**Definition.** Similarity suggests a duplicate (near number, same amount/date/supplier, cross-ERP lookalike) but the exact key does not hit.

**Probable root cause.** Invoice-number formatting; OCR error on the number; two legal documents that look alike; legitimate rebill.

**Required data.** Near-key features; both images; PO/GR links; payment status; credit-note history.

**Suggested resolution.** Human decision with both documents on screen. Agent recommends and highlights diffs. Do not auto-block on near-key (false positives starve suppliers) and do not auto-post.

**Responsible party.** AP clerk / supervisor per DOA.

**Escalation.** Cross-entity or cross-ERP near-duplicate → A10 / A16 and supervisor.

**Potential agent.** A10 (recommend), A04.

**Automation potential.** Assist. Deterministic only for the features that feed the queue, not for the decision.

**Risk level.** High.

**Measure.** FPR and FNR on the near-duplicate queue vs a dual-reviewed sample. Human is not sole ground truth.

---

## E11 — Wrong supplier

**Definition.** Invoice is billed by, or has been assigned to, a different supplier than the one that should be paid (including lookalikes and factoring without a recorded assignment).

**Probable root cause.** Similar names; shared VAT IDs; buyer selected the wrong vendor; factoring; master-data duplicate vendors.

**Required data.** Invoice legal name, address, tax ID, bank hint; vendor master candidates; PO supplier; assignment/factoring records.

**Suggested resolution.** Resolve identity before any match or payment proposal. Do not pay the “closest” vendor. Create or select the correct vendor under master-data policy.

**Responsible party.** AP + master-data steward. Buyer confirms commercial counterparty.

**Escalation.** Lookalike + bank-detail difference → treat as E21 as well. Suspected fraud pattern → Controls / Security, halt the document.

**Potential agent.** A02 / A08 (recommend), A04.

**Automation potential.** Assist. None for creating a vendor or changing the payee.

**Risk level.** High.

---

## E12 — Incorrect legal entity

**Definition.** Invoice is addressed to, or has been captured against, the wrong company / establishment / books.

**Probable root cause.** Dual ERP; shared brands; supplier bill-to list out of date; clerk defaulted the last entity used.

**Required data.** Bill-to name and address; tax registration; PO entity; contract entity; intercompany flags.

**Suggested resolution.** Recapture against the correct entity. If the supplier billed the wrong entity, request a correctly addressed invoice — posting to the “right” books on the wrong legal document is a policy decision, not a default.

**Responsible party.** AP. Tax consulted when registrations differ.

**Escalation.** Cross-border entity error → Tax + Controller. Repeat → A11 to correct supplier master bill-to.

**Potential agent.** A02, A04.

**Automation potential.** Assist (recommend entity). Deterministic checks on tax ID vs entity.

**Risk level.** High — wrong-entity postings distort all downstream controls.

---

## E13 — Tax issue

**Definition.** VAT/GST/sales tax/withholding on the invoice is missing, wrong-rated, wrong-jurisdiction, or inconsistent with the entity and supply.

**Probable root cause.** Supplier error; reverse-charge missed; entity registration mismatch; freight taxed incorrectly; model or clerk guessed a code.

**Required data.** Entity tax registration, place of supply, material/service tax category, supplier tax status, invoice tax breakdown, local tax matrix.

**Suggested resolution.** Compare to the certified tax matrix (deterministic). Material uncertainty → Tax. Do not let A09 “pick a rate that posts.”

**Responsible party.** Tax on position. AP on capture. A09 recommends only.

**Escalation.** Material amount or new jurisdiction → Tax before post. Filing positions are never an agent action.

**Potential agent.** A02, A04.

**Automation potential.** Deterministic matrix. Assist on residual. None for filing or for overriding the matrix.

**Risk level.** High.

---

## E14 — Approval missing

**Definition.** Required approval has not been recorded in the system of record.

**Probable root cause.** Email approval not transcribed; approver left; workflow never started; non-PO path skipped; agent prepared a packet that nobody submitted.

**Required data.** DOA table, document amount (in approval currency), account assignment, current approver, evidence of any off-system approval.

**Suggested resolution.** Start or resume the formal workflow. Off-system approvals are re-entered as evidence, not treated as sufficient on their own unless policy explicitly allows and A16 stores the artefact.

**Responsible party.** Approver. AP monitors the clock. A10 prepares the packet only.

**Escalation.** SLA breach → approver’s delegate, then their manager. Pattern of email-only approvals → control finding.

**Potential agent.** A07 (prepare), A04 (ageing).

**Automation potential.** Bounded execute for reminders. None for the approval itself.

**Risk level.** High.

---

## E15 — DOA issue

**Definition.** An approval exists but is invalid: approver lacks limit, is the requestor, is the vendor contact, is terminated, or the split was engineered to stay under a limit.

**Probable root cause.** Stale DOA table; self-approval; invoice splitting; acting-up not updated; agent routed to the last person who approved a similar bill.

**Required data.** Current DOA, HR status, requestor identity, related invoices in the split window, SoD matrix.

**Suggested resolution.** Re-route to a valid approver. Splits that appear designed to avoid DOA → Controls. Do not “find someone who will click.”

**Responsible party.** AP supervisor + Controls. DOA table owner (usually Finance) for table errors.

**Escalation.** Self-approval or split pattern → IA. Terminated approver still active in workflow → access-termination incident.

**Potential agent.** A07 (detect and re-route recommendation), A16 (dispatch / log).

**Automation potential.** Deterministic checks on limits, HR status, self-approval. None for granting a limit.

**Risk level.** High.

---

## E16 — Coding missing

**Definition.** Required GL / account assignment / tax code / project / intercompany fields are absent.

**Probable root cause.** Non-PO invoice; incomplete PO account assignment; new spend type; clerk waiting on the buyer.

**Required data.** Coding policy, historical postings for the supplier/entity (as *suggestion only*), PO account assignment, requestor.

**Suggested resolution.** A08 proposes from policy and PO first, history second. Human accepts. Do not execute coding on a new supplier or new GL without confirmation.

**Responsible party.** Requestor / buyer for non-PO. AP for completeness. Controller for policy.

**Escalation.** No policy for this spend → Controller, not a creative clerk or model.

**Potential agent.** A02, A04.

**Automation potential.** Assist. Bounded execute only on a *locked* policy (signed canvas).

**Risk level.** Medium.

---

## E17 — Invalid cost centre

**Definition.** Cost centre (or equivalent: profit centre, internal order, project WBS) is present but closed, wrong entity, or not allowed for this account / user.

**Probable root cause.** Stale default on a vendor or PO; reorganisation; copied coding.

**Required data.** CO master, entity mapping, allowed combinations, requestor’s org.

**Suggested resolution.** Replace with a valid combination confirmed by the budget owner. A15 if the master itself is wrong.

**Responsible party.** Budget owner. AP does not substitute a “parking” cost centre as policy unless one is formally designated.

**Escalation.** Reorg orphans → Finance operations / CO master owner.

**Potential agent.** A02, A08.

**Automation potential.** Deterministic validity. Assist on replacement.

**Risk level.** Medium.

---

## E18 — Invoice quality

**Definition.** The document is not processable as a legal or operational invoice: missing legal fields, unreadable pages, statement sent as invoice, missing lines, wrong currency symbol, etc.

**Probable root cause.** Photo of a screen; supplier template failure; statement/reminder mis-filed (see A02); multi-invoice PDF.

**Required data.** Image, classification (A02), required-field checklist for the entity’s jurisdiction (local list — not invented here as legal advice).

**Suggested resolution.** Reject or query with a specific defect list. Do not key from a statement and call it an invoice.

**Responsible party.** Supplier to reissue. A11 sends the defect list. AP does not “make it good enough.”

**Escalation.** Repeat quality failures → Procurement / supplier performance. Suspected constructed document → Controls.

**Potential agent.** A01, A08 (quality flags and supplier defect list).

**Automation potential.** Deterministic completeness checks. Bounded execute for a reject/query template.

**Risk level.** Low–Medium (High if someone keys a payment from a statement).

---

## E19 — OCR / extraction issue

**Definition.** Capture failed or is below the confirmation floor: wrong header fields, missed lines, split amounts, header/line disagreement.

**Probable root cause.** Poor scan; unusual layout; multi-page tables; model hallucination of a PO or tax number that looks plausible.

**Required data.** Image, raw extraction, confidence by field, schema, prior confirmed invoice from same supplier (as a check, not a copy-forward of amounts).

**Suggested resolution.** Human confirmation on failed fields. Never silently fill a PO number, bank IBAN, or tax ID from a model guess. Prefer re-scan over creative extraction.

**Responsible party.** AP clerk for confirmation. AI product owner for recurring layout failures.

**Escalation.** Hallucinated identity or bank fields → treat as a control event, not a quality nit.

**Potential agent.** A01, A04, A16 (log the hallucination).

**Automation potential.** Assist (prepare fields). Deterministic schema validation. Execute only on fields that passed confirmation policy.

**Risk level.** Medium (High for identity/bank/tax fields).

**Measure.** Extraction accuracy by field class; confirmation rate; hallucination incidents.

---

## E20 — Master-data issue

**Definition.** Vendor, bank, tax, or org master is missing, duplicate, stale, or internally inconsistent, and that defect is blocking a correct post.

**Probable root cause.** Acquisition (two ERPs, two vendor numbers); never-cleaned duplicates; unmaintained withholding flags.

**Required data.** Master records in all in-scope systems, evidence of the commercial relationship, change history.

**Suggested resolution.** A15 recommends a change pack. Humans post. Dual control on bank and tax fields. Do not work around with a “one-time vendor” unless that is a written policy.

**Responsible party.** Master-data steward. AP raises the defect. Procurement/Tax/Treasury as field owners.

**Escalation.** Duplicate vendors with different bank details → E21 + Controls.

**Potential agent.** A08, A02.

**Automation potential.** Assist. None for posting master-data.

**Risk level.** High.

---

## E21 — Banking-change concern

**Definition.** The invoice, an email, or a portal message asks for, or implies, a change to payment instructions, or the extracted bank details disagree with the master.

**Probable root cause.** Legitimate change; supplier error; invoice template leftover; social engineering / invoice fraud attempt.

**Required data.** Current master bank details, requested details, channel of the request, callback policy, recent similar attempts.

**Suggested resolution.** Stop payment-path processing. Follow the organisation’s out-of-band verification. Dual human control to change the master. A08 drafts the request only. A10 / A12 flag. A16 logs. This toolkit does not claim fraud detection — it requires the change to be treated as high-risk until verified.

**Responsible party.** Treasury / master-data + AP supervisor. Never the same person who received the email.

**Escalation.** Immediate to the bank-change procedure. If payment is in a current proposal, Treasury pulls it (human).

**Potential agent.** A08 (prepare a change pack *after* verification), A10 (flag), A12 (hold), A16.

**Automation potential.** Deterministic flag on disagreement. None for changing or using the new details.

**Risk level.** High.

**Control.** See payment-authorisation and bank-change hard controls. Agent never updates bank details.

---

## E22 — Credit note required

**Definition.** The payable should be reduced or cancelled by a credit note that has not been received or has not been linked.

**Probable root cause.** Returns; price correction; duplicate billing acknowledged by supplier; over-receipt correction.

**Required data.** Original invoice, correspondence, returns/GR reversal, statement.

**Suggested resolution.** Request and link the credit. Do not net informally on a later invoice unless policy allows documented netting. Do not pay the original in full while “waiting for the credit” without a hold (E24).

**Responsible party.** AP + buyer. Supplier issues the credit.

**Escalation.** Promised credit not received by SLA → A11 + hold.

**Potential agent.** A04, A08, A11.

**Automation potential.** Assist + bounded execute for the request template.

**Risk level.** Medium (High if the original is paid with no hold).

---

## E23 — Statement discrepancy

**Definition.** Supplier statement does not agree with open items: missing invoices, missing credits, unrecorded payments, or timing differences.

**Probable root cause.** Intake failure; unapplied payment; supplier books a duplicate AP does not have; period cut-off.

**Required data.** Statement, open items, payment history, parked documents, both ERPs if the supplier spans them.

**Suggested resolution.** Reconcile line by line. A13 proposes matches and residuals. Humans accept. Missing invoices go to intake (A01), not to a manually keyed payable from the statement.

**Responsible party.** AP reconciler. Treasury on unapplied payments.

**Escalation.** Residual above threshold → AP supervisor. Persistent unrecorded invoices → channel/intake review.

**Potential agent.** A11, A04.

**Automation potential.** Deterministic matching of exact open items. Assist on residuals.

**Risk level.** Medium.

---

## E24 — Payment hold

**Definition.** The item must not enter, or must be removed from, a payment proposal for a stated reason (dispute, missing credit, audit, bank-change, legal, cash).

**Probable root cause.** Any high-risk exception; Treasury cash stop; legal hold.

**Required data.** Hold reason code, owner, expiry or review date, linked exception codes, proposal ID if already selected.

**Suggested resolution.** Apply hold in the payment system of record. A12 may *flag* “should not be proposed.” A12 may not lift a hold. Lifting is human.

**Responsible party.** Hold owner (AP supervisor, Treasury, Legal — as coded). Payments operator executes the hold.

**Escalation.** Hold expired without review → A16 alert to owner + AP Director.

**Potential agent.** A12 (flag only), A04, A16.

**Automation potential.** Deterministic flag from linked high-risk codes. None for release.

**Risk level.** High.

---

## E25 — Disputed invoice

**Definition.** The organisation contests that the amount, supply, or terms are owed, and the item is not a routine mismatch still in query.

**Probable root cause.** Quality/service dispute; contract interpretation; unauthorised purchase; supplier claims delivery that operations deny.

**Required data.** Contract, correspondence, receiving records, prior credits, legal flags.

**Suggested resolution.** Park, hold (E24), assign a dispute owner. Agent drafts a factual pack. Humans decide commercial settlement. Do not “split the difference” in the ERP without authority.

**Responsible party.** Buyer / commercial owner. AP administers the document. Legal if named.

**Escalation.** Age + value thresholds → commercial lead, then Legal.

**Potential agent.** A04, A08 (prepare), A16.

**Automation potential.** Assist. None for settlement.

**Risk level.** Medium (High when a payment run is close).

---

## E26 — Aged unresolved item

**Definition.** An exception (any other code) has exceeded the ageing threshold and lacks a current owner action.

**Probable root cause.** Chase fatigue; leavers; unclear owner; parked-and-forgotten; waiting on a supplier who has been paid anyway.

**Required data.** Age, last action, owner, linked codes, payment status, value.

**Suggested resolution.** Re-assign, escalate, or write a close plan (credit, write-off policy, return). A04 surfaces. A16 escalates. A14 may report ageing. Do not silently post to clear ageing.

**Responsible party.** AP supervisor for the queue. Original exception owner still R until reassigned.

**Escalation.** Threshold 1 → owner’s manager. Threshold 2 → AP Director. Items in a payment proposal → Treasury same day.

**Potential agent.** A04, A16.

**Automation potential.** Deterministic ageing reports. Bounded execute for escalation notices. None for close.

**Risk level.** Medium.

**Measure.** Ageing reduction vs customer baseline; % aged items with a current owner and next action date.

---

## E27 — System / interface error

**Definition.** The process cannot proceed because a system, interface, or environment failed: intake drop, ERP dump, workflow hang, model-provider outage, clock-skewed posting periods.

**Probable root cause.** Integration defect; period close; credential expiry; vendor outage; change deployed without recertification.

**Required data.** Error payload, correlation IDs, last successful job, change calendar, fallback state.

**Suggested resolution.** Fallback in the canvas: manual queue, delayed run, or halt. Do not “retry payment-adjacent jobs” as a reflex. Treat model outage as degrade-to-human, not as skip-the-control.

**Responsible party.** AI product owner / IT for the system. AP for the business queue. A16 for the incident record.

**Escalation.** Sev per governance framework. Payment-day outages → AP Director + Treasury immediately.

**Potential agent.** A16, A04 (requeue).

**Automation potential.** Deterministic health checks. Bounded execute for requeue of *non-payment* jobs. None for unattended replay of payment-adjacent jobs.

**Risk level.** Medium (High on payment days or if retries can duplicate).

---

## Cross-cutting rules

1. **One primary code per ticket**, plus secondary codes. A missing receipt that is also aged is E07 primary, E26 secondary. A bank-detail email on an invoice is E21 primary regardless of match status.
2. **Do not invent a code for “AI unsure.”** That is a confidence failure on an existing code, or E19, or E27.
3. **Do not use E24 as a junk drawer.** Holds need a reason that is another code or a Treasury/Legal code in the local extract.
4. **Cross-ERP groups** (Northline-style SAP + NetSuite) run A10 and A02/A08 across both systems or they will pay the same invoice twice, once in each ledger.
5. **Closing an exception is not paying.** A12 never takes an exception close as authority to include an item in a run.

---

## Northline local extract (illustrative)

Fictional group, 18,000 invoices/month, SAP + NetSuite. Illustrative 90-day mix for the SAP PO slice only — not a benchmark.

| Code | Illustrative mix | Local owner | Note |
|---|---|---|---|
| E07 | 22% | Plant receivers | A05 first agent after match |
| E05 | 14% | Buyers | Unofficial variance spreadsheet to be retired |
| E04 | 9% | Procurement | Change-order discipline |
| E16 | 8% | Requestors (non-PO leaks into PO queue) | |
| E09+E10 | 7% | AP supervisor | Must run across SAP and NetSuite |
| E19 | 6% | AP + AI owner | Multi-page scans |
| E14 | 5% | Approvers | NetSuite email-approval gap is a *different* slice |
| Other | 29% | Mixed | Including E12 between manufacturing and acquired entities |

---

## Related documents

- `ER_METHODOLOGY.md` — when to localise this list
- `TEMPLATES.md` — taxonomy extract form
- `../Controls/AGENT_CONTROL_MATRIX.md`
- `../KPI_and_Measurement/KPI_FRAMEWORK.md` — exception resolution rate, repeat rate, ageing
