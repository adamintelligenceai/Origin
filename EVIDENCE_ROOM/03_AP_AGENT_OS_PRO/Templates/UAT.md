# Evidence Room — AP Agent OS Professional

## Template — UAT working copy

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Templates  
**Standard:** Proof before permission  
**Use with:** `../Testing/02_UAT_TEMPLATES.md` (full scenario catalogue and rules)  
**Version:** 1.0  

This is the **blank pack** a UAT lead prints or copies. Do not grant production action rights from a completed form.

---

## 1. What to do

Run named scenarios. Record Pass/Fail/Blocked. Sign exit. Accuracy defects return to Historical Test.

**How.** Forms below + scenario IDs from `02_UAT_TEMPLATES.md`.

**Who.** UAT lead (AP Manager); processors execute; Control observes human-class scripts; Head of AP signs exit.

**Wrong.** Production tenant; coaching operators into Pass.

**Control.** Entry criteria; Sev-1/2 block Go.

**Measure.** Scenarios run; defects open; fallback result.

**Evidence.** `[BUYER]/Evidence/UAT/[UAT ID]/`.

---

## 2. Header

| Field | Value |
|---|---|
| UAT ID | `UAT-` |
| Agent / charter version | |
| SOP / RACI versions | |
| Historical pack ID + decision | |
| Environment (must not be production write) | |
| Window | |
| UAT lead | |
| Accountable | |
| Participants | |
| Out of scope | |

### Entry criteria

- [ ] Historical Go or documented UI-only Hold  
- [ ] Identities have no production write  
- [ ] Fallback SOP available  
- [ ] Participants briefed  

---

## 3. Scenario results (paste IDs from 02)

| ID | Result P/F/B/NR | Case ID | Minutes | Notes |
|---|---|---|---|---|
| U-IN-01 | | | | |
| U-IN-02 | | | | |
| U-IN-03 | | | | |
| U-IN-04 | | | | |
| U-VA-01 | | | | |
| U-MA-01 | | | | |
| U-MA-02 | | | | |
| U-MA-03 | | | | |
| U-TR-01 | | | | |
| U-PO-01 | | | | |
| U-HU-01 | | | | |
| U-HU-02 | | | | |
| U-HU-03 | | | | |
| U-HU-04 | | | | |
| U-OV-01 | | | | |
| U-OV-02 | | | | |
| U-FB-01 | | | | |
| U-OR-01 | | | | |
| U-RP-01 | | | | |
| U-RP-02 | | | | |
| U-[BUYER]- | | | | |

Human-class block (U-HU-*) must be run if the agent could touch those classes.

---

## 4. Defects

| ID | Scenario | Sev | Type | Description | Owner | Status | Blocks Go? |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

---

## 5. Operator debrief (per person)

Name / role: ________  
1. Where did you look first?  
2. Missing field?  
3. Trust on a close week? Y/N — why  
4. Unofficial step you wanted?  
5. Fallback possible? Y/N  

Minutes spent: ________

---

## 6. Exit

| Planned / run / passed / failed / blocked | |
| Sev-1 open | |
| Sev-2 open | |
| Fallback | Pass / Fail |
| Hashes unchanged since Historical? | Y/N |
| Decision | Go Shadow / Hold / return to Test |
| Head of AP | Date: |
| Control owner | Date: |

Proof before permission.

---

*End of UAT.md*
