"use client";

import { useEffect, useState } from "react";

const PRODUCT_NAME = "Project Chief";
const CUSTOMER_STORAGE_KEY = "project-chief.stripeCustomerId";
const UNCONFIGURED_MESSAGE = "Stripe test mode is not configured on this control plane.";

export default function BillingPage() {
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [unconfigured, setUnconfigured] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (stored) {
      setCustomerId(stored);
    }
  }, []);

  function onCheckout(event: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    event.preventDefault();
    setError(undefined);
    setUnconfigured(false);
    const value = new FormData(event.currentTarget).get("email");
    const email = typeof value === "string" ? value : "";
    void fetch("/api/v1/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }).then(async (response) => {
      if (response.status === 503) {
        setUnconfigured(true);
        return;
      }
      if (!response.ok) {
        setError("Checkout could not start.");
        return;
      }
      const data: unknown = await response.json();
      const url = readUrl(data);
      const nextCustomerId = readCustomerId(data);
      if (nextCustomerId) {
        sessionStorage.setItem(CUSTOMER_STORAGE_KEY, nextCustomerId);
        setCustomerId(nextCustomerId);
      }
      if (!url?.startsWith("https://")) {
        setError("Checkout could not start.");
        return;
      }
      window.location.assign(url);
    });
  }

  function onPortal() {
    if (!customerId) {
      return;
    }
    setError(undefined);
    setUnconfigured(false);
    void fetch("/api/v1/billing/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId })
    }).then(async (response) => {
      if (response.status === 503) {
        setUnconfigured(true);
        return;
      }
      if (!response.ok) {
        setError("Customer portal could not open.");
        return;
      }
      const data: unknown = await response.json();
      const url = readUrl(data);
      if (!url?.startsWith("https://")) {
        setError("Customer portal could not open.");
        return;
      }
      window.location.assign(url);
    });
  }

  return (
    <main>
      <p className="eyebrow">Billing</p>
      <h1>Stripe customer of record.</h1>
      <p className="lede">
        {PRODUCT_NAME} founding access is A$69/month. Cancellation is one action. No source content
        is sent to Stripe.
      </p>
      {unconfigured ? <p className="lede">{UNCONFIGURED_MESSAGE}</p> : null}
      {error ? <p className="lede">{error}</p> : null}
      <form onSubmit={onCheckout}>
        <label>
          Account email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <button type="submit">Start founding subscription</button>
        {customerId ? (
          <button type="button" className="secondary" onClick={onPortal}>
            Open customer portal
          </button>
        ) : null}
      </form>
      <section className="trust">
        <article>
          <span>Charge</span>
          <h2>A$69 / month</h2>
          <p>Founding price for the first 100 seats after the 14-day trial.</p>
        </article>
        <article>
          <span>Cancel</span>
          <h2>One action</h2>
          <p>The personal node keeps working offline. Cloud features stop with the subscription.</p>
        </article>
        <article>
          <span>Data</span>
          <h2>Content-free</h2>
          <p>Stripe receives customer and payment fields only. Never mail, calendar or prompts.</p>
        </article>
      </section>
    </main>
  );
}

function readUrl(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null || !("url" in data)) {
    return undefined;
  }
  return typeof data.url === "string" ? data.url : undefined;
}

function readCustomerId(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null || !("customerId" in data)) {
    return undefined;
  }
  return typeof data.customerId === "string" && data.customerId.length > 0
    ? data.customerId
    : undefined;
}
