import { NextRequest, NextResponse } from "next/server";
import { manageAuthCookie } from "./app/auth/actions/manageAuthCookie";

export async function middleware(request: NextRequest) {
  const token = await manageAuthCookie("get");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// apply the middleware to make home page only protected
export const config = {
  matcher: ["/", "/dashboard"],
};
