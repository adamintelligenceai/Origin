import { describe, expect, it } from 'vitest';
import { formatFact } from './format';

describe('formatFact', () => {
  it('renders cost pass-through facts as percent and money', () => {
    expect(formatFact('cost_change', 0.142857)).toBe('14.3%');
    expect(formatFact('restore_price', '114.2900')).toBe('A$114.29');
    expect(formatFact('months_since_price_change', 3)).toBe('3');
    expect(formatFact('agreement_id', 'AGR-P1A')).toBe('AGR-P1A');
  });
});
