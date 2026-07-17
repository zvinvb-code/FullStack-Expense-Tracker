import api from "./api";

// ==============================
// Get AI Insights
// ==============================
export const getAIInsights = async () => {
  try {
    const response = await api.get("/insights");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch AI insights.",
      }
    );
  }
};

// ==============================
// Refresh AI Insights
// ==============================
export const refreshAIInsights = async () => {
  try {
    const response = await api.post("/insights/refresh");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to refresh AI insights.",
      }
    );
  }
};