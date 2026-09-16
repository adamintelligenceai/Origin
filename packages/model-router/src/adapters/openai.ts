import type { ZodType } from "zod";
import type { ModelAdapter } from "../types.js";

export class OpenAIAdapter implements ModelAdapter {
  readonly name = "openai";

  constructor(
    private readonly fetchImpl: typeof fetch = fetch,
    private readonly apiKey = process.env.OPENAI_API_KEY
  ) {}

  async complete<T>(prompt: string, schema: ZodType<T>): Promise<T> {
    if (!this.apiKey) {
      throw new Error("OpenAI adapter refused to start without an API product key");
    }
    const response = await this.fetchImpl("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.apiKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (!response.ok) {
      throw new Error("OpenAI request failed");
    }
    const body = (await response.json()) as { choices: { message: { content: string } }[] };
    const content = body.choices[0]?.message.content;
    if (!content) {
      throw new Error("OpenAI returned an empty response");
    }
    return schema.parse(JSON.parse(content));
  }
}
