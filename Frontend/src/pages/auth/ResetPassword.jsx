import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Here you would call your API to reset the password
    console.log("Reset Password Data:", formData);
    alert("Password reset successfully! Check console for data.");
    // Optionally, redirect to login page after reset
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-brand-light">
      <div
        className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-16"
        style={{ backgroundImage: "url('/jewell.png')" }}
      >
        <div className="backdrop-blur-md bg-white/30 p-10 rounded-2xl max-w-4xl w-full shadow-lg">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl pb-10 font-extrabold text-center text-brand">
            Reset Your Password
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label
                  className="block text-brand text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-brand text-brand text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <label
                  className="block text-brand text-sm font-medium mb-1"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-brand text-brand text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className="block text-brand text-sm font-medium mb-1"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-brand text-brand text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-3 bg-brand-primary hover:bg-brand-highlight text-white text-sm font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 transition duration-200"
              type="submit"
            >
              Reset Password
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-brand-muted"></div>
            <span className="px-2 text-xs text-brand-muted">or</span>
            <div className="flex-grow border-t border-brand-muted"></div>
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-brand">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-brand-primary font-medium hover:underline transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
