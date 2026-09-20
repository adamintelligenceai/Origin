# 18 — Human vs Agent Decision

**Product:** Evidence Room / AP Agent OS  
**Owner:** AP Manager + Controls  
**What you should do:** When a case sits on the line, use this tree. Confidence is not a vote. Human classes cannot be cleared by the model.

---

## The rule

Agents **prepare and, when earned, execute inside gates**.  
Humans **authorise cash, master payment data, policy exceptions, and legal positions**.

If you are unsure, the case is human. Fail closed.

---

## Four classes that stay human at every level

| Class | Examples | Agent may | Human must |
|---|---|---|---|
| **Payment release** | Payment run approve, bank file, BCM, positive-pay, cheque release, urgent outbound | Agent 12: review, hold, remove, recommend | Authorise the run and the file |
| **Vendor bank-change** | IBAN, account, intermediary, factoring payee, payee name | Flag (`ANOM-PAYEE-DETAIL`); collect documents | Dual-control master-data approve. Not the invoice processor alone |
| **Policy exception** | Missing PO on PO-required spend; after-the-fact PO above threshold; related-party; off-policy vendor; DoA skip | Detect, package the form | Named policy owner |
| **Legal dispute** | Solicitor letter, statutory demand, formal claim, collection that left operations | Stop 08/09 operational chase; file the packet | Legal / AP Manager |

Related holds treated the same:

- Write-off / credit acceptance above threshold.
- Tax treatment that changes filing position.
- Vendor create / unblock when new, high-risk, or previously blocked.
- Any action after kill-switch.

`human_required=true` is forced by **reason code**. A high confidence score cannot flip it to false.

---

## Decision tree

Walk top to bottom. First match wins.

```
1. Kill-switch on for stack / agent / vendor / entity / channel?
   → Human (or L0 only). Orchestrator stops execute.

2. Is this payment release or bank-file send?
   → Human. Agent 12 pack only.

3. Is this vendor payment-master change, or printed payee ≠ master?
   → Human dual control. Agent 10 flags. Do not update from the invoice.

4. Legal / solicitor / statutory demand / threat that left operations?
   → Human Legal. Stop 08/09.

5. Policy exception (PO-required missing, confirming PO over threshold,
   related-party, DoA skip, off-policy)?
   → Human policy owner. Agents package.

6. Write-off, tax-position change, vendor unblock/create in the high-risk set?
   → Human per table.

7. Agent 10 not clear (possible_duplicate, anomaly uncleared, index down)?
   → No execute on 02/03/12. Human or wait.

8. Packet missing evidence_refs or packet standard fail?
   → Reject to sender. No execute.

9. Case cost envelope exhausted?
   → Stop. Human or next-day replay.

10. Proposed action is inside the agent's published L3/L4 gate
    (amount, vendor set, code, template, evidence type)?
    → Agent may execute at ceiling.
    Else → Agent prepares (L2) or recommends (L1). Human acts.
```

---

## By agent — default human line

| Agent | Agent side of the line | Human side of the line |
|---|---|---|
| 01 Intake | Extract, store, split, propose entity/vendor | New vendor; legal mail; apply printed bank details |
| 02 Validation | Completeness, arithmetic, coding **proposal** | Grant missing-PO; clear vendor block; tax-position change |
| 03 Matching | Compare using published tolerances | Post outside tolerance; convert 3-way to 2-way; create GR |
| 04 Triage | Route, bundle, SLA | Close without resolution; policy close; legal route |
| 05 GR | Find evidence; prepare GR | Post without non-invoice evidence; invent qty; QM override |
| 06 PO Quality | Diagnose; clerical allow-list if published | Price, vendor, qty increase, confirming PO |
| 07 Approval | Route, remind, apply **published** skip | Be the approver; invent delegate |
| 08 Supplier | Template draft; send only if send-gate allows | Send-gate default; concession; bank change; legal reply |
| 09 Internal | Template chase to resolved employees | Chat-as-posting; external domains; director escalate off-table |
| 10 Dup/Anomaly | Flag, exact hold | Fraud opinion; vendor block; release `DUP-PAID` without reason |
| 11 Statement | Recon pack, tickets | Pay statement total; invoice from line (default no) |
| 12 Pay review | Hold/remove/recommend | Release run; send file; change payee |
| 13 Close | Checklist, GR-backed candidates, park journals | Post (default); period status; statement-gap accrual |
| 14 Reporting | Dictionary metrics | Savings claims; external publish; drop a red metric |
| 15 Root cause | Fix request | Change tables; weaken 3-way/DoA/bank control |
| 16 Orchestrator | Assign, stop, propagate kill-switch | Set kill-switch; raise ceilings; specialist work |

---

## "The supplier will cut us off" and other pressure

Operational pressure does not move a case across the line.

| Pressure | Still human | Agent help |
|---|---|---|
| Pay today or no next shipment | Payment release | 12 pack + AP Manager |
| "Here is our new bank account" on PDF or email | Bank-change dual control | 10 flag; 08 stop |
| Buyer says "just raise the PO" after the invoice | Confirming PO / policy | 06 pack |
| Warehouse says "I received it" in chat | Not a GR | 09 testimony → 05 still needs a document |
| Controller wants close **now** | Period status | 13 pack as-is, incomplete marked |

---

## Overrides

An override is a human clearing a hold or executing outside a gate.

| Rule | Detail |
|---|---|
| Who | Named role in the agent charter; not the agent |
| Dual control | Required for `DUP-PAID`, `PAY-PAYEE-MISMATCH`, bank-change, write-off above threshold |
| Reason code | Mandatory |
| Logging | Old decision, new decision, user, time |
| Same-person ban | Override ≠ original vendor create ≠ payment release |

Repeated overrides of an exact duplicate rule mean the **normaliser is wrong**, not that the rule should go away.

---

## How you measure the split

| Metric | Formula |
|---|---|
| Human-class leakage | Execute events on human-class reason codes (target zero) |
| Override rate | Overrides / holds |
| Dual-control breaches | Single-person bank or payee overrides (target zero) |
| Fail-closed events | Stops because 10/index/envelope — count them; they are working |

---

## Worked example — ACME Manufacturing (fictional)

ACME (fictional) steel supplier emails: "Pay invoice 4500123 to IBAN DE89… (new). Production stops Friday." Invoice already match-ready after the GR. Proposal is tomorrow.

**Tree.**

1. Kill-switch off.
2. Paying is payment release → human (12 + treasurer).
3. New IBAN → bank-change human class. Agent 10 `ANOM-PAYEE-DETAIL`. Agent 08 does not reply "we will update."
4. Agent 12 holds the line `PAY-PAYEE-MISMATCH` even if the goods are real.
5. Vendor-master dual control runs **separately**. If they approve the IBAN, the **next** proposal may include it. This run does not.
6. AP Manager talks to the plant about supply risk. That conversation is not an agent decision.

**Wrong outcome.** Agent 12 release-recommended because the match was clean. Or Agent 08 accepts the IBAN.

---

## What can go wrong

- Treating "urgent" as a skip.
- Using model confidence as a second signature.
- Letting 08 send from a new email on the invoice.
- Letting 05 post GR from the invoice to protect a supplier relationship.
- Writing "agent approved payment" in ERP text.

---

## How you control it

- Reason codes in config.
- Orchestrator cannot clear them.
- Charters in this library state the line per agent.
- Sampling includes "was this a human class?"

Evidence decides. Permission follows.
