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
};

export default nextConfig;
