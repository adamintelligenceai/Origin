# Decisions

Conflicts with `docs/BLUEPRINT.md` and intentional departures are recorded here. Do not silently reinterpret requirements.

## Phase 0

### D0.1 Workspace TypeScript consumption

Packages export TypeScript source and are consumed through `transpilePackages` / Vitest rather than a separate build step. Rationale: keep the engine deterministic source as the artefact under test. Revisit if browser bundle size requires a compiled engine entry.

### D0.2 Next.js 16

`create-next-app` installed Next.js 16.3.4 with React 19 and Tailwind CSS v4, matching “latest stable compatible release”.

### D0.3 Google Fonts

Phase 0 does not load Geist or other runtime Google Fonts. Barlow Semi Condensed will be self-hosted in Phase 1. System/UI stacks are the interim fallback.

### D0.5 Aikido scan

Phase 0 invoked Aikido SAST via MCP. The workspace is not signed in to Aikido, so the scan could not return findings. Repeat after authentication.

The running-maximum sell-side allocator lives in `@marginshield/engine` in Phase 0 because it is a pure function with a property test and does not depend on DuckDB. Phase 5 will wire it to detectors; the algorithm is not deferred.
