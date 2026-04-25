import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

// Get Cart
router.get("/", isAuthenticatedUser, getCart);

// Add to Cart
router.post("/", isAuthenticatedUser, addToCart);

// Update quantity
router.put("/:id", isAuthenticatedUser, updateCartItem);

// Remove single item
router.delete("/:id", isAuthenticatedUser, deleteCartItem);

// Clear entire cart
router.delete("/", isAuthenticatedUser, clearCart);

export default router;