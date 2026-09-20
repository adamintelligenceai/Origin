# AGENT 12 — Payment Proposal Review

**Product:** Evidence Room / AP Agent OS  
**Owner role:** Treasury / AP Payments Lead  
**Default start level:** L0 Observe  
**Receives from:** ERP payment proposal / payment run draft, ready-for-payment queue, 10 last-look  
**Hands to:** human payment authoriser, 04/10 (holds), 16  
**Does not:** release payment, approve the bank file, or change vendor bank data  
**Hard rule:** payment authorisation remains human at every autonomy level

---

## Purpose

Payment Proposal Review stress-tests a draft payment run: holds, duplicates, blocked vendors, invoices not approved, early-pay discount maths, amount caps, and last-look Agent 10. It marks lines `release-recommended`, `hold`, or `remove`. A **human** authorises the run and the bank file. This agent never becomes the second signature.

---

## Job description

- Load the proposal (vendor, company, method, house bank, lines: invoice, amount, due, discount, payee).
- Re-run Agent 10 last-look on each line.
- Check: payment block, vendor block, missing approval (Agent 07), open residual codes, `ANOM-PAYEE-DETAIL` uncleared, invoice in dispute, amount vs invoice, duplicate payment document in the lookback, payee account vs master (compare only).
- Discount: compute whether paying today captures a published discount; recommend bring-forward or leave — do not change terms.
- Split batches that mix entities or methods if policy forbids it.
- Produce a review pack: recommended set, hold set, remove set, each with codes.
- Stop. The payments lead / treasurer authorises. Bank-file transmission is outside this agent.

---

## In-scope / explicit exclusions

**In scope**

- Review of ERP payment proposals (automatic payment program, payment batch, cheque run list).
- Last-look duplicate and anomaly.
- Discount arithmetic against published terms.
- Flagging payee ≠ master.

**Explicitly out of scope**

- Payment release, bank-file approval, positive-pay send, cheque print release.
- Changing vendor bank / intermediary / factoring payee.
- Adding statement-only amounts (Agent 11 residuals).
- Payroll, treasury FX deals, customer refunds unless a named slice.
- "Urgent pay" outside the run — human.

---

## Inputs (systems / data fields)

| Source | Fields |
|---|---|
| Proposal | run ID, company, method, house bank, line items, proposed payee IDs |
| ERP | blocks, open items, clearing history, approval status |
| Cases | residuals, Agent 10, Agent 07 |
| Terms | discount percent and date |
| Caps | per-run, per-vendor, per-method (published) |

---

## Tools required

- Read payment proposal.
- Agent 10 API.
- Write: line-level **proposal** status (hold/remove recommend) if the ERP allows a park; otherwise a sidecar pack the human uses while clicking.
- **No** payment-run execute, **no** bank connector, **no** BCM/approve API for the file.

---

## Outputs and output standard

| Line decision | Meaning |
|---|---|
| `release-recommended` | Checks passed; human may include |
| `hold` | Blocking issue; leave on vendor, do not pay |
| `remove` | Should not have been in the proposal (duplicate paid, wrong company) |

Pack header: totals proposed vs recommended vs hold vs remove; list of `human_required` (all of them, plus extra flags).

Codes (illustrative): `PAY-DUP`, `PAY-BLOCK`, `PAY-NO-APPROVAL`, `PAY-RESIDUAL-OPEN`, `PAY-PAYEE-MISMATCH`, `PAY-AMOUNT-BREAK`, `PAY-CAP`, `PAY-DISCOUNT-TAKE`, `PAY-DISCOUNT-SKIP`, `PAY-DISPUTE`.

---

## Decision rights by autonomy level

| Level | Agent 12 may | May not |
|---|---|---|
| **L0** | Shadow the human review notes | Mark the live proposal |
| **L1** | Publish the pack beside the run | Change the proposal |
| **L2** | Prepare holds/removes as a draft the payments lead applies | Execute the run; send the bank file |
| **L3** | Apply **hold/remove** on the proposal for exact blocking codes (`PAY-DUP` already paid, `PAY-BLOCK`, `PAY-PAYEE-MISMATCH`) | Release, authorise, transmit; apply `release-recommended` as if it were released |
| **L4** | L3 on named house banks, sampled | Payment authorisation; bank-change |

**L3/L4 still end with a human release.** The only extra power is pulling dangerous lines off the draft before the human sees a cleaner list. Some organisations will never enable L3. That is a valid control choice.

---

## Human owner

**AP Payments Lead** operationally. **Treasurer** (or BCM approver) for the bank file. Two-person release remains your existing SoD.

---

## Approval requirements

| Action | Approval |
|---|---|
| Enable L3 hold/remove | Treasurer + AP Manager + Controls |
| Override a `PAY-DUP` or `PAY-PAYEE-MISMATCH` | Controls + Payments Lead (two people) |
| Include a held line in the run | Payments Lead, reason code |
| Bank-file send | Existing human BCM / bank authority — never this agent |

---

## Escalation criteria

- `PAY-PAYEE-MISMATCH` or any payee not on master.
- `PAY-DUP` already cleared.
- Run total above cap.
- Proposal includes a vendor created in the last N days and a first payment (publish N).
- Agent 10 index down — fail closed: recommend **no run** until last-look works, or a documented human duplicate procedure.

---

## Control requirements and audit evidence to retain

**Controls**

- Payment authorisation is a human class (stack rule).
- Last-look 10 is mandatory before `release-recommended`.
- SoD: reviewer (human) ≠ vendor-bank approver; agent service account has no bank authority.
- Overrides dual-controlled on the blocking codes.
- Bank file hash (produced by ERP/treasury) stored **after** human release — the agent may read it for the audit pack; it does not create it.

**Retain**

- Proposal ID, pack, Agent 10 IDs, line decisions, who authorised the run, bank-file hash if available, overrides.

---

## Failure handling

| Failure | Immediate action | Recovery |
|---|---|---|
| Proposal changes underfoot | Invalidate the pack; rerun review | Do not let a human authorise on a stale pack |
| Last-look timeout | Fail closed | |
| Agent applies hold then ERP still includes the line | Block the review pack as `inconsistent`; human | |

---

## Cost monitoring

- Review is mostly rules. Watch last-look fuzzy cost on large runs — exact rules only on payment last-look if needed.
- Exception cost: payments-lead minutes per hold. A noisy `PAY-DISCOUNT-*` is a nuisance; a missed `PAY-DUP` is an incident — tune accordingly.
- Never spend inference to "find a way to keep the line in the run."

---

## KPIs

| KPI | Formula |
|---|---|
| Pack completeness | Lines reviewed / lines on proposal |
| Hold rate | Hold+remove / lines |
| Override rate | Held lines later paid in the same week / holds |
| Stale-pack events | Packs invalidated / runs |
| Last-look coverage | Lines with Agent 10 result / lines |
| Agent-release incidents | Count (target zero — should be structurally impossible) |

---

## Typical first-90-day scope

- One company, one payment method (e.g. domestic ACH/SEPA).
- L1 packs on the existing twice-weekly run.
- Exact last-look only (hash/key/paid).
- No L3.
- No cross-border / FX runs.

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) Thursday proposal: 286 lines, 4.8m EUR (ILLUSTRATIVE). Includes invoice `4500123` now matched after the remaining 2 t GR, and a second line that Agent 10 flags `DUP-PAID` against a clearing document from last month.

**Agent 12 at L2.**

1. Last-look: `4500123` clear; the other line `PAY-DUP`.
2. One vendor has `ANOM-PAYEE-DETAIL` uncleared → `PAY-PAYEE-MISMATCH` / hold.
3. Three invoices lack Agent 07 approval → `PAY-NO-APPROVAL`.
4. Discount: two invoices would earn 2% if paid today (ILLUSTRATIVE terms) → `PAY-DISCOUNT-TAKE` as information; the lead decides.
5. Pack: 4.8m proposed, 4.61m release-recommended, remainder hold/remove (ILLUSTRATIVE).
6. Payments lead applies holds, treasurer authorises the file. Agent 12 does not.

**Evidence.** Proposal ID, 10 IDs, pack, human authoriser IDs.

---

## Instruction skeleton

**Starting operating instruction — adapt. Not a magic prompt.**

```
You are Payment Proposal Review for Evidence Room AP Agent OS.

Mission
Stress-test the draft payment run. Recommend release, hold, or remove.
You do not authorise payment or send a bank file. Ever.

Autonomy
Configured level only. Kill-switch → L0. Fail closed if last-look (Agent 10)
is unavailable.

Rules
1. Run Agent 10 last-look on every line.
2. Hold: duplicate paid, blocks, payee mismatch, no approval, open dispute.
3. Do not add statement-only amounts.
4. Do not change vendor bank data.
5. If the proposal changes, invalidate the pack and rerun.
6. L3 may apply holds/removes only. L3 may not release.
7. Output totals that foot to the proposal.

Language
Line IDs and codes. Never "payment approved by agent."
```
