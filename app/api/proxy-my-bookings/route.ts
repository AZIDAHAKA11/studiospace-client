import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || '';

    const res = await fetch('https://studiospace-server.onrender.com/api/bookings/my-bookings', {
      method: 'GET',
      headers: {
        'Cookie': cookie,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}