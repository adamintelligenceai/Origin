# Evidence Room — Information Architecture & Sitemap

**Document ID:** `08_WEBSITE/01_IA_AND_SITEMAP`  
**Version:** 1.0  
**Preferred domain:** `evidenceroom.ai` — **availability must be verified** before DNS and certificates.  
**Aesthetic:** Institutional research × Stripe discipline (see Brand System). No purple AI kitsch.

---

## 1. IA principles

1. **5-second clarity** on Home: what it is, who for, what it is not.  
2. **Brand first:** “Evidence Room” / Operating Evidence dominates first viewport — not a generic AI headline that could belong to anyone.  
3. **One job per page.**  
4. **Primary CTAs:** Assess Your AP Agent Readiness · Explore the AP Agent OS.  
5. **Legal drafts** reachable from footer; flagged for counsel review.

---

## 2. Sitemap

```
/ (Home)
├── /ap-agent-os          → Product overview + ladder
├── /diagnostic           → Free diagnostic
├── /professional         → US$199 deep dive
├── /team                 → US$499 deep dive
├── /custom-blueprint     → US$1,500–3,000 service
├── /method               → Observe→Expand methodology
├── /resources            → Content hub / samples
├── /about                → Brand & stance
├── /privacy              → Draft privacy
├── /terms                → Draft terms
├── /disclaimer           → Product disclaimer
├── /lp/ap-agent-os       → High-conversion landing
└── /thanks               → Post-checkout / post-diagnostic
```

**Footer links:** Privacy · Terms · Disclaimer · Licence summary · Refund policy · Contact

**Nav (primary):** Product · Diagnostic · Method · Resources · About | CTA buttons

---

## 3. Page → file map

| URL | Source file |
|---|---|
| `/` | `02_HOME.md` |
| `/ap-agent-os` | `03_AP_AGENT_OS.md` |
| `/diagnostic` | `04_FREE_DIAGNOSTIC.md` |
| `/professional` | `05_PROFESSIONAL.md` |
| `/team` | `06_TEAM.md` |
| `/custom-blueprint` | `07_CUSTOM_BLUEPRINT.md` |
| `/method` | `08_METHOD.md` |
| `/resources` | `09_RESOURCES.md` |
| `/about` | `10_ABOUT.md` |
| `/privacy` | `11_PRIVACY.md` |
| `/terms` | `12_TERMS.md` |
| `/disclaimer` | `13_DISCLAIMER.md` |
| `/lp/ap-agent-os` | `14_LANDING_PAGE_AP.md` |

---

## 4. Conversion routing

| Entry | Next best action |
|---|---|
| Cold LinkedIn | `/diagnostic` or `/lp/ap-agent-os` |
| Warm reader | `/professional` |
| Team language | `/team` |
| Complex estate | `/custom-blueprint` |
| Skeptical Controller | `/method` → `/diagnostic` |

---

## 5. Technical notes (non-binding)

- Static site or lightweight Next.js acceptable.  
- Checkout links out to Lemon Squeezy (MoR).  
- Forms: Diagnostic email capture on owned domain.  
- Analytics: privacy-respecting; document in Privacy draft.

---

*End of IA & Sitemap v1.0.*
