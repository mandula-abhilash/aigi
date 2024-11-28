import api from "./api";

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} Registration response
 */
export const register = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error?.details) {
      throw new Error(error.response.data.error.details);
    }
    throw new Error("Registration failed. Please try again.");
  }
};

/**
 * Verify user's email
 * @param {string} token - Email verification token
 * @returns {Promise<Object>} Verification response
 */
export const verifyEmail = async (token) => {
  try {
    const response = await api.post("/api/auth/verify-email", { token });
    return response.data;
  } catch (error) {
    throw new Error("Email verification failed. Please try again.");
  }
};
