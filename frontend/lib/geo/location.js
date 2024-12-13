import { getIpAddress } from "@/services/api";

/**
 * Get user's country from IP address
 * Uses ipify for IP detection and geoip-lite for location lookup
 */
export async function getUserLocation() {
  try {
    // First try getting location from localStorage
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      return JSON.parse(storedLocation);
    }

    // Get IP from ipify
    const ipData = await getIpAddress();
    const userIp = ipData?.ip;

    console.log("IP : " + ipData);

    if (!userIp) {
      throw new Error("Failed to get IP address");
    }

    // Get location from backend (which uses geoip-lite)
    const locationData = await fetch(`/api/geo/location?ip=${userIp}`);
    const location = await locationData.json();

    console.log("Location : " + location);

    // Store in localStorage to prevent frequent API calls
    if (location?.country) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({ country: location.country })
      );
    }

    return { country: location?.country || "US" };
  } catch (error) {
    console.error("Failed to detect location:", error);
    return { country: "US" };
  }
}
