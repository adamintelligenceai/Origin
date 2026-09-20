# Evidence Room — AP Agent OS Professional

## Governance — 01 Autonomy Policy

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Governance  
**Standard:** Proof before permission. Responsibility is earned.  
**Audience:** Head of AP, Controller, CFO / Finance Director, Control owner, Finance Systems, AP Manager  
**Examples:** ACME Industrial Holdings — **ILLUSTRATIVE** only.  
**Version:** 1.0  
**Classification:** Binding. No autonomy level is a default reward for buying software.

---

### Purpose

Define the five autonomy levels, what each may do, what evidence promotes or demotes, and the one-increment rule. This policy is the only authority for an agent to act beyond reading and writing evidence.

---

## 1. What to do

Assign every agent a current level (L0–L4), a scope allow-list, and a written exclusions list. Change level or scope only through this policy plus `02_RELEASE_AND_CHANGE.md`.

Default for a **new** agent: **L0** or **L1**. L3/L4 require a signed measurement pack and, for payment-adjacent work, CFO / Finance Director acknowledgement.

---

## 2. How — the ladder

| Level | Name | Agent may | Agent must not | Typical Evidence Room use |
|---|---|---|---|---|
| **L0** | Observe | Read approved sources; write observations to the evidence store | Recommend to operators as if actionable; send; post; change status | First days; new model; new entity |
| **L1** | Recommend | L0 + produce a recommendation on the work item for a human | Execute; send external mail; imply the human should rubber-stamp | Classification, match explanation, duplicate flags |
| **L2** | Prepare | L1 + draft artefacts (mail, park payload, report) held for human release | Release, send, post, or approve | Supplier/internal drafts, close lists, report packs |
| **L3** | Execute within guardrails | L2 + execute **listed** low-risk verbs inside allow-list and value cap | Any unlisted verb; anything on the exclusion list; widen its own cap | e.g. send a **template** chaser to a **named** requester role after promotion |
| **L4** | Managed autonomy | L3 + operate the listed verbs with exception-based human review | Change its autonomy, entitlements, validators, or other agents; money movement; bank-data writes | Only after repeated Measure packs. Still exception-supervised |

**Money movement** (payment release, bank-file generation, vendor bank change) remains human-controlled at all levels. An agent may **review** a proposal (Payment Proposal Review Agent) but does not authorise.

**Deterministic automation** (exact key match, arithmetic tolerance against a **documented** threshold) is not “L4.” It is a controlled system rule. It still needs an owner, tests and logs. Do not launder a model into that path.

### 2.1 Scope dimensions (orthogonal to level)

Level is not scope. Scope is the allow-list:

- Legal entity  
- Channel  
- Invoice type (PO, non-PO, credit note, intercompany, …)  
- Supplier segment  
- Exception codes  
- Value cap (document currency and/or group currency — buyer defines)  
- Recipient classes for outbound mail  
- Verbs  

Promotion may change **either** level **or** one scope dimension (`00_METHODOLOGY.md` Step 10).

### 2.2 Promotion evidence (minimum)

Buyer may add gates. Buyer sets numeric thresholds. Do not copy ACME numbers as targets.

| From → to | Minimum evidence |
|---|---|
| New → L0 | Signed charter; identity with read + write-evidence; privacy review |
| L0 → L1 | Shadow or historical Test: outputs schema-valid; no execution events; human can use recommendations without privilege escalation |
| L1 → L2 | Measure pack on recommendation quality (accuracy / FPR / FNR per dictionary); draft QA on a sample (no invented facts); fallback tested |
| L2 → L3 | Controlled Pilot of **prepare** successful; validators live; override log healthy (not the normal path); listed verbs technically enforced; no open Critical incident |
| L3 → L4 | Repeated Measure packs covering at least `[BUYER: n cycles]`; residual high-risk FNR reviewed; Internal Audit informed; CFO / FD acknowledgement if payment-adjacent or external-send at scale |

Same-level **scope** expansion: a Test pack for the new slice + a sized Shadow if the slice is operationally new (new entity, new channel, new exception family).

### 2.3 Demotion and freeze

| Trigger | Action |
|---|---|
| Critical incident involving the agent | Immediate disable or drop to L0; incident process |
| Runtime hash ≠ approved release | Freeze execution verbs |
| FNR on a high-risk code above the buyer’s gate for `[BUYER n]` periods | Drop at least one level or remove that code from scope |
| Override/force-path used as the operating model | Freeze L3+; redesign |
| Unapproved model or workflow change | Freeze; release review |
| Accountable incumbent left, no deputy cert | Freeze until recertified |

Demotion does not require a full change board if used as containment. It requires a ticket within 24 hours.

### 2.4 One-increment rule

A single change record may include **one** of:

1. +1 autonomy level, scope unchanged  
2. Level unchanged, +1 legal entity **or** +1 channel  
3. Level unchanged, +1 exception-code family  
4. Level unchanged, a **documented** value-cap increase  

Forbidden in one change: level-up + broader scope + higher cap + model change.

### 2.5 Charter fields (minimum)

```
Agent name / ID:
Accountable (role + incumbent):
Responsible supervisor:
Current level:
Scope allow-list:
Verbs allowed:
Exclusions (mandatory, non-empty):
Systems and identity:
Model / prompt / workflow hashes:
Validators required:
SoD notes:
Privacy notes:
Promotion gates (dictionary IDs + buyer thresholds):
Demotion triggers:
Related control-matrix rows:
RACI version:
SOP version:
```

---

## 3. Who

| Decision | Accountable | Must approve | Informed |
|---|---|---|---|
| Set L0/L1 | Head of AP | Control owner, FinSys (identity) | Internal Audit (catalogue) |
| Set L2 | Head of AP | Control owner | Controller |
| Set L3 | Head of AP | Control owner, FinSys | Controller; Treasury if send/payment-adjacent |
| Set L4 | CFO / Finance Director | Head of AP, Control owner | Internal Audit, Treasury if relevant |
| Demote / disable (containment) | Head of AP | — (FinSys executes) | Control owner, Controller |
| Payment-release verb on any agent | **Not permitted** | — | — |

---

## 4. What can go wrong

| Failure | Why it matters |
|---|---|
| L3 granted at design time | No evidence; first errors are live |
| Level raised because a demo impressed a sponsor | Governance theatre |
| Scope described as “all AP” | Unenforceable |
| Exclusions blank | Untestable |
| L4 sold as “full autonomy” | Contradicts this OS; residual human duty remains |
| Orchestrator can promote other agents | Privilege escalation |
| Model change slipped into a promotion | Confounded evidence |

---

## 5. Control

- Charter gate (complete fields, human A, non-empty exclusions, no payment-release verb).  
- Technical verb/cap enforcement or documented residual risk keeping the agent ≤ L1.  
- Promotion checklist: Measure pack ID, one-increment, hashes unchanged unless a separate release.  
- Monthly hash/entitlement reconciliation.  
- Orchestrator exclusions: cannot edit charters, entitlements, or validators.

---

## 6. Measure

Use dictionary IDs; do not invent parallel metrics.

| Question | Dictionary / count |
|---|---|
| Is the agent correct enough to promote? | Classification / extraction / matching accuracy, FPR, FNR |
| Is it still supervised? | Human intervention rate; override rate; escalation rate |
| Is L3 creating silent damage? | Control breaches; audit exceptions; rework rate; duplicate payments prevented (only if measurable) |
| Is scope honest? | Volume outside allow-list (must be zero actions) |

Activity metrics (invoices handled) **do not** justify promotion.

---

## 7. Evidence

- Charter versions  
- Promotion / demotion records  
- Measure packs cited  
- Identity entitlement sheets  
- Stored under `[BUYER]/Evidence/Expand/` and `[BUYER]/Evidence/Agentise/`

---

## ACME — ILLUSTRATIVE

Goods Receipt Agent lives at **L2** for Plant North inventory POs: it prepares a Teams message to the requester on `EX-GR-001` after a buyer-set wait. Humans send. After two Measure packs the AP Manager asks for L3 **or** to add Plant South — not both. Control owner refuses L3 until injection and “do not email Directors” tests pass. Payment Proposal Review Agent remains L1 indefinitely; nobody requests L3 because the exclusions forbid proposal edits.

---

## Related documents

- `00_GOVERNANCE_FRAMEWORK.md`  
- `02_RELEASE_AND_CHANGE.md`  
- `03_INCIDENT_AND_OVERRIDE.md`  
- `../Process_Mapping/00_METHODOLOGY.md`  
- `../Process_Mapping/04_RACI_STANDARD.md`  
- `../KPI_and_Measurement/01_KPI_DICTIONARY.md`  

---

*End of 01_AUTONOMY_POLICY.md*
