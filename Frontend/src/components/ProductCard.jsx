// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product, index }) => {
    // Destructure with fallback
    const {
        _id,
        slug,
        name,
        description,
        images = [],
        finalPrice,
        price,
        discount,
        category,
    } = product;

    // Use first image or fallback
    const imageUrl = images[0]?.url
        ? `${images[0].url}`
        : "/placeholder.png"; // fallback image

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 group overflow-hidden"
        >
            {/* Discount Badge */}
            {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    -{discount}% OFF
                </span>
            )}

            {/* Wishlist Icon */}
            <button
                className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 transition"
                title="Add to Wishlist"
            >
                <FaHeart className="w-5 h-5" />
            </button>

            {/* Product Image */}
            <Link to={`/product/${_id}`}>
                <div className="overflow-hidden rounded-t-2xl">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-5">
                <Link to={`/product/${_id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition">
                        {name}
                    </h3>
                </Link>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {description}
                </p>

                {/* Category */}
                {category && (
                    <p className="text-sm text-gray-400 mt-2 italic">{category}</p>
                )}

                {/* Price Section */}
                <div className="mt-3 flex items-center gap-2">
                    <p className="text-xl font-bold text-pink-600">
                        ₹{finalPrice?.toLocaleString()}
                    </p>
                    {discount > 0 && (
                        <p className="text-gray-400 text-sm line-through">
                            ₹{price?.toLocaleString()}
                        </p>
                    )}
                </div>

                {/* View Details Button */}
                <Link
                    to={`/product/${_id}`}
                    className="block text-center mt-5 bg-pink-600 text-white font-semibold py-2 rounded-full hover:bg-pink-700 transition shadow-md"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default ProductCard;
