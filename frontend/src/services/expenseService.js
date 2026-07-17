import api from "./api";

// ==============================
// Get All Expenses
// ==============================
export const getExpenses = async () => {
  try {
    const response = await api.get("/expenses");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch expenses.",
      }
    );
  }
};

// ==============================
// Get Single Expense
// ==============================
export const getExpenseById = async (id) => {
  try {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch expense.",
      }
    );
  }
};

// ==============================
// Add Expense
// ==============================
export const addExpense = async (expenseData) => {
  try {
    const response = await api.post("/expenses", expenseData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to add expense.",
      }
    );
  }
};

// ==============================
// Update Expense
// ==============================
export const updateExpense = async (id, expenseData) => {
  try {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to update expense.",
      }
    );
  }
};

// ==============================
// Delete Expense
// ==============================
export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to delete expense.",
      }
    );
  }
};