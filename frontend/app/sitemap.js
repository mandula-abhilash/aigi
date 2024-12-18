import { getGiftProfiles } from "@/services/profiles";
import { seoConfig } from "@/lib/config/seo";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aigi.visdak.com";
  const { changeFrequency, priority } = seoConfig.sitemap;

  // Static routes
  const staticRoutes = [
    "",
    "about",
    "find-me-a-gift",
    "gift-ideas",
    "privacy-policy",
    "terms",
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "" ? changeFrequency.home : changeFrequency.static,
    priority: route === "" ? priority.home : priority.static,
  }));

  // Dynamic routes - Gift profiles
  let giftProfileRoutes = [];
  try {
    const { profiles } = await getGiftProfiles({ limit: 100 });
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
