import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/shared/styles'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-school-strapi.ktsdev.ru',
        pathname: '/uploads/**',
      },
    ],
  },
  transpilePackages: [],
};

export default nextConfig;

