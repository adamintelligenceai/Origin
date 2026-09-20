# A11 — Vendor Statement Reconciliation Agent

| Field | Value |
|---|---|
| Agent ID | A11 |
| Name | Vendor Statement Reconciliation Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Reporting (open-item integrity); Evidence Room extension |
| Starting autonomy | Level 0 |
| Human owner (role) | AP Reconciliations |
| Backup owner (role) | Assistant Controller |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Match supplier statements to open and paid items, list unmatched lines, and propose reconciling actions — without posting adjustments, promising payment, or treating a statement as an invoice.

---

## 2. Job description

A11 is the open-item conscience. Statements are how suppliers tell you what *they* think you owe. The agent observes completeness first: which priority suppliers sent statements, which were ingested, which lines matched to RBKP/BSEG or NetSuite bills, which are supplier-only (you have no invoice), which are books-only (they omitted a credit).

**In population:** statements from the priority-supplier list; ad-hoc statements A08/A04 attach.  
**Out of population:** the invoices themselves (A01), payment release (A12), and GL reconciliations that are not vendor subledger.

**Done at Level 0:** a recon pack Hannah Cole can tick true/false on a sample of lines. **Done at Level 1:** recommended match / `STMT-UNM` actions, unsent.

Statement formats vary. That is why this agent starts at Observe.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Priority supplier list | Yes | Policy | Do not claim completeness |
| Statement artefact | Yes | Channel / A08 | No recon |
| Open items + paid items in date window | Yes | ERP | Hard stop |
| Remit-to / alternate payer | Optional | Vendor master | Mis-match risk |
| Cross-walk | Yes multi-ledger | MDM | Separate packs per book |
| Match rules (invoice #, amount, date window) | Yes | Policy | Hard stop |
| Currency / FX | Yes | ERP | `CUR-ERR` lines |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Open items | FBL1N / BSIK | Vendor aged | Payables trial | Vendor open | Supplier open | |
| Paid items | BSAK / clearing | Settled | Paid | Paid bills | Settled | Bank |
| Statement ingest | PDF / portal / EDI | Same | Same | Same | Same | A01-like capture *as statement class* |

**Read:** subledger, payments, artefacts.  
**Write at Level 0:** pack.  
**Write at Level 1:** `statement_line` objects.  
**Write-never:** residual GL write-off, invoice create from a statement line (that is a *referral* to A01), payment.

---

## 5. Responsibilities

1. Maintain the priority list (Northline illustrative: top $ spend + chronic exception vendors + any supplier who charges late fees).
2. Ingest statements as `doc_class = statement` — A01 may capture; A11 owns recon.
3. Match lines: invoice number exact, then amount + date window, then residual.
4. Classify: `matched_open` | `matched_paid` | `supplier_only` | `books_only` | `amount_diff` | `unreadable`.
5. `supplier_only` → propose A01 missing-invoice hunt or A08 query — do **not** create an invoice from the statement line.
6. `books_only` → propose A08 “your statement omitted our credit/invoice”.
7. `amount_diff` → A04 with evidence; may be tax or partial pay.
8. Produce `A11_recon_pack` per statement and a weekly roll-up.
9. At Level 0, no supplier mail. At Level 1, recommend A08 drafts.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never post a residual to clear a difference.
- Never create an invoice from a statement line.
- Never treat “balance due” on the statement as a payment instruction.
- Never net SAP and NetSuite open items onto one statement unless they are the same legal entity *and* the supplier’s statement says so.
- Never promise a pay date in the recon pack.

---

## 7. Human owner

**AP Reconciliations** owns match quality and the priority list. Backup: **Assistant Controller**.

Hannah Cole does not own cash release.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Recon packs | Sample of lines true/false | `A11_recon_pack` + sample |
| 1 Recommend | Propose line class + next agent | Accept / edit / reject | `stmt_decision` |
| 2 Prepare | Draft A08 queries / A01 hunts | Human sends / opens | Child object + user |
| 3 Execute within guardrails | Auto-match **exact** invoice # + amount | Sample; residuals human | Envelope |
| 4 Managed autonomy | Named suppliers exact match | Recertify | Register + IA ack |

Write-offs stay human at every level.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| `supplier_only` $ ≥ materiality | Exception Lead + A01 | `STMT-UNM` |
| Supplier claims paid item still open (they missed remittance) | A12 / Treasury | `PAY-HOLD` review |
| Amount_diff ≥ policy | A04 | `STMT-UNM` |
| Priority supplier statement missing at close | A13 | `ACCR-GAP` |
| Statement used as invoice by intake | A01 defect | process |

**Do not escalate:** $0.01 rounding if the rule table says so. Do not escalate unreadable logos.

---

## 10. Output standard

### 10.1 `statement_header` + `statement_line`

```
supplier_id
statement_date
currency
line.ref
line.amount
line.class
line.matched_doc
line.next_agent
```

### 10.2 `A11_recon_pack`

Totals: statement $, books $, matched, supplier-only, books-only, unreadable. Completeness vs priority list. Disclaimer: statement is not a book of record.

**Done at Level 0:** pack + sample. **Done at Level 1:** line decisions.

---

## 11. Control requirements

1. **Priority list versioned.**
2. **Statement ≠ invoice** (A01 reject if misclass).
3. **No residual write-off** by this user.
4. **Per-ledger packs** unless legal entity identity is proven.
5. **Sample** 30 lines/week before Level 1.
6. **Close link:** missing priority statements appear on A13 checklist.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Statement artefacts | Store | Local financial-record policy |
| Line matches + decisions | Work log | Same |
| Packs | A14 | Same |
| Write-off requests (human) | Ledger | Same |
| Priority list versions | Policy | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Priority coverage | Statements ingested / priority due | List vs store | Monthly | Recon | Completeness |
| Operational | Exact-match rate | Exact matches / readable lines | Pack | Monthly | Recon | 0→1 |
| Operational | Sample true-match rate | True / sample | Sample | Weekly | Recon | 0→1 |
| Financial | Supplier-only $ | Sum | Pack | Weekly | AP Manager | |
| Financial | Books-only $ | Sum | Pack | Weekly | Recon | |
| Risk | Invoices created from statements | Count (0) | Audit query | Monthly | Controls | Auto Level 0 |
| Risk | Residuals posted by A11 user | Count (0) | Security | Daily | Controls | Auto Level 0 |
| Risk | Cross-ledger nets without identity | Count | Sample | Monthly | Controls | |

---

## 14. Performance history fields

Common fields, plus:

```
priority_due
statements_ingested
lines_exact
lines_supplier_only
lines_books_only
supplier_only_amount
invoices_from_statements
```

---

## 15. Starting autonomy level

**Level 0 — Observe.** Earn Level 1 after sample true-match rate is inside band for four weeks and priority coverage is measured (even if coverage is low — *measured* is the gate).

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Unreadable statement | Capture | Class unreadable; A08 ask for EDI/CSV | Owner | Re-ingest |
| Open-item extract timeout | Adapter | Pack delayed; no partial match posted | Systems | Retry |
| Duplicate statement | Hash | Ignore second | — | — |
| Model creates invoice | Guardrail | `CTRL-BRK` | Controls | Human A01 only |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Capture of messy PDFs | API | Systems |
| Human line-matching minutes | Time | Recon |
| Supplier portal licences | A14 | AP Manager |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. Reconciliations: Hannah Cole. Priority list includes Helion, Cinder River, Quay, Oakbridge, Veston, Pacific Castings.

**Observe.** Helion September statement: 42 lines, $218,440. A11 matches 39 to SAP open/paid. Two `supplier_only` (HF-88501, HF-88502 — not in A01). One `books_only` (credit HC-104 parked in SAP, omitted by Helion). Hannah’s sample of 10 lines: 10 true.

A11 does not create invoices for HF-88501/2. The pack lists them for A01 hunt (mailbox + portal) and, at Level 1 later, an A08 query.

**NetSuite.** Pacific Castings statement is NPC-only. Hannah does not subtract SAP Helion balances from it.

**Illegal.** Posting a $12.40 residual to expense to force a zero. Paying the statement total. Using the statement as the MIRO source.

**Control.** Pack header: “Statement is supplier assertion, not the book.” Security: `ER_A11_S4` display + pack write, no FB65 residual.

---

## 19. Line-match decision table

| Statement line vs books | Class | Next |
|---|---|---|
| Invoice # + amount + currency exact; item open | `matched_open` | None — informational |
| Invoice # exact; item cleared in window | `matched_paid` | If supplier still “open”, A08 remittance copy |
| Amount + date ± window; number garbled; unique | `matched_open` (fuzzy) | Human accept at Level 0–1 |
| On statement; no artefact in A01/ERP | `supplier_only` | A01 hunt, then A08 |
| In books; omitted on statement | `books_only` | A08 “omitted item” |
| Same number; amount differs > rounding rule | `amount_diff` | A04 |
| Cannot read | `unreadable` | A08 ask CSV/EDI |
| Statement total “please pay” | — | **Not a class.** Never a pay instruction |

Rounding rule is policy (illustrative: $0.01 or 1 unit of currency). Do not invent a $50 statement tolerance — that is match tolerance (A03), a different control.

### State machine

`ingested → lines_proposed → sampled (L0) / decided (L1) → children_opened (A01/A08) → statement_closed`.  
`statement_closed` does not clear AP open items.

### Northline Oakbridge example (illustrative)

Oakbridge Facilities statement shows OB-10044 $2,480. SAP has OB-10044 $2,440 (tax). Class `amount_diff` $40. Hannah does not accrue $40 from the statement. A02/A04 already own the tax question. A11 only records that the supplier’s assertion differs.

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
