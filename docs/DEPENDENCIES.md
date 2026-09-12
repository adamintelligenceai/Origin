# Dependencies

Record of first-party and third-party dependencies for Project Chief Phase 0.
Exact resolved versions live in `pnpm-lock.yaml`.

## Policy

- Prefer official packages from the Node.js, pnpm, Turborepo, Vite, Next.js, Expo, Tauri, and TypeScript ecosystems.
- Do not add analytics SDKs, hosted personal-data stores, or third-party connector aggregators.
- Do not weaken TypeScript `strict` options, ESLint errors, or CI gates to get a green build.
- Consumer ChatGPT / Claude / Gemini / Grok subscriptions are not production runtime APIs.

## Root tooling

| Package                                       | Why it exists                                       |
| --------------------------------------------- | --------------------------------------------------- |
| `pnpm`                                        | Workspace package manager (`packageManager` field). |
| `turbo`                                       | Monorepo task runner for typecheck/lint/test/build. |
| `typescript`                                  | Strict shared typechecking across apps/packages.    |
| `eslint` + `typescript-eslint` + `@eslint/js` | Lint TypeScript/React without relaxing rules.       |
| `eslint-config-prettier`                      | Disable ESLint rules that conflict with Prettier.   |
| `globals`                                     | Shared ESLint global definitions.                   |
| `prettier`                                    | Deterministic formatting gate.                      |
| `vitest`                                      | Unit/smoke tests for packages and app scaffolds.    |

## Desktop (`apps/desktop`)

| Package                               | Why it exists                                      |
| ------------------------------------- | -------------------------------------------------- |
| `react` / `react-dom`                 | Desktop UI renderer.                               |
| `vite` / `@vitejs/plugin-react`       | Frontend bundler/dev server for the Tauri WebView. |
| `@tauri-apps/api` / `@tauri-apps/cli` | Tauri 2 desktop shell and IPC surface.             |
| `@project-chief/types`                | Shared domain contracts.                           |
| `@project-chief/permissions`          | Permission helper foundation used by the shell.    |
| `vitest` / `typescript` / React types | Quality gates.                                     |

## Web (`apps/web`)

| Package                                      | Why it exists                                  |
| -------------------------------------------- | ---------------------------------------------- |
| `next`                                       | Content-blind marketing/control-plane web app. |
| `react` / `react-dom`                        | Web UI.                                        |
| `typescript` / React/`node` types / `vitest` | Quality gates.                                 |

## Mobile (`apps/mobile`)

| Package                                                   | Why it exists                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| `expo`                                                    | Mobile companion runtime. Corrected to Expo SDK 55 bundled set.          |
| `expo-router`                                             | File-based mobile navigation.                                            |
| `expo-secure-store`                                       | Future home for small secrets on device (not used for product data yet). |
| `expo-sqlite`                                             | Future local store path (SQLCipher/native hardening is a later phase).   |
| `react` / `react-native`                                  | Mobile UI runtime matching Expo SDK 55.                                  |
| `react-native-safe-area-context` / `react-native-screens` | Required `expo-router` peers.                                            |
| `typescript` / React types / `vitest`                     | Quality gates.                                                           |

## Shared packages

| Package                       | Why it exists                                          |
| ----------------------------- | ------------------------------------------------------ |
| `@project-chief/types`        | Canonical local domain types.                          |
| `@project-chief/permissions`  | Deterministic permission helper foundation.            |
| `@project-chief/core`         | Observe/plan/execute/verify loop contracts.            |
| `@project-chief/privacy`      | External-context authorization and minimisation stubs. |
| `@project-chief/ledger`       | Verified action receipt helpers.                       |
| `@project-chief/model-router` | Local/economy/standard/frontier routing stub.          |

## Explicitly deferred / not added in Phase 0

- OAuth client libraries
- Model provider SDKs
- Analytics / session replay
- Hosted DB/vector/search products for personal content
- Connector aggregation platforms
- SQLCipher bindings (Phase 3+)

## Compatibility corrections made in Phase 0

- Expo set corrected from incomplete `expo@^55` + mismatched `expo-router@^6` / SecureStore / SQLite majors to the Expo SDK 55 bundled native module set (`expo-router@~55`, `expo-secure-store@~55`, `expo-sqlite@~55`, RN `0.83.10`, React `19.2.0`).
- Tauri / Vite / Next / React / Turbo pins moved onto current stable npm release lines available during Phase 0.
- Placeholder lint scripts (`echo lint-ok`, `next lint \|\| true`) removed; lint now fails closed.
- `exactOptionalPropertyTypes` honored in privacy receipt construction (optional `provider` omitted when unset).

## Native toolchain notes (desktop)

| Requirement                                                                                                                       | Why it exists                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Rust stable `>= 1.98` (`rust-toolchain.toml`)                                                                                     | Tauri 2 dependency graph requires modern Cargo/`edition2024`-capable tooling.  |
| Linux packages: `libwebkit2gtk-4.1-dev`, `libgtk-3-dev`, `libayatana-appindicator3-dev`, `librsvg2-dev`, `patchelf`, `pkg-config` | Required to compile the Tauri Linux backend.                                   |
| Placeholder PNG icons under `apps/desktop/src-tauri/icons/`                                                                       | Tauri context generation requires RGBA icons; replace before release branding. |
