import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    alert("Login submitted!");
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
      style={{ backgroundImage: "url('/jewell.png')" }}
    >
      {/* Your content */}


      {/* <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-16"
      style={{ backgroundImage: "url('/jewell.png')" }}
    > */}
      {/* Your content here */}


      {/* <div
        className="min-h-screen w-screen flex items-center justify-between px-16"
        style={{
          backgroundImage: "url('/jewell.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      > */}
      {/* Left side - Brand Name */}
      <div className="flex flex-col items-start text-left space-y-4">
        <h1 className="text-7xl font-serif font-bold text-red-800 drop-shadow-lg">
          DIVA
        </h1>
        <p className="text-2xl italic text-white-700 drop-shadow-md">
          Elegant Jewellery, Timeless Beauty
        </p>
      </div>

      {/* Right side - Login card */}
      <div
        className="relative z-20 w-[400px] p-6 
        bg-white/20 backdrop-blur-xl 
        rounded-2xl shadow-2xl border border-yellow-300/50 
        transition-transform transform hover:scale-105 hover:shadow-yellow-400/40"
      >
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-red-800 drop-shadow">
            SIGN IN
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-200"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-yellow-400/60 
                rounded-lg shadow-sm focus:outline-none 
                focus:ring-2 focus:ring-yellow-500 
                bg-white/60 backdrop-blur-md
                placeholder-gray-700"
              required
            />
          </div>

          {/* Password */}
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
                bg-white/60 backdrop-blur-md
                placeholder-gray-700"
              required
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm text-gray-200">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-yellow-600 border-blue-700 rounded"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="text-yellow-200 hover:underline font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white 
              bg-gradient-to-r from-yellow-600 to-yellow-800 
              hover:from-yellow-700 hover:to-yellow-900 
              rounded-lg shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <span className="absolute px-2 bg-black/50 text-gray-200">or</span>
          <div className="w-full border-t border-gray-300/40"></div>
        </div>

        {/* Social Login */}
        <button
          className="w-full py-3 flex items-center justify-center space-x-2 
          border border-gray-300/50 rounded-lg shadow-sm 
          hover:bg-white/20 bg-white/10 backdrop-blur-md text-white"
        >
          <img
            src="https://www.svgrepo.com/show/303552/google-g-2015-logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Signup */}
        <div className="mt-3">
          <p className="text-center text-sm text-blue-700">
            New here?{" "}
            <a
              href="#"
              className="text-yellow-200 font-semibold hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
