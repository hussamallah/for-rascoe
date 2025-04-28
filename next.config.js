/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export detection
  output: 'export',
  images: {
    unoptimized: true,
    domains: [],
  },
  // Add basePath for GitHub Pages
  basePath: '/for-rascoe',
  // Add trailingSlash for better compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
