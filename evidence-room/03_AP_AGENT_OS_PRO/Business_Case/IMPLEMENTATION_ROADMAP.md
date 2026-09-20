# Implementation Roadmap — Phases 0–10

**Evidence Room — AP Agent OS Pro**  
**Document type:** Roadmap  
**Audience:** Transformation leads, AP Manager, Controller, IT  

**Timing note:** A **single well-bounded agent** can sometimes reach supervised pilot in **about 4–6 weeks**. That outcome depends on systems access, control maturity, data quality, and governance readiness. Multi-agent OS rollout is multi-quarter. Treat durations below as **illustrative planning bands**, not commitments.

---

## Phase overview

| Phase | Name | Illustrative duration | Primary outcome |
|---|---|---|---|
| 0 | Mobilize | 1–2 weeks | Owners, scope, success criteria |
| 1 | Discover & baseline | 2–4 weeks | Discovery pack + KPI baseline |
| 2 | Design | 2–3 weeks | Charter, taxonomy slice, controls |
| 3 | Build integrations | 2–6 weeks | Read paths; gated writes |
| 4 | Test & harden | 2–4 weeks | UAT + adversarial tests |
| 5 | Shadow | 2–6 weeks | Compare without side effects |
| 6 | Pilot (supervised) | 3–8 weeks | Live limited scope |
| 7 | Operate & scorecard | Ongoing | Weekly rhythm |
| 8 | Expand responsibility | Ongoing | L promotions with evidence |
| 9 | Scale agents | Multi-quarter | Portfolio growth |
| 10 | Optimize & industrialize | Ongoing | Economics, BCP, autonomy board |

Phases overlap in practice; do not start Phase 6 without Phase 4 exit criteria.

---

## Phase 0 — Mobilize

- Appoint Business Owner, Technical Owner, Controller sponsor  
- Select first use case (pain-priority matrix)  
- Confirm licence path: Free Diagnostic **$0** → Starter **$79** → Professional **$199** (Team **$499** if change support needed; Custom Blueprint **$1,500–$3,000** for facilitated design)  
- Draft RACI  
- **Exit:** Scope memo signed  

---

## Phase 1 — Discover & baseline

- Execute `METHODOLOGY_10_STEPS` Steps 1–5 / toolkit  
- Measure baseline CPI, STP, exception, cycle, duplicate history  
- Footnote Ardent 2025 context ($9.84 / 8.2 days / 18.4% / 35.4% STP; BIC $2.65 / 11.1% / 51%)  
- **Exit:** Discovery pack + baseline memo  

---

## Phase 2 — Design

- Agent charter (seven questions)  
- Human vs agent split  
- Control matrix rows + stop conditions  
- Exception codes in scope  
- KPI targets (trajectory)  
- **Exit:** Charter approved at L0/L1 ceiling  

---

## Phase 3 — Build integrations

- SoR read models  
- Allow-listed tools  
- Logging/evidence schema  
- Feature flags / kill-switch  
- **Exit:** Tech demo on non-prod with audit log sample  

---

## Phase 4 — Test & harden

- `TESTING_SCRIPTS` + `UAT_TEMPLATES`  
- Injection tests; reconciliation tests  
- Fallback SOP drill  
- **Exit:** UAT signed; open Critical defects = 0  

---

## Phase 5 — Shadow

- `SHADOW_MODE_METHODOLOGY`  
- Agent recommends; humans operate as today; compare  
- **Exit:** Accuracy/agreement thresholds met; promotion to pilot decision  

---

## Phase 6 — Pilot

- `PILOT_METHODOLOGY`  
- Limited vendors/entities/amounts  
- Daily stand-up; heightened QA  
- **Exit:** Pilot report; stay / expand / rollback  

---

## Phase 7 — Operate & scorecard

- Weekly performance report  
- Monthly control review  
- Dashboard V1 minimum  
- **Exit:** Steady operating rhythm (ongoing phase)  

---

## Phase 8 — Expand responsibility

- Evidence packs for L1→L2→L3  
- Dual approval for ceilings  
- SOP updates  
- **Exit:** Each promotion attested  

---

## Phase 9 — Scale agents

- Next agents from backlog (often 04 triage, 10 duplicate, 05 GR after match)  
- Orchestrator (16) once ≥3 agents collide in queues  
- Team training paths  
- **Exit:** Portfolio scorecard Green/Amber managed  

---

## Phase 10 — Optimize & industrialize

- Agent economics / CPCO  
- BCP tabletop  
- Autonomy board if any L4  
- Taxonomy & DOA hygiene  
- Continuous improvement via Agent 15 CARs  
- **Exit:** Annual program attestation  

---

## Fast-path (4–6 weeks) — conditions

Eligible when:

- Single agent, narrow document type  
- Clean API read access already exists  
- DOA/tolerances documented  
- Owner time reserved  
- L0–L1 only (no payment write)  
- Shadow optional if read-only observe  

If any condition fails, use full roadmap bands.

---

## Governance gates (hard)

| Gate | Blocks |
|---|---|
| No Accountable human | Any build |
| No logging | Any prod |
| Payment write without Treasury/Controller | Phase 6+ |
| Open Critical UAT defect | Pilot |
| Red control gate | Promotion |

---

## Related documents

- `Templates/IMPLEMENTATION_PLAN_TEMPLATE.md`  
- `Testing/*`  
- `Process_Mapping/METHODOLOGY_10_STEPS.md`  
- `AP_BUSINESS_CASE_MODEL.md`
