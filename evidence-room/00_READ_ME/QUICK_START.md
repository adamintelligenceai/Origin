# START HERE — 12 steps

**Product:** Evidence Room — AP Agent OS  
**Time:** One working day if you already know last quarter’s volumes; two if you must gather facts.  
**Output:** A named Wave 1, named owners, a payment sentence, and a shadow-mode plan.  
**Not an output:** A savings target, a fraud programme, a compliance certificate, or permission to pay.

Do these in order. Skipping to a favourite agent is how undocumented workforces get built.

---

## Before step 1

Confirm which licence you hold. Use only the folders you are licensed to use. If you have the Free Diagnostic only, stop after step 4 and use the starter language in `01_FREE_AP_AI_READINESS/BUSINESS_CASE_STARTER.md` to decide whether to licence Starter or Professional.

Have at hand: last-quarter invoice volume, exception mix (even if messy), the last payment-run procedure, the names of the AP Manager, Controls Lead, and whoever signs the payment file.

Do not upload production invoices, vendor bank details, or employee records to Evidence Room. This toolkit does not need them.

---

## Step 1 — Read the contract of the product (15 minutes)

Read `00_READ_ME/README.md` and the short disclaimer in `10_LEGAL_AND_LICENSING/DISCLAIMER.md` (or the on-page short form if you only have a commercial pack).

Write this sentence at the top of your working note:

> We are designing an agent layer across the AP stack we already run. Payment authorisation stays human. Proof before permission.

If a sponsor wants that sentence rewritten into a guarantee, stop. This product will not write the guarantee.

---

## Step 2 — Diagnose the layer you have (45–60 minutes)

Open `01_FREE_AP_AI_READINESS/DIAGNOSTIC_GUIDE.md`.

Answer all 36 questions across six dimensions: process, data, controls, technology, talent, economics. Score each 0–4 using the rubric in that file. Use evidence you can reopen (a report, a SOP, a ticket), not recollection.

Compute dimension averages. Do **not** let a high technology score cancel a 0 on payment control or vendor-bank dual control.

Place the organisation on the L1–L5 maturity model in `01_FREE_AP_AI_READINESS/MATURITY_MODEL.md`.

---

## Step 3 — Write the one-sentence band (10 minutes)

Use this form. Fill the blanks. Do not add a savings clause.

> We are at **L[n] — [name]**. Agents are **[absent / informal prompts / named but ungated / chartered at L0–L1 / evidence-gated]**. Payment release is **[written as human / assumed / unclear]**. First wave is **[six names]** at **L0/L1**.

Northline’s fictional Friday sentence: *We are at L2 — Informal Activity. Agents are informal prompts in capture and a matching copilot. Payment release is written as human. First wave is Intake, Validation, Matching, Triage, Duplicate & Anomaly, Orchestrator at L0/L1.*

---

## Step 4 — Name the human holds (20 minutes)

Copy the human-held list from `02_AP_AGENT_STARTER/STARTER_GUIDE.md` (or Professional: `03_AP_AGENT_OS_PRO/Agent_Library/HUMAN_VS_AGENT_DECISION_FRAMEWORK.md`).

Tick each item that is already true in your policy **and** in the system. A policy that says dual approval while a demo script auto-releases is not a hold. It is a gap.

Minimum holds that must be true before any agent is live:

1. Payment authorisation and bank-file transmission — human.
2. Vendor bank-detail create or change — human dual control.
3. New vendor approval — human.
4. DOA and tolerance-table edits — human.
5. Period-end attestation — human.
6. Clearing a high-value duplicate or anomaly flag — named control owner.

If any of 1–3 is false, Wave 1 is still allowed at L0 only, and Agent 12 is not opened.

---

## Step 5 — Classify ten exceptions and one payment run (70 minutes)

Print or export:

- the ten most recent parked or rejected invoices
- the last payment proposal (or equivalent)

For each line write: decision class (cash / master data / reversible accounting / documentary / routing / external commitment / judgement / investigation signal / attestation / design change), modifiers (value, new vendor, open flag, tax, multi-entity), who decided, and what an agent would have been allowed to do at L1.

Record, in one column, what a vendor demo would have auto-done. Those cells are the control conversation, not a shopping list.

Starter has a table for this. Professional has the full framework and worked Northline examples.

---

## Step 6 — Charter Wave 1 only (90 minutes)

Charter six agents, no more:

| ID | Agent | Default level | Typical owner |
|---|---|---|---|
| 01 | Invoice Intake | L1 (or L0 if extract quality is unknown) | AP Operations Lead |
| 02 | Invoice Validation | L1 | AP Quality Lead |
| 03 | Matching | L1 | AP Match Lead |
| 04 | Exception Triage | L1 | Exception Desk Lead |
| 10 | Duplicate & Anomaly | L0 | AP Controls Lead |
| 16 | Orchestrator | L1 | AP Process Owner |

Use the charter template in Starter or `03_AP_AGENT_OS_PRO/Agent_Library/AGENT_CHARTER_TEMPLATE.md`. For each agent name: object types, entities, evidence required, exclusions, failure detection, rollback.

Do not charter Agents 12 or 13 above L1. Do not discuss L3.

If you cannot name a human owner, leave the agent unchartered.

---

## Step 7 — Freeze the evidence standard (20 minutes)

A recommendation is eligible for a human decision only when the packet contains:

- source (image, XML, EDI, or portal artefact)
- extract or equivalent structured fields
- match worksheet or coded fail reason
- owner and SLA clock
- autonomy context
- flag outcome if Agent 10 fired
- link the Orchestrator can reopen

Incomplete packets do not travel. Perfect packets still do not pay.

Write this list into the Orchestrator charter. That is the product mechanic for **proof before permission.**

---

## Step 8 — Stand a two-week L0 window (15 minutes to schedule; two weeks to run)

Shadow only. Output is not the system of record. Operators work as they do today. The agent writes a parallel record.

Minimum L0 evidence before anyone talks about L1 as the system of record:

- coverage on the in-scope path
- required fields present
- a dual-review sample of disagreements
- zero silent scope expansion
- a cost ledger started (licence + model + exception minutes), even if the numbers are small
- language check: no fraud, compliance, accuracy-as-property, or savings claims in agent output

Gates are in Professional: `AUTONOMY_PROGRESSION.md`. Starter users: stay at shadow until those gates are written down locally.

---

## Step 9 — Put cost and quality on one page (30 minutes)

Do not build an ROI slide.

Open `01_FREE_AP_AI_READINESS/BUSINESS_CASE_STARTER.md` and, if licensed, `03_AP_AGENT_OS_PRO/Business_Case/COST_PER_INVOICE_MODEL.md`.

Record:

- invoices per month (your number)
- fully loaded AP cost you already use internally
- exception rate you can defend
- current cost-per-invoice **range** if you have one; otherwise leave blank
- estimated layer cost (tools + implementation + model) as a **budget**, not a payback

Industry figures, when used, must be labelled as vendor-originated citations of independent research. See the business-case files. Do not invent a midpoint and call it yours.

---

## Step 10 — Schedule governance before go-live (20 minutes)

Book four meetings now:

| When | Meeting | Purpose |
|---|---|---|
| Week 0 | Kickoff with AP, Controls, Transformation | Confirm Wave 1, owners, payment sentence |
| Weekly | Exception mix (30 minutes) | Codes, aging by owner, language slips |
| Day 30 | Control review | Internal Audit observes packets; no operator role |
| Day 90 | Recertify or demote | Autonomy register; retire what is expensive and wrong |

Team licence holders: use `04_AP_AGENT_OS_TEAM/STEERING_COMMITTEE_TEMPLATES.md`.

---

## Step 11 — Write the Monday note (20 minutes)

Send one page. Suggested subject: *AP agent layer — Wave 1 at observe/recommend.*

Include: maturity band, six agent names, six owners, the payment sentence, the two-week shadow plan, the 30-day review, and one refusal (“we will not auto-release payments”).

Do not include a savings range. Do not include a fraud-detection claim. Do not include Northline’s numbers as if they were yours.

Executive templates: `04_AP_AGENT_OS_TEAM/EXECUTIVE_COMMUNICATION_TEMPLATES.md` (Team) or the short form in `03_AP_AGENT_OS_PRO/Business_Case/BOARD_CFO_SUMMARY.md` (Professional).

---

## Step 12 — Stop conditions (read every week)

Stop commissioning, and demote or pause, if any of these is true:

- A payment was released on an agent recommendation without the human path.
- Vendor bank details were changed from an agent pack without dual control.
- Agent 10 output used the word “fraud” in an operator-facing ticket.
- An agent processed object types outside its charter.
- Owners are vacant and someone “just kept it running.”
- A vendor or integrator proposed skipping evidence gates to hit a date.

Stopping is a successful control outcome.

---

## After the 12 steps

| If this is true | Do this |
|---|---|
| Diagnostic only | Decide whether Starter or Professional is the next licence |
| Starter, Wave 1 named | Run the two-week shadow; buy Professional before promoting |
| Professional | Open the sixteen specs; stay on Wave 1 until gates pass |
| Team | Run the workshop in `04_AP_AGENT_OS_TEAM/WORKSHOP_AGENDA.md` |
| Stack is unusual or political | Apply for Custom Blueprint (`05_CUSTOM_BLUEPRINT/`) |

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | 12-step START HERE |
| Companion | `README.md`, diagnostic, Starter guide |
| Status | Edition 1.0.0 |
