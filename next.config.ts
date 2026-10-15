import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.164'],
  images: {
    // Covers are already optimized webp at the source; skip Vercel's image
    // optimization so it doesn't consume the plan's transformation quota.
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'titangames.shop' }],
  },
};

export default nextConfig;
