// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  // Don't know why this works, but it does.
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    //config.externals.push("pino-pretty", "lokijs", "encoding");

    // Add TypeScript loader
    // config.module.rules.push({
    //   test: /\.ts(x?)$/,
    //   exclude: /node_modules/,
    //   use: {
    //     loader: "ts-loader",
    //     options: {
    //       transpileOnly: true,
    //     },
    //   },
    // });

    return config;
  },
};

module.exports = nextConfig;
