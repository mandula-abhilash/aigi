import axios from "axios";

/**
 * Get user's IP address from ipify
 * @returns {Promise<string|null>} IP address or null if failed
 */
async function getPublicIp() {
  try {
    const { data } = await axios.get("https://api.ipify.org?format=json");
    return data.ip;
  } catch (error) {
    console.error("Failed to get public IP:", error);
    return null;
  }
}

/**
 * Get user's location data
 * @returns {Promise<Object>} Location data with country, region, and city
 */
export async function getUserLocation() {
  try {
    // Check localStorage first
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      const parsed = JSON.parse(storedLocation);
      const storedTime = localStorage.getItem("userLocationTime");

      // Only use stored location if it's less than 24 hours old
      if (
        storedTime &&
        Date.now() - parseInt(storedTime) < 24 * 60 * 60 * 1000
      ) {
        return parsed;
      }
    }

    // Get public IP from client side
    const userIp = await getPublicIp();
    if (!userIp) {
      throw new Error("Failed to get IP address");
    }

    // Get location details from backend
    const { data: location } = await axios.get("/api/geo/location", {
      params: { ip: userIp },
    });

    // Store in localStorage with timestamp
    if (location?.country) {
      const locationData = {
        country: location.country,
        region: location.region,
        city: location.city,
      };

      localStorage.setItem("userLocation", JSON.stringify(locationData));
      localStorage.setItem("userLocationTime", Date.now().toString());

      return locationData;
    }

    throw new Error("Invalid location data received");
  } catch (error) {
    console.error("Failed to detect location:", error);
    return {
      country: "US",
      region: null,
      city: null,
    };
  }
}
