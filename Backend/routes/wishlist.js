import express from "express";
import {
  getWishlist,
  addToWishlist,
  deleteWishlistItem,
} from "../controllers/wishlistController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isAuthenticatedUser, getWishlist);
router.post("/", isAuthenticatedUser, addToWishlist);
router.delete("/:id", isAuthenticatedUser, deleteWishlistItem);

export default router;