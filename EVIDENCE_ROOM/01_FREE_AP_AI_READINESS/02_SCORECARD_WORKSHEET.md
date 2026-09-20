# AP AI Readiness Scorecard Worksheet

**Product:** Evidence Room — Free Lead Magnet  
**Document ID:** `ER-FREE-SCORE-001`  
**Version:** 1.0  
**Companion:** `01_AP_AI_READINESS_DIAGNOSTIC.md`  
**Use:** Print duplex; complete blank side in session; keep example as calibration only.

---

# Part A — Blank printable scorecard

## Header

| Field | Entry |
|-------|-------|
| Organisation | |
| Entity / scope | |
| Invoices / month (approx.) | |
| ERP / AP stack | |
| Scorer 1 (name / role) | |
| Scorer 2 (name / role) | |
| Date | |
| Controllership reviewer | |

**Instructions:** Score current reality. Use 0 / 1 / 2 / 3 (Q29–Q32 use 0 / 1 / 2 / 4). Reconcile differences ≥1 point before finalising.

---

## Dimension A — Process clarity (max 18)

| Q | Item | Score | Evidence / note |
|---|------|-------|-----------------|
| 1 | Documented invoice-to-pay map | | |
| 2 | Role clarity / RACI | | |
| 3 | Policy & tolerances accessible | | |
| 4 | Channel inventory | | |
| 5 | STP definition measured | | |
| 6 | Cross-team handoffs | | |
| | **A subtotal** | **/18** | Subscore: ____ |

## Dimension B — Data & systems (max 18)

| Q | Item | Score | Evidence / note |
|---|------|-------|-----------------|
| 7 | Vendor master health | | |
| 8 | Capture / OCR field quality | | |
| 9 | PO / GR / invoice link reliability | | |
| 10 | Audit trail completeness | | |
| 11 | Integration path (read/write design) | | |
| 12 | Non-production test environment | | |
| | **B subtotal** | **/18** | Subscore: ____ |

## Dimension C — Controls & governance (max 18)

| Q | Item | Score | Evidence / note |
|---|------|-------|-----------------|
| 13 | Segregation of duties | | |
| 14 | Duplicate controls | | |
| 15 | DOA enforcement | | |
| 16 | Human payment authorisation | | |
| 17 | Vendor bank-change verification | | |
| 18 | Automation / AI change control | | |
| | **C subtotal** | **/18** | Subscore: ____ |

## Dimension D — Exception load (max 15)

| Q | Item | Score | Evidence / note |
|---|------|-------|-----------------|
| 19 | Stable exception taxonomy | | |
| 20 | Ageing visibility by owner | | |
| 21 | Top codes by effort known | | |
| 22 | Supplier query volume known | | |
| 23 | Preventable vs dispute split | | |
| | **D subtotal** | **/15** | Subscore: ____ |

## Dimension E — Talent & operating model (max 15)

| Q | Item | Score | Evidence / note |
|---|------|-------|-----------------|
| 24 | Named AP Process Owner | | |
| 25 | Protected design capacity | | |
| 26 | Design-capable skills mix | | |
| 27 | Cross-functional access | | |
| 28 | Escalation culture | | |
| | **E subtotal** | **/15** | Subscore: ____ |

## Dimension F — AI readiness culture (max 16)

| Q | Item | Score | Evidence / note |
|---|------|-------|-----------------|
| 29 | Executive framing (0–4) | | |
| 30 | Experiment hygiene (0–4) | | |
| 31 | Evidence mindset (0–4) | | |
| 32 | Autonomy appetite / ladder (0–4) | | |
| | **F subtotal** | **/16** | Subscore: ____ |

---

## Total & band

| Metric | Value |
|--------|-------|
| **Total score** | **/100** |
| **Maturity band** | Emerging 0–39 · Structured 40–59 · Agent-Ready 60–79 · Operating 80–100 |
| Band selected | |
| Control override? (if C subscore <50 → treat one band lower for write pilots) | Yes / No |
| Exception override? (if D <40 → classify before expanding agents) | Yes / No |

---

## Opportunity heatmap (blank)

| Agent family | Need 1–5 | Readiness 1–5 | Priority (N×R) | First autonomy |
|--------------|----------|---------------|----------------|----------------|
| Intake & validation (A01–A02) | | | | |
| Match & receipt (A03, A05, A06) | | | | |
| Exception system (A04, A15) | | | | |
| Resolution & chase (A08, A09) | | | | |
| Control & anomaly (A10) | | | | |
| Approval & pay prep (A07, A12) | | | | |
| Statement & close (A11, A13) | | | | |
| Reporting & orchestrate (A14, A16) | | | | |

**Top 3 pilot candidates (max):**  
1. _______________  2. _______________  3. _______________

**Autonomy ceiling approved for pilot:** L0 / L1 / L2  
**Hard exclusions confirmed:** Payment release · Vendor bank approve · DOA invent · _______________

---

## Baseline KPI snapshot (blank)

| KPI | Baseline | Period | Source |
|-----|----------|--------|--------|
| Invoice volume | | | |
| STP / clean rate % | | | |
| Open exceptions (count / $) | | | |
| Top exception code #1 | | | |
| Cycle time median (days) | | | |
| Exceptions >30 days | | | |
| On-time payment % | | | |
| Supplier query volume | | | |
| AP ops FTE | | | |

---

## Sign-off

| Role | Name | Signature / date |
|------|------|------------------|
| Diagnostic owner | | |
| Head of AP / Process Owner | | |
| Controller (optional but recommended) | | |

**Disclaimer:** Scores do not guarantee savings, fraud detection, compliance, or payment safety. Payment authorisation remains human.

---

# Part B — Example filled scorecard (illustrative)

**NON-EVIDENCE:** Fictional mid-market manufacturer for calibration. Do not copy scores into your file as “benchmarks.”

## Header (example)

| Field | Entry |
|-------|-------|
| Organisation | Northbridge Industrial Group (example) |
| Entity / scope | US OpCo — primary ERP company code 1000 |
| Invoices / month (approx.) | ~4,200 |
| ERP / AP stack | SAP S/4 + email intake + legacy OCR |
| Scorer 1 | Priya N., Head of AP |
| Scorer 2 | Marcus L., Finance Systems Lead |
| Date | 2026-03-12 |
| Controllership reviewer | Elena V., Controller |

---

## Scores (example)

| Q | Item | Score | Evidence / note |
|---|------|-------|-----------------|
| 1 | Process map | 2 | Updated 2025 for US; EMEA map stale |
| 2 | Role clarity | 2 | Human RACI exists; no agent slots yet |
| 3 | Policy access | 2 | SharePoint policy; tolerances in spreadsheet |
| 4 | Channels | 3 | Email 62%, portal 28%, EDI 10% — owned |
| 5 | STP definition | 1 | “No red flags” informal; not measured weekly |
| 6 | Handoffs | 2 | GR SLA written; requester chase informal |
| **A** | | **12/18** | **Subscore 67** |
| 7 | Master data | 2 | Duplicate vendors known; quarterly cleanse |
| 8 | Capture quality | 1 | OCR complaints; no field error dashboard |
| 9 | Match data | 2 | Goods OK; services acceptance weak |
| 10 | Audit trail | 3 | SAP change docs strong |
| 11 | Integration | 2 | BAPI/read jobs exist; write design draft |
| 12 | Test env | 1 | Client refresh rare; masked data incomplete |
| **B** | | **11/18** | **Subscore 61** |
| 13 | SoD | 3 | GRC rules + annual cert |
| 14 | Duplicates | 2 | Soft block; investigation ad hoc |
| 15 | DOA | 3 | Workflow DOA live |
| 16 | Payment auth | 3 | Dual release; treasury owns bank file |
| 17 | Bank change | 2 | Dual in SAP; callback inconsistent |
| 18 | Bot change control | 1 | RPA edits sometimes skip CAB |
| **C** | | **14/18** | **Subscore 78** |
| 19 | Taxonomy | 1 | Free-text reason codes |
| 20 | Ageing | 2 | Open items report; not by owner SLA |
| 21 | Top codes | 1 | Gut: missing GR + price |
| 22 | Supplier queries | 2 | Shared mailbox volume sampled |
| 23 | Preventable split | 1 | Not systematic |
| **D** | | **7/15** | **Subscore 47** |
| 24 | Process owner | 3 | Priya owns AP design |
| 25 | Design capacity | 2 | 0.2 FTE protected for automation |
| 26 | Skills | 2 | Two seniors can write SOPs |
| 27 | Cross-functional | 2 | Procurement weekly; IT ticketed |
| 28 | Escalation | 3 | Holds respected in payment run reviews |
| **E** | | **12/15** | **Subscore 80** |
| 29 | Framing | 2 | CFO: “control first”; no written principles |
| 30 | Experiment hygiene | 1 | ChatGPT use suspected on coding questions |
| 31 | Evidence mindset | 2 | Wants KPIs; baselines incomplete |
| 32 | Autonomy appetite | 4 | Explicitly rejects autonomous pay |
| **F** | | **9/16** | **Subscore 56** |

**Total: 65 / 100 → Band: Agent-Ready**  
**Overrides:** D subscore 47 → classify exceptions before scaling past L1. C healthy → write pilots OK only after taxonomy + change control fix (Q18).

---

## Heatmap (example)

| Family | Need | Readiness | Priority | First autonomy |
|--------|------|-----------|----------|----------------|
| Intake & validation | 4 | 3 | 12 | L0→L1 |
| Match & receipt | 5 | 3 | 15 | L0 shadow match + A05 chase |
| Exception system | 5 | 2 | 10 | **First:** install taxonomy (pre-agent) |
| Resolution & chase | 4 | 3 | 12 | L1 drafts |
| Control & anomaly | 4 | 4 | 16 | L1 candidate packs |
| Approval & pay prep | 3 | 4 | 12 | L1 propose only |
| Statement & close | 3 | 3 | 9 | Later |
| Reporting & orchestrate | 2 | 2 | 4 | After 3 agents |

**Top 3 pilots:** (1) Exception taxonomy + A04 L0/L1 (2) A10 duplicate candidates (3) A05 GR chase drafts  
**Ceiling:** L1 for 90 days; L2 only after Q18 change control and field OCR metrics improve.

---

## Baseline KPI snapshot (example)

| KPI | Baseline | Period | Source |
|-----|----------|--------|--------|
| Invoice volume | 4,187 | Feb 2026 | SAP MIR7 register |
| STP / clean rate % | Unknown → treat as finding | — | — |
| Open exceptions | ~610 / $4.1m | 12 Mar 2026 | Open items extract |
| Top code (proxy) | Missing GR (~35% of WIP hours) | Sample week | Time study |
| Cycle time median | 9 days | Feb 2026 | Custom report |
| Exceptions >30 days | 142 | 12 Mar 2026 | Ageing |
| On-time payment % | 91% | Feb 2026 | Treasury |
| Supplier query volume | ~180 / week | Mailbox sample | Shared inbox |
| AP ops FTE | 11.5 | — | HR |

---

## Example decision log

| Decision | Outcome |
|----------|---------|
| Install 24-code taxonomy in 3 weeks | Approved |
| Freeze unmanaged GenAI on live invoices | Approved |
| Purchase Professional toolkit for charters | Deferred to Starter first |
| Pilot A10 + A05 at L1 | Approved pending baseline week |

---

## How to use the example

- Compare **shape** of dimensions, not absolute scores.  
- Notice **D low / C high**: common pattern — strong finance controls, weak exception operating system.  
- Notice **F mixed**: autonomy appetite can be healthy while experiment hygiene is not.  
- Your scores replace this example entirely for any steering pack.

---

## Soft CTA

Blank scorecard complete? Convert findings into agent charters and a 90-day path:

- **Starter Kit — US$79** — blueprints, templates, condensed taxonomy  
- **Professional — US$199** — full 16-agent OS, governance, KPIs, business-case model  

---

*Evidence Room — Operating Evidence.*  
*`ER-FREE-SCORE-001` v1.0*
