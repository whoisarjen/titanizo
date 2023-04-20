/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.deante.pl'
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
