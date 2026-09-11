export function addMonths(isoDate: string, months: number): string {
  const [yearRaw, monthRaw, dayRaw] = isoDate.split('-').map(Number);
  const year = yearRaw ?? 0;
  const month = monthRaw ?? 1;
  const day = dayRaw ?? 1;
  const date = new Date(Date.UTC(year, month - 1 + months, day));
  return date.toISOString().slice(0, 10);
}

export function t12mWindow(periodEnd: string): { start: string; end: string } {
  return { start: addMonths(periodEnd, -12), end: periodEnd };
}

export function monthsBetween(start: string, end: string): number {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end.split('-').map(Number);
  return ((ey ?? 0) - (sy ?? 0)) * 12 + ((em ?? 0) - (sm ?? 0));
}

export function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function inRange(isoDate: string, start: string, end: string): boolean {
  return isoDate >= start && isoDate <= end;
}

export function daysBetween(start: string, end: string): number {
  const a = Date.parse(`${start}T00:00:00Z`);
  const b = Date.parse(`${end}T00:00:00Z`);
  return Math.round((b - a) / 86_400_000);
}
