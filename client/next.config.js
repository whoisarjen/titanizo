/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      '0.0.0.0',
      '0.0.0.0:1337',
      'localhost',
      'localhost:1337',
      'media.deante.pl',
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
