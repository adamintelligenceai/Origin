import type { ZodType } from "zod";
import type { ModelAdapter } from "../types.js";

const ANTHROPIC_MESSAGES_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractTextContent(body: unknown): string {
  if (!isRecord(body) || !Array.isArray(body.content)) {
    throw new Error("Anthropic returned an empty response");
  }
  const texts: string[] = [];
  for (const block of body.content) {
    if (!isRecord(block) || block.type !== "text" || typeof block.text !== "string") {
      continue;
    }
    texts.push(block.text);
  }
  const content = texts.join("");
  if (!content) {
    throw new Error("Anthropic returned an empty response");
  }
  return content;
}

export class AnthropicAdapter implements ModelAdapter {
  readonly name = "anthropic";

  constructor(
    private readonly fetchImpl: typeof fetch = fetch,
    private readonly apiKey = process.env.ANTHROPIC_API_KEY
  ) {}

  async complete<T>(prompt: string, schema: ZodType<T>): Promise<T> {
    if (!this.apiKey) {
      throw new Error("Anthropic adapter refused to start without an API product key");
    }
    const response = await this.fetchImpl(ANTHROPIC_MESSAGES_URL, {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (!response.ok) {
      throw new Error("Anthropic request failed");
    }
    const body: unknown = await response.json();
    return schema.parse(JSON.parse(extractTextContent(body)));
  }
}
