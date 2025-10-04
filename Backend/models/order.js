import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: String,
  total: Number,
  status: { type: String, default: "Pending" },
});

export default mongoose.model("Order", orderSchema);
