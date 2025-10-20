import React, { useState } from "react";
import { Link } from "react-router-dom";

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
            // The outer background color uses the 'bg-brand' class
            className="fixed top-0 right-0 bottom-0 left-0 bg-brand"
        >
            <div
                className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-16"
                style={{ backgroundImage: "url('/jewell.png')" }}
            >
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">

                    {/* Left side - Brand Name */}
                    <div className="hidden md:flex flex-col items-start space-y-4 max-w-md">
                        {/* Text color uses the main 'text-brand' class */}
                        <h1 className="text-7xl font-serif font-bold text-brand drop-shadow-lg">
                            DIVA
                        </h1>
                        {/* Muted text color for secondary description */}
                        <p className="text-2xl italic text-brand-muted drop-shadow-md">
                            Elegant Jewellery, Timeless Beauty
                        </p>
                    </div>

                    {/* Right side - Login card */}
                    <div
                        // Login card background uses a dark/primary color with transparency
                        // Border uses a primary/muted border color
                        className="relative z-20 w-full max-w-md p-8 
            bg-brand-dark/60 backdrop-blur-xl 
            rounded-2xl shadow-2xl border border-brand-primary/50 
            transition-transform transform hover:scale-105 hover:shadow-brand-primary/40"
                    >
                        <div className="text-center mb-6">
                            {/* Title text uses secondary/highlight color */}
                            <h1 className="text-4xl font-serif font-bold text-brand-secondary drop-shadow">
                                SIGN IN
                            </h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    // Label text color is muted
                                    className="block mb-2 text-sm font-semibold text-brand-muted"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border border-brand-muted/60 
                    rounded-lg shadow-sm focus:outline-none 
                    // Input focus ring uses the primary brand color
                    focus:ring-2 focus:ring-brand-primary
                    bg-brand-light/70 backdrop-blur-md
                    // Placeholder text uses the main text color
                    placeholder-text-brand" 
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-semibold text-brand-muted"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-brand-muted/60 
                    rounded-lg shadow-sm focus:outline-none 
                    focus:ring-2 focus:ring-brand-primary
                    bg-brand-light/70 backdrop-blur-md
                    placeholder-text-brand"
                                    required
                                />
                            </div>

                            {/* Remember me + Forgot password */}
                            {/* Changed text-brand- to text-brand-highlight to be visible against the card background */}
                            <div className="flex items-center justify-between text-sm text-brand-highlight">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        // Checkbox is colored using text-brand-primary
                                        className="w-4 h-4 text-brand-primary border-brand-muted rounded"
                                    />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="text-brand-highlight hover:underline font-medium">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                // Replaced hardcoded yellow gradient with a primary color class for simplicity
                                // You might need to define a 'bg-gradient-brand-primary' in your CSS if you want the gradient
                                className="w-full py-3 text-lg font-semibold text-brand-highlight 
                    bg-brand-primary 
                    hover:bg-brand
                    rounded-lg shadow-lg 
                    transition transform hover:scale-[1.05]"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center my-6">
                            {/* 'or' text uses brand highlight color */}
                            <span className="absolute px-2 bg-brand-dark/40 text-brand-highlight text-sm">or</span>
                            {/* Divider line uses a muted border color */}
                            <div className="w-full border-t border-brand-muted/40"></div>
                        </div>

                        {/* Social Login */}
                        <button
                            className="w-full py-3 flex items-center justify-center space-x-2 
            border border-brand-muted/50 rounded-lg shadow-sm 
            hover:bg-brand-light/20 bg-brand-light/10 backdrop-blur-md text-brand"
                        >
                            <img
                                src="https://www.svgrepo.com/show/303552/google-g-2015-logo.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            {/* Text for social login uses the main text color */}
                            <span className="text-sm font-medium text-brand">Continue with Google</span>
                        </button>

                        {/* Signup */}
                        <p className="mt-4 text-center text-sm text-brand-muted">
                            New here?{" "}
                            <Link
                                to="/signup"
                                className="text-brand-secondary font-semibold hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}