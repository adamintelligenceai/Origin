import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { ScanResult } from '@marginshield/engine';
import { formatAud } from '@marginshield/ui';
import { BOARD_DISCLAIMER } from './text';

export async function boardPackPdf(result: ScanResult, company = 'Harbourline Trade Supply Pty Ltd'): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.09, 0.14, 0.23);
  let y = 800;
  const write = (text: string, size = 11, useBold = false) => {
    const face = useBold ? bold : font;
    const lines = wrap(text, 90);
    for (const line of lines) {
      page.drawText(line, { x: 48, y, size, font: face, color: ink });
      y -= size + 6;
    }
  };
  write('MarginShield board pack', 22, true);
  write(`${company} — fictional demonstration company`, 10);
  write(`Period ${result.period.t12m_start} to ${result.period.t12m_end}`, 10);
  write(`Run ${result.run_hash} · method ${result.method_version}`, 10);
  y -= 8;
  write('Executive answer', 14, true);
  write(
    `MarginShield identified ${formatAud(result.headlines.detected_leakage, true)} of detected leakage and ${formatAud(result.headlines.modelled_opportunity, true)} of modelled commercial opportunity. Under base-case planning assumptions, ${formatAud(result.headlines.bankable_base, true)} is classified as expected bankable value (range ${formatAud(result.headlines.bankable_low, true)}–${formatAud(result.headlines.bankable_high, true)}).`,
  );
  write(`Cash claimable now: ${formatAud(result.headlines.cash_claimable, true)}.`);
  write(`Margin Integrity Index: ${result.headlines.mii}. Economic coverage: ${result.headlines.coverage}%.`);
  y -= 8;
  write('Top findings', 14, true);
  const top = [...result.findings]
    .filter((f) => f.root_cause)
    .sort((a, b) => Number(b.allocated_value) - Number(a.allocated_value))
    .slice(0, 8);
  for (const finding of top) {
    write(`${finding.check_id}  ${finding.title}  ${formatAud(finding.allocated_value, true)}`);
  }
  y -= 12;
  write('Disclaimer', 12, true);
  write(BOARD_DISCLAIMER, 9);
  return doc.save();
}

function wrap(text: string, width: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width) {
      if (current) lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines;
}
