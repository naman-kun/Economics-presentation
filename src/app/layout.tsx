import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Economics — A Spider-Verse Scrollytelling",
  description: "A comic-style interactive presentation exploring supply, demand, and market structures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/The Law of Diminishing Marginal Utility Explained in One Minute From Definition to Examples - One Minute Economics (1080p, h264, youtube).mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
