# Observe-to-Scale Methodology

**Product:** Evidence Room — AP Agent OS · Professional  
**Document ID:** ER-AP-PM-001  
**Version:** 1.0  
**Audience:** Finance Transformation, Head of AP, Controller, Platform / Automation leads  
**Purpose:** Provide a complete, repeatable 10-step method to design, prove, and scale AP agents without replacing the ERP and without defaulting to unsupervised autonomy.

---

## 1. Method overview

Evidence Room uses a fixed sequence:

**Observe → Transcribe → Extract → Structure → Agentise → Test → Shadow → Controlled Pilot → Measure → Expand responsibility**

The sequence is deliberate. Skipping to “Agentise” without Observe–Structure produces brittle bots. Skipping Test–Shadow–Pilot before Expand produces control incidents. Skipping Measure before Expand removes the evidence base for autonomy decisions.

### 1.1 What this method is

- An operating discipline for turning real AP work into governed agent charters  
- Compatible with any major ERP and with existing AP automation  
- Explicit about human owners, controls, and evidence at every step  

### 1.2 What this method is not

- A promise that every agent reaches L3/L4  
- A fixed calendar that fits every organisation  
- A substitute for ERP controls, SoD, or payment policy  

### 1.3 Timeline honesty

An **illustrative** 4–6 week path for a **single** low-to-moderate complexity agent (often Intake, Validation, or Follow-Up) is sometimes achievable when systems access, data quality, control owners, and governance decisions are already in place.

**Actual duration depends on:** system landscape and connector readiness; control and audit requirements; data quality and exception complexity; governance decision speed; availability of process SMEs; and whether the agent is payment-adjacent (slower by design). Multi-agent programmes and high-complexity Matching / Duplicate / Payment Proposal Review work typically take longer. Treat any calendar in this document as a planning aid, not a commitment.

---

## 2. Preconditions (before Step 1)

| Precondition | Why it matters |
|--------------|----------------|
| Executive sponsor named | Risk acceptance and autonomy ceiling |
| Process owner named | Charter and taxonomy ownership |
| In-scope entity / invoice population defined | Avoids unbounded scope |
| Systems inventory (ERP, AP automation, email, OCR, shared drives) | Determines Observe feasibility |
| Agreement: payment authorisation remains human | Non-negotiable product constraint |
| Working agreement with IT/security for access & logging | Blocks otherwise appear mid-pilot |

**Template:** `Templates/T01_Programme_Kickoff_Checklist.md` (or equivalent in your Templates pack)

---

## 3. Step 1 — Observe

### 3.1 Intent

See how work actually happens — not how the SOP says it happens.

### 3.2 Activities

- Shadow AP processors, supervisors, and approvers across intake, match, exceptions, statements, and payment proposal cycles  
- Capture volume, timing, tools used (including shadow IT spreadsheets), and handoffs  
- Note workarounds, rework loops, and “tribal knowledge” decision rules  
- Record pain points in the operators’ language  

### 3.3 Outputs

- Observation log (sessions, roles, processes touched)  
- Preliminary candidate list ranked by volume × pain × control sensitivity  
- Risks spotted (SoD workarounds, unlogged overrides)

### 3.4 Templates

- `Templates/T02_Observation_Session_Log.md`  
- `Templates/T03_Candidate_Process_Longlist.md`

### 3.5 Exit criteria

Sufficient coverage of the target process (not a single happy-path invoice); sponsor agrees the observations reflect reality; no payment-release automation proposed.

### 3.6 Typical failure mode

Observing only the “best” clerk or only system screenshots — missing exception reality.

---

## 4. Step 2 — Transcribe

### 4.1 Intent

Convert observations into a durable narrative of the as-is process.

### 4.2 Activities

- Write step-by-step as-is flows for the selected candidate(s)  
- Include decision points, wait states, and external touches (supplier, buyer, warehouse)  
- Attach example artefacts (redacted invoices, exception emails, proposal extracts)  
- Separate “system of record steps” from “spreadsheet/email steps”

### 4.3 Outputs

- As-is process narrative  
- Artefact appendix (redacted)  
- Open questions list for SMEs  

### 4.4 Templates

- `Templates/T04_As_Is_Process_Narrative.md`  
- `Templates/T05_Artefact_Redaction_Checklist.md`

### 4.5 Exit criteria

SME sign-off that the narrative is accurate enough to design against; open questions triaged.

### 4.6 Typical failure mode

Transcribing the policy document instead of the observed process.

---

## 5. Step 3 — Extract

### 5.1 Intent

Pull structured facts from the narrative: rules, data fields, exceptions, owners, and controls.

### 5.2 Activities

- Extract business rules (match tolerances, approval limits, hold codes)  
- Inventory data fields and systems of record  
- Build first-cut exception taxonomy (code, definition, typical owner, urgency)  
- Identify existing controls and evidence already produced  
- Flag rules that exist only in people’s heads  

### 5.3 Outputs

- Rule inventory  
- Data/system field map  
- Draft exception taxonomy  
- Control/evidence inventory  

### 5.4 Templates

- `Templates/T06_Business_Rule_Inventory.md`  
- `Templates/T07_Exception_Taxonomy.xlsx` (or `.md` equivalent)  
- `Templates/T08_Data_Field_Map.md`

### 5.5 Exit criteria

Rules and exceptions cover the majority of volume for the candidate process; “unknown/other” bucket is explicitly sized.

### 5.6 Typical failure mode

Over-extracting edge cases before the core 80% volume path is stable.

---

## 6. Step 4 — Structure

### 6.1 Intent

Turn extracts into an operating design: swimlanes, RACI, SLAs, and target agent boundary.

### 6.2 Activities

- Produce to-be swimlane with human vs candidate-agent lanes  
- Define RACI for each major step  
- Set service levels for queues and escalations  
- Define in-scope / out-of-scope for the first agent slice  
- Map to one of the 16 standard agents (or justify a variant)  
- Draft control impacts (what must not weaken)

### 6.3 Outputs

- Structured process design pack  
- Draft agent boundary statement  
- Updated SoD check  

### 6.4 Templates

- `Templates/T09_To_Be_Swimlane.md`  
- `Templates/T10_RACI_AP_Agent.md`  
- `Templates/T11_Agent_Boundary_Statement.md`

### 6.5 Exit criteria

Process Owner and Control Owner accept the structure; payment authorisation remains outside agent lane; autonomy target for first release stated (usually L0–L2).

### 6.6 Typical failure mode

Designing for L3 execution before structure and controls are agreed.

---

## 7. Step 5 — Agentise

### 7.1 Intent

Produce a complete agent charter and configuration design — the operating contract for the agent.

### 7.2 Activities

- Complete agent charter: purpose, inputs, tools, responsibilities, exclusions, owners, escalations, output standard, controls, KPIs, autonomy level, failure handling, cost monitoring  
- Design prompts/rules/tools consistent with Governance Framework (grounding, allowlists, abstention)  
- Define logging and evidence requirements  
- Align with Agent Control Matrix rows for this agent  
- Prepare evaluation dataset outline (golden cases + adversarial)

### 7.3 Outputs

- Agent charter (versioned)  
- Configuration design (prompts, rules, thresholds — versioned)  
- Control matrix row references  
- Draft scorecard metrics for this agent  

### 7.4 Templates

- `Templates/T12_Agent_Charter.md` (mirror Agent Library standard)  
- `Templates/T13_Threshold_and_Confidence_Table.md`  
- `Templates/T14_Logging_Evidence_Spec.md`

### 7.5 Exit criteria

Charter approved by Process Owner; Platform Owner confirms technical feasibility; exclusions explicitly list payment release and other human-only duties.

### 7.6 Typical failure mode

Shipping prompts without a charter, owner, or exclusions list.

---

## 8. Step 6 — Test

### 8.1 Intent

Prove behaviour in non-production (or production-read-only) before anyone relies on outputs operationally.

### 8.2 Activities

- Execute scenario scripts (happy path, top exceptions, boundary amounts)  
- Run validation: schema, business rules, grounding checks  
- Conduct prompt-injection / adversarial document tests  
- Integration tests for connectors  
- Defect triage with severity and owners  
- UAT with named business acceptors  

### 8.3 Outputs

- Test evidence pack  
- Defect log with closure  
- UAT sign-off (or conditional sign-off with actions)  

### 8.4 Templates / pack

- `Testing/01_SHADOW_PILOT_UAT.md` (scripts & UAT forms)  
- `Templates/T15_Test_Script.xlsx`  
- `Templates/T16_UAT_Signoff.md`  
- `Templates/T17_Defect_Log.md`

### 8.5 Exit criteria

Exit gates for the intended autonomy level met or formally risk-accepted by Controller; Sev-1/2 defects closed or mitigated.

### 8.6 Typical failure mode

Testing only happy-path invoices; skipping injection tests for email/OCR agents.

---

## 9. Step 7 — Shadow

### 9.1 Intent

Run the agent in parallel with humans: agent recommends or prepares; humans continue to decide and post. Compare outcomes.

### 9.2 Activities

- Enable L0–L1 (sometimes L2 draft-only) in production volume slice  
- Capture agent output vs human decision for each sampled item  
- Measure agreement, FP/FN, abstain rate, latency, and override reasons  
- Hold weekly shadow review  
- Freeze model/prompt changes during comparison windows unless safety fix required  

### 9.3 Outputs

- Shadow scorecard  
- Disagreement taxonomy  
- Go / no-go recommendation for pilot  

### 9.4 Templates / pack

- `Testing/01_SHADOW_PILOT_UAT.md` § Shadow methodology  
- `Templates/T18_Shadow_Comparison_Sheet.xlsx`  
- `Templates/T19_Shadow_Review_Minutes.md`

### 9.5 Exit criteria

Agreement and error rates within pre-set gates for the slice; no Sev-1 control incidents; Process Owner recommends pilot or extends shadow.

### 9.6 Typical failure mode

Treating shadow as “demo theatre” without logged comparisons; changing prompts daily so results are incomparable.

---

## 10. Step 8 — Controlled Pilot

### 10.1 Intent

Grant limited operational responsibility under tight scope: entity, vendor class, amount band, and autonomy level.

### 10.2 Activities

- Define pilot charter: scope, duration, success/fail criteria, kill-switch  
- Enable limited L2 or cautious L3 **only** where Test+Shadow gates passed  
- Intensify sampling and dual review on pilot population  
- Daily stand-up for first period; then cadence taper  
- Communicate to AP team and adjacent functions (Procurement, Treasury as needed)  

### 10.3 Outputs

- Pilot report (outcomes, incidents, lessons)  
- Updated charter / thresholds  
- Decision: stop, extend, or scale  

### 10.4 Templates / pack

- `Testing/01_SHADOW_PILOT_UAT.md` § Pilot methodology  
- `Templates/T20_Pilot_Charter.md`  
- `Templates/T21_Pilot_Daily_Log.md`  
- `Templates/T22_Kill_Switch_Runbook.md`

### 10.5 Exit criteria

Pilot criteria met without unacceptable control breaches; evidence pack complete; autonomy not expanded silently.

### 10.6 Typical failure mode

Expanding scope mid-pilot without resetting gates; enabling payment-adjacent write tools “just for the pilot.”

---

## 11. Step 9 — Measure

### 11.1 Intent

Operate a durable measurement system — activity, operational outcomes, financial outcomes, and risk-control outcomes — without vanity metrics.

### 11.2 Activities

- Implement Agent Performance Scorecard for the live agent  
- Separate **validated** metrics from **estimated** planning metrics  
- Review monthly with Process Owner; escalate breaches per Control Matrix  
- Tie cost monitoring (inference, licence, rework) to outcomes  
- Feed Root Cause Agent / backlog with recurring defect classes  

### 11.3 Outputs

- Monthly scorecard  
- Action list with owners  
- Input to business-case refresh (actuals vs model)  

### 11.4 Templates / pack

- `KPI_Measurement/01_AGENT_PERFORMANCE_SCORECARD.md`  
- `Templates/T23_Monthly_Scorecard_Pack.md`  
- `Business_Case/01_AP_AGENT_BUSINESS_CASE_MODEL.md` (refresh inputs)

### 11.5 Exit criteria

Scorecard produced on schedule with data lineage known; breaches produce autonomy or control actions — not slideware only.

### 11.6 Typical failure mode

Reporting only “invoices touched by AI” without quality, risk, or cost-to-serve.

---

## 12. Step 10 — Expand responsibility

### 12.1 Intent

Increase scope or autonomy **only** when earned — L0→L4 ladder, additional entities, or additional document types.

### 12.2 Activities

- Autonomy promotion request with evidence (scorecard, incidents, sampling)  
- Control Owner and Controller approval for L3+ or payment-adjacent scope  
- Update RBAC, thresholds, Control Matrix, and charter version  
- Release management per Governance Framework  
- Re-enter Shadow/Pilot slices when expansion is material  
- Recertify on schedule; auto-downgrade on sustained gate breach  

### 12.3 Outputs

- Updated autonomy register  
- Release notes & training delta  
- Expanded operating procedures  

### 12.4 Templates

- `Templates/T24_Autonomy_Promotion_Request.md`  
- `Templates/T25_Autonomy_Register.md`  
- Governance Framework §§5, 14–17, 23  

### 12.5 Exit criteria

Promotion approved with evidence; monitoring plan active; rollback path tested or tabletop’d.

### 12.6 Typical failure mode

Permanent L3 after a quiet fortnight; no recertification; orchestrator silently widening scope.

---

## 13. Illustrative single-agent calendar (non-binding)

| Week | Steps (illustrative) |
|------|----------------------|
| 0 | Preconditions, kickoff |
| 1 | Observe + start Transcribe |
| 2 | Transcribe complete; Extract |
| 3 | Structure + Agentise draft |
| 4 | Agentise approved; Test begins |
| 5 | Test/UAT; Shadow starts |
| 6 | Shadow review; Controlled Pilot decision |

**This 4–6 week sketch assumes** a bounded agent, ready access, responsive governance, and no major data or control blockers. Matching, Duplicate & Anomaly, Vendor Statement Reconciliation, Payment Proposal Review, and AP Close commonly require longer Observe–Shadow cycles. Multi-entity rollouts are separate expansions under Step 10.

---

## 14. Multi-agent sequencing guidance

Recommended early candidates (lower payment adjacency, clearer rules): Invoice Intake, Validation, Internal Follow-Up, PO Quality (recommend-only), AP Reporting (with tie-out).  

Later / higher control intensity: Matching, Exception Triage at scale, Goods Receipt coupling, Duplicate & Anomaly, Supplier Resolution (outbound), Vendor Statement Reconciliation, Payment Proposal Review, AP Close, Orchestrator.

Root Cause Agent is most valuable once enough operational data exists (after Measure on earlier agents).

---

## 15. Roles across the ten steps

| Role | Primary steps |
|------|----------------|
| Executive sponsor | Preconditions, Pilot decision, Expand approvals |
| AP Process Owner | 1–5, 8–10 |
| Agent Owner | 5–10 |
| Control Owner | 4–5, 7–8, 10 |
| Platform Owner | 5–8, 10 |
| AP SMEs / processors | 1–3, 6–8 |
| Internal Audit (optional advisory) | 4–5, 7, 9 |

---

## 16. Related documents

| Document | Role |
|----------|------|
| `02_IMPLEMENTATION_ROADMAP.md` | Phased programme view (0–10) wrapping this method |
| `Governance/01_AP_AGENT_GOVERNANCE_FRAMEWORK.md` | Binding rules |
| `Governance/02_AGENT_CONTROL_MATRIX.md` | Per-agent controls |
| `KPI_Measurement/01_AGENT_PERFORMANCE_SCORECARD.md` | Measurement system |
| `Testing/01_SHADOW_PILOT_UAT.md` | Detailed test/shadow/pilot scripts |
| `Agent_Library/` | Standard charters for all 16 agents |

---

## Document control

| Version | Change |
|---------|--------|
| 1.0 | Initial Professional methodology |

**Disclaimer:** Timelines and sequencing are planning aids. Outcomes depend on local systems, controls, data, and governance. No savings or ROI are guaranteed by following these steps.
