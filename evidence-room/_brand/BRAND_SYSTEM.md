# Brand System — Evidence Room

**Version:** 1.0.0 · **Date:** 2026-03-20  
**Status:** Locked for suite production  

---

## 1. Brand idea evaluation

Five alternatives scored 1–5 on: ICP fit, distinctiveness, evidence discipline, longevity, anti-hype. Max 25.

| # | Brand idea | ICP fit | Distinct | Evidence | Longevity | Anti-hype | Total | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | **Evidence over hype.** | 5 | 5 | 5 | 5 | 5 | **25** | **Selected** |
| 2 | Control is the product. | 4 | 4 | 3 | 4 | 4 | 19 | Strong runner-up; narrower emotionally |
| 3 | Responsibility, measured. | 5 | 4 | 4 | 4 | 5 | 22 | Informs tagline; less complete as brand idea |
| 4 | The quiet AP transformation. | 3 | 3 | 2 | 3 | 4 | 15 | Soft; risks under-selling governance depth |
| 5 | Autonomous AP, assured. | 3 | 2 | 1 | 2 | 1 | 9 | Rejected — “autonomous” conflicts with earned responsibility |

**Selected brand idea:** Evidence over hype.

**Why it wins:** Matches Controller/Audit language, forbids invented metrics, differentiates from prompt-marketplace and “AI magic” vendors, and scales from Free through Custom without tone drift.

---

## 2. Selected system (locked)

| Element | Lock |
|---|---|
| Brand idea | **Evidence over hype.** |
| Product name | Evidence Room — AP Agent OS |
| Positioning | The operating system for building, governing and scaling AI agents across Accounts Payable. |
| Primary tagline | **AI that earns responsibility.** |
| Supporting line | Governed agents. Measurable outcomes. |
| Category phrase | Agent operating system for Accounts Payable |
| Anti-category | Not an AP suite. Not a prompt pack. Not ERP. |

### Tagline notes

Evaluated alternatives (see Master Prompt): “Automate AP with confidence,” “The AP agent control plane,” “Stop guessing. Start proving.” Primary and supporting lines above are final for v1.0.0.

---

## 3. Voice and tone

### Voice attributes

| Attribute | Do | Don’t |
|---|---|---|
| Institutional | Speak like a Controller’s brief | Startup pep |
| Specific | Name stages, roles, thresholds | “Seamless,” “next-gen,” “revolutionary” |
| Measured | Cite ledger IDs / report years | Orphan percentages |
| Calm | Steady verbs: design, govern, measure, promote | Hype verbs: unleash, disrupt, supercharge |
| Honest | “Works across your stack” | “Replaces Coupa/Tipalti/…” |

### Writing rules

1. Lead with the decision or definition; evidence follows.  
2. Prefer short sentences for rules; longer for explanation.  
3. One claim per sentence when citing Ardent or Lemon Squeezy.  
4. No exclamation marks in product covers or executive briefs.  
5. No emojis in commercial artefacts.  
6. Oxford comma; en dashes for ranges (50–80%).  
7. Spell out Accounts Payable on first mention per page; then AP.

### Sample lines

- **Good:** “Agents earn responsibility when KPI thresholds hold for a defined period.”  
- **Bad:** “Our AI unlocks transformative AP automation overnight!”  
- **Good:** “Ardent Partners (2025) reports peer STP at 35.4% and Best-in-Class at 51.0%.”  
- **Bad:** “Customers see ~50% STP lifts.”  

---

## 4. Colour system

Institutional palette. **No purple. No neon glow. No dark-mode-as-default marketing.**

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0B1F33` | Primary text, covers, rules |
| `paper` | `#F7F4EF` | Page background, PDF field |
| `signal` | `#1F6F78` | Links, primary CTA, positive signal, charts (series 1) |
| `caution` | `#C47E2B` | Warnings, watch metrics, amber callouts |
| `critical` | `#9B2C2C` | Errors, hard stops, critical exceptions |
| `rule` | `#D9D2C7` | Hairlines, table rules (derived from paper family) |
| `muted` | `#5C6B76` | Secondary text (ink at reduced emphasis) |

### Usage ratios (covers)

- Field: ~70% `paper`  
- Type/marks: ~20% `ink`  
- Accent: ≤10% `signal`  
- `caution` / `critical`: functional only — never decorative floods  

### Forbidden

- Purple / violet / indigo brand accents  
- Gradient meshes as primary identity  
- Glow, glassmorphism, rainbow AI tropes  

---

## 5. Typography

| Role | Family | Weight | Notes |
|---|---|---|---|
| Display / covers | **Fraunces** | SemiBold–Bold | Expressive serif; optical size for titles |
| Body / long form | **Source Serif 4** | Regular / Semibold | Executive reading; high legibility in PDF |
| Data / KPIs / tables / code-like IDs | **IBM Plex Mono** | Regular / Medium | Metrics, ledger IDs, agent IDs, filenames |

### Type scale (print / PDF guidance)

| Style | Size | Family |
|---|---|---|
| Cover title | 42–56 pt | Fraunces |
| Section H1 | 28–32 pt | Fraunces |
| H2 | 18–20 pt | Fraunces or Source Serif 4 Semibold |
| Body | 11–12 pt | Source Serif 4 |
| Caption / source | 8–9 pt | Source Serif 4 |
| KPI figure | 24–36 pt | IBM Plex Mono |
| Table | 9–10 pt | IBM Plex Mono or Source Serif 4 |

Web may use the same stack via licensed or open-source distributions; fall back to Georgia → Source Serif 4 body only if Fraunces unavailable — never to Inter/Roboto/Arial as brand defaults.

---

## 6. Logo and wordmark direction

### Wordmark

- Primary: **Evidence Room** in Fraunces, title case, tracking slightly tight.  
- Product lockup: Evidence Room + small caps or mono line **AP AGENT OS**.  
- Do not invent a mascot. Do not use neural-net node clouds.

### Mark (optional seal)

- Simple rectangular **seal**: thin `ink` rule on `paper`, centred initials **ER** in Fraunces, or a minimal balance-scale abstract reduced to two horizontal rules (evidence / claim).  
- Clear space: ≥ height of the “E” on all sides.  
- Minimum digital width: 120 px for wordmark; seal 24 px.

### Incorrect usage

- Outline glow, gradient fill, purple variants  
- Placing mark on busy photography without scrim  
- Stretching Fraunces optically  

---

## 7. Cover system

All paid and free PDFs / Markdown exports that ship as “covers” follow:

1. Full-bleed `paper` field (or `ink` inverse for executive-only packs — Team Executive only).  
2. Top-left: wordmark.  
3. Centre-left: Fraunces title (one line if possible).  
4. One supporting sentence (Source Serif 4).  
5. Bottom: tier label + version + date in IBM Plex Mono.  
6. Optional thin `signal` rule (1 pt) under title — not a card.  
7. No hero stock photos of robots or glowing dashboards.  
8. Source line on research covers: report name + year.

See `_brand/VISUAL_LANGUAGE.md` for templates.

---

## 8. Chart, table, and callout styles

### Charts

- Background: `paper`  
- Axes and grid: `rule`  
- Series 1: `signal`  
- Series 2: `ink`  
- Series 3: `caution` (sparingly)  
- **Every chart** carries source + year in caption (IBM Plex Mono 8–9 pt or Source Serif caption).  
- No 3D. No stacked glitter. BIC vs peer charts must label cohorts explicitly (e.g. peer cost $9.84 vs BIC $2.65 — Ardent 2025).

### Tables

- Header row: `ink` text on `paper`, bottom rule 1.5 pt `ink`  
- Body rules: 0.5 pt `rule`  
- Numeric columns: IBM Plex Mono, right-aligned  
- First column: Source Serif 4  

### Callouts

| Type | Border / accent | Use |
|---|---|---|
| Evidence | Left rule `signal` 3 pt | Ledgered fact |
| Caution | Left rule `caution` 3 pt | Risk, watch metric |
| Critical | Left rule `critical` 3 pt | Hard stop / non-negotiable |
| Note | Left rule `muted` 2 pt | Process tip |

Callout title in Fraunces or Semibold Source Serif; body Source Serif 4. Never purple left bars.

---

## 9. Application checklist

Before shipping any artefact:

- [ ] Brand idea or tagline present where a cover exists  
- [ ] Colours within token set  
- [ ] Fraunces / Source Serif 4 / IBM Plex Mono only for brand surfaces  
- [ ] Numeric claims ledgered  
- [ ] No purple, glow, or robot stock  

---

*Brand changes require Master Prompt amendment and a VERSION_HISTORY entry.*
