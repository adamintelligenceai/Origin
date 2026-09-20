# Agent Control Matrix

**Evidence Room — AP Agent OS Pro**  
**Document type:** Control design artefact  
**Audience:** Controllers, AP managers, Internal Audit, Risk  
**Scope:** All sixteen AP agents — multiple risks per agent

**How to use:** Map each row to your GRC tool or control library. “Human owner” is the accountable role (customize names). Evidence artefacts must be retrievable for the stated frequency.

**Legend:** **P** = Preventive · **D** = Detective · **P/D** = Both

---

## Control matrix

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| 01 Invoice Intake | Misclassification of invoice vs credit note / statement | Classification model + rule gates; human review below confidence threshold | P/D | AP Manager | Classification accuracy report; sampled misclass log | Daily ops / Weekly QA | Accuracy &lt; target for 3 consecutive days; material misclass causing posting error |
| 01 Invoice Intake | Duplicate registration of same invoice image/file | Hash + vendor+invoice# + amount fuzzy check before create | P | AP Specialist Lead | Duplicate-block log; Agent 10 cross-signal | Per invoice | &gt;N duplicates blocked/day or confirmed duplicate posted |
| 01 Invoice Intake | Wrong legal entity assignment at intake | Entity resolution rules from email domain, PO, remittance; fence on ambiguity | P | Controller (policy) / AP Manager (ops) | Entity assignment audit sample | Weekly sample | Any cross-entity posting; ambiguity override spike |
| 01 Invoice Intake | Untrusted content / prompt injection via PDF or email | Untrusted-content channel separation; allow-listed tools only | P | IT Security + Prompt Steward | Red-team test results; blocked tool-call log | Quarterly test / Continuous monitor | Successful injection test in prod-like env; anomalous tool calls |
| 01 Invoice Intake | Incomplete capture (missing pages / attachments) | Completeness checklist before handoff to Validation | P/D | AP Specialist Lead | Incomplete-intake queue ageing | Daily | Ageing &gt; SLA; incomplete rate above threshold |
| 02 Invoice Validation | Invalid tax treatment posted | Tax rule engine + jurisdiction checks; abstain on low confidence | P | Tax / AP Manager | Tax exception rate; FN/FP tax flags | Weekly | Tax authority query; systematic tax miss on sample |
| 02 Invoice Validation | Vendor mismatch (invoice vendor ≠ PO vendor) | Master-data match + fuzzy name controls; hold on mismatch | P | AP Manager | Mismatch hold log | Daily | High-value mismatch auto-cleared; override without dual control |
| 02 Invoice Validation | Policy breach (missing mandatory fields) | Schema + policy validator before match | P | AP Manager | Validation fail taxonomy report | Daily | Rise in “forced complete” overrides |
| 02 Invoice Validation | Hallucinated field values (invented PO/tax codes) | Grounding to SoR IDs; no silent fill; citation check | P/D | Prompt Steward + AP Manager | Hallucination sample QA; citation fail count | Weekly | Any fabricated ID reaching ERP |
| 02 Invoice Validation | Sensitive data over-exposure in logs | Field-level masking in evidence logs | P | Privacy / IT Security | Log scan samples | Monthly | Unmasked bank/tax ID in logs |
| 03 Matching | False match (wrong PO / line) | 2-/3-way tolerances; line-level evidence; confidence gates | P/D | AP Manager | Matching accuracy; FP match incidents | Daily / Weekly | False match causing overpayment |
| 03 Matching | False exception (good invoice blocked) | Tolerance tuning; root-cause feedback from Agent 15 | D | AP Manager | FN/FP rates; STP contribution | Weekly | Exception rate spike without volume change |
| 03 Matching | Price/qty variance approved beyond DOA | Variance fences by role and amount | P | Controller | Variance approval log vs DOA matrix | Weekly | Breach of DOA; repeated near-limit approvals |
| 03 Matching | Currency-only match where 3-way required | Document-type policy matrix | P | Controller | Policy violation report | Daily | Any 2-way on 3-way-required category |
| 03 Matching | Currency race / stale receipt data | Re-read receipts before final match; idempotent match keys | P | Technical Owner | Stale-data incident log | Continuous | Match using superseded receipt quantities |
| 04 Exception Triage | Misrouted exceptions (wrong queue) | Taxonomy + routing matrix version control | P/D | AP Manager | Reroute rate; time-to-correct-queue | Weekly | Reroute &gt; target; SLA breach cluster |
| 04 Exception Triage | Priority inversion (small items before material) | Explainable priority score (amount × age × vendor tier) | P | AP Manager | Priority vs ageing dashboard | Daily | Material invoice aged past SLA while low-value cleared |
| 04 Exception Triage | Duplicate cases for same invoice | Case merge rules on invoice key | P | AP Specialist Lead | Merge log | Daily | Parallel resolutions conflicting |
| 04 Exception Triage | Silent closure without resolution evidence | State machine requires evidence artefact to close | P | Internal Audit (design) / AP Manager (ops) | Closed-without-evidence attempts blocked | Continuous | Any forced closure override |
| 04 Exception Triage | Taxonomy drift / free-text sprawl | Controlled reason codes only; change control on codes | P | AP Manager + Controller | % free-text / “other”; code change log | Monthly | “Other” &gt; agreed cap |
| 05 Goods Receipt | Chasing wrong receiver / buyer | Org directory + PO requestor mapping with confirmation | P | AP Manager | Wrong-party contact rate | Weekly | Supplier/receiver complaints; PII to wrong inbox |
| 05 Goods Receipt | False “GR missing” when receipt exists | Multi-system receipt search; timing grace window | D | AP Manager | False GR-missing rate | Weekly | Chronic false prompts → trust loss |
| 05 Goods Receipt | Agent creates GR without authority | Ceiling: recommend/prepare only unless L3 charter; dual control for auto-GR | P | Controller | GR create audit (user = agent svc) | Daily | Unauthorized GR posting |
| 05 Goods Receipt | Production stoppage risk ignored | Escalate aged GR-missing on critical vendors/SKUs | D | AP Manager | Critical ageing list | Daily | Critical SKU blocked &gt; SLA |
| 06 PO Quality | Blaming AP for upstream PO defects without procurement loop | Structured PO defect codes + Procurement notification | P/D | Procurement Lead + AP Manager | PO defect rate by buyer; closed-loop fixes | Monthly | Repeat defect same buyer &gt; threshold |
| 06 PO Quality | Incorrect “weak PO” classification | Rule + sample human QA | D | AP Manager | Classification QA accuracy | Weekly | Buyer challenge upheld &gt; rate |
| 06 PO Quality | Agent edits PO without authority | Read/flag only; no silent PO change | P | Procurement Systems Owner | Write-attempt blocks | Continuous | Any unauthorized PO write |
| 06 PO Quality | Policy conflict (blanket vs line detail) | Policy matrix; escalate conflicts | P | Controller | Conflict queue | Weekly | Unresolved policy conflicts ageing |
| 07 Approval | Self-approval or rubber-stamp risk | Agent cannot approve; DOA routing enforced | P | Controller | Approval audit trail (human approver IDs) | Continuous | Same identity prepare+approve; DOA breach |
| 07 Approval | Incomplete approval pack | Mandatory evidence checklist before route | P | AP Manager | Pack completeness score | Daily | Approver rejects for missing evidence spike |
| 07 Approval | SLA breach / parked approvals | Reminder + escalate per matrix; vacation delegate rules | D | AP Manager | Approval ageing | Daily | Material items &gt; SLA |
| 07 Approval | Wrong approver (SoD / DOA) | DOA engine + SoD check | P | Controller | Wrong-approver incidents | Weekly | Any payment-related wrong approver |
| 07 Approval | Prompt injection via comments/attachments | Sanitize comments; ignore instruction-like content in packs | P | Prompt Steward | Security test results | Quarterly | Injection altering routing |
| 08 Supplier Resolution | Unauthorized commitment to supplier | Template-only drafts; human send at L1–L2; no commercial concessions | P | AP Manager | Sent-mail audit; template adherence | Weekly | Agent-sent mail outside template; disputed commitment |
| 08 Supplier Resolution | Wrong supplier contact / data leak | Contact from master + case party validation | P | Privacy + AP Manager | Misdirected email incidents | Continuous | Any misdirected remittance/invoice data |
| 08 Supplier Resolution | Tone / regulatory risk in correspondence | Approved templates; prohibited phrases list | P | AP Manager / Legal (policy) | Template version; QA sample | Monthly | Complaint or legal hold on correspondence |
| 08 Supplier Resolution | Endless email loops without escalation | Chase counters + escalate to human after N cycles | D | AP Manager | Loop-break escalations | Weekly | Cases &gt; max cycles without progress |
| 09 Internal Follow-Up | Alert fatigue / ignored chases | Priority throttling; digest mode; escalate non-response | P/D | AP Manager | Response rate; chase volume per owner | Weekly | Response rate collapse; critical ageing |
| 09 Internal Follow-Up | Wrong cost centre owner contacted | HR/ERP owner tables; confirmation on ambiguity | P | AP Manager | Wrong-owner rate | Weekly | Repeat misroutes |
| 09 Internal Follow-Up | Shadow IT pressure (side-channel approvals) | Require system actions only; no “approve in email” as control | P | Controller | Control testing of email-approvals | Monthly | Material email-only approvals found |
| 09 Internal Follow-Up | PII in chase notes | Redaction rules for ticket/email bodies | P | Privacy | Scan samples | Monthly | PII policy violation |
| 10 Duplicate & Anomaly | False sense of security (“AI said OK”) | Disclaimers; scoring ≠ fraud guarantee; human for high scores | P | Controller + Internal Audit | User acknowledgment; high-score review completion | Continuous | High-score item paid without review |
| 10 Duplicate & Anomaly | False positives blocking payment | Threshold tuning; whitelist with dual control | D | AP Manager | FP rate; supplier impact | Weekly | Critical supplier blocked erroneously |
| 10 Duplicate & Anomaly | False negatives (true duplicate paid) | Multi-signal detection; post-payment detective match | P/D | AP Manager / Treasury (recovery) | Confirmed duplicate payments; recovery log | Daily / Monthly | Any duplicate payment |
| 10 Duplicate & Anomaly | Model drift in anomaly scores | Gold-set monitoring; recalibration change control | D | Prompt Steward | Drift metrics | Weekly | Score distribution shift beyond band |
| 10 Duplicate & Anomaly | Insider misuse of suppressions | Dual control on suppress/whitelist; audit log | P | Internal Audit | Suppression log review | Monthly | Unapproved suppression on high value |
| 11 Vendor Statement Reconciliation | Forced match hiding true liability | Require evidence for match; age unexplained items | P/D | AP Manager | Unexplained statement items ageing | Weekly | Material unexplained &gt; SLA |
| 11 Vendor Statement Reconciliation | Incorrect “on statement / not in AP” classification | Dual-source rules + sample QA | D | AP Manager | Classification accuracy | Weekly | Supplier dispute from misclass |
| 11 Vendor Statement Reconciliation | Statement file injection / malformed data | Parser sandbox; schema validation | P | Technical Owner | Parse failure / malware scan logs | Per file | Malicious content detected |
| 11 Vendor Statement Reconciliation | Scope creep into payment promises | Outputs are reconciliation cases only — no pay commit | P | AP Manager | Output review | Continuous | Language implying payment commitment |
| 12 Payment Proposal Review | Unauthorized payment release | Human authorization mandatory (default); agent review only | P | Treasury / Controller | Payment release audit (human IDs) | Per run | Any agent-initiated release |
| 12 Payment Proposal Review | Duplicate / anomalous items on proposal | Integrate Agent 10 signals; blocklist holds | P/D | AP Manager | Holds on proposal; release exceptions | Per run | Held item released without dual approval |
| 12 Payment Proposal Review | Wrong bank accounts on proposal | Master-data change detection; recent bank-change hold | P | Treasury | Bank-change hold log | Per run | Payment to newly changed account without dual control |
| 12 Payment Proposal Review | Early pay / discount miss or abuse | Discount logic with audit; policy fences | P/D | AP Manager / Treasury | Discount capture report | Weekly | Material discount leakage or invalid discount taken |
| 12 Payment Proposal Review | Proposal tampering between review and release | Hash/seal proposal; re-validate at release | P | Technical Owner + Treasury | Seal mismatch events | Per run | Any seal mismatch |
| 13 AP Close | Incomplete close checklist | System checklist with evidence links; blocker list | P | Controller / AP Close Lead | Close pack completeness | Per period | Close signed with open blockers |
| 13 AP Close | Incorrect accruals proposals | Accrual logic + human approval; materiality thresholds | P/D | Controller | Accrual proposal vs posted; QA | Per period | Material accrual miss/over |
| 13 AP Close | Period-end cut-off errors | Cut-off rules; late invoice ageing view | P/D | Controller | Cut-off exceptions | Per period | Post-close discovery of cut-off break |
| 13 AP Close | Evidence pack not audit-ready | Mandatory artefacts before “close complete” | P | Internal Audit (std) / Controller (ops) | Pack retrieval test | Per period / Quarterly | Audit exception on missing evidence |
| 14 AP Reporting | Misleading KPIs / vanity metrics | Metric dictionary enforcement; approved definitions only | P | AP Manager + Controller | Scorecard change log | Monthly | Unapproved metric on exec pack |
| 14 AP Reporting | Data lineage break | Source system tags; reconciliation to ERP counts | D | Technical Owner | Lineage / recon break log | Daily | Dashboard ≠ ERP by &gt; tolerance |
| 14 AP Reporting | Confidential data in broad distributions | Audience-based packs; need-to-know | P | AP Manager | Distribution list review | Monthly | KPI pack to unauthorized audience |
| 14 AP Reporting | Stale data presented as live | Timestamp + freshness SLA on every view | D | Technical Owner | Freshness breaches | Continuous | Exec decision on stale critical data |
| 15 Root Cause | Incorrect causal attribution | Require evidence links; human acceptance of RCA | P/D | AP Manager | Accepted vs rejected RCA rate | Monthly | Actions taken on rejected/false RCA |
| 15 Root Cause | Recommendation beyond authority | Draft CARs only; owners assign actions | P | AP Manager | Action assignment audit | Monthly | Agent auto-assigning to executives without gate |
| 15 Root Cause | Privacy in narrative text | Redaction before broad publish | P | Privacy | Sample review | Monthly | Sensitive narrative circulated |
| 15 Root Cause | Analysis paralysis / no action | CAR ageing and effectiveness tracking | D | AP Manager | Open CAR ageing; repeat exception rate | Monthly | Repeat exceptions after “closed” CAR |
| 16 AP Manager Orchestrator | Priority / routing errors at scale | Guardrail policies; human override path; collision detection | P/D | AP Manager | Collision events; mis-priority incidents | Daily | Agent collision on same invoice; material mis-priority |
| 16 AP Manager Orchestrator | Silent raising of autonomy ceilings | Ceilings immutable without dual approval workflow | P | Controller | Ceiling change audit | Continuous | Any unapproved ceiling change |
| 16 AP Manager Orchestrator | Over-orchestration masking specialist failure | Per-agent KPIs remain visible; no single blended vanity score | D | Controller | Scorecard design review | Monthly | Loss of per-agent accountability |
| 16 AP Manager Orchestrator | Kill-switch failure | Documented kill-switch test | P/D | Emergency Operator + Technical Owner | Kill-switch drill log | Quarterly | Kill-switch fails in drill or incident |
| 16 AP Manager Orchestrator | Segregation breach via orchestration tools | Orchestrator cannot approve payments or edit bank master | P | Internal Audit + Controller | Permission review | Quarterly | Permission creep detected |

---

## Control operation notes

1. **Map to your framework:** COSO/SOX narratives can reference this matrix by Agent ID + Risk row.  
2. **Frequency means evidence production cadence**, not how often the control “runs” technically (many run continuously).  
3. **Escalation triggers** should page the Human owner and, for Critical, Controller within the same business day.  
4. **Demotion link:** sustained trigger breaches feed Responsibility Model demotion reviews.  
5. **Illustrative thresholds** (%, amounts, N) must be set in local policy — do not treat placeholders as Evidence Room guarantees.

---

## Related documents

- `Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`  
- `Controls/RISK_REGISTER.md`  
- `Governance/RACI_TEMPLATES.md`  
- `KPI_Measurement/KPI_FRAMEWORK.md`  
- Agent Library charters (`AGENT_01` … `AGENT_16`)
