import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        // If the user is not logged in and trying to access any page except home
        if (!req.nextauth.token && req.nextUrl.pathname !== "/") {
            return NextResponse.redirect(new URL("/", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: [
        '/stations',
        '/stations/:path*',
        '/station-details/:path*'
    ]
} 