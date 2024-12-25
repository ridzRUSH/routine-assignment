const express = require("express");
const {
  dayEvent,
  analysis,
  postRoutine,
  addProduct,
  addProductToStepRoutine,
  addMilestone,
  addStepToRoutine,
} = require("../controllers/admin.controller.js");
const { authorizeAdmin } = require("../middleware/admin.js");
const { authenticateToken } = require("../middleware/auth.js");

const route = express.Router();

// Add a daily event to a routine (admin-only route)
route.post(
  "/routines/:routineId/daily-events",
  authenticateToken,
  authorizeAdmin,
  dayEvent
);

// Get analytics for a routine (admin-only route)
route.get(
  "/routines/:routineId/analytics",
  authenticateToken,
  authorizeAdmin,
  analysis
);

// Add a new routine (admin-only route)
route.post("/routines", authenticateToken, authorizeAdmin, postRoutine);

// Add a new product (admin-only route)
route.post("/products", authenticateToken, authorizeAdmin, addProduct);

// Add a product to a step in a routine (admin-only route)
route.post(
  "/routines/:routineId/steps/:stepId/products",
  authenticateToken,
  authorizeAdmin,
  addProductToStepRoutine
);

// Add a milestone to a routine (admin-only route)
route.post(
  "/routines/:routineId/milestones",
  authenticateToken,
  authorizeAdmin,
  addMilestone
);

route.post(
  "/routines/:routineId/steps",
  authenticateToken,
  authorizeAdmin,
  addStepToRoutine
);

module.exports = route;
