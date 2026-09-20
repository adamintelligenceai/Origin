# Stakeholder Interview Guide

**Product:** Evidence Room — Team Workshop prep  
**Version:** 1.0.0 · **Date:** 2026-03-20  
**Duration per interview:** 30–45 minutes  
**Interviewers:** Facilitator + optional scribe

---

## 1. Purpose

Surface pains, control constraints, system truths, and political realities **before** the workshop so room time is spent deciding, not discovering basics.

---

## 2. Sample plan

| Persona | Count | Focus |
|---|---|---|
| Controller / Head of AP | 1 | Authority, risk appetite, sponsorship |
| AP Operations lead | 1 | Throughput, backlog, staffing |
| Senior AP analyst | 2 | Exception reality, rework |
| Approver (business) | 1 | Packet quality, cycle friction |
| Internal Audit / SOX | 1 | Evidence, SoD, change control |
| IT / ERP owner | 1 | Integration, identity, logging |
| Procurement (optional) | 1 | PO quality upstream |

---

## 3. Opening script (2 min)

> We are designing a governed AI **agent layer** across the AP stack you already own. This is not a vendor replacement interview. We will not ask you to promise savings. We want precision about exceptions, evidence, and what must remain human.

Confirm confidentiality level and note-taking.

---

## 4. Core questions

### Context
1. What does “good AP” mean here in one sentence?  
2. Which systems are sources of truth for invoice status?  
3. Where do you feel the most executive pressure right now?

### Process and exceptions
4. Walk me through a typical exception — from detection to close.  
5. What percentage of invoices need human intervention beyond the happy path? (Estimate OK.)  
6. Which exception types consume disproportionate time?  
7. Where do handoffs fail between AP, Procurement, and Approvers?

### Controls and audit
8. What would Internal Audit criticise if they sampled AI-assisted decisions in six months?  
9. Where is SoD most fragile today?  
10. How hard is artefact retrieval for a random invoice from last quarter?

### Data and technology
11. What data quality issues would break an assistive agent immediately?  
12. What integrations are reliable vs brittle?  
13. Are non-human identities / service accounts feasible under current IAM?

### People and change
14. Who will feel threatened by agents — and what would a respectful narrative say?  
15. What training has already failed in this organisation?  
16. Who must be in the room for a promotion decision on agent responsibility?

### Boundaries
17. What must AI **never** do in AP here?  
18. Is payment execution clearly human- or platform-owned?  
19. What prior automation created silent errors you still remember?

### Close
20. If we only fix one thing in 90 days, what should it be?  
21. Who else should we interview that is not on this list?

---

## 5. Optional probes (use sparingly)

- “What would have to be true for you to trust an agent with Assist-mode packet assembly?”  
- “Where do suppliers escalate, and what status answers are unsafe to guess?”  
- Industry climate (if useful): Ardent 2025 peers at **18.4%** exceptions and **35.4%** STP — does that feel high, low, or irrelevant vs your reality?

---

## 6. Capture template

| Field | Notes |
|---|---|
| Interviewee / role / date | |
| Systems of record named | |
| Top 3 pains | |
| Top 3 control worries | |
| Explicit non-goals | |
| Candidate agent ideas | |
| Political sensitivities | |
| Quotes (with permission) | |
| Follow-ups | |

---

## 7. Synthesis for workshop slide

Produce one slide: **Interview themes** — 5 bullets max, plus a red box of **non-negotiable boundaries** (always include payment boundary if stated).

---

*Evidence Room — evidenceroom.ai*
