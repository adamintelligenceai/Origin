import type { ScanResult } from '@marginshield/engine';
import { escapeSpreadsheetText } from '@marginshield/engine';
import ExcelJS from 'exceljs';
import { BOARD_DISCLAIMER } from './text';

export async function actionWorkbook(result: ScanResult): Promise<ArrayBuffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'MarginShield';
  const exec = wb.addWorksheet('Executive');
  exec.addRow(['MarginShield action pack']);
  exec.addRow(['Run hash', result.run_hash]);
  exec.addRow(['Detected leakage', result.headlines.detected_leakage]);
  exec.addRow(['Modelled opportunity', result.headlines.modelled_opportunity]);
  exec.addRow(['Bankable base', result.headlines.bankable_base]);
  exec.addRow(['Cash claimable', result.headlines.cash_claimable]);
  exec.addRow(['Disclaimer', BOARD_DISCLAIMER]);
  const leak = wb.addWorksheet('Detected leakage');
  leak.addRow(['finding_id', 'check', 'customer', 'sku', 'allocated', 'grade', 'title']);
  for (const f of result.findings.filter(
    (x) => x.value_class === 'DETECTED_LEAKAGE' || x.value_class === 'POLICY_LEAKAGE',
  )) {
    leak.addRow([
      f.finding_id,
      f.check_id,
      f.customer_id ?? '',
      f.sku ?? '',
      Number(f.allocated_value),
      f.evidence_grade,
      escapeSpreadsheetText(f.title, false),
    ]);
  }
  const buffer = await wb.xlsx.writeBuffer();
  return buffer as ArrayBuffer;
}
