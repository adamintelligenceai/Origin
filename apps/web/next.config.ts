import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@marginshield/api-client",
    "@marginshield/engine",
    "@marginshield/reports",
    "@marginshield/schemas",
    "@marginshield/ui",
  ],
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
