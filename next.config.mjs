/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cloud.sooqsquare.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cloud.cohr.sa",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
