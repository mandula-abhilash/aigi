import { socialProfiles } from "./social";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aigi.visdak.com";

export const siteMetadata = {
  title: {
    default: "AIGI - Perfect Gift Every Time",
    template: "%s | AIGI Gift Finder",
  },
  description:
    "Find the perfect gift for your loved ones using AI-powered recommendations. Our intelligent gift finder helps you discover thoughtful and personalized gifts for any occasion.",
  keywords: [
    "gift finder",
    "AI recommendations",
    "gift ideas",
    "personalized gifts",
    "gift suggestions",
    "perfect gift",
    "gift recommendations",
    "AI gift finder",
    "gift guide",
    "gift inspiration",
  ],
  authors: [{ name: "VISDAK" }],
  creator: "VISDAK",
  publisher: "VISDAK",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
};

export const openGraphMetadata = {
  type: "website",
  locale: "en_US",
  url: baseUrl,
  siteName: "AIGI Gift Finder",
  title: siteMetadata.title.default,
  description: siteMetadata.description,
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "AIGI Gift Finder",
    },
  ],
};

export const twitterMetadata = {
  card: "summary_large_image",
  title: siteMetadata.title.default,
  description: siteMetadata.description,
  images: ["/og-image.jpg"],
  creator: socialProfiles.twitter.handle,
};

export const robotsMetadata = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const verificationMetadata = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
};
