# DuckDB projections

v1 money arithmetic is the TypeScript `decimal.js` engine (`runScan`). DuckDB-Wasm is reserved for large-file ingestion: load CSV/XLSX into canonical tables, then hand records to `runScan`.

`views.sql` documents the intended SQL shape. Do not treat SQL totals as a second source of truth.
