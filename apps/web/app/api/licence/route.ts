import { NextResponse } from 'next/server';

/** Licence endpoint stub — Phase 13 replaces with signed entitlements. */
export async function GET() {
  return NextResponse.json({
    plan: 'scan',
    entitlements: ['demo', 'local_scan'],
    methodVersion: '0.1.0',
    configVersion: '0.1.0',
  });
}
