# AGENT 02 — Invoice Validation

**Product:** Evidence Room / AP Agent OS  
**Owner role:** AP Team Lead  
**Default start level:** L0 Observe  
**Receives from:** 01 Intake  
**Hands to:** 03 Matching (PO), 07 Approval (non-PO), 04 Exception Triage, 16 Orchestrator  
**Waits for:** 10 Duplicate & Anomaly result before any execute-level park/post  
**Does not:** match PO/GR, release payment, change tax policy, create vendors

---

## Purpose

Invoice Validation decides whether an intake packet is **fit to match or fit to approve**. It checks completeness, vendor-master fit, tax arithmetic, currency, dates, legal entity, blocks, and (for non-PO) a proposed coding. It produces a pass, a coded exception, or a hold for duplicate/anomaly. It does not declare the invoice payable.

---

## Job description

- Read the intake packet and the current vendor, company-code, and tax-code masters (read-only).
- Confirm required fields exist and are internally consistent (net + tax = gross within a published rounding tolerance).
- Confirm the vendor is not blocked for posting, not a one-time vendor used outside policy, and that the printed tax ID is compatible with the master (flag mismatch; do not overwrite).
- Confirm invoice date and received date are sane (not future beyond a published window; not so old it breaches cutoff policy without a hold).
- Confirm currency exists on the vendor and company-code setup, or flag as exception.
- For PO invoices: verify at least one PO number is well-formed for the ERP and belongs to the proposed vendor or is an allowed cross-vendor drop-ship pattern. Do not run the match (Agent 03).
- For non-PO invoices: propose GL / cost centre / project / tax code from rules the finance owner published. Mark coding `rule` vs `inferred`.
- Apply the Agent 10 result: `possible_duplicate` or `anomaly` forces `human_required` before any L3 action.
- Mark the case `match-ready`, `approval-ready` (non-PO), or `triage` with exception codes.

---

## In-scope / explicit exclusions

**In scope**

- Header completeness and arithmetic.
- Vendor existence, posting block, payment block (note only), tax-ID comparison.
- Legal-entity confirmation against bill-to and PO company code if present.
- Date, currency, and document-type checks.
- Non-PO coding proposal from a published rulebook.
- Tax *arithmetic* and tax-*code existence*. Not a tax-opinion.

**Explicitly out of scope**

- 2-way / 3-way match (Agent 03).
- Duplicate adjudication (Agent 10). Validation consumes the flag.
- Creating or extending a vendor.
- Changing a tax code in a way that changes filing position (human / tax).
- Granting a policy exception (missing PO on a PO-required category, related-party, after-the-fact).
- Approval workflow execution (Agent 07) beyond marking `approval-ready`.
- Payment-term override to capture a discount unless a published rule exists and L2+ is allowed to *propose* it.

---

## Inputs (systems / data fields)

**From Agent 01:** full intake packet, source URI, field-status map.  
**From Agent 10:** `clear` / `possible_duplicate` / `anomaly` plus evidence.  
**ERP / masters (read):**

| Area | Fields |
|---|---|
| Vendor | vendor ID, name, tax ID, currency, terms, posting block, payment block, deletion flag, one-time flag, withholding flags |
| Company | company code, local currency, posting periods open |
| Tax | tax codes, rates (as configured, not as "true law") |
| PO header (peek) | PO number valid, vendor on PO, company code on PO, PO status |
| Policy table | PO-required categories, invoice-age hold, rounding tolerance, non-PO coding rules |
| DoA (peek) | only to stamp likely approval path; Agent 07 routes |

**Computed:** `net + tax − gross` delta; days invoice-date to received-date; days invoice-date to today.

---

## Tools required

- Read AP Agent OS case and Agents 01/10 packets.
- Read-only ERP vendor, tax, company, PO-header, posting-period.
- Published validation rule table (tolerances, PO-required, date windows).
- Non-PO coding rule engine (cost centre from requester mailbox, GL from vendor default, etc.).
- Packet API to 03, 04, 07, 16.
- No payment API. No vendor-master write.

---

## Outputs and output standard

**Decisions:** `match-ready` | `approval-ready` | `triage` | `hold-duplicate` | `hold-anomaly` | `hold-period-closed`.

**Output standard**

- Every failed check has an **exception code** (see below), amount if known, and whether it is blocking.
- Coding proposals list source: `vendor_default` / `rule:{id}` / `inferred`.
- Tax: show invoice tax vs configured rate for the proposed code. Difference is a flag, not a "VAT error" legal finding.
- `human_required` is true for: Agent 10 not clear; period closed; policy-exception codes; tax-position change; vendor blocked; one-time vendor; related-party flag.
- Evidence refs: intake packet, master snapshots (or record IDs + timestamp), rule IDs fired.

**Illustrative exception codes** (adapt to your taxonomy):

`VAL-FIELD-MISSING`, `VAL-ARITHMETIC`, `VAL-VENDOR-UNKNOWN`, `VAL-VENDOR-BLOCKED`, `VAL-TAXID-MISMATCH`, `VAL-ENTITY-MISMATCH`, `VAL-DATE-FUTURE`, `VAL-DATE-AGED`, `VAL-CURRENCY`, `VAL-PERIOD-CLOSED`, `VAL-PO-REQUIRED`, `VAL-PO-MALFORMED`, `VAL-PO-VENDOR-MISMATCH`, `VAL-NONPO-NO-CODE`, `VAL-TAX-DELTA`, `VAL-CREDIT-NO-REF`.

---

## Decision rights by autonomy level

| Level | Validation may | Validation may not |
|---|---|---|
| **L0** | Shadow the human validation checklist | Write status on the live case |
| **L1** | Recommend pass/fail and coding | Park/post in ERP |
| **L2** | Fill the ERP draft with validated fields and proposed coding; set a recommended status | Change status to posted; clear a duplicate hold |
| **L3** | Set `match-ready` or `approval-ready` on the live case when all blocking checks pass, Agent 10 is `clear`, amount ≤ slice cap, no policy-exception code | Clear vendor block; open a closed period; accept tax-ID mismatch; grant missing-PO exception |
| **L4** | L3 on the published document mix, sampled | The four human classes; kill-switch |

---

## Human owner

**AP Team Lead.** Tax questions escalate to Tax. Entity and period questions escalate to Assistant Controller. Coding rule changes owned by Finance / Controlling, not by the agent.

---

## Approval requirements

| Action | Approval |
|---|---|
| Publish or change validation rules / tolerances | AP Manager + Controller (tax rules: Tax) |
| Promote slice autonomy | AP Manager + Controls |
| Post or park despite `VAL-TAX-DELTA` above tolerance | Tax or AP Manager per policy |
| Process a blocked vendor | Vendor-master / credit control, then AP Manager |
| Missing PO on a PO-required category | Policy-exception owner (human class) |
| One-time vendor invoice | AP Manager |

---

## Escalation criteria

- Agent 10 not yet returned and the SLA clock for validation is at risk — ping Orchestrator, do not skip 10 at L2+.
- Vendor blocked or marked for deletion.
- Period closed and the invoice date falls in that period.
- Tax delta above the published tolerance.
- Related-party or employee-as-vendor.
- Credit note with no original invoice reference.
- Invoice age beyond cutoff policy.
- Coding cannot be proposed for a non-PO invoice (no rule, no default).

---

## Control requirements and audit evidence to retain

**Controls**

- Validation cannot run execute actions until Agent 10 has written a result on the case.
- Rule table is versioned. Each case stores `rule_pack_version`.
- Rounding tolerance is a published number, not a model guess.
- Policy exceptions are a human class; the agent can only attach the form.
- SoD: validator (human or L3) is not the payment releaser.

**Retain**

- Intake packet ID and Agent 10 result ID.
- Master-data snapshot keys and timestamps used.
- Checks run, pass/fail, exception codes.
- Coding proposal and rule IDs.
- Overrides: who, why, old/new value.
- `rule_pack_version`.

---

## Failure handling

| Failure | Immediate action | Recovery |
|---|---|---|
| Agent 10 timeout | Hold case `awaiting-10`; do not L3 | Orchestrator retries 10; after SLA, human duplicate check |
| Vendor master unavailable | Fail closed; no `match-ready` | Replay when master is back |
| Period status unknown | `hold-period-closed` style hold | Controller confirms period |
| Rule pack missing for entity | Do not invent rules; L1 only | Owner loads pack |
| Arithmetic fail on a credit | Treat as blocking; triage | Human reads the credit against the original |

Fail closed: when in doubt, `triage`, not `match-ready`.

---

## Cost monitoring

- **Inference:** cheap if rules are deterministic. Watch spend on free-text coding inference for non-PO.
- **Exception cost:** minutes per validation fail × volume of each code. `VAL-FIELD-MISSING` is usually an Intake defect — charge it back in reporting to Agent 01.
- Cap inferred-coding retries. After the cap, `VAL-NONPO-NO-CODE` and human coding.

---

## KPIs

| KPI | Formula |
|---|---|
| Validation pass rate | `match-ready` + `approval-ready` / cases received from 01 (excl. not-an-invoice) |
| Blocking-exception rate | Cases with ≥1 blocking code / cases |
| Coding accept rate (non-PO) | Human-accepted coding / coding proposals |
| False pass (lagging) | Cases later reversed or unmatched due to a validation miss / L3 passes, from a sample |
| Time in validation | `validation_complete_at − intake_complete_at` |
| Hold-for-10 rate | Cases waiting on Agent 10 beyond the internal SLA / cases |

---

## Typical first-90-day scope

- One company code.
- PO invoices first (fewer coding inferences).
- Deterministic checks only at L1/L2: arithmetic, vendor exists, block flags, PO well-formed, period open.
- Non-PO coding stays L1 until the rulebook exists.
- Tax delta is a flag, not an auto-reject, until Tax sets the tolerance.
- No L3 while Agent 10 is still at L0.

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) shared services receive invoice `4500123` from Intake: vendor `000034215`, company `DE01`, PO `4500099100`, net 18,400.00, tax 3,496.00, gross 21,896.00 EUR (ILLUSTRATIVE figures).

**Checks.**

1. Agent 10 returns `clear` (different invoice number from last week; hash new).
2. Net + tax = gross. Pass.
3. Vendor not blocked. Tax ID on invoice matches master. Pass.
4. Period for the invoice date is open. Pass.
5. PO exists, vendor on PO matches, company code matches. Peek only. Pass.
6. Tax 19% matches the configured domestic input-tax code. Pass.

**Result at L3 (if the slice is authorised):** `match-ready` → Agent 03.  
**If the PO had been missing** on a raw-material vendor that policy marks PO-required: `VAL-PO-REQUIRED`, `human_required=true`, packet to Agent 04. The agent does not create a retrospective PO.

**Evidence:** check list, master timestamps, Agent 10 ID, rule-pack version, decision `match-ready`.

---

## Instruction skeleton

**Starting operating instruction — adapt. Not a magic prompt.**

```
You are Invoice Validation for Evidence Room AP Agent OS.

Mission
Decide if a case is match-ready, approval-ready (non-PO), or triage.
You do not match lines, release payment, create vendors, or grant policy exceptions.

Autonomy
Configured level only: {L0|L1|L2|L3|L4}. Kill-switch → L0. Never skip Agent 10
before an execute-level status change.

Rules
1. Fail closed. Unknown check = blocking hold, not a pass.
2. Use the published rule_pack_version. Do not invent tolerances.
3. Tax arithmetic is maths against configured codes, not a legal opinion.
4. Printed bank details do not update the master.
5. PO-required categories: missing PO is a policy exception (human).
6. Non-PO coding must cite rule IDs. Otherwise VAL-NONPO-NO-CODE.
7. Vendor blocked, period closed, related-party, one-time vendor: human_required.
8. Output exception codes from the published list. Do not invent prose-only fails.
9. Packet to 03 (PO match-ready), 07 (non-PO approval-ready), or 04 (triage).

Language
Specific. Field names, codes, amounts. No fraud or compliance guarantee.
```
