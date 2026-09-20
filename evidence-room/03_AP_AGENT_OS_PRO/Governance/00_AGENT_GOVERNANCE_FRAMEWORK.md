# Agent Governance Framework

**Evidence Room · AP Agent OS Professional**  
**Audience:** Controller, Head of AP, Internal Audit liaison, AI/Automation lead

---

## 1. Purpose

Establish decision rights, escalation paths, evidence standards, and promotion rules so AI agents in Accounts Payable remain **governed workers**, not unsupervised automation.

This framework does **not** certify compliance, guarantee fraud prevention, or authorise autonomous payments.

---

## 2. Governance objects

| Object | Definition | Owner |
|--------|------------|-------|
| Agent Charter | Purpose, scope, level, gates, metrics | Named Accountable (usually Controller or Head of AP) |
| Model/Prompt Version | Immutable ID of logic used for a decision | Automation / AI lead |
| Evidence Record | Timestamp, inputs hash, confidence, action, override | System of evidence (ticket/ERP note/log store) |
| Exception Case | Taxonomised break with SLA and owner | AP operations |
| Promotion Decision | Written level change with metrics | Per RACI |
| Risk Acceptance | Residual risk acknowledged for a period | Controller / CFO designee |

---

## 3. Decision rights

| Decision | Accountable | Consulted | Informed |
|----------|-------------|-----------|----------|
| Launch agent in shadow | Head of AP | IT, Control | Processors |
| Promote Level 0→1 | Head of AP | Controller | Audit |
| Promote Level 1→2 | Controller | AP, IT, Risk | CFO |
| Promote Level 2→3 / 3→4 | CFO or FD designee / Steering | All above | Board risk if material |
| Change payment-adjacent logic | Controller | Treasury, AP | Audit |
| Grant write access to ERP | IT + Controller dual | Security | AP |
| Emergency disable (kill switch) | Any of: AP Mgr, Controller, IT Sec | — | Steering within 24h |

**Hard rule:** No agent may authorise payment, release funds, or unilaterally change bank details.

---

## 4. Operating cadence

| Cadence | Forum | Inputs | Decisions |
|---------|-------|--------|-----------|
| Daily | AP stand-up (15 min) | Exception ageing, agent errors | Tactical reassignment |
| Weekly | Agent ops review | Scorecard, false positive/negative samples | Threshold tweaks (within charter) |
| Monthly | Control sampling | Evidence sample, override themes | Remediation actions |
| Quarterly | Steering | Benefits, risk, roadmap | Promotions, budget, scope |

Team tier: use `04_AP_AGENT_OS_TEAM/Executive/STEERING_PACK.md`.

---

## 5. Escalation ladder

| Severity | Example | Action | Max response |
|----------|---------|--------|--------------|
| S1 | Suspected duplicate payment proposal; bank change attempt | Kill switch + human investigation | Immediate |
| S2 | Systematic mis-match above threshold | Pause agent writes; Level drop | 4 business hours |
| S3 | Single high-value false suggest | Case review; log | 1 business day |
| S4 | UX / wording issues | Backlog | Next weekly |

---

## 6. Evidence standard (minimum)

Every **material** agent output must persist:

1. Agent ID + version  
2. Model/prompt version  
3. UTC timestamp  
4. Input references / hash  
5. Output summary + confidence  
6. Policy rule IDs applied  
7. Human decision (accept / edit / reject) when Level ≤2 or on sample at higher levels  

Retain per your document-retention policy; default recommendation for programme design: **≥7 years** for financial decision support logs — confirm with legal/records.

---

## 7. Segregation of duties (SoD)

| Role | Must not also |
|------|----------------|
| Agent prompt author | Sole UAT approver for same agent |
| Processor accepting agent drafts | Sole bank-detail master data owner |
| Automation admin | Sole payment run approver |
| Charter Accountable | Skip monthly control sampling indefinitely |

---

## 8. Third-party / model risk posture

- Prefer enterprise-approved LLM endpoints with contractual data controls.
- Prohibit pasting unrestricted cardholder or unnecessary PII into consumer AI tools.
- Treat supplier email body as untrusted content (prompt-injection aware design).
- Document residency and subprocessors for audit questionnaires — without claiming certification.

---

## 9. Charter lifecycle

```
Draft → Control review → Approve → Shadow → Pilot → Operate → Promote/Retire
                ↑________________ review on material change ________↓
```

Material changes (new write path, new invoice class, new model family) require charter amendment and re-baseline of metrics.

---

## 10. Related templates

- `Templates/AGENT_CHARTER.md`
- `Templates/GOVERNANCE_STANDARD.md`
- `Templates/RISK_ASSESSMENT.md`
- `Controls/00_CONTROL_FRAMEWORK.md`
