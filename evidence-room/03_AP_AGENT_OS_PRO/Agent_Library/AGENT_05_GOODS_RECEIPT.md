# AGENT 05 — Goods Receipt

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_05`  
**Domain:** Receipt detection, prompting, evidence  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Goods Receipt Agent detects invoices blocked by missing, partial, or mismatched receipts; identifies the likely receiver; prepares receipt prompts and evidence packs; and tracks closure until match can resume. It accelerates the “where is the GR?” problem without inventing warehouse truth.

---

## 2. Inputs

| Input | Source |
|---|---|
| Exception cases `GR_MISSING` / `QTY_VARIANCE` | Agent 04 / 03 |
| PO and open inbound deliveries | ERP / WMS |
| Receiver / plant / buyer contacts | Master data / HR directory |
| Receipt policy | Who may confirm; service entry rules |

---

## 3. Tools / data required

- PO open-quantity views
- WMS / inbound delivery read models
- Notification / tasking to receivers
- Case updates API
- Optional service-entry sheet workflows

---

## 4. Responsibilities

1. Confirm whether GR is truly missing vs. mis-associated.
2. Identify responsible receiver/buyer.
3. Prepare prompt with PO, expected qty, invoice pressure date.
4. Track responses and overdue prompts.
5. When GR appears, notify Matching (03) to retry.
6. Escalate chronic non-response to Internal Follow-Up (09) / Orchestrator.

---

## 5. Explicit exclusions

- Does **not** post goods receipts at L0–L2 (L3 only if explicitly fenced and warehouse-approved — rare).
- Does **not** override inventory counts.
- Does **not** accept “received” via informal chat without required evidence fields.
- Does **not** short-close PO quantities for AP convenience.

---

## 6. Human owner

**AP-GR Coordinator** jointly with **Warehouse Ops Lead**. Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Send receiver prompt | L2 prepare + human send, or L3 within plant allow-list |
| Post GR | Warehouse-authorized human/system of record |
| Quantity dispute resolution | Procurement + Warehouse per policy |

---

## 8. Escalation criteria

- No response within SLA
- Partial receipt with invoice for full qty
- Drop-ship ambiguity
- Capex / project PO requiring additional acceptance
- Safety stock / production risk flags

---

## 9. Output standard

GR case update: missing qty analysis, contacted parties, prompt artifacts, response log, link to GR document when created, next hop.

---

## 10. Control requirements

- Receipt posting authority unchanged by agent
- Evidence of physical/service acceptance retained
- No AP-only GR posting culture (control anti-pattern)

---

## 11. Audit evidence

Prompts sent, responses, GR document IDs, user IDs of posters, timestamps, case linkage.

---

## 12. KPIs

1. **% GR-missing exceptions cleared within SLA**  
2. **Median hours invoice blocked on GR**  
3. **Prompt response rate**  
4. **False “GR missing” rate** (already existed / mis-link)  
5. **Repeat offenders by plant/receiver**  
6. **Cost per GR exception**  

---

## 13. Performance history fields

`gr_clear_sla_rate_28d`, `median_block_hours`, `false_missing_rate_90d`, `prompt_response_rate`, `cost_per_gr_case_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1** recommendations on who to contact and why. **L2** draft prompts. Posting remains human/WMS.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Receiver directory stale | Escalate to master-data owner; try buyer |
| WMS outage | Pause prompts that claim stock truth; wait |
| Conflicting qty claims | Open dispute path; do not pick a side silently |

---

## 16. Cost monitoring

Track warehouse time consumed by low-value prompts; batch nudges where policy allows.

---

## 17. Example worked scenario (fictional — ACME Corp)

A packaging invoice matches PO but GR is missing for line 20 (500 cartons). Agent 05 finds inbound delivery open at Plant 1200 against receiver Jordan Lee. It prepares a L2 prompt: PO, ASN, invoice due in 6 days, expected qty. Jordan posts GR `5009012` in WMS. Agent 05 updates case and signals Agent 03 to rematch. Agent 05 never posted the GR itself.
