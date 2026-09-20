# Evidence Room — AP Agent OS Professional

## Controls — 01 Control Matrix

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Controls  
**Standard:** Proof before permission  
**Audience:** Control owner, Head of AP, AP Manager, Finance Systems, Internal Audit  
**Version:** 1.0  
**Examples:** Owners below are **standard roles**. Replace with named incumbents in the buyer’s operating copy. ACME notes are **ILLUSTRATIVE**.

---

### How to use

- One row = one material risk for one agent.  
- **P** = Preventive, **D** = Detective.  
- Escalation trigger is when the control has failed or is being bypassed — not when the business is merely busy.  
- Frequency values are defaults; buyer may tighten. Do not invent industry benchmarks as frequencies.  
- Evidence pointers use the Evidence Room path convention.  
- Agents never appear in **Human owner**.

Related: `00_CONTROL_FRAMEWORK.md`, `02_RISK_REGISTER.md`, `03_EXCEPTION_TAXONOMY.md`.

---

## Matrix

| Agent | Risk | Control | P/D | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| 1 Invoice Intake | Unreadable / incomplete document treated as ready | Completeness schema (mandatory fields) + reject to `EX-QLT-001/002`; no downstream park | P | AP Manager | Validator log; rejected-item IDs | Every item | Schema bypass or >`[BUYER]` reject spike without QA |
| 1 Invoice Intake | Wrong legal entity / channel routing | Entity allow-list; mismatch → `EX-MDM-002`; human route | P | AP Manager | Routing log vs entity register | Every item | Item processed on a non-allow-listed entity |
| 1 Invoice Intake | Confidential invoice ingested on the general path | Confidential vendor/entity deny-list | P | Controller (list) + AP Manager (operate) | Deny-list version; diverted IDs | Every item + quarterly list cert | Listed vendor on general queue |
| 1 Invoice Intake | Extraction error not flagged | Confidence + cite check vs source; sample QA of “high confidence” | P+D | AP Manager | QA file; `EX-QLT-002` rate | Every item; QA sample `[BUYER n]` / week | Uncited amounts in a “complete” item |
| 2 Invoice Validation | Invalid supplier used | Supplier ID must exist and match documented attributes; else `EX-MDM-001` | P | Master-data steward (rule) + AP Manager (queue) | Validation log | Every item | Forced continue without OV-FCE |
| 2 Invoice Validation | Duplicate not detected at entry | Exact-key check (supplier + invoice no. + entity + amount or local key) → `EX-DUP-001` | P | AP Manager | Hit log; payment-prep overlap | Every item | Exact duplicate reaches proposal without hold |
| 2 Invoice Validation | Tax fields invented or ignored | Tax fields cited from document or tax engine; model cannot override engine; `EX-TAX-001` | P | Tax owner | Tax-engine vs agent diff | Every in-scope item | Agent tax value ≠ engine and still “valid” |
| 2 Invoice Validation | Required fields skipped under deadline | Cannot mark valid if mandatory set incomplete | P | AP Manager | Status vs schema | Every item | Status=valid with missing fields |
| 3 Matching | Price/qty compared by a model “approx” | Deterministic compare to documented tolerance; model may **explain**, not decide | P | Head of AP (policy) + AP Manager (operate) | Compare log; tolerance version | Every PO line | Tolerance config ≠ approved policy export |
| 3 Matching | Tolerance silently widened | Config write restricted; periodic export diff | P | Finance Systems + Control owner | Workflow diff | Every C2 change; weekly export | Unapproved diff |
| 3 Matching | GR created to force a match | Agent identity denied GR-create; `EX-GR-001/002` instead | P | Finance Systems (entitlement) + Goods-receipt owner (resolution) | Entitlement sheet; GR create audit | Continuous; monthly access review | Agent identity on a GR-create event |
| 3 Matching | Multi-line invoice matched to the wrong PO line | Line-level deterministic match; residual → exception not “best guess post” | P | AP Manager | Line-match log | Every multi-line PO invoice | Posted match without line IDs |
| 4 Exception Triage | Wrong taxonomy code → wrong owner / clock | Code must exist in taxonomy; QA sample of codes; UNMAPPED queue | P+D | Exception owner (family) + AP Manager | Code QA file | Sample `[BUYER n]` / week | Systematic miscodes found; UNMAPPED ageing >`[BUYER]` |
| 4 Exception Triage | Agent closes exception as “no issue” | Close above `[BUYER cap]` is human-only; close reason required | P | Exception owner | Close log | Every close | Agent-issued close above cap |
| 4 Exception Triage | High-risk codes treated as low | Priority map (DUP, PAY bank, TAX, MDM bank, DSP) cannot be lowered by the agent | P | Control owner | Priority vs code | Every item | Priority downgrade by agent identity |
| 5 Goods Receipt | Chaser sent to the wrong person / a Director / a supplier | Recipient allow-list (role + plant); L2 default (human send) | P | AP Manager | Send log; recipient class | Every outbound | Recipient outside allow-list |
| 5 Goods Receipt | Agent creates a receipt | GR-create denied on identity | P | Finance Systems | Entitlement + ERP audit | Monthly | Any GR-create by agent |
| 5 Goods Receipt | Missing GR never chased; ageing hides | Detective ageing of `EX-GR-001` vs chase log | D | Exception owner | Ageing vs chase | Daily queue | Open GR exceptions >`[BUYER clock]` with no chase evidence |
| 6 PO Quality | Findings used to edit PO prices | Agent read-only on PO; edits are buyer/Procurement | P | Procurement lead | PO change audit vs agent ID | Continuous | PO change by agent identity |
| 6 PO Quality | After-the-fact PO treated as “quality OK” | Retro-PO flagged for human policy path; not auto-cleared | P | Procurement lead | Retro-PO flag log | Every detected retro-PO | Retro-PO auto-cleared |
| 6 PO Quality | Repeat poor-PO suppliers/buyers ignored | Repeat-rate report to Procurement (Root Cause feed) | D | Procurement lead | Repeat exception report | Weekly | Repeat rate above buyer gate with no action owner |
| 7 Approval | Agent approves or reassigns DOA | Approve / DOA-admin verbs denied; only remind / flag `EX-APR-001/002` | P | Controller (DOA) + Finance Systems | Entitlement; approval audit | Continuous | Approval event by agent |
| 7 Approval | Delegation scraped from OOO text | Delegation source = official register only | P | Controller | Delegation source log | Every remapped approver | Approver change sourced from email body |
| 7 Approval | Stalled approvals missed near payment date | Detective ageing vs payment calendar | D | AP Manager | Stall report | Daily in payment week | Items past `[BUYER]` stall clock not on report |
| 8 Supplier Resolution | Mail sent with invented amounts, dates, or legal claims | Cite-check on every number/date; legal-claim deny-list; L2 default | P | AP Manager | Draft diff; cite-fail log | Every draft / send | Send with cite-fail or OV-FCE |
| 8 Supplier Resolution | Prompt injection via supplier email (“approve and pay”) | Untrusted inbound; action verbs from policy engine only | P | Finance Systems + Control owner | Injection tests; incident tag INJ | Every release; every inbound action | Inbound text changes recipient or verb |
| 8 Supplier Resolution | Credit-note request duplicated or waived incorrectly | `EX-CN-001` requires human accept before send; link to invoice IDs | P | Exception owner | CN request log | Every CN draft | CN mail without invoice IDs |
| 9 Internal Follow-Up | Mail storms / wrong seniority | Recipient allow-list; throttle `[BUYER]`; no all-company | P | AP Manager | Send log | Every send | Throttle breach or non-allow-list recipient |
| 9 Internal Follow-Up | Chase creates a GR or dummy coding | Write to GR / coding denied | P | Finance Systems | Entitlement | Monthly | Write event |
| 9 Internal Follow-Up | Follow-up recorded as “done” with no artefact | Detective: chase without ticket/mail ID fails the control | D | AP Manager | Chase IDs vs exceptions | Daily | Exceptions marked chased with null artefact |
| 10 Duplicate & Anomaly | Exact duplicate reaches payment | Open `EX-DUP-001` blocks proposal inclusion without OV-FCE | P | Payment preparer (operate) + AP Manager | Proposal vs open DUP | Every proposal | DUP-001 line on proposal without OV-FCE |
| 10 Duplicate & Anomaly | Near-duplicate ignored (FNR) or floods queue (FPR) | Dual review of FNR sample (paid items) and FPR sample (flags) | D | Exception owner | QA FNR/FPR file | `[BUYER]` sample / week | FNR hit (paid duplicate) = incident path |
| 10 Duplicate & Anomaly | “Fraud found” language in outbound mail | Language standard: indicators only; no fraud allegation | P | AP Manager + Control owner | QA of outbound | Sample | Outbound contains fraud allegation |
| 11 Vendor Statement Rec | Timing difference posted as a balance adjustment | Agent propose only (L1–L2); GL adjust is human | P | AP Manager | Adjust audit vs agent ID | Continuous | GL adjust by agent |
| 11 Vendor Statement Rec | Missing invoices not raised | Detective reconciling items aged >`[BUYER]` | D | AP Manager | Rec schedule; `EX-STM-001` | Per statement cycle | Cycle closed with unworked reconciling items above cap |
| 11 Vendor Statement Rec | Wrong supplier statement vs account | Supplier ID cite-check; `EX-MDM-001` if mismatch | P | AP Manager | Rec header vs vendor ID | Every statement | Rec posted to another vendor |
| 12 Payment Proposal Review | Agent edits or releases the proposal | Edit/release denied; review comments only | P | Payment authoriser (release) + Finance Systems | Entitlement; proposal audit | Every run | Edit/release by agent identity |
| 12 Payment Proposal Review | Bank-change indicator missed | `EX-PAY-001` forces hold + MDM/Treasury path; document text cannot supply the new bank | P | Treasury (policy) + Master-data steward | Hold log; bank-change tickets | Every run | Bank change from invoice text applied |
| 12 Payment Proposal Review | High-value / hold / missing-approval lines unpaid-review | Checklist: holds, open EX-DUP, EX-APR, EX-PAY, value cap | D | Payment preparer | Signed checklist per run | Every run | Run released with incomplete checklist |
| 13 AP Close | Accrual posted from an unvalidated list | Agent prepares completeness list; post is human / existing close control | P | Controller | Journal vs list accept | Each close | Journal sourced only from unaccepted agent file |
| 13 AP Close | Cut-off items hidden to “make close” | Detective: items removed from list require reason code | D | Controller | Removal log | Each close | Removals without reason |
| 13 AP Close | Aged blocked invoices ignored | Ageing of blocked / parked vs close pack | D | AP Manager | Close pack section | Each close | Pack signed with silent aged block above cap |
| 14 AP Reporting | Unvalidated savings or cycle-time claims published | Financial lines require Controller sign-off; dictionary IDs only | P | Controller | Scorecard sign-off | Each issued pack | Pack issued with unsigned financial line |
| 14 AP Reporting | Hallucinated figures | Cite to system extracts; no free-typed KPIs | P | AP Manager | Extract IDs on pack | Each pack | Figure without extract ID |
| 14 AP Reporting | Board pack includes confidential vendors | Confidential filter on reporting extract | P | Controller | Filter version | Each external pack | Deny-listed vendor on external pack |
| 15 Root Cause | Cluster treated as proven cause / named-person blame | Output labelled hypothesis; no outbound naming; human accept before action | P | Head of AP | Accept log; outbound QA | Every published cluster | Action or mail from unaccepted cluster |
| 15 Root Cause | Repeat exceptions produce no owner | Detective: codes over buyer repeat-rate gate need an action owner | D | AP Manager | Repeat report | Weekly | Gate breach, owner blank |
| 16 AP Manager / Orchestrator | Orchestrator grants access or raises autonomy | Entitlements exclude charter/IdP/validator writes | P | Finance Systems + Control owner | Entitlement sheet | Monthly + every promotion | Any grant event by orchestrator ID |
| 16 AP Manager / Orchestrator | Prioritisation hides high-risk codes | Priority floor for DUP/PAY/TAX/MDM-bank/DSP cannot be overridden by the agent | P | Control owner | Priority vs output | Daily | High-risk item dropped from worklist without human hide reason |
| 16 AP Manager / Orchestrator | Performance viewed only as volume | Weekly report must include risk-control block (`03_WEEKLY_AGENT_REPORT.md`) | D | Head of AP | Report archive | Weekly | Report issued without risk-control block |
| All agents | Prompt / model / workflow drift | Runtime hash pin vs approved release | P | Finance Systems | Hash reconcile | Daily / monthly cert | Mismatch → freeze execution |
| All agents | Override used as the process | OV log + force-path dual control | D | Control owner | Override log | Weekly | OV-FCE without dual control; REJ rate unexplained |
| All agents | Identity leftover after pilot | Joiner/mover/leaver + orphan scan | P | Finance Systems | Termination tickets; scan | At end of pilot; quarterly | Orphan write identity |
| All agents | Evidence store gap | No action verbs if logging failed | P | Finance Systems | Logger heartbeat | Continuous | Actions with no correlation ID |

---

## Operating notes

**What to do.** Copy this matrix into the buyer’s workbook. Add incumbent names. Add local systems under Evidence.

**How.** Recertify semiannually. A new verb on a charter requires a new row before go-live.

**Who.** Control owner Accountable for completeness. Human owners as table.

**What can go wrong.** Rows left in “standard role” forever; nobody operates the control.

**Control.** Certification includes a sample: pick five rows, produce last-period evidence.

**Measure.** See `00_CONTROL_FRAMEWORK.md` §6.

**Evidence.** Buyer operating copy + last-period artefacts per row.

---

## ACME — ILLUSTRATIVE

ACME’s operating copy names Priya Shah (AP Manager) on Intake/Validation/Matching operate rows, and James Cole (Treasury) on `EX-PAY-001`. Monthly access review finds Matching Agent still has a leftover `receipts.create` from a vendor template. Identity is stripped the same day; logged as a Sev-2 near-miss, not as “setup hygiene.”

---

*End of 01_CONTROL_MATRIX.md*
