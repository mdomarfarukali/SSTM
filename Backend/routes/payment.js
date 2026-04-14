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
import { isAuthenticatedUser, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// 🧍‍♀️ USER ROUTES
router.post("/", isAuthenticatedUser, createPayment);
router.get("/my", isAuthenticatedUser, getUserPayments);
router.get("/:id", isAuthenticatedUser, getPaymentById);
router.put("/:id/refund", isAuthenticatedUser, requestRefund);

// 🧑‍💼 ADMIN ROUTES
router.get("/", isAuthenticatedUser, isAdmin, getAllPayments);
router.put("/:id/status", isAuthenticatedUser, isAdmin, updatePaymentStatus);
router.put("/:id/refund/process", isAuthenticatedUser, isAdmin, processRefund);

export default router;
