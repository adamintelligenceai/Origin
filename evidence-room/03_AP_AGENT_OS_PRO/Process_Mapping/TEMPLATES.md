# Process-mapping templates

**Evidence Room · AP Agent OS Pro**  
Version 1.0 · September 2026 · Licensed material · ERP-agnostic  
Answers: *What should I do? How? Who owns it? What evidence?*

Copy these forms. Do not invent a parallel set. Field names are stable so artefacts can be compared across clients and quarters.

Fill current-state as practised. Label any future-state copy in the title. Unsigned templates are drafts.

Companion method: `ER_METHODOLOGY.md`. Exception codes: `EXCEPTION_TAXONOMY.md`.

---

## How to use this file

1. Duplicate the relevant template into the client evidence room as `YYYY-MM-DD_<artefact>_<entity>.md` (or the equivalent sheet).
2. Complete every field or write `n/a — [reason]`. Blank fields fail review.
3. Sign the footer. A signed artefact without a date is unsigned.
4. Version on material change. Do not overwrite; supersede.

**Classification.** Treat completed forms as confidential. They contain supplier names, control weaknesses, and unofficial workarounds.

---

## 1. Process walkthrough notes

**When.** Step 1 — Observe.  
**Owner.** Facilitator. **Accountable.** AP process owner.

```
# Walkthrough notes
Client:                 Entity / company code:
Process slice:          (e.g. PO invoices, non-PO, utilities)
ERP / modules:          Channels in scope:
Observation dates:      Sites / pods:
Facilitator(s):         Operators observed (roles, not names if policy requires):
Recording IDs:          Consent reference:
Official SOP version:   SOP date:

## Purpose of this slice
What the operator believes “done” means:

## Path observed (numbered)
| # | Time | Actor role | Action | System / side channel | Input used | Output / next wait | Official SOP? (Y/N) |
|---|------|------------|--------|-----------------------|------------|--------------------|---------------------|
| 1 |      |            |        |                       |            |                    |                     |

## Unofficial steps and informal controls
| Step | Why it exists | Risk if encoded as an agent | Proposed treatment (retire / policy / finding) |
|------|---------------|-----------------------------|---------------------------------------------------------------|

## Decision points heard
| Quote or paraphrase | Rule-like / judgement / political | Named decider |

## Exceptions seen or mentioned
| Taxonomy code | How it appeared | Actual resolution | Time lost (approx.) |

## Systems and artefacts touched
| System or file | Purpose | Owner | In SOP? |

## What would break if a key person were out
| Person / role | Knowledge that is not written |

## Facilitator judgement (not a finding until Step 4)
Control concerns:
Data-quality concerns:
Likely first agent slice:
Do not agentise yet:

## Evidence
Recordings stored at:
Screenshots / redacted samples:
Ticket sample IDs reviewed:

Signed: Facilitator _______ date ____
Reviewed: AP process owner _______ date ____
```

**How to fill well.** Write what you saw, not what should happen. If the operator opened a personal mailbox, write that. If they skipped a match because “we know this supplier,” write that.

**What can go wrong.** Notes that read like a vendor discovery deck. If there is no unofficial step listed, you probably watched a rehearsal.

---

## 2. Transcript extraction

**When.** Step 3 — Extract.  
**Owner.** Facilitator. **Reviewer.** AP lead + controls analyst.

One row per observed *action*, not per invoice. An invoice that is parked, queried, and later posted is several rows.

```
# Transcript extraction
Source transcript / recording IDs:
Extractor:                 Reviewer:
Date:

| Row | Timestamp | Invoice / doc ref (redacted) | Trigger | Action | Actor role | System | Fields actually used | Decision type (rule / judgement / political) | Exception code | Wait created? | Output | Informal control? (Y/N) | Maps to agent (A01–A16 or none) | Notes |
|-----|-----------|------------------------------|---------|--------|------------|--------|----------------------|----------------------------------------------|----------------|---------------|--------|-------------------------|---------------------------------|-------|
| 1   |           |                              |         |        |            |        |                      |                                              |                |               |        |                         |                                 |       |

## Coverage check
Ticket reasons last 90 days not seen in observation:
New exception codes proposed:
Rows with no agent mapping (expected for pure waits / politics):

## Challenge notes (reviewer)
Disagreements:
Items to take to Structure workshop:

Signed: Extractor _______ date ____
Signed: Reviewer _______ date ____
```

**Decision-type test.** If two competent clerks would do the same thing from the same fields, it is rule-like. If they would reasonably differ, it is judgement. If a named person always wins, it is political — do not agentise the politics; escalate the control.

---

## 3. Process map

**When.** Step 4 — Structure.  
**Owner.** AP process owner. **Counter-sign.** Controls / Internal Audit.

Use swimlanes. Keep exceptions on the page.

```
# Process map — CURRENT STATE
Client:                 Slice:
Version:                Effective observation dates:
Systems on the map:

## Swimlanes (roles / systems)
1.
2.
3.

## Narrative (one line per box, left to right)
Start event:
Boxes:
Decision diamonds (rule stated or “judgement — owner”):
Exception branches (taxonomy codes):
End events (posted / parked / rejected / paid-proposal only / returned):

## Out of scope (explicit)
-

## Differences from official SOP
| SOP step | Practised step | Treatment decided in workshop |

## Attachments
Diagram file:
Extraction rows not shown on map (must be empty or justified):

Signed: Process owner _______ date ____
Signed: Controls / IA _______ date ____
```

**Diagram conventions (if drawing).**

| Symbol | Use |
|---|---|
| Rectangle | Action |
| Diamond | Decision — write the rule in the diamond |
| Stadium | Start / end |
| Folder | Evidence artefact produced |
| Red underline | Informal control, to be retired or promoted |
| Agent code in corner | Candidate A01–A16, filled at Step 5 |

**Future-state maps** use the same form with `CURRENT STATE` replaced by `TARGET STATE` and a link to the current-state version they supersede.

---

## 4. Decision tree

**When.** Step 4. One tree per material decision (match, duplicate, tax, coding, approval path, payment-proposal inclusion).

```
# Decision tree
Decision name:          (e.g. Price mismatch treatment)
Applies to:             Slice / ERP / entity:
Version:

## Inputs required
-

## Tree
IF [deterministic condition]
  THEN [action] — authority: Human / Recommend / Prepare / Execute
ELSE IF ...
  THEN ...
ELSE
  THEN [fallback] — owner:

## Tolerances / tables used
Table name and owner:
Last certified:

## Overrides
Who may override:
Evidence required:
SoD constraint:

## What this tree must never do
-

Signed: Process owner _______ date ____
Signed: Control owner _______ date ____
```

**Rule.** If the first `IF` can be a table, it is a table. The model, if used at all, sits in a later branch and only recommends.

---

## 5. Exception taxonomy extract

**When.** Steps 3–4. This is the *local* extract. Do not rewrite the standard taxonomy; reference its codes and record local frequency, owners, and treatments.

```
# Exception taxonomy extract
Client:                 Period:
Volume basis:           (invoices in period)
Source:                 tickets / ERP reason codes / observation

| Code | Standard name | Local name / ERP reason | Count | % | Median age (days) | Local owner | Default agent | Local treatment (as-is) | Target treatment | Automation potential (none / assist / deterministic / bounded execute) | Residual risk note |
|------|---------------|-------------------------|-------|---|-------------------|-------------|---------------|-------------------------|------------------|---------------------------------------------------------------------|--------------------|
| E01  | Missing PO    |                         |       |   |                   |             | A04 / A06 / A09 |                       |                  |                                                                     |                    |

Codes with count = 0 still appear if they are in the standard list and in scope — write 0, do not delete.

## Top 5 by volume
## Top 5 by ageing
## Top 5 by control concern (not the same list)

Signed: AP lead _______ date ____
Signed: Controls _______ date ____
```

Standard codes live in `EXCEPTION_TAXONOMY.md` (E01–E27). If you need E28+, propose it here with definition, owner, and why it is not an existing code.

---

## 6. Control map

**When.** Step 4, updated at Steps 5, 8, and 10.  
**Owner.** Control owner / Internal Audit.  
**Answers:** *How control? What can go wrong? What evidence?*

```
# Control map
Client:                 Slice:
Version:                Linked process-map version:

| Control ID | Objective | Linked risk ID | Process step | Agent (or Human) | Preventive / Detective | Type (SoD / authority / validation / logging / reconciliation) | Owner | Frequency | Evidence | Escalation if fail |
|------------|-----------|----------------|--------------|------------------|------------------------|---------------------------------------------------------------|-------|-----------|----------|--------------------|
| C-         |           | R-             |              |                  |                        |                                                               |       |           |          |                    |

## Hard controls (must remain)
- Payment authorisation is human.
- Bank-detail change is human, dual-controlled.
- Override of failed match / duplicate / SoD is human and logged.

## Informal controls discovered
| Informal control | Promote to policy / retire / replace | Date decided |

## Coverage statement
Every material risk on the local risk register has at least one control on this map: Yes / No (if No, list gaps)

Signed: Control owner _______ date ____
Signed: Process owner _______ date ____
```

Populate the live matrix from `../Controls/AGENT_CONTROL_MATRIX.md`. This template is the client instance header.

---

## 7. RACI

**When.** Step 4. Refresh when authority changes (Step 10).

R = Responsible (does the work)  
A = Accountable (one name — answers for failure)  
C = Consulted  
I = Informed

```
# RACI — AP agent slice
Client:                 Version:
Accountable executive (always human): 

| Activity | AP clerk | AP supervisor | AP Director | Buyer / requestor | Procurement | Tax | Treasury / payments | Controller | Internal Audit | AI product owner | Agent (code) |
|----------|----------|---------------|-------------|-------------------|-------------|-----|---------------------|------------|----------------|------------------|--------------|
| Invoice intake / extract confirm | | | | | | | | | | | A01 |
| Validation accept / reject | | | | | | | | | | | A02 |
| Match in tolerance | | | | | | | | | | | A03 |
| Match out of tolerance | | | | | | | | | | | A03 / A04 |
| Exception triage | | | | | | | | | | | A04 |
| GR chase send | | | | | | | | | | | A05 |
| PO quality defect accept | | | | | | | | | | | A06 |
| Approval decision | A (human) | | | | | | | | | | A07 prepares only |
| Supplier query send | | | | | | | | | | | A08 |
| Internal chase send | | | | | | | | | | | A09 |
| Duplicate exact-key block | | | | | | | | | | | A10 |
| Near-duplicate / anomaly decision | | | | | | | | | | | A10 |
| Statement discrepancy accept | | | | | | | | | | | A11 |
| Payment proposal challenge | | | | | | | | | | | A12 |
| **Payment authorisation / release** | | | | | | | **A (human)** | | I | I | **none** |
| Bank-detail change | | | | | | | A (human, dual) | | | | A08 drafts only |
| Close sign-off | | | | | | | | A (human) | I | I | A13 prepares |
| Operating pack certify | | | C | | | | | C | C | | A14 prepares |
| Root-cause proposal accept | | | A | | | | | | C | | A15 |
| Dispatch / SLA escalate | | | A | | | | | | I | | A16 |
| Kill-switch / fallback | | | A | | | | | | C | R | — |
| Incident response | | | A | | | | C | C | C | R | — |
| Periodic certification / autonomy promotion | | | C | | | | | C | A | R | A16 recommends only |

Rules:
- Exactly one A per row.
- No agent is A for payment authorisation, bank-detail change, or certification.
- An agent column may be R only for Execute-class work inside a signed canvas.

Signed: AP Director _______ date ____
Signed: CFO / delegate _______ date ____
Signed: IA _______ date ____
```

---

## 8. SOP header

**When.** Step 4 produces the header; the body is the organisation’s SOP. Agents do not replace SOPs. They inherit them.

```
# SOP header
SOP title:
SOP ID:                 Version:
Process slice:          Entities:
Related process-map version:
Related control-map version:
Related agent canvases (codes):

## Objective
One paragraph. What “done” means. What “paid” means (posted ≠ paid).

## Scope and out of scope
In:
Out:

## Hard stops
- Payment authorisation is human.
- [local hard stops]

## Roles (from RACI)
Accountable:
Responsible day-to-day:
Control owner:

## Systems of record
ERP:
Intake:
Evidence store:
Payment system (human-operated):

## Records and retention
What is kept:
Where:
Retention (link to policy):

## Exceptions
Taxonomy extract version:
When to escalate (link to tree):

## Changes
This SOP is updated when the process map or an agent authority changes — not when a model weight changes, unless behaviour changes. Model/workflow change procedure: governance framework.

## Approval
Process owner _______ date ____
Control owner _______ date ____
Effective date:
```

The SOP *body* stays in the client’s existing SOP format. This header is the binding cover so the SOP, the map, and the agents cannot drift silently.

---

## 9. Agentisation canvas

**When.** Step 5. One canvas per agent in scope.  
**Owner.** Process owner (job). AI product owner (configuration). Control owner (boundary).

```
# Agentisation canvas
Agent code / name:      A0X —
Client / slice:
Canvas version:         Date:
Replaces canvas:

## 1. Job
One sentence. The job is a result, not a technology.
Out of scope (list):

## 2. Population
Entities / company codes:
Channels:
Document types:
Amount / other caps:
Explicitly excluded:

## 3. Inputs
Systems and fields (actual, from extraction — not the full data dictionary):
Unstructured sources:
Human-entered sources:

## 4. Tools the agent may call
| Tool | Purpose | Read / write | Environment (shadow / pilot / prod) |
|------|---------|--------------|-------------------------------------|
|      |         | read         |                                     |

Write access in Shadow: none.

## 5. Deterministic vs model
What a rule / key / table will do:
What a model may do:
Why a model is required at all (or “not required”):

## 6. Authority (ladder)
Human / AI recommends / AI prepares / AI executes:
Promotion requires Step 10. This canvas cannot self-promote.

## 7. Never list
-
Payment-direction actions (if this is A12: challenge/prepare only; no authorise, release, transmit).

## 8. Human owner
Named role (not “the team”):
Backup:
On-call for incidents:

## 9. Controls
Control IDs from the control map:
SoD constraints:
Validation of outputs (schema / policy / second method):
Logging (A16):

## 10. Fallback
If the agent is unavailable:
If confidence is below floor:
If a control fails:
Kill-switch owner:

## 11. Evidence produced
Artefacts and retention:

## 12. KPIs (from KPI framework — few, owned)
Activity:
Operational:
Risk-control:
(Do not put a savings target on the canvas.)

## 13. Test status
Golden-set ID:
Last score date:
Go/no-go:

## 14. Known failure modes
| Failure | Detected by | Human action |

Signed: Process owner _______ date ____
Signed: AI product owner _______ date ____
Signed: Control owner _______ date ____
```

**Quality test.** A person who was not in the workshop should be able to operate, halt, and audit this agent from the canvas plus the control map. If they cannot, the canvas is a slide.

---

## Completeness checklist (Step 4–5 gate)

| Artefact | Present | Versioned | Signed | Stored in evidence room |
|---|---|---|---|---|
| Walkthrough notes | | | | |
| Transcript extraction | | | | |
| Process map (current-state) | | | | |
| Decision trees (all material decisions) | | | | |
| Exception taxonomy extract | | | | |
| Control map | | | | |
| RACI | | | | |
| SOP header | | | | |
| Agentisation canvas (each in-scope agent) | | | | |

No canvas, no test. No control map, no pilot.

---

## Facilitation timing for templates

| Workshop | Templates on the table | Timebox |
|---|---|---|
| Observation debrief | Walkthrough notes | 60–90 min |
| Extraction challenge | Transcript extraction | 90 min |
| Structure | Map, tree, taxonomy extract, control map, RACI, SOP header | 3–4 h |
| Agentise | Canvases | 3–4 h (first slice) |
| Go/no-go | Canvases + golden-set scores | 60 min |

If a workshop starts redesigning the ERP, stop. That is a different project.

---

## Related documents

- `ER_METHODOLOGY.md`
- `EXCEPTION_TAXONOMY.md`
- `../Controls/AGENT_CONTROL_MATRIX.md`
- `../Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`
