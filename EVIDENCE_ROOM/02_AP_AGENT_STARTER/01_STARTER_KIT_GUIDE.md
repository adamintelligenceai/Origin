# AP Agent Starter Kit — Guide

**Product:** Evidence Room — AP Agent Starter Kit  
**Price:** US$79  
**Document ID:** `ER-START-GUIDE-001`  
**Version:** 1.0  
**Brand idea:** Operating Evidence  
**Licence:** Individual (see §14)  
**Audience:** Head of AP, Controller, Finance Transformation lead designing the first controlled agent pilots

---

## Cover

**Evidence Room**  
AP Agent OS · Starter

### AP Agent Starter Kit

**Charter the first agents. Keep payment human. Earn responsibility.**

This kit is the operating layer between “we should use AI in AP” and a controlled pilot. It is not software, not an ERP module, and not a promise of autonomous payables.

**You will leave with:** an operating model sketch, ten usable agent blueprints, a condensed exception taxonomy, decision frameworks, templates, a starter KPI scorecard, governance checklist, and a 90-day path.

---

## START HERE — 12-step path

Complete in order. Do not skip to “prompting an agent” before steps 1–6.

| Step | Action | Output artefact | Done |
|------|--------|-----------------|------|
| 1 | Read §1 Operating Model (30 min) | Shared vocabulary with sponsor | ☐ |
| 2 | Run Free Diagnostic or transfer scores (§5) | Band + dimension profile | ☐ |
| 3 | Inventory channels, volumes, top exception pains | One-page scope note | ☐ |
| 4 | Install condensed exception taxonomy (§4) | Code list in tracker | ☐ |
| 5 | Baseline KPIs (§10) — 2 weeks if data thin | Baseline sheet | ☐ |
| 6 | Map process for pilot slice (§7) | Process map (template) | ☐ |
| 7 | Choose ≤3 agents from Top 10 (§3) | Pilot backlog | ☐ |
| 8 | Write Job Descriptions + Instructions (§8–9) | Charters v0.9 | ☐ |
| 9 | Apply Human-vs-Agent framework (§6); set L0/L1 ceiling | Autonomy registry row | ☐ |
| 10 | Complete Governance checklist (§11) | Sign-offs | ☐ |
| 11 | Shadow 2–4 weeks; sample QA | Shadow log | ☐ |
| 12 | Decide: demote / hold / promote to L1 recommend-only | Steering note | ☐ |

**Hard stops throughout:** no payment release by agent; no silent vendor bank changes; no inventing DOA; no expansion without scorecard evidence.

---

## 1. AP Agent Operating Model overview

### 1.1 What “Operating Evidence” means here

An AP agent is allowed to act only when Finance can show:

1. **Charter** — job, inputs, exclusions, owner  
2. **Control** — what must never happen; escalation  
3. **Exception logic** — coded failures, not inbox folklore  
4. **Measurement** — KPIs with baseline  
5. **Responsibility level** — L0–L4 earned, never assumed  

If any of the five is missing, the agent stays at observe/recommend.

### 1.2 The stack (sixteen agents — Starter focuses on ten)

| ID | Agent | Starter depth |
|----|-------|---------------|
| A01 | Invoice Intake | Blueprint |
| A02 | Invoice Validation | Blueprint |
| A03 | Matching | Blueprint |
| A04 | Exception Triage | Blueprint |
| A05 | Goods Receipt | Blueprint |
| A06 | PO Quality | Mentioned; Pro deepens |
| A07 | Approval | Blueprint (routing assist only) |
| A08 | Supplier Resolution | Blueprint |
| A09 | Internal Follow-Up | Blueprint |
| A10 | Duplicate & Anomaly | Blueprint |
| A11 | Vendor Statement Reconciliation | Blueprint |
| A12 | Payment Proposal Review | Blueprint (prepare only) |
| A13–A16 | Close, Reporting, Root Cause, Orchestrator | Roadmap sketch; full in Professional |

### 1.3 Responsibility ladder (mandatory)

| Level | Name | Agent may | Human must |
|-------|------|-----------|------------|
| **L0** | Observe | Score, log, shadow | Run live process |
| **L1** | Recommend | Drafts, packs, suggestions | Decide / send / post |
| **L2** | Prepare | Write drafts into systems on clear cases | Approve material actions; sample QA |
| **L3** | Execute within guardrails | Bounded execution | Own escalations; monitor |
| **L4** | Managed autonomy | Bounded domain, exception-only touch | Policy + assurance; **never** payment auth |

**Starter recommendation:** Cap new programmes at **L1** for 60–90 days. L2 only after Professional-grade controls and scorecards.

### 1.4 Payment boundary (non-negotiable)

Agents may **prepare** payment proposals and **flag** holds.  
Humans **authorise** and **release** payments.  
No Starter blueprint crosses this line.

### 1.5 Methodology (ten steps)

Observe → Transcribe → Extract → Structure → Agentise → Test → Shadow → Controlled Pilot → Measure → Expand responsibility.

Starter gets you through Structure → Shadow with templates. Professional / Team deepen Test, Measure, Expand.

---

## 2. Human-vs-agent decision framework

Use before writing any instruction set.

### 2.1 Decision grid

For each task class, mark **H** (human only), **A-assist** (agent drafts), **A-bounded** (later L2+), or **Out**.

| Question | If “no” → |
|----------|-----------|
| Is the task frequent and rules-partially-known? | Keep human / improve process first |
| Can success be checked against evidence (PO, GR, policy)? | Do not agentise judgement-only politics |
| Is failure recoverable without payment leakage? | Keep L0–L1 or Out |
| Is SoD preserved if agent prepares? | Redesign |
| Can we log inputs, rule, confidence, human decision? | Do not deploy |
| Does policy already define tolerances / DOA? | Write policy first |

### 2.2 Default placements

| Task class | Default |
|------------|---------|
| Capture & classify inbound invoice | A-assist |
| Validate completeness fields | A-assist |
| Suggest match / explain variance | A-assist |
| Force-match above tolerance | H |
| Classify exception code | A-assist → A-bounded later |
| Clear material exception | H (agent prepares pack) |
| Draft supplier / requester chase | A-assist (human send) |
| Approve invoice under DOA | H (agent routes only) |
| Flag duplicate candidates | A-assist |
| Confirm duplicate / fraud | H |
| Prepare payment proposal | A-assist |
| Authorise / release payment | **H always** |
| Approve vendor bank change | **H always** |
| Period-end assertion sign-off | **H always** |

### 2.3 “Agentise later” list

Park tasks that fail the grid. Improving PO quality or GR discipline often beats a clever agent on a broken upstream.

---

## 3. Top 10 agent blueprints (condensed)

Each blueprint is usable. Expand fields in Professional charters when you scale.

### Shared blueprint fields

- **Job** · **Owner role** · **Inputs** · **Outputs** · **Does** · **Does not** · **Escalation** · **Starter autonomy** · **KPIs** · **Evidence**

---

### A01 — Invoice Intake

| Field | Content |
|-------|---------|
| **Job** | Capture, classify, and register inbound invoices into a controlled work queue. |
| **Owner** | AP Intake Lead |
| **Inputs** | Email/portal/EDI payloads; channel rules; vendor directory |
| **Outputs** | Registered invoice stub; channel tag; confidence; rejection reason if any |
| **Does** | Detect invoice vs non-invoice; extract header candidates; route by entity/channel; log duplicates *candidates* to A10 |
| **Does not** | Drop invoices silently; invent vendor masters; approve payment |
| **Escalation** | Unreadable / wrong entity / malware suspicion → human intake + IT security path |
| **Starter autonomy** | L0–L1 |
| **KPIs** | Time-to-register; % auto-classified correctly (sampled); silent-drop incidents (=0) |
| **Evidence** | Source message ID; extract JSON/fields; human correction log |

---

### A02 — Invoice Validation

| Field | Content |
|-------|---------|
| **Job** | Verify completeness and coding readiness before match. |
| **Owner** | AP Validation Lead |
| **Inputs** | Invoice image/fields; tax rules summary; vendor master; PO-required policy |
| **Outputs** | Pass / fail with coded gaps; validation checklist |
| **Does** | Check supplier identity signals, invoice #, dates, amounts, tax fields, PO presence rules, attachment presence |
| **Does not** | Invent commercial terms; override PO policy; post GL |
| **Escalation** | Identity conflict / banking detail on invoice → enhanced human path |
| **Starter autonomy** | L0–L1 |
| **KPIs** | First-pass validation rate; false-pass rate (QA sample); recycle loop count |
| **Evidence** | Checklist; failed rules; reviewer decision |

---

### A03 — Matching

| Field | Content |
|-------|---------|
| **Job** | Perform PO / non-PO match logic; explain variances. |
| **Owner** | AP Match Lead |
| **Inputs** | Invoice lines; PO; GR; tolerances |
| **Outputs** | Match status; variance pack; suggested next agent |
| **Does** | Two-/three-way compare within tolerance; explain price/qty gaps; route exceptions to A04 |
| **Does not** | Force-match beyond tolerance; change PO price; waive DOA |
| **Escalation** | Material variance / chronic vendor → Buyer + Category |
| **Starter autonomy** | L0–L1 (L2 only with Pro controls) |
| **KPIs** | Match cycle time; within-tolerance auto-suggest accept rate; force-match attempts (=0 by agent) |
| **Evidence** | Line comparisons; tolerance rule ID; human disposition |

---

### A04 — Exception Triage

| Field | Content |
|-------|---------|
| **Job** | Classify exceptions, assign owners, start SLA clocks, route resolvers. |
| **Owner** | Exception Desk Lead / Head of AP |
| **Inputs** | Failed validation/match signals; taxonomy; ownership matrix |
| **Outputs** | Primary code; owner; due; linked resolver agent |
| **Does** | Apply taxonomy; detect multi-code; prioritise by age×value×risk; prevent unowned WIP |
| **Does not** | Clear exceptions; invent codes; hide aged items |
| **Escalation** | Unowned >48h material → Process Owner |
| **Starter autonomy** | L0–L1 |
| **KPIs** | % coded within 24h; unowned count; reclassify rate |
| **Evidence** | Code; rationale; timestamp; owner ack |

---

### A05 — Goods Receipt

| Field | Content |
|-------|---------|
| **Job** | Chase and reconcile receipt evidence for receipt-required invoices. |
| **Owner** | GR Coordination (AP) with Ops receivers |
| **Inputs** | PO; invoice qty; GR search; receiver list; delivery notes if any |
| **Outputs** | Chase pack; GR found/missing status; partial receipt flag |
| **Does** | Locate likely receiver; draft chase; reconcile partials; update A04 |
| **Does not** | Post GR without policy; fake receipt dates |
| **Escalation** | Supply-critical / due date risk → Ops supervisor |
| **Starter autonomy** | L1 drafts; human send |
| **KPIs** | GR chase response time; % resolved by GR post; false chase rate |
| **Evidence** | Chase thread; GR doc #; human confirmation |

---

### A07 — Approval (routing assist)

| Field | Content |
|-------|---------|
| **Job** | Drive approval routing within DOA; never invent authority. |
| **Owner** | AP Workflow Lead |
| **Inputs** | Invoice; DOA table; approver directory; coding |
| **Outputs** | Correct approver queue; nudge drafts; stale approval alerts |
| **Does** | Map amount/entity to DOA; detect missing approver; remind with evidence pack |
| **Does not** | Approve; reassign above policy; bypass SoD |
| **Escalation** | DOA gap / conflict → Controllership |
| **Starter autonomy** | L1 |
| **KPIs** | Approval cycle time; misroute rate; bypass attempts (=0) |
| **Evidence** | DOA rule applied; approver ID; timestamps |

---

### A08 — Supplier Resolution

| Field | Content |
|-------|---------|
| **Job** | Coordinate supplier queries with human send/approve gates. |
| **Owner** | Supplier Query Lead |
| **Inputs** | Exception pack; vendor contacts; prior correspondence |
| **Outputs** | Draft email/portal message; response log; proposed resolution |
| **Does** | Clarify price/qty/credit/duplicate questions; attach evidence; track promises |
| **Does not** | Commit payment dates that override policy; accept bank changes from email alone |
| **Escalation** | Dispute / legal tone → Procurement + AP Lead |
| **Starter autonomy** | L1 (human send) |
| **KPIs** | Response SLA; reopen rate; tone QA fails |
| **Evidence** | Message + attachments + human approval to send |

---

### A09 — Internal Follow-Up

| Field | Content |
|-------|---------|
| **Job** | Chase requesters, buyers, GR clerks with evidence packs. |
| **Owner** | AP Exception Coordinator |
| **Inputs** | Exception code; named internal owner; SLA; documents |
| **Outputs** | Chase sequence; escalation ladder; resolution notes |
| **Does** | Timed nudges; escalate by role; stop when answered |
| **Does not** | Spam; escalate personally; clear without evidence |
| **Escalation** | Per matrix (e.g. 48h → manager) |
| **Starter autonomy** | L1 |
| **KPIs** | Internal response time; escalations hit rate; courtesy QA |
| **Evidence** | Pack + timestamps + human overrides |

---

### A10 — Duplicate & Anomaly

| Field | Content |
|-------|---------|
| **Job** | Surface duplicate and anomaly **candidates**; prepare investigation packs. |
| **Owner** | AP Controls Lead |
| **Inputs** | Invoice register; payment history; similarity features |
| **Outputs** | Candidate pairs; score explanation; recommended hold |
| **Does** | Exact and near-match detection; hold suggestion; pack for human |
| **Does not** | Guarantee fraud/duplicate detection; auto-confirm without policy; release payment |
| **Escalation** | Critical score + material $ → Controls same day |
| **Starter autonomy** | L0–L1 |
| **KPIs** | Precision/recall on samples (local); time-to-disposition; missed confirmed duplicate after clear (incident) |
| **Evidence** | Feature list; decision; payment status at decision |

---

### A11 — Vendor Statement Reconciliation

| Field | Content |
|-------|---------|
| **Job** | Reconcile supplier statements to open items; propose discrepancy packs. |
| **Owner** | AP Reconciliation Lead |
| **Inputs** | Statement; AP open items; remittances |
| **Outputs** | Matched lines; discrepancies coded; draft supplier queries |
| **Does** | Line match; detect missing invoices / missing payments / timing |
| **Does not** | Auto-settle disputes; book adjustments without human |
| **Escalation** | Large unreconciled → AP Lead + Procurement |
| **Starter autonomy** | L0–L1 |
| **KPIs** | Statement cycle time; unreconciled $; pack accept rate |
| **Evidence** | Recon worksheet; codes; sign-off |

---

### A12 — Payment Proposal Review

| Field | Content |
|-------|---------|
| **Job** | Prepare payment batches for **human** authorisation only. |
| **Owner** | AP Payments Lead (prep); Treasury/AP leadership (auth) |
| **Inputs** | Approved open items; holds; duplicate flags; early-pay rules |
| **Outputs** | Proposal list; exception flags; exclusion list |
| **Does** | Assemble candidates; strip holds; highlight anomalies for review |
| **Does not** | Authorise; generate/transmit bank file as autonomous act; override holds |
| **Escalation** | Ambiguous inclusion → human; never retry ambiguous sends |
| **Starter autonomy** | L1 prepare; auth **H** |
| **KPIs** | Proposal prep time; items incorrectly included (QA); auth bypass attempts (=0) |
| **Evidence** | Proposal version; flags; authoriser ID; timestamp |

---

## 4. Exception taxonomy (condensed — all major codes)

Use **one primary code** per case. Full attribute sheets live in Professional; Starter gives operating definitions.

| Code | Definition | Typical owner | Agents |
|------|------------|---------------|--------|
| `missing_po` | Required PO absent/blank | Requester / Buyer | A02, A04, A09, A06 |
| `invalid_po` | PO ref invalid / wrong vendor-entity | Buyer | A03, A06, A09 |
| `po_closed` | PO closed/cancelled while invoice live | Buyer | A06, A09 |
| `po_exhausted` | Remaining PO insufficient | Buyer | A06, A03, A10 |
| `price_mismatch` | Price beyond tolerance vs PO/contract | Buyer / Category | A03, A06, A08 |
| `quantity_mismatch` | Qty beyond tolerance vs PO/GR | Receiver / Buyer | A03, A05, A08 |
| `missing_receipt` | 3-way required; no GR | Receiver | A05, A09 |
| `partial_receipt` | GR covers only part of invoice | Receiver / Supplier | A05, A03, A08 |
| `duplicate_invoice` | Confirmed duplicate | AP Controls | A10, A04, A12 |
| `potential_duplicate` | Candidate not yet confirmed | AP Processor / Controls | A10, A12 |
| `wrong_supplier` | Supplier identity / remit mismatch | AP + Master Data | A02, A08, A10 |
| `incorrect_legal_entity` | Wrong company code / entity | AP / Requester | A02, A09 |
| `tax_issue` | Tax fields / treatment fail checks | Tax / AP | A02 |
| `approval_missing` | Required approval not complete | Approver | A07, A09 |
| `doa_issue` | DOA conflict / insufficient authority | Controllership | A07 |
| `coding_missing` | Cost object / GL incomplete | Requester | A02, A09 |
| `invalid_cost_centre` | Cost object invalid / closed | Finance / Requester | A02, A09 |
| `invoice_quality` | Illegible / incomplete document | Supplier / Intake | A01, A08 |
| `ocr_extraction_issue` | Capture fields wrong | AP Intake / Systems | A01, A02 |
| `master_data_issue` | Vendor master blocking | Master Data Steward | A02, A08 |
| `banking_change_concern` | Remit/bank change signal | Controls / Treasury | A10, A08 — **human verify** |
| `credit_note_required` | Credit expected to resolve | Supplier / Buyer | A08, A03 |
| `statement_discrepancy` | Statement vs subledger gap | AP Rec | A11 |
| `payment_hold` | Policy/control hold applied | AP Controls | A12, A04 |
| `disputed_invoice` | Commercial/legal dispute | Procurement / Legal | A08 — human lead |
| `aged_unresolved_item` | Past SLA; still open | Process Owner | A04, A16 |
| `system_interface_error` | Integration/posting technical fail | IT / AP Systems | A01, A16 |

**Operating rules**

- Prefer specificity over `aged_unresolved_item` (use as secondary).  
- `potential_duplicate` stays until human disposition.  
- `banking_change_concern` never auto-clears.  
- Tune SLAs locally; do not rename codes casually.

---

## 5. AI readiness diagnostic summary

Use Free Diagnostic for full 32 questions. Starter summary:

| Band | Score | Starter implication |
|------|-------|---------------------|
| Emerging (0–39) | Foundations weak | Taxonomy + controls first; agents L0 only |
| Structured (40–59) | Operable | One L0→L1 pilot + baselines |
| Agent-Ready (60–79) | Ready to design | ≤3 agents; L1 ceiling; weekly scorecard |
| Operating (80–100) | Evidence culture | Expand with gates; still no autonomous pay |

**Minimum before L1 recommend on live work:** coded exceptions (or pilot slice), named owner, exclusions written, baseline attempt, human payment auth verified.

---

## 6. Process-mapping template (how to fill)

See also `02_TEMPLATES_PACK.md`.

1. Pick **one** slice: entity × channel × category (e.g. US email × inventory PO).  
2. List steps from inbound to payment proposal.  
3. Mark each step: Human / System / Candidate agent.  
4. Note artefacts (invoice, PO, GR, approval).  
5. Note failure modes → taxonomy codes.  
6. Mark control points (SoD, holds, dual auth).  
7. Identify data fields required for agent inputs.  
8. Stop at payment **proposal**; draw a hard line before authorisation.

---

## 7. Agent job description template (guidance)

A job description is the **employment contract** for the agent — not a prompt dump.

Must include: purpose; scope in/out; responsibilities; exclusions; human owner; RACI; autonomy level; escalation; success metrics; review cadence.

Fill blanks in Templates Pack. Approve with Head of AP before any L1.

---

## 8. Agent instruction template (guidance)

Instructions operationalise the job:

1. Objective (one paragraph)  
2. Tools / systems allowed  
3. Input contract (required fields)  
4. Decision procedure (ordered checks)  
5. Output schema  
6. Confidence / abstain rules  
7. Escalation triggers  
8. Tone rules (if communicating)  
9. Prohibitions (hard)  
10. Logging requirements  

**Abstain > guess** on identity, banking, duplicates, and DOA.

---

## 9. KPI scorecard (starter)

Track weekly for each pilot agent + AP slice.

| KPI | Baseline | W1 | W2 | W3 | W4 | Target design (not promise) |
|-----|----------|----|----|----|----|------------------------------|
| Volume touched | | | | | | |
| % coded exceptions | | | | | | |
| Median cycle time | | | | | | |
| Human accept rate of recommendations | | | | | | |
| Critical control incidents | | | | | | **0** |
| Silent drops / unlogged actions | | | | | | **0** |
| QA sample pass % | | | | | | Local threshold |
| Operator trust (1–5 survey) | | | | | | |

Demote or pause if critical control incidents >0 or accept rate collapses without process cause.

---

## 10. Governance checklist (Starter)

| # | Check | Owner | OK |
|---|-------|-------|----|
| 1 | Executive sponsor named | CFO / Controller | ☐ |
| 2 | AP Process Owner named | | ☐ |
| 3 | Agent Owner named per pilot agent | | ☐ |
| 4 | Autonomy ceiling documented (≤L1 recommended) | | ☐ |
| 5 | Payment auth remains human — confirmed in writing | | ☐ |
| 6 | Vendor bank change path excluded from agent approve | | ☐ |
| 7 | Exception taxonomy adopted for pilot slice | | ☐ |
| 8 | SoD matrix reviewed for agent prepare roles | | ☐ |
| 9 | Logging / retention path defined | IT / AP Systems | ☐ |
| 10 | Shadow plan + QA sample size set | | ☐ |
| 11 | Kill-switch / pause owner named | | ☐ |
| 12 | Change control for instructions / prompts | | ☐ |
| 13 | No confidential data in public AI tools | | ☐ |
| 14 | Internal Audit informed (awareness) | | ☐ |
| 15 | Rollback plan (<1 hour demotion) | | ☐ |

---

## 11. AP transformation roadmap — 90-day sketch

| Phase | Days | Focus | Exit criteria |
|-------|------|-------|---------------|
| **0 Foundation** | 1–15 | Diagnostic, taxonomy, baselines, scope slice | Codes live; baseline sheet; ceiling agreed |
| **1 Design** | 16–35 | Maps, job descriptions, instructions, RACI | Charters approved; checklist green |
| **2 Shadow** | 36–60 | L0/L1 shadow on slice; daily exception huddle | Shadow agreement sampled; zero critical incidents |
| **3 Controlled pilot** | 61–75 | L1 recommendations in operating rhythm | Accept rate stable; evidence packs retained |
| **4 Decide** | 76–90 | Steering: hold / expand agents / buy Professional depth | Written decision + next quarter backlog |

**Not in 90 days:** fleet-wide L3, autonomous payments, ERP replacement, guaranteed FTE reduction claims.

---

## 12. Implementation checklist

### Pre-pilot

- [ ] Scope one-pager approved  
- [ ] Taxonomy in tracker  
- [ ] Baselines captured or explicitly “unknown → finding”  
- [ ] Charters v1 approved  
- [ ] Access read-only proven  
- [ ] QA samplers trained  
- [ ] Comms to AP team (what changes / what does not)

### During shadow

- [ ] Daily volume log  
- [ ] Disagreement log (agent vs expert)  
- [ ] Incident log (even near-misses)  
- [ ] Weekly 30-min review

### Before any L2 discussion

- [ ] Professional control matrix reviewed  
- [ ] Controller co-sponsor  
- [ ] ≥4 weeks L1 evidence  
- [ ] Payment boundary re-confirmed

---

## 13. When to upgrade

| Need | Product |
|------|---------|
| Full 16-agent charters, governance framework, control matrix, business-case model, UAT | **Professional — US$199** |
| Workshop, training, executive packs, trackers, multi-user facilitation | **Team — US$499** |
| Facilitated blueprint for your stack | **Custom Blueprint — US$1,500–3,000** |

---

## 14. Licence note (individual)

**Grant:** One named individual may use this Starter Kit for professional purposes inside **one** employer / client organisation at a time.

**Includes:** Personal use of templates; internal workshops the licensee facilitates alone.

**Does not include:** Sharing files with a whole shared-services centre as a team standard; resale; public redistribution; white-labelling; uploading the kit as the system prompt library for a commercial product.

For multi-user / workshop licence rights, purchase **Team**.

---

## 15. Disclaimers

No guaranteed savings, fraud detection, compliance certification, accounting accuracy, or ROI. Not legal or audit advice. Payment authorisation stays human. Local policy overrides templates.

---

*Evidence Room — Operating Evidence.*  
*`ER-START-GUIDE-001` v1.0 · Individual licence*
