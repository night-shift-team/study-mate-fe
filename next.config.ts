import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              dimensions: false,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false, // viewBox 제거 방지
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
        as: '*.js | *.jsx | *.ts | *.tsx',
      },
    },
  },
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
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'study-mate-s3.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
