const details = async (req, res) => {
  const apiDetails = [
    {
      path: "/api/auth/register",
      method: "POST",
      description: "Registers a new user.",
      requiresAuth: false,
    },
    {
      path: "/api/auth/login",
      method: "POST",
      description: "Logs in a user and returns a token.",
      requiresAuth: false,
    },
    {
      path: "/api/routines",
      method: "GET",
      description: "Fetches all routines.",
      requiresAuth: true,
    },
    {
      path: "/api/daily-activities/:activityId",
      method: "PATCH",
      description: "Marks a daily activity as completed.",
      requiresAuth: true,
    },
    {
      path: "/api/users/:userId/engagements",
      method: "GET",
      description: "Fetches engagement details of a user.",
      requiresAuth: true,
    },
    {
      path: "/api/admin/routines/:routineId/daily-events",
      method: "POST",
      description: "Adds a daily event to a routine (admin only).",
      requiresAuth: true,
    },
    {
      path: "/api/admin/routines/:routineId/analytics",
      method: "GET",
      description: "Fetches analytics for a routine (admin only).",
      requiresAuth: true,
    },
    {
      path: "/api/admin/routines/:routineId/milestones",
      method: "POST",
      description: "Adds a milestone to a routine (admin only).",
      requiresAuth: true,
    },
  ];

  res.json(apiDetails);
};

module.exports = details;
