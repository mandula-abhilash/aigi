import { getGiftProfiles } from "@/services/profiles";
import { seoConfig } from "@/lib/config/seo";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const { changeFrequency, priority } = seoConfig.sitemap;

  // Static routes with metadata
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: changeFrequency.home,
      priority: priority.home,
    },
    {
      url: `${baseUrl}/find-me-a-gift`,
      lastModified: new Date(),
      changeFrequency: changeFrequency.static,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gift-ideas`,
      lastModified: new Date(),
      changeFrequency: changeFrequency.static,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: changeFrequency.static,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: changeFrequency.static,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: changeFrequency.static,
      priority: 0.5,
    },
  ];

  // Dynamic routes - Gift profiles
  let giftProfileRoutes = [];
  try {
    const { profiles } = await getGiftProfiles({ limit: 1000 }); // Increased limit to ensure comprehensive coverage
    giftProfileRoutes = profiles.map((profile) => ({
      url: `${baseUrl}/gift-ideas/${profile.slug}`,
      lastModified: profile.updatedAt || new Date(),
      changeFrequency: changeFrequency.giftProfiles,
      priority: priority.giftProfiles,
    }));
  } catch (error) {
    console.error("Error generating sitemap for gift profiles:", error);
  }

  return [...staticRoutes, ...giftProfileRoutes];
}
