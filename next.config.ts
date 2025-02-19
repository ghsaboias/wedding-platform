import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  serverExternalPackages: ['@supabase/supabase-js'],
  webpack: (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Add rule to handle @supabase/realtime-js
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false
      }
    });

    // Handle WebSocket module in Edge Runtime
    if (process.env.NEXT_RUNTIME === 'edge') {
      config.resolve.alias = {
        ...config.resolve.alias,
        ws: 'ws/browser.js',
      };
    }

    return config;
  },
};

export default nextConfig;
