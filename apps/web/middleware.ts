import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-glamandi-app", "web");
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-frame-options", "SAMEORIGIN");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/tenant/:path*", "/landlord/:path*", "/api/:path*"],
};
