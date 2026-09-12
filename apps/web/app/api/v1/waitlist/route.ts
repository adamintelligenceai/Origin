import { NextResponse } from "next/server";
import { recordWaitlist } from "../../../../src/control-plane";

export function POST(request: Request): Promise<Response> {
  return request.json().then((body: { email?: string }) => {
    if (!body.email?.includes("@")) {
      return NextResponse.json({ error: "email required" }, { status: 400 });
    }
    return NextResponse.json(recordWaitlist(body.email));
  });
}
