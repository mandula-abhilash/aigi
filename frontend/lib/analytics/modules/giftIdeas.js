import { trackEvent } from "../core";
import { Categories, Actions } from "../constants";

export const giftIdeasTracking = {
  // Track profile views
  trackProfileView: (profile) => {
    trackEvent(Categories.GIFT_IDEAS, Actions.PROFILE_VIEW, {
      profileId: profile._id,
      title: profile.title,
      productCount: profile.products?.length || 0,
    });
  },

  // Track product views
  trackProductView: (product, profileId) => {
    trackEvent(Categories.GIFT_IDEAS, Actions.PRODUCT_VIEW, {
      productId: product._id,
      profileId,
      title: product.title,
    });
  },
};
