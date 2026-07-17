import api from "./api";

// ==============================
// Register User
// ==============================
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Registration failed. Please try again.",
      }
    );
  }
};

// ==============================
// Login User
// ==============================
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Login failed. Please try again.",
      }
    );
  }
};

// ==============================
// Logout User
// ==============================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};