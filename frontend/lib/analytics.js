import ReactGA from "react-ga4";

// Analytics event categories
export const EventCategories = {
  USER_INTERACTION: "User Interaction",
  FORM_INTERACTION: "Form Interaction",
  GIFT_SUGGESTIONS: "Gift Suggestions",
  AFFILIATE: "Affiliate",
  AUTH: "Authentication",
  PURCHASE: "Purchase",
  ERROR: "Error",
};

// Analytics event actions
export const EventActions = {
  // User Interaction
  PAGE_VIEW: "Page View",
  BUTTON_CLICK: "Button Click",
  SCROLL: "Scroll",

  // Form Interaction
  FORM_START: "Form Start",
  FORM_COMPLETE: "Form Complete",
  FORM_ABANDON: "Form Abandon",
  FIELD_INTERACTION: "Field Interaction",

  // Gift Suggestions
  VIEW_SUGGESTIONS: "View Suggestions",
  SAVE_SUGGESTION: "Save Suggestion",
  SHARE_SUGGESTION: "Share Suggestion",

  // Affiliate
  AFFILIATE_CLICK: "Affiliate Click",

  // Authentication
  LOGIN: "Login",
  REGISTER: "Register",
  LOGOUT: "Logout",

  // Purchase
  START_CHECKOUT: "Start Checkout",
  COMPLETE_PURCHASE: "Complete Purchase",
  CANCEL_PURCHASE: "Cancel Purchase",

  // Error
  FORM_ERROR: "Form Error",
  API_ERROR: "API Error",
};

// Initialize GA4
export const initGA = () => {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  ) {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  }
};

// Log page views
export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// Track events
export const trackEvent = (category, action, label = null, value = null) => {
  if (label) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  } else {
    ReactGA.event({
      category,
      action,
    });
  }
};

// Track user properties
export const setUserProperties = (properties) => {
  ReactGA.set(properties);
};

// Track exceptions
export const trackException = (description, fatal = false) => {
  ReactGA.exception({
    description,
    fatal,
  });
};

// Track timing
export const trackTiming = (category, variable, value, label = null) => {
  ReactGA.timing({
    category,
    variable,
    value,
    label,
  });
};
