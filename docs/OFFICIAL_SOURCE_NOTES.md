# Official-source notes to verify during implementation

Cursor must re-check current official docs at the phase where each dependency is introduced.

Key current constraints:

- Gmail scope classification and public verification/security-assessment implications.
- Tauri 2 capabilities/CSP/runtime-authority configuration.
- Expo SecureStore payload limits and biometric behavior.
- Expo SQLite SQLCipher requires native/prebuild path and is not supported in Expo Go.
- Model provider API retention/training controls and eligibility for zero-data-retention configurations.
- Apple/Google app-store privacy disclosure requirements.
