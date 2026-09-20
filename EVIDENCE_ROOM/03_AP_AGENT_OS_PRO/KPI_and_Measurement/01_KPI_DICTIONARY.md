# Evidence Room — AP Agent OS Professional

## KPI and Measurement — 01 Dictionary

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** KPI and Measurement  
**Standard:** Proof before permission  
**Version:** 1.0  
**Rule:** If a number is not here, it is not a KPI. Vendor names for the same idea must be mapped to an ID.

**Card fields:** family, definition, formula, data source, owner, target-setting method, gaming risks, what can go wrong, control, evidence.

Placeholders `[BUYER]` are completed locally. Do not paste “typical” percentages.

---

### Notation

- Period `P`, scope `S` (entity × channel × invoice type × agent, as stated).  
- `n` = denominator count. If `n < n_min`, publish **count only**.  
- Gold labels = human-adjudicated expected outcome (created **before** seeing the agent, for Test; for live QA, independent sample).  
- `correct` = matches gold / policy, not “looks right.”

---

## Accuracy and error

### KPI-ACC-CLS — Classification accuracy

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of items whose **taxonomy code** (or “STP / no exception”) matches gold. |
| **Formula** | `correct_classifications / items_scored` |
| **Data source** | QA / Test labelled file; agent output code |
| **Owner** | AP Manager (operate); Exception owner (gold for their family) |
| **Target method** | Baseline from labelled pack; guardrail on high-risk codes (DUP, PAY, TAX, MDM-bank) separately |
| **Gaming** | Score only easy codes; drop UNMAPPED from the denominator |
| **What can go wrong** | Gold created after seeing the agent |
| **Control** | Labels-first; high-risk codes reported separately |
| **Evidence** | Label file ID; confusion matrix |

### KPI-ACC-EXT — Extraction accuracy

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of **critical fields** (buyer list: e.g. supplier, invoice #, dates, amounts, tax, PO, entity) that cite-match the source. Field-level, then optionally document-level (all critical fields correct). |
| **Formula** | Field: `correct_fields / fields_scored`. Document: `docs_with_all_critical_correct / docs_scored` |
| **Data source** | Source image/PDF; extract; cite-check log |
| **Owner** | AP Manager; FinSys for model |
| **Target method** | Per-field baselines; document-level is the promotion-relevant view |
| **Gaming** | Score non-critical fields (addresses) to inflate |
| **What can go wrong** | “Fuzzy amount” counted correct |
| **Control** | Critical field list versioned; exact/documented rounding only |
| **Evidence** | Field list version; QA sample |

### KPI-ACC-MAT — Matching accuracy

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of PO-match decisions (match / exception code EX-MAT-* / EX-GR-* / EX-PO-*) that match gold **using documented tolerances**. |
| **Formula** | `correct_match_decisions / po_items_scored` |
| **Data source** | Deterministic compare log; gold |
| **Owner** | Head of AP (policy); AP Manager (operate) |
| **Target method** | Baseline on labelled PO sample; do not target “more matches” |
| **Gaming** | Widen tolerance; exclude multi-line |
| **What can go wrong** | Model explanation scored instead of the compare |
| **Control** | Tolerance version cited; model cannot pass a fail |
| **Evidence** | Compare log; policy version |

### KPI-ERR-FPR — False-positive rate

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of **negative** gold items (e.g. not duplicate, not mismatch) that the agent flagged positive. State the **condition** (duplicate, mismatch, …). |
| **Formula** | `FP / (FP + TN)` for that condition |
| **Data source** | Labelled file |
| **Owner** | Exception owner for that condition |
| **Target method** | Ceiling (guardrail). Set with FNR — do not minimise FPR alone |
| **Gaming** | Rarely flag; FPR looks great |
| **What can go wrong** | Staff drown and auto-clear (see intervention / override) |
| **Control** | Report FPR **with** FNR and volume of flags |
| **Evidence** | Confusion matrix |

### KPI-ERR-FNR — False-negative rate

| Field | Content |
|---|---|
| **Family** | Operational / Risk-control (high-risk conditions) |
| **Definition** | Share of **positive** gold items missed by the agent. |
| **Formula** | `FN / (FN + TP)` |
| **Data source** | Labelled file; for duplicates, include a paid-population sample |
| **Owner** | Control owner for DUP/PAY/TAX/bank; AP Manager otherwise |
| **Target method** | Strict ceiling on high-risk conditions; blocks promotion if breached |
| **Gaming** | Exclude paid items from gold; only sample flagged items |
| **What can go wrong** | Quiet wrong payments |
| **Control** | Paid-population sample for EX-DUP; incident if paid FN |
| **Evidence** | FN list; paid sample ID |

---

## Flow and effort

### KPI-OPS-EXR — Exception resolution rate

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of exceptions **closed in P** that were closed with a valid reason (not UNMAPPED dump, not aged-ignore). |
| **Formula** | `valid_closes_in_P / exceptions_available_in_P` — define available as open-at-start + new. State if you use a cohort (opened in P) instead. |
| **Data source** | Exception store; taxonomy |
| **Owner** | AP Manager |
| **Target method** | Baseline + capacity; guardrail: close-as-no-issue above cap |
| **Gaming** | Mass-close; change codes to easy closes |
| **What can go wrong** | Resolution ≠ correct resolution (use rework) |
| **Control** | QA of closes; rework rate beside this KPI |
| **Evidence** | Close extract |

### KPI-OPS-STP — Straight-through processing rate

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of invoices in `S,P` that posted (or reached the buyer’s “STP milestone”) **with no human exception handling and no override**. Touchless capture-only is **not** STP if a human still matched. |
| **Formula** | `stp_invoices / invoices_in_scope` |
| **Data source** | Workflow + ERP status + override log |
| **Owner** | Head of AP |
| **Target method** | Baseline mix-adjusted; **never** without FNR/breach guardrails |
| **Gaming** | Route hard items out of scope; default coding; disable ERP checks |
| **What can go wrong** | Fast and wrong |
| **Control** | Mix table; risk-control block; ERP controls still on |
| **Evidence** | Milestone definition version |

### KPI-OPS-HIR — Human intervention rate

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of agent-touched items where a human edited, rejected, or force-pathed the output. |
| **Formula** | `items_with_OV-REJ_or_OV-COR_or_OV-FCE / agent_touched_items` (state if AGR-with-edit is included — default yes via COR) |
| **Data source** | Override log |
| **Owner** | AP Manager |
| **Target method** | Descriptive first. A fall is not “good” if FNR rises |
| **Gaming** | Rubber-stamp AGR to look autonomous |
| **What can go wrong** | Intervention hidden by not logging |
| **Control** | Mandatory AGR/REJ/COR before close when agent output exists |
| **Evidence** | Override log |

### KPI-OPS-ART — Average resolution time

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Mean (and median — publish both) elapsed time from exception **create** to **valid close**, by code. |
| **Formula** | `sum(close_ts - create_ts) / n` and median of the same |
| **Data source** | Exception store |
| **Owner** | Exception owner / AP Manager |
| **Target method** | Policy clocks if any; else baseline. Use median as the steering figure |
| **Gaming** | Close and reopen; park off-system |
| **What can go wrong** | Mean dominated by one item |
| **Control** | Report median + p90; reopen count |
| **Evidence** | Timestamp extract |

### KPI-OPS-TTP — Time to invoice posting

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Elapsed from **receipt at first AP channel** to **posted** (buyer defines posted). |
| **Formula** | Median and p90 of `post_ts - intake_ts` for invoices posted in P |
| **Data source** | Capture/channel timestamp; ERP post timestamp |
| **Owner** | AP Manager |
| **Target method** | Baseline same mix; payment terms are **not** this KPI |
| **Gaming** | Delay intake timestamp; post to a dummy then reverse |
| **What can go wrong** | Faster post of incomplete items |
| **Control** | Completeness schema; rework / reversal count |
| **Evidence** | Dual timestamps |

---

## Volume (activity)

### KPI-ACT-INV — Invoices handled

| Field | Content |
|---|---|
| **Family** | **Activity** |
| **Definition** | Count of invoices that reached a stated milestone (received / extracted / posted — **state which**). |
| **Formula** | `count(invoices, milestone, S, P)` |
| **Data source** | Channel + ERP |
| **Owner** | AP Manager |
| **Target method** | Not a performance target; capacity planning only |
| **Gaming** | Split invoices; reprocess to count twice |
| **Control** | Unique invoice key; state milestone |
| **Evidence** | Extract |

### KPI-ACT-EXC — Exceptions handled

| Field | Content |
|---|---|
| **Family** | **Activity** |
| **Definition** | Count of exception records created or touched in P (state created vs touched). |
| **Formula** | `count(exceptions, event, S, P)` |
| **Data source** | Exception store |
| **Owner** | AP Manager |
| **Target method** | None as a success target |
| **Gaming** | Split codes to inflate “handled” |
| **Control** | Pair with resolution quality and repeats |
| **Evidence** | Extract |

---

## Quality of exceptions and duplicates

### KPI-OPS-REP — Repeat exception rate

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of exceptions in P whose **supplier + code** (or buyer + code, state which) already occurred in a look-back `[BUYER: e.g. 90 days]`. |
| **Formula** | `repeat_exceptions / exceptions_in_P` |
| **Data source** | Exception store |
| **Owner** | Root-cause owner / AP Manager |
| **Target method** | Baseline; actions owned when above a buyer gate |
| **Gaming** | Recode to a new code to reset repeat |
| **Control** | Recode QA; Root Cause accept log |
| **Evidence** | Repeat report |

### KPI-OPS-DUP — Duplicates detected

| Field | Content |
|---|---|
| **Family** | Operational / Activity hybrid — report as **count + rate** |
| **Definition** | Count of items marked EX-DUP-001 (and separately EX-DUP-002) in P that QA confirmed as correctly flagged (TP). Also publish raw flags. |
| **Formula** | `TP_DUP001` and `flags_DUP001`; rate `TP / invoices_in_P` if n allows |
| **Data source** | Exception store + QA |
| **Owner** | Exception owner |
| **Target method** | Do not target “more duplicates” (encourages FPR) |
| **Gaming** | Flag everything similar |
| **Control** | FPR/FNR pair |
| **Evidence** | QA file |

### KPI-RSK-DPP — Duplicate payments prevented (where measurable)

| Field | Content |
|---|---|
| **Family** | Risk-control / Financial (cash) — **only if measurable** |
| **Definition** | Count (and amount) of items that were **on a payment proposal or payable status** and were removed **because** of a confirmed EX-DUP-001 **before** payment file. If you cannot see proposal membership, **do not estimate**. Leave blank. |
| **Formula** | `count/sum(confirmed_dup_removed_from_proposal)` |
| **Data source** | Proposal versions + exception + payment file |
| **Owner** | Payment preparer / AP Manager; Controller if amount is published |
| **Target method** | None. Descriptive. Not a savings claim unless Controller validates |
| **Gaming** | Count flags that were never payable |
| **Control** | Must have proposal-before / after evidence |
| **Evidence** | Proposal diffs |

---

## Follow-up, ageing, compliance-to-policy (operational)

### KPI-OPS-OSF — On-time supplier follow-up

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of supplier-facing actions required by SOP clocks (PO# request, CN request, reject-quality) completed on or before the clock. |
| **Formula** | `on_time_supplier_actions / supplier_actions_due` |
| **Data source** | Chase / send log; SOP clock table |
| **Owner** | AP Manager |
| **Target method** | Policy clock; if no clock, do not invent 24h — set a clock first |
| **Gaming** | Send empty mail to “meet” the clock |
| **Control** | Cite-check; artefact ID required |
| **Evidence** | Send log |

### KPI-OPS-OIF — On-time internal follow-up

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Same as OSF for internal recipients (GR, approval, coding). |
| **Formula** | `on_time_internal_actions / internal_actions_due` |
| **Data source** | Chase log |
| **Owner** | AP Manager |
| **Target method** | Policy clock |
| **Gaming** | Message the wrong person to stop the clock |
| **Control** | Recipient allow-list |
| **Evidence** | Chase IDs |

### KPI-OPS-AGE — Ageing reduction

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Change in aged stock vs baseline: count and value of items older than `[BUYER buckets]`, same scope. |
| **Formula** | `aged_P - aged_baseline` (show both count and value; reduction is negative change) |
| **Data source** | Open items + exceptions snapshot |
| **Owner** | AP Manager |
| **Target method** | Baseline snapshot ID; mix-aware |
| **Gaming** | Write-off or mass-close; move to a holding queue without age |
| **Control** | EX-AGE-001 rules; close QA |
| **Evidence** | Snapshots |

### KPI-OPS-POT — Payment-on-time rate

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Share of paid items paid on or before **the buyer’s** due-date rule (invoice due, scheduled date, or early-pay programme — **state which**). |
| **Formula** | `paid_on_time / paid_in_P` (and optionally `payable_due_in_P` cohort) |
| **Data source** | Payment file; terms |
| **Owner** | AP Manager / Treasury (if Treasury owns the run) |
| **Target method** | Baseline; do not sacrifice DUP/holds to hit POT |
| **Gaming** | Change terms; pay early everything; lift holds |
| **Control** | Hold and DUP breaches reported alongside |
| **Evidence** | Payment extract |

### KPI-OPS-GRR — Missing-receipt reduction

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Change in open EX-GR-001 count/value vs baseline snapshot. |
| **Formula** | `open_GR001_P - open_GR001_baseline` |
| **Data source** | Exception store |
| **Owner** | GR process owner + AP Manager |
| **Target method** | Baseline; guardrail: GR-create by agent = 0 |
| **Gaming** | Fake GRs; recode to EX-GR-002 |
| **Control** | GR-create audit |
| **Evidence** | Snapshots + audit |

### KPI-OPS-POC — PO compliance improvement

| Field | Content |
|---|---|
| **Family** | Operational |
| **Definition** | Change in share of in-scope invoices that have a **valid** PO when policy requires one (not merely a string in a field). |
| **Formula** | `valid_po_invoices / po_required_invoices` now minus baseline |
| **Data source** | Policy flag; EX-PO-001–004 |
| **Owner** | Procurement lead |
| **Target method** | Baseline; after-the-fact POs **excluded** from “compliant” unless policy says they count (default: exclude) |
| **Gaming** | Retro-PO factory |
| **Control** | Retro-PO flag |
| **Evidence** | Policy + extracts |

---

## Cost and economics

### KPI-FIN-CPI — Cost per invoice

| Field | Content |
|---|---|
| **Family** | Financial (cost) |
| **Definition** | Fully specified AP processing cost for `S,P` divided by invoices at the stated milestone. **Components must be listed** (people, vendor, inference, allocations). |
| **Formula** | `ap_cost_P / invoices_P` |
| **Data source** | Cost model workbook (buyer); volume extract |
| **Owner** | Controller (cost model); AP Manager (volume) |
| **Target method** | Buyer cost model; no external benchmark required |
| **Gaming** | Move cost to “project”; change allocation |
| **What can go wrong** | Compared to a blog’s “world-class cost” |
| **Control** | Frozen cost-model version; same milestone as volume |
| **Evidence** | Workbook version |

### KPI-FIN-CPE — Cost per exception resolved

| Field | Content |
|---|---|
| **Family** | Financial (cost) |
| **Definition** | Exception-handling cost / valid closes in P. |
| **Formula** | `exception_cost_P / valid_closes_P` |
| **Data source** | Cost model; exception store |
| **Owner** | Controller / AP Manager |
| **Target method** | Internal |
| **Gaming** | Cheap-close junk codes |
| **Control** | Pair with rework and QA |
| **Evidence** | Workbook |

### KPI-FIN-AIC — AI inference cost

| Field | Content |
|---|---|
| **Family** | Financial (cost) |
| **Definition** | Sum of model/vendor usage charges attributable to AP agents in P (tokens, pages, seats — **state units**). |
| **Formula** | `sum(vendor_charges_P, agents in S)` |
| **Data source** | Vendor invoices / API ledger |
| **Owner** | Finance Systems + AP Manager |
| **Target method** | Budget; cost per **correct** outcome matters more |
| **Gaming** | Hide shadow tools |
| **Control** | Approved-tool list; ledger vs tools |
| **Evidence** | Ledger |

### KPI-FIN-CCO — Cost per correct outcome

| Field | Content |
|---|---|
| **Family** | Financial (cost) |
| **Definition** | Inference + allocated agent-ops cost divided by **correct** scored outcomes (classification or document extraction — state which). |
| **Formula** | `(inference_cost + allocated_ops) / correct_outcomes` |
| **Data source** | Ledger + QA |
| **Owner** | AP Manager / Controller |
| **Target method** | Internal; prefer this to raw inference cost |
| **Gaming** | Score easy fields; shrink QA to winners |
| **Control** | Same QA file as accuracy KPIs |
| **Evidence** | Ledger + QA ID |

### KPI-FIN-HHR — Estimated human hours released

| Field | Content |
|---|---|
| **Family** | Financial (estimate) — **label ESTIMATE** |
| **Definition** | Minutes baseline minus minutes now, for a measured task, × volume. Not cash unless converted **and** validated. |
| **Formula** | `Σ (min_baseline - min_now) × volume_task` / 60 |
| **Data source** | Time study or system timestamps; volume |
| **Owner** | AP Manager; Controller if shown next to money |
| **Target method** | Only after a time study ID |
| **Gaming** | Use wishful minutes; ignore new review minutes |
| **Control** | Include review/override minutes; never auto-post to savings |
| **Evidence** | Time study ID |

### KPI-FIN-SAV — Validated financial savings

| Field | Content |
|---|---|
| **Family** | Financial (benefit) |
| **Definition** | Cash or P&L effect **accepted by the Controller** with a method: recovered duplicate, avoided overpay with document trail, labour cost actually taken out, early-pay discount actually earned, etc. |
| **Formula** | `sum(validated_items)` — each item has method and evidence |
| **Data source** | Controller file |
| **Owner** | **Controller** |
| **Target method** | Not targeted as “AI ROI.” Itemised or silent |
| **Gaming** | Count prevented duplicates without proposal evidence; annualise a week |
| **Control** | `validated_by` field mandatory; unsigned = 0 on dashboard |
| **Evidence** | Validation pack |

---

## Risk-control

### KPI-RSK-BRH — Control breaches

| Field | Content |
|---|---|
| **Family** | Risk-control |
| **Definition** | Count of events where a matrix control failed (agent verb outside charter, hash mismatch, hold lifted without reason, GR-create by agent, engine override, etc.). |
| **Formula** | `count(breaches_P)` by control ID |
| **Data source** | Incident + access + validator + proposal logs |
| **Owner** | Control owner |
| **Target method** | Guardrail: zero for listed hard controls; else investigate |
| **Gaming** | Reclass as training |
| **Control** | Severity table; weekly listing |
| **Evidence** | Breach list |

### KPI-RSK-ESC — Escalation rate

| Field | Content |
|---|---|
| **Family** | Risk-control / Operational |
| **Definition** | Share of exceptions that hit their escalation predicate in P. |
| **Formula** | `escalated / exceptions_in_P` |
| **Data source** | Exception store |
| **Owner** | AP Manager |
| **Target method** | Descriptive; spike = either worse work or better detection |
| **Gaming** | Never escalate (hide age) |
| **Control** | Ageing KPI alongside |
| **Evidence** | Escalation extract |

### KPI-RSK-AUD — Audit exceptions

| Field | Content |
|---|---|
| **Family** | Risk-control |
| **Definition** | Findings from Internal Audit or external audit that cite AP agent scope, raised or open in P. |
| **Formula** | `count(open)` and `count(new)` |
| **Data source** | Audit tracker |
| **Owner** | Controller / auditee owner |
| **Target method** | None. Open findings block L3+ if they are Sev-equivalent |
| **Gaming** | Agree “observation” to avoid the count |
| **Control** | IA owns the classification |
| **Evidence** | Tracker |

### KPI-RSK-RWK — Rework rate

| Field | Content |
|---|---|
| **Family** | Risk-control / Operational |
| **Definition** | Share of items that were posted/closed and then reversed, recoded, or reopened for error in a look-back. |
| **Formula** | `reworked / (posted_or_closed)` in the cohort |
| **Data source** | ERP reversals; exception reopens; OV-COR after send |
| **Owner** | AP Manager |
| **Target method** | Baseline; STP target cannot worsen this |
| **Gaming** | Adjust via journal not reversal |
| **Control** | Journal reason codes sampled |
| **Evidence** | Reversal extract |

---

## Dictionary administration

**What to do.** Version this file. Map vendor metrics here or discard them.

**How.** C2 change to alter a formula. Buyer `n_min` and clocks live in a local annex, not as silent edits.

**Who.** Controller Accountable. AP Manager Responsible for issuance.

**What can go wrong.** Two STP definitions.

**Control.** Pack lint for IDs.

**Measure.** See `00_KPI_FRAMEWORK.md` §7.

**Evidence.** Dictionary version on every pack footer.

---

## Local annex (buyer)

| Parameter | Value |
|---|---|
| `n_min` for rates | `[BUYER]` |
| Age buckets | `[BUYER]` |
| Follow-up clocks | `[BUYER]` |
| Paid-population sample size for FNR | `[BUYER]` |
| Cost-model version | `[BUYER]` |
| STP milestone definition | `[BUYER]` |

---

*End of 01_KPI_DICTIONARY.md*
