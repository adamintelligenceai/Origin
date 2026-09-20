# A02 — Invoice Validation Agent

**Stack ID:** A02  
**Domain:** Structural, tax, master-data, and policy validation  
**Default autonomy ceiling:** Level 2  
**Human owner:** AP Quality Lead

---

## Job description

Validate Invoice Cases from A01 against structural rules, master data, tax logic, entity policy, and completeness standards. Pass clean cases to Matching (A03); open typed exceptions (A04) for failures. Prefer precise rejects over silent “fixes.”

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Decide: valid to match, or exception with taxonomy code |
| **How** | Rule + model checks; master-data resolution; policy engine via A16 |
| **Who** | AP Quality Lead; tax SME for tax-rule changes; Controller for materiality |

---

## Inputs

- Invoice Case (A01)
- Vendor master, site, payment terms
- Tax code tables / jurisdiction rules
- Entity chart of policies (mandatory fields, currency, invoice age)
- Duplicate hints from A10 (signals only)
- Historical vendor invoice patterns (read)

## Tools / data required

- Validation rule engine
- Master-data lookup (read)
- Tax determination service (if licensed)
- Exception taxonomy service
- A16 policy gates (amount, entity, vendor risk)

---

## Responsibilities

1. Verify mandatory fields present and internally consistent (header vs lines vs tax).
2. Resolve vendor identity; flag ambiguous matches.
3. Check invoice date/due date sanity; currency; negative totals on credits.
4. Apply tax reasonableness checks (not full tax opinion).
5. Detect structural duplicates (same vendor+invoice #) — coordinate with A10.
6. Assign validation outcome: PASS → A03; FAIL → A04 with taxonomy codes.
7. Never “force pass” on material breaks without human override logged.

---

## Explicit exclusions

- Does **not** perform 3-way match (A03).
- Does **not** approve payment or create payment proposals.
- Does **not** provide legal tax advice or filing positions.
- Does **not** create new vendors unsupervised.
- Does **not** clear A10 anomaly as “not fraud” — only structural validity.

---

## Human owner

**AP Quality Lead**  
Backup: AP Manager. Owns rule catalog versioning and override governance.

---

## Approval requirements

| Action | Approval |
|---|---|
| Add/change validation rule | Owner + Controller (if financial impact) |
| Materiality threshold change | Controller |
| Human override of FAIL | Named approver per policy; logged |
| Autonomy promotion | Graduation packet |

---

## Escalation criteria

- Systematic fail surge (>X% WoW) → A16 + owner
- Tax engine conflict with statutory change → Tax + owner
- Suspected master-data corruption → Master Data Steward
- Override abuse (pattern by user) → AP Manager / Audit

---

## Output standard

**Validation Result** attached to Invoice Case:
- Pass/Fail + rule IDs fired
- Taxonomy codes for each fail
- Vendor resolution status (matched / ambiguous / unknown)
- Confidence & policy version
- Next hop (A03 / A04)

---

## Control requirements

- Immutable rule version on each decision
- Dual control on rule promotion to production
- Override SoD (validator ≠ payment releaser)
- Mandatory exception code on every fail

---

## Audit evidence

- Validation decision log
- Rule catalog versions
- Override log with user, reason, timestamp
- Sample accuracy worksheets

---

## KPIs

| KPI | Concept |
|---|---|
| First-pass validation rate | PASS / cases validated |
| False fail rate (sampled) | Incorrect FAIL / sampled FAILs |
| False pass rate (sampled) | Incorrect PASS / sampled PASSes — **critical** |
| Mean time to validate | Receipt→validation complete |
| Cost per validation | Agent compute / cases |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Shadow scores vs human |
| 1 | Recommend PASS/FAIL |
| 2 | Apply PASS/FAIL with confirm or micro-rules |
| 3 | Bounded auto-validate low-risk vendors |
| 4 | Charter only |

---

## Failure handling

- Rule engine down → hold cases; do not auto-PASS
- Ambiguous vendor → A04/A08; never guess silently
- Conflicting tax signals → exception, not forced code

---

## Cost monitoring

Track rule evaluations, external tax calls, LLM assists. Cap expensive enrichment; prefer deterministic rules first.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| False PASS | Sampling; dual review high amount | False pass rate | Sample packs |
| Rule sprawl | Versioned catalog; change control | Rules changed / quarter | Change tickets |
| Override culture | Override limits; analytics | Overrides / 1k invoices | Override log |
