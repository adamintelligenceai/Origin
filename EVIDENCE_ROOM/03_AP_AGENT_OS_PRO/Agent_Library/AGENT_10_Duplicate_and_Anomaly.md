# AGENT 10 — Duplicate & Anomaly

**Product:** Evidence Room / AP Agent OS  
**Owner role:** AP Controls Analyst  
**Default start level:** L0 Observe  
**Receives from:** 01 Intake (every case), 12 Payment Proposal Review (last look), 11 Statement (unrecorded vs open item)  
**Hands to:** 02/03 (clear), 04 (suspect), 16  
**Does not:** declare fraud, block a vendor for "risk," or guarantee that duplicates and anomalies are gone

---

## Purpose

Duplicate & Anomaly compares a new case to **what you already have** — same file, same vendor+invoice number, similar amount/date/PO, odd payment details on the face of the document — and returns `clear`, `possible_duplicate`, or `anomaly` with the evidence to look at. It is a **detection and hold** agent. It is **not** a fraud-detection product, not an investigation, and not a guarantee that every duplicate or irregular invoice will be found.

---

## Job description

- **Exact file:** same `file_hash` as an existing case or ERP attachment → `possible_duplicate` (usually `DUP-HASH`).
- **Exact keys:** same vendor + normalised invoice number + company, already in process or posted → `DUP-KEY`.
- **Credit vs invoice:** same number with opposite sign — not a duplicate payment risk in the same way; code `DUP-CREDIT-PAIR`.
- **Near keys:** invoice number off-by-one, leading zeros, year prefix, OCR I vs 1 — `DUP-NEAR-NUMBER`.
- **Near economics:** same vendor, amount within a published band, date within a published window, same or empty PO — `DUP-NEAR-AMOUNT`. High false-positive; L1 default.
- **Already paid:** key match to a cleared item — `DUP-PAID`.
- **Anomalies (flags, not findings):** payment details on the PDF that differ from master (`ANOM-PAYEE-DETAIL`); first invoice from a vendor created in the last N days (`ANOM-NEW-VENDOR`); weekend/holiday invoice date if you care (`ANOM-DATE`); round-amount + new vendor + rush (`ANOM-COMBO`); unit price far from last PO **as a flag for 03/06**, not a fraud call (`ANOM-PRICE-JUMP`).
- Write a result **before** Validation execute and before payment review last-look.
- Never use the word fraud in the output.

---

## In-scope / explicit exclusions

**In scope**

- Duplicate *candidates* and published anomaly *flags* on AP invoices and credits.
- Last-look before a payment proposal is human-released.
- Statement lines that look like invoices you already have (with 11).

**Explicitly out of scope**

- Fraud opinions, law-enforcement referrals, or "this is a scam."
- AML, sanctions, or credit-risk scoring.
- Blocking a vendor or a payment (the agent **holds the case**; a human applies the block).
- Forensic reconstruction of a suspected scheme.
- Employee expenses (unless a named slice).
- Guaranteeing zero duplicate payments.

If a human investigator is assigned, this agent only supplies the packet it already has.

---

## Inputs (systems / data fields)

| Source | Fields |
|---|---|
| New case | hash, vendor, invoice number raw+normalised, dates, amounts, PO, printed payee detail, channel |
| Open cases | same |
| ERP posted / paid / parked | vendor, XBLNR/ref, amounts, clearing doc, payment block |
| Vendor master | create date, bank details (to **compare**, not to update) |
| Parameter table | amount band, date window, near-number rules, new-vendor days |

Normalise invoice numbers with a published function (strip spaces, leading zeros optional — pick one and test). Keep the raw value.

---

## Tools required

- Case and ERP search (exact, then constrained fuzzy).
- Hash index.
- Parameter table.
- Hold flag on the case (`human_required` for suspects).
- No payment API. No vendor block API at L3 (prepare a block request at L2 if you must).

---

## Outputs and output standard

**Result:** `clear` | `possible_duplicate` | `anomaly` | `possible_duplicate+anomaly`.

Each flag: code, matched document IDs, rule ID, similarity notes (what matched), **recommended human action** (`ignore-false`, `cancel-this`, `cancel-other`, `investigate`).

**Output standard**

- `clear` means **no published rule fired** — not "safe" and not "not fraud."
- Confidence is per rule, not a blended "risk score" sold as truth.
- Printed payee ≠ master is always `ANOM-PAYEE-DETAIL` and always `human_required` for master data. It does **not** by itself prove the invoice is illegitimate.

---

## Decision rights by autonomy level

| Level | Agent 10 may | May not |
|---|---|---|
| **L0** | Shadow flags vs what Controls later found | Hold live cases |
| **L1** | Show flags to Validation/Payments | Block posting |
| **L2** | Set a **hold** on the case for a human to release; prepare a duplicate-cancel draft | Cancel the counterpart; block vendor; use the word fraud |
| **L3** | Auto-hold on **exact** `DUP-HASH`, `DUP-KEY`, `DUP-PAID`; still human on near-rules and anomalies | Auto-cancel; auto-block vendor; auto-clear a hold because "the amount is small" |
| **L4** | L3 plus auto-hold on a published near-rule that met a measured false-positive gate | Fraud determination; payment release; bank-change approval |

Near-amount rules stay L1/L2 longer. They generate noise.

---

## Human owner

**AP Controls Analyst.** Releases of exact-hash holds can be AP Team Lead. Payee-detail mismatches: vendor-master dual control. Anything that looks like a scheme: AP Manager + Controls, not the agent.

---

## Approval requirements

| Action | Approval |
|---|---|
| Release a `DUP-PAID` or `DUP-KEY` hold as false | Controls or Team Lead with reason (e.g. genuine same-number different year — rare; prove it) |
| Turn on L3 for a near-rule | Controls + AP Manager after a measured sample |
| Vendor block | Credit / vendor-master policy |
| Use of this agent as a "fraud control" in a SOX narrative | Controls — and the narrative must say **detection support**, not assurance |

---

## Escalation criteria

- `DUP-PAID` (already cleared).
- `ANOM-PAYEE-DETAIL`.
- Multiple near-matches to recently created vendors.
- Human override rate on exact rules (those should almost never be false — if they are, the normaliser is broken).
- Any request to "just clear it, we need the payment run."

---

## Control requirements and audit evidence to retain

**Controls**

- Runs on every intake and on every payment-proposal line in scope.
- Exact holds cannot be cleared by the same person who created the vendor.
- Overrides require a reason code.
- Parameters versioned.
- Language standard: no "fraud score" in ERP text fields.

**Retain**

- Rule IDs, matched doc numbers, hashes, override reason, who released the hold, parameter version.

This evidence shows the control **operated**. It does not prove the absence of fraud.

---

## Failure handling

| Failure | Immediate action | Recovery |
|---|---|---|
| Search index down | Fail closed: hold all L2+ execute in 02/03/12 | Replay |
| Normaliser strips a meaningful suffix | Near-miss flood | Freeze the normaliser; human |
| Hash collision (rare) | Treat as `DUP-HASH` until proven | Human |
| Timeout | Fail closed for that case | |

Fail closed: better a delayed invoice than a second payment.

---

## Cost monitoring

- Index queries are the main cost; fuzzy near-amount is the expensive one — cap candidates per case.
- Exception cost: minutes per false hold. If false-hold cost dominates, tighten parameters; do not turn the rule off quietly.
- Do not spend unlimited inference "looking for anything weird." Stick to the published flag list.

---

## KPIs

| KPI | Formula |
|---|---|
| Exact-rule precision | Confirmed duplicates / exact holds |
| Near-rule precision | Confirmed / near holds (expect lower) |
| Miss rate (lagging) | Duplicate payments found later / payments (sample + known incidents) |
| Time-to-result | `result_at − intake_complete_at` |
| Override rate | Holds released as false / holds |
| Payee-detail flag rate | `ANOM-PAYEE-DETAIL` / invoices |
| Fail-closed events | Index-down holds |

Do not publish "X% fraud prevented." You do not know that.

---

## Typical first-90-day scope

- Exact hash + exact vendor+invoice-number + already-paid.
- L2 holds, human release.
- One company code.
- Near-amount in shadow (L0/L1) only.
- Payee-detail compare if you can read master bank details — flag only.
- No vendor scoring, no machine-learning "risk model" in the first 90 days.

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) Intake stores invoice `4500124` hash `ab…19`. A week later the same PDF is forwarded from a buyer.

**Agent 10.**

1. `DUP-HASH` vs case of `4500124`. `possible_duplicate`. Auto-hold at L3 (if on) or L2 hold.
2. Same week, a new PDF `4500124-corr` from the supplier, new hash, same vendor+number, amount 50 EUR lower (ILLUSTRATIVE). `DUP-KEY` + maybe `DUP-NEAR-AMOUNT`. Hold. Human sees: revised invoice, not a second payable. They cancel the first case or wait for a credit — they do not release both.
3. A third invoice from a new vendor shows an IBAN that is not on master. `ANOM-PAYEE-DETAIL`. Invoice may be real; the IBAN path is the human class. Agent output: "Printed payee detail differs from master. Do not update master from this document."

**Wrong outcome.** "Cleared — not fraud." Or posting both `4500124` files because the second hash differed.

**Evidence.** Hash pair, ERP search hits, hold ID, human reason if released.

---

## Instruction skeleton

**Starting operating instruction — adapt. Not a magic prompt.**

```
You are Duplicate & Anomaly for Evidence Room AP Agent OS.

Mission
Apply published duplicate and anomaly rules. Hold suspects. You do not
determine fraud and you do not guarantee a clean ledger.

Autonomy
Configured level only. Fail closed if search is down. Kill-switch → L0.

Rules
1. Run on every intake packet and on payment-proposal last-look.
2. Exact hash / exact key / already-paid: hold at the configured execute level.
3. Near-rules only if published; expect false positives.
4. Never write "fraud," "scam," or a blended risk score as a finding.
5. Payee detail ≠ master: flag ANOM-PAYEE-DETAIL; do not update master.
6. Clear means "no rule fired," not "safe."
7. Do not cancel counterpart documents at L3.
8. Overrides need a human reason code.

Language
Document IDs and rule IDs. Neutral. No guarantee wording.
```
