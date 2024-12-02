import api from "./api";

export const getActivePlans = async () => {
  try {
    const response = await api.get("/api/plans");
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch plans");
  }
};
