# AGENT 02 — Invoice Validation

**Stack position:** After Intake, before Matching. Runs in parallel awareness with Duplicate & Anomaly (does not wait for Agent 10 except where a flag already exists).  
**Default autonomy:** L1 Recommend (commission at L0).  
**Human owner (typical):** AP Quality Lead  
**Payment authority:** None.  
**Northline instance:** Procedure `AP-VAL-002`; US entities live first; CA/MX L0 until tax field packs are signed.

---

## 1. Position in the stack

Validation answers one question: **is this capture record complete and internally consistent enough to enter match, approval, or exception?** It is a gate, not a posting engine.

A pass is a licence to *continue in the stack*. It is not a licence to pay, and it is not a representation that the invoice is legally perfect in every jurisdiction.

---

## 2. Job description

The Invoice Validation Agent applies a written checklist to each Intake capture record: required fields present, types valid, supplier identity resolvable to a single unblocked vendor, currency allowed for the company, invoice number format usable, dates plausible, arithmetic (net + tax ≈ gross), PO present when policy requires, credit-note sign, and tax *fields present* (not tax *position decided*).

It emits `PASS`, `FAIL` (coded), or `QUERY` (human must interpret). It does not calculate use tax, does not change vendor master, and does not “fix” the invoice to make it pass.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Object-driven | On Intake ready | Validation worksheet |
| Human QUERY desk | SSC hours | Interpret / fail / return to Intake |
| Daily | 17:00 ET | Fail-code mix, QUERY aging |
| Weekly | Friday | Checklist version vs fail mix (Agent 15 input) |

Do not batch Validation to “overnight” if Matching needs same-day worksheets. Northline runs Validation continuously 07:00–18:00 ET.

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Capture record + image | Agent 01 | Y |
| Validation checklist `AP-VAL-002` (version-hashed) | Controlled docs | Y |
| Vendor master: block, currency, tax IDs, payment hold, one-time flag, age | ERP | Y |
| Company allowed currencies and bill-to identifiers | ERP / policy | Y |
| PO existence check (number on face vs ERP, not a match) | ERP | If PO policy applies |
| Open Agent 10 flag (if already raised) | Agent 10 | If present, note on worksheet; do not auto-fail solely because a *new* flag might later appear |
| Prior invoices for number-collision hint | ERP / Orchestrator | N (hint only; Agent 10 owns duplicate decision) |
| Legal-entity assignment | Agent 01 or human | Y |

---

## 5. Tools / data required

| Tool / data | Privilege | ERP notes |
|---|---|---|
| Capture JSON + image | Read | — |
| Vendor master | Read | D365 VendTable; SAP LFA1/LFB1; Oracle Suppliers; NetSuite Vendor; Workday Supplier |
| PO header existence | Read | Existence and vendor-on-PO vs invoice vendor — not quantity match |
| Block / hold codes | Read | Pay hold ≠ validation fail automatically; record it |
| Checklist engine (rules, not a black-box score) | Read rules | Every fail needs a code |
| Orchestrator | Write status | `val_pass` / `val_fail` / `val_query` |
| Tax field dictionary | Read | Which IDs must be *present* by entity — Tax owns the dictionary |

No write to vendor, PO, or invoice posting tables.

---

## 6. Responsibilities

1. Confirm Intake `human_review_state` is not `pending` or `rejected`.
2. Apply checklist in published order. Stop-on-fatal vs continue-to-collect is defined in `AP-VAL-002` (Northline: continue-to-collect so specialists see the full fail set).
3. Resolve vendor: exactly one candidate above the deterministic threshold. Zero or many → `FAIL_VENDOR` or `QUERY_VENDOR`.
4. Test vendor not blocked for *invoicing* (distinguish invoice-block from payment-block; payment-block is recorded as `NOTE_PAY_HOLD` and still may `PASS` for match).
5. Test arithmetic: `|net + tax - gross| ≤ $0.02` or currency equivalent; else `FAIL_ARITH`.
6. Test dates: invoice date not > 8 days future; not older than policy (Northline: 18 months without Controls waiver).
7. Test currency ∈ company allowed set.
8. Test PO presence when document type requires it (Northline PO-required categories).
9. Test tax *fields present* per entity dictionary (US: none extra at header beyond amounts; CA: GST/HST registration on vendor or face; MX: RFC/UUID as specified by Tax). Missing field → `FAIL_TAX_FIELD`. Do not compute tax due.
10. Emit worksheet with codes, `PASS`/`FAIL`/`QUERY`, and evidence pointers.
11. Hand `PASS` to Matching (PO) or Approval (non-PO) per document type. Hand `FAIL`/`QUERY` to human Quality desk and, if coded as capture error, back to Intake.

---

## 7. Explicit exclusions

1. Payment authorisation or release.
2. Tax determination, use-tax accrual, withholding judgement, or e-invoice legal validity opinion.
3. Financial duplicate decision (Agent 10).
4. 2-way / 3-way match (Agent 03).
5. Vendor create, unblock, or bank edit.
6. Changing extract fields silently — corrections go through Intake human-review so the audit shows who changed what.
7. Treating `NOTE_PAY_HOLD` as a reason to hide the invoice from the stack.
8. Approving non-PO spend.
9. Declaring the invoice “compliant.”
10. Auto-passing first invoices from vendors < 90 days (mandatory QUERY).
11. CA/MX live PASS if those dictionaries are not signed (Northline Wave 1).

---

## 8. Human owner

| Field | Northline | Generic |
|---|---|---|
| Role | AP Quality Lead | AP Quality Lead |
| Named | Keisha Ward | Named |
| Backup | Ops Lead (Marcus Bell) | Named |
| Escalation | AP Manager; Tax desk on tax-field disputes | Same pattern |
| Owns | Checklist content with Controller; QUERY desk; fail taxonomy | Same |
| Does not own | Match tolerances, payments, vendor master writes | Same |

---

## 9. Approval requirements

| Output | Human | Condition |
|---|---|---|
| `PASS` | Sample only at L1 | Sample plan 25/day or 5%, greater |
| `FAIL` | Specialist confirms code or recodes | Before supplier/internal chase on the back of a fail |
| `QUERY_VENDOR` | Quality + Vendor Master | Same day |
| `QUERY_TAX_FIELD` | Tax desk | Before any match recommend |
| First invoice / vendor < 90 days | Quality + Vendor Master | Mandatory |
| Arithmetic fail that “looks like tax rounding” | Tax or Quality, not the agent | Do not loosen $0.02 in the job |
| Waiver of age > 18 months | Controls Lead | Written |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| QUERY aging > 1 business day | Quality Lead | Daily |
| Fail code `FAIL_TAX_FIELD` volume jump | Tax | 2 days of jump |
| Vendor master systematically missing tax IDs | Vendor Master | Weekly pack |
| Intake correction loop > 2 on same object | Ops Lead | On third return |
| Checklist vs ERP setup conflict | Controller | Before changing either |
| Service account cannot read vendor | IT | Immediate |

---

## 11. Output standard

| Field | Rule |
|---|---|
| `object_id` | Same as Intake |
| `agent_id` | `02` |
| `result` | `PASS` / `FAIL` / `QUERY` |
| `codes[]` | Controlled taxonomy |
| `notes[]` | Including `NOTE_PAY_HOLD` |
| `vendor_id` | Resolved or null |
| `document_path` | `PO_MATCH` / `NON_PO_APPROVAL` / `CREDIT` / `STOP` |
| `checklist_version` + hash | Mandatory |
| `tax_dictionary_version` | Mandatory |
| `evidence_uri` | Worksheet |
| `owner` | Quality role |
| `autonomy_level` | Recorded |

Fail taxonomy (minimum — extend, do not freestyle):  
`FAIL_VENDOR`, `FAIL_ARITH`, `FAIL_DATE`, `FAIL_CURRENCY`, `FAIL_PO_REQUIRED`, `FAIL_TAX_FIELD`, `FAIL_CREDIT_SIGN`, `FAIL_SCHEMA`, `QUERY_VENDOR`, `QUERY_ENTITY`, `QUERY_TAX_FIELD`, `QUERY_NEW_VENDOR`, `NOTE_PAY_HOLD`, `NOTE_ANOMALY_OPEN`.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| Completeness before match | No Agent 03 start without PASS | Join report |
| Tax field presence | Dictionary, not determination | Tax samples CA/MX when live |
| Vendor identity | Single resolved ID | Sample 25 PASSes |
| Checklist integrity | Hash on worksheet | Monthly |
| SoD | Quality ≠ payment releaser | Role review |
| No silent extract edit | Edits via Intake | Before/after log |

---

## 13. Audit evidence

Worksheets 7 years; checklist versions life-of-programme; QUERY decisions 7 years; sample logs 7 years; access 1 year. Retrieval by object ID in 15 minutes.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Same-day validation | % of ready Intake objects with a result same SSC day | Flow |
| PASS rate | PASSes / results (context, not a target to maximise) | Mix |
| Fail mix | Count by code | Process signal |
| QUERY aging | >1 day count | Staffing / master data |
| Recode rate | Human changes agent code | Checklist quality |
| False PASS (later found missing required field) | Count | Demotion input |
| Cost per 1,000 objects | Model + desk | Brake |

Do not KPI “tax accuracy” or “compliance rate.”

---

## 15. Performance history fields

Period; objects presented; PASS/FAIL/QUERY; codes; recodes; false PASSes; new-vendor QUERYs; pay-hold notes; checklist hash; dictionary hash; autonomy; incidents; cost; entity split.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow checklist |
| L1 | Live result; humans on QUERY/FAIL confirm; sample PASS | **Default** |
| L2 | Prepare return-to-vendor pack for FAIL codes on a whitelist (Agent 08 sends only after approval) |
| L3 | Auto-PASS only structured EDI that already passed Intake L3 subclass *and* deterministic vendor *and* arithmetic — still not tax determination |
| L4 | Exception review of that EDI subclass |

Hard ceiling without new charter: L1. Tax QUERY never auto-resolves.

---

## 17. Failure handling

| Failure | Immediate | Resume |
|---|---|---|
| Vendor read fail | `QUERY` not `PASS` | After ERP probe |
| Checklist hash missing | Stop agent | After pin |
| Intake still pending review | Refuse | When Intake ready |
| Arithmetic on tax-inclusive face formats | `QUERY` not creative math | Tax writes a rule if needed |
| Conflicting vendor keys | `QUERY_VENDOR` | Human |
| Clock/date timezone issues | Use company local date; flag | n/a |

---

## 18. Cost monitoring

Desk minutes on QUERY, recode clusters, model cost. Pause if recode > 20% for 2 weeks or false PASS cluster ≥ 10/week → L0.

---

## 19. Handoffs

| From | To | Trigger |
|---|---|---|
| 01 | 02 | Capture ready |
| 02 | 03 | PASS + PO path |
| 02 | 07 | PASS + non-PO path |
| 02 | Quality desk | FAIL / QUERY |
| 02 | 01 | Capture error |
| 02 | 08 | L2 return pack only if chartered |
| 02 | 10 | Worksheet available (10 may already have flagged) |
| 02 | 16 | Status |

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| Arithmetic tolerance | $0.02 |
| Future date slack | 8 days |
| Max age | 18 months |
| New-vendor window | 90 days |
| Continue-to-collect fails | Yes |
| Live entities | 1000, 1100 |

---

## 21. First 90 days

L0 two weeks on US companies. L1 when G0.* pass. Keep CA/MX on L0 until Tax signs dictionaries. Do not maximise PASS rate as a goal — that trains the agent to wave things through.

---

## 22. Worked example — Northline Industrials

**Object `WO-1048821`** (Lakeshore Steel, $19,596, PO 45007821, company 1000).

Checklist `AP-VAL-002.6` hash `a11e…`:

- Vendor V-10442 unique, not invoice-blocked. Payment block: none. Age 6 years.
- Arithmetic: 18,400 + 1,196 = 19,596. Pass.
- Date 6 Apr 2026, received 7 Apr. Pass.
- Currency USD allowed. Pass.
- PO required and present in ERP, vendor on PO = V-10442. Existence only. Pass.
- Tax fields for US-OH: amounts present. Pass (no determination).
- Agent 10: no open flag at validation time.
- Path: `PO_MATCH`. Result: `PASS`.

**Same day `WO-1049010`:** Canadian vendor, Hamilton, GST number blank on vendor and face. Entity still L0-live? Charter says CA is L0 — shadow only; human validates. If someone had turned on L1 early, agent must `FAIL_TAX_FIELD` / `QUERY_TAX_FIELD`, not PASS.

**`WO-1049104`:** Gross $10,000, net $10,000, tax $0, services, US. PASS on fields. Path `NON_PO_APPROVAL` if no PO. Use-tax might be due — **Tax/accrual later, not this agent.**

**`WO-1049220`:** Two vendor candidates share a similar name. `QUERY_VENDOR`. Keisha’s desk picks V-08811. Agent does not pick the higher name-score.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1048821
agent_id: 02
result: PASS
document_path: PO_MATCH
vendor_id: V-10442
codes: []
notes: []
checklist_version: AP-VAL-002.6
checklist_hash: a11e…
tax_dictionary_version: TAX-US-2026.1
autonomy_level: L1
owner: Keisha Ward
downstream: 03
```

---

## 24. What this agent does not replace

Tax department, vendor master quality, e-invoicing legal review, Matching, or Agent 10. A PASS is not an accounting opinion.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_02 Invoice Validation |
| Default autonomy | L1 (start L0) |
| Review | Quarterly or checklist/tax-dictionary change |
