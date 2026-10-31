import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  const expressToken = request.cookies.get('token')?.value;
  const betterAuthToken = request.cookies.get('better-auth.session_token')?.value || request.cookies.get('__Secure-better-auth.session_token')?.value;

  
  const isAuthenticated = !!expressToken || !!betterAuthToken;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/add-studio', '/my-listings', '/my-bookings', '/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/add-studio/:path*',
    '/my-listings/:path*',
    '/my-bookings/:path*',
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
};