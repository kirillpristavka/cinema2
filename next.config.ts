import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // Все запросы, начинающиеся с /api/
  //       destination: "http://localhost:4200/api/:path*", // Проксируем на бэкенд
  //     },
  //   ];
  // },
};

export default nextConfig;
