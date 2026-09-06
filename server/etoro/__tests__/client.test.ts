import { describe, expect, it, vi } from "vitest";

import type { ApiKeyAuth, BearerAuth } from "../../config.js";
import { EtoroApiError, EtoroClient, buildHeaders, joinIds } from "../client.js";

const bearer: BearerAuth = { kind: "bearer", accessToken: "tok-123" };
const apiKey: ApiKeyAuth = {
  kind: "apiKey",
  apiKey: "partner-key",
  userKey: "user-key",
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("buildHeaders", () => {
  it("uses a Bearer token without api-key headers", () => {
    const headers = buildHeaders(bearer);
    expect(headers.get("Authorization")).toBe("Bearer tok-123");
    expect(headers.get("x-api-key")).toBeNull();
    expect(headers.get("x-user-key")).toBeNull();
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("uses api-key pair without a Bearer header", () => {
    const headers = buildHeaders(apiKey);
    expect(headers.get("x-api-key")).toBe("partner-key");
    expect(headers.get("x-user-key")).toBe("user-key");
    expect(headers.get("Authorization")).toBeNull();
  });

  it("always sets a fresh x-request-id (UUID v4)", () => {
    const a = buildHeaders(bearer).get("x-request-id");
    const b = buildHeaders(bearer).get("x-request-id");
    expect(a).toMatch(UUID_RE);
    expect(b).toMatch(UUID_RE);
    expect(a).not.toBe(b);
  });
});

describe("joinIds", () => {
  it("joins with a literal comma (not percent-encoded)", () => {
    expect(joinIds([1001, 1004, 100000])).toBe("1001,1004,100000");
    expect(joinIds(["AAPL", "MSFT"])).toBe("AAPL,MSFT");
  });
});

describe("EtoroClient.getPnl", () => {
  it("requests the environment-scoped PnL path and returns JSON", async () => {
    let calledUrl: string | undefined;
    const fetchImpl = vi.fn(async (url: RequestInfo | URL) => {
      calledUrl = String(url);
      return new Response(JSON.stringify({ clientPortfolio: { credit: 10 } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const client = new EtoroClient({
      baseUrl: "https://public-api.etoro.com/api/v1",
      auth: bearer,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const result = await client.getPnl("demo");
    expect(result.clientPortfolio.credit).toBe(10);
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(calledUrl).toBe(
      "https://public-api.etoro.com/api/v1/trading/info/demo/pnl",
    );
  });

  it("retries on 429 then succeeds", async () => {
    let calls = 0;
    const fetchImpl = vi.fn(async () => {
      calls += 1;
      if (calls === 1) {
        return new Response("rate limited", { status: 429 });
      }
      return new Response(JSON.stringify({ clientPortfolio: { credit: 5 } }), {
        status: 200,
      });
    });

    const client = new EtoroClient({
      baseUrl: "https://public-api.etoro.com/api/v1",
      auth: apiKey,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const result = await client.getPnl("real");
    expect(result.clientPortfolio.credit).toBe(5);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("throws EtoroApiError on a non-retryable 4xx", async () => {
    const fetchImpl = vi.fn(async () =>
      new Response("nope", { status: 403 }),
    );
    const client = new EtoroClient({
      baseUrl: "https://public-api.etoro.com/api/v1",
      auth: bearer,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    await expect(client.getPnl("demo")).rejects.toBeInstanceOf(EtoroApiError);
    expect(fetchImpl).toHaveBeenCalledOnce();
  });
});
