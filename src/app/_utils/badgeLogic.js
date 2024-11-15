// src/utils/badgeLogic.js

export const calculateBadge = (employee) => {
  // Define criteria for different badges
  if (
    employee.rating >= 4.5 &&
    employee.orderAccuracy >= 95 &&
    employee.ordersCompleted >= 100
  ) {
    return {
      earned: true,
      icon: "🏆",
      message:
        "Congratulations! You've earned the Excellence Badge for outstanding performance!",
    };
  }

  if (
    employee.rating >= 4.0 &&
    employee.orderAccuracy >= 90 &&
    employee.ordersCompleted >= 75
  ) {
    return {
      earned: true,
      icon: "🥇",
      message:
        "Well done! You've earned the Silver Badge for great performance!",
    };
  }

  if (
    employee.rating >= 3.5 &&
    employee.orderAccuracy >= 85 &&
    employee.ordersCompleted >= 50
  ) {
    return {
      earned: true,
      icon: "🥈",
      message:
        "Good job! You've earned the Bronze Badge for solid performance.",
    };
  }

  return {
    earned: false,
    icon: "",
    message: "Keep up the good work! Continue improving to earn your badge.",
  };
};
