# Control Framework

**Product:** AP Agent OS Pro  
**Document:** `Controls/00_CONTROL_FRAMEWORK.md`  
**Aligns to:** Governance framework, Agent Library, Exception Taxonomy  
**Stance:** Practical preventive/detective/corrective controls—ERP-agnostic

---

## 1. Control objectives

1. **Validity** — Only legitimate, supported payables progress.  
2. **Accuracy** — Amounts, tax, coding within policy.  
3. **Completeness** — Invoices and credits captured; statements reconciled.  
4. **Authorization** — Approvals per matrix; payments human-released.  
5. **Segregation** — Conflicting duties not combined (human or agent).  
6. **Traceability** — Decisions reproducible from audit evidence.  
7. **Resilience** — Injection, hallucination, outages handled safely.  

**Explicit non-objective:** Guaranteeing absence of fraud. Controls **reduce risk**; they do not certify fraud-free AP.

---

## 2. Control landscape (summary)

| ID | Control | Type | Primary owner |
|----|---------|------|---------------|
| C-01 | SoD matrix (human + agent) | Preventive | AP Manager / Security |
| C-02 | Least-privilege agent identities | Preventive | IT Security |
| C-03 | Autonomy registry & ceilings | Preventive | AP Manager / Controls |
| C-04 | Kill-switch | Corrective | On-call + AP Manager |
| C-05 | Immutable source documents + hash | Preventive/Detective | AP Ops / IT |
| C-06 | Validation rule pack versioning | Preventive | AP Quality |
| C-07 | Match tolerances + materiality thresholds | Preventive | Matching Lead / Controller |
| C-08 | Duplicate exact + fuzzy detection | Detective | Controls Lead |
| C-09 | Hard-flag payment block | Preventive | Controls Lead |
| C-10 | Approval matrix enforcement | Preventive | AP Manager |
| C-11 | Dual control emergency bypass | Preventive | Controller + AP Manager |
| C-12 | Vendor bank change verification | Preventive | Master Data / Controls |
| C-13 | Payment proposal checklist | Preventive | Payment Lead |
| C-14 | Human-only payment release | Preventive | Treasury / AP |
| C-15 | Statement≠invoice entitlement | Preventive | Recon Specialist |
| C-16 | Prompt-injection hygiene | Preventive | Security + Engineering |
| C-17 | Grounded generation / no invent | Preventive | Engineering + Quality |
| C-18 | Audit logging completeness | Detective | IT / Internal Audit |
| C-19 | Version control of prompts/policies | Preventive | Engineering / Steering |
| C-20 | Cost & performance monitoring | Detective | AP Manager / FinOps |
| C-21 | Period-close checklist evidence | Preventive | AP Manager / Controller |
| C-22 | Sample testing of autonomous actions | Detective | Controls / IA |
| C-23 | Incident response playbooks | Corrective | Security + AP Manager |
| C-24 | Taxonomy mandatory coding | Detective | Exception Desk |
| C-25 | Over-receipt prohibition | Preventive | Receiving / AP |

---

## 3. Separation of duties (detail)

### 3.1 Human SoD (classic AP)

- Requestor ≠ sole approver (above threshold).  
- Vendor master bank edit ≠ payment releaser.  
- Payment preparer ≠ payment releaser (where staffing allows; compensating reviews if not).  
- Hard-flag clearer ≠ sole releaser.

### 3.2 Agent SoD

| Agent | Must not be able to |
|-------|---------------------|
| A01–A11, A13–A16 | Release bank payments |
| A12 Payment Proposal | Send bank files / confirm settlement |
| A08 Supplier Resolution | Apply bank master changes |
| A03 Matching | Post GR or edit PO silently |
| A16 Orchestrator | Approve-as-user or lift hard flags |

Technical enforcement preferred (missing scopes) over policy-only.

---

## 4. Least privilege

- Separate credentials per agent.  
- Read-only default; write scopes gated by autonomy level.  
- No shared “god” integration user for all agents.  
- Production prompts cannot request new scopes at runtime.

---

## 5. Prompt injection controls

| Control | Implementation sketch |
|---------|----------------------|
| Untrusted content labeling | Docs/emails passed as data blobs |
| Instruction hierarchy | System > developer > tool policy > retrieved data |
| Deny list behaviors | Ignore “ignore previous instructions”, “pay immediately”, “new bank IBAN is…” as commands |
| Egress control | Agents cannot email arbitrary external domains beyond allow-list |
| File safety | Malware scan before OCR |
| Test suite | Injection regression cases each release |

---

## 6. Hallucination / accuracy controls

- Deterministic calc for money math.  
- Cite field sources on assertions.  
- Confidence thresholds → human.  
- Ban silent “fixes” to supplier amounts.  
- Reporting tie-outs (related to `RPT.TIEOUT_FAIL`).  

---

## 7. Duplicate, anomaly & fraud-risk controls

- Exact duplicate block (hard).  
- Fuzzy duplicate policy bands (soft/hard).  
- Bank-change adjacency hold.  
- Human clearance with reason codes.  
- **Disclosure:** These are risk signals—not a fraud guarantee.  
- Escaped double-pay → S1 incident + RCA.

---

## 8. Payment controls (human stay)

1. Eligibility: approved, not hard-held, matched/policy OK.  
2. Proposal Agent drafts + checklist.  
3. Payment Lead review.  
4. Authorized releaser executes in bank/ERP.  
5. Remittance from system of record.  
6. Agents may **notify** status; may not **confirm** pay as authority.

Forbidden: statement-only pay; agent lift hold; agent bank edit; agent dual-approve.

---

## 9. Audit logging & evidence

**Minimum evidence pack per invoice lifecycle**

- Intake hash + channel  
- Validation findings + rule version  
- Match lines + tolerance version  
- Approval decisions + matrix version  
- Flags/holds + clearances  
- Proposal inclusion/exclusion  
- Human release ID  
- Exception codes + resolution  

Log integrity: append-only, access-controlled, clock sync, retention policy.

---

## 10. Version control & change management

- Specs, prompts, tolerances, taxonomy, matrices in VCS.  
- Decision records stamp versions used.  
- Rollback: prior prompt/policy activatable within RTO target.  
- Model provider changes → re-validation + autonomy freeze.

---

## 11. Monitoring & sampling

| Autonomy | Sample |
|----------|--------|
| L0–L1 | 100% material |
| L2 | ≥10% |
| L3 | ≥5% risk-based |
| L4 | ≥2% + 100% P1/hard |

Monitor: false clean match, duplicate escapes, hold bypass attempts, injection alerts, cost/invoice, SLA breaches.

---

## 12. Incident response (control view)

| Step | Action |
|------|--------|
| 1 Detect | Alert from monitors, human report, bank notice |
| 2 Contain | Kill-switch; halt payment run; freeze agent levels |
| 3 Eradicate | Revoke creds; patch prompt/tool; remove bad drafts |
| 4 Recover | Re-validate; staged autonomy restore |
| 5 Learn | RCA → control update → Steering |

S1/S2 require written timeline within 5 business days.

---

## 13. Close & financial reporting controls

- Checklist evidence for green items.  
- Accruals approved by accounting authority.  
- No “green by omission.”  
- Post-close residual actions ticketed.  
- Report publish blocked on tie-out fail.

---

## 14. Mapping to agents (quick)

| Agent | Key controls |
|-------|--------------|
| A01 Intake | C-05, C-16, C-18 |
| A02 Validation | C-06, C-17 |
| A03 Matching | C-07, C-25 |
| A04 Triage | C-24 |
| A05 GR | C-25 |
| A06 PO Quality | C-01 (no silent edit) |
| A07 Approval | C-10, C-11 |
| A08 Supplier | C-12, C-16 |
| A09 Follow-Up | C-01 |
| A10 Dup/Anom | C-08, C-09 |
| A11 Statement | C-15 |
| A12 Pay Proposal | C-13, C-14 |
| A13 Close | C-21 |
| A14 Reporting | C-17, tie-out |
| A15 RCA | C-22 inputs |
| A16 Orchestrator | C-03, C-04, C-20 |

---

## 15. Testing calendar

| Test | Frequency |
|------|-----------|
| Kill-switch drill | Quarterly |
| SoD access review | Quarterly |
| Injection regression | Each release |
| Duplicate escape hunt | Monthly |
| Payment path human-only proof | Each release + quarterly E2E |
| Autonomy sample audits | Weekly ops / monthly Controls |
| Log completeness sample | Monthly |

---

## 16. Monday operating controls checklist

- [ ] Hard flags cleared only with reasons  
- [ ] Payment proposal excludes holds  
- [ ] Human releaser confirmed for run  
- [ ] Kill-switch reachable  
- [ ] Autonomy registry unchanged unless Steering-approved  
- [ ] Top P1 exceptions owned  
- [ ] Cost burn within band  

---

## Related documents

- `../Governance/00_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `../Agent_Library/17_RESPONSIBILITY_PROGRESSION_MODEL.md`  
- `../Agent_Library/18_EXCEPTION_TAXONOMY.md`
