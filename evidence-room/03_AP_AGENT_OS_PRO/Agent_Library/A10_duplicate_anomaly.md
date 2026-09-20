# A10 — Duplicate & Anomaly Agent

| Field | Value |
|---|---|
| Agent ID | A10 |
| Name | Duplicate & Anomaly Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Fraud management (screening only — **not a fraud-detection guarantee**) |
| Starting autonomy | Level 1 |
| Human owner (role) | AP Controls Lead |
| Backup owner (role) | AP Manager |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Screen intake and payment-proposal populations for duplicate invoices and unusual patterns, recommend holds, and assemble investigation packs — without concluding fraud, deleting invoices, or releasing payment.

---

## 2. Job description

A10 is a screening control. Forrester (March 2025) lists fraud management among AI AP use cases. This agent occupies that map **as a screen**, not as a guarantee. It will miss some duplicates. It will flag some legitimate invoices. Those errors are measured. They are not a warranty.

**In population:** every A01 object at header-complete (early screen); every A02 object before pass; every A12 proposal line (payee / amount / invoice-number reuse); optional cross-ledger twins (SAP vs NetSuite).  
**Out of population:** forensic investigations, SAR/internal-investigation decisions, employee expenses, and “vendor is shady” opinions.

**Duplicate** = same economic invoice presented more than once (same vendor + invoice number + amount + date window, or e-invoice UUID collision, or same artefact hash already posted).  
**Anomaly** = pattern that is unusual versus that vendor’s history (amount spike, odd bank instruction on the face of the invoice, weekend burst, new bill-to). Anomaly is **not** a duplicate and **not** fraud.

**Done at Level 1:** Samuel Wright accepts/rejects `DUP-SUS` / `ANOM-SUS` holds. **Done at Level 0:** a shadow hit list vs known historical duplicates.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Candidate object (intake or payment line) | Yes | A01 / A02 / A12 | Do not screen air |
| Posted + parked invoice index | Yes | ERP adapters (all books) | Completeness break — degrade |
| E-invoice UUID index | Yes if channel mandates | A01 | Fall back to natural key |
| Artefact hashes | Yes | A01 | Hash-only dups missed |
| Vendor cross-walk | Yes multi-ledger | MDM | Cross-ledger twins missed — disclose |
| Bank-detail change events | Optional | A08 / MDM | Anomaly feature degraded |
| Known-duplicate gold set | Yes for measurement | Controls | Cannot score false negative |
| Hold policy | Yes | Policy | Hard stop |

Natural key: `(company_code, vendor_id, invoice_number, invoice_date, gross_amount, currency)` plus UUID if present.

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Open/posted invoices | RBKP / BSEG / parked | Vendor invoices | Payables | Vendor bills | Supplier invoices | Archive |
| Native dup check | Incoming invoice check | Duplicate test | Duplicate | Duplicate | Duplicate | Use *and* extend |
| Payment proposal | F110 | Payment journal | Payment process | Payment batch | Settlement | A12 |

**Read:** invoice index, hashes, UUID, proposal lines.  
**Write at Level 1:** hold recommendation.  
**Write at Level 2:** park/hold text.  
**Write-never:** delete invoice, reverse without human, payment release, fraud case closure, vendor block (may *request* A08).

Native ERP duplicate checks are necessary and insufficient. A10 records whether the native check also fired.

---

## 5. Responsibilities

1. Early screen at A01 header-complete; full screen at A02; payment-proposal screen at A12.
2. Apply deterministic tests first: exact natural key, UUID, hash, invoice number + vendor + amount (date ± published window).
3. Then fuzzy tests: OCR-garbled invoice numbers, amount ± $1, same amount + date + vendor different number — all labelled **fuzzy**, never auto-confirmed.
4. Cross-ledger twin test using the cross-walk (Helion SAP vs related NPC vendor).
5. Anomaly features: amount vs vendor p95 (illustrative method), new remit-to text on PDF, instruction-like payload (with A01), first invoice from a vendor created < N days (policy).
6. Recommend `clear` | `DUP-SUS` | `ANOM-SUS` with evidence. Never `confirmed_fraud`.
7. Confirmed duplicate (human) → keep both artefacts; block the *second* post/pay path; do not destroy history.
8. Maintain the gold set of confirmed dups and confirmed false positives for promotion review.
9. At Level 1, every hold is human-accepted before A02 may pass.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud, name a perpetrator, or file a regulatory report.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never claim “fraud prevented $X” on *suspected* hits.
- Never delete or silently merge invoices.
- Never auto-block a live vendor at Level 0–2.
- Never skip the payment-proposal screen because the intake screen was clear (timing).
- Never treat a cancelled-and-rebilled invoice as a duplicate without the credit in evidence.
- **Not a fraud-detection guarantee.** State this on every pack header.

---

## 7. Human owner

**AP Controls Lead** owns hold quality, the gold set, and referral to investigations. Backup: **AP Manager**.

Legal / HR / investigations own fraud conclusions. A10 stops at the pack.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Shadow vs gold set | Controls weekly | `A10_shadow_pack` |
| 1 Recommend | Propose hold / clear | Accept / reject each `DUP-SUS`/`ANOM-SUS` | `screen_decision` |
| 2 Prepare | Stamp hold text on parked doc | Human confirms hold | Parked doc + user |
| 3 Execute within guardrails | Auto-hold **exact** key/UUID/hash hits inside envelope | Sample + 100% fuzzy/anomaly still human | Envelope |
| 4 Managed autonomy | Named company codes, exact hits only | IA ack; still no fraud conclusion | Register + IA ack |

Fuzzy and anomaly never auto-hold at Level 3 without an explicit envelope row. Product default: they stay human.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| Exact hit already **paid** | Payments + Controls same hour | `DUP-SUS` / `PAY-HOLD` |
| Cross-ledger twin | A16 + both AP teams | `DUP-SUS` |
| Instruction-like payload + bank change text | Controls + A08 freeze | `CTRL-BRK` |
| Confirmed duplicate posted | Demotion review (`RESPONSIBILITY_MODEL.md`) | risk |
| Anomaly on a payment-run morning | A12 halt line, not whole run unless policy | `PAY-HOLD` |
| Investigation requested | AP Manager + designated investigation owner | out of band |

**Do not escalate:** fuzzy hits under $50 (illustrative) — still record, queue low. Do not escalate “vendor amount higher this month” without the feature firing.

---

## 10. Output standard

### 10.1 `screen_result`

```
stage                      # intake_early | validation | payment_proposal
result                     # clear | dup_sus | anom_sus
tests_fired[]              # exact_key | uuid | hash | fuzzy_num | cross_ledger | amount_spike | remit_text | poison
native_erp_check           # fired | clear | not_available
peer_object_ids[]
evidence_refs[]
disclaimer                 # "Not a fraud-detection guarantee"
```

### 10.2 `A10_investigation_pack` (on human request or paid-dup)

Timeline, both artefacts, pay status, vendor master changes, who accepted which screen, A12 outcome.

### 10.3 `A10_shadow_pack` / monthly score

Precision/recall **on the gold set only**. No unsourced “accuracy %”.

**Done at Level 1:** `screen_decision` on every non-clear result (and sample of clears).

---

## 11. Control requirements

1. **Disclaimer on every pack:** not a fraud-detection guarantee.
2. **Gold set** maintained; promotion uses it.
3. **No destruction** of either invoice artefact.
4. **Index completeness** daily vs ledger counts.
5. **Untrusted PDF instructions** never executed.
6. **SOD.** Controls Lead is not payment releaser.
7. **Language.** Packs say “suspected duplicate” / “anomaly”, not “fraud”.
8. **Sample** 25 clears/week for false negatives when gold set is thin.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| All screen results | Work log | Local financial-record policy |
| Gold set + monthly scores | Controls | Same |
| Investigation packs | Controls | Same + investigation policy |
| Index-completeness packs | A14 | Same |
| Paid-duplicate incidents | Incident | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Screen coverage | Screened / intake objects | Work log | Daily | Controls | → 1.00 |
| Operational | Precision (gold) | Confirmed dups / `DUP-SUS` accepted-as-dup | Gold set | Monthly | Controls | 1→2 |
| Operational | Recall (gold) | Detected / known dups in window | Gold set | Monthly | Controls | 1→2 |
| Operational | False-positive hours | Hours clearing rejected `DUP-SUS` | Time | Monthly | Controls | Cost |
| Financial | Confirmed dup $ **not** paid | Sum | Ledger + log | Monthly | Controls | May report; not “fraud $” |
| Financial | Confirmed dup $ **paid** | Sum (target 0) | Ledger | Monthly | Payments | Demotion |
| Risk | Language violations (“fraud” in outbound) | Count | Sample | Monthly | Controls | |
| Risk | Auto-hold of fuzzy at Level < envelope | Count | A16 | Daily | Controls | Auto Level 0 |
| Risk | Index completeness gaps | Days gap ≠ 0 | Pack | Daily | A16 | Freeze screen claims |

Do not KPI “frauds caught”.

---

## 14. Performance history fields

Common fields, plus:

```
exact_hits
fuzzy_hits
anom_hits
cross_ledger_hits
gold_precision
gold_recall
confirmed_dup_paid_amount
false_positive_hours
native_check_also_fired
```

---

## 15. Starting autonomy level

**Level 1 — Recommend.** No auto-hold. First promotion: Level 2 hold-text, then Level 3 *exact* hits only. Anomaly never starts above 1.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Index incomplete | Count recon | Do not issue `clear` | A16 | Rebuild; rescreen open objects |
| Adapter down on one ledger | Health | Cross-ledger test degraded — label it | Systems | Backfill |
| Invoice number null | A01 | `HDR-ERR` not `clear` | A01 | After number |
| Model “this looks fraudulent” | Guardrail | Strip; keep tests only | Controls | Rule path |
| Gold set empty | Check | No promotion | Controls | Build set from history |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Index query cost | Adapter | Systems |
| False-positive investigation hours | Time | Controls — this is the tax on a noisy screen |
| Paid-duplicate unwind cost | Finance | Assistant Controller |

A cheap screen that pays duplicates is expensive.

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. Controls: Samuel Wright.

**Early screen.** Helion HF-88421 — exact key clear, UUID n/a, hash new. `clear`.

**Fuzzy later.** Helion sends `HF-88421A` for $14,260.00 two days later (corrected UoM) *without* a credit. A10 `DUP-SUS` fuzzy_num + amount. Samuel accepts the hold. A08 drafts “possible duplicate — please confirm credit for HF-88421 or cancel HF-88421A”. Not fraud language.

**Cross-ledger.** NPC receives a Pacific Castings bill that hashes equal to a PDF already parked in SAP NL10 for a different legal entity. Cross-walk says *related* not *same payee*. A10 flags `ANOM-SUS` / cross_ledger for a human to decide — it does not auto-merge.

**Paid miss (control story).** If HF-88421 had posted twice and F110 paid both, that $14,260 is `confirmed_dup_paid_amount`. Promotion freezes. A12 is in the incident. A10 is not allowed to say “we prevent fraud”.

**Illegal.** Deleting HF-88421A. Emailing Helion “your fraud is noted”. Auto-blocking vendor 4002187. Reporting $14,260 as fraud savings on a *suspect*.

**Control.** Pack header carries the disclaimer. Gold set adds HF-88421A as confirmed process duplicate (rebill without credit).

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
