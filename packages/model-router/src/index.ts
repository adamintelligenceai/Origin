import { prepareExternalContext, type DataCategory } from "@project-chief/privacy";
import { estimateUsd, LocalCostLedger } from "./cost.js";
import { retrySameScope } from "./retry.js";
import type {
  ModelAdapter,
  ModelRequest,
  ModelResponse,
  ModelTask,
  ModelTier,
  Sensitivity
} from "./types.js";

export function routeModel(task: ModelTask, sensitivity: Sensitivity): ModelTier {
  if (task === "classification" || task === "extraction") {
    return sensitivity === "high" ? "local" : "economy";
  }
  if (task === "draft" || task === "planning") {
    return "standard";
  }
  return "frontier";
}

export class ModelGateway {
  constructor(
    private readonly adapters: Record<string, ModelAdapter>,
    private readonly allowed: DataCategory[],
    private readonly costs = new LocalCostLedger()
  ) {}

  async complete<T>(request: ModelRequest<T>): Promise<ModelResponse<T>> {
    const prepared = prepareExternalContext({
      purpose: request.purpose,
      text: request.prompt,
      requested: request.requestedCategories,
      allowed: this.allowed.filter((category) => request.allowedCategories.includes(category)),
      sensitivity: request.sensitivity,
      maxChars: request.maxContextChars
    });
    const adapter = this.adapters.openai ?? this.adapters.local;
    if (!adapter) {
      throw new Error("No model adapter is configured");
    }
    const output = await retrySameScope(() => adapter.complete(prepared.text, request.schema));
    const inputTokens = Math.ceil(prepared.text.length / 4);
    const estimated = estimateUsd(inputTokens, 64);
    this.costs.record(estimated);
    return {
      output,
      provider: adapter.name,
      tier: routeModel(request.task, request.sensitivity),
      privacy: prepared.receipt,
      inputTokens,
      outputTokens: 64,
      estimatedUsd: estimated
    };
  }

  costTotal(): number {
    return this.costs.total();
  }
}

export { estimateUsd, LocalCostLedger } from "./cost.js";
export { retrySameScope } from "./retry.js";
export { AnthropicAdapter } from "./adapters/anthropic.js";
export { LocalModelAdapter } from "./adapters/local.js";
export { AnthropicAdapterStub, LocalModelAdapterStub, OpenAIAdapter } from "./adapters/openai.js";
export type {
  ModelAdapter,
  ModelRequest,
  ModelResponse,
  ModelTask,
  ModelTier,
  Sensitivity
} from "./types.js";
