import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfjs-dist requires Node.js `canvas` package for server-side use.
  // We only use it in the browser, so exclude it from the server bundle.
  serverExternalPackages: ['pdfjs-dist'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
};

export default nextConfig;
