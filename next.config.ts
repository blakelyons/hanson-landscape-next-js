import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy WordPress URLs kept alive for SEO — see .scratch/PAGES-CHECKLIST.md
  async redirects() {
    return [
      { source: "/contact/request-a-quote", destination: "/contact", permanent: true },
      { source: "/career-oppurtonities", destination: "/careers", permanent: true },
      { source: "/portfolio/residential", destination: "/portfolio?sector=residential", permanent: true },
      { source: "/portfolio/commercial-2", destination: "/portfolio?sector=commercial", permanent: true },
      {
        source: "/portfolio/:category(landscape-maintenance|lighting-nightscapes|water-features)",
        destination: "/portfolio",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
