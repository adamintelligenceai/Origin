import type { ZodType } from "zod";
import type { ModelAdapter } from "../types.js";

export class AnthropicAdapter implements ModelAdapter {
  readonly name = "anthropic";

  complete<T>(_prompt: string, _schema: ZodType<T>): Promise<T> {
    return Promise.reject(new Error("Anthropic adapter is a Phase 6 interface stub"));
  }
}
