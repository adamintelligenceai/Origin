# Evidence Room — AP AI Readiness Scorecard Instructions

**Product:** Evidence Room AP Agent OS — Tier 0 (Free Diagnostic)  
**Companion to:** `Evidence_Room_AP_AI_Readiness_Diagnostic.md`  
**Workbook:** `Evidence_Room_AP_AI_Readiness_Scorecard.xlsx` (generated later; this file is the contract for that workbook)  
**Brand idea:** Proof before permission.  
**Line:** Agents earn responsibility. Evidence decides.  
**Version:** 1.0  
**Classification:** Operating instructions for the scorecard. Not a scoring model of its own. If this file and the diagnostic disagree on a formula, the diagnostic wins.

---

## Purpose

The markdown diagnostic is the method. The Excel scorecard is the **calculator and evidence packet** a CFO can open without reading 36 rubrics in prose.

This file tells you how to build, fill, check, and interpret that workbook — including if you are still on a printed score sheet or a blank workbook because the `.xlsx` has not been generated yet.

**What to do.** Capture 36 scores, six domain averages, overall points, maturity, hard brakes, heatmap, baseline KPIs, and business-case inputs in one file.

**How.** Follow the sheet list and the cell rules below. Do not add weights, targets, or a composite “AI index.”

**Who.** Scorer (Head of AP or AP Manager) enters scores. Challenge (Controller or Control owner) locks the file after review. Analyst pastes extracts into the Baseline sheet only.

**What can go wrong.** A helpful analyst adds `IF` logic that lifts a 2 to a 3 when “AI project exists.” That file is no longer this diagnostic.

**Control.** Every computed cell is a `SUM` or `AVERAGE` of integers you typed, or a `VLOOKUP`/`IFS` against the maturity table copied verbatim from the diagnostic. No other scoring logic.

**Measure.** Lint checklist at the end of this file. A workbook that fails lint is not issuable.

**Evidence.** Dated workbook or printed sheets stored under `[BUYER]/Evidence/Diagnostic/`.

---

## If the Excel file does not exist yet

**What to do.** Recreate the workbook from this specification in 20 minutes, or print the tables and compute with a calculator.

**How — minimum viable packet (no Excel).**

1. Print or copy the 36-question answer grid (Sheet `Scores` layout below).
2. Write 0–4 and a one-line note per question.
3. Average each domain of six; average all 36.
4. Apply hard brakes by hand using the diagnostic table.
5. Fill Baseline and Heatmap on paper.

**How — blank workbook (Excel / Sheets / LibreOffice).**

Create sheets in this **exact order and name**. Do not rename; Professional-tier packs and later automation will look for these names.

| # | Sheet name | Purpose |
|---|---|---|
| 1 | `00_Cover` | Identity, date, initials, maturity result |
| 2 | `01_Read_me` | Short instructions + link to this file |
| 3 | `02_Respondent` | People, scope, ERP names |
| 4 | `03_Scores` | 36 questions, 0–4, notes, tags |
| 5 | `04_Domains` | Six averages + range |
| 6 | `05_Maturity` | Overall, points, level, brakes |
| 7 | `06_Heatmap` | Five candidate rows + filter |
| 8 | `07_Agents` | First-wave ten + your pick |
| 9 | `08_Baseline` | KPI blanks |
| 10 | `09_Case` | Business-case inputs + scenario text |
| 11 | `10_Interpret` | One-page CFO script |
| 12 | `11_Lint` | Issuance checklist |

Protect all cells except input ranges (listed per sheet). Colour **input cells** only. Do not colour scores green/red except the brake flag.

**Who.** Anyone may build the blank. Only the scorer and challenge may fill `03_Scores`.

**What can go wrong.** Merging `03_Scores` and `05_Maturity` so a CFO edits a score while reading the result.

**Control.** Cover sheet states diagnostic version `1.0` and “weights: none.”

**Measure.** Sheet count = 12. Extra dashboard sheets fail lint.

**Evidence.** File name: `Evidence_Room_AP_AI_Readiness_Scorecard_<ENTITY>_<YYYY-MM-DD>.xlsx`.

---

## How to run a scoring sitting (with or without Excel)

**What to do.** Complete the diagnostic in 30–40 minutes as specified in the markdown file.

**How.**

1. Open `00_Cover`. Fill entity, period of *judgement* (today’s date), and names. Leave the maturity cells empty — they calculate later.
2. Complete `02_Respondent` before any scores. If you cannot name the payment authoriser and the bank-change path owner, stop and fetch names. Several control questions are unanswerable without them.
3. Score `03_Scores` top to bottom. One integer per row. Tag `E` / `O` / `G`.
4. Do not look at `05_Maturity` until all 36 are filled. Looking early produces score-chasing.
5. Challenge reviews any 3 or 4 that lacks an artefact pointer in the note.
6. Analyst (or scorer) fills `08_Baseline` from extracts. Blanks stay blanks.
7. AP Manager fills `06_Heatmap` and `07_Agents` after scores, not before.
8. Head of AP writes `10_Interpret` using the script. Challenge types the brake statement.
9. Run `11_Lint`. If it fails, do not send to the CFO.
10. Save, hash or write the filename + timestamp on the cover, store the file.

**Who.** See diagnostic “How to complete.”

**What can go wrong.** Filling heatmap first (“we already know we want matching”). Completing Baseline with Hackett or APQC numbers in the *figure* column.

**Control.** `08_Baseline` figure cells must not contain the strings `0.38`, `0.92`, `60%`, `63%`, `21%`, `14%`, `3.5`, `59%` unless you have independently measured the same thing in *your* ledger and the note says so. Those are published research figures, not your baseline.

**Measure.** Elapsed minutes (cover field). Target sitting: 30–40.

**Evidence.** Cover initials of scorer and challenge.

---

## Sheet-by-sheet contract

### `00_Cover`

| Field | Rule |
|---|---|
| Product | Hard-coded: Evidence Room AP Agent OS — Tier 0 |
| Diagnostic version | `1.0` |
| Buyer legal entity | Input |
| Sitting date | Input |
| Scorer name / role | Input |
| Challenge name / role | Input |
| Guess count | `=COUNTIF('03_Scores'!Tag,"G")` |
| Overall score | From `05_Maturity` (link, not retyped) |
| Overall points | From `05_Maturity` |
| Maturity level | From `05_Maturity` |
| Brakes applied | From `05_Maturity` |
| Indicative only? | `TRUE` if guess count > 12 |
| File ID | Input after save |

No charts on the cover. No vendor logo other than Evidence Room wordmark if present.

### `01_Read_me`

Paste, short:

- Scores are integers 0–4. Between two scores, take the lower.
- No weights.
- Hard brakes can cap maturity below the average.
- Industry research stays off the Baseline figure column.
- This workbook does not promise savings, fraud detection, compliance, accounting accuracy, payment safety, or ROI.

Link to the markdown diagnostic for rubrics. The workbook should carry **question text + short rubric** so it is usable offline; full “why it matters” stays in markdown if space is tight.

### `02_Respondent`

| Block | Fields |
|---|---|
| Organisation | Legal name, entity/company codes in scope, AP location (SSC / plant / outsource) |
| Systems | ERP, capture, workflow, archive, tax engine, bank/payment file — names only |
| People | Head of AP, AP Manager, Controller, Control owner, Payment authoriser, Bank-change owner, FinSys, Internal Audit (informed) |
| Volume hint | Last complete quarter invoice count if known — else `unknown` (this is not the Baseline sheet) |
| Constraints | Recording/privacy notes if a later workshop will observe the floor |

**What can go wrong.** Writing “SAP” when the live path is SAP + a plant warehouse system + a desktop register. List satellites.

### `03_Scores`

One row per question. Do not split a question across rows.

| Column | Name | Rule |
|---|---|---|
| A | ID | `PI-01` … `AR-06` — locked |
| B | Domain | Locked |
| C | Question | Locked (from diagnostic) |
| D | Score | Integer 0–4 only. Data validation. Blank = incomplete, not zero. |
| E | Tag | `E` / `O` / `G` / blank |
| F | Note | ≤ 200 characters. Artefact name or “none.” |
| G | Disagreement | Optional second score from challenge if they differed ≥ 2. **Used score is still the lower of D and G.** |
| H | Final | `=MIN(D,G)` if G filled, else D |

Domain totals use **Final**, not the scorer’s first number.

**Locked rubric helper (optional columns I–M).** Five short cells: “0 looks like…”, “…4 looks like…”. If included, copy from the diagnostic; do not rewrite.

**Validation.**

- Score outside 0–4 rejected.
- Final blank if Score blank — do not coerce to 0. A zero must be typed.
- Completeness: 36 Finals filled before `05_Maturity` displays a level (else “INCOMPLETE”).

### `04_Domains`

| Domain | IDs | Score formula |
|---|---|---|
| 1 Process integrity | PI-01–PI-06 | Average of six Finals |
| 2 Data & systems | DS-01–DS-06 | Average |
| 3 Controls & audit | CA-01–CA-06 | Average |
| 4 Exception economics | EE-01–EE-06 | Average |
| 5 Talent & operating model | TO-01–TO-06 | Average |
| 6 Agent readiness | AR-01–AR-06 | Average |

Also compute:

- Domain range = max − min of the six averages.
- Flag if range ≥ 2.0: `UNEVEN`.

Display all six. Do not chart a radar that becomes the CFO slide without the brake text.

### `05_Maturity`

| Cell | Formula / rule |
|---|---|
| Points | `SUM` of 36 Finals. Max 144. |
| Overall | Points / 36, one decimal. |
| Raw level | IFS on Overall: 0.0–0.7 → 1; 0.8–1.5 → 2; 1.6–2.3 → 3; 2.4–3.1 → 4; 3.2–4.0 → 5 |
| Brake: Controls < 2.0 | If Domain 3 < 2.0 then cap level at 2 |
| Brake: CA-03=0 or CA-04=0 | Cap level at 1 for money-adjacent permission (display “UNPREPARED for money-adjacent tools”) |
| Brake: Data < 1.5 | Cap level at 1 for live agents |
| Brake: Guess > 12 | Set `INDICATIVE = TRUE`; do not change the numeric level, but Cover shows “indicative — do not approve spend” |
| Brake: AR-06 = 0 | Finding flag `AMBITION_RISK` |
| Issued level | Minimum of raw level and brake caps |

**Label cells** (locked text): Unprepared / Experimental / Governed pilot / Earned scale / Institutional.

Do **not** convert points to a percentage of 144 for the cover. Points and 0–4 average are enough. A percentage invites exam-grade behaviour.

### `06_Heatmap`

Five rows H1–H5.

| Column | Rule |
|---|---|
| Candidate | Slice or exception family — not “AI” |
| Vol, Pain, Ctrl, Data | Integers 1–5. If unknown, **1** and tag `unknown` |
| Volume source | Extract ID or `unknown` |
| Survive? | `Y` only if Vol≥4 AND Pain≥4 AND Ctrl≤3 AND Data≥4 — **or** leave as a manual Y/N the AP Manager types after reading the diagnostic filter (preferred: **manual**, because first-wave observe on a high-control-risk bubble can be valid). Default formula helper: fail if Data≤2 or (Vol≤2 and Pain≤2). AP Manager overrides with a note. |
| First agent | From the ten, or blank |

No automatic ranking of agents.

### `07_Agents`

Locked table of the ten first-wave agents (copy from the diagnostic). One input row:

| Field | Input |
|---|---|
| First specialist | Dropdown of the ten |
| Companions | Default suggest 01 + 10 if specialist is not already 01 or 10; 16 if two specialists |
| Slice | Entity × channel × type |
| Ceiling this quarter | L0 / L1 / L2 |
| Owner | Named human |

### `08_Baseline`

Copy the diagnostic worksheet tables. All figure cells are **inputs**. No default numbers.

Header: scope, period, clock start, clock end, extract ID.

**Lint rule:** figure cells empty is OK. Figure cells that equal published research constants fail lint (see strings above).

STP definition is a text cell. Without it, the STP figure is invalid even if numeric.

### `09_Case`

Input table from the diagnostic. Three text boxes: Conservative / Base / Upside. No calculated “savings” cell. If a later builder adds `=hours*rate*volume`, that cell must be labelled `UNVALIDATED` and must **not** flow to Cover.

### `10_Interpret`

Structured fields, 400 characters each:

1. Overall sentence (can be formula-assisted from Cover).
2. Lowest domain sentence (input).
3. Permission sentence (input; must match issued level).
4. First slice (link to `07_Agents`).
5. What we are not claiming (locked boilerplate).

### `11_Lint`

Yes/No checks. All must be Yes to issue.

| Check | Pass if |
|---|---|
| L1 | 36 Final scores filled |
| L2 | Every score 0–4 integer |
| L3 | Domain scores displayed (6) |
| L4 | Issued level uses brakes |
| L5 | Guess count displayed |
| L6 | If Guess > 12 then Cover says INDICATIVE |
| L7 | Baseline has scope + period + clock definitions **or** explicit `unknown` |
| L8 | Baseline figures do not contain forbidden research constants unless noted as buyer-measured |
| L9 | No savings/ROI cell on Cover |
| L10 | Scorer and challenge named |
| L11 | Heatmap filled only after scores (sitting note) |
| L12 | Diagnostic version 1.0 cited |
| L13 | File stored with ID on Cover |

---

## Scoring hygiene

**What to do.** Keep the score honest under social pressure.

**How.**

| Pressure | Response |
|---|---|
| “We just bought capture AI — that is a 4 on Agent readiness.” | AR-01 is about a *charter*, not a licence. Score the paper. |
| “Audit passed last year.” | CA-06 is whether a stranger can reconstruct *this* invoice path, not whether the opinion was clean. |
| “We’re a top-quartile AP shop.” | Not a question on the sheet. APQC’s cost spread is not a self-score. |
| “Put 3s so we can buy the kit.” | Starter Kit is useful at Level 2–3. Inflating to 4 wastes the Controller’s time. |
| “Average us to 2.4 so we look Earned scale.” | Brakes and unweighted average. No. |

**Who.** Challenge owns hygiene. Scorer owns completeness.

**What can go wrong.** Scoring in a room with the vendor present.

**Control.** Vendor and implementation partner are not in the sitting. They may receive the issued one-pager later, not the raw 36.

**Measure.** Count of scores changed after first look at `05_Maturity`. Any change needs a note. More than three changes after seeing maturity → re-sit.

**Evidence.** If Excel: a copy saved at “scores complete, maturity hidden” if you want a clean audit. Optional, not required.

---

## How to read the issued workbook (CFO, 5 minutes)

1. `00_Cover` — level, points, brakes, indicative flag.
2. `04_Domains` — which domain is the hole.
3. `10_Interpret` — permission and first slice.
4. `08_Baseline` — how empty is measurement.
5. Stop. Do not mine `03_Scores` unless you are the challenge preparing an audit query.

If Cover shows INDICATIVE, the meeting outcome is “get the extracts,” not “approve a platform.”

---

## What can go wrong with the file itself

| Failure | Control |
|---|---|
| Hidden weights in `05_Maturity` | This contract; lint by a second person who reads the formulas |
| Traffic-light KPI sheet added | Remove before issue |
| Multiple entities averaged in one sitting | One workbook per entity; group roll-up is a later Professional product |
| Printed scores diverge from Excel | Cover file ID; paper marked “superseded” |
| Cloud sheet shared with edit rights to the whole AP team | Challenge locks; viewers only after issue |

---

## Measure (of the scorecard process)

| Check | Definition |
|---|---|
| Sitting time | Minutes, cover field |
| Completeness | Finals filled / 36 |
| Guess rate | G / 36 |
| Lint pass | All L1–L13 Yes |
| Post-maturity edits | Count |

---

## Evidence retention

Keep the issued workbook for the period your finance policy keeps management papers. This product does not set a statutory period. Agents (if any later) must not be able to edit or delete this file.

---

## Relationship to later products

| Product | Uses this workbook as |
|---|---|
| Starter Kit | Entry ticket: first slice and ceiling |
| Professional | Baseline ID cited on Measure packs |
| A future generated `.xlsx` | Must implement **this** contract. Pretty formatting is optional. Formula changes are not. |

---

## Disclaimers

- Completing the scorecard does not implement a control.
- A high score is not permission to release payments or to claim ROI.
- Research citations belong in narrative, not in Baseline figures.
- Evidence Room does not receive a copy of your scores unless you choose to send them.

Proof before permission. Agents earn responsibility. Evidence decides.

---

*End of SCORECARD_INSTRUCTIONS.md*
