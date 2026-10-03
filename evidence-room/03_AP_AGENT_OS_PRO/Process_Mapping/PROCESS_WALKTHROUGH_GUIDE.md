# Process Walkthrough Guide

**Product:** AP Agent OS — Evidence Room  
**Use with:** `00_METHODOLOGY.md` Steps 1–4  
**Audience:** Implementation lead facilitating AP, procurement, and control  
**Example organisation:** Northline Industrials (fictional)

A walkthrough is a structured conversation over live or recent work. It is not a workshop to redesign AP, and it is not a system demonstration.

---

## When to run a walkthrough

- First mapping of invoice-to-pay, or a material process change (new ERP module, shared-service migration, new legal entity).
- Before agentising a path that has only an SOP and no observation.
- After a control incident, to re-establish how work is actually done.

Do not run a walkthrough as a substitute for observation. Use it to complete, challenge, and socialise what observation already found.

---

## Roles in the room

| Role | Who (Northline example) | Job in the session |
|---|---|---|
| Facilitator | Implementation lead | Holds the clock, the question list, and the parking lot |
| Narrator | AP processor | Describes what they do, with a live or replayed invoice |
| Challenger | Second processor or team lead | Names the unofficial variants |
| Process owner | AP manager (Marcus Chen) | Confirms or disputes “this is how we do it” |
| Control voice | Assistant controller or SOX/control analyst | Asks where evidence is stored |
| Scribe | Analyst | Writes the transcript, not a cleaned narrative |
| Optional | Buyer, master-data steward, treasury | Called for a 20-minute slot, not the full session |

Agents are not participants. Do not role-play the agent in this session.

---

## Inputs to prepare

1. Observation log and at least one redacted invoice pack (PO, non-PO, credit note).
2. Current SOP, if one exists — marked “unvalidated”.
3. Exception taxonomy printed or on a second screen.
4. Blank process-map and decision-tree templates.
5. List of systems the facilitator already knows about; the room will add to it.
6. Privacy note: no full bank-account numbers on a shared screen.

---

## Session design

### Session A — Invoice arrival to parked-or-posted (90 minutes)

**Start question:** “Take the last invoice you handled that was not straightforward. Open it. Talk.”

Cover, in order:

1. How the invoice arrived (mailbox, portal, EDI, scan).
2. How it was identified (supplier, entity, PO vs non-PO).
3. What was keyed or extracted, and what was checked by eye.
4. What matching was attempted, and which system returned the result.
5. What happened when it did not match.
6. Who was asked, through which channel, and what closed the loop.
7. What “done” means (parked, posted, on hold, sent back).

**Facilitator rules**

- Interrupt only to timestamp and to pull a decision into the open: “Who can say yes here?”
- When two people disagree, write both paths. Do not vote in the room.
- If someone says “the system does that”, ask which field and which status code.
- If someone says “we never see that”, ask for the last time they did. Rare is not never.

### Session B — Exceptions and holds (75 minutes)

Walk the taxonomy list. For each high-volume code ask:

- How do you recognise it?
- What data do you need that you do not yet have?
- Who must move next (supplier, buyer, receiver, master data, tax)?
- What is the ageing trigger to escalate?
- What would make this the same exception next month?

Stop after the codes that together cover the bulk of the queue. Record the remainder as “unwalked — treat as manual”.

### Session C — Approval, coding, payment-pack edge (60 minutes)

Stay on the AP side of payment. The walkthrough ends at:

- invoice posted or firmly parked, and
- any input AP gives to the payment proposal (holds, discounts, due-date disputes).

Do not walk treasury payment execution. That is a different control system.

Ask:

- Where does coding come from on PO and non-PO paths?
- What is the DOA source of record?
- Which approvals are in the ERP, and which are in email?
- What places an invoice on payment hold, and who lifts it?
- What does AP send to treasury, and what does AP only comment on?

### Session D — Playback (45 minutes)

Facilitator plays back the draft map in 15 minutes. The room marks:

- **Wrong**
- **Missing**
- **Rare / entity-specific**
- **Control, not process**

Playback is the quality gate for Steps 3–4. If playback produces more than a handful of “wrong” marks, do not proceed to Agentise.

---

## Question bank

Use these verbatim when the room goes abstract.

**On intake**

- Which mailbox or portal is authoritative if the same invoice arrives twice?
- Who is allowed to forward a supplier PDF into the process?
- What do you do with a statement that contains invoices you do not have?

**On identity**

- How do you know which legal entity is being billed?
- What if the trading name and the legal name differ?
- When do you treat a new site address as a new supplier?

**On matching**

- What is a match in this organisation: header only, lines, amount tolerance, quantity tolerance?
- Who owns the tolerance table, and when was it last changed?
- What do you do with a service invoice that will never have a GRN?

**On people**

- If the buyer is on leave, what actually happens?
- Who can override a closed PO, and is that override logged?
- When do you stop chasing and return the invoice to the supplier?

**On evidence**

- If audit asked tomorrow why this invoice was posted, which three objects would you produce?
- Which chats and emails are not in that pack today?

---

## Facilitation behaviours that keep the session honest

| Do | Do not |
|---|---|
| Keep a live invoice on screen | Run a slide walkthrough of the target process |
| Write status codes and field names | Translate immediately into agent language |
| Park redesign ideas on a labelled list | Solve the process in the room |
| Timebox each invoice to 20 minutes | Let one war story consume the session |
| Invite the quieter processor to narrate | Let only the team lead speak |
| Record “we guess the tax code” as a finding | Smooth it into “tax is validated” |

---

## Outputs

After Sessions A–D the facilitator files:

1. Walkthrough pack (attendees, dates, invoices used, redaction log)
2. Annotated transcript
3. Draft process map and decision trees
4. Exception codes confirmed, plus codes marked unwalked
5. Control questions that remain open
6. Parking-lot redesign ideas (explicitly out of scope for mapping)

These feed `TRANSCRIPT_TO_WORKFLOW.md` and the templates in this folder.

---

## Northline Industrials — worked session notes (abridged)

**Entity:** Northline Industrials Ltd  
**Path:** PO invoice, domestic, goods  
**Narrator:** AP processor (4 years)  
**Invoice used:** Supplier “Helion Fasteners”, PO 451187, three lines, one partial GRN

Findings the SOP had omitted:

- Shared mailbox `ap.invoices@northline.example` is the intake of record; portal PDFs are forwarded there by a clerk in procurement, so portal intake is not a system interface.
- Match is attempted on PO + line + quantity first; price mismatch is parked even when within the buyer’s informal “that’s about right” range. The informal range is not a control.
- Missing GRN chase starts as an ERP workflow and, if silent for three days, becomes a personal email to the buyer. The email is not linked to the invoice record.
- Duplicate check is a vendor-number + invoice-number search. Same invoice under a different supplier site code would not be seen.
- Freight on the same PDF as goods is split by the processor into a non-PO line using a standing cost centre. No documented rule names that cost centre.

None of these findings imply a control failure by themselves. They are mapping facts.

---

## Common failure modes

1. **Happy-path theatre.** Only clean invoices are walked. Require one aged exception in Session A.
2. **ERP tour.** The session becomes a navigation lesson. Pull back to the invoice object.
3. **Policy recitation.** Control quotes the policy; processors describe email. Write both and mark the gap.
4. **Scope leak into payments.** Treasury execution, bank files, and signing rules belong in a different walkthrough.
5. **Premature agent talk.** If a participant asks “can the agent do this?”, park it. Agentise is Step 5.

---

## Checklist — walkthrough complete

- [ ] Sessions A–D held, or an equivalent written waiver for a missing session
- [ ] At least one PO, one non-PO, one credit note discussed
- [ ] Taxonomy codes for the bulk of the queue confirmed
- [ ] Legal-entity identification method written down
- [ ] Approval source of record written down
- [ ] Payment-hold mechanism written down
- [ ] Playback marks resolved or on the gap register
- [ ] Attendee list and invoice identifiers filed
