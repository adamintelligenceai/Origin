#!/usr/bin/env node
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const scripts = ['build-product.mjs', 'build-content.mjs', 'build-remaining.mjs', 'build-marketing.mjs', 'build-website.mjs'];

console.log('Building Evidence Room AP Agent OS...\n');

for (const script of scripts) {
  console.log(`Running ${script}...`);
  execSync(`node ${join(__dirname, script)}`, { stdio: 'inherit' });
}

console.log('\nBuild complete.');
