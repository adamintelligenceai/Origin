# Evidence Room — AP Agent Starter Kit

**Tier 1 · US$79**  
**Audience:** Finance leaders and AP managers who need a credible operating model before buying platforms or hiring more consultants.

---

## What you get

1. AP Agent Operating Model overview  
2. Top 10 AP agent blueprints  
3. AP exception taxonomy (core)  
4. AI readiness diagnostic (pointer + method)  
5. Human-vs-agent decision framework  
6. Process-mapping template  
7. Agent job description template  
8. Agent instruction template  
9. KPI scorecard (starter set)  
10. Governance checklist  
11. AP transformation roadmap (indicative)  
12. Implementation checklist  

Use Professional ($199) when you need the full 16-agent library, control matrix, ROI model, and testing/UAT packs.

---

## 1. AP Agent Operating Model

AP work is a **workforce problem**, not only a workflow problem. Agents are digital colleagues that:

- observe documents and data  
- recommend or prepare actions  
- escalate exceptions  
- leave evidence  

Humans retain judgment, supplier relationships, control ownership, and **all payment authorisation**.

```
Invoices / POs / GRs / Statements / Approvals
                 │
                 ▼
        ┌─────────────────┐
        │  Agent layer    │  ← Evidence Room designs this
        │  (governed)     │
        └────────┬────────┘
                 │ recommendations / prepared actions / flags
                 ▼
        ┌─────────────────┐
        │ Human AP / Controls / Treasury │
        └────────┬────────┘
                 ▼
              ERP / AP automation stack
```

### Responsibility levels (summary)

| Level | Name | Agent may | Default? |
|------:|------|-----------|----------|
| 0 | Observe | Review & log | Yes for new agents |
| 1 | Recommend | Propose next action | Common early state |
| 2 | Prepare | Draft actions needing approval | After evidence |
| 3 | Execute within guardrails | Low-risk pre-approved acts | Earned |
| 4 | Managed autonomy | Independent within boundaries | Rare; exception-based oversight |

---

## 2. Top 10 agent blueprints (Starter)

### 1) Invoice Intake Agent
**Purpose:** Determine if extraction is complete enough for downstream processing.  
**Start at:** L0–L1  
**Exclude:** Posting, payments.

### 2) Invoice Validation Agent
**Checks:** supplier, invoice #, date, PO, entity, currency, amount, tax, lines, duplicates, required fields.  
**Start at:** L1

### 3) Matching Agent
**Handles:** 2-way / 3-way, tolerances, multi-line.  
**Start at:** L0–L1 until tolerance policy is explicit.

### 4) Exception Triage Agent
**Classifies** into taxonomy; recommends owner and next action.  
**Often the best first production-shadow agent.**

### 5) Goods Receipt Agent
**Finds** missing GRs; identifies likely requesters; prepares follow-ups.  
**Human sends** until L2 evidence exists.

### 6) Approval Agent
**Surfaces** stalled approvals, absent approvers, DOA issues, deadline risk.

### 7) Supplier Resolution Agent
**Drafts** supplier emails (missing PO, duplicate, incorrect invoice, credit note, statement diffs).  
**Human approval to send** required initially.

### 8) Duplicate & Anomaly Agent
**Flags** exact/near duplicates and unusual patterns.  
**Not a fraud guarantee.**

### 9) Payment Proposal Review Agent
**Analytical pre-payment review only.**  
**Payment authorisation always human.**

### 10) AP Reporting Agent
**Produces** daily/weekly exception and ageing packs from agreed data sources.

*(Professional unlocks Agents 11–16 including Orchestrator, Close, Root Cause, Statement Rec, PO Quality, Internal Follow-Up.)*

---

## 3. Core exception taxonomy (Starter)

Use codes from `spreadsheets/ER_AP_Exception_Tracker.xlsx` (Taxonomy Codes sheet). Minimum set to implement this week:

Missing PO · Invalid PO · Price mismatch · Quantity mismatch · Missing receipt · Duplicate · Potential duplicate · Wrong supplier · Tax issue · Approval missing · Coding missing · OCR/extraction · Statement discrepancy · Aged unresolved · System/interface error

For each exception you actually see, capture: definition, owner, escalation, agent candidate.

---

## 4. Human-vs-agent decision framework

Ask for each step:

| Question | If Yes → | If No → |
|----------|----------|---------|
| Is the rule deterministic and stable? | Prefer classic automation / RPA / ERP config | Consider agent assist |
| Is judgment contextual? | Agent recommend + human decide | Don't force automation |
| Is blast radius high (payment, bank, legal)? | Human control mandatory | Still require evidence |
| Is training data sensitive? | Privacy review first | Still least privilege |
| Can we measure FP/FN? | Eligible for shadow | Instrument first |

---

## 5. Process-mapping template (1 page)

**Process name:** _____________  **Slice:** _____________  
**Systems:** _____________  
**Happy path steps (max 12):**  
1.  
2.  
…  

**Decisions:**  
**Business rules:**  
**Exception types observed:**  
**Controls today:**  
**Dependencies:**  
**What remains human:**  
**What agent may recommend:**  
**What must never be automated yet:**  

---

## 6. Agent job description template

**Agent name:**  
**Mission:**  
**Human owner:**  
**Inputs:**  
**Tools/data:**  
**Responsibilities:**  
**Explicit exclusions:**  
**Approval requirements:**  
**Escalation:**  
**Output standard:**  
**Controls & audit evidence:**  
**KPIs:**  
**Autonomy level (0–4):**  
**Failure handling:**  
**Cost monitoring:**  

---

## 7. Agent instruction template (skeleton)

```
ROLE: You are the [Agent Name] assisting [Human Owner Role] in Accounts Payable.
OBJECTIVE: [one sentence]
SCOPE IN: [bullets]
SCOPE OUT: [bullets — include payments if relevant]
INPUTS YOU WILL RECEIVE: [...]
OUTPUT FORMAT: [structured fields]
DECISION POLICY: [tolerances, taxonomy codes]
ESCALATE WHEN: [...]
CONFIDENCE: State low/medium/high; if low, recommend human review.
NEVER: invent PO numbers, approve payments, change bank details, claim fraud certainty.
EVIDENCE: Cite fields/documents used; do not cite sources you were not given.
```

---

## 8. Starter KPI scorecard

Track weekly for your first agent:

- Classification or extraction accuracy (sampled)  
- False-positive rate  
- Human intervention rate  
- Average resolution time (for touched items)  
- Exceptions handled  
- Control breaches (must be zero tolerance for payment-path breaches)

Full dictionary: Professional KPI framework + `ER_AP_KPI_Scorecard.xlsx`.

---

## 9. Governance checklist (Starter)

- [ ] Named executive sponsor  
- [ ] Named human owner per agent  
- [ ] Autonomy level documented  
- [ ] Exclusions include payment execution  
- [ ] SoD reviewed for agent service accounts  
- [ ] Audit logging on  
- [ ] Shadow period defined  
- [ ] Kill switch / fallback SOP  
- [ ] Privacy/security notified  
- [ ] Model/prompt version recorded  

---

## 10. Indicative roadmap

| Phase | Focus |
|-------|-------|
| Week 0–1 | Diagnostic + baseline KPIs |
| Week 1–2 | Map one slice |
| Week 2–3 | Charter one agent L0/L1 |
| Week 3–6 | Historical test + shadow |
| Week 6+ | Controlled prepare (L2) only if gates met |

Duration depends on systems, controls, integrations, complexity, data quality, and governance.

---

## 11. Implementation checklist

- [ ] Diagnostic complete  
- [ ] Baseline KPIs stored  
- [ ] Taxonomy codes agreed  
- [ ] First agent selected  
- [ ] Charter signed at L0/L1  
- [ ] Sample of 50–200 historical cases labelled  
- [ ] Shadow dashboard agreed  
- [ ] Steering date booked  

---

## Licence & disclaimer

Individual/Professional licence terms apply (`10_LEGAL_AND_LICENSING/`). No guaranteed savings, fraud detection, compliance, or ROI.
