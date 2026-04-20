import express from "express";
import {
  createReview,
  updateReview,
  getProductReviews,
  getMyReviews,
  deleteReview
} from "../controllers/reviewController.js";

import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticatedUser, createReview);
router.put("/:reviewId", isAuthenticatedUser, updateReview);

router.get("/product/:productId", getProductReviews);
router.get("/me", isAuthenticatedUser, getMyReviews);

router.delete("/:reviewId", isAuthenticatedUser, deleteReview);

export default router;