import { NextResponse } from "next/server";
import { recordBillingCustomer } from "../../../../../src/control-plane";
import {
  STRIPE_NOT_CONFIGURED,
  createCheckoutSession,
  parseCheckoutRequest
} from "../../../../../src/stripe";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "account email only" }, { status: 400 });
  }
  let parsed: ReturnType<typeof parseCheckoutRequest>;
  try {
    parsed = parseCheckoutRequest(body);
  } catch {
    return NextResponse.json({ error: "account email only" }, { status: 400 });
  }
  try {
    const origin = new URL(request.url).origin;
    const session = await createCheckoutSession({
      customerEmail: parsed.email,
      successUrl: `${origin}/billing?checkout=success`,
      cancelUrl: `${origin}/billing?checkout=cancel`
    });
    recordBillingCustomer({
      stripeCustomerId: session.customerId,
      status: "none"
    });
    return NextResponse.json({ url: session.url, customerId: session.customerId });
  } catch (error) {
    if (error instanceof Error && error.message === STRIPE_NOT_CONFIGURED) {
      return NextResponse.json({ error: STRIPE_NOT_CONFIGURED }, { status: 503 });
    }
    return NextResponse.json({ error: "checkout failed" }, { status: 502 });
  }
}
