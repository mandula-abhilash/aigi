import { trackEvent } from "../core";
import { Categories, Actions } from "../constants";

export const affiliateTracking = {
  // Track affiliate link clicks
  trackLinkClick: (product, profileId) => {
    trackEvent(Categories.AFFILIATE, Actions.LINK_CLICK, {
      productId: product._id,
      profileId,
      title: product.title,
      price: product.price,
    });
  },
};
