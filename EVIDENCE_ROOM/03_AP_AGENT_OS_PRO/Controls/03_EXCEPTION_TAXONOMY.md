# Evidence Room — AP Agent OS Professional

## Controls — 03 Exception Taxonomy

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Controls  
**Standard:** Proof before permission  
**Audience:** AP Manager, exception owners, processors, Control owner, agent designers  
**ERP stance:** Agnostic. Map each code to the buyer’s reason-code field. Do not run a parallel unofficial list.  
**Examples:** ACME notes — **ILLUSTRATIVE**.  
**Version:** 1.0  

---

### Purpose

One language for why an invoice is not straight-through. Every parked item, chase, hold and report line uses a code from this file.

### Rules of use

1. **Primary code** = what stops posting or payment now. Secondary codes are allowed as tags, not as a dump into “Other.”  
2. **Do not invent codes** in a queue. If needed, raise a C2 change to this file.  
3. **UNMAPPED** is a holding status with a Q-row owner, not a permanent code.  
4. Risk **C** = Critical (money-direction, bank, identity abuse). **H/M/L** = High / Medium / Low operational impact. Buyer may re-rate; record the reason.  
5. Automation potential is about **resolution**, not detection. Detection may be High while resolution stays Low.  
6. Potential agent is a **candidate**, not permission to act. Autonomy stays with the charter.  
7. This taxonomy is not a fraud typology and not a legal classification.

Each code uses the same card: definition, probable root cause, required data, suggested resolution, responsible party, escalation, potential agent, automation potential, risk level — plus what can go wrong / control / measure / evidence.

---

## Index

| Code | Name | Risk | Automation (resolution) |
|---|---|---|---|
| EX-PO-001 | Missing PO | M | Med |
| EX-PO-002 | Invalid PO | M | Med |
| EX-PO-003 | PO closed | M | Low–Med |
| EX-PO-004 | PO exhausted | M | Med |
| EX-MAT-001 | Price mismatch | M | Med |
| EX-MAT-002 | Quantity mismatch | M | Med |
| EX-GR-001 | Missing receipt | M | Med |
| EX-GR-002 | Partial receipt | L–M | Med |
| EX-DUP-001 | Duplicate invoice | H | High (detect) / Low (void) |
| EX-DUP-002 | Potential duplicate | H | Med |
| EX-MDM-001 | Wrong supplier | H | Low |
| EX-MDM-002 | Incorrect legal entity | H | Low |
| EX-TAX-001 | Tax issue | H | Low |
| EX-APR-001 | Approval missing | M | Med |
| EX-APR-002 | DOA issue | H | Low |
| EX-COD-001 | Coding missing | M | Med |
| EX-COD-002 | Invalid cost centre | M | Med |
| EX-QLT-001 | Invoice quality | M | Med |
| EX-QLT-002 | OCR / extraction issue | M | Med |
| EX-MDM-003 | Master-data issue | M | Low |
| EX-PAY-001 | Banking-change concern | C | Low |
| EX-CN-001 | Credit note required | M | Med |
| EX-STM-001 | Statement discrepancy | M | Med |
| EX-PAY-002 | Payment hold | H | Low |
| EX-DSP-001 | Disputed invoice | H | Low |
| EX-AGE-001 | Aged unresolved item | M | Med |
| EX-SYS-001 | System / interface error | H | Low |

---

## EX-PO-001 — Missing PO

| Field | Content |
|---|---|
| **Code** | EX-PO-001 |
| **Definition** | Invoice is in a PO-required category (per buyer policy) and no usable PO reference is present, or the reference is blank after validation. |
| **Probable root cause** | Non-PO spend; supplier omitted the PO; requester bypassed procurement; channel lost the reference. |
| **Required data** | Invoice; supplier; spend category / account hint; requester if known; policy: PO-required flag; value. |
| **Suggested resolution** | Obtain a valid PO **or** follow the documented non-PO path (do not invent one). Do not manufacture a PO number. |
| **Responsible party** | Requester / Buyer **R**; Exception owner coordinates; Procurement **A** for after-the-fact PO policy. |
| **Escalation** | Repeat supplier or requester; value ≥ `[BUYER cap]`; aged past `[BUYER clock]`. |
| **Potential agent** | Exception Triage (classify); Supplier Resolution (draft request for PO#); Internal Follow-Up (requester); PO Quality (repeat bypass). |
| **Automation potential** | **Med** — request drafts High; creating a PO **Low**. |
| **Risk level** | **M** (H if high value or restricted category). |

**What can go wrong.** After-the-fact PO used to hide bypass. **Control.** Retro-PO flagged, not auto-cleared. **Measure.** Volume, repeat rate, age. **Evidence.** Exception record + policy path taken.

**ACME — ILLUSTRATIVE.** Marketing ads invoice, no PO. Routed to non-PO workflow; not parked as “wait for any PO.”

---

## EX-PO-002 — Invalid PO

| Field | Content |
|---|---|
| **Code** | EX-PO-002 |
| **Definition** | A PO number is present but is not valid for this invoice: unknown, other supplier, other entity, cancelled, or wrong document type. |
| **Probable root cause** | Typo; supplier reused an old PO; cross-entity quote; cancelled PO still printed on the template. |
| **Required data** | Invoice PO string; ERP PO header (supplier, entity, status); supplier ID. |
| **Suggested resolution** | Correct the reference if a valid PO exists; else treat as EX-PO-001 / policy path. Do not switch supplier on the PO. |
| **Responsible party** | Buyer **R**; AP Exception owner coordinates. |
| **Escalation** | Entity mismatch (also tag EX-MDM-002); supplier mismatch (tag EX-MDM-001). |
| **Potential agent** | Matching (deterministic lookup); Exception Triage; Supplier Resolution (ask for correct PO#). |
| **Automation potential** | **Med** |
| **Risk level** | **M** |

**What can go wrong.** Agent “finds a PO that fits” by amount. **Control.** PO must match supplier + entity, not only amount. **Measure.** Invalid-PO rate by supplier. **Evidence.** Lookup log.

---

## EX-PO-003 — PO closed

| Field | Content |
|---|---|
| **Code** | EX-PO-003 |
| **Definition** | Cited PO exists but is closed / finally invoiced / blocked for invoicing per ERP status. |
| **Probable root cause** | Late invoice; duplicate shipment invoicing; premature close; residual service on a closed order. |
| **Required data** | PO status, close date, close reason, invoiced-to-date, invoice date, buyer. |
| **Suggested resolution** | Buyer decides: reopen per policy, new PO, or reject / credit. AP does not reopen silently. |
| **Responsible party** | Buyer **R**; Procurement policy **A**. |
| **Escalation** | Value ≥ cap; supplier dispute (EX-DSP-001). |
| **Potential agent** | Matching; PO Quality; Internal Follow-Up; Supplier Resolution if reject/credit. |
| **Automation potential** | **Low–Med** (status detect High; reopen Low). |
| **Risk level** | **M** |

**What can go wrong.** Reopen used as a habit. **Control.** Reopen is a logged Procurement action. **Measure.** Reopen count vs rejects. **Evidence.** Status snapshot at exception time.

---

## EX-PO-004 — PO exhausted

| Field | Content |
|---|---|
| **Code** | EX-PO-004 |
| **Definition** | PO is open but remaining quantity or value is insufficient for this invoice (after documented tolerance). |
| **Probable root cause** | Under-ordered; price increase; extra lines; prior invoices consumed the PO; blanket PO poorly sized. |
| **Required data** | PO remaining qty/value; invoice qty/value; prior invoices; tolerance policy version. |
| **Suggested resolution** | Change-order / new PO / split per policy; or credit. Do not raise tolerance to fit. |
| **Responsible party** | Buyer **R**. |
| **Escalation** | Repeat exhaust on same PO; blanket PO pattern (PO Quality). |
| **Potential agent** | Matching (deterministic remaining); PO Quality; Internal Follow-Up. |
| **Automation potential** | **Med** |
| **Risk level** | **M** |

**What can go wrong.** Tolerance widened in config. **Control.** Config lock (`01_CONTROL_MATRIX.md`). **Measure.** Exhaust rate by buyer/supplier. **Evidence.** Remaining-balance snapshot.

---

## EX-MAT-001 — Price mismatch

| Field | Content |
|---|---|
| **Code** | EX-MAT-001 |
| **Definition** | Invoice price (line or header, per policy) differs from PO/contract price beyond the **documented** tolerance. |
| **Probable root cause** | Price change not on PO; tax/freight in unit price; currency; UoM; supplier error; outdated PO. |
| **Required data** | Invoice price; PO/contract price; currency; UoM; tolerance table; freight/tax treatment rule. |
| **Suggested resolution** | Buyer accepts with documented authority, or supplier revises / credits (EX-CN-001). Deterministic compare only. |
| **Responsible party** | Buyer **R**; Exception owner coordinates. |
| **Escalation** | Variance ≥ `[BUYER]` value or %; restricted items. |
| **Potential agent** | Matching (compare + explain); Exception Triage; Supplier Resolution; PO Quality if PO stale. |
| **Automation potential** | **Med** |
| **Risk level** | **M** (H if systematic overcharge). |

**What can go wrong.** Model “considers it close.” **Control.** Arithmetic compare; model cannot pass. **Measure.** Variance distribution (descriptive). **Evidence.** Compare log.

---

## EX-MAT-002 — Quantity mismatch

| Field | Content |
|---|---|
| **Code** | EX-MAT-002 |
| **Definition** | Invoice quantity differs from PO and/or receipted quantity beyond documented tolerance (two- or three-way per policy). |
| **Probable root cause** | Partial delivery invoiced in full; UoM; over-shipment; service hours vs order; duplicate shipment. |
| **Required data** | Invoice qty; PO qty; GR qty; UoM; prior invoices; tolerance. |
| **Suggested resolution** | Wait/align GR (see EX-GR-*); supplier credit; PO change. Do not receipt to match unless GR owner independently confirms receipt. |
| **Responsible party** | GR owner and/or Buyer depending on whether goods arrived. |
| **Escalation** | Over-invoice qty with no GR; repeat supplier. |
| **Potential agent** | Matching; Goods Receipt; Supplier Resolution. |
| **Automation potential** | **Med** |
| **Risk level** | **M** |

**What can go wrong.** Fake GR. **Control.** Agent cannot create GR. **Measure.** Qty-mismatch vs GR-create audit. **Evidence.** Qty snapshot.

---

## EX-GR-001 — Missing receipt

| Field | Content |
|---|---|
| **Code** | EX-GR-001 |
| **Definition** | Policy requires a goods/service receipt and none exists against the PO/line for this invoice. |
| **Probable root cause** | Goods not in; GR not entered; service confirmation lag; wrong PO so GR sits elsewhere; interface lag (consider EX-SYS-001). |
| **Required data** | PO; GR records; requester / receiver; delivery note if any; invoice date; interface heartbeat. |
| **Suggested resolution** | Confirm physical/service receipt; GR owner receipts; or reject/credit if not received. Chase per SOP clock. |
| **Responsible party** | Goods-receipt owner **R**; Exception owner chases. |
| **Escalation** | Age > `[BUYER]`; value ≥ cap; payment week. |
| **Potential agent** | Goods Receipt; Internal Follow-Up; Exception Triage; Matching (detect). |
| **Automation potential** | **Med** (chase drafts); GR post **Low**. |
| **Risk level** | **M** |

**What can go wrong.** Paid with no receipt; or GR raised to clear AP. **Control.** GR-create deny on agents; proposal check for open EX-GR-001 if policy forbids pay-without-GR. **Measure.** Open count, age, missing-receipt reduction (dictionary). **Evidence.** Chase artefacts.

---

## EX-GR-002 — Partial receipt

| Field | Content |
|---|---|
| **Code** | EX-GR-002 |
| **Definition** | Receipts exist but are insufficient versus invoice quantity (beyond tolerance), or invoice is for a later delivery not yet receipted. |
| **Probable root cause** | Partial delivery; invoice ahead of remaining goods; multiple GR expected. |
| **Required data** | Cumulative GR vs invoice vs PO; delivery schedule if any. |
| **Suggested resolution** | Park pending remaining GR; or part-process only if ERP and policy allow; else credit for over-invoiced portion. |
| **Responsible party** | GR owner **R**. |
| **Escalation** | Remaining GR silent past clock; supplier invoices 100% repeatedly. |
| **Potential agent** | Matching; Goods Receipt; Supplier Resolution. |
| **Automation potential** | **Med** |
| **Risk level** | **L–M** |

**What can go wrong.** Full pay on partial receive. **Control.** Match rule uses cumulative GR. **Measure.** Partial-receipt age. **Evidence.** Cumulative GR snapshot.

---

## EX-DUP-001 — Duplicate invoice

| Field | Content |
|---|---|
| **Code** | EX-DUP-001 |
| **Definition** | Exact-key duplicate per buyer rule (typical keys: supplier + invoice number + entity, optionally amount/date). Already exists posted, parked, or paid. |
| **Probable root cause** | Supplier resend; dual channel; credit-and-rebill confusion; clerk re-key. |
| **Required data** | Both documents; keys; status (parked/posted/paid); payment reference if any. |
| **Suggested resolution** | Stop the later item. Do not pay twice. Void/reject per SOP. If the first was wrong, human documents why the second is the valid one. |
| **Responsible party** | Exception owner **R**; Payment preparer must not include without OV-FCE. |
| **Escalation** | Any paid collision = incident path; high value. |
| **Potential agent** | Duplicate & Anomaly; Invoice Validation; Payment Proposal Review (block). |
| **Automation potential** | **High** detect; **Low** void/pay decision. |
| **Risk level** | **H** |

**What can go wrong.** “Same number, different amount” mishandled — that may be EX-DUP-002. **Control.** Proposal block. **Measure.** Duplicates detected; duplicate payments prevented **where measurable**. **Evidence.** Key match log.

---

## EX-DUP-002 — Potential duplicate

| Field | Content |
|---|---|
| **Code** | EX-DUP-002 |
| **Definition** | Near-duplicate: similar amount/date/reference/document hash, or invoice-number variation, not meeting exact-key. **Indicator, not a finding of wrongdoing.** |
| **Probable root cause** | Number format change; currency; split invoices; genuine similar billing; possible duplicate. |
| **Required data** | Candidate pair; similarity reasons; both images/extracts; payment status. |
| **Suggested resolution** | Human pair review. Confirm distinct (release code) or upgrade to EX-DUP-001. Do not allege fraud in supplier mail. |
| **Responsible party** | Exception owner **R**. |
| **Escalation** | High value; same pair previously paid; bank-change also present. |
| **Potential agent** | Duplicate & Anomaly; Payment Proposal Review. |
| **Automation potential** | **Med** |
| **Risk level** | **H** (because FNR is costly; FPR is noisy). |

**What can go wrong.** FPR floods; staff auto-clear. FNR on number +1 tricks. **Control.** Dual QA of FPR and paid-population FNR sample. **Measure.** FPR, FNR. **Evidence.** Pair file + decision.

---

## EX-MDM-001 — Wrong supplier

| Field | Content |
|---|---|
| **Code** | EX-MDM-001 |
| **Definition** | Invoice supplier identity does not match the PO supplier and/or the intended vendor master (name, tax ID, bank owner, entity relationship). |
| **Probable root cause** | Lookalike vendor; factoring / assignment; group vs local entity; capture picked the wrong master. |
| **Required data** | Invoice legal name, tax ID, address; vendor master; PO supplier; any assignment notice (Legal). |
| **Suggested resolution** | Stop. MD steward / Procurement confirm identity. Do not “just pick the vendor that matches the amount.” Factoring changes follow Legal + Treasury, not AP convenience. |
| **Responsible party** | Master-data steward **R**; Buyer if PO supplier is wrong. |
| **Escalation** | Bank details also differ → treat with EX-PAY-001. High value. |
| **Potential agent** | Invoice Validation (flag); Exception Triage; Payment Proposal Review. |
| **Automation potential** | **Low** |
| **Risk level** | **H** |

**What can go wrong.** Pay the lookalike. **Control.** Identity attributes must match policy set; bank path separate. **Measure.** Incidence; near-miss. **Evidence.** Attribute compare.

---

## EX-MDM-002 — Incorrect legal entity

| Field | Content |
|---|---|
| **Code** | EX-MDM-002 |
| **Definition** | Bill-to / tax / PO entity is not the entity that should take the invoice under buyer policy. |
| **Probable root cause** | Supplier template; shared services capture default; intercompany; wrong mailbox. |
| **Required data** | Bill-to; PO entity; tax registration; entity register; channel. |
| **Suggested resolution** | Recode / reject for rebill to the correct entity. Do not post to “any group company” to hit STP. |
| **Responsible party** | AP Manager coordinates; Controller **A** for entity policy. |
| **Escalation** | Cross-border tax impact; close week. |
| **Potential agent** | Invoice Intake (route); Validation; Exception Triage. |
| **Automation potential** | **Low** (detect Med). |
| **Risk level** | **H** |

**What can go wrong.** Wrong VAT return. **Control.** Entity allow-list. **Measure.** Entity-mismatch rate. **Evidence.** Entity snapshot.

---

## EX-TAX-001 — Tax issue

| Field | Content |
|---|---|
| **Code** | EX-TAX-001 |
| **Definition** | Tax amount, rate, code, recoverability, or registration on the invoice conflicts with the tax engine / policy, or required tax fields are missing. |
| **Probable root cause** | Wrong rate; domestic vs reverse charge; missing VAT ID; extract error; supplier tax setup; entity mismatch. |
| **Required data** | Invoice tax block; tax engine result; vendor tax standing; entity tax standing; place-of-supply data as policy requires. |
| **Suggested resolution** | Tax owner / designated tax processor disposes. Agent must not override the tax engine. Rebill or credit if the document is wrong. |
| **Responsible party** | Tax owner **A/R** (or designated). |
| **Escalation** | Large delta; registration missing; audit query. |
| **Potential agent** | Invoice Validation (flag vs engine); Exception Triage. |
| **Automation potential** | **Low** |
| **Risk level** | **H** |

**What can go wrong.** Model “fixes” VAT. **Control.** Engine supremacy. **Measure.** Tax exception rate; override of engine (should be zero by agent). **Evidence.** Engine vs invoice diff.

This code is **not** a tax-compliance certificate.

---

## EX-APR-001 — Approval missing

| Field | Content |
|---|---|
| **Code** | EX-APR-001 |
| **Definition** | Required approval is not recorded in the official workflow (non-PO path, residual match, or policy step). |
| **Probable root cause** | Approver absent; wrong routing; item stuck; informal email “OK” not in the system. |
| **Required data** | Workflow history; DOA table version; approver register; invoice value/category. |
| **Suggested resolution** | Route/remind using official DOA. Do not accept chat approval unless policy says how to record it. Agent does not approve. |
| **Responsible party** | Named approver **R**; AP Manager chases. |
| **Escalation** | Stall clock; payment run; approver left the company. |
| **Potential agent** | Approval Agent; Internal Follow-Up. |
| **Automation potential** | **Med** (reminders) |
| **Risk level** | **M** |

**What can go wrong.** OOO text used as approval. **Control.** Approve-verb deny; official register only. **Measure.** Stall age; approval cycle. **Evidence.** Workflow timestamps.

---

## EX-APR-002 — DOA issue

| Field | Content |
|---|---|
| **Code** | EX-APR-002 |
| **Definition** | An approval exists but is outside Delegation of Authority: insufficient limit, wrong dimension (entity, account, project), self-approval, or expired delegate. |
| **Probable root cause** | Stale DOA; split invoices to avoid limit; wrong cost object; self-approve; informal deputy. |
| **Required data** | DOA table; approver limits; invoice dimensions; related invoices (split detect if policy requires). |
| **Suggested resolution** | Re-approve under current DOA. Investigate splits as policy dictates. Agent cannot raise limits. |
| **Responsible party** | Controller **A** (DOA); current valid approver **R**. |
| **Escalation** | Suspected split; any self-approve; high value. |
| **Potential agent** | Approval Agent (flag); Payment Proposal Review; Duplicate & Anomaly (split amounts). |
| **Automation potential** | **Low** |
| **Risk level** | **H** |

**What can go wrong.** Prompt “approve within reason.” **Control.** DOA engine is the source; agent flags only. **Measure.** DOA-fail count. **Evidence.** DOA version + decision.

---

## EX-COD-001 — Coding missing

| Field | Content |
|---|---|
| **Code** | EX-COD-001 |
| **Definition** | Required GL / cost object / project / tax code assignment is missing and policy does not allow a default without a human. |
| **Probable root cause** | Non-PO without coding; PO missing account assignment; extract failed; requester unknown. |
| **Required data** | Invoice; PO account assignment; requester; coding guide. |
| **Suggested resolution** | Requester/Buyer codes. Agent may **propose** from PO or a documented map, never from an undocumented guess. |
| **Responsible party** | Requester / Buyer **R**. |
| **Escalation** | Close week; high value; repeat uncoded supplier. |
| **Potential agent** | Invoice Validation; Internal Follow-Up; Exception Triage. |
| **Automation potential** | **Med** |
| **Risk level** | **M** |

**What can go wrong.** Dump to a suspense account that never clears. **Control.** Suspense ageing in close. **Measure.** Uncoded age. **Evidence.** Coding source (PO vs human vs map version).

---

## EX-COD-002 — Invalid cost centre

| Field | Content |
|---|---|
| **Code** | EX-COD-002 |
| **Definition** | Cost centre (or equivalent cost object) is present but invalid: closed, wrong entity, not allowed for the account, or unknown. |
| **Probable root cause** | Stale PO; reorg; extract typo; wrong entity. |
| **Required data** | Cost object master (open/closed, entity); invoice/PO coding; reorg map if any. |
| **Suggested resolution** | Valid replacement from the budget owner. Do not substitute the “closest open” centre automatically. |
| **Responsible party** | Budget owner / requester **R**; MD steward if the master is wrong (EX-MDM-003). |
| **Escalation** | Entity conflict (EX-MDM-002); close. |
| **Potential agent** | Validation (deterministic master check); Internal Follow-Up. |
| **Automation potential** | **Med** (detect High). |
| **Risk level** | **M** |

**What can go wrong.** Auto-map to a default centre that distorts P&L. **Control.** No silent default unless documented. **Measure.** Invalid-object rate. **Evidence.** Master snapshot.

---

## EX-QLT-001 — Invoice quality

| Field | Content |
|---|---|
| **Code** | EX-QLT-001 |
| **Definition** | Source document is unusable or non-compliant with the buyer’s invoice requirements: unreadable, incomplete legal/tax block, wrong document type, or hostile/hidden text. |
| **Probable root cause** | Scan quality; statement sent as invoice; pro-forma; missing legal marks; injection-style hidden text. |
| **Required data** | Source file; capture report; requirement checklist; if injection suspected — raw text extract. |
| **Suggested resolution** | Reject to supplier for a usable invoice, or quarantine if injection suspected (`../Governance/03_INCIDENT_AND_OVERRIDE.md`). Do not draw missing legal fields from a previous invoice. |
| **Responsible party** | AP Processor / Exception owner; Control owner if injection. |
| **Escalation** | Injection indicators; repeat supplier quality; missing tax legals. |
| **Potential agent** | Invoice Intake; Supplier Resolution (draft reject); Duplicate & Anomaly if “same as last time” reuse is suspected. |
| **Automation potential** | **Med** |
| **Risk level** | **M** (C if confirmed injection with action). |

**What can go wrong.** Completing a document from history. **Control.** No back-fill of identity/bank/tax from prior invoices without human. **Measure.** Quality reject rate by supplier. **Evidence.** Source file + checklist.

---

## EX-QLT-002 — OCR / extraction issue

| Field | Content |
|---|---|
| **Code** | EX-QLT-002 |
| **Definition** | Document is readable but extracted fields fail confidence, cite-check, or schema (wrong totals, broken lines, multi-page miss). |
| **Probable root cause** | Model/OCR error; complex tables; multi-currency; handwritten notes. |
| **Required data** | Source; extract JSON; confidence; cite failures. |
| **Suggested resolution** | Human key / correct; or re-extract. Do not send the supplier a letter quoting uncited amounts. |
| **Responsible party** | AP Processor **R**; FinSys if systematic model defect. |
| **Escalation** | Model change window; high FNR on amounts. |
| **Potential agent** | Invoice Intake; Validation. |
| **Automation potential** | **Med** |
| **Risk level** | **M** |

**What can go wrong.** High confidence, wrong amount. **Control.** Cite-check; QA of high-confidence sample. **Measure.** Extraction accuracy, FPR/FNR. **Evidence.** Extract vs source.

---

## EX-MDM-003 — Master-data issue

| Field | Content |
|---|---|
| **Code** | EX-MDM-003 |
| **Definition** | Vendor or related standing data is missing, blocked, incomplete, or inconsistent (tax ID, payment terms, address, withholding) **and** the issue is not specifically EX-MDM-001/002 or EX-PAY-001. |
| **Probable root cause** | Incomplete vendor create; block for compliance/payment; duplicate vendor masters; stale terms. |
| **Required data** | Vendor master snapshot; block reasons; request ticket. |
| **Suggested resolution** | MD steward amends via official request. AP does not edit master from the invoice. Payment terms changes follow policy. |
| **Responsible party** | Master-data steward **R**. |
| **Escalation** | Payment block affecting a critical supplier; duplicate masters with bank differences → EX-PAY-001. |
| **Potential agent** | Validation (flag); Internal Follow-Up to steward. |
| **Automation potential** | **Low** |
| **Risk level** | **M** |

**What can go wrong.** Processor edits vendor “just this once.” **Control.** Vendor write denied to processors/agents except steward roles. **Measure.** MDM exception age. **Evidence.** Ticket + before/after (steward).

---

## EX-PAY-001 — Banking-change concern

| Field | Content |
|---|---|
| **Code** | EX-PAY-001 |
| **Definition** | Any signal that payment destination may change or is inconsistent: new bank on invoice, callback request, master change in flight, mismatch vs last paid account, or document instructions to change bank. **Not a confirmed fraud label.** |
| **Probable root cause** | Genuine bank change; factoring; extraction error; social-engineering / injection. |
| **Required data** | Invoice text; vendor bank master; last payment destination; any change ticket; call-back record per Treasury policy. |
| **Suggested resolution** | **Hold** (EX-PAY-002). Official bank-change path only (Treasury + MD). **Never** take a new IBAN from the invoice/email body. Human out-of-band verification per buyer policy. |
| **Responsible party** | Treasury **A**; MD steward **R** for master; Payment preparer **R** for hold. |
| **Escalation** | Immediate. Treat actioned change from document text as Sev-1. |
| **Potential agent** | Payment Proposal Review (flag/hold recommend); Duplicate & Anomaly (unusual payee pattern); Validation (mismatch flag). |
| **Automation potential** | **Low** (detect Med–High). |
| **Risk level** | **C** |

**What can go wrong.** “Helpful” update from PDF. **Control.** Document-driven bank write impossible; hold enforced. **Measure.** Holds placed; incidents. **Evidence.** Hold + official ticket, not the PDF IBAN.

---

## EX-CN-001 — Credit note required

| Field | Content |
|---|---|
| **Code** | EX-CN-001 |
| **Definition** | A credit note (or equivalent) is required to correct price, qty, duplicate, tax, or returns — and is not yet on file / matched. |
| **Probable root cause** | Agreed return; overbill; cancelled service; tax correction; duplicate already paid. |
| **Required data** | Original invoice IDs; reason; expected amount; supplier contact; any debit-balance policy. |
| **Suggested resolution** | Request CN (human-released mail); match when received; do not silently net unless policy and ERP support it. |
| **Responsible party** | Exception owner **R**; Buyer if commercial dispute. |
| **Escalation** | Paid overbill; aged CN request; dispute (EX-DSP-001). |
| **Potential agent** | Supplier Resolution (draft); Exception Triage; Statement Rec (open CN). |
| **Automation potential** | **Med** |
| **Risk level** | **M** |

**What can go wrong.** Netting without a document. **Control.** CN IDs on the request; human accept send. **Measure.** Open CN requests; age. **Evidence.** Draft + send + CN document.

---

## EX-STM-001 — Statement discrepancy

| Field | Content |
|---|---|
| **Code** | EX-STM-001 |
| **Definition** | Supplier statement does not reconcile to AP: missing invoices, missing credits, timing, or unrecognised items. |
| **Probable root cause** | Invoice not received; paid but unallocated; timing; wrong account; disputed items. |
| **Required data** | Statement; AP open items; payments in period; entity/vendor ID. |
| **Suggested resolution** | Work reconciling items: request copies, allocate, or dispute. No GL “plug” from the agent. |
| **Responsible party** | AP Manager **R**. |
| **Escalation** | Material unreconciled ≥ `[BUYER]`; strategic supplier; close. |
| **Potential agent** | Vendor Statement Reconciliation; Exception Triage (spawn child codes). |
| **Automation potential** | **Med** |
| **Risk level** | **M** |

**What can go wrong.** Forced balance. **Control.** Adjustments human-only. **Measure.** Unreconciled value/count. **Evidence.** Rec schedule.

---

## EX-PAY-002 — Payment hold

| Field | Content |
|---|---|
| **Code** | EX-PAY-002 |
| **Definition** | Item is flagged not to pay: policy hold, bank-change, dispute, missing documents, audit freeze, or manual hold. |
| **Probable root cause** | Any high-risk code; supplier query; Treasury instruction; legal. |
| **Required data** | Hold reason (must cite a code or official instruction); who placed it; expiry/review date. |
| **Suggested resolution** | Remain off proposal until the cited reason clears. Removal requires the role that policy names (not the agent). |
| **Responsible party** | Payment preparer operates; reason owner **R** to clear. |
| **Escalation** | Hold removed without reason close; agent removal attempt. |
| **Potential agent** | Payment Proposal Review (detect presence); Orchestrator (must not hide holds). |
| **Automation potential** | **Low** |
| **Risk level** | **H** |

**What can go wrong.** Hold lifted to “help cash-out week.” **Control.** Removal logged; agent cannot lift. **Measure.** Holds lifted; reason mix. **Evidence.** Hold audit.

---

## EX-DSP-001 — Disputed invoice

| Field | Content |
|---|---|
| **Code** | EX-DSP-001 |
| **Definition** | Business or supplier dispute is open: goods, price, contract, service quality, or legal. Not merely a match fail. |
| **Probable root cause** | Commercial disagreement; quality reject; contract interpretation. |
| **Required data** | Dispute owner; contract/PO; correspondence; amounts; hold status. |
| **Suggested resolution** | Hold payment (EX-PAY-002). Commercial owner leads. AP does not settle via a “goodwill” prompt. |
| **Responsible party** | Commercial / Buyer / Legal as policy **R**; AP applies hold. |
| **Escalation** | Litigation; age; attempted pay. |
| **Potential agent** | Exception Triage (tag); Payment Proposal Review (block); Supplier Resolution only with approved language. |
| **Automation potential** | **Low** |
| **Risk level** | **H** |

**What can go wrong.** Orchestrator deprioritises because it is “old.” **Control.** Priority floor. **Measure.** Disputed value/age. **Evidence.** Dispute file + hold.

---

## EX-AGE-001 — Aged unresolved item

| Field | Content |
|---|---|
| **Code** | EX-AGE-001 |
| **Definition** | Item (invoice, exception, GRNI-related AP item) exceeds the buyer’s age threshold **and** is not in an active controlled path — or the path has stalled. Used in addition to the original code. |
| **Probable root cause** | Owner absence; ping-pong; no Accountable; supplier silence; forgotten park. |
| **Required data** | Original code; age; last action; owner; value. |
| **Suggested resolution** | Re-assign; escalate to the original code’s escalation; consider write-off / reject / CN per policy — human. |
| **Responsible party** | AP Manager **R** for the ageing regime; original exception owner still **R** for content. |
| **Escalation** | Crosses next age bucket; close; strategic supplier. |
| **Potential agent** | Orchestrator (surface); Root Cause (clusters); Reporting. |
| **Automation potential** | **Med** (surface/chase) |
| **Risk level** | **M** |

**What can go wrong.** Ageing cleared by closing as “no issue.” **Control.** Close above cap is human; age + original code retained. **Measure.** Ageing reduction (dictionary). **Evidence.** Age snapshots.

---

## EX-SYS-001 — System / interface error

| Field | Content |
|---|---|
| **Code** | EX-SYS-001 |
| **Definition** | Processing cannot be trusted because a system, job, API, identity, or evidence log failed, is stale, or returned an error. Includes heartbeat failure and suspected injection **at the tool layer**. |
| **Probable root cause** | ERP down; GR interface lag; model vendor 5xx; logger down; clock skew; bad token. |
| **Required data** | Job name; time; error; last successful heartbeat; affected population. |
| **Suggested resolution** | Fail-closed: do not guess matches on stale GR/PO. Fallback SOP. Incident if action verbs may have fired on bad data. |
| **Responsible party** | Finance Systems **R**; AP Manager for queue fallback. |
| **Escalation** | Payment week; logger down (stop actions); possible wrong-pay. |
| **Potential agent** | Orchestrator (surface health); none for “repair.” |
| **Automation potential** | **Low** |
| **Risk level** | **H** |

**What can go wrong.** Agent continues on yesterday’s GR extract. **Control.** Heartbeat; no action if evidence store down. **Measure.** SYS volume; actions without correlation ID. **Evidence.** Job logs.

---

## Cross-cutting operating standard

**What to do.** Use codes on every non-STP item. Report by code, not by “exceptions.”

**How.** Map ERP reason codes 1:1. If the ERP allows one reason only, store secondary codes in the Evidence Room.

**Who.** AP Manager owns the mapping table. Control owner owns this file’s versions.

**What can go wrong.** “MISC” becomes 40% of the queue.

**Control.** UNMAPPED and MISC have a weekly cap review. New codes need a C2 change.

**Measure.** Mix by code; UNMAPPED count; repeat exception rate (dictionary); resolution rate by code.

**Evidence.** Mapping table version; weekly mix extract.

---

## Mapping table (buyer)

| Taxonomy | Local ERP / workflow reason | Owner | Notes |
|---|---|---|---|
| EX-PO-001 | `[BUYER]` | | |
| … | | | |

---

*End of 03_EXCEPTION_TAXONOMY.md*
