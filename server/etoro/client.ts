import { randomUUID } from "node:crypto";

import type { EtoroAuth, EtoroEnvironment } from "../config.js";
import type { EtoroPnlResponse } from "./types.js";

export class EtoroApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: string,
  ) {
    super(message);
    this.name = "EtoroApiError";
  }
}

export interface EtoroClientOptions {
  baseUrl: string;
  auth: EtoroAuth;
  /** Injectable for tests; defaults to the global fetch (Node 18+). */
  fetchImpl?: typeof fetch;
  /** Number of retries for 429/5xx responses. */
  maxRetries?: number;
}

/**
 * Build the required headers for a Public API request.
 *
 * Rules enforced here:
 *  - Bearer OR API key, never both.
 *  - A fresh `x-request-id` (UUID v4) is generated per request for tracing.
 */
export function buildHeaders(auth: EtoroAuth): Headers {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("x-request-id", randomUUID());

  switch (auth.kind) {
    case "bearer":
      headers.set("Authorization", `Bearer ${auth.accessToken}`);
      break;
    case "apiKey":
      headers.set("x-api-key", auth.apiKey);
      headers.set("x-user-key", auth.userKey);
      break;
    default: {
      const _exhaustive: never = auth;
      throw new Error(`Unsupported auth kind: ${JSON.stringify(_exhaustive)}`);
    }
  }

  return headers;
}

/**
 * Join a list of IDs for comma-separated query params using a literal comma.
 * eToro rejects percent-encoded `%2C`, so we must not run these through
 * URLSearchParams.
 */
export function joinIds(ids: Array<string | number>): string {
  return ids.map(String).join(",");
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class EtoroClient {
  private readonly baseUrl: string;
  private readonly auth: EtoroAuth;
  private readonly fetchImpl: typeof fetch;
  private readonly maxRetries: number;

  constructor(options: EtoroClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.auth = options.auth;
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.maxRetries = options.maxRetries ?? 3;
  }

  /**
   * `GET /trading/info/{env}/pnl` — returns the whole account state.
   */
  async getPnl(env: EtoroEnvironment): Promise<EtoroPnlResponse> {
    const url = `${this.baseUrl}/trading/info/${env}/pnl`;
    const response = await this.request(url);
    return (await response.json()) as EtoroPnlResponse;
  }

  private async request(url: string): Promise<Response> {
    let attempt = 0;
    // Retry only on 429 and 5xx with exponential backoff; other errors surface
    // immediately (a 4xx will not become a 2xx on retry).
    for (;;) {
      const response = await this.fetchImpl(url, {
        method: "GET",
        headers: buildHeaders(this.auth),
      });

      if (response.ok) {
        return response;
      }

      const retryable = response.status === 429 || response.status >= 500;
      if (retryable && attempt < this.maxRetries) {
        const delay = 2 ** attempt * 500;
        attempt += 1;
        await sleep(delay);
        continue;
      }

      const body = await response.text().catch(() => "");
      throw new EtoroApiError(
        `eToro request to ${url} failed with ${response.status}`,
        response.status,
        body,
      );
    }
  }
}
