import express from "express";
import {
  getIpAddress,
  getLocationDetails,
} from "../controllers/geo.controller.js";

const router = express.Router();

/**
 * Route to fetch the user's public IP address.
 * @method GET
 * @route /api/geo/ip
 * @returns {Object} IP address in JSON format.
 * @example
 * GET /api/geo/ip
 * Response: { "ip": "123.45.67.89" }
 */
router.get("/ip", getIpAddress);

/**
 * Route to fetch location details based on the user's IP address.
 * @method GET
 * @route /api/geo/location
 * @returns {Object} Location details in JSON format.
 * @example
 * GET /api/geo/location
 * Response: { "ip": "123.45.67.89", "country": "United States" }
 */
router.get("/location", getLocationDetails);

export default router;
