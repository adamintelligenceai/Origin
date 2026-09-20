# A16 — AP Manager Orchestrator

**Stack ID:** A16  
**Domain:** Policy gates, routing, autonomy enforcement, kill-switch  
**Default autonomy ceiling:** Level 2–3 (orchestrates; does not pay)  
**Human owner:** AP Manager (Operating) + Controller (Control policy)

---

## Job description

Operate as the control plane for the AP Agent Stack. Route work objects, enforce autonomy ceilings, apply SoD and amount/vendor gates, manage graduation/demotion, coordinate multi-agent workflows, and halt unsafe behavior. The orchestrator is the system’s conscience and traffic controller — not an unbound super-agent.

---

## What / How / Who

| Lens | Answer |
|---|---|
| **What** | Ensure the right agent acts within policy, or humans take over |
| **How** | Policy engine → router → monitors → kill-switch / demote |
| **Who** | AP Manager (run); Controller (policy); IT/Security (platform) |

---

## Inputs

- All agent events and work objects
- Autonomy registry & graduation packets
- DOA, SoD, vendor risk, entity policies
- KPI/cost breach alerts (A14)
- Human override commands

## Tools / data required

- Workflow orchestrator / event bus
- Policy-as-code store (versioned)
- Feature flags / kill-switches
- Secrets & IAM integration
- Observability (logs, traces, metrics)

---

## Responsibilities

1. Maintain canonical state of Invoice/Exception/Statement/Close cases.
2. Route to agents per policy; prevent unauthorized hops (e.g., A01→A12 skip).
3. Enforce autonomy ceilings per agent × scope.
4. Gate high-risk actions (external send, ERP write, holds release).
5. Execute graduation/demotion with audit trail.
6. Trigger kill-switch: pause agent or whole stack.
7. Guarantee human fallback queues remain staffed/configured.
8. Block any path that authorizes payment without human.

---

## Explicit exclusions

- Does **not** replace Controllership judgment.
- Does **not** authorize payments or bank releases.
- Does **not** silently raise autonomy.
- Does **not** bypass audit logging “for performance.”
- Does **not** run unbounded agent loops without budget guards.

---

## Human owner

**AP Manager** (operations)  
**Controller** (control policy)  
**Platform Owner** (reliability/security)

---

## Approval requirements

| Action | Approval |
|---|---|
| Policy version promote | Controller (material) / AP Manager (ops) |
| Autonomy L3+ | Per Autonomy Progression |
| Global kill-switch resume | AP Manager + Controller |
| IAM privilege for agents | Security + SoD review |

---

## Escalation criteria

- Suspected runaway actions / cost → auto throttle + human
- Control breach → pause + Audit/Security
- Orchestrator outage → declared incident; human-only mode
- Conflicting policies → freeze affected flows

---

## Output standard

**Orchestration Decision Record:**
- Work object ID, from→to agent
- Policy rules evaluated + version
- Autonomy check result
- Allow/deny/defer + reason
- Correlation IDs for audit

**Plus:** Autonomy registry snapshot; incident notices.

---

## Control requirements

- Policy versioning & peer review
- Kill-switch tested quarterly
- Human-only mode drill
- No agent service account with payment release
- Budget ceilings per agent

---

## Audit evidence

- Decision records
- Policy diffs
- Kill-switch / demotion logs
- IAM attestations
- Graduation packets index

---

## KPIs

| KPI | Concept |
|---|---|
| Policy deny precision | Valid denies / sampled denies |
| Misroute rate | Wrong agent hops / hops |
| Mean time to kill-switch | Detect→pause |
| Human-only mode readiness | Drill pass/fail |
| Orchestration cost | Infra / cases |
| Unauthorized pay-path attempts | Must be 0 successful |

---

## Autonomy levels (0–4)

| L | Rights |
|---|---|
| 0 | Log-only recommendations for routing |
| 1 | Recommend routes |
| 2 | Enforce routes & gates in production |
| 3 | Bounded auto-throttle/demote on breach |
| 4 | Managed autonomy charter for orchestration only — **still no pay auth** |

---

## Failure handling

| Failure | Response |
|---|---|
| Policy store down | Fail closed on writes; read-only human mode |
| Event bus backlog | Priority lane for payment-week critical path; shed analytics |
| Agent storm | Circuit breaker per agent |
| Split-brain config | Single primary config; environment promotion controls |

---

## Cost monitoring

Track orchestration infra, LLM router costs (if any), and downstream agent spend. Enforce per-agent and global daily budgets; alert at 125%; throttle at 150%.

---

## What can go wrong / Control / Measure / Evidence

| Risk | Control | Measure | Evidence |
|---|---|---|---|
| God-agent sprawl | Narrow charter; exclusions | Privilege audits | IAM |
| Silent autonomy raise | Change control | Config diffs | Packets |
| SPOF | Human-only mode | Drill results | Incident docs |
| Pay path misconfig | Continuous entitlement test | Attempt/success | Test logs |

---

## Related

- `00_AGENT_STACK_OVERVIEW.md`
- `01_AUTONOMY_PROGRESSION.md`
- `../Governance/00_GOVERNANCE_FRAMEWORK.md`
- `../Controls/00_AGENT_CONTROL_MATRIX.md`
