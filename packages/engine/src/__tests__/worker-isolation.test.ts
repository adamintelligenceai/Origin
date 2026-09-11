import { describe, expect, it } from 'vitest';
import { isolateWorkerNetwork } from '../ingest/worker-isolation';

describe('worker network isolation', () => {
  it('blocks fetch after initialisation', () => {
    const scope: { fetch?: unknown } = {
      fetch: () => 'ok',
    };
    isolateWorkerNetwork(scope);
    expect(() => (scope.fetch as () => void)()).toThrow(/cannot use the network/);
  });
});
