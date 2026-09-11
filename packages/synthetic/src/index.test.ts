import { describe, expect, it } from 'vitest';
import { describeSynth, HARBOURLINE_PROFILE } from './index.js';
describe('synthetic stub', () => {
  it('marks Harbourline as fictional', () => { expect(HARBOURLINE_PROFILE.fictional).toBe(true); });
  it('describes run options', () => { expect(describeSynth({ seed: 42, variant: 'planted' })).toContain('seed=42'); });
});
