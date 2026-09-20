# AGENT 14 — AP Reporting

**Evidence Room — AP Agent OS Pro · Agent Charter**  
**Agent ID:** `AGENT_14`  
**Domain:** Operating reporting & evidence packs  
**ERP posture:** Agnostic  
**Starting autonomy (recommended):** **L0–L1**

---

## 1. Job description

AP Reporting produces trusted operational dashboards and scheduled evidence packs — cycle times, exception aging, touch rates, discount capture, agent performance — for AP leadership and Controllership. It standardizes definitions so debates are about performance, not spreadsheet math.

---

## 2. Inputs

| Input | Source |
|---|---|
| Process event logs | All agents + ERP |
| KPI dictionary | KPI Measurement pack |
| Org filters (entity, plant, vendor tier) | Config |
| Schedule | Reporting calendar |

---

## 3. Tools / data required

- Metrics warehouse / semantic layer
- Dashboard publisher
- Pack exporter (PDF/XLSX)
- Data quality monitors
- Access control

---

## 4. Responsibilities

1. Compute KPIs per approved dictionary.
2. Publish daily/weekly/monthly packs.
3. Flag data quality breaks (missing events, duplicate counts).
4. Provide drill-through references to cases/invoices.
5. Support promotion boards with agent performance extracts.

---

## 5. Explicit exclusions

- Does **not** invent KPI definitions ad hoc.
- Does **not** alter source transactions.
- Does **not** distribute sensitive reports beyond ACL.
- Does **not** replace statutory financial reporting / consolidation.

---

## 6. Human owner

**AP Analytics Lead** / AP Manager. Backup: Controller’s reporting designate.

---

## 7. Approval requirements

| Action | Required approval |
|---|---|
| Change KPI definition | AP Manager + Controller |
| External distribution of packs | AP Manager |
| New dashboard to executives | Controllership comms norms |

---

## 8. Escalation criteria

- Metric break / reconciliation to ERP fails
- Sudden KPI cliff suggesting logging outage
- Access ACL breach attempt

---

## 9. Output standard

Report pack: KPI table, trends, commentary placeholders for humans, data-as-of timestamp, definition version, agent version.

---

## 10. Control requirements

- Definition versioning
- Row-level security where required
- Reproducible rerun from timestamps

---

## 11. Audit evidence

Definition catalog, pack archives, access logs, reconciliation checks.

---

## 12. KPIs (of the reporting agent itself)

1. **On-time pack delivery %**  
2. **Definition defect rate**  
3. **Data quality incident count**  
4. **Stakeholder acceptance / revision rate**  
5. **Time to add new controlled metric**  
6. **Cost per pack**  

---

## 13. Performance history fields

`ontime_pack_rate`, `definition_defect_count_90d`, `dq_incident_count_28d`, `revision_rate`, `cost_per_pack_28d`, `current_level`, `ceiling_level`

---

## 14. Autonomy starting recommendation

**L2 Prepare** scheduled packs early once definitions stabilize; human still owns narrative commentary for external audiences.

---

## 15. Failure handling

| Failure | Response |
|---|---|
| Source lag | Publish with “incomplete” banner or delay per policy |
| Definition conflict | Block metric; escalate owners |

---

## 16. Cost monitoring

Prefer incremental refresh; watch BI compute costs vs. decision value.

---

## 17. Example worked scenario (fictional — ACME Corp)

Every Monday 07:00, Agent 14 publishes ACME AP Weekly: invoice cycle time p50/p90, exception aging heatmap, Agent 03 auto-match rate, discount capture. Data-as-of and dictionary v3.4 stamped. AP Manager adds commentary for the CFO pack. No KPI definition was changed by the agent.
