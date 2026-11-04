import "./globals.css";

export const metadata = {
  title: "Yash Sharma | Full-Stack Developer",
  description:
    "Portfolio of Yash Sharma — Full-Stack Developer and BTech student at Medicaps University. Creator of Pragya AI. Hackathon winner (Viksit Bharat Buildathon 2025, Indore) and builder of web, AI and IoT projects.",
  openGraph: {
    title: "Yash Sharma | Full-Stack Developer",
    description:
      "Full-Stack Developer building ERP systems, secure applications and AI-powered tools. Creator of Pragya AI.",
    url: "https://yashx.xyz/",
    type: "website",
    images: ["https://yashx.xyz/photo.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
