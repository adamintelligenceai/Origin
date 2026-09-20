# AP Agent Readiness Diagnostic

**Evidence Room · Free evaluation**  
**Version:** 1.0 · September 2026  
**Licence:** Evaluation — personal use, no redistribution  
**Time:** One working session (60–90 minutes), not a coffee  
**Companion:** `SCORECARD_WORKSHEET.md`  
**Worked example:** Northline Industrial Group is fictional. Not a client. Not your answers.

You leave with a readiness level (0–4), a gap map, a ten-agent opportunity view, and a next step. The next step may be **wait**.

This diagnostic does not calculate savings or ROI. It does not certify compliance, SOX, or audit readiness. It does not detect fraud. It does not tell you which vendor to buy. It does not connect to your ERP.

**Responsibility is earned.**

---

## How to take it

1. Answer for the environment you **actually run** — one primary entity and one primary ledger if the group is messy. If you run two books, take it twice or mark the weaker one.
2. Use the worksheet. Score each question 0 / 1 / 2. Do not invent a 3.
3. Do not send invoice data, vendor masters, or colleagues’ personal data to Evidence Room. Complete locally.
4. One owner is enough. A working group can take it separately and compare. Disagreement is useful.
5. After scoring, write the paste-ready paragraph in §9 before you open a vendor deck.

**Scoring key (every question):**

| Score | Meaning |
|---|---|
| **0** | Absent, unknown, or tribal. You could not show an artefact this week. |
| **1** | Partial. A policy, a tool, or a person exists, but it would not survive a Tuesday exception and an auditor on the same day. |
| **2** | Present and operable. Named owner, artefact, and a reader who is not the author. |

If you are unsure, score **0**. Optimism is a finding.

---

## The six domains

Thirty-six questions. Six each.

| Domain | Code | What it tests |
|---|---|---|
| Process | P01–P06 | Whether the *live* invoice-to-pay path is known |
| Data | D01–D06 | Whether identity, completeness, and lineage exist |
| Controls | C01–C06 | Whether money, vendors, and evidence are fenced |
| People | H01–H06 | Whether ownership is a name, not a queue |
| Systems | S01–S06 | Whether the stack can host a governed agent layer |
| Economics | E01–E06 | Whether you can measure cost and cash *without* inventing a case |

Maximum 72 points. See §7 for levels.

---

## 1. Process (P)

### P01 — Live path, not policy path

Can you draw receipt → capture → code → match → exception → approve → schedule → pay → archive as it happens on a Tuesday, and would the people who work exceptions recognise it?

**2** = a dated map the floor has marked. **1** = an SOP or Visio from the last project. **0** = “everyone knows.”

### P02 — Invoice classes are named

Have you written the classes you actually process (PO, non-PO, utility, freight, intercompany, employee, credit notes) with approximate mix?

**2** = mix from the ledger, last quarter. **1** = a list without volume. **0** = “mostly PO.”

### P03 — Exception codes are shared

Do intake, matching, and the ticket tool use one taxonomy (or a mapped set), not local synonyms?

**2** = a code list used in tickets *and* reporting. **1** = a list in a drawer. **0** = free-text reasons.

### P04 — Where work waits is known

Can you name the three longest waits (GR, requester silence, supplier data, approval, coding) with a median or a p90, even if ugly?

**2** = ageing from the system. **1** = a supervisor’s estimate written down. **0** = not discussed as waits.

### P05 — Completeness of inbound channels

Is every live channel (mailbox, portal, EDI, e-invoice, scan) listed, and is yesterday’s inbound count reconcilable to created documents?

**2** = daily completeness. **1** = a channel list. **0** = invoices “just appear.”

### P06 — Close and payment are on the same map

Does the path include payment proposal and period close, or does the map stop at “posted”?

**2** = pay and close are drawn, with owners. **1** = mentioned. **0** = out of scope because “that’s Treasury / Accounting.”

---

## 2. Data (D)

### D01 — Invoice identity

Can you state the natural key you use to call two documents “the same invoice” (entity, vendor, number, date, amount, currency, plus e-invoice UUID if you have one)?

**2** = written and used in duplicate screening. **1** = “invoice number + vendor.” **0** = not defined.

### D02 — Vendor cross-walk

If you run more than one ledger, can you join the same legal supplier across systems without a hero spreadsheet?

**2** = maintained cross-walk. **1** = a spreadsheet someone owns. **0** = we discover it at payment.

### D03 — Required fields for match

Are PO, GR, tax, currency, and coding fields defined as required *before* match is attempted?

**2** = a field standard. **1** = processors know. **0** = match is attempted on whatever arrived.

### D04 — Lineage for a posted invoice

From a posted document, can you retrieve the source file, extract, matcher decision, and approver in one pull?

**2** = Internal Audit can pull without a screen-share. **1** = you can reconstruct in a day. **0** = not reconstructable.

### D05 — Golden set or labelled sample

Do you have any labelled set (even 50 documents) for extract / class / match that is not “the clerk agreed”?

**2** = a dated sample with dual review. **1** = a folder of “good invoices.” **0** = none.

### D06 — Untrusted input is treated as untrusted

Are invoice PDFs and supplier emails treated as untrusted (prompt-injection / instruction-in-document is a logged event, not an instruction)?

**2** = written handling. **1** = “we would notice.” **0** = never discussed.

---

## 3. Controls (C)

### C01 — Payment release is human

Is payment file / bank batch / positive-pay release a named human control, and would an “AI agent” be refused if it offered to send the file?

**2** = written, tested, dual control as policy requires. **1** = “of course a human pays.” **0** = not written; a demo has already offered to pay.

### C02 — Vendor bank and tax-ID changes

Are create, bank-detail, and tax-ID changes dual-controlled and out-of-band verified?

**2** = procedure + evidence. **1** = ERP workflow only. **0** = AP can change bank details.

### C03 — Delegation of authority

Is the approval matrix versioned, dated, and actually what the workflow uses?

**2** = version matches the tool. **1** = a matrix exists. **0** = approvers are tribal.

### C04 — SOD on posting vs paying

Is the identity that posts invoices barred from releasing cash — including any *system* user you would give an agent?

**2** = matrix includes system identities. **1** = people only. **0** = shared robot user.

### C05 — Exception override is logged

When someone overrides a match fail, a duplicate hold, or a SoD fail, is the reason coded and retained?

**2** = coded overrides, reviewable. **1** = a comment. **0** = silent force-post.

### C06 — Kill switch

If an agent (or a vendor workflow) had to be stopped this afternoon, can you name who pulls it and what actually stops?

**2** = named owner, rehearsed. **1** = “we would call IT.” **0** = no one has asked.

---

## 4. People (H)

### H01 — Named process owner

Is there a human who owns AP process design (not a steering committee inbox)?

**2** = named, accepted. **1** = a title on a slide. **0** = unclear.

### H02 — Named control owner

Is there a human who can veto an unsafe expansion of an agent or a workflow?

**2** = named, has vetoed something in the last year. **1** = Internal Audit exists. **0** = the project owns itself.

### H03 — Exception capacity is known

Do you know how many people actually work exceptions, and what happens when two of them are out?

**2** = roster + backup. **1** = a team size. **0** = “we cope.”

### H04 — Incentives

Are people rewarded for speed or STP *without* a paired control or quality measure?

**2** = incentives include control/quality, or there is no STP bonus. **1** = mixed. **0** = speed is the only score.

### H05 — Skills for a steward

Is there someone who can write a one-sentence purpose, a fence, and an escalation list — or is “AI” parked with the vendor manager?

**2** = a steward exists or is designated. **1** = a curious lead. **0** = no one will own the brief.

### H06 — Executive reader

Is there a CFO, Controller, or delegate who will read a twelve-minute brief and is allowed to say no?

**2** = named reader, date available. **1** = “we will find time.” **0** = the project will go to steering as a demo.

---

## 5. Systems (S)

### S01 — System of record is unambiguous

For the slice you would fence first, which system is the book of record — and do people still keep a parallel tracker?

**2** = one book, tracker is reporting only. **1** = ERP plus a shadow file. **0** = the shadow file is the book.

### S02 — AP automation / capture estate

Can you list capture, workflow, and archive tools *and* say which job they already do well (so you do not buy an agent to re-do a rule)?

**2** = inventory with “deterministic already.” **1** = a vendor list. **0** = unknown.

### S03 — Read access for observation

Could a read-only identity see inbound artefacts, parked documents, and open items for one company code without a six-month project?

**2** = yes, or a documented extract. **1** = maybe, untested. **0** = no path.

### S04 — Write identity would be named

If anything ever posted, would it use a *named* system user per agent per ledger, not a shared robot?

**2** = identity standard exists. **1** = “we would set one up.” **0** = everyone shares `RPA_AP`.

### S05 — Dual-ledger honesty

If you have two ledgers, is there a written rule that a post in one is not permission to post in the other?

**2** = written. **1** = understood. **0** = acquired entity is “the same AP.”

### S06 — Change control for rules and prompts

Would a change to match tolerances, reason codes, or (later) prompts follow the same path as ERP configuration?

**2** = change ticket + recert. **1** = a spreadsheet of rules. **0** = the intern edits the prompt.

---

## 6. Economics (E)

Answer with **your** numbers. Do not paste a blog.

### E01 — Volume of the first slice

Do you know invoices (and credits, if you include them) per month for the entity/class you would fence first?

**2** = ledger count, last quarter. **1** = a round number. **0** = group total only.

### E02 — Exception rate baseline

Do you have an exception rate for that slice, with a definition (what counts as an exception)?

**2** = defined rate. **1** = “about a quarter.” **0** = unknown.

### E03 — Time-to-post baseline

Median (or p50/p90) hours or days from intake-complete to posted, same slice?

**2** = system timestamps. **1** = a sample of 30. **0** = not measured.

### E04 — Loaded cost definition

Has FP&A (or you, written) defined what “AP cost for this slice” includes — and excluded procurement, receiving, and bank fees unless disclosed?

**2** = a definition. **1** = a budget line. **0** = you are waiting for a $12 vs $3 industry figure.

### E05 — What is *not* cash

Have you written that hours are not savings until overtime, contractors, or fees actually leave the cost base?

**2** = written, shared with the sponsor. **1** = you know. **0** = the deck already multiplies hours × rate.

### E06 — Industry figures are labelled

If you cite Ardent Partners 2024 Best-in-Class (78% lower cost, 82% faster, 59% lower exceptions, 9% exception rate) or any vendor dollar, do you treat them as **context**, not your target?

**2** = citations labelled; your F1_b sits beside them. **1** = you have heard the numbers. **0** = the business case *is* those numbers.

Vendor blogs routinely recycle **$10–$15 vs $2–$3** per invoice. Those are unverified absolute dollars. They are not your cost.

---

## 7. Scoring model

### 7.1 Totals

| Domain | Questions | Max |
|---|---|---|
| Process | P01–P06 | 12 |
| Data | D01–D06 | 12 |
| Controls | C01–C06 | 12 |
| People | H01–H06 | 12 |
| Systems | S01–S06 | 12 |
| Economics | E01–E06 | 12 |
| **Total** | 36 | **72** |

**Hard gates** (cannot be “averaged away”):

- If **C01 = 0** (payment release not human / not written), cap the overall level at **1** and write “do not proceed to any payment-adjacent agent.”
- If **P01 = 0** and **P05 = 0**, the Diagnostic tells you to **wait** and map before buying more.
- If **E05 = 0** and **E06 = 0**, mark the business-case starter **unsafe** — you will invent a saving.

### 7.2 Readiness levels

These levels describe **agent-layer readiness**, not AP automation maturity. A team can have a strong AP suite and still be Level 0 on agents.

| Level | Name | Typical total | Meaning |
|---|---|---|---|
| **0** | Unscoped | 0–17 | AI is a topic. No agent has a written job. The live path is not evidenced. |
| **1** | Tool-led | 18–35 | A vendor or model is in trial, or tools are strong, but ownership and fences are unclear. |
| **2** | Designed | 36–49 | One agent *could* have purpose, fence, and a human owner. Gaps are named. |
| **3** | Governed | 50–61 | Controls, evidence, and a review cadence can exist for that agent. Economics are not folklore. |
| **4** | Operating | 62–72 | Measures can be read on a schedule. Change control exists. Scale would be deliberate. |

**Override toward the lower level** if any domain scores ≤ 2/12. A 60-point total with Controls at 2 is not Level 3. It is Level 1 with a good process story.

Most teams that “have AI in AP” land at 0 or 1. That is a coordinate.

### 7.3 Maturity stages (how to talk about it)

Use these in a note to a Controller. They map to the levels.

| Stage | Level | What “good next” is |
|---|---|---|
| Topic | 0 | Map one live class. Do not buy more toolkit than Diagnostic notes. |
| Trial | 1 | Fence the trial you already have. Starter. |
| Design | 2 | Write charter + controls + three measures. Professional. |
| Govern | 3 | Register, sample, kill switch, IA sighting. Team if several people must move. |
| Operate | 4 | Recertify. Expand class only when boringly stable. Custom only if the toolkit will not fit. |

---

## 8. Ten-agent opportunity overview

This is a **subset of sixteen**. It is not a shopping list. Score each 0–2 for *fit this year* using the rubric below. Full charters live in Professional. Starter condenses the same ten.

Forrester (March 2025) maps current AI AP use cases to six clusters: capture, matching, reporting, fraud management, payment management, e-invoicing/tax. These ten cover those clusters and add triage, goods-receipt chase, supplier resolution, and orchestration. Fraud-adjacent work is **duplicate and anomaly screening**, not a fraud-detection guarantee.

| ID | Agent | Starts at | Score 2 if… | Score 0 if… | Typical first fence |
|---|---|---|---|---|---|
| A01 | Invoice Intake | 1 | Channels listed; extract is a known pain | Invoices already structured e-invoice only and complete | One mailbox + one portal, one entity |
| A02 | Invoice Validation | 1 | Tax/vendor/coding fails are common and coded | Validation is already a tight rule engine | Same class as A01 |
| A03 | Matching | 1 | PO volume; tolerances exist on paper | No PO discipline; match is political | PO, one currency, amount cap |
| A04 | Exception Triage | 1 | Free-text reasons; ageing is a surprise | Codes already route cleanly | Top five reason codes |
| A05 | Goods Receipt | 0 | GR-MISS is a top wait | Receiving will reject any chase | One plant, one buyer group |
| A07 | Approval | 0 | Approval ageing is visible | DOA is broken — fix DOA first | Non-PO or over-tolerance only |
| A08 | Supplier Resolution | 1 | Supplier inquiries consume time | Master data is a war zone with no owner | Draft queries only; no send |
| A10 | Duplicate & Anomaly | 1 | No exact-key block, or near-dupes are folklore | Exact-key already blocks 100% and is evidenced | Exact-key first; near-dupe later |
| A12 | Payment Proposal Review | 0 | Proposal is large and lightly challenged | Anyone suggests the agent *releases* | Observe one run; never pay |
| A16 | Orchestrator | 1 | Work is already multi-queue | You do not yet have a second agent | Dispatch + autonomy register only |

**Fit score (0–20)** is optional. It does **not** raise your readiness level. A high fit score with Level 0 means you have *demand*, not *readiness*.

**Not in the free ten (Professional):** A06 PO Quality, A09 Internal Follow-Up, A11 Vendor Statements, A13 AP Close, A14 Reporting, A15 Root Cause. Do not start those from a Diagnostic alone.

### 8.1 Heatmap — how to draw and read it

On the worksheet, plot **Domain scores /12** as a row, and **Agent fit 0–2** as a second row.

```
                 P   D   C   H   S   E
Northline ex.    7   5   8   6   6   4     ← illustrative, fictional
                 A01 A02 A03 A04 A05 A07 A08 A10 A12 A16
Fit (ex.)        2   2   2   2   2   1   2   2   1   2
```

**Interpretation rules:**

1. **Dark controls, dark economics** (C and E both ≥ 8) and pale process (P ≤ 4): you are ready to *measure a tool you already bought*, not to add agents. Map first.
2. **Dark process, pale controls** (P ≥ 8, C ≤ 4): you will automate a path you cannot defend. Stop. Write C01–C06.
3. **A12 fit = 2 and C01 = 0:** invalid. Rescore A12 to 0. Payment observation requires a written human release.
4. **Every agent fit = 2:** you did not fence. Recheck. Ten agents in year one is a control decision, not a Diagnostic outcome.
5. **A05 = 2 and you have no receiving owner:** the fit is political. Score 0 until Warehouse names a human.

**Northline (illustrative, fictional).** 4,200 employees; ~18,000 invoices/month; SAP + NetSuite Pacific; 14-person AP. They score Level 1: tools exist (capture suite on SAP), ownership of “the AI” is the vendor manager, NetSuite has no cross-walk (D02 = 0), payment is human (C01 = 2), economics still wants a blog dollar (E04 = 1, E06 = 0). Heatmap says: fence A03+A10 on SAP NL10 PO ≤ $25k; leave A12 at Observe; do not touch NetSuite. That is a next step, not a result.

---

## 9. Business-case starter (not a case)

Use this page to stop a bad case, or to start a *proposal* that uses **your** baseline. Professional contains the full model. This is enough for an email.

**Paste-ready paragraph** (fill the brackets; delete the brackets):

> We completed the Evidence Room AP Agent Readiness Diagnostic for [entity / ledger]. We are at **Level [0–4]**. Weakest domains: [domain] and [domain]. We will not use industry cost-per-invoice figures as our baseline. Our slice is [class, volume/month]. We will [map the live path / fence the current trial / write one agent brief] before any production agent. We are not claiming savings, fraud detection, compliance, or ROI. Payment release remains human.

**Input scraps** (only if you scored E01–E04 at 1 or 2):

| Scrap | Your figure | Source |
|---|---|---|
| Slice volume / month | | ERP |
| Exception rate (defined) | | Tickets / ERP |
| Median time-to-post | | Timestamps |
| Loaded AP cost for the slice / year | | FP&A — or “not yet” |

**Forbidden in the email:** a 3–5× ROI, a $12 vs $3 comparison as *our* opportunity, “the agent will pay itself,” Ardent gaps applied as a multiplier.

Ardent Partners (2024) Best-in-Class *relative* gaps — 78% lower cost, 82% faster, 59% lower exceptions, 9% exception rate — may appear as a **one-line footnote**: *industry research, not our target.* Then return to your numbers.

---

## 10. Recommended next step

| If you find… | Then |
|---|---|
| Level 0, and P01 or P05 is 0 | Stay with these notes. Map one invoice class. Do not buy more yet. |
| Level 1, a vendor already in the building | Starter ($79) — fence that trial. |
| Level 1–2, and you will own the method | Professional ($199). |
| Several people must implement | Team ($499). |
| A named environment a toolkit will not fit | Custom Blueprint application. |
| C01 = 0 | Write the payment-release control. Do not discuss A12 as execute. |
| E05 = E06 = 0 | Rewrite the sponsor deck before any purchase. |

The Diagnostic is allowed to tell you not to buy.

---

## 11. Downloadable scorecard — instructions

The fillable sheet is `SCORECARD_WORKSHEET.md`. If you export it:

1. Copy the worksheet to your own store (Word, Sheets, or paper). Do not send completed scores to hello@evidenceroom.ai.
2. Keep the 0/1/2 key on page one.
3. Compute domain totals and the hard-gate flags automatically if you build a sheet — or by hand. Formula: `domain = sum of six items`; `total = sum of domains`; `level` from the table in §7.2; then apply hard gates and the “any domain ≤ 2” override.
4. Print the heatmap as two rows, not a colourful dashboard that implies a result.
5. Store the completed scorecard with the same retention as other finance working papers. It is your artefact, not ours.
6. Licence: evaluation use. Not a client deliverable. Not for resale or republishing.

A rendered PDF/DOCX may ship in `ER-DIAGNOSTIC.zip` as `AP_AGENT_READINESS_DIAGNOSTIC.pdf`. This markdown is the source of truth if they differ.

---

## 12. What you may tell a Controller today

- You have a level and two weakest domains.
- You have a named next artefact (a map, a fence, or a brief).
- You have refused a list of claims.
- You have not selected a model.

That is a serious start.

---

## Document control

| Item | Value |
|---|---|
| Owner | Evidence Room — AP Agent OS |
| Advice status | Not legal, tax, accounting, or investment advice |
| Related | `SCORECARD_WORKSHEET.md` · `00_READ_ME/QUICK_START.md` · `02_AP_AGENT_STARTER/STARTER_GUIDE.md` |
