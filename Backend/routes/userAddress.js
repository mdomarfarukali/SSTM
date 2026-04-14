import express from "express";
import {
  createAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  linkAddressToOrder,
  adminGetAllAddresses,
  adminDeleteAddress,
} from "../controllers/userAddress.js";

import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// 🧍‍♀️ User Routes
router.post("/", isAuthenticated, createAddress);
router.get("/", isAuthenticated, getUserAddresses);
router.get("/:id", isAuthenticated, getAddressById);
router.put("/:id", isAuthenticated, updateAddress);
router.delete("/:id", isAuthenticated, deleteAddress);
router.patch("/:id/default", isAuthenticated, setDefaultAddress);
router.post("/link-order", isAuthenticated, linkAddressToOrder);

// 👑 Admin Routes
router.get("/admin/all", isAuthenticated, isAdmin, adminGetAllAddresses);
router.delete("/admin/:id", isAuthenticated, isAdmin, adminDeleteAddress);

export default router;
