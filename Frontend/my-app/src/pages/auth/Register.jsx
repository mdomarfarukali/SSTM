import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    console.log(formData);
    alert("Form submitted! Check the console for data.");
  };

  return (
    <div
      // className="cover bg-brand-cream hero-pattern"
      className="fixed top-0 right-0 bottom-0 left-0 bg-blue-500"
    >
      <div
        className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-16"
        style={{ backgroundImage: "url('/jewell.png')" }}
      >
        {/* <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100"> */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900">
              Create Your Account
            </h2>
            <p className="text-red-500 text-center text-xs sm:text-sm mt-2 mb-6">
              All fields are required
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"
                type="submit"
              >
                Sign Up
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-2 text-gray-500 text-xs">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-pink-500 font-medium hover:underline transition"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default SignUpForm;
