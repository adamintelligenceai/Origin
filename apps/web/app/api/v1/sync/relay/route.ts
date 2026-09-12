import { NextResponse } from "next/server";
import { getEnvelope, storeEnvelope, type RelayEnvelope } from "../../../../../src/control-plane";

export function GET(request: Request): Response {
  const envelopeId = new URL(request.url).searchParams.get("envelopeId");
  if (!envelopeId) {
    return NextResponse.json({ error: "envelopeId required" }, { status: 400 });
  }
  const envelope = getEnvelope(envelopeId);
  if (!envelope) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(envelope);
}

export function POST(request: Request): Promise<Response> {
  return request.json().then((body: RelayEnvelope) => {
    try {
      return NextResponse.json(storeEnvelope(body));
    } catch {
      return NextResponse.json({ error: "ciphertext envelope only" }, { status: 400 });
    }
  });
}
