# Dependencies

Record of every first-party toolchain and runtime dependency, why it exists, and which official source was checked on 2026-09-12.

This file is the Phase 0 source of truth. Do not add a package without updating this table. Do not treat consumer ChatGPT/Claude/Gemini/Grok subscriptions as production APIs.

## Version decisions

| Tool | Chosen | Latest observed | Why this pin |
|---|---|---|---|
| Node.js | **22** (CI / `.nvmrc`) | Current: 26.8.2. LTS: **24.21.0** (Krypton) and **22.23.2** (Jod) | Founder toolkit requires Node 22+. CI uses 22 to match this environment. Engines allow 22.x and 24.x (`>=22.14.0 <25`). Node 26 current is excluded until it is LTS. |
| pnpm | **10.34.5** | Latest-10: 10.34.5. Latest: **12.4.1** | Matches the `packageManager` major already in the scaffold and the Cloud Agent environment. pnpm 12 was not adopted in Phase 0 because it is an unnecessary major jump for a compatibility-only pass. |
| TypeScript | **5.9.3** | **7.0.2** | `typescript-eslint@8.70.0` peer range is `typescript >=4.8.4 <6.1.0`. TypeScript 7 is blocked until eslint type-aware linting supports it. This is a tooling compatibility pin, not a security relaxation. |
| ESLint | **10.10.0** | 10.10.0 | Current stable. `eslint-plugin-react@7.37.5` only declares ESLint `^3 \|\| … \|\| ^9.7`, so that plugin is **not** used. `eslint-plugin-react-hooks@7.1.1` supports ESLint 10. |
| Prettier | **3.9.6** | 3.9.6 | Formatter only. Does not run in production. |
| Vitest | **5.0.0** | 5.0.0 | Current stable. Peer supports Vite 6/7/8. |
| Turborepo | **2.10.12** | 2.10.12 | Current stable. |
| React / react-dom | **19.3.0** (web, desktop) | 19.3.0 | Current stable. |
| Vite | **8.3.0** | 8.3.0 | Current stable. Required by `@vitejs/plugin-react@6.1.1` (`vite ^8`). |
| Next.js | **16.3.5** | 16.3.5 (`latest`) | Current stable App Router. Control-plane only; no private content store. |
| Expo | **57.0.22** | 57.0.22 (`latest` / `sdk-57`) | Scaffold `expo@^55` + `expo-router@^6` was stale and internally inconsistent. SDK 57 is the current stable. |
| React Native (mobile) | **0.86.3** | npm latest 0.87.1 | Expo SDK 57 `bundledNativeModules.json` pins `react-native 0.86.3` and `react 19.2.3`. Mobile follows Expo’s tested matrix, not raw RN latest. |
| React (mobile) | **19.2.3** | 19.3.0 | Expo SDK 57 pin. |
| `react-dom` (mobile) | **19.2.3** | 19.3.0 | Expo SDK 57 pin. Web/desktop stay on 19.3.0. |
| `react-native-worklets` | **0.10.1** | 0.12.x pulled transitively | Expo SDK 57 pin; `expo-modules-core` peers `^0.7.4 \|\| … \|\| ^0.10.0`. Root `pnpm.overrides` keeps the nested copy on 0.10.1. |
| `@react-native/metro-config` | **0.86.3** | 0.87.1 hoisted otherwise | Matches `react-native@0.86.3`. |
| Tauri CLI / API | **2.11.4 / 2.11.1** | 2.11.4 / 2.11.1 | Current stable Tauri 2. Rust crate remains `version = "2"` until a Cargo.lock is generated in a later desktop-native pass. |
| `@types/node` | **22.20.2** | 22.x line | Matches the Node 22 CI toolchain. |

## Blocked upgrades (do not silently skip the lint/security stack)

1. **TypeScript 7.0.2** — eslint type-aware lint (`typescript-eslint`) does not allow TS 7 yet. Revisit when `typescript-eslint` peers include TS 7.
2. **pnpm 12.4.1** — newest pnpm major. Revisit after Phase 0 is green on pnpm 10.34.x.
3. **eslint-plugin-react** — no ESLint 10 peer. Hooks plugin is used instead. Do not add the React plugin by downgrading ESLint.
4. **Expo Go / SQLCipher** — `expo-sqlite` with `useSQLCipher: true` remains declared for later phases. Expo Go cannot prove the SQLCipher path. No personal data until Phase 3.

## Root toolchain

| Package | Role | Production? |
|---|---|---|
| `typescript` | Strict typecheck across the workspace | No |
| `eslint`, `@eslint/js`, `typescript-eslint` | Lint TypeScript with type-aware strict rules | No |
| `eslint-plugin-react-hooks` | React hooks purity rules | No |
| `eslint-config-prettier` | Disable formatting rules that fight Prettier | No |
| `globals` | Node/browser globals for ESLint | No |
| `prettier` | Format TS/JSON/CSS/YAML | No |
| `turbo` | Task orchestration for typecheck/test/build | No |
| `vitest` | Unit test runner | No |

## Workspace packages

| Package | Role | Why it exists now |
|---|---|---|
| `@project-chief/types` | Canonical domain types | Shared contracts. No runtime I/O. |
| `@project-chief/core` | Observe → plan → execute → verify interfaces | Structural only in Phase 0. |
| `@project-chief/permissions` | Deterministic permission stub | Model output cannot grant autonomy (`canModelGrantAutonomy` is `false`). Phase 1 expands tests. |
| `@project-chief/privacy` | External-context authorisation stub | Fail closed on disallowed data categories. |
| `@project-chief/ledger` | Action receipt store interface | Local receipts later; no cloud log sink. |
| `@project-chief/model-router` | Task → model-tier routing stub | No provider SDK. No consumer-chat credentials. |

These packages have **no network, database, analytics, or connector** dependencies.

## Desktop (`@project-chief/desktop`)

| Package | Role |
|---|---|
| `react`, `react-dom` | Synthetic UI shell |
| `vite`, `@vitejs/plugin-react` | Local bundler. No remote origin. |
| `@tauri-apps/api`, `@tauri-apps/cli` | Desktop personal-node wrapper |
| `@project-chief/types`, `@project-chief/permissions` | Local contracts |

Tauri capabilities stay `core:default` only. Do not add shell, filesystem, or remote scopes in Phase 0.

## Web (`@project-chief/web`)

| Package | Role |
|---|---|
| `next` | Content-blind marketing/control-plane shell |
| `react`, `react-dom` | UI |

No hosted data store, no analytics SDK, no connector aggregator.

Cloud schema is the allowlisted JSON in `apps/web/cloud-schema.json`, gated by `scripts/check-cloud-schema.mjs`.

## Mobile (`@project-chief/mobile`)

| Package | Role |
|---|---|
| `expo`, `expo-router` | Companion app shell |
| `expo-secure-store` | Future small-secret storage only |
| `expo-sqlite` | Future SQLCipher store (native/prebuild; not Expo Go) |
| `expo-constants`, `expo-linking` | Required `expo-router` peers |
| `react-native`, `react-native-screens`, `react-native-safe-area-context` | Navigation peers for Expo Router |
| `react-native-reanimated`, `react-native-worklets` | Expo Router / modules-core peers; SDK 57 pins |
| `@react-native/metro-config` | Matches RN 0.86.3 |
| `react` / `react-dom` 19.2.3 | Expo SDK 57 pin |

No personal data, no OAuth, no push provider in Phase 0.

## Intentionally absent

- Analytics (Segment, PostHog, Amplitude, Datadog RUM)
- Hosted data stores (Supabase client, Firebase, PlanetScale)
- Connector aggregators (Composio, Zapier, nango)
- Consumer LLM SDKs and subscription cookies
- Vector clouds
- `localStorage` / AsyncStorage adapters for private content

## CI security jobs

| Job | Tool | Why |
|---|---|---|
| `quality` | pnpm typecheck, eslint, vitest, prettier, cloud-schema guard | Fail closed on types/lint/tests/schema |
| `secrets` | Gitleaks 8.28.0 | Secret scan without sending repo contents to a third-party SaaS |
| `dependency-review` | `actions/dependency-review-action` | PR supply-chain review; fails on high+ |
| `codeql` | GitHub CodeQL `javascript-typescript` + `security-extended` | SAST |

## Re-check cadence

Re-verify this file from official registries (nodejs.org, npm dist-tags, docs.expo.dev, v2.tauri.app) at the start of any phase that adds a runtime dependency.
