---
title: Diagnostic Questions
subtitle: 36 questions · six domains · evidenced answers only
tier: Free
code: ER-AP-FREE-01
---

# Domain A — Volume, cost and labour

A1. Do you know monthly invoice volume by entity and channel (email, portal, EDI, paper, supplier network)?  
A2. Do you know the all-in cost per invoice, even as a controlled estimate?  
A3. Do you know AP FTE and fully loaded cost?  
A4. Do you know the percentage of invoices that receive a manual touch?  
A5. Do you know average cycle time from receipt to ready-to-pay?  
A6. Can you produce last quarter's volumes in one working day without a hero extract?

# Domain B — Exceptions and matching

B1. Is every exception coded against a defined taxonomy (not free-text only)?  
B2. Do you know the exception rate and the top five codes by volume and ageing?  
B3. Is two-way / three-way match logic documented including tolerances?  
B4. Can you separate price, quantity, and receipt failures?  
B5. Do you measure repeat exceptions by supplier, buyer, and PO type?  
B6. Is duplicate detection documented (exact and near-duplicate rules)?

# Domain C — Process and ownership

C1. Is there a current-state AP process map less than 12 months old?  
C2. Is there a named process owner per major variant (PO, non-PO, intercompany, expense-adjacent)?  
C3. Is RACI clear for GR, coding, approval, supplier queries, and payment proposal?  
C4. Are DOA rules machine-readable, not only in a PDF policy?  
C5. Are SOP and actual practice reconciled in the last year?  
C6. Can a new AP analyst be trained from artifacts rather than shadowing only?

# Domain D — Data and systems

D1. Can invoice header and line data be exported with stable IDs?  
D2. Can PO, GR, vendor master, and approval history be joined without a project?  
D3. Is vendor bank-change history available to reviewers before payment?  
D4. Are legal entity, tax, and currency fields reliable enough to validate against?  
D5. Do you know which AI / automation tools already touch AP, including shadow IT?  
D6. Is there an environment for historical testing that is not production payment?

# Domain E — Controls and evidence

E1. Is there a written rule that humans authorise payments?  
E2. Are overrides logged with who, why, and before/after values?  
E3. Is segregation of duties defined for agent operators vs payment releasers?  
E4. Is there an evidence retention rule for model output and prompts?  
E5. Is there an incident path if an agent drafts an incorrect supplier communication?  
E6. Has Internal Audit or Controls been shown the intended agent design?

# Domain F — Measurement and change

F1. Is there a baseline dashboard a CFO would recognise?  
F2. Are benefits tracked as capacity, cost, risk — not only “invoices processed by AI”?  
F3. Is there a named executive sponsor for AP improvement this year?  
F4. Can the team run a two-week shadow pilot without a six-month IT project?  
F5. Is there a change plan for buyers and receivers, not only AP?  
F6. Would the Head of AP stop an agent on evidence, not on politics?

# Ten-agent opportunity overlay

After scoring, mark each family High / Medium / Low using volume × pain × data readiness × control comfort.

| Family | Typical first use | Avoid as first execute agent |
|---|---|---|
| 1 Invoice intake | Completeness / extraction QA | Auto-filing legal invoices |
| 2 Validation | Required-field and duplicate flags | Vendor master writes |
| 3 Matching | Variance explanation | Tolerance changes |
| 4 Exception triage | Classification + next action | Auto-close of disputes |
| 5 Goods receipt | Missing GR chase list | Auto-receipting |
| 6 PO quality | Buyer feedback pack | Blocking PO creation |
| 7 Approvals | Stall detection | Auto-approve over DOA |
| 8 Supplier resolution | Draft letters | Unreviewed outbound mail |
| 9 Internal follow-up | Draft chases | Escalating executives unprompted |
| 10 Duplicate & anomaly | Queue for review | Payment blocks without human rule |

Agents 11–16 (statement rec, payment proposal review, close, reporting, root cause, orchestrator) are **Professional-tier** depth. The free diagnostic only ranks whether they are even plausible.

# Business-case starter (order of magnitude)

Use Ardent Partners 2025 as orientation, not as your number:

- Market average all-in cost: **$9.84** per invoice
- Best-in-Class: **$2.65** · All others: **$12.42**
- Average exception rate: **18.4%**
- Average cycle: **8.2 days**

Your case must use **your** volume, labour and exception minutes. The Excel model does the arithmetic. Do not quote Ardent as if it were your baseline.

# CFO one-pager

Fill: score, stage, top constraint, first agent, data gap, control gap, 90-day ask, what will not be automated.
