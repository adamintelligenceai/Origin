# Implementation Roadmap (Phases 0–10)

**Product:** Evidence Room — AP Agent OS · Professional  
**Document ID:** ER-AP-PM-002  
**Version:** 1.0  
**Related methodology:** `01_OBSERVE_TO_SCALE_METHODOLOGY.md`  
**Purpose:** Translate Observe-to-Scale into a programme roadmap with entry/exit criteria, owners, artefacts, and risks for each phase.

---

## How to read this roadmap

- **Phases 0–10** are programme stages. They align to, but are not identical with, the 10 methodology steps (Observe…Expand). Phase 0 is mobilisation; later phases include operate/scale loops.  
- Durations are **illustrative planning ranges**, not commitments. They stretch when ERP access, audit requirements, or data quality intervene.  
- Payment authorisation remains human in every phase.  
- Exit criteria must be evidenced — not verbally asserted.

### Phase–methodology map

| Phase | Primary methodology steps |
|-------|---------------------------|
| 0 Mobilise | Preconditions |
| 1 Discover | Observe |
| 2 Document | Transcribe |
| 3 Analyse | Extract |
| 4 Design | Structure |
| 5 Build charters & configs | Agentise |
| 6 Prove in test | Test |
| 7 Shadow | Shadow |
| 8 Pilot | Controlled Pilot |
| 9 Operate & measure | Measure |
| 10 Scale & recertify | Expand responsibility (+ continuous loop) |

---

## Phase 0 — Mobilise

**Intent:** Establish sponsorship, scope fence, and operating rules before touching production data with agents.

| | |
|--|--|
| **Entry criteria** | Business interest documented; draft sponsor identified |
| **Exit criteria** | Sponsor, Process Owner, Platform Owner named; scope (entities, invoice types) written; payment-authorisation constraint acknowledged in writing; kickoff checklist complete; risk appetite / autonomy ceiling draft approved |
| **Primary owners** | Executive sponsor (accountable); Finance Transformation / AP Process Owner (responsible) |
| **Core artefacts** | Kickoff checklist; RACI; scope one-pager; systems inventory; decision log; link to Governance Framework adopted as programme standard |
| **Key risks** | Shadow IT scope creep; IT not engaged early; unspoken expectation of autonomous payments; over-scoping to all 16 agents at once |
| **Illustrative duration** | 1–2 weeks |

**Gate question:** Can we say no to out-of-scope requests?

---

## Phase 1 — Discover (Observe)

**Intent:** Ground the programme in observed work.

| | |
|--|--|
| **Entry criteria** | Phase 0 exit met; observation access approved (people + systems view) |
| **Exit criteria** | Observation sessions completed for in-scope processes; candidate longlist ranked; material control workarounds logged; sponsor confirms observations ring true |
| **Primary owners** | AP Process Owner; AP SMEs; Transformation lead |
| **Core artefacts** | Observation session logs; candidate longlist; initial risk notes |
| **Key risks** | Observing only happy path; disrupting month-end without planning; missing warehouse/procurement touchpoints for GR/PO issues |
| **Illustrative duration** | 1–3 weeks depending on sites/shifts |

**Gate question:** Do we understand exceptions as well as the straight-through path?

---

## Phase 2 — Document (Transcribe)

**Intent:** Produce an agreed as-is narrative.

| | |
|--|--|
| **Entry criteria** | Phase 1 exit met; candidate(s) selected for first tranche |
| **Exit criteria** | As-is narrative SME-approved; redacted artefact appendix stored; open questions triaged with owners |
| **Primary owners** | Transformation analyst / Process Owner; SME reviewers |
| **Core artefacts** | As-is process narrative; artefact appendix; open-question register |
| **Key risks** | Documenting policy instead of practice; insufficient redaction of confidential data; narrative too coarse for rule extraction |
| **Illustrative duration** | 1–2 weeks per major process |

**Gate question:** Would a new joiner execute correctly from this narrative alone?

---

## Phase 3 — Analyse (Extract)

**Intent:** Create rule, data, exception, and control inventories.

| | |
|--|--|
| **Entry criteria** | Approved as-is narrative for tranche |
| **Exit criteria** | Business rule inventory reviewed; draft exception taxonomy covering majority volume; data/field map to systems of record; existing controls/evidence listed; “unknown” volume estimated |
| **Primary owners** | Process Owner; Control Owner; Platform Owner (data) |
| **Core artefacts** | Rule inventory; exception taxonomy v0.9; data field map; control/evidence inventory |
| **Key risks** | Boiling the ocean on rare edges; undocumented tribal rules missed; master-data quality worse than assumed |
| **Illustrative duration** | 1–3 weeks |

**Gate question:** Can we point to the system field for each critical rule input?

---

## Phase 4 — Design (Structure)

**Intent:** Agree to-be human/agent boundaries, RACI, and SLAs.

| | |
|--|--|
| **Entry criteria** | Phase 3 inventories accepted |
| **Exit criteria** | To-be swimlane approved; RACI signed; agent boundary statement clear; SoD check completed; target autonomy for first release ≤ L2 unless Controller pre-approves L3 design intent; Control Matrix rows selected/adapted |
| **Primary owners** | Process Owner; Control Owner; Controller (autonomy ceiling) |
| **Core artefacts** | To-be design pack; RACI; boundary statement; SoD note; draft KPI set |
| **Key risks** | Designing writebacks before controls; blurring payment proposal review into payment release; unowned escalation queues |
| **Illustrative duration** | 1–2 weeks |

**Gate question:** If the agent is wrong, who catches it how fast?

---

## Phase 5 — Build (Agentise)

**Intent:** Produce versioned charters and configurations ready for test.

| | |
|--|--|
| **Entry criteria** | Phase 4 design approved; environments and secret management available |
| **Exit criteria** | Agent charter v1 approved; prompts/rules/thresholds version-tagged; logging/evidence spec agreed; evaluation dataset outlined; tool allowlist reviewed; no payment-release tools present |
| **Primary owners** | Agent Owner; Platform Owner; Process Owner (charter approval) |
| **Core artefacts** | Charter; config repo tags; logging spec; allowlist; eval dataset outline; updated Control Matrix references |
| **Key risks** | Prompt-only build without validators; prod credentials in lower environments; scope expansion during build |
| **Illustrative duration** | 1–4 weeks (connector complexity dominates) |

**Gate question:** Can we reconstruct why the agent decided X from logs and versions?

---

## Phase 6 — Prove (Test & UAT)

**Intent:** Independent of production reliance, demonstrate safe behaviour.

| | |
|--|--|
| **Entry criteria** | Phase 5 exit met; test scripts prepared; UAT participants named |
| **Exit criteria** | Scenario, rule, integration, and adversarial tests executed; Sev-1/2 defects closed or mitigated with Controller acceptance; UAT sign-off recorded; rollback procedure documented |
| **Primary owners** | Agent Owner; Platform Owner; UAT leads (AP Supervisor+) |
| **Core artefacts** | Test evidence pack; defect log; UAT sign-off; kill-switch/rollback draft |
| **Key risks** | Happy-path-only UAT; ignoring injection tests for OCR/email agents; “pass” without metric gates |
| **Illustrative duration** | 1–3 weeks |

**Gate question:** What specifically would make us fail this gate?

---

## Phase 7 — Shadow

**Intent:** Compare agent outputs to human decisions on live volume without ceding control.

| | |
|--|--|
| **Entry criteria** | Phase 6 exit met; shadow monitoring dashboard live; comparison sampling plan approved |
| **Exit criteria** | Shadow window completed per plan; agreement/FP/FN/abstain within gates **or** formal extend/no-go; disagreement taxonomy reviewed; no Sev-1 incidents; go/no-go for pilot minuted |
| **Primary owners** | Agent Owner; AP Supervisor; Process Owner (go/no-go) |
| **Core artefacts** | Shadow comparison sheets; weekly minutes; shadow scorecard; go/no-go record |
| **Key risks** | Prompt churn invalidating comparison; unlogged disagreements; treating high agreement on easy items as readiness for hard exceptions |
| **Illustrative duration** | 2–6 weeks typical; longer for Matching / Duplicate |

**Gate question:** Do we understand the disagreements well enough to pilot?

---

## Phase 8 — Controlled Pilot

**Intent:** Limited operational responsibility under kill-switch discipline.

| | |
|--|--|
| **Entry criteria** | Phase 7 go decision; pilot charter approved (scope, metrics, duration, rollback); support rota live |
| **Exit criteria** | Pilot duration completed; success/fail criteria assessed with evidence; incidents closed or accepted; charter/thresholds updated; scale / extend / stop decision by sponsor |
| **Primary owners** | Process Owner; Agent Owner; Controller (for L3 or material risk); Platform Owner (kill-switch) |
| **Core artefacts** | Pilot charter; daily/weekly logs; incident records; pilot report; decision memo |
| **Key risks** | Quiet scope expansion; fatigue on dual review; enabling write tools beyond charter; ignoring early warning metrics |
| **Illustrative duration** | 2–8 weeks |

**Gate question:** Would we be comfortable explaining this pilot to auditors tomorrow?

---

## Phase 9 — Operate & measure

**Intent:** Steady-state operation with scorecards, cost monitoring, and control rhythm.

| | |
|--|--|
| **Entry criteria** | Pilot scale decision for at least one agent/entity; scorecard data lineage confirmed |
| **Exit criteria** | (Ongoing phase) Monthly scorecards published; breaches drive actions; access/SoD certs on calendar; cost per outcome tracked; business-case inputs refreshed with actuals where validated; backlog fed from Root Cause |
| **Primary owners** | AP Manager / Process Owner; Agent Owners; Control Owner; Platform Owner |
| **Core artefacts** | Monthly scorecard packs; autonomy register; cert evidence; cost reports; improvement backlog |
| **Key risks** | Vanity metrics; estimated savings presented as validated; autonomy drift; log retention gaps |
| **Illustrative duration** | Continuous |

**Gate question:** Which metrics are validated vs estimated this month?

---

## Phase 10 — Scale & recertify

**Intent:** Expand entities, document types, agents, or autonomy only with evidence; keep recertification alive.

| | |
|--|--|
| **Entry criteria** | Stable Phase 9 operation for source slice; promotion request with evidence; capacity for dual-run if needed |
| **Exit criteria** | Each expansion has approved request, updated charter/controls/RBAC, release record, and monitoring plan; semi-annual autonomy re-cert completed; failed certs produce freeze/downgrade; multi-agent orchestration rules updated if Agent 16 in play |
| **Primary owners** | Controller + Process Owner (autonomy); Programme Owner (portfolio sequencing); Platform Owner (release) |
| **Core artefacts** | Autonomy promotion requests; release notes; updated Control Matrix; recert packs; scaled runbooks; BCP drill records |
| **Key risks** | Big-bang multi-agent launch; orchestrator scope creep; vendor model change during scale; underestimating change management |
| **Illustrative duration** | Continuous waves; each wave sized like a mini Phase 6–8 |

**Gate question:** What is the rollback for this expansion?

---

## Cross-phase workstreams

| Workstream | Touches phases | Owner |
|------------|----------------|-------|
| Governance & SoD | 0, 4–10 | Control Owner / Controller |
| Security & privacy | 0, 5–10 | Platform / Security |
| Change management & training | 7–10 | AP Manager / HR-L&D as applicable |
| Vendor / model risk | 5, 7, 9–10 | Platform + Legal |
| Audit engagement | 4, 6, 8–10 | Process Owner + Audit liaison |
| Benefits tracking | 8–10 | Process Owner + Finance BP |

---

## Programme risk register (starter)

| ID | Risk | Phase peak | Mitigation |
|----|------|------------|------------|
| R1 | Expectation of autonomous payment | 0–8 | Written exclusion; charter reviews |
| R2 | ERP access delays | 1–6 | Early IT engagement; read-only first |
| R3 | Data quality undermines matching | 3–8 | Taxonomy + master data actions before L3 |
| R4 | Prompt injection via documents | 5–9 | Adversarial tests; allowlisted tools |
| R5 | Model provider silent change | 7–10 | Monitoring; dual-run; rollback |
| R6 | Audit challenge on evidence | 6–10 | Logging spec; retention; export packs |
| R7 | Operator rejection / alert fatigue | 7–9 | UX of queues; override analytics; training |
| R8 | Savings double-counting | 9–10 | Scorecard validated vs estimated rules |
| R9 | Key-person dependency | 0–10 | Charters, runbooks, backup Agent Owners |
| R10 | Parallel initiatives conflicting rules | 4–10 | Single rule inventory; CAB |

---

## Suggested first-wave portfolio (illustrative)

| Wave | Agents | Rationale |
|------|--------|-----------|
| A | Intake, Validation, Internal Follow-Up | Lower payment adjacency; clear rules |
| B | Exception Triage, PO Quality (L1), Reporting (tie-out) | Uses Wave A data |
| C | Matching, Goods Receipt coupling | Higher FP/FN sensitivity |
| D | Duplicate & Anomaly, Statement Rec. | Payment-adjacent; more shadow time |
| E | Supplier Resolution, Approval support | Outbound/comms risk |
| F | Payment Proposal Review, AP Close, Orchestrator, Root Cause | Highest governance bar |

Waves are optional sequencing aids — not mandatory product stages.

---

## RACI snapshot (programme-level)

| Decision | A | R | C | I |
|----------|---|---|---|---|
| Scope & autonomy ceiling | Sponsor / Controller | Process Owner | Control, Platform | AP team |
| Charter approval | Process Owner | Agent Owner | Control, Platform | Sponsor |
| Prod release | Process Owner | Platform Owner | Agent Owner, Security | Audit |
| Pilot go/no-go | Sponsor | Process Owner | Controller, Agent Owner | AP team |
| L3+ promotion | Controller | Process Owner | Control, Audit (advisory) | Platform |
| Kill-switch activate | Process Owner or Platform (on Sev-1) | Platform | Agent Owner | Sponsor |

---

## Related documents

- `01_OBSERVE_TO_SCALE_METHODOLOGY.md`  
- `Governance/01_AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `Governance/02_AGENT_CONTROL_MATRIX.md`  
- `KPI_Measurement/01_AGENT_PERFORMANCE_SCORECARD.md`  
- `Business_Case/01_AP_AGENT_BUSINESS_CASE_MODEL.md`  
- `Testing/01_SHADOW_PILOT_UAT.md`  
- `04_AP_AGENT_OS_TEAM/` (workshop, training, change — Team tier)

---

## Document control

| Version | Change |
|---------|--------|
| 1.0 | Initial Phases 0–10 roadmap |

**Disclaimer:** Phase durations and wave sequencing are illustrative planning aids. They are not implementation guarantees and do not imply assured savings, ROI, or audit outcomes.
