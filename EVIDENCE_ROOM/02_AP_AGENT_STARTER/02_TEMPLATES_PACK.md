# AP Agent Starter — Templates Pack

**Product:** Evidence Room — AP Agent Starter Kit  
**Document ID:** `ER-START-TMPL-001`  
**Version:** 1.0  
**Companion:** `01_STARTER_KIT_GUIDE.md`  
**Licence:** Individual (same as Starter Guide)

Blank reusable forms. Print or copy to your workspace. Do not paste live banking details into public AI tools when filling.

---

## Template 1 — Scope one-pager

| Field | Entry |
|-------|-------|
| Programme name | |
| Organisation / entity | |
| Channel(s) | |
| Category / vendor segment | |
| Invoice volume in scope (approx.) | |
| Problem statement (3 lines) | |
| In scope | |
| Out of scope | |
| Autonomy ceiling | L0 / L1 / L2 |
| Hard exclusions | Payment release · Vendor bank approve · DOA invent · Other: |
| Success signals (measurement designs) | |
| Non-goals (explicit) | |
| Sponsor | |
| AP Process Owner | |
| Target shadow start date | |
| Review date | |

**Sign-off:** Sponsor _______ Date _______ · Process Owner _______ Date _______

---

## Template 2 — Process map worksheet

**Slice name:** _______________________________  
**Mapper:** _____________ **Date:** _____________

| Step # | Activity | Actor today (role) | System | Artefact in | Artefact out | Failure modes → code | Agent candidate (ID) | Control point? (Y/N) |
|--------|----------|--------------------|--------|-------------|--------------|----------------------|----------------------|----------------------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |
| 4 | | | | | | | | |
| 5 | | | | | | | | |
| 6 | | | | | | | | |
| 7 | | | | | | | | |
| 8 | | | | | | | | |
| 9 | | | | | | | | |
| 10 | | | | | | | | |
| 11 | Payment proposal prep | | | | | | A12 | Y |
| 12 | Payment authorisation | Human only | | | | | **NONE** | Y |

**Notes / swimlane sketch:**  
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

---

## Template 3 — Human-vs-agent decision log

| Task class | Frequency | Evidence checkable? | Failure recoverable? | SoD OK if agent prepares? | Decision (H / A-assist / A-bounded / Out) | Rationale | Review date |
|------------|-----------|---------------------|----------------------|---------------------------|--------------------------------------------|-----------|-------------|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

---

## Template 4 — Agent job description

| Field | Entry |
|-------|-------|
| Agent ID / name | |
| Version | |
| Status | Draft / Approved / Retired |
| Human owner | |
| Backup owner | |
| Executive sponsor awareness | Y/N |
| Purpose (2–3 sentences) | |
| Scope — in | |
| Scope — out | |
| Primary responsibilities | 1. 2. 3. |
| Exclusions (hard) | |
| Systems / tools | |
| Data objects consumed | |
| Outputs / artefacts | |
| Autonomy level (current) | L0 / L1 / L2 / L3 / L4 |
| Autonomy ceiling (approved) | |
| Escalation path | |
| RACI — Responsible | |
| RACI — Accountable | |
| RACI — Consulted | |
| RACI — Informed | |
| KPIs | |
| Review cadence | Weekly / Fortnightly / Monthly |
| Related exception codes | |
| Upstream agents | |
| Downstream agents | |
| Approval — Process Owner | Name / date |
| Approval — Controls (if ≥L2) | Name / date |

---

## Template 5 — Agent instruction set

**Agent:** _____________ **Version:** _____________ **Owner:** _____________

### 1. Objective
_

### 2. Allowed tools / systems
_

### 3. Input contract (required)
| Field | Required | Validation |
|-------|----------|------------|
| | Y/N | |
| | Y/N | |
| | Y/N | |

### 4. Decision procedure (ordered)
1.  
2.  
3.  
4.  
5.  

### 5. Output schema
| Field | Type | Notes |
|-------|------|-------|
| disposition | | |
| exception_code | | |
| confidence | | |
| rationale | | |
| evidence_refs | | |
| recommended_next | | |

### 6. Abstain / escalate when
-  
-  
-  

### 7. Prohibitions (hard)
- Must not authorise or release payment  
- Must not approve vendor banking changes  
- Must not invent DOA  
- Must not  
- Must not  

### 8. Tone / communication rules (if any)
_

### 9. Logging requirements
Timestamp · inputs used · rule IDs · confidence · human decision · operator ID

### 10. Change control
Edits require: Owner _______ · Reviewer _______ · Date _______ · Ticket _______

---

## Template 6 — Exception ownership matrix

| Code | Primary owner role | Backup | Default SLA (hours) | Resolver agent | Escalate to | Materiality note |
|------|--------------------|--------|---------------------|----------------|-------------|------------------|
| missing_po | | | | | | |
| invalid_po | | | | | | |
| po_closed | | | | | | |
| po_exhausted | | | | | | |
| price_mismatch | | | | | | |
| quantity_mismatch | | | | | | |
| missing_receipt | | | | | | |
| partial_receipt | | | | | | |
| duplicate_invoice | | | | | | |
| potential_duplicate | | | | | | |
| wrong_supplier | | | | | | |
| incorrect_legal_entity | | | | | | |
| tax_issue | | | | | | |
| approval_missing | | | | | | |
| doa_issue | | | | | | |
| coding_missing | | | | | | |
| invalid_cost_centre | | | | | | |
| invoice_quality | | | | | | |
| ocr_extraction_issue | | | | | | |
| master_data_issue | | | | | | |
| banking_change_concern | | | | | | |
| credit_note_required | | | | | | |
| statement_discrepancy | | | | | | |
| payment_hold | | | | | | |
| disputed_invoice | | | | | | |
| aged_unresolved_item | | | | | | |
| system_interface_error | | | | | | |

---

## Template 7 — Exception triage log (daily)

| Date | Invoice / case ID | Vendor | Amount | Primary code | Owner | Due | Status | Agent assist? | Notes |
|------|-------------------|--------|--------|--------------|-------|-----|--------|---------------|-------|
| | | | | | | | | | |
| | | | | | | | | | |
| | | | | | | | | | |
| | | | | | | | | | |
| | | | | | | | | | |

---

## Template 8 — Shadow / pilot log

| Date | Agent | Case ID | Agent output summary | Expert action | Agree? (Y/N/Partial) | Error type (if N) | Control impact (None/Near/Hit) | Operator |
|------|-------|---------|----------------------|---------------|----------------------|-------------------|--------------------------------|----------|
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |

**Weekly summary:** Volume ___ · Agree % ___ · Critical hits ___ · Decision: continue / pause / demote

---

## Template 9 — KPI scorecard (weekly)

**Agent / slice:** _____________ **Week commencing:** _____________

| KPI | Baseline | This week | Δ | Comment |
|-----|----------|-----------|---|---------|
| Cases touched | | | | |
| % exceptions coded <24h | | | | |
| Median cycle time (days) | | | | |
| Recommendation accept % | | | | |
| Critical control incidents | | | | |
| Silent drop / unlogged | | | | |
| QA sample n / pass % | | | | |
| Operator trust (1–5) | | | | |

**Actions:**  
1.  
2.  

**Owner sign:** _____________ **Date:** _____________

---

## Template 10 — Governance checklist (sign-off)

| # | Item | Owner | Date | Initials |
|---|------|-------|------|----------|
| 1 | Sponsor named | | | |
| 2 | Process Owner named | | | |
| 3 | Agent Owner(s) named | | | |
| 4 | Autonomy ceiling set | | | |
| 5 | Payment auth human confirmed | | | |
| 6 | Bank-change approve excluded | | | |
| 7 | Taxonomy adopted for slice | | | |
| 8 | SoD reviewed | | | |
| 9 | Logging path defined | | | |
| 10 | Shadow + QA plan set | | | |
| 11 | Kill-switch owner named | | | |
| 12 | Instruction change control | | | |
| 13 | Public-AI data ban briefed | | | |
| 14 | Internal Audit informed | | | |
| 15 | Rollback plan documented | | | |

---

## Template 11 — 90-day roadmap board

| Phase | Window | Workstream | Owner | Status (Not started / On track / Blocked / Done) | Exit criteria met? |
|-------|--------|------------|-------|--------------------------------------------------|--------------------|
| 0 Foundation | D1–15 | | | | |
| 0 Foundation | D1–15 | | | | |
| 1 Design | D16–35 | | | | |
| 1 Design | D16–35 | | | | |
| 2 Shadow | D36–60 | | | | |
| 2 Shadow | D36–60 | | | | |
| 3 Pilot | D61–75 | | | | |
| 4 Decide | D76–90 | | | | |

**Blockers:**  
_

**Steering decision (Day 90):** Hold / Expand / Upgrade toolkit / Stop

---

## Template 12 — Steering note (one page)

| Field | Entry |
|-------|-------|
| Date | |
| Audience | |
| Pilot slice | |
| Agents | |
| Autonomy level | |
| Volume & agree rate | |
| Control incidents | |
| KPI movement (factual) | |
| What we will not claim | Guaranteed savings / fraud detection / compliance / autonomous pay |
| Ask | |
| Decision | |
| Next review | |

---

## Template 13 — Incident / near-miss

| Field | Entry |
|-------|-------|
| ID | |
| Date/time | |
| Agent | |
| Case | |
| Severity | Critical / High / Medium / Low |
| Description | |
| Control impacted | |
| Payment impacted? | Y/N |
| Immediate action | |
| Root cause (initial) | |
| Demotion / pause? | Y/N |
| Owner | |
| Closed date | |

---

## Template 14 — Baseline KPI capture

| KPI | Definition used | Period | Value | Source | Owner | Known gap? |
|-----|-----------------|--------|-------|--------|-------|------------|
| Invoice volume | | | | | | |
| STP / clean % | | | | | | |
| Open exceptions count/$ | | | | | | |
| Top code #1 | | | | | | |
| Cycle time median | | | | | | |
| >30 day exceptions | | | | | | |
| On-time payment % | | | | | | |
| Supplier queries | | | | | | |
| AP ops FTE | | | | | | |
| Duplicate candidates | | | | | | |

---

## Template 15 — Upgrade decision

| Question | Y/N | Note |
|----------|-----|------|
| Need full 16-agent library & governance framework? | | → Professional |
| Need workshop / multi-user / exec packs? | | → Team |
| Need facilitated custom blueprint? | | → Custom service |
| Stay on Starter another quarter? | | |

---

*Evidence Room — Operating Evidence.*  
*`ER-START-TMPL-001` v1.0*
