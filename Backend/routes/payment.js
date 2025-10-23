import express from "express";
import {
  createPayment,
  getUserPayments,
  getPaymentById,
  requestRefund,
  getAllPayments,
  updatePaymentStatus,
  processRefund,
} from "../controllers/paymentController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// 🧍‍♀️ USER ROUTES
router.post("/", protect, createPayment);
router.get("/my", protect, getUserPayments);
router.get("/:id", protect, getPaymentById);
router.put("/:id/refund", protect, requestRefund);

// 🧑‍💼 ADMIN ROUTES
router.get("/", protect, admin, getAllPayments);
router.put("/:id/status", protect, admin, updatePaymentStatus);
router.put("/:id/refund/process", protect, admin, processRefund);

export default router;
