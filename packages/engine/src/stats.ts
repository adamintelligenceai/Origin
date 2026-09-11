export function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0] ?? 0;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  const a = sorted[lo] ?? 0;
  const b = sorted[hi] ?? a;
  const w = idx - lo;
  return a * (1 - w) + b * w;
}

export function olsSlope(xs: number[], ys: number[]): number {
  const n = xs.length;
  if (n < 2) return 0;
  const xMean = xs.reduce((a, b) => a + b, 0) / n;
  const yMean = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = (xs[i] ?? 0) - xMean;
    num += dx * ((ys[i] ?? 0) - yMean);
    den += dx * dx;
  }
  return den === 0 ? 0 : num / den;
}

export function volumeQuartile(value: number, all: number[]): number {
  const sorted = [...all].sort((a, b) => a - b);
  const p25 = percentile(sorted, 0.25);
  const p50 = percentile(sorted, 0.5);
  const p75 = percentile(sorted, 0.75);
  if (value <= p25) return 1;
  if (value <= p50) return 2;
  if (value <= p75) return 3;
  return 4;
}
