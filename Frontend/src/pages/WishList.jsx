import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTimesCircle } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext'; // Need cart context to move items
import { useWishlistContext } from '../context/WishListContext';

function WishList() {
    const { wishlistItems, removeItemFromWishlist } = useWishlistContext();
    const { addItemToCart } = useCartContext(); // Get cart function

    const handleMoveToCart = (item) => {
        const cartItem = {
            ...item,
            quantity: 1,
            selectedSize: item.selectedSize || 'Default',
        };

        addItemToCart(cartItem);
        removeItemFromWishlist(item.id);
    };

    return (
        <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <h1 className="text-5xl font-serif font-extrabold text-brand mb-10 text-center flex items-center justify-center gap-3">
                    <FaHeart className="text-brand-danger" /> My Wishlist
                </h1>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20 bg-brand rounded-xl shadow-lg">
                        <FaHeart className="w-16 h-16 text-brand-muted mx-auto mb-4" />
                        <p className="text-2xl font-semibold text-brand mb-6">
                            Your Wishlist is feeling lonely.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-medium rounded-full shadow-lg hover:bg-brand-highlight transition gap-2"
                        >
                            Start Saving Items
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-brand rounded-xl shadow-md border-l-4 border-brand-primary"
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
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="text-xl font-semibold text-brand hover:text-brand-primary transition"
                                        >
                                            {item.name}
                                        </Link>
                                        <p className="text-brand-danger text-lg font-bold mt-1">
                                            ${(item.price || 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-4 mt-4 sm:mt-0">
                                    <button
                                        onClick={() => handleMoveToCart(item)}
                                        className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-full hover:bg-brand-highlight transition flex items-center gap-2 text-sm"
                                    >
                                        <FaShoppingCart /> Move to Cart
                                    </button>
                                    <button
                                        onClick={() => removeItemFromWishlist(item.id)}
                                        className="px-4 py-2 border border-brand-danger text-brand-danger font-semibold rounded-full hover:bg-brand-light transition flex items-center gap-2 text-sm"
                                    >
                                        <FaTimesCircle /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WishList;
