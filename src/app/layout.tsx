import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aetherhaven Hub — Enter the Void",
  description:
    "The Mothership. A living world where travelers drift through void rooms, leave transmissions, earn Void Shards, and build the empire.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Aetherhaven Hub",
    description: "Enter the Void. All sectors accessible. All travelers welcome.",
    url: "https://aetherhaven-hub.vercel.app",
    siteName: "Aetherhaven Hub",
  },
};

export default function RootLayout({
  children,
}: {
  children: import('react').ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Space+Grotesk:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
