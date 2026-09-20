# Evidence Room — Custom Blueprint

## 02 — Fulfilment workflow

**Product:** Evidence Room Custom Blueprint  
**Audience:** Evidence Room practitioner fulfilling the SKU; buyer coordinator (so they know the clock)  
**Version:** 1.0  
**Classification:** Internal operating procedure for a **US$1,500–3,000** written service. Not an implementation method for the buyer’s ERP.

---

## 1. What to do

Turn a complete intake into a Blueprint that the buyer can run with Professional OS. Stop at the written deliverable. Do not configure their systems. Do not run their historical test for them unless a **separate** contract says so (out of this SKU).

**How.** Stages F0–F6.

**Who.** Named practitioner R; second reader C (even a short checklist read); buyer Accountable receives.

**Wrong.** Scope creep (“while we’re here, design payments”). Using another buyer’s as-done rules. Inventing statistics.

**Control.** Completeness gate; second-reader checklist; language ban.

**Measure.** Days from complete intake to delivery; revision cycles (max 1 in band); defects found by second reader.

**Evidence.** Fulfilment folder `CB-FUL-[intake ID]/`.

---

## 2. How — stages

### F0 — Order and band

**What.** Confirm fee band vs intake complexity.  
**How.** If two entities + two channels + two agents + “need L3” → **refuse or re-scope** before work.  
**Who.** Practitioner.  
**Wrong.** Starting work on an unbounded intake.  
**Control.** Band table in the brochure.  
**Measure.** Refusals / re-scopes.  
**Evidence.** Order note.

### F1 — Completeness gate

Refuse to write if:

- No named Accountable  
- Payment-release requested as an agent verb  
- Live IBAN / unredacted invoice dump attached  
- Slice is “all AP globally” with no hypothesis  

Return a defect list. Clock starts when A–C are complete.

### F2 — Analyse (2–4 hours ILLUSTRATIVE)

Map intake to:

- Slice allow-list (narrow if they over-asked)  
- First agent (default lean: 01 and/or 10 + 16 observe)  
- Human classes  
- Test strata they must label  
- Phase 5 caveat if identity lead time is long  
- ASSUMED economics cells  

Do not invent volumes.

### F3 — Optional call (60 min, mid/high band)

Agenda: challenge the slice (20); unofficial rules (15); access lead time (10); confirm out-of-scope verbs (10); questions (5).  
Notes become “Call facts” vs “Call assumptions.”  
**Do not** screen-share a live ERP with production data.

### F4 — Draft

Write `03_DELIVERABLE_OUTLINE.md` populated for this buyer. Include `04_90_DAY_PLAN_TEMPLATE.md` dated as **ILLUSTRATIVE** and caveat-logged.

Voice: executive, specific. No hype. No guaranteed ROI.

Cite Professional file names so they can operate without you.

### F5 — Second read (mandatory)

Checklist:

- [ ] One increment  
- [ ] L0 start  
- [ ] Four human classes excluded from execute  
- [ ] No invented industry stats  
- [ ] ACME only if labelled ILLUSTRATIVE  
- [ ] ASSUMED cells visible  
- [ ] Deloitte/Hackett used only if needed and labelled **not Evidence Room results**  
- [ ] No vendor lock  
- [ ] 4–6 week path used only if well-bounded tests pass; else full phases  
- [ ] Language ban  

Defects back to F4.

### F6 — Deliver and one revision

Send with a receipt page (they acknowledge **receipt**, not that the agent works).  
One redline cycle in band (factual corrections, not a second increment).  
Archive intake + output. Do not retain unneeded personal data.

---

## 3. Timing (ILLUSTRATIVE, not SLA)

| Band | Typical elapsed after complete intake |
|---|---|
| $1,500 | 5 working days |
| $2,250 | 7 working days (includes call scheduling) |
| $3,000 | 10 working days |

Buyer delay on the call or on PII cleanup stops the clock.

---

## 4. What the practitioner must not do

- Log into the buyer’s production ERP  
- Write prompts that grant execute  
- Fill Conservative efficiency with a “standard 20%”  
- Copy a prior buyer’s SOP  
- Promise dates for their IdP  
- Offer legal/compliance opinions  

---

## 5. Defects and stops

| Event | Action |
|---|---|
| Buyer sends live PII | Delete, notify, request redacted; do not process |
| Buyer demands ROI guarantee | Stop; cite brochure |
| Buyer wants payment execute | Stop increment; written refusal |

---

## 6. Measure fulfilment quality

| Question | Metric |
|---|---|
| Did we stay in SKU? | Scope-change count |
| Did we stay honest? | ASSUMED flags; second-read fails |
| Can they run Monday? | Buyer can name slice, owner, first agent, forbidden verb without a call (spot-check) |

Proof before permission.

---

*End of 02_FULFILMENT_WORKFLOW.md*
