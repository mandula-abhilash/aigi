import { trackEvent, trackError } from "../core";
import { Categories } from "../constants";

export const userTracking = {
  // Track authentication events with enhanced data
  trackAuth: (action, userId, details = {}) => {
    trackEvent(Categories.USER, action, {
      userId,
      ...details,
      timestamp: new Date().toISOString(),
    });
  },

  // Track user profile updates
  trackProfileUpdate: (userId, updatedFields) => {
    trackEvent(Categories.USER, "profile-update", {
      userId,
      fields: Object.keys(updatedFields),
      timestamp: new Date().toISOString(),
    });
  },

  // Track user preferences
  trackPreferences: (userId, preferences) => {
    trackEvent(Categories.USER, "preferences-update", {
      userId,
      preferences: JSON.stringify(preferences),
      timestamp: new Date().toISOString(),
    });
  },

  // Track session events
  trackSession: (userId, action, details = {}) => {
    trackEvent(Categories.USER, `session-${action}`, {
      userId,
      ...details,
      timestamp: new Date().toISOString(),
    });
  },

  // Track user errors
  trackUserError: (userId, error, context = {}) => {
    trackError("User Error", error, {
      userId,
      context: JSON.stringify(context),
      timestamp: new Date().toISOString(),
    });
  },
};
