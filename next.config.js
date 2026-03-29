/** @type {import('next').NextConfig} */
const path = require('path');

const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  ...(isExport && { output: 'export' }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
