# Exception Taxonomy — AP Agent OS Professional

**Product:** Evidence Room — AP Agent OS Professional  
**Artifact:** Controls · Exception Taxonomy  
**Audience:** Head of AP, Exception Desk, Controllership, Internal Audit  
**Version:** 1.0

---

## 1. How to use this taxonomy

Every non-straight-through invoice or AP case receives **one primary code** (and optional secondary). Codes drive ownership, SLA, agent routing, KPI mix, and root-cause themes.

**Conventions**

| Field | Meaning |
|-------|---------|
| Automation potential | Realistic agent contribution under controls: Low / Med / High |
| Risk level | Residual financial/control risk if mishandled: L / M / H |
| Potential agent | Primary specialised agent(s); A04 always triages |

Tune SLAs and materiality locally; do not rename codes casually — version changes via Controllership + Head of AP.

---

## 2. Taxonomy catalogue

### 2.1 `missing_po`

| Attribute | Content |
|-----------|---------|
| **Definition** | Invoice lacks a required purchase-order reference, or PO field is blank where policy mandates PO. |
| **Probable root cause** | Maverick buy; supplier not informed of PO; OCR miss; non-PO path misclassified. |
| **Required data** | Invoice; policy (PO-required rules); requester/buyer if known; vendor history. |
| **Suggested resolution** | Confirm if non-PO allowed; else obtain PO number from requester/buyer; re-validate; or reject/resubmit. |
| **Responsible party** | Requester / Buyer (primary); AP validates policy. |
| **Escalation** | Material amount with no owner in 48h → department head; chronic maverick → Procurement compliance. |
| **Potential agent** | A02, A04, A09, A06 |
| **Automation potential** | Med |
| **Risk level** | M |

---

### 2.2 `invalid_po`

| Attribute | Content |
|-----------|---------|
| **Definition** | PO reference present but does not exist, is wrong format, or belongs to another vendor/entity. |
| **Probable root cause** | Typo; supplier reused old PO; cross-entity confusion; test PO in production. |
| **Required data** | Invoice PO string; ERP PO search results; vendor/entity IDs. |
| **Suggested resolution** | Correct PO reference; create/link valid PO via Procurement; return invoice if unmatchable. |
| **Responsible party** | Buyer / Procurement Ops |
| **Escalation** | High value + no valid PO within SLA → Procurement lead + AP Lead. |
| **Potential agent** | A03, A06, A09, A08 |
| **Automation potential** | Med |
| **Risk level** | M |

---

### 2.3 `po_closed`

| Attribute | Content |
|-----------|---------|
| **Definition** | Referenced PO is closed/cancelled while invoice is still presented for payment. |
| **Probable root cause** | Premature PO close; late invoice; partial close without remaining commitment. |
| **Required data** | PO status history; invoice date; remaining qty/amount before close. |
| **Suggested resolution** | Reopen/amend PO per policy; issue new PO; or credit/cancel invoice if invalid. |
| **Responsible party** | Buyer |
| **Escalation** | Critical vendor / production risk → Procurement + Operations. |
| **Potential agent** | A06, A09, A03 |
| **Automation potential** | High (detect); Med (resolve) |
| **Risk level** | M |

---

### 2.4 `po_exhausted`

| Attribute | Content |
|-----------|---------|
| **Definition** | PO open but remaining quantity/amount insufficient to cover invoice. |
| **Probable root cause** | Blanket undersized; duplicate invoice consuming balance; price creep; extra delivery. |
| **Required data** | PO remaining vs invoice qty/amount; prior invoices against PO. |
| **Suggested resolution** | Increase PO / new line; split invoice; investigate duplicate consumption (A10). |
| **Responsible party** | Buyer |
| **Escalation** | Repeated exhaust on same blanket → Category Manager. |
| **Potential agent** | A06, A03, A10, A09 |
| **Automation potential** | High (detect); Med (resolve) |
| **Risk level** | M |

---

### 2.5 `price_mismatch`

| Attribute | Content |
|-----------|---------|
| **Definition** | Invoice price differs from PO (and/or contract) beyond tolerance. |
| **Probable root cause** | Contract update not on PO; supplier increase; wrong UoM; freight unexpectedly included. |
| **Required data** | Invoice line price; PO price; tolerance table; contract price if any. |
| **Suggested resolution** | Amend PO; obtain credit/revised invoice; accept within DOA force-match if approved. |
| **Responsible party** | Buyer / Category (commercial); AP applies tolerance. |
| **Escalation** | Above commercial DOA → Category Manager; pattern → A15. |
| **Potential agent** | A03, A06, A08 |
| **Automation potential** | High |
| **Risk level** | M (H if systemic or high value) |

---

### 2.6 `quantity_mismatch`

| Attribute | Content |
|-----------|---------|
| **Definition** | Invoice quantity differs from PO remaining and/or received quantity beyond tolerance. |
| **Probable root cause** | Partial shipment invoiced in full; over-delivery; UoM conversion error; wrong line. |
| **Required data** | Invoice qty; PO qty/remaining; GR qty; UoM. |
| **Suggested resolution** | Partial book; wait for GR; credit note; correct line mapping. |
| **Responsible party** | Receiver / Buyer; AP matching lead coordinates. |
| **Escalation** | Overbill on high-value goods → Procurement + plant manager. |
| **Potential agent** | A03, A05, A08 |
| **Automation potential** | High |
| **Risk level** | M |

---

### 2.7 `missing_receipt`

| Attribute | Content |
|-----------|---------|
| **Definition** | Three-way match required but no goods receipt exists for invoiced quantity. |
| **Probable root cause** | GR not posted; delivery not arrived; service misclassified as goods; WMS/ERP lag. |
| **Required data** | PO; GR search; delivery note; receiver identity. |
| **Suggested resolution** | Post GR with evidence; reclassify service acceptance; return invoice if not delivered. |
| **Responsible party** | GR clerk / Receiver |
| **Escalation** | Approaching due date / supply halt → Operations supervisor. |
| **Potential agent** | A05, A09, A03 |
| **Automation potential** | High (chase); Low–Med (post GR) |
| **Risk level** | M |

---

### 2.8 `partial_receipt`

| Attribute | Content |
|-----------|---------|
| **Definition** | Receipt exists but covers only part of invoiced quantity. |
| **Probable root cause** | Split delivery; over-invoice; GR posted incomplete. |
| **Required data** | Cumulative GR vs invoice qty; ASN/DN. |
| **Suggested resolution** | Wait/post remaining GR; partial invoice process; credit for undelivered. |
| **Responsible party** | Receiver; Supplier for credit (A08) |
| **Escalation** | Chronic short-ships → Procurement + Supplier management. |
| **Potential agent** | A05, A03, A08 |
| **Automation potential** | High |
| **Risk level** | M |

---

### 2.9 `duplicate_invoice`

| Attribute | Content |
|-----------|---------|
| **Definition** | Invoice is confirmed as a duplicate of another invoice already recorded and/or paid. |
| **Probable root cause** | Supplier re-sent; parallel channels; intentional duplicate submission. |
| **Required data** | Both documents; payment status; hash/number match evidence; human disposition. |
| **Suggested resolution** | Block/cancel duplicate; notify supplier; recover if paid (treasury/AP process). |
| **Responsible party** | AP Controls / AP Processor with Controls review |
| **Escalation** | Paid duplicate → Controller + recovery path immediately. |
| **Potential agent** | A10, A04, A12 (exclude), A08 |
| **Automation potential** | High (detect candidates); Med (confirm) |
| **Risk level** | H |

**Note:** Confirmation is human (or L3+ only for exact-rule clones per policy). A10 does not guarantee detection of all duplicates.

---

### 2.10 `potential_duplicate`

| Attribute | Content |
|-----------|---------|
| **Definition** | Signals suggest possible duplicate (similar number/amount/date/vendor) but not yet confirmed. |
| **Probable root cause** | OCR near-miss; legitimate similar billing; progress claims; credit/rebill pairs. |
| **Required data** | Candidate pairs; feature explanation; payment status. |
| **Suggested resolution** | Investigate pack; confirm duplicate or false positive; hold payment until disposition. |
| **Responsible party** | AP Processor; Controls on critical scores |
| **Escalation** | Critical score + material amount → Controls Lead same day. |
| **Potential agent** | A10, A12, A04 |
| **Automation potential** | High |
| **Risk level** | H (until cleared) |

---

### 2.11 `wrong_supplier`

| Attribute | Content |
|-----------|---------|
| **Definition** | Invoice supplier identity does not correctly match the trading/remit vendor that should be paid (or PO vendor). |
| **Probable root cause** | Factoring; group entity confusion; soft-match error; fraudulent letterhead (investigate; don’t assume). |
| **Required data** | Invoice identity fields; vendor master; PO vendor; remittance advice history. |
| **Suggested resolution** | Remap to correct vendor with evidence; reject; master-data update via stewardship. |
| **Responsible party** | AP + Master Data Steward |
| **Escalation** | Remit party change / factoring → enhanced verification; never silent bank change. |
| **Potential agent** | A02, A08, A10 |
| **Automation potential** | Med |
| **Risk level** | H |

---

### 2.12 `incorrect_legal_entity`

| Attribute | Content |
|-----------|---------|
| **Definition** | Invoice billed to / parked under the wrong legal entity in a multi-entity group. |
| **Probable root cause** | Shared mailbox misroute; supplier wrong bill-to; PO on wrong company code. |
| **Required data** | Bill-to details; PO company; tax registrations; intercompany policy. |
| **Suggested resolution** | Repost to correct entity; credit/rebill; fix PO entity. |
| **Responsible party** | AP entity lead; Buyer if PO wrong |
| **Escalation** | Tax exposure / statutory books impact → Tax + Controller. |
| **Potential agent** | A01, A02, A06, A09 |
| **Automation potential** | Med |
| **Risk level** | H |

---

### 2.13 `tax_issue`

| Attribute | Content |
|-----------|---------|
| **Definition** | VAT/GST/sales tax amount, rate, code, or registration treatment is inconsistent with policy or law tables. |
| **Probable root cause** | Wrong tax code; reverse charge missed; supplier tax ID invalid; rounding; exempt misapplied. |
| **Required data** | Tax lines; entity tax setup; supplier tax IDs; jurisdiction rules. |
| **Suggested resolution** | Correct coding; request revised invoice; Tax review. |
| **Responsible party** | Tax Accountant (decision); AP prepares |
| **Escalation** | Material or cross-border → Tax Lead / Advisor. |
| **Potential agent** | A02, A08 |
| **Automation potential** | Med |
| **Risk level** | H |

---

### 2.14 `approval_missing`

| Attribute | Content |
|-----------|---------|
| **Definition** | Required approval is not completed (pending, never started, or workflow stuck). |
| **Probable root cause** | Approver OOO; wrong routing; workflow technical fail; ignored tasks. |
| **Required data** | DOA rule; workflow status; approver directory. |
| **Suggested resolution** | Remind/escalate; fix routing; registered delegate; restart workflow idempotently. |
| **Responsible party** | Approver; AP Workflow monitors |
| **Escalation** | Past escalation SLA → next DOA tier / Controller desk. |
| **Potential agent** | A07, A09 |
| **Automation potential** | High |
| **Risk level** | M |

---

### 2.15 `doa_issue`

| Attribute | Content |
|-----------|---------|
| **Definition** | Approval path conflicts with Delegation of Authority (wrong person, insufficient authority, self-approval, vacant band). |
| **Probable root cause** | Stale DOA matrix; coding games; role vacancy; system misconfig. |
| **Required data** | DOA version; amount; coding; approver roles; audit of who approved. |
| **Suggested resolution** | Re-route to correct authority; invalidate improper approval; Controllership fix matrix. |
| **Responsible party** | Controllership (policy); AP Workflow (execution) |
| **Escalation** | Any self-approval or over-limit approval → Controller immediately. |
| **Potential agent** | A07, A04 |
| **Automation potential** | Med |
| **Risk level** | H |

---

### 2.16 `coding_missing`

| Attribute | Content |
|-----------|---------|
| **Definition** | Cost allocation / GL / dimension coding required for posting is absent. |
| **Probable root cause** | Non-PO without default; requester didn’t code; intake skipped coding step. |
| **Required data** | Invoice purpose; requester; coding guide; prior similar invoices. |
| **Suggested resolution** | Obtain coding from requester; apply defaults if policy allows with review. |
| **Responsible party** | Requester / Cost centre owner |
| **Escalation** | Close deadline → department controller. |
| **Potential agent** | A02, A09 |
| **Automation potential** | Med |
| **Risk level** | L–M |

---

### 2.17 `invalid_cost_centre`

| Attribute | Content |
|-----------|---------|
| **Definition** | Provided cost centre / dimension is closed, unknown, not allowed for account, or not permitted for requester. |
| **Probable root cause** | Reorg; typo; expired project; policy restriction. |
| **Required data** | Dimension master; validation rules; substitute CC policy. |
| **Suggested resolution** | Correct dimension; map to successor CC with approval. |
| **Responsible party** | Cost centre owner / Finance BP |
| **Escalation** | Posting to suspense aging → Financial Control. |
| **Potential agent** | A02, A09 |
| **Automation potential** | High (detect); Med (resolve) |
| **Risk level** | M |

---

### 2.18 `invoice_quality`

| Attribute | Content |
|-----------|---------|
| **Definition** | Invoice document fails quality standards: arithmetic, missing legal fields, illegible amounts, mixed documents, inconsistent headers/lines. |
| **Probable root cause** | Supplier process; bad PDF; multi-invoice pack; currency format issues. |
| **Required data** | Original file; extraction; validation scorecard. |
| **Suggested resolution** | Request revised invoice; manual key with dual review; split pack. |
| **Responsible party** | Supplier (via A08); AP for processing standards |
| **Escalation** | Chronic poor quality vendor → Procurement + AP Lead. |
| **Potential agent** | A02, A01, A08 |
| **Automation potential** | Med |
| **Risk level** | M |

---

### 2.19 `ocr_extraction_issue`

| Attribute | Content |
|-----------|---------|
| **Definition** | Capture/OCR/XML parse failed or low-confidence on critical fields. |
| **Probable root cause** | Image quality; unknown layout; parser outage; non-standard e-invoice. |
| **Required data** | Raw file; confidence vector; parser logs. |
| **Suggested resolution** | Re-OCR; manual extract; request better file; fix parser mapping. |
| **Responsible party** | AP Intake; AP Systems for tooling |
| **Escalation** | Channel-wide parser failure → IT + AP Supervisor (incident). |
| **Potential agent** | A01, A02 |
| **Automation potential** | Med |
| **Risk level** | L–M |

---

### 2.20 `master_data_issue`

| Attribute | Content |
|-----------|---------|
| **Definition** | Vendor/entity/tax/payment method master data is missing, duplicate, incomplete, or conflicting such that processing cannot safely continue. |
| **Probable root cause** | Onboarding gap; duplicate vendors; stale contacts; blocked status unclear. |
| **Required data** | Vendor master record(s); duplicate candidates; block reasons. |
| **Suggested resolution** | Stewardship cleanse; merge duplicates; complete mandatory fields; document blocks. |
| **Responsible party** | Master Data Steward |
| **Escalation** | Payment-critical master gap → Head of AP + Stewardship lead. |
| **Potential agent** | A02, A08 (refer), A04 |
| **Automation potential** | Low–Med |
| **Risk level** | H |

---

### 2.21 `banking_change_concern`

| Attribute | Content |
|-----------|---------|
| **Definition** | Signal that supplier payment destination / bank details may be changing or were requested to change (email, invoice footer, portal message). |
| **Probable root cause** | Legitimate bank change; factoring; social-engineering attempt. |
| **Required data** | Message artifacts; current masked bank tokens; verification procedure evidence. |
| **Suggested resolution** | **Stop auto-processing.** Enhanced out-of-band verification by Master Data / Treasury; never update from email alone. |
| **Responsible party** | Master Data Steward + Treasury; AP Controls oversight |
| **Escalation** | Immediate to Stewardship/Treasury; security if suspected compromise. |
| **Potential agent** | A08 (detect/refer only), A10, A12 (hold) |
| **Automation potential** | Med (detect); **Low** (approve change) |
| **Risk level** | H |

---

### 2.22 `credit_note_required`

| Attribute | Content |
|-----------|---------|
| **Definition** | Resolution path requires a supplier credit note (price/qty/returns/duplicate billing) not yet received. |
| **Probable root cause** | Agreed commercial correction; returns; overbilling acknowledged. |
| **Required data** | Agreement evidence; original invoice; expected credit amount. |
| **Suggested resolution** | Request CN via A08; park/short-pay only if policy allows; match CN on receipt. |
| **Responsible party** | Buyer/AP query lead; Supplier issues CN |
| **Escalation** | CN overdue past SLA + material → Procurement commercial. |
| **Potential agent** | A08, A04, A03 |
| **Automation potential** | Med |
| **Risk level** | M |

---

### 2.23 `statement_discrepancy`

| Attribute | Content |
|-----------|---------|
| **Definition** | Supplier statement line does not reconcile to AP open items / payments (missing either side or amount break). |
| **Probable root cause** | Missing invoice intake; unapplied credit; timing; wrong account; factoring statement. |
| **Required data** | Statement; ERP extract; prior workpaper. |
| **Suggested resolution** | Intake missing invoices; apply credits; query supplier; document timing differences. |
| **Responsible party** | AP Reconciliation Lead |
| **Escalation** | Material break near payment run → Payments Lead + Controller. |
| **Potential agent** | A11, A08, A10, A01 |
| **Automation potential** | High (match); Med (clear) |
| **Risk level** | M–H |

---

### 2.24 `payment_hold`

| Attribute | Content |
|-----------|---------|
| **Definition** | Invoice is intentionally blocked from payment proposal for control, commercial, or compliance reasons. |
| **Probable root cause** | Active dispute; duplicate investigation; vendor block; legal hold; missing docs. |
| **Required data** | Hold reason code; owner; review date; linked cases. |
| **Suggested resolution** | Resolve underlying case; human release hold per policy; never agent self-release high-risk holds without gate. |
| **Responsible party** | Hold owner (Controls/AP/Legal as coded) |
| **Escalation** | Aged holds > policy → Head of AP weekly. |
| **Potential agent** | A12, A04, A10 |
| **Automation potential** | High (apply recommend); Low (release) |
| **Risk level** | H if wrongly released |

---

### 2.25 `disputed_invoice`

| Attribute | Content |
|-----------|---------|
| **Definition** | Formal or informal dispute exists over liability, performance, quality, or amount. |
| **Probable root cause** | Service failure; contract disagreement; goods quality; billing error contested. |
| **Required data** | Dispute notes; contract; goods/service evidence; parties. |
| **Suggested resolution** | Commercial/Legal path; keep payment hold; document settlement. |
| **Responsible party** | Buyer / Commercial; Legal if formal |
| **Escalation** | Litigation threat / critical supplier → Legal + Procurement exec. |
| **Potential agent** | A04, A08, A09, A12 |
| **Automation potential** | Low |
| **Risk level** | H |

---

### 2.26 `aged_unresolved_item`

| Attribute | Content |
|-----------|---------|
| **Definition** | Exception or open item exceeded aging thresholds (e.g., 30/60/90 days) without resolution. |
| **Probable root cause** | Owner abandonment; deadlock; waiting external indefinitely; lost in queue. |
| **Required data** | Age; prior codes; owner history; value. |
| **Suggested resolution** | Management review; reassign; decide write-off/settlement/path; close or reclassify. |
| **Responsible party** | AP Exception Desk Lead; original owner accountable |
| **Escalation** | Auto-escalate each aging bucket per policy to Head of AP. |
| **Potential agent** | A04, A16, A14, A15 |
| **Automation potential** | High (detect/escalate); Low (final decide) |
| **Risk level** | M–H |

---

### 2.27 `system_interface_error`

| Attribute | Content |
|-----------|---------|
| **Definition** | Processing blocked by system, API, connector, workflow, or data-interface failure rather than business disagreement. |
| **Probable root cause** | Auth expiry; timeout; schema change; RPA break; environment mismatch. |
| **Required data** | Error logs; request IDs; last success; affected population. |
| **Suggested resolution** | Incident management; fail closed on financial writes; replay only with idempotency; communicate backlog. |
| **Responsible party** | AP Systems / IT; AP Supervisor for business continuity |
| **Escalation** | Payment-run or close impact → IT major incident + Head of AP. |
| **Potential agent** | A16, A01, affected specialist |
| **Automation potential** | Med (detect/alert); Low (fix root infra) |
| **Risk level** | H (during incident) |

---

## 3. Routing quick reference

| Code | Primary resolver | Typical SLA start |
|------|------------------|-------------------|
| missing_po / invalid_po / po_closed / po_exhausted | Buyer via A06/A09 | 2–5 days |
| price_mismatch / quantity_mismatch | Buyer + A03/A08 | 2–5 days |
| missing_receipt / partial_receipt | Receiver via A05/A09 | 1–3 days |
| duplicate_invoice / potential_duplicate | Controls + A10 | Same day if material |
| wrong_supplier / master_data_issue / banking_change_concern | Master Data + Controls | Same day for banking |
| incorrect_legal_entity / tax_issue | AP entity + Tax | 2–5 days |
| approval_missing / doa_issue | Approver + A07 / Controller | 1–3 days |
| coding_missing / invalid_cost_centre | Requester + A09 | 2–3 days |
| invoice_quality / ocr_extraction_issue | Intake + A08 | 2–5 days |
| credit_note_required | A08 + Buyer | 5–10 days |
| statement_discrepancy | A11 | Per statement cycle |
| payment_hold / disputed_invoice | Hold owner / Commercial | Review weekly |
| aged_unresolved_item | Exception Desk + A16 | Immediate management |
| system_interface_error | IT + A16 | Incident SLA |

---

## 4. Control notes

1. **No silent resolution** — every closure needs resolution code + evidence link.  
2. **Secondary codes allowed** — e.g., `price_mismatch` + `credit_note_required`.  
3. **Banking_change_concern always human** for master update.  
4. **Duplicate codes** — A10 outputs are candidates until disposition.  
5. **Versioning** — publish taxonomy version ID on every exception record.

---

## 5. Related artifacts

- `Agent_Library/00_AGENT_STACK_OVERVIEW.md`  
- `Agent_Library/A04_Exception_Triage.md`  
- `Agent_Library/RESPONSIBILITY_MODEL.md`  

---

*Evidence Room — classify once, own clearly, age visibly, resolve with evidence.*
