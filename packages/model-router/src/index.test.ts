import { describe, expect, it } from "vitest";
import { z } from "zod";
import { ModelGateway, routeModel, type ModelAdapter } from "./index.js";

const schema = z.object({ title: z.string() });

class FixtureAdapter implements ModelAdapter {
  readonly name = "openai";
  lastPrompt = "";

  complete<T>(prompt: string, outputSchema: { parse: (value: unknown) => T }): Promise<T> {
    this.lastPrompt = prompt;
    return Promise.resolve(outputSchema.parse({ title: "Follow up" }));
  }
}

describe("ModelGateway", () => {
  it("routes high-sensitivity extraction locally", () => {
    expect(routeModel("extraction", "high")).toBe("local");
  });

  it("never expands data scope on retry and records local cost", async () => {
    const adapter = new FixtureAdapter();
    const gateway = new ModelGateway({ openai: adapter }, ["email_excerpt"]);
    const result = await gateway.complete({
      purpose: "extract",
      task: "extraction",
      allowedCategories: ["email_excerpt"],
      requestedCategories: ["email_excerpt"],
      sensitivity: "medium",
      schema,
      maxContextChars: 24,
      prompt: "Jordan Blake promised a proposal by Friday and attached a contract."
    });
    expect(adapter.lastPrompt.length).toBeLessThanOrEqual(24);
    expect(result.privacy.purpose).toBe("extract");
    expect(gateway.costTotal()).toBeGreaterThan(0);
  });

  it("refuses disallowed categories before calling a provider", async () => {
    const gateway = new ModelGateway({ openai: new FixtureAdapter() }, ["calendar_availability"]);
    await expect(
      gateway.complete({
        purpose: "extract",
        task: "extraction",
        allowedCategories: ["email_excerpt"],
        requestedCategories: ["email_excerpt"],
        sensitivity: "low",
        schema,
        maxContextChars: 100,
        prompt: "secret"
      })
    ).rejects.toThrow(/denied/);
  });
});
