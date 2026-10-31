import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized: Google Login required' }, { status: 401 });
  }

  const body = await req.json();
  

  const res = await fetch('https://studiospace-server.onrender.com/api/bookings/google-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...body,
      userEmail: session.user.email,
      userName: session.user.name,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}