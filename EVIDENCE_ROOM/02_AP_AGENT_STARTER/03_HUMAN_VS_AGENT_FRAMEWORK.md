# Human vs Agent Framework

**Evidence Room** · Starter

## Responsibility ladder

| Stage | Agent | Human | Accountability |
|---|---|---|---|
| Observe | Reads, summarises | Interprets | Human |
| Draft | Prepares artefacts | Edits / sends / posts | Human |
| Propose | Recommends system action | Explicit confirm/reject | Human |
| Bounded act | Executes inside envelope | Samples + monitors | Human (sponsor) |
| Earn expand | Requests wider envelope | Charter board decides | Human (board) |

## RACI by activity

| Activity | Agent | Processor | AP Lead | Controller | IT |
|---|---|---|---|---|---|
| Intake enrichment | R | C | A | I | C |
| Match proposal | R | C | A | I | C |
| Exception classification | R | C | A | I | I |
| Vendor master change | C (detect) | C | C | A | R (system) |
| Approval decision | C (route) | I | C | A/R (approver) | I |
| Payment release | C (readiness) | R (runner) | A | I | C |
| Evidence pack | R | C | A | I | I |
| Stage promotion | I | C | R | A | C |

R = Responsible, A = Accountable, C = Consulted, I = Informed

## Decision rights

| Decision | Who |
|---|---|
| Add invoice class to agent scope | AP Lead + Controller |
| Move Observe → Draft | AP Lead |
| Move Draft → Propose | AP Lead + Controls review |
| Move Propose → Bounded act | Charter board |
| Emergency disable | Any of: AP Lead, Controller, IT security on-call |

## Language for staff communications

**Use:** “Agents prepare and propose; you confirm. Your judgement stays on the money path.”

**Avoid:** “AI will replace AP.” / “The bot is always right.” / “Guaranteed savings.”

## Conflict resolution

When agent and human disagree:

1. Human decision stands in production.
2. Log disagreement with reason code.
3. Weekly review of disagreement clusters → model/policy fix, not blame.

---

*Evidence Room — Agents that earn responsibility.*
