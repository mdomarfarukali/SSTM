import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // optional if auth
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
     
    },
  ],
  numberOfItems: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;