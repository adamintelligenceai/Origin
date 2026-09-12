import type { PrivacyReceipt } from "@project-chief/types";
import type { DataCategory } from "@project-chief/privacy";
import type { ZodType } from "zod";

export type ModelTask =
  "classification" | "extraction" | "draft" | "planning" | "high_value_reasoning";

export type ModelTier = "local" | "economy" | "standard" | "frontier";
export type Sensitivity = "low" | "medium" | "high";

export interface ModelRequest<T> {
  purpose: string;
  task: ModelTask;
  allowedCategories: DataCategory[];
  requestedCategories: DataCategory[];
  sensitivity: Sensitivity;
  schema: ZodType<T>;
  maxContextChars: number;
  prompt: string;
}

export interface ModelResponse<T> {
  output: T;
  provider: string;
  tier: ModelTier;
  privacy: PrivacyReceipt;
  inputTokens: number;
  outputTokens: number;
  estimatedUsd: number;
}

export interface ModelAdapter {
  readonly name: string;
  complete<T>(prompt: string, schema: ZodType<T>): Promise<T>;
}
