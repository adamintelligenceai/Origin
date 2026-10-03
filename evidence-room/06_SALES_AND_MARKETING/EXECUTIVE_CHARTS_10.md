# Executive Charts — 10 Specifications

**Lockup:** EVIDENCE ROOM — AP AGENT OS  
**Use:** Steering packs, Resources, Custom Blueprint workshops.  
**Style:** One idea per chart. Paper background. Signal red only for human-held or hold states.  
**Data rule:** If a number is illustrative, the subtitle says so. Do not present Northline figures as benchmarks.  
**Annotation rule:** A complete sentence, not a sticker that says “insight.”

These are specifications a designer or analyst can draw. They are not screenshots of live customer systems.

---

## Chart 1 — Autonomy ladder with a missing rung

**Type:** Vertical step chart (five labelled steps + a blocked sixth).  
**X:** none. **Y:** rights, not time.

| Step | Label | Fill |
|---|---|---|
| L0 | Observe — shadow reports, no reliance | graphite |
| L1 | Recommend — evidence required, no ERP write | graphite |
| L2 | Prepare — complete packet, human executes | graphite |
| L3 | Execute within written guardrails | light graphite, rare |
| L4 | Managed autonomy of the *same* bounded set | light graphite, rarer |
| — | Payment authorisation / bank-file transmission | **signal red, struck through** |

**Annotation:** Payment is not a rung you earn. It is a human act that sits beside the ladder.  
**Do not:** draw an arrow from L4 into “auto-pay.”  
**Source of truth:** Method; `AUTONOMY_PROGRESSION.md`.

---

## Chart 2 — Sixteen-agent workforce map

**Type:** Flow, left-to-right operational path, periodic agents as a lower rail, Orchestrator as a backplane.

**Nodes:** 01→02→03; 10 parallel on 02/03; breaks to 04 then 05/06/08/09; non-PO to 07; periodic 11, 12, 13, 14, 15; 16 spanning.

**Colour:** 12 and the payment exit in signal red with a lock mark.

**Annotation:** Intake does not match. Matching does not invent a receipt. 12 annotates; humans release.  
**Footnote:** Default commissioning L0/L1. Not a deployment diagram of software.

---

## Chart 3 — Evidence packet skeleton

**Type:** Exploded document / checklist bar.

**Bars (must all be present for a match recommendation to be eligible):**

1. Source image or structured invoice  
2. Extract with field-level notes  
3. PO (or explicit non-PO class)  
4. GR or documented reason GR is not required  
5. Tolerance line applied  
6. Worksheet  
7. Owner + clock  
8. Flag outcome if Agent 10 fired  

**A second, hollow bar:** “Model confidence score.”

**Annotation:** The hollow bar is never sufficient. Fluency is not a packet.  
**Use:** Article 2 companion.

---

## Chart 4 — Payment swimlane

**Type:** Swimlane. Rows: ERP/Treasury tool · Agent 12 · Human approver A · Human approver B · Transmission role · Bank.

| Step | ERP | Agent 12 | Human A | Human B | Transmission | Bank |
|---|---|---|---|---|---|---|
| Proposal created | ● | | | | | |
| Annotation | | ● L1 | | | | |
| Review | | | ● | | | |
| Second approval | | | | ● | | |
| File sent | | | | | ● | |
| Acknowledged | | | | | | ● |

**Annotation:** There is no swimlane in which the agent column shows a release. If a vendor draws one, reject the drawing.  
**Red rule:** Agent column stops after annotation.

---

## Chart 5 — Exception mix (illustrative)

**Type:** Horizontal bar. **Subtitle required:** “Illustrative mix for a fictional entity (Northline). Not a benchmark. Not your target.”

Example distribution (label as fiction):

| Code | Share (illustrative) |
|---|---|
| Missing GR | 31% |
| Price / quantity | 22% |
| Defective PO | 14% |
| Approval path | 11% |
| Capture / validation | 9% |
| Supplier wait | 7% |
| Duplicate hypothesis | 3% |
| Other | 3% |

**Annotation:** The point of the chart is that codes exist. The percentages are scenery. If you publish this without the subtitle, you have created fake research.  
**Better live version:** replace bars with “your mix here” empty chart in Team workshops.

---

## Chart 6 — Cost stack per 1,000 invoices

**Type:** Stacked column, three segments: platform/licence · model/token · exception minutes (costed at a rate *the organisation* chooses).

**Y-axis:** currency per 1,000 invoices.  
**Subtitle:** “Recorded cost, not a promised reduction.”

**Two columns only:** “Last month (recorded)” and “This month (recorded).” No “after AI” column with a down arrow.

**Annotation:** An expensive and wrong agent is retired. Scaling a stack you have not recorded is how unofficial workforces hide.  
**Do not:** show a third column labelled “savings.”

---

## Chart 7 — RACI snapshot (invoice-to-match)

**Type:** Compact matrix. Rows: Capture · Validation · Duplicate flag · Match · Tolerance apply · Post. Columns: Intake · Validation · Matching · Dup/Anom · AP Ops Lead · Controller.

**Marks:** R / A / C / I as in the agent library. Posting: human R/A; Matching C at L1/L2 only.

**Annotation:** Agent in the R column means prepares or recommends. A named human still A-owns.  
**Red cell:** Payment does not appear on this chart — put a footnote: “See Chart 4.”

---

## Chart 8 — Four-wave commissioning

**Type:** Gantt-style bars over 90 days, four waves.

| Wave | Agents | Days | Level |
|---|---|---|---|
| 1 | 01, 02, 03, 04, 10, 16 | 1–45 | L0 then L1 on gates |
| 2 | 05, 07, 08, 09, 12 | 46–75 | L1; selected L2 packets |
| 3 | 11, 13, 14, 15, 06 | 46–90 | L0/L1 |
| 4 | Narrow clean-match class only | After 90, optional | L3 only after gates; never payment |

**Annotation:** Wave 4 is optional. Many organisations should not take it. Skipping it is not a failed transformation.  
**Colour:** Wave 4 outlined, not filled.

---

## Chart 9 — Diagnostic bands

**Type:** Four-state strip, equal width, no traffic-light morality (do not use green = good / red = bad). Use graphite densities.

| Band | One-line meaning | Next step |
|---|---|---|
| Undesigned | Activity, no charters | Wave 1 at L0 |
| Informal | Some roles, implied permission | Register + Professional |
| Gated | Packets exist; gaps remain | Team; Audit observes |
| Designed | Register, holds, cadence | Recertify; Blueprint only if entities are hard |

**Annotation:** A band is a reading aid. It is not a certificate, a risk rating for insurers, or an investment score.  
**Do not:** put percentages of “companies in each band.” You do not have that data.

---

## Chart 10 — Permission calendar

**Type:** Three nested cadences (week / month / quarter) as concentric rings or a simple table.

| Cadence | Objects |
|---|---|
| Weekly | Exception mix, SLA breaches, uncleared flags, model-cost outliers |
| Monthly | Tolerance table, DOA substitutes, supplier-query templates, limit-table edits (all human) |
| Quarterly | Autonomy recertification, packet sample, retire/demote, access review |
| Per run | Agent 12 notes in; dual human approval out |
| On change | Prompt, model version, mapping — change-controlled |

**Annotation:** Permission is a calendar. If it is only a kickoff value, it will lose to Thursday.  
**Footer:** Governance here is not a claim of compliance. It is inspectability.

---

## Production checklist

- Export PNG and a native slide.  
- Every illustrative number carries “illustrative / fictional” in the visible subtitle.  
- No ERP vendor marks.  
- No “ROI after 6 months” cousin chart. If someone asks for it, decline.  
- Alt text: repeat the annotation sentence.  
