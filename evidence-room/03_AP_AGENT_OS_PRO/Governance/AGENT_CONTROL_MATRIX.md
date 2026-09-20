# Agent Control Matrix

**Product:** AP Agent OS — Evidence Room  
**Roster:** The sixteen agents in `../Agent_Library/00_AGENT_STACK_OVERVIEW.md`  
**Use with:** `GOVERNANCE_FRAMEWORK.md`, `RISK_REGISTER.md`, each agent charter  
**Columns:** Agent, Risk, Control, Preventive/Detective, Human owner, Evidence, Frequency, Escalation trigger  

Agents assist at the chartered autonomy level (default L0/L1). Humans remain Accountable. Duplicate & Anomaly flags are hypotheses, not fraud findings. Payment Proposal Review annotates; it does not authorise payment.

**Northline owners (illustrative, Cleveland SSC):**  
AP Process Owner / AP Manager — Marcus Chen  
Controller — Priya Shah  
AP Operations Lead — Elena Voss  
AP Controls Lead — designate under Shah  
Exception Desk Lead — designate under Voss  
Procurement Operations Lead — James Okonkwo  
Treasury / Payments Lead — Hannah Reid  
Assistant Controller — Payables — designate under Shah  
Systems — David Park  
Finance Transformation Lead — implementation designate  

Frequencies are operating defaults. Tighten after incidents. First release: L0/L1 unless a signed promotion record exists.

---

## 01 — Invoice Intake

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Invoice Intake | Inbound item not registered (silent drop) | Channel count vs stub/rejection log same day | P | Voss | Intake reconciliation | Daily | Overnight unfiled items or count gap > 0 |
| Invoice Intake | Wrong document class (statement/credit as invoice) | Classification checklist; human accept on type at L1 | P | Voss | Type vs labelled sample | Weekly | Statement or credit entered the match-ready queue |
| Invoice Intake | Extracted amount, invoice number, or bill-to invented | Citations + confidence floors; EX-OCR / quality fail | P | Voss | Field accuracy vs gold-label | Each test cycle; weekly sample | Ready required field without citation |
| Invoice Intake | Source mail deleted so the trail is gone | Least privilege: no delete; copy-and-file | P | Park | Service-principal access review | Quarterly + on change | Delete right present |
| Invoice Intake | Untrusted PDF/email treated as an instruction | Content/instruction split; no arbitrary URL fetch | P | Test lead | Injection pack | Each release | Injection success |
| Invoice Intake | Full mailbox sent to a model | Item-scoped prompts; privacy inventory | P | Privacy | Prompt-size / item-id logs | Weekly sample | Batch mailbox prompt detected |

---

## 02 — Invoice Validation

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Invoice Validation | Incomplete invoice marked posting-ready | Completeness checklist; no constructed invoice numbers | P | Voss | Fail packs + posted-missing-field query | Weekly | Posted invoice missing a required face field |
| Invoice Validation | Wrong legal entity not failed | Bill-to legal name / registered number test | P | Shah | EX-ILE sample and misses | Weekly | Any posted entity miss |
| Invoice Validation | Wrong or blocked supplier passed | Master lookup; unique unblocked account | P | Voss | EX-WSP / EX-MDI packs | Weekly | Posted to an unintended account |
| Invoice Validation | Tax fields not compared; ambiguous tax treated as settled | Flag only; Tax decides ambiguous / cross-border | P | Shah / Tax | Compare note; tax-master change log vs agent id | Weekly | Agent id on tax master; “compliant” wording |
| Invoice Validation | Bank details on face/message differ from master and are ignored | Face/message-to-master compare → EX-BNK; no master write | P | Shah | EX-BNK log | Continuous | Difference found after proposal annotation |
| Invoice Validation | Excessive fails on usable invoices (noise) | FPR review; checklist versioning | D | Voss | Validation FPR | Weekly | FPR above scorecard watch |

---

## 03 — Matching

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Matching | Invoice recommended/posted above received quantity | 3-way / GR tests; EX-MRX / EX-PRX / EX-QTM | P | Voss | GR snapshot on sample | Weekly; 100% in pilot | Qty > received on a posted or ready-to-post item |
| Matching | Price variance outside tolerance treated as clean | Signed tolerance table; EX-PRM; agent cannot edit table | P | Shah | Match worksheet | Weekly sample | Outside-tolerance ready without waiver |
| Matching | Closed or exhausted PO treated as open | Status and residual tests | P | Voss | PO snapshot | Weekly | Ready against closed/exhausted PO |
| Matching | PO taken from operator memory or last-used list | PO from face or buyer-confirmed reference only | P | Voss | PO-source field | Weekly | Source = history list |
| Matching | Agent invents a GR or rewrites a PO | No GR-create / PO-write tools; hand off to 05 / 06 | P | Park | Tool allow-list | Each release | Write attempt |
| Matching | Clean-match post at L3 without a current promotion record | Autonomy gate; default L1 recommend only | P | Chen / Shah | Promotion record | Continuous | Post by agent principal without record |

---

## 04 — Exception Triage

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Exception Triage | Wrong taxonomy code hides the blocking issue | Master tree order; related-code field | P | Exception Desk | Code vs gold-label | Weekly | Blocking-code accuracy below floor |
| Exception Triage | EX-AGE replaces the original code | Ageing adds; does not replace | P | Exception Desk | Dual-code presence | Weekly | EX-AGE as sole code |
| Exception Triage | Agent resolves, waives, or posts to clear the queue | No resolve/waive/post tool — names owner, action, clock | P | Shah | Tool allow-list | Each release | Waiver or post by agent |
| Exception Triage | Critical codes treated as routine | Risk-level route to Controls / AP lead | P | Shah | Route log | Continuous | EX-BNK / EX-ILE / EX-DUP / EX-DOA closed by processor only |
| Exception Triage | Oscillating codes reset the SLA clock | Reason required to reset; Orchestrator clock | D | Exception Desk | Age vs code-change log | Weekly | > 2 resets without reason |

---

## 05 — Goods Receipt

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Goods Receipt | Missing/partial receipt not detected | Receipt-required list + qty compare | P | Plant finance liaison | EX-MRX / EX-PRX objects | Daily | Posted goods invoice with no GR |
| Goods Receipt | Email “goods are here” used as a receipt | SOP: system GR only; packet forbids email-GRN post | P | Voss | Posted-without-GR query | Daily | Any hit |
| Goods Receipt | Agent creates a GR | No GR-write tool | P | Park | Tool allow-list | Each release | Write attempt |
| Goods Receipt | Chase sent to the wrong plant / leaked pricing | Recipient from PO plant/receiver table | P | Liaison | Recipient vs PO | Weekly | Off-table recipient |
| Goods Receipt | Chase fatigue; genuine blocks ignored | Cap + escalate to Exception Desk / AP lead | D | Exception Desk | Chase vs age | Weekly | EX-AGE on EX-MRX without lead touch |

---

## 06 — PO Quality

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| PO Quality | Defective PO silently rewritten by the agent | Read-only; buyers decide; no PO change tool | P | Okonkwo | Tool allow-list | Each release | PO write attempt |
| PO Quality | Wrong defect class (commercial price vs UOM) | Controlled defect list `AP-POQ-001` | P | Okonkwo | Defect vs exception join | Weekly | Repeat misclass vs Agent 04 |
| PO Quality | Prospective hints become a second approval gate buyers ignore | Wave/charter: retrospective L0 until trust evidence | P | Okonkwo | Charter autonomy level | On change | Prospective L1 without charter |
| PO Quality | Vendor-on-PO ≠ intended payee not raised | Payee vs PO vendor compare → hand to Validation / Vendor Master | D | Okonkwo / Shah | Defect records | Weekly | Invoice later posted to unintended payee with no prior defect |
| PO Quality | Noise to buyers (every PO flagged) | FPR by defect class; change-controlled list | D | Okonkwo | Weekly defect mix | Weekly | FPR above agreed watch |

---

## 07 — Approval

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Approval | Required DOA instance missing and item marked ready | DT-POST; EX-APM | P | Shah | Approval instance on sample | Weekly | Missing instance on posted/ready item |
| Approval | Agent approves or raises a limit | No approve / DOA-edit tool | P | Shah | Tool allow-list + approval user-id | Continuous | Agent principal on an approval |
| Approval | Stale DOA, expired delegate, or split to evade a limit | EX-DOA tests; split heuristic | D | Shah | EX-DOA packs | Weekly | Suspected split |
| Approval | Email/chat yes treated as the system of record | Compensating-control list or remain EX-APM | P | Shah | Approval source field | Weekly | Source = email without waiver |
| Approval | Chase spam trains approvers to ignore packets | Frequency caps; ageing to AP lead | D | Voss | Chase counts | Weekly | > agreed chases per object |

---

## 08 — Supplier Resolution

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Supplier Resolution | Draft negotiates price or promises payment | Template slots; forbidden-claims list | P | Voss | Sent-mail review | Weekly sample | Payment date or price acceptance in a draft/send |
| Supplier Resolution | Wrong supplier contacted | Recipient from vendor master, not letterhead alone | P | Voss | Recipient vs master | Weekly | Off-master recipient |
| Supplier Resolution | Unreviewed external send at L1 | Human release of send until a send-promotion record | P | Chen | Send-approver id | 100% until promotion | Send without human id |
| Supplier Resolution | Injection in supplier reply alters the next draft or a tool call | Content/instruction split; templates | P | Test lead | Injection tests | Each release | Injection success |
| Supplier Resolution | Free-text on EX-DIS / EX-BNK creates an apparent admission | Template legal review for those codes | P | Shah | Template version | On template change | Free-text send on those codes |
| Supplier Resolution | Agent writes vendor bank details from a “please update” mail | No master-write; EX-BNK procedure | P | Shah | Master change log vs agent id | Continuous | Any agent write |

---

## 09 — Internal Follow-up

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Internal Follow-up | Incomplete fact pack wastes the owner’s time / gets a casual yes | Packet completeness checklist | P | Exception Desk | Packet sample | Weekly | Accept-without-packet |
| Internal Follow-up | Casual internal yes used as GR, PO re-open, or approval | SOP forbids; source-of-record tests | P | Voss | Posted-without-GR / email-approval queries | Daily | Any hit |
| Internal Follow-up | Wrong buyer/receiver; commercial data leaked | Recipients from PO / DOA / plant tables | P | Exception Desk | Recipient vs table | Weekly | Off-table recipient |
| Internal Follow-up | Agent changes PO, GR, or coding | No write to those objects | P | Park | Tool allow-list | Each release | Write attempt |
| Internal Follow-up | SLA clock runs without a named human owner | Orchestrator owner required | D | Chen | Owner-blank query | Daily | Blank owner > 1 working day |

---

## 10 — Duplicate & Anomaly

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Duplicate & Anomaly | Exact duplicate proceeds to ready/pay | Rule book; EX-DUP / flag blocks 03 proceed and 12 proceed | P | Controls Lead | Flag + candidate ids | 100% of exact-key fires | Duplicate posted or listed clean on a proposal |
| Duplicate & Anomaly | Near-duplicate / other-site / OCR collision missed | Secondary rules (site/group, fuzzy number) | D | Controls Lead | EX-PDUP / rule-fire review | Weekly | Posted pair later judged a miss |
| Duplicate & Anomaly | Flag described or actioned as “fraud detected” | Language rule; flag is a hypothesis; human Clear/Confirm/Escalate/Defer | P | Shah | UI/SOP/report copy | Each release | “Fraud” in user-facing output |
| Duplicate & Anomaly | Agent clears its own high-value flag or voids an invoice | No clear/void/delete tool; SoD on confirm | P | Shah | Tool allow-list + user-id compare | Continuous | Agent clear; or keyer = confirmer without note |
| Duplicate & Anomaly | Model hint flags without a deterministic rule | Hint cannot flag alone at commissioning | P | Controls Lead | Rule-id required on flags | Weekly | Flag with rule-id = HINT only |
| Duplicate & Anomaly | Noisy rules train people to Clear without reading | FPR by rule; change-controlled thresholds | D | Controls Lead | Weekly FPR | Weekly | FPR above watch on a high-volume rule |

---

## 11 — Vendor Statement

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Vendor Statement | Invoice created from a statement line | Forbidden action; pair or request the invoice | P | Reconciliations Lead | Created-from-statement query | Daily | Any hit |
| Vendor Statement | Wrong entity open-items used | Entity filter mandatory | P | Reconciliations Lead | Entity on worksheet | Weekly | Cross-entity pair accepted |
| Vendor Statement | Outbound pack leaks other entities’ open items | Pack scoping | P | Privacy | Outbound review | Weekly sample | Cross-entity data outbound |
| Vendor Statement | Chronic discrepancy aged without an owner | EX-AGE + AP lead | D | Voss | Aged EX-STD list | Weekly | Past trigger, no owner |
| Vendor Statement | Agent posts a balancing entry to “make it agree” | No GL/AP write | P | Shah | Tool allow-list | Each release | Write attempt |

---

## 12 — Payment Proposal Review

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Payment Proposal Review | Agent releases, approves, or transmits a payment | No release/transmit tools; dual human release | P | Reid / Shah | Tool allow-list + payment log vs agent id | Continuous | Agent id on a release or file |
| Payment Proposal Review | Hold-worthy item (EX-BNK, EX-DIS, open dup flag) omitted from annotation | Completeness vs hold-worthy query | P | Voss / Controls | Candidate vs query | Each run | Omission of EX-BNK / EX-DIS / open Confirm-dup |
| Payment Proposal Review | Annotation worded “safe to pay” or “fraud-free” | Language: annotate / hold / unclear only | P | Shah | UI copy review | Each release | Forbidden wording |
| Payment Proposal Review | Both legs of a duplicate listed without a note | Cross-check Agent 10 pairs | D | Controls Lead | Pair vs list | Each run | Both legs listed clean |
| Payment Proposal Review | Hold lift by the agent | No lift tool; policy holds stay human | P | Shah | Hold log vs agent id | Continuous | Agent lift |

---

## 13 — AP Close

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| AP Close | Controller attests from an incomplete checklist | Controlled checklist; gaps visible; agent does not attest | P | Assistant Controller | Checklist completeness | Each close | Attestation with open Critical gap |
| AP Close | Accrual candidates omitted or double-counted | Candidate rules + source ids; human accepts list | P | Assistant Controller | List vs source query | Each close | Material miss found after attest |
| AP Close | Agent posts accruals or closes the period | No period-close / GL-post tool | P | Shah | Tool allow-list | Each release | Write attempt |
| AP Close | Cut-off invoices forced into the wrong period | Cut-off calendar is an input, not agent judgement | P | Shah | Period on candidate vs calendar | Each close | Period override by agent |
| AP Close | Close pack described as “books accurate” | Language rule | P | Shah | Cover sheet | Each close | Accuracy/compliance claim |

---

## 14 — AP Reporting

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| AP Reporting | Vanity or forbidden tiles (ROI, fraud, guaranteed savings) | Tile catalogue from KPI framework; language filter | P | Shah | Dashboard acceptance tests | Each release | Forbidden title or D6 filled from hours |
| AP Reporting | Formula drift mid-window | Locked formula version on the scorecard | P | Chen | Header formula version | Weekly | Unversioned number in the pack |
| AP Reporting | Grey (unreported) shown as zero | Grey is first-class; no silent zero | P | Finance BP | Tile state | Monthly | Sav_val or Dup_pay_prev as 0 without method |
| AP Reporting | Unmasked IBAN or EX-BNK detail on a general report | RLS + masking | P | Privacy | Access test | Monthly + on change | Processor role sees full bank numbers |
| AP Reporting | Blended “accuracy” hides a Critical FNR | Separate detectors; no single agent score | P | Shah | P0 layout | Each release | Blended accuracy on overview |

---

## 15 — Root Cause

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Root Cause | Cluster presented as a decided process change | Propose only; process owner accepts/rejects | P | Transformation Lead | Decision log | Monthly | Change implemented from a cluster with no accept record |
| Root Cause | Wrong cluster (mix mistaken for a cause) | Minimum n; mix commentary required | P | Transformation Lead | Cluster pack | Weekly / monthly | Action on n < agreed floor |
| Root Cause | Agent edits tolerances, DOA, or templates to “fix” a cluster | No policy-write tools | P | Shah | Tool allow-list | Each release | Write attempt |
| Root Cause | Supplier or employee named as at-fault in a wide report | Aggregation and access rules | P | Privacy / Chen | Distribution list | Monthly | Named-person blame in a general pack |
| Root Cause | Hours or recovery in a cluster report labelled as savings | Financial language rule | P | Shah | Report copy | Monthly | “Savings delivered” without attestation |

---

## 16 — Orchestrator

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| Orchestrator | Work object has no human owner; SLA is theatre | Owner mandatory; blank-owner query | P | Chen | Owner-blank list | Daily | Blank > 1 working day |
| Orchestrator | Routes an object to an agent action that is out of charter (e.g. pay release) | Allowed-action table per agent and autonomy level | P | Chen / Shah | Route vs charter | Continuous | Route to a forbidden action |
| Orchestrator | Becomes a second ledger (posts, vendor changes, cash) | Explicit exclusions; ERP remains accounting SoR | P | Shah | Tool allow-list | Each release | Accounting write |
| Orchestrator | Clock reset to hide ageing | Reset requires reason + role | D | Voss | Reset log | Weekly | Pattern of resets on Critical codes |
| Orchestrator | Evidence URI missing so packs cannot be rebuilt | URI required before status `ready` / `closed` | P | Shah | Completeness query | Daily | Ready/closed without URI |
| Orchestrator | Privilege to reassign ownership used to self-clear SoD | Reassign logged; SoD pairs still enforced | P | Shah | Reassign log | Weekly | Reassign that collapses X4 SoD or BNK SoD |

---

## How to use this matrix

1. Complete **local named owners** before shadow. Role titles from the stack overview are defaults, not vacancies.  
2. Add a row when a new tool or autonomy level is granted. Do not reuse an old row for a new write path.  
3. Escalation triggers feed the weekly report, the risk register, and the incident path.  
4. Accepted residual risk is written on `RISK_REGISTER.md`.  
5. Promotion from L1 → L2/L3 uses `../Agent_Library/AUTONOMY_PROGRESSION.md` plus this matrix’s write-path rows.

Northline Wave 1 (Agents 01, 02, 03, 04, 10, 16 at L0/L1): treat any production write by an agent principal as a Critical breach until a promotion record exists.
