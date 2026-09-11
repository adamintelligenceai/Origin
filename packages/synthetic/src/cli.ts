#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildGroundTruthSummary, type SyntheticVariant } from './index.js';

function parseArgs(argv: string[]): { seed: number; variant: SyntheticVariant; outputDir: string } {
  let seed = 42;
  let variant: SyntheticVariant = 'planted';
  let outputDir = 'data/synthetic';

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === '--seed' && next) {
      seed = Number.parseInt(next, 10);
      i++;
    } else if (arg === '--variant' && next) {
      variant = next as SyntheticVariant;
      i++;
    } else if (arg === '--output' && next) {
      outputDir = next;
      i++;
    }
  }

  return { seed, variant, outputDir };
}

const options = parseArgs(process.argv.slice(2));
mkdirSync(options.outputDir, { recursive: true });

const summary = buildGroundTruthSummary({
  seed: options.seed,
  variant: options.variant,
  outputDir: options.outputDir,
});

writeFileSync(
  join(options.outputDir, 'ground_truth.json'),
  JSON.stringify(summary, null, 2),
  'utf8',
);

console.log(`Generated ${options.variant} synthetic ground truth (seed ${options.seed})`);
console.log(`Output: ${join(options.outputDir, 'ground_truth.json')}`);
