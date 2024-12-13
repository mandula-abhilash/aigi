import axios from "axios";

/**
 * Get user's IP address from ipify client-side
 * @returns {Promise<string|null>} IP address or null if failed
 */
export async function getPublicIp() {
  try {
    const { data } = await axios.get("https://api.ipify.org?format=json");
    return data.ip;
  } catch (error) {
    console.error("Failed to get public IP:", error);
    return null;
  }
}

/**
 * Get user's location data from backend using IP
 * @param {string} ip - User's IP address
 * @returns {Promise<Object>} Location data with country code
 */
export async function getLocationFromIp(ip) {
  try {
    const { data: location } = await axios.get("/api/geo/location", {
      params: { ip },
    });

    if (!location?.country) {
      throw new Error("Invalid location data received");
    }

    return {
      countryCode: location.country,
      region: location.region,
      city: location.city,
    };
  } catch (error) {
    console.error("Failed to get location from IP:", error);
    return {
      countryCode: "US", // Default to US
      region: null,
      city: null,
    };
  }
}
