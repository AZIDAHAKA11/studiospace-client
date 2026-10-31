import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
   
    const cookie = req.headers.get('cookie') || '';
    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });
    }

  
    const res = await fetch(`https://studiospace-server.onrender.com/api/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}