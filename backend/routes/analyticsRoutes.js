import express from "express";
import {
  getCategoryAnalytics,
  getMonthlyAnalytics,
  getDashboardSummary,
} from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply protection middleware
router.use(protect);

router.get("/", getDashboardSummary);
router.get("/category", getCategoryAnalytics);
router.get("/monthly", getMonthlyAnalytics);

export default router;
