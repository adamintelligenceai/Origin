# KPI Framework

**Product:** AP Agent OS — Evidence Room  
**Audience:** AP manager, controller, implementation lead  
**Rule:** A number enters a management pack only if it has a formula, a source, an owner, and a denominator. Volume without quality is an activity count, not a performance result.

This framework does not define ROI, guaranteed savings, fraud detection rates, or compliance scores. Financial tiles require a **validation method**. If the method is missing, the tile is unreported — not zero, not estimated.

**Example organisation:** Northline Industrials (NIL PO-goods unless noted)

---

## 1. Families

| Family | Question it answers | May veto expansion? |
|---|---|---|
| **Activity** | What volume did the path see? | No — context only |
| **Operational** | How correctly and how quickly did work finish? | Yes, if accuracy or ageing floors fail |
| **Financial** | What cost and validated money movement can we show? | No by itself; never overrides risk-control |
| **Risk-control** | Did we breach a control or create reconstructability gaps? | Yes |

Do not average the four families into one “agent score”.

---

## 2. Measurement principles

1. **Lock definitions before the window.** Changing a formula mid-pilot restarts the window.
2. **One object, one count.** An invoice that is extracted and matched is one invoice handled, not two.
3. **Gold-label where truth exists.** Accuracy measures need a labelled set. Operator agreement is not truth if both parties share a habit.
4. **Separate propose from commit.** An agent proposal that a human rejects is not a correct outcome.
5. **Name the exclusions.** Intercompany, FX, and out-of-path items do not silently dilute denominators.
6. **No vanity.** Do not report logins, messages generated, tokens used (except as cost), or “invoices touched” without a terminal state.
7. **Hours are estimated until validated.** Estimated human hours released ≠ validated financial savings.

---

## 3. Core terms

| Term | Definition |
|---|---|
| In-scope invoice | Document on the signed path and entity in the reporting window |
| Handled | Reached a terminal state: posted, X4 duplicate-closed, returned to supplier, or still parked with a code **and** a current owner (parked-without-owner is not handled) |
| Proposal | Agent output marked ready after validation |
| Correct proposal | Proposal matches the gold-label or the signed tree leaf after human adjudication of disagreements |
| Human intervention | Edit, reject, manual key, or manual chase not using the agent draft |
| STP (straight-through proposal) | In-scope item where the agent produced a complete ready proposal and the human accepted it without field edits (commit may still be human) |
| Window | Calendar or working-day range locked in the scorecard |
| Gold-label | Pre-agreed true value from the historical protocol |
| Validated financial savings | Amount attested by finance using the method in §7 |

---

## 4. Activity measures

Context only. Do not rank agents on these alone.

### 4.1 Invoices handled

**Definition:** Count of in-scope invoices that reached a terminal handled state in the window.  
**Formula:** `N_inv_handled = count(invoices where path = in-scope AND terminal ∈ {posted, X4, returned, parked_owned} AND terminal_ts ∈ window)`  
**Source:** ERP + exception register  
**Owner:** AP manager  
**Notes:** Do not count stubs that never left S0.

### 4.2 Exceptions handled

**Definition:** Count of exception instances (invoice × blocking code) closed in the window — closed means original code cleared, replaced with a documented new code, X4, returned, or posted after resolution.  
**Formula:** `N_exc_handled = count(exception_instances where closed_ts ∈ window)`  
**Source:** Exception register  
**Owner:** AP lead  
**Notes:** EX-AGE added to an open item is not a close.

### 4.3 Proposals produced

**Definition:** Ready proposals emitted, for capacity planning.  
**Formula:** `N_prop = count(ready proposals in window)`  
**Family note:** Activity. Pair always with accuracy.

### 4.4 Invoices received (intake)

**Definition:** Items filed to a stub from in-scope channels.  
**Formula:** `N_received = count(stubs created in window)`  
**Use:** Denominator for backlog and intake reconciliation, not a productivity KPI.

---

## 5. Operational measures

### 5.1 Classification accuracy

**Definition:** Share of labelled documents whose type (invoice / credit / statement / other) matches gold-label.  
**Formula:** `Acc_class = N_class_correct / N_class_labelled`  
**Source:** Gold-label or shadow adjudication  
**Owner:** Test lead (test windows); AP manager (steady sample)  
**Floor (Northline example):** ≥ 0.98 on hold-out before pilot.

### 5.2 Extraction accuracy

**Definition:** Field-level accuracy on the required-field list.  
**Formula:** `Acc_ext = N_required_fields_correct / N_required_fields_labelled`  
Report also **document-level**: `Acc_ext_doc = N_docs_all_required_correct / N_docs_labelled`  
**Correct:** exact match after agreed normalisation (date format, decimal, leading zeros).  
**Owner:** Test lead  
**Floor (example):** field ≥ 0.95; document-level ≥ 0.85 on required set.

### 5.3 Matching accuracy

**Definition:** Share of labelled items where proposed match leaf (pass or exact EX code) equals gold-label leaf.  
**Formula:** `Acc_match = N_match_leaf_correct / N_match_labelled`  
**Owner:** Test lead  
**Notes:** A correct EX-PRM is a success. A forced pass is a failure.

### 5.4 False-positive rate (FPR)

**Definition:** Per detector, share of negative cases flagged positive.  
**Formula:** `FPR = FP / (FP + TN)`  
**Detectors to report separately:** Duplicate exact, Duplicate potential, Quality fail, Match fail, EX-BNK flag.  
**Owner:** Test lead  
**Notes:** Do not blend detectors. A high FPR on EX-PDUP may be acceptable; a high FPR on EX-IQ may not.

### 5.5 False-negative rate (FNR)

**Definition:** Per detector, share of positive cases missed.  
**Formula:** `FNR = FN / (FN + TP)`  
**Owner:** Test lead  
**Notes:** FNR on EX-DUP, EX-ILE, EX-BNK is a risk-control input, not only operational.

### 5.6 Exception resolution rate

**Definition:** Share of exceptions open at window start or opened in-window that closed in-window.  
**Formula:** `Res_exc = N_exc_closed_in_window / (N_exc_open_start + N_exc_opened_in_window)`  
**Owner:** AP lead  
**Notes:** Closing by incorrect code change without tree re-validation is rework, not resolution — exclude those from the numerator (they appear in rework rate).

### 5.7 STP rate

**Definition:** Share of handled in-scope invoices that were STP as defined in §3.  
**Formula:** `STP = N_stp / N_inv_handled`  
**Owner:** AP manager  
**Notes:** Human posting after an unedited accept still counts as STP *proposal*. Do not call this “touchless posting” unless posting is actually unattended *and* authorised — Northline v03 shall not.

### 5.8 Human intervention rate

**Definition:** Share of handled invoices with at least one intervention.  
**Formula:** `HIR = N_inv_with_intervention / N_inv_handled`  
**Identity:** On a complete set, `HIR + STP` need not equal 1 if some items have no proposal (agent silent). Report **agent coverage** separately: `Cov = N_inv_with_proposal / N_inv_handled`.

### 5.9 Average resolution time

**Definition:** Mean working time from exception set to exception close.  
**Formula:** `ART = sum(close_ts − set_ts) / N_exc_closed` in working hours  
**Also report:** Median, and P90, by taxonomy code.  
**Owner:** AP lead  
**Notes:** Clock stops only on close, not on a chase send.

### 5.10 Time to posting

**Definition:** Mean working time from stub create to post, for invoices that posted in-window.  
**Formula:** `TTP = sum(post_ts − stub_ts) / N_posted`  
**Also report:** Median, P90; exclude items that were EX-AGE before post if you are measuring the happy path — say so.  
**Owner:** AP manager

### 5.11 Repeat exception rate

**Definition:** Share of suppliers (or PO lines) that raised the same blocking code ≥ 2 times in a rolling 12 weeks.  
**Formula:** `Rep = N_repeat_keys / N_keys_with_any_exception`  
**Key:** default `supplier + code`; optionally `supplier + PO + code`.  
**Owner:** AP manager  
**Use:** Process design, not agent shaming.

### 5.12 Duplicates detected

**Definition:** Count of EX-DUP and EX-PDUP instances confirmed by AP lead (X4 or confirmed pair).  
**Formula:** `Dup_det = N_confirmed_EX-DUP + N_confirmed_EX-PDUP`  
**Owner:** AP lead  
**Notes:** Agent flags that were cleared as not duplicate are FPs, not detections.

### 5.13 Duplicate payments prevented (where measurable)

**Definition:** Confirmed duplicate *where a second payment instruction would otherwise have been eligible*, and the second item was closed X4 or held before payment-pack input.  
**Formula:** `Dup_pay_prev = count(confirmed pairs where second_item never entered an approved payment proposal)`  
**Source:** Duplicate register ∩ payment-proposal history  
**Owner:** AP lead + treasurer (attestation)  
**Notes:** If payment-proposal history cannot be joined, this KPI is **unreported**. Do not substitute invoice-level X4 counts. This is not a fraud KPI.

### 5.14 On-time supplier follow-up

**Definition:** Share of supplier-facing chases sent within the first-action SLA for that code.  
**Formula:** `OT_sup = N_supplier_chases_on_time / N_supplier_chases_required`  
**Owner:** AP manager  
**SLA example (NIL):** EX-MPO / EX-IQ first draft same working day.

### 5.15 On-time internal follow-up

**Definition:** Same construction for receiver/buyer/approver chases.  
**Formula:** `OT_int = N_internal_chases_on_time / N_internal_chases_required`  
**SLA example (NIL):** EX-MRX same working day.

### 5.16 Ageing reduction

**Definition:** Change in the count (or value) of exceptions older than the code’s trigger.  
**Formula:** `Age_red_n = N_aged_end − N_aged_start` (negative is reduction)  
Also `Age_red_v` on open value.  
**Owner:** AP lead  
**Notes:** Mix change (a large old item returned) can move the number without better chasing — comment it.

### 5.17 Payment-on-time

**Definition:** Share of posted invoices paid by the due date that AP can influence (holds and late posts excluded with a reason).  
**Formula:** `POT = N_paid_on_or_before_due / N_posted_with_due_in_window_and_in_AP_influence`  
**Owner:** Treasurer (result) + AP manager (exclusions)  
**Notes:** This is a joint measure. Do not attribute it solely to agents. Exclude EX-HLD and EX-DIS from the denominator or report them separately.

### 5.18 Missing-receipt reduction

**Definition:** Change in open EX-MRX (+ EX-PRX if desired) count or value.  
**Formula:** `MR_red = N_EX-MRX_open_end − N_EX-MRX_open_start`  
**Owner:** AP manager (measure); warehouse (operational cause)

### 5.19 PO compliance (process, not policy certification)

**Definition:** Share of in-scope invoices that had a usable PO at post or return — i.e. not posted via an undocumented non-PO workaround on a PO path.  
**Formula:** `PO_comp = N_posted_or_returned_with_valid_PO_path / N_path_items_terminal`  
**Owner:** Process owner  
**Notes:** This measures adherence to the signed path. It is not a procurement-policy attestation.

### 5.20 Rework rate

**Definition:** Share of handled invoices that re-enter an exception or extraction after a terminal or “ready” state because the first outcome was wrong.  
**Formula:** `Rework = N_inv_reopened_for_error / N_inv_handled`  
**Owner:** AP lead

---

## 6. Risk-control measures

These can veto expansion.

### 6.1 Control breaches

**Definition:** Count of events where a named control’s failure action should have fired and did not, or a forbidden agent action occurred.  
**Formula:** `N_breach = count(breach_events in window)`  
**Catalogue (minimum):** posted duplicate; posted EX-ILE miss; posted qty > received; agent payment release attempt; agent master write; unknown-commit retry; unmasked IBAN in a general pack.  
**Owner:** Control owner  
**Target:** 0 on Critical catalogue items.

### 6.2 Escalation rate

**Definition:** Share of exceptions that reached AP lead or controller per the tree (including misses that should have).  
**Formula:** `Esc = N_items_escalated / N_items_requiring_escalation`  
Report **missed escalation** as `1 − Esc` for Critical codes.  
**Owner:** AP lead

### 6.3 Audit exceptions

**Definition:** Count of items in the monthly evidence sample that fail CM-EVD-01 completeness, plus any internal-audit raised items in-window.  
**Formula:** `N_aud_exc = N_incomplete_packs + N_ia_raised`  
**Owner:** Control owner  
**Notes:** Not an external-audit finding log unless IA chooses to review.

### 6.4 Critical-code accuracy

**Definition:** Classification accuracy restricted to EX-DUP, EX-ILE, EX-DOA, EX-BNK.  
**Formula:** `Acc_crit = N_crit_correct / N_crit_labelled`  
**Owner:** Test lead  
**Veto:** below floor stops expansion regardless of STP.

### 6.5 Logging / version integrity

**Definition:** Share of ready proposals whose log line contains agent version and config hash.  
**Formula:** `Log_ok = N_prop_with_hash / N_prop`  
**Owner:** Systems  
**Target:** 1.00

---

## 7. Financial measures

All financial measures are in entity currency unless stated. None is an ROI.

### 7.1 Cost per invoice

**Definition:** Attributable operating cost of the path divided by invoices handled.  
**Formula:** `CPI = (C_people_path + C_vendor_path + C_ai + C_other_path) / N_inv_handled`  
**C_people_path:** time-sheet or agreed allocation for AP on this path only.  
**Owner:** AP manager + finance business partner  
**Notes:** If allocation is not agreed, CPI is unreported.

### 7.2 Cost per exception

**Definition:** `CPE = C_exception_work / N_exc_handled`  
**C_exception_work:** people time on parked items + attributable AI on exception agents.  
**Owner:** AP lead + finance BP

### 7.3 AI inference cost

**Definition:** Vendor and internal compute billed for in-scope agent calls.  
**Formula:** `C_ai = sum(invoiceable inference + OCR + retrieval for in-scope items)`  
Also report `C_ai / N_inv_handled` and `C_ai / N_correct_outcomes`.  
**Owner:** Implementation lead  
**Notes:** Tokens are not a management KPI; money is.

### 7.4 Cost per correct outcome

**Definition:** Path cost divided by correct handled outcomes.  
**Formula:** `CPCO = C_path / N_correct_handled`  
**N_correct_handled:** handled invoices whose terminal leaf matches gold-label or adjudication (sample-expand with caution).  
**Owner:** Finance BP  
**Notes:** Prefer this to cost per invoice when accuracy is below ~0.95.

### 7.5 Estimated human hours released

**Definition:** Difference between baseline human minutes per handled invoice and current human minutes, times volume.  
**Formula:** `Hrs_est = (Min_baseline − Min_current) / 60 × N_inv_handled`  
**Baseline:** measured in observation or pre-agent time study on the same path — not a vendor claim.  
**Owner:** AP manager  
**Label:** “Estimated”. Never “saved cash”.

### 7.6 Validated financial savings

**Definition:** Amount finance attests using a written method. Acceptable methods (examples):

- Duplicate *payments* prevented (§5.13) × the second-instruction amount, only when the treasurer attests the second instruction would have been included  
- Documented rate variance recovered via credit, when the credit is allocated and not disputed  
- Documented reduction in *paid* external processing fees, invoiced and compared to the prior contract

**Formula:** `Sav_val = sum(attested_items)`  
**Owner:** Controller or finance BP  
**If no attested items:** leave blank. Do not fill with `Hrs_est × loaded_rate`.

---

## 8. What not to report

| Number | Why it is vanity or misleading |
|---|---|
| Invoices “touched” | No terminal state |
| Messages generated | Activity without outcome |
| Token counts | Cost belongs in money |
| “Accuracy” without a label set | Opinion |
| Blended FPR across detectors | Hides EX-BNK misses |
| Hours × loaded rate as savings | Not validated |
| “Fraud stopped” | Out of scope; forbidden language |
| Single RAG / health score | Hides family conflicts |

---

## 9. Northline NIL example — locked floors (pilot)

| KPI | Floor / note |
|---|---|
| Acc_class | ≥ 0.98 hold-out |
| Acc_ext (field) | ≥ 0.95 |
| Acc_match | ≥ 0.93 |
| FNR EX-DUP | ≤ 0.01 |
| FNR EX-ILE | ≤ 0.01 |
| FNR EX-BNK | ≤ 0.02 (compare coverage also reported) |
| FPR EX-PDUP | Monitor; no floor (lead capacity) |
| Control breaches (Critical catalogue) | 0 |
| Log_ok | 1.00 |
| Sav_val | Unreported until treasurer attests a §5.13 pair |

---

## 10. Ownership and calendar

| Family | Primary pack | Cadence |
|---|---|---|
| Activity + Operational | Weekly agent performance report | Weekly |
| Risk-control | Weekly + monthly control extract | Weekly / monthly |
| Financial | Monthly, after books extras | Monthly |

Definitions live here. Scorecard layout lives in `SCORECARD_DEFINITIONS.md`. Dashboard tiles live in `MANAGEMENT_DASHBOARD_SPEC.md`.
