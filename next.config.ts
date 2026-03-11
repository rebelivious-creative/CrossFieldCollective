import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/CrossFieldCollective",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;