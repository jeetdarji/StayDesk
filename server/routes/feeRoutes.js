import express from "express";
const router = express.Router();

import {
  getFees,
  createFee,
  updateFeeStatus,
} from "../controllers/feeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getFees).post(protect, admin, createFee);
router.route("/:id").put(protect, admin, updateFeeStatus);

export default router;
