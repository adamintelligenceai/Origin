# KPI Framework — AP Agents

**Evidence Room · AP Agent OS Professional**  
**Companion:** `spreadsheets/ER_AP_KPI_Scorecard.xlsx`

---

## 1. Design rule

**Never mix metric classes in one “savings” claim.**

| Class | Answers | Safe use |
|-------|---------|----------|
| **Activity** | Did the agent run? | Capacity / adoption monitoring |
| **Operational** | Did process performance improve? | Cycle time, touch rate, backlog |
| **Financial** | Did economics move? | Cost-to-process, discount capture, leakage |
| **Risk / Control** | Are we safer / better evidenced? | Exception ageing, override rate, sample pass rate |

Activity ≠ value. High activity with flat operational metrics means theatre.

---

## 2. Activity metrics (leading, not outcome)

| KPI | Formula | Cadence | Notes |
|-----|---------|---------|-------|
| Agent invocations | Count of agent runs | Daily | Segment by agent |
| Coverage rate | Invoices touched by agent ÷ eligible invoices | Weekly | Define eligibility |
| Suggestion accept rate | Accepted suggestions ÷ suggestions shown | Weekly | Level 0–1 |
| Autocomplete rate (L2+) | Agent-completed steps ÷ eligible steps | Weekly | With gates |
| Model error / timeout rate | Failed runs ÷ attempts | Daily | Reliability |

**Target-setting:** Set floors for reliability; do not celebrate invocation volume alone.

---

## 3. Operational metrics

| KPI | Formula | Cadence | Typical direction |
|-----|---------|---------|-------------------|
| Invoice cycle time | Median (ready-to-pay timestamp − receipt timestamp) | Weekly | ↓ |
| Touch rate | Invoices with ≥2 human touches post-capture ÷ total | Weekly | ↓ |
| First-pass match rate | Matched without exception ÷ PO invoices | Weekly | ↑ |
| Exception rate | New exceptions ÷ invoices | Weekly | ↓ or stable with better taxonomy |
| Exception ageing | Median / P90 days open by taxonomy code | Daily/Weekly | ↓ |
| Straight-through % | No-human-touch after capture ÷ total *(only if Level allows)* | Weekly | ↑ cautiously |
| Supplier query cycle | Open → closed median days | Weekly | ↓ |
| Close readiness | % accrued / GRIR items with evidence pack by close day −2 | Monthly | ↑ |

---

## 4. Financial metrics

Use **transparent assumptions**. Do not publish vendor-style guaranteed ROI.

| KPI | Formula | Cadence | Caveats |
|-----|---------|---------|---------|
| Cost per invoice | (AP labour cost allocated + tool cost allocated) ÷ invoices | Monthly | Labour allocation method must be stated |
| Labour minutes per invoice | Total processor minutes ÷ invoices | Monthly | Time study or system clocks |
| Early-payment discount capture | Discounts taken ÷ discounts available | Monthly | Requires accurate due dates |
| Duplicate / overpay recovery | $ recovered in period | Monthly | Attribute carefully; avoid double counting |
| Late-payment fees / interest | Fees paid | Monthly | Often noisy |
| Benefit vs baseline | (Baseline cost per invoice − current) × volume | Monthly | Use Business Case model |

**Financial claims in GTM** must cite the Research Ledger and remain assumption-labelled.

---

## 5. Risk / control metrics

| KPI | Formula | Cadence | Direction |
|-----|---------|---------|-----------|
| Control sample pass rate | Passes ÷ samples reviewed | Weekly/Monthly | ↑ |
| Critical false negative rate | Missed duplicates or policy breaches in sample ÷ sample | Monthly | ↓ |
| Override rate | Human overrides ÷ agent recommendations | Weekly | Context-dependent |
| Kill-switch test pass | Pass/fail | Quarterly | Pass |
| Unowned exceptions | Exceptions with null owner ÷ open exceptions | Daily | ↓ → 0 |
| Evidence completeness | Material outputs with full evidence fields ÷ material outputs | Weekly | ↑ → 100% |
| SoD conflict incidents | Count | Monthly | ↓ → 0 |
| Prompt/model drift incidents | Unapproved version in prod ÷ releases | Monthly | ↓ → 0 |

---

## 6. Scorecard layout (one page)

```
AP AGENT SCORECARD — Week of YYYY-MM-DD
Scope: BU / invoice class / agents

ACTIVITY        | value | WoW | status
Coverage %      |       |     |
Accept %        |       |     |

OPERATIONAL     | value | WoW | status
Cycle time med  |       |     |
Touch rate      |       |     |
Exception P90   |       |     |

FINANCIAL       | value | MoM | status
Cost / invoice  |       |     |
Discount capture|       |     |

RISK/CONTROL    | value | WoW | status
Sample pass %   |       |     |
Evidence %      |       |     |
Unowned exc.    |       |     |

Narrative (≤5 lines): ...
Decisions / asks: ...
```

---

## 7. Baseline protocol

1. Freeze definition sheet (formulas, filters, entities).  
2. Capture 4–8 weeks pre-agent baseline where possible.  
3. If baseline unavailable, label as **reconstructed** and widen confidence.  
4. Re-baseline after material ERP or org change.

---

## 8. Related

- `Business_Case/00_BUSINESS_CASE_MODEL.md`
- `Testing/00_SHADOW_AND_PILOT.md` (promotion thresholds)
- `Agent_Library/14_AP_REPORTING_AGENT.md`
