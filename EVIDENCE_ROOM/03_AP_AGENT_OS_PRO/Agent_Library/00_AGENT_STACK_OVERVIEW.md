# AP Agent OS — Agent Stack Overview

**Product:** Evidence Room / AP Agent OS  
**Brand idea:** Proof before permission.  
**Line:** Agents earn responsibility. Evidence decides.

This library is the operating design for a 16-agent accounts payable stack. It is ERP-agnostic. Use it on D365, SAP, Oracle, NetSuite, Workday, or a mix. Map field names and transaction codes to your system; do not copy another company's workflow into yours.

Full autonomy is not the default. An agent starts at **L0 Observe**. It moves only when evidence shows it is safe. The progression is L0 Observe → L1 Recommend → L2 Prepare → L3 Execute within guardrails → L4 Managed autonomy.

---

## What you should do with this library

1. Appoint one **human owner** per agent (typical roles are named in each charter).
2. Run each agent at **L0** on a narrow invoice slice until you can measure precision, miss rate, and exception cost.
3. Promote one level at a time using the gates in `17_AUTONOMY_PROGRESSION.md`.
4. Keep four classes of work **human**: payment release, vendor bank-change approval, policy exceptions, and legal disputes. See `18_HUMAN_VS_AGENT_DECISION.md`.
5. Treat every agent file as a **charter**, not a prompt pack. The instruction skeleton at the end of each file is a starting operating instruction, not a magic prompt.

---

## The 16-agent stack

Work moves left to right. The AP Manager / Orchestrator does not replace specialists. It sequences them, holds the queue, and stops work that lacks evidence.

```
                    ┌────────────────────────── AP MANAGER / ORCHESTRATOR (16) ──────────────────────────┐
                    │  queue · SLA · autonomy gate · hand-off · kill-switch · sampling · cost envelope   │
                    └──────────────────────────────────────────┬─────────────────────────────────────────┘
                                                               │
  CAPTURE          QUALIFY              RESOLVE                 CONTROL                 STEER
  ────────         ───────              ───────                 ───────                 ─────
  01 Intake   →    02 Validation   →    04 Exception triage →   07 Approval        →    13 AP Close
                   03 Matching          05 Goods receipt        12 Payment proposal     14 AP Reporting
                   10 Duplicate/        06 PO quality           review (human           15 Root cause
                      anomaly           08 Supplier resolution     payment release)
                                        09 Internal follow-up
                                        11 Vendor statement
```

| # | Agent | Job in one line | Typical first owner |
|---|---|---|---|
| 01 | Invoice Intake | Capture, classify, extract, and park the invoice with an evidence pack | AP Supervisor / Intake Lead |
| 02 | Invoice Validation | Prove the invoice is complete, coded, and master-data-fit before match | AP Team Lead |
| 03 | Matching | Apply 2-way / 3-way / tolerance / multi-line match and state the residual | AP Processor (PO desk) |
| 04 | Exception Triage | Classify the break, name the owner, set the next action and SLA | AP Exception Lead |
| 05 | Goods Receipt | Find missing or partial GR evidence; never invent a receipt | Warehouse / Plant AP liaison |
| 06 | PO Quality | Find the PO defect that will keep creating exceptions | Procurement Operations |
| 07 | Approval | Build the approval packet and route inside published DoA | AP Supervisor |
| 08 | Supplier Resolution | Draft the supplier question; send only when the send-gate allows | AP Vendor Desk |
| 09 | Internal Follow-Up | Chase the internal owner (receiver, buyer, cost-centre) | AP Query Desk |
| 10 | Duplicate & Anomaly | Flag exact and near-duplicate and unusual patterns — not a fraud finding | AP Controls Analyst |
| 11 | Vendor Statement Reconciliation | Reconcile the supplier statement to open items | AP Reconciliations |
| 12 | Payment Proposal Review | Stress-test the proposal; **payment authorisation stays human** | Treasury / AP Payments Lead |
| 13 | AP Close | Accruals, GR/IR, cutoff, close checklist | AP Manager / Assistant Controller |
| 14 | AP Reporting | Produce the operating pack from defined metrics | AP Manager |
| 15 | Root Cause | Turn repeating breaks into a fix request with evidence | Process Owner (AP + Procurement) |
| 16 | AP Manager / Orchestrator | Sequence, gate, and stop the stack | AP Manager |

---

## How agents hand off

A hand-off is a **structured packet**, not a chat message. The Orchestrator will not accept a packet that is missing required fields.

### Packet standard (every hand-off)

| Field | Required | Purpose |
|---|---|---|
| `case_id` | Yes | Stable ID for the invoice or statement line across agents |
| `invoice_id` / `statement_id` | Yes | Source document key |
| `legal_entity` / `company_code` | Yes | Which books this hits |
| `vendor_id` | Yes, if known | Master-data key; blank is itself a finding |
| `agent_from` / `agent_to` | Yes | Named agents, not people |
| `autonomy_level_applied` | Yes | The level used on this case, not the agent's ceiling |
| `decision` | Yes | `observe` / `recommend` / `prepare` / `execute` / `hold` / `escalate` |
| `confidence` | Yes | 0–1, with the rule that produced it |
| `evidence_refs` | Yes | Document IDs, ERP transaction IDs, email IDs, hash of source file |
| `exceptions[]` | Yes (can be empty) | Code, amount, owner role, SLA clock start |
| `human_required` | Yes | Boolean plus reason code |
| `next_action` | Yes | One verb, one owner, one due time |
| `cost_envelope` | Yes | Inference tokens/cost + expected human minutes if escalated |

### Default path (happy path)

1. **01 Intake** creates the case, attaches the source file, extracted fields, and file hash. Hands to **02 Validation** and, in parallel, **10 Duplicate & Anomaly**.
2. **10** returns `clear`, `possible_duplicate`, or `anomaly` before **03 Matching** is allowed to execute.
3. **02 Validation** either marks the invoice *match-ready* or hands a coded exception to **04 Triage**.
4. **03 Matching** runs only on match-ready invoices with a PO reference. Non-PO invoices skip 03 and go to **07 Approval** (or coding review) after 02 and 10.
5. Match pass → **07 Approval** if DoA requires it; otherwise to the posted-and-awaiting-payment queue that **12** will later review.
6. Match fail → **04 Triage**, which routes to **05 GR**, **06 PO Quality**, **08 Supplier**, **09 Internal**, or a human queue.

### Parallel and return paths

| From | To | When |
|---|---|---|
| 01 Intake | 10 Duplicate | Every invoice, before post |
| 03 Matching | 05 GR | Qty or receipt variance; GR missing or partial |
| 03 Matching | 06 PO Quality | Price, UoM, tax, account-assignment, or vendor-on-PO defect |
| 04 Triage | 08 Supplier | Only the supplier can supply the missing fact (credit, revised invoice, POD) |
| 04 Triage | 09 Internal | Receiver, buyer, or cost-centre owner must act |
| 11 Statement | 01 Intake | Unrecorded invoice found on a statement |
| 11 Statement | 04 Triage | Unexplained open item or unapplied credit |
| 12 Payment review | 10 Duplicate | Last-look duplicate before the human payment run |
| 12 Payment review | Human payments | Always — agent does not release funds |
| 13 Close / 14 Reporting | 15 Root cause | Recurring codes above the review threshold |
| Any agent | 16 Orchestrator | SLA breach, autonomy-gate fail, cost-envelope breach, kill-switch |

### Hand-off rules that prevent silent failure

- No agent posts, sends, or closes a case without writing `evidence_refs`.
- No agent changes another agent's decision. It can **reject the packet** back to the sender with a reason code.
- **08 Supplier** and **09 Internal** do not invent commercial positions. They transmit a question the triage packet already justified.
- **05 GR** does not create a goods receipt without receipt evidence and a human (or an L3+ gate that still requires evidence).
- **12** may mark a proposal line `hold`, `release-recommended`, or `remove`. A human authorises the run.

---

## What stays human

These four classes are never delegated, at any autonomy level. Agents may prepare the file. They may not decide.

| Class | Why it stays human | Agent role |
|---|---|---|
| **Payment release** (bank file, payment run, positive-pay, cheque) | Movement of cash. Irreversible in practice once the bank has it. | Agent 12 reviews and recommends. Human payments / treasury releases. |
| **Vendor bank-change approval** (and other payment-master changes) | Classic fraud path. Dual control is the control, not a convenience. | Agent 10 may flag. Agent 08 may collect. A named human approver, not the requester, approves. |
| **Policy exceptions** (off-policy spend, after-the-fact PO above threshold, related-party, missing DoA) | Policy is a management decision. An agent cannot grant itself an exception. | Agents 02, 06, 07 detect and package. A named policy owner approves. |
| **Legal disputes** (formal claim, solicitor letter, statutory demand, chargeback threat that has left operations) | Legal risk and privilege. | Agents stop operational chasing and hand a file to Legal / AP Manager. |

Related human holds (not the four classes, but treated the same in the Orchestrator):

- Write-off or credit acceptance above the published threshold.
- Tax-code change that alters filing position.
- Vendor create / vendor unblock when the vendor is new, high-risk, or previously blocked.
- Any action after the **kill-switch** is on.

How you control this: `human_required=true` is forced by reason code, not by model confidence. Confidence cannot override these classes. See `18_HUMAN_VS_AGENT_DECISION.md`.

---

## The Orchestrator's role (Agent 16)

The AP Manager / Orchestrator is the only agent allowed to:

- Admit a case into the stack and assign the next specialist.
- Read every agent's autonomy ceiling and **downgrade** a case (never silently upgrade).
- Enforce the four human classes and the kill-switch.
- Open or close the cost envelope for a case (max inference spend; max human minutes before a manager sees it).
- Produce the daily operating picture: queue, SLA, first-pass yield, exception mix, cost per invoice.

The Orchestrator does **not**:

- Extract invoices, match lines, write supplier emails, or post journals.
- Approve invoices or release payments.
- Raise its own autonomy. Promotion is a human control change, evidenced in `17_AUTONOMY_PROGRESSION.md`.

If the Orchestrator is down, specialists may continue on already-assigned cases at their current level. New cases park in the intake queue. Payments continue under the existing human payment process.

---

## Autonomy in one page

| Level | Name | Agent may | Agent may not | Evidence to promote |
|---|---|---|---|---|
| **L0** | Observe | Shadow the process; write what it would have done | Surface work into the live queue | Baseline volume, field-level extraction/match accuracy, miss log |
| **L1** | Recommend | Put a recommendation and evidence pack in front of a human | Draft the ERP transaction or the outbound email | Precision / recall on the recommendation; human accept rate |
| **L2** | Prepare | Draft the posting, match, email, or GR proposal in a park status | Commit, send, or post | Rework rate on drafts; time-to-approve draft |
| **L3** | Execute within guardrails | Commit only when amount, vendor, exception type, and confidence gates pass | Anything outside the published gate | Residual error rate; sample of executed cases; no control-break incidents |
| **L4** | Managed autonomy | Execute across the published scope with sampling and a live kill-switch | The four human classes; anything after kill-switch | Sustained L3 evidence plus sampling plan and owner sign-off |

Promotion is per **agent × legal entity × invoice slice** (for example: domestic PO invoices under an illustrative threshold). Never promote "the stack."

---

## How you measure the stack

Do not invent a savings number. Measure these, from your own data:

| Question | Metric | Formula (use your own counts) |
|---|---|---|
| Does capture work? | Intake yield | Invoices with required fields complete / invoices received |
| Does qualification work? | First-pass yield | Invoices that post or park for payment with no exception / invoices received |
| Is matching honest? | Touchless match rate | Auto-matched with evidence / PO invoices |
| Are we faster? | Cycle time | Invoice date (or receipt date — pick one and keep it) → ready-for-payment |
| Are breaks aging? | Exception aging | Open exceptions by code, owner, and days |
| Is GR/IR under control? | GR/IR age | Unmatched GR and IR by days and amount |
| Is the agent cheap enough? | Unit cost | (Inference + tool + human exception minutes × loaded rate) / invoices |
| Can we prove it? | Evidence completeness | Cases with a complete packet / cases closed |

All percentages and amounts in the worked examples in this library are **ILLUSTRATIVE**. Replace them with your ledger.

---

## What can go wrong at stack level

| Failure | What it looks like | Control |
|---|---|---|
| Silent autonomy upgrade | An agent posts because confidence was high | Orchestrator blocks upgrade; ceiling is a config record, not a model output |
| Duplicate payment | Same invoice paid twice after a re-extract or a statement load | Agent 10 before post and again before payment; human release |
| Invented GR | Quantity received to clear a match | Agent 05 requires receipt evidence; L3 still cannot invent |
| Supplier email that concedes price | Agent 08 "resolves" a variance | Send-gate; commercial concession is a policy exception |
| Bank-detail change via invoice footer | New IBAN on a PDF treated as an update | Forced human class; Agent 10 flags; master-data dual control |
| Close without accruals | Unrecorded spend found after period-end | Agent 13 checklist; statement gaps from Agent 11 |
| Cost blow-up | Re-prompting a hard invoice 40 times | Cost envelope per case; Orchestrator stops the case |

---

## How you control the stack

- One named **human owner** per agent; one **AP Manager** as Orchestrator owner.
- Autonomy ceiling stored outside the model (config table or control register).
- Kill-switch: AP Manager or Controls can set the stack, an agent, a vendor, or a legal entity to L0 or L1 immediately.
- Sampling: every executed (L3/L4) case is eligible; sample rate is set in the agent's charter.
- Evidence retention: packet + source file + ERP document numbers + who overrode what. Retention follows your finance policy; the library does not set a legal period.
- SoD: the person who approves vendor bank changes is not the person who processes the invoice. The agent does not collapse that.

---

## How to use the files

| File | Use it for |
|---|---|
| `AGENT_01` … `AGENT_16` | Charters. Implement, train, and audit against these sections. |
| `17_AUTONOMY_PROGRESSION.md` | The only promotion method. |
| `18_HUMAN_VS_AGENT_DECISION.md` | The decision tree when a case sits on the line. |
| `19_AGENT_CHARTER_STANDARD.md` | The template. If you add an agent later, it must pass this standard. |

Every page in this library is written to answer at least one of: **What should I do? How? Who owns it? What can go wrong? How do I control it? How do I measure it? What evidence proves it works?**

---

## Monday-morning start (narrow)

Do not stand up sixteen agents.

1. Pick one legal entity and one channel (for example: email PDFs, domestic, PO invoices).
2. Stand up **01 Intake**, **02 Validation**, **03 Matching**, **10 Duplicate**, **16 Orchestrator** at **L0**.
3. Measure field accuracy, duplicate catch, and false match for a period you define.
4. Promote **01** and **10** first — they create the evidence the rest depend on.
5. Leave **12 Payment** at L1 indefinitely until the payments owner asks for L2 prepare-only.
6. Leave bank-change, policy exception, and legal dispute routing as human from day one.

Proof before permission. Agents earn responsibility. Evidence decides.
