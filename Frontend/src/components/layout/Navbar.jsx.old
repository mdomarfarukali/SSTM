import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LogIn,
    Home as HomeIcon,
    Layers,
    Info,
    Phone,
    ShoppingCart,
    // Sun,
    // Moon,
    Menu,
    X,
    User,
    Search,
    Heart
} from "lucide-react";
import { FaHeart, FaUser } from "react-icons/fa";

// import { Search, X, Heart, ShoppingCart, Menu } from 'lucide-react'; // Assuming Lucide or similar

import ThemeToggle from "../common/ThemeToggle";
import { useTheme } from "../../context/ThemeContext.jsx";
import lightLogo from "/DIVA_LightCut-removebg-preview.png";
import darkLogo from "/DIVA_Cut-removebg-preview.png";
import { useCartContext } from "../../context/CartContext.jsx";

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [dark, setDark] = useState(false);
    const { totalItems } = useCartContext();
    const [mobileOpen, setMobileOpen] = useState(false);

    const { theme } = useTheme();

    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const searchRef = useRef(null);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowMobileSearch(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={dark ? "dark" : ""}>
            <div className="fixed top-0 inset-x-0 bg-brand-dark shadow-md z-50">
                <div className="mx-auto px-4 py-3 md:px-6 md:py-4">

                    {/* 1st Row */}
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="text-3xl font-serif font-bold text-brand-primary flex items-center">
                            <img
                                src={theme === "dark" ? darkLogo : lightLogo}
                                alt="DIVA Logo"
                                className="w-10 h-10 mr-2"
                            />
                            DIVA
                        </Link>

                        {/* Desktop Search (inline) */}
                        <div className="hidden md:flex flex-1 mx-6">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-full border border-brand-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-primary dark:text-brand-highlight"
                            />
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-3">
                            {/* Mobile Search Toggle - NEW */}
                            <button
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                                className="md:hidden text-brand-primary hover:text-brand-secondary p-1"
                            >
                                <Search size={22} />
                            </button>

                            <Link to="/wishlist" className="md:hidden text-brand-primary hover:text-brand-secondary">
                                <Heart size={22} />
                            </Link>

                            <Link to="/cart" className="relative md:hidden text-brand-primary hover:text-brand-secondary">
                                <ShoppingCart size={22} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-brand-primary text-brand-highlight text-[10px] px-1.5 py-0.5 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            <button
                                className="md:hidden p-2 text-brand-primary"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>

                            {/* Desktop Menu */}
                            <ul className="hidden md:flex gap-6 font-medium items-center">
                                <li>
                                    <Link to="/" className="text-brand-primary hover:text-brand-secondary transition">
                                        <HomeIcon size={20} />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products" className="text-brand-primary hover:text-brand-secondary transition">
                                        <Layers size={20} />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/wishlist" className="text-brand-primary hover:text-brand-secondary transition">
                                        <FaHeart size={20} />
                                    </Link>
                                    {/* <Link to="/about" className="text-brand-primary hover:text-brand-secondary transition">
                                        <Info size={20} />
                                    </Link>*/}
                                </li>
                                <li>
                                    <Link to="/contact" className="text-brand-primary hover:text-brand-secondary transition">
                                        <Phone size={20} />
                                    </Link>
                                </li>

                                {/* Sign In */}
                                <li>
                                    <Link
                                        to="/account"
                                        className="flex items-center justify-center border-2 border-brand-primary text-brand-primary p-2 rounded-full hover:bg-brand-secondary transition"
                                    >
                                        <User size={18} />
                                    </Link>
                                </li>

                                {/* Cart */}
                                <li className="relative">
                                    <Link
                                        to="/cart"
                                        className="flex items-center justify-center bg-brand-light text-white p-2 rounded-full hover:bg-brand transition"
                                    >
                                        <ShoppingCart size={22} className="cursor-pointer text-brand border-brand" />
                                        {totalItems > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-brand-primary text-brand-highlight text-xs px-1.5 py-0.5 rounded-full">
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                {/* <ThemeToggle /> */}
                            </ul>
                        </div>
                    </div>

                    {/* Animated Mobile Search Bar */}
                    <AnimatePresence>
                        {showMobileSearch && (
                            <motion.div
                                ref={searchRef}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden md:hidden"
                            >
                                <div className="py-3">
                                    <div className="relative flex items-center">
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="What are you looking for?"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-brand-muted text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary bg-brand-light/50 dark:bg-brand-dark text-brand-primary dark:text-brand-highlight"
                                        />
                                        <Search className="absolute right-3 text-brand-muted" size={18} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Menu Content */}
                <AnimatePresence>
                    {mobileOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                key="overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileOpen(false)}
                                className="fixed inset-0 bg-black z-40"
                            ></motion.div>

                            {/* Sliding Menu - COLORS MODIFIED FOR BRAND CONSISTENCY */}
                            <motion.ul
                                key="mobileMenu"
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="md:hidden fixed top-0 right-0 h-full w-2/3 bg-brand-light dark:bg-brand-dark flex flex-col gap-6 px-6 py-12 text-brand dark:text-brand-highlight font-medium shadow-lg z-50"
                            >
                                <li>
                                    <Link
                                        to="/"
                                        onClick={() => setMobileOpen(false)}
                                        className="hover:text-brand-secondary transition flex items-center gap-2 text-lg"
                                    >
                                        <HomeIcon size={20} /> Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/products"
                                        onClick={() => setMobileOpen(false)}
                                        className="hover:text-brand-secondary transition flex items-center gap-2 text-lg"
                                    >
                                        <Layers size={20} /> Products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about"
                                        onClick={() => setMobileOpen(false)}
                                        className="hover:text-brand-secondary transition flex items-center gap-2 text-lg"
                                    >
                                        <Info size={20} /> About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        onClick={() => setMobileOpen(false)}
                                        className="hover:text-brand-secondary transition flex items-center gap-2 text-lg"
                                    >
                                        <Phone size={20} /> Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2 justify-center bg-brand-primary text-brand-highlight py-2 rounded-full hover:bg-brand-secondary transition text-lg"
                                    >
                                        <LogIn size={18} /> Sign In
                                    </Link>
                                </li>
                            </motion.ul>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}