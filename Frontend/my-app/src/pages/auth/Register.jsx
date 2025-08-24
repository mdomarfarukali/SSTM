import React, { useState } from "react";

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
    // Handle form submission logic here
  };
 
  return ( <>
    <div
      className="max-w-screen  max-h-screen flex items-center justify-center  bg-yellow-200   px-4 sm:px-6 lg:px-8"
            style={{
        backgroundImage: "url('/jewell.png')",
      }}
    >
      {/* Dark Overlay */}
       {<div className="absolute inset-0 bg-opacity-100"></div> }

      {/* Form Container */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10">
        
        {/* Welcome Box */}
        <div className="bg-gray-100/70 rounded-lg shadow p-3 sm:p-4 mb-4">
          <p className="text-center text-gray-700 text-sm sm:text-base font-medium">
            Welcome! Please fill in your details carefully.
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-white tracking-wide">
          CREATE YOUR ACCOUNT
        </h2>
        <p className="text-red-400 text-center text-xs sm:text-sm md:text-base mb-6">
          All fields are required.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-white text-xs sm:text-sm md:text-base font-semibold mb-2"
            >
              Name
            </label>
            <input
              className="shadow border rounded w-full py-2 sm:py-3 px-3 sm:px-4 bg-white/70 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
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
              htmlFor="email"
              className="block text-white text-xs sm:text-sm md:text-base font-semibold mb-2"
            >
              Email
            </label>
            <input
              className="shadow border rounded w-full py-2 sm:py-3 px-3 sm:px-4 bg-white/70 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
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
              htmlFor="password"
              className="block text-white text-xs sm:text-sm md:text-base font-semibold mb-2"
            >
              Password
            </label>
            <input
              className="shadow border rounded w-full py-2 sm:py-3 px-3 sm:px-4 bg-white/70 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
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
              htmlFor="confirmPassword"
              className="block text-white text-xs sm:text-sm md:text-base font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              className="shadow border rounded w-full py-2 sm:py-3 px-3 sm:px-4 bg-white/70 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-300 w-full transition duration-300 text-sm sm:text-base"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-xs sm:text-sm md:text-base mt-4 text-white">
          Already have an account?{" "}
          <a href="#" className="text-pink-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
    </>
  );
};

export default SignUpForm;
