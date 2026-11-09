/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // MathMitra moved to /MathMitra — old links land on the new home.
        source: "/math-formula-sheet-m1",
        destination: "/MathMitra",
        permanent: true,
      },
      {
        // Old app sub-paths redirect too — except /api/*, which the
        // already-installed app versions still call (handled by rewrite).
        source: "/math-formula-sheet-m1/:path((?!api/).*)",
        destination: "/MathMitra",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          // Legacy API path — the installed MathMitra app (v1.0.0) calls
          // this; keep it working silently, no redirect.
          source: "/math-formula-sheet-m1/api/:path*",
          destination:
            "https://maths-formula-sheet-nu.vercel.app/math-formula-sheet-m1/api/:path*",
        },
        {
          // The formula app's API stays on the Next.js backend.
          source: "/MathMitra/api/:path*",
          destination:
            "https://maths-formula-sheet-nu.vercel.app/math-formula-sheet-m1/api/:path*",
        },
        {
          // Everything else under /MathMitra is the Flutter web app.
          source: "/MathMitra",
          destination:
            "https://maths-formula-flutter.vercel.app/MathMitra",
        },
        {
          source: "/MathMitra/:path*",
          destination:
            "https://maths-formula-flutter.vercel.app/MathMitra/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};
module.exports = nextConfig;
