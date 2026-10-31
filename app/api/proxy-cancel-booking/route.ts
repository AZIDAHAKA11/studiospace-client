import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function PATCH(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { bookingId } = await req.json();

  const res = await fetch(`https://studiospace-server.onrender.com/api/bookings/google-cancel/${bookingId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail: session.user.email }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}