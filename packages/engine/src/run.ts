import type { Finding } from '@marginshield/schemas';
import { allocateSellSide } from './allocation';
import { bankableFor } from './bankability';
import { runBuyChecks, runSellChecks, runServeChecks } from './checks/index';
import { defaultMethodConfig } from './config';
import { economicCoverage } from './coverage';
import { t12mWindow } from './dates';
import { computeRunHash, findingId } from './hash';
import { money, moneyString, zero } from './money';
import { marginIntegrityIndex } from './mii';
import { customerRiskMap, customerSnapshots } from './risk';
import type { CanonicalDataset, DuplicateGroup, ScanResult } from './types';
import { ENGINE_VERSION, METHOD_VERSION } from './version';
import { buildLineEconomics, summariseWaterfall } from './waterfall';

function duplicates(dataset: CanonicalDataset): DuplicateGroup[] {
  const map = new Map<string, string[]>();
  for (const tx of dataset.transactions) {
    const key = `${tx.invoice_no}|${tx.sku}|${tx.invoice_date}|${tx.quantity}|${tx.invoice_revenue}`;
    const list = map.get(key) ?? [];
    list.push(tx.transaction_id);
    map.set(key, list);
  }
  return [...map.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([key, ids]) => ({ key, count: ids.length, transaction_ids: ids, ambiguous: true }));
}

export function runScan(dataset: CanonicalDataset): ScanResult {
  const method = dataset.method_config ?? defaultMethodConfig();
  const working: CanonicalDataset = { ...dataset, method_config: method };
  const run_hash = computeRunHash(working);
  const lines = buildLineEconomics(working);
  const coverage = economicCoverage(working, lines);
  const drafts = [...runSellChecks(working, lines), ...runServeChecks(working, lines), ...runBuyChecks(working, lines)];
  const allocated = allocateSellSide(drafts);
  const snapshots = customerSnapshots(working, lines);
  const riskMap = customerRiskMap(snapshots);
  const t12m = t12mWindow(working.analysis_period.end);
  const findings: Finding[] = allocated.map((draft) => {
    const band = riskMap.get(draft.customer_id ?? '')?.band ?? 'LOW';
    const bank = bankableFor(draft.allocated, draft.check_id, draft.evidence_grade, band, method);
    const id = findingId(draft.check_id, draft.grain_key, working.analysis_period.end);
    return {
      finding_id: id,
      run_hash,
      check_id: draft.check_id,
      family: draft.family,
      value_class: draft.value_class,
      basis_class: draft.basis_class,
      status: 'DETECTED',
      customer_id: draft.customer_id,
      sku: draft.sku,
      product_group: draft.product_group,
      supplier_id: draft.supplier_id,
      invoice_no: draft.invoice_no,
      raw_gap: moneyString(draft.raw_gap),
      allocated_value: moneyString(draft.allocated),
      evidence_grade: draft.evidence_grade,
      capture_low: method.capture[draft.check_id].low,
      capture_base: method.capture[draft.check_id].base,
      capture_high: method.capture[draft.check_id].high,
      risk_band: band,
      bankable_low: bank.low,
      bankable_base: bank.base,
      bankable_high: bank.high,
      cash_claimable: moneyString(draft.cash_claimable ?? zero()),
      root_cause: draft.root_cause,
      facts_json: draft.facts,
      method_version: METHOD_VERSION,
      title: draft.title,
      grain_key: draft.grain_key,
    };
  });

  const evidence = allocated.flatMap((draft) => {
    const id = findingId(draft.check_id, draft.grain_key, working.analysis_period.end);
    return draft.evidence.map((row) => ({ ...row, finding_id: id }));
  });

  const sumClass = (...classes: Finding['value_class'][]) =>
    findings
      .filter((f) => classes.includes(f.value_class))
      .reduce((a, f) => a.plus(money(f.allocated_value)), zero());

  const detected = sumClass('DETECTED_LEAKAGE', 'POLICY_LEAKAGE');
  const modelled = sumClass('MODELLED_MARGIN_OPPORTUNITY');
  const billing = sumClass('BILLING_RISK');
  const cash = findings.reduce((a, f) => a.plus(money(f.cash_claimable)), zero());
  const bankLow = findings.reduce((a, f) => a.plus(money(f.bankable_low)), zero());
  const bankBase = findings.reduce((a, f) => a.plus(money(f.bankable_base)), zero());
  const bankHigh = findings.reduce((a, f) => a.plus(money(f.bankable_high)), zero());
  const t12mSales = lines.filter((l) => l.in_t12m).reduce((a, l) => a.plus(l.invoice_revenue), zero());
  const waterfall = summariseWaterfall(lines);
  const mii = marginIntegrityIndex(detected.toNumber(), modelled.toNumber(), t12mSales.toNumber());
  const comparability =
    working.previous_coverage !== undefined && coverage.score < working.previous_coverage - 5;

  const dupes = duplicates(working);
  const historyMonths =
    (Date.parse(`${working.analysis_period.end}T00:00:00Z`) -
      Date.parse(`${working.analysis_period.start}T00:00:00Z`)) /
    (30.44 * 86_400_000);

  const withCustomerTotals = snapshots.map((snap) => {
    const related = findings.filter((f) => f.customer_id === snap.customer_id);
    const det = related
      .filter((f) => f.value_class === 'DETECTED_LEAKAGE' || f.value_class === 'POLICY_LEAKAGE')
      .reduce((a, f) => a.plus(money(f.allocated_value)), zero());
    const mod = related
      .filter((f) => f.value_class === 'MODELLED_MARGIN_OPPORTUNITY')
      .reduce((a, f) => a.plus(money(f.allocated_value)), zero());
    return {
      ...snap,
      detected_leakage: moneyString(det),
      modelled_opportunity: moneyString(mod),
    };
  });

  return {
    run_hash,
    engine_version: ENGINE_VERSION,
    method_version: METHOD_VERSION,
    period: { start: working.analysis_period.start, end: working.analysis_period.end, t12m_start: t12m.start, t12m_end: t12m.end },
    reporting_currency: working.reporting_currency,
    headlines: {
      detected_leakage: moneyString(detected),
      modelled_opportunity: moneyString(modelled),
      addressable_margin: moneyString(detected.plus(modelled)),
      bankable_low: moneyString(bankLow),
      bankable_base: moneyString(bankBase),
      bankable_high: moneyString(bankHigh),
      cash_claimable: moneyString(cash),
      billing_risk: moneyString(billing),
      t12m_net_sales: moneyString(t12mSales),
      mii,
      coverage: coverage.score,
      comparability_warning: comparability,
    },
    coverage,
    findings,
    evidence,
    waterfall,
    customers: withCustomerTotals,
    sales_tieout_confirmed: working.sales_tieout_confirmed,
    limited_history: historyMonths < 12,
    duplicates: dupes,
  };
}
