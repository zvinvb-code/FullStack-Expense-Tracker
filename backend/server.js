// Most Important File

// Purpose:
// Start backend
// Connect DB
// Register routes

// Flow:

// Start Server
//       ↓
// Load .env
//       ↓
// Connect MongoDB
//       ↓
// Load Routes
//       ↓
// Listen Port

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import insightRoutes from "./routes/insightRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/insights", insightRoutes);
app.use(
  "/api/subscriptions",
  subscriptionRoutes
);
app.use("/api/streaks", streakRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});