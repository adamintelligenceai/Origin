# Evidence Room — AP Agent OS Professional

## Template — Process Discovery

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Templates  
**Standard:** Proof before permission  
**Use with:** `../Process_Mapping/01_PROCESS_DISCOVERY_GUIDE.md`  
**Examples:** Fields include ACME hints — **ILLUSTRATIVE**.  
**Version:** 1.0  

Do **not** design the agent in this document. Do **not** “fix” the process on the whiteboard and call it discovery.

---

## 1. What to do

Complete the registers while observing **as-done** work. Sign coverage before Transcribe.

**How.** Fill every table. Blank = unknown, not “N/A,” unless you write why.

**Who.** Transformation / PE lead designs the plan; AP process owner grants access; observed operator works normally; IA optional observer.

**Wrong.** SOP recitation; UAT tenant; PO-only sample.

**Control.** Process owner signs coverage.

**Measure.** Invoices observed; exception types seen; systems; unofficial workarounds.

**Evidence.** `[BUYER]/Evidence/Observe/`.

---

## 2. Pre-discovery register

| Field | Buyer value |
|---|---|
| Legal entities | `[BUYER]` |
| AP locations / towers | |
| Invoice volume (last complete quarter) | |
| Channels | email / inventory portal / EDI / scan / other |
| ERP and satellites | |
| Payment runs / period | |
| Current SOP version or “none” | |
| DOA / SoD owner | |
| Observation window | |
| Recording permitted? + policy | |
| Confidential / sealed vendors | |
| First-slice candidate (allow-list draft) | |

---

## 3. Channel inventory

| Channel | Volume estimate (label ESTIMATE if needed) | Entry system | Owner | Observed? Y/N | Notes (as-done) |
|---|---|---|---|---|---|
| Email PDF | | | | | |
| Vendor portal | | | | | |
| EDI / cXML / UBL | | | | | |
| Scan / OCR batch | | | | | |
| Other | | | | | |

---

## 4. System / touch inventory

| Touch | System register ID | Role who touches | Official? Y/N | Data written | Observed invoice IDs |
|---|---|---|---|---|---|
| | | | | | |

Include Slack, desktop spreadsheets, shared drives, personal inboxes.

---

## 5. Queue inventory

| Queue name | Where it lives | Owner | Typical age | Exception codes seen | Unofficial name |
|---|---|---|---|---|---|
| | | | | | |

---

## 6. Observation log (one row per invoice or exception)

| Time | Operator | Invoice / case | Channel | Steps actually taken | Systems | Informal rule heard | SOP agree? | Photo/export ref |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | Y/N | |

**ACME hint (ILLUSTRATIVE):** Clerk pastes VAT IDs from a desktop file not in the SOP — log it; do not “correct” it away.

---

## 7. Interview pack (short)

Ask after watching, not instead of watching.

1. Show me the last item that sat more than `[BUYER]` days. What unblocked it?  
2. When do you skip a SOP step?  
3. Who do you message that is not on the RACI?  
4. What would happen if you were out for two weeks?  
5. Where do bank-detail changes actually get done?  
6. Which invoices do you never trust the capture on?  
7. What do you do at payment-proposal time that is not in the SOP?

Speaker: ________ Role: ________ Consent: ________

---

## 8. As-done vs as-written

| Topic | SOP says | Floor does | Risk (C/H/M/L) | Object ID later |
|---|---|---|---|---|
| | | | | |

---

## 9. Money-adjacent map

| Decision | Who actually does it | System | Dual control? | Agent must never |
|---|---|---|---|---|
| Payment release | | | | Execute |
| Vendor bank change | | | | Approve / write |
| Policy exception | | | | Grant |
| Legal / dispute | | | | Continue chase |

---

## 10. Coverage statement (sign)

I confirm the observation sample covered the agreed channels `[list]` and we saw exception types `[list]`. Gaps: `[list]`. This is current-state evidence, not a target design.

| Role | Name | Date |
|---|---|---|
| AP process owner | | |
| Transformation lead | | |
| Internal Audit (if present) | | |

Proof before permission.

---

*End of PROCESS_DISCOVERY.md*
