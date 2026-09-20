# A12 — Payment Proposal Review Agent

| Field | Value |
|---|---|
| Agent ID | A12 |
| Name | Payment Proposal Review Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Payment management (challenge only) |
| Starting autonomy | Level 0 |
| Human owner (role) | Payments Lead |
| Backup owner (role) | Assistant Controller |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Challenge the payment proposal for holds, duplicates, due-date errors, discount misses, and payee anomalies — and never release the payment file, bank batch, or positive-pay file.

---

## 2. Job description

A12 is the sceptical reader of F110 / the payment journal / the settlement run. Forrester (March 2025) lists payment management as an AI AP use case. In this stack that use case stops at **challenge**. Authorisation remains human: bank mandate, dual control, and the Payments Lead’s release.

**In population:** every payment proposal line in the live run (SAP NL10/20/30 and NetSuite NPC as separate runs).  
**Out of population:** invoice posting, vendor bank master writes (A08), payroll, treasury FX deals.

**Done at Level 0:** a challenge pack Tomoko Sato reviews beside the proposal before she releases. **Done at Level 1:** recommended `PAY-HOLD` / `pay_ok` / `discount_risk` on lines; she still releases.

If A12 is silent, that is not an approval. Silence at Level 0 is an incomplete pack — stop the run.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Proposal header + lines | Yes | ERP payment program | **Do not release; do not “clear”** |
| Invoice / open item detail | Yes | ERP | Hold line |
| A10 screen on each line | Yes | A10 | Run A10 first |
| Vendor bank snapshot vs last paid bank | Yes | MDM / pay history | `PAY-HOLD` |
| Blocks / holds | Yes | Vendor + invoice | Honour them |
| Terms / discount dates | Yes | Invoice / vendor | Discount test degraded |
| Due date vs run date | Yes | Invoice | Hold |
| Dual-control / release policy | Yes | Treasury | Human path only |
| Positive-pay / bank-file format rules | Yes | Treasury | Out of A12 write scope |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Proposal | F110 | Payment journal | Payment process request | Payment batch | Settlement run | |
| Release / file | Payment media / BCM | Bank file | Payments file | File | Settlement | Bank portal |
| Positive pay | Bank adapter | Bank | Bank | Bank | Bank | Treasury |
| Blocks | LFB1 / invoice | Hold | Hold | Hold | Hold | |

**Read:** proposal, invoices, banks, A10.  
**Write at Level 0:** pack.  
**Write at Level 1:** line challenges on work objects.  
**Write at Level 2:** draft exception list for the releaser.  
**Write-never:** payment release, bank file, positive-pay, vendor bank change, “pay immediately” to the bank.

`can_release_payment` is always false (`RESPONSIBILITY_MODEL.md`).

---

## 5. Responsibilities

1. Take a frozen snapshot of the proposal (line count, $ hash). If the proposal changes after the pack, invalidate the pack.
2. Call A10 on every line (payee, invoice number reuse, cross-ledger twin).
3. Test: payment block, invoice not posted, due date in the future beyond policy, already-paid item, bank account ≠ last verified, one-time vendor, employee vendor on trade, discount date still open, amount ≠ open item.
4. Classify each line: `pay_ok_challenge_none` | `PAY-HOLD` | `discount_risk` | `early_pay` | `bank_changed` | `dup_sus`.
5. Produce `A12_challenge_pack` before the human release window.
6. Never interpret a clean pack as a release authorisation. The pack is an input to a human.
7. After release, reconcile file $ to proposal $ to bank confirmation (read-only). Breaks go to Treasury.
8. At Level 0, the pack may be manual-complete if the agent is down — the run does not become “agent-approved”.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never send a file to the bank “because the window is closing”.
- Never change vendor bank details to match the invoice PDF.
- Never remove a payment block.
- Never batch-approve lines with a single click of its own.
- Never treat NetSuite NPC settlement as covered by a SAP F110 pack.
- Never claim discount savings without the terms table.

---

## 7. Human owner

**Payments Lead** owns the challenge review and the release *together with* the second releaser required by bank mandate. Backup: **Assistant Controller**.

Tomoko Sato may not be the only releaser if policy says dual control. A12 is not the second releaser.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Challenge pack | Payments Lead + mandate releaser(s) release | `A12_challenge_pack` + release log |
| 1 Recommend | Line-level challenge codes | Human accepts holds; **human releases** | `pay_line_decision` + release |
| 2 Prepare | Draft exception list / F110 delete list | Human edits proposal | Proposal change user |
| 3 Execute within guardrails | Auto-mark `PAY-HOLD` on exact A10 hits / blocks | Sample; **release still human** | Envelope |
| 4 Managed autonomy | Named payment methods (e.g. domestic ACH holds only) | IA ack; **release still human** | Register + IA ack |

There is no level at which A12 releases cash.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| Bank account ≠ last verified | Treasury + Controls **before release** | `bank_changed` |
| A10 exact duplicate on a line | Controls + halt that line | `DUP-SUS` |
| Proposal $ hash changed after pack | Payments Lead — rebuild pack | control |
| Discount window closing same day | Payments Lead (human choice) | `discount_risk` |
| File $ ≠ proposal $ | Treasury — do not resend blindly | `CTRL-BRK` |
| Agent outage at run time | Payments Lead uses manual checklist | process |

**Do not escalate:** invoices due tomorrow that policy includes in this run. Do not escalate every early-pay that policy allows for discount.

---

## 10. Output standard

### 10.1 `A12_challenge_pack`

```
run_id
source_system
proposal_hash
line_count
gross_amount
by_class counts and $
holds[]
a10_summary
disclaimer                 # "This pack is not a payment authorisation"
```

### 10.2 `pay_line_challenge`

Per line: class, tests, invoice refs, bank-compare result, recommended action (`hold` / `release_candidate` / `take_discount` — the last is advice, not a post).

### 10.3 Post-run `A12_file_recon`

Proposal $ / file $ / bank ack $.

**Done at Level 0:** pack produced and *read* (timestamped open) before release. Unread pack = do not release.

---

## 11. Control requirements

1. **`can_release_payment = false`** on the system user. Tested.
2. **Proposal hash.** Pack invalid if proposal edits after snapshot.
3. **A10 before pack complete.**
4. **Dual control** remains a people control.
5. **Separate pack per ledger / run.**
6. **Unread-pack block** (operational procedure, even if the ERP cannot enforce it).
7. **Sample** 20 lines/run vs human: would they have held?
8. **Kill switch** drops A12 to observe pack-only; it does not auto-release to “keep the run”.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Packs + hashes | A14 | Local financial-record policy |
| Release logs (human IDs) | ERP / BCM / bank | Same |
| File recon | Treasury | Same |
| Bank-change holds | Controls | Same |
| Security extract (no release auth) | GRC | Same |
| A10 results on the run | A10 | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Pack before release | Runs with pack-read / runs | Log | Per run | Payments | Must be 1.00 |
| Operational | Hold precision | Human-kept holds / agent holds (L1+) | Decision | Monthly | Payments | 0→1 |
| Operational | Time pack → release | Minutes (process, not vanity) | Log | Per run | Payments | |
| Financial | Confirmed dup $ stopped at proposal | Sum | A10+A12 | Monthly | Controls | |
| Financial | Discount taken vs offered | $ / $ (local measure) | Terms vs run | Monthly | Payments | Not a guarantee |
| Financial | File recon breaks | Count / $ | Recon | Per run | Treasury | |
| Risk | Agent release events | Count (0) | Security | Daily | Controls | Auto Level 0 |
| Risk | Unread-pack releases | Count (0) | Procedure log | Per run | Controls | |
| Risk | Bank-change paid | Count (0) | Controls | Monthly | Treasury | |

Ardent Partners (2024) Best-in-Class cycle and cost figures are not payment-release KPIs. Do not misuse them here.

---

## 14. Performance history fields

Common fields, plus:

```
runs
pack_read_before_release
holds_proposed
holds_kept
discount_offered
discount_taken
file_recon_breaks
agent_release_events
bank_change_holds
```

---

## 15. Starting autonomy level

**Level 0 — Observe.** Watch at least one full cycle (the responsibility model’s 20 operating days still applies) before Level 1 line recommendations. Release never promotes.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Proposal extract fail | Adapter | **Stop run** | Payments + A16 | Manual checklist or retry |
| A10 index incomplete | A10 | Do not mark lines `clear` | Controls | Rescreen |
| Hash mismatch | Compare | Invalidate pack | Payments | New pack |
| Bank ack timeout | Treasury | Recon delayed; do not resend file | Treasury | Confirm then act |
| Model “release to make discount” | Guardrail | `CTRL-BRK` | Controls | Human only |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Per-line screens | API | Systems |
| Human hold-review minutes | Time | Payments |
| Missed-discount $ | Terms vs run | Payments — a *measure*, not an agent claim |
| Duplicate-pay unwind | Finance | Controller |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. Payments lead: Tomoko Sato. Thursday F110 run NL10, proposal $4,180,000, 1,142 lines.

**Level 0.** A12 snapshot hash `9f3c…`. Pack: 6 `PAY-HOLD` (2 payment blocks, 1 A10 fuzzy Helion HF-88421A, 1 bank-detail change request still in callback, 2 due dates 12 days out against a policy of 7). Discount-risk list: 14 invoices still inside terms (advice). Tomoko opens the pack at 14:02 (logged), deletes the six holds from the proposal, rebuilds, new hash, new mini-pack, then she and the BCM second releaser release.

**Illegal.** A12 sending the payment medium. Paying Helion’s emailed new bank. Skipping the mini-pack after the delete. Releasing NPC’s NetSuite batch on the strength of the SAP pack.

**What can go wrong.** Proposal edited by another user after 14:02. Hash breaks. Release blocked by procedure until a new pack.

**Control.** Security extract: `ER_A12_S4` has F110 display, not proposal release, not medium create. Pack disclaimer: not a payment authorisation.

---

## Charter conformance

- [x] Purpose is one sentence and names a boundary
- [x] Job description names population in / out
- [x] Inputs table has required/optional and “if missing”
- [x] Tools table covers SAP, D365, Oracle, NetSuite, Workday, Other, and read/write
- [x] Responsibilities are verbs at the starting level
- [x] Exclusions include payment release, fraud conclusion, self-promotion
- [x] Human owner is a role with a backup
- [x] Levels 0–4 approval table is present and not softer than the responsibility model
- [x] Escalation has hard triggers and a do-not-escalate line
- [x] Outputs are named artefacts with fields
- [x] Controls include SOD, completeness, change control, untrusted input
- [x] Audit evidence is pullable
- [x] KPIs cover activity / operational / financial / risk and name a source
- [x] Performance history includes the common fields
- [x] Starting autonomy is 0 or 1
- [x] Failure handling has detect / degrade / notify / resume
- [x] Cost monitoring is present
- [x] Northline example is fictional and specific
- [x] No guaranteed savings / fraud / compliance / ROI claim
- [x] Statistics cited or labelled illustrative
