import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Only proxy API requests to backend during local development.
  // In production, the catch-all route at /app/api/[...path]/route.ts
  // handles proxying with proper cookie forwarding.
  async rewrites() {
    // Only enable rewrites in development mode
    if (process.env.NODE_ENV !== 'development') {
      return [];
    }
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
