# Evidence Room — AP Agent OS Professional

## Template — SOP (example + blank)

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Templates  
**Standard:** Proof before permission  
**Use with:** `../Process_Mapping/03_SOP_GENERATOR_FRAMEWORK.md`  
**ERP stance:** Agnostic. Name systems from the buyer’s register.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** current-state excerpt.  
**Version:** 1.0  

If a section does not apply, write `Not applicable — [reason]`. Do not delete headings.

Agents may **draft** wording. A named process owner **accepts** every section. Drafts that cannot cite object IDs are deleted.

---

# PART A — Worked example (ACME Manufacturing, ILLUSTRATIVE)

**Document control**

| Field | Value |
|---|---|
| Title | AP — Invoice intake and match-ready (current-state) |
| SOP ID | SOP-AP-INTAKE-001 |
| Version | 0.9 draft for illustration |
| State | **Current-state** (not target-state) |
| Entity | ACME Manufacturing — fictional legal entity “ACME US” |
| Systems | ERP-A (unnamed product), Mailbox `ap-invoices@`, Capture tool C |
| Process owner (A) | Head of AP |
| Author (R) | AP Manager |
| Control review | Control owner |
| Effective | Not in force — example only |
| Object register | EXTRACT-ACME-ILLUS-01 |

---

## 1. Purpose

Describe how ACME US **today** receives supplier invoices from email, creates an ERP document or park, and decides match-ready vs exception. This SOP does not authorise an agent to post or pay.

## 2. Scope and exclusions

**In:** Domestic supplier invoices and credit notes to the AP mailbox for ACME US.  
**Out:** Employee expenses; intercompany; payment release; vendor bank changes; legal mail.

## 3. Definitions

| Term | Meaning |
|---|---|
| Match-ready | Validation complete; Agent 10 (when live) not blocking; PO invoices may proceed to match |
| STP | Posted or parked for payment with no human exception and no override (dictionary) |

## 4. Roles (cite RACI)

See RACI-AP-001. **A** = Head of AP. Agents are not Accountable.

## 5. Inputs

Mailbox; PDF/EDI; vendor master (read); PO/GR as applicable; taxonomy `03_EXCEPTION_TAXONOMY.md`.

## 6. Outputs

Case packet; ERP park or exception record; evidence_refs.

## 7. Procedure (happy path)

1. **Receive.** Processor opens mailbox. Not-an-invoice (statement, reminder) → EX-STM / park, do not key as payable.  
2. **Store.** Save source file; record hash if the store is live; else file path + timestamp (gap: hash not yet mandatory in current-state ACME).  
3. **Identify vendor and entity.** Use tax ID / name / bill-to. If two vendors possible → EX-MDM-001, do not guess.  
4. **Key or capture header/lines.** Critical fields: vendor, invoice #, dates, currency, net/tax/gross, PO if printed.  
5. **Duplicate check.** Search vendor + invoice # + amount. Suspect → EX-DUP-002; confirmed same document → EX-DUP-001; do not post.  
6. **Bank details on PDF.** If present and different from master → EX-PAY-001; **do not** change master.  
7. **Route.** PO present → match queue. Else policy: non-PO path or EX-PO-001.

## 8. Decision trees (summary)

- Invoice # blank? → EX-QLT-001.  
- Price vs PO outside **documented** tolerance? → EX-MAT-001. ACME example must not invent “2%” unless policy states it. If unquantified: `[POLICY GAP — DO NOT OPERATE A NUMBER]`.  
- GR missing? → EX-GR-001. Do not create GR without receipt evidence.

## 9. Exceptions

Use taxonomy codes only. UNMAPPED + Q-row if needed.

## 10. Controls

| Control | Owner | Evidence |
|---|---|---|
| No bank change from invoice | Master-data steward | EX-PAY-001 log |
| Duplicate search before post | Processor | Search screenshot or system log |
| SoD: keyer ≠ payment authoriser | Control owner | Access extract |

## 11. Agent interaction (current-state)

**Not applicable — no production agent.** Target-state SOP will add a dashed lane when a charter is signed.

## 12. Escalation

Aged EX-AGE-001 per buyer clock. Legal language → AP Manager, stop chase.

## 13. Records

Invoice image, ERP doc #, exception code, who overrode what.

## 14. Metrics

KPI-ACC-EXT (when QA exists), KPI-OPS-TTP, EX-DUP counts. No savings claims in the SOP.

## 15. What can go wrong / control / measure / evidence

| Wrong | Control | Measure | Evidence |
|---|---|---|---|
| Merge two PDFs | Split or EX-QLT | Split count | Case IDs |
| Invent vendor | Two-candidate rule | EX-MDM-001 | Packet |
| Follow PDF IBAN | EX-PAY-001 forced | Incidents | Hold file |

## 16. Open issues

Tolerance not quantified (object BR-17). Spreadsheet of “known duplicate formats” on a desktop — unofficial.

---

# PART B — Blank SOP

Copy from here.

```
# SOP — [title]
SOP ID:
Version:
State: Current-state / Target-state (pick one)
Legal entities:
Channels:
Systems (register IDs):
Process owner (A):
Author (R):
Control review:
Effective date:
Object register ID:
Related RACI / charter / taxonomy versions:

## 1. Purpose
[One paragraph. What this SOP does not decide.]

## 2. Scope and exclusions
In:
Out: (must include payment release, bank-change, policy exception, legal dispute unless this SOP is specifically about the human path for those)

## 3. Definitions

## 4. Roles (RACI ID)

## 5. Inputs

## 6. Outputs / packet fields if agents exist

## 7. Procedure
[Numbered. Verb + object + system. ST-IDs if available.]

## 8. Decision trees
[Leave unquantified thresholds as POLICY GAP.]

## 9. Exceptions (taxonomy codes only)

## 10. Controls (owner + evidence)

## 11. Agent interaction
Autonomy level / verbs / exclusions — or Not applicable.

## 12. Escalation

## 13. Records and retention pointer ([BUYER] policy)

## 14. Metrics (dictionary IDs only)

## 15. What can go wrong / control / measure / evidence
| Wrong | Control | Measure | Evidence |
|---|---|---|---|
| | | | |

## 16. Open issues

## Acceptance
Process owner: ________ Date:
Control owner (if controls changed): ________ Date:
```

**What to do:** Fill current-state first.  
**How:** Generator framework section order.  
**Who:** Process owner accepts.  
**Wrong:** Mixing target-state.  
**Control:** Heading completeness.  
**Measure:** Open issues count.  
**Evidence:** Versioned SOP in `/Structure/`.

Proof before permission.

---

*End of SOP_TEMPLATE.md*
