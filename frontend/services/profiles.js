import api from "./api";

/**
 * Fetch all gift profiles with optional search
 * @param {string} search - Optional search term
 * @returns {Promise<Array>} Array of gift profiles
 */
export async function getGiftProfiles(search = "") {
  try {
    const response = await api.get("/api/gift-profiles", {
      params: { search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching gift profiles:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch gift profiles"
    );
  }
}

/**
 * Fetch a single gift profile by ID
 * @param {string} id - Gift profile ID
 * @returns {Promise<Object>} Gift profile data
 */
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

/**
 * Create a new gift profile
 * @param {Object} profileData - Gift profile data
 * @returns {Promise<Object>} Created gift profile
 */
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

/**
 * Add a product to an existing gift profile
 * @param {string} profileId - Gift profile ID
 * @param {Object} productData - Product data to add
 * @returns {Promise<Object>} Updated gift profile
 */
export async function addProductToProfile(profileId, productData) {
  try {
    const response = await api.post(
      `/api/gift-profiles/${profileId}/products`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error(error.response?.data?.message || "Failed to add product");
  }
}

/**
 * Update an existing gift profile
 * @param {string} id - Gift profile ID
 * @param {Object} profileData - Updated gift profile data
 * @returns {Promise<Object>} Updated gift profile
 */
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

/**
 * Delete a gift profile
 * @param {string} id - Gift profile ID
 * @returns {Promise<Object>} Deletion response
 */
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
