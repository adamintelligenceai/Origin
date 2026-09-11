import { describe, expect, it, vi } from 'vitest';
import { generateHarbourline } from '@marginshield/synthetic';
import { runScan } from '@marginshield/engine';

describe('privacy of the deterministic engine', () => {
  it('does not perform network I/O while scanning', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
      throw new Error('fetch must not be called from the engine');
    });
    const bundle = generateHarbourline({ seed: 42, variant: 'planted' });
    const result = runScan(bundle.dataset);
    expect(result.findings.length).toBeGreaterThan(0);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('does not embed a live AI payload in scan results', () => {
    const bundle = generateHarbourline({ seed: 42, variant: 'planted' });
    const json = JSON.stringify(runScan(bundle.dataset));
    expect(json).not.toContain('ANTHROPIC');
  });
});
