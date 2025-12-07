import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
} from "../controllers/productController.js";

const router = express.Router();

/* =========================================================
   🛒 PRODUCT ROUTES
========================================================= */

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Admin
 */
router.post("/", createProduct);

/**
 * @route   GET /api/products
 * @desc    Get all products (with filters, sorting, pagination)
 * @access  Public
 */
router.get("/", getAllProducts);

/**
 * @route   GET /api/products/:idOrSlug
 * @desc    Get single product by ID or slug
 * @access  Public
 */
router.get("/:idOrSlug", getProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product details
 * @access  Admin
 */
router.put("/:id", updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Admin
 */
router.delete("/:id", deleteProduct);

/* =========================================================
   ⭐ REVIEW ROUTES
========================================================= */

/**
 * @route   POST /api/products/:productId/review
 * @desc    Add a review to a product
 * @access  Authenticated User
 */
router.post("/:productId/review", addReview);

/* =========================================================
   🏷️ COLLECTION ROUTES
========================================================= */

/**
 * @route   GET /api/products/collections/featured
 * @desc    Get featured products
 * @access  Public
 */
router.get("/collections/featured", getFeaturedProducts);

/**
 * @route   GET /api/products/collections/new
 * @desc    Get new arrival products
 * @access  Public
 */
router.get("/collections/new", getNewArrivals);

/**
 * @route   GET /api/products/collections/best
 * @desc    Get best-selling products
 * @access  Public
 */
router.get("/collections/best", getBestSellers);

export default router;
