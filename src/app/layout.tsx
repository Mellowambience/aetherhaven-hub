import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aetherhaven Hub — Enter the Void",
  description:
    "The Mothership. A living world inspired by VMK, Habbo Hotel, MapleStory, and RuneScape. Travelers, Void Shards, and the Forge await.",
  openGraph: {
    title: "Aetherhaven Hub",
    description: "Enter the Void. Find your sector.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-sigil-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}