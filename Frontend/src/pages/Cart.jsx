import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';
import LoginPage from './auth/Login';

// Helper component for displaying a single item in the cart
const CartItem = ({ item }) => {
    const { updateItemQuantity, removeItemFromCart } = useCartContext();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            updateItemQuantity(item.id, newQuantity);
        }
    };

    return (
        // Border color uses brand muted
        <div className="flex items-center justify-between py-4 border-b border-border-brand-muted">
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
                    {/* Item name uses main text color and hovers to secondary/accent color */}
                    <Link to={`/product/${item.id}`} className="text-lg font-semibold text-brand dark:text-brand-highlight hover:text-brand-secondary transition">
                        {item.name}
                    </Link>
                    {/* Size text uses muted color */}
                    <p className="text-sm text-brand-muted">
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
                    // Input border uses border-brand and background uses brand-light
                    className="w-16 px-2 py-1 text-center border border-border-brand rounded-md bg-brand-light/70 text-brand"
                />
            </div>

            {/* Price and Remove Button */}
            <div className="text-right w-1/4">
                {/* Price uses the secondary/accent color */}
                <p className="text-lg font-bold text-brand-secondary">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                    onClick={() => removeItemFromCart(item.id, item.selectedSize)}
                    // Remove button uses the danger/red color
                    className="mt-1 text-brand-danger hover:text-red-700 transition flex items-center gap-1 ml-auto"
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
    const { cartItems, totalItems, cartTotal } = useCartContext();
    const Navigate = useNavigate();
    // console.log("Cart Items:", cartItems); // Debugging line

    // const handleCheckout = () => {
    //     const isUser = localStorage.getItem("role") === "user";
    //     // const email = localStorage.getItem("email") || "guest@example.com";
    //     // console.log("User Role:", isUser ? "user" : "not user")
    //     if (!isUser) {
    //         return <LoginPage path={"/checkout"} />;
    //     }
    //     Navigate('/checkout');
    // };
    const handleCheckout = () => {
        const role = localStorage.getItem("role");
        if (role !== "user") {
            Navigate("/login", { state: { from: "/checkout" } });
        } else {
            Navigate("/checkout");
        }
    };


    return (
        // Main page background uses the lightest brand color
        <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-5xl font-serif font-extrabold text-brand dark:text-brand-highlight mb-10 text-center flex items-center justify-center gap-3">
                    {/* Icon uses the secondary/accent color */}
                    <FaShoppingCart className="text-brand-secondary" /> Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    // Empty Cart State
                    // Card background uses bg-brand, main text uses text-brand
                    <div className="text-center py-20 bg-brand rounded-xl shadow-lg">
                        <p className="text-2xl font-semibold text-brand mb-6">
                            Your cart is empty. Time to find some sparkle! ✨
                        </p>
                        <Link
                            to="/products"
                            // Button uses bg-brand-secondary and text-brand-highlight
                            className="inline-flex items-center px-6 py-3 bg-brand-secondary text-brand-highlight font-medium rounded-full shadow-lg hover:bg-brand-dark transition gap-2"
                        >
                            <FaArrowLeft /> Start Shopping
                        </Link>
                    </div>
                ) : (
                    // Cart with Items
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                        {/* 1. Cart Items List */}
                        {/* List background uses bg-brand, border uses brand-secondary */}
                        <div className="lg:col-span-2 bg-brand p-8 rounded-xl shadow-lg">
                            <div className="flex justify-between font-bold border-b-2 border-brand-secondary pb-3 mb-4 text-brand">
                                <span className="w-1/2">Product</span>
                                <span className="text-center">Quantity</span>
                                <span className="text-right w-1/4">Subtotal</span>
                            </div>
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* 2. Order Summary */}
                        {/* Summary background uses bg-brand */}
                        <div className="lg:col-span-1 mt-8 lg:mt-0 bg-brand p-8 rounded-xl shadow-lg h-fit sticky top-28">
                            <h2 className="text-3xl font-semibold text-brand dark:text-brand-highlight border-b pb-4 mb-6">Order Summary</h2>

                            <div className="space-y-3 text-brand">
                                <div className="flex justify-between text-lg">
                                    <span>Items ({totalItems})</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg">
                                    <span>Shipping Estimate</span>
                                    <span>FREE</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-4 border-t border-border-brand-muted">
                                    <span>Order Total</span>
                                    {/* Final total uses the secondary/accent color */}
                                    <span className="text-brand-secondary">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <div
                                onClick={handleCheckout}
                                // Button uses bg-brand-primary and text-brand-highlight
                                className="mt-8 w-full block text-center px-6 py-4 bg-brand-primary text-brand-highlight text-xl font-bold rounded-full shadow-xl hover:bg-brand-dark transition transform hover:scale-[1.02]"
                            >
                                Proceed to Checkout
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;