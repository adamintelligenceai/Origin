/** Mulberry32 seeded PRNG — deterministic across Node versions. */
export type Rng = {
  next: () => number;
  int: (min: number, maxInclusive: number) => number;
  pick: <T>(items: readonly T[]) => T;
  chance: (p: number) => boolean;
};

export function createRng(seed: number): Rng {
  let t = seed >>> 0;
  const next = () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    int(min, maxInclusive) {
      return min + Math.floor(next() * (maxInclusive - min + 1));
    },
    pick(items) {
      return items[Math.floor(next() * items.length)]!;
    },
    chance(p) {
      return next() < p;
    },
  };
}
