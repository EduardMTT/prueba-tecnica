import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(request) {
    const token = request.nextauth.token;
    if (
      request.nextUrl.pathname.includes('/admin') &&
      token?.role !== 'administrador'
    ) {
      return NextResponse.redirect(new URL('/acceso-denegado', request.url));
    } else if (
      request.nextUrl.pathname.includes('/client') &&
      token?.role !== 'cliente'
    ) {
      return NextResponse.redirect(new URL('/acceso-denegado', request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return Boolean(token);
      },
    },
    pages: {
      signIn: '/login',
      signOut: '/',
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
};
