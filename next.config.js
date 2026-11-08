/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/math-formula-sheet-m1",
          destination:
            "https://maths-formula-sheet-nu.vercel.app/math-formula-sheet-m1",
        },
        {
          source: "/math-formula-sheet-m1/:path*",
          destination:
            "https://maths-formula-sheet-nu.vercel.app/math-formula-sheet-m1/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};
module.exports = nextConfig;
