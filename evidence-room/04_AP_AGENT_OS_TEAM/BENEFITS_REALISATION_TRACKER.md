# Benefits realisation tracker

**Product:** Evidence Room — AP Agent OS · Team  
**Use:** Record **observed** changes after a window that was locked in advance.  
**Not:** A promise register. Do not pre-load target savings, fraud catches, or ROI.

If Finance has not validated a financial method (`KPI_FRAMEWORK.md`), financial rows stay `UNVALIDATED` or empty. Estimated hours are not money.

---

## 1. Rules

1. Lock the KPI definition before the window. Changing the formula restarts the window.
2. Every row needs a baseline date, a window, a source, and an owner.
3. Activity counts (invoices touched, tokens) are not benefits.
4. Agent 10 outcomes are not “frauds found.”
5. Northline figures may not be used as targets.
6. If a sponsor wants a target row, use the business-case model *scenarios* and label them scenarios — do not move them here as committed benefits.

---

## 2. Operating-discipline rows (default)

| ID | Measure | Baseline (date) | Window result | Direction observed | Validated? | Owner | Note |
|---|---|---|---|---|---|---|---|
| B1 | Capture completeness | | | | n/a (ops) | Ops | |
| B2 | Coded fail share | | | | n/a | Quality | |
| B3 | Worksheet sample completed | | | | n/a | Match | |
| B4 | Flag outcomes recorded % | | | | n/a | Controls | |
| B5 | Open exceptions without owner | | | | n/a | Desk | |
| B6 | Dual-human payment runs % | | | | n/a | Payments | Should stay 100% |
| B7 | Autonomy register hygiene | | | | n/a | Process Owner | |
| B8 | Layer cost / 1,000 invoices | | | | cost only | Process Owner | Not a saving |

B6 “improving” from 90% to 100% is a **control** benefit. It is not a saving.

---

## 3. Optional observed operational rows

Only if definitions existed before the window.

| ID | Measure | Baseline | Result | Note |
|---|---|---|---|---|
| O1 | First-time match % | | | Observed, not a target |
| O2 | Cycle time (days) | | | Same |
| O3 | Exception rate | | | Same definition as diagnostic F3 |

If these move the wrong way, write that. Do not hide.

---

## 4. Financial rows (optional, gated)

| ID | Measure | Method URI | Amount | Finance attested (Y/N) | Date |
|---|---|---|---|---|---|
| F1 | Validated processing-cost change | | | | |
| F2 | Validated exception-cost change | | | | |
| F3 | Late-pay fees change (booked) | | | | |
| F4 | Early-pay discount change (booked) | | | | |

`F5 Duplicate recoveries` — only booked recoveries from *confirmed* items, attested by Finance. Never a count of flags.

Empty is honourable. Invented is not.

---

## 5. Realisation status

| Status | Meaning |
|---|---|
| `LOCKED` | Definition frozen; window running |
| `OBSERVED` | Result recorded |
| `ATTESTED` | Finance signed a financial row |
| `UNVALIDATED` | Hours or model output only |
| `DROPPED` | We will not claim this |

---

## 6. Quarterly narrative (eight lines)

What moved. What did not. What we demoted. What we refused. Layer cost. Payment sentence still true. No ROI sentence unless F-rows are attested — and even then, “return” is Finance’s word, not Evidence Room’s.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS · Team |
| Object | Benefits realisation tracker |
| Status | Edition 1.0.0 |
| Not | An ROI commitment log |
