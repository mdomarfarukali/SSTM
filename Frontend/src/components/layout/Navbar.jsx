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

                        {/* Desktop Search (unchanged) */}
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

                            {/* Desktop Menu (unchanged) */}
                            <ul className="hidden md:flex gap-6 font-medium items-center">
                                {/* ... your existing desktop links ... */}
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

                {/* Mobile Menu Content (unchanged) */}
                {/* ... */}
            </div>
        </nav>
    );
}