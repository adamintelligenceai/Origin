# Agent Control Matrix

**Purpose:** Map each agent’s key risks to preventive/detective controls, owners, evidence, frequency, and escalation.  
**Use with:** Governance Framework; Autonomy Progression; Exception Taxonomy.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Ensure every agent risk has an owned control |
| **How** | Matrix below; test per Frequency; escalate per column |
| **Who** | Controller (matrix owner); Agent Human Owners (operate); Audit (test) |

---

## Matrix

| Agent | Risk | Control | Preventive / Detective | Owner | Evidence | Frequency | Escalation |
|---|---|---|---|---|---|---|---|
| A01 Intake | Malicious/phishing attachment | Malware scan + quarantine allow-list | P | IT Security + Intake Lead | Quarantine log; scan results | Continuous; weekly review | Security on detect |
| A01 Intake | Bad extraction → wrong payee/amount | Field confidence gates; no silent invent | P | Intake Lead | Extraction JSON; confidence | Continuous; sample weekly | Pause writes if accuracy drop |
| A01 Intake | Unapproved channel sprawl | Channel allow-list in A16 | P | AP Manager | Config version | Change-controlled; monthly attest | AP Manager |
| A02 Validation | False PASS material invoice | High-value sample re-performance | D | AP Quality Lead | Sample worksheets | Weekly / by amount band | Controller if miss found |
| A02 Validation | Rule change weakens control | Dual control rule promotion | P | Quality Lead + Controller | Rule CAB tickets | Each change | Controller |
| A02 Validation | Override abuse | Override limits + analytics | D | AP Manager | Override log | Weekly | Audit if pattern |
| A03 Matching | False clean match | Tolerance versioning + sample | P/D | Matching Lead | Match log; samples | Weekly | Freeze auto-match |
| A03 Matching | Tolerance creep | Change control with Procurement | P | Procurement + Controller | Tolerance versions | Each change; quarterly review | Controller |
| A03 Matching | Pay without receipt | Enforce 3-way where required | P | Matching Lead | Match mode compliance | Continuous | Controllership |
| A04 Triage | Misroute / orphan exceptions | Mandatory owner + taxonomy | P | Exception Manager | Case fields completeness | Continuous; QA sample | AP Manager on SLA breach |
| A04 Triage | Silent close without evidence | Closure evidence gate | P | Exception Manager | Closure packs | Continuous | Reopen + Manager |
| A04 Triage | Mass waive | Prohibit bulk waive; approvals | P | Controller | Waive log | Each event | Audit |
| A05 GR | Fabricated GR to clear pay | Ban unsupervised GR create; SoD | P | Ops + Inventory Control | GR post audit | Continuous; weekly sample | Security/Inventory if shrink |
| A05 GR | Chronic missing GR | Wait window + A09 chase + scorecards | D | Ops Owner | GR lag KPI | Weekly | Ops Director |
| A06 PO Quality | Noisy blame of buyers | Confidence thresholds; joint RACI | P | Procurement Ops | Finding QA | Weekly | Pause auto-tasks |
| A06 PO Quality | After-the-fact PO / maverick | Detect + policy escalate | D | Procurement + Compliance | After-fact report | Weekly | Procurement leadership |
| A07 Approval | Wrong approver / DOA drift | DOA service version pin | P | Controls Lead | Workflow + DOA version | Continuous; monthly attest | Controller |
| A07 Approval | SoD self-approval | System SoD checks | P | Controls Lead | SoD exception log | Continuous | Audit |
| A07 Approval | Rubber-stamp pattern | Timing analytics | D | Audit / Controls | Outlier report | Monthly | Audit |
| A08 Supplier | Payee diversion via “new bank” | Dual control + out-of-band verify | P | MDM + Controls | Verification checklist | Each change | Security immediately |
| A08 Supplier | Unapproved commercial concession | Procurement gate on price | P | Category Manager | Dispute file | Each event | Category leadership |
| A08 Supplier | Data overshare | Templates + DLP | P | Security + Desk Lead | DLP events | Continuous | Security |
| A09 Follow-Up | Alert fatigue / ignored tasks | Rate limits; digests; noise KPI | P | Ops Lead | Notif metrics | Weekly | Tune cadence |
| A09 Follow-Up | False task completion | Evidence required on close | P | Ops Lead | Task attachments | Continuous | Reopen |
| A10 Dup/Anomaly | False fraud allegation | Disclaimer; human disposition; no “fraud found” language | P | Controls Lead | Disposition codes | Continuous | Legal/Comms if external claim |
| A10 Dup/Anomaly | Missed duplicate payment | Exact-key detect; fail closed holds | P/D | Controls Lead | Hold vs pay join; recall tests | Continuous; monthly test | Controller on escape |
| A10 Dup/Anomaly | FP burden / ignored signals | Threshold tuning + feedback loop | D | Controls Lead | Precision metrics | Weekly | Demote auto-hold |
| A11 Statement | Missed liability (on-stmt-not-books) | Materiality escalation | D | Recon Lead | Residual ageing | Each statement; weekly rollup | Controller |
| A11 Statement | False clear of residuals | Dual review above threshold | P | Recon Lead | Adjust approvals | Each material clear | Controller |
| A12 Pay Proposal | Agent payment release | IAM deny release to agent accounts; continuous entitlement test | P | Security + Disbursements | Entitlement test log | Continuous / daily test | Security P1 |
| A12 Pay Proposal | Hold escape (pay held item) | Hard hold enforce in proposal | P | Disbursements Lead | Hold escape KPI | Continuous | Controller |
| A12 Pay Proposal | Missed discount / bad cash choice | Discount recommendation + Treasury policy | D | Disbursements + Treasury | Capture rate | Weekly | Treasury |
| A13 Close | Incomplete close / under-accrual | Checklist gate; accrual dual review | P | Close Manager + Controller | Close pack | Each period | Delay sign-off |
| A13 Close | Evidence loss | Immutable evidence store | P | Close Manager | Retention test | Quarterly | IT + Audit |
| A14 Reporting | Vanity / misleading metrics | Dictionary governance; certified label | P | Analytics Lead + Controller | Dictionary versions | Each change; quarterly | Controller freeze metric |
| A14 Reporting | Wrong executive number | Reconcile to subledger when claimed | D | Analytics Lead | Recon sheets | Each monthly pack | Correct + notify |
| A15 Root Cause | Wrong fix / blame culture | SME review; pilot before scale | P | CI Lead | Effectiveness tracking | Per insight | Sponsor escalate |
| A15 Root Cause | Insight sprawl | WIP limit; $×frequency prioritize | P | CI Lead | Open insights WIP | Biweekly | AP Manager |
| A16 Orchestrator | Unauthorized hop / skip controls | Policy-as-code routes | P | AP Manager + Controller | Decision records | Continuous | Kill-switch |
| A16 Orchestrator | Silent autonomy raise | Change control + attestation | P | Controller | Config diffs; packets | Each change; quarterly | Demote + Audit |
| A16 Orchestrator | Runaway cost / agent storm | Budgets; circuit breakers | P | Platform + AP Manager | Cost telemetry | Continuous | Throttle 150% |
| A16 Orchestrator | SPOF / outage | Human-only mode drill | D | Platform + AP Manager | Drill results | Quarterly | Incident commander |
| Cross-stack | SoD collapse in IAM | Quarterly access review | D | Security + Audit | Access attestations | Quarterly | Revoke + incident |
| Cross-stack | Model/IDR drift | Accuracy monitors; CAB | D | IT + Agent Owners | Accuracy dashboards | Weekly | Rollback model |
| Cross-stack | Premature L4 | Governance forbid default L4 | P | CFO / Controller | Autonomy registry | Continuous | Board/CFO only for L4 |

---

## Testing standard

- **Preventive:** configuration/IAM tests; break-glass attempts in non-prod.  
- **Detective:** sampling sizes by risk (high amount 100% or statistical).  
- Failures open issues with demotion triggers when material.

---

## Control / Measure / Evidence

| Dimension | Standard |
|---|---|
| **Control** | This matrix + A16 enforcement |
| **Measure** | % controls tested on time; open control issues ageing |
| **Evidence** | Test sheets; logs cited in Evidence column |

---

## Related

- `../Governance/00_GOVERNANCE_FRAMEWORK.md`
- Agent specs A01–A16
