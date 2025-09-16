import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

    const response = await fetch(`${backendUrl}/waitlist/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

        ...(request.headers.get('user-agent') && {
          'User-Agent': request.headers.get('user-agent')!,
        }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          message: errorData.message || 'Failed to subscribe to waitlist',
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: 'Internal server error',
        status: 500,
      },
      { status: 500 }
    );
  }
}
