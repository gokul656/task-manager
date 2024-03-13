import { NextRequest, NextResponse } from "next/server";
export { default } from 'next-auth/middleware'

export function middleware(request: NextRequest) {

    const loggedIn = request.cookies.get("token");
    if (!loggedIn) {
        return NextResponse.rewrite(new URL("/login", request.url))
    }

    return NextResponse.rewrite(new URL("/", request.url))
}

export const config = {
    matcher: ['/login', '/']
}