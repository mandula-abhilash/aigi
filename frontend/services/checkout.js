import api from "./api";

export const createCheckoutSession = async (planData) => {
  try {
    const response = await api.post("/api/checkout/session", planData);
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create checkout session"
    );
  }
};

export const verifyPaymentSession = async (sessionId) => {
  try {
    const response = await api.get(`/api/checkout/verify/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying payment session:", error);
    throw new Error(
      error.response?.data?.message || "Failed to verify payment session"
    );
  }
};
