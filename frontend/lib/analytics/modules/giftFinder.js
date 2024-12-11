import { trackEvent, trackFormInteraction, trackError } from "../core";
import { Categories } from "../constants";

export const giftFinderTracking = {
  // Track form field interactions
  trackFieldInteraction: (fieldName, value, suggestions = []) => {
    trackFormInteraction("gift-finder", "field-interaction", {
      field: fieldName,
      value,
      suggestionsCount: suggestions.length,
    });
  },

  // Track form submission with validation
  trackFormSubmit: (formData) => {
    if (!formData) {
      trackError("Form Submit", "Missing form data");
      return;
    }

    trackEvent(Categories.GIFT_FINDER, "form-submit", {
      recipient: formData.recipient,
      occasion: formData.occasion,
      interestCount: formData.interests?.length || 0,
      hasMaxBudget: !!formData.maxBudget,
      timestamp: new Date().toISOString(),
    });
  },

  // Track suggestion results
  trackSuggestionResults: (results, searchCriteria) => {
    trackEvent(Categories.GIFT_FINDER, "suggestions-received", {
      resultCount: results?.length || 0,
      searchCriteria: JSON.stringify(searchCriteria),
      timestamp: new Date().toISOString(),
    });
  },

  // Track suggestion interactions
  trackSuggestionInteraction: (suggestionId, action) => {
    trackEvent(Categories.GIFT_FINDER, "suggestion-interaction", {
      suggestionId,
      action,
      timestamp: new Date().toISOString(),
    });
  },
};
