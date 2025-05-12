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
    ],
  },
};

export default nextConfig;
