import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/signup', '/auth/forgot-password'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: [
    // Match everything except public routes (including capitalized paths like /Dashboard)
    '/((?!_next/static|_next/image|favicon.ico|auth/login|auth/signup|auth/forgot-password|api|$).*)',
    '/Dashboard/:path*',
    '/Game/:path*',
    '/learning/:path*',
    '/quiz/:path*',
    '/aboutme',
    '/search',
  ],
};
