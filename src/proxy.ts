import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require a token
const protectedRoutes = [
  '/account',
  '/checkout',
  '/orders',
  '/wishlist',
  '/cart',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Simply check if a token exists — no decryption on the frontend
  const token =
    request.headers.get('authorization')?.replace('Bearer ', '') ||
    request.cookies.get('token')?.value;

  if (!token) {
    // Redirect unauthenticated users to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
