import express from "express";
import {
  fieldSuggestions,
  giftSuggestions,
} from "../controllers/suggestions.controller.js";

/**
 * Function to create the suggestions router with middleware.
 * @param {Object} middleware - Middleware object from visdak-sesam.
 * @returns {Router} - Configured suggestions router.
 */
const createSuggestionsRouter = (middleware) => {
  const router = express.Router();

  /**
   * Route for field suggestions (Next Input Predictions).
   * Protected route.
   * @method POST
   * @route /api/suggestions/fields
   */
  // router.post("/fields", middleware.protect, fieldSuggestions);
  router.post("/fields", middleware.protect, fieldSuggestions);

  /**
   * Route for gift suggestions based on user input.
   * Protected route.
   * @method POST
   * @route /api/suggestions/gifts
   */
  // router.post("/gifts", middleware.protect, giftSuggestions);
  router.post("/gifts", middleware.protect, giftSuggestions);

  return router;
};

export default createSuggestionsRouter;
