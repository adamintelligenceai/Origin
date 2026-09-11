import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAudDisplay(value: string | number): string {
  const n = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(n)) return 'A$—';
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (abs >= 1_000_000) return `${sign}A$${(abs / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}m`;
  if (abs >= 1_000) return `${sign}A$${Math.round(abs / 1_000)}k`;
  return `${sign}A$${Math.round(abs).toLocaleString('en-AU')}`;
}
