# AGENT 08 — Supplier Resolution

**Stack position:** Drafts external queries when Triage says the next fact sits with the supplier. Tracks replies. Never commits the company.  
**Default autonomy:** L1 Recommend (draft only).  
**Human owner (typical):** AP Supplier Desk / Vendor Master Lead  
**Payment authority:** None.  
**Northline instance:** Shared mailbox `ap.suppliers@northline.example`; send only after human approval; no legal or settlement language.

---

## 1. Position in the stack

Supplier Resolution is a **correspondence factory with a muzzle**. It writes the question AP meant to ask, attaches the facts, and files the reply. It does not negotiate, promise a pay date, agree a price, or accept a concession. If a sentence would bind Northline, it does not belong in the draft.

---

## 2. Job description

The Supplier Resolution Agent prepares supplier-facing drafts for coded issues: invoice error, missing credit, quantity overbill, price disagreement, missing tax fields, statement-only items, and dunning responses that are factual. A named human edits and sends (or, at earned L2, approves send of a whitelist template). The agent files inbound replies to the work object and extracts *claimed* facts for humans to verify in ERP.

---

## 3. Operating intent and cadence

| Mode | Cadence | Output |
|---|---|---|
| Object-driven | On Triage next=08 or Intake class `dunning` | Draft |
| Inbound file | Mail poll | Reply attached to object |
| Aging | Daily | Sent-waiting-reply |
| Weekly | Friday | Vendor-level repeat issues → Agents 06/15 |

---

## 4. Inputs

| Input | Source | Mandatory |
|---|---|---|
| Triage + worksheets + GR facts | 03/04/05/11 | Y |
| Allowed template book `AP-SUP-001` | Controlled | Y |
| Forbidden-phrase list | Controlled | Y |
| Vendor contact (AR email) | Vendor master / last letter | Y — else QUERY |
| Prior correspondence | Evidence store | N |
| Dunning / statement artefacts | 01 / 11 | If that path |

---

## 5. Tools / data required

| Tool | Privilege |
|---|---|
| Template book + forbidden list | Read, hashed |
| Mailbox | Read inbound; **no send** at L0/L1 |
| Vendor contacts | Read |
| Orchestrator | Write drafts and reply files |
| ERP | Read to verify claimed invoice/credit IDs |

L2 send, if ever chartered, uses a controlled send path with an approval token — still not a free mailbox.

---

## 6. Responsibilities

1. Choose a template from the book. If no template fits, `QUERY_TEMPLATE` — do not free-compose commercial language.
2. Fill facts only: invoice numbers, quantities, PO, what warehouse recorded, what AP shows open. No adjectives about the supplier.
3. Run forbidden-phrase scan (see §7 and §20). Fail the draft if any hit.
4. Present draft to Supplier Desk human. Record edits (they train the template book, not a hidden prompt).
5. After human send, start reply SLA (Northline: 7 calendar days monitor, not a contractual deadline promised to the vendor).
6. File replies. Extract claimed credit numbers, revised invoices — mark `UNVERIFIED` until ERP shows them.
7. Never add a statement line to a payment proposal because the supplier says it is overdue.
8. Dunning response template: facts of what is open, what is held and why (process, not argument), who at Northline owns it. No pay-date promise.

---

## 7. Explicit exclusions

1. Payment authorisation, promised pay date, or “we will include you on Thursday.”
2. Agreeing price, quantity, interest, or concession.
3. Legal, collection, or settlement language.
4. Vendor bank-detail change (“please use this account”) — route to Vendor Master dual control; do not confirm.
5. Sending at L0/L1.
6. Free-composing outside the template book.
7. Threatening or blaming language.
8. Discussing other vendors or volume commitments.
9. Calling a duplicate flag “fraud.”
10. Binding tax advice.

Forbidden phrases (scan list — extend in the charter):  
`will pay`, `will be paid`, `payment date`, `we agree`, `we accept`, `please update the PO`, `we authorise`, `settlement`, `without prejudice` (unless Legal template), `fraud`, `guaranteed`, `as per our verbal`, `CFO approved`, `ignore the discrepancy`.

---

## 8. Human owner

| Field | Northline |
|---|---|
| Role / name | AP Supplier Desk Lead / Olivia Grant |
| Backup | Vendor Master Lead |
| Escalation | AP Manager; Legal if supplier sends legal notice |
| Owns | Template book with Legal/AP; send discipline; contact quality |
| Does not own | Buying, cash, disputes above threshold |

---

## 9. Approval requirements

| Action | Human |
|---|---|
| Every send at L1 | Supplier Desk (or named deputy) |
| Template add/change | Desk + AP Manager + Legal if commitment-adjacent |
| L2 auto-send whitelist | Only `missing_copy` and `please_resubmit_tax_fields` if gates pass |
| Concession / debit / credit accept | Buyer or Controller per threshold |
| Bank change in inbound mail | Vendor Master dual control — stop this agent |

---

## 10. Escalation criteria

| Condition | To | Timing |
|---|---|---|
| Inbound legal notice / attorney | Legal + AP Manager | Immediate; agent stops drafting |
| Inbound new bank details | Vendor Master + Controls | Immediate |
| No reply 7 days | Desk; optional second template `chaser_facts_only` | Day 7 |
| Stop-ship threat | Procurement commercial human | Immediate; agent does not reply |
| Repeat same issue ≥ 5 invoices | Agents 06/15 + buyer | Weekly |
| Forbidden phrase in *human* edit | Desk Lead coaching | Same day |

---

## 11. Output standard

Draft: object ID; template ID + hash; filled facts; scan result `CLEAN`; language `no_commitment`; recipient; owner; agent `08`; level; “not sent.”

Send record (human): message ID, time, person.

Reply record: attachment URI; extracted claims `UNVERIFIED`; flags `LEGAL`, `BANK_CHANGE`, `STOP_SHIP`.

---

## 12. Control requirements

| Control | Support | Test |
|---|---|---|
| No unauthorised send | No send privilege L1 | Mail gateway |
| No commitment language | Scan + sample | 25 drafts/week |
| Bank change path | Divert | Inject test |
| Legal path | Divert | Tabletop |
| SoD | Desk ≠ payment releaser | Roles |

---

## 13. Audit evidence

Drafts, edits, sends, replies 7 years; template versions life-of-programme; incident (legal/bank) 7 years; scan logs 1 year.

---

## 14. KPIs

| KPI | Definition | Use |
|---|---|---|
| Scan fail rate | Drafts blocked | Template quality |
| Human edit distance | Material rewrites | Template fit |
| Mis-template rate | Desk changes template | Taxonomy |
| Unverified-claim leak (used as fact) | Should be ~0 | Control |
| Time to human send | | Flow |
| Cost | | Brake |

No “supplier satisfaction” or savings KPI.

---

## 15. Performance history fields

Period; drafts; templates; scan fails; sends; legal/bank/stop-ship flags; edit distance; unverified leaks; level; incidents; cost.

---

## 16. Autonomy level

| Level | Behaviour |
|---|---|
| L0 | Shadow drafts |
| L1 | Drafts; human send | **Default** |
| L2 | Prepare + one-click send after human token; optional whitelist auto-send of non-commitment templates |
| L3 | Auto-send *only* `missing_copy` / tax-field resubmit on whitelist vendors |
| L4 | Exception oversight of that send list |

No L3 commercial letters. No pay-date template at any level.

---

## 17. Failure handling

| Failure | Action |
|---|---|
| No contact on vendor | QUERY Vendor Master; do not use a personal buyer email as if it were AR |
| Scan engine down | No draft release |
| Mailbox send accidentally granted | Incident; revoke; L0 |
| Reply cannot attach to object | Human file; do not lose the letter |

---

## 18. Cost monitoring

Model, desk edit minutes. Pause L1 if edit distance stays high — templates are wrong. Pause all send paths if any unauthorised send occurs.

---

## 19. Handoffs

04/05/11/01(dunning)→08; 08→human send; inbound→08 file; 08→03 when verified credit/revised invoice in ERP; 08→Vendor Master on bank; 08→Legal on notice; 08→06/15; 08→16.

---

## 20. Configuration parameters

| Parameter | Northline start |
|---|---|
| Template book | `AP-SUP-001` |
| Forbidden list | §7 |
| Reply monitor | 7 days |
| Live send | Human only |
| Languages | EN drafts; ES/FR human only in Wave 1 |

---

## 21. First 90 days

Write five templates only: missing invoice copy, tax-field resubmit, qty overbill question, price question (no accept), dunning factual response. Legal reads them once. Measure edit distance. Do not invent a sixth template in a prompt.

---

## 22. Worked example — Northline Industrials

**`WO-1048821` warehouse confirmed SHORT 20 EA damaged.**

Template `qty_question_v3`. Facts: PO 45007821, invoice 459102, received 980, invoiced 1,000, item FS-440. Question: credit 20 EA or revised invoice? No “we will pay the 980 on Thursday.” No “we agree the unit price.”

Olivia edits one sentence for tone, sends. Reply three days later: “Credit CM-992 will issue.” Agent files, mark `UNVERIFIED`. When D365 shows CM-992, Agent 03 rematch path opens. Payment proposal never included a promised date.

**Same week:** dunning from a tooling vendor, $27,000. Intake classed `dunning`. Draft lists what is open vs held (`QTY_OVER` on another object) with object-safe language. Supplier Desk sends. Agent 12 is not told to add the dunning amount.

**Inbound:** “New wiring instructions.” Agent stops. Vendor Master + Controls. Dual-control procedure. Agent 08 does not thank them or confirm.

---

## 23. Sample output artefact (abridged)

```
object_id: WO-1048821
agent_id: 08
template: qty_question_v3
scan: CLEAN
commitment: false
pay_date_mentioned: false
state: DRAFT_NOT_SENT
owner: Olivia Grant
autonomy_level: L1
```

---

## 24. What this agent does not replace

Vendor management, Legal, commercial negotiation, or Vendor Master. It replaces ad-hoc AP emails that accidentally promise cash.

---

## 25. Document control

| Field | Value |
|---|---|
| Spec | AGENT_08 Supplier Resolution |
| Default autonomy | L1 (start L0) |
