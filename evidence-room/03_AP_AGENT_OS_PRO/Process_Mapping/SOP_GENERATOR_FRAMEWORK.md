# SOP Generator Framework

**Evidence Room — AP Agent OS Pro**  
**Document type:** Method for producing AP SOPs alongside agents  
**Output template:** `Templates/SOP_TEMPLATE.md`

---

## 1. Why SOPs still matter

Agents change *who performs steps*, not the need for a controlled description of *how work must run* — especially fallback, overrides, and audit evidence. An agent without an SOP is an ungoverned habit.

---

## 2. Generator inputs (required)

| Input | Source |
|---|---|
| As-is / to-be process map | Process mapping |
| Exception taxonomy codes in scope | Taxonomy |
| Human vs agent split | Framework |
| Responsibility level | Charter |
| Control matrix rows | Controls |
| KPI definitions | KPI Framework |
| System touchpoints | Discovery |
| RACI | RACI templates |

Missing inputs → draft SOP marked **Incomplete — not for production**.

---

## 3. Ten-block generation sequence

1. **Purpose & scope** — what process, inclusions/exclusions.  
2. **Roles** — humans + agent IDs + Accountable.  
3. **Definitions** — STP, exception, tolerance pointers.  
4. **Preconditions** — access, master data, calendars.  
5. **Happy path procedure** — numbered steps with actor (Human/Agent Ln).  
6. **Exception paths** — link taxonomy codes + decision tree IDs.  
7. **Stop conditions / escalations** — kill-switch reference.  
8. **Evidence** — what must be retained each run.  
9. **Fallback (agent unavailable)** — manual path.  
10. **Controls & KPIs** — what is monitored; review cadence.  

---

## 4. Language rules for generated SOPs

| Do | Don’t |
|---|---|
| Name the agent and level | “The AI will handle it” |
| Say “recommend” vs “post” precisely | Blur authority |
| Cite policy IDs / DOA | Invent tolerances inline without source |
| Label illustrative screenshots | Paste production secrets |
| Include fallback | Assume 100% uptime |

Tone: institutional, calm, specific — Evidence Room voice.

---

## 5. Automation assist (optional)

Teams may use an LLM to **draft** SOP text from the inputs above. Governance rules:

- Human Business Owner edits and signs.  
- Prompt and source pack versioned.  
- No confidential invoices in consumer tools.  
- Generated draft watermark: “Draft — pending approval.”  

---

## 6. SOP lifecycle

| Event | Action |
|---|---|
| Agent level change | Update actor verbs; re-approve |
| Taxonomy change | Update exception sections |
| Incident | Add preventive step; version bump |
| Quarterly | Attest SOP still accurate |
| Agent retire | SOP → archive or manual-only revision |

---

## 7. Minimum SOP set for first production agent

- [ ] Happy path SOP  
- [ ] Exception handling SOP (codes in scope)  
- [ ] Fallback / BCP SOP excerpt  
- [ ] Override SOP  
- [ ] Evidence retrieval SOP (for Audit)  

---

## 8. Quality checklist before publish

- [ ] One Accountable human named  
- [ ] Every write action gated  
- [ ] Banking-change path explicit  
- [ ] Payment authorization explicit (human)  
- [ ] KPIs referenced by dictionary ID  
- [ ] Version, date, approver  

---

## 9. Related documents

- `Templates/SOP_TEMPLATE.md`  
- `METHODOLOGY_10_STEPS.md`  
- `EXCEPTION_TAXONOMY.md`  
- `HUMAN_VS_AGENT_FRAMEWORK.md`
