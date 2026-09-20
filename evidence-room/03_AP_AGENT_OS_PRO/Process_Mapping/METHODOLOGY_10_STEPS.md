# Process Mapping Methodology — 10 Steps

**Evidence Room — AP Agent OS Pro**  
**Document type:** Method standard  
**Audience:** Transformation leads, AP managers, Controllers, implementation partners  
**Outcome:** A governed map from current-state AP work to agent-ready processes with earned responsibility.

---

## Overview

```text
1 Observe → 2 Frame → 3 Discover → 4 Map → 5 Taxonomy
→ 6 Touchpoints → 7 Human vs Agent → 8 Controls → 9 Baseline KPIs
→ 10 Expand responsibility
```

Each step produces artefacts. Do not skip to “build the bot.”

**Templates referenced:**  
`Templates/PROCESS_DISCOVERY_TEMPLATE.md` · `PROCESS_DISCOVERY_TOOLKIT.md` · `EXCEPTION_TAXONOMY.md` · `HUMAN_VS_AGENT_FRAMEWORK.md` · `SOP_GENERATOR_FRAMEWORK.md` · `Templates/SOP_TEMPLATE.md` · `Templates/AGENT_CHARTER_TEMPLATE.md` · `KPI_Measurement/KPI_FRAMEWORK.md` · `Governance/RACI_TEMPLATES.md`

---

## Step 1 — Observe

**Intent:** See real work without redesigning it yet.

| Action | Output |
|---|---|
| Shadow AP specialists (intake, exceptions, payments) | Observation notes |
| Sample 25–50 recent exceptions | Raw reason themes |
| Capture system click-paths | As-is touchpoint list |
| Note workarounds and spreadsheets | Shadow-process log |

**Exit criteria:** Written observe memo; no solutioning language yet.

**Template:** Discovery Template §Observe.

---

## Step 2 — Frame

**Intent:** Bound the first problem.

| Action | Output |
|---|---|
| Select one value stream slice (e.g., PO invoice match exceptions) | Scope statement |
| Define inclusions/exclusions | In/out list |
| Name Business Owner and Technical Owner | Ownership record |
| Agree success signals (not vanity) | Draft KPI shortlist |

**Exit criteria:** Signed scope ≤ 2 pages.

**Template:** `AGENT_CHARTER_TEMPLATE.md` (draft header only).

---

## Step 3 — Discover

**Intent:** Structured fact-finding.

Use `PROCESS_DISCOVERY_TOOLKIT.md`: interviews, data pulls, SIPOC, volume/mix, SLA, control points.

**Exit criteria:** Completed discovery pack; open questions listed with owners.

---

## Step 4 — Map

**Intent:** Make the process legible.

| Artefact | Content |
|---|---|
| Lifecycle map | Receive → validate → match → approve → pay → close |
| Swimlanes | Supplier, AP, Buyer, Receiver, Approver, Treasury, Systems |
| Decision diamonds | Where judgment or policy forks |
| Failure points | Where exceptions spawn |

**Exit criteria:** As-is map reviewed by AP Manager; known inaccuracies logged.

---

## Step 5 — Taxonomy

**Intent:** Make exceptions first-class.

Map observed failures into `EXCEPTION_TAXONOMY.md` codes. Cap “Other.” Assign owners and escalation.

**Exit criteria:** ≥80% of sample exceptions coded; routing draft exists.

---

## Step 6 — System touchpoints

**Intent:** Know every read/write.

| For each step | Capture |
|---|---|
| System of record | ERP / AP / email / shared drive |
| Data objects | Invoice, PO, GR, vendor, payment |
| API/RPA/manual | Integration mode |
| Latency / batch | Freshness risk |

**Exit criteria:** Touchpoint matrix; write actions flagged for control design.

---

## Step 7 — Human vs agent split

**Intent:** Assign work honestly using `HUMAN_VS_AGENT_FRAMEWORK.md`.

Classify each step: Human only · Agent observe · Agent recommend · Agent prepare · Agent execute (fenced).

**Exit criteria:** Split table approved by Controller for money-adjacent steps.

---

## Step 8 — Controls and RACI

**Intent:** Governance before build.

- Map risks to `AGENT_CONTROL_MATRIX.md` rows.  
- Complete RACI from `RACI_TEMPLATES.md`.  
- Define stop conditions and kill-switch.  

**Exit criteria:** Control appendix attached to charter draft.

---

## Step 9 — Baseline KPIs

**Intent:** Measure before changing.

Using `KPI_FRAMEWORK.md`, capture 4–8 weeks baseline (or best available with limitations labelled). Include quality, flow, and risk signals.

**Industry context only:** Ardent 2025 peer STP **35.4%**, exception **18.4%**, cost **$9.84**, cycle **8.2 days**; BIC STP **51%**, exception **11.1%**, cost **$2.65**.

**Exit criteria:** Baseline memo with mix notes; targets draft (trajectory, not fantasy).

---

## Step 10 — Expand responsibility

**Intent:** Earn the next level — never assume it.

| Action | Output |
|---|---|
| Start at L0/L1 per Responsibility Model | Level assignment |
| Shadow / pilot per Testing module | Evidence pack |
| Scorecard window | Promotion case or hold |
| SOP + training update | `SOP_TEMPLATE` filled |
| Re-enter at Step 7 when scope expands | Controlled iteration |

**Exit criteria:** Explicit decision: remain / promote / demote / disable.

---

## Facilitation calendar (illustrative)

| Week | Steps |
|---|---|
| 1 | Observe + Frame |
| 2 | Discover + Map draft |
| 3 | Taxonomy + Touchpoints |
| 4 | Human vs Agent + Controls + Baseline plan |
| 5+ | Build/test; responsibility expansion ongoing |

One well-bounded agent can sometimes move from frame to supervised pilot in **4–6 weeks**; duration depends on systems, controls, data quality, and governance readiness.

---

## Quality checklist

- [ ] Scope fits one charter  
- [ ] Exceptions coded, not anecdotal only  
- [ ] Writes identified and gated  
- [ ] Baseline honest about limitations  
- [ ] Human Accountable named  
- [ ] Expansion rules written before go-live  

---

## Related documents

- All Process_Mapping module files  
- `Testing/SHADOW_MODE_METHODOLOGY.md`  
- `Testing/PILOT_METHODOLOGY.md`  
- `Business_Case/IMPLEMENTATION_ROADMAP.md`
