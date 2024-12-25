const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { neon } = require("@neondatabase/serverless");
const adminRoute = require("./routes/admin.route.js");
const userRoute = require("./routes/user.route.js");
const details = require("./controllers/details.controller.js");

require("dotenv").config();
const app = express();

// Environment variables
const { DATABASE_URL, FRONTEND_URL } = process.env;

const sql = neon(DATABASE_URL);

async function connectPostgres() {
  try {
    const result = await sql`SELECT version()`;
    console.log("Connected to PostgreSQL:", result[0].version);
  } catch (err) {
    console.error("Failed to connect to PostgreSQL:", err.message);
  }
}
connectPostgres();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL || "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

// Routes
app.use("/api/admin", adminRoute);
app.use("/api", userRoute);

app.get("/api/details", details);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT} 🔼`);
});

module.exports = app;
