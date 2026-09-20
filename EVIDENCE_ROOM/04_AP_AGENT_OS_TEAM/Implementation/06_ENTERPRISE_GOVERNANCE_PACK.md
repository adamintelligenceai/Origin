# Enterprise Governance Pack

**Product:** Evidence Room — AP Agent OS Team  
**Document ID:** `ER-TEAM-GOV`  
**Version:** 1.0  
**Audience:** Controller, Head of AP, Risk, IT Security, Internal Audit  
**Companion:** Professional Governance Framework (depth reference)

---

## 1. Governance purpose

Define enterprise rules under which AP agents may operate inside this organisation. Team pack provides the **operating forms**; Professional framework provides extended policy depth — align both when held.

---

## 2. Policy statements (adopt / adapt)

### P1 — Human accountability
Every material agent output affecting money, vendors, postings, or control decisions has a named human owner. Agents do not hold fiduciary responsibility.

### P2 — Earned responsibility
Agents operate on L0–L4. Default for new agents is L0 or L1. L3+ requires Controller approval. L4 requires CFO (or designate) + Controller.

### P3 — Payment authorisation
No agent may approve, release, or transmit payments or bank files. Payment Proposal Review prepares and flags only.

### P4 — Sensitive master data
Vendor banking / remit-to changes require enhanced human verification. Agents may flag; humans approve.

### P5 — Evidence
Material recommendations/actions retain: inputs, rule/confidence, exception code, human decision, timestamp, operator ID.

### P6 — Fail closed
Low confidence, policy conflict, or ambiguous financial create → human review. No silent pass.

### P7 — Claims
External or Board materials must not claim guaranteed savings, fraud detection rates, compliance certification, or autonomous payment safety from agent programmes alone.

---

## 3. Roles

| Role | Duties |
|------|--------|
| Executive sponsor | Appetite, ceiling, residual risk |
| AP Process Owner | Design, taxonomy, charters |
| Agent Owner | Day-to-day performance, escalations |
| Control Owner | Specific control effectiveness |
| Platform / Model Owner | Access, versions, secrets, environments |
| Kill-switch owner | Authority to pause agents |
| Internal Audit | Independent assurance |

---

## 4. Autonomy registry (mandatory fields)

| Field | Description |
|-------|-------------|
| Agent ID / name | |
| Scope (entity×channel×category) | |
| Current level | L0–L4 |
| Ceiling | |
| Owner / backup | |
| Last promotion evidence pack link | |
| Last review date | |
| Open incidents | |
| Status | Active / Paused / Retired |

---

## 5. Promotion / demotion

Use Professional gate table as default. Team minimum:

| Move | Approvers | Evidence |
|------|-----------|----------|
| → L1 | Process Owner + Agent Owner | Shadow sample; logging on |
| → L2 | + Controls | Accept rate; zero critical; SOP updated |
| → L3 | + Controller | Extended run; QA; residual risk accepted |
| → L4 | + CFO designate | Rare; assurance plan |
| Demote / pause | Kill-switch owner (immediate); steering notes | Any critical control miss; quality collapse |

---

## 6. Segregation of duties (agent-aware)

| Rule | Implementation check |
|------|----------------------|
| Prepare ≠ approve payment | A12 cannot release |
| Vendor master change ≠ payment propose approve | Split humans |
| Instruction change ≠ sole production operator | Change control |
| Log admin ≠ AP agent owner | IT owns log integrity |

---

## 7. Change control for instructions / prompts / workflows

| Change type | Reviewers | Test | Rollback |
|-------------|-----------|------|----------|
| Minor tone | Agent Owner | Sample n= | Prior version pin |
| Decision logic | Owner + Process Owner + Controls | Shadow compare | Demote |
| Scope expansion | Steering | Gate pack | Pause |
| Model/vendor swap | IT + Controls + Owner | Re-certify L0 | Freeze writes |

---

## 8. Incident classes

| Class | Examples | Response |
|-------|----------|----------|
| Critical | Payment boundary breach attempt; suppressed log; wrongful bank change assist without verify | Immediate pause; Controller notify |
| High | False clear of likely duplicate; DOA misroute causing policy break | Pause agent; root cause |
| Medium | Chronic miscodes; tone failures | Instruction fix; coaching |
| Low | Cosmetic output issues | Backlog |

---

## 9. Assurance calendar

| Activity | Cadence | Owner |
|----------|---------|-------|
| Autonomy registry review | Monthly | Process Owner |
| Control sample re-performance | Monthly in pilot | Controls |
| Access recertification | Quarterly | IT |
| Policy attestation | Semi-annual | Sponsor |
| Internal Audit briefing | Per Audit plan | Process Owner |

---

## 10. Adoption checklist (enterprise)

- [ ] Policies P1–P7 endorsed  
- [ ] Roles named  
- [ ] Registry live  
- [ ] Kill-switch tested (tabletop)  
- [ ] Payment boundary walkthrough documented  
- [ ] Logging retention aligned to finance policy  
- [ ] Public-AI / data handling rule published  
- [ ] Steering ToR approved  

---

## 11. Document control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | | | Initial Team pack |

---

*End `ER-TEAM-GOV` v1.0*
