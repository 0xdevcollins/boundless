import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'stellar.creit.tech',
      },
      {
        protocol: 'https',
        hostname: 'storage.herewallet.app',
      },
    ],
  },
};

export default nextConfig;
