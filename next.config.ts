import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['titantrays.com'],
  },
};

export default nextConfig;
