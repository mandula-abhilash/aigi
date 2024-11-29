import { createAxiosInstance, tokenManager } from "visdak-aim";

// Centralized API endpoints
const ENDPOINTS = {
  FIELD_SUGGESTIONS: "/api/suggestions/fields",
  GIFT_SUGGESTIONS: "/api/suggestions/gifts",
  GEO_IP: "/api/geo/ip",
  GEO_LOCATION: "/api/geo/location",
};

// Axios instance with configuration
const api = createAxiosInstance({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  retryCount: 3,
  retryDelay: 1000,
  onUnauthorized: () => {
    tokenManager.removeToken();
    localStorage.removeItem("user");
    window.location.href = "/";
  },
  onForbidden: () => {
    console.error("Access forbidden");
  },
  onRetry: (retryCount) => {
    console.log(`Retrying request (${retryCount})`);
  },
  defaultHeaders: {
    "Content-Type": "application/json",
  },
});

// Wrapper for getting field suggestions
export const getFieldSuggestions = async (field, context = {}) => {
  try {
    const normalizedField = field === "interest" ? "interest" : field;
    const response = await api.post(ENDPOINTS.FIELD_SUGGESTIONS, {
      field: normalizedField,
      context,
    });

    const suggestions = Array.isArray(response.data)
      ? response.data
      : response.data.split(",").map((s) => s.trim());

    return suggestions.filter(Boolean);
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching field suggestions (API):",
        error.response.data
      );
    } else if (error.request) {
      console.error(
        "Error fetching field suggestions (Network):",
        error.message
      );
    } else {
      console.error("Error fetching field suggestions (Other):", error.message);
    }
    return [];
  }
};

// Wrapper for getting gift suggestions
export const getGiftSuggestions = async (formData) => {
  try {
    const response = await api.post(ENDPOINTS.GIFT_SUGGESTIONS, {
      recipient: formData.recipient,
      occasion: formData.occasion,
      interests: formData.interests,
      budget: formData.maxBudget,
    });
    return response.data || [];
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching gift suggestions (API):",
        error.response.data
      );
    } else if (error.request) {
      console.error(
        "Error fetching gift suggestions (Network):",
        error.message
      );
    } else {
      console.error("Error fetching gift suggestions (Other):", error.message);
    }
    throw new Error("Failed to fetch gift suggestions");
  }
};

// Wrapper for getting the user's IP address
export const getIpAddress = async () => {
  try {
    const response = await api.get(ENDPOINTS.GEO_IP);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error fetching IP address (API):", error.response.data);
    } else if (error.request) {
      console.error("Error fetching IP address (Network):", error.message);
    } else {
      console.error("Error fetching IP address (Other):", error.message);
    }
    throw new Error("Failed to fetch IP address");
  }
};

// Wrapper for getting location details
export const getLocationDetails = async () => {
  try {
    const response = await api.get(ENDPOINTS.GEO_LOCATION);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching location details (API):",
        error.response.data
      );
    } else if (error.request) {
      console.error(
        "Error fetching location details (Network):",
        error.message
      );
    } else {
      console.error("Error fetching location details (Other):", error.message);
    }
    throw new Error("Failed to fetch location details");
  }
};

export default api;
