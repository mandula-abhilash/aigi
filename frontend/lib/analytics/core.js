import ReactGA from "react-ga4";

// Initialize GA4 with configuration options
export const initGA = () => {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  ) {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      debug: process.env.NODE_ENV === "development",
      testMode: process.env.NODE_ENV !== "production",
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
    });
  }
};

// Track events with standardized format and validation
export const trackEvent = (category, action, params = {}) => {
  if (!category || !action) {
    console.warn("Missing required tracking parameters");
    return;
  }

  try {
    ReactGA.event({
      category,
      action,
      ...params,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

// Enhanced page view tracking with additional metadata
export const trackPageView = (path, title = "") => {
  try {
    ReactGA.send({
      hitType: "pageview",
      page: path,
      title: title || document.title,
      location: window.location.href,
    });
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};

// Track user interactions
export const trackInteraction = (element, action, label = "") => {
  trackEvent("User Interaction", action, {
    label,
    element: element?.toString() || "unknown",
  });
};

// Track form interactions
export const trackFormInteraction = (formId, action, details = {}) => {
  trackEvent("Form Interaction", action, {
    formId,
    ...details,
  });
};

// Track errors with severity levels
export const trackError = (category, message, severity = "error") => {
  trackEvent("Error", category, {
    message,
    severity,
    timestamp: new Date().toISOString(),
  });
};

// Track performance metrics
export const trackPerformance = (metric, value) => {
  trackEvent("Performance", metric, {
    value: Math.round(value),
    metric,
  });
};
