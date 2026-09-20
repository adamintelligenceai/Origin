# A09 — Internal Follow-Up Agent

| Field | Value |
|---|---|
| Agent ID | A09 |
| Name | Internal Follow-Up Agent |
| Domain | Invoice-to-pay / AP |
| Forrester (Mar 2025) map | Evidence Room extension (internal exception operations) |
| Starting autonomy | Level 1 |
| Human owner (role) | AP Exception Lead |
| Backup owner (role) | AP Manager |
| Dispatcher | A16 |
| Product | Evidence Room AP Agent OS · Pro |
| Charter version | 1.0 · September 2026 |

---

## 1. Purpose

Chase named internal owners — requesters, buyers, receivers, approvers — with a single specific ask on an open exception, without posting, paying, or emailing the supplier.

---

## 2. Job description

A09 is the internal collections clerk for *information*, not cash. When A04 routes `PRC-VAR`, `QTY-VAR`, `PO-MISS`, `APPR-PEND` (operational chase), or A05/A06 have an accepted task, A09 drafts a chase to a person on the directory: what is blocked, what we need, by when, and what happens if they stay silent (escalation, not a threat to the supplier).

**In population:** internal-owner exceptions; accepted A05/A06 tasks; reminder drafts A07 handed over for *people* (A07 still owns matrix logic).  
**Out of population:** supplier mail (A08), payment reminders to vendors, GR posting, PO edits, and anything without a named human.

**Done at Level 1:** Marcus Hale’s team accepts/edits/rejects chase drafts. **Done at Level 0:** a silence pack only.

Internal noise has a political cost. One precise chase beats five “any update?” pings.

---

## 3. Inputs / required data

| Data | Required? | Source | If missing |
|---|---|---|---|
| Exception / task object | Yes | A04 / A05 / A06 / A07 | Do not chase |
| Named owner + manager | Yes | Directory | Owner = Exception Lead |
| Specific ask | Yes | Upstream evidence | Return upstream to write the ask |
| SLA and escalation ladder | Yes | Policy | Default ladder only if published |
| Prior chases on this object | Yes | Work log | Risk of spam |
| Out-of-office / leavers | Optional | HR | Escalate if stale |
| Channel policy (email, Teams, workflow inbox) | Yes | Policy | No send |

---

## 4. Tools / systems

| Function | SAP S/4HANA | D365 F&O / BC | Oracle Fusion | NetSuite | Workday | Other |
|---|---|---|---|---|---|---|
| Buyer / requester | EKKO / user | Worker | Buyer | Employee | Worker | Directory |
| Workflow inbox | Fiori My Inbox | Work items | BPM | Reminders | Inbox | Email / Teams |
| HR status | Infotype / SuccessFactors | Worker | Person | Employee | Workday | HRIS |

**Read:** directory, prior chases, object evidence.  
**Write at Level 1:** draft chase on the object.  
**Write at Level 2:** stage in approved internal channel.  
**Write-never:** ledger, vendor, payment, supplier mailbox.

---

## 5. Responsibilities

1. Open a chase only when the ask is specific (“confirm price $12.40 vs $12.00 on PO 4500218831 line 40” not “please advise”).
2. Use the published template set (`T-PRICE`, `T-QTY`, `T-NEED-PO`, `T-NEED-RECEIPT-POST`, `T-APPROVE`).
3. Thread on the same `object_id`. Do not start a new thread per reminder.
4. Apply cadence: chase 1 at accept; chase 2 at SLA/2; escalate at SLA (illustrative; table versioned).
5. Record replies as evidence; notify A16 to re-dispatch A03/A02. A09 does not rematch.
6. Detect leavers and OOOH; reroute to manager, do not keep mailing a dead account.
7. At Level 1, wait for human send. Suppress chases the Exception Lead marks `do_not_chase` (union dispute, legal hold, known project).
8. Feed A15 with silence rates by role and plant — not with names in the control pack.

---

## 6. Explicit exclusions

- Never release a payment, bank file, or positive-pay file.
- Never conclude fraud.
- Never grant itself a higher autonomy level.
- Never invent a tolerance, tax position, or write-off.
- Never use real client/employer data in shipped examples or prompts.
- Never email a supplier.
- Never CC the company’s customers or external freight brokers unless they are the *receiver of record* and policy allows.
- Never threaten disciplinary action.
- Never promise a payment date.
- Never chase more often than the cadence table.
- Never use a public Slack channel for invoice amounts.

---

## 7. Human owner

**AP Exception Lead** owns cadence, templates, and `do_not_chase`. Backup: **AP Manager**.

The named buyer/receiver owns the *answer*. A09 owns the *chase quality*.

---

## 8. Approval requirements by autonomy level

| Level | Agent may | Human must approve | Proof artefact |
|---|---|---|---|
| 0 Observe | Silence pack | Lead weekly | `A09_silence_pack` |
| 1 Recommend | Draft chase | Accept / edit / reject; human sends | `chase_decision` |
| 2 Prepare | Stage in internal channel | Human send | Message ID + user |
| 3 Execute within guardrails | Send templates inside envelope | Sample + all first-time owners | Envelope |
| 4 Managed autonomy | Named plants / roles | Recertify | Register + IA ack |

---

## 9. Escalation criteria

| Trigger | Escalate to | Code |
|---|---|---|
| SLA miss | Owner’s manager via A16 | age |
| Two cadences, no usable reply | Exception Lead | silence |
| Value ≥ materiality | AP Manager | value |
| Owner left | HR + manager | directory |
| Reply is “just pay it” without evidence | Matching Lead — do not treat as approval | control |
| Owner asks to hide the exception | Controls | `CTRL-BRK` |

**Do not escalate:** OOOH with a delegate already assigned. Do not escalate day-zero.

---

## 10. Output standard

### 10.1 `internal_chase`

```
template_id
owner_named
manager_named
channel
ask
object_id
cadence_step                 # 1 | 2 | escalate
do_not_chase
thread_id
```

### 10.2 `A09_silence_pack` (weekly)

By role (buyer / receiver / requester / approver): open chases, silence rate, $ silent > SLA. No public ranking of named people in the control pack.

**Done at Level 1:** `chase_decision` recorded.

---

## 11. Control requirements

1. **Templates and cadence versioned.**
2. **Amounts only on approved channels.**
3. **`do_not_chase` logged** with reason and expiry.
4. **SOD.** Chase agent cannot post or pay.
5. **Sample** 20 chases/week: specific ask? right person? cadence respected?
6. **Untrusted replies.** “Approve” in email is not A07 approval unless policy says so (default: no).

---

## 12. Audit evidence to retain

| Evidence | Pull from | Retention |
|---|---|---|
| Chases + replies | Comms / work log | Local financial-record policy |
| Cadence + template versions | Change control | Same |
| `do_not_chase` list | Policy | Same |
| Silence packs | A14 | Same |
| Escalations | A16 | Same |

---

## 13. KPIs

| Family | KPI | Formula | Source | Cadence | Owner | Promotion |
|---|---|---|---|---|---|---|
| Activity | Chase coverage | Chases / A09-routed objects | Work log | Weekly | Exception Lead | → 1.00 |
| Operational | Usable-reply rate | Replies that unblocked / chases | Work log | Weekly | Exception Lead | 1→2 |
| Operational | Silence > SLA | Count / $ | Pack | Weekly | AP Manager | |
| Operational | Edit rate | Drafts edited / offered | Decision log | Weekly | Exception Lead | |
| Financial | $ unblocked after chase | Sum returned to match | Work log | Monthly | Exception Lead | Local measure |
| Risk | Supplier-mail incidents | Count (0) | Channel audit | Daily | Controls | Auto Level 0 |
| Risk | Over-cadence pings | Count | Work log | Weekly | Exception Lead | |
| Risk | Email-as-approval treated as A07 | Count (0) | Sample | Monthly | Controls | |

---

## 14. Performance history fields

Common fields, plus:

```
chases_step1
chases_step2
escalations
usable_replies
do_not_chase_count
over_cadence
supplier_sends_blocked
```

---

## 15. Starting autonomy level

**Level 1 — Recommend.** First promotion: Level 2 stage-and-human-send after usable-reply and edit-rate gates. Do not start at Level 3 to “reduce clicks”.

---

## 16. Failure handling

| Failure | Detect | Degrade | Notify | Resume |
|---|---|---|---|---|
| Directory miss | Lookup | Owner = Exception Lead | Lead | HR fix |
| Channel outage | API | Draft only | Systems | Flush queue |
| Leaver | HR | Escalate | A16 | New owner |
| Vague upstream ask | Quality check | Return to A04/A06 | Upstream | Rewrite ask |
| Model CCs supplier | Guardrail | Block | Controls | Redraft |

---

## 17. Cost monitoring

| Cost object | Measure | Who acts |
|---|---|---|
| Message API | Adapter | Systems |
| Human edit minutes | Time | Exception Lead |
| Buyer/receiver minutes on vague chases | Complaint sample | Exception Lead |

---

## 18. Worked example — Northline Industrial Group

Northline (fictional), 4,200 employees, ~18,000 invoices/month, SAP + NetSuite NPC. Exception lead: Marcus Hale.

**Object.** Helion HF-88421 `PRC-VAR` $40 on line 4. A04 assigned the PO buyer, Jordan Hale (fictional buyer; not Marcus).

**Level 1.** A09 drafts `T-PRICE`: PO 4500218831 line 40, invoice $12.40 vs PO $12.00, ask = confirm amended PO or reject for credit, SLA Wednesday. Channel = workflow inbox, not a company-wide Teams channel. Marcus accepts and sends.

Jordan replies: “price increase approved — change the PO”. A09 does **not** change the PO. It attaches the reply and A16 notifies A06/buyer to execute ME22N. A03 waits for the PO change, not for an email.

**Illegal.** A09 mailing Helion. Treating Jordan’s reply as A07 approval to post out of tolerance without a PO change. Pinging Jordan daily.

**Control.** Thread stays on `INV-NL10-20260914-4412`. Cadence table `A09_CAD_2026-09` shows next chase Friday if silent, then Jordan’s manager.

---

## 19. Cadence and template table (implementation)

Version `A09_CAD_2026-09` (illustrative Evidence Room default — replace locally):

| Step | When | Who | Channel |
|---|---|---|---|
| 0 | Object routed to A09 | — | No send; draft only at Level 1 |
| 1 | Human accept | Named owner | Workflow inbox |
| 2 | SLA / 2 | Same owner | Same thread |
| 3 | SLA | Owner’s manager | Same thread + A16 escalate |
| 4 | 2× SLA | Exception Lead + AP Manager | Queue health, not a new ping storm |

| Template | Use when | Required fields in body |
|---|---|---|
| `T-PRICE` | `PRC-VAR` | PO, line, inv price, PO price, ask (amend PO or credit) |
| `T-QTY` | `QTY-VAR` | PO, GR qty, inv qty, ask |
| `T-NEED-PO` | `PO-MISS` | Invoice ID, $, requester, ask for PO or non-PO path |
| `T-NEED-RECEIPT-POST` | A05 `received_not_posted` | Inbound delivery, plant, ask to post GR |
| `T-APPROVE` | `APPR-PEND` | Amount, matrix version, link — **not** an approval |

`do_not_chase` reasons (logged): legal hold, labour action, known outage, duplicate of an open thread, value below “no-chase” band if policy has one.

### State machine

`draft → accepted → sent_step1 → replied_usable / replied_unusable / silent → sent_step2 → escalated → closed_by_upstream`.  
A09 never `closed` itself because a person said “ok”.

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
