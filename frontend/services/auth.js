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
 * Login user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} Login response with user data and tokens
 */
export const login = async (credentials) => {
  try {
    const response = await api.post("/api/auth/login", credentials);

    // Check if the response indicates an error
    if (response.data.status === "error") {
      throw new Error(response.data.error.details || "Login failed");
    }

    if (!response.data.data) {
      throw new Error("Invalid response format");
    }

    return {
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
    };
  } catch (error) {
    if (error.response?.data?.error?.details) {
      throw new Error(error.response.data.error.details);
    }
    throw new Error(error.message || "Invalid email or password");
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
