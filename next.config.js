/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimized for Docker
  swcMinify: true,
  images: {
    domains: [
      // Add domains for remote images here
      'images.example.com',
    ],
  },
  // Enable experimental features if needed
  experimental: {
    // appDir: true, // Enable if using Next.js 13 app directory
  },
  // Configure environment variables
  env: {
    // Add environment variables here
  },
}

module.exports = nextConfig 