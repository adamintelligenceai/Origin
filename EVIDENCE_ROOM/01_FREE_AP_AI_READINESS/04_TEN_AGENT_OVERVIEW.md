# Ten Agent Overview

**Evidence Room** · Free tier · First ten of the AP Agent OS spine (A01–A10)

These agents align with **AP Agent OS Pro** (`03_AP_AGENT_OS_PRO/Agent_Library/`). Free tier describes *what they do*; Starter and Pro provide blueprints and controls. Agents A11–A16 (statements, payment proposal, close, reporting, root cause, orchestrator) appear in Pro.

## Catalogue

| # | Agent | Primary job |
|---|---|---|
| 1 | **A01 Invoice Intake Agent** | Capture, classify, extract, and enrich inbound invoices into Invoice Cases. |
| 2 | **A02 Invoice Validation Agent** | Run structural and master-data checks before matching. |
| 3 | **A03 Matching Agent** | Perform 2-/3-way match within published tolerances. |
| 4 | **A04 Exception Triage Agent** | Classify, prioritize, and route exceptions with taxonomy codes. |
| 5 | **A05 Goods Receipt Agent** | Signal GR completeness and timing issues that block clean match. |
| 6 | **A06 PO Quality Agent** | Detect PO hygiene problems that create preventable mismatches. |
| 7 | **A07 Approval Agent** | Route approval packets per policy without breaking SoD. |
| 8 | **A08 Supplier Resolution Agent** | Prepare external clarification packs for supplier-owned issues. |
| 9 | **A09 Internal Follow-Up Agent** | Chase internal owners against SLAs with evidence-linked reminders. |
| 10 | **A10 Duplicate / Anomaly Agent** | Emit duplicate and anomaly *signals* for investigation — not fraud guarantees. |

## Responsibility ladder (applies to every agent)

| Stage | Agent may… | Human must… |
|---|---|---|
| Observe | Read and summarise | Decide all actions |
| Draft | Prepare packets / messages | Edit and send / post |
| Propose / Recommend | Recommend a system action | Explicitly confirm |
| Bounded execute | Run pre-approved micro-actions | Sample, monitor, revoke |
| Earn expand | Widen envelope with evidence | Approve new bounds |

No agent skips stages by slogan. Payment **authorization** remains human — Payment Proposal Review (A12 in Pro) proposes; it does not release funds.

## Suggested first pilots (if maturity ≥ 3 and hard gates pass)

1. **A01 Intake** (enrich) + **A02 Validation** (propose)
2. **A03 Matching** (propose) + **A04 Exception Triage** (propose)
3. **A10 Duplicate / Anomaly** (signals only) alongside matching

## What this overview is not

- Not implementation detail (see Starter blueprints)
- Not a claim that ten agents will move you to Ardent Partners 2025 STP **35.4%**
- Not permission to write payment files or vendor bank fields without dual control
- Not a fraud-detection guarantee (especially A10)

## Upgrade path

| Depth needed | Product |
|---|---|
| Condensed blueprints + RACI | AP Agent Starter ($79) |
| Full 16-agent library, controls, KPI system | AP Agent OS Pro |
| Facilitated rollout | AP Agent OS Team / Custom Blueprint |

---

*Evidence Room — Agents that earn responsibility.*
