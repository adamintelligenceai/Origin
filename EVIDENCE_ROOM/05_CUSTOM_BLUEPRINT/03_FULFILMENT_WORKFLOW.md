# Blueprint Fulfilment Workflow

**Product:** Evidence Room — Custom Blueprint  
**Document ID:** `ER-BP-FUL-001`  
**Version:** 1.0  
**Purpose:** Repeatable, AI-assisted delivery runbook for producers  
**Quality bar:** Client could run a pilot design meeting the day after readout

---

## 1. Workflow overview

```
Lead → Intake QA → Band quote → Kickoff → Discover → Structure (AI-assist)
  → Draft blueprint → Internal QA → Client review → Finalise → Readout → Close
```

Each stage has entry criteria, tasks, AI usage rules, and exit criteria.

---

## 2. Stage gates

| Stage | Entry | Exit artefact |
|-------|-------|---------------|
| 0 Intake QA | Questionnaire returned | Fit pass / reject / clarify list |
| 1 Quote | Fit pass | Confirmed band + SOW one-pager |
| 2 Kickoff | Payment / PO per commercial terms | Kickoff notes; calendar |
| 3 Discover | Data room started | Interview notes; synthesis |
| 4 Structure | Synthesis approved internally | Object model; pain→agent map |
| 5 Draft | Structure complete | Full draft pack |
| 6 Internal QA | Draft | QA checklist green |
| 7 Client review | Draft shared | Comment log |
| 8 Final | Comments dispositioned | Final pack v1.0 |
| 9 Readout | Final issued | Decision log |
| 10 Close | Readout done | Archive + lessons |

---

## 3. Detailed procedures

### Stage 0 — Intake QA (Day 0–1)

**Human tasks**
- Score fit (payment boundary acceptance mandatory)  
- Flag missing critical fields  
- Identify band: Focused / Standard / Extended  

**AI assist (allowed)**
- Summarise questionnaire into structured JSON-like brief  
- List clarifying questions  

**AI prohibit**
- Invent volumes or control ratings not in intake  
- Draft savings guarantees  

**Exit:** Fit memo + clarifications sent if needed.

### Stage 1 — Quote confirm

- Send brochure band + inclusions/exclusions  
- Confirm remote vs exceptions  
- Commercial: invoice, licence (internal use)  

### Stage 2 — Kickoff (60 min)

Agenda: outcomes, non-claims, ceiling hypothesis, interview plan, data room hygiene, timeline.

Record: autonomy ceiling hypothesis; hard nos; success definition.

### Stage 3 — Discover (Week 1)

**Human**
- 4–6 interviews (use Team interview guide adapted)  
- Review data room; note gaps as findings  

**AI assist**
- Transcribe/summarise interviews (client-approved tooling only; no public paste of sensitive raw invoices)  
- Cluster pains to diagnostic dimensions  
- Extract candidate exception themes  

**Exit:** Synthesis one-pager (consensus pains, disputes, veto map, slice recommendation).

### Stage 4 — Structure

**Human**
- Lock pilot slice  
- Map top exception codes to owners  
- Select ≤N agents per band  

**AI assist**
- Generate first-pass process swimlane from notes  
- Propose charter skeletons from Evidence Room library  
- Diff vs Pro taxonomy for local rename risks  

**Exit:** Structure board (slice, codes, agents, ceiling).

### Stage 5 — Draft blueprint

Produce deliverables per `04_DELIVERABLE_OUTLINE.md`.

**AI assist**
- Expand charters from skeletons with local nouns (ERP names, team titles)  
- Draft KPI baseline sheet from provided extracts  
- Draft 90-day plan  

**Human must rewrite/approve**
- Payment boundary language  
- Banking-change path  
- Any risk acceptance wording  
- All NON-EVIDENCE labels on numbers  

### Stage 6 — Internal QA checklist

- [ ] No autonomous payment recommendations  
- [ ] No guaranteed savings/fraud/compliance claims  
- [ ] Ceiling consistent across docs  
- [ ] Every pilot agent has owner + exclusions  
- [ ] Taxonomy codes match ownership matrix  
- [ ] KPIs have sources or “Unknown — finding”  
- [ ] Brand voice: executive, precise  
- [ ] Client-confidential data masked in examples  
- [ ] Cross-links resolve  
- [ ] Band scope not silently exceeded (or change order noted)  

### Stage 7 — Client review

- Share draft; 3–5 day comment window (Standard/Extended)  
- Working session 60–90 min with Process Owner  

### Stage 8 — Finalise

- Disposition log (accept / reject with reason)  
- Version stamp v1.0  
- Package zip/PDF per commercial  

### Stage 9 — Executive readout (60–90 min)

Agenda mirror Team close: principles, slice, agents, controls, plan, decisions, non-claims.

Capture decision log live.

### Stage 10 — Close

- Request testimonials only if factual and non-hype  
- Archive intake, notes, drafts, finals  
- Lessons learned (internal): AI prompts that drifted; control pushbacks  
- Upsell path (non-pushy): Team workshop facilitation if not owned; nothing that violates licence  

---

## 4. AI operating rules (producer)

| Rule | Detail |
|------|--------|
| Least data | Prefer aggregates and masked samples |
| No public tools for live PII/bank data | Use approved environments |
| Library-first | Ground in Evidence Room Pro/Starter artefacts |
| Label assumptions | Any invented illustrative figure = NON-EVIDENCE |
| Human sign-off | Controls sections never AI-only |
| Prompt hygiene | Store prompts/version with draft; change-control mental model |

---

## 5. RACI (delivery team)

| Activity | Lead designer | QA reviewer | Commercial | Client Process Owner |
|----------|---------------|-------------|------------|----------------------|
| Intake QA | R | C | A | C |
| Interviews | R | I | I | A (scheduling) |
| Draft | R | C | I | C |
| QA | C | A/R | I | I |
| Readout | R | I | I | A (decisions) |

---

## 6. Timing SLAs (internal targets)

| Band | Kickoff→readout target |
|------|------------------------|
| Focused | 10–12 business days |
| Standard | 15–18 business days |
| Extended | 18–25 business days |

Client delays in intake/data room pause the clock.

---

## 7. Change control

Out-of-band requests (extra entities, vendor RFPs, savings models for Board) → written change order or defer. Do not silently expand inside fixed fee.

---

## 8. Incident / quality failure

If a draft is found to contain banned claims or payment autonomy drift: stop delivery, correct, root-cause prompt/process, notify internal QA lead before client send.

---

*End `ER-BP-FUL-001` v1.0*
