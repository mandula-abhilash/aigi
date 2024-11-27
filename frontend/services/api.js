import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getFieldSuggestions = async (field, context = {}) => {
  console.log(field);
  try {
    const response = await api.post("/api/suggestions/fields", {
      field,
      context,
    });
    // Clean up suggestions - split if it's a string and filter empty values
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
    return response.data.suggestions || [];
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
