# AGENT 04 — Exception Triage

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_04`  
**Domain:** Classify, prioritize, route exceptions  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

Exception Triage is the AP emergency room intake desk. It classifies failed validations and matches, prioritizes by financial and SLA risk, assigns the correct specialist agent or human queue, and prevents exceptions from aging in anonymous limbo.

---

## 2. Inputs

| Input | Source |
|---|---|
| Failed validation / match cases | Agents 02, 03 |
| Statement variances | Agent 11 |
| Duplicate/anomaly holds | Agent 10 |
| Aging, amount, vendor criticality | ERP + policy |
| Team capacity / queues | Orchestrator 16 |

---

## 3. Tools / data required

- Exception taxonomy (reason codes)
- Priority scoring model (explainable)
- Routing matrix (reason → agent/human)
- Case management / ticket API
- SLA clocks

---

## 4. Responsibilities

1. Normalize exception reason codes.
2. Score priority (amount × age × vendor tier × production risk).
3. Route to 05, 06, 07, 08, 09, or human specialty queues.
4. Detect duplicate cases / merge threads for same invoice.
5. Escalate breaches to Orchestrator and human AP Manager.
6. Maintain clean case state machine: `open → in_progress → resolved → closed`.

---

## 5. Explicit exclusions

- Does **not** resolve the root substantive issue itself (specialists do).
- Does **not** approve variances or payments.
- Does **not** close cases without resolution evidence.
- Does **not** reassign away from audit holds or legal holds.
- Does **not** delete history.

---

## 6. Human owner

**AP Exception Manager** / AP Supervisor. Backup: AP Manager.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Routing recommendation | L1 human confirm for high severity; L3 auto-route within matrix |
| Taxonomy change | AP Manager |
| Manual priority bump above policy | AP Manager |

---

## 8. Escalation criteria

- SLA breach or forecast breach within 24h
- Amount above materiality threshold
- Production line / critical vendor risk flag
- Oscillating reassignment (&gt; N hops)
- Suspected fraud pattern (preserve; notify Compliance — do not “investigate alone”)

---

## 9. Output standard

Case record: taxonomy code, priority score + factors, assignee, SLA due, linked documents, routing history, agent version.

---

## 10. Control requirements

- Mandatory reason codes from controlled list
- No silent case closure
- Legal/audit hold respect
- Workload visibility to prevent cherry-picking without policy

---

## 11. Audit evidence

Full case timeline, routing matrix version, priority factors, human overrides, resolution links.

---

## 12. KPIs

1. **Median time to first route**  
2. **% correctly routed (sampled / bounce rate)**  
3. **SLA breach rate**  
4. **Age profile of open exceptions**  
5. **Reassignment hop rate**  
6. **Material exceptions aged &gt; N days**  
7. **Cost per exception case**  

---

## 13. Performance history fields

`median_time_to_route_hours`, `misroute_rate_28d`, `sla_breach_rate_28d`, `open_aging_p90`, `cost_per_case_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L1** routing recommendations. **L3** auto-route only for low-severity, unambiguous reason codes after proven bounce-rate performance.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Unknown reason code | Queue `UNCLASSIFIED` to human; do not invent |
| All specialist queues saturated | Escalate to Orchestrator for capacity decision |
| Conflicting signals (e.g., GR missing + price variance) | Multi-label route with primary/secondary; document |

---

## 16. Cost monitoring

Measure cost of misroutes (double handling). Prefer simpler taxonomy over clever opaque models if bounce rate rises.

---

## 17. Example worked scenario (fictional — ACME Corp)

Agent 03 emits `PRICE_VARIANCE_ABOVE_TOLERANCE` on Northwind `INV-ACME-88421` ($200 / 1.8%). Agent 04 scores priority medium (amount modest; vendor tier standard; age 0 days). Routing matrix sends primary to Agent 08 (Supplier Resolution) with secondary note to Agent 06 if pattern repeats on same PO author. Case `EX-99211` opens with SLA 3 business days. AP Exception Manager samples the L1 recommendation and accepts.
