/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  transpilePackages: ['@repo/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${
          process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
            ? process.env.PROD_URL
            : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
              ? process.env.STAGING_URL
              : process.env.LOCAL_URL
        }/:path*`,
      },
    ];
  },
};
