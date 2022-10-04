/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['arweave.net'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
