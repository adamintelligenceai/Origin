# AP Agent Readiness Diagnostic — guide

**Product:** Evidence Room — AP Agent OS  
**Audience:** Finance Transformation lead, AP Manager, Controller, Internal Audit observer  
**Use:** Score the *agent layer* you have — or the absence of one — across six dimensions.  
**Not:** A certificate, an ROI model, a fraud assessment, or a compliance audit.

Northline Industrials appears as a fictional worked example. Do not copy its scores into a board pack as comparables.

---

## 1. How to sit the diagnostic

1. Appoint one scorer and one challenger. The challenger asks “show me the artefact.”
2. Answer every question. “Not applicable” is allowed only for Q-T4 (RPA/iPaaS) and Q-E6 (early-pay programme) if the object truly does not exist — score those as 0 and note “absent,” not “fine.”
3. Score **0–4** using the rubric below. Use the lowest score that is fully true. Partial credit is not a 3.
4. Record the artefact (report name, SOP ID, ticket, or “none”).
5. Average each dimension (six questions). Do **not** average the six dimensions into one corporate grade.
6. Apply the veto rules in §4 before you speak a band.
7. Place the organisation on `MATURITY_MODEL.md`.
8. Fill the heatmap and the first-wave recommendation in §7–§8.

Timebox: 60 minutes. If a question takes more than four minutes, score 0 or 1 and move on. Mystery is a score.

---

## 2. Scoring rubric (0–4)

| Score | Meaning | Evidence test |
|---|---|---|
| **0** | Absent | No artefact. Recollection only. “We would know.” |
| **1** | Informal | A habit in one person’s head or a Slack thread. Cannot be reopened by a deputy. |
| **2** | Documented | A SOP, policy, or deck exists. Not clearly used on the last 20 invoices. |
| **3** | Used | Artefact exists **and** last-month samples show it in operation. Gaps are named. |
| **4** | Gated / sampled | Used, sampled, owned, and change-controlled. A miss has a written response. |

Write the score and a five-word evidence note. Example: `2 — SOP-AP-14, unused since March`.

---

## 3. The 36 questions

### Dimension A — Process (how work moves)

**A1. Coded exceptions.** Are parked or rejected invoices coded from a closed list (not free-text only)?  
*Look for:* exception taxonomy or equivalent; last 50 parks.  
*Northline illustration (fictional):* 3 — codes exist; 18% still “other.”

**A2. Named path.** Is there a written invoice-to-pay path that distinguishes PO 3-way, PO 2-way, non-PO, recurring, and intercompany?  
*Look for:* process map with object types.  
*Northline:* 3 — four paths; intercompany informal.

**A3. Owner on the clock.** Does every open exception have a named human owner and an aging start date?  
*Look for:* queue that can be sliced by person, not only by “AP.”  
*Northline:* 2 — queue by team; aging by invoice date, not code date.

**A4. Match policy is written.** Can a new specialist apply 2-way / 3-way / GR-IR and tolerances without asking a neighbour?  
*Look for:* tolerance table, not a hallway rule.  
*Northline:* 3 — table in Dynamics; services ≤ $10,000 are 2-way.

**A5. Payment run is a procedure.** Is proposal build, review, authorise, and transmit written as separate steps with named roles?  
*Look for:* last run’s audit trail of two human approvers.  
*Northline:* 4 — Tuesday/Thursday; Payments Lead + Treasury.

**A6. Close is a checklist.** Does period-end AP have a checklist with accrual candidates, cut-off, and attestation — not a heroic weekend?  
*Look for:* last close pack.  
*Northline:* 3 — checklist; accrual list still spreadsheet-built.

**Process dimension score:** average A1–A6. Veto: if A5 is 0 or 1, maturity cannot be placed above L2 until the payment procedure is written.

---

### Dimension B — Data (whether a packet can exist)

**B1. Invoice source completeness.** Can you state, for the last month, what share arrived as PDF email, XML/EDI, portal, or paper — and which source lacks a retrievable image or file?  
*Look for:* intake report.  
*Northline:* 3 — portal + email measured; 4% paper at Monterrey unmeasured.

**B2. Extract quality is sampled.** Is field-level extract accuracy sampled against a gold label (or dual key), not assumed from vendor slides?  
*Look for:* last sample sheet.  
*Northline:* 1 — vendor dashboard only.

**B3. Vendor master fitness.** Can AP see a unique vendor, payee status, and bank-change date without a tribal expert?  
*Look for:* master-data report; recent bank-change log.  
*Northline:* 3 — dual control on bank; duplicates persist.

**B4. PO and receipt availability.** For PO invoices, are PO and GR/IR (or service entry) queryable in the same window the matcher uses?  
*Look for:* a matcher working a live item in front of you.  
*Northline:* 3 — D365; delayed GR from Birmingham warehouse.

**B5. Work-object identity.** Does an invoice, exception, statement line, or proposal line have a stable ID that survives a tool change?  
*Look for:* ID in ERP plus any ticket tool.  
*Northline:* 2 — ERP doc number; tickets renumber.

**B6. Evidence reopen.** Can a Controller or auditor reopen the source, extract, match worksheet, and approval for a named invoice from last month in one sitting?  
*Look for:* do it once during the diagnostic.  
*Northline:* 2 — source and approval yes; match worksheet no.

**Data dimension score:** average B1–B6. A 4 on B1 with a 0 on B6 means you capture and cannot inspect.

---

### Dimension C — Controls (who may do what)

**C1. Payment hold is real.** Is payment authorisation human in **both** policy and the system that transmits the file?  
*Look for:* last bank file; who clicked.  
*Northline:* 4 — two humans; Positive Pay.

**C2. Vendor bank dual control.** Does a bank-detail change require two humans and leave a before/after record?  
*Look for:* last five bank changes.  
*Northline:* 4.

**C3. DOA is applied, not edited, by helpers.** If any bot or copilot routes approvals, can it edit the DOA table?  
*Look for:* access listing. Score 0 if unknown.  
*Northline:* 3 — workflow applies; IT can edit with change ticket.

**C4. Duplicate / anomaly clearance.** When a possible duplicate is raised, is clearance a named human outcome (clear / confirm / escalate / defer) rather than a silent ignore?  
*Look for:* last 20 flags or the admission that flags have no register.  
*Northline:* 1 — email alerts; no outcomes.

**C5. Segregation still holds.** Are capture/match, vendor master, and payment release still different human roles when a model is assisting?  
*Look for:* SoD listing plus one week of user activity.  
*Northline:* 3 — roles hold; temporary access at close is messy.

**C6. Autonomy register.** Is every live model, copilot, or bot listed with owner, object type, and level — including “we only use it to draft emails”?  
*Look for:* the list. Absence is 0.  
*Northline:* 0 — two informal copilots, unlisted.

**Controls dimension score:** average C1–C6. **Veto:** if C1 or C2 is 0, do not commission any agent above L0. If C1 is 0, do not open Agent 12.

---

### Dimension D — Technology (the stack you will keep)

**D1. System of record is named.** Is it written that ERP is the accounting system of record, and that no chat window is?  
*Look for:* architecture one-pager or the absence of one.  
*Northline:* 2 — assumed; not written.

**D2. Capture stack is known.** Can you name the capture / IDR / portal products and whether they are in support?  
*Look for:* vendor list.  
*Northline:* 3.

**D3. Workflow and match tools are known.** Same test for match, park, and approval workflow.  
*Northline:* 3 — native D365.

**D4. Integration fabric.** Is there a named way work moves (iPaaS, RPA, API, human re-key) and an owner for it?  
*Look for:* one diagram. Score 0 if “the bot team knows.”  
*Northline:* 2 — two RPA jobs; owner on leave.

**D5. Access for any future agent is least-privilege in principle.** Do service accounts exist as a pattern, or would a pilot share a specialist’s login?  
*Look for:* IAM pattern. Shared login is 0.  
*Northline:* 1 — shared mailbox; shared UI login on one RPA.

**D6. Prompt / model change control.** If anyone is already using a model on invoices, is a prompt change treated as configuration change?  
*Look for:* ticket. If no model is in use, score 1 (informal readiness), not 4.  
*Northline:* 0 — prompts in personal chats.

**Technology dimension score:** average D1–D6. High technology does not raise the maturity band if Controls veto.

---

### Dimension E — Talent (names, not “the SSC”)

**E1. AP Process Owner exists.** Is there a named person who can accept or reject an Orchestrator charter?  
*Look for:* role on an org chart *and* the person confirms they know.  
*Northline:* 3 — AP Manager named; Orchestrator idea is new.

**E2. Controls Lead exists.** Named person for Duplicate & Anomaly clearance above threshold.  
*Northline:* 2 — role exists; not briefed on flags-as-hypotheses.

**E3. Match skill is not a single point of failure.** If the best matcher is out for two weeks, does the path still run?  
*Look for:* backup and a written match tree.  
*Northline:* 2 — two skilled matchers; tree partly oral.

**E4. Time to sit evidence.** Have you reserved hours for sampling and charter work, or is this “on top of close”?  
*Look for:* a calendar block in the next 30 days. None is 0.  
*Northline:* 1 — transformation asked; no hours freed.

**E5. Audit is invited as observer.** Has Internal Audit been told they will sample packets, not operate agents?  
*Look for:* a mail or a standing agenda slot.  
*Northline:* 1 — not yet asked.

**E6. Language discipline.** Have specialists been told not to write “fraud,” “compliant,” or “the AI approved it” on tickets?  
*Look for:* a note or huddle.  
*Northline:* 0.

**Talent dimension score:** average E1–E6. If E1 or E2 is 0, Wave 1 owners are incomplete — charter only after names exist.

---

### Dimension F — Economics (visibility, not a promise)

Score **visibility and honesty** of cost. A 4 does not mean the organisation will save money.

**F1. Volume is known.** Invoices per month, in-scope vs. out-of-scope, last two quarters.  
*Look for:* a report, not a round number remembered from a town hall.  
*Northline:* 4 — 15,000/month (illustrative).

**F2. Fully loaded AP cost is known.** Team cost the organisation already uses internally (do not invent a benchmark).  
*Northline:* 3 — SSC cost known; plant liaison time not included.

**F3. Exception rate is known.** Share of invoices that do not post first pass, with a definition.  
*Northline:* 3 — 28% (illustrative observational baseline).

**F4. Cost per invoice is estimated in a range.** Even a wide range with a method beats a vendor slide.  
*Northline:* 2 — spreadsheet once; not refreshed.

**F5. Layer cost is budgeted as cost.** Tools, model, implementation, and exception minutes have a place to be recorded per thousand invoices.  
*Northline:* 0 — no ledger.

**F6. Success is not only a savings slide.** Is there written permission to measure operating discipline (coverage, coded fails, sampled worksheets, dual-human release) even if cycle time does not move in 90 days?  
*Look for:* a sponsor sentence. “We need 3x ROI to start” is score 0.  
*Northline:* 1 — sponsor asked for a savings range; Transformation refused to invent one.

**Economics dimension score:** average F1–F6. This dimension never authorises a guaranteed-savings statement in the output pack.

---

## 4. Veto and cap rules

Apply after scoring, before the band.

| Condition | Effect |
|---|---|
| C1 (payment hold) is 0 | Cap maturity at L1. No Agent 12. L0 only. |
| C1 is 1 or C2 is 0 | Cap at L2. Fix holds before L1 recommendations on payment-adjacent objects. |
| E1 or E2 is 0 | Wave 1 incomplete. Name owners before commissioning. |
| A5 is 0–1 | Cap at L2. Write the payment procedure. |
| F6 is 0 and sponsor demands a guaranteed ROI | Do not use this diagnostic to authorise spend. The product will not write the guarantee. |
| Any question scored from memory with artefact “none” | Treat as 0 in a steering pack, even if the scorer was optimistic. |

Do not average away a veto.

---

## 5. Opportunity heatmap

Plot dimension averages. Use the labels, not a traffic-light that implies “green = automate.”

| Dimension | Average (0–4) | Heat | Reading |
|---|---|---|---|
| Process | | Cold / Warm / Hot | Cold 0–1.4: path is oral. Warm 1.5–2.9: maps exist. Hot 3.0–4.0: used and sampled. |
| Data | | | Cold: packets cannot be reopened. Hot: source-to-approval in one sitting. |
| Controls | | | Cold: do not promote. Hot: holds are real; register exists. |
| Technology | | | Cold: stack unknown. Hot: named, supported, least-privilege pattern. |
| Talent | | | Cold: no owners. Hot: owners, hours, audit observer, language. |
| Economics | | | Cold: volume unknown. Hot: costs visible; success is not only ROI theatre. |

**Heat is not priority to automate.** A Hot technology / Cold controls cell means: stop adding models.

Northline illustration (fictional, not a target):

| Dimension | Avg | Heat |
|---|---|---|
| Process | 3.0 | Hot |
| Data | 2.3 | Warm |
| Controls | 2.5 | Warm (C6 = 0 pulls it down) |
| Technology | 1.8 | Warm |
| Talent | 1.5 | Warm / near Cold |
| Economics | 2.2 | Warm |

Reading: *Northline can write Wave 1 charters. It should not promote anything. It should list the informal copilots tomorrow.*

---

## 6. Maturity placement

Take the **lowest** of: (a) the simple average of the six dimension scores, (b) the cap from §4, (c) the qualitative fit in `MATURITY_MODEL.md`.

| If you land here | Say this |
|---|---|
| L1 Undesigned | We do not have an agent layer. We may have tools. |
| L2 Informal activity | We have prompts or bots without charters or a register. |
| L3 Named and held | Wave 1 is named; payment is written as human; autonomy is L0/L1. |
| L4 Evidence-gated | Promotion uses gates; packets reopen; flags have outcomes. |
| L5 Recertified layer | Demotion works; cost ledger runs; L3 is rare and sampled. |

Most mid-market organisations that have “started AI in AP” sit at L2. That is a usable finding.

---

## 7. Ten-agent opportunity (overview)

See `10_AGENT_OPPORTUNITY_OVERVIEW.md` for the working page. In the diagnostic close, tick only what the heatmap supports.

| Agent | Commission now? | Rule of thumb |
|---|---|---|
| 01 Intake | If B1 ≥ 2 | L0 if B2 ≤ 1 |
| 02 Validation | If A1 ≥ 2 or you will write codes this month | L1 only with a checklist |
| 03 Matching | If A4 ≥ 2 and B4 ≥ 2 | L1; no L3 talk |
| 04 Triage | If A1 ≥ 2 and A3 ≥ 1 | Codes first |
| 10 Duplicate & Anomaly | Always at L0 if C4 ≤ 2 | Never as a fraud engine |
| 16 Orchestrator | If E1 ≥ 2 | Work objects |
| 05 Goods Receipt | Wave 2 if missing GR is a top code | Packets, not dummy GRs |
| 07 Approval | Wave 2 if non-PO is material | Applies DOA; does not approve |
| 08 Supplier Resolution | Wave 2 if supplier latency is material | Draft only |
| 12 Payment Proposal Review | Only if C1 ≥ 3 | Annotate only |

Agents 06, 09, 11, 13, 14, 15 wait unless Professional is in use and Wave 1 is stable.

---

## 8. Business-case starter (language only)

Do not attach a savings range to the diagnostic result.

Permitted close paragraph (edit names):

> The diagnostic places us at **L[n]**. Payment authorisation is **[human / not evidenced]**. I recommend chartering six agents at observe/recommend, naming owners, and running a two-week shadow on [path]. Success for the first 30 days is packet completeness, coded exceptions, recorded flag outcomes, and an autonomy register — not a cost-takeout number. Evidence Room — AP Agent OS is a method for that work. It does not replace our stack and does not promise savings, fraud detection, compliance, or ROI.

Full language: `BUSINESS_CASE_STARTER.md`.

---

## 9. Downloadable scorecard — instructions

Produce a local worksheet (spreadsheet or paper). Evidence Room does not host your scores.

### Sheet tabs (recommended)

1. **Cover** — organisation, scorer, challenger, date, edition 1.0.0, “not a certificate.”
2. **Scores** — 36 rows: ID, question short name, score 0–4, artefact, note.
3. **Dimensions** — six averages, veto flags, cap.
4. **Heatmap** — table in §5.
5. **Band** — L1–L5 one sentence.
6. **Wave 1** — six agents, owners, backups, starting level.
7. **Holds** — C1–C2 evidence.
8. **Open questions** — anything scored from memory.

### Column definitions for Scores

| Column | Rule |
|---|---|
| ID | A1–F6 |
| Score | Integer 0–4 |
| Artefact | File name, SOP ID, report, or `none` |
| Recency | Date the artefact was last used |
| Challenger agree | Y/N |
| If N, lower score wins | Do not split the difference |

### What not to put on the scorecard

- A vendor’s cost-per-invoice cited as yours.
- A fraud-loss estimate.
- A compliance score.
- Northline’s numbers without the word *illustrative*.
- An ROI.

Print the cover and the band page for the Monday note. Leave the 36-row sheet in the working file.

---

## 10. After the diagnostic

| Next artefact | Where |
|---|---|
| Maturity definitions | `MATURITY_MODEL.md` |
| Agent opportunities | `10_AGENT_OPPORTUNITY_OVERVIEW.md` |
| Sponsor language | `BUSINESS_CASE_STARTER.md` |
| Twelve steps | `00_READ_ME/QUICK_START.md` |
| Starter operating model | `02_AP_AGENT_STARTER/` |

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Diagnostic guide (36 questions) |
| Scoring | 0–4; six dimensions; veto caps |
| Status | Edition 1.0.0 |
| Not | Certification, audit, or financial advice |
