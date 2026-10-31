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
    
    
    const res = await fetch('https://studiospace-server.onrender.com/api/studios/google-add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        ownerEmail: session.user.email,
        ownerName: session.user.name,
      }),
    });

   
    const text = await res.text();
    let data;
    
    try {
      data = JSON.parse(text);
    } catch (e) {
      return NextResponse.json({ 
        message: 'Render সার্ভার হয়তো ঘুমিয়ে আছে। ৫০ সেকেন্ড অপেক্ষা করে আবার চেষ্টা করুন।' 
      }, { status: 500 });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}