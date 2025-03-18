import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Список защищаемых путей, например:
  if (
    req.nextUrl.pathname.startsWith("/proflie") ||
    req.nextUrl.pathname === "/"
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    try {
      // Преобразуем секрет в Uint8Array
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "SUPERSECRET"
      );
      await jwtVerify(token, secret);
      // Если верификация успешна, продолжаем выполнение
    } catch (err) {
      console.error("JWT verification error:", err);
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/"],
};
