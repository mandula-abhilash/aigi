import geoip from "geoip-lite";

/**
 * Controller to get location details based on IP address
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getLocationDetails = async (req, res) => {
  try {
    console.log("X-Forwarded-For:", req.headers["x-forwarded-for"]);
    console.log("X-Real-IP:", req.headers["x-real-ip"]);

    // Prioritizing in this order:
    // 1. X-Forwarded-For (first IP if multiple)
    // 2. X-Real-IP
    // 3. req.ip (trust proxy should be true)
    // 4. req.connection.remoteAddress
    let clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.ip ||
      req.connection.remoteAddress;

    if (!clientIp) {
      // Fallback to a known IP if no IP is detected
      console.warn(
        "No IP detected from headers or request. Using fallback IP: 8.8.8.8."
      );
      clientIp = "8.8.8.8";
    }

    // Clean the IP address (remove IPv6 prefix if present)
    const cleanIp = clientIp.replace(/^::ffff:/, "");

    // Handle localhost/development IPs
    if (cleanIp === "127.0.0.1" || cleanIp === "::1") {
      return res.status(200).json({
        country: "US",
        region: "Development",
        city: "Local",
        timezone: "America/New_York",
        ip: cleanIp,
      });
    }

    // Perform geo lookup
    const geo = geoip.lookup(cleanIp);

    if (!geo) {
      // If no geo data found, return default or "Unknown"
      return res.status(200).json({
        country: "US",
        region: "Unknown",
        city: "Unknown",
        timezone: "America/New_York",
        ip: cleanIp,
      });
    }

    // Successfully found geo data
    return res.status(200).json({
      country: geo.country,
      region: geo.region,
      city: geo.city,
      timezone: geo.timezone,
      ip: cleanIp,
    });
  } catch (error) {
    console.error("Error getting location details:", error);
    // Return a default response instead of an error
    return res.status(200).json({
      country: "US",
      region: "Unknown",
      city: "Unknown",
      timezone: "America/New_York",
      ip: "unknown",
    });
  }
};
