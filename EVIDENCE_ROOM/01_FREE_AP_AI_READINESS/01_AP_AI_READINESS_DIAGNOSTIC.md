# AP AI Readiness Diagnostic

**Product:** Evidence Room — Free Lead Magnet  
**Document ID:** `ER-FREE-DIAG-001`  
**Version:** 1.0  
**Brand idea:** Operating Evidence  
**Audience:** CFO, Controller, Head of AP / Shared Services, Finance Transformation  
**Time to complete:** 45–75 minutes (with one process owner + one systems-aware colleague)

---

## Cover

**Evidence Room**  
AP Agent OS · Free Diagnostic

### AP AI Readiness Diagnostic

**Design operating evidence before you expand autonomy.**

This diagnostic scores whether your Accounts Payable function is ready to introduce AI agents under control — not whether you should buy another automation tool.

It produces:

- A 0–100 readiness score with maturity band  
- A dimension profile (where you are strong / weak)  
- An opportunity heatmap for agent families  
- A baseline KPI worksheet  
- A business-case starter with labelled assumptions  

It does **not** promise savings, fraud detection, compliance certification, or autonomous payments.

| Field | Complete |
|-------|----------|
| Organisation | |
| Legal entities in scope | |
| Approximate invoices / month | |
| ERP / AP stack | |
| Diagnostic owner | |
| Date | |
| Reviewer (Controller / Head of AP) | |

---

## 1. Positioning — why this exists

Most Finance teams are being asked to “use AI in AP.” The question that matters is narrower:

> Can we design agents with owners, exclusions, exception logic, and measurable evidence — before we let them touch live work?

Vendors sell features. Consultancies sell projects. Prompt packs sell novelty.  
**Evidence Room** sells the portable **operating layer**: charters, controls, exception taxonomy, KPIs, and a responsibility ladder (L0→L4) that sits across any ERP.

**Operating Evidence** means: if you cannot show who owned an agent action, what rule applied, what exception code was used, and what changed in the scorecard, you do not expand autonomy.

Payment authorisation stays human at every maturity band described here.

---

## 2. How to score (0–100)

### 2.1 Structure

| Block | Questions | Max points | Weight in total |
|-------|-----------|------------|-----------------|
| A. Process clarity | Q1–Q6 | 18 | 18% |
| B. Data & systems | Q7–Q12 | 18 | 18% |
| C. Controls & governance | Q13–Q18 | 18 | 18% |
| D. Exception load | Q19–Q23 | 15 | 15% |
| E. Talent & operating model | Q24–Q28 | 15 | 15% |
| F. AI readiness culture | Q29–Q32 | 16 | 16% |
| **Total** | **32** | **100** | **100%** |

Each question scores **0 / 1 / 2 / 3** unless noted. Use the rubrics below; do not invent intermediate scores.

### 2.2 Scoring method

1. Answer every question with the **current operating reality**, not the target-state slide.  
2. Where practice differs by entity, score the **primary entity** you intend to pilot first — then note variance.  
3. Two people should score independently, then reconcile disagreements ≥1 point.  
4. Sum raw points → total 0–100.  
5. Map total to a maturity band (§4).  
6. Plot dimension averages for the heatmap (§5).

### 2.3 Dimension average (for heatmap)

For each block, convert to a 0–100 subscore:

`Subscore = (points earned / max points) × 100`

Round to nearest integer.

---

## 3. Diagnostic questions (32)

### A. Process clarity (Q1–Q6) — 18 points

**Q1. Documented invoice-to-pay process**  
Is there a current, used process map for invoice-to-pay (not a 2019 Visio in a shared drive)?

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| No map, or nobody can find it | Map exists; rarely used; outdated | Map current for primary entity; used in training | Map current, version-controlled, multi-entity variants owned |

**Q2. Role clarity**  
Can you name who owns intake, matching, exceptions, approvals, and payment proposal preparation?

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Roles blur daily | Informal knowledge only | RACI for humans documented | RACI ready to extend to agents |

**Q3. Policy accessibility**  
Are PO-required rules, tolerance tables, and non-PO paths written and reachable by processors?

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Tribal knowledge | Policy exists; hard to find | Policy accessible; gaps known | Policy + tolerances maintained with change control |

**Q4. Channel inventory**  
Do you know all inbound invoice channels (email, portal, EDI, paper, supplier networks)?

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Unknown / “mostly email” | Partial list | Full list with volumes | Full list + owner per channel |

**Q5. Straight-through definition**  
Is “clean” / STP defined with explicit exclusion criteria?

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| STP is a slogan | Informal definition | Written STP criteria | STP measured weekly with exclusions logged |

**Q6. Handoffs**  
Are handoffs between AP, Procurement, Receivers, and Approvers explicit (SLA, artefact, owner)?

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Firefighting handoffs | Some SLAs | Written handoffs for top paths | Measured handoffs + escalation clocks |

**Block A subtotal: ___ / 18**

---

### B. Data & systems (Q7–Q12) — 18 points

**Q7. Master data health**  
Vendor master quality (duplicates, inactive vendors, incomplete tax IDs) is known and managed.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Unknown | Occasional cleanse | Metrics exist; backlog owned | Stewardship process with cadence |

**Q8. Document capture quality**  
OCR / capture error rates are measured for critical fields (supplier, amount, invoice #, PO).

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Not measured | Anecdotal | Field-level error rates tracked | Error rates drive vendor/channel action |

**Q9. Match data availability**  
PO, receipt, and invoice line data are reliably available for three-way match where required.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Frequent missing links | Partial | Reliable for core categories | Reliable + service acceptance paths defined |

**Q10. Audit trail**  
System of record retains who changed coding, approvals, holds, and payment proposals.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Gaps / workarounds | Partial trails | Strong ERP trails | Trails + exportable evidence packs |

**Q11. Integration readiness**  
AP objects can be read (and later written under control) via API, RPA, or file — without screen folklore only.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| UI-only folklore | Some exports | Read integration proven | Read + controlled write pattern designed |

**Q12. Environment separation**  
There is a non-production path to test agent behaviour against realistic data.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Prod-only experiments | Stale sandbox | Usable test env | Test env + refresh + masked data practice |

**Block B subtotal: ___ / 18**

---

### C. Controls & governance (Q13–Q18) — 18 points

**Q13. Segregation of duties**  
SoD between posting, vendor master, and payment authorisation is enforced and reviewed.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Informal | Documented; weakly enforced | Enforced in system | Enforced + periodic certification |

**Q14. Duplicate controls**  
Duplicate payment / invoice controls exist beyond “be careful.”

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Manual memory | Soft system check | Hard block / hold on candidates | Hard block + investigation workflow + evidence |

**Q15. Delegation of authority**  
DOA is system-enforced for invoice approval amounts.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Email culture | Partial | System DOA for primary entities | System DOA + exception logging |

**Q16. Payment authorisation**  
Payment release is dual-controlled and explicitly human — no bot “release” narratives.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Ambiguous | Human but poorly evidenced | Clear human auth + evidence | Clear + bank-file controls + sampling |

**Q17. Vendor bank change**  
Banking / remit-to changes require enhanced verification (not email alone).

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Email-driven risk | Some checks | Formal dual verification | Formal + callback / out-of-band + evidence |

**Q18. Change control for automation**  
RPA / AI / workflow changes have owners, testing, and rollback — not silent prod edits.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Ad hoc | Ticket only | Change control for bots | Change control + autonomy registry concept |

**Block C subtotal: ___ / 18**

---

### D. Exception load (Q19–Q23) — 15 points

**Q19. Exception classification**  
Exceptions are coded with a stable taxonomy (not free-text only).

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Free-text / none | Informal codes | Stable codes in use | Codes drive ownership + reporting |

**Q20. Ageing visibility**  
Aged exceptions are visible by owner, amount, and code.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Hidden in inboxes | Spreadsheet heroics | Dashboard exists | Dashboard used in operating rhythm |

**Q21. Volume concentration**  
You know which 5–10 exception types consume most effort.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Unknown | Gut feel | Measured top codes | Measured + root-cause themes |

**Q22. Supplier query load**  
Supplier chases and statement noise are quantified.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Unknown | Estimate only | Volume tracked | Volume + response SLA tracked |

**Q23. Preventable vs unavoidable**  
The team distinguishes process defects (PO quality, GR lag) from true commercial disputes.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| All “AP problems” | Informal split | Written themes | Themes feed Procurement / Ops actions |

**Block D subtotal: ___ / 15**

---

### E. Talent & operating model (Q24–Q28) — 15 points

**Q24. Process ownership**  
A named AP Process Owner exists with authority to change design (not only firefight).

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| No owner | Owner in title only | Active owner | Owner + Controllership partnership |

**Q25. Capacity for design work**  
Leadership protects time for process design / pilots (not 100% transactional).

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| None | Sporadic | Planned hours | Dedicated transformation / CoE hours |

**Q26. Skills mix**  
Team includes people who can write procedures, read exception data, and challenge AI outputs.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Pure transactional | One power user | Small design-capable cohort | Cohort + training plan |

**Q27. Cross-functional access**  
AP can engage Procurement, IT, and Controllership without months of politics for a pilot.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Siloed | Ad hoc favours | Named contacts | Standing forum / steering |

**Q28. Escalation culture**  
People escalate ambiguity; they are not punished for slowing a payment run for control reasons.

| 0 | 1 | 2 | 3 |
|---|---|---|---|
| Speed over control | Mixed signals | Escalation respected | Escalation celebrated in reviews |

**Block E subtotal: ___ / 15**

---

### F. AI readiness culture (Q29–Q32) — 16 points

**Q29. Executive framing**  
Leadership frames AI as controlled operating change — not “automate everything.”

| 0 | 1 | 2 | 4 |
|---|---|---|---|
| Hype or fear only | Mixed messages | Clear “control first” narrative | Written AI / agent principles for Finance |

*Note: Q29 max = 4 (culture weight).*

**Q30. Experiment hygiene**  
Shadow GenAI / ChatGPT use in AP is known and bounded (or prohibited with alternative).

| 0 | 1 | 2 | 4 |
|---|---|---|---|
| Unknown shadow use | Aware; unmanaged | Policy exists | Policy + approved tooling path |

*Note: Q30 max = 4.*

**Q31. Evidence mindset**  
The organisation refuses to claim AI success without baseline KPIs and retained artefacts.

| 0 | 1 | 2 | 4 |
|---|---|---|---|
| Narrative claims OK | Some scepticism | KPI discipline emerging | Evidence standard written |

*Note: Q31 max = 4.*

**Q32. Autonomy appetite**  
Stakeholders accept a responsibility ladder (observe → recommend → prepare → execute within guardrails) rather than “full autonomy now.”

| 0 | 1 | 2 | 4 |
|---|---|---|---|
| Autonomy-or-bust | Confused | Accepts ladder verbally | Ladder adopted as programme rule |

*Note: Q32 max = 4.*

**Block F subtotal: ___ / 16**

---

### Score summary

| Block | Points | Subscore (0–100) |
|-------|--------|------------------|
| A Process clarity | ___ / 18 | ___ |
| B Data & systems | ___ / 18 | ___ |
| C Controls & governance | ___ / 18 | ___ |
| D Exception load | ___ / 15 | ___ |
| E Talent & operating model | ___ / 15 | ___ |
| F AI readiness culture | ___ / 16 | ___ |
| **TOTAL** | **___ / 100** | — |

---

## 4. Maturity bands

| Band | Score | Meaning | Typical next move |
|------|-------|---------|-------------------|
| **Emerging** | 0–39 | Process, data, or control foundations are too weak for agent pilots beyond read-only observation. | Fix taxonomy, SoD, capture quality, and process ownership before agent charters. |
| **Structured** | 40–59 | Core AP is operable; agents can shadow and recommend in narrow scopes. | Stand up exception codes, baseline KPIs, one L0→L1 pilot agent. |
| **Agent-Ready** | 60–79 | Ready for multi-agent design under governance; controlled pilots with prepare-level ambition on low-risk work. | Full charters, control matrix, shadow→pilot gates, orchestrator discipline. |
| **Operating** | 80–100 | Operating evidence culture in place; expansion is gated by scorecards, not enthusiasm. | Scale agent families; deepen root-cause; keep payment auth human; periodic assurance. |

**Interpretation rules**

- A high total with **C < 50** → treat as one band lower for any write-capable pilot.  
- A high total with **D < 40** → do not expand agents until exceptions are classified.  
- **F < 40** → pause external AI tooling; fix framing and shadow-use policy first.

Bands describe **operating readiness**, not software maturity. They do not certify compliance, security, or accounting accuracy.

---

## 5. Opportunity heatmap — which agent families to prioritise

Map your dimension profile to agent families. Prioritise where pain is high **and** foundations allow control.

### 5.1 Agent families

| Family | Agents | Depends most on |
|--------|--------|-----------------|
| **Intake & validation** | A01 Invoice Intake, A02 Invoice Validation | B (data), A (process) |
| **Match & receipt** | A03 Matching, A05 Goods Receipt, A06 PO Quality | A, B, D |
| **Exception system** | A04 Exception Triage, A15 Root Cause | D, C, E |
| **Resolution & chase** | A08 Supplier Resolution, A09 Internal Follow-Up | D, E, F |
| **Control & anomaly** | A10 Duplicate & Anomaly | C, B |
| **Approval & pay prep** | A07 Approval, A12 Payment Proposal Review | C (mandatory), A |
| **Statement & close** | A11 Vendor Statement Reconciliation, A13 AP Close | B, D, C |
| **Reporting & orchestrate** | A14 AP Reporting, A16 AP Manager / Orchestrator | E, F, all |

### 5.2 Heatmap grid (fill after scoring)

Rate **Need** (1–5) from your exception/KPI pain and **Readiness** (1–5) from relevant subscores.

| Family | Need (1–5) | Readiness (1–5) | Priority score (Need × Readiness) | Suggested first autonomy |
|--------|------------|-----------------|-----------------------------------|--------------------------|
| Intake & validation | | | | L0→L1 |
| Match & receipt | | | | L0→L1 |
| Exception system | | | | L0→L1 (taxonomy first) |
| Resolution & chase | | | | L1 drafts only |
| Control & anomaly | | | | L0→L1 candidates |
| Approval & pay prep | | | | L1; auth always human |
| Statement & close | | | | L0→L1 packs |
| Reporting & orchestrate | | | | L1 after 2+ agents live |

**Rule:** Do not start with Approval & pay prep or write-heavy Matching if **C < 60**. Start with Exception system (classification) and Intake validation shadowing.

### 5.3 Sequencing heuristic

1. **Instrument exceptions** (A04 taxonomy) even before models.  
2. **Shadow intake / validation / duplicate candidates.**  
3. **Chase drafts** (A09 / A08) with human send gates.  
4. **Match assist** where tolerances exist.  
5. **Payment proposal review** as prepare-only — never release.  
6. **Orchestrator** once ≥3 agents produce evidence.

---

## 6. Top-10 agent opportunity overview (brief)

Use this as a prioritisation menu — not a deployment order. Full blueprints live in Starter / Professional.

| # | Agent | Opportunity signal | Typical first value | Hard exclusion |
|---|-------|--------------------|---------------------|----------------|
| 1 | **A04 Exception Triage** | Uncoded backlog; inbox firefighting | Shared language; owned SLAs | Auto-clearing material exceptions without evidence |
| 2 | **A01 Invoice Intake** | Multi-channel chaos | Controlled queue; channel metrics | Silent drop of invoices |
| 3 | **A02 Invoice Validation** | Incomplete invoices cycle endlessly | Completeness gates; tax/ID checks | Inventing missing commercial facts |
| 4 | **A10 Duplicate & Anomaly** | Duplicate near-misses | Investigation packs; holds | Guaranteed fraud/duplicate detection |
| 5 | **A05 Goods Receipt** | GR lag dominates ageing | Chase packs to receivers | Posting GR without evidence policy |
| 6 | **A09 Internal Follow-Up** | Requester silence | Evidence-backed chases | Harassing without SLA / tone rules |
| 7 | **A03 Matching** | Match WIP high | Variance explanations | Force-match beyond tolerance |
| 8 | **A11 Vendor Statement Reconciliation** | Month-end noise | Discrepancy packs | Auto-settling disputes |
| 9 | **A12 Payment Proposal Review** | Proposal prep time | Flag holds / anomalies for humans | Payment authorisation / bank release |
| 10 | **A15 Root Cause** | Same codes every month | Preventable themes to Procurement/Ops | Blaming individuals without evidence |

Agents **A06, A07, A08, A13, A14, A16** remain important; they typically follow once the top pain families above have owners and scorecards.

---

## 7. Baseline KPI worksheet

Record **current** values before any agent pilot. Leave blank if unknown — unknown is itself a finding.

| KPI | Definition (use as written) | Baseline period | Value | Source system / report | Owner |
|-----|----------------------------|-----------------|-------|------------------------|-------|
| Invoice volume | Invoices registered in period | | | | |
| STP / clean rate | % invoices with no exception code | | | | |
| Exception volume | Count of open exceptions EOP | | | | |
| Top 5 exception codes | Codes + % of exception hours | | | | |
| Cycle time (receipt → ready for pay) | Median calendar days | | | | |
| Aged >30 / >60 days (exceptions) | Count and $ | | | | |
| On-time payment rate | % paid by due (policy definition) | | | | |
| Duplicate candidates flagged | Count investigated | | | | |
| Confirmed duplicate preventions / recoveries | Count / $ (actuals only) | | | | |
| Supplier query volume | Inbound chases to AP | | | | |
| Touch time per invoice (sample) | Minutes — sample n≥30 | | | | |
| FTE in AP ops (excl. leadership) | Headcount / FTE | | | | |
| First-pass approval rate | % approved without bounce | | | | |
| Accrual / GRNI noise (qualitative) | High / Med / Low + note | | | | |

**Evidence rule:** For any future “before/after” claim, retain this sheet, extract date, and report ID. Narrative-only improvements are non-evidence.

---

## 8. Business case starter (assumption-labelled)

This section helps you structure a conversation with Finance leadership.  
All numeric scenarios below are **NON-EVIDENCE** — labelled assumptions for local modelling only. They are not market averages, savings guarantees, or ROI promises.

### 8.1 Problem statement (fill)

| Prompt | Your text |
|--------|-----------|
| What breaks today? | |
| Who feels the pain? | |
| What control risk worries Controllership? | |
| What must remain human? | Payment authorisation; vendor bank changes; DOA overrides; … |

### 8.2 Scope hypothesis (fill)

| Field | Value |
|-------|-------|
| Pilot entity / channel | |
| Agent candidates (max 2–3) | |
| Autonomy ceiling for pilot | L0 / L1 / L2 (circle) |
| Out of scope | Payment release; master bank edits; … |

### 8.3 Cost envelope (assumptions — label each)

| Cost element | Assumption (NON-EVIDENCE) | Monthly / one-off | Confidence (L/M/H) |
|--------------|---------------------------|-------------------|--------------------|
| Internal design time | e.g. 0.3 FTE × ___ weeks | | |
| IT / integration | e.g. connector hours | | |
| Tooling / LLM / RPA run | vendor quotes only | | |
| Training / change | workshop hours | | |
| Assurance / audit review | sampling hours | | |
| Evidence Room toolkit (optional) | Starter US$79 / Pro US$199 / Team US$499 | | |

### 8.4 Benefit hypotheses (NON-EVIDENCE — do not present as guaranteed)

Express benefits as **measurement designs**, not promised outcomes:

| Hypothesis | How you will measure | Decision if false |
|------------|----------------------|-------------------|
| Exception ageing for code X declines | Weekly ageing by code | Demote agent / fix process upstream |
| Touch minutes on sample decline | Time study n≥30 | Redesign instructions |
| Duplicate *candidates* investigated faster | Cycle time on A10 packs | Keep L1; do not auto-block broader |
| Supplier chase response improves | SLA on A08/A09 | Tone/policy revise |

**Do not** put a single “$ savings” number on an executive slide unless Controllership accepts the assumptions and measurement method in writing.

### 8.5 Decision ask

| Ask | Yes / No / Deferred |
|-----|---------------------|
| Approve diagnostic band and pilot scope | |
| Approve baseline KPI capture (2–4 weeks) | |
| Approve autonomy ceiling | |
| Approve budget envelope (assumptions attached) | |

---

## 9. Downloadable scorecard table

Copy into spreadsheet or print. Companion file: `ER_AP_AI_Readiness_Scorecard.xlsx` (if packaged).

| Q# | Dimension | Short title | Score (0–3*) | Notes / evidence |
|----|-----------|-------------|--------------|------------------|
| 1 | A | Process map | | |
| 2 | A | Role clarity | | |
| 3 | A | Policy access | | |
| 4 | A | Channel inventory | | |
| 5 | A | STP definition | | |
| 6 | A | Handoffs | | |
| 7 | B | Master data | | |
| 8 | B | Capture quality | | |
| 9 | B | Match data | | |
| 10 | B | Audit trail | | |
| 11 | B | Integration | | |
| 12 | B | Test environment | | |
| 13 | C | SoD | | |
| 14 | C | Duplicate controls | | |
| 15 | C | DOA | | |
| 16 | C | Payment auth | | |
| 17 | C | Bank change | | |
| 18 | C | Automation change control | | |
| 19 | D | Exception taxonomy | | |
| 20 | D | Ageing visibility | | |
| 21 | D | Volume concentration | | |
| 22 | D | Supplier queries | | |
| 23 | D | Preventable split | | |
| 24 | E | Process owner | | |
| 25 | E | Design capacity | | |
| 26 | E | Skills mix | | |
| 27 | E | Cross-functional access | | |
| 28 | E | Escalation culture | | |
| 29 | F | Executive framing | *0–4* | |
| 30 | F | Experiment hygiene | *0–4* | |
| 31 | F | Evidence mindset | *0–4* | |
| 32 | F | Autonomy appetite | *0–4* | |
| | | **TOTAL** | **/100** | Band: |

---

## 10. What to do with your result

| Band | Immediate actions (next 10 working days) |
|------|------------------------------------------|
| Emerging | Name Process Owner; inventory channels; draft 15–20 exception codes; verify payment SoD; stop unmanaged GenAI on live invoices. |
| Structured | Complete baseline KPI sheet; pick one agent for L0 shadow; write exclusions; stand up weekly exception review. |
| Agent-Ready | Charter 2–3 agents; define promotion gates; run shadow→pilot plan; brief Controller on autonomy ceiling. |
| Operating | Expand families under scorecards; introduce A15 root-cause cadence; assure logs; refuse autonomy without evidence. |

---

## 11. Soft CTA — deepen the operating layer

This free diagnostic tells you **whether** you are ready and **where** to start.

To **design** agents with reusable artefacts:

| Product | Price | What you get |
|---------|-------|--------------|
| **AP Agent Starter Kit** | **US$79** | Condensed operating model, top-10 blueprints, exception taxonomy (major codes), templates, 90-day sketch, individual licence |
| **AP Agent OS — Professional** | **US$199** | Full 16-agent library, governance framework, control matrix, KPI system, business-case model, implementation roadmap, shadow/UAT pack |
| **AP Agent OS — Team** | **US$499** | Professional depth + workshop deck, facilitation, training, executive packs, implementation trackers, change toolkit (multi-user workshop licence) |

Evidence Room does not replace your ERP. It gives Finance the operating evidence layer agents require.

---

## 12. Disclaimers

1. **Not professional advice.** This diagnostic is an educational operating toolkit. It is not legal, audit, accounting, tax, or investment advice.  
2. **No guarantees.** Scores, bands, and heatmaps do not guarantee cost savings, fraud detection, regulatory compliance, control effectiveness, or accounting accuracy.  
3. **No autonomous payments.** Nothing in this document authorises or recommends autonomous payment release. Payment authorisation remains a human accountability.  
4. **Local calibration required.** Rubrics are design defaults. Controllership and AP leadership must tune thresholds, materiality, and policy to local risk appetite.  
5. **Non-evidence scenarios.** Any illustrative numbers in the business-case starter are labelled assumptions for modelling — not researched market outcomes.  
6. **IP and confidentiality.** Do not paste confidential invoice, vendor banking, or personal data into public AI tools when completing this diagnostic.  
7. **Version.** Diagnostic v1.0 — align updates with your internal document control if adopted as a controlled form.

---

*Evidence Room — Operating Evidence for AP agents.*  
*Document `ER-FREE-DIAG-001` v1.0*
