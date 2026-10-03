# Implementation roadmap — Phases 0–10

**Product:** Evidence Room — AP Agent OS · Professional  
**Audience:** Implementation lead, AP Process Owner, steering group  
**Use:** Sequence the layer.  
**Not:** A fixed-price delivery plan or a promise that a phase produces savings.

Durations are illustrations. Staffing, ERP change freezes, and close calendars will stretch them. That is normal.

---

## Phase catalogue

| Phase | Name | Intent | Typical window (illustration) | Exit evidence |
|---|---|---|---|---|
| 0 | Orient | Band, holds, owners | 1 week | Diagnostic pack; veto list |
| 1 | Map | One path, codes, RACI | 1–2 weeks | Signed map |
| 2 | Charter | Wave 1 JDs | 1 week | Six signed charters |
| 3 | Instrument | Work objects, register, access | 1–2 weeks | Orchestrator fields live (even in a sheet) |
| 4 | Shadow | L0 on the path | 2 weeks minimum | Coverage + sample + language |
| 5 | Recommend | L1 on named objects | 3–6 weeks | Accept/edit/reject log |
| 6 | Govern | Cadence + Audit observer | Overlaps 4–5 | Day-30 pack |
| 7 | Wave 2 | Packets (05, 07, 08, 12) | 2–4 weeks to charter + shadow | Fit tests passed |
| 8 | Measure | Scorecard locked | Ongoing from phase 4 | Definitions unchanged mid-window |
| 9 | Recertify | Promote / hold / demote | Day 90 and quarterly | Register entries |
| 10 | Extend | New entity or Wave 3 | After first recertification | New L0 clock |

Phase 10 is not “scale autonomy.” It is *more objects under the same rules*.

---

## Phase notes

### 0 — Orient

Complete the free diagnostic if not already done. Reconstruct one payment run. List informal helpers. Write the payment sentence into the steering pack.

**Caveat.** A vendor workshop is not Phase 0.

### 1 — Map

Use `Process_Mapping/` and `Templates/PROCESS_DISCOVERY.md`. Walk five invoices. Freeze the code list.

**Caveat.** Mapping “all AP globally” in Phase 1 is how Wave 1 never starts.

### 2 — Charter

`AGENT_CHARTER_TEMPLATE.md` plus Starter JDs if you have them. Narrow object types until sampling is possible.

**Caveat.** An unsigned charter is a slide.

### 3 — Instrument

Stand work objects. Service accounts. Prompt wrapper under change control. Cost ledger.

**Caveat.** A shared specialist login fails Phase 3 even if the model is impressive.

### 4 — Shadow

`Testing/SHADOW_MODE_METHODOLOGY.md`. Operators work as today.

**Caveat.** If anyone parks because the shadow said so, you have informally gone L1. Reset the clock.

### 5 — Recommend

Human accept/edit/reject mandatory. Agent 10 stays L0 unless a separate case exists.

**Caveat.** Reject rate is information. Do not tune the model to drive rejects to zero by agreeing with every operator habit.

### 6 — Govern

Weekly exception mix. Day-30 Audit observer. Language incidents.

**Caveat.** Audit operates nothing.

### 7 — Wave 2

Open 05/07/08 only with a coded mix. Open 12 only if payment hold is *used*. Agent 12 ≤ L2 annotate.

**Caveat.** Discount expiry is not a release criterion.

### 8 — Measure

Lock `KPI_and_Measurement/` definitions before the window. No savings tile unless Finance has a validation method (`KPI_FRAMEWORK.md` § on validated financial savings).

### 9 — Recertify

`AUTONOMY_PROGRESSION.md`. Declined promotions are success. Overdue recertification is automatic demotion.

### 10 — Extend

New company code = new object class = new L0. Wave 3 agents use their specs; do not clone Matching’s charter onto Close.

---

## 4–6 week one-agent illustration (Matching, L0 → L1)

This is a **teaching calendar**, not a commitment that Matching will be L1 on day 28, and not a claim that invoices will post faster.

**Assumptions that often fail:** owner has hours; one entity; extract already usable; no close week in the middle; no ERP release; informal copilot is actually turned off.

| Week | Days | Work | Exit |
|---|---|---|---|
| 0 | 1–3 | Path map; charter draft; sample design (n=100 or 10%) | Draft JD |
| 1 | 5 | Sign charter; instrument worksheets; L0 starts | First coverage report |
| 2 | 5 | L0 continues; dual-review disagreements | Disagreement log |
| 3 | 5 | Fix codes / out-of-scope leaks; **do not** promote if leaks exist | Leak list empty or dated |
| 4 | 5 | If gates G0.1–G0.8 can be argued, open L1 case; else extend L0 | Case or extension |
| 5–6 | 5–10 | L1 if approved: accept/edit/reject; weekly review | Log exists |

**Hard stops inside the illustration.** Open Agent 10 flag on a document → no match-recommend. Header above the charter cap → human. ERP downtime → pause the clock; do not skip samples to “catch up.”

**What this illustration does not include.** Posting by the agent. Payment. Other entities. Wave 2. A savings checkpoint at week 6.

Northline (fictional): Matching commissioned L1 on 7 April 2026 after a shadow that slipped a week for Birmingham GR latency — the slip is the lesson.

---

## Dependencies

```
Phase 0 ─┬─► 1 ─► 2 ─► 3 ─► 4 ─┬─► 5 ─► 9
         │                     │
         └─► informal helper list also feeds 3
                               │
                          6 overlaps 4–5
                               │
                    7 only after 5 is stable
                               │
                          8 from 4 onward
                               │
                              10 after 9
```

---

## Resource sketch (illustration)

| Role | Phase 0–3 | Phase 4–6 | Phase 7–10 |
|---|---|---|---|
| Practitioner / transformation | Heavy | Medium | Medium |
| AP Process Owner | Medium | Heavy | Heavy |
| Controls Lead | Medium | Heavy (flags) | Medium |
| Match / Ops leads | Medium | Heavy | Medium |
| Treasury | Light (holds) | Light | Medium if Agent 12 |
| Internal Audit | Light | Observer | Observer |
| IT / IAM | Medium (access) | Light | Medium on extend |

Hours are not specified as a promise. If the Process Owner cannot give Phase 4 a daily fifteen minutes, do not start Phase 4.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Implementation roadmap Phases 0–10 |
| Status | Edition 1.0.0 |
| Related | `NINETY_DAY_PLAN.md`, Testing/, Autonomy progression |
