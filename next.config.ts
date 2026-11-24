import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma loads its engine at runtime, so keep it out of the bundle.
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  // Project images can be up to 4 MB.
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
};

export default nextConfig;
