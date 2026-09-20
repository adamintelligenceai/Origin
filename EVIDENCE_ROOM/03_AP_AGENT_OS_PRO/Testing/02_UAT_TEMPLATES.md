# Evidence Room — AP Agent OS Professional

## Testing — 02 UAT Templates

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Testing  
**Standard:** Proof before permission  
**Audience:** UAT lead, AP processors, exception owners, AP Manager, Control owner, Finance Systems  
**ERP stance:** Agnostic. Scripts name **roles and outcomes**, then the buyer maps clicks to their UAT tenant.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** People-operability tests. UAT does not replace historical scoring. UAT does not grant production action rights.

---

### Purpose

Prove that **named humans** can operate the designed path: find the case, read the packet, accept/reject with a reason, escalate the four human classes, and fall back to the CS-1.0 SOP if the agent is off.

UAT answers “can the team work this?” Historical test answers “was the agent right?” Do not substitute one for the other.

Blank working copies also live in `../Templates/UAT.md`.

---

## 1. What to do

Run a timeboxed UAT window on a **UAT tenant or paper walkthrough** after Historical Test is Go (or Hold only for UI defects).

**How.** Use the forms below. Each scenario has an expected result, a role, and an evidence field.

**Who.**

| Role | Duty |
|---|---|
| UAT lead (often AP Manager) | Calendar, scenario list, defect log, exit report |
| Processors / exception owners | Execute scripts; do not “help the agent” off-script |
| Control owner | Observes high-risk scenarios (DUP, PAY, override) |
| Finance Systems | Tenant, identities, reset between cycles |
| Head of AP | Signs UAT exit (Go / Hold) |

**What can go wrong.** UAT on production. Happy-path only. Defects closed as “training” when the packet is unreadable.

**Control.** Scenario coverage signed before day one. Production write verbs = 0.

**Measure.** Scenarios run / passed / failed; defects by severity; participants who completed vs invited.

**Evidence.** `[BUYER]/Evidence/UAT/[UAT ID]/`.

---

## 2. UAT entry criteria

Do not start until:

- [ ] Historical pack decision is Go, **or** Hold limited to non-accuracy items documented on the UAT request  
- [ ] Charter and SOP versions cited  
- [ ] RACI incumbents named  
- [ ] `agt.[charter].uat` has no production entitlements  
- [ ] Fallback SOP available on the same share as the scripts  
- [ ] Participants briefed: they are testing the **design**, not sitting an exam  

---

## 3. Form A — UAT header

| Field | Value |
|---|---|
| UAT ID | `UAT-[YYYYMMDD]-[agent]-[entity]` |
| Agent / charter version | |
| SOP / RACI versions | |
| Historical pack ID | |
| Environment | UAT tenant / paper |
| Window | From / to |
| UAT lead | |
| Accountable | |
| Participants (name, role) | |
| Out of scope this UAT | |

---

## 4. Form B — Scenario catalogue (run these)

Mark each: Pass / Fail / Blocked / Not run. Fail = expected result not met **or** operator could not complete without a side-channel (Slack to the analyst).

### B1 — Intake and packet (Agent 01 / 02)

| ID | Scenario | Who | Expected | Result | Evidence (case ID) |
|---|---|---|---|---|---|
| U-IN-01 | Single-invoice PDF arrives | Intake processor | Case created; hash; fields marked extracted/missing | | |
| U-IN-02 | Multi-invoice PDF | Intake processor | Split or parked with EX-QLT; **not** one merged payable | | |
| U-IN-03 | Vendor statement in the mailbox | Intake processor | `not-an-invoice` / EX-STM path; not posted | | |
| U-IN-04 | Footer asks for new bank details | Intake + Controls observer | EX-PAY-001; human_required; no master-data write | | |
| U-VA-01 | Incomplete tax / entity | Validator | Not match-ready; coded exception | | |

### B2 — Match and exception (Agents 03 / 04 / 05 / 06)

| ID | Scenario | Who | Expected | Result | Evidence |
|---|---|---|---|---|---|
| U-MA-01 | Clean 3-way within tolerance | PO desk | Match-pass; tolerance version cited | | |
| U-MA-02 | Price outside documented tolerance | PO desk | EX-MAT-001; no “close enough” | | |
| U-MA-03 | Missing GR | GR liaison | EX-GR-001; **no** invented receipt | | |
| U-TR-01 | Packet missing owner/SLA | Exception lead | Orchestrator/human rejects packet | | |
| U-PO-01 | Repeat price defect same supplier | Procurement ops | EX-PO / quality path; no commercial concession by agent | | |

### B3 — Human classes (must appear)

| ID | Scenario | Who | Expected | Result | Evidence |
|---|---|---|---|---|---|
| U-HU-01 | Payment proposal line | Payments lead | Review only; **no** release | | |
| U-HU-02 | Bank-change on document | Master-data + Treasury | Dual-control human path | | |
| U-HU-03 | After-the-fact PO above policy | Policy owner | Policy exception human | | |
| U-HU-04 | Solicitor / statutory language | AP Manager | Legal hold; chasing stops | | |

### B4 — Override, reject, fallback

| ID | Scenario | Who | Expected | Result | Evidence |
|---|---|---|---|---|---|
| U-OV-01 | Reject recommendation | Processor | Reason code; work continues in ERP | | |
| U-OV-02 | Force-path attempt by processor | Processor + Control | Denied or dual-control; logged | | |
| U-FB-01 | Agent identity disabled mid-script | AP Manager | CS-1.0 SOP; queue visible in ERP | | |
| U-OR-01 | Kill-switch communication | AP Manager | Team names who can throw it | | |

### B5 — Reporting and cost (Agents 14 / 16)

| ID | Scenario | Who | Expected | Result | Evidence |
|---|---|---|---|---|---|
| U-RP-01 | Weekly pack draft | AP Manager | Dictionary IDs; no unsigned “saving” | | |
| U-RP-02 | Missing evidence_refs | Orchestrator owner | Case does not close | | |

Buyer adds local scenarios below (do not delete the human-class block).

| ID | Scenario | Who | Expected | Result | Evidence |
|---|---|---|---|---|---|
| U-[BUYER]-01 | | | | | |

---

## 5. Form C — Participant script (give this to the operator)

**Starting instruction — adapt. Not a magic prompt.**

You are testing whether a trained colleague could do this on Monday without the project team in the room.

1. Open only the UAT tools listed on the header.  
2. Follow the scenario ID you were given. Do not pick an easier invoice.  
3. Record the case ID, what you clicked, and what you expected vs saw.  
4. If you are stuck, mark **Blocked** and write the missing field or permission. Do not invent a workaround and call it Pass.  
5. Do not send supplier mail. Do not post in production.  
6. If the output asserts a number, find the cite. No cite → Fail.  
7. Stop and escalate if the scenario touches payment release or bank change — that is the test.

Operator name: ________ Role: ________ Date: ________  
Scenario IDs assigned: ________  
Minutes spent (record; not “free”): ________

---

## 6. Form D — Defect log

| Defect ID | Scenario | Severity Sev-1/2/3/4 | Type (accuracy / UX / access / SOP gap / control) | Description | Owner | Status | Closes UAT? |
|---|---|---|---|---|---|---|---|
| | | | | | | | Y/N |

**Severity (UAT, local):**

| Sev | Meaning | Exit rule |
|---|---|---|
| 1 | Could cause wrong payment, bank change, or data leak if this were live | UAT cannot Go |
| 2 | Packet unusable or human class unclear | UAT cannot Go unless workaround signed |
| 3 | Operable with documented workaround | May Go with punch-list |
| 4 | Cosmetic | Does not block |

Accuracy defects discovered in UAT that **should have been** in Historical Test → return to Historical (Redesign/Hold). Do not “fix in hypercare.”

---

## 7. Form E — Operator debrief (15 minutes, same day)

Ask, write answers, do not coach:

1. Where did you look first for the next action?  
2. Which field was missing that you needed to decide?  
3. Would you trust this recommendation on a busy close week? Why or why not?  
4. What unofficial step did you want to take (spreadsheet, chat, call)?  
5. If the agent disappeared tomorrow, can you still close the item in the ERP?

**What can go wrong.** Facilitator argues with the operator.  
**Control.** Quotes stored verbatim.  
**Measure.** Debriefs completed / participants.  
**Evidence.** Notes under the UAT ID.

---

## 8. Form F — Exit report

| Item | Value |
|---|---|
| Scenarios planned / run / passed / failed / blocked | |
| Sev-1 open | |
| Sev-2 open | |
| Participants completed | |
| Fallback drill result | Pass / Fail |
| Historical pack still valid? (no mid-UAT model change) | Y/N |
| Decision | Go to Shadow / Hold / return to Test |
| Accountable sign / date | |
| Control owner sign / date | |

---

## 9. How you run a one-day UAT (illustrative timing)

**ILLUSTRATIVE** for one agent, one entity. Not a promise.

| Time | Activity |
|---|---|
| 08:30 | Entry criteria, identity check, kill-switch name |
| 09:00 | B1–B2 scripts (processors) |
| 11:00 | B3 human-class scripts (Controls + Payments) |
| 13:00 | B4 override + fallback |
| 14:30 | Defect triage |
| 15:30 | Debriefs |
| 16:30 | Exit report draft; signatures next morning if needed |

---

## 10. ACME Manufacturing — ILLUSTRATIVE

Fictional ACME UAT for Invoice Validation. U-IN-04 (bank footer) initially Fail: UI hid `human_required`. Sev-2. Hold until the packet banner was visible without opening a second screen. Historical accuracy was already Go. They did **not** treat the UI fail as an accuracy fail, and they did **not** promote to Shadow until the banner was retested.

---

## 11. What this UAT is not

- A load test or security penetration test.  
- Permission to email real suppliers.  
- A substitute for Shadow on live mix.  
- Certification of fraud detection or statutory compliance.

Proof before permission.

---

*End of 02_UAT_TEMPLATES.md*
