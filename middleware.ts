import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token && req.nextUrl.pathname.startsWith("/protected")) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (token) {
    try {
      verify(token, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      // Token is invalid
      const response = NextResponse.redirect(new URL("/login", req.url))
      response.cookies.delete("token")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/protected/:path*", "/api/:path*"],
}

