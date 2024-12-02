import express from "express";
import {
  createCheckoutSession,
  handleStripeWebhook,
} from "../controllers/checkout.controller.js";

const checkoutRoutes = ({ protect }) => {
  const router = express.Router();

  /**
   * @route POST /api/checkout/session
   * @desc Create a Stripe checkout session
   * @access Private
   */
  router.post("/session", protect, createCheckoutSession);

  /**
   * @route POST /api/checkout/webhook
   * @desc Handle Stripe webhook events
   * @access Public
   */
  router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    handleStripeWebhook
  );

  return router;
};

export default checkoutRoutes;
