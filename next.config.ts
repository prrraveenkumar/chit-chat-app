// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // This regex ensures we only match /dashboard/... paths ending in .json
        // and excludes the internal Next.js paths.
        source: '/dashboard/:path((?!_next).*\\.json)',
        destination: '/api/data/:path',
      },
    ];
  },
};

export default nextConfig;