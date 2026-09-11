import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    ok: true,
    message: 'Magic link sending requires Supabase configuration. Use the demo scan locally without auth.',
  });
}
