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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
