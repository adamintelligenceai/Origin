# Agent Control Matrix

**Product:** Evidence Room — AP Agent OS · Professional  
**Document ID:** ER-AP-GOV-002  
**Version:** 1.0  
**Related:** `01_AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
**How to use:** Map each row to your ERP/AP automation controls. Adjust Human owner titles to your RACI. Evidence columns list artefacts auditors typically request — retain per your retention policy.

**Legend — Preventive / Detective:** P = Preventive · D = Detective · P/D = both  

**Autonomy note:** Controls assume agents may operate up to the level approved in the charter. Payment authorisation remains human-only in all rows.

---

## Control matrix

| # | Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|-------|------|---------|-----|-------------|----------|-----------|-------------------|
| 1 | 1 Invoice Intake | Misfiled or lost invoices; incomplete capture | Channel allowlist + mandatory metadata checklist before queue advance | P | AP Process Owner | Intake config, rejected-channel log | Per release / continuous | >X% intake reject rate or channel spoof attempt |
| 2 | 1 Invoice Intake | Duplicate file ingestion creating duplicate work | Hash/filename/supplier+invoice# pre-check against intake ledger | P/D | AP Supervisor | Duplicate intake report | Daily | Repeat duplicates from same supplier > threshold |
| 3 | 1 Invoice Intake | Sensitive data exposed in unmanaged OCR/AI tools | Only approved OCR/connectors; DLP on export paths | P | Platform Owner | Connector inventory, DLP alerts | Continuous / quarterly review | Unapproved tool detected or DLP high-severity alert |
| 4 | 1 Invoice Intake | Prompt injection via PDF/email body | Treat OCR text as data; instruction hierarchy; allowlisted tools only | P | Platform Owner + Agent Owner | Injection test results, blocked-action log | Per release + sample monthly | Successful injection in test or prod blocked-action spike |
| 5 | 2 Validation | Wrong vendor / entity / currency / tax coding | Field validation against master data + confidence threshold; abstain if below | P | Agent Owner (Validation) | Validation exception codes, accuracy samples | Daily ops / monthly QA | Accuracy below gate or spike in coding corrections |
| 6 | 2 Validation | Hallucinated PO/tax IDs | Grounding to ERP search; forbid invented IDs; “insufficient data” path | P | Agent Owner (Validation) | Abstain rate, fabricated-ID defect log | Continuous / weekly review | Any confirmed fabricated identifier |
| 7 | 2 Validation | Privacy over-collection into model context | Field allowlist in prompt/retrieval schema | P | Platform Owner | Schema version, privacy review | Per release | Schema drift adding PII fields without approval |
| 8 | 3 Matching | False three-way match (false positive) | Tolerance rules + independent price/qty checks; sample QA of auto-matches | P/D | Agent Owner (Matching) | Match tolerance table, FP sample worksheets | Daily + monthly sample | FP rate > gate or material mis-match posted |
| 9 | 3 Matching | Missed mismatch (false negative) forcing leakage | Mandatory variance codes; ageing of unmatched; supervisor review of aged | D | AP Supervisor | Unmatched ageing, FN samples | Daily ageing / monthly | Ageing breach or FN causing overpay |
| 10 | 3 Matching | SoD: matcher effectively clearing own induced variance | Dual review above amount threshold; agent cannot self-approve variance | P | Control Owner | Dual-approval log, SoD report | Continuous / quarterly cert | Single-user clearance of high-value variance |
| 11 | 4 Exception Triage | Mis-prioritisation delaying material exceptions | Risk-weighted scoring (amount, age, vendor tier, control flags) with human override log | P/D | Agent Owner (Triage) | Priority distribution, override analysis | Daily | Material invoice aged beyond SLA while low-priority |
| 12 | 4 Exception Triage | Wrong queue routing / ownership gaps | Taxonomy-to-queue map versioned; unmapped → default supervisory queue | P | AP Process Owner | Routing config version, unmapped volume | Per change / weekly | Unmapped > threshold or orphaned queue |
| 13 | 4 Exception Triage | Silent discard of exceptions | No-drop rule: every exception ID must reach terminal state | P/D | AP Supervisor | Exception lifecycle report | Daily | Missing terminal states or count breaks |
| 14 | 5 Goods Receipt | Booking without receipt evidence | Block/post hold when GRN missing per policy; agent flags only | P | Procurement Ops / AP Supervisor | GRN hold report | Daily | Policy bypass without dual approval |
| 15 | 5 Goods Receipt | Stale or wrong GRN linkage | GRN existence + open qty check in ERP before recommend | P | Agent Owner (GR) | Failed linkage log, sample QA | Continuous / monthly | Confirmed wrong GRN used in match |
| 16 | 5 Goods Receipt | Accrual / timing distortion near close | Cut-off calendar + escalate late GRN patterns | D | AP Close Owner | Cut-off exception list | Period-end | Spike in post-cut-off GRN claims |
| 17 | 6 PO Quality | Weak POs driving chronic exceptions | Detect recurring PO defect codes; feed buyer scorecards | D | Procurement Process Owner | PO defect taxonomy report | Weekly / monthly | Top defect class not trending down after N periods |
| 18 | 6 PO Quality | Agent “fixes” PO without authority | Read/recommend only unless L3 charter + buyer approval workflow | P | Procurement Manager | Write-attempt blocks, approval tickets | Continuous | Unauthorised PO change attempt |
| 19 | 6 PO Quality | Misleading root cause blaming AP only | Dual taxonomy (AP vs Procurement vs Vendor) mandatory on recommendations | P | AP Process Owner | Cause-code distribution | Monthly | >X% “other/unclassified” |
| 20 | 7 Approval | Approval of approval matrix / limits | Enforce matrix in system of record; agent cannot widen limits | P | Control Owner | Matrix version, breach attempts | Continuous / quarterly | Any successful limit bypass |
| 21 | 7 Approval | Approval of approval reminders causing rubber-stamping | Cap reminder frequency; escalate to alternate approver per policy | P | AP Supervisor | Reminder log, SLA breach report | Weekly | Chronic SLA breach without escalation |
| 22 | 7 Approval | Confidential invoice data over-shared to approvers | Need-to-know fields in approval packet; mask bank details | P | Agent Owner (Approval) | Packet template version | Per release | Bank details in approval email |
| 23 | 8 Supplier Resolution | Incorrect commitment in supplier emails | L≤2: human send only; templates for L3; no payment promises | P | Agent Owner (Supplier Res.) | Outbound message log, template IDs | Continuous | Free-text payment promise detected |
| 24 | 8 Supplier Resolution | Prompt injection via supplier email | Isolation + allowlisted reply actions; block tool calls from email text | P | Platform Owner | Blocked tool-call log, test pack | Per release + monthly sample | Injection success or anomalous tool call |
| 25 | 8 Supplier Resolution | Wrong supplier contact / data leak | Contacts from master data only; verify domain where policy requires | P | Master Data Owner | Contact source audit | Monthly sample | Email to non-master domain |
| 26 | 9 Internal Follow-Up | Alert fatigue / ignored pings | Tiered reminders + escalations to named role; suppress duplicates | P/D | AP Supervisor | Follow-up on-time %, suppression log | Weekly | On-time rate below gate |
| 27 | 9 Internal Follow-Up | Escalating wrong person (SoD / privacy) | Role map from RBAC/HR; exclude conflicted parties | P | Agent Owner (Follow-Up) | Escalation target audit | Monthly | Escalation to conflicted or departed user |
| 28 | 9 Internal Follow-Up | Incomplete audit trail of chasers | Log every chase with invoice ID, target, channel, timestamp | D | Control Owner | Follow-up evidence export | Continuous | Gaps in chase history for aged items |
| 29 | 10 Duplicate & Anomaly | Missed duplicate payment (FN) | Multi-key duplicate detection + payment-proposal cross-check | P/D | Agent Owner (Duplicate) | Duplicate suspect queue, FN post-mortems | Daily / per payment run | Confirmed duplicate payment |
| 30 | 10 Duplicate & Anomaly | False duplicate blocking legitimate pay (FP) | Human review workflow for blocks above threshold; reason codes | P/D | AP Supervisor | FP clearance log | Daily | FP rate > gate delaying critical vendors |
| 31 | 10 Duplicate & Anomaly | Anomaly model drift | Baseline metrics + challenger sample; freeze on drift breach | D | Platform Owner | Drift dashboard, model version | Weekly | Drift beyond threshold |
| 32 | 10 Duplicate & Anomaly | Override of hard duplicate block by one person | Dual approval + reason code for hard-block override | P | Control Owner | Override dual-approval log | Continuous | Single-person hard-block override |
| 33 | 11 Vendor Statement Reconciliation | Incorrect “cleared” open items | Require ERP document IDs for each cleared line; no free-text clear | P | Agent Owner (Statement) | Reconciliation workpaper with IDs | Per statement | Clear without document ID |
| 34 | 11 Vendor Statement Reconciliation | Hallucinated remittance advice | Ground to payment history; abstain if unmatched | P | Agent Owner (Statement) | Abstain & exception stats | Per cycle | Fabricated remittance reference |
| 35 | 11 Vendor Statement Reconciliation | Disputes not aged / visibility loss | Open-item ageing from statement diffs to supervisory dashboard | D | AP Supervisor | Statement ageing report | Weekly | Ageing breach on disputed balances |
| 36 | 12 Payment Proposal Review | Proposal includes blocked/duplicate/unapproved items | Pre-submission checklist: duplicate, approval, hold, amount vs invoice | P | Agent Owner (Payment Proposal) | Checklist results per run | Per payment run | Checklist fail ignored |
| 37 | 12 Payment Proposal Review | Agent authorises or releases payment | Hard exclusion: no bank-file release / portal approve tools in agent scope | P | Treasury / AP Manager + Platform Owner | Entitlement review, tool allowlist | Continuous / quarterly | Any payment-release entitlement on agent identity |
| 38 | 12 Payment Proposal Review | Bank detail substitution attack | Compare proposal payee bank to master; block changes mid-cycle | P/D | Master Data + Treasury | Bank-detail change report vs proposal | Per run | Mismatch between proposal and master |
| 39 | 12 Payment Proposal Review | Incomplete review evidence for audit | Snapshot proposal hash, reviewer attestation, exceptions removed | D | Control Owner | Payment run evidence pack | Per run | Missing attestation |
| 40 | 13 AP Close | Incomplete close checklist / skipped controls | Systematised close task list; agent prepares status, human signs | P | AP Close Owner | Close pack + sign-offs | Each period | Sign-off without required evidence |
| 41 | 13 AP Close | Cut-off errors from agent-prepared accruals | Accrual method doc + sample substantiation; threshold dual review | P/D | Controller / Close Owner | Accrual samples, variance analysis | Each period | Unsubstantiated material accrual |
| 42 | 13 AP Close | Version confusion on close reports | Freeze report versions at period lock; watermark drafts | P | Agent Owner (Close) | Version register | Each period | Post-lock silent overwrite |
| 43 | 14 AP Reporting | Misleading KPIs / vanity metrics | Scorecard definitions locked; distinguish validated vs estimated | P | AP Process Owner | Metric dictionary version | Semi-annual | Metric change without change control |
| 44 | 14 AP Reporting | Confidential data in broadly circulated packs | Audience-based packs; mask supplier bank & employee IDs | P | Agent Owner (Reporting) | Distribution list + template | Per release / monthly | Wrong audience received confidential pack |
| 45 | 14 AP Reporting | Hallucinated narrative commentary | Numbers must tie to query IDs; narratives flagged “model-assisted” until reviewed | P/D | AP Manager | Tie-out worksheets | Monthly | Untied figure in exec pack |
| 46 | 15 Root Cause | Wrong systemic fixes from bad analysis | Require evidence links + sample size; human accepts actions | P | Continuous Improvement Owner | RCA tickets with evidence | Per RCA | Action raised without evidence link |
| 47 | 15 Root Cause | Scope creep into blame without SoD awareness | RCA excludes punitive HR actions; focuses process/control/data | P | AP Process Owner | RCA charter adherence review | Quarterly | RCA used as sole basis for disciplinary without HR process |
| 48 | 15 Root Cause | Recurring issues not fed back to agents 1–14 | Closed-loop backlog to charters/rules with owners & due dates | D | AP Manager / Orchestrator Owner | Backlog ageing | Bi-weekly | Critical action overdue |
| 49 | 16 AP Manager / Orchestrator | Unsafe auto-sequencing across agents | Orchestrator cannot raise autonomy or approve payments; conflict surfacing only | P | Programme Owner / Controller | Orchestrator allowlist, decision log | Continuous | Attempted autonomy self-elevation |
| 50 | 16 AP Manager / Orchestrator | Hidden bottlenecks / queue starvation | SLA monitors across agent queues + capacity alerts | D | AP Manager | Cross-queue dashboard | Daily | SLA breach on critical path |
| 51 | 16 AP Manager / Orchestrator | Conflicting agent recommendations unresolved | Conflict register with human resolution mandatory before write | P | AP Supervisor | Conflict resolution log | Continuous | Write attempted under open conflict |
| 52 | 16 AP Manager / Orchestrator | Single point of failure for ops visibility | BCP fallback dashboards / manual roll-up if orchestrator down | P | Platform Owner + AP Manager | BCP test record | Annual drill / on outage | Outage without fallback within RTO |
| 53 | Cross-cutting (all agents) | Least-privilege violation on service accounts | Entitlement peer review; no standing ERP “superuser” for agents | P | Platform Owner | Access cert evidence | Quarterly | Superuser grant without ticket |
| 54 | Cross-cutting (all agents) | Untracked model/prompt change | Version control + CAB for production prompts/rules | P | Platform Owner | Git/ALM tags, CAB minutes | Per release | Prod edit without version bump |
| 55 | Cross-cutting (all agents) | Inadequate audit trail | Append-only logs with correlation IDs to ERP docs | D | Platform Owner + Audit | Log completeness tests | Monthly sample | Reconstruction failure on sample |
| 56 | Cross-cutting (all agents) | Autonomy creep after go-live | Semi-annual autonomy re-cert; auto-downgrade on scorecard breach | P/D | Controller + Process Owner | Autonomy register, breach tickets | Semi-annual / on breach | L3+ without current certification |
| 57 | Cross-cutting (all agents) | Vendor/model training on customer data | Contractual opt-out / private endpoint; verify in register | P | Legal + Platform Owner | DPA / vendor risk register | Semi-annual / on vendor change | Training-on-data enabled without approval |
| 58 | Cross-cutting (all agents) | Access not terminated on leaver | JML feed disables console + rotates shared secrets | P | IT Security + AP Manager | Leaver tickets, access diffs | Per leaver / quarterly recon | Active account for terminated user |
| 59 | Cross-cutting (all agents) | Incident without fallback | Documented fallback to L0/manual; kill-switch runbook | P | Process Owner + Platform Owner | Runbook, drill evidence | Annual / on Sev-1 | Sev-1 without containment in SLA |
| 60 | Cross-cutting (all agents) | Evidence retention gaps | Retention schedule applied to logs, versions, UAT packs | P | Control Owner | Retention config, legal hold log | Annual review | Missing evidence for in-scope period |

---

## Coverage summary

| Agent | Rows (primary) |
|-------|----------------|
| 1 Invoice Intake | 1–4 |
| 2 Validation | 5–7 |
| 3 Matching | 8–10 |
| 4 Exception Triage | 11–13 |
| 5 Goods Receipt | 14–16 |
| 6 PO Quality | 17–19 |
| 7 Approval | 20–22 |
| 8 Supplier Resolution | 23–25 |
| 9 Internal Follow-Up | 26–28 |
| 10 Duplicate & Anomaly | 29–32 |
| 11 Vendor Statement Reconciliation | 33–35 |
| 12 Payment Proposal Review | 36–39 |
| 13 AP Close | 40–42 |
| 14 AP Reporting | 43–45 |
| 15 Root Cause | 46–48 |
| 16 AP Manager / Orchestrator | 49–52 |
| Cross-cutting | 53–60 |

**Total control rows:** 60  

---

## Operating instructions

1. **Localise owners** — replace titles with named individuals in your RACI.  
2. **Set numeric thresholds** — replace qualitative “gate” references with values from your Scorecard.  
3. **Link to ERP controls** — add columns for ERP T-code / workflow ID if useful for ITGC mapping.  
4. **Test** — each Preventive control should appear in UAT; each Detective control in monitoring calendars.  
5. **Certify** — Control Owners attest semi-annually that controls operated as designed (see Governance Framework §23).  
6. **Do not dilute payment exclusion** — rows 37 and Orchestrator constraints are non-negotiable product rules.

---

## Change log

| Version | Change |
|---------|--------|
| 1.0 | Initial 60-row matrix for Professional tier |

**Disclaimer:** Illustrative control catalogue for implementation planning. Not a certification that fraud will be prevented or that audit standards are met. Align with your auditor and policy framework.
