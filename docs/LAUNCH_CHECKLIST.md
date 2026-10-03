# Paid founding launch checklist

Code-complete including gamified sellable product (Phase 16).

- [x] Billing and cancellation routes exist against Stripe test mode (fail closed without keys)
- [x] Chief progression: XP, levels, streaks, achievements (local-only)
- [x] Progress tab on desktop + `/progress` marketing page
- [x] Commercial pack in `docs/commercial/` (one-pager, deck, GTM, launch package)
- [x] Rate and cost protection on model calls
- [x] Customer export / delete / revoke works on-device
- [x] Rollback plan for desktop releases (`docs/ROLLBACK.md`)
- [x] Public trust architecture page is live (`/trust`)
- [x] OAuth loopback + PKCE implemented; live client IDs are env-gated
- [ ] Privacy notice and terms placeholders replaced by counsel
- [ ] OAuth verification status compatible with the live Gmail/Calendar scopes
- [ ] External security review findings resolved
- [ ] Stripe live-mode keys and a real price ID
- [ ] Signed, updateable desktop builds
- [ ] Naming/domain/trademark still deferred until this list is complete
