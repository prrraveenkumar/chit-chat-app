import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 import {getToken} from "next-auth/jwt"
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req: request})
    const url = request.nextUrl
    const pathname = url.pathname

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if(token && (
        pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up') ||
        pathname.startsWith('/verify')
    )){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If user is not authenticated and trying to access protected routes, redirect to sign-in
    if(!token && pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // Allow the request to proceed
    return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'

  ]
}