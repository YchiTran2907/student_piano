import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
    const flg404 = process.env.FLG_404_PAGE === 'true';
    const pathname = req.nextUrl.pathname;

    // Xử lý chuyển hướng nếu người dùng đã đăng nhập và cố gắng truy cập trang đăng nhập
    const loggedIn = req.cookies.get("loggedIn");
    const userEmail = req.cookies.get("userEmail");

    if ((loggedIn || userEmail) && pathname === "/login") {
        return NextResponse.redirect(
            new URL("/dashboard", req.url)
        );
    }

    // Xử lý trang 404
    if (!flg404) {
        return NextResponse.next();
    }

    if (pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    if (
        pathname === '/favicon.ico' ||
        pathname === '/manifest.webmanifest' ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml'
    ) {
        return NextResponse.next();
    }

    if (/\.(.*)$/.test(pathname)) {
        return NextResponse.next();
    }

    if (pathname === '/not-found') {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/not-found', req.url));
}
