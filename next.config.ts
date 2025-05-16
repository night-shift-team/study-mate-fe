import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qwrujioanlzrqiiyxser.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/study-mate/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'd3i4mjesasgykp.cloudfront.net',
        pathname: '/test/**',
      },
    ],
  },
};

export default nextConfig;
