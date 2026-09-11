import type { MappedTable, SemanticConfirmation } from '@marginshield/engine';
import { runIngestedScan, type MethodConfig } from '@marginshield/engine';

export async function runScanClient(input: {
  tables: MappedTable[];
  semantics?: SemanticConfirmation;
  method_config?: MethodConfig;
  sales_tieout_confirmed?: boolean;
  known_sales_total?: string;
  source_texts?: Record<string, string>;
}) {
  return runIngestedScan(input);
}
