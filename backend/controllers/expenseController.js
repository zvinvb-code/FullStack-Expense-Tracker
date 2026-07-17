// Purpose:
// Add Expense
// Edit Expense
// Delete Expense
// Get Expenses
// Search
// Filter
// Pagination

// Add Expense Logic
// Receive expense
//       ↓
// Attach userId
//       ↓
// Save in MongoDB

// Get Expense Logic
// Find expenses
// where userId = logged user

import Expense from "../models/Expense.js";

// =====================
// Add Expense
// =====================
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    const expense = await Expense.create({
      userId: req.user.id,
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// Get Expenses
// Search + Filter + Pagination
// =====================
export const getExpenses = async (req, res) => {
  try {
    const {
      search,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {
      userId: req.user.id,
    };

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by date range
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalExpenses = await Expense.countDocuments(query);

    res.status(200).json({
      expenses,
      currentPage: Number(page),
      totalPages: Math.ceil(totalExpenses / limit),
      totalExpenses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// Update Expense
// =====================
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Ensure owner can update
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// Delete Expense
// =====================
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Ensure owner can delete
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// Get Single Expense
// =====================
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Ensure owner can view
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};