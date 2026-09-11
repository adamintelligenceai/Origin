import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * Phase 0 scaffold: assert server route stubs do not accept raw transaction payloads.
 * Full network interception lands with the scan worker (Phase 3 / 10).
 */
describe('privacy baseline', () => {
  it('licence route returns metadata only', () => {
    const src = readFileSync(join(repoRoot, 'apps/web/app/api/licence/route.ts'), 'utf8');
    expect(src).not.toMatch(/transaction/i);
    expect(src).toMatch(/methodVersion/);
  });

  it('commercial config has no customer identifiers', () => {
    const src = readFileSync(join(repoRoot, 'apps/web/config/commercial.ts'), 'utf8');
    expect(src).not.toMatch(/customerName|invoice_no|sku_code/i);
  });
});
