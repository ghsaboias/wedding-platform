import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ui-avatars.com', 'utfs.io'],
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

    return config;
  },
};

export default nextConfig;
