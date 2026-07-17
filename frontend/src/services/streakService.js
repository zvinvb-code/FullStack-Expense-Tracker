import api from "./api";

// ==============================
// Get User Spending Streak
// ==============================
export const getStreak = async () => {
  try {
    const response = await api.get("/streaks");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch streak data.",
      }
    );
  }
};

// ==============================
// Reset Streak (Optional)
// ==============================
export const resetStreak = async () => {
  try {
    const response = await api.post("/streaks/reset");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to reset streak.",
      }
    );
  }
};