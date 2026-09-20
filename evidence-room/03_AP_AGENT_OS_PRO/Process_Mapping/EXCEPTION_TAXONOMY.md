# Exception Taxonomy — Accounts Payable

**Evidence Room — AP Agent OS Pro**  
**Document type:** Taxonomy standard  
**Audience:** AP operations, Controllers, agent designers, Audit  
**Rule:** Controlled codes only. Cap free-text “Other.” Version every change.

**Industry context:** Ardent Partners *State of ePayables 2025* peer exception rate **18.4%** (BIC **11.1%**). Taxonomy quality is how you move from anonymous backlog to managed work.

---

## How to read each class

For every exception class below:

| Field | Meaning |
|---|---|
| Definition | What it is |
| Probable root cause | Typical origins |
| Required data | Minimum to resolve |
| Suggested resolution | Standard path |
| Responsible party | Human Accountable / Responsible |
| Escalation | When / to whom |
| Potential agent | Primary Evidence Room agent(s) |
| Automation potential | L0–L3 realistic band |
| Risk level | Low / Medium / High / Critical |

---

## 1. Missing PO

| Field | Content |
|---|---|
| **Definition** | Invoice references no PO, or PO number blank/unreadable, where policy requires PO. |
| **Probable root cause** | Supplier omission; non-PO purchase; intake extraction failure; buyer ordered off-contract. |
| **Required data** | Invoice image; supplier; amount; requester hints; contract/email order trail. |
| **Suggested resolution** | Locate PO; convert to non-PO path if policy allows; return to supplier; create after-the-fact PO only per policy. |
| **Responsible party** | Buyer/requestor (R); AP Manager (A) for policy path. |
| **Escalation** | Material $ or aged &gt; SLA → AP Manager → Controller if policy exception. |
| **Potential agent** | 02 Validation; 04 Triage; 06 PO Quality; 09 Internal Follow-Up. |
| **Automation potential** | L1–L2 chase/draft; L3 only for micro non-PO if policy exists. |
| **Risk level** | Medium (High if frequent off-contract spend). |

---

## 2. Invalid PO

| Field | Content |
|---|---|
| **Definition** | PO number present but not found, wrong format, or belongs to different supplier/entity. |
| **Probable root cause** | Typo; wrong PO cited; entity mismatch; closed/archived PO misread as open. |
| **Required data** | Cited PO; vendor master; entity; candidate PO search results. |
| **Suggested resolution** | Correct PO reference; re-match; supplier clarification. |
| **Responsible party** | AP Specialist (R); Buyer (C); AP Manager (A). |
| **Escalation** | No valid PO after N attempts → supplier hold + Manager. |
| **Potential agent** | 02; 03; 04; 08. |
| **Automation potential** | L1 suggest candidates; human confirm. |
| **Risk level** | Medium. |

---

## 3. PO closed

| Field | Content |
|---|---|
| **Definition** | Referenced PO is closed/cancelled while invoice remains unpaid/unposted. |
| **Probable root cause** | Premature close; late billing; partial close errors; project end. |
| **Required data** | PO status history; receipts; prior invoices against PO; buyer confirmation. |
| **Suggested resolution** | Reopen PO per policy; new PO; credit/rebill; reject invoice. |
| **Responsible party** | Buyer/Procurement (R); AP Manager (A). |
| **Escalation** | Reopen requires DOA → Procurement Manager / Controller. |
| **Potential agent** | 04; 06; 09. |
| **Automation potential** | L1–L2 notify + pack; reopen is human. |
| **Risk level** | Medium–High (service continuity). |

---

## 4. PO exhausted

| Field | Content |
|---|---|
| **Definition** | Invoice would exceed remaining PO quantity or value. |
| **Probable root cause** | Under-estimated PO; duplicate billing; unapproved extras; currency/tax on header. |
| **Required data** | PO residual qty/value; invoice lines; prior billed; change-order policy. |
| **Suggested resolution** | Change order; split invoice; reject overage; approve variance within DOA. |
| **Responsible party** | Buyer (R); AP Specialist executes; Controller policy (A). |
| **Escalation** | Overage &gt; tolerance → DOA chain. |
| **Potential agent** | 03 Matching; 04; 06; 07. |
| **Automation potential** | L1 variance recommend within fence; else escalate. |
| **Risk level** | High if chronic overages. |

---

## 5. Price mismatch

| Field | Content |
|---|---|
| **Definition** | Invoice price ≠ PO price beyond tolerance. |
| **Probable root cause** | Price update not on PO; discount missed; UOM; freight/tax bundled; supplier error. |
| **Required data** | PO line price; invoice price; tolerance table; currency; contract price if any. |
| **Suggested resolution** | Accept within tolerance; buyer approve; supplier credit; PO amend. |
| **Responsible party** | Buyer (R) above tolerance; AP Specialist within; Controller (A) for policy. |
| **Escalation** | Above DOA or strategic vendor dispute → Manager / Procurement. |
| **Potential agent** | 03; 04; 07; 08. |
| **Automation potential** | L2–L3 within tight fences; else L1. |
| **Risk level** | Medium–High. |

---

## 6. Quantity mismatch

| Field | Content |
|---|---|
| **Definition** | Invoice qty ≠ PO/receipt qty beyond tolerance. |
| **Probable root cause** | Partial shipment; overshipping; UOM; duplicate lines; GR lag. |
| **Required data** | PO qty; GR qty; invoice qty; delivery notes. |
| **Suggested resolution** | Partial post; wait GR; return authorization; supplier revise. |
| **Responsible party** | Receiver/Buyer (R); AP (coordination); AP Manager (A). |
| **Escalation** | Suspected fraud overship → Manager + Audit pathway. |
| **Potential agent** | 03; 05; 08; 09. |
| **Automation potential** | L1–L2; careful with L3. |
| **Risk level** | Medium–High. |

---

## 7. Missing receipt

| Field | Content |
|---|---|
| **Definition** | 3-way match required; no goods/service receipt in system. |
| **Probable root cause** | Receiver delay; wrong PO on GR; service entry not done; warehouse backlog. |
| **Required data** | PO; delivery evidence; receiver identity; service acceptance. |
| **Suggested resolution** | Prompt GR; service entry; policy exception rare. |
| **Responsible party** | Receiver (R); AP Manager (A) for ageing control. |
| **Escalation** | Critical SKU / production risk → Operations leadership same day. |
| **Potential agent** | 05; 04; 09. |
| **Automation potential** | L1–L2 chase; L3 auto-GR only with formal charter. |
| **Risk level** | High (operational + payment delay). |

---

## 8. Partial receipt

| Field | Content |
|---|---|
| **Definition** | Receipt exists but insufficient to cover invoice qty/lines. |
| **Probable root cause** | Multi-delivery; invoice billed ahead; GR incomplete lines. |
| **Required data** | Line-level GR vs invoice; ASN/delivery schedule. |
| **Suggested resolution** | Partial match/post; hold remainder; supplier split invoice. |
| **Responsible party** | AP Specialist (R); Receiver (C); AP Manager (A). |
| **Escalation** | Chronic early billing → Supplier Management. |
| **Potential agent** | 03; 05; 08. |
| **Automation potential** | L2 prepare partial match; human release early on. |
| **Risk level** | Medium. |

---

## 9. Duplicate invoice

| Field | Content |
|---|---|
| **Definition** | Confirmed same invoice already recorded/paid (same or transformed identity). |
| **Probable root cause** | Supplier resubmit; multiple channels; OCR variance; credit-as-invoice confusion. |
| **Required data** | Candidate pairs; payment status; document hashes; remittance. |
| **Suggested resolution** | Block/reject; reclaim if paid; supplier notify. |
| **Responsible party** | AP Specialist (R); AP Manager (A); Treasury if recovery. |
| **Escalation** | Paid duplicate → Immediate Manager + Treasury; Audit inform. |
| **Potential agent** | 10; 01; 02; 12. |
| **Automation potential** | L2–L3 hold; confirmation human for material $. |
| **Risk level** | Critical if paid; High if unpaid. |

---

## 10. Potential duplicate

| Field | Content |
|---|---|
| **Definition** | Score/signals suggest duplicate but not confirmed. |
| **Probable root cause** | Similar amounts/dates; recurring utility; shared PO lines; false positive. |
| **Required data** | Score features; document images; history. |
| **Suggested resolution** | Human review; confirm or release with reason; tune model. |
| **Responsible party** | AP Specialist (R); AP Manager (A). |
| **Escalation** | High score + high $ → dual review. |
| **Potential agent** | 10; 04; 12. |
| **Automation potential** | L1–L2; never “silent OK” on high score. |
| **Risk level** | High (uncertainty). |

---

## 11. Wrong supplier

| Field | Content |
|---|---|
| **Definition** | Invoice supplier ≠ expected payee / PO supplier / legal contracting party. |
| **Probable root cause** | Factoring; subsidiary billing; master duplicate; intake mis-assign. |
| **Required data** | Vendor master; PO supplier; remittance advice; factor notices. |
| **Suggested resolution** | Correct vendor; factor setup via MD dual control; reject. |
| **Responsible party** | AP Specialist + MD team (R); Controller (A) for payee changes. |
| **Escalation** | Payee change / factoring → dual control always. |
| **Potential agent** | 02; 04; 08. |
| **Automation potential** | L1 flag; MD changes human-only. |
| **Risk level** | Critical (payment diversion). |

---

## 12. Incorrect legal entity

| Field | Content |
|---|---|
| **Definition** | Invoice billed to or coded against wrong legal entity / ledger. |
| **Probable root cause** | Shared mailbox; wrong PO entity; supplier confusion; intake error. |
| **Required data** | Bill-to details; PO entity; tax registration; intercompany rules. |
| **Suggested resolution** | Reassign entity; reverse/repost; supplier rebill. |
| **Responsible party** | AP Specialist (R); Controller (A). |
| **Escalation** | Cross-border tax impact → Tax + Controller. |
| **Potential agent** | 01; 02; 04; 09. |
| **Automation potential** | L1 suggest; human confirm. |
| **Risk level** | High. |

---

## 13. Tax issue

| Field | Content |
|---|---|
| **Definition** | Tax amount, rate, code, or recoverability inconsistent with rules/invoice. |
| **Probable root cause** | Wrong jurisdiction; reverse charge miss; exempt flag; extraction error. |
| **Required data** | Tax engine result; invoice tax block; vendor tax ID; place of supply. |
| **Suggested resolution** | Correct code; supplier credit/rebill; Tax review. |
| **Responsible party** | Tax Lead policy (A); AP Specialist (R). |
| **Escalation** | Authority query risk or material $ → Tax immediately. |
| **Potential agent** | 02; 04. |
| **Automation potential** | L1–L2; abstain when low confidence. |
| **Risk level** | High. |

---

## 14. Approval missing

| Field | Content |
|---|---|
| **Definition** | Required approval not obtained or not recorded in SoR. |
| **Probable root cause** | Approver absence; wrong routing; email-side approval; pack incomplete. |
| **Required data** | DOA matrix; approval log; delegate rules; evidence pack. |
| **Suggested resolution** | Route correctly; obtain approval; reject email-only as sole control if policy forbids. |
| **Responsible party** | Approver (R); AP Manager (A) for process. |
| **Escalation** | SLA breach → approver’s manager; material → Controller. |
| **Potential agent** | 07; 09; 04. |
| **Automation potential** | L2 assemble/route/remind; approve = human. |
| **Risk level** | High (SoD/DOA). |

---

## 15. DOA issue

| Field | Content |
|---|---|
| **Definition** | Approval attempted outside delegation of authority (amount, account, vendor type). |
| **Probable root cause** | Stale DOA; split invoices; wrong currency; agent mis-route. |
| **Required data** | DOA tables; invoice $; commodity; entity. |
| **Suggested resolution** | Re-route to correct authority; update DOA master. |
| **Responsible party** | Controller (A); AP Manager (R ops). |
| **Escalation** | Any completed breach → Controller + Audit notice. |
| **Potential agent** | 07; 16. |
| **Automation potential** | L2–L3 block out-of-DOA routes. |
| **Risk level** | Critical if breached; High preventive. |

---

## 16. Coding missing

| Field | Content |
|---|---|
| **Definition** | GL/account coding incomplete for non-PO or required segments. |
| **Probable root cause** | No default; new cost type; requestor unknown; extraction gap. |
| **Required data** | Coding segment rules; historical codes; requestor. |
| **Suggested resolution** | Requestor codes; AP suggests from history; policy defaults for micro. |
| **Responsible party** | Requestor (R); AP Manager (A). |
| **Escalation** | Aged coding blocks close → Manager. |
| **Potential agent** | 02; 09; 04. |
| **Automation potential** | L1–L2 suggest; L3 micro defaults if chartered. |
| **Risk level** | Medium. |

---

## 17. Invalid cost centre

| Field | Content |
|---|---|
| **Definition** | Cost centre (or project/IO) invalid, expired, or not allowed for account. |
| **Probable root cause** | Master data lag; reorg; wrong combo rules; OCR error. |
| **Required data** | CC master; validation rules; owner. |
| **Suggested resolution** | Correct CC; finance owner update; reject. |
| **Responsible party** | Cost centre owner (R); AP (coord); Controller (A) policy. |
| **Escalation** | Posting to suspense beyond SLA → Finance ops. |
| **Potential agent** | 02; 09. |
| **Automation potential** | L1–L2 validate/suggest. |
| **Risk level** | Medium. |

---

## 18. Invoice quality

| Field | Content |
|---|---|
| **Definition** | Invoice fails statutory or policy quality (missing legal fields, illegible, wrong document). |
| **Probable root cause** | Supplier process; scan quality; statement sent as invoice; proforma. |
| **Required data** | Quality checklist; jurisdiction requirements. |
| **Suggested resolution** | Reject to supplier with checklist; request proper tax invoice. |
| **Responsible party** | AP Specialist (R); AP Manager (A). |
| **Escalation** | Strategic supplier chronic issues → Supplier Mgmt. |
| **Potential agent** | 01; 02; 08. |
| **Automation potential** | L2–L3 reject notices within template. |
| **Risk level** | Medium (High for tax-invalid). |

---

## 19. OCR / extraction

| Field | Content |
|---|---|
| **Definition** | Captured fields incorrect or low-confidence due to capture/OCR/extraction. |
| **Probable root cause** | Poor scan; complex layouts; handwriting; multi-page tables; model error. |
| **Required data** | Raw image; field confidences; human-corrected truth for learning. |
| **Suggested resolution** | Human correct; re-extract; supplier e-invoice onboarding. |
| **Responsible party** | AP Specialist (R); Prompt Steward/Tech (A) for systemic accuracy. |
| **Escalation** | Accuracy below KPI floor → demote intake automation. |
| **Potential agent** | 01; 02. |
| **Automation potential** | Improve capture; human-in-loop below threshold. |
| **Risk level** | Medium (High if silent wrong amounts). |

---

## 20. Master-data

| Field | Content |
|---|---|
| **Definition** | Failure driven by vendor/item/tax/payment master defects or gaps. |
| **Probable root cause** | Duplicate vendors; stale tax ID; missing payment terms; bad defaults. |
| **Required data** | MD record; change history; golden source. |
| **Suggested resolution** | MD change request with dual control; block payments if bank-related. |
| **Responsible party** | Master Data Owner (R/A); AP raises. |
| **Escalation** | Bank/payee fields → Treasury dual control always. |
| **Potential agent** | 02; 06; 10 (signals). |
| **Automation potential** | L1 detect; changes human dual control. |
| **Risk level** | High–Critical (if payee). |

---

## 21. Banking-change concern

| Field | Content |
|---|---|
| **Definition** | Invoice or supplier communication requests or coincides with remittance bank detail change; or proposal targets recently changed bank account. |
| **Probable root cause** | Legitimate change; business email compromise; insider fraud; MD error. |
| **Required data** | Change ticket; verification evidence; callback record; proposal line. |
| **Suggested resolution** | Hard hold; out-of-band verification; dual approval; never agent-approve. |
| **Responsible party** | Treasury (A); MD + AP (R). |
| **Escalation** | Immediate — any unverified change. |
| **Potential agent** | 10; 12; 08 (draft only). |
| **Automation potential** | L2–L3 **hold and alert only**. |
| **Risk level** | Critical. |

---

## 22. Credit note required

| Field | Content |
|---|---|
| **Definition** | Resolution requires supplier credit note (pricing, returns, duplicate, tax). |
| **Probable root cause** | Returns; overbill; commercial agreement; duplicate. |
| **Required data** | Dispute basis; RMA; correspondence; original invoice. |
| **Suggested resolution** | Request CN; match CN; adjust open item. |
| **Responsible party** | AP Specialist (R); Buyer (C); AP Manager (A). |
| **Escalation** | Supplier refuses → Procurement/Legal path. |
| **Potential agent** | 08; 04; 11. |
| **Automation potential** | L2 draft request; track ageing. |
| **Risk level** | Medium. |

---

## 23. Statement discrepancy

| Field | Content |
|---|---|
| **Definition** | Supplier statement does not reconcile to AP open items. |
| **Probable root cause** | Timing; missing invoices; unapplied credits; wrong entity; paid not updated. |
| **Required data** | Statement file; open items; payment history; prior recon. |
| **Suggested resolution** | Line-level recon; create cases per missing/unmatched; no forced clear. |
| **Responsible party** | AP Specialist (R); AP Manager (A). |
| **Escalation** | Material unexplained &gt; SLA → Manager; dispute → Procurement. |
| **Potential agent** | 11; 04; 08. |
| **Automation potential** | L1–L2 match suggestions; human on residuals. |
| **Risk level** | High if material. |

---

## 24. Payment hold

| Field | Content |
|---|---|
| **Definition** | Invoice/vendor intentionally blocked from payment (dispute, audit, legal, credit). |
| **Probable root cause** | Active dispute; compliance hold; contractual hold; manual block. |
| **Required data** | Hold reason; authority; expiry/review date. |
| **Suggested resolution** | Maintain hold; review cadence; release only by authorized role. |
| **Responsible party** | Hold authority (A); AP executes (R). |
| **Escalation** | Attempted release without authority → Critical incident. |
| **Potential agent** | 12; 04; 16. |
| **Automation potential** | Enforce holds; never silent release. |
| **Risk level** | High–Critical. |

---

## 25. Disputed invoice

| Field | Content |
|---|---|
| **Definition** | Formal commercial/quality/service dispute open against invoice. |
| **Probable root cause** | Service not rendered; quality fail; contract interpretation. |
| **Required data** | Dispute record; owners; supporting evidence; supplier position. |
| **Suggested resolution** | Structured dispute workflow; partial release if allowed; settlement. |
| **Responsible party** | Buyer/Business (R); AP Manager (A) for AP status. |
| **Escalation** | Legal/Procurement for stalled material disputes. |
| **Potential agent** | 08; 09; 04; 14 (ageing). |
| **Automation potential** | L1–L2 tracking/packs; settlement human. |
| **Risk level** | Medium–High. |

---

## 26. Aged unresolved

| Field | Content |
|---|---|
| **Definition** | Exception open beyond ageing threshold regardless of original code. |
| **Probable root cause** | Ownership vacuum; waiting loops; low priority; lost in “Other.” |
| **Required data** | Age; last action; owner; original codes; $ . |
| **Suggested resolution** | Re-triage; executive swarm for material; write-off path only per policy. |
| **Responsible party** | AP Manager (A/R); original owner. |
| **Escalation** | Auto-escalate by age×$ matrix to Controller for material. |
| **Potential agent** | 04; 16; 14; 15. |
| **Automation potential** | Strong L2–L3 escalation automation. |
| **Risk level** | High (process cancer). |

---

## 27. System / interface error

| Field | Content |
|---|---|
| **Definition** | Failure caused by system outage, interface error, job failure, or data sync lag — not business disagreement. |
| **Probable root cause** | API down; batch crash; mapping bug; timeout; idempotency break. |
| **Required data** | Error codes; job logs; payload IDs; replay safety assessment. |
| **Suggested resolution** | Replay if safe; manual workaround; defect ticket; no blind resend of payments. |
| **Responsible party** | Technical Owner (R); AP Manager (A) for business impact. |
| **Escalation** | Payment/close window → Emergency Operator + Controller. |
| **Potential agent** | 16; all agents (detect); Tech ops. |
| **Automation potential** | Detection/alerting high; replay gated. |
| **Risk level** | High–Critical by window. |

---

## Operating rules

1. **One primary code** per case; secondary codes allowed as attributes.  
2. **Version** taxonomy; Agent 04 routing matrix must match version.  
3. **“Other” cap** (illustrative: &lt;5% of exceptions) — breach triggers taxonomy review.  
4. **KPI treatment:** each code rolls to exception rate, resolution time, and repeat rate.  
5. **Change control:** new codes require AP Manager + Controller approval.

---

## Related documents

- `EXCEPTION_DECISION_TREES.md`  
- `Controls/AGENT_CONTROL_MATRIX.md`  
- `KPI_Measurement/KPI_FRAMEWORK.md`  
- `HUMAN_VS_AGENT_FRAMEWORK.md`
