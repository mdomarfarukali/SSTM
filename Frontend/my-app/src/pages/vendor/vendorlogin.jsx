import React, { useState } from "react";

export default function VendorAuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Shared states
  const [vendorId, setVendorId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Signup-specific states
  const [vendorName, setVendorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Vendor Login:", { vendorId, password, rememberMe });
    alert("Vendor Login submitted!");
  };

  // Handle Signup
  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Vendor Signup:", {
      vendorId,
      vendorName,
      email,
      phone,
      password,
    });
    alert("Vendor Signup submitted!");
    setIsLogin(true); // Switch to login after signup
  };

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col md:flex-row items-center justify-between px-6 md:px-16"
      style={{ backgroundImage: "url('/jewell.png')" }}
    >
      {/* Left side - Branding */}
      <div className="flex flex-col items-start text-left space-y-4 mb-8 md:mb-0">
        <h1 className="text-6xl font-serif font-bold text-yellow-700 drop-shadow-lg">
          DIVA Vendors
        </h1>
        <p className="text-xl italic text-white drop-shadow-md">
          Partner with us, grow with us
        </p>
      </div>

      {/* Right side - Auth Card */}
      <div
        className="relative z-20 w-full max-w-md p-6 
        bg-white/20 backdrop-blur-xl 
        rounded-2xl shadow-2xl border border-yellow-300/50 
        transition-transform transform hover:scale-105 hover:shadow-yellow-400/40"
      >
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-yellow-700 drop-shadow">
            {isLogin ? "VENDOR LOGIN" : "VENDOR SIGN UP"}
          </h1>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="mt-5 space-y-6">
            <div>
              <label
                htmlFor="vendorId"
                className="block mb-2 text-sm font-semibold text-gray-200"
              >
                Vendor ID
              </label>
              <input
                id="vendorId"
                type="text"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                placeholder="Enter Vendor ID"
                className="w-full px-4 py-3 border border-yellow-400/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 
                  bg-white/60 backdrop-blur-md placeholder-gray-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-yellow-400/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 
                  bg-white/60 backdrop-blur-md placeholder-gray-700"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-200">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-yellow-600"
                />
                Remember Me
              </label>
              <a
                href="#"
                className="text-yellow-200 font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white 
                bg-gradient-to-r from-yellow-600 to-yellow-800 
                hover:from-yellow-700 hover:to-yellow-900 
                rounded-lg shadow-lg"
            >
              Log In
            </button>

            <p className="text-center text-sm text-gray-200 mt-3">
              New here?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-yellow-200 font-semibold hover:underline cursor-pointer"
              >
                Create an Account
              </span>
            </p>
          </form>
        ) : (
          /* Signup Form */
          <form onSubmit={handleSignup} className="mt-5 space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Vendor ID
              </label>
              <input
                type="text"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                placeholder="Choose your Vendor ID"
                className="w-full px-4 py-3 border border-yellow-400/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 
                  bg-white/60 backdrop-blur-md placeholder-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Vendor Name
              </label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-yellow-400/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 
                  bg-white/60 backdrop-blur-md placeholder-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vendor@example.com"
                className="w-full px-4 py-3 border border-yellow-400/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 
                  bg-white/60 backdrop-blur-md placeholder-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 "
                className="w-full px-4 py-3 border border-yellow-400/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 
                  bg-white/60 backdrop-blur-md placeholder-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-yellow-400/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 
                  bg-white/60 backdrop-blur-md placeholder-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-yellow-400/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 
                  bg-white/60 backdrop-blur-md placeholder-gray-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white 
                bg-gradient-to-r from-yellow-600 to-yellow-800 
                hover:from-yellow-700 hover:to-yellow-900 
                rounded-lg shadow-lg"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-200 mt-3">
              <span
                onClick={() => setIsLogin(true)}
                className="text-yellow-200 font-semibold hover:underline cursor-pointer"
              >
                Log in here
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
