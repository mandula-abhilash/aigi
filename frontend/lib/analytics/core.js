import ReactGA from "react-ga4";

// Initialize GA4
export const initGA = () => {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  ) {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  }
};

// Track events with standardized format
export const trackEvent = (category, action, params = {}) => {
  ReactGA.event({
    category,
    action,
    ...params,
  });
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

// Track exceptions
export const trackException = (description, fatal = false) => {
  ReactGA.exception({
    description,
    fatal,
  });
};
