import express from "express";
import {
  getSubscriptions,
  getUpcomingSubscriptions,
} from "../controllers/subscriptionController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getSubscriptions
);

router.get(
  "/upcoming",
  protect,
  getUpcomingSubscriptions
);

export default router;