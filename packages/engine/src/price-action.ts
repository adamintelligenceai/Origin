import { d, money, moneyString } from './money';
import type { ActionRecommendation, MethodConfig, RiskBand } from './types';

export function restorePrice(landedCost: ReturnType<typeof money>, targetMargin: number): ReturnType<typeof money> {
  if (targetMargin >= 1 || targetMargin <= 0) return landedCost;
  return money(landedCost.div(d(1 - targetMargin)));
}

export function breakEvenVolumeRetention(currentContribution: number, proposedContribution: number): number {
  if (proposedContribution <= 0) return 1;
  return currentContribution / proposedContribution;
}

export function priceAction(input: {
  finding_id: string;
  current_price: number;
  landed_cost: number;
  target_margin: number;
  t12m_quantity: number;
  risk_band: RiskBand;
  config: MethodConfig;
}): ActionRecommendation {
  const current = money(input.current_price);
  const landed = money(input.landed_cost);
  const target = restorePrice(landed, input.target_margin);
  const cap = input.config.guardrail_increase[input.risk_band];
  const guarded = money(DecimalMin(target, current.times(1 + cap)));
  const conservative = money(current.plus(guarded.minus(current).times(0.5)));
  const staticUpside = money(guarded.minus(current).times(input.t12m_quantity));
  const c0 = Math.max(0, input.current_price - input.landed_cost);
  const c1 = Math.max(0, guarded.toNumber() - input.landed_cost);
  const retention = breakEvenVolumeRetention(c0, c1);
  return {
    finding_id: input.finding_id,
    current_price: moneyString(current),
    restore_price: moneyString(target),
    guarded_price: moneyString(guarded),
    conservative_price: moneyString(conservative),
    static_volume_upside: moneyString(staticUpside),
    break_even_volume_retention: Number(retention.toFixed(6)),
    maximum_volume_decline: Number(Math.max(0, 1 - retention).toFixed(6)),
    exceeds_guardrail: target.gt(current.times(1 + cap)),
  };
}

function DecimalMin(a: ReturnType<typeof money>, b: ReturnType<typeof money>) {
  return a.lessThan(b) ? a : b;
}
