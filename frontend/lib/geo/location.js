import axios from "axios";

/**
 * Get user's location data from backend
 * @returns {Promise<Object>} Location data with country code and IP
 */
export async function getLocationFromIp() {
  try {
    const { data: location } = await axios.get("/api/geo/location");

    if (!location?.country) {
      throw new Error("Invalid location data received");
    }

    return {
      countryCode: location.country,
      region: location.region,
      city: location.city,
      ip: location.ip,
    };
  } catch (error) {
    console.error("Failed to get location:", error);
    return {
      countryCode: "US", // Default to US
      region: null,
      city: null,
      ip: null,
    };
  }
}
