import { NextResponse } from 'next/server';
import { METHOD_VERSION } from '@marginshield/engine';

export async function GET() {
  return NextResponse.json({
    token: 'demo-licence',
    plan: 'demo',
    entitlements: {
      scans_remaining: 1,
      ai_commentary: false,
      method_version: METHOD_VERSION,
    },
    expires_at: '2030-01-01T00:00:00Z',
    note: 'Licence controls authorised use. It does not hide the client-side method.',
  });
}
