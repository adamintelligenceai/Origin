# Process Mapping Methodology — 10 Steps

**Evidence Room · AP Agent OS Professional**  
**Purpose:** Observe the real AP process, design agent insertion points, and expand responsibility only when evidence supports it.

---

## Overview

| # | Step | Output |
|---|------|--------|
| 1 | Observe | Observation log + volume sample |
| 2 | Bound | Scope statement (in / out) |
| 3 | Inventory | Systems, data products, handoffs |
| 4 | Swimlane | As-is process map |
| 5 | Friction | Pain / risk / waste register |
| 6 | Taxonomy | Exception classes mapped to volumes |
| 7 | Agent fit | Candidate agents + level 0–1 plan |
| 8 | To-be | Target flow with human gates |
| 9 | Evidence | Control & measurement points |
| 10 | Expand | Promotion criteria to higher levels |

Do not jump to Level 2+ designs before steps 1–9 produce evidence.

---

## Step 1 — Observe

**Goal:** See actual work, not the SOP fantasy.

**Actions**
1. Shadow 3–5 processors for one full day or equivalent case volume.
2. Sample 50–100 recent invoices across PO, non-PO, credit, utility, and intercompany if material.
3. Capture time stamps: received → coded → matched → approved → ready-to-pay.
4. Note every tool switch, spreadsheet, email, and tribal rule.

**Template — Observation log**

| Case ID | Type | Touchpoints | Wait owners | Minutes touch | Minutes wait | Notes / workarounds |
|---------|------|-------------|-------------|---------------|--------------|---------------------|
| | | | | | | |

**Exit:** Observation log + honest statement of where time actually goes.

---

## Step 2 — Bound the scope

**Goal:** Prevent “boil the ocean” agent programmes.

**In-scope examples:** Domestic PO invoices for BU X; email PDF intake for vendor class Y.  
**Out-of-scope examples:** Payment release; tax determination redesign; master-data MDM programme; AR.

**Template — Scope statement**

```
Programme: ____________________
Invoice classes IN: ___________
Invoice classes OUT: __________
ERPs / tools IN: ______________
BUs / entities IN: ____________
Decision rights owner: ________
Non-goals: ____________________
Success metrics (≤3): _________
```

**Exit:** Signed scope (Controller or Head of AP).

---

## Step 3 — Inventory systems and data

**Goal:** Know what agents can read/write and under what identity.

| System | Role in AP | Read path | Write path | Owner | Agent-ready? |
|--------|------------|-----------|------------|-------|--------------|
| ERP AP module | System of record | | | | |
| Invoice capture / OCR | Intake | | | | |
| Email / shared mailbox | Intake | | | | |
| Procurement / PO | Match source | | | | |
| GR / WMS | Match source | | | | |
| Bank / payment run | Payment | | Human only | | N for agent auth |
| Shared drives / Excel | Shadow processes | | | | |

**Exit:** Data-product list suitable for least-privilege agent identities.

---

## Step 4 — Swimlane the as-is

**Goal:** One page that a CFO can follow.

Lanes typically: Supplier · Buyer / requester · AP processor · Approver · Procurement · Warehouse · Controller.

For each major stage (Intake, Validate, Match, Exception, Approve, Pay-prep, Close) mark:
- Trigger
- Decision
- System of record update
- Evidence retained

**Exit:** As-is swimlane (diagram or table) reviewed with AP Manager.

---

## Step 5 — Friction register

Classify every friction item:

| ID | Friction | Type (time / rework / risk / morale) | Volume/mo | Severity 1–5 | Root hint |
|----|----------|--------------------------------------|-----------|--------------|-----------|
| F01 | | | | | |

Prioritise by **volume × severity**, not loudest anecdote.

**Exit:** Top 10 friction items ranked.

---

## Step 6 — Exception taxonomy mapping

Map live exceptions to Evidence Room taxonomy (`Agent_Library/18_EXCEPTION_TAXONOMY.md`).

| Taxonomy code | Description | Count (sample) | % | Median age (days) | Current owner |
|---------------|-------------|----------------|---|-------------------|---------------|
| | | | | | |

**Exit:** Volume-weighted taxonomy; identifies first specialist agents.

---

## Step 7 — Agent fit (Level 0–1)

For each top friction / exception class, propose an agent from the library.

| Friction / exception | Candidate agent | Proposed start level | Human gate | Risk if over-autonomous |
|----------------------|-----------------|----------------------|------------|-------------------------|
| | | 0 Observe / 1 Assist | | |

**Rule:** Start at Level 0 or 1 unless a mature control environment already exists and charter explicitly allows Level 2.

**Exit:** 1–2 pilot agents selected with charters drafted.

---

## Step 8 — Design the to-be flow

Redraw the swimlane with:
- Agent lanes (dashed until promoted)
- Hard human gates (especially payment authorisation)
- Escalation paths
- Evidence stores

**Template — Human gate checklist**

- [ ] Payment authorisation human-only
- [ ] Bank detail changes human-only (or dual control)
- [ ] Novel vendor / high-value thresholds defined
- [ ] Model/prompt version recorded on material outputs

**Exit:** To-be map approved by Control / Internal Audit liaison if available.

---

## Step 9 — Evidence and measurement points

At each material stage define:

| Stage | Evidence artifact | KPI class | Owner |
|-------|-------------------|-----------|-------|
| Intake | Intake log + confidence | Activity + Risk | |
| Match | Match result + rule ID | Operational | |
| Exception | Taxonomy code + SLA clock | Operational + Risk | |
| Payment prep | Proposal pack (no auth) | Operational | |
| Close | Evidence pack | Risk | |

Link to `KPI_Measurement/00_KPI_FRAMEWORK.md` and `Controls/00_CONTROL_FRAMEWORK.md`.

**Exit:** Measurement plan ready before shadow mode.

---

## Step 10 — Expand responsibility

Promotion is earned, not assumed.

| From → To | Minimum evidence | Approver |
|-----------|------------------|----------|
| 0 → 1 | Shadow precision meets threshold; no critical false negatives on sample | AP Manager |
| 1 → 2 | Pilot UAT pass; control samples clean; SOP updated | Controller |
| 2 → 3 | Stable 60–90 days; sampling plan; exception SLA met | CFO / FD designee |
| 3 → 4 | Formal governance review; still **no** payment auth by agent | Steering committee |

Use `Testing/00_SHADOW_AND_PILOT.md` and `Templates/RISK_ASSESSMENT.md`.

**Exit:** Written promotion decision with date, metrics, and rollback trigger.

---

## Facilitation tips

- Map with processors in the room; validate with managers separately.
- Never let “AI strategy” skip observation.
- Photograph whiteboards; convert to the templates in `TEMPLATES.md` within 48 hours.
- Time-box: Steps 1–6 in a 2-day workshop (Team pack); Steps 7–10 over the following two weeks.

---

## Related artifacts

- `Process_Mapping/TEMPLATES.md`
- `Templates/IMPLEMENTATION_PLAN.md`
- `04_AP_AGENT_OS_TEAM/Workshop/WORKSHOP_FACILITATION.md`
