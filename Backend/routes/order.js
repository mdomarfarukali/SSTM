// const sendToken = (user, statusCode, res) => {
//   // Create JWT token
//   const token = user.getJwtToken();
//   // Options for cookie
//   const options = {
//     expires: new Date(
//       Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     secure: process.env.NODE_ENV === 'production',
//     domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
//   };

//   res
//     .status(statusCode)
//     .cookie('token', token, options)
//     .json({
//       success: true,
//       token,
//       user
//     });
// };

// export default sendToken;

import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
  getOrderStats,
} from "../controllers/orderController.js";

import { isAuthenticatedUser, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// 👤 User Routes
router.post("/", isAuthenticatedUser, createOrder);
router.get("/my-orders", isAuthenticatedUser, getMyOrders);
router.get("/:id", isAuthenticatedUser, getOrderById);
router.put("/:id/cancel", isAuthenticatedUser, cancelOrder);

// 🛠️ Admin Routes
router.get("/", isAuthenticatedUser, isAdmin, getAllOrders);
router.put("/:id/status", isAuthenticatedUser, isAdmin, updateOrderStatus);
router.get("/admin/stats/overview", isAuthenticatedUser, isAdmin, getOrderStats);

export default router;
