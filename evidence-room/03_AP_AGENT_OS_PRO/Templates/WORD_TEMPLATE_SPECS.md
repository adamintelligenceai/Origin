# Word template specifications

**Evidence Room · AP Agent OS Pro**  
**Version:** 1.0 · September 2026  
**Licensed material**  
**Use:** Build `.docx` files that match the brand system. This file is the spec **and** the content: each template has a filled **example** (Northline, fictional) and a **blank**.

Do not ship Northline examples as the customer’s completed documents. Visual: paper `#f3efe6`, ink `#14171c`, forest `#1e5c45`, rule `#b8a888`. Serif titles (Source Serif 4), sans body (IBM Plex Sans), mono labels (IBM Plex Mono). No robots, no purple.

Header on every document: `EVIDENCE ROOM · AP AGENT OS` · document type · version · “Not legal, tax, accounting, or audit advice.” Footer: “Does not promise savings, fraud detection, compliance, accuracy, autonomous payments, or ROI.”

Page size: A4 or US Letter. Margins 22 mm. Tables: hairline rule-gold. Cover: wordmark + document type + entity name (theirs).

---

## 1. SOP — Standard operating procedure (agent-aware)

**File:** `SOP_AP_Agent_[AgentID]_[Entity].docx`  
**Length:** 4–8 pages. If longer, you are writing the ERP manual.

### Required sections

1. Purpose (one sentence)  
2. Scope / fence  
3. Roles (humans only as Accountable)  
4. Procedure (Tuesday path + agent step labelled Level 0/1)  
5. Exceptions and codes  
6. Controls and evidence  
7. Pause / kill switch  
8. Measures (pointer)  
9. Change control  
10. Document control  

### Example (Northline — fictional)

**Title:** SOP — Match-and-flag (A03) · SAP company NL10  
**Purpose:** Flag quantity and price variances on domestic PO invoices, existing vendors, ≤ $25,000 USD/CAD, for human release. Do not post, pay, or create GRs.  
**Owner:** Diego Alvarez, AP Matching Lead. **Backup:** Priya Menon. **Kill switch:** Priya Menon.  
**Level:** 1 Recommend.  
**Procedure (abridged):** (1) A01 parks object. (2) A10 exact-key. (3) A03 recommends match or `QTY-VAR`/`PRC-VAR`/`GR-MISS`. (4) Matcher accepts/edits/rejects. (5) Human posts. (6) Payment is a different SOP; A12 observes only.  
**Pause:** Priya sets register to frozen; A16 refuses dispatch.

### Blank

```
SOP TITLE: ________________________________
ENTITY / LEDGER: ________________________________
AGENT ID: A__     LEVEL IN FORCE: 0 / 1
PURPOSE SENTENCE:
SCOPE (IN):
SCOPE (OUT):
ACCOUNTABLE HUMAN:
BACKUP:
KILL SWITCH:
PROCEDURE:
  1.
  2.
  3.
EXCEPTION CODES USED:
CONTROLS / EVIDENCE:
PAUSE:
RELATED MEASURES:
VERSION / DATE / APPROVER:
```

---

## 2. Charter (one-page operating charter)

**File:** `CHARTER_Axx_[Entity].docx`  
Aligns to `AGENT_CHARTER_STANDARD.md` but one page for the wall. Full charter remains the markdown library.

### Required block

Agent ID · Name · Purpose · Owner/backup · Start level · Fence fields · Escalations · Exclusions · Deterministic first · Evidence list · Review date.

### Example (Northline — fictional)

| Field | Value |
|---|---|
| Agent | A03 Matching |
| Purpose | Recommend 3-way match within NL-TOL-2026-04; else code variance |
| Owner | Diego Alvarez |
| Level | 1 |
| Fence | SAP_S4_NL / NL10 / PO RE / domestic existing / ≤ 25000 / USD,CAD |
| Can post / pay / mail | false / false / false |
| Exclusions | Create GR; override; pay; NetSuite Pacific |
| Review | 2026-12-15 |

### Blank

```
AGENT ID / NAME:
PURPOSE:
OWNER / BACKUP / KILL SWITCH:
LEVEL / REVIEW DATE:
FENCE FIELDS:
ESCALATIONS:
EXCLUSIONS:
DETERMINISTIC CHECKS:
EVIDENCE PULL-LIST:
REGISTER ID:
```

---

## 3. RACI

**File:** `RACI_AP_Agent_Layer_[Entity].docx`  
**Rule:** If a row puts an agent as **A**, the row is wrong.

### Legend

R = Responsible (does the work) · A = Accountable (one human) · C = Consulted · I = Informed  
Agent columns may be **R** for prepare/recommend only, never **A**.

### Example (Northline — fictional)

| Activity | AP Mgr (Priya) | Match lead (Diego) | Controls | Payments | A03 | A12 | A16 |
|---|---|---|---|---|---|---|---|
| Accept match recommend | I | A/R | I | I | R (recommend) | — | I |
| Post invoice | I | A/R | I | I | — | — | I |
| Release payment | I | I | I | A/R | — | R (challenge) | I |
| Promote level | A | C | C | I | — | — | R (pack only) |
| Pull kill switch | A/R | I | I | I | — | — | R (enforce) |

### Blank

```
ACTIVITY          | Process owner | Steward | Control | Payments | Systems | A__ | A16
                  | A / R / C / I |         |         |          |         |     |
```

Add rows: sample execution, instruction change, vendor bank request, completeness recon, executive brief.

---

## 4. UAT record

**File:** `UAT_Axx_[Entity]_[YYYYMMDD].docx`  
Content mirrors `TESTING_UAT_SHADOW.md` §5.

### Example (Northline — fictional)

Environment: S4 sandbox NL10X. Instruction v1.0. A03 Level 1.  
U01–U12: 11 pass, U07 N/A (NetSuite out of fence — written). U08 pass (`CTRL-BRK`). Blocking defects: 0. Control owner: pass gate for *limited* Level 1, not Level 2.

### Blank

```
AGENT / LEVEL / INSTRUCTION VERSION:
ENVIRONMENT (NON-PROD):
CASE ID | RESULT | DEFECT | SEV
U01
…
U12
BLOCKING DEFECTS:
CONTROL OWNER SIGN-OFF (LIMITED PROD ONLY):
DATE:
```

Attach the label sheet; do not paste invoice images into the Word file if that creates a new data store you cannot protect.

---

## 5. Risk register extract (agent slice)

**File:** `RISK_AP_Agent_[Entity].docx`  
Full product risk register lives in `../Controls/RISK_REGISTER.md`. This Word file is the **slice** IA can file.

### Columns

ID · Risk · Inherent · Existing control · Residual · Owner · Agent link · R1 if it fails? · Next review

### Example (Northline — fictional)

| ID | Risk | Inherent | Control | Residual | Owner | Agent |
|---|---|---|---|---|---|---|
| NL-R1 | Agent posts outside fence | H | Register + A16 refuse | M | Priya | A16 |
| NL-R2 | Duplicate posted | H | A10 exact-key + human | M | Controls | A10 |
| NL-R3 | Payment file sent by tool | H | C01; A12 no release | L (if C01 holds) | Payments | A12 |
| NL-R4 | Receiver trust destroyed by bad GR chases | M | A05 stays L0 | M | Warehouse | A05 |

### Blank

```
ID | RISK | INH | CONTROL | RES | OWNER | AGENT | R1? | REVIEW
```

Do not add a “fraud residual = zero because A10 exists” row.

---

## 6. Meeting guide (steering / working)

**File:** `MEETING_AP_Agent_Steer_[YYYYMMDD].docx`  
Aligns to Team `STEERING_TEMPLATES.md`. 30 minutes.

### Example (Northline — fictional)

Agenda: sentence read; 11,400 recommendations (illustrative later period — do not invent yours); override-for-error 6.8% classified; R1 = 0; ask = stay Level 1. No vendor. No savings paper.

### Blank

```
DATE / CHAIR / QUORUM (STEWARD + CONTROL):
PURPOSE SENTENCE (UNCHANGED?):
FENCE VOLUME / BREACHES / PAUSES:
MEASURES 1–3:
R1 / OVERRIDES / SAMPLE:
DECISION ASK:
WHAT WE WILL NOT CLAIM:
ACTIONS (TRACKER IDs):
```

---

## 7. Implementation plan (Word)

**File:** `PLAN_AP_Agent_[Entity]_[Class].docx`  
Short plan. The tracker is the living file. This is what a PMO can file without turning the work into a programme.

### Required sections

Objective (sentence) · Out of scope · Gates G0–G9 · Roles · Calendar (dates local) · Dependencies (ERP access, sample extract) · Risks (pointer) · Communications (pointer) · Success = decision filed, not STP

### Example (Northline — fictional)

Objective: limited Level 1 A03 on NL10 PO ≤ $25k. Out: NetSuite, A12 execute, Level 3. Calendar: four weeks to G8, then 14-day log, then hold on Level 2. Success: decision log dated; no F6.

### Blank

```
OBJECTIVE (PURPOSE SENTENCE):
OUT OF SCOPE:
GATES AND TARGET DATES:
ROLES:
DEPENDENCIES:
NON-GOALS (SAVINGS, PAY, CERTIFICATE):
RELATED TRACKER:
VERSION / APPROVER:
```

---

## 8. Production notes for whoever builds the .docx

| Element | Spec |
|---|---|
| Cover mark | Forest square 28×28 pt + wordmark 13 pt tracked |
| H1 | Serif 22 pt, weight 500 |
| H2 | Serif 16 pt |
| Label | Mono 10.5 pt, forest or slate, uppercase |
| Body | Sans 11 pt, 1.4 line |
| Callout “NOT A PROMISE” | Rust left rule 3 pt, cream fill |
| Example vs blank | Example pages watermark `ILLUSTRATIVE · NORTHLINE FICTIONAL`; blank pages watermark `BLANK` |
| Filename | No `ROI`, `savings`, `compliant` |

If `tools/render_doc.py` or `build_spreadsheets.py` emit these later, they follow this spec. Until then, Word built by hand from this file is acceptable.
