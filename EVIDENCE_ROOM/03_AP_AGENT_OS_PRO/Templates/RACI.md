# Evidence Room — AP Agent OS Professional

## Template — RACI

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Templates  
**Standard:** Proof before permission  
**Use with:** `../Process_Mapping/04_RACI_STANDARD.md`  
**Version:** 1.0  

**Rules.** One **A** per activity. **A** is a named human role. Agents may be **R** or **I** only, never **A**. Two Accountables = invalid. None = invalid.

---

## 1. What to do

Publish an **AP operating RACI** (humans) and an **agent-task RACI** that share the activity list. Version with the SOP.

**How.** Assign A first, then R, then C/I. Translate local titles in the table below.

**Who.** AP Manager drafts; Finance Controller accepts operating A’s; Head of AP accepts day-to-day rows.

**Wrong.** “AP team” as a role; agent as A; mailbox as A.

**Control.** Standard 04 construction rules; quarterly incumbency.

**Measure.** Conflicts; blank A; agent-as-A count (must be 0).

**Evidence.** Versioned RACI in `/Structure/`.

---

## 2. Translation table

| Standard role | Local title | Named incumbent | Deputy | Review date |
|---|---|---|---|---|
| Head of AP / Shared Services AP lead | `[BUYER]` | | | |
| Financial Controller | | | | |
| CFO / Finance Director | | | | |
| AP Manager | | | | |
| AP Processor | | | | |
| Exception owner (per family) | | | | |
| Payment preparer | | | | |
| Payment authoriser | | | | |
| Procurement / Buyer | | | | |
| Goods-receipt owner | | | | |
| Master-data steward | | | | |
| Tax owner | | | | |
| Treasury | | | | |
| Control / Risk owner | | | | |
| Finance Systems / IT | | | | |
| Internal Audit | | | | |
| Privacy / DPO | | | | |
| Agent: [charter] | system identity | n/a | n/a | |

---

## 3. Operating RACI (humans) — fill letters

Activities are examples. Replace with the signed process-pack list.

| Activity | Head of AP | Controller | AP Mgr | Processor | Ex. owner | Pay prep | Pay auth | Buyer | GR | MDM | Control | FinSys | IA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Invoice intake | A | I | R | R | C | I | I | I | I | C | C | C | I |
| Validation / coding | A | C | R | R | C | | | C | | C | C | I | I |
| Matching | A | I | R | R | C | | | C | C | | C | I | I |
| Exception disposition | A | C | R | C | A* | | | C | C | C | C | I | I |
| Approval packet (not approve) | A | C | R | R | | | | C | | | C | I | I |
| DOA approval | I | A | C | | | | | C | | | C | I | I |
| Payment proposal | C | I | R | C | C | R | I | | | | C | I | I |
| Payment release | I | C | I | | | C | **A/R** | | | | C | I | I |
| Vendor bank change | I | C | I | | | | C | | | R (request ≠ approve) | A | C | I |
| Agent charter accept | A | C | R | I | C | I | I | I | I | I | C | C | I |
| Historical test go/no-go | A | C | R | C | C | I | I | I | I | I | C | C | I |
| Shadow start/stop | A | I | R | I | C | I | I | I | I | I | C | C | I |
| Pilot accept | A | C | R | I | C | C | I | I | I | I | C | C | I |
| Financial KPI sign | I | **A** | R | | | | | | | | C | C | I |
| Autonomy +1 | A** | C | R | I | C | I | I | I | I | I | C | C | I |
| Kill-switch | A | I | R | I | I | I | I | I | I | I | R | R | I |
| Incident Sev-1 | A | C | R | I | C | C | C | I | I | C | C | R | I |

\*Exception owner is **A** for *disposition quality of that family*; Head of AP remains A for the operating model. If that creates two A’s on one row, split the activity.  
\**CFO/FD is A for L3+ / payment-adjacent per autonomy policy — add a column if needed.

Cells left blank are intentional (not in the activity). Do not fill every cell.

---

## 4. Agent-task RACI (excerpt)

| Activity | Human A | Human R | Agent R allowed? | Agent A? |
|---|---|---|---|---|
| Extract fields | Head of AP | Processor / Intake lead | Yes at approved level | **Never** |
| Deterministic match | Head of AP | PO desk | Agent may run the **rule**, owner is human | Never |
| Duplicate flag | Head of AP | Controls analyst | Yes | Never |
| Supplier email send | Head of AP | Vendor desk | Only if L3 verb listed | Never |
| Payment release | Payment authoriser | Payment authoriser | **No** | Never |
| Bank-change approve | Treasury / Controller per policy | Named approver ≠ requester | **No** | Never |

---

## 5. SoD pairs (confirm locally)

| Duty A | Duty B | Same person allowed? |
|---|---|---|
| Invoice capture / entry | Payment authorisation | No |
| Vendor create | Payment authorisation | No |
| Vendor bank change | Payment authorisation | No |
| Exception close above cap | Created the invoice | No |
| Agent entitlement grant | Measure accept | No |

---

## 6. Acceptance

RACI ID: ________ Version: ________ SOP version cited: ________  
Controller: ________ Date: ________  
Head of AP: ________ Date: ________  

Invalid if: two A’s on one activity; agent as A; blank A.

Proof before permission.

---

*End of RACI.md*
