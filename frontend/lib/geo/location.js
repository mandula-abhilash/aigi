import axios from "axios";

/**
 * Get user's IP address from ipify
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
 * Get user's country from IP address
 */
export async function getUserLocation() {
  try {
    // First try getting location from localStorage
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      return JSON.parse(storedLocation);
    }

    // Get public IP from client side
    const userIp = await getPublicIp();

    if (!userIp) {
      throw new Error("Failed to get IP address");
    }

    // Get location details from backend using the IP
    const response = await axios.get(`/api/geo/location?ip=${userIp}`);
    const location = response.data;

    // Store in localStorage to prevent frequent API calls
    if (location?.country) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          country: location.country,
          region: location.region,
          city: location.city,
        })
      );
    }

    return {
      country: location?.country || "US",
      region: location?.region,
      city: location?.city,
    };
  } catch (error) {
    console.error("Failed to detect location:", error);
    return { country: "US", region: null, city: null }; // Default to US
  }
}
