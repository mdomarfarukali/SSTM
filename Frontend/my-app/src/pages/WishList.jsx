import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTimesCircle, FaArrowRight } from 'react-icons/fa';
import { useWishListContext } from '../context/WishListContext';
import { useCartContext } from '../context/CartContext'; // Need cart context to move items

function WishList() {
    const { wishlistItems, removeItemFromWishlist } = useWishlistContext();
    const { addItemToCart } = useCartContext(); // Get cart function

    const handleMoveToCart = (item) => {
        // Prepare item for cart (need quantity and size for proper cart integration)
        // Since the Wishlist doesn't track size, we'll assume default or require user to go to details
        const cartItem = {
            ...item,
            quantity: 1,
            selectedSize: item.selectedSize || 'Default', // Use default if size wasn't tracked
        };
        
        addItemToCart(cartItem);
        removeItemFromWishlist(item.id);
        // showToast(`${item.name} moved to cart!`, 'success'); // Assuming showToast utility
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 pt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <h1 className="text-5xl font-serif font-extrabold text-gray-900 dark:text-white mb-10 text-center flex items-center justify-center gap-3">
                    <FaHeart className="text-pink-600" /> My Wishlist
                </h1>

                {wishlistItems.length === 0 ? (
                    // Empty Wishlist State
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <FaHeart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                            Your Wishlist is feeling lonely.
                        </p>
                        <Link to="/products" className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-medium rounded-full shadow-lg hover:bg-pink-700 transition gap-2">
                            Start Saving Items
                        </Link>
                    </div>
                ) : (
                    // List of Wished Items
                    <div className="space-y-6">
                        {wishlistItems.map((item) => (
                            <div 
                                key={item.id} 
                                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border-l-4 border-pink-500"
                            >
                                {/* Item Details */}
                                <div className="flex items-center space-x-4 w-full sm:w-1/2">
                                    <Link to={`/product/${item.id}`}>
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                                        />
                                    </Link>
                                    <div>
                                        <Link to={`/product/${item.id}`} className="text-xl font-semibold text-gray-800 dark:text-white hover:text-pink-600 transition">
                                            {item.name}
                                        </Link>
                                        <p className="text-pink-600 text-lg font-bold mt-1">
                                            ${(item.price || 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex space-x-4 mt-4 sm:mt-0">
                                    <button
                                        onClick={() => handleMoveToCart(item)}
                                        className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition flex items-center gap-2 text-sm"
                                    >
                                        <FaShoppingCart /> Move to Cart
                                    </button>
                                    <button
                                        onClick={() => removeItemFromWishlist(item.id)}
                                        className="px-4 py-2 border border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-50 transition flex items-center gap-2 text-sm"
                                    >
                                        <FaTimesCircle /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* NOTE: Include your <Footer /> component here */}
        </div>
    );
}

export default WishList;

