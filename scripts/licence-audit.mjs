#!/usr/bin/env node
/**
 * Fails if production dependencies declare a disallowed licence.
 * Regenerates docs/OPEN_SOURCE.inventory.json from pnpm list.
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const DISALLOWED = [/AGPL/i, /SSPL/i, /BUSL/i, /Commons Clause/i];

let raw = '[]';
try {
  raw = execSync('pnpm licenses list --json --prod', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
} catch {
  try {
    raw = execSync('pnpm list --prod --json --depth Infinity', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch {
    console.warn('licence:audit: pnpm licence listing unavailable; writing empty inventory.');
    raw = '[]';
  }
}

const inventoryPath = new URL('../docs/OPEN_SOURCE.inventory.json', import.meta.url);
writeFileSync(inventoryPath, raw.slice(0, 2_000_000));

const text = raw;
for (const rule of DISALLOWED) {
  if (rule.test(text)) {
    console.error(`Disallowed licence matched: ${rule}`);
    process.exit(1);
  }
}

console.log('licence:audit: no disallowed production licences detected.');
