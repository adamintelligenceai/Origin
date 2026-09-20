# KPI framework

**Evidence Room · AP Agent OS Pro**  
Version 1.0 · September 2026 · Licensed material · ERP-agnostic  
Answers: *How measure? What evidence? What can go wrong?*

---

## Purpose

Measure whether AP agents are doing the *job*, changing *outcomes*, changing *cash and cost* in a way Finance will sign, and whether *controls* still hold.

This is not a scoreboard for a model vendor. Activity without outcomes is occupancy. Outcomes without controls are a future incident. Financial figures without a customer baseline are marketing.

**This framework does not promise savings, ROI, fraud detection, compliance, or accuracy.** It defines how to calculate numbers from *this organisation’s* books and logs so a claim can be supported — or withdrawn.

---

## Design rules

1. **Four families, never blended into one “AI score.”** Activity / Operational outcomes / Financial outcomes / Risk-control outcomes.
2. **Customer baseline first.** Every rate that implies improvement is `period − baseline` on the same entity, channel, and document type.
3. **No vanity metrics.** If a number cannot go the wrong way when the process is worse, drop it. Examples of vanity: “prompts run,” “tokens used” (except as a *cost* input), “documents touched” without a correctness predicate, “hours of AI time.”
4. **Human is not automatically ground truth.** Accuracy metrics need a labelled sample (dual review or a frozen golden set).
5. **Do not import vendor-blog cost-per-invoice as fact.** Industry blogs routinely recycle **$10–$15 vs $2–$3** (or similar) per-invoice figures. Those are not this client’s cost. Use them only as a caution that published absolute dollars are noisy.
6. **Independent context, not a forecast.** Ardent Partners’ 2024 Best-in-Class *relative* gaps — **78% lower** per-invoice cost, **82% faster** cycle, **59% lower** exceptions, **9% BIC exception rate** (vs **22%** for others) — are useful ambition context. They are not a target the agent “will deliver.” Cite the research as research. Calculator inputs remain the customer’s baseline.
7. **Incentives.** Do not bonus STP or speed without publishing the risk-control family in the same pack (see R-INCENT).

Ardent references (independent, not Evidence Room work): e.g. Ardent Partners commentary on 2024 Best-in-Class AP advantages and the 2024 ePayables study as reported by industry recaps. Always prefer the client-held copy of the study if licensed.

---

## Families

| Family | Question | Typical audience |
|---|---|---|
| **A — Activity** | What did we handle? | Operations |
| **O — Operational outcomes** | Did the process get better *and* stay correct? | AP Director, process owner |
| **F — Financial outcomes** | Did cost or cash move in a way we will sign? | FP&A, CFO |
| **R — Risk-control outcomes** | Did we break anything that matters? | IA, Treasury, CFO |

A pack that contains only A and a vanity slice of O is incomplete. Pilot close requires O + R. A business case update requires F with a method note, or it should say “financial outcomes not yet validated.”

---

## Notation

- Period `t` (week, month, quarter) and baseline `b` (same grain, pre-pilot or control entity).
- Population must be stated: entity, ERP, channel, document type, amount band.
- `1()` is an indicator.
- Counts are of *documents* or *exceptions* as defined — do not mix.

---

## A — Activity

These describe throughput. They do not justify expansion by themselves.

### A1 Invoices handled

**Definition.** Invoices (and credit notes, if you include them — say so) that reached a terminal intake state in `t`: filed and classified, including those later parked.

**Formula.**  
`A1 = count of documents in population with intake_complete in t`

**Owner.** AP lead. **Evidence.** Intake log (A01/A02).  
**Misuse.** Counting every model call as an invoice.

### A2 Exceptions handled

**Definition.** Exception tickets (primary taxonomy code) that moved to a terminal exception state in `t` (resolved, rejected, or reclassified to a new primary code). Ageing alone is not “handled.”

**Formula.**  
`A2 = count of exceptions with terminal_status in t`

**Owner.** AP supervisor. **Evidence.** Exception store.  
**Misuse.** Counting a chase as a resolution.

### A3 Agent-touched share (optional, not a success metric)

**Definition.** Share of A1 where an in-scope agent produced a logged output.

**Formula.** `A3 = invoices_with_agent_output / A1`

Use only to explain capacity. Do not target it.

---

## O — Operational outcomes

### O1 Classification accuracy

**Definition.** Share of labelled documents whose A02 class equals the label.

**Formula.**  
`O1 = correct_class / labelled_n`  
Report also per class (invoice, credit, statement, other).

**Ground truth.** Golden set or dual-reviewed sample — not the clerk who accepted the agent’s class without looking.  
**Owner.** QA. **Evidence.** Score sheet.  
**Floor.** Set before scores are seen (method Step 6).

### O2 Extraction accuracy

**Definition.** Field-level correctness on *required* fields, and a separate score for *identity fields* (supplier, entity, invoice number, amounts, tax IDs, bank fields).

**Formula.**  
`O2_required = correct_required_fields / required_fields_in_sample`  
`O2_identity = correct_identity_fields / identity_fields_in_sample`  
A document is “header-accurate” only if all required header fields match.

**Rules.** Numeric compare on amounts with an agreed rounding; dates normalised; invoice-number compare on the certified normalisation (do not call a padded number “wrong” if policy pads).  
**Owner.** QA + AP lead.  
**Misuse.** Averaging easy fields (currency = USD) with IBAN.

### O3 Matching accuracy

**Definition.** On labelled match cases: in-tolerance match / out-of-tolerance non-match agrees with the certified tree.

**Formula.**  
`O3 = correct_match_decisions / labelled_match_n`  
Split **deterministic A05** vs any residual recommend.

**Owner.** Process owner. **Evidence.** Match log + labels.  
A model that “explains” a mismatch is not scored as matching accuracy.

### O4 False positive rate (FPR)

**Definition.** Alarms that were not true, on a specified detector.

State the detector every time you quote FPR. Default detectors: A06 exact-key (should be ~0 FPR by construction if the key is the definition of “true”); A06 near-duplicate; A02 “is invoice”; E21 bank-disagreement.

**Formula.**  
`FPR = FP / (FP + TN)`  
where a positive is “detector fired.”

**Owner.** QA.  
**Why it matters.** High FPR on near-duplicates starves suppliers and trains clerks to ignore the queue.

### O5 False negative rate (FNR)

**Definition.** True events the detector missed.

**Formula.**  
`FNR = FN / (FN + TP)`

For **exact-key duplicates**, FNR > 0 is a control defect. For **near-duplicates**, FNR is a trade-off and must be paired with FPR.

**Owner.** QA + control owner.

### O6 Exception resolution rate

**Definition.** Share of exceptions *open at start of t plus newly opened in t* that reached a true terminal resolution in `t` (not re-aged, not “handled” by a chase).

**Formula.**  
`O6 = resolved_in_t / (open_start_t + opened_in_t)`  
Report by taxonomy code. A high O6 with rising reopens is a fail (see O14).

**Owner.** AP supervisor.

### O7 Straight-through processing (STP) rate

**Definition.** Share of invoices that posted (or reached the agreed “complete” state) with **no human edit, override, or exception ticket**, inside policy.

**Formula.**  
`O7 = stp_invoices / A1_postable`  
`A1_postable` excludes documents that *should* exception (e.g. true missing GR). Do not inflate STP by auto-receipting (forbidden) or by narrowing the population to happy path after the fact.

**Owner.** Process owner.  
**Misuse.** Counting “agent ran” as STP.

### O8 Human intervention rate

**Definition.** Complement of a defined “no-touch” — but count *interventions*, not people.

**Formula.**  
`O8 = invoices_with_≥1_human_action_in_scope / A1`  
Split: confirmation (expected for Prepare) vs override (control-relevant).

Prepare-class agents will have high confirmation and can still be useful. Do not treat O8 as a failure if authority is Prepare.

**Owner.** AP lead.

### O9 Average resolution time

**Definition.** Median and 90th percentile hours from exception open to terminal resolution, by code.

**Formula.**  
`O9_p50 = median(resolved_at − opened_at)`  
`O9_p90 = percentile_90(...)`  
Prefer median. Means are pulled by E26.

**Owner.** AP supervisor. **Clock** excludes named waiting states if you disclose them (e.g. “waiting on supplier” parked). If you exclude waits, also publish calendar age (O16).

### O10 Time to posting

**Definition.** Hours from intake_complete to posted (or parked-as-policy-complete). Median and p90.

**Formula.**  
`O10_p50 = median(posted_at − intake_complete_at)`

**Owner.** AP lead.  
Compare to baseline `b` on the same slice. Ardent’s “82% faster” is context, not a multiplier to apply to `b`.

### O11 On-time supplier / internal follow-up

**Definition.** Share of A11/A12 chases sent (or queued for human send) within the SLA, and share of *responses recorded* within the response SLA.

**Formula.**  
`O11_send = chases_on_sla / chases_required`  
`O11_response = responses_on_sla / chases_that_needed_response`  
A chase not required (policy wait) is excluded from the denominator.

**Owner.** AP supervisor.

### O12 Ageing reduction

**Definition.** Change in the stock of exceptions older than the local threshold (E26), in count and in value.

**Formula.**  
`O12_count = aged_open_t − aged_open_b`  
`O12_value = aged_value_t − aged_value_b`  
Negative is improvement. Publish *with* R1 (control breaches). Ageing that falls because someone posted without a receipt is not improvement.

**Owner.** AP Director.

### O13 Payment-on-time

**Definition.** Share of scheduled payments that were released by the due date (or by the agreed discount date, if that is the policy), on the *human-authorised* run.

**Formula.**  
`O13 = paid_on_time / payment_items_due_in_t`  
Exclude items on legitimate hold (E24). Do not credit the agent for Treasury cash decisions.

**Owner.** Treasury + AP.  
Agents do not authorise payments; this metric measures whether the *process* still pays when it should.

### O14 Repeat exception rate

**Definition.** Share of resolved exceptions whose *same supplier + same primary code* reopens within a window (default 90 days), or same PO + same code.

**Formula.**  
`O14 = repeats_in_window / resolved_in_prior_window`

**Owner.** Process owner.  
High O14 means the resolution was theatre.

### O15 Missing-receipt reduction

**Definition.** Change in E07 open rate vs baseline, same slice.

**Formula.**  
`O15 = (E07_open / A1)_t − (E07_open / A1)_b`

**Owner.** Operations + AP.  
Must not be achieved by agent-created GR (R-MATCH-02).

### O16 PO compliance

**Definition.** Share of in-scope invoices that reference a *valid* PO when policy requires one, and share that matched in tolerance.

**Formula.**  
`O16_present = invoices_with_valid_PO / invoices_that_require_PO`  
`O16_matched = in_tolerance_matches / invoices_with_valid_PO`

**Owner.** Procurement + AP.  
Non-PO policy spend is excluded from the first denominator, not hidden inside it.

### O17 Duplicates detected

**Definition.** Count of E09 exact-key blocks plus E10 near-duplicates *confirmed* as duplicates by a human.

**Formula.**  
`O17 = exact_blocks + confirmed_near_dupes`  
Always split the two.

**Owner.** AP supervisor.

### O18 Duplicate payments prevented (where measurable)

**Definition.** A prevented duplicate payment is an O17 item that was **not paid**, and would have been a candidate for the next proposal under the old process (documented rule), *or* a recovery of a payment already made. Do not count every E10 queue item.

**Formula.**  
`O18 = exact_blocks_that_were_unpaid_and_proposal_eligible + confirmed_near_dupes_unpaid_and_proposal_eligible + recovered_duplicate_payments`  
Publish the rule for “proposal eligible.” If you cannot evidence eligibility, report O17 only.

**Owner.** Payments + AP. **This is not a fraud-detection claim.**

### O19 Rework rate

**Definition.** Share of posted invoices that required a reversing document, recode, or re-open exception within a window (default 30 days).

**Formula.**  
`O19 = reworked_posts / posts_in_t`

**Owner.** Controller + AP.  
The operational counterpart to “we posted faster.”

---

## F — Financial outcomes

All F metrics require an **FP&A method note**: population, loaded-cost definition, what was *not* counted (headcount not released, discounts not taken, etc.). Unsigned F numbers do not enter an external pack.

### F1 Cost per invoice

**Definition.** Loaded AP operating cost attributable to the slice, divided by invoices in the slice.

**Formula.**  
`F1 = loaded_AP_cost_slice_t / A1_t`

**Loaded cost includes** (pick and disclose): salaries and on-costs, contractor, allocated supervision, lockbox/OCR/vendor fees, **AI inference cost (F3)**, error-correction labour if you can allocate it.  
**Excludes** unless disclosed: procurement, receiving, Treasury bank fees.

**Baseline.** `F1_b` from the same definition.  
**Not an input:** $10–$15 or $2–$3 industry tropes.

**Owner.** FP&A.  
A falling F1 with rising R1 is not a success.

### F2 Cost per exception

**Definition.** Loaded cost of exception labour + allocated tools, divided by A2 (or by open+opened — disclose).

**Formula.**  
`F2 = exception_loaded_cost_t / A2_t`

**Owner.** FP&A + AP.

### F3 AI inference cost

**Definition.** Amount paid (or accrued) to model, OCR, and agent-platform vendors for the slice, plus internal GPU if material.

**Formula.**  
`F3 = vendor_inference_t + ocr_t + platform_t + internal_compute_t`

Report **F3 / A1** and **F3 / correct_outcomes** (see F4).  
**Owner.** AI product owner.  
Tokens are an input to F3, not a KPI.

### F4 Cost per correct outcome

**Definition.** What a *correct* posted invoice (or correctly blocked duplicate, if you include that — disclose) costs.

**Formula.**  
`F4 = (loaded_AP_cost_slice_t + F3_if_not_already_in_loaded) / correct_outcomes_t`  
`correct_outcomes = posts_not_reworked_in_window + O18_if_included`

This punishes fast-and-wrong.  
**Owner.** FP&A.

### F5 Hours released

**Definition.** Time study or system timestamps: hours of in-scope tasks not spent vs baseline, **after** adding review time the agent created.

**Formula.**  
`F5 = hours_baseline_task_mix − hours_current_task_mix`  
If `F5 < 0`, publish it. Do not convert F5 to FTE or cash unless a manager has actually reduced hours or redeployed them (then F6).

**Owner.** AP Director + FP&A.  
Shadow period: do not claim F5.

### F6 Validated savings

**Definition.** Cash or P&L items FP&A will sign: reduced external processing fees, reduced overtime, closed contractor roles, recovered duplicate payments, incremental discounts *actually taken* that were not taken in baseline, minus incremental F3 and platform cost.

**Formula.**  
`F6 = Σ signed_benefit_lines − Σ signed_incremental_costs`  
Each line has an owner, a source, and a period.  
**Not in F6:** “hours × loaded rate” unless those hours left the cost base. **Not in F6:** Ardent gaps applied to spend. **Not in F6:** avoided fraud you did not evidence.

**Owner.** FP&A (Accountable). CFO sees F6 only with the method note.

### F7 Payment-on-time cash (optional)

If the organisation measures early-payment discount capture or late-payment fees:

`F7_discounts = discounts_taken_t − discounts_taken_b` (same terms)  
`F7_fees = late_fees_t − late_fees_b`

Do not attribute Treasury policy changes to the agent.

---

## R — Risk-control outcomes

These are first-class. A green O pack with a red R pack is a failed period.

### R1 Control breaches

**Definition.** Count of failed *hard* or *key* controls: payment-direction by an agent; bank change without verify; GR by an agent; unlogged Execute; exact-key miss that posted; unauthorised authority promotion.

**Formula.**  
`R1 = count(breach_events)`  
**Target: 0** on hard controls. Any R1 on C-A12-01 is Sev-1.

**Owner.** Control owner. **Evidence.** A16 + incidents.

### R2 Escalation rate

**Definition.** Share of exceptions that hit threshold 1 or 2 (E26 / local tree).

**Formula.**  
`R2 = escalated / (open_start + opened)`  
A falling R2 can mean health or suppressed escalation. Pair with aged stock (O12).

**Owner.** AP supervisor.

### R3 Audit exceptions

**Definition.** Internal or external audit exceptions attributable to the AP agent slice (access, SoD, evidence, payments, tax).

**Formula.**  
`R3 = count` and `R3_open`  
**Owner.** IA.

### R4 Override rate

**Definition.** Human overrides of match, duplicate, SoD, or hold, per 100 invoices.

**Formula.**  
`R4 = overrides / A1 × 100`  
Rising R4 is a design smell (R-MATCH-03, bad tolerances) or a control under attack.

**Owner.** Control owner.

### R5 Hallucination / injection incidents

**Definition.** Invented identifiers that passed a gate, or document-text that invoked a tool.

**Formula.** counts, target 0 at Execute gates.  
**Owner.** AI product owner + IA.

### R6 Recertification status

**Definition.** Pass/fail of the last cert; current authority vs signed canvas.

**Formula.** categorical. Fail = authority step-down.  
**Owner.** Control owner.

---

## Pack layout (monthly)

| Section | Metrics (minimum) |
|---|---|
| Population | Entity, ERP, A1, mix |
| Activity | A1, A2 |
| Operational | O3, O7, O8 (split), O10 p50/p90, O6 by top codes, O12, O14, O17, O18 if evidenced, O19 |
| Financial | F3, F1 vs `b` if method signed; F6 only if signed |
| Risk-control | R1, R2, R3, R4, R6 |
| Notes | Model/workflow versions; incidents; what *not* to conclude |

No single RAG status for the whole pack. RAG each family.

---

## Baseline and comparison

| Allowed comparison | Not allowed |
|---|---|
| Same slice vs its `b` | vs a vendor’s $12 / $3 story |
| Same slice vs a hold-out entity | vs Ardent BIC as if it were a forecast |
| Golden set vs last cert | vs a demo on cherry-picked PDFs |
| Dual-reviewed sample | vs “the clerk agreed” as accuracy |

**Ardent 2024 relative gaps** may appear in a one-line “industry context” footnote: BIC teams showed 78% lower cost, 82% faster processing, 59% lower exceptions, 9% vs 22% exception rates in that research. Then: “Our F1_b is [x]; our exception rate_b is [y]. We are not claiming BIC.”

---

## Data lineage (evidence)

Every metric in the pack has:

| Field | Example |
|---|---|
| ID | O7 |
| Source systems | ERP posted flag, exception store, A16 |
| Query / definition version | `kpi_dict v1.2` |
| Population filter | SAP 1000, PO, inbox |
| Owner | Process owner |
| Last refresh | ISO date |
| Known defects | e.g. parked-as-posted leak |

If lineage is missing, the number is anecdotal.

---

## Northline (illustrative measurement, not a result)

Fictional 18,000 invoices/month, SAP + NetSuite. First pack on **SAP PO, company 1000 only**.

Illustrative *baseline* (customer-like, made up for the exercise): exception rate 24% on that slice; median time-to-post 6.2 days; STP 31%; F1 calculated from NL10 shared-services loaded cost / slice volume; F3 = 0; O18 not evidenced (no proposal-eligibility rule yet); R1 = n/a pre-agent. A14 publishes the pack; humans certify.

Illustrative *pilot pack* would report deltas on that slice only, F3 newly visible, F6 unsigned (“hours observed, cost base unchanged”), R1 = 0 required to continue. No ROI line.

---

## Related documents

- `../Business_Case/BUSINESS_CASE_MODEL.md` — how F6 is proposed *before* it is validated
- `../Process_Mapping/ER_METHODOLOGY.md` — Step 9
- `../Controls/AGENT_CONTROL_MATRIX.md` — what R1 counts
- `../Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md` — who may publish the pack
