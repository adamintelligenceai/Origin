# A02 — Invoice Validation Agent

| Field | Value |
|---|---|
| Agent ID | A02 |
| Name | Invoice Validation Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | E-invoicing/tax (tests, does not interpret); capture quality gate |
| Starting autonomy | Level 1 |
| Human owner (role) | AP Quality Lead |
| Backup owner (role) | AP Matching Lead |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Test each intake object for completeness, vendor identity, tax coding readiness, currency, and posting eligibility — and either release it to matching or open a coded exception — without posting, paying, or taking a tax position.

---

## 2. Job description

A02 is the quality gate between capture and match. It consumes `invoice_intake` objects from A01 (and early A10 results) and runs a deterministic checklist: required fields present, vendor unique and not blocked, company code and currency consistent, tax fields complete enough for the tax team’s rules engine, e-invoice UUID present when the channel requires it, credit notes signed correctly, and duplicate-clear flag not `dup_sus`.

**In population:** every object A01 marked `ready_for_validation`, including credits and non-PO.  
**Out of population:** statements (A11), payment proposals (A12), already-posted documents, and objects still in `HDR-ERR` at intake.

**Done at Level 1:** a coded pass/fail with evidence; a human accepts the validation result before A03 or A04 is dispatched. **Done at Level 0:** a nightly defect pack on a sample, no routing.

A02 may *flag* tax anomalies. Licensed tax advice is out of scope. Country e-invoice clearance remains a statutory system, not this agent.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| `invoice_intake` object | Yes | A01 | Do not invent; return to A01 |
| Artefact + extract | Yes | Extract store | `HDR-ERR` |
| Vendor master (status, tax IDs, payment block, one-time flag) | Yes | ERP adapter | `VND-UNK` |
| Vendor cross-walk | Yes if multi-ledger | MDM | Hold; do not assume SAP number = NetSuite |
| Company-code currency and tax jurisdiction table | Yes | Finance master | `CUR-ERR` / `TAX-ERR` |
| Tax rule interface (code list, recoverability flags) | Yes | Tax engine / ERP tax procedure | Flag incomplete; do not invent a code |
| E-invoice channel flag | Yes | Channel registry | Treat as paper/PDF rules |
| Approval matrix version (for non-PO readiness only) | Optional | Policy store | A07 will block later if needed |
| A10 early result | Optional | A10 | Run or re-call A10 before pass |
| Tolerance table | No | — | Matching is A03; A02 does not match |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Vendor status | BP / LFA1 / LFB1 blocks | Vendor hold | Supplier status | Vendor hold | Supplier hold | MDM |
| Tax procedure | Pricing / tax codes | Sales tax groups | Tax regime | Tax codes / nexuses | Tax engine | Vertex / Sovos / local |
| E-document check | eDocument cockpit | Electronic invoice | Fusion e-invoice | E-document | Country adapter | PEPPOL access point |
| Currency / FX | TCUR / company code | Currency mgmt | GL currency | Subsidiary currency | Company currency | Treasury |
| Parked doc display | MIR7 / FB60 | Pending invoice | Incomplete invoice | Pending bill | Draft invoice | Workflow |

**Read:** all of the above.  
**Write at Level 1:** validation result on the work object; reason codes.  
**Write at Level 2+:** annotations on the parked document (text / hold reason).  
**Write-never:** posted invoice, tax-code master changes, vendor changes, payment.

---

## 5. Responsibilities

1. Consume `ready_for_validation` objects in A16 priority order (aged, then value).
2. Re-verify header required fields; send residuals back to A01 with `HDR-ERR` rather than “fixing” silently.
3. Resolve vendor to exactly one `(source_system, vendor_id)`. If zero or many, `VND-UNK` to A08.
4. Test vendor payment block, deletion flag, one-time, and employee-vendor use on a commercial invoice.
5. Test currency vs company code; test FX rate date only for presence, not for treasury judgement.
6. Test tax: codes present or determinable; rates vs extract; e-invoice tax totals vs header. Mismatch → `TAX-ERR` to Quality / Tax, not a homemade code.
7. Test document class: credit note must have a negative or credit indicator consistent with the ledger’s convention.
8. Re-call A10 if lines or vendor changed since the early screen.
9. Issue `validation_result`: `pass_to_match` | `pass_to_approval` (non-PO) | `fail` with reason codes.
10. At Level 1, wait for human accept/edit/reject of the result before A16 dispatches A03/A04/A07.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never overwrite an extract field to “make it pass”.
- Never create a tax code, change a tax procedure, or declare recoverability.
- Never decide 2-way vs 3-way match (A03) or post the invoice.
- Never unblock a vendor or remove a payment hold.
- Never treat a failed e-invoice clearance as “optional paperwork”.
- Never pass an object with `DUP-SUS` still open.

---

## 7. Human owner

**AP Quality Lead** owns the checklist version, tax-interface contract, and the `TAX-ERR` / `CUR-ERR` queues. Backup: **AP Matching Lead**.

Tax department owns tax-position questions. Quality owns “is the invoice complete enough to proceed”. Those are different jobs.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Sample defect pack | Lead confirms sample selection | `A02_sample_pack` |
| 1 Recommend | Propose pass/fail + codes | Accept / edit / reject each result | `validation_decision` |
| 2 Prepare | Stamp parked doc with hold/pass text | Human releases the stamp by posting path | Parked doc change log |
| 3 Execute within guardrails | Auto-pass inside envelope (existing vendor, tax match, no blocks) | Sample + all fails still human | Envelope + sample |
| 4 Managed autonomy | Auto-pass named population | Recertify; handle `TAX-ERR` and blocks | Register + IA ack |

Level 3 auto-pass is not a post. It is permission for A16 to dispatch A03.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| Vendor blocked for payment | A08 + Payments Lead | `VND-BLK` |
| Tax mismatch ≥ local materiality (Northline illustrative $5,000 tax delta) | Tax + Quality | `TAX-ERR` |
| E-invoice UUID missing on a mandated channel | Intake + Tax | `HDR-ERR` |
| Currency not in company-code list | Assistant Controller | `CUR-ERR` |
| Employee vendor on a trade invoice | Controls | `CTRL-BRK` |
| Cross-walk maps one legal invoice to two ledgers | A10 + A16 | `DUP-SUS` |
| Fail rate on a channel > 2× that channel’s 20-day baseline (illustrative) | A01 + Quality | process |

**Do not escalate:** missing PO on a document the requester class already treats as non-PO — tag and send to A07 path. Do not escalate rounding of $0.01 on tax if the tax engine’s own rounding table accepts it (record the rule version).

---

## 10. Output standard

### 10.1 `validation_result` (on the work object)

```
result                    # pass_to_match | pass_to_approval | fail
reason_codes[]
vendor_id_resolved
source_system
company_code
tax.status                # matched | mismatch | incomplete | not_in_scope
tax.engine_ref
tax.delta_amount
currency.status
e_invoice.status          # ok | missing | mismatch | not_required
a10.status                # clear | dup_sus | not_run
checklist_version
evidence_refs[]
```

**Done (Level 1):** human `validation_decision` recorded; A16 may dispatch.

### 10.2 Nightly `A02_defect_pack`

Counts by reason code, channel, company code, and tax-delta aging. Top 10 vendors by fail count (not a naming-and-shaming list — a process signal).

### 10.3 Checklist version `A02_CHK_<yyyy-mm>`

The numbered tests. Changing a test is change control.

---

## 11. Control requirements

1. **Checklist is versioned.** A02 never runs an unpublished checklist.
2. **No silent field repair.** Corrections go back to A01 decision log or a human edit.
3. **SOD.** Quality Lead who accepts validation is not the F110 releaser.
4. **Tax interface.** A02 consumes codes; it does not author codes.
5. **Untrusted input.** A vendor-supplied tax rate is evidence, not authority.
6. **Completeness.** Objects stuck in validation > SLA (Northline illustrative: 8 operating hours) age into A16.
7. **Sample.** 25 fail and 25 pass objects weekly until first promotion.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Checklist versions | Change control | Local financial-record policy |
| Validation results + decisions | Work log | Same |
| Tax-engine request/response (redact secrets) | Adapter log | Same |
| Vendor-block snapshots at decision time | Work log | Same |
| Defect packs | A14 | Same |
| Objects passed despite `TAX-ERR` (should be zero) | Exception query | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Validated / intake-ready | Results issued / ready objects | Work log | Daily | Quality | Coverage → 1.00 |
| Operational | First-pass validation | Pass with 0 human field edits / results | Decision log | Weekly | Quality | 1→2 |
| Operational | Return-to-A01 rate | Sent back `HDR-ERR` / results | Work log | Weekly | Intake/Quality | Process |
| Operational | Validation aging p90 | Hours in validation state | Work log | Daily | A16 | |
| Financial | Tax-delta unresolved $ | Sum open `TAX-ERR` | Queue | Daily | Tax/Quality | |
| Financial | Blocked-vendor $ parked | Sum `VND-BLK` | Queue | Weekly | Payments | |
| Risk | Pass-then-reverse | Posted then reversed for a validation miss | Ledger | Monthly | Controls | Blocks 2→3 |
| Risk | Override-for-error | Agent_error class / results | Decision log | Weekly | Controls | Band |
| Risk | `DUP-SUS` passed | Count (target 0) | Work log | Daily | A10 | Auto review |

Do not report “tax automated %” as success. Completeness of tax *fields* is the measure.

---

## 14. Performance history fields

Common fields (§6.1 of the standard), plus:

```
pass_to_match
pass_to_approval
fail_by_reason_code
return_to_a01
tax_delta_sum
tax_delta_count
blocked_vendor_count
checklist_version
pass_then_reverse
```

---

## 15. Starting autonomy level

**Level 1 — Recommend.** No envelope. First promotion: Level 2 (stamp parked doc) after quality gates. Tax-fail auto-pass is never in an envelope.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Tax engine timeout | Adapter | `TAX-ERR` incomplete; do not pass | Tax + Systems | Retry; keep same object |
| Vendor master stale | Unexpected `not found` on yesterday’s vendor | Hold batch for that prefix | MDM | After refresh |
| Checklist unpublished | Version missing | Refuse to run | Quality | Publish |
| A01 object missing artefact | Store 404 | Return to A01 | Intake | Re-attach |
| Conflicting ledgers both claim company | Routing vs validation | Escalate A16 | A16 | Table fix |
| Model used to “guess” a tax code | Guardrail | Forbidden path; log `CTRL-BRK` | Controls | Human tax only |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Rule / API calls per object | Adapter + engine | Systems |
| Human minutes on fail queue | Time capture | Quality |
| False `TAX-ERR` hours | Tax team time on non-issues | Tax + Quality |
| Rework | Pass-then-reverse documents | Assistant Controller |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP S/4HANA + NetSuite NPC, 14-person AP team. Quality / matching lead: Diego Alvarez.

**Object.** `INV-NL10-20260914-4412` Helion Fasteners NA / HF-88421 / $14,260.00 / PO 4500218831. Maya has accepted the A01 extract.

**Level 1 run.** A02 checklist `A02_CHK_2026-09`:

- Header complete. Vendor 4002187 active, not blocked, not one-time.
- Company NL10 USD. Invoice USD. Pass.
- Tax: extract 8.25% vs NL10 tax code S1 8.25%; delta $0.00. `tax.status = matched`.
- E-invoice not required on this mailbox channel.
- A10 re-call: clear.
- Result: `pass_to_match`.

Diego accepts. A16 dispatches A03.

**Variant that fails.** Same invoice, tax extract $1,177.00 vs engine $0.00 (Helion billed tax on a direct-pay item). A02 issues `TAX-ERR`, does **not** change the tax code to “make MIRO happy”, and queues Tax. Diego rejects any suggestion to pass_to_match.

**Illegal at this level.** Posting. Inventing tax code S9. Unblocking a held vendor. Passing despite `DUP-SUS`.

**Control.** Weekly sample includes this pass and the tax fail. Override class on any “just post it” request is `preference` — and is a coaching item, not a promotion argument.

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
