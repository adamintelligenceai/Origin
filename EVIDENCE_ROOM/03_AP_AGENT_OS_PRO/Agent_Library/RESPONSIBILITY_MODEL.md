# Responsibility Model — L0 to L4

**Product:** Evidence Room — AP Agent OS Professional  
**Artifact:** Agent Library · Responsibility & Promotion Model  
**Audience:** CFO, Controller, Head of AP, Risk / Internal Control  
**Version:** 1.0

---

## 1. Purpose

This model defines how AP agents **earn** responsibility. Autonomy is a controlled privilege, not a deployment default. Every agent starts in observation or recommendation; progression requires evidence, scorecard gates, and named human approval. Demotion is mandatory when control performance deteriorates.

Payment authorisation is **out of scope for agent autonomy at every level**.

---

## 2. The five stages

| Level | Name | Agent may… | Human must… |
|-------|------|------------|-------------|
| **L0** | Observe | Read data; score; shadow-log what it *would* do | Operate the live process; review shadow quality |
| **L1** | Recommend | Produce recommendations, drafts, investigation packs | Decide and execute (or explicitly accept draft into system) |
| **L2** | Prepare | Write drafts into work systems within guardrails; auto-handle clear low-risk cases | Approve material / high-risk actions; sample QA |
| **L3** | Execute within guardrails | Execute approved action classes end-to-end inside hard limits | Handle escalations; monitor scorecards; own exceptions outside limits |
| **L4** | Managed autonomy | Operate a bounded domain with exception-only human touch | Set policy; periodic assurance; retain payment & master-bank authority |

### Stage intent (practical)

- **L0** — Prove signal quality without operational risk.  
- **L1** — Prove usefulness to operators; build trust.  
- **L2** — Remove keystrokes on clear cases; keep humans on judgement.  
- **L3** — Scale execution where error rates beat human baseline *and* controls hold.  
- **L4** — Rare; earned; continuously assured; still not “unattended finance.”

---

## 3. Global hard stops (all levels)

Agents **never**:

1. Authorise, release, or transmit payments / bank files.  
2. Unilaterally approve invoices as a DOA approver.  
3. Apply vendor banking / remit-to changes without human enhanced verification.  
4. Delete or suppress audit evidence.  
5. Operate outside the published autonomy registry for that agent.  
6. Retry ambiguous financial creates (duplicate risk) — reconcile first.  
7. Claim fraud detection guarantees or compliance certification.

Violation of a hard stop → immediate fleet write-pause (A16 kill-switch) + Controllership notification.

---

## 4. Promotion criteria (L0 → L4)

Promotion is **per agent, per scope** (entity × channel × category × vendor segment as defined). Do not promote “the stack” as one blob.

### 4.1 Evidence requirements (minimum pack)

Every promotion request includes:

| Evidence | Description |
|----------|-------------|
| Scope definition | Exact population in / out |
| Shadow or pilot log | Volume, dates, environment |
| Confusion matrix / error review | False pos/neg for that agent’s decisions |
| Control incidents | Holds missed, duplicate posts, DOA breaches — ideally zero |
| QA sample worksheets | Re-performance by humans |
| Cost profile | Unit cost vs baseline process cost (informational) |
| Failure drills | Kill-switch, auth failure, ambiguous write tested |
| Owner sign-offs | Agent human owner + Head of AP (+ Controller for ≥L3) |
| Rollback plan | How to demote in <1 hour |

### 4.2 Gate table

| From → To | Minimum run | Quality gates (illustrative defaults — tune, don’t invent fake %) | Approvers |
|-----------|-------------|-------------------------------------------------------------------|-----------|
| **→ L0** | N/A | Connector read-only certified; logging on | AP Systems + Agent owner |
| **L0 → L1** | ≥2 weeks shadow or ≥500 cases | Shadow agreement with expert on critical fields ≥ agreed threshold; no critical control miss in shadow | Agent owner + Head of AP |
| **L1 → L2** | ≥4 weeks L1 | Human accept rate of recommendations stable; false-pass/fail within limit; SOP updated | Agent owner + Head of AP + Controls |
| **L2 → L3** | ≥8 weeks L2 | Critical control incidents = 0 in period; QA sample pass; residual risk accepted | Head of AP + **Controller** |
| **L3 → L4** | ≥1–2 quarters L3 | Sustained gates; external/internal audit comfort letter or equivalent review; continuous sampling plan live | Controller + CFO (or designate) + Head of AP |

Materiality: high-risk agents (A10, A12, A07, A08 banking-adjacent) require **stricter** gates and earlier Controller involvement — typically Controller co-sign from L2→L3 onward, and L4 may be disallowed for A12 authorisation-adjacent paths (A12 max meaningful autonomy is prepared drafts; authorisation stays human).

### 4.3 Scorecard gates (standard dimensions)

Use one scorecard per agent-scope:

| Dimension | What “good” means | Demotion if… |
|-----------|-------------------|--------------|
| **Accuracy** | Critical error rate within limit | Breach for 2 consecutive review cycles |
| **Control integrity** | Zero missed holds / duplicate creates / DOA violations | Any single critical incident |
| **Completeness** | No silent drops; exceptions opened when needed | Undocumented suppressions found |
| **Timeliness** | SLA for agent cycle time met | Persistent SLA fail without capacity plan |
| **Explainability** | Outputs carry evidence humans can re-perform | “Black box” dispositions rise |
| **Cost discipline** | Unit cost within budget envelope | Unexplained cost spike without value |
| **Security** | Secrets, access, channel hygiene sound | Credential or data-handling incident |
| **Operator trust** | Accept/override rates healthy | Override spike or shadow abandonment |

A16 maintains the scorecard; humans decide promotions.

---

## 5. Demotion triggers

Demote **immediately** (same day) when:

- Critical control failure (e.g., payment-ready item that should have been held).  
- Agent acted above registered autonomy.  
- Ambiguous financial write caused or risked duplicate documents.  
- Security incident involving agent credentials or data exfiltration risk.  
- Hard-stop violation.

Demote **at next governance review** when:

- Accuracy or false-pass metrics breach for two cycles.  
- QA sampling fails material re-performance.  
- Cost exceeds budget without approved exception.  
- Operator trust collapses (override rate beyond threshold).  
- Scope drift (agent used outside certified population).

### Demotion path

```
L4 → L3 → L2 → L1 → L0 (or paused)
```

Skip levels downward if severity warrants (e.g., L3 → L0). Record: trigger, timestamp, who paused, residual cases handling, communications to operators.

---

## 6. Operating cadence

| Forum | Frequency | Focus |
|-------|-----------|-------|
| Agent stand-up | Daily | Stuck cases, stop-conditions |
| Scorecard review | Weekly | Metrics, demotions |
| Autonomy board | Monthly | Promotions, scope expansion |
| Controllership assurance | Quarterly | L3/L4 estate, audit themes |

---

## 7. Mapping to methodology

Align promotions with the Evidence Room method:

Observe → Transcribe → Extract → Structure → Agentise → **Test** → **Shadow (L0)** → **Controlled Pilot (L1–L2)** → **Measure** → **Expand responsibility (L3–L4)**.

No skip from demo theatre to L3.

---

## 8. Registry (maintain in governance)

Maintain a living table:

| Agent | Scope | Level | Since | Next review | Kill-switch tested | Owner |

A16 reads this registry as policy; undocumented autonomy is invalid.

---

## 9. Related artifacts

- Agent charters A01–A16  
- `00_AGENT_STACK_OVERVIEW.md`  
- `Controls/01_EXCEPTION_TAXONOMY.md`  
- KPI Measurement pack (Professional)

---

*Evidence Room — responsibility is earned, evidenced, and reversible.*
