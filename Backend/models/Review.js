import mongoose from "mongoose";
import { updateProductStats } from "../utils/updateProductStats.js";

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  review: {
    type: String,
    trim: true,
    default: ""
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }

}, {
  timestamps: true
});

// Prevent duplicate reviews from same user for same product
reviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

// After creating or saving a review
reviewSchema.post("save", async function () {
  await updateProductStats(this.product_id);
});


// After updating a review
reviewSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await updateProductStats(doc.product_id);
  }
});


// After deleting a review
reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await updateProductStats(doc.product_id);
  }
});

export default mongoose.model("Review", reviewSchema);