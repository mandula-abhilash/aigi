import { trackEvent, trackException } from "../core";
import { Categories, Actions } from "../constants";

export const errorTracking = {
  // Track API errors
  trackApiError: (endpoint, code, message) => {
    trackEvent(Categories.ERROR, Actions.API_ERROR, {
      endpoint,
      code,
      message,
    });
    trackException(`API Error: ${endpoint} - ${message}`, false);
  },

  // Track form validation errors
  trackFormError: (formId, errors) => {
    trackEvent(Categories.ERROR, Actions.FORM_ERROR, {
      formId,
      errors: JSON.stringify(errors),
    });
  },
};
