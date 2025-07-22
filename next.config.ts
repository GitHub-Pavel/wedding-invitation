import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `
      @use "./src/shared/styles/globals" as globals;
    `,
  },
};

export default nextConfig;
