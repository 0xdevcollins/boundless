import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/user', '/admin'];

const authRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password'];

export default auth(req => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/user', req.url));
  }

  // Redirect unauthenticated users to signin for protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const signinUrl = new URL('/auth/signin', req.url);
    signinUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signinUrl);
  }

  // Allow all other requests to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
