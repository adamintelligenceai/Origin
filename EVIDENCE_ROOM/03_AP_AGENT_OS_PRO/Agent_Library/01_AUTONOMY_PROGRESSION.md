# Autonomy Progression

**Purpose:** Define how AP agents move from observation to managed autonomy — and why **full autonomy is never the default**.

---

## What / Why

Autonomy without evidence creates payment, control, and reputational risk. Evidence Room uses a five-level ladder (0–4). Each level has explicit rights, prohibited actions, graduation criteria, and rollback triggers.

**Governing rule:** Start every agent at Level 0 for each legal entity / process scope. Raise one level at a time. Require human owner + Controller/CFO sign-off for L3+; board/CFO for L4.

---

## Autonomy levels (0–4)

| Level | Name | Agent may | Agent must not | Human role |
|---|---|---|---|---|
| **0** | Observe | Read data; score; log; produce shadow recommendations | Write to ERP; contact vendors; route approvals; change masters | Compare agent vs human; calibrate |
| **1** | Recommend | Publish recommendations to human queues; draft messages for review | Execute writes; send external communications unattended | Accept / reject / edit |
| **2** | Act with confirmation | Execute low-risk actions after explicit human confirm, or within pre-approved micro-rules | Expand beyond confirmed scope; authorize payment | Confirm each action or batch |
| **3** | Bounded act | Act inside hard bounds (amount, vendor class, entity, exception type, time window) with post-sampling | Exceed bounds; payment auth; irreversible master-data change without dual control | Sample review; exception override |
| **4** | Managed autonomy | Operate within a published charter with continuous monitoring and kill-switch | Operate without monitoring, charter, or human escalation path | Oversight, audit, instant revoke |

### Payment authority — fixed rule (all levels)

**No agent authorizes payment.** A12 may propose, hold, or flag. Bank file approval, payment release, and treasury confirmation remain human (or human-controlled system of record with SoD).

---

## Rights matrix by level

| Capability | L0 | L1 | L2 | L3 | L4 |
|---|---|---|---|---|---|
| Read invoices / PO / GR / vendors | Y | Y | Y | Y | Y |
| Write extraction draft to staging | — | Draft | Confirm | Bounded | Bounded |
| Post invoice to ERP | — | — | Confirm | Bounded* | Bounded* |
| Send supplier email | — | Draft | Confirm | Bounded | Bounded |
| Route approval workflow | — | Recommend | Confirm | Bounded | Bounded |
| Create payment proposal | — | Draft | Confirm | Bounded | Bounded |
| Approve / release payment | — | — | — | — | — |
| Change vendor bank details | — | — | — | Dual control only | Dual control only |
| Change autonomy policy | — | — | — | — | Human only |

\*Posting bounds typically: amount ≤ threshold, trusted vendor tier, no anomaly flags, match = clean.

---

## Graduation criteria (minimum packet)

Every promotion requires a **Graduation Packet** retained as audit evidence:

1. **Scope definition** — entity, invoice channels, vendor classes, currencies, amount bands.
2. **Baseline metrics** — human baseline for the same scope (cycle time, error rate, exception mix).
3. **Accuracy** — field / decision accuracy ≥ policy threshold for ≥ N consecutive weeks (default: 4).
4. **False outcomes** — FP/FN within agreed bands for that agent’s primary decision.
5. **Control tests** — preventive & detective controls passed (see Control Matrix).
6. **Cost** — unit cost per case within budget; no unexplained spike.
7. **Failure drills** — kill-switch and fallback queue tested.
8. **SoD review** — no agent role creates incompatible duties.
9. **Human owner sign-off** — named individual.
10. **A16 policy version bump** — orchestrator config updated and logged.
11. **Controller/CFO approval** — required for L3; CFO + risk for L4.
12. **Rollback plan** — one-click demotion criteria documented.

### Suggested default thresholds (tune per client)

| Metric | L0→L1 | L1→L2 | L2→L3 | L3→L4 |
|---|---|---|---|---|
| Decision acceptance / accuracy | ≥90% | ≥95% | ≥97% | ≥98% + stability |
| Material error rate | Track only | ≤2% | ≤1% | ≤0.5% |
| Sampling coverage | 100% shadow | ≥50% of acts | ≥20% | Continuous monitors + ≥5% sample |
| Weeks at prior level | — | ≥4 | ≥8 | ≥12 |
| Critical control fails | 0 open | 0 open | 0 open | 0 open |

These are **starting points**, not universal truth. Client risk appetite overrides.

---

## How graduation works (process)

```text
Propose promotion → Build packet → Control test → Owner review
        → Controller/CFO (L3+) → A16 policy update → Pilot window
        → Confirm or rollback
```

1. Agent owner proposes promotion with metrics.
2. Internal Audit / control owner validates evidence.
3. Approver signs (level-dependent).
4. A16 updates autonomy ceiling for that agent × scope.
5. Pilot for defined period with heightened sampling.
6. Confirm permanent ceiling or demote.

---

## Demotion / rollback triggers

Demote **immediately** (A16 kill-switch or human) when any of:

- Material mis-post or near-miss payment
- SoD or access control breach
- Accuracy below demotion threshold for 2 consecutive measurement windows
- Cost per case > 150% of budget without approved override
- Vendor / data quality collapse in scope
- Regulatory or audit finding tied to agent action
- Human owner requests pause

Demotion is **one level at a time** unless severity warrants drop to L0/L1.

---

## Never default to full autonomy

| Anti-pattern | Correct practice |
|---|---|
| “AI handles AP end-to-end” | Explicit ceilings per agent |
| Vendors sell L4 as day-one | Day-one = L0/L1 |
| One global autonomy setting | Autonomy is per agent × entity × amount band |
| Silence after go-live | Continuous KPI + cost + control monitoring |
| Treating A10 alerts as proven fraud | Signals only; investigate |

---

## Who

| Decision | Owner |
|---|---|
| L0–L1 promotion | Agent Human Owner + AP Manager |
| L2 promotion | AP Manager + Controller |
| L3 promotion | Controller + CFO (or delegate) |
| L4 promotion | CFO + Risk/Audit; documented charter |
| Emergency demotion | Any of: AP Manager, Controller, Security, A16 operator |

---

## What can go wrong

- Premature L3 on high-variance invoice types
- Graduation based on vanity volume metrics instead of decision quality
- Policy config drift between environments
- Orphaned agents still at high autonomy after process change

**Control:** Graduation packets, A16 versioning, quarterly autonomy attestation.  
**Measure:** % agents at each level; demotions; material incidents per autonomy-hour.  
**Evidence:** Packets, policy diffs, sampling logs, incident tickets.

---

## Related

- Stack: `00_AGENT_STACK_OVERVIEW.md`
- Methodology: `../Process_Mapping/00_METHODOLOGY.md`
- Governance: `../Governance/00_GOVERNANCE_FRAMEWORK.md`
- Controls: `../Controls/00_AGENT_CONTROL_MATRIX.md`
