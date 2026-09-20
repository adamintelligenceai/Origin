# Market, competitor and gap brief
## Evidence Room — AP Agent OS · Research note · 20 September 2026

**Classification:** Internal. Customer-facing documents may cite ledger IDs, not this memo’s interpretive language.

---

## 1. What the market actually is

Three markets are being confused in public conversation. Evidence Room sells into only the third.

| Market | What buyers buy | Price band (directional) | Evidence Room relation |
|---|---|---|---|
| AP applications / ePayables | Capture, workflow, match, supplier portal, payments, master data | Mid-market roughly high-teens to mid-five figures USD/year; enterprise often mid-five to mid-six figures — secondary aggregators only, not official lists | Adjacent. Do not compete as software. |
| Invoice / IDP / RPA | Extraction, bots, document intake | Per-invoice or platform | Complementary. Deterministic capture remains preferable to an LLM for line math. |
| Agent operating model | How to design, govern, measure and promote AI workers on top of the stack the buyer already has | Digital product and productised service | **This is the white space.** |

Gartner’s March 2025 *Magic Quadrant for Accounts Payable Applications* (G00814856) defines the software market as cloud applications that process supplier invoices, facilitate payments and support supplier master data across one or more ERPs. That definition is useful because it shows what Evidence Room is *not*: it is not an AP application.

Public TAM figures for “AP automation” diverge sharply (FMI ~USD 3.4B in 2025; Mordor ~USD 6.94B in 2026; OG Analysis ~USD 6.4B in 2026). Treat these as estimator-firm ranges, never as a Gartner TAM, and do not put a single market-size number on a customer cover.

---

## 2. What the operating data says

Independent AP operations research still describes a function that is expensive, slow and exception-heavy:

- All-inclusive cost per invoice sits near **USD 9–10** in recent Ardent vintages (USD 9.40 in the 2024 State of ePayables; USD 9.87 in *AP Metrics that Matter 2024*; USD 9.84 in the 2026 Part Nine commentary).
- Best-in-class is **USD 2.78** versus **USD 12.88** for others (Ardent 2024).
- Cycle time: **9.15 days** (2024) / **8.2 days** (2026 commentary); Best-in-class **3.1 days**.
- Exception rate is reported as **14.0%**, **20.7%** or **18.4%** depending on vintage and cut. Customer copy must say “roughly one in seven to one in five invoices excepts” and cite the range — not a blended fake average.
- Straight-through processing remains about **one third** (32.6%, Ardent 2024).
- About **one fifth** of AP staff time goes to supplier inquiries (21.8–21.9%).
- IOFM (2025) warns that fully automated teams can still report **> USD 20** unit cost when volume does not support the stack. Automation is not automatically cheaper.

These numbers justify a product about *exceptions, controls and operating model*, not another “touchless AP” slogan.

---

## 3. What the AI data says — and what it does not

| Finding | Source | Implication for Evidence Room |
|---|---|---|
| 44% of CFOs used gen AI in 5+ use cases in 2025 (from 7%) | McKinsey, 102 CFOs | Experimentation is no longer rare. |
| 65% will increase gen AI investment | McKinsey | Budget exists; a toolkit can ride the spend. |
| 63% of finance teams have deployed AI; **only 21% report clear ROI**; **14%** have fully integrated agents | Deloitte Finance Trends 2026 | The commercial hole is *governed value*, not awareness. |
| AP is the most mature finance process for scaling AI (**33%** scaling) | Hackett 2026 | AP is the correct first vertical. |
| Finance workload +3.2% vs headcount −2.1% and budget −1.7% | Hackett 2026 | Leaders need capacity, not headcount theatre. |
| 71% say AI meets or exceeds finance ROI expectations, but only 23% say it *exceeds* | KPMG 2026 | Do not quote 71% as “AI pays.” |
| 67% already run AI in AP day-to-day | Forrester snapshot *commissioned by Basware* | Vendor-originated. Use only if flagged. Useful qualitatively: the question has moved from “whether” to “how far the agent may act.” |

McKinsey also describes agentic invoice-to-contract compliance as an *extension of existing automation*, not a replacement of it. That is the Evidence Room architecture: agents sit on top of rules, ERPs and AP platforms.

---

## 4. Competitor map (do not clone)

### 4.1 AP application vendors

| Vendor | What they actually sell | Common public claim pattern | Gap Evidence Room fills |
|---|---|---|---|
| Tipalti | Global AP + payments + tax/compliance workflows | Cross-border, supplier onboarding, touchless | No buyer-owned agent workforce design or earned-autonomy model |
| Coupa | Business spend / P2P suite | Spend control, community, intelligence | Suite gravity; not an OS for agents the customer designs |
| Basware | Network e-invoicing + AP | Compliance, capture, touchless | Deep network; thin independent governance kit |
| Esker | Document process automation | Capture + process automation | AI often a module, not an operating system |
| Medius | AP / spend with AI decisioning | “AI does the work” | Vendor-owned intelligence, not customer-owned agent charters |
| Stampli | Collaboration-centric AP | Conversation on the invoice | Strong collaboration; weak agent-responsibility framework |
| Yooz / AvidXchange / Bill / Ramp | Mid-market capture-to-pay | Speed, cards, SMB/MM simplicity | Wrong altitude for shared-services agent governance |
| HighRadius | Autonomous finance narrative | Agents that execute | Opposite risk: over-promises autonomy; Evidence Room sells earned responsibility |
| SAP / Oracle / Microsoft / Workday | ERP financials + growing AI features | Native process | Buyer still needs a cross-stack agent layer and control evidence |
| UiPath / Automation Anywhere | Platform for bots and now agents | Build anything | No AP operating model, taxonomy, or finance control pack |

**Price signals (secondary aggregators, 2026 — directional only, not list prices):** Stampli / Tipalti-class mid-market often discussed in the high-teens to ~USD 60k ACV; specialist per-invoice AI (e.g. Vic.ai-class commentary) discussed as dollars-per-invoice; Basware / Esker / HighRadius enterprise conversations often mid-five to high-five or six figures. Evidence Room at USD 79–499 (and USD 1.5–3k productised) is not a substitute purchase. It is the design and governance layer *before and during* those implementations.

### 4.2 Prompt packs, Notion templates, “AI for accountants” PDFs

Over-served: generic prompts, 10-page ebooks, Canva dashboards.  
Under-served: exception taxonomy, control matrix, shadow-mode methodology, promotion gates, payment-proposal *review* (not execution), statement reconciliation design, close completeness.

### 4.3 Consulting toolkits

Big Four and boutiques sell this as time. The gap is a *productised, ERP-agnostic, IP-clean, immediately usable* OS a transformation lead can buy on Friday.

---

## 5. Over-served vs under-served

**Over-served:** OCR accuracy theatre; “touchless” as a brand word; payment execution features; supplier-network scale stories; prompt lists.

**Under-served:**

1. Agent job descriptions with explicit exclusions.  
2. A responsibility model that starts at Observe.  
3. Promotion evidence — not a toggle labelled “autonomous.”  
4. Exception taxonomy a shared-services team can code to.  
5. Control matrix a Head of Controls will recognise.  
6. KPI families that separate activity from outcomes from risk.  
7. Shadow / historical test / pilot methods.  
8. Payment-proposal *analytical review* with human authorisation locked.  
9. Indirect prompt-injection as an AP control, not a blog scare.  
10. Monday-ready workshopware.

---

## 6. Strategic implication

The software vendors will keep adding “agents.” That does not close the gap. Buyers still lack an operating system for *which* agents exist, *what* they may do, *who* owns them, *how* they are measured, and *what evidence* is required before responsibility expands.

Evidence Room occupies that layer. AP is the first domain because it has the data, the exception physics, the control sensitivity, and — per Hackett — the highest AI scale maturity in finance.

---

## 7. Claims we will never make

- A single global AP automation TAM.  
- Guaranteed savings, STP, or fraud catch-rate.  
- That 67% (Basware-commissioned) is an independent Forrester market fact.  
- That Evidence Room posts invoices, changes bank details, or authorises payments.  
- That the toolkit is a substitute for SAP, Oracle, Coupa, Tipalti or internal audit.
