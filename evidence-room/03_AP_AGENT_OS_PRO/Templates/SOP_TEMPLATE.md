# SOP template

**Product:** Evidence Room — AP Agent OS · Professional  
**Use:** Write a standard operating procedure for a *path* or an *agent-supported activity*.  
**Rule:** If the SOP is silent, the agent does not do it. Payment release is never an agent step.

Part A is blank. Part B is a completed example for Northline Industrials (fictional).

Related: `Process_Mapping/SOP_GENERATOR_FRAMEWORK.md`.

---

## Part A — Blank SOP

### Document header

| Field | Entry |
|---|---|
| SOP ID | |
| Title | |
| Path / agent | |
| Entity / plant | |
| Version | |
| Effective date | |
| Owner (Accountable human) | |
| Backup | |
| Review date | |
| Related charters | |
| Related codes | |

### 1. Purpose

One paragraph. State the work object and the human hold.

### 2. Scope

**In:**  
**Out:**  

### 3. Definitions

| Term | Meaning |
|---|---|

### 4. Roles

| Role | R / A / C / I | Notes |
|---|---|---|
| | | Agents never hold A |

### 5. Trigger

What starts the procedure (inbound file, code set, run calendar).

### 6. Procedure

Numbered steps. For each step: actor (human or agent ID), action, evidence produced, exit criteria, exception if fail.

| Step | Actor | Action | Evidence | Exit | If fail |
|---|---|---|---|---|---|
| 1 | | | | | |

### 7. Autonomy

| Agent | Level in force | Promotion reference |
|---|---|---|

### 8. Evidence pack contents

List the minimum packet. Incomplete packets do not travel.

### 9. Controls

Payment, bank, DOA, sampling, language.

### 10. Records and retention

Where packets live; retention per organisational policy (do not invent a legal period).

### 11. Exceptions and escalation

| Condition | Who | Clock |
|---|---|---|

### 12. Change control

Prompt, tolerance, and code changes require [ticket type].

### 13. References

Charters, maps, decision trees, KPI definitions.

### Sign-off

| Role | Name | Date |
|---|---|---|
| Owner | | |
| Controls | | |
| Process Owner | | |

---

## Part B — Example SOP (Northline Industrials — fictional)

**SOP-NIL-MATCH-01** · 3-way match — US-OH inventory PO invoices  
**Version** 1.0 · Effective 7 April 2026 (illustrative)  
**Owner:** Jordan Hale, AP Match Lead · **Backup:** Exception Desk Lead  
**Charter:** Agent 03 Matching L1 · Agent 10 L0 · Agent 16 L1

### 1. Purpose

Apply the signed 3-way match tree to in-scope Dayton inventory invoices and produce an inspectable worksheet or a coded break. The agent recommends. A human accepts or rejects. Posting is a separate human (or later, a gated L3 class — not in this SOP). Payment is not in this SOP.

### 2. Scope

**In:** Company 1000; inventory PO; header ≤ $50,000; 3-way; no open Agent 10 flag.  
**Out:** Services, intercompany, CA/MX, first invoice from a vendor, header > $50,000, any open flag.

### 3. Definitions

| Term | Meaning |
|---|---|
| Worksheet | Line-level comparison of invoice, PO, GR with tolerances applied |
| Open flag | Uncleared EX-DUP or EX-ANM on the object |

### 4. Roles

| Role | R/A/C/I |
|---|---|
| Agent 03 | R (recommend) |
| Match specialist | R (accept/edit/reject); A on the accept |
| AP Match Lead | A for the SOP |
| Agent 10 / Controls | C on flags; A on clearance |
| Poster | R on post after accept — human |
| Process Owner | I; A on charter changes |

### 5. Trigger

Object status `ready` from Validation and no open flag.

### 6. Procedure

| Step | Actor | Action | Evidence | Exit | If fail |
|---|---|---|---|---|---|
| 1 | 16 | Confirm in-scope | Object fields | In / `OUT_OF_SCOPE` | Stop |
| 2 | 10 | Shadow flag check | Flag or quiet | Quiet / `ANOMALY_HOLD` | Specialist does not match; Controls owns |
| 3 | 03 | Apply 3-way + tolerance table | Worksheet | `RECOMMEND_MATCH` or `BREAK` | Code EX-MGR/PRM/QTM/UOM/POE… |
| 4 | Specialist | Accept / edit / reject | Log | Accepted / edited / rejected | Reject → 04 triage if still a break |
| 5 | Poster | Post if accepted and policy allows | ERP document | Posted | Do not post on a recommendation alone if specialist absent |
| 6 | 16 | Close or park | Status + URI | `ready` / parked | — |

### 7. Autonomy

Agent 03 at L1. No posting by the agent. Promotion requires `AUTONOMY_PROGRESSION.md`.

### 8. Evidence pack

Source image; extract; PO number; GR numbers; worksheet; accept log; flag outcome if any.

### 9. Controls

Tolerance table read-only. Dummy GR forbidden. Language: no “fraud,” no “approved for payment.”

### 10. Records

Worksheets in the Orchestrator URI store; ERP remains accounting SoR. Retention follows Northline finance records schedule (not stated here).

### 11. Escalation

Material disagreement > 8% in a weekly sample → Match Lead + Process Owner; L1 may be paused.

### 12. Change control

Tree or prompt change = change ticket; restart sample clock for that class.

### Sign-off (illustrative)

Jordan Hale (owner), Elena Ruiz (Controls), Marcus Chen (Process Owner) — 7 April 2026 (fictional).

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | SOP template + Northline example |
| Status | Edition 1.0.0 |
