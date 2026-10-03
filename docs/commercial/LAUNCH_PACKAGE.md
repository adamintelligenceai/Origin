# Launch Package — Sellable Gamified Product

This package is the **final commercial output** for founding cohort sales. Code-complete on branch `cursor/sellable-gamified-product-573f`.

## What shipped

### Product (end-to-end)

| Surface | Status | Notes |
|---------|--------|-------|
| Desktop personal node | ✅ | Today → Approve → Verified → Receipt + Progress tab |
| Mobile companion | ✅ | You tab shows Chief progression |
| Web control plane | ✅ | Waitlist, billing, trust, pricing, progress marketing |
| Gamification engine | ✅ | `@project-chief/gamification` — XP, levels, streaks, achievements |
| Stripe billing | ✅ | Test mode; fail-closed without keys |
| Local OAuth | ✅ | Google work + social (LinkedIn, Instagram, Facebook, X) |

### Gamification (sellable layer)

- **5 Chief levels** with XP progress bars
- **10 achievements** with unlock toasts on desktop
- **Daily streaks** with bonus XP
- **Weekly goal** (7 verified actions)
- **Progress route** on desktop + `/progress` marketing page
- **Private** — computed on device, no leaderboard

### Commercial assets

| Asset | Path |
|-------|------|
| Product one-pager | `docs/commercial/PRODUCT_ONE_PAGER.md` |
| Sales deck (10 slides) | `docs/commercial/SALES_DECK.md` |
| GTM playbook | `docs/commercial/GTM_PLAYBOOK.md` |
| Pricing & packaging | `docs/commercial/PRICING_AND_PACKAGING.md` |
| Landing page | `/` |
| Product page | `/product` |
| Progress page | `/progress` |
| Pricing page | `/pricing` |
| Waitlist | `/waitlist` |
| Billing | `/billing` |

## How to sell today

1. **Demo the loop** — Desktop app → approve one decision → show Verified + achievement toast → open Progress tab.
2. **Send the one-pager** — `docs/commercial/PRODUCT_ONE_PAGER.md` (export to PDF if needed).
3. **Close on founding pricing** — A$69/month, 14-day trial, first 100 users.
4. **Collect payment** — Stripe checkout via `/billing` (configure live keys).
5. **Onboard** — Privacy onboarding → connect sources → first verified action within 24h.

## External gates (not code blockers)

- [ ] Counsel-approved terms & privacy
- [ ] OAuth verification for live Gmail/Calendar scopes
- [ ] External security review
- [ ] Stripe live-mode keys + price ID
- [ ] Signed, updateable desktop builds
- [ ] Public brand name (deferred per `docs/NAME_LAST.md`)

## Quality verification

```bash
pnpm install
pnpm quality
```

All packages including `@project-chief/gamification` must pass typecheck, lint, and test.

## Revenue readiness

| Milestone | MRR @ A$69/user |
|-----------|-----------------|
| 10 users | A$690 |
| 25 users | A$1,725 |
| 50 users | A$3,450 |
| 100 users | A$6,900 |

See `docs/ECONOMICS.md` for spend unlock rules.
