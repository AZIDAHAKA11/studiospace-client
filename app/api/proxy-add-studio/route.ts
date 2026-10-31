import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
 
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized: Please login again' }, { status: 401 });
    }

    const body = await req.json();
    
    // Render-এ পাঠানো হচ্ছে
    const res = await fetch('https://studiospace-server.onrender.com/api/studios/google-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        ownerEmail: session.user.email,
        ownerName: session.user.name,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}