// Purpose: Authenticate users and protect private routes
// Example:
// Add Expense
// Only logged-in users allowed.

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Get user details (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({
        message: "No token provided. Unauthorized access.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

// Flow

// Request arrives
//       ↓
// Check token exists?
//       ↓
// Verify token
//       ↓
// Extract user id
//       ↓
// Allow access