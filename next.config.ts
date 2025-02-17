import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ui-avatars.com', 'utfs.io'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), '@supabase/realtime-js'];
    return config;
  },
};

export default nextConfig;
