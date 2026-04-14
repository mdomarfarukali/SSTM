import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // 🔗 Linked Order
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    // 👤 Linked User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 💳 Payment Method
    paymentMethod: {
      type: String,
      enum: ["COD", "Credit Card", "Debit Card", "UPI", "Net Banking", "Wallet"],
      required: true,
    },

    // 🧾 Transaction Details
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    transactionId: { type: String, unique: true, sparse: true },
    provider: { type: String }, // Razorpay / Stripe / Paytm / etc.

    // 💰 Payment Status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Processing", "Paid", "Failed", "Refunded", "Cancelled"],
      default: "Pending",
    },
    paymentDate: Date,
    failureReason: String,

    // 🔄 Refund Information
    refundId: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ["None", "Requested", "Processing", "Completed", "Failed"],
      default: "None",
    },
    refundDate: Date,

    // 🧠 Metadata
    notes: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
