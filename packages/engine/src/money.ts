export const FACTOR = 10_000n;

export function toScaled(value: string | number): bigint {
  const raw = String(value).trim();
  if (!raw) return 0n;
  let s = raw.replace(/A\$/gi, '').replace(/\$/g, '').replace(/,/g, '').replace(/\s/g, '');
  let neg = false;
  if (s.startsWith('(') && s.endsWith(')')) {
    neg = true;
    s = s.slice(1, -1);
  } else if (s.endsWith('-')) {
    neg = true;
    s = s.slice(0, -1);
  } else if (s.startsWith('-')) {
    neg = true;
    s = s.slice(1);
  }
  if (!s) return 0n;
  const [w = '0', f = ''] = s.split('.');
  const result = BigInt(w || '0') * FACTOR + BigInt((f + '0000').slice(0, 4));
  return neg ? -result : result;
}

export function fromScaled(value: bigint, decimals = 4): string {
  const neg = value < 0n;
  const abs = neg ? -value : value;
  const whole = abs / FACTOR;
  const frac = (abs % FACTOR).toString().padStart(4, '0').slice(0, decimals);
  const body = decimals > 0 ? `${whole}.${frac.padEnd(decimals, '0')}` : whole.toString();
  return neg ? `-${body}` : body;
}

export function add(...vals: bigint[]): bigint {
  return vals.reduce((a, b) => a + b, 0n);
}

export function mulQty(unitScaled: bigint, qty: number): bigint {
  return (unitScaled * toScaled(qty.toFixed(4))) / FACTOR;
}

export function dollars(n: number): bigint {
  return toScaled(n.toFixed(4));
}

export function formatAud(scaled: bigint): string {
  const neg = scaled < 0n;
  const abs = neg ? -scaled : scaled;
  const whole = abs / FACTOR;
  const cents = (abs % FACTOR).toString().padStart(4, '0').slice(0, 2);
  const wholeStr = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return neg ? `(A$${wholeStr}.${cents})` : `A$${wholeStr}.${cents}`;
}

export function formatAudCompact(scaled: bigint): string {
  const neg = scaled < 0n;
  const abs = neg ? -scaled : scaled;
  const d = Number(abs) / Number(FACTOR);
  let body: string;
  if (d >= 1_000_000) body = `A$${(d / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}m`;
  else if (d >= 1_000) body = `A$${Math.round(d / 1_000)}k`;
  else body = `A$${Math.round(d)}`;
  return neg ? `-${body}` : body;
}
