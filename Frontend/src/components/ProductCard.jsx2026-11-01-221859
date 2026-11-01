// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlistContext } from "../context/WishListContext.jsx";
import { useCartContext } from "../context/CartContext";
const ProductCard = ({ product, index }) => {
  // Destructure with fallback
  const {
    _id,
    id,
    slug,
    name,
    description,
    images = [],
    finalPrice,
    price,
    discount,
    category,
  } = product;

  const productId = _id || id;

  // Use first image or fallback
  const imageUrl = images[0]?.url
    ? `${images[0].url}`
    : "/placeholder.png"; // fallback image

  const { toggleWishlistItem, isItemWished } = useWishlistContext();

  const wished = isItemWished(_id);
  const { addItemToCart } = useCartContext();

  const handleAddToCart = async () => {
    const cartItem = {
      id: productId,
      name,
      price: finalPrice || price,
      image: imageUrl,
      quantity: 1,
      selectedSize: "R",
    };

    try {
      await addItemToCart(cartItem);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleWishlist = () => {
    toggleWishlistItem(_id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      //className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 group overflow-hidden"
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2 overflow-hidden"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        //<span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        <span className="absolute top-4 left-4 z-40 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
          -{discount}% OFF
        </span>
      )}

      {/* Wishlist Icon */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleWishlist();
        }}
        // className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 transition"
        className="absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md"
      >
        <FaHeart
          className={`w-5 h-5 ${wished ? "text-pink-600" : "text-gray-400"
            }`}
        />
      </button>

      {/* Product Image */}
      <div className="overflow-hidden rounded-t-2xl">
        <Link to={`/product/${productId}`} className="block">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <Link to={`/product/${productId}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-pink-600">
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
          <span className="text-xl font-bold text-pink-600">
            ₹{finalPrice?.toLocaleString()}
          </span>
          {discount > 0 && (
          <>
            <span className="text-gray-400 text-sm line-through">
              ₹{price?.toLocaleString()}
              </span>
                    <span className="text-xs text-green-600 font-semibold">
        {discount}% OFF
            </span>
            </>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="block w-full mt-5 bg-pink-600 text-white font-semibold py-2 rounded-full hover:bg-pink-700 transition shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
