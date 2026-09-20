# AP AI Readiness — Diagnostic Questionnaire

**Evidence Room** · Free tier · 35 scored questions

## Instructions

For each statement, score **0–4**:

| Score | Meaning |
|---|---|
| 0 | Absent / unknown |
| 1 | Ad hoc — exists in pockets, not reliable |
| 2 | Emerging — documented but unevenly followed |
| 3 | Established — mostly followed, measurable gaps |
| 4 | Managed — consistent, reviewed, improvable with evidence |

- Complete with an AP lead present; involve Controls / IT where needed.
- Prefer evidence over optimism.
- Sum dimension scores, then map to maturity using the rubric below.
- Industry reference only (Ardent Partners 2025): average cost/invoice **$9.84**; exception rate **18.4%**; STP **35.4%**. Do not substitute these for your scores.

## Questions


### Process

| ID | Statement | Score (0–4) | Evidence / notes |
|---|---|---|---|
| P1 | Invoice intake channels are documented (email, portal, EDI, paper) with an owner for each channel. |  |  |
| P2 | There is a written standard for invoice completeness before an invoice enters the AP work queue. |  |  |
| P3 | PO and non-PO paths are clearly separated, with different handling rules. |  |  |
| P4 | Exception types are catalogued (price, quantity, tax, missing PO, vendor mismatch, etc.) with defined owners. |  |  |
| P5 | Approval matrices are current and applied consistently by amount and cost centre. |  |  |
| P6 | Payment runs follow a published calendar with documented cut-offs and hold rules. |  |  |
| P7 | Period-close AP tasks (accruals, open items, reconciliations) are checklist-driven, not tribal knowledge. |  |  |

### Data

| ID | Statement | Score (0–4) | Evidence / notes |
|---|---|---|---|
| D1 | Vendor master fields required for payment (bank, tax ID where applicable, remit-to) are defined and enforced. |  |  |
| D2 | Duplicate vendor records are reviewed on a scheduled cadence. |  |  |
| D3 | Invoice header and line fields map cleanly to ERP fields without habitual free-text workarounds. |  |  |
| D4 | PO, goods receipt, and invoice identifiers can be joined reliably for matching. |  |  |
| D5 | Historical invoices (at least 12 months) are queryable for pattern analysis. |  |  |
| D6 | Data quality issues are logged with remediation owners, not only fixed ad hoc. |  |  |

### Controls

| ID | Statement | Score (0–4) | Evidence / notes |
|---|---|---|---|
| C1 | Segregation of duties is enforced between vendor setup, invoice entry, and payment release. |  |  |
| C2 | Changes to vendor bank details require dual control or equivalent verification. |  |  |
| C3 | Audit trails exist for approvals, matches, overrides, and payment holds. |  |  |
| C4 | Override / force-pay authority is limited, logged, and reviewed. |  |  |
| C5 | Access to AP systems is role-based and reviewed at least annually. |  |  |
| C6 | Sample testing or continuous monitoring covers high-risk invoice classes. |  |  |
| C7 | Policies for early-pay discounts, late fees, and hold releases are written and tested. |  |  |

### Technology

| ID | Statement | Score (0–4) | Evidence / notes |
|---|---|---|---|
| T1 | AP runs on a system of record (ERP or AP automation) rather than spreadsheets as the primary ledger path. |  |  |
| T2 | Capture / OCR or structured intake exists for a meaningful share of invoice volume. |  |  |
| T3 | Workflow supports routing, reminders, and escalation without email-only chasing. |  |  |
| T4 | Integrations between AP, procurement, and receiving are stable enough for matching. |  |  |
| T5 | Reporting extracts can be produced without heroic manual effort. |  |  |
| T6 | There is a sandbox or non-production environment suitable for agent pilot testing. |  |  |

### People

| ID | Statement | Score (0–4) | Evidence / notes |
|---|---|---|---|
| H1 | Roles for AP processors, exception owners, and approvers are clear and staffed. |  |  |
| H2 | Staff can explain why an invoice was approved or held using system evidence. |  |  |
| H3 | There is capacity (or a named partner) for process redesign, not only firefighting. |  |  |
| H4 | Leadership has stated that agents will operate under human accountability, not replace it. |  |  |
| H5 | Training exists for new tools and policy changes; adoption is measured. |  |  |

### Measurement

| ID | Statement | Score (0–4) | Evidence / notes |
|---|---|---|---|
| M1 | Cost per invoice (or a proxy: FTE hours / invoice volume) is tracked at least quarterly. |  |  |
| M2 | Exception rate and STP (or touchless) rate are measured with agreed definitions. |  |  |
| M3 | Cycle time from receipt to payment-ready is tracked by invoice class. |  |  |
| M4 | KPI reviews happen on a fixed cadence with owners and actions. |  |  |


## Scoring sheet

| Dimension | Question count | Max points | Your points | % of max |
|---|---|---|---|---|
| Process | 7 | 28 |  |  |
| Data | 6 | 24 |  |  |
| Controls | 7 | 28 |  |  |
| Technology | 6 | 24 |  |  |
| People | 5 | 20 |  |  |
| Measurement | 4 | 16 |  |  |
| **Total** | **35** | **140** |  |  |

### Dimension readiness bands

| % of dimension max | Band |
|---|---|
| 0–24% | Fragile |
| 25–49% | Forming |
| 50–74% | Capable |
| 75–89% | Strong |
| 90–100% | Evidence-ready |

### Overall maturity level (from total / 140)

| Total points | Level | Label |
|---|---|---|
| 0–27 | 1 | Manual & opaque |
| 28–55 | 2 | Documented but fragile |
| 56–83 | 3 | Controlled operations |
| 84–111 | 4 | Measurable & integrable |
| 112–140 | 5 | Agent-ready with governance |

See `02_MATURITY_MODEL.md` for what each level means and which agent scopes are appropriate.

### Hard gates (override level upward)

Regardless of total score, **do not** run payment-releasing agents if any of these are below score **2**:

- C1 Segregation of duties
- C2 Vendor bank-change dual control
- C3 Audit trails
- D1 Vendor master payment fields

Record hard-gate status here:

| Gate | Score | Pass (≥2)? |
|---|---|---|
| C1 |  |  |
| C2 |  |  |
| C3 |  |  |
| D1 |  |  |

### Sign-off

| Role | Name | Date |
|---|---|---|
| AP Lead |  |  |
| Controller / Finance sponsor |  |  |
| IT / Systems (optional) |  |  |

---

*Evidence Room — Agents that earn responsibility.*
