// Purpose:

// Calculate no-spend streak.

// Logic

// Suppose expenses exist on:

// 1 June
// 5 June
// 10 June

// Days without spending:

// 2
// 3
// 4

// Current Streak:

// 3 days

// Longest Streak:

// 8 days

const calculateStreak = (expenses) => {
  if (!expenses || expenses.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  // Convert expense dates to YYYY-MM-DD format
  const expenseDates = new Set(
    expenses.map((expense) =>
      new Date(expense.date).toISOString().split("T")[0]
    )
  );

  // Sort dates
  const sortedDates = [...expenseDates].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  let longestStreak = 0;

  // Calculate Longest Streak
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const currentDate = new Date(sortedDates[i]);
    const nextDate = new Date(sortedDates[i + 1]);

    const diffDays = Math.floor(
      (nextDate - currentDate) /
        (1000 * 60 * 60 * 24)
    );

    const noSpendDays = diffDays - 1;

    if (noSpendDays > longestStreak) {
      longestStreak = noSpendDays;
    }
  }

  // Calculate Current Streak
  let currentStreak = 0;

  const today = new Date();
  let checkDate = new Date(today);

  while (true) {
    const dateString = checkDate
      .toISOString()
      .split("T")[0];

    if (expenseDates.has(dateString)) {
      break;
    }

    currentStreak++;

    checkDate.setDate(
      checkDate.getDate() - 1
    );
  }

  return {
    currentStreak,
    longestStreak,
  };
};

export default calculateStreak;