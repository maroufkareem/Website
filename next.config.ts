import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admin uploads land in Vercel Blob, so those URLs must be allowed
    // through the optimizer alongside the bundled /marouf-assets files.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
