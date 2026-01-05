import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
    const flg404 = process.env.FLG_404_PAGE === 'true';
    const pathname = req.nextUrl.pathname;

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
