import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your API to send a reset password link
    console.log("Reset link requested for:", email);
    alert(`Password reset link sent to ${email} (check console)`);
    setEmail(""); // Clear input after submit
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
            Forgot Your Password?
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-3 bg-brand-primary hover:bg-brand-highlight text-white text-sm font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 transition duration-200"
              type="submit"
            >
              Send Reset Link
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

export default ForgotPassword;
