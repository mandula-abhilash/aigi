/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
      {
        protocol: "https",
        hostname: "**.pexels.com",
      },
    ],
    domains: ["images.pexels.com"],
  },
  // Add headers configuration
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
          {
            key: "Link",
            value: `<${process.env.NEXT_PUBLIC_APP_URL}>; rel="canonical"`,
          },
        ],
      },
    ];
  },
  cleanDistDir: true,
  assetPrefix: "",
};

module.exports = nextConfig;
