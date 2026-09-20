# Process Discovery Toolkit

**Evidence Room — AP Agent OS Pro**  
**Document type:** Toolkit  
**Use with:** `METHODOLOGY_10_STEPS.md`, `Templates/PROCESS_DISCOVERY_TEMPLATE.md`

---

## 1. Purpose

Provide practical instruments to discover how AP actually works — including shadow processes — so agents are designed against reality, not the happy-path SOP on the shelf.

---

## 2. Discovery instruments

### 2.1 SIPOC (Supplier–Input–Process–Output–Customer)

| Element | Prompt questions |
|---|---|
| Suppliers | Who sends invoices? Which portals? Shared mailboxes? |
| Inputs | PDF, XML, PO, GR, contracts, tax IDs, statements |
| Process | What are the 7–15 major steps end-to-end? |
| Outputs | Posted invoice, payment proposal, exception case, credit note |
| Customers | Internal (buyers, controllers) and external (suppliers) |

### 2.2 Volume–mix–value cube

Pull (illustrative minimum):

- Monthly invoice count; PO vs non-PO  
- Exception count by crude reason  
- $ distribution (P50/P90 invoice value)  
- Top 20 vendors by volume and by exception rate  
- Entity split  

### 2.3 Time-and-motion light

For 8–12 cases across happy path and exceptions, record: timestamps, systems touched, waits, rework loops. Prefer system timestamps over memory.

### 2.4 Interview guides

**AP Specialist (45 min)**  
1. Walk me through yesterday’s hardest exception.  
2. Which spreadsheets do you trust more than the ERP?  
3. When do you bypass the “official” path?  
4. What do suppliers get wrong most often?  
5. What would you never let a bot do?

**AP Manager (45 min)**  
1. Where does ageing hide?  
2. Which KPIs are gamed?  
3. What did the last audit find?  
4. Who truly owns PO quality and GR timely posting?  
5. What autonomy would frighten you?

**Controller (30 min)**  
1. Materiality thresholds and DOA pain points  
2. Entity and tax non-negotiables  
3. Evidence expectations for auditors  
4. Appetite for L2/L3  

**Procurement / Operations (30 min)**  
1. PO discipline reality  
2. GR incentives/blockers  
3. Willingness to close the loop on defects  

### 2.5 Artefact collection checklist

- [ ] Current SOPs (even if outdated)  
- [ ] DOA / approval matrix  
- [ ] Tolerance policies (price/qty)  
- [ ] Vendor master change procedure  
- [ ] Payment calendar and proposal screenshots  
- [ ] Prior audit findings (AP-relevant)  
- [ ] Exception mailbox rules  
- [ ] Sample invoices (redacted) across failure modes  

### 2.6 Data pull requests (to IT/ERP)

| Pull | Purpose |
|---|---|
| Invoices prior 3–6 months with status dates | Cycle time baseline |
| Exception / hold codes if exist | Taxonomy seed |
| GR posted after invoice date analysis | GR-missing pattern |
| Duplicate payment incidents history | Risk baseline |
| Vendor bank changes prior 12 months | Fraud control design |

Label gaps explicitly when pulls are incomplete.

### 2.7 Control walkthrough

Pick 5 material payments and trace: invoice → match → approve → propose → release. Note evidence present/absent. This becomes the audit spine for agent logging requirements.

### 2.8 Pain-priority matrix

Score each pain 1–5 on: volume, $ impact, audit risk, feasibility (data/API), political difficulty.

Prioritize **high impact × high feasibility** for first agent — not the most glamorous AI demo.

---

## 3. Workshop formats

| Workshop | Duration | Outcome |
|---|---|---|
| As-is mapping | 2–3 hrs | Swimlane draft |
| Exception coding | 90 min | Taxonomy coverage on samples |
| Human vs agent | 90 min | Split table |
| Risk & stop conditions | 60 min | Kill-switch + fences draft |

Facilitation tips: park solutioning; timebox; capture parking lot; photograph whiteboards into the discovery pack.

---

## 4. Discovery anti-patterns

- Designing prompts before seeing exceptions  
- Trusting vendor demo volumes as your baseline  
- Ignoring non-PO and credit notes  
- Letting IT define business ownership  
- Skipping Treasury on payment-adjacent agents  
- Treating “we’re already automated” as STP without definition  

---

## 5. Discovery pack index (deliverable)

1. Scope & owners  
2. SIPOC  
3. Volume–mix–value  
4. As-is map  
5. Exception sample coding  
6. Touchpoint matrix  
7. Control walkthrough notes  
8. Pain-priority matrix  
9. Open questions  
10. Recommended first agent + rationale  

Store under implementation workspace; link from agent charter.

---

## 6. Related documents

- `METHODOLOGY_10_STEPS.md`  
- `Templates/PROCESS_DISCOVERY_TEMPLATE.md`  
- `EXCEPTION_TAXONOMY.md`  
- `Templates/MEETING_GUIDE.md`
