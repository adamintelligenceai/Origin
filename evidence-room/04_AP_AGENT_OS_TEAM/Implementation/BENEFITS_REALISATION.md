# Benefits realisation — method, not a promise

**Evidence Room · Team**  
**Version:** 1.0 · September 2026  
**Audience:** FP&A, AP Director, control owner  
**Purpose:** Keep “benefit” honest so a later signed line can exist — or be withdrawn  
**This file does not produce ROI.** It does not guarantee savings, fraud recovery, or accuracy.

Hours are not cash until the cost base changes. Industry dollars are not your baseline. Northline figures are illustrative.

---

## 1. What you may call a benefit later

Only lines FP&A will **sign**, after the fact, with a method note. That object is **F6 Validated savings** in the KPI framework. Until then, the column is empty.

| May enter F6 when evidenced | Stays out of F6 |
|---|---|
| External processing fee actually cancelled or volume-priced down | “Hours × loaded rate” |
| Overtime actually stopped | Ageing looks better |
| Contractor role actually closed | Interventions became confirmations of the same duration |
| Recovered duplicate payment, or a second payment stopped **and** proposal-eligible | Queue items not proposal-eligible |
| Incremental discounts actually taken, terms unchanged | Treasury changed policy |
| Minus incremental inference / platform cost (F3) | Ardent gaps applied to spend |
| | Avoided fraud you did not evidence |
| | Toolkit price “payback” |

---

## 2. Realisation states

Every candidate line has a state. Steering may see counts of states. Steering may not see a single “realised $.”

| State | Meaning | Who moves it |
|---|---|---|
| `idea` | Someone mentioned it | Anyone; parked |
| `observable` | A measure exists (O or A family) | Steward |
| `hours_only` | F5 computed; cost base unchanged | FP&A |
| `proposed` | In the Professional business-case model, scenario-labelled | FP&A |
| `signed` | F6 line with owner, source, period | FP&A + process owner |
| `withdrawn` | Failed evidence or control breach | FP&A |
| `forbidden` | Savings / fraud / ROI claim without method | Control owner strikes |

**Rule.** Shadow and the first limited fence should sit at `observable` or `hours_only`. If a sponsor needs `signed` in week two, they need a different conversation — not a bigger number.

---

## 3. Register (copy)

| ID | Candidate benefit | Lever (exception volume / time-to-post / STP / fees / duplicate / discount / other) | KPI link | State | Owner | Period | Amount (blank until signed) | Method note path | Control check (R1 still 0?) |
|---|---|---|---|---|---|---|---|---|---|
| B01 | | | | idea | | | | | |
| B02 | | | | idea | | | | | |
| B03 | | | | idea | | | | | |

Do not pre-fill amounts from $10–$15 vs $2–$3. Those are vendor/unverified.

---

## 4. Baseline lock

Before any line can leave `idea`:

| Input | Value | Source | Locked on |
|---|---|---|---|
| Slice definition | | G3 artefact | |
| V1 volume | | ERP | |
| Exception rate definition + V2 | | | |
| O10_b time-to-post | | | |
| O7_b STP if used | | | |
| C1 loaded cost definition | | FP&A | |
| F3 expected | | AI owner or “n/a” | |

If these are blank, realisation work is **mapping**, not benefits.

---

## 5. Cadence

| When | Action |
|---|---|
| Workshop | No register rows required. Forbid folklore in the sponsor deck. |
| Limited live + 14 days | Open register at `observable` only |
| First month pack | F3 visible if you have it; F6 unsigned |
| After a cost-base event (role closed, fee cancelled) | FP&A may propose `signed` |
| Any R1 hard breach | Freeze `signed` lines that depended on the broken control; consider `withdrawn` |

A14 (Professional) publishes the pack. Team without A14 still uses this register and the three measures.

---

## 6. Conversation scripts

**To a sponsor who wants a number now**

> We can show our baseline and three operating measures. We will not multiply industry gaps by our spend. If a fee leaves the cost base, FP&A will sign that line. Until then there is no realisation.

**To a team who found a duplicate**

> We will record O17. O18 only if we can evidence proposal eligibility or a recovery. We will not call it fraud detection.

**To yourself**

> If this file starts to look like a benefits office, you have drifted. Close unused `idea` rows.

---

## 7. Northline illustration (fictional)

Register opened with B01 “exception labour” at `hours_only` after 45 days of A03 Level 1. F6 unsigned: cost base unchanged. B02 “duplicate recoveries” stayed `idea` until a proposal-eligibility rule existed. They did not apply 78% to shared-services cost.

---

## Related

`03_AP_AGENT_OS_PRO/KPI_and_Measurement/KPI_FRAMEWORK.md`  
`03_AP_AGENT_OS_PRO/Business_Case/BUSINESS_CASE_MODEL.md`
