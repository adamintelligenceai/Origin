---
title: AP Agent Business Case
subtitle: Conservative numbers. No false precision.
tier: Professional
code: ER-AP-BC-00
---

# What this model is for

To have an adult conversation with a CFO about **capacity, cost and risk** — not to print an IRR to two decimals.

Use the Excel workbook. This note explains the logic.

# Inputs (you must supply)

- Monthly invoice volume
- AP headcount and fully loaded cost
- Manual-touch %
- Exception rate and average resolution minutes
- Duplicate rate (known)
- Late-payment fees / lost early-pay discounts (if you actually track them)
- Current processing cost (or allow the model to derive labour-only)
- AI / tool run-rate
- Implementation cost (internal days × rate + any vendor)
- Efficiency range on **exception labour** and **manual-touch labour**

# Scenarios

| Scenario | Exception labour reduction | Manual-touch labour reduction | Notes |
|---|---|---|---|
| Conservative | 8% | 3% | Shadow + Level 1 only, one or two agents |
| Base | 18% | 8% | Level 1–2 on triage, GR, validation |
| Upside | 30% | 15% | Requires data quality and change adoption; still no payment autonomy |

These percentages are **Evidence Room planning ranges**, not forecasts. They are not Ardent statistics.

# Outputs

- Baseline annual AP labour cost
- Capacity released (hours)
- Processing-cost change (directionally)
- Exception-cost change
- Estimated savings (labour + optional late-fee / discount lines)
- Incremental tool + implementation cost
- Payback (months) and ROI — labelled **illustrative**
- Sensitivity: volume ±20%, exception rate ±5pp, efficiency ±50% of scenario

# Worked example (illustrative, not a case study)

A shared-services AP team processes **15,000 invoices/month**.

- 12 FTE × $75,000 fully loaded = $900,000 labour
- Exception rate 22% → 3,300 exceptions/month
- 12 minutes each → 660 hours/month exception work (~4 FTE-equivalent)
- Conservative 8% exception-labour reduction → ~53 hours/month → ~$33k/year at $52/hour implied
- Tooling $24k/year + $40k implementation
- Conservative payback may exceed 24 months — **which is an acceptable finding**. The case then rests on control, cycle time and supplier experience, or you do not proceed.

Ardent 2025 average $9.84 and Best-in-Class $2.65 show why cost-per-invoice is a real executive metric. They do not prove your agents will close that gap.

# What not to put on a slide

- “AI will save 40% in 90 days”
- Duplicate-payment savings you have never measured
- Vendor 99% accuracy as your benefit driver
