import axios from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_URL } from './constants';

type roles = 'ADMIN';
const auth = {
  validatePath: (path: string) => !path.startsWith('/login'),
  getRolePath: '/auth/is-admin',
  roles: {
    ADMIN: {
      fallbackPath: '/',
      validatePath: (path: string) => true,
    },
  },
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Setup headers
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Cookie', request.headers.get('cookie') || '');
  requestHeaders.set('withCredentials', 'true');
  requestHeaders.set('Access-Control-Allow-Credentials', 'true');

  const sessionID = request.cookies.get('connect.sid')?.value;

  if (!sessionID && !auth.validatePath(path)) {
    return NextResponse.next();
  } else if (!sessionID && auth.validatePath(path)) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  try {
    const res = await fetch(`${API_URL}${auth.getRolePath}`, {
      method: 'GET',
      headers: requestHeaders,
      credentials: 'include',
    });

    const role = auth.roles.ADMIN;

    if (res?.status !== 200 && !auth.validatePath(path))
      return NextResponse.next();
    else if (res?.status !== 200)
      return NextResponse.redirect(new URL('/login', request.nextUrl));

    if (!role.validatePath(path) || !auth.validatePath(path)) {
      return NextResponse.redirect(new URL(role.fallbackPath, request.nextUrl));
    }
  } catch (e) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - backend (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|backend|site.webmanifest|_next/static|_next/image|favicon.ico|favicon|apple-touch-icon.png|og_image.png).*)',
  ],
};
