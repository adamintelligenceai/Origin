# Responsibility Model — Levels 0 to 4

**Evidence Room — AP Agent OS Pro**  
**Document type:** Governance standard  
**Audience:** Controllers, AP managers, audit, risk, transformation leads  
**Doctrine:** Agents earn responsibility. Full autonomy is never the default.

---

## 1. Why levels exist

Automation without a responsibility ladder produces two failure modes:

1. **Under-use** — agents stay decorative; humans still rekey everything.
2. **Over-trust** — agents act beyond proven competence and create control gaps.

The Responsibility Model fixes both. Every agent is assigned a **ceiling** (maximum allowed level) and a **current level**. Current level may never exceed ceiling. Ceiling itself requires dual approval for L3 and above.

---

## 2. Level definitions

### Level 0 — Observe

**Intent:** The agent watches, measures, and documents. It does not change operational state.

| Dimension | Rule |
|---|---|
| May do | Read queues; score risk; log observations; produce watchlists and dashboards |
| May not | Create/update/post documents; send external messages; change workflows |
| Human role | Interprets findings; decides actions |
| Typical use | New agents; high-risk domains; first 30–90 days after go-live |
| Evidence | Observation logs, scoring rationales, data lineage |

**Example:** Duplicate & Anomaly Agent flags “possible duplicate score 0.87” on a watchlist. No hold is applied until a human (or a higher-level policy) acts.

---

### Level 1 — Recommend

**Intent:** The agent proposes a specific next action with rationale and evidence. A human must accept, reject, or modify.

| Dimension | Rule |
|---|---|
| May do | Draft recommendations; assemble evidence packs; propose routing and codes |
| May not | Apply the recommendation without human confirmation |
| Human role | Decision-maker; must record accept/reject/modify |
| Typical use | Default steady-state for most AP agents |
| Evidence | Recommendation object, human decision, rationale delta if modified |

**Example:** Matching Agent recommends “Accept price variance within 1.2% / $18 — within policy.” AP specialist clicks Accept.

---

### Level 2 — Prepare

**Intent:** The agent creates work-in-progress artifacts ready for human release — drafts, staged postings, prepared correspondence — without making them effective.

| Dimension | Rule |
|---|---|
| May do | Draft emails; stage journal lines; build payment proposal drafts; assemble approval packs; create draft exception cases |
| May not | Send external communications; post to GL; release payments; finalize master-data changes |
| Human role | Reviews and releases; may edit before release |
| Typical use | Mature agents with strong accuracy and low override rates |
| Evidence | Draft vs. released versions; human release stamp; diff log |

**Example:** Supplier Resolution Agent drafts a discrepancy notice and queues it for AP specialist send.

---

### Level 3 — Execute within guardrails

**Intent:** The agent may complete defined actions inside hard limits (amount, document type, variance %, vendor risk tier, time window). Anything outside the fence escalates.

| Dimension | Rule |
|---|---|
| May do | Execute allow-listed actions within numeric/policy fences; auto-route routine cases |
| May not | Breach fences; self-raise limits; execute irreversible money movement unless explicitly in the allow-list (rare; usually excluded) |
| Human role | Sets fences; reviews exceptions and samples; owns outcomes |
| Typical use | Selective promotion after sustained L2 excellence |
| Evidence | Action log with fence evaluation; sample QA; exception spillover rates |

**Example:** Invoice Validation Agent auto-completes tax-code suggestion and holds for human only when confidence &lt; threshold or amount &gt; $5,000.

**Hard rule:** Payment authorization and bank-file release are **excluded from L3 allow-lists** unless the organization has completed a formal L4 design with Controller + Audit sign-off. Default product posture: they remain human.

---

### Level 4 — Managed autonomy

**Intent:** Broader execution within a managed service envelope — still bounded, monitored, and reversible where possible. This is **not** “set and forget.”

| Dimension | Rule |
|---|---|
| May do | Operate end-to-end within a documented autonomy charter for a narrow scope (e.g., low-value utility invoices from approved vendors) |
| May not | Expand scope silently; operate without continuous monitoring, sampling, and kill-switch |
| Human role | Autonomy board; kill-switch owner; periodic attestation |
| Typical use | Rare; never default; only after L3 track record and formal promotion |
| Evidence | Autonomy charter, continuous controls monitoring, sample testing, incident log, quarterly attestation |

**Default posture for Evidence Room products:** **No agent ships at L4.** L4 requires a written promotion, dual (or triple) approval, and a living autonomy charter.

---

## 3. Comparison matrix

| Capability | L0 Observe | L1 Recommend | L2 Prepare | L3 Execute (guardrails) | L4 Managed autonomy |
|---|---|---|---|---|---|
| Read / score | Yes | Yes | Yes | Yes | Yes |
| Propose action | No | Yes | Yes | Yes | Yes |
| Create drafts / stage work | No | No | Yes | Yes | Yes |
| Finalize routine actions | No | No | No | Within fences | Within charter |
| External send / post | No | No | No | Allow-listed only | Per charter |
| Self-expand scope | No | No | No | No | No |
| Default for new agents | Preferred | Common | Earned | Earned | **Never default** |

---

## 4. Promotion criteria

Promotions are earned on **evidence**, not ambition. Minimum gates:

### L0 → L1

| Gate | Standard (illustrative — tune per agent) |
|---|---|
| Observation quality | ≥ 95% of observations judged useful in sample review |
| False-signal rate | Within agreed band (e.g., &lt; 10% noise) |
| Evidence completeness | 100% of observations have lineage |
| Duration | ≥ 2–4 weeks continuous operation |
| Approvers | Human agent owner |

### L1 → L2

| Gate | Standard |
|---|---|
| Recommendation acceptance rate | ≥ 85% accepted without material edit (or agreed band) |
| Critical miss rate | Near-zero on sampled critical misses |
| Override reasons coded | 100% of rejects have reason codes |
| Duration at L1 | ≥ 4–8 weeks |
| Approvers | Agent owner + AP Manager |

### L2 → L3

| Gate | Standard |
|---|---|
| Draft release acceptance | ≥ 90% released with minor/no edit |
| Fence design | Documented numeric/policy fences + kill-switch tested |
| Incident history | No open Sev-1/2 control incidents attributable to agent |
| Sample QA | Independent sample passes agreed accuracy |
| Duration at L2 | ≥ 8–12 weeks |
| Approvers | AP Manager + Controller |

### L3 → L4

| Gate | Standard |
|---|---|
| Sustained L3 performance | ≥ 1–2 full periods with stable KPIs |
| Autonomy charter | Scope, fences, monitoring, rollback, owners signed |
| Continuous monitoring | Alerts live; on-call defined |
| Audit opinion | Internal Audit reviewed design (or equivalent) |
| Business case | Residual risk accepted explicitly |
| Approvers | AP Manager + Controller + Audit (or Risk) |
| Reconfirmation | Quarterly attestation mandatory |

**Never default to L4.** Product templates, sales materials, and implementations must start at L0–L1 unless a signed exception exists.

---

## 5. Demotion triggers

Demote immediately (same day) when any of the following occur:

| Trigger | Typical demotion |
|---|---|
| Control incident Sev-1 (wrong payment released, master-data corruption, material policy breach) | Drop to L0 or disable |
| Sustained acceptance/accuracy below floor for 2 consecutive review windows | Drop one level |
| Fence bypass or attempted self-expansion of scope | Drop to L0; incident review |
| Kill-switch activated | Freeze at L0 pending RCA |
| Model/tool drift causing unexplained error spike | Drop to L1 minimum |
| Owner vacancy (no named human owner) | Freeze agent |
| Audit finding on agent design | Per finding severity |

Demotions do not require the same board as promotions. **Any** of AP Manager, Controller, or Audit may demote; reinstatement follows promotion gates.

---

## 6. Evidence required (all levels)

Every agent must maintain:

1. **Action / observation log** — who/what/when/why (agent ID + version)
2. **Input snapshot references** — document IDs / hashes sufficient to reconstruct
3. **Decision rationale** — policy cites or scoring factors
4. **Human interaction record** — accept / reject / modify / override reason
5. **KPI time series** — for promotion boards
6. **Incident & demotion history** — immutable

Missing evidence = treat as control failure = demote or freeze.

---

## 7. Performance history fields (registry)

Maintain these fields in the Agent Registry (see `AGENT_REGISTRY_GUIDE.md`):

| Field | Description |
|---|---|
| `agent_id` | e.g., AGENT_03 |
| `current_level` | 0–4 |
| `ceiling_level` | Max approved |
| `level_effective_date` | When current level began |
| `promotion_board_ref` | Link to approval record |
| `acceptance_rate_28d` | Rolling |
| `critical_miss_count_90d` | Rolling |
| `incident_count_open` | Current |
| `last_sample_qa_score` | % |
| `last_sample_qa_date` | Date |
| `cost_per_txn_28d` | Currency |
| `human_owner` | Named person |
| `status` | Active / Frozen / Retired |

---

## 8. Cost and risk coupling

Autonomy without cost discipline invites noisy agents. Before each promotion:

- Confirm **cost per successful outcome** is within budget band
- Confirm error cost (rework hours × rate + financial exposure) is declining or stable
- Reject promotions that improve speed but worsen net cost of quality

---

## 9. Relationship to Agent 16 (Orchestrator)

Agent 16 **enforces** levels; it does not grant them. Promotion authority remains human. The Orchestrator must block any action that would exceed an agent’s `current_level` or `ceiling_level`.

---

## 10. Attestation statement (recommended quarterly)

> We confirm that no AP agent is operating above its approved responsibility level; that L4 is used only where an autonomy charter exists; that kill-switches were tested in the period; and that payment authorization remains human-controlled except as explicitly documented in a signed L4 charter.

Signed: AP Manager · Controller · (Audit as required)

---

## 11. Related documents

- `00_AGENT_STACK_OVERVIEW.md`
- Individual agent charters (`AGENT_01` … `AGENT_16`)
- `AGENT_REGISTRY_GUIDE.md`
- Controls pack — payment authorization and dual-control standards
