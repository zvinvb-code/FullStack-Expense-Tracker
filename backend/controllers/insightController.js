// Purpose:

// Generate smart financial insights.
// Logic

// Calculate:

// Current Month Spending
// Previous Month Spending

// Compare both

import Expense from "../models/Expense.js";

export const getInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();

    // Current Month
    const currentMonthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const currentMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );

    // Previous Month
    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const previousMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    );

    // Current Month Expenses
    const currentMonthExpenses = await Expense.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: currentMonthStart,
            $lte: currentMonthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    // Previous Month Expenses
    const previousMonthExpenses = await Expense.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: previousMonthStart,
            $lte: previousMonthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const currentTotal =
      currentMonthExpenses[0]?.total || 0;

    const previousTotal =
      previousMonthExpenses[0]?.total || 0;

    // Highest Spending Category
    const topCategory = await Expense.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: "$category",
          totalSpent: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          totalSpent: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const insights = [];

    // Insight 1: Spending Difference
    if (previousTotal > 0) {
      const percentage =
        (
          ((currentTotal - previousTotal) /
            previousTotal) *
          100
        ).toFixed(1);

      if (currentTotal > previousTotal) {
        insights.push(
          `Your spending increased by ${percentage}% compared to last month.`
        );
      } else if (currentTotal < previousTotal) {
        insights.push(
          `Your spending decreased by ${Math.abs(
            percentage
          )}% compared to last month.`
        );
      }
    }

    // Insight 2: Difference Amount
    const difference =
      currentTotal - previousTotal;

    if (difference > 0) {
      insights.push(
        `You spent ₹${difference.toFixed(
          0
        )} more than last month.`
      );
    } else if (difference < 0) {
      insights.push(
        `You saved ₹${Math.abs(
          difference
        ).toFixed(0)} compared to last month.`
      );
    }

    // Insight 3: Top Category
    if (topCategory.length > 0) {
      insights.push(
        `${topCategory[0]._id} is your highest spending category.`
      );
    }

    // Insight 4: Current Month Total
    insights.push(
      `Your total spending this month is ₹${currentTotal.toFixed(
        0
      )}.`
    );

    res.status(200).json({
      insights,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};