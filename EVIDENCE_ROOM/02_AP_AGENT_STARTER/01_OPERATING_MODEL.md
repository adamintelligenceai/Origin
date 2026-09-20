# AP Agent Operating Model

**Evidence Room** · Starter

## Purpose

Define how agents participate in accounts payable without dissolving accountability.

## Core principle

> Agents earn responsibility. Humans retain accountability.

An agent may widen its action envelope only when evidence shows reliable performance on a defined invoice class under review.

## Structural layers

```
Strategy          CFO / Controller intent, risk appetite
Governance        Agent charter board (cadence: monthly)
Operations        AP lead + processors + exception owners
Agents            Task-bounded workers with stages
Evidence          Logs, samples, packets retained for audit
Systems           ERP / AP automation / intake / bank (unchanged owners)
```

## Agent charter (minimum fields)

| Field | Description |
|---|---|
| Name | Canonical agent name |
| Purpose | One sentence job |
| Invoice classes in scope | e.g. domestic PO < $5k |
| Stage | Observe / Draft / Propose / Bounded act |
| Inputs | Systems and fields read |
| Outputs | Artefacts produced |
| Forbidden actions | Explicit non-scope |
| Evidence standard | What must be retained |
| Human owner | Named role |
| Kill-switch | Who can disable and how |
| Review cadence | Weekly during pilot; monthly after |

## Work pattern

1. **Event** — invoice arrives or exception opens
2. **Agent run** — within charter
3. **Evidence write** — decision factors + timestamp + version
4. **Human gate** — if stage requires
5. **System of record update** — by authorised actor (human or bounded agent)
6. **Sample QA** — scheduled, not optional at Bounded act

## Segregation of duties

Agents do not collapse SoD:

| Function | May an agent perform alone? |
|---|---|
| Vendor bank change | Never |
| Payment release | Never at Starter; only later under Custom/Pro controls with dual control |
| Force-match override | Propose only |
| Master-data create | Draft / Propose only |

## Meeting rhythm

| Forum | Cadence | Agenda |
|---|---|---|
| Pilot stand-up | 2× weekly | Volume, exceptions, incidents |
| Evidence review | Weekly | Sample failures, false positives |
| Charter board | Monthly | Stage promotions, scope changes |

## Failure modes to design against

| Failure | Design response |
|---|---|
| Silent wrong match | Confidence thresholds + mandatory evidence fields |
| Prompt / tool sprawl | Charters only; no ad-hoc production agents |
| Metric gaming | Pre-registered KPIs + control KPI |
| Staff bypass | Make agent path easier than shadow path for in-scope work |

---

*Evidence Room — Agents that earn responsibility.*
