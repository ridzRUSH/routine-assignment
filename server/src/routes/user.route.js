const express = require("express");
const {
  registerUser,
  loginUser,
  getAllRoutines,
  markDailyActivity,
  userEngagementsDetails,
} = require("../controllers/user.controller.js");
const { authenticateToken } = require("../middleware/auth.js");

const route = express.Router();

// User registration
route.post("/auth/register", registerUser);

// User login
route.post("/auth/login", loginUser);

// Get all routines (protected route)
route.get("/routines", getAllRoutines);

// Mark a daily activity as completed (protected route)
route.patch(
  "/daily-activities/:activityId",
  authenticateToken,
  markDailyActivity
);

// Get user engagement details (protected route)
route.get(
  "/users/:userId/engagements",
  authenticateToken,
  userEngagementsDetails
);

module.exports = route;
