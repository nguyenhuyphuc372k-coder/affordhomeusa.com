import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AffordHomeUSA – Home Affordability Calculator 2026",
    template: "%s | AffordHomeUSA",
  },
  description:
    "Free home affordability calculator for Americans. Calculate how much house you can afford, compare mortgage rates, and explore cost of living by state.",
  metadataBase: new URL("https://affordhomeusa.com"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  openGraph: {
    type: "website",
    siteName: "AffordHomeUSA",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <Navbar />
        <AdBanner slot="leaderboard" className="hidden md:flex my-0" />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
          <AdBanner slot="footer-sticky" />
        </div>
      </body>
    </html>
  );
}
