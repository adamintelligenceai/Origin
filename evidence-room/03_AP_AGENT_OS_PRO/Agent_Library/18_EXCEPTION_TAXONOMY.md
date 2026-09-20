# 18 — AP Exception Taxonomy

**Product:** AP Agent OS Pro  
**Usage:** Mandatory coding by Exception Triage (04) and specialist agents.  
**Rule:** Prefer specific codes; use `*.OTHER` only with free-text and RCA candidate flag.

Each category includes: **definition**, **typical root cause**, **data needed**, **resolution path**, **owner**, **escalation**, **primary agent(s)**, **automation potential**, **risk**.

---

## How to read automation potential

| Rating | Meaning |
|--------|---------|
| High | Strong rules; good Level 2–3 candidate |
| Medium | Partial automation; human on edge cases |
| Low | Judgment-heavy or high control risk |
| Human-only | Must not auto-close / auto-pay |

---

## 1. Intake & document

### INT.UNREADABLE
| Field | Content |
|-------|---------|
| Definition | Document cannot be reliably read/extracted |
| Root cause | Scan quality, encryption, unsupported format |
| Data | Source file, channel, OCR errors |
| Resolution | Re-request supplier copy; human key; decrypt via secure process |
| Owner | AP Intake clerk |
| Escalation | AP Ops Lead day 1 |
| Agent | 01 Intake |
| Automation | Medium (detect); Low (fix) |
| Risk | Delay; wrong keying |

### INT.WRONG_DOC_TYPE
| Field | Content |
|-------|---------|
| Definition | Statement, quote, spam, or credit mislabeled as invoice |
| Root cause | Supplier process; mailbox noise |
| Data | Doc class confidence, sample pages |
| Resolution | Divert; reclassify; open correct process |
| Owner | AP Intake |
| Escalation | Ops Lead if systematic |
| Agent | 01, 04 |
| Automation | High |
| Risk | Wrong posting path |

### INT.INCOMPLETE_PACKAGE
| Field | Content |
|-------|---------|
| Definition | Missing pages, attachments, or supporting docs |
| Root cause | Supplier send error; split email |
| Data | Page counts, referenced attachments |
| Resolution | Supplier Resolution request complete pack |
| Owner | Supplier Desk |
| Escalation | Day 5 no reply → Procurement |
| Agent | 01, 08 |
| Automation | Medium |
| Risk | Partial match errors |

---

## 2. Validation & master data

### VAL.MISSING_FIELDS
| Field | Content |
|-------|---------|
| Definition | Required header/line fields absent |
| Root cause | Poor extraction; incomplete invoice |
| Data | Field checklist, confidence |
| Resolution | Human complete or supplier revise |
| Owner | AP Quality |
| Escalation | Recurring → RCA |
| Agent | 02 |
| Automation | High (detect) |
| Risk | Downstream match fail |

### VAL.ARITHMETIC
| Field | Content |
|-------|---------|
| Definition | Lines/tax/total inconsistency beyond tolerance |
| Root cause | Supplier error; tax inclusive confusion |
| Data | Line calc worksheet |
| Resolution | Supplier credit/revise; rare human tolerance accept |
| Owner | AP Specialist |
| Escalation | Material $ → Manager |
| Agent | 02, 08 |
| Automation | High |
| Risk | Overpay |

### VAL.VENDOR_MISMATCH
| Field | Content |
|-------|---------|
| Definition | Invoice party does not confidently match vendor master |
| Root cause | Trading name, new entity, bad master |
| Data | Tax IDs, addresses, remittance name |
| Resolution | Master Data match/create; hold pay until resolved |
| Owner | Master Data |
| Escalation | Bank details involved → Controls |
| Agent | 02, 10 |
| Automation | Medium |
| Risk | Misdirected payment (**high**) |

### VAL.TAX_POLICY
| Field | Content |
|-------|---------|
| Definition | Tax treatment conflicts with entity policy |
| Root cause | Wrong VAT rate; reverse charge missed |
| Data | Tax codes, entity rules, invoice tax block |
| Resolution | Tax-capable review; supplier revise if needed |
| Owner | Tax / AP Tax specialist |
| Escalation | Tax team |
| Agent | 02 |
| Automation | Medium |
| Risk | Compliance |

### VAL.ENTITY_CODING
| Field | Content |
|-------|---------|
| Definition | Wrong company code / entity for invoice |
| Root cause | Shared mailbox; supplier confusion |
| Data | Bill-to, PO entity, mailbox |
| Resolution | Reroute entity; reject if wrong legal entity |
| Owner | AP Ops |
| Escalation | Controller if booked wrong |
| Agent | 02, 09 |
| Automation | Medium |
| Risk | Financial statement error |

---

## 3. Matching

### MATCH.NO_PO
| Field | Content |
|-------|---------|
| Definition | PO required by policy but missing/invalid |
| Root cause | Non-PO buy; wrong ref; confirming PO needed |
| Data | Invoice refs, buyer |
| Resolution | Obtain PO / non-PO approval path |
| Owner | Requester / Buyer |
| Escalation | Procurement Manager |
| Agent | 03, 06, 09 |
| Automation | Medium |
| Risk | Maverick spend |

### MATCH.PRICE_VARIANCE
| Field | Content |
|-------|---------|
| Definition | Invoice price vs PO outside tolerance |
| Root cause | Stale PO; surcharge; supplier increase |
| Data | PO price, invoice price, contract |
| Resolution | PO update, credit, or approved variance |
| Owner | Buyer + AP |
| Escalation | Material → Category manager |
| Agent | 03, 06, 08 |
| Automation | Medium |
| Risk | Overpay |

### MATCH.QTY_VARIANCE
| Field | Content |
|-------|---------|
| Definition | Invoice qty vs PO/GR outside tolerance |
| Root cause | Partial ship; overbill; UoM |
| Data | PO/GR/invoice qty, UoM |
| Resolution | Short pay, credit, wait remaining GR |
| Owner | AP Specialist / Receiver |
| Escalation | Chronic → RCA |
| Agent | 03, 05, 08 |
| Automation | Medium |
| Risk | Overpay / stock error |

### MATCH.UOM_CONFLICT
| Field | Content |
|-------|---------|
| Definition | Unit of measure incompatibility |
| Root cause | Case vs each; catalog mismatch |
| Data | UoM tables, conversion |
| Resolution | PO fix or supplier revise |
| Owner | Buyer |
| Escalation | Master data item steward |
| Agent | 03, 06 |
| Automation | Medium |
| Risk | Large qty errors |

### MATCH.LINE_AMBIGUITY
| Field | Content |
|-------|---------|
| Definition | Cannot map invoice lines to PO lines confidently |
| Root cause | Bundled billing; poor descriptions |
| Data | Line text, amounts |
| Resolution | Human map; supplier itemized invoice |
| Owner | AP Matching |
| Escalation | Buyer |
| Agent | 03, 08 |
| Automation | Low |
| Risk | Misallocate cost |

### MATCH.AMOUNT_ONLY_FAIL
| Field | Content |
|-------|---------|
| Definition | Amount-only match not allowed or failed |
| Root cause | Policy; multiple open lines |
| Data | Policy flag, open PO lines |
| Resolution | Force line match or policy exception human |
| Owner | AP Matching Lead |
| Escalation | Manager |
| Agent | 03 |
| Automation | Low |
| Risk | Control bypass if forced poorly |

---

## 4. Goods receipt

### GR.MISSING
| Field | Content |
|-------|---------|
| Definition | 3-way match blocked; no GR/SES |
| Root cause | Receiver delay; service entry pending |
| Data | PO, delivery date, receiver |
| Resolution | Post GR; or policy non-GR path |
| Owner | Receiver |
| Escalation | Supervisor day 2; plant day 5 |
| Agent | 05, 09 |
| Automation | High (chase); Human-only (post) |
| Risk | Late pay; accrued misstate |

### GR.PARTIAL
| Field | Content |
|-------|---------|
| Definition | GR qty insufficient for invoice |
| Root cause | Split delivery; overbill |
| Data | Open GR qty |
| Resolution | Wait remainder; short pay; credit |
| Owner | Receiver + AP |
| Escalation | Due-date risk → Manager |
| Agent | 05, 03, 08 |
| Automation | Medium |
| Risk | Premature full pay |

### GR.OVER_RECEIPT_RISK
| Field | Content |
|-------|---------|
| Definition | Suggested GR would exceed PO dangerously |
| Root cause | Wrong PO; duplicate receive pressure |
| Data | PO open qty, proposed GR |
| Resolution | Investigate; do not instruct over-receipt |
| Owner | Receiving Lead |
| Escalation | Controls if intentional override pressure |
| Agent | 05, 10 |
| Automation | High (detect) |
| Risk | Inventory / fraud signal |

---

## 5. PO quality

### PO.PRICE_OUTDATED
| Field | Content |
|-------|---------|
| Definition | PO price not aligned to contract/catalog |
| Root cause | Missed price update |
| Data | Catalog/contract vs PO |
| Resolution | Buyer updates PO |
| Owner | Buyer |
| Escalation | Purchasing manager day 3 |
| Agent | 06 |
| Automation | High |
| Risk | Chronic exceptions |

### PO.MISSING_ACCOUNT_ASSIGNMENT
| Field | Content |
|-------|---------|
| Definition | Cost object / GL missing for invoice posting |
| Root cause | Incomplete PO |
| Data | PO account assignment |
| Resolution | Buyer/requester complete coding |
| Owner | Buyer / Requestor |
| Escalation | Budget owner |
| Agent | 06, 09 |
| Automation | Medium |
| Risk | P&L misclass |

### PO.BLANKET_MISUSE
| Field | Content |
|-------|---------|
| Definition | Blanket/limit PO used beyond intent or limit |
| Root cause | Convenience buying |
| Data | Blanket limits, release history |
| Resolution | New PO; reinforce policy |
| Owner | Procurement Ops |
| Escalation | Procurement Manager |
| Agent | 06, 15 |
| Automation | Medium |
| Risk | Spend leakage |

### PO.CLOSED_OR_LOCKED
| Field | Content |
|-------|---------|
| Definition | PO cannot accept further match |
| Root cause | Premature close; final billed |
| Data | PO status |
| Resolution | Reopen per policy or new PO |
| Owner | Buyer |
| Escalation | Procurement |
| Agent | 06 |
| Automation | Low |
| Risk | Delay |

---

## 6. Approval & holds

### APR.SLA_BREACH
| Field | Content |
|-------|---------|
| Definition | Approver exceeded SLA |
| Root cause | OOO; workload; unclear packet |
| Data | Workflow timestamps |
| Resolution | Nudge; delegate; escalate |
| Owner | Approver / AP |
| Escalation | Matrix manager |
| Agent | 07 |
| Automation | High |
| Risk | Late payment / discount loss |

### APR.REJECTED
| Field | Content |
|-------|---------|
| Definition | Approver rejected invoice |
| Root cause | Wrong coding; dispute; unauthorized buy |
| Data | Reject reason |
| Resolution | Fix & resubmit or supplier credit |
| Owner | Requestor / AP |
| Escalation | AP Manager if conflict |
| Agent | 07, 09, 08 |
| Automation | Medium |
| Risk | Relationship / write-off |

### APR.MATRIX_GAP
| Field | Content |
|-------|---------|
| Definition | No approver resolvable |
| Root cause | Stale matrix; vacated role |
| Data | Matrix version |
| Resolution | AP Manager remap |
| Owner | AP Manager |
| Escalation | Controller |
| Agent | 07, 16 |
| Automation | Low |
| Risk | Control failure |

### HOLD.PAYMENT_HOLD
| Field | Content |
|-------|---------|
| Definition | Vendor or invoice on payment hold |
| Root cause | Dispute, compliance, manual hold |
| Data | Hold code, owner |
| Resolution | Resolve cause; human lift hold |
| Owner | Hold owner |
| Escalation | AP Manager |
| Agent | 12, 04 |
| Automation | High (enforce); Human-only (lift) |
| Risk | Paying held items (**critical**) |

---

## 7. Supplier & internal follow-up

### SUP.NO_RESPONSE
| Field | Content |
|-------|---------|
| Definition | Supplier silent beyond SLA |
| Root cause | Bad contact; ignore |
| Data | Chase log |
| Resolution | Alternate contact via buyer; escalate category |
| Owner | Supplier Desk |
| Escalation | Procurement day 5 |
| Agent | 08, 09 |
| Automation | High |
| Risk | Aging |

### SUP.DISPUTE
| Field | Content |
|-------|---------|
| Definition | Active commercial dispute |
| Root cause | Quality, price, service fail |
| Data | Dispute notes, evidence |
| Resolution | Negotiated settlement human-owned |
| Owner | Procurement + AP |
| Escalation | Legal if needed |
| Agent | 08, 04 |
| Automation | Low |
| Risk | Write-off / pay wrong |

### SUP.BANK_CHANGE_CLAIM
| Field | Content |
|-------|---------|
| Definition | Supplier requests remittance bank change |
| Root cause | Real change or fraud attempt |
| Data | Request channel, old/new bank |
| Resolution | **Master Data callback / verified process only** |
| Owner | Master Data + Controls |
| Escalation | Security if suspicious |
| Agent | 08, 10 |
| Automation | Low; Human-only apply |
| Risk | **Critical** fraud / mispay |

### INT.OWNER_NO_RESPONSE
| Field | Content |
|-------|---------|
| Definition | Internal owner not responding |
| Root cause | Workload; wrong owner |
| Data | Nudge log |
| Resolution | Escalate hierarchy |
| Owner | AP Ops |
| Escalation | Director on P1 |
| Agent | 09, 16 |
| Automation | High |
| Risk | SLA breach |

---

## 8. Duplicate & anomaly

### DUP.EXACT
| Field | Content |
|-------|---------|
| Definition | Exact invoice number+vendor (+amount) already exists |
| Root cause | Resubmit; process error |
| Data | Twin invoice IDs |
| Resolution | Reject duplicate; confirm with supplier |
| Owner | AP Controls / Specialist |
| Escalation | If already paid → Controllers/Security |
| Agent | 10, 12 |
| Automation | High |
| Risk | Double pay (**critical**) |

### DUP.FUZZY
| Field | Content |
|-------|---------|
| Definition | High similarity without exact key match |
| Root cause | Typo invoice #; split invoices |
| Data | Similarity features |
| Resolution | Human review; soft/hard flag per policy |
| Owner | Controls |
| Escalation | Material $ |
| Agent | 10 |
| Automation | Medium |
| Risk | False positive delay / false negative pay |

### ANOM.OUTLIER
| Field | Content |
|-------|---------|
| Definition | Statistical or rule outlier (amount, timing, pattern) |
| Root cause | Legitimate spike or risk event |
| Data | Baseline, score, explain |
| Resolution | Human review; do not treat as proven fraud |
| Owner | Controls |
| Escalation | Compliance per policy |
| Agent | 10 |
| Automation | Medium |
| Risk | Misread anomaly; **no fraud guarantee** |

### ANOM.BANK_CHANGE_ADJACENT
| Field | Content |
|-------|---------|
| Definition | Invoice near recent vendor bank change |
| Root cause | Coincidence or attack pattern |
| Data | Change log, invoice timing |
| Resolution | Extra verification before pay |
| Owner | Controls + Payment Lead |
| Escalation | Security |
| Agent | 10, 12 |
| Automation | High (flag) |
| Risk | **Critical** |

---

## 9. Statements & cash

### STMT.MISSING_INVOICE
| Field | Content |
|-------|---------|
| Definition | On statement, not in AP |
| Root cause | Never received; lost intake |
| Data | Statement line |
| Resolution | Request copy → Intake |
| Owner | Recon + Intake |
| Escalation | Material pre-pay run |
| Agent | 11, 01, 08 |
| Automation | Medium |
| Risk | Surprise liability |

### STMT.MISSING_CREDIT
| Field | Content |
|-------|---------|
| Definition | Credit on statement not in AP |
| Root cause | CN not received/applied |
| Data | CN ref |
| Resolution | Obtain & apply credit |
| Owner | Recon |
| Escalation | Supplier Desk |
| Agent | 11, 08 |
| Automation | Medium |
| Risk | Overpay |

### STMT.PAYMENT_MISMATCH
| Field | Content |
|-------|---------|
| Definition | Payment timing/application differs statement vs ERP |
| Root cause | Remittance misapply; timing |
| Data | Remittance, bank |
| Resolution | Cash app investigate |
| Owner | Cash Application / AP |
| Escalation | Treasury |
| Agent | 11 |
| Automation | Low |
| Risk | Duplicate chase / credit risk |

### STMT.AMOUNT_BREAK
| Field | Content |
|-------|---------|
| Definition | Same ref different amounts |
| Root cause | Partial pay; FX; error |
| Data | Both amounts |
| Resolution | Explain & adjust |
| Owner | Recon |
| Escalation | Material |
| Agent | 11, 08 |
| Automation | Medium |
| Risk | Settlement error |

---

## 10. Payment proposal

### PAY.EXCLUDED_HOLD
| Field | Content |
|-------|---------|
| Definition | Item excluded from proposal due to hold/flag |
| Root cause | Control working as designed |
| Data | Hold code |
| Resolution | Clear root hold via owner—not force include |
| Owner | Payment Lead |
| Escalation | Manager if critical vendor |
| Agent | 12 |
| Automation | High |
| Risk | Manual override abuse |

### PAY.DISCOUNT_AT_RISK
| Field | Content |
|-------|---------|
| Definition | Early-pay discount window closing |
| Root cause | Process latency |
| Data | Terms, dates |
| Resolution | Prioritize human release decision |
| Owner | Payment Lead / Treasury |
| Escalation | Same day |
| Agent | 12, 14 |
| Automation | High |
| Risk | Lost discount $ |

### PAY.CASH_CONSTRAINT
| Field | Content |
|-------|---------|
| Definition | Proposal exceeds available funding guidance |
| Root cause | Liquidity planning |
| Data | Treasury guidance |
| Resolution | Prioritize / defer human decision |
| Owner | Treasury |
| Escalation | CFO path per policy |
| Agent | 12, 16 |
| Automation | Medium |
| Risk | Relationship / covenant |

---

## 11. Close & reporting

### CLOSE.ACCRUAL_GAP
| Field | Content |
|-------|---------|
| Definition | Likely unbilled receipt needing accrual |
| Root cause | Invoice lag |
| Data | GR without invoice |
| Resolution | Accrual proposal → accounting post |
| Owner | AP Close + Accounting |
| Escalation | Controller |
| Agent | 13 |
| Automation | Medium |
| Risk | Misstated expenses |

### CLOSE.CUTOFF
| Field | Content |
|-------|---------|
| Definition | Document straddles period incorrectly |
| Root cause | Late intake; wrong dating |
| Data | Doc date vs posting period |
| Resolution | Cut-off adjustment per policy |
| Owner | Accounting |
| Escalation | Controller |
| Agent | 13 |
| Automation | Low |
| Risk | Period error |

### RPT.TIEOUT_FAIL
| Field | Content |
|-------|---------|
| Definition | Report does not tie to ERP control total |
| Root cause | Extract lag; definition bug |
| Data | Diff amount |
| Resolution | Block publish; fix definition/extract |
| Owner | Data steward |
| Escalation | AP Manager |
| Agent | 14 |
| Automation | High (detect) |
| Risk | Bad decisions |

---

## 12. Catch-all

### TAXONOMY.OTHER
| Field | Content |
|-------|---------|
| Definition | Does not fit existing codes |
| Root cause | Novel issue or taxonomy gap |
| Data | Free text, samples |
| Resolution | Human classify; propose new code via RCA/Governance |
| Owner | AP Quality |
| Escalation | Taxonomy update within 5 days |
| Agent | 04, 15 |
| Automation | Low |
| Risk | Hidden systemic issues |

---

## Cross-cutting risk legend

| Risk tier | Examples |
|-----------|----------|
| Critical | Bank change, double pay, pay on hold, misdirected vendor |
| High | Price/qty overpay, entity wrong, tax compliance |
| Medium | Aging, SLA, discount loss |
| Low | Cosmetic doc issues with no $ impact |

---

## Related

- Triage Agent: `04_EXCEPTION_TRIAGE_AGENT.md`  
- Progression: `17_RESPONSIBILITY_PROGRESSION_MODEL.md`  
- Controls: `../Controls/00_CONTROL_FRAMEWORK.md`
