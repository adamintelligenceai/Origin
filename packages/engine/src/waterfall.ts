import { d, max0, money, zero, type Dec } from './money';
import type { CanonicalDataset, LineEconomics, SupplierCost, Transaction } from './types';
import { inRange, t12mWindow } from './dates';

export function landedCostOnDate(costs: SupplierCost[], sku: string, onDate: string): SupplierCost | undefined {
  const matches = costs
    .filter((row) => row.sku === sku && row.effective_from <= onDate && (!row.effective_to || row.effective_to >= onDate))
    .sort((a, b) => b.effective_from.localeCompare(a.effective_from));
  return matches[0];
}

export function reconstructLanded(cost: SupplierCost): Dec {
  if (cost.true_landed_cost) {
    return money(cost.true_landed_cost);
  }
  const rebate = cost.rebate_component_status === 'available' ? money(cost.earned_rebate_per_unit) : zero();
  return money(
    money(cost.supplier_list_cost)
      .minus(money(cost.supplier_discount))
      .minus(rebate)
      .plus(money(cost.inbound_freight))
      .plus(money(cost.duty))
      .plus(money(cost.import_charges))
      .plus(money(cost.fx_adjustment)),
  );
}

export function lineEconomics(dataset: CanonicalDataset, tx: Transaction): LineEconomics {
  const qty = d(tx.quantity);
  const invoiceRevenue = money(tx.invoice_revenue);
  const grossList = tx.list_price_per_unit ? money(d(tx.list_price_per_unit).times(qty)) : zero();
  const credits = tx.net_sales_includes_credit ? zero() : money(tx.credit_amount);
  const rebate = tx.net_sales_includes_rebate ? zero() : money(tx.customer_rebate);
  const allowance = money(tx.commercial_allowance);
  const freightCost = money(tx.freight_cost);
  const freightCharged = money(tx.freight_charged);
  const unrecoveredFreight = tx.net_sales_includes_freight ? zero() : max0(freightCost.minus(freightCharged));
  const pocketRevenue = money(invoiceRevenue.minus(credits).minus(rebate).minus(allowance).minus(unrecoveredFreight));
  const costRow = landedCostOnDate(dataset.supplier_costs, tx.sku, tx.invoice_date);
  const landedUnit = costRow ? reconstructLanded(costRow) : money(tx.erp_cost);
  const landedTotal = money(landedUnit.times(qty));
  const frontEnd = money(invoiceRevenue.minus(money(tx.erp_cost).times(qty)));
  const pocketContribution = money(pocketRevenue.minus(landedTotal));
  const economic = money(
    pocketContribution
      .minus(unrecoveredFreight)
      .minus(money(tx.pick_pack))
      .minus(money(tx.commission))
      .minus(money(tx.payment_processing))
      .minus(money(tx.service_expense)),
  );
  const t12m = t12mWindow(dataset.analysis_period.end);
  return {
    transaction: tx,
    gross_list_value: grossList,
    invoice_revenue: invoiceRevenue,
    pocket_revenue: pocketRevenue,
    front_end_contribution: frontEnd,
    pocket_contribution: pocketContribution,
    economic_contribution: economic,
    landed_cost_per_unit: landedUnit,
    landed_cost_total: landedTotal,
    in_t12m: inRange(tx.invoice_date, t12m.start, t12m.end),
  };
}

export function buildLineEconomics(dataset: CanonicalDataset): LineEconomics[] {
  return dataset.transactions.map((tx) => lineEconomics(dataset, tx));
}

export function summariseWaterfall(lines: LineEconomics[]): {
  gross_list_value: string;
  invoice_revenue: string;
  pocket_revenue: string;
  true_landed_cost: string;
  pocket_contribution: string;
  economic_contribution: string;
} {
  const t12m = lines.filter((line) => line.in_t12m);
  const sum = (pick: (line: LineEconomics) => Dec) =>
    t12m.reduce((acc, line) => acc.plus(pick(line)), zero()).toFixed(4);
  return {
    gross_list_value: sum((l) => l.gross_list_value),
    invoice_revenue: sum((l) => l.invoice_revenue),
    pocket_revenue: sum((l) => l.pocket_revenue),
    true_landed_cost: sum((l) => l.landed_cost_total),
    pocket_contribution: sum((l) => l.pocket_contribution),
    economic_contribution: sum((l) => l.economic_contribution),
  };
}
