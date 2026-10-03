# AP agent-layer maturity model (L1–L5)

**Product:** Evidence Room — AP Agent OS  
**Use:** Place the organisation after the 36-question diagnostic.  
**Rule:** The band describes the *agent layer*, not the quality of the ERP and not the talent of the AP team.

A strong shared-service team on a modern ERP can sit at L1 on this model. That is not an insult. It means agents are undesigned. The stack can still be excellent.

This model does not measure fraud resilience, regulatory compliance, accounting accuracy, or investment return.

---

## 1. The five levels

| Level | Name | One sentence |
|---|---|---|
| **L1** | Undesigned | Tools and people exist. No agent layer exists. |
| **L2** | Informal activity | Models or bots are in use without charters, a register, or evidence gates. |
| **L3** | Named and held | Wave 1 is chartered at L0/L1. Payment and vendor-bank holds are written and real. |
| **L4** | Evidence-gated | Promotion uses gates. Packets reopen. Flags have recorded human outcomes. |
| **L5** | Recertified layer | Demotion and retirement work. Cost of the layer is visible. L3 is rare, sampled, and still not payment. |

Autonomy levels inside a charter (Observe / Recommend / Prepare / Execute / Managed) are a different scale. Do not say “we are L4” when you mean an agent was promoted to execute-within-guardrails. In conversation, say **maturity L4** or **autonomy L3**.

---

## 2. Definitions that can be tested

### L1 — Undesigned

**True when most of these hold:**

- No named AP agents. “We might use Copilot” is not a name.
- Exceptions are free-text or oral.
- No autonomy register.
- No work-object identity beyond the ERP document number and a shared mailbox.
- Payment may still be well controlled. That control is *AP hygiene*, not agent-layer maturity.

**Monday move:** Sit the diagnostic. Do not buy a model licence to “get to L2.” L2 is not progress if it is only informal activity.

**Northline (fictional) analogue:** Northline in 2024 before anyone opened a chat on an invoice.

---

### L2 — Informal activity

**True when:**

- At least one model, copilot, RPA job, or vendor “AI feature” touches invoices, exceptions, or supplier mail.
- There is no charter, or the charter is a slide.
- Prompts live in personal accounts.
- Flags, if any, can be ignored without a recorded outcome.
- Someone has said “it just helps” in a steering meeting.

**Risk:** Informal activity is how payment-adjacent features get turned on in a demo and left on.

**Monday move:** List every informal helper. Charter Wave 1 at autonomy L0. Turn *off* anything that can post, send externally, or annotate a payment proposal until a charter exists.

**Northline (fictional):** Capture copilot + matching suggestions; unlisted; C6 = 0.

---

### L3 — Named and held

**True when:**

- Six Wave 1 agents have owners, object types, exclusions, and a starting autonomy of Observe or Recommend.
- Payment authorisation and vendor-bank change are human in policy **and** system.
- Orchestrator work objects exist on the pilot path.
- Internal Audit has a date to observe packets.
- No agent is commissioned at autonomy L3 or L4.

**Monday move:** Run the two-week shadow. Refuse scope expansion. Write the cost ledger, even if the numbers are small.

---

### L4 — Evidence-gated

**True when L3 is true and:**

- Promotion cases use written gates (coverage, completeness, sampled disagreement, no silent scope, failure handling, cost meter, language, owner).
- A Controller or auditor can reopen source, extract, worksheet or coded fail, and approval for a sampled invoice in one sitting.
- Agent 10 outcomes are recorded (clear / confirm / escalate / defer).
- Prompt and limit-table changes are change-controlled.
- At least one demotion or declined promotion has occurred — or a tabletop of demotion has been tested. A culture that cannot demote is not gated; it is optimistic.

**Monday move:** Open Wave 2 prepare-level packets only for named object types. Agent 12 remains annotate-only.

---

### L5 — Recertified layer

**True when L4 is true and:**

- Every live agent has a recertification date. Overdue means automatic demotion.
- Cost per thousand invoices for the layer (licence + model + exception minutes) is reported with the operational pack.
- L3 execute-within-guardrails exists only on a named class with a limit table and sampling.
- Payment release is still dual-human. This remains true at L5. There is no L6 that pays.
- Root Cause proposals are accepted or rejected by process owners; they are not silently implemented by a model.

**Monday move:** Recertify. Publish the register. Do not celebrate “touchless.”

---

## 3. Placement method

1. Score the diagnostic.
2. Apply veto caps (`DIAGNOSTIC_GUIDE.md` §4).
3. Read the qualitative tests above. If the tests for L4 fail, you are not L4 even if the arithmetic average is 3.2.
4. When in doubt, take the lower band.

| Arithmetic average of dimensions | First guess | Override |
|---|---|---|
| 0.0–1.4 | L1 | Informal bots in use → L2 |
| 1.5–2.4 | L2 | Wave 1 chartered and holds real → L3 |
| 2.5–3.2 | L3 | Gates and reopen test fail → stay L3 |
| 3.3–3.7 | L4 | Cannot demote / no flag outcomes → L3 |
| 3.8–4.0 | L5 | Any payment-adjacent execute → not L5; control incident |

---

## 4. What does not move the band

- Buying Professional or Team. A licence is not maturity.
- Invoice volume. Small books can be L4; large books can be L1.
- ERP brand.
- A vendor’s “AI included” SKU.
- A single impressive demo on a clean PDF.
- A promised savings model. Economics visibility can score high while the layer is still L2.

---

## 5. Language for the sponsor

**Use:**

> We are at maturity L2 (informal activity). That is a control finding about undocumented helpers, not a finding that AP is weak. The next band is L3: named Wave 1, human payment hold, autonomy register.

**Do not use:**

> We are only L2, so we are losing millions / we are non-compliant / we are exposed to undetected fraud.

Those sentences reintroduce banned claims.

---

## 6. Re-sit cadence

| Trigger | Action |
|---|---|
| 90 days after Wave 1 shadow starts | Re-sit dimensions C, E, and the reopen test (B6) |
| Any payment-adjacent incident | Immediate re-sit of C; cap band until closed |
| New ERP company code or new capture vendor | Re-sit B and D for that path |
| Request to promote an agent | Band must be L3+ and gates must pass; the band does not replace the gate pack |

Keep the prior scorecard. Do not overwrite history.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS |
| Object | Maturity model L1–L5 |
| Related | `DIAGNOSTIC_GUIDE.md` |
| Status | Edition 1.0.0 |
