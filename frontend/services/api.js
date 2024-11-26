import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getFieldSuggestions = async (field, context = {}) => {
  const response = await api.post("/api/suggestions/fields", {
    field,
    context,
  });
  return response.data.suggestions;
};

export const getGiftSuggestions = async (formData) => {
  const response = await api.post("/api/suggestions/gifts", {
    recipient: formData.recipient,
    occasion: formData.occasion,
    interests: formData.interest,
    budget: formData.maxBudget,
  });
  return response.data.suggestions;
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
