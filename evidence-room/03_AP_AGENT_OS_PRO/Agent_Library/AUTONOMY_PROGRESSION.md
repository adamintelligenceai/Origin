# Autonomy Progression — How an Agent Earns L0 → L4

**Product:** Evidence Room — AP Agent OS  
**Audience:** AP Process Owner, agent human owners, Controller, Internal Audit, IT  
**Use:** Promote, hold, or demote an agent with written evidence. Informal “it looks good, turn it up” is a control breach.  
**Principle:** Agents earn responsibility. Default is never full autonomy. Payment authorisation has no promotion path.

---

## 1. The only legal levels

| Level | Name | Live behaviour | Typical time in level before a promotion case may be opened |
|---|---|---|---|
| L0 | Observe | Shadow only. Output is not the system of record. | Minimum 10 operating days or 500 in-scope objects, whichever is later |
| L1 | Recommend | Recommendation is visible to the operator. Human accept / edit / reject is mandatory. | Minimum 20 operating days and 1,000 in-scope objects *after* L1 start |
| L2 | Prepare | Complete packet; human approval required before any execution | Minimum 20 operating days at L2 on the *same object class* |
| L3 | Execute within guardrails | Named low-risk actions inside a limit table | Recertify every 90 days |
| L4 | Managed autonomy | Same actions as L3; human review is exception-based | Recertify every 60 days; sample remains mandatory |

Times are floors, not targets. An agent can remain at L1 indefinitely. That is a successful outcome.

Northline’s Matching Agent (see charter example) commissioned at L1 on 7 April 2026. A promotion case to L2 prepare-for-post was not eligible before 5 May 2026 *and* 1,000 worksheets. L3 was a separate case, US-OH inventory 3-way only, header ≤ $5,000, no flags.

---

## 2. What “earn” means

Promotion is a change-controlled decision. It requires:

1. A signed charter at the current level.
2. An evidence pack that meets the gate table for the *from → to* move.
3. A limit table for the new level (object types, amounts, entities, hours of operation).
4. A named detection path for failure (who notices, how, how fast).
5. A rollback plan that can be executed in one business hour.
6. Sign-off: human owner, control reviewer, AP Process Owner. Controller signs any class-C posting promotion. Treasury signs any payment-*adjacent* L2 (annotation remains the ceiling).
7. An autonomy-register entry with version, date, and evidence URI.

Missing any one item means the case is declined. The agent stays at the current level.

---

## 3. Hard ceilings — not promotable

These do not appear in any L3/L4 limit table:

| Action | Ceiling |
|---|---|
| Payment authorisation, release, bank-file transmission | Human. Agent 12 ≤ L2 annotate |
| Vendor bank / payment-method change | Human dual control |
| New vendor create | Human (pack ≤ L2) |
| DOA, tolerance, tax-position, match-policy edit | Human |
| Close attestation | Human (Agent 13 ≤ L2 prepare) |
| Clear high-value Agent 10 flag | Human |
| External commercial commitment | Human (Agent 08 ≤ L2 draft) |
| Write-off / concession above threshold | Human |
| Scope self-expansion / prompt change that alters behaviour | Change control |

If a vendor roadmap shows “L4 payments,” discard that slide.

---

## 4. Gate tables

Each gate is binary. Partial credit is not a pass.

### 4.1 L0 → L1 (Recommend)

| Gate | Pass rule | Evidence |
|---|---|---|
| G0.1 Coverage | Shadow output exists for ≥ 95% of in-scope objects in the window | Orchestrator coverage report |
| G0.2 Completeness | Required fields present on ≥ 99% of shadow outputs | Schema validation log |
| G0.3 Shadow vs human | On a sample of 100 (or 10% if smaller), material disagreement ≤ 8% *or* disagreements are coded and explained | Dual-review worksheet |
| G0.4 No silent scope | Zero objects processed that were out of charter | Exception list (must be empty) |
| G0.5 Failure handling | Every listed failure mode was either observed and handled, or tabletop-tested | Test record |
| G0.6 Cost meter | Cost ledger is running (even if numbers are small) | Cost extract |
| G0.7 Language | Outputs contain none of the forbidden claims (fraud, guaranteed savings, compliance, accuracy-as-property) | Sample review |
| G0.8 Owner | Human owner and backup confirmed active | RACI + out-of-office test |

Fail any gate: remain L0. Fix. Restart the clock.

### 4.2 L1 → L2 (Prepare)

| Gate | Pass rule | Evidence |
|---|---|---|
| G1.1 Volume | ≥ 1,000 in-scope objects *or* 20 operating days, whichever later | Register |
| G1.2 Accept quality | Accept rate ≥ 80% **and** accept-after-edit is coded; reject reasons classified | Orchestrator |
| G1.3 Material error | Material error rate ≤ 1.0% of accepted items; no cluster ≥ 5 in 5 days | Desk + ERP |
| G1.4 Packet quality | On sample of 50, a second reviewer could execute from the packet without asking the agent owner a question, ≥ 90% | Independent review |
| G1.5 Escalation | Escalations fired per charter; no missed mandatory escalate | Escalation log |
| G1.6 SoD / access | Access review clean; no write privilege beyond charter | IT cert |
| G1.7 Duplicate interaction | 100% of Agent 10 open flags blocked proceed-type recommendations | Join report |
| G1.8 Rollback drill | Pause-to-L0 drill completed in ≤ 60 minutes | Drill record |

### 4.3 L2 → L3 (Execute within guardrails)

Open this case only for classes C, D, or E in the Decision Framework, and only for a **named subclass** (example: “US-OH 3-way inventory, single PO, header ≤ $5,000, no Agent 10 flag, tolerance version AP-MAT-004.3”).

| Gate | Pass rule | Evidence |
|---|---|---|
| G2.1 Stability | G1.2–G1.5 still true for the *subclass* over the last 20 days | Subclass extract |
| G2.2 Limit table | Written, versioned, hashed; includes amount, entity, hours, document type, exclusion list | Controlled doc |
| G2.3 Detection path | Independent report shows each L3 action within T+1 business day | Detection job |
| G2.4 Sample plan | ≥ 10% or 25 items/week (greater) reviewed after the fact for first 90 days | Sample log |
| G2.5 Reversibility | Documented reversal for every L3 action type; tested | Reversal test |
| G2.6 No cash path | Written confirmation that L3 cannot reach payment release | Architecture review |
| G2.7 Controller (class C) or Process Owner (class D/E) sign-off | Signed | Charter vNext |
| G2.8 Kill switch | Named humans who can disable L3; test passed | Drill |

### 4.4 L3 → L4 (Managed autonomy)

L4 is not new work. It is exception-based oversight of the **same** L3 limit table.

| Gate | Pass rule | Evidence |
|---|---|---|
| G3.1 Tenure | ≥ 90 days at L3 on an unchanged limit table | Register |
| G3.2 Material error | ≤ 0.3% of L3 actions; zero uncontained incidents | Incident log |
| G3.3 Sample remaining | Sample may reduce to ≥ 5% or 15 items/week (greater), never zero | Plan |
| G3.4 Exception design | Written list of exceptions that still require human-before (not after) | Limit table vN |
| G3.5 Recertification calendar | 60-day recert booked | Calendar |
| G3.6 Cost | Cost not rising while quality is falling (3-week paired trend) | Cost + quality |
| G3.7 Recert of access and prompts | Prompt/version hash unchanged or change-controlled | Hash log |

If the limit table needs to grow, that is a **new L3 case**, not an L4 privilege.

---

## 5. Demotion and pause (automatic)

Promotion is earned. Demotion is triggered.

| Trigger | Immediate level | Who is notified | Restart |
|---|---|---|---|
| Material error cluster ≥ 5 in 5 days | L0 | Owner, Process Owner, Controller if class C | New L0 clock |
| Any cash movement or bank-file action by an agent | Full stop all agents in that path | Treasury, Controller, Process Owner, IT Security | Incident + recert |
| Agent 10 flag overwritten or auto-cleared | L0 for Agents 03, 10, 12 | Controls Lead | Incident |
| Access found with excess write privilege | Pause | IT Security | Recert access |
| Accept rate < 60% for 2 weeks (L1) | L0 | Owner | Root-cause (Agent 15 may assist) |
| Packet fail rate > 20% (L2) | L1 | Owner | Packet redesign |
| L3 reversal rate > 1% in a week | L2 | Controller | Limit table review |
| Cost > 2× baseline *and* quality falling, 3 weeks | Pause | Process Owner | Cost review — this is a brake, not a savings KPI |
| Owner absent with no backup > 2 business days | Pause new recommendations | Process Owner | Backup named |
| Prompt / model change without change control | L0 | IT + Owner | Treat as new agent |

Automatic triggers fire even if someone is “sure it was a one-off.”

---

## 6. Evidence pack — standard contents

Folder: `/evidence-room/agents/{id}/autonomy/{yyyyMMdd}_{from}_to_{to}/`

| # | File | Notes |
|---|---|---|
| 01 | `charter_current.pdf` | Signed |
| 02 | `charter_proposed.pdf` | Redline + proposed level |
| 03 | `limit_table.md` | Object class, amounts, hours, exclusions |
| 04 | `kpi_extract.csv` | Gates Gx.x columns |
| 05 | `sample_review.xlsx` | Dual review, named reviewers |
| 06 | `failure_mode_test.md` | Tabletop or live |
| 07 | `access_cert.pdf` | IT |
| 08 | `agent10_join.csv` | Flag blocking proof (if proceed-type agent) |
| 09 | `rollback_drill.md` | Time to pause |
| 10 | `detection_path.md` | How wrong execution is seen |
| 11 | `language_review.md` | Forbidden-claim scan |
| 12 | `cost_ledger.csv` | Not a savings case |
| 13 | `decision_memo.md` | Approve / decline / defer, named |
| 14 | `register_entry.json` | Written after approval only |

Northline Matching L1→L2 pack (illustrative) was 41 pages plus extracts. The decline reason on the first attempt (28 April 2026) was G1.4: packets omitted tolerance hash on 8 of 50 samples. They resubmitted 19 May 2026 and passed. That delay is correct behaviour.

---

## 7. Limit table pattern (required from L2 upward)

```
Limit table: AGENT_03 / NL / US-OH / 3-way inventory
Version: 2026-05-19.1
Hash: (sha256)
Autonomy: L2 prepare-for-post  [or L3 post]
In:
  - Company 1000 only
  - Document type: vend invoice PO
  - Item type: inventory / direct material
  - Single PO, single vendor
  - Header amount <= 5000 USD
  - Tolerance policy AP-MAT-004.3 (hash …)
  - Agent 10 flag = none
  - Hours: Mon–Fri 07:00–18:00 ET
  - Currency: USD
Out (never):
  - Payment
  - CA, MX, US-AL
  - Services, freight, non-PO
  - Multi-PO
  - Tax variance
  - Any override
Detection: daily report 'NL.M3.L3.actions' to Match Lead + Controls
Sample: 10% or 25/week
Kill switch: Priya Shah, Elena Ruiz, James Okoye
Rollback: disable job NL.M3.L3; queue falls to L1 recommend
```

If a field is missing, the table is invalid.

---

## 8. Recertification

| Level | Cadence | What is re-tested | Possible outcomes |
|---|---|---|---|
| L1 | Quarterly | Sample disagreement, language, access, owner | Stay / pause |
| L2 | Quarterly | Packet quality, escalations, cost | Stay / L1 |
| L3 | 90 days | Limit table still true; material error; detection path; sample | Stay / L2 / L0 |
| L4 | 60 days | All L3 tests + exception list still complete | Stay / L3 |

Recert is a scheduled gate, not a celebration. Northline books it on the close calendar so it cannot be “forgotten in a busy month.”

---

## 9. Multi-entity and multi-ERP promotion

Promotion does not travel.

| Dimension | Rule |
|---|---|
| Legal entity | New charter, new clock |
| ERP | New access cert, new detection path (D365 ≠ SAP ≠ NetSuite) |
| Document type | New subclass, new L3 case |
| Amount band | Raising $5,000 to $25,000 is a new L3 case |
| Model / prompt / vendor tool | New L0 if behaviour can change |
| SSC location | If owners change, recert L1 |

Northline’s US-OH L3 clean-match, if earned, does not apply to Hamilton ON. GST/HST and a different plant receipt process make it a different agent instance.

---

## 10. Roles in a promotion case

| Role | Duty | May not |
|---|---|---|
| Human owner | Assemble pack, propose limit table | Approve their own promotion alone |
| Control reviewer | Challenge gates, sample | Be the owner |
| AP Process Owner | Approve register entry | Skip Controller on class C |
| Controller | Sign class C posting promotions | Be asked to “just endorse” without the pack |
| Treasury | Sign any payment-adjacent L2 | Approve L3 payments (does not exist) |
| IT / ERP owner | Access and kill switch | Grant write “temporarily” |
| Internal Audit | Observe on request | Operate the agent |
| Agent 15 Root Cause | Explain clusters that block a gate | Lobby for promotion |

---

## 11. Worked progression — Northline Matching Agent

Illustrative. Not a promise that any reader’s agent will move at this pace.

| Date | Event |
|---|---|
| 10 Mar 2026 | L0 shadow on US-OH + US-AL PO invoices. No recommendations in D365. |
| 24 Mar 2026 | G0.1–G0.8 reviewed. Disagreement 6% on 100-sample, mostly UOM. Remain L0; PO Quality (Agent 06) opened at L0 to study UOM. |
| 7 Apr 2026 | L1 charter signed. Specialists see worksheets. |
| 28 Apr 2026 | Premature L2 case. Declined on G1.4 (tolerance hash missing). |
| 19 May 2026 | L2 prepare-for-post passed for US-OH inventory ≤ $5,000. Human still posts. |
| 18 Aug 2026 | Earliest L3 eligibility *if* G2.* pass. Limit table frozen 90 days prior. |
| — | Payment proposal review remains L1. No joint promotion with Agent 12. |

What stayed human the entire time: payment release, vendor bank changes, tolerance edits, Agent 10 flag clearance, CA/MX invoices, anything > $5,000 at L2/L3.

---

## 12. Cost as a brake, not a business case

Cost monitoring exists so an expensive, low-quality agent is paused. It does not exist to justify the programme.

A promotion memo that leads with “this will save X FTEs / Y% ROI” is out of standard. Rewrite: coverage, accept rate, material error, reversibility, detection path, limit table.

If leadership wants a financial discussion, that discussion happens *outside* the autonomy register, without putting a savings number in the agent KPI pack.

---

## 13. Monday checklist — opening a promotion case

1. Confirm the from-level charter is signed and the clock has cleared the floor.  
2. Extract KPIs for the *subclass*, not the whole SSC.  
3. Run the Agent 10 join (if the agent can recommend proceed).  
4. Complete a fresh 50-item (or 100-item at L0→L1) dual review.  
5. Tabletop the kill switch.  
6. Hash the limit table.  
7. Write the decision memo with a decline option filled in (forces honesty).  
8. Book the recert date before you sign.  
9. Update Orchestrator so work objects carry the new level.  
10. Tell specialists what changed in one page. If you cannot explain the new ceiling in one page, the ceiling is wrong.

---

## 14. Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Autonomy progression and evidence gates |
| Review | Quarterly, or after any automatic demotion |
| Related | Charters, Decision Framework, Agent 16 (register of levels) |
