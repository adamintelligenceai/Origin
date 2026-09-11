export interface HealthIssue {
  code: string;
  severity: 'info' | 'warning' | 'block';
  message: string;
}

export function dataHealth(input: {
  monthCount: number;
  costCoverage: number;
  duplicateRate: number;
  currencies: string[];
  fxAvailable: boolean;
  salesTieoutConfirmed: boolean;
}): HealthIssue[] {
  const issues: HealthIssue[] = [];
  if (input.monthCount < 12) {
    issues.push({
      code: 'LIMITED_HISTORY',
      severity: 'warning',
      message: 'Fewer than 12 complete months — limited-history mode.',
    });
  }
  if (input.costCoverage < 0.9) {
    issues.push({
      code: 'PARTIAL_COST',
      severity: 'warning',
      message: 'Landed/direct cost covers less than 90% of T12M sales value.',
    });
  }
  if (input.duplicateRate >= 0.005) {
    issues.push({
      code: 'DUPLICATES',
      severity: 'warning',
      message: 'Duplicate rate after identification is 0.5% or higher. Ambiguous duplicates are retained.',
    });
  }
  if (input.currencies.length > 1 && !input.fxAvailable) {
    issues.push({
      code: 'CURRENCY',
      severity: 'block',
      message: 'Multiple currencies present without an FX source. Totals will not be combined.',
    });
  }
  if (!input.salesTieoutConfirmed) {
    issues.push({
      code: 'SALES_TIEOUT',
      severity: 'warning',
      message: 'Sales tie-out not confirmed.',
    });
  }
  return issues;
}
