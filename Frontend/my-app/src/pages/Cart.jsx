import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext'; 
// Assuming the CartContext hook is correctly exported from your context folder

// Helper component for displaying a single item in the cart
const CartItem = ({ item }) => {
    const { updateItemQuantity, removeItemFromCart } = useCartContext();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            updateItemQuantity(item.uniqueId, newQuantity);
        }
    };

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
            {/* Item Details (Image, Name, Size) */}
            <div className="flex items-center space-x-4 w-1/2">
                <Link to={`/product/${item.id}`}>
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-lg shadow-md hover:opacity-80 transition"
                    />
                </Link>
                <div>
                    <Link to={`/product/${item.id}`} className="text-lg font-semibold text-gray-800 dark:text-white hover:text-pink-600 transition">
                        {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Size: {item.selectedSize}
                    </p>
                </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-3">
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            {/* Price and Remove Button */}
            <div className="text-right w-1/4">
                <p className="text-lg font-bold text-pink-600">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                    onClick={() => removeItemFromCart(item.uniqueId)}
                    className="mt-1 text-red-500 hover:text-red-700 transition flex items-center gap-1 ml-auto"
                >
                    <FaTrash className="w-4 h-4" />
                    <span className="text-sm">Remove</span>
                </button>
            </div>
        </div>
    );
};

// Main Cart Component
function Cart() {
    // ⭐️ Get data and functions from context ⭐️
    const { cartItems, totalItems, cartTotal } = useCartContext(); 

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 pt-20">
            {/* Assuming Navbar is included in a layout or imported */}
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-5xl font-serif font-extrabold text-gray-900 dark:text-white mb-10 text-center flex items-center justify-center gap-3">
                    <FaShoppingCart className="text-pink-600" /> Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    // Empty Cart State
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                            Your cart is empty. Time to find some sparkle! ✨
                        </p>
                        <Link to="/products" className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-medium rounded-full shadow-lg hover:bg-pink-700 transition gap-2">
                            <FaArrowLeft /> Start Shopping
                        </Link>
                    </div>
                ) : (
                    // Cart with Items
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10">
                        
                        {/* 1. Cart Items List */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                            <div className="flex justify-between font-bold border-b-2 border-pink-600 pb-3 mb-4 text-gray-700 dark:text-gray-300">
                                <span className="w-1/2">Product</span>
                                <span className="text-center">Quantity</span>
                                <span className="text-right w-1/4">Subtotal</span>
                            </div>
                            {cartItems.map((item) => (
                                <CartItem key={item.uniqueId} item={item} />
                            ))}
                        </div>

                        {/* 2. Order Summary */}
                        <div className="lg:col-span-1 mt-8 lg:mt-0 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg h-fit sticky top-28">
                            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white border-b pb-4 mb-6">Order Summary</h2>
                            
                            <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                <div className="flex justify-between text-lg">
                                    <span>Items ({totalItems})</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg">
                                    <span>Shipping Estimate</span>
                                    <span>FREE</span>
                                </div>
                                {/* Optional: Add Tax/Discount Logic Here */}
                                <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span>Order Total</span>
                                    <span className="text-pink-600">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Link to="/checkout" className="mt-8 w-full block text-center px-6 py-4 bg-pink-600 text-white text-xl font-bold rounded-full shadow-xl hover:bg-pink-700 transition transform hover:scale-[1.02]">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Assuming Footer is included in a layout or imported */}
        </div>
    );
}

export default Cart;
