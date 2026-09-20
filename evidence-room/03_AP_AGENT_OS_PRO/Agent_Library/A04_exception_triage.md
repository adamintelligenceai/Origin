# A04 — Exception Triage Agent

| Field | Value |
|---|---|
| Agent ID | A04 |
| Name | Exception Triage Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Evidence Room extension (exception operations; not a Forrester-named cluster) |
| Starting autonomy | Level 1 |
| Human owner (role) | AP Exception Lead |
| Backup owner (role) | AP Manager |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Classify every failed validation or match into a single primary reason code, assign the next agent and human owner, set the SLA, and age the item — without settling the dispute, posting, or paying.

---

## 2. Job description

A04 is the control tower for work that did not pass A02 or A03 (and for holds from A10). It does not fix PO prices, post GRs, or write to suppliers. It makes sure the *right* fixer sees the item once, with evidence, and that the item does not die in a shared inbox.

**In population:** objects with `exception` or `fail` from A02, A03, A10 holds, and A07 SLA breaches re-entering triage.  
**Out of population:** match_ok items, payment-proposal lines (A12 uses `PAY-HOLD`), close tasks (A13), and root-cause memos (A15).

**Done at Level 1:** a triage recommendation (code, owner, next agent, SLA) that Marcus Hale’s team accepts or edits. **Done at Level 0:** an aging pack only.

Ardent Partners (2024) Best-in-Class exception rate is 9%, 59% lower than peers. A04 does not create that outcome. It makes the existing exception *inventory* visible and routed. A15 exists because triage without cause analysis is just a faster pile.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Exception object + upstream evidence | Yes | A02 / A03 / A10 | Return upstream |
| Shared reason taxonomy | Yes | Overview §4.5 | Hard stop — do not invent codes |
| Routing table (code → agent → role) | Yes | Policy store | Hard stop |
| SLA table by code and value band | Yes | Policy store | Default SLA only if published as default |
| Approval / buyer / receiver directories | Yes | HR / ERP | `human_owner` = Exception Lead |
| Vendor preferred contact | Optional | A08 master | A08 will resolve |
| Open chases on same PO / vendor | Optional | A05 / A09 | Attach as related; do not auto-close |
| Value, currency, due date | Yes | Work object | Value-band SLA cannot apply |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Invoice hold | Parked / blocked MIRO | Hold | Hold | Approval / hold | Hold | Workflow |
| User / buyer | HR org / EKKO requester | Worker | Buyer | Employee | Worker | Directory |
| Ticketing | Optional | Optional | Optional | Optional | Optional | Jira / ServiceNow — satellite, not book of record |
| Aging | Work log | Work log | Work log | Work log | Work log | A14 |

**Read:** ERP holds, directories, related objects.  
**Write at Level 1:** triage fields on the work object.  
**Write at Level 2:** ERP hold text / workflow assignment draft.  
**Write-never:** post, pay, vendor master, GR, PO change, ticket *closure* without the owning agent.

The work object is the book of record for exceptions. A satellite ticket is a mirror. If they disagree, the work object wins.

---

## 5. Responsibilities

1. Accept new exceptions from A16 within the intake SLA (illustrative: 1 operating hour).
2. Choose **one primary** reason code from the shared taxonomy. Secondary codes may attach; they do not each spawn a ticket.
3. Apply the routing table: next agent, human role, SLA clock start.
4. Link related open objects (same PO, same GR chase, same vendor master case) to prevent duplicate chases.
5. Age: `new` → `in_review` → `waiting_external` → `ready_to_post` / `rejected` / `escalated`.
6. Re-triage only when new evidence arrives (GR posted, supplier credit, buyer comment). Do not re-triage on a timer alone.
7. Recommend escalation when value / age / silence gates trip; A16 executes escalation.
8. Feed A15 weekly with closed-code distributions — not with narrative essays.
9. At Level 1, wait for human accept/edit of the primary code and owner.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never invent a reason code outside the taxonomy.
- Never assign a buyer “because the model is confident” if the PO has a named requester — use the directory.
- Never close an exception because a satellite ticket closed.
- Never send supplier email (A08) or internal chase (A09) itself at Level 0–1.
- Never change the SLA table for one vendor as a courtesy.
- Never split one invoice into five exceptions to improve “items closed”.

---

## 7. Human owner

**AP Exception Lead** owns the routing table, SLA table, and queue hygiene. Backup: **AP Manager**.

The Exception Lead does not own GR posting, PO quality, or cash. Those owners remain A05, A06, and A12.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Aging pack | Lead confirms inventory vs ERP holds | `A04_aging_pack` |
| 1 Recommend | Propose code, owner, SLA, next agent | Accept / edit / reject | `triage_decision` |
| 2 Prepare | Draft workflow assignment / hold text | Human sends / saves | ERP change user |
| 3 Execute within guardrails | Auto-route inside envelope (known codes, below value) | Sample + unknown codes | Envelope + sample |
| 4 Managed autonomy | Auto-route named population | Recertify; A16 still escalates | Register + IA ack |

Level 3 auto-route is not auto-resolve.

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| SLA breach | A16 → manager of current human owner | age |
| Value ≥ materiality (Northline illustrative $25,000) at open | Exception Lead + AP Manager same day | value |
| `CTRL-BRK` or `ANOM-SUS` | Controls + A10 | risk |
| Same PO > N open exceptions (illustrative: 5) | A06 + A15 | `PO-QLTY` |
| Waiting-external > 2× SLA | A09 or A08 as applicable | silence |
| Taxonomy miss (no code fits) | AP Manager (table change) | process |

**Do not escalate:** first-day `GR-MISS` still inside the GR wait policy. Do not escalate every `PRC-VAR` under the buyer’s ordinary authority.

---

## 10. Output standard

### 10.1 `triage_result`

```
primary_reason_code
secondary_reason_codes[]
next_agent                 # A05 | A06 | A07 | A08 | A09 | A10 | A16
human_owner_role
human_owner_named
sla_due
related_object_ids[]
retriage_of                # object version
priority                   # from value band + due date + code
```

**Done (Level 1):** `triage_decision` recorded; A16 dispatches `next_agent`.

### 10.2 `A04_aging_pack` (daily)

Buckets: 0–2, 3–5, 6–10, 11+ operating days (illustrative buckets). By code, owner, company code, $ open. Inventory must reconcile to ERP hold count ± explained deltas.

### 10.3 Weekly feed to A15

Closed exceptions: code, vendor, PO type, days open, closer, rework flag.

---

## 11. Control requirements

1. **Taxonomy lock.** New codes go through AP Manager + A16.
2. **One primary code.** Prevents vanity closure metrics.
3. **Work object is system of record.** Ticket mirrors cannot close it.
4. **SLA table versioned.** Courtesy extensions logged as policy overrides, not hidden.
5. **SOD.** Exception Lead is not payment releaser.
6. **Completeness.** Every A02/A03 fail must appear within the intake SLA. Missing = A16 incident.
7. **Sample.** 25 routings/week vs human second-code until promotion.

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Triage results + decisions | Work log | Local financial-record policy |
| Routing and SLA table versions | Change control | Same |
| Aging packs vs ERP hold recon | A14 | Same |
| Escalation events | A16 | Same |
| Satellite ticket IDs (if any) | Object | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Triage coverage | Triaged / new exceptions | Work log | Daily | Exception Lead | → 1.00 |
| Operational | Re-route rate | Owner changed after accept / items | Work log | Weekly | Exception Lead | 1→2 |
| Operational | Aging p90 | Days open | Aging pack | Daily | A16 | |
| Operational | SLA hit rate | Closed or waiting_external before SLA / items | Work log | Weekly | Exception Lead | |
| Financial | $ aged > 10 days | Sum | Aging pack | Daily | AP Manager | |
| Financial | Duplicate-chase $ | Related objects that chased twice | Link log | Monthly | Exception Lead | |
| Risk | Code invent attempts | Rejected unknown codes | A16 | Weekly | Controls | |
| Risk | Closed-in-ticket-only | Mirrors closed, object open (target 0 after 48h) | Recon | Daily | Controls | |
| Risk | Override-for-error | Wrong primary code / decisions | Decision log | Weekly | Controls | Band |

No “tickets closed” vanity metric without $ and age.

---

## 14. Performance history fields

Common fields, plus:

```
primary_code_distribution
reroute_count
sla_hit
sla_miss
aged_gt_10_days_amount
related_links
taxonomy_miss
erp_hold_recon_delta
```

---

## 15. Starting autonomy level

**Level 1 — Recommend.** First promotion: Level 2 (draft workflow assignment) after re-route rate and coverage gates. Auto-resolve is never in the envelope.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Taxonomy unpublished | Lookup | Hard stop | A16 | Publish |
| Directory miss | No buyer | Owner = Exception Lead | Lead | Directory fix |
| Upstream evidence missing | Empty refs | Return upstream | A02/A03 | Re-open |
| Double dispatch | Two next_agents | A16 lock | A16 | Single route |
| Ticket mirror outage | API | Continue on work object | Systems | Repair mirror later |
| Model invents code `PRICE_ISSUE` | Guardrail | Reject; force taxonomy | Controls | Retrain/rule |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Classification API per item | Adapter | Systems |
| Human triage minutes | Time | Exception Lead |
| Mis-route minutes on receiving/procurement | Complaints confirmed | A05/A06 owners |
| Satellite ticket licence vs object-only | A14 | AP Manager |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. Exception lead: Marcus Hale.

**Object.** Helion HF-88421 line 4 `PRC-VAR` $40 / 3.3% outside `NL-TOL-2026-04`.

**Level 1.** A04 reads A03 evidence, sets primary `PRC-VAR`, secondary none, `next_agent = A09`, owner = PO buyer (Greta Holm’s category buyer, not Marcus), SLA 3 operating days per the value band < $500 (illustrative). Links no open GR chase. Marcus accepts.

A16 dispatches A09. A04 does not email Helion and does not change the PO.

**Noise variant.** A processor wants a new code `HELION_PRICE`. A04 refuses. If Helion is a repeating price-defect vendor, A15 will say so from `PRC-VAR` volume — that is the point of a locked taxonomy.

**Illegal.** Closing the exception because a ServiceNow ticket auto-closed. Writing off $40. Sending the supplier a debit note.

**Control.** Daily aging pack shows HF-88421 in 0–2 day bucket, $14,260 still parked. ERP hold count for NL10 reconciles.

---

## Charter conformance

- [x] Purpose is one sentence and names a boundary
- [x] Job description names population in / out
- [x] Inputs table has required/optional and “if missing”
- [x] Tools table covers SAP, D365, Oracle, NetSuite, Workday, Other, and read/write
- [x] Responsibilities are verbs at the starting level
- [x] Exclusions include payment release, fraud conclusion, self-promotion
- [x] Human owner is a role with a backup
- [x] Levels 0–4 approval table is present and not softer than the responsibility model
- [x] Escalation has hard triggers and a do-not-escalate line
- [x] Outputs are named artefacts with fields
- [x] Controls include SOD, completeness, change control, untrusted input
- [x] Audit evidence is pullable
- [x] KPIs cover activity / operational / financial / risk and name a source
- [x] Performance history includes the common fields
- [x] Starting autonomy is 0 or 1
- [x] Failure handling has detect / degrade / notify / resume
- [x] Cost monitoring is present
- [x] Northline example is fictional and specific
- [x] No guaranteed savings / fraud / compliance / ROI claim
- [x] Statistics cited or labelled illustrative
