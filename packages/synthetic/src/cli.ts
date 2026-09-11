#!/usr/bin/env node
import path from 'node:path';
import { generateHarbourline, type SynthVariant } from './generate.js';

function arg(name: string, fallback?: string): string | undefined {
  const idx = process.argv.indexOf(name);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  const pref = process.argv.find((a) => a.startsWith(`${name}=`));
  return pref ? pref.slice(name.length + 1) : fallback;
}

const seed = Number(arg('--seed', '42'));
const variant = (arg('--variant', 'planted') ?? 'planted') as SynthVariant;
const outDir = arg('--out', path.join(process.cwd(), 'fixtures', 'harbourline', variant))!;

if (!['clean', 'planted', 'messy', 'partial'].includes(variant)) {
  console.error(`Unknown variant: ${variant}`);
  process.exit(1);
}
if (!Number.isFinite(seed)) {
  console.error(`Invalid seed: ${seed}`);
  process.exit(1);
}

const result = generateHarbourline({ seed, variant, outDir });
console.log(
  JSON.stringify(
    {
      outDir: result.outDir,
      variant: result.variant,
      seed: result.seed,
      summary: result.summary,
      fileCount: Object.keys(result.files).length,
      hashes: result.hashes,
    },
    null,
    2,
  ),
);
