import { describe, expect, it } from 'vitest';
import { formatMoneyAUD } from './format.js';

describe('formatMoneyAUD', () => {
  it('formats positives', () => {
    expect(formatMoneyAUD(796000)).toContain('796,000');
  });
  it('uses accounting parentheses for negatives', () => {
    expect(formatMoneyAUD(-1200)).toMatch(/^\(.*\)$/);
  });
});
