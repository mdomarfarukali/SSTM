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

import { isAuthenticatedUser, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// 👑 Admin Routes
router.get("/admin/all", isAuthenticatedUser, isAdmin, adminGetAllAddresses);
router.delete("/admin/:id", isAuthenticatedUser, isAdmin, adminDeleteAddress);

// 🧍‍♀️ User Routes
router.post("/", isAuthenticatedUser, createAddress);
router.get("/", isAuthenticatedUser, getUserAddresses);
router.post("/link-order", isAuthenticatedUser, linkAddressToOrder);
router.get("/:id", isAuthenticatedUser, getAddressById);
router.put("/:id", isAuthenticatedUser, updateAddress);
router.delete("/:id", isAuthenticatedUser, deleteAddress);
router.patch("/:id/default", isAuthenticatedUser, setDefaultAddress);




export default router;
