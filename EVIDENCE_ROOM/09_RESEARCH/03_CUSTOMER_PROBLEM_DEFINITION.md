# Customer Problem Definition — Evidence Room AP Agent OS

**Linked:** Research ledger (Ardent benchmarks), competitor landscape (gap = agent governance), master brief (earn responsibility).

---

## 1. Ideal Customer Profile (ICP)

### Firmographic
| Attribute | Fit |
|---|---|
| **Size** | Mid-market to enterprise; typically enough invoice volume that AP cost and exceptions are material (exact volume is customer-specific — do not invent thresholds) |
| **Stack** | Already has or is buying AP automation / ERP / bill-pay (Coupa, Tipalti, SAP, Oracle, Medius, Stampli, Bill.com, Ramp, etc.) |
| **AI posture** | Experimenting with Copilot, ChatGPT Enterprise, vendor AI features, or RPA+LLM — or under pressure to “do AI in Finance” |
| **Control posture** | Has Internal Audit, SOX/ICFR concerns, or external auditor scrutiny — or anticipates it |
| **Geography** | English-first materials at launch; multi-entity / shared services especially strong |

### Strong-fit signals
- AP leadership can name exception types and pain with cycle time / rework  
- Prior automation left a **long tail of exceptions** (Ardent still shows average exception rates of **14.0%** in 2024 and **18.4%** in 2025 — external context, not the customer’s rate)  
- STP still far from Best-in-Class (Ardent 2024: average STP **32.6%** vs BiC **49.2%**)  
- Shadow AI already happening in email/Excel without policy  
- Transformation office wants AI use cases but Risk wants brakes  

### Poor fit
- Solo bookkeeper wanting cheap invoice OCR  
- Buyer seeking guaranteed fraud elimination or “autonomous pay”  
- No willingness to assign human owners or measure baselines  
- Pure prompt-curiosity with no AP process ownership  

---

## 2. Jobs to Be Done (JTBD)

### Primary JTBD
> When we introduce AI into Accounts Payable, help us decide what agents are allowed to do, what evidence they must leave, who is accountable, and how we expand responsibility only after proof — without replacing our AP/ERP stack.

### Related jobs
| Job | Success look |
|---|---|
| **Justify AI safely** | Steering committee pack with controls, not hype |
| **Cut exception chaos** | Clear taxonomy + agent assists with human decide |
| **Show Audit something real** | Trace, RACI, promotion log |
| **Measure honestly** | Baselines vs Ardent context; no fake ROI |
| **Scale beyond hero users** | Team licence, shared playbooks |
| **Avoid vendor lock-in narrative** | Stack-agnostic OS |

---

## 3. Problem inventory mapped to AP lifecycle

Use this inventory in Process_Mapping and Agent_Library. Severity is typical for ICP — always validate per customer.

| Lifecycle stage | Problems (inventory) | Agent temptation (risky if ungoverned) | Evidence Room response |
|---|---|---|---|
| **1. Supplier / master data** | Duplicate suppliers; incomplete tax/bank data; slow onboarding | Auto-edit vendor master | Observe/recommend only until dual control; red-flag checklist |
| **2. Invoice capture / intake** | Multi-channel intake; poor image quality; missing PO | “Just post it” from LLM read | Draft coding packs; no silent post |
| **3. PO match / coding** | Non-PO spend; coding disputes; GL miscodes | Autocode to close the month | Recommend + confidence notes; human post |
| **4. Validation / business rules** | Policy exceptions; tolerance breaches | Bypass rules to raise STP | Rules are gates; agents explain breaches |
| **5. Exception handling** | High touch; email ping-pong; unclear ownership | Agent emails suppliers unsupervised | Draft → human send; exception taxonomy |
| **6. Approval workflow** | Approver lag; unclear SoD; mobile rubber-stamping | Auto-approve low value | Never own approval authority by default |
| **7. Fraud / anomaly review** | Invoice fraud, bank-change social engineering | “AI fraud score = safe” | Aid checklists only; no guaranteed detection (disclaimer) |
| **8. Payment run** | Wrong bank details; duplicate pay; early-pay misses | Agent releases payment | Out of band for earn-up until extreme maturity; dual control |
| **9. Supplier inquiries** | Status spam; remittance confusion | Unreviewed agent replies | Draft responses; tone/policy pack |
| **10. Close / reporting / audit** | Weak evidence; tribal knowledge | Chat logs as “controls” | Evidence Room artifacts, KPI pack, test scripts |
| **11. Continuous improvement** | No baseline; vanity AI demos | Declare victory on anecdotes | KPI Measurement + Ardent context + illustrative models labeled |

**External pressure (sourced context, not customer metrics):**  
Ardent *State of ePayables* shows persistent cost and performance dispersion — e.g., 2025 average cost/invoice **$9.84**, BiC **$2.65** vs All Others **$12.42**; 2024 cycle time **9.15 days** (2025 **8.2 days**). Buyers feel this gap; Evidence Room does not claim to close it automatically.

**Market direction (qualitative):** Forrester’s *What's New For AP Invoice Automation In 2026* notes vendors deploying agentic capabilities for exception handling, fraud detection, and supplier management — increasing urgency for **governance**, not only features.

---

## 4. Buying committee

| Role | What they fear | What they need to see | Objection we pre-empt |
|---|---|---|---|
| **CFO / VP Finance** | Money lost; weak ROI story; audit letter risk | Honest business case (illustrative + baselines); control narrative | “Another AI toy” |
| **Controller** | Control failure; SOX narrative broken | RACI, promotion gates, test scripts | “Who owns the agent’s mistake?” |
| **AP Director / Manager** | More work, unclear tools, exception pile | Practical agent library, templates, starter path | “We don’t have time for a framework” |
| **Procure-to-Pay / Procurement** | Policy bypass; supplier friction | Policy-aligned drafts; PO-link awareness | “AI will ignore procurement rules” |
| **Internal Audit / Risk** | Uncontrolled GenAI; evidence gaps | Disclaimers + evidence design + demotion paths | “Is this audit-ready or theater?” |
| **IT / Security** | Shadow IT; data leakage; identity | Prompt hygiene, tool boundaries, Team rollout notes | “Not approved software” |
| **Shared Services lead** | Inconsistent practice across teams | Team licence, playbooks, KPI alignment | “Won’t scale past one hero” |
| **External auditor** (influencer) | Inability to explain AI role | Clear human accountability statements | Soft influence via Controller pack |

**Champion path that works:** AP Director + Controller co-sponsor → CFO air cover → IT informed → Audit preview before wide earn-up.

---

## 5. Objections & response patterns

| Objection | Weak response (avoid) | Evidence Room response |
|---|---|---|
| “We already bought Coupa/Tipalti/Medius.” | “We’re better automation.” | “Keep it. We govern agents around it.” |
| “Our vendor’s new AI is enough.” | Feature war | “In-suite AI still needs earn-up, evidence, and human owners — especially across email/RPA/Copilot.” |
| “Show me guaranteed savings.” | Fake % | “No guarantees. Here’s Ardent context + an **illustrative** model you populate with your baselines.” |
| “AI will hallucinate.” | “Our prompts are magic.” | “That’s why Observe→Recommend→Draft precedes Execute; shadow mode and tests are in the pack.” |
| “Audit will hate this.” | “AI is the future.” | “Bring Audit the Evidence Room: RACI, traces, promotion log, disclaimers.” |
| “Isn’t this just prompts?” | Upsell jargon | “Prompts are one artifact. The product is the operating model.” |
| “We’ll build it ourselves.” | Fear | “You can. Pro/Team compresses months of design into a finance-native OS — still your ownership.” |
| “Legal/compliance risk.” | Ignore | Point to disclaimers, licence limits, privacy notes; escalate Custom Blueprint if needed |
| “Price vs consulting.” | Discount panic | Productized ladder vs workshop burn; Custom exists when warranted |
| “Market is huge / everyone automates.” | Grand View TAM slide | Avoid over-claim; methodology varies; stay on buyer problem |

---

## 6. Problem → SKU mapping

| Problem cluster | First SKU | Escalation |
|---|---|---|
| “Are we ready for AP AI?” | Free Readiness | Starter |
| “Need one governed pilot.” | Starter | Pro |
| “Need full OS + business case + KPIs.” | Pro | Team |
| “Shared services / multi-team consistency.” | Team | Custom |
| “Regulated / complex multi-ERP.” | Custom Blueprint | (services boundary) |

---

## 7. Outcome language (allowed vs banned)

**Allowed (honest):**
- Design agents that earn responsibility  
- Reduce ambiguity about AI authority in AP  
- Improve readiness for Audit conversations about GenAI  
- Help teams measure baselines against published Ardent benchmarks (context)  

**Banned:**
- Guarantee cost/invoice → BiC ($2.65 / $2.78)  
- Guarantee fraud prevention  
- “Autonomous AP replacing your team”  
- Unsourced “companies save 70%” style claims  

---

## 8. Insight statement (internal)

AP teams are being asked to adopt agentic AI (vendor roadmaps and analyst blogs both point that way) while Ardent’s published averages still show **high cost dispersion**, **material exception rates**, and **minority STP**. The painful job is not “get another model.” It is **install a responsibility economy** for agents before autonomy outruns controls. Evidence Room sells that operating system.

---

*Owns problem definition: Product + Research. Validate with 5–10 buyer conversations before major copy freezes; do not invent interview stats.*
