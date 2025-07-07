import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  const protectedRoutes = ['/dashboard', '/projects', '/admin', '/profile', '/my-contributions', '/settings'];

  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/admin') && token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/my-contributions/:path*',
    '/settings/:path*',
    '/api/admin/:path*',
  ],
};

// Optional: Middleware to keep the session alive by updating session expiry on each call
// Uncomment the following and comment out the above middleware if you want to use the auth middleware directly
// export { auth as middleware } from "@/auth"
