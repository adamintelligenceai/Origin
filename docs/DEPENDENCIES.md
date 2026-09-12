# Dependencies

This document records every runtime and development dependency in the Project Chief monorepo, why it exists, and the version policy used during Phase 0.

## Toolchain policy

| Tool        | Required version             | Why                                                           |
| ----------- | ---------------------------- | ------------------------------------------------------------- |
| Node.js     | `>=22` (`.nvmrc`: 22)        | README and CI baseline; current LTS line for the founder pack |
| pnpm        | `10.14.0` (`packageManager`) | Workspace installs with deterministic lockfile                |
| Rust stable | latest stable                | Tauri desktop shell (Phase 2+)                                |
| Turborepo   | `^2.10.12`                   | Monorepo task orchestration                                   |

TypeScript stays on **5.9.x** during Phase 0. TypeScript 7.x is not adopted yet because the ecosystem (Expo, Next, ESLint type-aware rules) is still stabilizing against it.

## Root devDependencies

| Package                     | Version    | Purpose                                       |
| --------------------------- | ---------- | --------------------------------------------- |
| `@eslint/js`                | `^10.0.1`  | ESLint 10 flat-config baseline                |
| `eslint`                    | `^10.10.0` | Lint gate across all packages                 |
| `eslint-plugin-react-hooks` | `^7.1.1`   | React hook correctness (ESLint 10 compatible) |
| `globals`                   | `^16.4.0`  | Browser/Node globals for ESLint               |
| `prettier`                  | `^3.9.6`   | Formatting gate                               |
| `turbo`                     | `^2.10.12` | Task runner                                   |
| `typescript`                | `^5.9.2`   | Strict typechecking                           |
| `typescript-eslint`         | `^8.70.0`  | Type-aware ESLint rules                       |
| `vitest`                    | `^3.2.4`   | Unit test runner                              |

## Apps

### `@project-chief/desktop`

| Package                      | Version   | Purpose                      |
| ---------------------------- | --------- | ---------------------------- |
| `@project-chief/types`       | workspace | Shared domain types          |
| `@project-chief/permissions` | workspace | Permission engine (Phase 1+) |
| `@project-chief/runtime`     | workspace | Observe→approve→verify loop  |
| `@tauri-apps/api`            | `^2.11.1` | Desktop IPC bridge           |
| `@tauri-apps/cli`            | `^2.11.1` | Tauri build/dev tooling      |
| `react` / `react-dom`        | `^19.1.1` | Desktop UI                   |
| `@vitejs/plugin-react`       | `^5.0.2`  | Vite React transform         |
| `vite`                       | `^7.1.5`  | Dev server and bundler       |
| `vitest`                     | `^3.2.4`  | Package tests                |

Tauri Rust crates (`tauri`, `tauri-build`, `serde`, `serde_json`) are pinned in `apps/desktop/src-tauri/Cargo.toml` to the Tauri 2 stable line.

### `@project-chief/web`

| Package               | Version    | Purpose                       |
| --------------------- | ---------- | ----------------------------- |
| `next`                | `^16.3.5`  | Marketing/control-plane shell |
| `react` / `react-dom` | `^19.1.1`  | Web UI                        |
| `@types/node`         | `^22.18.0` | Node typings for Next         |
| `vitest`              | `^3.2.4`   | Package tests                 |

The web app is intentionally a **content-blind control plane** in V1. No analytics SDK, hosted DB client, or connector SDK is added in Phase 0.

### `@project-chief/mobile`

| Package               | Version    | Purpose                                             |
| --------------------- | ---------- | --------------------------------------------------- |
| `expo`                | `^57.0.22` | Expo SDK aligned to current stable                  |
| `expo-router`         | `^6.0.24`  | File-based navigation                               |
| `expo-secure-store`   | `^15.0.7`  | Future secure key storage (no secrets stored yet)   |
| `expo-sqlite`         | `^16.0.10` | Future encrypted local store (not wired in Phase 0) |
| `react`               | `^19.1.1`  | Mobile UI                                           |
| `react-native`        | `^0.81.6`  | RN runtime paired with Expo 57                      |
| `@types/react-native` | not used   | React Native 0.81 ships its own TypeScript types    |
| `vitest`              | `^3.2.4`   | Package tests                                       |

Expo was upgraded from SDK 55 → 57 because the scaffold versions were stale relative to the current stable SDK and React Native 0.81 peer requirements.

## Packages

| Package                            | Runtime deps                                       | Purpose                         |
| ---------------------------------- | -------------------------------------------------- | ------------------------------- |
| `@project-chief/types`             | `zod`                                              | Canonical Zod schemas           |
| `@project-chief/core`              | `@project-chief/types`                             | Proactive pipeline              |
| `@project-chief/permissions`       | `@project-chief/types`                             | Deterministic permission engine |
| `@project-chief/ledger`            | `@project-chief/types`                             | Receipt ledger                  |
| `@project-chief/privacy`           | `@project-chief/types`                             | Privacy gateway                 |
| `@project-chief/model-router`      | privacy, types, zod                                | Model gateway + cost ledger     |
| `@project-chief/store`             | `@noble/ciphers`, `@noble/hashes`, types           | Encrypted local store           |
| `@project-chief/connectors-google` | permissions, store, types, ledger                  | Calendar/Gmail + PKCE           |
| `@project-chief/sync`              | `@noble/ciphers`, `@noble/curves`, `@noble/hashes` | E2EE envelopes                  |
| `@project-chief/runtime`           | core, ledger, permissions, store, types            | Desktop composition root        |

## CI security tooling

| Tool                     | Workflow job        | Purpose                                      |
| ------------------------ | ------------------- | -------------------------------------------- |
| `pnpm quality`           | `quality`           | typecheck + lint + test + cloud-schema guard |
| Prettier check           | `quality`           | formatting drift detection                   |
| GitHub Dependency Review | `dependency-review` | PR dependency vulnerability gate             |
| Gitleaks                 | `secret-scan`       | secret leakage detection                     |
| CodeQL                   | `codeql`            | static analysis for JS/TS                    |

## Explicitly excluded in Phase 0

Still excluded on purpose:

- analytics SDKs
- hosted database clients
- official Google/OpenAI SDKs (first-party fetch adapters only)
- third-party connector aggregators

## Version verification date

Checked against npm registry on **2026-09-12** during Phase 0 bootstrap.
