# Version history — Evidence Room AP Agent OS

**Product:** AP Agent OS family  
**Current version:** 1.0  
**Date:** September 2026  
**Rule:** No silent edits to autonomy defaults, licence families, prices, or the non-promise list. Increment the version. Write the change here.

---

## How versions work

| Field | Rule |
|---|---|
| Suite version | Major.minor. `1.0` is the first shippable corpus. |
| File version | Each licensed file carries `Version: x.x · Month YYYY` in its header. |
| Autonomy defaults | Changing a starting level (0–4) is a **minor** at minimum, **major** if any agent starts above 1. |
| Prices | Recorded here and in `07_LEMON_SQUEEZY/STORE_BLUEPRINT.md`. Do not change a live SKU without a store ticket. |
| Research citations | Add rows to `09_RESEARCH/RESEARCH_LEDGER.md`. Do not silently “update” a percentage. |
| Legal drafts | Remain drafts until counsel names the selling entity. Mark counsel revisions as `1.x-legal`. |

Customers who bought a zip keep the version they downloaded. We do not silently replace their files.

---

## 1.0 — September 2026 — First suite

First complete corpus intended for Lemon Squeezy fulfilment and evidenceroom.ai.

**Included**

- Diagnostic (36 questions, scoring, scorecard worksheet)
- Starter guide (ten-agent subset, operating model, templates)
- Professional operating system: 16 agent charters, responsibility model, process mapping, exception taxonomy, controls, governance, KPI framework, business-case model, testing/UAT/shadow, Word template specs, implementation roadmap (Phases 0–10)
- Team: playbook, workshop, interviews, exercises, training, steering, CFO brief, implementation tracker, benefits realisation, change toolkit, executive comms
- Custom Blueprint: brochure, intake, fulfilment
- Commercial: store blueprint, website IA and copy, sales and marketing system
- Legal drafts: terms, privacy, licence, refund, disclaimers, AI-use disclosure, IP checklist
- Research: ledger, competitor review, scale roadmap, quality scorecard
- Brand system

**Defaults locked in 1.0**

| Decision | Value |
|---|---|
| Brand line | Responsibility is earned. |
| Supporting line | Governed agents. Measurable outcomes. |
| Domain | evidenceroom.ai (available on Vercel registrar check, this build) |
| Worked example | Northline Industrial Group (fictional) |
| Agent start levels | 0 or 1 only. Level 4 never default. |
| Payment | Human release. `can_release_payment` always false. |
| Prices | Diagnostic $0 · Starter $79 · Professional $199 · Team $499 · Custom $1,500 / $2,250 / $3,000 |
| Launch offer | `EARNED20` = 20% off Professional only, 14 days, 200 redemptions |
| Affiliates | Off |
| Subscription SKUs | None at launch |
| Non-promises | Savings, fraud, compliance, accounting accuracy, autonomous payments, ROI |

**Known limits of 1.0 (not defects to hide)**

- Legal files are drafts for counsel. Not in force.
- Team seat count is a draft of eight; confirm on Lemon Squeezy before sale.
- Custom Blueprint refund/service characterisation needs counsel.
- Quality scorecard records where the suite is below the 9/10 ship bar and what was revised in this build.
- No live customer evidence exists. Northline remains illustrative.

---

## Planned, not scheduled

These are not commitments and have no dates.

| Item | Note |
|---|---|
| 1.1 counsel pass | Entity name, licence enforceability, refund window, AI-upload clause |
| Spreadsheet builds | `tools/build_spreadsheets.py` may emit scorecard / tracker workbooks |
| `/starter` marketing page | Only if paid ads need a dedicated URL |
| Subscription / membership | Not until there is a reason that beats the +0.5% Lemon Squeezy subscription fee |
| Other finance verticals | Explicitly out of scope. See `09_RESEARCH/SCALE_ROADMAP.md`. |

---

## Change log template (paste for 1.1+)

```
## x.y — Month YYYY — <title>

**Changed**
- …

**Not changed**
- Autonomy defaults
- Non-promise list
- Northline status (still fictional)

**Research rows added**
- LEDGER-xxx

**Quality scorecard**
- Re-scored: yes / no
```
