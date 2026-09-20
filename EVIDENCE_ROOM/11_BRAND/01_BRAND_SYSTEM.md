# Evidence Room — Brand System

**Document ID:** `11_BRAND/01_BRAND_SYSTEM`  
**Version:** 1.0  
**Aesthetic north star:** Institutional investment research × Bloomberg terminal clarity × Stripe product discipline × Linear interface restraint × Palantir operational gravity × McKinsey structural prose.  
**Hard exclusions:** Purple AI kitsch, neon brains, robot mascots, glassmorphism glow stacks, Inter/Roboto/Arial as brand faces, “revolutionary / magical / autonomous finance” copy.

---

## 1. Brand idea alternatives (evaluated)

| ID | Brand idea | Promise | Strength | Weakness | Score |
|---|---|---|---|---|---|
| A | **Control Tower** | See every AP agent from one vantage | Intuitive ops metaphor | Overused in SaaS; implies software monitoring product | 6.5 |
| B | **Chartered Agents** | Every agent holds a written charter before it acts | Strong governance signal | Narrow; sounds legalistic; underplays measurement & exceptions | 7.0 |
| C | **Responsibility Ledger** | Autonomy is earned and recorded | Differentiated; audit-native | “Ledger” collides with accounting noun; easy to confuse with GL | 7.5 |
| D | **Payables OS** | Operating system for AP agents | Clear category claim | Generic “OS” SaaS cliché; weak on evidence/audit emotion | 6.0 |
| E | **Operating Evidence** | Evidence is the operating principle — design, prove, then expand | Owns the product name; unifies controls + KPIs + method; institutional tone | Requires discipline to avoid sounding like a document archive | **9.0** |

### Winner: **E — Operating Evidence**

**Rationale**
1. Extends the existing product name (**Evidence Room**) into a usable idea: the room where operating evidence for AP agents is designed and kept.  
2. Aligns with buyer fear (audit, control, payment risk) better than “AI platform” language.  
3. Differentiates cleanly from stack vendors (features), RPA (bots), prompt packs (novelty), and consultancies (projects).  
4. Scales across tiers without changing personality — Free diagnostic through Blueprint.  
5. Visually supports an institutional research aesthetic rather than consumer AI chrome.

**Brand idea (locked):**  
> Evidence Room is where Finance builds **operating evidence** for AP agents — charters, controls, exception logic, KPIs, and earned responsibility — before autonomy expands.

---

## 2. Positioning statement

**For** Controllers, Heads of AP, Shared Services leaders, and Finance Directors in complex, ERP-backed organisations  
**Who** must adopt AI in Accounts Payable without surrendering control  
**Evidence Room** is the **AP Agent Operating System toolkit**  
**That** provides implementation-ready agent design, governance, exception taxonomy, KPI measurement, and a responsibility-earning methodology  
**Unlike** AP automation vendors, RPA platforms, prompt marketplaces, or consulting slide packs  
**Evidence Room** sells the portable operating layer that sits across any ERP or AP stack — not another system of record, and never autonomous payment software.

---

## 3. Messaging pillars

| Pillar | Executive line | Proof behaviour in product |
|---|---|---|
| **1. Operating system, not prompts** | Agents need jobs, owners, exclusions, and escalations. | 16-agent library; charters; RACI |
| **2. Responsibility is earned** | L0→L4. Full autonomy is never default. | Responsibility model; pilot gates |
| **3. Exception taxonomy as OS** | Exceptions are a system, not a backlog aesthetic. | Taxonomy, triage, root-cause agents |
| **4. Evidence before expansion** | If you cannot show who owned it and what changed, it does not scale. | KPI packs; audit evidence standards |
| **5. ERP-agnostic by design** | Useful across Dynamics, SAP, Oracle, NetSuite, Workday and peers. | Stack-neutral templates; no rip-and-replace |

---

## 4. Voice rules

**Be**
- Intelligent, concise, specific  
- Executive: short sentences, concrete nouns  
- Credible: attribute market claims; refuse invented stats  
- Calm under pressure: control language, not hype  

**Do**
- Prefer verbs of design and governance: define, charter, baseline, shadow, escalate, measure  
- Name artefacts: “Exception Triage Agent charter,” “L2 Prepare gate”  
- Use plain finance English  

**Do not**
- Promise guaranteed savings, fraud detection, compliance, accounting accuracy, or ROI  
- Anthropomorphise agents as colleagues who “care”  
- Use exclamation marks in product UI or covers  
- Write like a growth newsletter  

### Banned language

| Banned | Why | Prefer |
|---|---|---|
| Revolutionary / game-changing / magical | Hype | Specific capability |
| Autonomous AP / autonomous payments | Violates product identity | Human-authorised payments; earned responsibility |
| Guaranteed ROI / X% savings (unsourced) | Invented or misattributed outcomes | Sourced market context + measurement design |
| AI-powered (as decoration) | Empty | Name the agent and control |
| Seamless / frictionless | Untrue for controls work | Explicit gates; deliberate friction |
| Ninja / rockstar / hack | Unprofessional | Role titles |
| Disrupt / uber for X | Cliché | Operating layer / toolkit |
| Purple-brain / robot imagery copy | Aesthetic ban | Institutional descriptors |

---

## 5. Logo direction

**Mark concept:** A squared “room” frame — thin institutional rule — with a single vertical **evidence bar** (like a column in a table or a tick in a control register). Not a brain, shield-with-circuit, or chatbot bubble.

**Variants**
- **Primary:** Symbol + wordmark locked left  
- **Compact:** Symbol alone for favicon / app tile  
- **Inverse:** Symbol + wordmark on Ink (`#0B1220`)  
- **Monochrome:** Single-ink for print / fax / audit packs  

**Clear space:** Minimum padding = height of the capital **E** in the wordmark.  
**Minimum size:** Symbol 16px digital; wordmark not below 96px width.

**Do not:** Add gradients inside the mark, animate “neural” pulses, or place the mark on photography of robots.

---

## 6. Wordmark

**Lockup:** `EVIDENCE ROOM` in two words, tracking slightly open, all caps for covers; title case (`Evidence Room`) in body prose.

**Subtitle system (covers only, never louder than brand):**  
`AP Agent OS` · tier name in smaller weight (e.g. `Professional`).

**Incorrect:** EvidenceRoom (closed compound in display), evidence room (lowercase brand), ER alone as customer-facing brand.

---

## 7. Typography

Institutional pairing — **editorial serif for display**, **precise grotesque for UI/body**. Never Inter, Roboto, Arial, Helvetica Neue as brand defaults, or Comic/Display novelty faces.

| Role | Primary | Fallback stack | Notes |
|---|---|---|---|
| **Display / covers** | **Tiempos Headline** | `Tiempos Headline`, `Newsreader`, `Source Serif 4`, Georgia, serif | High-contrast editorial; used for H1 and cover titles |
| **Body / longform** | **Tiempos Text** | `Tiempos Text`, `Newsreader`, `Source Serif 4`, Georgia, serif | Research-memo readability |
| **UI / tables / labels** | **IBM Plex Sans** | `IBM Plex Sans`, `Source Sans 3`, `Segoe UI`, sans-serif | Tabular figures on; institutional not startup |
| **Data / mono** | **IBM Plex Mono** | `IBM Plex Mono`, `ui-monospace`, monospace | KPIs, IDs, ledger codes |

**Scale (desktop)**

| Token | Size / line | Weight |
|---|---|---|
| `--type-display` | 40/48 | Tiempos Headline 600 |
| `--type-h1` | 32/40 | Tiempos Headline 600 |
| `--type-h2` | 24/32 | Tiempos Headline 600 |
| `--type-h3` | 18/28 | IBM Plex Sans 600 |
| `--type-body` | 16/26 | Tiempos Text 400 |
| `--type-small` | 13/20 | IBM Plex Sans 400 |
| `--type-label` | 11/16 | IBM Plex Sans 600 · tracking 0.06em · uppercase |

---

## 8. Colour system

Institutional ink on paper. Single signal accent. No purple. No neon.

| Token | Hex | Role |
|---|---|---|
| **Ink** | `#0B1220` | Primary text, wordmark, rules |
| **Ink muted** | `#3A4458` | Secondary text |
| **Rule** | `#C9CED8` | Hairlines, table rules |
| **Paper** | `#F4F6F8` | Page background (cool paper — not cream cliché) |
| **Paper elevated** | `#FFFFFF` | Cards only when interaction requires containment |
| **Panel** | `#E8EDF2` | Section bands, cover fields |
| **Signal** | `#9C2B1F` | Alerts, exceptions, destructive — sparingly |
| **Measure** | `#1F4E79` | Links, selected states, chart primary series |
| **Positive** | `#2F5D50` | Favourable variance (never “AI green glow”) |
| **Caution** | `#8A6A1F` | Warnings, L3 gate notices |
| **Chart grid** | `#DDE2EA` | Plot grids |

**Atmosphere (allowed):** subtle horizontal rule fields, faint blueprint grid at 3–4% opacity, paper grain at very low opacity.  
**Forbidden:** purple→indigo gradients, meshed blob backgrounds, dark-mode-as-default marketing pages.

---

## 9. Iconography

- 1.25px stroke, square caps, no filled neon pictograms  
- Geometric, 24px grid  
- Prefer: charter document, gate, branch (exception), gauge, room frame  
- Avoid: robots, sparkles, brain chips, rockets  

---

## 10. Chart, table, callout, cover system

### Charts
- Single primary series in **Measure** (`#1F4E79`); comparison series in Ink muted  
- No 3D, no gradients in bars, no glow  
- Always source footnotes beneath charts that use Research Ledger data  
- Zero baseline for bar charts; label units  

### Tables
- Hairline rules in **Rule**; header row in **Panel**  
- IBM Plex Sans 13/20; numeric columns right-aligned with tabular lining figures  
- No zebra stripes unless table exceeds ~12 rows — then 3% Ink wash  

### Callouts
Four types only:

| Type | Left rule | Use |
|---|---|---|
| **Note** | Measure | Clarifying operating guidance |
| **Control** | Ink | Mandatory control / exclusion |
| **Exception** | Signal | Exception or risk callout |
| **Non-evidence** | Caution | Scenario numbers; must say NON-EVIDENCE |

### Covers
- Full-bleed **Ink** or **Paper** field — not stock photo collage  
- Brand wordmark top-left  
- One title (display serif)  
- One deck line  
- Tier + document ID bottom rule  
- No badges, stickers, or “AI powered” chips on the hero plane  

---

## 11. Motion (when UI exists)

Intentional, few:
1. Cover rule draws left→right 200ms  
2. Table row focus state fades 120ms  
3. Page section crossfade 180ms  

No bouncing CTAs, no particle fields.

---

## 12. Application checklist

- [ ] Brand idea “Operating Evidence” intact on first viewport  
- [ ] No banned language  
- [ ] Market stats attributed + ledger ID where relevant  
- [ ] Typography from approved stacks only  
- [ ] Colour tokens only from this system / `02_VISUAL_TOKENS.css`  
- [ ] Cover passes brand test: remove nav — still unmistakably Evidence Room  

---

*End of Brand System v1.0. Visual tokens implement this file in `02_VISUAL_TOKENS.css`.*
