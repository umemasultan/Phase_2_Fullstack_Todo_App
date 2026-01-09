/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Standalone output for Docker deployment
  output: 'standalone',
}

module.exports = nextConfig
