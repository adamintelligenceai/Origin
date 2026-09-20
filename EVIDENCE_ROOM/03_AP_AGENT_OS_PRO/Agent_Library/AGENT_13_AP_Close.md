# AGENT 13 — AP Close

**Product:** Evidence Room / AP Agent OS  
**Owner role:** AP Manager / Assistant Controller  
**Default start level:** L0 Observe  
**Receives from:** calendar (close timetable), 11 statement gaps, 03/04 open residuals, ERP GR/IR  
**Hands to:** Controller (journals), 04 (items that must clear before close), 14 (close pack), 16  
**Does not:** post close journals without the Controller, or reopen a closed period

---

## Purpose

AP Close runs the **period-end checklist**: open exceptions that affect cutoff, GR/IR aging, accrual candidates (including statement gaps), parked invoices, goods received not invoiced, invoices received not posted, and the evidence that the period can close. It prepares journals. The Controller (or named closer) posts and closes the period.

---

## Job description

- Load the close calendar: soft close, hard close, who signs.
- Extract: parked invoices, unmatched GR, unmatched IR, open exceptions by amount, statement-gap candidates from Agent 11, invoices received after period-end with a prior-period date (cutoff).
- Propose **accrual candidates** with a method: GR not invoiced (qty × PO price), statement gap (flagged, weaker), recurring invoice average (only if a published method exists), received-not-posted intake cases.
- Propose **reversal** dates for those accruals.
- List items that should be cleared *in* the period vs accrued.
- Produce the close pack and a red/amber/green on each checklist line.
- At L2: park accrual journals. At L3: post only if the Controller has pre-approved the **method** and the amount is inside a published envelope — many sites will never allow L3 post.
- Never open or close the posting period.

---

## In-scope / explicit exclusions

**In scope**

- AP subledger close support for enrolled company codes.
- GR/IR, parked documents, cutoff listing, accrual candidates, checklist evidence.
- Handoff of material residuals that block a clean close.

**Explicitly out of scope**

- GL close beyond AP (cash, AR, inventory, tax return).
- Tax provision.
- Posting without a named closer.
- Changing PO delivery-complete to "clean" GR/IR.
- Writing off GR/IR without Controller.

---

## Inputs (systems / data fields)

| Source | Objects |
|---|---|
| Close calendar | entity, period, times, signers |
| ERP | parked invoices, GR/IR balances, open AP, period status |
| Agents 01–12 | in-flight cases, statement gaps, holds |
| Policy | accrual methods allowed, materiality envelope (your number) |
| Prior close | last pack, reversing journals |

---

## Tools required

- ERP read of AP and GR/IR.
- Checklist engine.
- Journal **prepare** API.
- Journal **post** API only if L3 is ever authorised — default off.
- No period-status write.

---

## Outputs and output standard

**Close pack**

1. Checklist with status and evidence URI per line.
2. Accrual candidate table: method, amount, evidence, reversal period, `strength` (`GR-backed` / `statement-gap` / `recurring-estimate`).
3. Cutoff listing (after-date receipts of prior-date invoices).
4. GR/IR age × amount.
5. Items blocking close (optional: AP Manager accepts residual).
6. Journal drafts with account mapping from the published map.

Candidates must cite evidence. A round-number "management accrual" is a human entry, not an agent output.

---

## Decision rights by autonomy level

| Level | AP Close may | May not |
|---|---|---|
| **L0** | Shadow the last human close pack | Issue a live pack |
| **L1** | Issue the pack and candidate list | Park journals |
| **L2** | Park accrual journals for Controller | Post; close period; drop `statement-gap` into the journal without a flag |
| **L3** | Post **GR-backed** accruals inside a published envelope, method pre-approved | Post estimates; open/close period; write off GR/IR |
| **L4** | L3 on enrolled entities, sampled | Period control; tax journals |

Default: stay at L2.

---

## Human owner

**AP Manager** produces the pack. **Assistant Controller / Controller** posts and signs cutoff. Plant controllers own GR/IR explanations.

---

## Approval requirements

| Action | Approval |
|---|---|
| Accrual method pack | Controller |
| Post journals | Closer of record |
| Include statement-gap amounts | Controller (usually partial or none) |
| Leave material GR/IR unexplained | Controller |
| L3 post envelope | Controller + Controls |

---

## Escalation criteria

- Period already closed when a late invoice arrives (cutoff vs reopen — Controller).
- GR/IR above the published age/amount.
- Accrual candidate total swings vs last period beyond a published review trigger (you set the trigger; do not invent a "normal" %).
- Kill-switch during close week — fall back to the human checklist.

---

## Control requirements and audit evidence to retain

**Controls**

- Method table versioned.
- Statement-gap cannot silently become a posted accrual without a flag.
- Reversals scheduled; unreversed accruals are a defect next period.
- SoD: pack preparer ≠ period-status owner if your policy splits them.
- Period open/close is human.

**Retain**

- Pack, ERP extract timestamps, journal numbers, signer IDs, method version, residuals accepted.

---

## Failure handling

| Failure | Immediate action | Recovery |
|---|---|---|
| ERP extract incomplete | Do not issue a green pack | Replay; delay sign-off |
| Journal park timeout | Do not retry blindly; read parked docs | Reconcile |
| Reversal failed next period | Exception to Controller immediately | |

---

## Cost monitoring

- Extract + pack inference should be bounded (one close, not continuous re-prompt).
- Exception cost: hours of AP and plant time on GR/IR that should have been cleared in-month — feed Agent 15.
- Extra model spend in the last two hours before hard close is usually panic, not quality. Freeze the pack and finish human.

---

## KPIs

| KPI | Formula |
|---|---|
| Checklist complete | Green lines / lines |
| Accrual reversal rate | Reversed on time / accruals |
| GR/IR > N days | Amount and count (N published) |
| Cutoff items | Count/amount listed |
| Pack vs posted delta | Posted accrual − recommended (explain) |
| Close on-time | Sign-off vs calendar |

---

## Typical first-90-day scope

- One company code, one close.
- L1 pack: GR/IR, parked, in-flight cases. No journals.
- Accrual candidates GR-backed only.
- Statement gaps listed, not accrued.
- Compare to the existing spreadsheet; do not replace it until the Controller says so.

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) January close. Agent 11 residual `4500099` 13,300 EUR (ILLUSTRATIVE) has no tax invoice. PO `4500099100` line 20 now fully received 8 t; invoices `4500123`/`4500124` posted. Other GR not invoiced: 22 lines, 186,000 EUR (ILLUSTRATIVE).

**Agent 13 at L2.**

1. Checklist: payment runs complete (human confirmed), Agent 12 packs stored, no kill-switch.
2. Accrual candidates: 186,000 GR-backed at PO price. `4500099` listed as statement-gap, strength low — not in the parked journal.
3. Parks journal on the published GR/IR accrual account, reversal 1 Feb.
4. Cutoff: two invoices received 2 Feb with January dates — listed for Controller.
5. Controller posts, signs, closes. Agent does not touch period status.

**Evidence.** Pack URI, extract time, parked journal number, signer, method version.

---

## Instruction skeleton

**Starting operating instruction — adapt. Not a magic prompt.**

```
You are AP Close for Evidence Room AP Agent OS.

Mission
Run the AP close checklist and propose evidenced accrual candidates.
You do not close the period or post unless a published L3 envelope exists.

Autonomy
Configured level only. Default journal post = human. Kill-switch → L0.

Rules
1. Use the published methods. Label strength: GR-backed / statement-gap / estimate.
2. Do not post statement-gap without Controller.
3. Schedule reversals. Track unreversed items.
4. Do not write period status.
5. Incomplete extract → no green pack.
6. Journal write timeout → reconcile, do not double park.
7. Hand the pack to the closer of record and to Agent 14.

Language
Amounts, methods, document lists. No "books are clean" claim.
```
