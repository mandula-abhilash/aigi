import geoip from "geoip-lite";

/**
 * Controller to get location details based on IP address
 */
export const getLocationDetails = async (req, res) => {
  try {
    // Get IP from query params
    const ip = req.query.ip;

    if (!ip) {
      return res.status(400).json({
        error: "IP address is required",
      });
    }

    // Look up location using geoip-lite
    const geo = geoip.lookup(ip);

    if (!geo) {
      return res.status(200).json({
        country: "US",
        region: "Unknown",
        city: "Unknown",
        timezone: "America/New_York",
      });
    }

    res.status(200).json({
      country: geo.country,
      region: geo.region,
      city: geo.city,
      timezone: geo.timezone,
    });
  } catch (error) {
    console.error("Error getting location details:", error);
    res.status(200).json({
      country: "US",
      region: "Unknown",
      city: "Unknown",
      timezone: "America/New_York",
    });
  }
};
