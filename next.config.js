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
        {
          // MathMitra product/download page — a standalone page that
          // lives in the MathMitra project (not in this portfolio);
          // only the routing passes through here.
          source: "/MathMitra-app",
          destination:
            "https://maths-formula-flutter.vercel.app/MathMitra-app/",
        },
        {
          source: "/MathMitra-app/:path*",
          destination:
            "https://maths-formula-flutter.vercel.app/MathMitra-app/:path*",
        },
        {
          // Life Game Habit Tracker — a standalone Next.js app that
          // lives in the lifegame project (not in this portfolio);
          // only the routing passes through here. The app uses
          // basePath /lifegame, so the rewrite must keep the /lifegame
          // prefix on the destination too.
          source: "/lifegame",
          destination: "https://lifegame-psi.vercel.app/lifegame",
        },
        {
          source: "/lifegame/:path*",
          destination: "https://lifegame-psi.vercel.app/lifegame/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};
module.exports = nextConfig;
