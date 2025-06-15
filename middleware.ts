import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl; // Get the current path

                //allow auth related paths route

                if (      // If the user is authenticated, allow access to all paths
                    pathname.startsWith('/api/auth') ||
                    pathname === '/login' ||
                    pathname === '/register') {
                    return true;
                }

                //public
                if (pathname === '/' || pathname.startsWith("/api/videos")) {
                    return true;
                }

                return !!token
            }
        }
    }
)

export const config = {
    matcher: [
        /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
        "/((?!_next/static|_next/image|favicon.ico|public/).*)", //path where middleware should run
    ],
};