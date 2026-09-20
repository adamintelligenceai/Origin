# AP Team Training Curriculum

**Product:** Evidence Room — AP Agent OS Team  
**Document ID:** `ER-TEAM-TRN`  
**Version:** 1.0  
**Audience:** AP processors, team leads, exception desk, new joiners post-workshop  
**Delivery:** 3 modules × 90 minutes (or 1-day combined)  
**Prerequisite:** Workshop decisions locked (ceiling, slice, taxonomy draft)

---

## 1. Learning objectives

By the end of training, participants can:

1. Explain Operating Evidence in plain language  
2. Apply the responsibility ladder (L0–L1 focus)  
3. Code exceptions using the adopted taxonomy  
4. Work with agent recommendations without over-trust or reflexive rejection  
5. Escalate correctly — including payment and banking hard stops  
6. Complete shadow logs and QA samples  
7. Describe what will **never** be automated in payment authorisation  

---

## 2. Module A — Operating model literacy (90 min)

### Agenda
| Time | Topic |
|------|-------|
| 0–10 | Why we’re doing this (sponsor video or quote) |
| 10–25 | What Evidence Room is / is not |
| 25–45 | L0–L4 ladder + hard stops |
| 45–65 | Invoice flow with agents (happy path + exception path) |
| 65–80 | Myths busting (fraud guarantees, autonomous pay, job panic) |
| 80–90 | Q&A |

### Teaching points
- Agents earn scope; humans keep accountability  
- A12 prepares; humans authorise  
- Exclusions are features, not bureaucracy  

### Activity
Pairs: rewrite three hype statements into operating statements.

### Exit check
3-question quiz (pass ≥2/3): ladder level meanings; payment boundary; one hard stop.

---

## 3. Module B — Exception taxonomy & triage (90 min)

### Agenda
| Time | Topic |
|------|-------|
| 0–15 | Why codes beat free text |
| 15–40 | Walk major codes with local examples |
| 40–60 | Ownership matrix & SLAs |
| 60–80 | Practice lab: code 8 sample cases |
| 80–90 | Common miscodes & dual-code rules |

### Practice pack (facilitator prepares locally)
Provide 8 anonymised cases. Participants assign primary code + owner + next action.

### Rubric
| Criterion | Pass |
|-----------|------|
| Primary code correct or acceptable alternate | Y |
| Owner role correct | Y |
| Does not clear material risk without evidence | Y |

### Exit check
Blind code 3 new cases.

---

## 4. Module C — Working with agents day-to-day (90 min)

### Agenda
| Time | Topic |
|------|-------|
| 0–15 | Reading an agent output (schema) |
| 15–35 | Accept / amend / reject etiquette |
| 35–50 | Shadow log & QA sampling |
| 50–70 | Simulation: A04 + A09 + A10 packs |
| 70–85 | Incident / near-miss reporting |
| 85–90 | Where to get help |

### Skills
- Never paste sensitive data into public AI  
- Override with reason codes  
- When to stop and call Controls (`potential_duplicate`, `banking_change_concern`)  

### Simulation script
1. Agent proposes `missing_receipt` + chase draft — trainee edits tone and recipient  
2. Agent flags `potential_duplicate` — trainee must **not** clear without pack review  
3. Agent suggests including invoice on payment proposal while hold active — trainee rejects  

### Exit check
Demonstrate one accept-with-edit and one reject-with-escalation on sample packs.

---

## 5. Role-specific add-ons (30–45 min each)

### Team leads
- Coaching overrides; watching accept-rate collapse  
- Weekly scorecard ritual  
- Demotion advocacy without blame culture  

### Payments prep staff
- A12 boundary drill  
- Hold integrity  
- Ambiguous outcome: do not blind retry  

### Master data stewards
- Agent may flag; human approves bank changes  
- Evidence for enhanced verification  

---

## 6. Training operations

| Element | Standard |
|---------|----------|
| Cohort size | 8–16 |
| Trainer | Process Owner + Controls partner |
| Materials | Taxonomy card, hard stops card, sample packs |
| Assessment | Module quizzes + simulation sign-off |
| Record | Attendance + assessment in HR/LMS or AP training log |
| Refresh | 90 days after go-live of first agent; on taxonomy version change |

---

## 7. Job aid — “On the desk” card

**Front**
- Code the exception before you chase  
- Read agent rationale + evidence  
- Accept / amend / reject with reason  
- Payment auth is human  

**Back — Stop and escalate**
- Banking change signals  
- Confirmed or high-score duplicates  
- DOA conflicts  
- Agent confidence low / conflicting evidence  
- Anything that feels like payment pressure overriding control  

---

## 8. Evaluation form (trainee)

| Question | 1–5 |
|----------|-----|
| I understand the payment boundary | |
| I can apply the taxonomy | |
| I know when to reject agent output | |
| I know how to log shadow/QA | |
| Training was specific to our process | |

Free text: remaining fears / gaps.

---

## 9. Disclaimers for trainers

Do not promise headcount outcomes, fraud elimination, or compliance certification. Frame training as control-competent adoption.

---

*End `ER-TEAM-TRN` v1.0*
