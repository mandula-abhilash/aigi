import express from "express";
import {
  createGiftProfile,
  getGiftProfiles,
  getGiftProfileById,
  updateGiftProfile,
  deleteGiftProfile,
  addProductToProfile,
} from "../controllers/gift.profiles.controller.js";

/**
 * Function to create the gift profiles router with middleware.
 * @param {Object} middleware - Middleware object containing `protect` and `admin`.
 * @returns {Router} - Configured gift profiles router.
 */
const createGiftProfilesRouter = (middleware) => {
  const router = express.Router();

  // Create a gift profile (Admin only)
  router.post("/", middleware.protect, middleware.admin, createGiftProfile);

  // Add a product to a gift profile (Admin only)
  router.post(
    "/:id/products",
    middleware.protect,
    middleware.admin,
    addProductToProfile
  );

  // Get all gift profiles (Protected)
  router.get("/", getGiftProfiles);

  // Get a single gift profile by ID (Protected)
  router.get("/:id", getGiftProfileById);

  // Update a gift profile by ID (Admin only)
  router.put("/:id", middleware.protect, middleware.admin, updateGiftProfile);

  // Delete a gift profile by ID (Admin only)
  router.delete(
    "/:id",
    middleware.protect,
    middleware.admin,
    deleteGiftProfile
  );

  return router;
};

export default createGiftProfilesRouter;
