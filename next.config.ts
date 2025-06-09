import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image-cdn-ak.spotifycdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image-cdn-fa.spotifycdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
