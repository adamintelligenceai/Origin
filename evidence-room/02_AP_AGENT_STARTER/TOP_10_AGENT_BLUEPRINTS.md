# Top ten agent blueprints

**Product:** Evidence Room — AP Agent OS · Starter  
**Use:** Charter Wave 1 and sketch Wave 2. Copy a blueprint into a JD (`STARTER_GUIDE.md` §7) and strike what is out of scope.  
**Not:** The Professional specification. If a blueprint and a later Professional spec differ, the Professional spec wins for Professional licensees.

Default autonomy is L0 or L1. Payment authorisation is never in these pages as an agent right.

Northline Industrials notes are fictional illustrations.

---

## How to commission from a blueprint

1. Confirm the fit test.
2. Name owner and backup.
3. Narrow object types until you can sample them.
4. Copy duties and exclusions verbatim, then add local systems.
5. Set autonomy L0 unless extract/match quality is already sampled.
6. Sign. If unsigned, the agent does not run.

---

## Blueprint 01 — Invoice Intake

**Fit test:** You can name inbound sources.  
**Owner:** AP Operations Lead  
**Default autonomy:** L1 if extract is sampled; else L0  
**Wave:** 1

**Purpose.** Register every in-scope inbound invoice as a work object with a retrievable source and a structured extract.

**Inputs.** Mailbox, portal, XML/EDI, scan; vendor master (read); company-code list.

**Outputs.** Work object ID; source URI; extract fields (supplier, invoice no., date, amounts, currency, PO if present, tax fields as printed); classification (PO / non-PO / recurring / unknown); confidence by field; `INCOMPLETE` or `REGISTERED`.

**Duties.**

- Detect inbound files and classify document type.
- Extract printed/structured fields; do not invent a PO number from “recent POs.”
- Register or return `INCOMPLETE_PACKET`.
- Hand to Validation. Emit `OUT_OF_SCOPE` for T&E, employee reimbursements, or unlisted entities.

**Exclusions.** Match; post; vendor create; tax position; changing the extract after a human has accepted it without a new version.

**Codes.** Capture fails only (unreadable, wrong document type). Do not set EX-PRM.

**Failure detection.** Daily count: invoices received vs. objects created. Sample 25 extracts against source.

**Rollback.** Stop registration; operators key as today.

**Northline (fictional).** Email + portal in-scope; Monterrey paper is a separate object type, L0 only.

**Instruction stub.** “If the PO is unreadable, leave PO blank and set INCOMPLETE. Do not borrow a PO from the last invoice.”

---

## Blueprint 02 — Invoice Validation

**Fit test:** A checklist will exist before go-live.  
**Owner:** AP Quality Lead  
**Default autonomy:** L1  
**Wave:** 1

**Purpose.** Test completeness, supplier identity, tax *fields*, entity, and posting readiness. Produce pass / fail / query with codes.

**Inputs.** Intake packet; vendor master (read); entity calendar; tax-field checklist (not a tax opinion library).

**Outputs.** `PASS`, `FAIL` + codes, or `QUERY`; coded reasons; fields that failed; recommended human (Quality, Vendor Master, Tax).

**Duties.**

- Apply the written checklist only.
- Compare supplier name/account to master; flag mismatch; do not merge vendors.
- Check tax fields are present and arithmetically consistent with the face *as printed*.
- Block match when EX-VEN, EX-ENT, or EX-TAX (field) is set.

**Exclusions.** Decide use-tax, GST/HST, or IVA position. Post. Approve. Clear EX-DUP.

**Failure detection.** Share of fails with EX-OTH; should fall as codes mature. Dual review of 20 fails per week in month one.

**Rollback.** Hide recommendations; Quality uses the native checklist.

**Northline (fictional).** Cross-border invoices always `QUERY` to Tax; Agent 02 does not “know IVA.”

---

## Blueprint 03 — Matching

**Fit test:** Written 2-way/3-way/GR-IR policy; PO and GR queryable.  
**Owner:** AP Match Lead  
**Default autonomy:** L1  
**Wave:** 1

**Purpose.** Apply the signed match tree and tolerance table. Emit a worksheet or a coded break.

**Inputs.** Validated invoice; PO; GR/IR or service entry; tolerance table (read-only); open Agent 10 flags.

**Outputs.** Worksheet (lines compared, tolerances applied, residual); `RECOMMEND_MATCH` or `BREAK` + code; `RECOMMEND_NO_ACTION_ANOMALY_HOLD` if a flag is open.

**Duties.**

- Select the tree (3-way, 2-way, GR-based) from policy, not from convenience.
- Apply tolerances; do not widen them.
- On missing GR, code EX-MGR and stop. Do not create a receipt.
- On price/qty/UoM/residual breaks, set the blocking code.

**Exclusions.** Invent PO or GR. Edit tolerance. Force-match. Post (even if the worksheet is perfect). Clear flags. Multi-PO or multi-entity unless in charter.

**Failure detection.** Sample 10 worksheets/day vs human on the same tree. Material disagreement logged, not argued away.

**Rollback.** Recommendations hidden; native ERP match.

**Northline (fictional).** US-OH inventory 3-way, header ≤ $50,000, no flags. Services and first-invoice-from-vendor out of Wave 1.

**Modifier rule.** Value, new vendor, related party, customs — any modifier raises the human, not the autonomy.

---

## Blueprint 04 — Exception Triage

**Fit test:** Closed code list exists.  
**Owner:** Exception Desk Lead  
**Default autonomy:** L1  
**Wave:** 1

**Purpose.** Name the blocking code, the owner, the next action, and the clock. Do not resolve.

**Inputs.** Break packet from 02/03/10; RACI for codes; SLA table.

**Outputs.** Code; owner role + named person if the roster allows; next action (chase supplier / chase receiver / wait Tax / hold); SLA start; escalation state.

**Duties.**

- Apply one blocking code first; record related codes in the pack.
- Assign from the RACI, not from who is online.
- Start aging on code date.
- Pass EX-MGR packets toward Agent 05 when that agent is chartered; until then, assign the plant liaison.

**Exclusions.** Waive PO. Accept price. Create GR. Write off. Change owner to “someone senior” outside DOA.

**Failure detection.** Open items without owner; EX-OTH share; SLA clocks not started.

**Rollback.** Desk assigns manually using the same code list.

**Northline (fictional).** Escalation: AP lead at the code’s working-day limit; process owner at 10 days for unreferenced missing PO.

---

## Blueprint 05 — Goods Receipt

**Fit test:** Missing GR is a material code. Wave 2.  
**Owner:** Plant / warehouse finance liaison  
**Default autonomy:** L1; L2 prepare only if chartered  
**Wave:** 2

**Purpose.** Detect missing or aged receipts and assemble a receiver packet. The receiver confirms or disputes.

**Inputs.** EX-MGR objects; PO; inbound delivery if any; prior receipts; warehouse roster.

**Outputs.** Packet: PO lines, invoiced qty, received qty, days aged, photos/IDs if available; draft question to the receiver; never a draft GR.

**Duties.**

- Build the packet.
- Name the receiver or liaison.
- Age the silence; hand to internal follow-up only when that agent exists.

**Exclusions.** Create or post a GR. Accept “post a dummy GR.” Change PO qty.

**Failure detection.** Packets sent vs. responses; any GR created without warehouse identity is an incident.

**Rollback.** Liaison chases with the same packet template, manually.

**Northline (fictional).** Birmingham aged GR; warehouse silent six days — packet, not a created receipt.

---

## Blueprint 06 — Approval (Agent 07)

**Fit test:** Non-PO or over-tolerance volume is material; DOA table exists.  
**Owner:** AP Approvals Coordinator  
**Default autonomy:** L1  
**Wave:** 2

**Purpose.** Route complete packets to the person in the DOA table. Chase completeness. Do not approve.

**Inputs.** Non-PO or over-tolerance invoice; DOA table (read); deputy list; packet from Validation.

**Outputs.** Route to named approver or deputy; `WAIT_NO_DEPUTY` if the table is empty; chase log.

**Duties.**

- Apply the table as written.
- If the owner is on leave, use the deputy in the table only.
- If no deputy, wait. Do not climb.

**Exclusions.** Approve. Edit DOA. “Approve on their behalf, they’re travelling.”

**Failure detection.** Routes to people not in the table; emergency DOA without a ticket.

**Rollback.** Coordinator routes in native workflow only.

**Northline (fictional).** $8,400 service invoice, cost-centre owner on leave, deputy in table — route to deputy. No deputy — wait.

---

## Blueprint 07 — Supplier Resolution (Agent 08)

**Fit test:** Supplier latency is measured.  
**Owner:** Supplier desk / Vendor Master  
**Default autonomy:** L1; send is human  
**Wave:** 2

**Purpose.** Draft a factual query. Track the reply. Commit nothing.

**Inputs.** Coded exception; invoice face; buyer instruction if required (price/PO).

**Outputs.** Draft email or portal message; correspondence URI; status `DRAFT` / `SENT_BY_HUMAN` / `REPLIED`.

**Duties.**

- Draft questions: “Please confirm the PO number on invoice [n].”
- After buyer instruction, draft a request for credit or revised invoice.
- Never thank them for agreeing a new price you did not have authority to accept.

**Exclusions.** Agree price, qty, due date, concession, or pay date. Change bank details. Create vendors. Send without approval if the charter says human-send.

**Failure detection.** Drafts that contain “we will pay,” “we accept,” or a date. Language sample weekly.

**Rollback.** Disable send; drafts remain internal.

**Northline (fictional).** Supplier says price is $12.10 not $11.40 — draft a question; buyer decides; Matching does not override.

---

## Blueprint 08 — Duplicate & Anomaly (Agent 10)

**Fit test:** Always. Especially if flags currently die in email.  
**Owner:** AP Controls Lead  
**Default autonomy:** **L0**  
**Wave:** 1

**Purpose.** Raise hypotheses. Do not verdict.

**Inputs.** Extract; recent invoices for the vendor; amounts; dates; payment history (read); new billing address signals.

**Outputs.** `FLAG` with reason codes (`possible_duplicate_invoice_no`, `possible_duplicate_amount_date`, `unusual_amount`, `new_remit_address`); or quiet. Never `FRAUD`.

**Human outcomes (only these):** Clear · Confirm · Escalate · Defer. The agent does not choose.

**Duties.**

- Shadow in week one: flags in a register, not in the operator’s critical path, unless Controls says otherwise.
- Attach the compared objects.
- Block Matching from `RECOMMEND_MATCH` while a flag is open (Orchestrator rule).

**Exclusions.** The word “fraud” in operator-facing text. Clearing a high-value flag. Releasing or holding payment autonomously. Claiming a detection rate.

**Failure detection.** Flags without outcomes after SLA; quiet month treated as “proof of no issue” (a reasoning error — call it out in the weekly).

**Rollback.** Register off; Controls reviews manually if a process exists; if none, that is a diagnostic finding, not a reason to skip this agent.

**Northline (fictional).** 0.8% suspect rate is an observational illustration, not a KPI target and not a fraud rate.

---

## Blueprint 09 — Payment Proposal Review (Agent 12)

**Fit test:** Payment hold is real (diagnostic C1 ≥ 3). Otherwise do not open.  
**Owner:** Treasury / AP Payments Lead  
**Default autonomy:** L1; **ceiling L2 annotate**  
**Wave:** 2

**Purpose.** Mark the proposal. Humans deselect. Humans release.

**Inputs.** Payment proposal / batch; open flags; bank-change log (last N days); holds (audit, stop-pay, sanctions review as *your* process provides — the agent does not perform screening).

**Outputs.** Line annotations: `HOLD_OPEN_FLAG`, `HOLD_BANK_CHANGE`, `HOLD_POLICY`, `NOTE`; never `APPROVE` or `RELEASE`.

**Duties.**

- List lines that should not travel with the run until a human decides.
- Quote the reason from the register, not from model “instinct.”

**Exclusions.** Authorise. Transmit. Deselect-and-release. Positive Pay decisions. “Release so we keep the discount.” Override of a policy hold.

**Failure detection.** Any annotation that uses approve/release language is a language incident. Any file that left without two humans is a control incident — the agent is demoted and the run is investigated by humans.

**Rollback.** Annotations off; proposal reviewed as today.

**Northline (fictional).** Tuesday, 612 lines, $4.1m illustrative; two uncleared flags; one bank change yesterday — annotate holds; Payments Lead + Treasury release the rest.

---

## Blueprint 10 — Orchestrator (Agent 16)

**Fit test:** A process owner exists.  
**Owner:** AP Process Owner  
**Default autonomy:** L1  
**Wave:** 1

**Purpose.** Be the system of record for work-object *state*. ERP remains the system of record for accounting.

**Work-object fields.** Object ID; source system; current agent; human owner; status (`new / in_review / waiting_internal / waiting_supplier / ready / held / closed`); autonomy context; evidence URI; SLA clock; escalation; cost token.

**Duties.**

- Create the object at intake.
- Enforce that incomplete packets do not move.
- Block match-recommend when a flag is open.
- Show aging by named owner.
- Record handoffs.

**Exclusions.** Post. Pay. Change vendor master. Pick an approver not in the DOA table. Expand another agent’s scope.

**Failure detection.** Objects without owners; objects that skip Validation; evidence URI 404s; silent status jumps to `closed`.

**Rollback.** Spreadsheet or ticket tool with the same fields; slower is acceptable.

**Northline (fictional).** One AP instance, four company codes — objects carry company code; Orchestrator does not switch entity to make a PO valid.

---

## Cross-blueprint rules

1. **Intake does not match. Matching does not invent receipts. Triage does not resolve.**
2. **Agent 10 output never contains “fraud.”**
3. **Agent 12 never contains “approved.”**
4. **If the blueprint is silent, the action is forbidden.**
5. **Staffing pressure does not edit exclusions.**
6. **A vendor feature that contradicts an exclusion is refused and filed.**

---

## Promotion (Starter ceiling)

Starter users may move L0 → L1 on a blueprint when:

- Shadow covered the in-scope objects for at least ten operating days.
- A sample of disagreements is written down.
- No out-of-charter objects were processed.
- Language sample is clean.
- Owner and backup are still in post.

L1 → L2 and any L3 discussion require Professional gate tables and a change-controlled case. Payment-adjacent work has no path to execute.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS · Starter |
| Object | Ten agent blueprints |
| Status | Edition 1.0.0 |
| Related | `STARTER_GUIDE.md`; Professional Agent_Library |
