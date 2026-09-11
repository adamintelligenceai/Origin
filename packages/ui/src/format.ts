/** Australian money formatting with accounting negatives. */
export function formatMoneyAUD(amount: number, fractionDigits = 0): string {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(abs);
  if (amount < 0) return `(${formatted})`;
  return formatted;
}
