import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateHarbourline, type Scale, type Variant } from './generate';

function arg(name: string, fallback: string): string {
  const prefixed = process.argv.find((item) => item.startsWith(`--${name}=`));
  if (prefixed) return prefixed.slice(name.length + 3);
  const idx = process.argv.indexOf(`--${name}`);
  if (idx >= 0) return process.argv[idx + 1] ?? fallback;
  return fallback;
}

const seed = Number(arg('seed', '42'));
const variant = arg('variant', 'planted') as Variant;
const scale = arg('scale', 'compact') as Scale;
const outDir = resolve(arg('out', 'packages/synthetic/output'));

const bundle = generateHarbourline({ seed, variant, scale });
mkdirSync(outDir, { recursive: true });
for (const [name, body] of Object.entries(bundle.files)) {
  writeFileSync(resolve(outDir, name), body);
}
writeFileSync(resolve(outDir, 'ground_truth.json'), JSON.stringify(bundle.ground_truth, null, 2));
writeFileSync(resolve(outDir, 'dataset-meta.json'), JSON.stringify({
  company: bundle.ground_truth.company,
  fictional: true,
  variant,
  seed,
  scale,
  transactions: bundle.dataset.transactions.length,
  run_note: 'Canonical dataset generated in-process; files are source exports.',
}, null, 2));

process.stdout.write(`Wrote ${Object.keys(bundle.files).length} files to ${outDir} (${bundle.dataset.transactions.length} lines)\n`);
