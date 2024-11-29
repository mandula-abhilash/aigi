import { createAxiosInstance } from "visdak-aim";

const api = createAxiosInstance({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 10000,
  retryCount: 3,
  retryDelay: 1000,
  onUnauthorized: () => {
    // Clear auth data and redirect to login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  },
  onForbidden: () => {
    // Handle forbidden access
    console.error("Access forbidden");
  },
  onRetry: (retryCount) => {
    console.log(`Retrying request (${retryCount})`);
  },
  defaultHeaders: {
    "Content-Type": "application/json",
  },
});

export const getFieldSuggestions = async (field, context = {}) => {
  try {
    const normalizedField = field === "interest" ? "interest" : field;
    const response = await api.post("/api/suggestions/fields", {
      field: normalizedField,
      context,
    });

    const suggestions = Array.isArray(response.data)
      ? response.data
      : response.data.split(",").map((s) => s.trim());

    return suggestions.filter(Boolean);
  } catch (error) {
    console.error("Error fetching field suggestions:", error);
    return [];
  }
};

export const getGiftSuggestions = async (formData) => {
  try {
    const response = await api.post("/api/suggestions/gifts", {
      recipient: formData.recipient,
      occasion: formData.occasion,
      interests: formData.interests,
      budget: formData.maxBudget,
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching gift suggestions:", error);
    throw new Error("Failed to fetch gift suggestions");
  }
};

export const getIpAddress = async () => {
  const response = await api.get("/api/geo/ip");
  return response.data;
};

export const getLocationDetails = async () => {
  const response = await api.get("/api/geo/location");
  return response.data;
};

export default api;
