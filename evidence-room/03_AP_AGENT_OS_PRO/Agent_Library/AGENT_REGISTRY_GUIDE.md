# Agent Registry Guide

**Evidence Room — AP Agent OS Pro**  
**Document type:** Operating procedure  
**Artifact:** Excel (or equivalent) Agent Registry — system of record for autonomy and ownership  
**Related:** `RESPONSIBILITY_MODEL.md`, `00_AGENT_STACK_OVERVIEW.md`, Agent 16 charter

---

## 1. Purpose

The Agent Registry is the **authoritative list** of every AP agent instance in production or pilot: who owns it, what it may do, how it is performing, and whether it is frozen. Orchestrator (Agent 16) and human managers must treat the registry as source of truth for responsibility levels.

If it is not in the registry, it is not authorized to run.

---

## 2. Recommended workbook structure

| Sheet | Purpose |
|---|---|
| `Agents` | One row per agent instance (the master) |
| `Level_History` | Append-only promotions/demotions |
| `Incidents` | Control incidents linked to agents |
| `Sample_QA` | Periodic accuracy samples |
| `Cost` | Monthly cost and volume |
| `Board_Log` | Autonomy board decisions |
| `Lookup_Levels` | Level definitions 0–4 (static) |
| `Lookup_Status` | Active / Pilot / Frozen / Retired |
| `ReadMe` | Version, owners, change rules |

**Naming:** `AP_Agent_Registry_ACME_vX.Y.xlsx` (entity + version).

---

## 3. `Agents` sheet — column dictionary

### Identity

| Column | Type | Rules |
|---|---|---|
| `agent_id` | Text | Stable key: `AGENT_01` … `AGENT_16` (+ suffix if multi-instance, e.g. `AGENT_01_US`) |
| `agent_name` | Text | Charter name |
| `instance_scope` | Text | Entity / region / shared-service node |
| `charter_doc` | Text/URL | Path to markdown charter |
| `erp_connector` | Text | Connector ID — still ERP-agnostic logic |
| `status` | Enum | Active / Pilot / Frozen / Retired |
| `human_owner` | Text | Named person (not a team alias alone) |
| `backup_owner` | Text | Named backup |
| `go_live_date` | Date | First production/pilot traffic |

### Responsibility

| Column | Type | Rules |
|---|---|---|
| `current_level` | 0–4 | Must be ≤ ceiling |
| `ceiling_level` | 0–4 | Approved max |
| `level_effective_date` | Date | When current_level began |
| `promotion_board_ref` | Text | Link/ID to Board_Log |
| `kill_switch_tested_date` | Date | Required for L3+ |
| `autonomy_charter_ref` | Text | **Required if level = 4** |

### Performance (rolling)

| Column | Type | Notes |
|---|---|---|
| `acceptance_rate_28d` | % | Recommendations/drafts accepted |
| `critical_miss_count_90d` | Integer | |
| `incident_count_open` | Integer | From Incidents |
| `last_sample_qa_score` | % | |
| `last_sample_qa_date` | Date | |
| `sla_breach_rate_28d` | % | Where applicable |
| `volume_28d` | Integer | Txns / cases |

### Cost

| Column | Type | Notes |
|---|---|---|
| `cost_per_txn_28d` | Currency | Fully loaded if possible |
| `cost_28d_total` | Currency | |
| `budget_band_status` | Enum | In / Watch / Over |

### Meta

| Column | Type | Notes |
|---|---|---|
| `model_or_rules_version` | Text | Pin versions |
| `last_registry_update` | Datetime | |
| `updated_by` | Text | |
| `notes` | Text | Short only |

---

## 4. Maintaining the registry — RACI

| Activity | AP Manager | Agent owner | Controller | Audit | Agent 16 |
|---|---|---|---|---|---|
| Create agent row at pilot | A | R | C | I | C |
| Update KPIs / cost (weekly/monthly) | A | R | I | I | R (assist) |
| Propose promotion | A | R | C | I | R (dossier) |
| Approve L1–L2 | A/R | C | I | I | I |
| Approve L3 | A | C | R (co-approve) | I | I |
| Approve L4 | A | C | R | R | I |
| Demote / freeze | R (any of Mgr/Controller/Audit) | I | R | R | R (enforce) |
| Retire agent | A | R | C | I | R |

R = Responsible, A = Accountable, C = Consulted, I = Informed.

---

## 5. Change procedures

### 5.1 New agent / new instance

1. Confirm charter exists and human owner named.  
2. Set `status=Pilot`, `current_level=0` (or 1 only if justified in writing), `ceiling_level` ≤ 2 initially.  
3. Log entry in `Board_Log` even for pilot start.  
4. Enable Orchestrator enforcement.

### 5.2 Promotion

1. Owner requests with metrics filled.  
2. Agent 16 prepares dossier (or human equivalent).  
3. Board approves per Responsibility Model gates.  
4. Append `Level_History` row **before** changing `Agents.current_level`.  
5. Update `promotion_board_ref` and `level_effective_date`.

### 5.3 Demotion / freeze

1. Any authorized party may set `status=Frozen` and/or lower `current_level` immediately.  
2. Append `Level_History` with trigger = incident ID.  
3. Orchestrator blocks elevated actions within minutes (target).  
4. Resume requires board note — not informal chat.

### 5.4 Version pin changes (model/rules)

1. Record old → new version in `Level_History` or a `Versions` log.  
2. Consider temporary demotion if change is material.  
3. Re-run Sample_QA within agreed window.

---

## 6. `Level_History` (append-only)

| Column | Description |
|---|---|
| `change_id` | UUID / sequence |
| `agent_id` | |
| `from_level` | |
| `to_level` | |
| `change_type` | Promote / Demote / Freeze / Resume / CeilingChange |
| `effective_at` | |
| `approver_ids` | |
| `evidence_pack_link` | |
| `incident_id` | If applicable |
| `comment` | Short |

**Never overwrite history.** Correct errors with a compensating row.

---

## 7. Cadence

| Cadence | Task |
|---|---|
| Daily | Orchestrator reads levels; owners clear Frozen blockers |
| Weekly | Refresh rolling KPIs; review Watch-band costs |
| Monthly | Sample_QA for L2+ agents; cost sheet |
| Quarterly | Autonomy board; L4 attestations; ceiling review |
| Ad hoc | Incident-driven demote/freeze |

---

## 8. Data quality rules

- `current_level` ≤ `ceiling_level` (hard validation).  
- `human_owner` must be an active employee ID.  
- L3+ requires `kill_switch_tested_date` within last 90 days.  
- L4 requires non-empty `autonomy_charter_ref`.  
- `status=Retired` ⇒ Orchestrator must not schedule work.  
- Blank KPI fields for Active agents older than 14 days ⇒ flag data-quality breach.

---

## 9. Security & access

- Editors: AP Manager, Controller designate, registry admin.  
- Readers: agent owners, Audit, Orchestrator service account.  
- Service account: **read** levels for enforcement; **write** only via controlled integration (preferred) or not at all (human updates).  
- Store commercially sensitive cost data per company ACL.

---

## 10. Migration from Excel to systems

Excel is acceptable for pilots and mid-market deployments. When graduating:

1. Keep column semantics stable (this guide = schema contract).  
2. Sync `Agents` + `Level_History` first.  
3. Retain exportable evidence for Audit.  
4. Do not allow “shadow” autonomy settings inside connector configs that disagree with the registry.

---

## 11. Starter checklist (first 30 days)

- [ ] Create workbook from this schema  
- [ ] Register agents in scope (Starter often: 01–04, 05, 07, 08, 10, 12, 16)  
- [ ] All `current_level` = 0 or 1  
- [ ] All ceilings ≤ 2  
- [ ] Owners + backups named  
- [ ] First Sample_QA scheduled  
- [ ] Kill-switch tabletop completed for any agent planned for L3 later  
- [ ] Board_Log entry for “Registry v1 adopted”

---

## 12. One-line operating rule

**No registry row, no production agent — and no level higher than the cell that Audit can read.**
