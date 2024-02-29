/** @type {import('next').NextConfig} */
const nextConfig = {
  //cacheMaxMemorySize: 0, // disable default in-memory caching
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
