import { prepareExternalContext, type DataCategory } from "@project-chief/privacy";
import { BudgetGuard, estimateUsd, LocalCostLedger, RateLimiter } from "./cost.js";
import { retrySameScope } from "./retry.js";
import type {
  ModelAdapter,
  ModelRequest,
  ModelResponse,
  ModelTask,
  ModelTier,
  Sensitivity
} from "./types.js";

function economyOrLocal(sensitivity: Sensitivity): ModelTier {
  switch (sensitivity) {
    case "high":
      return "local";
    case "low":
    case "medium":
      return "economy";
    default: {
      const exhaustive: never = sensitivity;
      return exhaustive;
    }
  }
}

export function routeModel(task: ModelTask, sensitivity: Sensitivity): ModelTier {
  switch (task) {
    case "classification":
    case "extraction":
      return economyOrLocal(sensitivity);
    case "draft":
    case "planning":
      return "standard";
    case "high_value_reasoning":
      return "frontier";
    default: {
      const exhaustive: never = task;
      return exhaustive;
    }
  }
}

export class ModelGateway {
  constructor(
    private readonly adapters: Record<string, ModelAdapter>,
    private readonly allowed: DataCategory[],
    private readonly costs = new LocalCostLedger(),
    private readonly budget: BudgetGuard = new BudgetGuard(5),
    private readonly rateLimiter: RateLimiter = new RateLimiter()
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
    const adapter = this.selectAdapter(request.sensitivity);
    this.rateLimiter.assertAllowed();
    const inputTokens = Math.ceil(prepared.text.length / 4);
    const estimated = estimateUsd(inputTokens, 64);
    this.budget.assertWithinBudget(estimated);
    const output = await retrySameScope(() => adapter.complete(prepared.text, request.schema));
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

  costSnapshot(): readonly { usd: number }[] {
    return this.costs.snapshot();
  }

  private selectAdapter(sensitivity: Sensitivity): ModelAdapter {
    switch (sensitivity) {
      case "high": {
        const local = this.adapters.local;
        if (!local) {
          throw new Error("High-sensitivity tasks cannot leave this device");
        }
        return local;
      }
      case "low":
      case "medium": {
        const adapter = this.adapters.openai ?? this.adapters.anthropic ?? this.adapters.local;
        if (!adapter) {
          throw new Error("No model adapter is configured");
        }
        return adapter;
      }
      default: {
        const exhaustive: never = sensitivity;
        return exhaustive;
      }
    }
  }
}

export { BudgetGuard, estimateUsd, LocalCostLedger, RateLimiter } from "./cost.js";
export { retrySameScope } from "./retry.js";
export { AnthropicAdapter } from "./adapters/anthropic.js";
export { LocalModelAdapter } from "./adapters/local.js";
export { OpenAIAdapter } from "./adapters/openai.js";
export type {
  ModelAdapter,
  ModelRequest,
  ModelResponse,
  ModelTask,
  ModelTier,
  Sensitivity
} from "./types.js";
