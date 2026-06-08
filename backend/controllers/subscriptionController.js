// Purpose:

// Detect recurring payments.

// Logic

// Look for:

// Same title
// Same amount
// Every month

import Expense from "../models/Expense.js";

// ===================================
// Get All Recurring Subscriptions
// ===================================
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: {
            title: "$title",
            amount: "$amount",
          },
          count: {
            $sum: 1,
          },
          latestDate: {
            $max: "$date",
          },
        },
      },
      {
        $match: {
          count: {
            $gte: 2,
          },
        },
      },
      {
        $project: {
          _id: 0,
          title: "$_id.title",
          amount: "$_id.amount",
          occurrences: "$count",
          latestDate: 1,
        },
      },
    ]);

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===================================
// Upcoming Renewals
// ===================================
export const getUpcomingSubscriptions = async (
  req,
  res
) => {
  try {
    const subscriptions = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: {
            title: "$title",
            amount: "$amount",
          },
          count: {
            $sum: 1,
          },
          latestDate: {
            $max: "$date",
          },
        },
      },
      {
        $match: {
          count: {
            $gte: 2,
          },
        },
      },
    ]);

    const today = new Date();

    const upcomingRenewals = subscriptions.map(
      (sub) => {
        const renewalDate = new Date(
          sub.latestDate
        );

        renewalDate.setMonth(
          renewalDate.getMonth() + 1
        );

        const daysRemaining = Math.ceil(
          (renewalDate - today) /
            (1000 * 60 * 60 * 24)
        );

        return {
          title: sub._id.title,
          amount: sub._id.amount,
          renewalDate,
          renewsIn: `${daysRemaining} days`,
        };
      }
    );

    res.status(200).json(upcomingRenewals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};