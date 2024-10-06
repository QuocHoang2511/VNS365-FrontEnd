import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/story/create", "/profile/:path*", "/admin/:path*"],
};

export default withAuth(function middleware(request: NextRequest) {
  request.headers.set("x-url", request.url);
  return NextResponse.next({ request });
});
