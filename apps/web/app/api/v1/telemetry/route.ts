import { NextResponse } from "next/server";
import { recordTelemetry } from "../../../../src/control-plane";

export function POST(request: Request): Promise<Response> {
  return request.json().then((body: unknown) => {
    try {
      return NextResponse.json(recordTelemetry(body));
    } catch {
      return NextResponse.json({ error: "content-free telemetry only" }, { status: 400 });
    }
  });
}
