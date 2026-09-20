# Refined master prompt — Evidence Room — AP Agent OS

**Document type:** Build specification (nth-degree refinement of the original authoring prompt)  
**Use:** Author, extend, or audit any file in this archive. If a new page conflicts with this prompt, the page is wrong.  
**Edition:** 1.0.0 · 20 September 2026  
**Lockup:** EVIDENCE ROOM — AP AGENT OS  
**Domain:** evidenceroom.ai  
**Brand idea:** Proof before permission.

This is not marketing copy. It is the operating instruction for producing the suite. Follow it to the letter. Where it is silent, stay silent. Do not invent product surface, statistics, customers, or legal conclusions.

---

## 1. One-sentence product

Evidence Room — AP Agent OS is a licensed digital method and toolkit for specifying, chartering, governing, and scaling a portfolio of AI agents across Accounts Payable — without replacing the AP stack, and without transferring payment authority to a model.

---

## 2. Ideal customer profile (tight)

### 2.1 Who buys

A named practitioner who will hold the pen, inside an organisation that already runs invoice-to-pay:

| Primary buyer | Why they buy | What they must already have |
|---|---|---|
| Finance Transformation lead | Asked to “put AI on AP” and refuses a prompt pile | A stack (ERP + at least one of capture, workflow, SSC) |
| AP Manager / SSC lead | Needs named roles and holds before a vendor demo | Volume large enough that undocumented agents would matter |
| Controller / CAO | Needs the payment sentence in writing | DOA, dual approval, and a close calendar |
| Internal Audit (influencer) | Needs inspectable packets | A sampling habit, even if informal |

Typical shape: mid-market to enterprise; shared services or a recognisable AP team; multiple entities or a plan to add them; an ERP that will **stay**. Northline Industrials (fictional) is the calibration picture: ~15,000 invoices/month, four company codes, Dynamics 365, Cleveland SSC.

### 2.2 Who does not buy (disqualify)

- Organisations shopping for a new AP platform, OCR engine, or payment rail.
- Buyers whose success criterion is a guaranteed savings or ROI number written by the vendor.
- Teams that want “autonomous payments,” “touchless AP this quarter,” or “fraud detection as a service.”
- Practitioners who will republish the files as their own product.
- Anyone who needs hosted software, an ERP connector, or a compliance certificate.

If the buyer’s first question is “what ROI do you guarantee?”, the correct response is to decline the frame, not to invent a range.

### 2.3 Jobs to be done

1. See whether the organisation has an agent layer, a pile of prompts, or neither.
2. Name Wave 1 agents, owners, evidence, and exclusions.
3. Keep payment, vendor-bank, and close attestation human.
4. Give AP, Controls, Transformation, Treasury, and Audit one vocabulary.
5. Make promotion evidence-gated and demotion available.

---

## 3. Anti-goals (non-negotiable)

Do **not** produce, imply, or allow a partner to produce:

| Anti-goal | Why it is banned |
|---|---|
| Guaranteed savings, cost-takeout, or ROI | We do not observe the buyer’s baseline; we do not operate their stack |
| Fraud detection or prevention as a product outcome | Agent 10 raises hypotheses; humans clear |
| Compliance, SOX, VAT, or “audit-ready” as a certificate | We produce evidence; the control owner judges sufficiency |
| Accounting accuracy as a property of an agent or of the OS | Models err; sampling is the control |
| Autonomous payment safety | Payment release has no promotion path |
| “Touchless AP” as a committed state | L3 is rare, narrow, and still not payment |
| Replacement of ERP, AP team, Controller, or bank | Category error |
| A prompt pack as the product | A prompt is furniture inside a charter |
| Invented customers, invented quotes, invented statistics | Credibility is the brand |
| Silent trademark collision with Evidence Room LLC | Different firm; forensic animation at evidence-room.net |

If a sentence would be more persuasive with a banned claim, rewrite the sentence. Do not move the claim into a testimonial, a Northline table, or a footnote.

---

## 4. Evidence standard (the product mechanic)

**Proof before permission.**

An agent does not receive the next unit of responsibility until it has produced the evidence the organisation named in advance for that unit.

### 4.1 Packet minimum (every recommendation)

- Source artefact (image, XML, EDI, portal file)
- Structured extract or equivalent
- Match worksheet **or** coded fail reason
- Human owner and SLA clock
- Autonomy context (level in force)
- Duplicate & Anomaly outcome if a flag exists
- URI the Orchestrator can reopen

Incomplete packets do not travel. Complete packets do not pay.

### 4.2 Autonomy default

| Level | Name | Default at commissioning |
|---|---|---|
| L0 | Observe | Allowed |
| L1 | Recommend | Allowed |
| L2 | Prepare | Earned only |
| L3 | Execute within written guardrails | Never at commissioning; named class only |
| L4 | Managed autonomy of that same bounded set | Recertified; never a new class of work |

Payment-adjacent work (Agent 12 and anything that could move cash) has a hard ceiling: recommend and prepare only.

### 4.3 Promotion

Promotion is change-controlled. It requires a signed charter, a gate pack, a limit table, a detection path, a one-hour rollback, named sign-offs, and an autonomy-register entry. Missing any item is a decline. Times in `AUTONOMY_PROGRESSION.md` are floors, not targets. Remaining at L1 indefinitely is a successful outcome.

---

## 5. Architecture rules

### 5.1 Sixteen named roles — not “AP AI”

01 Invoice Intake · 02 Invoice Validation · 03 Matching · 04 Exception Triage · 05 Goods Receipt · 06 PO Quality · 07 Approval · 08 Supplier Resolution · 09 Internal Follow-up · 10 Duplicate & Anomaly · 11 Vendor Statement · 12 Payment Proposal Review · 13 AP Close · 14 AP Reporting · 15 Root Cause · 16 Orchestrator.

Each file must state: job, default autonomy, typical owner, inputs, outputs, exclusions, evidence, failure detection, and what it will not do.

Interaction rules that must not be violated:

- Intake does not decide match.
- Validation does not post.
- Matching does not invent receipts or POs.
- Triage does not resolve.
- Supplier Resolution drafts; humans send.
- Duplicate & Anomaly never releases or pays; it does not say “fraud.”
- Payment Proposal Review annotates; dual humans release.
- Orchestrator routes and records; it does not post or pay.
- Root Cause proposes; process owners accept or reject.

### 5.2 Wave discipline

- **Wave 1:** 01, 02, 03, 04, 10, 16 at L0/L1.
- **Wave 2:** 05, 07, 08, 09, 12 — prepare packets; Agent 12 stays ≤ L2 annotate.
- **Wave 3:** 11, 13, 14, 15, 06 — periodic / diagnostic.
- **Wave 4:** Earned execute for a named clean-match class only, after gates — still never payment.

Do not commission sixteen L3 agents.

### 5.3 ERP-agnostic rule

The method maps onto SAP, Oracle, Dynamics 365, NetSuite, Workday, and equivalent invoice-to-pay objects. Do not write a connector, an API wrapper, or a certified adapter. Do not assume one client library fits every host. ERP remains the system of record for accounting. The Orchestrator is the system of record for work-object state.

When mentioning a vendor stack (Coupa, Tipalti, BILL, etc.), the line is: keep it; we design the layer across it.

### 5.4 Payment-always-human rule

These are outside every agent’s authority at every level:

1. Payment authorisation and release; bank-file transmission; Positive Pay exception decisions.
2. Vendor bank-detail create or change; payment-method change.
3. New vendor create or its approval.
4. DOA, tolerance, and match-policy edits.
5. Period-close attestation.
6. Write-off / concession above the written threshold.
7. Ambiguous or cross-border tax position.
8. Legal dispute or settlement language.
9. Clearing a high-value duplicate or anomaly flag.
10. Override of a policy hold (audit, stop-pay, sanctions review).
11. Expansion of an agent’s own scope or autonomy.

If a vendor slide says “auto-release under $X if match is clean,” the method’s answer is no. $X is a human DOA limit, not an agent payment limit.

---

## 6. Brand and voice

### 6.1 Verbal system

- Intelligent, concise, executive, specific, non-hype.
- One claim per sentence.
- Name the object, the owner, and the hold.
- Prefer verbs that produce artefacts: specify, charter, sample, hold, recertify, demote.
- Prefer nouns a Controller already owns: DOA, dual approval, vendor master, payment proposal, period-end attestation.

Approved sentences (use freely): Proof before permission. Design the layer. Keep the stack. Agents earn responsibility. Prepare is not execute. Payment authorisation stays human. A flag is a hypothesis, not a verdict. Observation is the default. If it is not in the charter, the agent does not do it. Evidence first. Then a named human.

### 6.2 Banned language

Never: guaranteed savings / ROI / “pays for itself” / “cut AP cost in half” / 10x / unlock millions / touchless AP as a promise / set and forget / fraud detection / fraud-proof / audit-ready as a certificate / fully compliant / SOX compliant / accounting accuracy guaranteed / autonomous payment safety / “the AI authorises the run” / replace your ERP / fire your AP team / human-out-of-the-loop payments / revolutionary / disruptive / magic / AI-powered as a hollow prefix / next-gen / world-class / supercharge / unleash / fake urgency.

Allowed near-misses: “duplicate and anomaly flags for human review”; “produces evidence a control owner can present”; “sampled accuracy; inspectable worksheets”; “human-held payment release”; “visible cost per thousand invoices”; “observed rates if they later move.”

### 6.3 Brand collision note

Evidence Room LLC (evidence-room.net) is a forensic-animation company. We are not that company. Public lockup is always **EVIDENCE ROOM — AP AGENT OS**. Do not use “Evidence Room” alone on paid media, storefronts, or first screens. Do not use gavels, fingerprints, courtroom imagery, or “forensic reconstruction.” Payment descriptors include “AP AGENT OS” or “EVIDENCEROOM.AI”. This is hygiene, not a legal opinion. Flag clearance as open.

### 6.4 Northline Industrials

Fictional manufacturer. Precision fasteners and industrial assemblies. US-OH, US-AL, CA-ON, MX-NL. Dynamics 365. ~15,000 invoices/month. ~2,400 vendors. Cleveland SSC. Tuesday/Thursday payment runs. Dual human approval. Figures are illustrative. First mention of any Northline number must say so. Never present Northline as a customer or a benchmark.

---

## 7. Statistics and research (no invented numbers)

### 7.1 Rule

If a number is not (a) a product count, (b) an explicitly illustrative Northline figure, (c) the buyer’s own input, or (d) a source listed below, it does not appear.

### 7.2 Permitted external citations (edition 1.0.0)

Use the exact framing. Do not “round for impact.” Do not convert a survey into an AP outcome.

1. **Ardent Partners, State of ePayables 2024**, via Tipalti (vendor-originated citation of independent research): best-in-class electronic AP cost per invoice **$2.78** vs laggards **$12.88**; cycle time **3.1** vs **17.4** days. Always mark as vendor-originated. Never call these “typical Evidence Room results.”
2. **Ardent Partners, AP Metrics that Matter 2025**, via Tipalti (vendor-originated citation): exception rate comparison **22% → 9%** in that research. Same labelling rule.
3. **McKinsey, November 2025, finance AI:** 44% of 102 CFOs used gen AI for five or more use cases (from 7%); 65% increasing gen AI investment. This is about finance-function adoption, not AP savings.
4. **McKinsey, State of AI 2025** (survey June–July 2025, n=1,993): 88% regular AI use; roughly two-thirds not scaling; 62% experimenting with agents; 23% scaling an agent somewhere; 39% any EBIT impact. Workflow redesign is a high-performer differentiator. Do not imply that using this toolkit produces EBIT impact.

When a business-case model outputs payback or ROI, those outputs are functions of **buyer-supplied inputs** and labelled Conservative / Base / Upside. No false precision (no $12,847.22). Evidence Room does not stand behind the output as a forecast.

---

## 8. Quality gates (every file)

A file may ship only if all of the following are true:

| Gate | Test |
|---|---|
| Q1 Completeness | It is a working artefact (template filled or fillable), not an outline of future sections |
| Q2 Voice | Executive, specific, non-hype; no banned phrase |
| Q3 Holds | Payment-always-human appears wherever cash or bank data is in scope |
| Q4 Evidence | Packets, samples, or registers are named; permission is withheld |
| Q5 ICP | Written for Transformation / AP / Controller / Audit — not for a consumer “AI hack” audience |
| Q6 Stats | Every external number is in §7.2 or labelled illustrative |
| Q7 Northline | Fiction labelled; not a case study |
| Q8 ERP | Agnostic; no fake connector |
| Q9 Collision | Lockup correct; no Evidence Room LLC confusion |
| Q10 Licence honesty | File does not promise software, certification, or consulting that the SKU does not include |
| Q11 Cross-link | Points to the owning spec rather than duplicating a gate table sloppily |
| Q12 Independence | Independently authored; not a thin rewrite of a third-party vendor guide |

Fail any gate: rewrite. Do not ship with a “TODO” or a promised later chapter.

---

## 9. Offer ladder (commercial facts, not outcomes)

| Offer | Price (USD list) | Job |
|---|---|---|
| AP Agent Readiness Diagnostic | $0 | 36-question reading; band; suggested Wave 1 |
| Starter | $79 | Individual; first-wave canvases; must feel worth more than the price in usable artefacts |
| Professional | $199 | Full OS on one desk |
| Team | $499 | Shared working group |
| Custom Blueprint | $1,500–$3,000 | Facilitated design against *their* stack; application, not a cart impulse |

Starter must contain complete blueprints, checklists, and templates a practitioner can run on Monday — not a teaser that withholds the method.

---

## 10. Execution order (authoring and buyer)

### 10.1 Authoring order (how this archive was built and should be extended)

1. Lock brand, anti-goals, evidence standard, payment rule, ERP-agnostic rule, citation list.
2. Write navigation (`00_READ_ME/`) and the refined prompt (this file).
3. Write the diagnostic and maturity model (`01`).
4. Write Starter so it stands alone at $79 (`02`).
5. Write the sixteen agent specs and autonomy / human-vs-agent files.
6. Write process mapping, exception taxonomy, governance, KPIs, testing.
7. Write business-case model and templates (`03` remaining).
8. Write Team facilitation and workshop (`04`).
9. Write Custom Blueprint fulfilment (`05`).
10. Write commercial, store, and legal drafts (`06`, `07`, `10`) without letting them loosen §3.

Do not write LinkedIn posts before the payment rule is on paper. Do not write an ROI calculator before the citation rule is on paper.

### 10.2 Buyer execution order (what files must tell them)

Friday diagnostic → Saturday ten exceptions + one payment run → Sunday owners and sampling → Monday note → two-week L0 → evidence-gated L1 → Wave 2 prepare → periodic agents → rare L3 on a named class. Never: demo on Monday, auto-post on Tuesday, payment agent on Wednesday.

---

## 11. Acceptance tests (suite-level)

A reviewer (human) accepts an edition only if:

1. A Controller can find the payment sentence in under two minutes from `00_READ_ME/README.md`.
2. The diagnostic has 36 questions, six dimensions, 0–4 scoring, and an L1–L5 model.
3. Starter contains ten complete agent blueprints and a runnable checklist — not bullets that say “add later.”
4. Professional contains sixteen agent files plus charter, autonomy, and human-vs-agent.
5. Business-case files include Conservative / Base / Upside, the exact §7.2 citations, and an explicit non-promise.
6. Team includes a full-day workshop a leader could run tomorrow.
7. Custom Blueprint states $1,500–$3,000, inclusions, and exclusions.
8. Grep of the customer-facing packs finds none of: “guaranteed savings,” “detect fraud,” “fully compliant,” “autonomous payment,” “accounting accuracy guaranteed.”
9. Every Northline figure is labelled illustrative or fictional at first use in that file.
10. Lockup appears on each pack’s title block.
11. No file instructs the buyer to upload production invoices to Evidence Room.
12. Legal drafts remain labelled drafts.

---

## 12. File-level authoring pattern

Every customer-facing markdown file opens with:

- Product / lockup
- Audience
- Use
- A one-line non-purpose when the topic is money, risk, or research

Every file closes with a document-control table.

Worked examples use Northline. Blank tables sit next to filled tables. A “template” without a worked example is incomplete unless the file is a register that must stay empty until the buyer fills it — in which case it still includes one filled illustration clearly marked fictional.

---

## 13. Custom Blueprint fulfilment (when extending `05`)

The engagement is highly repeatable and may be AI-assisted **internally** (draft maps, draft charters, draft notes). A named Evidence Room practitioner remains accountable for the deliverable. The client’s production data stays in the client’s systems. The engagement does not implement software, authorise payments, or certify controls. Price is scoped in `05_CUSTOM_BLUEPRINT/PRICING_AND_SCOPE.md`.

---

## 14. What “nth degree” means

This prompt is refined to the degree that:

- ICP is a disqualifier list, not a persona poem.
- Anti-goals are enforceable by grep.
- Evidence is a packet definition, not a mood.
- Quality gates are binary.
- Statistics are a closed list.
- Payment and ERP rules cannot be “interpreted” into connectors or auto-release.
- Brand collision is an authoring constraint, not an afterthought.
- Acceptance tests can fail an edition.

If a future author wants more freedom, they must change this prompt in a new edition — and accept the brand-idea test: if permission is granted before proof, the brand sentence is false and must be retired.

---

## 15. Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Refined master prompt |
| Status | Controlling authoring spec for edition 1.0.0 |
| Related | Entire archive |
| Not | A customer implementation plan; not legal advice |
