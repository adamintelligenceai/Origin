import { NextResponse } from 'next/server';
import { deterministicExecutive, narrativeRequestSchema } from '@marginshield/api-client';

export async function POST(request: Request) {
  const json: unknown = await request.json();
  const parsed = narrativeRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }
  const text = deterministicExecutive(parsed.data.facts);
  return NextResponse.json({ narrative: text, provider: 'deterministic' });
}
