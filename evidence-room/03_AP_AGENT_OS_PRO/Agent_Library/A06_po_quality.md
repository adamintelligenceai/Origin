# A06 — PO Quality Agent

| Field | Value |
|---|---|
| Agent ID | A06 |
| Name | PO Quality Agent |
| Domain | Invoice-to-pay / AP (procurement interface) |
| Forrester (Mar 2025) map | Matching (upstream defect); Evidence Room extension |
| Starting autonomy | Level 0 |
| Human owner (role) | Procurement Operations |
| Backup owner (role) | AP Matching Lead |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Detect purchase orders that will fail match — missing account, wrong vendor, unusable price, residual qty, date, or receipt rule — and produce a defect pack for procurement, without changing the PO or posting the invoice.

---

## 2. Job description

A06 is the upstream critic. Exception cost in AP is often a PO that should never have been released. The agent watches two populations: (1) invoices already coded `PO-MISS` / `PO-QLTY` / chronic `PRC-VAR` / `QTY-VAR`, and (2) at observe level, newly released POs scored against a defect checklist *before* an invoice arrives.

**In population:** PO-related exception objects; optional new-PO observe feed.  
**Out of population:** vendor master quality (A08), GR posting (A05), non-PO invoices (A07), and commercial negotiations (buyers).

**Done at Level 0:** a weekly defect pack Greta Holm will recognise. **Done at Level 1:** recommended defect codes on specific POs, still unread by buyers until accepted.

Procurement will reject a noisy critic. Start at Observe.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Exception objects with PO codes | Yes for exception path | A04 | Observe path may run |
| PO header/lines: vendor, price, qty, account, tax, dates, receipt indicator | Yes | ERP | Skip PO |
| Account assignment rules | Yes | Finance / MM | `account_unknown` defect |
| Info record / contract price (if policy uses them) | Optional | ERP | Price defect uses invoice vs PO only |
| Tolerance table (for “will fail” simulation) | Yes | Policy store | Delay observe scoring |
| Historical exception codes by PO type | Optional | A15 | Improves ranking, not required |
| Buyer directory | Yes | ERP | Owner = Procurement Ops |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| PO | ME23N / EKKO | Purchase order | PO | Purchase order | Purchase order | P2P |
| Release strategy | ME29N | Workflow | Approval | Approval | Approval | |
| Account assignment | EKPO KNTTP | Accounting | Distribution | Expense account | Worktags | |
| Info record | ME13 | Trade agreement | Blanket | Vendor price | Catalog | |

**Read:** PO, contract, account rules, exception history.  
**Write at Level 0:** defect pack.  
**Write at Level 1:** `po_defect` objects.  
**Write-never:** PO change, release, price update, invoice post, payment, vendor change.

---

## 5. Responsibilities

1. Reconcile A04 PO-related exceptions to open POs daily.
2. Score each in-scope PO against the published defect checklist (below).
3. Rank by: already blocking an invoice, $ at risk, repeat vendor/buyer, days to invoice expected.
4. Produce `A06_defect_pack` weekly for Procurement Operations and AP Matching.
5. On exception path, attach the defect evidence to the A04 object so A09 chases the *buyer* with a specific ask (add account, fix vendor, extend qty) rather than “please look”.
6. At Level 0, do not message buyers. At Level 1, recommend A09 tasks after human accept.
7. Feed A15 with defect clusters (account-assignment type, plant, vendor).
8. Never “fix” the PO in the ERP.

### Defect checklist (versioned)

| Code | Test |
|---|---|
| `PO-NO-ACCT` | Account assignment required and blank / invalid |
| `PO-VND-NE` | PO vendor ≠ invoice vendor (when invoice exists) |
| `PO-PRICE-0` | Zero or placeholder price on a goods line |
| `PO-QTY-EXH` | Remaining qty < typical invoice (or already exhausted) |
| `PO-CLOSED` | PO or line closed / deleted / finally invoiced |
| `PO-RCPT-FLG` | Receipt-required flag inconsistent with item category / policy |
| `PO-DATE` | Delivery date implausible vs invoice date (rule versioned) |
| `PO-CUR` | PO currency ≠ company / invoice without FX plan |
| `PO-SPLIT-BAD` | Header text only; lines not invoiceable |

These map *into* taxonomy `PO-QLTY` / `PO-MISS` when an invoice exists.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never change PO price, qty, vendor, or account.
- Never release a PO in the workflow.
- Never tell AP to ignore a missing account “and code it in MIRO” unless policy explicitly allows invoice-level coding (record the policy version).
- Never score employee or one-time vendors as ordinary trade POs.
- Never publish a buyer league table as a KPI (that is politics, not control).

---

## 7. Human owner

**Procurement Operations** owns the defect checklist, buyer routing, and whether a defect is a training issue or a master-data issue. Backup: **AP Matching Lead**.

Buyers own commercial price. A06 owns *structural* quality.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Weekly defect pack | Procurement Ops confirms true-defect sample | `A06_defect_pack` + sample |
| 1 Recommend | Propose defect codes + A09 task | Accept / edit / reject | `po_defect_decision` |
| 2 Prepare | Draft buyer task text | Human sends via A09 | Task ID |
| 3 Execute within guardrails | Auto-open A09 for checklist codes inside envelope | Sample | Envelope |
| 4 Managed autonomy | Named PO types | Recertify with Procurement | Register + IA ack |

PO write is never in the envelope.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| Same buyer > N confirmed defects in 20 days (illustrative: 10) | Category manager | process |
| Invoice blocked ≥ materiality by `PO-QLTY` | AP Manager + Procurement | value |
| Closed PO still receiving invoices | Vendor master + A08 + buyer | `PO-CLOSED` |
| Receipt-flag errors on a whole item category | Master data | `PO-RCPT-FLG` |
| Checklist unpublished | A16 | `CTRL-BRK` |

**Do not escalate:** a single price disagreement that is a true commercial `PRC-VAR`. That is A09 to the buyer, not a PO *quality* defect.

---

## 10. Output standard

### 10.1 `po_defect` object

```
po_id
po_line
buyer_named
defect_codes[]
already_blocking_invoice   # bool
invoice_object_ids[]
ask                        # specific: "add cost center on line 20"
severity
```

### 10.2 `A06_defect_pack` (weekly)

Counts by defect code, plant, PO type, $ blocked. Sample of 20 scored POs with true/false. No buyer shaming table in the *control* pack; a private ops list may exist outside this charter.

**Done at Level 0:** pack + sample sign-off. **Done at Level 1:** decisions on exception-linked POs.

---

## 11. Control requirements

1. **Checklist versioned.** Scoring against an unpublished list is forbidden.
2. **No PO write** on `ER_A06_*` users.
3. **Separate commercial vs structural.** Price fights stay `PRC-VAR`.
4. **Sample** 20 POs/week for true-defect rate before Level 1.
5. **Change control** on account-assignment rules consumed.
6. **Untrusted invoice text** does not rewrite the PO.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Defect packs + samples | A14 | Local financial-record policy |
| Decisions | Work log | Same |
| Security extract (no ME22N) | GRC | Same |
| Checklist versions | Change control | Same |
| $ blocked by PO-QLTY | A04 + A14 | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Exception coverage | POs scored / PO-related exceptions | Work log | Weekly | Proc Ops | → 1.00 |
| Operational | True-defect rate | Sample true / sample | Sample | Weekly | Proc Ops | 0→1 |
| Operational | Time PO-QLTY → PO usable | Days | Work log | Weekly | Matching | |
| Operational | Repeat defect on same PO type | Count | A15 feed | Monthly | Proc Ops | |
| Financial | $ blocked by PO-QLTY / PO-MISS | Sum open | A04 | Weekly | AP Manager | |
| Financial | Invoices parked against closed POs | Count / $ | ERP | Weekly | Proc Ops | |
| Risk | PO changes by A06 user | Count (0) | Security | Daily | Controls | Auto Level 0 |
| Risk | Commercial items miscoded as quality | Sample | Sample | Weekly | Proc Ops | |

---

## 14. Performance history fields

Common fields, plus:

```
defect_code_distribution
true_defect_sample
dollars_blocked
closed_po_invoices
po_writes_by_agent_user
observe_pos_scored
```

---

## 15. Starting autonomy level

**Level 0 — Observe.** Level 1 only after four weekly samples at true-defect rate inside band, plus the calendar gate.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| PO display auth missing | Adapter | Skip; log gap | Systems | Auth |
| Account rule table stale | Unknown account | Defect `PO-NO-ACCT` with low confidence | Finance | Update |
| Invoice vendor mismatch is a drop-ship design | Policy flag | Not a defect if policy says so | Proc Ops | Policy version |
| Model rewrites price | Guardrail | `CTRL-BRK` | Controls | Human only |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| ERP reads on new-PO observe feed | Adapter | Systems — throttle if noisy |
| Buyer minutes on false defects | Sample | Proc Ops |
| AP minutes on PO-QLTY | A04 time | Matching |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. Procurement operations: Greta Holm.

**Observe.** Weekly pack flags PO 4500225601 (Oakbridge Facilities, plant NL10-P01): line 10 account assignment blank on a K (cost center) item; receipt-required flag on a service line that policy says SES-only. No invoice yet. Greta’s sample: both true. Buyer is asked *by Greta*, not by the agent.

**Exception path later.** Invoice OB-10044 arrives, A03 cannot match (`PO-QLTY`). A04 routes to A06. At Level 0, A06 only adds evidence to the pack. A09 is not auto-opened.

**Illegal.** A06 filling the cost center from “the last PO for Oakbridge”. Releasing the PO. Telling Diego to post FB60 and skip the PO.

**NetSuite.** NPC purchase orders use different account (expense) rules. Separate checklist version `A06_CHK_NPC_2026-09`. Do not score NPC POs with the SAP KNTTP table.

**Control.** `ER_A06_S4` display-only on ME22N. Sample sheet signed.

---

## 19. Observe vs exception path

| Path | Trigger | Output at Level 0 | Output at Level 1 |
|---|---|---|---|
| Observe | New PO released in last 7 days (illustrative window) | Score on weekly pack | Defect object if accepted |
| Exception | A04 `PO-QLTY` / `PO-MISS` | Evidence attached to pack | `po_defect` + recommended A09 ask |

Throttle: if new-PO volume would flood the pack, sample by $ and by new buyers. Disclose the sample rate. A silent 5% sample labelled as “all POs” is a control break.

### Ask library (paste into A09)

| Defect | Ask (specific) |
|---|---|
| `PO-NO-ACCT` | “Add valid cost object on PO {id} line {n}. Invoice {inv} is parked.” |
| `PO-VND-NE` | “PO vendor {a} vs invoice vendor {b}. Confirm correct vendor or cancel.” |
| `PO-PRICE-0` | “Replace placeholder price on line {n}.” |
| `PO-QTY-EXH` | “Remaining qty {r}; invoice qty {q}. Extend or split.” |
| `PO-CLOSED` | “PO finally invoiced/closed; reopen per policy or reroute as non-PO.” |
| `PO-RCPT-FLG` | “Set receipt rule to policy for item category {c}.” |

If the ask cannot be written in one sentence, A06 is not ready to recommend A09.

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
