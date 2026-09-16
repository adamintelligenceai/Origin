import { NextResponse } from "next/server";
import { applyBillingWebhook } from "../../../../../src/control-plane";
import {
  STRIPE_NOT_CONFIGURED,
  constructEvent,
  customerIdFromStripeObject
} from "../../../../../src/stripe";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  const payload = await request.text();
  const header = request.headers.get("stripe-signature") ?? "";
  try {
    const event = constructEvent(payload, header);
    console.info("stripe.webhook", event.type, event.id);
    const customerId = customerIdFromStripeObject(event.data.object);
    if (customerId) {
      applyBillingWebhook(event.type, customerId);
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    if (error instanceof Error && error.message === STRIPE_NOT_CONFIGURED) {
      return NextResponse.json({ error: STRIPE_NOT_CONFIGURED }, { status: 503 });
    }
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }
}
