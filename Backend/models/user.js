import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    // 🧍 Basic Info
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    firstName: {
      type: String,
      maxLength: [25, "Your first name cannot exceed 25 characters"],
    },
    lastName: {
      type: String,
      maxLength: [25, "Your last name cannot exceed 25 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    phone: {
      type: String,
      maxLength: [15, "Phone number cannot exceed 15 characters"],
    },

    // 📍 Address Info
    address: {
      type: String,
      maxLength: [200, "Address cannot exceed 200 characters"],
    },
    city: {
      type: String,
      maxLength: [50, "City name cannot exceed 50 characters"],
      default: "Los Angeles",
    },
    state: {
      type: String,
      maxLength: [50, "State name cannot exceed 50 characters"],
      default: "California",
    },
    postalCode: {
      type: String,
      maxLength: [10, "Postal code cannot exceed 10 characters"],
      default: "90025",
    },
    country: {
      type: String,
      maxLength: [50, "Country name cannot exceed 50 characters"],
      default: "United States",
    },

    // 🔒 Authentication
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    avatar: {
      type: String,
      default: "default-avatar.jpg",
    },

    // 🛒 Recommendation Data (for later)
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    browsingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    preferredCategories: [{ type: String }],
    preferredMaterials: [{ type: String }],

    // 🔁 Password Reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

/* =========================================================
   🧩 MIDDLEWARE & METHODS
========================================================= */

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export default mongoose.model("User", userSchema);
