import { NextResponse } from "next/server";
import { listDevices, upsertDevice } from "../../../../src/control-plane";

export function GET(): Response {
  return NextResponse.json({ devices: listDevices() });
}

export function POST(request: Request): Promise<Response> {
  return request.json().then((body: unknown) => {
    try {
      return NextResponse.json(upsertDevice(body));
    } catch {
      return NextResponse.json({ error: "device public metadata only" }, { status: 400 });
    }
  });
}
