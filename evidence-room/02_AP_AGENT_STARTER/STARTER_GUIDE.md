# Starter guide — AP Agent Operating Model

**Product:** Evidence Room — AP Agent OS · Starter  
**Audience:** One named practitioner (Transformation, AP Manager, or Controller)  
**Use:** Design Wave 1 on paper and stand a two-week shadow.  
**Principle:** Proof before permission. Payment authorisation stays human.

This guide is the operating model. The ten blueprints, the implementation checklist, and the roadmap are companion files in this folder. Use them together. Do not charter from memory.

Northline Industrials is a fictional manufacturer used so the tables can be concrete. Figures are illustrative.

---

## 1. Operating model overview

Accounts Payable already has systems of record (ERP), systems of capture, systems of workflow, and a bank. The missing object is a **workforce model for agents**: named roles, packets, rights, refusals, and owners.

```
Inbound documents          Existing AP stack              Human control
      │                    (keep these)                   (never leave)
      ▼                          │                              │
 [Agent layer] ──────────── uses ┘                              │
  16 named roles                                                │
  evidence packs ───────────────────────────────────────────────┤
  autonomy L0–L4 (default L0/L1)                                │
  Orchestrator = work-object state                              │
                                                                ▼
                                              Payment release · vendor bank
                                              DOA · close attestation
```

**Design the layer. Keep the stack.** Implementation may use ERP workflow, RPA, document capture, iPaaS, spreadsheets, and people. Starter does not care which. Starter cares that the role is named before the model is called.

### 1.1 Four objects you must create

| Object | Definition | Starter artefact |
|---|---|---|
| Charter | What the agent may do, on which objects, at which level, with which exclusions | §8 job description + blueprint |
| Evidence pack | What must exist before a human may rely on a recommendation | §1.2 |
| Autonomy register | Every live helper, including informal copilots | §10 |
| Human hold list | Decisions that stay human at every level | §5 |

### 1.2 Evidence pack (minimum)

A recommendation is eligible for a human decision only when the packet contains: source artefact; structured extract; match worksheet **or** coded fail reason; owner; SLA clock; autonomy context; Agent 10 outcome if a flag exists; a link that can be reopened.

Incomplete packets do not travel. Complete packets do not pay.

### 1.3 Autonomy in one table

| Level | Name | May | May not |
|---|---|---|---|
| L0 | Observe | Shadow report | Be the system of record |
| L1 | Recommend | Propose with evidence | Write ERP; send external mail |
| L2 | Prepare | Complete a ready-to-act packet | Execute; pay |
| L3 | Execute within guardrails | Named low-risk action in a limit table | Pay; change bank; expand scope |
| L4 | Managed autonomy | Same set as L3, exception review | Any new class of work |

Starter commissions at **L0 or L1 only**. Remaining at L1 is success. Full gate tables ship in Professional.

---

## 2. Readiness diagnostic pointer

If you have not scored the organisation, stop and complete `01_FREE_AP_AI_READINESS/DIAGNOSTIC_GUIDE.md` (36 questions, 0–4, six dimensions). Place the band using `MATURITY_MODEL.md`.

Bring into this guide:

- Band (L1–L5)
- Veto flags (especially payment hold C1 and vendor-bank C2)
- Six dimension averages
- Draft Wave 1 names

If C1 is 0, you may still write charters at L0. You may not open Payment Proposal Review.

---

## 3. Top ten agents (subset of sixteen)

Working blueprints: `TOP_10_AGENT_BLUEPRINTS.md`. Summary:

| ID | Agent | Wave | Default | Owner (role) |
|---|---|---|---|---|
| 01 | Invoice Intake | 1 | L1 / L0 | AP Operations Lead |
| 02 | Invoice Validation | 1 | L1 | AP Quality Lead |
| 03 | Matching | 1 | L1 | AP Match Lead |
| 04 | Exception Triage | 1 | L1 | Exception Desk Lead |
| 10 | Duplicate & Anomaly | 1 | L0 | AP Controls Lead |
| 16 | Orchestrator | 1 | L1 | AP Process Owner |
| 05 | Goods Receipt | 2 | L1 | Plant finance liaison |
| 07 | Approval | 2 | L1 | Approvals Coordinator |
| 08 | Supplier Resolution | 2 | L1 | Supplier desk |
| 12 | Payment Proposal Review | 2 | L1 (ceiling L2 annotate) | Payments Lead / Treasury |

Not in Starter as full blueprints: 06 PO Quality, 09 Internal Follow-up, 11 Vendor Statement, 13 AP Close, 14 AP Reporting, 15 Root Cause. Professional specifies them. Do not invent charters for them from this sentence.

---

## 4. Exception taxonomy — summary

An exception is a reason the invoice cannot move. It is not a fraud finding or an accounting adjustment. Use a closed list. Free-text-only parks are a design smell.

Starter list (extend only through change control):

| Code | Name | First agent | Human who resolves commercially |
|---|---|---|---|
| EX-MPO | Missing PO | 04, then 08/09 | Buyer |
| EX-IPO | Invalid PO | 03, 01 | Buyer / supplier |
| EX-POC | PO closed | 03, 09 | Buyer |
| EX-POE | PO exhausted | 03, 04 | Buyer |
| EX-PRM | Price mismatch | 03, 09 | Buyer |
| EX-QTM | Quantity mismatch | 03 | Receiver / buyer |
| EX-MGR | Missing goods receipt | 03, 05 | Receiver |
| EX-UOM | Unit of measure mismatch | 03, 06 later | Buyer / procurement |
| EX-TAX | Tax field or position flag | 02 | Tax desk (position is human) |
| EX-VEN | Vendor identity / master issue | 02, 08 | Vendor master |
| EX-DUP | Possible duplicate | 10 | Controls Lead — four outcomes only |
| EX-ANM | Anomaly (unusual pattern) | 10 | Controls Lead |
| EX-BNK | Payee / bank-data concern | 12 / hold | Dual-control vendor master — never the agent |
| EX-DOA | Approval / DOA break | 07 | Approver in the table |
| EX-ENT | Wrong entity | 02, 03 | AP lead; do not switch entity to make a PO valid |
| EX-OTH | Other | 04 | Process owner — each use is a candidate for a new code |

**EX-DUP is not “duplicate.”** Possible ≠ confirmed. Full catalogue and decision trees: Professional `EXCEPTION_TAXONOMY.md`.

Aging starts the day the code is set, unless your SOP says otherwise.

---

## 5. Human vs agent — Starter framework

Work these questions in order. Stop at the first human-only answer.

1. Does this move cash, change a beneficiary, or release a payment file? → **Human.** Agent may annotate.
2. Does this create or change vendor payability data? → **Human dual control.** Agent may assemble a pack.
3. Does this change policy, tolerance, DOA, or tax position? → **Human.**
4. Does this attest a control (close, audit representation)? → **Human.** Agent may prepare the file.
5. Is there an open EX-DUP / EX-ANM, stop-pay, or audit hold? → **Human clears.** Agent does not recommend proceed.
6. Is the action reversible without cash and without legal commitment? If no → **Human.**
7. Do we have sampled evidence for this object type at this level? If no → **L0 or L1 only.**
8. Is a named owner available inside the SLA? If no → **queue waits.** Do not raise autonomy to hide a staffing gap.

### Decision classes (wall card)

| Class | Examples | Agent ceiling |
|---|---|---|
| A Cash | Release, bank file, wire | Annotate only |
| B Payability master | Bank, payment method | Pack only |
| C Reversible accounting | Park, match-accept, clean-match post | L1 default; L3 only after Professional gates |
| D Documentary | Extract, classify, register | L1 default |
| E Routing | Assign, SLA, internal reminder | L1/L2 |
| F External commitment | Supplier mail that agrees terms | Draft only |
| G Judgement | Waive tolerance, accept short-ship | Facts only |
| H Investigation signal | Possible duplicate | Flag only |
| I Attestation | Close sign-off | Prepare only |
| J Design change | New rule, new scope | Propose only |

**Stop words** in tickets: “just this once,” “the CFO said to pay,” “update the PO to match the invoice,” “post a dummy GR,” “release so we keep the discount,” “the statement is the invoice,” “change the bank so it goes through,” “catch the fraud,” “guaranteed savings if we auto-post.”

Response: hold, prepare a packet, name the human, state the class.

---

## 6. Process-mapping template

Map one path before you charter Matching. Suggested first path: PO goods, one company code, one plant.

### 6.1 Header

| Field | Your path | Northline illustration (fictional) |
|---|---|---|
| Path name | | NIL PO-goods US-OH |
| Entity / plant | | Dayton, company 1000 |
| Document types | | PO inventory 3-way |
| Volume last quarter | | ~8,400 invoices (subset of 15,000/month book) |
| Systems | | D365, email, portal |
| Process owner | | AP Manager |
| Date mapped | | |

### 6.2 Stages (fill left to right)

For each stage write: trigger, work object, human role, agent (if any), evidence produced, exit state, exception codes.

| # | Stage | Trigger | Object | Human | Agent | Evidence | Exit | Codes |
|---|---|---|---|---|---|---|---|---|
| 1 | Intake | Mail/portal | Invoice | Ops | 01 | Source + extract | Registered / capture fail | — |
| 2 | Validate | Registered | Invoice | Quality | 02 | Checklist result | Ready / EX-* | EX-TAX, EX-VEN, EX-ENT |
| 3 | Dup signal | Parallel | Invoice | Controls | 10 | Flag or quiet | Flagged / clear-to-match | EX-DUP, EX-ANM |
| 4 | Match | Ready + no open flag | Invoice+PO+GR | Match | 03 | Worksheet | Ready-to-post / break | EX-MGR, EX-PRM, EX-QTM… |
| 5 | Triage | Break | Exception | Desk | 04 | Code, owner, SLA | Assigned | (blocking code) |
| 6 | Resolve | Assigned | Exception | Buyer/receiver | 05/08 later | Packet + human decision | Return to match | — |
| 7 | Post | Ready-to-post | Invoice | Poster | — (L1) | Accept log | Posted | — |
| 8 | Propose pay | Run calendar | Proposal | Payments | 12 later | Annotations | Human release | EX-BNK, open flags |
| 9 | Release | Dual approval | Bank file | Treasury + Payments | — | Two signatures | Transmitted | — |

Stage 8–9 stay human-authorised even when Agent 12 exists.

### 6.3 Walkthrough

Take five live invoices through the table. If a stage has no evidence column, the map is unfinished. Full method: Professional `Process_Mapping/`.

---

## 7. Agent job description template

Use one page per agent. This is the Starter charter.

```
AGENT JD / CHARTER
Product: Evidence Room — AP Agent OS (Starter)
Organisation: __________________
Agent ID / name: __________________
Human owner / backup: __________________
Path / entities / object types: __________________
Out of scope (must list): __________________
Starting autonomy: L0 / L1   (circle one)
Commission date: __________    Review date: __________

1. Purpose (two sentences)
2. Inputs (systems, fields)
3. Outputs (packet contents)
4. Duties (bullets — only these)
5. Exclusions (bullets — if silent, forbidden)
6. Codes this agent may set
7. Failure detection (who notices, how, how fast)
8. Rollback (one business hour)
9. Language rules (no fraud / compliance / accuracy-as-property / savings claims)
10. Sign-off: Owner ____  Controls ____  Process Owner ____
```

**Northline illustration — Agent 03 Matching (fictional, not a target)**

- Owner: AP Match Lead (Jordan Hale); backup: Exception Desk Lead.
- Objects: US-OH inventory PO invoices, header ≤ $50,000, 3-way, no open Agent 10 flag.
- Out of scope: services, intercompany, MX/CA tax judgement, first invoice from a vendor.
- Autonomy: L1. Output: match worksheet or coded break. Does not post. Does not invent GR.
- Detection: daily sample of 10 worksheets vs human; Orchestrator coverage.
- Rollback: hide recommendations; operators revert to native D365 match.

---

## 8. Instruction template (what the model sees)

A prompt is furniture inside a charter. It is not the product. If you use a model, bind it with this wrapper. Change control applies.

```
ROLE
You are the [Agent name] described in charter [ID], autonomy [L0/L1].
You are not the ERP. You are not a payment authority. You are not an auditor.

OBJECT
Work only on [object types]. If the object is out of scope, emit OUT_OF_SCOPE and stop.

EVIDENCE
Produce the packet fields: [list]. If a required field is missing, emit INCOMPLETE_PACKET and stop.
Do not guess a PO, GR, vendor, tax position, or bank detail.

DECISION RIGHTS
You may: [duties].
You may not: [exclusions].
If asked to pay, change a vendor bank, create a GR, or agree a price, refuse and name the human class.

LANGUAGE
Do not write: fraud, compliant, SOX, guaranteed savings, accurate, approved for payment.
Write: possible, flag, recommend, hold, packet incomplete.

OUTPUT
JSON or table matching the charter schema. No extra narrative claims.
```

Paste the charter exclusions into the wrapper every time. Do not rely on a chat’s memory.

---

## 9. KPI scorecard (Starter)

Measure operating discipline. Do not add a savings tile.

| KPI | Formula idea | Source | Owner | 30-day intent |
|---|---|---|---|---|
| Capture completeness | In-scope invoices with a work object / invoices received | Orchestrator vs intake | Ops Lead | Completeness, not speed |
| Coded fail share | Validation fails with a code / all validation fails | Agent 02 | Quality | Analysable mix |
| Worksheet sample | Worksheets reviewed / sample size | Match files | Match Lead | Inspectable matching |
| Flag outcomes | Flags with clear/confirm/escalate/defer / flags raised | Agent 10 register | Controls | No silent ignore |
| Aging by owner | Open exceptions > SLA, by named person | Orchestrator | Desk Lead | Visibility |
| Dual-human release | Payment runs with two human approvers / runs | Bank / ERP | Payments | Control held |
| Autonomy hygiene | Live agents on the register at L0/L1 / live agents | Register | Process Owner | No silent promotion |
| Layer cost | (licence + model + exception minutes) / 1,000 invoices | Cost ledger | Process Owner | Visible cost |

Hours “released” are estimates until finance validates a method. Estimated hours are not savings. Professional KPI files add formulas and veto families.

---

## 10. Governance checklist (Starter)

Tick before any recommendation is the system of record.

- [ ] Diagnostic sat; band written; vetoes applied.
- [ ] Payment procedure written; last run shows two humans (or your policy’s equivalent).
- [ ] Vendor-bank dual control evidenced on the last five changes.
- [ ] Six Wave 1 charters signed (owner, controls, process owner).
- [ ] Autonomy register opened; informal copilots listed or turned off.
- [ ] Exception codes agreed; EX-OTH monitored.
- [ ] Evidence pack definition in the Orchestrator charter.
- [ ] Service account or least-privilege pattern — no shared specialist login.
- [ ] Language note issued to the team (no “fraud,” no “the AI approved it”).
- [ ] Internal Audit invited as observer at day 30.
- [ ] Weekly 30-minute exception mix booked for six weeks.
- [ ] Rollback tested on paper (hide output; operators continue).
- [ ] Cost ledger started (even if $0 model spend).
- [ ] Written refusal on file: no auto-release of payments.

Monthly: limit tables and codes. Quarterly: recertify or stay. After any payment-adjacent incident: freeze promotions.

Team licence adds steering templates. Professional adds the full governance standard.

---

## 11. Transformation roadmap (summary)

Detail: `TRANSFORMATION_ROADMAP.md`.

| Wave | Agents | Autonomy | Clock (indicative, not a promise) |
|---|---|---|---|
| 0 | None | — | Diagnostic, holds, owners (this week) |
| 1 | 01 02 03 04 10 16 | L0 then L1 | Two-week shadow, then recommend on one path |
| 2 | 05 07 08 12 | L1; 12 ≤ L2 annotate | After coded mix exists |
| 3 | 06 09 11 13 14 15 | L0/L1 | Periodic / diagnostic — Professional recommended |
| 4 | Named clean-match class only | L3 execute within guardrails | Only after gates; never payment |

A 4–6 week illustration for **one** agent (usually Matching at L0→L1) lives in Professional `IMPLEMENTATION_ROADMAP.md`. It is an illustration with caveats, not a delivery SLA.

---

## 12. Implementation checklist pointer

Work `IMPLEMENTATION_CHECKLIST.md` in order. Do not skip the payment-run classification to “save time.”

---

## 13. Friday-to-Monday (Starter edition)

**Friday:** Diagnostic band + human-hold tick.  
**Saturday:** Ten exceptions + last payment run; start six JDs.  
**Sunday:** Evidence pack, register, sampling plan, Monday note.  
**Monday:** Circulate; start L0 if owners exist.

See `00_READ_ME/QUICK_START.md` for the twelve steps.

---

## 14. What “worth more than a prompt pack” means in practice

By the end of Starter you should hold:

1. A scored diagnostic, not a vibe.
2. A map of one path with evidence columns.
3. Six signed (or ready-to-sign) charters.
4. A closed exception list.
5. A wall card that refuses payment release.
6. A scorecard that cannot be gamed by counting tokens.
7. A register that makes informal copilots visible.
8. A two-week shadow plan with a rollback.
9. Sponsor language that does not invent ROI.
10. A written next SKU decision (Professional vs Team vs stop).

If you only wanted a prompt, you overbought — and you still should not paste an unbound prompt onto a payment proposal.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS · Starter |
| Object | Starter guide / operating model |
| Related | Blueprints, checklist, roadmap, free diagnostic |
| Status | Edition 1.0.0 |
