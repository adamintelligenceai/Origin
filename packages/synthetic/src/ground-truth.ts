import type { CheckId } from "@marginshield/schemas";
import { PLANTED_TARGETS } from "./config.js";

export interface GroundTruthIssue {
  check_id: CheckId;
  grain_keys: Record<string, string>;
  expected_value: number;
  value_class: string;
  source_records: string[];
}

export interface GroundTruthFile {
  company: string;
  tag: string;
  seed: number;
  variant: string;
  generated_at: string;
  totals: {
    addressable_margin: number;
    detected_leakage: number;
    modelled_opportunity: number;
    cash_entitlement: number;
  };
  issues: GroundTruthIssue[];
  file_hashes: Record<string, string>;
}

export function buildGroundTruthIssues(variant: string): GroundTruthIssue[] {
  if (variant === "clean") {
    return [];
  }

  const valueClasses: Record<string, string> = {
    P1: "DETECTED_LEAKAGE",
    P2: "MODELLED_MARGIN_OPPORTUNITY",
    P3: "MODELLED_MARGIN_OPPORTUNITY",
    P4: "MODELLED_MARGIN_OPPORTUNITY",
    P5: "MODELLED_MARGIN_OPPORTUNITY",
    P6: "MODELLED_MARGIN_OPPORTUNITY",
    S1: "DETECTED_LEAKAGE",
    S2: "POLICY_LEAKAGE",
    S3: "POLICY_LEAKAGE",
    B1: "DETECTED_LEAKAGE",
  };

  return (Object.keys(PLANTED_TARGETS) as Array<keyof typeof PLANTED_TARGETS>).map(
    (checkId, index) => ({
      check_id: checkId,
      grain_keys: {
        customer_id: `C-${String(index + 1).padStart(3, "0")}`,
        sku: `SKU-${String(index + 100).padStart(5, "0")}`,
      },
      expected_value: PLANTED_TARGETS[checkId],
      value_class: valueClasses[checkId] ?? "INSIGHT",
      source_records: [`${checkId.toLowerCase()}_plant_${index + 1}`],
    }),
  );
}
