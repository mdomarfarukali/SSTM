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
      className="min-h-screen w-screen bg-admin-light flex flex-col md:flex-row items-center justify-between px-6 md:px-16"
    >
      {/* Left side - Branding */}
      <div className="flex flex-col items-start text-left space-y-4 mb-8 md:mb-0">
        <h1 className="text-6xl font-serif font-bold text-admin-primary drop-shadow-lg">
          DIVA Vendors
        </h1>
        <p className="text-xl italic text-admin-muted drop-shadow-md">
          Partner with us, grow with us
        </p>
      </div>

      {/* Right side - Auth Card */}
      <div
        className="relative z-20 w-full max-w-md p-6 
        bg-admin/20 backdrop-blur-xl 
        rounded-2xl shadow-2xl border border-admin-border 
        transition-transform transform hover:scale-105 hover:shadow-admin-primary/40"
      >
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-admin-primary drop-shadow">
            {isLogin ? "VENDOR LOGIN" : "VENDOR SIGN UP"}
          </h1>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="mt-5 space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-admin">
                Vendor ID
              </label>
              <input
                type="text"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                placeholder="Enter Vendor ID"
                className="w-full px-4 py-3 border border-admin-border/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-admin-primary 
                  bg-admin-light/60 backdrop-blur-md placeholder-admin-muted"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-admin">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-admin-border/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-admin-primary 
                  bg-admin-light/60 backdrop-blur-md placeholder-admin-muted"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-admin-muted">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-admin-primary"
                />
                Remember Me
              </label>
              <a href="#" className="text-admin-primary font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-admin-light 
                bg-admin-primary rounded-lg shadow-lg hover:bg-admin-primary-hover transition"
            >
              Log In
            </button>

            <p className="text-center text-sm text-admin-muted mt-3">
              New here?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-admin-primary font-semibold hover:underline cursor-pointer"
              >
                Create an Account
              </span>
            </p>
          </form>
        ) : (
          /* Signup Form */
          <form onSubmit={handleSignup} className="mt-5 space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-admin">
                Vendor ID
              </label>
              <input
                type="text"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                placeholder="Choose your Vendor ID"
                className="w-full px-4 py-3 border border-admin-border/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-admin-primary 
                  bg-admin-light/60 backdrop-blur-md placeholder-admin-muted"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-admin">
                Vendor Name
              </label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-admin-border/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-admin-primary 
                  bg-admin-light/60 backdrop-blur-md placeholder-admin-muted"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-admin">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vendor@example.com"
                className="w-full px-4 py-3 border border-admin-border/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-admin-primary 
                  bg-admin-light/60 backdrop-blur-md placeholder-admin-muted"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-admin">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 "
                className="w-full px-4 py-3 border border-admin-border/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-admin-primary 
                  bg-admin-light/60 backdrop-blur-md placeholder-admin-muted"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-admin">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-admin-border/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-admin-primary 
                  bg-admin-light/60 backdrop-blur-md placeholder-admin-muted"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-admin">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-admin-border/60 
                  rounded-lg shadow-sm focus:outline-none 
                  focus:ring-2 focus:ring-admin-primary 
                  bg-admin-light/60 backdrop-blur-md placeholder-admin-muted"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-admin-light 
                bg-admin-primary rounded-lg shadow-lg hover:bg-admin-primary-hover transition"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-admin-muted mt-3">
              <span
                onClick={() => setIsLogin(true)}
                className="text-admin-primary font-semibold hover:underline cursor-pointer"
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

