# Pricing & Packaging — Project Chief

## Founding cohort (current)

| | |
|---|---|
| **Plan name** | Executive (Founding) |
| **Price** | A$69/month |
| **Trial** | 14 days |
| **Cap** | First 100 users lock founding price |
| **Free tier** | None (permanent) |

## What's included

- Desktop personal node (canonical runtime)
- Mobile companion (paired after device approval)
- Chief progression (XP, 5 levels, 10 achievements, streaks, weekly goal)
- Connections: Gmail, Calendar, Drive, Phone, SMS, LinkedIn, Instagram, Facebook, X
- Privacy center: export, wipe, revoke
- Content-blind billing & account on web control plane

## What's excluded (by design)

- Hosted connector aggregator
- Cloud storage of mail/document bodies
- Public leaderboard / social comparison
- Team/multi-seat admin (future tier)
- White-label / enterprise SSO (future tier)

## Unit economics (target)

| Cost bucket | Target |
|-------------|--------|
| AI + provider APIs | < A$10–15/user/month |
| Payment/platform | < A$5–8 |
| Infra allocation | < A$3–5 |
| **Total COGS** | **< 20% revenue** |

At A$69/month, target gross margin > 80% after model usage normalizes.

## Future tiers (post-founding)

| Tier | Indicative price | Adds |
|------|------------------|------|
| Executive | A$99/month | Standard list after founding cap |
| Team (5 seats) | A$399/month | Shared billing, per-seat nodes |
| Enterprise | Custom | SSO, audit export, SLA |

Do not launch Team/Enterprise until founding retention proves D30 > 40%.

## Stripe configuration

Environment variables (web control plane):

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID` — founding Executive plan
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Routes:

- `POST /api/v1/billing/checkout` — create session
- `POST /api/v1/billing/portal` — customer portal
- `POST /api/v1/billing/webhook` — entitlement sync

Fails closed without keys.

## Packaging for sales calls

**30-second pitch:**  
"A$69/month founding access. 14-day trial. Desktop node + mobile pair + Chief progression. No free tier — this is executive infrastructure, not a chat toy."

**Upgrade path:**  
Founding users keep A$69 for life of continuous subscription. Lapsed subscriptions rejoin at list price when founding cap is full.

## Refund policy (recommended)

- Trial: cancel anytime, no charge
- Post-trial: pro-rata credit on annual only (when annual plan launches)
- Founding: honor 14-day trial; case-by-case within 7 days of first charge for onboarding failures

Document final policy in terms (counsel review required).
