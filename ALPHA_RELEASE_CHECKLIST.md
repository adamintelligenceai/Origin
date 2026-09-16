# Alpha release checklist

Every gate must be checked before inviting 5–10 people.

- [x] Privacy onboarding copy on first desktop launch (vault-backed)
- [x] Data-flow explainer on `/trust`
- [x] Local diagnostic export excludes content and secrets
- [x] Support process documented (`docs/SUPPORT.md`)
- [x] Incident runbook published internally
- [x] Usage/cost guardrails in ModelGateway
- [x] Activation metrics use the fixed telemetry enum only
- [x] Feature kill switches exist in the control plane
- [x] Google scopes have not been widened for onboarding convenience (`gmail.readonly` / `calendar.readonly` / `drive.readonly`)
- [x] No general-purpose web browser agent
- [x] Wipe, revoke and pairing recovery story disclosed
- [ ] Signed, updateable desktop builds
