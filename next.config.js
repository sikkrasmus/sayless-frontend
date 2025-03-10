/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimized for Docker
  swcMinify: true,
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.example.com',
      },
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