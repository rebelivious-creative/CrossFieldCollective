import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Keep this IF you want a static site, but Vercel doesn't actually need it.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;