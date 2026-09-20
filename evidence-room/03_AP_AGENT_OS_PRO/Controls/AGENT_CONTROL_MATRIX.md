# Agent control matrix

**Evidence Room · AP Agent OS Pro**  
Version 1.0 · September 2026 · Licensed material · ERP-agnostic  
Answers: *How control? Who owns it? What can go wrong? What evidence?*

---

## How to use this matrix

This is the standard control catalogue for the product stack A01–A16 (`../Agent_Library/00_AGENT_STACK_OVERVIEW.md`). Copy it into the client control map (`../Process_Mapping/TEMPLATES.md`) and bind local names, systems, and frequencies.

- **Preventive** stops the event. **Detective** finds it after or beside the fact. Prefer a preventive control for money, identity, and SoD.
- **Human owner** is Accountable for the control operating. The agent is never the owner.
- **Evidence** is what Internal Audit picks up. If it is not produced, the control did not operate.
- **Escalation trigger** is the point the owner must notify the next role the same day unless stated otherwise.

Add local controls. Do not delete a standard control without a written replacement and a residual-risk acceptance.

**Hard control (all environments):** payment authorisation, release, and transmission remain human. See **C-A12-01**. This control is not waivable in this toolkit.

Related risks: `RISK_REGISTER.md`. Method: `../Process_Mapping/ER_METHODOLOGY.md`. Governance: `../Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`. Autonomy levels: `../Agent_Library/RESPONSIBILITY_MODEL.md`.

---

## Cross-cutting controls (apply to every agent)

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| All | Unowned agent action | Named human owner on the canvas / charter; agent cannot be Accountable | Preventive | Process owner | Signed canvas | On create / Step 10 | Canvas in production without a named owner |
| All | Privilege creep | Least-privilege identity; Level 0 is read-only | Preventive | AI product owner | Access listing vs canvas tools | Quarterly + on change | Write at Level 0; unused powerful entitlement |
| All | Silent model/workflow change | Version pin + change record | Preventive | AI product owner | Version tuple in A16 / A14 pack | Every release | Unpinned model id or vendor-side swap detected |
| All | Missing audit trail | Mandatory logging of action, versions, identity, object | Detective | Control owner | Log completeness report | Daily digest | Execute-class action without a log row |
| All | Prompt injection via invoice/email | Instructions isolated from content; tool allow-list; injection cases in golden set | Preventive | AI product owner | Allow-list + golden-set results | Every recertification | Tool call attributed to document text |
| All | Hallucinated identifier used downstream | Schema + grounding: PO/vendor/tax/bank must exist in retrieved records | Preventive | AI product owner | Validation-fail log | Continuous | Invented PO, vendor, tax ID, or IBAN accepted |
| All | SoD collapse via service account | Agent identity on the SoD matrix; no extract+override+pay combine | Preventive | Control owner | SoD report | Quarterly | Combined entitlements found |
| All | Failed recertification still executing | Auto step-down to last certified autonomy level | Preventive | Control owner | Cert pack + A16 gate | Quarterly / on fail | Level 3/4 continues after failed cert |
| All | Unauthorised promotion | Only Step 10 / Responsibility Model register; A16 may not promote | Preventive | CFO + control owner | Register extract | Quarterly | Level change without signed pack |

---

## A01 — Invoice Intake

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A01 | Invoice lost or double-filed across channels | Deterministic de-duplication of intake message-id / hash before A10 | Preventive | AP Intake Lead | Intake unique-key log | Continuous | Same hash filed twice; portal+email pair not linked |
| A01 | Unofficial mailboxes bypass the channel | Channel allow-list; unknown sources to a quarantine queue | Preventive | AP supervisor | Quarantine register | Daily | Recurring unofficial mailbox volume |
| A01 | Statement or reminder treated as an invoice | Classify before create; A01 does not create a payable from a statement | Preventive | AP Intake Lead | Create events only post-classification | Continuous | Payable created from a statement |
| A01 | Hallucinated PO / tax / bank in extract | Identity fields cannot be filled from the model alone; must match retrieved or stay blank for human | Preventive | AP Intake Lead + AI owner | Validation rejects | Continuous | Hallucination incident |
| A01 | Invoice image leaves the tenant | Intake only to approved store; DLP on outbound | Preventive | Security + AP Manager | DLP / store access log | Continuous | Image outside the tenant |

---

## A02 — Invoice Validation

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A02 | Wrong-entity or wrong-vendor ready-to-post | Recommend only until envelope; tax-id / bill-to checks | Preventive | AP Quality Lead | Accept/reject + candidates | Continuous | Posted to an entity the invoice is not addressed to, outside policy |
| A02 | Wrong tax treated as a coding nit | Certified tax matrix first; residual above threshold to Tax, not AP clerk | Preventive | Tax lead | Matrix version + residual queue | Continuous | Threshold breach handled only in AP |
| A02 | Invalid cost object / coding | Deterministic master check; new supplier or new GL forces human | Preventive | Controller | Rejects + policy version | Continuous | Posted to a closed cost object |
| A02 | Agent files or amends a tax return | No tax-authority tools on the allow-list | Preventive | Tax lead | Allow-list | Quarterly | Any filing-adjacent call |

---

## A03 — Matching

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A03 | Over-tolerance match treated as matched | Deterministic compare to *certified* tolerance table; model does not decide the match | Preventive | AP Matching Lead | Match log: PO/GR/invoice + tolerance version | Continuous | Match executed outside table |
| A03 | Unofficial variance list encoded | Informal lists retired; only certified table | Preventive | Control owner | Table certification | Quarterly | Shadow list found in use |
| A03 | Auto-receipt to force a match | Agent cannot create GR / service entry | Preventive | Operations + AP Manager | Write-attempt log | Continuous | GR created by an agent identity |
| A03 | Override without reason | Human override + reason code + SoD (not the payments officer alone) | Preventive | AP supervisor | Override register | Per override | Override without reason; override by payment authoriser only |

---

## A04 — Exception Triage

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A04 | Mis-routed exception (wrong owner / code) | Taxonomy enum (E-codes); human may recode; measure recode rate | Preventive | AP Exception Lead | Code + owner + recodes | Weekly | Recode rate above local floor |
| A04 | Aged item without owner | Deterministic ageing (E26) + A16 escalation | Detective | AP supervisor | Ageing report | Daily | Item past threshold 2 without next action |
| A04 | Triage “resolves” by posting | A04 cannot post, match-override, or include in a payment proposal | Preventive | Process owner | Permission listing | Quarterly | Write to posting or proposal APIs |
| A04 | Suggested next action is unsafe (e.g. “just pay”) | Action allow-list; payment language filtered | Preventive | Control owner | Blocked-action log | Continuous | Suggested action on the never-list |

---

## A05 — Goods Receipt

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A05 | Chase to the wrong receiver | Named buyer/receiver list from PO; no directory scrape | Preventive | Warehouse / Receiving Lead | Recipient vs PO | Per send | Mail to a person not on the PO |
| A05 | Receiver goods-receipts without goods to clear the chase | Agent cannot post GR; messaging reminds policy | Preventive | Plant / operations owner | GR identity log | Continuous | GR posted by an agent; spike in GR immediately after chase with later reversal |
| A05 | Missing-receipt ageing ignored | SLA clock + escalate via A16 | Detective | AP Exception Lead | Chase/escalation timestamps | Daily | E07 past SLA with no chase |
| A05 | Execute send before list is certified | List certification required for Level 3 send | Preventive | Process owner | List version | On change | Execute to an uncertified list |

---

## A06 — PO Quality

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A06 | Noisy critic destroys procurement trust | Start Level 0; promote only on measured precision | Preventive | Procurement Operations | Precision sample | Recertification | Unsolicited buyer mail at Level 0 |
| A06 | Agent changes the PO | Write-never on PO change (ME22N / equivalent) | Preventive | Procurement Operations | Write-attempt log | Continuous | PO change by agent identity |
| A06 | Exhausted-PO “fix” by raising value | Change-order is human; A06 flags only | Preventive | Procurement controller | Flag vs change-order IDs | Continuous | PO value raised without human change-order |
| A06 | Defect closed without buyer | Defect object cannot close itself | Preventive | AP Exception Lead | Close identity | Continuous | Self-closed PO-QLTY |

---

## A07 — Approval

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A07 | Agent “approves” | Prepare / route / remind only; approval is a human workflow action | Preventive | AP Manager | Packet vs workflow audit | Continuous | Approval event with agent identity |
| A07 | Self-approval / terminated approver / under-limit (E15) | Deterministic DOA + HR status + requestor ≠ approver | Preventive | DOA table owner + AP | Failures + HR join | Daily HR feed; per packet | Terminated approver still routed |
| A07 | Invoice splitting to stay under DOA | Related-invoice window check | Detective | Control owner | Split report | Weekly | Pattern above local rule |
| A07 | Email approval not in the record | Off-system approval not sufficient unless policy + stored artefact | Preventive | Control owner | Artefact IDs | Per case | Email-only approval on a posted non-PO above threshold |

---

## A08 — Supplier Resolution

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A08 | Unapproved or inaccurate message sent | Approved templates; named fields only; human send until Level 2+ canvas | Preventive | Vendor Master / AP Communications | Outbound copy + template id | Per send | Free-text Execute; unexpected IBAN in body |
| A08 | Agent posts vendor or bank-detail changes | Draft request only; dual human post on bank/tax | Preventive | Master-data steward | Change documents with human IDs | Per change | Master change with agent identity |
| A08 | Bank-change pack without out-of-band verify | E21 procedure mandatory before pack can be submitted | Preventive | Treasury | Callback evidence | Per bank change | Bank change without verify artefact |
| A08 | Price leakage to the wrong supplier | Recipient must match vendor on the document | Preventive | AP Communications | Recipient check log | Continuous | Mail to a lookalike vendor |

---

## A09 — Internal Follow-Up

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A09 | Chase storm / political noise | Rate limit per owner; suppress on hold/dispute | Preventive | AP Exception Lead | Send counters | Daily | >N messages / person / week |
| A09 | Chase used as authority to change PO or GR | A09 does not write PO/GR; replies become evidence only | Preventive | Process owner | Write-attempt log | Continuous | PO/GR write from A09 |
| A09 | Leaver still chased; new owner unknown | HR / A16 reassign before send | Preventive | AP Exception Lead | Recipient vs current owner | Per send | Mail to terminated employee |
| A09 | Inbound reply steers a tool (injection) | Inbound mail is content; cannot add tools or change payee | Preventive | AI product owner | Blocked-instruction log | Continuous | Inbound text invoked a tool |

---

## A10 — Duplicate & Anomaly

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A10 | Exact duplicate posted or paid | Deterministic composite key across *all* in-scope ERPs; hard block | Preventive | AP Controls Lead | Block log + key definition version | Continuous | Exact-key miss found in sample or by supplier statement |
| A10 | Near-duplicate / anomaly auto-blocked or auto-posted | Near-key and anomaly are Recommend only | Preventive | AP Controls Lead | Near-dupe queue decisions | Continuous | Near-key execute event |
| A10 | Duplicate payment already in a run | Hit notifies Payments the same cycle; item pulled by human | Detective | Payments Lead | Proposal exception | Each run | Paid duplicate (Sev-1) |
| A10 | “Fraud concluded” by the agent | A10 screens; it does not conclude fraud or file a referral | Preventive | Control owner | Action allow-list | Continuous | Fraud-conclusion event |
| A10 | Key definition silently changed | Key is a certified artefact | Preventive | Control owner | Change record | On change | Key change without recert |

---

## A11 — Vendor Statement Reconciliation

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A11 | Payable keyed from a statement line | A11 cannot create invoices; missing lines → A01 | Preventive | AP Reconciliations | Create-attempt log | Continuous | Payable created from statement |
| A11 | False match of open items | Deterministic exact match first; residual is Recommend | Preventive | AP Reconciliations | Match report | Per statement | Accepted match with amount/date/reference mismatch |
| A11 | Unapplied payment missed | Residual class includes “payment not on statement / not in ERP” | Detective | Treasury | Residual pack | Per cycle | Material unapplied cash |
| A11 | Cross-ERP statement only run on one ledger | Dual-ERP scope flag for grouped suppliers | Preventive | AP Manager | Scope checklist | Per supplier | Duplicate paid in the other ERP after “clean” statement |

---

## A12 — Payment Proposal Review

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| **A12** | **Agent authorises, releases, or transmits a payment** | **C-A12-01 Payment authorisation must remain human.** A12 may challenge or assemble a proposal only. No bank, payment-provider, or release API on the allow-list. Dual human release per Treasury policy. Runtime deny of authorise/release/transmit actions. | **Preventive** | **Treasury / Payments Lead (Accountable). Payments officer (Responsible). Control owner (monitors).** | **Allow-list; payment-run audit (human identities only on release); deny log; SoD report** | **Every proposal and every run; quarterly cert** | **Any authorise/release/transmit event with an agent identity — Sev-1, kill-switch, do not replay** |
| A12 | Held, disputed, E21, or exact-duplicate item included | Deterministic exclusion / challenge; human may not “click through” without override reason | Preventive | Payments Lead | Proposal exception report | Each run | Included hold/E21/E09 without override |
| A12 | Proposal write used as de-facto release | Proposal status ≠ released; bank file produced only by human payment system step | Preventive | Treasury lead | Status diagram + sample | Each run | Bank file timestamp without human release event |
| A12 | Replay after timeout creates a second file | No unattended retry of proposal submission; reconcile then human decide | Preventive | Treasury + AI owner | Retry policy + incident | On failure | Automated retry of a payment-adjacent job |
| A12 | Amount / envelope cap breached | Canvas caps enforced in the challenger | Preventive | AP Manager | Cap rejects | Continuous | Proposal line above cap treated as clean |

---

## A13 — AP Close

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A13 | Agent signs the close | Checklist / accrual *completeness* only; sign-off is Controller | Preventive | Assistant Controller / AP Manager | Close sign identity | Each period | Close signed by agent identity |
| A13 | Accrual posted from a checklist guess | A13 cannot post journals; drafts for a named human | Preventive | Controller | Journal identity | Each period | Journal by A13 identity |
| A13 | Open exceptions hidden to “make close green” | Checklist includes open E26 / holds; A16 must agree the queue | Preventive | AP Manager | Queue vs checklist recon | Each period | Material open items omitted |
| A13 | GR/IR gap auto-cleared | Gap is `ACCR-GAP` evidence, not a write-off | Preventive | Controller | Write-off identity | Each period | Write-off without human |

---

## A14 — AP Reporting

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A14 | Pack does not tie to the ledger | Recon to open items / trial balance required before circulate | Preventive | AP Manager | Tie-out worksheet | Each pack | Untied pack forwarded |
| A14 | Vanity or vendor-blog $ / invoice presented as ours | Dictionary from `KPI_FRAMEWORK.md`; customer baseline only | Preventive | FP&A | Dictionary version | Each pack | Industry $ used as F1 |
| A14 | Savings claimed as F6 without FP&A sign | F6 flag requires signed method note | Preventive | FP&A | Method note | Each pack | Unsigned F6 in an external pack |
| A14 | Control family omitted so STP looks green | Pack schema requires R-family | Preventive | Control owner | Pack schema test | Monthly | Pack without R1–R6 |

---

## A15 — Root Cause

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A15 | Clusters without enough history become fiction | Minimum closed-exception window (default a quarter) before Recommend | Preventive | AP Manager / Process Excellence | Sample size in pack | Each run | Cause pack on < threshold n |
| A15 | Agent posts a “fix” (tolerance, vendor, PO) | Propose only; change control owns the change | Preventive | Process owner | Write-attempt log | Continuous | Config/PO/vendor write by A15 |
| A15 | Blame pack sent to a supplier or buyer | Internal circulate list; no A08/A09 send from A15 | Preventive | AP Manager | Distribution list | Per pack | External send |
| A15 | Repeating defect closed as “training” with no owner | Each proposed cause needs a named owner and next action | Detective | Process Excellence | Action register | Monthly | Cause with no owner after one cycle |

---

## A16 — AP Manager / Orchestrator

| Agent | Risk | Control | Preventive / Detective | Human owner | Evidence | Frequency | Escalation trigger |
|---|---|---|---|---|---|---|---|
| A16 | A16 promotes an agent’s autonomy | A16 may recommend; register change is human (Step 10) | Preventive | AP Manager + control owner | Register vs dispatch | Continuous | Dispatch above register |
| A16 | Incomplete or mutable logs | Write-once store; completeness monitor | Preventive | Control owner | Completeness + immutability test | Daily + recert | Gap or edit |
| A16 | Alert fatigue hides a Sev-1 | Severity routing; Sev-1 to CFO/Treasury path | Detective | Control owner | Alert receipt log | Per Sev-1 | Sev-1 without same-day exec notify |
| A16 | Orchestrator used as operational override (post/pay) | A16 cannot post, pay, or change masters | Preventive | Control owner | Permission listing | Quarterly | Write outside dispatch / evidence |
| A16 | Dispatch to a failed-cert or killed agent | Gate on register status and kill-switch | Preventive | AP Manager | Denied-dispatch log | Continuous | Dispatch after kill |

---

## Control counts (standard catalogue)

| Agent | Standard controls in this file (excluding “All”) |
|---|---|
| A01 | 5 |
| A02 | 4 |
| A03 | 4 |
| A04 | 4 |
| A05 | 4 |
| A06 | 4 |
| A07 | 4 |
| A08 | 4 |
| A09 | 4 |
| A10 | 5 |
| A11 | 4 |
| A12 | 5 (includes C-A12-01) |
| A13 | 4 |
| A14 | 4 |
| A15 | 4 |
| A16 | 5 |
| All | 9 cross-cutting |

If a local instance has fewer than three *operating* controls per live agent, it is not ready for pilot.

---

## Testing the matrix

| Test | Pass |
|---|---|
| Payment release identities | Only human payment roles |
| Level 0 writes | Zero |
| Injection tool-call | Zero execute |
| Exact-key duplicate | Blocked |
| Bank disagreement | E21 + hold, not released |
| Failed cert | Autonomy stepped down; A16 refuses over-level dispatch |

Record results with the golden set (method Step 6). Failed hard controls are go/no-go failures.

---

## Related documents

- `RISK_REGISTER.md`
- `../Governance/AP_AGENT_GOVERNANCE_FRAMEWORK.md`
- `../Agent_Library/00_AGENT_STACK_OVERVIEW.md`
- `../Process_Mapping/EXCEPTION_TAXONOMY.md`
- `../KPI_and_Measurement/KPI_FRAMEWORK.md`
