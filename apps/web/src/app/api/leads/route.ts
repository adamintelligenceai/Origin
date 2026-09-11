import { NextResponse } from 'next/server';

/** Lead capture — stores no transaction data; body is contact metadata only. */
export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  let payload: Record<string, string> = {};
  if (contentType.includes('application/json')) {
    payload = (await request.json()) as Record<string, string>;
  } else {
    const form = await request.formData();
    payload = Object.fromEntries(
      [...form.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : '']),
    );
  }

  // Never log request bodies containing free-text notes in production logging sinks.
  // Intentionally no persistence in local MVP without configured store.
  void payload;

  return NextResponse.redirect(new URL('/book?received=1', request.url), 303);
}
