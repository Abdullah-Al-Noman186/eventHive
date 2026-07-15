import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(), // 👈 tells Turbopack your project root
  },
};

export default nextConfig;