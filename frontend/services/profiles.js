import api from "./api";

export async function getGiftProfiles() {
  try {
    const response = await api.get("/api/gift-profiles");
    return response.data;
  } catch (error) {
    console.error("Error fetching gift profiles:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch gift profiles"
    );
  }
}

export async function getGiftProfileById(id) {
  try {
    const response = await api.get(`/api/gift-profiles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gift profile:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch gift profile"
    );
  }
}

export async function createGiftProfile(profileData) {
  try {
    const response = await api.post("/api/gift-profiles", profileData);
    return response.data;
  } catch (error) {
    console.error("Error creating gift profile:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create gift profile"
    );
  }
}

export async function updateGiftProfile(id, profileData) {
  try {
    const response = await api.put(`/api/gift-profiles/${id}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating gift profile:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update gift profile"
    );
  }
}

export async function deleteGiftProfile(id) {
  try {
    const response = await api.delete(`/api/gift-profiles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting gift profile:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete gift profile"
    );
  }
}
