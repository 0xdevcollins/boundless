import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/user', '/admin', '/me'];

const authRoutes = ['/auth', '/auth/signup', '/auth/forgot-password'];

export default auth(req => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  const hasValidToken =
    req.auth?.user?.accessToken &&
    typeof req.auth.user.accessToken === 'string' &&
    req.auth.user.accessToken.length > 0;

  const isReallyAuthenticated = isAuthenticated && hasValidToken;

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Redirect all users to waitlist if not already on waitlist page
  // Exclude API routes, static assets, and other necessary paths
  // const shouldRedirect =
  //   pathname !== '/waitlist' &&
  //   !pathname.startsWith('/api') &&
  //   !pathname.startsWith('/_next') &&
  //   !pathname.startsWith('/favicon.ico') &&
  //   !pathname.startsWith('/public') &&
  //   !pathname.match(
  //     /\.(png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|woff|woff2|ttf|eot)$/i
  //   );

  // if (shouldRedirect) {
  //   return NextResponse.redirect(
  //     new URL('https://www.boundlessfi.xyz/waitlist')
  //   );
  // }

  const isOtherUserProfile = pathname.startsWith('/profile/');

  // if (process.env.NODE_ENV === 'development') {
  //   // eslint-disable-next-line no-console
  //   console.log(`Middleware: ${pathname} - Auth: ${isAuthenticated}, Token: ${hasValidToken}, Really Auth: ${isReallyAuthenticated}, Protected: ${isProtectedRoute}, Profile: ${isOtherUserProfile}`);
  // }

  if (isAuthRoute && isReallyAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isProtectedRoute && !isReallyAuthenticated) {
    const signinUrl = new URL('/auth', req.url);
    signinUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signinUrl);
  }

  if (isOtherUserProfile && !isReallyAuthenticated) {
    const signinUrl = new URL('/auth', req.url);
    signinUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signinUrl);
  }

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
