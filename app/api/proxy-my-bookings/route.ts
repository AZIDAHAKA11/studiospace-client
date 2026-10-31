import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(`https://studiospace-server.onrender.com/api/bookings/google-my-bookings?email=${session.user.email}`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}