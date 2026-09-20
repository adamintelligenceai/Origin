# Implementation Playbook

**Product:** Evidence Room — AP Agent OS Team  
**Document ID:** `ER-TEAM-IMP`  
**Version:** 1.0  
**Audience:** Process Owner, PMO, Agent Owners, IT partner  
**Horizon:** First 90–180 days after workshop

---

## 1. Purpose

Convert workshop decisions into a controlled implementation with evidence gates. This playbook assumes Team workshop outputs exist (ceiling, slice, taxonomy draft, backlog).

---

## 2. Delivery principles

1. One slice first — entity × channel × category  
2. Taxonomy before clever agents  
3. L0/L1 before prepare-level writes  
4. Payment boundary tested, not assumed  
5. Demotion is an acceptable outcome  
6. No benefits claimed without baselines  

---

## 3. Workstreams

| ID | Workstream | Primary owner | Key artefacts |
|----|------------|---------------|---------------|
| W1 | Governance & ceiling | Controller + Sponsor | Autonomy registry; decision log |
| W2 | Exception taxonomy | Process Owner | Code list; ownership matrix; tracker |
| W3 | Process & charters | Agent Owners | Maps; job descriptions; instructions |
| W4 | Data & access | IT / FinSystems | Read paths; test env; logging |
| W5 | Controls & SoD | Controllership | Control matrix rows; bank-change path |
| W6 | Measurement | Process Owner | Baselines; KPI scorecards |
| W7 | Training & change | Head of AP / Change | Curriculum; pulse |
| W8 | Shadow & pilot | Agent Owners | Logs; QA; gate packs |
| W9 | Steering | PMO | Cadence; trackers |

---

## 4. Phase plan

### Phase 0 — Foundation (Days 1–15)

| Task | Owner | Done when |
|------|-------|-----------|
| Publish decision log from workshop | PMO | Circulated |
| Freeze pilot slice | Process Owner | Written scope |
| Adopt taxonomy v1 for slice | Process Owner | In tracker |
| Confirm payment auth map | Controller | Documented |
| Name kill-switch owner | Sponsor | Named + reachable |
| Start baseline extraction | Analyst | Ticketed |
| Ban unmanaged public-AI on live invoices | Head of AP | Policy note sent |

**Exit:** Scope + taxonomy + ceiling + kill-switch live.

### Phase 1 — Design (Days 16–35)

| Task | Owner | Done when |
|------|-------|-----------|
| Process map for slice | Process Owner | Reviewed |
| Charters v1 for ≤3 agents | Agent Owners | Approved |
| Instruction sets v1 | Agent Owners | Change-controlled |
| Ownership matrix complete for top codes | Exception lead | Signed |
| Access read proven in test/prod-read | IT | Test evidence |
| Logging schema agreed | IT + Controls | Spec |
| Training Module A scheduled | Trainer | Invites out |

**Exit:** Charters approved; access proven; logging designed.

### Phase 2 — Shadow (Days 36–60)

| Task | Owner | Done when |
|------|-------|-----------|
| Training B/C complete for in-scope staff | Trainer | Assessments |
| L0/L1 shadow running | Agent Owners | Daily logs |
| Weekly QA sample | Controls/Lead | Worksheets |
| Exception huddle rhythm | Exception lead | 3× week |
| Incident log live | Process Owner | Zero ambiguity on severity |

**Exit:** Shadow agree % sampled; zero unresolved critical incidents; steering Day-60 review.

### Phase 3 — Controlled pilot (Days 61–90)

| Task | Owner | Done when |
|------|-------|-----------|
| Recommendations in operating rhythm | Agent Owners | Accept/amend/reject logged |
| Scorecards weekly | PMO | Pack to steering |
| Supplier/internal chase drafts human-sent | Leads | Tone QA |
| Benefits tracker updated (assumptions only) | PMO | Labelled |
| 90-day decision pack | Sponsor | Hold/expand/demote |

**Exit:** Written 90-day decision; backlog for next quarter.

### Phase 4 — Expand or harden (Days 91–180)

Only if gates pass: broaden volume, add agent, or discuss L2 with Controller — using Professional promotion criteria.

---

## 5. RACI (programme level)

| Activity | Sponsor | Process Owner | Agent Owner | Controller | IT | Audit |
|----------|---------|---------------|-------------|------------|----|-------|
| Ceiling | A | C | I | R/C | I | I |
| Taxonomy | I | A | C | C | I | I |
| Charter approve | I | A | R | C (≥L2) | C | I |
| Access | I | C | C | I | A/R | I |
| Shadow QA | I | A | R | C | I | C |
| Payment boundary | A | C | I | R | C | C |
| Kill-switch | A/R | C | C | C | C | I |
| External claims | A | R | I | C | I | C |

R=Responsible A=Accountable C=Consulted I=Informed

---

## 6. Technical implementation pattern (ERP-agnostic)

1. Define canonical objects (invoice, PO, GR, vendor, approval, proposal)  
2. Prove **read** in non-prod  
3. Shadow scoring without writes  
4. L1 outputs to human work queue / draft objects only  
5. Any write path requires change control + SoD review  
6. Payment file generation/transmission remains under existing treasury controls — agent may flag exclusions only  

---

## 7. Quality gates (summary)

| Gate | Minimum evidence |
|------|------------------|
| Start shadow | Charter + training for operators + logging on |
| Start L1 live recommend | Shadow sample pass + zero critical misses |
| Expand volume | Stable accept rate + capacity plan |
| Discuss L2 | Controller review + ≥4 weeks L1 + rollback tested |
| Any payment-adjacent change | Dual human confirmation of boundary |

---

## 8. Operating calendar

| Cadence | Forum | Length |
|---------|-------|--------|
| Daily/3× week | Exception huddle | 15 min |
| Weekly | Agent scorecard | 30 min |
| Fortnightly | Instruction change review | 30 min |
| Monthly | Steering committee | 60 min |
| Day 30/60/90 | Gateway review | 45–90 min |

---

## 9. Common failure patterns

| Pattern | Fix |
|---------|-----|
| Too many agents | Cut to one triage + one specialist |
| Taxonomy politics | Time-box; Process Owner decides v1 |
| No baselines | Treat as red finding; delay benefit talk |
| IT boil-the-ocean platform | Spike read access only |
| Exec savings pressure | NON-EVIDENCE labelling; refuse guarantee |

---

## 10. Handoff to BAU

When pilot becomes BAU:

- Agents listed in autonomy registry  
- Owners in job descriptions  
- Taxonomy under document control  
- Scorecards in AP operating rhythm  
- Steering moves to quarterly assurance + exception-based escalation  

---

*End `ER-TEAM-IMP` v1.0*
