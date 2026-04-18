import { NextResponse } from 'next/server';

const apiBaseUrl =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3333/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = (await response.json().catch(() => ({
      message: 'Login request could not be completed.',
    }))) as Record<string, unknown>;

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach the authentication service right now.' },
      { status: 502 }
    );
  }
}
