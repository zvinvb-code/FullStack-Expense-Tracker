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
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Previous Month
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

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

    const currentTotal = currentMonthExpenses[0]?.total || 0;
    const previousTotal = previousMonthExpenses[0]?.total || 0;

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

    const topCategoryName = topCategory[0]?._id || "None";
    const topCategorySpent = topCategory[0]?.totalSpent || 0;

    // Generate Health Score (Base: 85)
    let score = 85;
    if (previousTotal > 0) {
      if (currentTotal > previousTotal) {
        const pctIncrease = ((currentTotal - previousTotal) / previousTotal) * 100;
        score -= Math.min(Math.round(pctIncrease / 2), 40); // Subtract up to 40 points
      } else {
        const pctDecrease = ((previousTotal - currentTotal) / previousTotal) * 100;
        score += Math.min(Math.round(pctDecrease / 3), 15); // Add up to 15 points
      }
    }
    // Adjust based on top category behavior
    if (topCategoryName.toLowerCase() === "shopping" || topCategoryName.toLowerCase() === "entertainment") {
      score -= 5;
    }
    score = Math.max(20, Math.min(100, score));

    // Generate Narrative Summary
    let summary = "";
    if (score >= 80) {
      summary = "Outstanding control! You are maintaining your spending well within your margins and matching targets.";
    } else if (score >= 60) {
      summary = "Your financial health is stable, but high concentration in discretionary categories is dragging down your score.";
    } else {
      summary = "Alert: Your monthly spending has increased significantly. We advise creating immediate budget limits.";
    }

    // Generate Spending Pattern Analysis
    let spendingPattern = "";
    if (currentTotal === 0) {
      spendingPattern = "We don't have enough spending history yet to compile your patterns. Try logging a few transactions first!";
    } else {
      spendingPattern = `Your highest expense concentration is currently in the ${topCategoryName} category (₹${topCategorySpent}). `;
      if (previousTotal > 0) {
        const diff = currentTotal - previousTotal;
        if (diff > 0) {
          spendingPattern += `You have spent ₹${diff} more this month compared to your previous month's total.`;
        } else {
          spendingPattern += `You are on track, having saved ₹${Math.abs(diff)} relative to your previous month's total.`;
        }
      } else {
        spendingPattern += `Try keeping your total monthly spending below ₹${Math.round(currentTotal * 0.9)} next month to build your savings buffer.`;
      }
    }

    // Generate Recommendations
    const recommendations = [];
    if (topCategoryName.toLowerCase() === "food") {
      recommendations.push("Consider budget meals or cooking at home to reduce your food category concentration.");
    } else if (topCategoryName.toLowerCase() === "shopping") {
      recommendations.push("Create a 48-hour cool-off list for shopping purchases to restrict impulsive habits.");
    } else if (topCategoryName.toLowerCase() === "entertainment") {
      recommendations.push("Evaluate if any digital entertainment passes can be shared or paused.");
    } else {
      recommendations.push("Log your daily expenses consistently to get more customized AI recommendations.");
    }
    recommendations.push("Track your monthly subscriptions to identify forgotten recurring commitments.");

    // Generate Savings Tips
    const savingsTips = [
      "Follow the 50/30/20 rule: 50% for Needs, 30% for Wants, and 20% for Savings.",
      "Always set up automatic transfers to your savings goals on the day you receive income.",
      "Review your transactions at the end of each week to keep your discretionary budget in check.",
    ];

    res.status(200).json({
      score,
      summary,
      spendingPattern,
      recommendations,
      savingsTips,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};