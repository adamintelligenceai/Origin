# Shadow Mode and Pilot Testing

**Evidence Room · AP Agent OS Professional**

---

## 1. Purpose

Prove agent quality **before** expanding responsibility. Shadow and pilot are mandatory gates between charter approval and production write access.

---

## 2. Modes defined

| Mode | Agent behaviour | ERP writes | Human role |
|------|-----------------|------------|------------|
| **Shadow** | Runs on live or replayed cases; outputs logged only | None | Continues full process; scores agent vs truth |
| **Pilot** | Limited scope; Level 1–2 per charter | Bounded, reversible where possible | Approves material actions; UAT owners active |
| **Production** | Per promoted level | Per charter | Sampling + exceptions |

Payment authorisation stays human in all modes.

---

## 3. Shadow protocol

### 3.1 Setup

1. Freeze prompt/model version.  
2. Define eligible population (invoice class, BU, channel).  
3. Define “truth” source (human final coding/match/decision).  
4. Build scoring sheet (see below).  
5. Run minimum sample: **≥200 cases** or **2 weeks** of volume, whichever larger for the class — document if volume is too low.

### 3.2 Scoring dimensions

| Dimension | Definition | Threshold example (tune locally) |
|-----------|------------|----------------------------------|
| Precision (suggestions) | Correct among agent positives | ≥0.90 before Level 1 assist on low-risk tasks |
| Recall (critical) | Caught among true critical issues (e.g. duplicates) | Set by risk appetite; often stricter |
| Field accuracy | Exact match on required fields | Per field SLA |
| Policy fidelity | Correct rule applied | ≥0.95 |
| Latency | Time to produce output | Within operational window |
| Safety | No disallowed action attempted | 100% |

### 3.3 Shadow scorecard row

| Case | Truth | Agent | Match Y/N | Error type | Severity | Notes |
|------|-------|-------|-----------|------------|----------|-------|

Error types: false positive · false negative · wrong field · wrong routing · unsafe suggestion · timeout.

### 3.4 Exit criteria (shadow → pilot)

- [ ] Thresholds met for two consecutive review cycles  
- [ ] No S1/S2 safety events  
- [ ] Charter updated with observed failure modes  
- [ ] Logging/evidence completeness ≥ agreed %  
- [ ] Controller (or designee) signs promotion to pilot  

---

## 4. Pilot protocol

### 4.1 Scope controls

- One BU **or** one invoice class first (prefer not both expanding at once).  
- Cap: daily volume or $ threshold.  
- Named pilot users only.  
- Rollback / kill switch verified before day 1.

### 4.2 UAT

Use `Templates/UAT.md`. Cover happy path, top 5 exceptions, injection-like messy emails, duplicate twins, high-value invoices, missing GR.

### 4.3 Pilot KPIs (2–6 weeks)

Track all four metric classes; promotion weight on **operational + risk**, not activity vanity.

### 4.4 Exit criteria (pilot → production level)

- [ ] UAT signed  
- [ ] SOP updated and trained  
- [ ] Control samples pass  
- [ ] Exception SLA not worsened beyond tolerance  
- [ ] RACI confirmed for BAU  
- [ ] Steering informed  

---

## 5. Rollback triggers

Immediate Level drop or disable if:

- Critical false negative on duplicate/payment risk  
- Unapproved model/prompt in production path  
- Evidence logging failure  
- SoD / IAM misconfiguration  
- Sustained precision below floor for N days  

Document rollback in the Evidence Record store.

---

## 6. Test data ethics

- Prefer anonymised or production-mirror with access controls.  
- Do not exfiltrate invoices to personal AI accounts.  
- Retain shadow logs per retention policy.

---

## 7. Related

- `Templates/UAT.md`
- `Governance/00_AGENT_GOVERNANCE_FRAMEWORK.md`
- `Agent_Library/17_RESPONSIBILITY_PROGRESSION_MODEL.md`
