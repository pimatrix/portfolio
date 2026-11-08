/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          // The formula app's API stays on the Next.js backend.
          source: "/math-formula-sheet-m1/api/:path*",
          destination:
            "https://maths-formula-sheet-nu.vercel.app/math-formula-sheet-m1/api/:path*",
        },
        {
          // Everything else under this path is the Flutter web app.
          source: "/math-formula-sheet-m1",
          destination:
            "https://maths-formula-flutter.vercel.app/math-formula-sheet-m1",
        },
        {
          source: "/math-formula-sheet-m1/:path*",
          destination:
            "https://maths-formula-flutter.vercel.app/math-formula-sheet-m1/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};
module.exports = nextConfig;
