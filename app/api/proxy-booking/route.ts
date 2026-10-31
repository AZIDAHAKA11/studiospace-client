import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || '';
    const body = await req.json();

    const res = await fetch('https://studiospace-server.onrender.com/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}