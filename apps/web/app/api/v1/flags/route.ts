import { NextResponse } from "next/server";
import { cloudFlagSchema } from "@project-chief/types";
import { getFlags, setFlag } from "../../../../src/control-plane";

export function GET(): Response {
  return NextResponse.json(getFlags());
}

export function POST(request: Request): Promise<Response> {
  return request.json().then((body: unknown) => {
    const parsed = cloudFlagSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "flag id and enabled only" }, { status: 400 });
    }
    try {
      return NextResponse.json(setFlag(parsed.data.id, parsed.data.enabled));
    } catch {
      return NextResponse.json({ error: "unknown flag" }, { status: 400 });
    }
  });
}
