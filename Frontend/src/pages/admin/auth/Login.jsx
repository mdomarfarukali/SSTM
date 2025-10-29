import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext.jsx"; // 🌙 Theme Context
import lightLogo from "/DIVA_LightCut-removebg-preview.png";
import darkLogo from "/DIVA_Cut-removebg-preview.png";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { theme } = useTheme(); // 👈 Access current theme (dark/light)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    // Example: Login.jsx or inside handleLogin()
    // const handleLogin = async () => {
    //     console.log("Logging in with", email, password);
    //     try {
    //         const res = await fetch("/API/auth/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email, password }), // Specify role here
    //             credentials: "include", // if you're using cookies
    //         });

    //         console.log("Response status:", res.status); // Debugging line
    //         const data = await res.json();

    //         if (data.success) {
    //             // Store role in localStorage
    //             localStorage.setItem("role", data.user.role);
    //             // e.g. "admin", "user", etc.

    //             // Optionally store token or other info
    //             localStorage.setItem("token", data.token);

    //             // Redirect based on role
    //             if (data.user.role === "admin") {
    //                 console.log("Admin logged in");
    //                 window.location.href = "/admin";
    //             } else {
    //                 window.location.href = "/";
    //             }
    //         } else {
    //             alert(data.message || "Login failed");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleSubmit = (e) => {
    //     // e.preventDefault();
    //     // console.log("Email:", email, "Password:", password);
    //     // alert("Login submitted!");
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // console.log("Submitting login for", email);
            const response = await axios.post('/API/auth/login', { email, password });
            // console.log('Response:', response); // Debugging line
            // localStorage.setItem('userToken', response.data.token);
            // localStorage.setItem('user', JSON.stringify(response.data.data.user));
            // navigate('/'); // Replace with actual dashboard route when available

            console.log("Response status:", response.status); // Debugging line
            const data = response.data;

            if (data.success) {
                localStorage.setItem("email", data.user.email);
                // Store role in localStorage
                localStorage.setItem("role", data.user.role);
                // e.g. "admin", "user", etc.

                // Optionally store token or other info
                localStorage.setItem("token", data.token);

                // Redirect based on role
                if (data.user.role === "admin") {
                    // console.log("Admin logged in");
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/";
                }
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log in. Please check your credentials.');
            console.error('Login failed:', err.response); // Log the full response for debugging

            // IMPROVED: Display the actual error message from the backend
            const errorMessage = err.response?.data?.message || 'Failed to log in. Please try again.';

            if (errorMessage.includes('duplicate key error')) {
                setError('This email or phone number is already registered.');
            } else {
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-brand-light">
            {/* <motion.div
                className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
            > */}
            <div className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-16">
                {/* <motion.div
                    className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                > */}
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">

                    {/* Left side - Brand Name with Dynamic Logo 🌙 */}
                    {/* <motion.div
                        className="hidden md:flex flex-col items-start space-y-4 max-w-md"
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.1 }}
                    > */}
                    <div className="hidden md:flex flex-col items-start space-y-4 max-w-md">
                        <div className="flex items-center space-x-3">
                            <img
                                src={theme === "dark" ? darkLogo : lightLogo}
                                alt="DIVA Logo"
                                className="w-14 h-14 drop-shadow-lg"
                            />
                            <h1 className="text-7xl font-serif font-bold text-brand drop-shadow-lg">
                                DIVA ADMINS
                            </h1>
                        </div>
                        <p className="text-2xl italic text-brand-muted drop-shadow-md">
                            Elegant Jewellery, Timeless Beauty
                        </p>
                        {/* </motion.div> */}
                    </div>

                    {/* Right side - Login card */}
                    {/* <motion.div
                        className="relative z-20 w-full max-w-md p-8 
                        bg-white/60 backdrop-blur-xl 
                        rounded-2xl shadow-2xl border border-brand-primary/50 
                        transition-transform transform hover:scale-105 hover:shadow-brand-primary/40"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{ scale: 1.03 }}
                    > */}
                    <div
                        className="relative z-20 w-full max-w-md p-8 
                        bg-white/60 backdrop-blur-xl 
                        rounded-2xl shadow-2xl border border-brand-primary/50 
                        transition-transform transform 
                        hover:scale-105 
                        hover:shadow-brand-primary/40"
                    >
                        <div className="text-center mb-6">
                            <motion.h1
                                className="text-4xl font-serif font-bold text-brand-secondary drop-shadow"
                            // initial={{ y: -10, opacity: 0 }}
                            // animate={{ y: 0, opacity: 1 }}
                            // transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                SIGN IN
                            </motion.h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-semibold text-brand-muted"
                                >
                                    Email Address
                                </label>
                                <motion.input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border border-brand-muted/60 
                                    rounded-lg shadow-sm focus:outline-none 
                                    focus:ring-2 focus:ring-brand-primary
                                    bg-brand-light/70 backdrop-blur-md
                                    placeholder-text-brand"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-semibold text-brand-muted"
                                >
                                    Password
                                </label>
                                <motion.input
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
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm text-brand">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-brand-primary border-brand-muted rounded"
                                    />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="text-brand-highlight hover:underline font-medium">
                                    Forgot password?
                                </a>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full py-3 text-lg font-semibold text-brand-highlight 
                                bg-brand-primary hover:bg-brand rounded-lg shadow-lg 
                                transition transform hover:scale-[1.05]"
                            // whileTap={{ scale: 0.95 }}
                            >
                                Sign In
                            </motion.button>
                        </form>

                        <div className="relative flex items-center justify-center my-6">
                            <span className="absolute px-2 bg-brand-dark/40 text-brand-highlight text-sm">or</span>
                            <div className="w-full border-t border-brand-muted/40"></div>
                        </div>

                        <motion.button
                            className="w-full py-3 flex items-center justify-center space-x-2 
                            border border-brand-muted/50 rounded-lg shadow-sm 
                            hover:bg-brand-light/20 bg-brand-light/10 backdrop-blur-md text-brand"
                        // whileHover={{ scale: 1.05 }}
                        // whileTap={{ scale: 0.95 }}
                        >
                            <img
                                src="https://www.svgrepo.com/show/303552/google-g-2015-logo.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span className="text-sm font-medium text-brand">Continue with Google</span>
                        </motion.button>

                        <p className="mt-4 text-center text-sm text-brand-muted">
                            New here?{" "}
                            <Link
                                to="/signup"
                                className="text-brand-secondary font-semibold hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                        {/* </motion.div> */}
                    </div>
                    {/* </motion.div> */}
                </div>
                {/* </motion.div> */}
            </div>
        </div>
    );
}
