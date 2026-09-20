# Evidence Room — AP Agent OS Professional

## Process Mapping — 03 SOP Generator Framework

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Process Mapping  
**Standard:** Proof before permission  
**Audience:** AP process owner, analyst, Control owner, trainers  
**ERP stance:** Agnostic. SOP steps name the buyer’s system register, never a vendor implicitly.  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Working instrument for Step 4 (Structure). Generates SOP, process map, decision trees and control map from the object register.

---

### Purpose

Convert the Extract object register into operating artefacts a trained processor, a reviewer and an auditor can use without asking the original analyst. This framework generates **current-state** SOPs first. Target-state SOPs are a later version, clearly labelled, and never mixed into the current-state file.

### How to use

1. Accept only a signed object register from `02_TRANSCRIPT_TO_WORKFLOW.md`.  
2. Build the process map and decision trees from High/Med objects.  
3. Generate the SOP using the section order below.  
4. Generate the control map from CTL rows.  
5. Attach the RACI from `04_RACI_STANDARD.md`.  
6. Sign as current-state. Only then may Agentise begin.

A language model may draft wording. A named process owner accepts every section. Drafts that cannot cite object IDs are deleted, not edited.

---

## 1. What to do

Produce one **process pack** (single version number) containing:

| Artefact | File / section | Source objects |
|---|---|---|
| Process map | Swimlane, current-state | ST, SY, DEP |
| Decision trees | One tree per DEC cluster | DEC, BR, EX |
| Exception map | Code → who → next action | EX |
| Control map | Control → owner → evidence | CTL |
| SOP | This framework | All accepted objects |
| Open issues | Appendix | Q, CONFLICT, Low-confidence |

Do not produce training slides instead of an SOP. Slides are a derivative, not the control document.

---

## 2. How

### 2.1 Input gate

Refuse to generate if any are true:

- Register unsigned.  
- Low-confidence rows marked for SOP use.  
- CONFLICT rows merged.  
- EX rows without taxonomy code or `UNMAPPED` + Q.  
- Current vs target not declared.

### 2.2 Process-map rules

- One swimlane per role in the RACI (human roles only). Agents, if mentioned, sit in a dashed lane labelled `NOT IN CURRENT-STATE OPERATION` until a later target-state version.  
- Every box has an ST-ID.  
- Every system is a SY-ID from the register, not a logo.  
- Waits and hand-offs are boxes, not arrows with comments.  
- Exception exits use taxonomy codes.

### 2.3 Decision-tree rules

- One question per node, binary if possible.  
- Leaves are: continue STP, raise `EX-…`, escalate to named role, or stop (hard control).  
- Thresholds that were unquantified in Extract remain `[POLICY GAP — DO NOT OPERATE A NUMBER]`.  
- Do not average conflicting thresholds.

### 2.4 SOP section order (mandatory)

Use this order. If a section does not apply, write `Not applicable — [reason]`, do not delete the heading.

1. Document control (title, version, state: current/target, owner, approver, effective date, review date)  
2. Purpose and scope (entities, channels, invoice types)  
3. Out of scope (explicit)  
4. Definitions and taxonomy codes used  
5. Roles (link to RACI; no agent as Accountable)  
6. Inputs and sources of truth  
7. Procedure — numbered steps with ST-IDs, system, role, output  
8. Decision trees (embed or pointer)  
9. Exception handling (code, first action, owner, clock, escalate)  
10. Controls performed inside this SOP (CTL-IDs)  
11. Records and evidence to keep  
12. Escalation and override (pointer to `../Governance/03_INCIDENT_AND_OVERRIDE.md` for agent-era versions)  
13. Failure / fallback (system down, interface fail)  
14. Metrics this SOP feeds (dictionary IDs only)  
15. Change history  
16. Appendix: UNMAPPED, CONFLICT, policy gaps  

### 2.5 Step-writing standard

Each procedural step has seven lines. This is the same seven-question standard as the rest of the OS:

```
Step n  [verb + object]
What to do:     [ ]
How:            [system + transaction / screen / file]
Who:            [role]
What can go wrong: [ ]
Control:        [CTL-ID or “none — accepted risk, owner …”]
Measure:        [field or timestamp produced]
Evidence:       [where stored]
Object IDs:     [ST-…, BR-…]
```

If “How” cannot name a system or file, the step is not operational. Return to Extract.

### 2.6 Exception section standard

| Taxonomy code | First action | Clock start | Owner | Escalate when | Do not |
|---|---|---|---|---|---|
| EX-GR-001 | | Invoice parked / exception created | | | Create a GR to clear the match unless policy expressly allows and SoD permits |

Clocks are buyer-set. Write `[BUYER SLA]` rather than inventing 24/48/72 hours.

### 2.7 Generator (human or model-assisted)

**Allowed generation:**

- Reorder accepted objects into the section template.  
- Turn ST rows into step skeletons.  
- Group EX rows by code.

**Forbidden generation:**

- Filling policy gaps with “industry typical” tolerances.  
- Adding controls that were not in the CTL register “because audit will want them.” New controls are a change, listed in Open issues.  
- Writing target-state as if it were current.  
- Citing statistics.

**Model-assist disclosure.** If used: model, date, prompt/version hash, human acceptor per section.

### 2.8 Versioning

| Version label | Meaning |
|---|---|
| `CS-0.x` | Current-state draft |
| `CS-1.0` | Current-state approved — Agentise may start |
| `TS-0.x` | Target-state draft (agents in lanes) |
| `TS-1.0` | Target-state approved — still does not grant autonomy |
| `OP-x.y` | Operating SOP after a pilot promotion (agents have named, limited duties) |

A `TS` SOP is not authority to run an agent in production.

---

## 3. Who

| Artefact | Author | Acceptor | Accountable |
|---|---|---|---|
| Process map | Analyst | AP process owner | Head of AP / Controller |
| Decision trees | Analyst | Policy owner for that tree | Policy owner |
| Exception map | Exception lead | AP Manager | Head of AP |
| Control map | Control owner | Internal Audit (review, not own) | Control owner |
| SOP CS/TS/OP | Process owner | Head of AP / Controller | Head of AP / Controller |

Trainers may produce job aids from `OP` versions only.

---

## 4. What can go wrong

| Failure | Effect | Control |
|---|---|---|
| Target-state issued as current-state | Agents designed against fiction | State label in header; pack checklist |
| Unquantified tolerance written as a number | Silent policy invention | Policy-gap token required |
| SOP says “use judgement” with no tree | Unauditable execution | Reject section 8 empty when DEC objects exist |
| Agent listed as Accountable | Governance breach | RACI standard |
| Controls added for show | Fake assurance | CTL-ID required |
| Multi-entity SOP with one entity’s tax rule | Wrong tax treatment | Scope section lists entities and differences |
| Model draft accepted as a block | Hallucinated steps | Per-section acceptor |

---

## 5. Control

Pack release checklist:

- [ ] Input register version cited  
- [ ] State label (CS/TS/OP) correct  
- [ ] Every SOP step has object IDs  
- [ ] Every EX code exists in the taxonomy  
- [ ] Policy gaps visible, not filled  
- [ ] RACI attached and consistent with role names  
- [ ] Control map: each CTL has owner, frequency, evidence  
- [ ] Fallback section names the system-down path  
- [ ] Model-assist disclosed or “none”  
- [ ] Approver is a human role, named  

---

## 6. Measure

| Metric | Definition |
|---|---|
| Traceability | % SOP steps with at least one ST/BR ID |
| Gap density | Policy-gap tokens / SOP steps |
| Unmapped exceptions | Count still `UNMAPPED` |
| Conflicts open | Count |
| Cycle time to CS-1.0 | Working days from signed register (descriptive, not a target) |
| Rework | SOP sections returned by acceptor |

---

## 7. Evidence

Store under `[BUYER]/Evidence/Structure/`:

- Process pack (all artefacts, one version)  
- Pack checklist  
- Object register version cited  
- Model-assist log  
- Approval record  

---

## SOP skeleton (copy)

```
DOCUMENT CONTROL
Title:        AP — [process name]
State:        CS / TS / OP
Version:      [ ]
Owner:        [role, name]
Approver:     [role, name]
Effective:    [ ]
Review by:    [ ]
Register:     [object register ID]
Entities:     [ ]
Channels:     [ ]

1 PURPOSE AND SCOPE
2 OUT OF SCOPE
3 DEFINITIONS AND TAXONOMY CODES
4 ROLES (see RACI)
5 INPUTS AND SOURCES OF TRUTH
6 PROCEDURE (steps with seven-line standard)
7 DECISION TREES
8 EXCEPTION HANDLING
9 CONTROLS
10 RECORDS
11 ESCALATION AND OVERRIDE
12 FALLBACK
13 METRICS (dictionary IDs)
14 CHANGE HISTORY
15 APPENDIX — GAPS AND CONFLICTS
```

---

## Decision-tree skeleton

```
Start: invoice in [queue]
Q1: Mandatory fields present?  no → EX-QLT-001 / EX-QLT-002
Q2: Supplier + legal entity match policy?  no → EX-MDM-001 / EX-MDM-002
Q3: Duplicate exact or potential?  yes → EX-DUP-001 / EX-DUP-002
Q4: PO required?  yes and missing → EX-PO-001
Q5: PO valid / open / remaining value?  no → EX-PO-002 / 003 / 004
Q6: Receipt required?  missing / partial → EX-GR-001 / EX-GR-002
Q7: Price / qty within documented tolerance?  no → EX-MAT-001 / EX-MAT-002
… continue only with accepted BR/DEC objects
Leaf: eligible for STP  OR  parked with code  OR  hard stop
```

Replace any node that lacks an accepted object with a policy-gap leaf. Do not “finish the tree” from memory.

---

## Control-map skeleton

| CTL-ID | Statement | P/D | Owner | Frequency | Evidence | SOP step |
|---|---|---|---|---|---|---|
| CTL-… | | Preventive / Detective | | | | |

---

## ACME — ILLUSTRATIVE

ACME issues `AP-INV-INTAKE CS-1.0`. Section 6 step 4: “Compare invoice supplier VAT ID to vendor master.” How: ERP vendor display. Who: Intake processor. What can go wrong: lookalike vendor. Control: CTL-019 second-person check above `[BUYER value cap]`. Measure: mismatch flag. Evidence: workflow timestamp. Object IDs: ST-008, BR-004. A model drafted the prose; the process owner accepted section 6 line by line. No agent appears in a solid swimlane.

---

## Related documents

- `00_METHODOLOGY.md` — Step 4  
- `02_TRANSCRIPT_TO_WORKFLOW.md` — input  
- `04_RACI_STANDARD.md`  
- `../Controls/03_EXCEPTION_TAXONOMY.md`  
- `../Governance/01_AUTONOMY_POLICY.md` — after CS-1.0  

---

*End of 03_SOP_GENERATOR_FRAMEWORK.md*
