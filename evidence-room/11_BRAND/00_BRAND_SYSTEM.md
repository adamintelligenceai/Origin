# Brand System — Evidence Room

## Brand idea evaluation

Evaluate six candidates for the primary brand idea (philosophy line that governs design, voice, and claims discipline). Score: Fit to product (0–5), CFO trust (0–5), Differentiation (0–5), Visual lockup strength (0–5).

| # | Brand idea | Fit | Trust | Diff | Lockup | Notes |
|---|---|---|---|---|---|---|
| 1 | **Evidence over hype** | 5 | 5 | 5 | 5 | Direct product-name lock; anti-vendor-ROI posture; works on covers and legal |
| 2 | **AI that earns responsibility** | 5 | 5 | 4 | 4 | Excellent for Controllers/Audit; slightly longer; strong secondary line |
| 3 | **Governed agents. Measurable outcomes.** | 5 | 5 | 4 | 5 | Precise category promise; reads as dual tagline; slightly “feature-list” |
| 4 | **From workflow to workforce.** | 3 | 3 | 3 | 3 | Clever; risks implying headcount replacement — hostile to AP buyers |
| 5 | **Receipts for every agent action.** *(new)* | 4 | 5 | 4 | 4 | Concrete metaphor; may feel narrow/ops-only for homepage hero |
| 6 | **The control room for AP automation.** *(new)* | 4 | 4 | 3 | 3 | Spatial metaphor fits “Room”; overlaps IT “control plane” jargon |

### SELECTED PRIMARY: **Evidence over hype**

**Rationale**

1. **Name-product unity:** The brand *is* an evidence room; the idea restates the product without jargon.
2. **Category foil:** Prompt packs and vendor AI decks are “hype”; Evidence Room’s Research Ledger and disclaimers are the operating contrast.
3. **Institutional tone:** Reads like Bloomberg/McKinsey discipline, not “AI robot” consumer SaaS.
4. **Claim hygiene:** Forces GTM to refuse unverified savings/fraud/compliance/ROI — brand idea = compliance mechanism.
5. **Lockup:** Short enough for covers, tabs, and Lemon Squeezy titles.

**Supporting lines (not primary):**

- Sub-idea / product line: *Governed agents. Measurable outcomes.*
- Responsibility line (Audit decks): *AI that earns responsibility.*
- Metaphor (ops docs): *Receipts for every agent action.*

**Rejected for primary:** #4 (workforce optics). #6 kept as optional spatial metaphor in diagrams only.

---

## Visual direction

**References (steal discipline, not logos):** Bloomberg Terminal density-with-clarity · Stripe documentation calm · Linear product precision · Palantir operational seriousness · McKinsey slide hierarchy.

**Explicit bans**

- Purple / indigo “AI” gradients
- Robot / neural-net mascots
- Glow orbs, glassmorphism stacks
- Rounded-full pill forests
- Inter / Roboto / Arial / system-ui as brand fonts
- Warm-cream + terracotta “AI brochure” cliché
- Broadsheet hairline newspaper pastiche

**Atmosphere:** Cool institutional — graphite, paper white, one decisive signal color (teal-ink), sharp type, charts that look like diligence memos.

---

## Color system (CSS variables)

```css
:root {
  /* Surfaces */
  --er-bg: #0b0e11;           /* near-black graphite — dark covers / terminal moments */
  --er-bg-elevated: #14191f;
  --er-paper: #f4f6f8;        /* cool paper — default light surfaces */
  --er-paper-2: #e8ecf0;
  --er-white: #ffffff;

  /* Ink */
  --er-ink: #0b0e11;
  --er-ink-muted: #3d4754;
  --er-ink-subtle: #6b7685;
  --er-ink-inverse: #f4f6f8;

  /* Signal (one accent — “verification teal”) */
  --er-signal: #0f6e6a;
  --er-signal-hover: #0c5855;
  --er-signal-soft: #d7efed;

  /* Data / status */
  --er-positive: #1f6b3a;
  --er-negative: #9b1c1c;
  --er-warning: #8a6a12;
  --er-info: #1c4d7a;

  /* Structure */
  --er-rule: #c5ced8;
  --er-rule-strong: #0b0e11;
  --er-focus: #0f6e6a;

  /* Charts */
  --er-chart-1: #0f6e6a;
  --er-chart-2: #1c4d7a;
  --er-chart-3: #5c6570;
  --er-chart-4: #8a6a12;
  --er-chart-grid: #dbe1e8;
}
```

**Usage rules**

- Light product/docs: `--er-paper` background, `--er-ink` text, `--er-signal` for CTA/links only.
- Dark covers / hero bands: `--er-bg` with `--er-ink-inverse`; signal reserved for one underline or data callout.
- Never use signal as large fill backgrounds on marketing heroes (keeps institutional, not “teal SaaS blob”).

---

## Typography

| Role | Font | Fallback stack | Notes |
|---|---|---|---|
| **Display / brand** | **Newsreader** | `Newsreader, "Source Serif 4", Georgia, serif` | Literary-institutional; Evidence Room wordmark |
| **UI / body** | **IBM Plex Sans** | `"IBM Plex Sans", "Source Sans 3", sans-serif` | Engineered clarity; tables & product |
| **Data / mono** | **IBM Plex Mono** | `"IBM Plex Mono", ui-monospace, monospace` | Claim IDs, KPIs, ledgers, code |

**Scale (desktop)**

| Token | Size / leading | Use |
|---|---|---|
| `--er-display` | 48–64 / 1.05 | Cover titles, hero brand |
| `--er-h1` | 32–40 / 1.15 | Section titles |
| `--er-h2` | 24–28 / 1.2 | Subsections |
| `--er-body` | 16–18 / 1.55 | Prose |
| `--er-small` | 13–14 / 1.45 | Captions, table meta |
| `--er-mono` | 13 / 1.4 | Claim IDs, metrics |

**Rules:** Max one display face per viewport. No Inter. Tracking on wordmark: slight positive (+0.02em) in caps small-label contexts only; title case for primary wordmark.

---

## Logo / wordmark

**Primary wordmark:** `Evidence Room` in Newsreader, title case, two words, no icon mandatory.

**Optional mark (app/favicon):** Abstract “room frame” — four hairline corners forming an open rectangle with a single horizontal rule (the “evidence shelf”). Monochrome. No eye, no shield, no robot, no sparkles.

**Lockups**

| Context | Treatment |
|---|---|
| Cover | Wordmark + primary idea underneath in Plex Sans: *Evidence over hype* |
| Product UI | Compact wordmark or frame mark + “Evidence Room” |
| Lemon Squeezy | Wordmark + SKU name (`AP Agent OS Pro`) |
| Partner / embed | Frame mark alone at ≥16px |

**Clear space:** Height of the capital “E” on all sides.

---

## Chart, table, and callout styles

### Tables

- Header: Plex Sans medium, `--er-ink`, bottom rule `--er-rule-strong` 1.5px.
- Rows: hairline `--er-rule`; zebra optional with `--er-paper-2` at 40% — never heavy cards.
- Numeric columns: Plex Mono, right-aligned.
- Claim ID column: mono + signal color on the ID only.

### Charts

- No 3D, no gradients in series fills.
- Grid: `--er-chart-grid` only; axis labels `--er-ink-subtle`.
- One accent series in `--er-chart-1`; secondary comparison in `--er-chart-2`.
- Always source footnote under chart (“Secondary citation — see Claim C-AP-101”).

### Callouts

| Type | Style |
|---|---|
| **Evidence** | Left 3px `--er-signal` bar; label `EVIDENCE` in mono caps |
| **Vendor claim** | Left bar `--er-ink-subtle`; label `VENDOR` |
| **Framework (not evidence)** | Left bar `--er-warning`; label `FRAMEWORK` |
| **Disclaimer** | Full-width top rule; body `--er-ink-muted`; no icon |

---

## Cover system

**Formats:** 16:9 deck · A4/Letter report · Square social · Lemon Squeezy thumbnail.

**Layout (all covers)**

1. Top: wordmark (small).
2. Center-left: document title in Newsreader.
3. Under title: primary idea *Evidence over hype* (Plex Sans).
4. Bottom meta row: SKU · version · date · `CONFIDENTIAL` or `PUBLIC` — mono.
5. Background: either flat `--er-bg` with one thin signal underline under title, **or** `--er-paper` with a single full-bleed graphite band (top 28%). No photography of robots; optional abstract shelf-line diagram only.

**Series codes on covers:** `ER-RES` research · `ER-BRD` brand · `ER-PRO` product · `ER-SAL` sales.

---

## Motion (when UI exists)

Intentional, sparse:

1. Cover meta row fades in after title (120–180ms).
2. Evidence callout bar draws left-to-right once.
3. Table rows settle with 1px rule — no bounce.

No particle fields, no gradient shifts.

---

## Voice (brand-level)

- Prefer verbs of verification: *measure, assign, control, baseline, cite*.
- Ban: *revolutionary, magical, autonomous finance guaranteed, eliminate fraud*.
- Numbers require Claim IDs or Framework labels.

Full messaging: `01_MESSAGING_HOUSE.md`.
