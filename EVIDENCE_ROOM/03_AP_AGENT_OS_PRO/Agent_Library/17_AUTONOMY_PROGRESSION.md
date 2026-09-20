# 17 — Autonomy Progression

**Product:** Evidence Room / AP Agent OS  
**Line:** Agents earn responsibility. Evidence decides.  
**Owner:** AP Manager + Controls  
**What you should do:** Promote one **agent × legal entity × invoice slice** at a time. Never promote "the stack."

Full autonomy is not the default. Every agent starts at **L0 Observe**. A promotion is a control change with evidence, a named approver, a sampling plan, and a way back down.

---

## The five levels

| Level | Name | What changes | What does not change |
|---|---|---|---|
| **L0** | Observe | The agent writes a shadow file: what it would have done, with evidence. Operators do not work from it. | Live ERP, mail, queues |
| **L1** | Recommend | Operators see the recommendation and the evidence pack. They decide and they act. | Drafts and posts |
| **L2** | Prepare | The agent fills the parked document, draft email, or workflow item. A human submits or sends. | Commit / send / post |
| **L3** | Execute within guardrails | The agent commits only when **all** published gates pass. Everything else stays L2. | Human classes; gates themselves |
| **L4** | Managed autonomy | Broader execute inside a published scope, with sampling, a live kill-switch, and a daily exception review. | Human classes; kill-switch authority |

L4 is not "unattended AP." It is L3 with a wider slice and a harder operating rhythm. Payment release, vendor bank-change, policy exceptions, and legal disputes **never** enter L3 or L4 decision rights. See `18_HUMAN_VS_AGENT_DECISION.md`.

---

## How you promote

### Unit of promotion

```
agent_id × company_code (or legal entity) × slice
```

A **slice** is a documented subset, for example:

- Channel: mailbox PDF / EDI / portal
- Document: PO invoice / non-PO / credit
- Vendor set: named list or "existing vendors only"
- Amount: below a published cap
- Plant or purchasing org

Promoting Agent 03 for domestic stock POs under a cap does **not** promote Agent 03 for service POs.

### People

| Role | Does |
|---|---|
| Agent human owner | Proposes promotion; supplies the evidence pack |
| AP Manager | Accepts or rejects; owns the operating risk |
| Controls | Confirms the measurement, sampling, and SoD still hold |
| Table owner (Tax, Procurement, Warehouse, Treasurer) | Signs if their table or risk is in play |
| Orchestrator config | Updated **after** signatures; the model cannot update it |

### Evidence pack (required)

1. **Scope statement** — agent, entity, slice, current level, proposed level.
2. **Volume** — cases in the measurement window (your window; do not invent a standard length).
3. **Accuracy** — the agent's primary KPI vs a human or vs ERP truth, with the method (sample or full).
4. **Misses** — every known miss in the window, with impact (wrong entity, false match, missed duplicate).
5. **False positives / rework** — human reject or edit rate.
6. **Control incidents** — zero expected for promotion; if any, stop.
7. **Cost** — inference + exception minutes.
8. **Gates** that will apply at the new level (amount, vendor, code, confidence, Agent 10 clear, etc.).
9. **Sampling plan** at the new level.
10. **Rollback** — who turns the ceiling down, and the kill-switch test date.

If a number is a target rather than a measured value, label it **TARGET**. If it is an example in this library, it is **ILLUSTRATIVE**. Production packs use your ledger.

### Gates to move up

These are **design gates**. Set the numeric thresholds from your own samples. Do not copy illustrative figures into a control policy as if they were norms.

| From → to | Minimum evidence |
|---|---|
| **L0 → L1** | Shadow file exists; field/decision completeness known; owner can read a miss log; no live-queue use |
| **L1 → L2** | Accept rate on recommendations measured; packet standard met; rework reasons classified; draft API in a park status only |
| **L2 → L3** | Rework rate measured; residual error on a sample of what *would* have executed; gates written as config (not prompt text); Agent 10 execute-ready if the agent can post; kill-switch drill done; SoD reviewed |
| **L3 → L4** | Sustained L3 window with sample results; no control incidents; sampling plan for the wider slice; daily review owner named; Treasurer sign-off if the agent touches payment proposals (holds only) |

**Refuse promotion** if: Agent 10 cannot run; packet `evidence_refs` are incomplete; the owner wants to "skip L2"; the slice is "all invoices"; a human class is in the proposed execute set.

---

## How you downgrade and stop

| Trigger | Action |
|---|---|
| Control incident (wrong post, supplier concession sent, GR without evidence, near-duplicate paid) | Immediate ceiling to L1 or L0 for that slice; incident review |
| Kill-switch | Orchestrator propagates; specialists behave as L0/L1 as set |
| Sample fail | Ceiling −1 until a new pack |
| Cost-envelope thrash | Stop the case; if clustered, ceiling −1 |
| Owner absence (no reviewer for L2 drafts) | Do not "compensate" with L3; stay L1 or pause the slice |
| Agent 10 down | Execute-level 02/03/12 stop (fail closed) |

Downgrade does not need the full promotion pack. It needs a reason code and a config write. Raising again needs a new pack.

---

## Sampling (L3 and L4)

- Every executed case is **eligible**.
- Sample rate is set per agent charter (higher for GR posts, payment holds, first weeks of L3).
- Sampler is a human who did not clear the same case.
- Findings: `agree` / `agree-with-edit` / `disagree-control` / `disagree-quality`.
- `disagree-control` is an incident.

Sampling is how you prove L3 works. Volume of execution is not proof.

---

## What "confidence" is allowed to do

Confidence may **stop** an execute (fall back to L2).  
Confidence may **not** widen a tolerance, skip Agent 10, skip DoA, or clear a human-class reason code.

Publish how confidence is computed (rule-pass count, extractor scores). If you cannot explain it, do not gate on it — gate on rules only.

---

## Suggested first promotions (not a mandate)

A safe order for a first entity:

1. **01 Intake** L0→L1→L2 (park cases).
2. **10 Duplicate** L0→L1→L2 holds on exact rules.
3. **16 Orchestrator** L1→L2 assignment.
4. **02 Validation** L1→L2 on PO invoices.
5. **03 Matching** L1→L2 park on 3-way stock POs.
6. **04 Triage** L1→L2 proposed queues.
7. Then **09** and **08** at L2 (send-gate on).
8. **12** stays L1 (or L2 prepare) until the Payments Lead asks. L3 holds are optional and late.
9. **05 / 06 / 07 / 11 / 13 / 14 / 15** follow their charters; several should stay at L1/L2.

Do not L3 Agent 05 (GR post) to "help" Agent 03. That hides receiving problems and creates inventory noise.

---

## Config record (store outside the model)

| Field | Example shape |
|---|---|
| `agent_id` | `03_matching` |
| `legal_entity` | `DE01` |
| `slice_id` | `stock-po-3way-mailbox` |
| `ceiling` | `L2` |
| `gates` | amount cap, vendor set, codes allowed |
| `effective_from` | timestamp |
| `approved_by` | user IDs |
| `evidence_pack_uri` | |
| `sample_rate` | |
| `kill_switch` | `off` |

The Orchestrator reads this. Specialists do not write it.

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) wants Agent 03 at L3 for `DE01`, stock POs, 3-way, mailbox, existing vendors, gross below a published cap.

**They may promote when** (shape, not a norm): a measured L2 window shows park drafts the PO desk accepts; a sample of "would have executed" cases has no false match; tolerances are the ERP table, not a new table; Agent 10 exact rules are on; kill-switch drill completed; Controls signed.

**They stay at L2 if** service POs, multi-PO invoices, or incidental freight are still in the same slice — split the slice first.

**They roll back if** a sampled L3 post used a reversed GR or converted 3-way to 2-way because GR was missing.

---

## How you measure progression

| Question | Metric |
|---|---|
| Are we earning it? | Packs approved / packs proposed |
| Are we honest? | Downgrades and kill-switch events |
| Are we sampling? | Sampled executes / executes |
| Are we leaking? | Executes above ceiling (target zero) |

---

## What can go wrong

- Silent upgrade inside a prompt ("just post it").
- One ceiling for all entities.
- L3 on Friday before a payment run without a sample.
- Promoting 08 send-gate off to "clear the queue."
- Calling L4 "autonomous AP" in a steering pack.

---

## How you control it

- Config outside the model.
- Two signatures (AP Manager + Controls) for L2→L3 and L3→L4.
- Kill-switch operable if the model is down.
- This document is the only promotion method.

Proof before permission.
