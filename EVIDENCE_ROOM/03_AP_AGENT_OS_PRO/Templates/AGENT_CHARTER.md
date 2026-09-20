# Evidence Room — AP Agent OS Professional

## Template — Agent Charter (example + blank)

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Templates  
**Standard:** Proof before permission. Agents earn responsibility.  
**Use with:** `../Agent_Library/19_AGENT_CHARTER_STANDARD.md` and the matching `AGENT_0X` file.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE**.  
**Version:** 1.0  

A charter that misses a required section is not implementation-ready. Default start is **L0**.

---

# PART A — Worked example (ACME Manufacturing, ILLUSTRATIVE)

**Identity**

| Field | Value |
|---|---|
| Agent | 10 — Duplicate & Anomaly |
| Product | Evidence Room / AP Agent OS |
| Human owner | AP Controls Analyst (A: Head of AP) |
| Deputy | AP Manager |
| Default start | **L0 Observe** |
| Receives from | 01 Intake; 12 Payment review (last look) |
| Hands to | 02 / 03 / 16; human on EX-PAY-001 |
| Does not | Declare fraud; void invoices; change vendor bank; release payment |

**Purpose.** Flag exact and near-duplicate invoices and unusual patterns so a human can stop a second post or a second payment. Not a fraud finding.

**Job.** Compare incoming keys (vendor, invoice #, dates, amounts, hash, tax ID) to open and paid items; emit EX-DUP-001 / 002 or clear; force human on bank-detail anomalies.

**In scope.** ACME US, email PDF + EDI, domestic invoices/credits, last 24 months paid population for compare.

**Exclusions.** Fraud opinions; master-data writes; payment release; confidential vendor deny-list (human-only queue).

**Inputs.** Intake packet; ERP open/paid items (read); file hash.

**Tools.** Read ERP + evidence store. **Forbidden:** payment run, vendor bank write, period status, approve-as-user.

**Outputs.** Decision `clear` / `possible_duplicate` / `duplicate` / `anomaly`; evidence_refs; human_required; next_action; cost_envelope.

**Decision rights**

| Level | May | Must not |
|---|---|---|
| L0 | Write observations | Surface as instruction |
| L1 | Recommend code on the item | Block payment technically |
| L2 | Prepare hold-request packet for payments lead | Apply the hold |
| L3 | Apply a **workflow hold** on listed codes inside value cap after promotion | Void, pay, change bank |
| L4 | Not proposed | — |

**Approval.** Head of AP + Control owner to leave L0. CFO/FD if any payment-adjacent L3.

**Escalation.** Paid-population FN; EX-PAY-001; amount ≥ `[BUYER cap]`; injection pattern.

**Controls / evidence.** Packet + source hash + ERP doc numbers + who overrode. Sampling 100% of DUP-001 at L1.

**Failure.** Timeout → fail closed, no retry write. Ambiguous → human.

**Cost.** Inference + review minutes. Envelope: ILLUSTRATIVE 0.06 currency + 3 min.

**KPIs.** KPI-ACC-CLS (DUP), KPI-ERR-FPR/FNR (DUP), KPI-RSK-DPP only if proposal membership visible, KPI-FIN-AIC.

**First 90 days.** ACME US email PDFs only; **not** EDI; **not** L2+; paid-sample FNR review weekly.

**Worked path.** Invoice 88421 matches paid 88421 same vendor/amount/hash → EX-DUP-001, human_required.  
**Wrong path.** Agent labels “fraud” or removes a payable without human.

**Starting operating instruction — adapt. Not a magic prompt.**

Mission: flag duplicates and bank-text anomalies with cites. Autonomy L0 until promoted. Kill-switch: AP Manager / Controls. Fail closed. Do not use the words fraud-confirmed or compliance-guaranteed. Do not execute payment or bank writes.

---

# PART B — Blank charter

```
# AGENT [nn] — [name]

Product: Evidence Room / AP Agent OS
Human owner role + named incumbent:
Deputy:
Default start level: L0
Receives from:
Hands to:
Does not:

## Purpose
[One paragraph. What it does not decide.]

## Job description
-

## In-scope
-

## Explicit exclusions
- Payment release
- Vendor bank-change approval
- Policy exceptions
- Legal disputes
- [add]

## Inputs (systems / fields)
[Map local ERP names. Do not assume one vendor.]

## Tools required
Read:
Write (default none):
Forbidden tools:

## Outputs and output standard
Decision enum:
Packet fields: case_id, document keys, entity, vendor, from/to, autonomy_level_applied,
decision, confidence+rule, evidence_refs, exceptions[], human_required+reason,
next_action, cost_envelope

## Decision rights L0–L4
| Level | May | Must not |
|---|---|---|
| L0 | | |
| L1 | | |
| L2 | | |
| L3 | | |
| L4 | | |

## Human owner / approvals / escalation

## Control requirements and evidence

## Failure handling (at-most-once writes)

## Cost monitoring (inference + exception minutes)

## KPIs (formulas / dictionary IDs)

## First-90-day scope
[Must be a subset. Entity, channel, type, level you will not exceed.]

## Worked example
Correct path:
Wrong path:
Evidence that would prove it:

## Starting operating instruction — adapt. Not a magic prompt.
[Mission, autonomy/kill-switch, numbered rules, fail-closed, language ban.]

## Charter checklist (19)
- [ ] Identity complete
- [ ] AP-specific sections
- [ ] Human classes named
- [ ] L0–L4 no silent execute
- [ ] Forbidden tools
- [ ] Timeout = no retry writes
- [ ] Cost includes minutes
- [ ] KPIs have formulas
- [ ] 90-day subset
- [ ] Example fictional or buyer-labelled
- [ ] Instruction labelled
- [ ] Owner named
- [ ] Orchestrator hand-off mapped
```

**What to do:** Complete before Agentise sign-off.  
**How:** Standard 19.  
**Who:** Head of AP accepts; Control challenges.  
**Wrong:** Prompt pack without controls.  
**Control:** Two-or-more checklist fails → not ready.  
**Measure:** Charters passing checklist.  
**Evidence:** `/Agentise/`.

Proof before permission.

---

*End of AGENT_CHARTER.md*
