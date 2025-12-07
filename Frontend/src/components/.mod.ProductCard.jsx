import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

// ProductCard Component
const ProductCard = ({ product, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 group overflow-hidden"
        >
            {/* Badge */}
            {/* {product.badge && (
        <span className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {product.badge}
        </span>
      )} */}

            {/* Wishlist (static icon placeholder) */}
            <button
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary transition"
                title="Add to Wishlist"
            >
                <FaHeart className="w-5 h-5" />
            </button>

            {/* Product Image */}
            <Link to={`/product/${product._id}`}>
                <div className="overflow-hidden rounded-t-2xl">
                    <img
                        src={product.image[0].url}
                        alt={product.name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-5">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-brand group-hover:text-brand-primary transition">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-brand-muted text-sm mt-1 line-clamp-2">
                    {product.description}
                </p>

                {/* Price */}
                <p className="text-xl font-bold text-brand-primary mt-3">{product.price}</p>

                {/* View Details Button */}
                <Link
                    to={`/product/${product._id}`}
                    className="block text-center mt-5 bg-brand-primary text-white font-semibold py-2 rounded-full hover:bg-brand-highlight transition shadow-md"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default ProductCard;
