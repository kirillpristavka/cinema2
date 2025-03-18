import https from "https";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request: Request) {
  // Создаем HTTPS агент с отключенной проверкой сертификата
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const reqBody = await request.json();
    // Преобразуем заголовки запроса в простой объект
    const headersObj = Object.fromEntries(request.headers.entries());

    // Отправляем запрос на backend
    const backendResponse = await fetch(
      "https://localhost:4200/api/auth/login",
      {
        method: "POST",
        headers: headersObj,
        body: JSON.stringify(reqBody),
        agent: agent,
      }
    );

    const data = await backendResponse.text();
    // Преобразуем заголовки ответа в простой объект
    const responseHeaders = Object.fromEntries(
      backendResponse.headers.entries()
    );

    return new NextResponse(data, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse(JSON.stringify({ error: "Proxy error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
