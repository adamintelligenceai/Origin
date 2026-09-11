#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { generateHarbourline } from './generators/harbourline.js';
import { HARBOURLINE_PROFILE } from './profile.js';
import type { SynthVariant } from './types.js';

function readFlag(name: string, fallback: string): string {
  const eq = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.slice(name.length + 3);
  const idx = process.argv.indexOf(`--${name}`);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1]!;
  return fallback;
}

const seed = Number(readFlag('seed', '42'));
const variant = readFlag('variant', 'planted') as SynthVariant;
const mode = readFlag('mode', 'compact') as 'compact' | 'full';
const outDir = readFlag('out', 'packages/synthetic/output');

const dataset = generateHarbourline({
  seed: Number.isFinite(seed) ? seed : 42,
  variant,
  mode,
});

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'ground_truth.json'), `${JSON.stringify(dataset.groundTruth, null, 2)}\n`);
writeFileSync(join(outDir, 'customers.json'), `${JSON.stringify(dataset.customers)}\n`);
writeFileSync(join(outDir, 'skus.json'), `${JSON.stringify(dataset.skus)}\n`);
writeFileSync(join(outDir, 'transactions.json'), `${JSON.stringify(dataset.transactions)}\n`);
writeFileSync(join(outDir, 'agreements.json'), `${JSON.stringify(dataset.agreements)}\n`);
writeFileSync(join(outDir, 'supplier_costs.json'), `${JSON.stringify(dataset.supplierCosts)}\n`);
writeFileSync(join(outDir, 'rebates.json'), `${JSON.stringify(dataset.rebates)}\n`);
writeFileSync(join(outDir, 'freight.json'), `${JSON.stringify(dataset.freight)}\n`);
writeFileSync(join(outDir, 'policies.json'), `${JSON.stringify(dataset.policies)}\n`);

process.stdout.write(
  `Generated ${HARBOURLINE_PROFILE.name} (fictional) seed=${dataset.groundTruth.seed} variant=${variant} mode=${mode}\n`,
);
process.stdout.write(`Transactions: ${dataset.transactions.length}\n`);
process.stdout.write(
  `T12M net sales: A$${dataset.groundTruth.t12mNetSalesAud.toLocaleString('en-AU')}\n`,
);
process.stdout.write(
  `Addressable margin (planted): A$${dataset.groundTruth.totals.addressableMarginAud.toLocaleString('en-AU')}\n`,
);
process.stdout.write(`Wrote ${outDir}\n`);
