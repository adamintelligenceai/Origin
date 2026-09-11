import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@marginshield/engine', '@marginshield/schemas'],
  reactStrictMode: true,
};

export default nextConfig;
