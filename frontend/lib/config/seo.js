import { siteMetadata } from "./metadata";

export const seoConfig = {
  // Sitemap configuration
  sitemap: {
    changeFrequency: {
      home: "daily",
      giftProfiles: "weekly",
      static: "monthly",
    },
    priority: {
      home: 1.0,
      giftProfiles: 0.8,
      static: 0.6,
    },
  },

  // Structured data templates
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "VISDAK",
      url: siteMetadata.metadataBase,
      logo: `${siteMetadata.metadataBase}/logo.png`,
      sameAs: [
        "https://www.instagram.com/visdak_official/",
        "https://x.com/visdak_official",
        "https://www.pinterest.com/visdak_official/",
      ],
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteMetadata.title.default,
      description: siteMetadata.description,
      url: siteMetadata.metadataBase,
    },
  },
};
