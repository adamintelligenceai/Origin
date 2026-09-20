---
title: Human vs agent vs deterministic
tier: Starter
code: ER-AP-ST-HV
---

# Decision

Score the task 0–2 on frequency, rule clarity, data completeness, reversal cost, regulatory sensitivity, supplier impact.

| Outcome | When |
|---|---|
| Deterministic automation | Stable key, structured compare, ERP already can |
| Agent recommend / prepare | Language, ranking, drafting, clustering |
| Human only | Post, pay, bank, access, policy, legal admission |

> RISK: Do not re-implement three-way match in an LLM.

# Starter governance checklist

- [ ] Named human owner
- [ ] Written exclusions
- [ ] Level 0 or 1
- [ ] Payment release is a different human
- [ ] Approved model list
- [ ] Invoice text treated as untrusted
- [ ] Override reason codes
- [ ] Kill switch
- [ ] Retention thought through
- [ ] No consumer LLM paste of production invoices
