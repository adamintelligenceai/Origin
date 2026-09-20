# AP Team Training — AP Agent OS Team

**Evidence Room** · Team · Training  
**Audience:** AP processors, team leads, exception specialists  
**Duration:** 2.5 hours core (+ 45 min manager module)  
**Prerequisite:** Workshop decision log OR approved pilot charter

## Learning objectives

By the end, participants can:

1. Explain earn-up stages in plain language  
2. Confirm / reject agent recommendations with evidence discipline  
3. Identify forbidden agent actions (payment release, bank change, silent override)  
4. File an exception with taxonomy codes  
5. Escalate demotion triggers without blame  

**Not in scope:** Prompt engineering deep-dives, ERP configuration, guaranteed productivity claims.

## Brand & claims

- Tagline: *Agents that earn responsibility.*  
- Colors for slides/handouts: ink `#0B1F2A`, paper `#F7F4EE`, amber `#C47A2C`, teal `#1F5C5C`  
- Industry context only if asked: Ardent 2025 cost **$9.84**, exception **18.4%**, STP **35.4%** — not our results  

---

## Module map

| Module | Minutes | Audience |
|---|---|---|
| 0 — Context & safety | 15 | All |
| 1 — Earn-up stages | 25 | All |
| 2 — Day-in-the-life with agents | 30 | Processors + leads |
| 3 — Exceptions & evidence | 30 | All |
| 4 — Scenarios (practice) | 35 | All |
| 5 — Tools & escalation | 15 | All |
| M — Manager module | 45 | Leads+ | 

---

## Module 0 — Context & safety (15 min)

**Talking points**

- Agents assist; humans remain accountable  
- This complements Coupa/Tipalti/SAP/etc. — it does not replace them  
- AI can be wrong — verification is the job  

**Activity:** Pair share — “One invoice that would fool a careless agent.”

**Knowledge check**

| # | Question | Answer key |
|---|---|---|
| 1 | May an agent release payment in Team default method? | No |
| 2 | What must every production agent have? | Named human owner + stage + evidence standard |

---

## Module 1 — Earn-up stages (25 min)

| Stage | Agent does | You do |
|---|---|---|
| Observe | Summarize / flag | Decide everything |
| Recommend | Propose match/route/code | Explicit approve/reject |
| Draft | Prepare email or pack | Send / post |
| Execute (narrow) | Micro-action in approved envelope | Own outcome; sampled QA |
| Expand | Broader class after gates | Board promotion only |

**Drill:** Sort 10 example actions onto stage cards (handout).

---

## Module 2 — Day-in-the-life (30 min)

Walk one domestic PO invoice through:

1. Intake enrichment (Observe/Recommend)  
2. Validation flags  
3. Match proposal  
4. Exception triage note  
5. Human confirm  

**Emphasize:** If the agent path is harder than the workaround, adoption fails — raise UX friction as a defect.

---

## Module 3 — Exceptions & evidence (30 min)

**Teach**

- Taxonomy codes from workshop (paste client list)  
- Evidence pack minimum fields  
- How to challenge an agent without “fighting the machine”

**Evidence minimum**

| Field | Why |
|---|---|
| Invoice ID / case ID | Trace |
| Agent name + version | Reproducibility |
| Stage | Authority check |
| Inputs referenced | Audit |
| Output summary | Review |
| Human decision | Accountability |
| Timestamp | Sequence |

---

## Module 4 — Scenarios (35 min)

Work in pairs. For each scenario: stage allowed? action? escalate?

### Scenario A — Clean PO match under threshold  
Agent recommends match. GR present. Amount within tolerance.  
**Expected:** Confirm if charter allows Recommend; still human confirm at this training stage.

### Scenario B — Vendor email requests bank change  
Agent drafts reply.  
**Expected:** Stop. Bank change is HARD GATE. Human dual-control process only. Agent must not “helpfully” update master data.

### Scenario C — Duplicate signal  
Duplicate/Anomaly agent flags possible duplicate.  
**Expected:** Investigate; do not treat as proven fraud; document disposition.

### Scenario D — Agent confidence high, processor uneasy  
**Expected:** Reject with reason code; feed Evidence Room; do not rubber-stamp.

### Scenario E — Payment proposal list  
**Expected:** Recommend-only review aid; release remains human/treasury path.

---

## Module 5 — Tools & escalation (15 min)

| Event | Escalate to | SLA (set locally) |
|---|---|---|
| Suspected unsafe action | Kill-switch owner | Immediate |
| Repeated wrong recommendations | AP lead | 24–48h |
| Tool outage | IT + AP lead | Same day |
| Stage promotion request | Charter board | Cadence |

**Kill-switch drill:** Who pulls it, how, what gets logged.

---

## Manager module (45 min)

1. Reading the weekly agent performance report  
2. Promotion / demotion decision hygiene  
3. Coaching processors who over-trust vs under-trust agents  
4. Metric gaming risks  
5. Comms to adjacent teams (Procurement, Warehousing)  

**Manager exercise:** Given a fake weekly report with rising throughput and falling sample pass rate — decide promote / hold / demote.

---

## Training roster & attendance

| Name | Role | Module set | Date | Pass Y/N |
|---|---|---|---|---|
| | | Core / Core+Mgr | | |

**Pass rule:** Complete scenarios + knowledge check ≥80% and verbal kill-switch answer correct.

## Post-training (7 days)

- [ ] Shadow-mode buddies assigned  
- [ ] First evidence pack reviewed in huddle  
- [ ] FAQ living doc started  
- [ ] Feedback themes to programme lead  

## Handouts to print

1. Stage card  
2. Forbidden actions card  
3. Evidence field checklist  
4. Scenario pack  
5. Disclaimer footer on all pages  

---

*Evidence Room — Agents that earn responsibility.*  
*Not a certification of competency for unsupervised Execute-stage work.*
