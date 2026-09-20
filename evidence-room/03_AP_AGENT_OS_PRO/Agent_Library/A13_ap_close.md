# A13 — AP Close Agent

| Field | Value |
|---|---|
| Agent ID | A13 |
| Name | AP Close Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Reporting (period integrity); Evidence Room extension |
| Starting autonomy | Level 0 |
| Human owner (role) | Assistant Controller / AP Manager |
| Backup owner (role) | Controller delegate |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Drive the AP period-close checklist, surface accrual gaps, and evidence task completion — without signing the close, posting unmanaged accruals, or opening the next period.

---

## 2. Job description

A13 is the close clerk. It watches the published calendar: inbound completeness (A01), GR/IR and RNIL/INR (A05), statement gaps (A11), parked invoices, held payments, intercompany payables if in policy, and whether tasks were *done* versus *ticked*.

**In population:** close tasks for each company code / subsidiary on the AP close calendar.  
**Out of population:** legal consolidation, tax provision (Tax owns), payment release, and the Controller’s sign-off.

**Done at Level 0:** a live checklist Elena Voss and Priya Menon can see, with red/amber/green *facts* (not opinions). **Done at Level 1:** recommended accruals *calculations* and task owners; humans post and sign.

Close sign-off is human at every level.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Close calendar + task list version | Yes | Policy | Hard stop |
| Period status (open/close) | Yes | ERP | Hard stop |
| A01 completeness packs for the period | Yes | A01 | Task fail |
| Parked / held invoice inventory | Yes | ERP | Completeness fail |
| GR/IR, INR, RNIL balances | Yes | ERP / A05 | `ACCR-GAP` |
| A11 priority statement status | Yes | A11 | Task amber |
| Accrual policy (what to accrue, materiality) | Yes | Controller | No accrual proposal |
| Intercompany AP list (if any) | Optional | Policy | Skip those tasks |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Period | MMRV / OB52 / FI period | Period close workspace | Close monitor | Period close | Close | |
| GR/IR | F.13 / WRX | Accrual | Accrual | Accrual | Accrual | |
| Parked docs | MIR7 / FB60 | Pending | Incomplete | Pending bills | Drafts | |
| Accrual post | FBS1 / journal | Journal | Journal | Journal | Journal | |

**Read:** period, inventories, balances.  
**Write at Level 0:** checklist state (work objects).  
**Write at Level 1:** accrual *worksheets*.  
**Write-never:** period open/close toggle, unmanaged journal, sign-off attestation, payment.

---

## 5. Responsibilities

1. Open a close workspace per period and company code at calendar start (e.g. P-3 days).
2. Pull task statuses from other agents: A01 gaps, A04 aged $, A05 INR, A11 missing statements, A12 last-run recon.
3. List parked documents that will miss the period if not posted or accrued.
4. Compute *candidate* accruals per policy (received-not-invoiced, invoiced-not-received if policy says so, unvouchered receipts). Show the math.
5. Flag `ACCR-GAP` when policy requires an accrual and evidence is missing.
6. Age tasks; A16 escalates SLA misses to Elena.
7. After human sign-off, freeze the workspace. Late invoices become next-period + explanation — A13 does not secretly reopen.
8. At Level 0, do not propose journals. At Level 1, propose worksheets only.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never sign the close or attest SOX completeness.
- Never open or close the posting period.
- Never post an accrual that is not on a human-approved worksheet.
- Never mark a task complete because a dashboard is green if the source pack is missing.
- Never mix NPC NetSuite close with SAP NL10 close in one attestation.
- Never accrue “a plug to hit the flash”.

---

## 7. Human owner

**Assistant Controller** owns sign-off and accrual policy. **AP Manager** owns task execution. Backup: Controller delegate.

Elena Voss signs. Priya Menon delivers the packs. A13 writes neither signature.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Checklist + source links | Elena signs close | `A13_close_workspace` + attestation |
| 1 Recommend | Accrual worksheets + task nudges | Human posts journals; Elena signs | Worksheet + journal user |
| 2 Prepare | Park accrual journals | Human posts | Parked journal + user |
| 3 Execute within guardrails | Post accruals *inside envelope* (recurring, capped) | Sample; **sign-off still human** | Envelope |
| 4 Managed autonomy | Named recurring accruals | IA ack; **sign-off still human** | Register + IA ack |

Period toggle and attestation never leave the human.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| A01 completeness gap on close day | Intake + Elena | completeness |
| INR $ ≥ materiality unexplained | Owen / A05 + Elena | `ACCR-GAP` |
| Task signed complete, source pack missing | Controls | `CTRL-BRK` |
| Period still open after deadline | Assistant Controller | calendar |
| Plug requested | Refuse + Controls | `CTRL-BRK` |
| NPC and SAP out of sequence vs policy | Systems + Elena | process |

**Do not escalate:** a single parked utility invoice under accrual materiality if policy says ignore. Do not escalate flash vs final timing that the calendar already allows.

---

## 10. Output standard

### 10.1 `A13_close_workspace`

```
period_id
company_code
calendar_version
tasks[].id
tasks[].owner
tasks[].state              # not_started | in_progress | evidence_attached | complete | waived
tasks[].evidence_refs[]
tasks[].completed_by_human
accrual_candidates[]
gaps[]
attestation_uri            # human
frozen_at
```

### 10.2 Accrual worksheet `A13_ACCR_<cc>_<period>`

Line-level: source doc, qty, $ , policy row, proposed account. Not a journal until a human says so.

### 10.3 Exception memo

Late invoices after freeze: ID, $, why missed, period they will hit.

**Done at Level 0:** every required task has evidence or a *written* waiver by Elena.

---

## 11. Control requirements

1. **Calendar and task list versioned.**
2. **Evidence or waiver** — no empty completes.
3. **No period toggle** on `ER_A13_*`.
4. **Separate workspace per ledger.**
5. **Accrual policy** dated; materiality stated (local, not invented industry %).
6. **Sample** last period’s waivers: still valid?
7. **Freeze** after sign-off.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Workspaces + attestations | Store | Local financial-record policy |
| Accrual worksheets vs journals | Store + ledger | Same |
| Waivers | Controller file | Same |
| Completeness packs cited | A01/A11/A05 | Same |
| Security (no OB52) | GRC | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Task coverage | Tasks with evidence or waiver / required | Workspace | Each close | AP Manager | → 1.00 |
| Operational | Calendar hit | Signed by deadline (Y/N) | Calendar | Each close | Elena | |
| Operational | Empty-complete count | Completes without evidence (0) | Audit | Each close | Controls | |
| Financial | Accrual $ posted vs worksheet | Difference (0) | Ledger | Each close | Elena | |
| Financial | Late-invoice $ after freeze | Sum | Memo | Each close | AP Manager | |
| Risk | Agent period toggles | Count (0) | Security | Daily | Controls | Auto Level 0 |
| Risk | Plug journals | Count (0) | Review | Each close | Controls | |
| Risk | Cross-ledger single attestation | Count (0) | Sample | Each close | Controls | |

---

## 14. Performance history fields

Common fields, plus:

```
tasks_required
tasks_evidenced
waivers
signed_on_time
accrual_worksheet_amount
accrual_posted_amount
late_invoice_amount
period_toggles_by_agent
```

---

## 15. Starting autonomy level

**Level 0 — Observe.** Survive two closes as a checklist before Level 1 worksheets (`RESPONSIBILITY_MODEL.md` also requires calendar time). Sign-off never promotes.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Period API down | Adapter | Checklist manual; no fake green | Systems | Refresh |
| Source pack missing | Link 404 | Task cannot complete | Owner | Restore pack |
| Accrual policy unpublished | Lookup | No proposals | Elena | Publish |
| Model plugs to flash | Guardrail | `CTRL-BRK` | Controls | Human only |
| Someone opens period after freeze | ERP event | Alert Elena | Elena | Document |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Close-week human hours | Time | AP Manager |
| Accrual rework | Reversals next period | Elena |
| Idle close tools | A14 | Systems |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. Assistant Controller: Elena Voss. AP Manager: Priya Menon. Calendar `NL-CLOSE-2026-09` (illustrative): SAP NL10 sign-off T+4 working days; NPC T+5.

**September close, Level 0.** Workspace lists 18 tasks. A01 completeness gap = 0 for the last five operating days. A05 INR $1.84m of which $210k is `received_not_posted` at Columbus (Owen). A11: Veston statement missing — amber, waiver request: Veston always sends T+6; accrue from PO receipts instead. Hannah attaches the worksheet *she* built; A13 only linked the missing statement. Elena waives the Veston statement task with a dated note and signs SAP NL10. NPC workspace is still open — she does not sign it “to be efficient”.

**Illegal.** A13 posting $210k because flash needed it. Flipping MMRV. Marking A01 complete when Monday’s pack was missing. One signature covering SAP + NetSuite.

**Control.** Attestation PDF names Elena, period, company codes. `ER_A13_S4` has no period-close authorisation.

---

## 19. Illustrative close task list (Northline SAP NL10)

Replace locally. Version inside `NL-CLOSE-2026-09`.

| ID | Task | Evidence | Owner |
|---|---|---|---|
| C01 | A01 completeness last 5 operating days gap = 0 | `A01_completeness_daily` | Maya |
| C02 | Parked invoice inventory listed | ERP extract | Diego |
| C03 | Exceptions > 10 days explained | `A04_aging_pack` | Marcus |
| C04 | INR / received-not-posted | `A05_gap_pack` | Owen |
| C05 | Priority statements in or waived | `A11_recon_pack` | Hannah |
| C06 | Accrual worksheet vs policy | `A13_ACCR_NL10_<period>` | Hannah / Elena |
| C07 | Accrual journals = worksheet | Ledger vs sheet | Elena |
| C08 | Last A12 file recon clean | `A12_file_recon` | Tomoko |
| C09 | A10 paid-dup $ = 0 or incident filed | A10 monthly | Samuel |
| C10 | Intercompany AP (if any) | Policy list | Elena |
| C11 | NPC *not* included in this attestation | Separate workspace ID | Priya |
| C12 | Sign-off | Attestation | Elena |

Waivers require: reason, $ impact, expiry (usually next period), Elena user ID. A13 will not complete C12 if C01 or C07 is red.

### Accrual candidate types (policy-gated)

| Type | Source | A13 may propose at Level 1? |
|---|---|---|
| Received not invoiced | GR without invoice | Yes, if policy |
| Invoiced not received | Invoice without GR | Rare; usually hold, not accrue |
| Unvouchered recurring | Contract schedule | Yes, if contract on file |
| Statement-only | A11 `supplier_only` | No — hunt invoice first |
| Flash plug | “Need to hit number” | Never |

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
