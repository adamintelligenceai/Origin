# RACI Templates — AP Agent Operating Model

**Evidence Room — AP Agent OS Pro**  
**Document type:** RACI templates  
**Audience:** Controllers, AP managers, IT, Audit, Steering Committee  
**Legend:** **R** Responsible · **A** Accountable · **C** Consulted · **I** Informed  

**Rule:** Exactly one **A** per row. Agents are never **A** for financial outcomes.

---

## 1. How to use

1. Copy the relevant table into your implementation plan or Confluence/SharePoint equivalent.  
2. Replace role titles with named individuals.  
3. Revisit RACI at each responsibility-level promotion.  
4. Conflicts (two As, or zero As) block go-live.

---

## 2. Program-level RACI (agent OS)

| Activity | AP Specialist | AP Manager | Controller | Internal Audit | IT / Platform | Prompt Steward | Treasury | Procurement | Steering |
|---|---|---|---|---|---|---|---|---|---|
| Approve agent business case | C | R | A | C | C | I | C | I | I |
| Approve agent charter | C | R | A | C | C | C | I | C | I |
| Set / change autonomy ceiling L0–L2 | C | R | A | C | C | C | I | I | I |
| Set / change autonomy ceiling L3 | C | R | A | C | C | C | C | I | C |
| Approve L4 autonomy charter | I | C | A | C | C | C | C | I | R |
| Production release of agent version | C | C | A | I | R | R | I | I | I |
| Kill-switch authority | I | C | A | I | R | I | C | I | I |
| Monthly KPI scorecard sign-off | C | R | A | I | C | C | I | I | I |
| Control attestation (periodic) | I | C | A | C | C | I | I | I | I |
| Risk register ownership | I | C | A | C | C | C | C | I | I |
| Vendor/model due diligence | I | I | C | C | R | C | I | A | I |
| BCP / fallback runbooks | C | R | A | I | R | I | C | I | I |
| Incident commander (Critical AP-AI) | C | R | A | I | R | C | C | I | I |
| Audit evidence retrieval | C | R | A | C | C | C | I | I | I |

---

## 3. Per-agent operations RACI (template)

*Duplicate this table for each agent. Pre-filled pattern below uses Agent 03 Matching as the worked shape; swap agent-specific consults as needed.*

| Activity | Agent (system) | AP Specialist | AP Manager | Controller | Tech Owner | Prompt Steward |
|---|---|---|---|---|---|---|
| Execute allowed actions within level | R | C | A | I | C | I |
| Accept / reject recommendations | I | R | A | I | I | I |
| Resolve exceptions from agent | I | R | A | I | I | I |
| Tune tolerances / policies | I | C | R | A | C | C |
| Change prompt / model version | I | I | C | A | C | R |
| Monitor daily queue / accuracy | I | R | A | I | C | C |
| Propose promotion / demotion | I | C | R | A | C | C |
| Own outcome of posted match | — | R | A | I | I | I |

**Note:** The agent column may be **R** for task execution but never **A** for the business outcome.

---

## 4. Exception handling RACI

| Activity | Triage (04) | Specialist agents (05–09) | AP Specialist | AP Manager | Buyer / Receiver | Supplier contact | Controller |
|---|---|---|---|---|---|---|---|
| Classify & route exception | R | I | C | A | I | I | I |
| Resolve GR missing | C | R (05) | R | A | R | I | I |
| Resolve PO quality defect | C | R (06) | C | A | C | I | C |
| Obtain approval / DOA | C | R (07) | C | A | C | I | A (policy) |
| Supplier discrepancy correspondence | C | R (08) | R | A | I | C | I |
| Internal chase (coding, receipt, approve) | C | R (09) | R | A | R | I | I |
| Approve policy exception / write-off path | I | I | C | R | I | I | A |
| Close exception case | C | C | R | A | I | I | I |

---

## 5. Payment and treasury RACI

| Activity | Agent 12 | AP Specialist | AP Manager | Treasury | Controller | Internal Audit |
|---|---|---|---|---|---|---|
| Build / refresh payment proposal | R (prepare) | C | A | C | I | I |
| Review anomalies on proposal | R | R | A | C | I | I |
| Authorize payment run | — | C | C | R | A | I |
| Release bank file / payment instruction | — | I | I | R | A | I |
| Investigate payment incident | C | R | A | R | A | C |
| Approve recovery / reclaim | I | C | C | R | A | I |

---

## 6. Change, release, and model RACI

| Activity | Prompt Steward | Tech Owner | AP Manager | Controller | Security | Audit |
|---|---|---|---|---|---|---|
| Draft prompt/policy change | R | C | C | A | C | I |
| Risk assess change class | C | R | C | A | C | C |
| Execute UAT | C | C | R | A | I | I |
| Security / injection test | C | C | I | I | R | I |
| Approve production promote | C | R | C | A | C | I |
| Monitor post-release window | R | R | A | I | C | I |
| Rollback decision | C | R | C | A | C | I |

---

## 7. Responsibility progression RACI

| Activity | AP Manager | Controller | Audit | Prompt Steward | Steering | Agent 16 |
|---|---|---|---|---|---|---|
| Assemble promotion evidence pack | R | A | C | C | I | R (assist) |
| Challenge metrics / vanity risk | C | A | R | C | I | I |
| Approve move L1→L2 | R | A | C | C | I | I |
| Approve move L2→L3 | R | A | C | C | C | I |
| Approve move to L4 | C | A | C | C | R | I |
| Demote on KPI/control breach | R | A | C | C | I | R (enforce) |
| Quarterly L3/L4 attestation | C | A | C | C | I | I |

---

## 8. Meeting RACI (operating rhythm)

| Forum | Chair (A) | Required R/C | Informed |
|---|---|---|---|
| Daily AP Agent stand-up | AP Manager | Specialists (R), Tech on-call (C) | Controller (I, exceptions only) |
| Weekly performance review | AP Manager | Prompt Steward (C), Tech (C) | Controller, Steering summary |
| Monthly control & risk | Controller | AP Manager (R), Audit (C), Security (C) | Steering |
| Steering committee | CFO / VP Finance (or delegate) | Controller (R), AP Manager (R) | Audit, IT |
| Autonomy board (if L4) | Controller | Audit (C), Treasury (C), AP Manager (R) | Steering |

---

## 9. RACI quality checklist

- [ ] One Accountable human per activity  
- [ ] Agent never Accountable for money movement or control attestation  
- [ ] Consulted parties can actually block on risk (Audit/Security) when required  
- [ ] Informed lists do not substitute for approval  
- [ ] Named individuals updated on joiner/mover/leaver  
- [ ] RACI versioned with effective date  

---

## 10. Related documents

- `Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `Controls/AGENT_CONTROL_MATRIX.md`  
- `Agent_Library/RESPONSIBILITY_MODEL.md`  
- `Templates/MEETING_GUIDE.md`
