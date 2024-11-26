import express from "express";
import {
  fieldSuggestions,
  giftSuggestions,
} from "../controllers/suggestions.controller.js";

const router = express.Router();

/**
 * Route for field suggestions (Next Input Predictions).
 * @method POST
 * @route /api/suggestions/fields
 */
router.post("/fields", fieldSuggestions);

/**
 * Route for gift suggestions based on user input.
 * @method POST
 * @route /api/suggestions/gifts
 */
router.post("/gifts", giftSuggestions);

export default router;
