import type { ZodType } from "zod";
import type { ModelAdapter } from "../types.js";

export class LocalModelAdapter implements ModelAdapter {
  readonly name = "local";

  complete<T>(_prompt: string, _schema: ZodType<T>): Promise<T> {
    return Promise.reject(new Error("Local model adapter is a Phase 6 interface stub"));
  }
}
