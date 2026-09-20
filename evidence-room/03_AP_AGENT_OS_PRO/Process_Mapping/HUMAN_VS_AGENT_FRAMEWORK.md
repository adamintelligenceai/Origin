# Human vs Agent Framework

**Evidence Room — AP Agent OS Pro**  
**Document type:** Design standard  
**Doctrine:** Humans own outcomes. Agents earn scope. Money movement fails closed.

---

## 1. Purpose

Provide a consistent way to decide what work stays human, what agents may observe/recommend/prepare/execute, and how that changes as evidence accumulates.

Aligns to Responsibility Levels L0–L4 in `Agent_Library/RESPONSIBILITY_MODEL.md`.

---

## 2. Decision dimensions

Score each process step (illustrative 1–5):

| Dimension | Low (favor human) | High (favor agent assist) |
|---|---|---|
| Rules clarity | Ambiguous judgment | Clear policy |
| Data availability | Missing/unstructured | SoR complete |
| Error cost | Critical $ / fraud / compliance | Low reversible |
| Frequency | Rare | High volume |
| Explainability need | Audit-heavy | Routine |
| External commitment | Binding promises | Internal only |

**Heuristic:** If error cost is Critical, agent ceiling ≤ L1 unless formal L3/L4 charter with Audit.

---

## 3. Work class table (AP canonical)

| Work class | Default human role | Default agent band | Notes |
|---|---|---|---|
| Invoice capture & classify | Sample QA | L0–L2 | Abstain on low confidence |
| Field extraction correction | Correct critical fields | L1 suggest | Human below threshold |
| Tax determination | Tax owns policy | L1–L2 suggest | Abstain complex |
| 2-/3-way match within tolerance | Sample | L1–L3 fenced | Tolerance = control |
| Variance above tolerance | Decide | L1 recommend | DOA human |
| Create goods receipt | Authorize | L1–L2 prompt | Auto-GR rare |
| Approve invoice | Approve | L2 pack/route only | No self-approve |
| Supplier commercial email | Send/approve send | L2 draft | Templates only |
| Internal chase | Respond | L2–L3 remind | Throttle fatigue |
| Duplicate adjudication | Confirm | L1–L2 score/hold | Not fraud verdict |
| Vendor bank change | Dual control | L0–L1 detect/hold | Never agent approve |
| Payment authorization | Authorize | L1–L2 review | Default no L3 release |
| Bank file release | Release | Observe/review | Human |
| Accrual posting | Approve | L2 propose | Controller materiality |
| Control attestation | Attest | Assemble evidence | Human signs |
| Autonomy ceiling change | Approve | Orchestrator enforce | Dual approval |

---

## 4. Split pattern (swimlane language)

Use in maps:

| Lane | Meaning |
|---|---|
| **Human decides** | Judgment, approval, policy exception |
| **Human executes** | Manual SoR action still required |
| **Agent observes** | L0 metrics/signals |
| **Agent recommends** | L1 accept/reject |
| **Agent prepares** | L2 draft/stage |
| **Agent executes (fenced)** | L3 allow-list |
| **Stop / escalate** | Hard stop conditions |

---

## 5. Promotion posture by domain

| Domain | Typical start | Realistic mid | Rare ceiling |
|---|---|---|---|
| Intake/classify | L0–L1 | L2 | L3 micro |
| Validation | L0–L1 | L2 | L3 fenced |
| Matching in tolerance | L1 | L2–L3 | L3 |
| Exception triage | L1 | L2–L3 routing | L3 |
| GR chase | L1 | L2 | L3 auto-GR (charter) |
| Approval | L1 | L2 | — (approve stays human) |
| Payment review | L1 | L2 | L4 only with formal board |
| Orchestration | L1 | L2–L3 enforce | — |

---

## 6. Collaboration patterns

1. **Recommend → Accept** — default steady state.  
2. **Prepare → Release** — correspondence, packs, proposals.  
3. **Execute → Sample** — L3 with detective sampling.  
4. **Detect → Hold → Human** — duplicates, bank changes.  
5. **Draft RCA → Human owns CAR** — Agent 15.  

Anti-pattern: agent and human both edit the same invoice without sequence (collision) — Orchestrator must serialize.

---

## 7. Challenge culture

Agents fail when humans stop challenging. Require:

- Documented overrides with reasons  
- Periodic “disagree drills” on gold cases  
- QA of accepted high-confidence recommendations (not only rejects)  

Rubber-stamping is a control failure.

---

## 8. Facilitation worksheet (per step)

| Step name | Error cost | Rules clear? | Proposed band | Human Accountable | Stop condition |
|---|---|---|---|---|---|
| | | | | | |

Attach completed worksheet to agent charter.

---

## 9. Related documents

- `METHODOLOGY_10_STEPS.md`  
- `EXCEPTION_DECISION_TREES.md`  
- `Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `Agent_Library/RESPONSIBILITY_MODEL.md`
