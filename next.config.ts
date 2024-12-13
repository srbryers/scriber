import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/account/register/step\\-:id*",
        destination: "/account/register/step/:id*",
      },
    ];
  },
};

export default nextConfig;
