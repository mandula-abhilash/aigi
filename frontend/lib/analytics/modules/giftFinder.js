import { trackEvent } from "../core";
import { Categories, Actions } from "../constants";

export const giftFinderTracking = {
  // Track form submission
  trackFormSubmit: (formData) => {
    trackEvent(Categories.GIFT_FINDER, Actions.FORM_SUBMIT, {
      recipient: formData.recipient,
      occasion: formData.occasion,
      interestCount: formData.interests.length,
    });
  },

  // Track suggestion views
  trackSuggestionView: (resultCount) => {
    trackEvent(Categories.GIFT_FINDER, Actions.SUGGESTION_VIEW, {
      resultCount,
    });
  },
};
