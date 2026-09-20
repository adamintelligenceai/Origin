# Evidence Room — AP Agent OS Team Edition

## Implementation — 02 Benefits realisation

**Product:** Evidence Room AP Agent OS — Team Edition  
**Module:** Implementation  
**Standard:** Proof before permission  
**Use with:** `../../03_AP_AGENT_OS_PRO/Business_Case/00_BUSINESS_CASE_MODEL.md` and KPI-FIN-*  
**Version:** 1.0  

Benefits realisation is **accounting for outcomes**, not cheerleading. Most programmes should expect a long period with **hours and quality only**.

---

## 1. What to do

Open a benefits register at funding. Log each intended benefit with a type, a mechanism, a baseline, and an evidence method. Update after each Measure pack. Never overwrite Conservative with Upside.

**How.** Types and rules below.

**Who.** Benefits owner (often Transformation) Responsible for the register; **Controller** Accountable for any cash/P&L line; AP Manager supplies operational evidence.

**Wrong.** Annualising a two-week dip. Counting flags as duplicate savings. Publishing HHR × rate as KPI-FIN-SAV.

**Control.** `validated_by` mandatory for cash. Register visible to Steer.

**Measure.** Cash lines without validation (0); benefits with no mechanism.

**Evidence.** `[BUYER]/Evidence/Team/Benefits/` + Controller file for SAV.

---

## 2. Benefit types (keep separate)

| Type | Code | May appear on Steer as | Dictionary |
|---|---|---|---|
| Capacity (hours) | B-HRS | ESTIMATE hours | KPI-FIN-HHR |
| Labour cash | B-LAB | Only with mechanism | part of SAV if validated |
| Tool/run-rate cost change | B-TOOL | Cost family | KPI-FIN-AIC / CPI |
| Late fees avoided | B-LATE | Only ≤ actually incurred baseline and evidenced | SAV |
| Discounts **taken** | B-EPD | Taken minus prior taken | SAV |
| Duplicate cash | B-DUP | Only proposal-removal or recovered funds | KPI-RSK-DPP / SAV |
| Quality / control | B-CTL | Risk-control family — **not** monetised by default | FNR, breaches |
| Cycle time | B-CYC | Operational | TTP, ART |

Do not create B-ROI as a benefit type. ROI is a model output, not a realised line.

---

## 3. How — register row

```
Benefit ID:
Type:
Description (one sentence, operational):
Slice / agent:
Baseline ID + value:
Mechanism (for cash): overtime / contractor / FTE / fee / discount / proposal-remove / none
Formula:
Evidence method:
Owner:
Validation (Controller name/date or N/A):
Period first seen / last seen:
Status: pipeline / estimated / validated / rejected / retired
Notes (mix caveats):
```

**Pipeline** = in the business case only.  
**Estimated** = operationally plausible, not cash.  
**Validated** = Controller accepted.  
**Rejected** = looked real, failed evidence.  
**Retired** = no longer claimed.

---

## 4. How — realisation cycle

| When | Action |
|---|---|
| Funding | Load pipeline from Conservative + Base (label). Do not load Upside into the live register |
| Baseline freeze | Lock numbers |
| After Shadow | Update B-CTL / accuracy estimates; still no cash |
| After Pilot Measure | Move rows to estimated/validated/rejected |
| Quarterly | Recertify mechanisms (overtime still actually down?) |
| Increment | New rows; do not roll old Upside forward |

**Who.** Benefits owner updates; Controller session monthly if any cash pending.

**Wrong.** “Benefits office” monetising cycle time with a made-up working-capital rate. If you lack a Treasury-agreed cash formula, **do not**.

---

## 5. What can go wrong

| Failure | Control |
|---|---|
| Double count hours and FTE cash | Mechanism exclusive or explicit split |
| Mix shift as STP benefit | Mix table required |
| Control benefit monetised as “losses prevented” without trail | DPP rules |
| Register used as performance target for processors | Ban personal bonuses on B-HRS |

---

## 6. ACME Manufacturing — ILLUSTRATIVE register

| ID | Type | Status | Note |
|---|---|---|---|
| B-001 | B-HRS | estimated | EX-GR chase minutes down vs control plant; ESTIMATE |
| B-002 | B-LAB | rejected | No overtime change |
| B-003 | B-DUP | pipeline | Cannot see proposal membership yet |
| B-004 | B-CTL | estimated | Paid-sample FNR under review — not a saving |
| B-005 | B-EPD | retired | Opportunity ≠ taken |

---

## 7. Steer extract

Only: validated cash (or “None”); hours ESTIMATE; rejected count (shows honesty).  
Cover must not sum types into “total value.”

---

## 8. Evidence checklist

- [ ] Register version  
- [ ] Baseline IDs  
- [ ] Controller file for each SAV  
- [ ] No Upside-only rows in live register  

Proof before permission.

---

*End of 02_BENEFITS_REALISATION.md*
