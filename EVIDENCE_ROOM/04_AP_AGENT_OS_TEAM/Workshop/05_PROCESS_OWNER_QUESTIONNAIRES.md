# Evidence Room — AP Agent OS Team Edition

## Workshop — 05 Process-owner questionnaires

**Product:** Evidence Room AP Agent OS — Team Edition  
**Module:** Workshop  
**Standard:** Proof before permission  
**Audience:** Recipients listed per questionnaire; Transformation compiles  
**Version:** 1.0  

Send **5–8 working days** before the workshop. Incomplete questionnaires are still useful — blanks become E1 ASSUMPTIONS.

Do not design agents from a questionnaire alone.

---

## 1. What to do

Issue the relevant questionnaire. Compile a one-page gap matrix (answered / blank / conflict).

**How.** Forms Q-AP through Q-SYS. One owner per form.

**Who.** Named process owners. Transformation chases. Managers must not complete the processor form on the processor’s behalf.

**Wrong.** A single “business” form answered by PMO.

**Control.** Conflicts between Q-AP and Q-PRC (processor) are agenda items, not errors to hide.

**Measure.** Return rate; conflict count.

**Evidence.** `[BUYER]/Evidence/Team/Questionnaires/`.

---

## 2. Common header (every form)

```
Questionnaire ID:
Role / name / deputy:
Legal entities you own or serve:
Systems you use daily:
SOP you believe is in force (ID/date or “none”):
Date / time to complete (30–40 min):
I confirm answers are as-done, not target-state: Y/N
```

---

## 3. Q-AP — Head of AP / AP Manager

1. Invoice volume last two complete quarters (by entity if known). Source:  
2. Channels in use and any you formally “don’t do” but still receive.  
3. Top 10 exception reasons as **used on the floor** (map later to EX-*).  
4. Payment frequency and who authorises.  
5. Current automation (capture, workflow, rules, BPO). Evidence of performance?  
6. Known unofficial files (spreadsheets, shared mailboxes).  
7. DOA / SoD last review date.  
8. What you refuse to put in a first slice.  
9. Night/weekend work and overtime pattern (for later mechanism notes).  
10. Prior incidents: duplicate payment, wrong vendor, bank-detail event (facts only).  

**What can go wrong.** Volume from memory.  
**Control.** Ask for extract ID.  
**Measure.** Extract vs memory delta.

---

## 4. Q-PRC — Processor / exception owner

Answer in your words.

1. How does an invoice **actually** arrive on your desk?  
2. List the systems you touch for a messy PO invoice, in order.  
3. When do you ignore the SOP?  
4. Who do you contact that is not in the documented RACI?  
5. Duplicate check: where, what keys, what do you do if unsure?  
6. Bank details on a PDF: what do you do **today**?  
7. Missing GR: who, how, how often do you chase, do you ever receipt it yourself?  
8. What would you never let a tool do?  
9. Which metric already changes your behaviour (and how)?  
10. Training: last SOP walkthrough date.

**Control.** Manager not ghost-writing.  
**Measure.** Side-system count.

---

## 5. Q-CTL — Control / Risk

1. Open AP-related findings.  
2. Live SoD exceptions (count + types).  
3. Evidence you would require before Shadow.  
4. Retention and log-integrity concerns.  
5. Any prohibited vendors/tools.  
6. Incident classification owner.

---

## 6. Q-FIN — Controller / FP&A

1. Does an AP cost-per-invoice model exist? Version? Components?  
2. Loaded rate convention and productive hours.  
3. Policy on hours-to-money.  
4. Early-pay discounts: tracked as taken vs opportunity?  
5. Late fees: actually paid last year?  
6. Who may sign KPI-FIN-SAV.

---

## 7. Q-SYS — Finance Systems

1. ERP + capture + workflow + archive + IdP.  
2. Lead time for a least-privilege service identity.  
3. Can entitlements be scoped by company code / channel / amount?  
4. Where prompts or models could be edited today (and by whom).  
5. Logging: what is immutable-enough.  
6. Change freeze windows.  
7. Known shadow tools in AP.

---

## 8. Q-PRCURE — Procurement / GR

1. PO-required policy location.  
2. Documented price/qty tolerances — or gap.  
3. After-the-fact PO volume (ESTIMATE if needed).  
4. GR creators and plants in scope.  
5. Appetite for template chasers.

---

## 9. Q-PAY — Treasury / payment authoriser

1. Release procedure (dual control?).  
2. Bank-change procedure (requester ≠ approver?).  
3. Proposal review time and pain.  
4. Confirmation: agent must not release.  
5. Positive-pay / bank-file systems (names only).

---

## 10. Q-PRI — Privacy

1. Lawful basis record for AP processing (pointer).  
2. Cross-border model constraint.  
3. Redaction rules for workshops.  
4. Training-data prohibition (default yes — confirm).

---

## 11. Compile matrix

| Question theme | Q-AP | Q-PRC | Conflict? | Workshop exercise |
|---|---|---|---|---|
| Volume | | | | E1 |
| Unofficial files | | | | E2 |
| Bank path | | | | E5 |
| Tolerances | | | | E4 |
| Identity lead time | | | | E8 |
| CPI exists | | | | E7 |

---

## 12. What can go wrong

| Failure | Control |
|---|---|
| Forms returned as target-state | Header attestation |
| One person fills all | Reject Q-PRC if from manager email without processor name |

**Evidence.** Raw returns + matrix.

Proof before permission.

---

*End of 05_PROCESS_OWNER_QUESTIONNAIRES.md*
