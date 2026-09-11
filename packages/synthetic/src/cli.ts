#!/usr/bin/env node
import { describeSynth, HARBOURLINE_PROFILE } from './index.js';
import type { SynthVariant } from './index.js';

function readFlag(name: string, fallback: string): string {
  const eq = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.slice(name.length + 3);
  const idx = process.argv.indexOf(`--${name}`);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1]!;
  return fallback;
}

const seed = Number(readFlag('seed', '42'));
const variant = readFlag('variant', 'planted') as SynthVariant;
process.stdout.write(
  `${describeSynth({ seed: Number.isFinite(seed) ? seed : 42, variant })}\n`,
);
process.stdout.write(`${JSON.stringify(HARBOURLINE_PROFILE)}\n`);
process.stdout.write('Full Harbourline generator lands in Phase 2.\n');
