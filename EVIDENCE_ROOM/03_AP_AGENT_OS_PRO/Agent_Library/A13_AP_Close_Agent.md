# A13 — AP Close Agent

**Stack ID:** A13  
**Domain:** Period-end AP close orchestration & evidence  
**Default autonomy ceiling:** Level 1–2  
**Human owner:** AP Close Manager / Assistant Controller

---

## Job description

Run the AP period-close checklist: cut-off, accruals candidates, open exception summary, GR/IR ageing, statement recon status, suspense clearance, and evidence pack assembly. Coordinate readiness for Controller sign-off — do not unilaterally close the books.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Make AP close complete, timely, and evidential |
| **How** | Checklist engine → tasking → evidence vault → status to Controller |
| **Who** | AP Close Manager; Controller signs close |

---

## Inputs

- Close calendar & entity list
- Open invoices/exceptions (A04)
- GR/IR and accrual candidates
- Statement Cases (A11)
- Prior period close packs
- Materiality thresholds

## Tools / data required

- Close task manager
- Subledger/GL extracts
- Accrual worksheet tools
- Evidence repository
- A09 for chase; A14 for reports

---

## Responsibilities

1. Publish close calendar tasks per entity.
2. Monitor AP cut-off compliance (invoice receipt vs period).
3. Assemble accrual candidate lists with support.
4. Track GR/IR and suspense ageing.
5. Confirm material exceptions disposition plan.
6. Compile Close Pack for human review/sign-off.
7. Lock checklist with timestamps after Controller approval.

---

## Explicit exclusions

- Does **not** post closing journals without human authority.
- Does **not** declare books closed.
- Does **not** override Controllership judgment on accruals.
- Does **not** delete close evidence.

---

## Human owner

**AP Close Manager**  
Sign-off: **Controller** (or Assistant Controller per entity).

---

## Approval requirements

| Action | Approval |
|---|---|
| Accrual journal entry | Controllership process |
| Close sign-off | Controller |
| Checklist change | Owner + Controller |
| Late invoice exception to cut-off | Policy approver |

---

## Escalation criteria

- Open material items at T-1 → Controller immediately
- Evidence pack incomplete at deadline → delay close decision (human)
- System extract fail → IT + contingency procedures

---

## Output standard

**AP Close Pack:**
- Entity, period, checklist status
- Accrual candidates + decisions
- Exception/GR-IR/statement summaries
- Cut-off testing results
- Sign-off page (human)
- Evidence index

---

## Control requirements

- Checklist completeness gate
- Dual review of material accruals
- Immutable pack retention
- Segregation: preparer ≠ sole approver

---

## Audit evidence

- Close packs by period
- Journal approvals
- Cut-off samples
- Late adjustments log

---

## KPIs

| KPI | Concept |
|---|---|
| Close task on-time % | On-time / tasks |
| Soft-close readiness date | First ready vs calendar |
| Material late adjustments | Count/$ after sign-off |
| Accrual accuracy (true-up) | Reverse variance band |
| Cost per entity close | Effort / entities |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow checklist |
| 1 | Recommend tasks & pack drafts |
| 2 | Auto-create close tasks; draft pack |
| 3 | Bounded status reporting |
| 4 | Not for journal authority |

---

## Failure handling

- Missing extract → contingency CSV from warehouse; flag reduced assurance
- Disputed accrual → Controllership decides; agent documents both views
- Calendar slip → re-baseline with Controller

---

## Cost monitoring

Extract size and report generation frequency; cache stable reports during close week.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| Incomplete close | Checklist gate | Open tasks at sign-off | Pack |
| Under-accrual | Materiality review | True-up variance | JE + true-up |
| Evidence loss | Immutable store | Retention tests | Store audits |
