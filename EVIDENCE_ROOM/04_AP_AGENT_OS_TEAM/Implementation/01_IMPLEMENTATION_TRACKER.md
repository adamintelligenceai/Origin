# Evidence Room — AP Agent OS Team Edition

## Implementation — 01 Tracker

**Product:** Evidence Room AP Agent OS — Team Edition  
**Module:** Implementation  
**Standard:** Proof before permission  
**Use with:** `../../03_AP_AGENT_OS_PRO/Templates/IMPLEMENTATION_PLAN.md` and Roadmap Phase 0–10  
**Version:** 1.0  

The tracker is a **control on work**, not a vanity burn-down. A task is not done without an artefact ID.

---

## 1. What to do

Keep one tracker per increment. Update weekly (AP Manager / Transformation). Review in Steer only as an appendix unless a gate is due.

**How.** Registers below. Status vocabulary is closed.

**Who.** Transformation Responsible for hygiene; Head of AP Accountable for the increment; task R as named.

**Wrong.** 16 agents on one board with green bars. “Done” = meeting held.

**Control.** Done definition = artefact stored. Gate column independent of RAG.

**Measure.** Tasks Done without artefact (should be 0); Phase 5 ageing.

**Evidence.** `[BUYER]/Evidence/Team/Tracker/[Increment]/`.

---

## 2. Status vocabulary

| Status | Meaning |
|---|---|
| NS | Not started |
| WIP | In progress |
| BLOCK | Waiting on a named dependency |
| DONE | Artefact ID exists and is accepted |
| CUT | Explicitly removed (Accountable) |
| HOLD | Gate Hold — not slack |

RAG on dates is optional and **must not** override HOLD.

---

## 3. Increment header

| Field | Value |
|---|---|
| Increment ID | |
| Slice | |
| Agent / level | |
| Plan ID | |
| Accountable | |
| Tracker owner | |
| Start / planned Measure window | ILLUSTRATIVE dates |
| Caveats in force (Roadmap §4) | |

---

## 4. Master task register (copy rows)

| ID | Phase | Task | R | A | Status | Artefact ID | Due | Blocker | Notes |
|---|---|---|---|---|---|---|---|---|---|
| T-000 | 0 | Named incumbents + deputies | Transf. | HoAP | | | | | |
| T-001 | 0 | Evidence store path + access | FinSys | HoAP | | | | | |
| T-002 | 0 | Approved-tool list row | FinSys | Privacy | | | | | |
| T-003 | 1 | Observation plan | PE | Process owner | | | | | |
| T-004 | 1 | Coverage signed | PE | Process owner | | | | | |
| T-005 | 2 | Transcripts + redaction | Analyst | AP Mgr | | | | | |
| T-006 | 2 | Object register dual-reviewed | Analyst | PO + Control | | | | | |
| T-007 | 3 | Current-state SOP | PO | HoAP | | | | | |
| T-008 | 3 | RACI accepted | AP Mgr | Controller | | | | | |
| T-009 | 3 | Exception map uses taxonomy | Ex lead | AP Mgr | | | | | |
| T-010 | 4 | Charter signed L0 | AP Mgr | HoAP | | | | | |
| T-011 | 4 | RA accepted | Control | HoAP | | | | | |
| T-012 | 5 | Identity `agt.*.test` no write | FinSys | Control | | | | | |
| T-013 | 5 | Log / hash pin live | FinSys | Control | | | | | |
| T-014 | 7* | Baseline freeze | Analyst | HoAP | | | | | *KPI Phase |
| T-015 | 6 | Labels complete before run | Labellers | AP Mgr | | | | | |
| T-016 | 6 | Historical decision | AP Mgr | HoAP | | | | | |
| T-017 | — | AP team training | AP Mgr | HoAP | | | | | Before Shadow |
| T-018 | — | Owner training | Transf. | HoAP | | | | | Before charter sign if possible |
| T-019 | 7 | Shadow start access review | FinSys | Control | | | | | |
| T-020 | 7 | Shadow exit recommendation | AP Mgr | HoAP | | | | | |
| T-021 | 8 | UAT exit | UAT lead | HoAP | | | | | |
| T-022 | 8 | Rollback drill | FinSys | HoAP | | | | | |
| T-023 | 8 | Pilot charter (if earned) | AP Mgr | HoAP | | | | | |
| T-024 | 9 | Measure pack | Reporting | Controller if $ | | | | | |
| T-025 | 10 | Increment change record or Stop | AP Mgr | HoAP / CFO | | | | | |

Add buyer tasks; do not delete T-012–T-016.

---

## 5. Gate register

| Gate | Planned | Actual | Decision | Pack ID | Sign |
|---|---|---|---|---|---|
| Observe → Structure | | | | | |
| Charter | | | | | |
| Test | | | | | |
| Shadow | | | | | |
| Pilot | | | | | |
| Measure | | | | | |

---

## 6. RAID (light)

| ID | Type R/A/I/D | Description | Owner | Due | Link to RA/Incident |
|---|---|---|---|---|---|
| | | | | | |

Decisions must use Professional enums (Go/Hold/…).

---

## 7. Weekly hygiene (15 min)

1. Move DONE only with artefact IDs.  
2. Age BLOCK — if FinSys access > `[BUYER]` days, escalate to Steer unblock, do **not** skip Test.  
3. Confirm no unofficial second increment started.  
4. Language check: no “live” unless Pilot verbs are actually live.

---

## 8. What can go wrong

| Failure | Control |
|---|---|
| Green RAG, red gates | Gate register is the truth |
| Two trackers | One increment ID |
| Vendor plan replaces this | Map vendor tasks under Phase 5/6 only |

**Evidence.** Weekly export.

Proof before permission.

---

*End of 01_IMPLEMENTATION_TRACKER.md*
