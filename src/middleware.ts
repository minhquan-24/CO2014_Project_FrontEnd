// CO2014_Project_FrontEnd\src\middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/host', '/admin', '/bookings'];
const publicRoutes = ['/login', '/register', '/', '/search', '/accommodations'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;
  console.log(`Middleware checking path: ${pathname}`);
  console.log(`Token found: ${token ? 'YES' : 'NO'}`);

  if (!token) {
    // vào trang bảo mật (Host/Admin/Bookings) -> Đá về Login
    // Dùng .some() để check xem pathname có bắt đầu bằng các route bảo mật không
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Check Role ---
  try {
    const secretStr = process.env.JWT_SECRET;
    const secret = new TextEncoder().encode(secretStr);
    const { payload } = await jwtVerify(token, secret);
    
    const role = payload.role as string;

    if (role === 'GUEST' && (pathname.startsWith('/host') || pathname.startsWith('/admin'))) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (role === 'HOST' && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/host', request.url));
    }

    if (publicRoutes.includes(pathname) && (pathname === '/login' || pathname === '/register')) {
      if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin', request.url));
      if (role === 'HOST') return NextResponse.redirect(new URL('/host', request.url));
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();

  } catch (error) {
    console.error("❌ Token verification failed:", error);
    
    if (pathname === '/login') {
        const response = NextResponse.next();
        response.cookies.delete('access_token');
        return response;
    }

    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('access_token');
    return response;
  }
}

// Cấu hình Middleware chỉ chạy trên các path này (để tối ưu hiệu năng)
export const config = {
  matcher: [
    '/host/:path*', 
    '/admin/:path*', 
    '/bookings/:path*', 
    '/login', 
    '/register'
  ],
};