import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://aigi.visdak.com"
  ),
  title: {
    default: "AIGI - Perfect Gift Every Time",
    template: "%s | AIGI Gift Finder",
  },
  description:
    "Find the perfect gift for your loved ones using AI-powered recommendations",
  keywords: [
    "gift finder",
    "AI recommendations",
    "gift ideas",
    "personalized gifts",
  ],
  authors: [{ name: "VISDAK" }],
  creator: "VISDAK",
  publisher: "VISDAK",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://aigi.visdak.com",
    siteName: "AIGI Gift Finder",
    title: "AIGI - Perfect Gift Every Time",
    description:
      "Find the perfect gift for your loved ones using AI-powered recommendations",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AIGI Gift Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIGI - Perfect Gift Every Time",
    description:
      "Find the perfect gift for your loved ones using AI-powered recommendations",
    images: ["/og-image.jpg"],
    creator: "@visdak",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
