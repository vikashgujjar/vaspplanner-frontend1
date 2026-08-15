import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  trailingSlash: true,
  experimental: {
    // Inlines above-the-fold CSS per page and defers the rest via a
    // preload+swap <link>, instead of shipping the whole global stylesheet
    // as one render-blocking request. Requires the `critters` package.
    optimizeCss: true,
  },
  webpack: (config, { webpack, isServer }) => {
    // Next.js's own client entry (node_modules/next/dist/client/app-globals.js)
    // unconditionally requires this polyfill file — it ignores .browserslistrc
    // entirely, which is why it kept showing up as "Legacy JavaScript" no
    // matter what we set there. Every polyfill it contains (Array.prototype.at,
    // Object.hasOwn, Array.flat/flatMap, Object.fromEntries,
    // String.trimStart/trimEnd, Promise.prototype.finally,
    // Symbol.prototype.description, URL.canParse) is natively supported by
    // every browser in our .browserslistrc target, and this app never calls
    // URL.canParse() or Symbol#description, so we replace the file outright
    // rather than fight the framework's hardcoded require. Server bundles
    // don't include it, so this only needs to apply client-side.
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-(module|nomodule)/,
          path.resolve(__dirname, 'empty-polyfill.js')
        )
      );
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ["react-icons"],
};

export default nextConfig;
