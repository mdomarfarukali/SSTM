import React from "react";
// import { FaSun, FaMoon } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition bg-brand-light hover:scale-110"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                // <FaSun className="text-yellow-400 w-6 h-6" />
                <Sun className="text-yellow-400 w-6 h-6" />
            ) : (
                // <FaMoon className="text-gray-800 w-6 h-6" />
                <Moon className="text-gray-800 w-6 h-6" />
            )}
        </button>
    );
}
