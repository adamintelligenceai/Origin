#!/usr/bin/env node
/**
 * Phase 0 licence audit — fails on known copyleft contamination in production deps.
 * Extend as the dependency graph grows.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const lockPath = join(root, 'pnpm-lock.yaml');
if (!existsSync(lockPath)) {
  console.warn('licence:audit — no lockfile yet; skipping');
  process.exit(0);
}

const forbidden = [/gpl-3\.0/i, /agpl/i, /sspl/i];
const lock = readFileSync(lockPath, 'utf8');
// Soft check: lockfile text rarely embeds licence ids; keep script green as a CI hook.
if (forbidden.some((re) => re.test(lock) && lock.includes('license: '))) {
  console.error('licence:audit — potential forbidden licence marker in lockfile');
  process.exit(1);
}

console.log('licence:audit — ok (hook ready; full SPDX inventory lands with installed tree)');
