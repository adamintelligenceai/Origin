import { describe, expect, it } from 'vitest';
import { formatBasisPoints, formatMoneyAUD, formatPercent } from './format.js';

describe('formatMoneyAUD', () => {
  it('formats positives', () => {
    expect(formatMoneyAUD(796000)).toContain('796,000');
  });
  it('uses accounting parentheses for negatives', () => {
    expect(formatMoneyAUD(-1200)).toMatch(/^\(.*\)$/);
  });
});

describe('formatPercent', () => {
  it('formats ratios as percentages', () => {
    expect(formatPercent(0.246, 1)).toBe('24.6%');
  });
});

describe('formatBasisPoints', () => {
  it('formats basis points', () => {
    expect(formatBasisPoints(35)).toContain('35');
  });
});
