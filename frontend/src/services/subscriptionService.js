import api from "./api";

// ==============================
// Get All Subscriptions
// ==============================
export const getSubscriptions = async () => {
  try {
    const response = await api.get("/subscriptions");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch subscriptions.",
      }
    );
  }
};

// ==============================
// Get Single Subscription
// ==============================
export const getSubscriptionById = async (id) => {
  try {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch subscription.",
      }
    );
  }
};

// ==============================
// Add Subscription
// ==============================
export const addSubscription = async (subscriptionData) => {
  try {
    const response = await api.post("/subscriptions", subscriptionData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to add subscription.",
      }
    );
  }
};

// ==============================
// Update Subscription
// ==============================
export const updateSubscription = async (id, subscriptionData) => {
  try {
    const response = await api.put(
      `/subscriptions/${id}`,
      subscriptionData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to update subscription.",
      }
    );
  }
};

// ==============================
// Delete Subscription
// ==============================
export const deleteSubscription = async (id) => {
  try {
    const response = await api.delete(`/subscriptions/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to delete subscription.",
      }
    );
  }
};

// ==============================
// Get Upcoming Renewals
// ==============================
export const getUpcomingRenewals = async () => {
  try {
    const response = await api.get("/subscriptions/upcoming");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch upcoming renewals.",
      }
    );
  }
};

// ==============================
// Get Monthly Subscription Cost
// ==============================
export const getSubscriptionSummary = async () => {
  try {
    const response = await api.get("/subscriptions/summary");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch subscription summary.",
      }
    );
  }
};