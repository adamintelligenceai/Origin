# AP Exception Taxonomy

**Purpose:** Shared language for every AP break — definition, root cause, data, resolution, owner, escalation, agent, automation potential, risk.  
**Rule:** Every exception gets ≥1 primary code. Coding QA is a control, not paperwork.

**Automation potential scale:** L = Low, M = Medium, H = High (for *resolution assist*, not unsupervised waive).

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Classify breaks so routing, KPI, and root cause work |
| **How** | Code at creation (A04); QA sample; feed A15 |
| **Who** | AP Exception Manager owns taxonomy; coders = A04 + humans |

---

## Category catalog (30)

### 1. EX-DUP-EXACT — Exact duplicate invoice
| Field | Content |
|---|---|
| **Definition** | Same vendor + invoice number already exists (open or paid) |
| **Root cause** | Resubmission; supplier system; AP re-entry |
| **Data** | Vendor ID, invoice #, amounts, prior case ID |
| **Resolution** | Confirm prior; reject/credit; void duplicate path |
| **Owner** | AP Controls / Exception Desk |
| **Escalation** | If paid twice → Disbursements + Controller |
| **Agent** | A10, A04, A02 |
| **Automation** | H detect / M resolve |
| **Risk** | High — duplicate payment |

### 2. EX-DUP-NEAR — Near duplicate / fuzzy match
| Field | Content |
|---|---|
| **Definition** | Highly similar invoice keys with variance (OCR, suffix, date) |
| **Root cause** | Data quality; intentional split; coincidence |
| **Data** | Similarity score, fields differed |
| **Resolution** | Investigate; do not auto-void |
| **Owner** | AP Controls |
| **Escalation** | Material $ → Controls Lead |
| **Agent** | A10, A04 |
| **Automation** | M detect / L resolve |
| **Risk** | High if wrong; medium FP burden |

### 3. EX-PO-MISS — Missing / invalid PO
| Field | Content |
|---|---|
| **Definition** | PO required but blank, invalid, or closed for invoicing |
| **Root cause** | Maverick buy; supplier omission; wrong PO |
| **Data** | Invoice, vendor, policy threshold |
| **Resolution** | Obtain PO; non-PO path if policy; return invoice |
| **Owner** | Buyer / Requester; AP triage |
| **Escalation** | Above non-PO limit → Procurement + Controller |
| **Agent** | A02, A04, A06, A09 |
| **Automation** | M |
| **Risk** | Medium–High (unauthorized spend) |

### 4. EX-PO-PRICE — PO price variance
| Field | Content |
|---|---|
| **Definition** | Invoice price outside tolerance vs PO/contract |
| **Root cause** | Price change; wrong PO; currency; UOM |
| **Data** | PO line, invoice line, tolerance version |
| **Resolution** | Supplier credit; PO amendment; force-match with approval |
| **Owner** | Buyer / Category Manager |
| **Escalation** | Strategic supplier / material $ → Category |
| **Agent** | A03, A04, A06, A08 |
| **Automation** | M |
| **Risk** | Medium (margin leakage) |

### 5. EX-PO-QTY — Quantity variance
| Field | Content |
|---|---|
| **Definition** | Invoice qty > received/ordered beyond tolerance |
| **Root cause** | Overbill; partial receipt; wrong UOM |
| **Data** | Ordered, received, invoiced qty |
| **Resolution** | Credit; wait GR; amend |
| **Owner** | Receiving + Buyer |
| **Escalation** | Persistent overbill → Procurement |
| **Agent** | A03, A05, A08 |
| **Automation** | M |
| **Risk** | Medium–High |

### 6. EX-GR-MISS — Missing goods receipt
| Field | Content |
|---|---|
| **Definition** | 3-way required; insufficient GR/SES |
| **Root cause** | Not received; received not posted; wrong plant |
| **Data** | PO, GR docs, ASN |
| **Resolution** | Post GR; SES; or return invoice |
| **Owner** | Receiving / Project Manager |
| **Escalation** | High $ past SLA → Ops Director |
| **Agent** | A05, A03, A09 |
| **Automation** | M chase / L post |
| **Risk** | High if paid without receipt |

### 7. EX-GR-MISMATCH — GR mismatch
| Field | Content |
|---|---|
| **Definition** | GR exists but item/qty/location mismatch |
| **Root cause** | Wrong receipt; substitution; data error |
| **Data** | GR lines vs invoice |
| **Resolution** | Correct GR; credit; investigate |
| **Owner** | Receiving |
| **Escalation** | Shrink suspicion → Inventory/Security |
| **Agent** | A05, A03, A04 |
| **Automation** | L–M |
| **Risk** | High |

### 8. EX-VEND-ID — Vendor identity unresolved
| Field | Content |
|---|---|
| **Definition** | Cannot uniquely match payee to vendor master |
| **Root cause** | New vendor; remittance name variance; duplicate masters |
| **Data** | Name, tax ID, bank hints (careful), addresses |
| **Resolution** | Master data match or create via MDM process |
| **Owner** | Master Data Steward |
| **Escalation** | Bank change / new payee → dual control |
| **Agent** | A02, A08, A04 |
| **Automation** | M suggest / L create |
| **Risk** | Critical (misdirected pay) |

### 9. EX-VEND-BANK — Remittance / bank change request
| Field | Content |
|---|---|
| **Definition** | Supplier requests change to payment credentials |
| **Root cause** | Legitimate change or diversion fraud attempt |
| **Data** | Request channel, old/new details, verification |
| **Resolution** | Out-of-band verify; dual control update |
| **Owner** | Master Data + Treasury/AP Controls |
| **Escalation** | Any doubt → Security |
| **Agent** | A08, A10 (signal), A04 |
| **Automation** | L (assist checklist only) |
| **Risk** | Critical |

### 10. EX-TAX-CALC — Tax calculation / code issue
| Field | Content |
|---|---|
| **Definition** | Tax amount/code inconsistent with policy/engine |
| **Root cause** | Wrong jurisdiction; supplier error; exemption |
| **Data** | Tax lines, ship-to, vendor tax status |
| **Resolution** | Correct code; supplier revise; tax SME |
| **Owner** | Tax / AP Quality |
| **Escalation** | Material exposure → Tax |
| **Agent** | A02, A04, A08 |
| **Automation** | M |
| **Risk** | Medium–High (compliance) |

### 11. EX-CUR-FX — Currency / FX issue
| Field | Content |
|---|---|
| **Definition** | Currency mismatch or FX outside policy |
| **Root cause** | Wrong currency billed; rate source; hedge |
| **Data** | Invoice ccy, PO ccy, rate table version |
| **Resolution** | Recode; supplier revise; approved FX |
| **Owner** | AP Matching / Treasury for rate policy |
| **Escalation** | Large FX swing → Treasury |
| **Agent** | A02, A03, A04 |
| **Automation** | M |
| **Risk** | Medium |

### 12. EX-MATH-HDR — Header/line math break
| Field | Content |
|---|---|
| **Definition** | Header totals ≠ sum of lines/tax/freight |
| **Root cause** | Extraction error; supplier doc error |
| **Data** | Extracted fields, raw image |
| **Resolution** | Re-extract; request corrected invoice |
| **Owner** | Intake Quality / Supplier |
| **Escalation** | Systemic OCR → IT/IDR |
| **Agent** | A01, A02, A08 |
| **Automation** | H detect / M resolve |
| **Risk** | Medium |

### 13. EX-IMG-QUAL — Unreadable / incomplete document
| Field | Content |
|---|---|
| **Definition** | Cannot extract required fields reliably |
| **Root cause** | Scan quality; wrong attachment; corruption |
| **Data** | Confidence scores, channel |
| **Resolution** | Resend; manual key; quarantine |
| **Owner** | Intake + Supplier Desk |
| **Escalation** | Channel outage → IT |
| **Agent** | A01, A08 |
| **Automation** | H detect |
| **Risk** | Low–Medium (delay) |

### 14. EX-NONAP — Non-AP document
| Field | Content |
|---|---|
| **Definition** | Statement, marketing, spam, or other non-invoice |
| **Root cause** | Misdirected email; classifier miss |
| **Data** | Doc class confidence |
| **Resolution** | Reroute or discard per policy |
| **Owner** | Intake |
| **Escalation** | Malware → Security |
| **Agent** | A01 |
| **Automation** | H |
| **Risk** | Low (malware = high) |

### 15. EX-CREDIT-MISS — Missing credit memo
| Field | Content |
|---|---|
| **Definition** | Expected credit not received/applied |
| **Root cause** | Supplier delay; unapplied; dispute |
| **Data** | Dispute refs, statement residuals |
| **Resolution** | Chase credit; apply; A11 recon |
| **Owner** | Supplier Desk / Buyer |
| **Escalation** | Material → Category |
| **Agent** | A08, A11, A04 |
| **Automation** | M |
| **Risk** | Medium (overpay) |

### 16. EX-TERM-DISC — Terms / discount dispute
| Field | Content |
|---|---|
| **Definition** | Payment terms or discount % disagree |
| **Root cause** | Master vs invoice; negotiation drift |
| **Data** | Vendor terms, invoice terms |
| **Resolution** | Align master; take/skip discount policy |
| **Owner** | Procurement + AP Disbursements |
| **Escalation** | Cash impact → Treasury |
| **Agent** | A02, A12, A08 |
| **Automation** | M |
| **Risk** | Medium |

### 17. EX-APPR-DELAY — Approval ageing
| Field | Content |
|---|---|
| **Definition** | Required approval not completed within SLA |
| **Root cause** | Approver OOO; unclear DOA; workload |
| **Data** | Workflow ageing, approver |
| **Resolution** | Remind; substitute; escalate ladder |
| **Owner** | Approver / AP Approvals |
| **Escalation** | Material → Manager chain |
| **Agent** | A07, A09 |
| **Automation** | H chase |
| **Risk** | Medium (late pay / control) |

### 18. EX-APPR-SOD — Approval SoD conflict
| Field | Content |
|---|---|
| **Definition** | Approver fails segregation rules |
| **Root cause** | Bad matrix; self-approval; proxy misuse |
| **Data** | Identities, DOA version |
| **Resolution** | Re-route; Controls review |
| **Owner** | Financial Controls |
| **Escalation** | Audit |
| **Agent** | A07, A16 |
| **Automation** | H detect / L resolve |
| **Risk** | High |

### 19. EX-CODE-ACCT — Coding / GL account issue
| Field | Content |
|---|---|
| **Definition** | Missing/invalid cost center, GL, project, grant |
| **Root cause** | Requester omission; closed CC |
| **Data** | Coding fields, validation errors |
| **Resolution** | Internal coding task |
| **Owner** | Requester / Finance BP |
| **Escalation** | Grant compliance → Grants office |
| **Agent** | A02, A09 |
| **Automation** | M |
| **Risk** | Medium |

### 20. EX-CUTOFF — Period cut-off issue
| Field | Content |
|---|---|
| **Definition** | Invoice/receipt timing conflicts with close cut-off |
| **Root cause** | Late submit; receiving lag |
| **Data** | Dates vs close calendar |
| **Resolution** | Accrue; post next period; policy exception |
| **Owner** | AP Close / Controller |
| **Escalation** | Material → Controller |
| **Agent** | A13, A05 |
| **Automation** | M flag |
| **Risk** | Medium (misstatement) |

### 21. EX-STMT-GAP — Statement on-stmt-not-books
| Field | Content |
|---|---|
| **Definition** | Statement line not in AP open items |
| **Root cause** | Missing invoice; paid; disputed |
| **Data** | Statement Case residual |
| **Resolution** | Obtain invoice; confirm paid; dispute |
| **Owner** | Reconciliation + Supplier Desk |
| **Escalation** | Large liability risk → Controller |
| **Agent** | A11, A08, A04 |
| **Automation** | M |
| **Risk** | High |

### 22. EX-STMT-BOOK — Statement books-not-on-stmt
| Field | Content |
|---|---|
| **Definition** | Open AP item absent from supplier statement |
| **Root cause** | Timing; supplier books; our error |
| **Data** | Open item vs statement |
| **Resolution** | Confirm with supplier; adjust if needed |
| **Owner** | Reconciliation |
| **Escalation** | Persistent → Category |
| **Agent** | A11, A08 |
| **Automation** | M |
| **Risk** | Medium |

### 23. EX-FREIGHT — Freight / surcharge dispute
| Field | Content |
|---|---|
| **Definition** | Unexpected freight, fuel, or surcharge lines |
| **Root cause** | Incoterms; not on PO; supplier add-on |
| **Data** | PO freights flags, invoice lines |
| **Resolution** | Approve per policy; credit; amend PO |
| **Owner** | Buyer / Logistics |
| **Escalation** | Pattern → Procurement |
| **Agent** | A03, A06, A08 |
| **Automation** | M |
| **Risk** | Low–Medium |

### 24. EX-CONTRACT — Contract / blanket release issue
| Field | Content |
|---|---|
| **Definition** | Invoice not tied correctly to contract/blanket release |
| **Root cause** | Release missing; expired contract; wrong reference |
| **Data** | Contract ID, release # |
| **Resolution** | Create release; renew contract; non-PO policy |
| **Owner** | Category / Buyer |
| **Escalation** | Expired high spend → Procurement leadership |
| **Agent** | A03, A06, A09 |
| **Automation** | M |
| **Risk** | Medium–High |

### 25. EX-SERVICE-SES — Service entry missing/mismatch
| Field | Content |
|---|---|
| **Definition** | Services invoice without accepted SES/timesheet evidence |
| **Root cause** | PM not confirming; scope dispute |
| **Data** | SES, SOW refs |
| **Resolution** | PM accept; credit; revise |
| **Owner** | Project Manager |
| **Escalation** | Scope dispute → Commercial |
| **Agent** | A05, A09, A08 |
| **Automation** | M chase |
| **Risk** | High |

### 26. EX-HOLD-LEGAL — Legal / compliance hold
| Field | Content |
|---|---|
| **Definition** | Payment or processing restricted by legal/compliance |
| **Root cause** | Dispute litigation; sanctions; audit hold |
| **Data** | Hold code, authority |
| **Resolution** | Only hold-owner release |
| **Owner** | Legal / Compliance |
| **Escalation** | Sanctions → Compliance immediately |
| **Agent** | A12, A04, A16 |
| **Automation** | L |
| **Risk** | Critical |

### 27. EX-ANOM-BEHAV — Anomaly behavior signal
| Field | Content |
|---|---|
| **Definition** | Statistical/rule anomaly without confirmed duplicate |
| **Root cause** | Unknown — investigate; **not proven fraud** |
| **Data** | Signal type, score, explanation |
| **Resolution** | Investigate; disposition TP/FP/inconclusive |
| **Owner** | AP Controls |
| **Escalation** | Confirmed diversion pattern → Security |
| **Agent** | A10, A04 |
| **Automation** | M detect / L resolve |
| **Risk** | Variable; treat as investigative |

### 28. EX-PARTIAL-PAY — Short pay / partial dispute
| Field | Content |
|---|---|
| **Definition** | Planned short pay pending credit or dispute |
| **Root cause** | Quality claim; partial delivery |
| **Data** | Dispute $ , reason |
| **Resolution** | Document short pay policy; settle |
| **Owner** | Buyer + AP Disbursements |
| **Escalation** | Supplier threat to withhold → Category |
| **Agent** | A12, A08, A04 |
| **Automation** | L–M |
| **Risk** | Medium (relationship/control) |

### 29. EX-MASTER-STALE — Stale master data
| Field | Content |
|---|---|
| **Definition** | Terms, address, tax ID, status outdated causing breaks |
| **Root cause** | MDM backlog; merger; inactivity |
| **Data** | Master fields vs invoice |
| **Resolution** | MDM update with controls |
| **Owner** | Master Data Steward |
| **Escalation** | Payee-impacting → dual control |
| **Agent** | A02, A08 |
| **Automation** | M detect |
| **Risk** | Medium–High |

### 30. EX-OTHER-CTRL — Other control break
| Field | Content |
|---|---|
| **Definition** | Residual control failures not elsewhere classified |
| **Root cause** | Policy gap; system defect |
| **Data** | Free-text + mandatory review |
| **Resolution** | Human classify within 2 business days into standard code or approve new code |
| **Owner** | AP Exception Manager |
| **Escalation** | If used > threshold → taxonomy change control |
| **Agent** | A04, A16 |
| **Automation** | L |
| **Risk** | Unknown — constrain usage |

---

## Coding rules

1. Primary code = highest control risk if multiple apply.
2. Secondary codes allowed (max 3).
3. `EX-OTHER-CTRL` usage monitored; convert to formal codes via change control.
4. Never code “fraud confirmed” — use duplicate/anomaly + disposition.
5. Quarterly taxonomy review with Audit.

---

## Control / Measure / Evidence

| Dimension | Standard |
|---|---|
| **Control** | Mandatory primary code; QA sampling |
| **Measure** | Coding accuracy; top-10 Pareto; ageing by code |
| **Evidence** | Case codes; QA sheets; taxonomy version history |

---

## Related

- Methodology: `00_METHODOLOGY.md`
- A04 Exception Triage; A15 Root Cause
