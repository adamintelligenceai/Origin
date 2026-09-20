# Human vs Agent Decision Framework

**Product:** Evidence Room — AP Agent OS  
**Audience:** AP Manager, Controller, Exception Desk, Treasury, Internal Audit, Finance Transformation  
**Use:** Decide, for a given work object, whether an agent may observe, recommend, prepare, or (rarely) execute — and what must remain human.  
**Principle:** Agents earn responsibility. Default is never full autonomy. Payment authorisation always remains human.

---

## 1. Why this document exists

Most AP “automation” failures are decision-rights failures. A tool posts a match it should have held. A draft email becomes a commercial commitment. A duplicate flag is treated as proof of fraud — or is ignored because last week’s flags were noisy. A payment proposal looks clean, so someone lets the bot release it.

This framework is the refusal rule and the assignment rule. Use it when chartering an agent, when promoting autonomy, when an exception feels urgent, and when a vendor demonstrates a feature.

If the framework and a feature conflict, the framework wins.

---

## 2. The question to ask of every work object

Work through these in order. Stop at the first “human-only” answer.

1. **Does this action move cash, change a beneficiary, or release a payment file?**  
   Human only. Agent may annotate. Stop.
2. **Does this action create or change vendor master data that affects payability?**  
   Human only (or human dual control). Agent may assemble a pack. Stop.
3. **Does this action change policy, tolerance, DOA, or tax position?**  
   Human only. Stop.
4. **Does this action attest a control (close, SOX narrative, audit representation)?**  
   Human only. Agent may prepare the file. Stop.
5. **Is the object above the written value, complexity, or jurisdiction threshold for this agent?**  
   Human decides. Agent may prepare. Stop.
6. **Is there an open Duplicate & Anomaly flag, sanctions review, stop-pay, or audit hold?**  
   Human clears or maintains the hold. Agent does not recommend proceed. Stop.
7. **Is the recommendation reversible without cash movement and without legal commitment?**  
   If no — human only. If yes — continue.
8. **Do we have sampled evidence that this agent, on this object type, at this entity, meets the gate for the proposed level?**  
   If no — level is at most L1 recommend, or L0. Stop.
9. **Is a named human owner available to accept, edit, or reject within the SLA?**  
   If no — do not raise autonomy to hide the staffing gap. Queue waits. Stop.
10. **If the agent is wrong, who notices, how, and how fast?**  
    If the detection path is not written — do not execute. Recommend or prepare only.

---

## 3. Decision classes

| Class | Examples | Agent ceiling | Human must |
|---|---|---|---|
| **A. Cash movement** | Payment release, bank file, Positive Pay exception, wire, card, offset | Annotate only (Agent 12 ≤ L2) | Authorise, release, transmit |
| **B. Payability master data** | Vendor bank, payment method, withholding, block/unblock for pay | Pack only | Dual-control change |
| **C. Accounting state (reversible, no cash)** | Park, hold, match-accept, invoice post on clean PO match | L1 default; L3 only after gates on a named class | Policy ownership; sample; reversal rights |
| **D. Documentary / capture** | Extract, classify, register, attach image | L1 default; L3 only for low-risk register after gates | Review low-confidence; own legal archive |
| **E. Routing and chasing** | Assign owner, SLA clock, reminder to internal user | L1/L2; L3 only for internal reminders on a whitelist | Own the assignment policy |
| **F. External commitment** | Supplier email that agrees price, qty, due date, concession | Draft only (Agent 08 ≤ L2) | Approve and send; no implied authority |
| **G. Judgement / policy exception** | Override tolerance, accept short-ship as complete, waive tax variance | Recommend facts only | Decide |
| **H. Investigation signal** | Possible duplicate, unusual amount, new billing address | Flag only (Agent 10 default L0) | Investigate, clear, or hold |
| **I. Attestation** | Close sign-off, accrual completeness, audit PBC | Prepare only | Sign |
| **J. Design change** | New match rule, new agent scope, prompt change that alters behaviour | Propose (Agent 15) | Change control |

---

## 4. Autonomy mapped to decision classes

| Level | Permitted classes (typical) | Forbidden regardless of level |
|---|---|---|
| L0 Observe | Shadow reports on C–J | A, B; any live recommendation as system of record |
| L1 Recommend | C–J as recommendations | A, B execution; sending external mail; clearing H flags |
| L2 Prepare | Complete packets for C–G, I | Execution; A/B; expanding scope |
| L3 Execute within guardrails | Named subset of C, D, E only, limit table in the charter | A, B, F send, G decide, H clear, I sign, J implement |
| L4 Managed autonomy | Same subset as L3, exception-only review | Anything not already in the L3 limit table |

There is no path from L4 to payment authorisation. L4 is not a promotion out of the framework. It is a thinning of routine review on a bounded, already-safe class.

---

## 5. Value, complexity, and jurisdiction modifiers

Even inside class C or D, raise the human requirement when any modifier is true.

| Modifier | Rule at Northline (illustrative) | Effect |
|---|---|---|
| Header amount | > $50,000 | Second human on accept; no L3 |
| Header amount | > $100,000 | Plant Controller or VP Finance; Agent 07 packet |
| Multi-PO or multi-entity | Any | Out of Wave-1 match scope; human / Triage |
| Cross-border tax | CA/MX invoices, US use-tax judgement | Tax desk; Agent 02 flags only |
| New vendor < 90 days | Any payment or master change | Vendor Master + Controls |
| First invoice from a vendor | Extract + validation human review | No L3 intake |
| Price change vs PO | Any | Buyer decision; Agent 06/08 facts only |
| Quantity over-receipt | Any | Warehouse + buyer |
| Duplicate or anomaly flag | Any open flag | Controls Lead; no proceed recommend |
| Related-party / intercompany | Any | Human accounting |
| Customs, duty, freight allocation | Any | Trade / cost accounting |
| Employee or T&E | Any | Out of AP Agent OS |
| Weekend / emergency pay | Any | Treasury human path; agent off |

Write your own modifier table in the charter. Do not copy Northline’s dollars if your DOA differs. Do copy the idea: modifiers promote *human* involvement, not agent autonomy.

---

## 6. Worked decisions — Northline Industrials

Fifteen thousand invoices a month. Cleveland SSC. Dynamics 365. Use these as calibration, not as folklore.

### 6.1 Clean 3-way match, $4,200, Dayton inventory, no flags

- Class C, no modifiers.  
- Wave 1: Agent 03 L1 recommends match; specialist accepts; specialist or junior poster posts.  
- After gates: this *class* may be proposed for L3 post. Payment of the item still waits for the Tuesday/Thursday human-authorised run.

### 6.2 Same invoice, Agent 10 open flag “possible duplicate of inv 88321”

- Class H blocks class C.  
- Agent 03 must emit `RECOMMEND_NO_ACTION_ANOMALY_HOLD`.  
- Elena Ruiz (Controls Lead) investigates. She may clear or hold.  
- The flag is not a fraud finding. Language in the ticket: “possible duplicate — human review.”

### 6.3 Missing GR, $18,500, Birmingham, PO complete, warehouse silent 6 days

- Agent 03 codes `MISSING_GR`. Agent 05 prepares a receiver packet (L2 if chartered).  
- Receiver or plant liaison confirms or disputes.  
- Agent 09 chases internally if the packet ages.  
- No one in the stack creates a GR to “make it match.” Creating a GR is a warehouse/finance human action.

### 6.4 Service invoice $8,400, contract on file, 2-way in policy, cost centre owner on leave

- Agent 07 prepares the DOA packet and routes to the deputy in the DOA table.  
- If no deputy: wait. Do not invent an approver. Do not let Orchestrator “find someone senior.”  
- Agent does not approve.

### 6.5 Supplier emails “price is $12.10 not $11.40, please update the PO”

- Agent 08 may draft a *question*, not an agreement.  
- Buyer decides. Agent 06 may record a PO quality defect if the PO was incomplete.  
- Agent 03 does not override price.

### 6.6 Payment proposal Tuesday: 612 items, $4.1m, two Agent 10 uncleared flags, one vendor with bank change yesterday

- Agent 12 annotates: hold the two flagged items; hold the bank-change vendor pending dual-control evidence.  
- Payments Lead + Treasury approver release the rest.  
- Agent 12 does not deselect-and-release. Humans deselect. Humans release.

### 6.7 Vendor statement shows $27,000 “overdue” that AP does not recognise

- Agent 11 proposes: on-statement-not-in-AP list, with possible matched invoices and unmatched.  
- Supplier Resolution drafts a query.  
- No payment is added to the proposal because a statement line exists. Statements are not invoices.

### 6.8 Month-end: GR/IR $2.3m aged > 60 days

- Agent 13 lists accrual candidates and aged GR/IR.  
- Assistant Controller proposes; Controller attests close.  
- The agent does not book the accrual.

### 6.9 Root Cause cluster: 22% of Dayton exceptions are “UOM mismatch EA vs BOX”

- Agent 15 proposes a PO template change and a vendor onboarding checklist item.  
- Procurement Operations accepts or rejects.  
- No agent writes the template.

### 6.10 Vendor demo: “our agent auto-releases payments under $5k if match is clean”

- Framework class A. Refusal.  
- Record the refusal in the vendor evaluation file.  
- Northline’s $5k is a *DOA* limit for humans, not an agent payment limit.

---

## 7. Language that means “human only”

Treat these phrases in tickets, prompts, or vendor copy as stop words. They require a human decision, not more model confidence.

- “just this once”
- “the CFO said to pay”
- “we always override this vendor”
- “it’s probably not a duplicate”
- “update the PO to match the invoice”
- “post a dummy GR”
- “release so we keep the discount”
- “the statement is the invoice”
- “change the bank so it goes through”
- “approve on their behalf, they’re travelling”
- “catch the fraud”
- “we’ll be out of compliance if we don’t”
- “guaranteed savings if we turn on auto-post”

The correct operational response is: hold, prepare a packet, name the human, state the class.

---

## 8. Staffing is not an autonomy argument

A missing specialist is a queue problem. It is not evidence that the agent should post, send, or pay.

| Pressure | Allowed response | Disallowed response |
|---|---|---|
| Month-end volume | Overtime, temporary specialists, narrower in-scope set | Silent L3 on a new document type |
| Approver on leave | DOA deputy only | Orchestrator picks a convenient manager |
| Supplier threat to stop ship | Human commercial / procurement decision | Agent agrees price or promises pay date |
| Discount expiry | Human expedite on a prepared packet | Agent releases payment |
| Audit week | Complete evidence packs | Hide rejects; backfill worksheets |

If the business wants faster cycle time, it funds owners, cleans PO quality, and earns promotion on a *stable* class. It does not skip gates.

---

## 9. Duplicate & Anomaly — special rule

Agent 10 produces **signals**. Signals have four human outcomes only:

| Outcome | Meaning | Who |
|---|---|---|
| Clear — not a duplicate / not anomalous | Proceed under normal match/pay path | Controls Lead or delegate |
| Confirm — duplicate or anomaly substantiated | Hold, reverse, or recover per procedure | Controls Lead + Match/Payments |
| Escalate — needs investigation beyond AP | Fraud examination, legal, or security *if* those functions are invoked by policy | Named control owner — not the agent |
| Defer — more data required | Clock recorded; object stays held | Controls Lead |

The agent does not choose among these four. It does not use the word “fraud” in user-facing output. It does not claim a detection rate. A quiet month of flags is not evidence that there is no issue. A loud month is not evidence that there is.

---

## 10. Payment authorisation — special rule

The payment path has three distinct jobs. Do not collapse them.

| Job | Who | Agent? |
|---|---|---|
| Build proposal (ERP standard) | Payments specialist / ERP job | No (ERP function) |
| Review / annotate proposal | Agent 12 + Payments Lead | Agent annotates; human accepts annotations |
| Authorise and release | Two humans per Northline policy (Payments Lead + Treasury) | Never |

Discounts, due-date logic, and “pay this to save a relationship” are inputs to the human authorisers. They are not agent release criteria.

---

## 11. RACI for the decision itself

When a work object is at a decision point:

| Step | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Classify the decision (A–J) | Owning agent’s human owner | AP Process Owner | Controls Lead | Orchestrator (log) |
| Apply modifiers | Owning agent (recommend) | Human owner | Tax / Treasury / Buyer as relevant | Plant Controller if $ |
| Choose autonomy action | Charter (already written) | Human owner | Process Owner if charter is silent | Internal Audit if class A/B/I |
| Execute if L3 class C/D/E | Agent within limit table | Human owner | Controls (sample) | Process Owner |
| Record evidence | Agent + human | Human owner | — | Audit on request |

If the charter is silent, the action is human-only until the charter is revised under change control.

---

## 12. One-page card (print for the SSC wall)

1. Cash, bank, vendor payability → human.  
2. Policy, DOA, tax position, close sign-off → human.  
3. Open anomaly / stop-pay / sanctions → human.  
4. External promise → draft only.  
5. No owner, no go.  
6. No evidence gate, no promotion.  
7. Urgent is not a class.  
8. Agent 10 flags are hypotheses.  
9. Agent 12 annotates; humans pay.  
10. When in doubt, prepare a packet and name a person.

---

## 13. How Transformation uses this on Monday

Take the last ten exceptions and the last payment run. For each line, write: class, modifiers, who decided, what the agent would have been allowed to do at the current charter level, and what a vendor demo would have done. The gaps are your control conversation.

Northline’s April 2026 exercise (illustrative): of ten exceptions, six were class G (judgement), two class C (reversible accounting), one class F (supplier price), one class H (possible duplicate). Zero were lawful L3 candidates. The payment run contained two class A decisions that a demo script would have auto-released. The exercise took 70 minutes. It prevented a bad Wave-2 design.

---

## 14. Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Human vs Agent Decision Framework |
| Review | Quarterly, or after any attempted payment-adjacent promotion |
| Related | All agent specs; autonomy progression; charters |
