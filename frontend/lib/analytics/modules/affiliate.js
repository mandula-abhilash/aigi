import { trackEvent } from "../core";
import { Categories } from "../constants";

export const affiliateTracking = {
  // Track affiliate link clicks with enhanced data
  trackLinkClick: (product, profileId, context = {}) => {
    trackEvent(Categories.AFFILIATE, "link-click", {
      productId: product._id,
      profileId,
      title: product.title,
      price: product.price,
      category: product.category,
      marketplace: context.marketplace || "amazon",
      position: context.position,
      timestamp: new Date().toISOString(),
    });
  },

  // Track affiliate conversions
  trackConversion: (orderId, products, total, context = {}) => {
    trackEvent(Categories.AFFILIATE, "conversion", {
      orderId,
      products: products.map((p) => ({
        id: p._id,
        title: p.title,
        price: p.price,
      })),
      total,
      currency: context.currency || "USD",
      marketplace: context.marketplace || "amazon",
      timestamp: new Date().toISOString(),
    });
  },

  // Track affiliate impression
  trackImpression: (product, profileId, context = {}) => {
    trackEvent(Categories.AFFILIATE, "impression", {
      productId: product._id,
      profileId,
      title: product.title,
      position: context.position,
      viewportVisible: context.inViewport || false,
      timestamp: new Date().toISOString(),
    });
  },
};
