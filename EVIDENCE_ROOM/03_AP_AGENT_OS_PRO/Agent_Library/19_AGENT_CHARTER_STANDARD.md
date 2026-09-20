# 19 — Agent Charter Standard

**Product:** Evidence Room / AP Agent OS  
**Owner:** AP Manager + Controls  
**What you should do:** Implement, audit, and (if you add an agent later) write against this standard. A charter that misses a section is not implementation-ready.

This is the quality bar for every file in `AGENT_01`–`AGENT_16`. It is also the template for a seventeenth agent, should you ever need one (for example a jurisdiction-specific e-invoicing clearance clerk). New agents are rare. Do not add one to avoid fixing a table.

---

## Required identity block

Every charter starts with:

- Agent number and name
- Product line (Evidence Room / AP Agent OS)
- Human owner role and back-up
- Default start level (**L0** unless a written exception exists — it should not)
- Receives from / hands to
- One-line "does not"

If identity is missing, the Orchestrator cannot route.

---

## Required sections

A charter is complete only if **all** of the following exist and contain AP-specific content (not generic "the AI will help").

| Section | Must answer | Fail if |
|---|---|---|
| **Purpose** | One paragraph: why this agent exists and what it does *not* decide | Hype; "end-to-end AP"; fraud/compliance guarantee |
| **Job description** | Concrete tasks | "Use AI to optimise" |
| **In-scope / exclusions** | Both lists | Exclusions missing (especially human classes) |
| **Inputs** | Systems and fields | "ERP data" with no objects |
| **Tools required** | Read vs write; APIs it must **not** have | Write access to payment or bank master without a hard no |
| **Outputs and output standard** | Decision enum + completeness test | Free-form only |
| **Decision rights L0–L4** | Table, all five levels | L3 = "full autonomy"; L4 as default |
| **Human owner** | Typical role | "The business" |
| **Approval requirements** | What a human signs | Empty |
| **Escalation criteria** | When it leaves the happy path | "When unsure" only |
| **Control requirements and evidence** | What is retained | "Keep logs" only |
| **Failure handling** | Timeouts, at-most-once writes, fail closed | Retry-all |
| **Cost monitoring** | Inference **and** exception minutes | Token cost only |
| **KPIs** | Formulas with denominators | Vanity %; invented benchmarks |
| **First-90-day scope** | Narrow slice | "All invoices, all entities" |
| **Worked example** | Fictional ACME-style or your own labelled fictional | Real client; implied case study |
| **Instruction skeleton** | Starting operating instruction, labelled as such | "Magic prompt"; jailbreak bait |

Every page must also hit at least one of: What should I do? How? Who owns it? What can go wrong? How do I control it? How do I measure it? What evidence proves it works?

---

## Voice and claims

Allowed: specific, executive, ERP-agnostic, measured.

Not allowed:

- Robots, "game-changing," "guaranteed savings," "fraud detection," "compliance guaranteed," "autonomous AP" as a default.
- Invented statistics. Numbers in examples are **ILLUSTRATIVE**. Targets in your tenant are **TARGET** until measured.
- Copying a named employer's, client's, or vendor's proprietary workflow.

Brand idea: **Proof before permission.**  
Line: **Agents earn responsibility. Evidence decides.**

---

## Autonomy writing rules

- Default start is L0.
- L3 is execute **within named gates**.
- L4 is managed, sampled, kill-switched — not unattended cash.
- Payment release, bank-change, policy exception, legal dispute stay human in **every** charter that could touch them.
- Confidence may only narrow action, never widen a control.

---

## Packet writing rules

Outputs that hand off must be mappable to the stack packet:

`case_id`, document keys, entity, vendor, from/to, `autonomy_level_applied`, decision, confidence + rule, `evidence_refs`, `exceptions[]`, `human_required` + reason, `next_action`, `cost_envelope`.

An agent that "sends a chat to the next agent" without this packet fails the standard.

---

## Tools and SoD

The charter must state **forbidden tools** (payment release, vendor bank write, period status, DoA approve-as-user).

SoD to preserve (write explicitly when relevant):

- Invoice processor / L3 poster ≠ payment releaser
- Bank-change requester ≠ bank-change approver
- GR poster ≠ matcher identity on the same case
- Agent service account ≠ DoA slot ≠ BCM role

---

## Failure and writes

Any ERP or mail **write** must describe:

- Timeout / no response → do not retry; reconcile by read
- 4xx (except rate-limit) → do not retry the same payload
- Rate-limit → backoff only
- Ambiguous post → mark ambiguous; Orchestrator / human reconciles

This is at-most-once for anything that could duplicate a document or a send.

---

## Cost and KPIs

Cost = inference + tool + **human exception minutes × loaded rate** (or minutes if no rate).

KPIs must include a denominator and a clock definition. Control KPIs (missed duplicate, invoice-as-GR, agent-released payment) belong on the charter even if the target is zero.

---

## First 90 days

Must be narrower than the in-scope list. Name entity, channel, document type, and the level you will **not** exceed. If the 90-day scope equals full scope, the charter fails.

---

## Worked example standard

- Fictional company acceptable: **ACME Manufacturing**, 8,400 invoices/month, SAP + shared services, **not a client**.
- Figures labelled ILLUSTRATIVE.
- Shows a correct path **and** a wrong path.
- Names evidence that would prove the case worked.

---

## Instruction skeleton standard

Label in bold: **Starting operating instruction — adapt. Not a magic prompt.**

Must include: mission, autonomy/kill-switch, numbered rules, fail-closed behaviour, language ban (no fraud/compliance guarantee).

It is an operating instruction the team pastes into config and edits. It is not a secret that "makes the agent work."

---

## Review checklist (use before go-live of an agent)

- [ ] Identity block complete
- [ ] All sections present and AP-specific
- [ ] Human classes named where the agent could touch them
- [ ] L0–L4 table has no silent execute
- [ ] Forbidden tools listed
- [ ] Timeout = no retry on writes
- [ ] Cost includes exception minutes
- [ ] KPIs have formulas
- [ ] 90-day scope is a subset
- [ ] Example is fictional / illustrative
- [ ] Instruction labelled as a starting instruction
- [ ] Owner named; Controls know where evidence lands
- [ ] Orchestrator hand-off mapped in `00_AGENT_STACK_OVERVIEW.md`

A charter that fails two or more boxes is not ready. Fix the charter before you raise L1.

---

## Adding a new agent (rare)

1. Write the charter to this standard.
2. Add the hand-off to `00` (sequence diagram and packet rules).
3. Add the human line to `18`.
4. Give it a ceiling of L0 in Orchestrator config.
5. Do not reuse another company's workflow.
6. Prefer extending Agent 04's routing table over creating "Agent 17a."

---

## How you measure the library itself

| Question | Test |
|---|---|
| Can a new AP lead run Monday? | They can name owner, first slice, and forbidden action per agent |
| Can Controls audit? | Evidence lists exist and match what the system stores |
| Can we stop? | Kill-switch and downgrade are in `17` and Agent 16 |
| Did we over-claim? | No savings/fraud/compliance guarantee in any file |

---

## What can go wrong

- Charters that are prompt libraries without controls.
- Copy-paste of L0–L4 tables with the same verbs for Intake and Payments.
- A new agent created to bypass Agent 12.

---

## How you control the standard

- This file is the acceptance test for the library.
- Changes to the standard need AP Manager + Controls (they change how you audit).
- Agent files that drift are defects, not "local flavour," unless the drift is an explicit published slice.

Proof before permission. Agents earn responsibility. Evidence decides.
