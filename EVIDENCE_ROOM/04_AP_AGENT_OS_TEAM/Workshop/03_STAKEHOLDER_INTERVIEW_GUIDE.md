# Stakeholder Interview Guide — AP Agent OS Team

**Evidence Room** · Team · Workshop pre-work  
**Interview length:** 30–45 minutes  
**Output:** 1–2 page synthesis for the facilitator (not a transcript dump)

## Purpose

Surface goals, constraints, fear, and hidden process debt **before** the workshop so the room debates decisions — not basic facts.

## Interview set (minimum)

| Stakeholder | Must interview? | Focus |
|---|---|---|
| CFO / VP Finance / Controller | Yes (or written brief) | Risk appetite, board narrative |
| AP Director / Manager | Yes | Volume, exceptions, owners |
| Senior processor / exception lead | Yes | Reality of workarounds |
| Internal Audit or Controls | Yes | Evidence, SoD, prior findings |
| IT application owner (ERP/AP) | Yes | Integration & access constraints |
| Security / IAM | Preferred | Tooling approval path |
| Procurement lead | Preferred | PO quality upstream |
| Shared Services lead | If multi-entity | Standardisation vs local exceptions |
| Treasury / Payments | If payment-adjacent agents discussed | Dual control expectations |

## Opening script (2 minutes)

> We are designing a **governed agent layer** for AP — not selecting OCR and not promising savings. Evidence Room’s principle is *agents that earn responsibility*. I will ask about your process, controls, and what “good evidence” means here. Nothing today authorises an agent to release payment.

## Claims reminder for interviewer

Do not cite client results you do not have. If you mention Ardent 2025, frame as industry context only: cost **$9.84** / invoice; exception **18.4%**; STP **35.4%**.

---

## Question bank by stakeholder

### A. Sponsor (CFO / Controller)

1. What would make this programme a success in 6–12 months — in **operational** terms, not headline ROI?  
2. What must never be automated without dual control?  
3. Who may approve agent **stage promotions**?  
4. What board/audit questions do you already anticipate?  
5. What prior AI or RPA efforts failed — and why?  
6. Risk appetite: Observe-only acceptable as a first win?  
7. How should we treat illustrative business-case models internally?  

**Listen for:** political constraints; unspoken “no failures on my watch”; appetite for demotion culture.

### B. AP Director / Manager

1. Monthly invoice volume by channel (PO / non-PO / utility / T&E-adjacent if any).  
2. Top 5 exception types by volume and by pain.  
3. Where do SLAs break today?  
4. Which roles own coding, match, approval, supplier chase?  
5. What workarounds exist that policy does not admit?  
6. Which invoice class is cleanest for a pilot?  
7. Who has calendar time to own a pilot (named person)?  
8. What does “straight-through” mean **here** (definition matters)?  

**Listen for:** tribal knowledge; hero processors; vendor master distrust.

### C. Processor / exception specialist

1. Walk me through yesterday’s hardest invoice.  
2. Which tools do you actually use vs official SOP?  
3. When do you bypass a workflow — and why?  
4. What information is missing when exceptions arrive?  
5. What would an agent do that would *create* more work?  
6. How do you want confirm/reject UX to feel?  

**Listen for:** shame around workarounds; training debt; ambiguous policies.

### D. Internal Audit / Controls

1. Recent AP-related findings or themes (high level).  
2. Evidence standards you would accept for agent decisions.  
3. SoD conflicts you will not tolerate.  
4. View on agent-generated supplier emails.  
5. Sampling expectations for Bounded execute.  
6. Language you want in charters (demotion, kill-switch).  

**Listen for:** non-negotiables; documentation formats auditors already use.

### E. IT / Security

1. Systems of record for invoice, PO, GR, payment proposal.  
2. What write-backs are technically possible vs politically allowed?  
3. Identity model for “agent” service accounts.  
4. Logging / retention constraints.  
5. AI tool approval status (Copilot, vendor AI, LLM APIs).  
6. Change-management windows and environments (dev/test/prod).  

**Listen for:** shadow IT; data residency; brittle integrations.

### F. Procurement

1. PO hygiene issues that cascade into AP exceptions.  
2. Willingness to accept PO Quality agent tickets.  
3. Supplier onboarding friction affecting invoice data.  

### G. Treasury / Payments

1. Who releases payments today (systems + humans)?  
2. Confirmation: agents must not release funds — agreed?  
3. Payment proposal review — human expectations.

---

## Scoring synthesis (facilitator worksheet)

After interviews, rate each theme 1–5:

| Theme | Score | Notes |
|---|---|---|
| Process clarity | | |
| Data / master quality | | |
| Control readiness | | |
| Tooling readiness | | |
| Sponsorship clarity | | |
| Capacity for pilot ownership | | |
| Change receptivity | | |

**Pilot posture suggestion**

| Pattern | Suggested stage ceiling |
|---|---|
| Weak controls or capacity | Observe only |
| Strong process, weak tooling | Recommend / Draft |
| Strong across board | Narrow Recommend → shadow toward Execute later |

---

## Contradiction log

| Topic | Stakeholder A said | Stakeholder B said | Workshop handling |
|---|---|---|---|
| | | | Surface explicitly |
| | | | |
| | | | |

## Output template (1–2 pages)

```markdown
# Interview synthesis — [Client] — [Date]

## Mandate (sponsor)
## Non-negotiables (controls / treasury)
## Volume & exception reality (AP)
## Tooling constraints (IT)
## Contradictions
## Recommended pilot class
## Recommended stage ceiling
## Named owner candidates
## Open questions for workshop
```

## Anti-patterns

- Interviewing only managers  
- Treating “we want ROI” as a requirements statement without baseline  
- Promising Custom Blueprint scope inside a Team workshop  
- Recording confidential findings into shared packs without redaction  

---

*Evidence Room — Agents that earn responsibility.*
