import { useCallback } from "react";
import {
  trackEvent,
  trackPageView,
  trackError,
  trackInteraction,
  trackFormInteraction,
} from "@/lib/analytics/core";
import { userTracking } from "../lib/analytics/modules/user";
import { affiliateTracking } from "@/lib/analytics/modules/affiliate";
import { giftFinderTracking } from "@/lib/analytics/modules/giftFinder";

export function useAnalytics() {
  // Page view tracking
  const trackPage = useCallback((path, title) => {
    trackPageView(path, title);
  }, []);

  // Form tracking
  const trackForm = useCallback((formId, action, data = {}) => {
    trackFormInteraction(formId, action, data);
  }, []);

  // Gift finder tracking
  const trackGiftFinder = useCallback((action, data = {}) => {
    switch (action) {
      case "field-interaction":
        giftFinderTracking.trackFieldInteraction(
          data.field,
          data.value,
          data.suggestions
        );
        break;
      case "form-submit":
        giftFinderTracking.trackFormSubmit(data);
        break;
      case "suggestions-received":
        giftFinderTracking.trackSuggestionResults(data.results, data.criteria);
        break;
      default:
        trackEvent("Gift Finder", action, data);
    }
  }, []);

  // User tracking
  const trackUser = useCallback((action, userId, data = {}) => {
    switch (action) {
      case "auth":
        userTracking.trackAuth(data.type, userId, data);
        break;
      case "profile-update":
        userTracking.trackProfileUpdate(userId, data);
        break;
      case "preferences":
        userTracking.trackPreferences(userId, data);
        break;
      default:
        userTracking.trackSession(userId, action, data);
    }
  }, []);

  // Affiliate tracking
  const trackAffiliate = useCallback((action, data = {}) => {
    switch (action) {
      case "link-click":
        affiliateTracking.trackLinkClick(
          data.product,
          data.profileId,
          data.context
        );
        break;
      case "conversion":
        affiliateTracking.trackConversion(
          data.orderId,
          data.products,
          data.total,
          data.context
        );
        break;
      case "impression":
        affiliateTracking.trackImpression(
          data.product,
          data.profileId,
          data.context
        );
        break;
      default:
        trackEvent("Affiliate", action, data);
    }
  }, []);

  // Error tracking
  const trackAppError = useCallback((category, error, context = {}) => {
    trackError(category, error.message || error, {
      ...context,
      stack: error.stack,
    });
  }, []);

  return {
    trackPage,
    trackForm,
    trackGiftFinder,
    trackUser,
    trackAffiliate,
    trackAppError,
    trackInteraction,
  };
}
