import { useCallback } from "react";
import {
  userTracking,
  searchTracking,
  engagementTracking,
  conversionTracking,
  errorTracking,
} from "@/lib/analytics";

export function useAnalytics() {
  // User tracking
  const trackAuth = useCallback((action, userId) => {
    userTracking.trackAuth(action, userId);
  }, []);

  // Gift finder form tracking
  const trackFormSubmission = useCallback((formData) => {
    searchTracking.trackSearchComplete(
      "gift-finder",
      {
        recipient: formData.recipient,
        occasion: formData.occasion,
        interests: formData.interests,
      },
      formData.resultCount
    );
  }, []);

  // Gift idea view tracking
  const trackGiftIdeaView = useCallback((giftProfile) => {
    engagementTracking.trackButtonClick("view-gift-idea", {
      profileId: giftProfile._id,
      title: giftProfile.title,
    });
  }, []);

  // Affiliate click tracking
  const trackAffiliateClick = useCallback((product, giftProfile) => {
    conversionTracking.trackAffiliateClick(
      product._id,
      product.title,
      product.price
    );
  }, []);

  // Error tracking
  const trackError = useCallback((type, details) => {
    errorTracking.trackApiError(type, details.code, details.message);
  }, []);

  return {
    trackAuth,
    trackFormSubmission,
    trackGiftIdeaView,
    trackAffiliateClick,
    trackError,
  };
}
