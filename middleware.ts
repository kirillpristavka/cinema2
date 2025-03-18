import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  // проверяем путь
  const { pathname } = req.nextUrl;

  // Список защищённых роутов
  if (pathname.startsWith("/profile") || pathname === "/") {
    // Читаем куки
    const token = req.cookies.get("token")?.value; // 'token' - название нашей cookie

    if (!token) {
      // нет куки => редирект на /login
      console.log("No token");
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // Проверяем валидность токена
    // try {
    //   jwt.verify(token, process.env.JWT_SECRET || "SUPERSECRET");
    // } catch (err) {
    //   // невалиден => редирект
    //   console.log(err);
    //   return NextResponse.redirect(new URL("/auth", req.url));
    // }
  }

  return NextResponse.next();
}
