import type { ScanResult } from '@marginshield/engine';
import { formatAud } from '@marginshield/ui';
import { escapeSpreadsheetText } from '@marginshield/engine';

export const BOARD_DISCLAIMER =
  'MarginShield is a commercial diagnostic based on client-supplied data, configured assumptions and the MarginShield methodology. It is not an audit, assurance engagement, valuation opinion or guarantee that identified opportunities will be realised.';

export function boardPackMarkdown(result: ScanResult): string {
  return [
    `# MarginShield board pack`,
    `Harbourline Trade Supply Pty Ltd — fictional demonstration company`,
    `Period ${result.period.t12m_start} to ${result.period.t12m_end}`,
    `Run ${result.run_hash} · method ${result.method_version}`,
    ``,
    `## Executive answer`,
    `MarginShield identified ${formatAud(result.headlines.detected_leakage, true)} of detected leakage and ${formatAud(result.headlines.modelled_opportunity, true)} of modelled commercial opportunity in the supplied dataset. Under the base-case planning assumptions, ${formatAud(result.headlines.bankable_base, true)} is classified as expected bankable value over the next 12 months (planning range ${formatAud(result.headlines.bankable_low, true)}–${formatAud(result.headlines.bankable_high, true)}).`,
    ``,
    `Cash claimable now: ${formatAud(result.headlines.cash_claimable, true)}.`,
    `Margin Integrity Index: ${result.headlines.mii} (internal trend index, not an industry benchmark).`,
    `Economic coverage: ${result.headlines.coverage}%.`,
    result.sales_tieout_confirmed ? `Sales tie-out confirmed.` : `Sales tie-out not confirmed.`,
    ``,
    `## Top findings`,
    ...result.findings
      .filter((f) => f.root_cause)
      .sort((a, b) => Number(b.allocated_value) - Number(a.allocated_value))
      .slice(0, 8)
      .map(
        (f) =>
          `- ${f.check_id} ${f.title}: ${formatAud(f.allocated_value, true)} (${f.value_class}, grade ${f.evidence_grade})`,
      ),
    ``,
    `## Disclaimer`,
    BOARD_DISCLAIMER,
  ].join('\n');
}

export function evidenceCsv(result: ScanResult): string {
  const header = ['finding_id', 'kind', 'source_file', 'source_row', 'record_id', 'role', 'value_display'];
  const rows = result.evidence.map((row) =>
    [
      row.finding_id,
      row.evidence_kind,
      row.source_file ?? '',
      row.source_row ?? '',
      row.record_id ?? '',
      row.role,
      escapeSpreadsheetText(row.value_display, false),
    ].join(','),
  );
  return [header.join(','), ...rows].join('\n');
}
