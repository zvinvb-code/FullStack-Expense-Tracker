// purpose: generate charts
// Logic

// Group expenses by category.
import Expense from "../models/Expense.js";

// ======================
// Category Wise Analytics
// ======================
export const getCategoryAnalytics = async (req, res) => {
  try {
    const analytics = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: {
            $sum: "$amount",
          },
          totalTransactions: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalAmount: -1,
        },
      },
    ]);

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Monthly Analytics
// ======================
export const getMonthlyAnalytics = async (req, res) => {
  try {
    const analytics = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$date",
            },
            month: {
              $month: "$date",
            },
          },
          totalAmount: {
            $sum: "$amount",
          },
          totalTransactions: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Dashboard Summary
// ======================
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total Expenses
    const totalExpenseData = await Expense.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: null,
          totalExpenses: {
            $sum: "$amount",
          },
          totalTransactions: {
            $sum: 1,
          },
        },
      },
    ]);

    // Highest Spending Category
    const highestCategory = await Expense.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    // Current Month Spending
    const now = new Date();

    const firstDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );

    const currentMonthData = await Expense.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: firstDay,
            $lte: lastDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          currentMonthSpending: {
            $sum: "$amount",
          },
        },
      },
    ]);

    // Recent Transactions
    const recentTransactions = await Expense.find({
      userId,
    })
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json({
      totalExpenses:
        totalExpenseData[0]?.totalExpenses || 0,

      totalTransactions:
        totalExpenseData[0]?.totalTransactions || 0,

      highestCategory:
        highestCategory[0]?._id || "N/A",

      currentMonthSpending:
        currentMonthData[0]?.currentMonthSpending || 0,

      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};