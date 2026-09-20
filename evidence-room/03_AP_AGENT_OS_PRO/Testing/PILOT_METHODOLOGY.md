# Pilot Methodology

**Product:** AP Agent OS — Evidence Room  
**Method step:** 8  
**Rule:** A pilot is a **narrow live role** under a kill-switch. It is not “turn it on for the SSC”. Success is the pre-registered scorecard, not a feeling that it looks fine.

Payment release, bank-master writes, DOA edits, GR creation, and statement-to-invoice posting remain out of scope at every Northline Wave 1–2 pilot.

---

## 1. When a pilot may start

All of the following:

- Historical protocol pass on the sealed pack (or a dated waiver listing residual risk ids)  
- UAT exit with no open Critical, no unowned High  
- Shadow exit memo = proceed, countersigned  
- Governance Standard sections 1–8 initialled (pre-pilot gate)  
- Pilot charter signed  
- SC-P formula version locked  
- Kill-switch drilled in the prior 10 working days  
- SOP Type 3 (pilot addendum) acknowledged by named processors

If the ERP, path, or model changed since shadow, re-shadow. Do not inherit stale evidence.

---

## 2. Scope patterns (pick one primary limiter)

| Limiter | Example (Northline) | Why it works |
|---|---|---|
| Named suppliers | 12 vendors including Helion Fasteners | Repeat mix; easier case review |
| Legal entity | Dayton company code only | Entity tests stay visible |
| Document type | PO goods, entity currency | Trees stay tight |
| Value band | ≤ 25,000 entity currency | Limits impact of a wrong accept |
| Channel | Shared mailbox only | Intake math stays simple |

Do not combine “all suppliers, all entities, all types” and call it a pilot.

**Live role** in Wave 1: processors **see and may accept** L1 proposals on in-scope objects. Commit to ERP remains human. Out-of-scope objects must not show proposals (or show them bannered “out of pilot — do not rely”).

---

## 3. Charter (mandatory fields)

| Field | Content |
|---|---|
| Pilot id | PI-`<entity>`-`<path>`-`<nn>` |
| Dates | Start, scheduled end, earliest stop |
| Limiters | From §2 |
| Agents and autonomy | e.g. 01–04, 10, 16 at L1 |
| Allowed actions | Propose / flag / draft / route / assemble |
| Forbidden actions | List 2.1–2.6 of the Governance Standard |
| Named processors | |
| Kill-switch | Person, deputy, action, time to effect (Northline target: 15 minutes in working hours) |
| Daily stand-up | Time, attendees |
| SC-P tiles and floors | Pointer to locked table |
| Incident path | |
| Rollback | What “off” means (hide proposals vs disable principals) |
| Dual A signatures | Process owner, control owner |
| Test lead | |

No unsigned charter → no live proposals.

---

## 4. Kill-switch

Write as a procedure, not a slogan.

1. Who may call it (process owner, control owner, AP lead, systems).  
2. What they do (disable the service principal / feature flag / hide UI).  
3. How they confirm (write-block query; processors ping).  
4. Deputy if the owner is off.  
5. What happens to in-flight drafts (remain drafts; humans continue on SOP).  
6. Who is notified (dual A, systems, testers).  

Drill once with a non-production flag before day 1. Record the elapsed time.

---

## 5. Daily stand-up (first ten working days)

Fifteen minutes. Agenda fixed:

1. Volume in-scope vs out-of-scope leakage  
2. Overrides (reject/edit) and top reasons  
3. Critical codes seen (EX-DUP, EX-ILE, EX-BNK, EX-DOA)  
4. Breaches / incidents / kill-switch  
5. EX-SYS / hash  
6. One case  

Notes go to the daily pilot log. After ten days, dual A may move to thrice weekly if N_breach stays 0.

---

## 6. What is measured

SC-P per `../KPI_and_Measurement/SCORECARD_DEFINITIONS.md`.

Additional pilot fields:

- Override rate and reason codes  
- Out-of-scope leakage (proposals shown where they should not be)  
- Kill-switch drills / uses  
- Processor acknowledgement list (SOP version)

Financial tiles stay grey unless a validation method is live. Northline Wave 1: Sav_val grey; Hrs_est only if the W10 time study is cited.

---

## 7. Incident during pilot

Follow Governance Framework §17. Default: stop the affected agent, not a silent continue. Returning to live use is a release, not a stand-up decision.

Unknown-commit (EX-SYS after a write): treat as production finance incident even if the write was a human post using an agent proposal.

---

## 8. Mid-pilot changes

| Change | Action |
|---|---|
| Cosmetic template wording on an approved list | Allowed; log |
| Prompt, model, tree, tolerance, allowed tool | Stop; change control; new SC-P window |
| Add a supplier inside the same limiter logic | Dual A note; do not add “all remaining suppliers” |
| Raise value band | Expansion request (Method step 10), not a pilot tweak |

---

## 9. Close report

1. Charter vs actual scope  
2. SC-P closed card  
3. Override commentary  
4. Incidents and defects remaining  
5. Leakage  
6. Kill-switch currency  
7. **Go / no-go** for (a) continue as steady L1 on this limiter, (b) expand limiter, (c) stop, (d) do not promote autonomy  
8. Dual A signatures  

Go on operational tiles with a Critical breach is non-conformant.

---

## 10. Northline PI-DAY-PO-01 (illustrative)

- Limiters: Dayton, PO-goods, ≤ 25,000 USD, 12 named suppliers, mailbox channel.  
- Agents 01, 02, 03, 04, 10, 16 at L1; 15 working days after a 10-day daily stand-up.  
- Kill-switch drill 11 minutes.  
- SC-P: Acc_match 0.94; FNR EX-DUP 0; N_breach 0; leakage 3 objects bannered and unused; Sav_val grey.  
- Go: continue L1 on the 12 suppliers; do not promote Matching to L2 until EX-PRX labelling defect stays closed for two weeks; no payment-file role requested.

---

## 11. Failure modes

| Failure | Name it as |
|---|---|
| Whole SSC sees proposals | Not a pilot — stop and re-charter |
| “We’ll watch it” with no SC-P | Not a pilot |
| Raising autonomy in week two because STP looked high | Non-conformant expansion |
| Kill-switch owner on leave, no deputy | Do not start or pause the pilot |
| Comparing to a vendor slide instead of SC-P | Void the close report |
