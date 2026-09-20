# AP Workshop Deck — Slide-by-Slide Outline

**Product:** Evidence Room — Team Workshop  
**Version:** 1.0.0 · **Date:** 2026-03-20  
**Format:** Outline for PowerPoint / Keynote generation  
**Duration:** Full-day (7 hours net) or two half-days  
**Visual system:** ink `#0B1F33` · paper `#F7F4EF` · signal `#1F6F78` · Fraunces / Source Serif 4 / IBM Plex Mono

---

## Section A — Frame (Slides 1–8)

### Slide 1 — Title
**Title:** AP Agent OS Workshop  
**Subtitle:** Designing agents that earn responsibility  
**Footer:** Evidence Room · evidenceroom.ai · Evidence over hype.  
**Speaker notes:** Welcome. State that this is an operating-model workshop, not a software demo day. Name sponsor in the room.

### Slide 2 — Outcomes for today
**Bullets:** Shared current-state map · Prioritised agent portfolio · Exception ownership draft · KPI starter set · 90-day actions  
**Notes:** Park “tool bake-offs.” Success is decisions and owners.

### Slide 3 — What Evidence Room is / is not
**Is:** Agent operating system documentation and governance method  
**Is not:** AP suite, payment network, ERP, prompt pack marketplace  
**Notes:** Name their stack respectfully; we design the agent layer across it.

### Slide 4 — Brand and voice
**Lines:** Evidence over hype. · AI that earns responsibility. · Governed agents. Measurable outcomes.  
**Notes:** Ask participants to flag any hype language during the day.

### Slide 5 — Industry climate (cited)
**Facts only:** Ardent 2025 — avg cost/invoice **$9.84** · BIC **$2.65** · exception **18.4%** · STP **35.4%** · AI adoption **44%**  
**Notes:** These are external benchmarks, not our promised results. Ask for their internal baselines next.

### Slide 6 — The seven product questions
**List Q1–Q7** (permitted work, evidence, exceptions, KPIs, promotion, failure, audit)  
**Notes:** Every candidate agent must answer all seven before design exits workshop.

### Slide 7 — Agenda and working agreements
**Blocks:** Discover · Map · Design · Govern · Commit  
**Agreements:** Phones down in exercises · No silent scope creep · Decisions written  
**Notes:** Assign a scribe.

### Slide 8 — Roles in the room
**Table:** Sponsor · Process owner · Analysts · Approver · Audit · IT · Facilitator  
**Notes:** Confirm decision rights for end-of-day prioritisation.

---

## Section B — Discover (Slides 9–14)

### Slide 9 — Readiness snapshot
**Content:** Bring Free diagnostic scores (six dimensions + level)  
**Notes:** Highlight any Controls/Governance/Data below 3.0 as hard gates.

### Slide 10 — Pain tour (silent write → share)
**Prompt:** Where does work stall? Where does rework hide? Where do suppliers escalate?  
**Notes:** 7 minutes silent; cluster on wall.

### Slide 11 — Exception reality
**Prompt:** Estimate % of invoices touching a human beyond happy path  
**Context line:** Peer exception rate **18.4%** (Ardent 2025)  
**Notes:** Do not debate precision; capture order of magnitude and classes.

### Slide 12 — Stack map
**Diagram:** Capture · Workflow · ERP · Payment · Data lake / BI · Identity  
**Notes:** Mark system of record for invoice status with a signal-colour star.

### Slide 13 — Control hotspots
**Prompts:** SoD gaps · Approval matrix age · Master-data change paths · Audit retrieval pain  
**Notes:** Invite Audit to speak first.

### Slide 14 — Discover synthesis
**Output:** Top 5 pains · Top 5 control worries · Explicit non-goals  
**Notes:** Photograph board; scribe into workbook.

---

## Section C — Map (Slides 15–20)

### Slide 15 — Lifecycle swimlanes
**Lanes:** Supplier · AP · Approver · Agent (proposed) · Control  
**Notes:** Map as-is first; to-be only after break.

### Slide 16 — Value and risk bands
**Axes:** Invoice value × judgement difficulty  
**Notes:** High value + high judgement = human-owned; agent assists at most.

### Slide 17 — Human-vs-agent decision test
**Four questions:** Evidence complete? Reversible/low value? Detectable error? Policy requires human identity?  
**Notes:** Practice on three live examples from the room.

### Slide 18 — Opportunity heatmap
**Quadrants:** Clarity × Control risk  
**Notes:** Plot ≥5 activities; star the High clarity / Low–med risk cluster.

### Slide 19 — Ten-agent menu (awareness)
**List:** Intake · Validation · Matching · Exception triage · GR assist · PO quality · Approval packet · Supplier resolution · Duplicate/anomaly · Orchestrator  
**Notes:** Menu ≠ commitment. Payment proposal **review** only — not release.

### Slide 20 — Map synthesis
**Output:** Ranked candidate list (max 5) with owners  
**Notes:** Vote with dots; sponsor breaks ties.

---

## Section D — Design (Slides 21–28)

### Slide 21 — Design principles refresh
**Six principles** from Operating Model Overview  
**Notes:** Keep visible on a side board.

### Slide 22 — Agent JD workshop
**Template fields on slide:** Mission · Permitted · Prohibited · Inputs/Outputs · Evidence · Exceptions · KPIs · Stops · Audit  
**Notes:** Breakout by candidate; 25 minutes.

### Slide 23 — Exception taxonomy draft
**Codes:** EX-DATA · EX-MATCH · EX-POL · EX-DUP · EX-MDM · EX-AMB · EX-SYS  
**Notes:** Force every sticky into a code; create subtypes only if needed.

### Slide 24 — Instruction skeleton
**Show** controlled instruction headings  
**Notes:** Emphasise versioning; no live production prompts without change control.

### Slide 25 — Evidence standard
**Packet examples** per candidate  
**Notes:** “If we cannot retrieve it in one day, the agent must not pretend.”

### Slide 26 — Stop conditions drill
**Scenarios:** Missing GR · Conflicting totals · Wrong approver · Suspected duplicate  
**Notes:** Each breakout writes the stop + escalation path.

### Slide 27 — KPI starter set
**Metrics:** Assisted volume · Exception rate · Taxonomy coverage · Evidence completeness · False flags · Overrides · Stop hits  
**Notes:** Formulas before targets. No ROI guarantees.

### Slide 28 — Design readout
**Format:** 5-minute readout per candidate · Challenge from Audit  
**Notes:** Park unresolved items in RAID.

---

## Section E — Govern (Slides 29–34)

### Slide 29 — Governance charter lite
**Elements:** Sponsor · Scope · Non-goals · Promotion rules · Demotion triggers · Cadence  
**Notes:** Draft live; polish after workshop.

### Slide 30 — RACI for agents
**Matrix excerpt**  
**Notes:** Agent is never Accountable for payment release.

### Slide 31 — Responsibility progression
**Stages S0–S5**  
**Notes:** Wave-1 stays ≤ S2/S3.

### Slide 32 — Audit evidence walkthrough
**Question:** Can we reconstruct a decision in six months?  
**Notes:** Name retention location today.

### Slide 33 — Risk register starter
**Categories:** Control · Operational · Vendor/AI · Change · Legal  
**Notes:** Top 5 risks with owners.

### Slide 34 — Govern synthesis
**Output:** Charter lite v0.9 · Open issues list  

---

## Section F — Commit (Slides 35–42)

### Slide 35 — 90-day roadmap skeleton
**Windows:** Design · Pilot · Stabilise · Decide  
**Notes:** Align to Team playbook weeks if programme-shaped.

### Slide 36 — Wave-1 commitment
**Table:** Agent · Owner · Mode · Start · Review date  
**Notes:** Max three agents in wave 1.

### Slide 37 — Training plan pointer
**Paths:** Analyst · Approver · Audit  
**Notes:** Schedule within two weeks.

### Slide 38 — Change narrative
**Message:** What changes for people · What does not · How to raise issues  
**Notes:** No “AI will replace you” rhetoric; be precise about task shifts.

### Slide 39 — Steering cadence
**Monthly pack contents** (link to Steering Committee Pack)  
**Notes:** Book first steering date before leaving room.

### Slide 40 — Decision log
**Live capture** of workshop decisions  
**Notes:** Read back for confirmation.

### Slide 41 — Closing — what we refuse to claim
**Refuse:** Guaranteed savings · Guaranteed fraud reduction · Compliance certification by purchase · Autonomous payment safety · Invented ROI  
**Notes:** Leave this slide visible in photos.

### Slide 42 — Thank you / next steps
**CTA:** Complete workbooks in 5 business days · Programme lead consolidates · evidenceroom.ai  
**Notes:** Collect feedback forms from Facilitation Pack.

---

## Appendix slides (optional)

- A1 Glossary (STP, SoR, SoD, responsibility progression)  
- A2 Lemon Squeezy MoR note (only if discussing commercial packaging internally)  
- A3 Custom Blueprint path ($1,500–$3,000) for multi-entity  

---

*Generate slides with institutional paper field; avoid purple, glow, and emoji.*
