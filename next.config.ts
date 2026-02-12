import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/states/:slug",
        destination: "/:slug-dmv-practice-test",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
