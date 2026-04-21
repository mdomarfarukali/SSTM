import mongoose from "mongoose";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const updateProductStats = async (productId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(productId);

    const stats = await Review.aggregate([
      { $match: { product_id: objectId } },
      {
        $group: {
          _id: "$product_id",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    await Product.findByIdAndUpdate(productId, {
      rating: stats.length ? stats[0].avgRating : 0,
      numReviews: stats.length ? stats[0].totalReviews : 0
    }, { new: true });

    // console.log("\nProductId: ", productId, "\nStats: ", stats, "\n");
    // await Review.findByIdAndUpdate(id, update, { new: true });
  } catch (err) {
    console.error("Error updating product stats:", err);
  }
};