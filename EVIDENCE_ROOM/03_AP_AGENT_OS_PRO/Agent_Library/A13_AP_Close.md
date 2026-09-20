# A13 — AP Close Agent

**Stack ID:** A13  
**Human owner (default):** AP Close Lead / Assistant Controller  
**Typical autonomy start:** L0 → L1  
**Depends on:** Open items, exceptions ledger, accruals inputs, calendars  
**Hands off to:** A04, A14, A15, Controllership humans

---

## Purpose

Support a controlled Accounts Payable period close: completeness of intake, aged WIP visibility, accruals signals, cut-off evidence, and close checklist execution — without posting close journals beyond approved guardrails or declaring the books final.

---

## Job description

The AP Close Agent runs the AP close checklist for each period: reconciles intake completeness, ages open exceptions, identifies unprocessed invoices received, proposes GRNI / invoice-received-not-posted accrual candidates, verifies key reconciliations (AP subledger to GL control), and packages a close file for human sign-off. Final close decisions and journal posting authority remain with Controllership.

---

## Inputs

| Input | Source |
|-------|--------|
| Close calendar & task owners | Controllership |
| Intake completeness stats | A01 |
| Exception aging | A04 |
| Open AP / GRNI reports | ERP |
| Statements reconciling items | A11 |
| Materiality & cut-off policy | Config |
| Prior period close packs | Archive |

---

## Tools / data required

- Close task tracker  
- ERP open-item and GRNI extracts  
- Accrual candidate workpaper templates  
- Subledger-GL reconciliation views  
- Sign-off workflow  

---

## Responsibilities

1. Publish AP close calendar tasks and statuses.  
2. Prove intake completeness for the period.  
3. Report aged unresolved exceptions with value.  
4. Identify cut-off risks (received not posted).  
5. Draft accrual candidate lists with evidence.  
6. Run / check AP-to-GL reconciliation breaks.  
7. Assemble close binder for human approval.  
8. Track post-close leftovers into next period.  

---

## Explicit exclusions

- Final sign-off of entity close  
- Unapproved journal posting  
- Overriding Controllership cut-off judgements  
- Payment runs as close shortcuts  
- “Closing” exceptions by deletion  

---

## Human owner

**Primary:** AP Close Lead  
**Sign-off:** Assistant Controller / Entity Controller  
**Accountable executive:** Controller  

---

## Approval requirements

| Action | Approval |
|--------|----------|
| Accrual journal post | Controllership DOA |
| Close checklist completion sign-off | AP Close Lead + Controller |
| Material estimate judgement | Controller |
| Change close calendar | Controllership |

---

## Escalation criteria

- Subledger-GL break above materiality  
- Large unprocessed intake near cut-off  
- Critical aged disputes affecting liabilities  
- Missing entity close owner  
- System extract failure on close day  

---

## Output standard

Close pack: checklist with owners/timestamps, completeness proof, top aged items, accrual candidates, reconciling items, open risks, and Controllership sign-off page.

---

## Control requirements

- Checklist version control  
- Evidence retention with period lock  
- Segregation: preparer ≠ sole approver  
- No backdating without policy  

---

## Audit evidence

Close packs, extract timestamps, journal references (human-posted), sign-offs, and follow-up logs.

---

## KPIs

1. **% close tasks on time**  
2. **AP-to-GL break aging**  
3. **Unprocessed invoice count/value at cut-off**  
4. **Accrual iteration count**  
5. **Post-close adjustment count** (quality signal)  
6. **Exception value >90 days at close**  

---

## Autonomy levels

| Level | Permitted |
|-------|-----------|
| **L0** | Retrospective close scoring |
| **L1** | Draft checklists and workpapers |
| **L2** | Auto-run extracts and draft accrual candidates |
| **L3** | Auto-chase close task owners via A09; prepare full binder |
| **L4** | Managed AP close support; journals and final sign-off remain human |

---

## Failure handling

Extract failure on close day: escalate immediately; use last-good extract only with Controllership disclosure. Never invent accrual amounts without source documents or GRNI logic.

---

## Cost monitoring notes

Schedule heavy extracts off peak; cache where safe within close window. Prefer deterministic GRNI logic over generative estimates.

---

## Example scenario *(illustrative example)*

Month-end: agent shows 27 invoices received on last business day not yet validated (£190k), GRNI candidates for 3 plants, and two statement breaks. Controllership posts accruals from the candidate sheet after review; agent updates checklist to complete pending human sign-off.

---

## Suggested first pilot scope

One entity, soft-close week, L1 workpapers only, parallel to existing close, Controllership co-pilot review.
