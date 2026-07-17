import api from "./api";

// ==============================
// Get Dashboard Analytics
// ==============================
export const getAnalytics = async () => {
  try {
    const response = await api.get("/analytics");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch analytics.",
      }
    );
  }
};

// ==============================
// Get Monthly Analytics
// ==============================
export const getMonthlyAnalytics = async () => {
  try {
    const response = await api.get("/analytics/monthly");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch monthly analytics.",
      }
    );
  }
};

// ==============================
// Get Category Analytics
// ==============================
export const getCategoryAnalytics = async () => {
  try {
    const response = await api.get("/analytics/category");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch category analytics.",
      }
    );
  }
};

// ==============================
// Get Financial Health Score
// ==============================
export const getFinancialHealth = async () => {
  try {
    const response = await api.get("/analytics/health");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch financial health.",
      }
    );
  }
};