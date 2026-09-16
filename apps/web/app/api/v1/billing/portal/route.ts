import { NextResponse } from "next/server";
import {
  STRIPE_NOT_CONFIGURED,
  createPortalSession,
  parsePortalRequest
} from "../../../../../src/stripe";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "customer id only" }, { status: 400 });
  }
  let parsed: ReturnType<typeof parsePortalRequest>;
  try {
    parsed = parsePortalRequest(body);
  } catch {
    return NextResponse.json({ error: "customer id only" }, { status: 400 });
  }
  try {
    const origin = new URL(request.url).origin;
    const session = await createPortalSession({
      customerId: parsed.customerId,
      returnUrl: `${origin}/billing`
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof Error && error.message === STRIPE_NOT_CONFIGURED) {
      return NextResponse.json({ error: STRIPE_NOT_CONFIGURED }, { status: 503 });
    }
    return NextResponse.json({ error: "portal failed" }, { status: 502 });
  }
}
