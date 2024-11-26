import axios from "axios";

/**
 * Controller to fetch the user's public IP address.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends the IP address in JSON format.
 */
export const getIpAddress = async (req, res) => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching IP address:", error.message);
    res.status(500).json({ error: "Failed to fetch IP address." });
  }
};

/**
 * Controller to fetch location details based on the user's IP address.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends the location details in JSON format.
 */
export const getLocationDetails = async (req, res) => {
  try {
    const response = await axios.get("https://lumtest.com/myip.json");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching location details:", error.message);
    res.status(500).json({ error: "Failed to fetch location details." });
  }
};
