import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // works in Next 15
  },
  // images : {
  //   domains: ["camo.githubusercontent.com"],
  // },
};

// const nextConfig = {
//   images: {
//     domains: ["camo.githubusercontent.com"],
//   },
// };


export default nextConfig;