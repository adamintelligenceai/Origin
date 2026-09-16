import type { ZodType } from "zod";
import type { ModelAdapter } from "../types.js";

export type LocalCompleteHook = <T>(prompt: string, schema: ZodType<T>) => Promise<T>;

export class LocalModelAdapter implements ModelAdapter {
  readonly name = "local";

  constructor(private readonly completeLocal?: LocalCompleteHook) {}

  async complete<T>(prompt: string, schema: ZodType<T>): Promise<T> {
    if (this.completeLocal) {
      return this.completeLocal(prompt, schema);
    }
    const parsed = schema.safeParse({});
    if (parsed.success) {
      return parsed.data;
    }
    throw new Error("Local model is not installed on this device");
  }
}
