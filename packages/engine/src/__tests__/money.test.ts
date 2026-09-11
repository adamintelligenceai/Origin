import { describe, expect, it } from 'vitest';
import { add, dollars, fromScaled, toScaled } from '../money.js';

describe('money', () => {
  it('parses AU formats', () => {
    expect(toScaled('1,234.56')).toBe(12_345_600n);
    expect(toScaled('(100.00)')).toBe(-1_000_000n);
    expect(toScaled('50.00-')).toBe(-500_000n);
  });

  it('round-trips', () => {
    expect(fromScaled(dollars(1234.5))).toBe('1234.5000');
  });

  it('adds without float drift', () => {
    expect(fromScaled(add(dollars(0.1), dollars(0.2)))).toBe('0.3000');
  });
});
