import { trackEvent } from "../core";
import { Categories, Actions } from "../constants";

export const userTracking = {
  // Track authentication events
  trackAuth: (action, userId) => {
    trackEvent(Categories.USER, action, {
      userId,
    });
  },
};
