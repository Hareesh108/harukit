/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/introduction",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 