# AGENT 10 — Duplicate & Anomaly

**Stack position:** Parallel signal on every capture record. Can block Matching recommend-match and Payment Proposal proceed annotations. Does not detect fraud as a guarantee and does not clear its own flags.  
**Default autonomy:** L0 Observe (promotion to L1 flag-as-recommendation).  
**Human owner (typical):** AP Controls Lead  
**Payment authority:** None. A flag is not a hold authority by itself until a human (or a written control procedure) places the hold.  
**Northline instance:** Procedure `AP-DUP-003`. Language discipline: “possible duplicate / unusual pattern — human review.” Never “fraud.”

---

## 1. Position in the stack

This agent exists because humans miss collisions and odd patterns when volume is 15,000 a month. It also exists to be kept in its box. A noisy flagger trains people to ignore it. A confident flagger that uses the word “fraud” creates legal and cultural risk and still misses things.

Treat every output as a **hypothesis**. Four human outcomes only: Clear, Confirm, Escalate, Defer (see Decision Framework §9). The agent does not choose.

---

## 2. Job description

The Duplicate & Anomaly Agent compares a new capture record to open and recently paid invoices (and credits) using a written rule set: exact and near keys (vendor + invoice number + amount; vendor + amount + date window; image-hash near-duplicate; PO + amount collision; unusual first-invoice amount; unusual billing address vs master). It raises a flag with the rule IDs that fired and the candidate object IDs. It does not block payment by writing to the bank file. It does not investigate. It does not call law enforcement.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Object-driven | On Intake ready (parallel to Validation) | Shadow score (L0) or flag (L1) |
| Human disposition | SSC hours | Clear / Confirm / Escalate / Defer |
| Daily | 17:30 ET | Open flags, aging, rule-fire mix |
| Monthly | With Internal Audit as observer if they wish | Rule performance, not “fraud caught” |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Capture record + image + hash | Agent 01 | Y |
| Open AP items + paid history (Northline: 24 months) | ERP | Y |
| File-hash duplicates already known | Agent 01 | Y — do not double-count as financial dup without rules |
| Vendor master (age, address, bank-change date) | ERP | Y for anomaly rules |
| Rule book `AP-DUP-003` | Controlled | Y |
| Prior dispositions (false-positive learning is *rule change*, not silent) | Orchestrator | N |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| Invoice history search | Read |
| Image perceptual hash (optional) | Read |
| Rule engine (deterministic first; model only as *secondary* hint, labelled) | Read rules |
| Orchestrator | Write flag records at L1 |
| Evidence store | Write flag packet |

Deterministic rules are the system of record for *why* a flag exists. A model score, if used, is `HINT` and cannot flag alone at commissioning.

ERP-agnostic: search by vendor + invoice number is universal; fuzzy number (459102 vs 4591O2) must be written as a rule, not hoped for.

---

## 6. Responsibilities

1. Run the rule book in published order. Record each fire with candidates.
2. Distinguish `FILE_DUP` (same artefact, Agent 01) from `POSSIBLE_FINANCIAL_DUP` (different artefacts, possible double pay).
3. Anomaly rules (examples): first invoice > $25k; amount 10× vendor 12-month median; billing address ≠ master; invoice number reset pattern; weekend-dated high value. Each is a *pattern*, not a finding.
4. At L0, write shadow only. At L1, open flag on the work object and notify Controls queue.
5. Notify Agents 03 and 12: proceed-type recommendations forbidden while flag `open`.
6. Present disposition UI fields to the human. Require a reason code on Clear.
7. After Confirm: hand to Match/Payments for hold, reverse, or recover *per procedure* — this agent does not reverse.
8. After Escalate: notify the named control owner (could be Internal Audit or a fraud-examination function *if the company has one*). The agent still does not use “fraud detected.”
9. Weekly: false-positive rate by rule. Propose rule changes to Controls Lead (change control). Do not auto-tune thresholds.

---

## 7. Explicit exclusions

1. Payment authorisation, release, or silent drop from a payment proposal (Agent 12 humans deselect).
2. Auto-clear of flags.
3. Auto-hold in the bank / Positive Pay system.
4. Vendor bank change.
5. Any claim of fraud detection, fraud prevention, or completeness of detection.
6. Model-only flags at commissioning.
7. Scoring people or plants as “fraud risk.”
8. External reporting to banks or agencies.
9. Using Clear as “approved to pay” beyond “this flag is closed.”
10. Training on real “fraud cases” from other employers (no real client data).

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | AP Controls Lead / Elena Ruiz |
| Backup | Assistant Controller — Payables |
| Escalation | Controller; IA as they request |
| Owns | Rule book, dispositions, language, join tests with 03/12 |
| Does not own | Investigations beyond AP procedure unless escalated |

Elena is not a fraud examiner unless Northline separately designates that role. The charter should not imply she is.

---

## 9. Approval requirements

| Action | Human |
|---|---|
| Disposition of every L1 flag | Controls Lead or named delegate |
| Clear above $10,000 or any bank-related anomaly | Controls Lead personally (not delegate) |
| Confirm (substantiated duplicate) | Controls + Match or Payments as relevant |
| Escalate | Controls + named function |
| Rule add/change/threshold | Controls + Process Owner; Controller if payment-adjacent |
| Model hint on | Separate charter; still not standalone |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Flag aging > 2 business days | Controls Lead | Daily |
| High-value (> $50k) open flag on a proposal day | Payments Lead + Controls | Before run |
| Confirmed duplicate already paid | Controller + Payments | Immediate |
| Bank-detail anomaly | Vendor Master + Controls | Immediate |
| Rule FP rate > 40% for a week | Pause that rule | Same week |
| Someone asks the agent to “catch fraud” in a demo | Process Owner refusal | n/a |

---

## 11. Output standard

Flag record: object ID; candidate IDs; rule IDs that fired; `FILE` vs `FINANCIAL` vs `ANOMALY`; `HINT` model score if any (nullable); language field fixed: `possible duplicate or unusual pattern — human review`; state `open/cleared/confirmed/escalated/deferred`; disposition reason; owner; agent `10`; level `L0/L1`; “not a fraud finding.”

Join signal to 03/12: `agent10_open: true/false`.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| No proceed over open flag | 03/12 join 100% | Daily join |
| Human disposition | No auto-clear | Access + log |
| Language | Forbidden-word scan (`fraud`, `guaranteed`) | Weekly |
| Rule change control | Version hash | Monthly |
| High-value clear | Dual or named | Sample 100% > $10k |

This agent does **not** satisfy an anti-fraud programme. It produces review evidence.

---

## 13. Audit evidence

Flags + dispositions 7 years; rule versions life-of-programme; join reports 7 years; language reviews 1 year. Retrieval by invoice in 15 minutes.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Coverage | % of Intake objects scored | Completeness of signal |
| Precision by rule | Confirmed / (confirmed+cleared) *per rule* | Tune via change control |
| Time to disposition | | Control SLA |
| Join integrity | Proceeds blocked | Control |
| Language incidents | | Culture |
| Cost | | Brake |

Forbidden KPIs: “fraud caught,” “dollars saved from fraud,” “detection rate,” “assurance.”

Precision is not a promise of recall. A high precision rule can still miss collisions. Do not market precision as safety.

---

## 15. Performance history fields

Period; objects scored; flags by rule; dispositions; FP by rule; join breaks (should be 0); high-value clears; language incidents; level; pauses of rules; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow scores, no live block | **Default commissioning** |
| L1 | Live flags; block proceed-recommend on 03/12 | First promotion |
| L2 | Prepare hold packet for Payments Lead (still human places hold) |
| L3 | Not for auto-confirm or auto-clear. Do not plan L3 disposition |
| L4 | n/a for disposition |

Ceiling: L2 prepare. Disposition remains human. Payment remains human.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| History search down | Do not PASS “no flag”; mark `SCAN_UNAVAILABLE`; 03/12 treat as open-hold equivalent until scan runs |
| Rule hash missing | Stop |
| Model vendor outage | Continue deterministic rules only |
| Flood of flags | Pause the noisy rule; do not auto-clear the flood |

---

## 18. Cost monitoring

Search compute, review minutes. If review minutes explode and precision collapses, pause rules — attention is the control. Do not add a more expensive model to “fix” a bad rule book.

---

## 19. Handoffs

01→10; 10→Controls human; 10→03/12 block signal; 10→04 class `ANOMALY_HOLD`; Confirm→Match/Payments procedure; Escalate→named function; 10→16.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| History window | 24 months |
| Amount+date window | ±7 days, same vendor, amount ±$1 |
| Invoice number exact + fuzzy | Written list of substitutions (O/0, spaces, prefixes) |
| First-invoice anomaly | > $25,000 |
| Median spike | 10× 12-month median, min $5,000 |
| Model standalone | Off |
| Language | Fixed sentence |

---

## 21. First 90 days

L0 only for at least 10 days / 500 objects. Measure shadow vs what specialists already caught. Promote L1 only if specialists agree the flags are intelligible. Do not turn on model hints in 90 days.

---

## 22. Worked example — Northline Industrials

**`WO-1049555`** invoice 459210, V-10442, $8,440, company 1000. Rule `VENDOR_NUM_AMT` hits paid invoice 88321 ($8,440, same vendor, number different, date 11 months ago) — weak. Rule `PO_AMT` hits open invoice 459102 on same PO for $19,596 — different amount, not a dup. Rule `FUZZY_NUM` does not fire. Anomaly `MEDIAN_SPIKE` does not fire.

Shadow L0: one weak candidate. At L1, Elena’s book says `VENDOR_NUM_AMT` alone is `HINT` not a flag unless a second rule fires. No live flag. (If a vendor had insisted this is “AI fraud detection,” they would have been wrong twice: no flag, and not fraud.)

**Second case:** invoice 459102 submitted via portal *and* a second PDF with number `459102-A`, same amount $19,596, same vendor, same PO. Rules `AMT_DATE_VENDOR` + `PO_AMT` + near image-hash fire. L1 flag open. Agent 03 must `RECOMMEND_NO_ACTION_ANOMALY_HOLD`. Thursday proposal: Agent 12 annotates hold. Elena confirms duplicate artefact-plus-suffix. Confirm. Payments deselects. Language on the ticket: “confirmed duplicate invoice submission — human review.” Not “fraud.”

**Scan unavailable Thursday 07:00:** Agent 10 marks `SCAN_UNAVAILABLE`. Agent 12 treats the whole proposal as needing a delayed run or a human extra sample — not “no flags so safe.”

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1049555
agent_id: 10
autonomy_level: L1
rules_fired: [VENDOR_NUM_AMT]
standalone_allowed: false
flag_state: not_opened
language: possible duplicate or unusual pattern — human review
fraud_claim: false
scan: complete
```

---

## 24. What this agent does not replace

Internal Audit, a fraud-examination function, vendor-master dual control, or a human looking at a weird invoice. It does not make payment safe.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_10 Duplicate & Anomaly |
| Default autonomy | L0 |
| Language | No fraud / savings / guarantee claims |
