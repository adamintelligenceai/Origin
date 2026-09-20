# Customer Problem Definition — Evidence Room AP Agent OS

**Version:** 1.0.0 · **Date:** 2026-03-20  
**Related:** `00_REFINED_MASTER_PROMPT.md` §4 · Research Ledger A2024-* / A2025-* / GAP-*

---

## 1. Ideal customer profile (ICP)

### Firmographic

- Mid-market to enterprise; often multi-entity or shared-services AP  
- Invoice volume high enough that cost-per-invoice and exceptions are board-visible  
- **Existing** AP automation and/or ERP investment (Tipalti, Coupa, Basware, Stampli, Medius, HighRadius, Esker, AvidXchange, BILL, Ramp, SAP, Oracle, Microsoft Dynamics, or mix)

### Buyer personas

| Persona | Role in purchase | What they protect |
|---|---|---|
| **Controller / Head of AP** | Primary buyer | Control, cycle time, exception backlog |
| **AP Operations / Shared Services Lead** | Day-to-day champion | Throughput, supplier noise, staff load |
| **CFO / VP Finance** | Economic buyer (Team / Custom) | Cost trajectory, risk, narrative to board |
| **Internal Audit / SOX** | Gatekeeper | Evidence, SoD, change control |
| **IT / ERP owner** | Influencer | Integration stability — must hear “not a rip-and-replace” |

### Non-ICP (disqualify early)

- Teams shopping to **replace** their AP suite as the primary project  
- Buyers seeking unbounded “ChatGPT for invoices” with no measurement  
- Organisations with no human owner for exceptions  
- Pure prompt collectors without process baseline  

---

## 2. Jobs to be done (JTBD)

### Functional jobs

1. Introduce AI into AP **without** losing auditability.  
2. Decide **which work** an agent may perform at which value/risk band.  
3. Classify and route **exceptions** so humans spend time where judgement matters.  
4. Measure whether an agent is **earning** more responsibility.  
5. Brief executives with **evidence**, not demo theatre.  

### Emotional jobs

- Reduce fear of silent error at scale  
- Replace hype pressure with a controllable programme  
- Give AP staff a clear future role beside agents  

### Social jobs

- Show Audit and the CFO a sober plan  
- Avoid being the team that “turned on AI” without controls  

**Job statement (primary):**  
*When we are expected to adopt AI in Accounts Payable, help us design and govern agents that earn responsibility across our existing stack, so we improve performance without surrendering control.*

---

## 3. Pain map across the AP lifecycle

Industry climate (context only — ledgered): peer cost **$9.84**/invoice, cycle **8.2 days**, exception **18.4%**, STP **35.4%** (Ardent 2025); prior year cost **$9.40**, cycle **9.15 days**, exception **14.0%**, STP **32.6%** (Ardent 2024). BIC shows material headroom (cost **$2.65**, exception **11.1%**, STP **51.0%**; **79%** lower cost and **79%** faster cycle vs peers — Ardent 2025). Automation can cost **50–80% less** than manual (Ardent 2024) — industry statement, not a customer promise.

| Lifecycle stage | Typical pain | Agent-specific failure mode | Evidence Room response |
|---|---|---|---|
| **Supplier / intake** | E-invoice adoption incomplete (peer e-invoice suppliers **57.4%** — A2025-05); uneven data quality | Agent invents fields; no evidence standard | Evidence checklist; stop conditions |
| **PO linkage / match** | Not all invoices PO-linked (**65.4%** PO-linked — A2025-06) | Agent “forces” match; hides exceptions | Match-exception agent pattern; taxonomy |
| **Coding / enrichment** | Inconsistent GL/coding | Unreviewed postings | Thresholds; dual-control where required |
| **Exception handling** | High exception rates (peer **18.4%** — A2025-03) | Exceptions treated as UI noise, not workforce design | Exception taxonomy + KPI treatment |
| **Approvals** | Slow cycles (peer **8.2 days** — A2025-02) | Agent spam or silent bypass | Role cards; SoD matrix |
| **Supplier inquiries** | **21.9%** time on inquiries (A2025-07) | Hallucinated status answers | Inquiry agent with system-of-record citation rules |
| **Payment prep** | Payment platforms already owned | Scope creep into payment execution without charter | Explicit non-goals; stack honesty |
| **Audit / close** | Weak AI trail | Cannot reconstruct decisions in six months | Governance + audit evidence guide |
| **Improvement** | AI hope without OS (**65%** hope AI increases automation; **44%** adoption; **>75%** expected in 12 months — A2025-13…15) | Autonomy expanded on enthusiasm | Responsibility progression |

---

## 4. Buying triggers

| Trigger | Signal | Likely tier |
|---|---|---|
| Failed or stalled AI pilot | Demo succeeded; production gated by Audit | Starter → Pro |
| Exception backlog crisis | Aging exceptions; supplier noise | Starter (inquiry or match) |
| Board / CFO AI mandate | Timeline without operating model | Team + Executive pack |
| New AP platform live | Stack modernised; agent layer still missing | Pro |
| Multi-entity complexity | Inconsistent rules across entities | Custom Blueprint |
| Cost-per-invoice pressure | Awareness of peer **$9.84** vs BIC **$2.65** (A2025-01, A2025-08) | Pro Business Case → Team |

---

## 5. Objections and responses

| Objection | Weak response (avoid) | Evidence Room response |
|---|---|---|
| “We already bought Coupa/Tipalti/…” | “We’re better.” | “Keep it. We design the agent layer across it.” (GAP-06) |
| “Just give us prompts.” | Dump prompts | Prompts without Q1–Q7 and promotion rules do not ship |
| “Show guaranteed ROI.” | Invent % | Use buyer volumes × buyer baselines; cite Ardent only as industry context (incl. automation **50–80%** less than manual — A2024-05 — as context) |
| “Audit will never allow AI.” | Minimise risk | Lead with governance charter, SoD, evidence packs |
| “We’ll wait for Microsoft/SAP Copilot.” | Fear, uncertainty | Copilot ≠ AP agent workforce KPI OS; ER remains ERP-agnostic design |
| “UiPath covers this.” | Feature fight | RPA builds bots; ER productises responsibility progression + exception/KPI OS for AP |
| “Free is enough.” | Pressure close | Free assesses; Starter proves one agent; Pro installs the OS |
| “Custom is expensive.” | Discount hastily | Custom starts **from $15,000** because facilitation and multi-entity design are delivery, not a PDF |

---

## 6. Success definition (customer language)

A successful Evidence Room engagement means:

1. At least one agent in production with **named** scope and evidence rules.  
2. Exceptions classified and routed — not only counted.  
3. KPI review cadence operating.  
4. A written rule for when responsibility **expands** or **contracts**.  
5. Audit can retrieve the trail.  
6. No claim that the AP stack was replaced.

---

## 7. Message hierarchy for this ICP

1. **Evidence over hype.**  
2. **AI that earns responsibility.**  
3. Governed agents. Measurable outcomes.  
4. Works across your AP stack — does not replace it.  
5. Industry benchmarks cited precisely; your results measured locally.

---

*Update this document when real win/loss interviews exist. Until then, do not fabricate quotes.*
