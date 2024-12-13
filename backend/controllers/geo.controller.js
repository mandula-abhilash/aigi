import axios from "axios";
import geoip from "geoip-lite";

/**
 * Controller to fetch the user's public IP address using ipify
 */
export const getIpAddress = async (req, res) => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching IP address:", error.message);
    res.status(500).json({ error: "Failed to fetch IP address" });
  }
};

/**
 * Controller to get location details based on IP address using geoip-lite
 */
export const getLocationDetails = async (req, res) => {
  try {
    // Get IP from query params or from request
    const ip = req.query.ip || req.ip;

    // Look up location
    const geo = geoip.lookup(ip);

    if (!geo) {
      throw new Error("Location not found");
    }

    res.status(200).json({
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      timezone: geo.timezone,
    });
  } catch (error) {
    console.error("Error fetching location details:", error.message);
    res.status(500).json({ error: "Failed to fetch location details" });
  }
};
