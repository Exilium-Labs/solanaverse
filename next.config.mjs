let userConfig;
try {
  userConfig = await import("./v0-user-next.config");
} catch (error) {
  console.warn("User config not found. Using default Next.js configuration.");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

mergeConfig(nextConfig, userConfig);

/**
 * Merges user-provided config with the default Next.js config.
 * 
 * @param {Record<string, any>} baseConfig - Default Next.js config.
 * @param {Record<string, any>} userConfig - User-defined config.
 */
function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) return;

  Object.keys(userConfig).forEach((key) => {
    if (
      typeof baseConfig[key] === "object" &&
      !Array.isArray(baseConfig[key]) &&
      baseConfig[key] !== null
    ) {
      baseConfig[key] = {
        ...baseConfig[key],
        ...userConfig[key],
      };
    } else {
      baseConfig[key] = userConfig[key];
    }
  });
}

export default nextConfig;
