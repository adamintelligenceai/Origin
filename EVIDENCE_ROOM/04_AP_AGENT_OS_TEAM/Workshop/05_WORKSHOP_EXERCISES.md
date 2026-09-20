# Workshop Exercises — AP Agent OS Team

**Evidence Room** · Team · Facilitated exercises  
**Use with:** `01_WORKSHOP_FACILITATION_GUIDE.md` · `02_WORKSHOP_DECK.md`  
**Materials:** sticky notes, swimlane poster, charter canvases, timers

## Exercise rules

1. Timeboxes are real — parking lot for unresolved policy fights.  
2. Every agent idea needs a **human owner** before it is ranked.  
3. No savings targets in exercise outputs unless labeled **illustrative** and built from client baselines.  
4. Amber = risk; teal = decision; ink = fact.

---

## Exercise 1 — Current-state swimlane (25–40 min)

**Goal:** One shared picture of invoice-to-pay for the candidate pilot class.

**Setup:** Columns = Intake → Validate → Match → Exception → Approve → Payment proposal → Archive.  
Rows = Supplier, AP processor, Approver, System, Agent (future).

**Steps**

1. Map **as-is** human/system steps only (10–15 min).  
2. Mark exception exits with amber stickies (5 min).  
3. Mark control points (approvals, SoD) with teal (5 min).  
4. Circle the single invoice class for pilot (5 min).  
5. Read-back: “What did we learn that contradicts the interviews?” (5 min).

**Output artefact**

| Field | Capture |
|---|---|
| Pilot class | |
| Hotspot #1–3 | |
| Control points | |
| Blind spots | |

**Facilitator anti-pattern:** Designing to-be agents before as-is is agreed.

---

## Exercise 2 — Agent charter canvas (30–40 min)

**Goal:** 1–2 draft charters ready for steering.

**Canvas fields (one sheet per agent)**

| Field | Prompt |
|---|---|
| Agent name | Use canonical A0x name if possible |
| Purpose (one sentence) | |
| Invoice class in scope | |
| Stage ceiling for 30 days | Observe / Recommend / Draft / … |
| Inputs (systems/fields) | |
| Outputs (artefacts) | |
| Forbidden actions | Must include payment release & bank change |
| Evidence standard | |
| Human owner (name) | |
| Kill-switch owner | |
| KPIs (3 max) | |
| Demotion triggers (2+) | |
| Review cadence | |

**Scoring for selection (optional)**

| Criterion | 1–5 |
|---|---|
| Volume or pain relevance | |
| Evidence observability | |
| Control fit | |
| Owner capacity | |
| Technical feasibility | |

Pick highest score with stage ceiling ≤ Recommend unless gates clear.

**Output:** Photos + markdown copy into Evidence Room `/Charters`.

---

## Exercise 3 — Mini-RACI (20 min)

**Goal:** No blank Accountable cells for pilot lifecycle.

**Activities to RAC:**

1. Run agent on invoice event  
2. Confirm / reject recommendation  
3. File evidence pack  
4. Sample QA  
5. Propose stage promotion  
6. Approve stage promotion  
7. Demote / kill-switch  
8. External supplier communication send  

**Roles:** Agent · Processor · AP Lead · Controller · IT · Audit (Consulted)

**Rule:** Only **one** Accountable per activity.

**Output:** Table pasted into Pro `Templates/04_RACI.md`.

---

## Exercise 4 — Exception taxonomy sprint (25 min · full-day)

**Goal:** ≥8 codes usable by Exception Triage agent later.

| Code | Name | Definition | Default owner | Agent may |
|---|---|---|---|---|
| EX-01 | | | | Observe/Recommend only? |
| EX-02 | | | | |
| … | | | | |

**Quality bar:** Codes must be mutually understandable by a new processor in <1 minute each.

**Ban:** Catch-all “Other” as >20% of volume without subdivision plan.

---

## Exercise 5 — Promotion gate design (20 min · full-day)

**Goal:** Write gates before anyone asks for Execute.

| From → To | KPI / quality gate | Sample size | Approver | Evidence artefact |
|---|---|---|---|---|
| Observe → Recommend | | | | |
| Recommend → Draft | | | | |
| Draft → Execute (narrow) | | | | |
| Execute → Expand | | | | |

Include **demotion** path on the same sheet.

---

## Exercise 6 — KPI freeze (15 min)

**Goal:** Lock definitions for 30 days.

| KPI | Definition | Formula / source | Owner | Cadence | Notes |
|---|---|---|---|---|---|
| | | | | Weekly | |
| | | | | Weekly | |
| Control sample pass rate | | | | Weekly | Mandatory |
| | | | | | |

**Rule:** If definition is fuzzy, KPI cannot be used for promotion.

---

## Exercise 7 — Fear & adoption (15 min · optional)

**Silent write (3 min):** “What would make me ignore the agent path?”  
Cluster themes (7 min).  
Assign one mitigation owner each (5 min).

| Fear theme | Mitigation | Owner |
|---|---|---|
| | | |

---

## Exercise 8 — 48-hour action mapping (10 min)

| Action | Owner | Due | Depends on |
|---|---|---|---|
| Publish decision log | | +48h | |
| Charter v0.9 in Evidence Room | | | |
| Baseline extract | | | |
| Training invite | | | |
| Steering slot booked | | | |

---

## Breakout logistics

| Group size | Ideal |
|---|---|
| 2–4 | Charter + RACI |
| Full room | Swimlane + taxonomy |

**Hybrid tip:** One scribe in shared doc; camera on the wall board.

## Exercise completion checklist (end of workshop)

- [ ] Swimlane captured  
- [ ] ≥1 charter drafted  
- [ ] RACI without blank A  
- [ ] Stage ceiling recorded  
- [ ] KPI freeze started  
- [ ] 48-hour actions owned  

---

*Evidence Room — Agents that earn responsibility.*
