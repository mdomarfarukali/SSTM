import Review from "../models/Review.js";
// import { updateProductStats } from "../utils/updateProductStats.js"; // ✅ import

// ✅ CREATE REVIEW
export const createReview = async (req, res) => {
    try {
        const { product_id, review, rating } = req.body;
        const user_id = req.user.id;

        // Prevent duplicate review
        const existing = await Review.findOne({ product_id, user_id });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product"
            });
        }

        const newReview = await Review.create({
            product_id,
            user_id,
            review,
            rating
        });

        res.status(201).json({
            success: true,
            message: "Review added",
            review: newReview
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE REVIEW
export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { review, rating } = req.body;
        const user_id = req.user.id;

        const existing = await Review.findById(reviewId);

        if (!existing) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (existing.user_id.toString() !== user_id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        existing.review = review ?? existing.review;
        existing.rating = rating ?? existing.rating;

        await existing.save();

        res.json({
            success: true,
            message: "Review updated",
            review: existing
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// GET PRODUCT REVIEWS (Minor Upgrade)
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ product_id: productId })
            .populate("user_id", "name avatar")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// GET MY REVIEWS (Good, just polished)
export const getMyReviews = async (req, res) => {
    try {
        const user_id = req.user.id;

        const reviews = await Review.find({ user_id })
            .populate("product_id", "name thumbnail")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//Delete review by user
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user_id = req.user.id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    // 🔐 Ownership check
    if (review.user_id.toString() !== user_id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const productId = review.product_id;

    await Review.findByIdAndDelete(reviewId);

    // ✅ Update aggregates (if NOT using middleware)
    // await updateProductStats(productId);

    res.json({
      success: true,
      message: "Review deleted"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};