/** @type {import('next').NextConfig} */

module.exports = {
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api',
        },
      ];
    },
  };
  