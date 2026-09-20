---
title: Observe and extract templates
tier: Professional
code: ER-AP-PM-01
---

# Observation log — example

| Time | Person role | System on screen | Action | Workaround? |
|---|---|---|---|---|
| 09:12 | AP analyst | ERP parked invoices | Open EX-GR-MISS | Emails receiver from personal Outlook |
| 09:18 | AP analyst | Shared inbox | Finds last GR on a different PO | Spreadsheet “GRNI_real.xlsx” |

# Observation log — blank

| Time | Person role | System on screen | Action | Workaround? |
|---|---|---|---|---|
|  |  |  |  |  |

# Extraction table — columns

Step ID · Step name · System · Decision Y/N · Business rule · Input · Output · Exception codes · Control · Dependency · Informal hero

# Agentisation matrix

| Step | Human only | Deterministic | Agent recommend | Agent prepare | Agent execute (rare) | Why |
|---|---|---|---|---|---|---|
| 3-way match within tolerance |  | X |  |  |  | ERP engine |
| Explain price variance |  |  | X |  |  | Language + IDs |
| Draft GR chase |  |  |  | X |  | Human send |
| Release payment | X |  |  |  |  | Non-negotiable |
