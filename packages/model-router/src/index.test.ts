import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  AnthropicAdapter,
  BudgetGuard,
  LocalCostLedger,
  LocalModelAdapter,
  ModelGateway,
  OpenAIAdapter,
  routeModel,
  type ModelAdapter
} from "./index.js";

const schema = z.object({ title: z.string() });

class FixtureAdapter implements ModelAdapter {
  readonly name = "openai";
  lastPrompt = "";

  complete<T>(prompt: string, outputSchema: { parse: (value: unknown) => T }): Promise<T> {
    this.lastPrompt = prompt;
    return Promise.resolve(outputSchema.parse({ title: "Follow up" }));
  }
}

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }
  if (input instanceof URL) {
    return input.href;
  }
  return input.url;
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

  it("blocks when budget is exceeded", async () => {
    const gateway = new ModelGateway(
      { openai: new FixtureAdapter() },
      ["email_excerpt"],
      new LocalCostLedger(),
      new BudgetGuard(0)
    );
    await expect(
      gateway.complete({
        purpose: "extract",
        task: "extraction",
        allowedCategories: ["email_excerpt"],
        requestedCategories: ["email_excerpt"],
        sensitivity: "low",
        schema,
        maxContextChars: 100,
        prompt: "Jordan Blake promised a proposal by Friday."
      })
    ).rejects.toThrow(/Model budget exceeded/);
  });

  it("fails closed for high sensitivity without a local adapter", async () => {
    const gateway = new ModelGateway({ openai: new FixtureAdapter() }, ["email_excerpt"]);
    await expect(
      gateway.complete({
        purpose: "extract",
        task: "extraction",
        allowedCategories: ["email_excerpt"],
        requestedCategories: ["email_excerpt"],
        sensitivity: "high",
        schema,
        maxContextChars: 100,
        prompt: "private medical note"
      })
    ).rejects.toThrow(/High-sensitivity tasks cannot leave this device/);
  });

  it("does not store prompt text on the gateway or cost ledger", async () => {
    const costs = new LocalCostLedger();
    const gateway = new ModelGateway({ openai: new FixtureAdapter() }, ["email_excerpt"], costs);
    const prompt = "UNIQUE_PROMPT_TOKEN_do_not_persist";
    await gateway.complete({
      purpose: "extract",
      task: "extraction",
      allowedCategories: ["email_excerpt"],
      requestedCategories: ["email_excerpt"],
      sensitivity: "medium",
      schema,
      maxContextChars: 80,
      prompt
    });
    expect("prompt" in gateway).toBe(false);
    expect(JSON.stringify(gateway.costSnapshot())).not.toContain(prompt);
    for (const entry of costs.snapshot()) {
      expect(entry).not.toHaveProperty("prompt");
    }
  });
});

describe("OpenAIAdapter", () => {
  it("refuses without an API product key", async () => {
    const adapter = new OpenAIAdapter(globalThis.fetch, "");
    await expect(adapter.complete("hello", schema)).rejects.toThrow(/API product key/);
  });

  it("parses JSON from a mocked fetch", async () => {
    const fetchImpl: typeof fetch = () =>
      Promise.resolve(
        jsonResponse({
          choices: [{ message: { content: JSON.stringify({ title: "Follow up" }) } }]
        })
      );
    const adapter = new OpenAIAdapter(fetchImpl, "test-openai-key");
    await expect(adapter.complete("summarise", schema)).resolves.toEqual({ title: "Follow up" });
  });
});

describe("AnthropicAdapter", () => {
  it("refuses without an API product key", async () => {
    const adapter = new AnthropicAdapter(globalThis.fetch, "");
    await expect(adapter.complete("hello", schema)).rejects.toThrow(/API product key/);
  });

  it("parses JSON from a mocked fetch", async () => {
    const fetchImpl: typeof fetch = (input, init) => {
      expect(requestUrl(input)).toBe("https://api.anthropic.com/v1/messages");
      expect(init?.method).toBe("POST");
      const headers = new Headers(init?.headers);
      expect(headers.get("x-api-key")).toBe("test-anthropic-key");
      expect(headers.get("anthropic-version")).toBe("2023-06-01");
      expect(headers.get("content-type")).toBe("application/json");
      return Promise.resolve(
        jsonResponse({
          content: [{ type: "text", text: JSON.stringify({ title: "Follow up" }) }]
        })
      );
    };
    const adapter = new AnthropicAdapter(fetchImpl, "test-anthropic-key");
    await expect(adapter.complete("summarise", schema)).resolves.toEqual({ title: "Follow up" });
  });
});

describe("LocalModelAdapter", () => {
  it("does not fetch and fails closed without a local completion hook", async () => {
    let fetched = false;
    const originalFetch = globalThis.fetch;
    const fetchSpy: typeof fetch = () => {
      fetched = true;
      return Promise.resolve(jsonResponse({}));
    };
    globalThis.fetch = fetchSpy;
    try {
      const adapter = new LocalModelAdapter();
      await expect(adapter.complete("secret prompt", schema)).rejects.toThrow(
        /Local model is not installed on this device/
      );
      expect(fetched).toBe(false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
