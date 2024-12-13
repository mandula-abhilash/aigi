import express from "express";
import { getLocationDetails } from "../controllers/geo.controller.js";

const router = express.Router();

/**
 * Route to fetch location details based on IP address
 * @method GET
 * @route /api/geo/location
 * @param {string} ip - IP address to lookup
 * @returns {Object} Location details in JSON format
 * @example
 * GET /api/geo/location?ip=123.45.67.89
 * Response: { country: "US", region: "CA", city: "San Francisco" }
 */
router.get("/location", getLocationDetails);

export default router;
