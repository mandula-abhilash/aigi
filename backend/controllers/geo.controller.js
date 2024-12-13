import geoip from "geoip-lite";

/**
 * Controller to get location details based on IP address
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getLocationDetails = async (req, res) => {
  try {
    const ip = req.query.ip;

    if (!ip) {
      return res.status(400).json({
        error: "IP address is required",
      });
    }

    // Clean the IP address (remove IPv6 prefix if present)
    const cleanIp = ip.replace(/^::ffff:/, "");

    // Handle localhost/development IPs
    if (cleanIp === "127.0.0.1" || cleanIp === "::1") {
      return res.status(200).json({
        country: "US",
        region: "Development",
        city: "Local",
        timezone: "America/New_York",
      });
    }

    // Look up location using geoip-lite
    const geo = geoip.lookup(cleanIp);

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
    // Return a default response instead of an error
    res.status(200).json({
      country: "US",
      region: "Unknown",
      city: "Unknown",
      timezone: "America/New_York",
    });
  }
};
