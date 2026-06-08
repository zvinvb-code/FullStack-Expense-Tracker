// Purpose:

// Return streak information.
// {
//  "currentStreak":8,
//  "longestStreak":21
// }

import Expense from "../models/Expense.js";
import calculateStreak from "../utils/streakCalculator.js";

// ===================================
// Get No-Spend Streak
// ===================================
export const getStreak = async (req, res) => {
  try {
    // Fetch all expenses of logged-in user
    const expenses = await Expense.find({
      userId: req.user._id,
    }).sort({ date: 1 });

    // Calculate streak
    const streakData = calculateStreak(expenses);

    res.status(200).json(streakData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};