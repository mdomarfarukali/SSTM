import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    // 👤 Linked User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🏠 Address Info
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,

    addressLine1: { type: String, required: true },
    addressLine2: String,
    landmark: String,

    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: "India" },

    // 🏷️ Tags
    addressType: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },

    // ✅ Default Address
    isDefault: { type: Boolean, default: false },

    // 🔗 Order Associations (for quick lookup)
    linkedOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    // 📦 Delivery Instructions
    instructions: String,
  },
  { timestamps: true }
);

export default mongoose.model("UserAddress", addressSchema);
