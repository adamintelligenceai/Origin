# Project Chief — Founder Build Pack

Internal codename only. **Do not choose the public brand/domain until the product and trust architecture are locked.**

Project Chief is a local-first Personal Chief of Staff for high-agency professionals. It observes connected sources, detects commitments and risks, prepares decisions, executes only within explicit permission boundaries, verifies external state, and records an auditable local receipt.

## Product promise

**Working copy only:**  
"A private Chief of Staff that sees what needs doing, gets your approval, and carries the work through."

## Non-negotiable architecture invariant

**The service cloud must not require the contents of a user's life to operate the core product.**

Personal email content, documents, Life Graph, commitments, preferences, prompts, model responses and action payloads belong on user-controlled devices. Cloud services are restricted to account, entitlement, billing, device public-key directory, push routing identifiers, release configuration and content-free telemetry.

## What is in this pack

- `docs/MASTER_BLUEPRINT.md` — product + company blueprint
- `docs/ARCHITECTURE.md` — system design and trust boundaries
- `docs/SECURITY_MODEL.md` — security requirements and launch gates
- `docs/DATA_MODEL.md` — canonical local schemas
- `docs/UX_SPEC.md` — desktop/mobile/web experience
- `docs/CURSOR_PROMPTS.md` — phase-by-phase copy/paste Cursor prompts
- `docs/AI_TEAM_PROMPTS.md` — Grok / Claude / Gemini / ChatGPT review roles
- `docs/LAUNCH_RUNBOOK.md` — dogfood → alpha → paid launch
- `docs/MARKETING_TOOLKIT.md` — positioning, landing page, demos, acquisition
- `docs/ECONOMICS.md` — bootstrap economics and guardrails
- `docs/NAME_LAST.md` — naming process deliberately deferred
- `apps/*` — starter application shells
- `packages/*` — reusable trust/runtime packages

## First 30 minutes

1. Install Node 22+, pnpm, Rust stable, Git, Android Studio, Xcode if building iOS/macOS.
2. Open this folder in Cursor.
3. Read `docs/MASTER_BLUEPRINT.md`.
4. Paste **Phase 0** from `docs/CURSOR_PROMPTS.md` into Cursor Agent.
5. Let Cursor inspect the repo and update versions from official package metadata.
6. Run the quality gates after every phase.

## Important

This is a production-oriented starter and blueprint, **not a completed security audit**. Never put real third-party user data into a build until the security gates in `docs/SECURITY_MODEL.md` pass.
