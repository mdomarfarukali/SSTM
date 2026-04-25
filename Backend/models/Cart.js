import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
      size: {
        type: String,
      },
      noof_item: {
        type: Number,
        default: 1,
      },
    },
  ],
  numberOfItems: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;