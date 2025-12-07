import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import lightLogo from "/DIVA.png";
import darkLogo from "/DIVA_G_Dark.png";

const SignUpForm = () => {

  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
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
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-brand-light">
      <div
        className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-16"
        style={{ backgroundImage: `url('${theme === "dark" ? darkLogo : lightLogo}')` }}
      >
        <div className="backdrop-blur-md bg-white/30 p-10 rounded-2xl max-w-4xl w-full shadow-lg">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl pb-10 font-extrabold text-center text-brand">
            Create Your Account
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    className="block text-brand text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-brand text-brand text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Address */}
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
                  <p className="text-xs text-brand-muted mt-1"></p>
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-brand text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-brand text-brand text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                {/* Date of Birth */}
                <div>
                  <label
                    className="block text-brand text-sm font-medium mb-1"
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-brand text-brand text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    className="block text-brand text-sm font-medium mb-1"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-brand text-brand text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-brand-muted mt-1">
                    Enter a 10-digit mobile number.
                  </p>
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
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-3 bg-brand-primary hover:bg-brand-highlight text-white text-sm font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 transition duration-200"
              type="submit"
            >
              Sign Up
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
            Already have an account?{" "}
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

export default SignUpForm;
