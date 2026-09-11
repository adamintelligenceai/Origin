# Open-source notices

MarginShield is proprietary software. It depends on third-party packages whose licences are recorded here. Run `pnpm licence:audit` to regenerate the inventory from the lockfile. Do not ship packages whose licences are incompatible with distribution of this product.

## Direct runtime notices

### SheetJS Community Edition

SheetJS Community Edition is used to parse `.xlsx` workbooks in the browser. Use of SheetJS CE must remain within the terms of its licence. Macro-enabled and binary Excel formats are rejected before parse.

### DuckDB-Wasm

Mozilla-style / MIT licensing. Wasm assets are served from the same origin. Remote extensions are not loaded.

### Other major components

Next.js, React, Tailwind CSS, Zod, decimal.js, Papa Parse, ExcelJS, `@react-pdf/renderer`, Vitest, fast-check, Playwright, simple-statistics, Comlink, Apache Arrow, Motion, TanStack Table/Virtual, ECharts — see the generated inventory.

## Generating the inventory

```bash
pnpm licence:audit
```

The script fails CI if a disallowed licence string appears in production dependencies (currently: AGPL, SSPL, BUSL without an exception).

## Disclaimer

This file is not legal advice. Licence compatibility must be reviewed before a public release.
