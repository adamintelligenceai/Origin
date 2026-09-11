import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@marginshield/schemas',
    '@marginshield/engine',
    '@marginshield/ui',
    '@marginshield/reports',
    '@marginshield/api-client',
  ],
};

export default nextConfig;
