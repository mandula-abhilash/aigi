import { getGiftProfiles } from "@/services/profiles";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aigi.visdak.com";

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
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic routes - Gift profiles
  let giftProfileRoutes = [];
  try {
    const { profiles } = await getGiftProfiles({ limit: 100 });
    giftProfileRoutes = profiles.map((profile) => ({
      url: `${baseUrl}/gift-ideas/${profile.slug}`,
      lastModified: profile.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating sitemap for gift profiles:", error);
  }

  return [...staticRoutes, ...giftProfileRoutes];
}
