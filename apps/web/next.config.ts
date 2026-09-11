import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@marginshield/ui",
    "@marginshield/engine",
    "@marginshield/schemas",
    "@marginshield/reports",
    "@marginshield/api-client",
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};

export default nextConfig;
