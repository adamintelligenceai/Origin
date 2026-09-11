import { describe, expect, it } from 'vitest';
import { ENGINE_MAJOR_VERSION, ValueClassSchema } from './index.js';

describe('@marginshield/schemas', () => {
  it('exports engine major version', () => {
    expect(ENGINE_MAJOR_VERSION).toBe('1');
  });

  it('validates value classes', () => {
    expect(ValueClassSchema.parse('DETECTED_LEAKAGE')).toBe('DETECTED_LEAKAGE');
    expect(() => ValueClassSchema.parse('INVALID')).toThrow();
  });
});
