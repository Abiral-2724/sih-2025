import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',   // standard Unsplash
      'plus.unsplash.com',     // premium Unsplash
    ],
  },
};

export default nextConfig;
