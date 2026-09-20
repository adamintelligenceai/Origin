# Evidence Room — AP Agent OS Professional

## Process Mapping — 04 RACI Standard

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Process Mapping  
**Standard:** Proof before permission  
**Audience:** Head of AP, Controller, AP Manager, Control owner, Internal Audit, Finance Systems  
**ERP stance:** Agnostic. Roles are organisational, not ERP role codes. Map ERP roles in the access appendix.  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Binding naming and assignment rules for every AP Agent OS artefact.

---

### Purpose

Make accountability visible before any agent is given a tool. Evidence Room uses RACI as a control, not a workshop poster.

### Definitions

| Letter | Meaning in this OS | Allowed on an agent? |
|---|---|---|
| **R** Responsible | Does the work or produces the output | Yes, for a named, bounded task at an approved autonomy level |
| **A** Accountable | Answers for the outcome; one person | **Never** |
| **C** Consulted | Must be heard before the action | Rare. An agent may be queried; a human still Consults |
| **I** Informed | Receives the record after the action | Yes, as a reporting destination |

If a chart shows two Accountables, it is invalid. If it shows none, it is invalid. If it shows an agent as Accountable, it is a governance incident.

---

## 1. What to do

Publish one **AP operating RACI** (humans only) and one **agent-task RACI** (humans + agents as R/I only) that share the same activity list.

Activities cover the AP lifecycle and the ten-step method.

---

## 2. How

### 2.1 Construction rules

1. Start from the signed process pack activity list, not from a generic AP textbook.  
2. Assign **A** first, then **R**, then **C/I**.  
3. **A** is a role that can be a named incumbent. “AP team” is not a role.  
4. Deputies are listed; absence does not move **A** to an agent.  
5. Incompatible **R** pairs follow the SoD appendix (example: invoice entry vs payment release).  
6. Agents inherit **R** only from a signed charter and only for the listed activity.  
7. Version the RACI with the SOP. A charter that cites an old RACI is invalid.

### 2.2 Role catalogue (standard names)

Use these names unless the buyer maps them in the translation table. Do not proliferate synonyms (“AP lead” vs “AP Manager”).

| Standard role | Typical incumbent | May be A for |
|---|---|---|
| Head of AP / Shared Services AP lead | Named manager | Day-to-day AP operating model |
| Financial Controller | Named | Policy, close, financial claims on scorecards |
| CFO / Finance Director | Named | Autonomy L3+ and payment-adjacent expansions |
| AP Manager | Named | Queues, pilots, weekly agent report |
| AP Processor | Role pool | Execution of intake/validate/match steps |
| Exception owner | Named per code family | Resolution of that family |
| Payment preparer | Named | Proposal assembly |
| Payment authoriser | Named, SoD-separated | Release of payment |
| Procurement / Buyer | Named | PO quality, price/qty disputes |
| Goods-receipt owner | Requester or warehouse role | GR creation, missing GR |
| Master-data steward | Named | Vendor, bank, entity, tax standing data |
| Tax owner | Named | Tax exception disposition |
| Treasury | Named | Bank-change and payment-hold policy |
| Control / Risk owner | Named | Control framework, matrix, incidents |
| Finance Systems / IT | Named | Access, interfaces, model vendor |
| Internal Audit | Named | Assurance reviews (usually I or C, not A for operation) |
| Privacy / DPO | Named | Personal and confidential data in prompts/logs |
| Agent: [charter name] | System identity | **R only**, never A |

Buyer translation table:

| Standard role | Local title | Named incumbent | Deputy | Review date |
|---|---|---|---|---|
| | | `[BUYER]` | | |

### 2.3 Method RACI (ten steps)

| Activity | Head of AP | Controller | AP Manager | Analyst / PX | Control owner | FinSys / IT | Internal Audit | Agent |
|---|---|---|---|---|---|---|---|---|
| Observe | A | I | R | R | C | C | I | — |
| Transcribe / redaction | I | I | A (session) | R | I | C (storage) | I | — |
| Extract | A | I | C | R | C (CTL rows) | I | I | Advisory tag only, not R |
| Structure / SOP CS-1.0 | A | A (policy sections) | R | R | C | I | C | — |
| Agentise / charter | A | C | R | C | C | C | I | I (identity created later) |
| Test | A | I | C | R | C | R (env) | I | R (runs cases) |
| Shadow | A | I | R | C | C | R (access lock) | I | R (recommend only) |
| Controlled Pilot | A | C | R | I | C | R | I | R (scoped) |
| Measure | C | A (financial lines) | R | C | C | I | C | I |
| Expand responsibility | A | C | R | I | C | C | I | I |
| Emergency disable | A | I | R | I | C | R | I | — |

Controller is **A** for any public or steering figure that claims money saved. Head of AP is **A** for operating the method. If those are the same person, record that explicitly — still one A per activity.

### 2.4 Operating RACI (AP lifecycle, humans)

Complete with local names. Letters below are the Evidence Room default; change only with a recorded reason.

| Activity | Head of AP | Controller | AP Manager | Processor | Exception owner | Buyer | GR owner | MD steward | Tax | Payment preparer | Payment authoriser | Treasury | Control |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Invoice intake | A | I | R | R | I | I | I | C | I | I | I | I | I |
| Validation | A | I | R | R | I | I | I | C | C | I | I | I | C |
| Match (PO/price/qty/GR) | A | I | R | R | C | C | C | I | I | I | I | I | C |
| Exception triage | A | I | R | C | R | I | I | I | I | I | I | I | C |
| Missing GR chase | A | I | C | I | R | C | R | I | I | I | I | I | I |
| PO quality defects | C | I | C | I | C | R | I | C | I | I | I | I | I |
| Approval chase | A | C | R | I | C | C | I | I | I | I | I | I | C |
| Supplier communication (send) | A | I | R | I | C | C | I | I | I | I | I | I | I |
| Duplicate / anomaly review | A | C | R | C | R | I | I | C | I | C | I | C | C |
| Statement rec | A | I | R | C | R | I | I | C | I | I | I | I | I |
| Payment proposal | A | C | C | I | C | I | I | C | I | R | C | C | C |
| Payment authorise / release | C | A | I | — | I | I | I | I | I | — | R | C | C |
| Bank-detail change | I | C | I | — | I | I | I | R | I | I | C | A | C |
| AP close / accruals | C | A | R | C | C | I | C | I | C | I | I | I | C |
| AP reporting | A | C | R | I | I | I | I | I | I | I | I | I | C |
| Root-cause actions | A | C | R | I | C | C | C | C | C | I | I | I | C |
| Control certification | C | A | R | I | I | I | I | I | I | I | I | I | R |
| Access termination | I | I | C | I | I | I | I | I | I | I | I | I | C |

**Hard SoD (default):** Payment authoriser is not R or A for intake, validation, or vendor bank change. Processor is not R for payment authorise. Mark any local exception as a residual risk in `../Controls/02_RISK_REGISTER.md`.

### 2.5 Agent-task RACI (after a charter exists)

Copy this row pattern per agent. Autonomy level from `../Governance/01_AUTONOMY_POLICY.md`.

| Activity | Human A | Human R (supervise) | Agent R allowed at | Agent must not |
|---|---|---|---|---|
| Invoice Intake — completeness flag | Head of AP | AP Manager | L1+ recommend; L3 only after promotion | Reject-and-delete source; change vendor master |
| Validation — field checks | Head of AP | AP Manager | Deterministic compares any time; model flags L1 | Post invoice; override tax engine |
| Matching — tolerance compare | Head of AP | AP Manager | Deterministic | Widen tolerance; create GR; change PO price |
| Exception classification | Head of AP | Exception owner | L1–L2 | Close exception as “no issue” above buyer cap |
| GR chase draft | Head of AP | Exception owner | L2 prepare | Send to all-company lists; create GR |
| PO quality findings | Procurement lead | Buyer’s manager | L1–L2 | Edit PO |
| Approval chase draft | Head of AP | AP Manager | L2 | Reassign DOA; approve the invoice |
| Supplier letter draft | Head of AP | AP Manager | L2 | Send without human release if L<3 |
| Internal chase draft | Head of AP | AP Manager | L2 | Send to third parties |
| Duplicate flag | Head of AP | Exception owner | L1+ | Void invoice; remove from payment |
| Statement match propose | Head of AP | AP Manager | L1–L2 | Adjust supplier balance |
| Payment proposal analytical review | Controller | Payment preparer | L1 | Add/remove items; release payment |
| Close completeness list | Controller | AP Manager | L1–L2 | Post accruals |
| Reporting pack draft | Head of AP | AP Manager | L2 | Publish to board without human accept |
| Root-cause clusters | Head of AP | AP Manager | L1 | Assign blame to a named person in outbound mail |
| Orchestrator prioritisation | Head of AP | AP Manager | L1–L3 (queue only) | Change another agent’s autonomy; grant access |

---

## 3. Who (meta-RACI for this standard)

| Activity | A | R | C | I |
|---|---|---|---|---|
| Maintain this standard | Controller | Control owner | Head of AP, Internal Audit | Finance Systems |
| Name incumbents / deputies | Head of AP | AP Manager | HR / org design | All chart users |
| Approve SoD exception | Controller | Control owner | Internal Audit, Treasury | AP Manager |
| Add an agent row | Head of AP | AP Manager | Control owner, FinSys | Internal Audit |

---

## 4. What can go wrong

| Failure | Risk | Detection |
|---|---|---|
| Agent marked A | No human owner for harm | Chart review; charter gate |
| Two As on payment release | Diffusion | Chart lint: count A per row = 1 |
| RACI uses people’s names only | Breaks on leave | Roles + incumbents table |
| Informal “Jane knows” not on chart | Single point of failure | Discovery unofficial-artefact list vs RACI |
| SoD pair both R | Segregation failure | SoD appendix test |
| Charter RACI ≠ SOP RACI | Agents operate a different model | Version citation check |
| Consulted list huge | Delay disguised as governance | Cap C at roles that can veto |

---

## 5. Control

- Chart lint: exactly one A per activity; no agent A; no blank A.  
- SoD test: incompatible pairs flagged.  
- Version citation on every agent charter and SOP.  
- Quarterly incumbency recertification (`../Governance/00_GOVERNANCE_FRAMEWORK.md`).  
- Any SoD exception has a risk-register ID and an expiry date.

---

## 6. Measure

| Metric | Definition |
|---|---|
| RACI completeness | Activities with valid A and at least one R / total activities |
| SoD exceptions open | Count, and count past expiry |
| Incumbent gaps | Roles with no named incumbent and no deputy |
| Charter drift | Charters citing a RACI version ≠ current |
| Escalations for “who owns this?” | Count (signal the chart is not used) |

---

## 7. Evidence

- Current RACI workbook (method + operating + agent-task)  
- Translation table (local titles)  
- SoD appendix and exceptions  
- Quarterly certification  
- Stored under `[BUYER]/Evidence/Structure/RACI/`

---

## ACME — ILLUSTRATIVE

ACME’s first agent-task RACI gives Duplicate & Anomaly Agent **R** at L1 to flag `EX-DUP-001/002`. Accountable remains Head of AP. Payment authoriser is Informed of confirmed duplicates on the proposal, not Responsible for the model. A draft chart that listed the agent as Accountable for “duplicate prevention” is rejected at charter review.

---

## Related documents

- `00_METHODOLOGY.md`  
- `03_SOP_GENERATOR_FRAMEWORK.md`  
- `../Governance/00_GOVERNANCE_FRAMEWORK.md`  
- `../Governance/01_AUTONOMY_POLICY.md`  
- `../Controls/01_CONTROL_MATRIX.md`  

---

*End of 04_RACI_STANDARD.md*
