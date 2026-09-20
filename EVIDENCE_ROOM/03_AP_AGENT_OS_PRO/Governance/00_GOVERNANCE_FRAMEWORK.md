# AP Agent OS — Governance Framework

**Product:** Evidence Room — AP Agent OS Pro  
**Purpose:** Decision rights, risk appetite, change control, and accountability for the 16-agent stack.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Govern how agents are introduced, limited, measured, and stopped |
| **How** | Forums, policies, graduation, SoD, audit, cost & model governance |
| **Who** | CFO (appetite); Controller (controls); AP Manager (operations); Audit (assurance) |

---

## Governance principles

1. **Humans own outcomes.** Agents assist; Controllership remains accountable for financial statements and payments.
2. **Payment authorization is human.** Non-negotiable across all autonomy levels.
3. **Earn responsibility.** Default L0; never default to L4 (`Agent_Library/01_AUTONOMY_PROGRESSION.md`).
4. **Evidence over narrative.** Graduation, incidents, and ROI use retained evidence.
5. **No fraud guarantees.** A10 and marketing language stay investigative.
6. **Fail closed on uncertainty** for funds movement and payee changes.
7. **Transparency.** Policy versions and decision logs are inspectable.

---

## Decision rights (RACI summary)

| Decision | AP Mgr | Controller | CFO | Audit | Security/IT | Agent Owner |
|---|---|---|---|---|---|---|
| Day-to-day agent ops | A | C | I | I | C | R |
| Autonomy L0–L1 | A | C | I | I | I | R |
| Autonomy L2 | A | C | I | C | C | R |
| Autonomy L3 | C | A | C | C | C | R |
| Autonomy L4 | C | C | A | C | C | R |
| Payment release | C | C | I | I | C | — (human auth R) |
| Vendor bank change | C | A | I | C | C | — |
| Kill-switch activate | R/A | C | I | I | R | C |
| Taxonomy change | A | C | I | C | I | C |
| External claims (ROI/fraud) | C | C | A | C | I | C |

R=Responsible, A=Accountable, C=Consulted, I=Informed

---

## Forums

| Forum | Cadence | Mandate |
|---|---|---|
| AP Agent Daily Huddle | Daily | Queue health, incidents, cost spikes |
| Autonomy & Controls Board | Monthly | Graduations, demotions, control breaches |
| AP Steering | Monthly/Q | KPI outcomes, business case actuals |
| Model/Tool Change CAB | As needed | IDR/LLM/rule engine changes |
| Audit review | Quarterly | Evidence sampling, SoD, autonomy attestation |

---

## Policy stack (minimum)

1. Autonomy & graduation policy  
2. Payment authorization & SoD policy  
3. Vendor master / bank change policy  
4. Exception taxonomy & waive policy  
5. Data retention & access policy  
6. Model/tool change policy  
7. Incident & kill-switch policy  
8. Cost budget & throttle policy  
9. External communications / disclaimer policy  

A16 stores enforceable subsets as policy-as-code with human-readable twins.

---

## Risk appetite (default posture)

| Domain | Appetite |
|---|---|
| Duplicate payment | Near-zero; fail closed on high-confidence exact dup |
| Payee diversion | Zero; dual control always |
| Cycle-time reduction | High appetite **if** controls hold |
| Unattended supplier email | Low until L2+ proven |
| ML anomaly “fraud” claims | None — signals only |
| Cost overrun | Low; throttle at 150% budget |

Clients tune explicitly; document deviations.

---

## Change control

- **Rules/prompts/models:** versioned; test in non-prod; peer review; CAB for material changes.
- **Autonomy ceilings:** Graduation Packet + A16 promote.
- **DOA/tolerances:** Controller/Procurement co-approve.
- **Emergency break-glass:** logged, time-bound, post-incident review within 5 business days.

---

## Segregation of duties (agent era)

| Incompatible pair | Enforcement |
|---|---|
| Invoice create vs payment release | IAM + A16 |
| Vendor bank change vs payment release | Dual control + IAM |
| Agent service account vs bank file auth | Deny entitlement; continuous test |
| Exception waive vs self-originated invoice | Case SoD checks |

---

## Incident classes

| Class | Examples | Response |
|---|---|---|
| P1 | Wrong payment released; payee diversion | Kill-switch; Controller/Security; forensics |
| P2 | Material mis-post; SoD bypass | Pause agent; demote; root cause |
| P3 | Accuracy/cost breach | Throttle; plan |
| P4 | Noise/FP spike | Tune; communicate |

---

## Assurance & audit

- Continuous: decision logs, entitlement tests  
- Monthly: sampling of L2+ actions  
- Quarterly: autonomy attestation; control matrix test  
- Annual: design effectiveness with Internal Audit  

Evidence locations: agent specs’ Audit Evidence sections; Close Packs; Graduation Packets.

---

## Ethical & legal language

- Do not claim “AI eliminates fraud.”  
- Do not publish vendor accusations from A10 signals.  
- Cite external benchmarks only as external context (see Business Case).  
- Respect privacy/minimization in A08/A09 notifications.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Shadow IT agents | Stack inventory; A16 only path | Unauthorized bots found | Inventory |
| Autonomy drift | Attestation; config diffs | Ceilings vs registry | Packets |
| Governance theater | Tie to payment outcomes | P1/P2 count | Incidents |

---

## Related

- Controls: `../Controls/00_AGENT_CONTROL_MATRIX.md`
- Autonomy: `../Agent_Library/01_AUTONOMY_PROGRESSION.md`
- KPIs: `../KPI_Measurement/00_KPI_FRAMEWORK.md`
