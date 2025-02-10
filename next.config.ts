import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/:nextData(?:_next/data/[^/]+)?(?:/(?!_next/static|_next/image|favicon\\.ico|public/).*)?(?:\\.json)?",
        destination: "/api/data",
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
