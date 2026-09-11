import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@marginshield/engine', '@marginshield/schemas', '@marginshield/ui'],
  reactStrictMode: true,
};

export default nextConfig;
