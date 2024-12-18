import { socialSharing } from "@/lib/config/social";

export function generateShareUrl(platform, data) {
  const platformConfig = socialSharing.platforms.find(
    (p) => p.name.toLowerCase() === platform.toLowerCase()
  );

  if (!platformConfig) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const params = platformConfig.getParams(data);
  const queryString = new URLSearchParams(params).toString();

  return `${platformConfig.shareUrl}?${queryString}`;
}

export function shareContent(platform, data) {
  const url = generateShareUrl(platform, data);
  window.open(url, "_blank", "noopener,noreferrer");
}
