import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Tells Next.js to build a pure static site for Cloudflare
  images: {
    unoptimized: true,
  },
};

export default nextConfig;