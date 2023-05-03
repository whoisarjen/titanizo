/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'titanizo.pl',
      'http://titanizo.pl',
      'https://titanizo.pl',
      'strapi.titanizo.pl',
      'http://strapi.titanizo.pl',
      'https://strapi.titanizo.pl',
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
