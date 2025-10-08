import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaMapMarkedAlt, FaShoppingCart } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext'; 
// Assuming your context is in src/context/CartContext.jsx

function Checkout() {
    // Hooks
    const { cartItems, cartTotal, clearCart } = useCartContext();
    const navigate = useNavigate();

    // State to manage form data (simplified for this example)
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: 'India',
    });

    const [paymentDetails, setPaymentDetails] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    });

    // Handle form submission (Simulating placing an order)
    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty! Cannot place an order.");
            navigate('/products');
            return;
        }

        // 1. Validate Forms (In a real app, this would be comprehensive)
        if (Object.values(shippingDetails).some(v => v === '') || Object.values(paymentDetails).some(v => v === '')) {
             alert("Please fill out all required shipping and payment fields.");
             return;
        }

        // 2. Mock API Call to process payment and order fulfillment...
        console.log("Processing Order:", shippingDetails, paymentDetails);

        // 3. Clear the cart after successful order placement
        clearCart();

        // 4. Redirect to a thank you page
        navigate('/order-success'); 
    };

    // If the cart is empty, redirect the user back to the cart page
    if (cartItems.length === 0 && cartTotal > 0) {
        // This handles a refresh on an empty cart after a prior purchase.
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-3xl font-bold">Redirecting to shopping...</h2>
            </div>
        );
    }
    
    // Define dummy totals for this mock
    const subtotal = cartTotal;
    const shippingFee = 0.00; // Free shipping!
    const estimatedTax = subtotal * 0.05; // 5% mock tax
    const finalTotal = subtotal + shippingFee + estimatedTax;


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-5xl font-serif font-extrabold text-gray-900 dark:text-white mb-10 text-center">
                    Secure Checkout 🔒
                </h1>

                {cartItems.length === 0 ? (
                    // Empty Cart State after a refresh/purchase
                    <div className="text-center py-20">
                        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                            Your order has been placed! Redirecting...
                        </p>
                    </div>
                ) : (
                    // Main Two-Column Checkout Layout
                    <form onSubmit={handlePlaceOrder} className="lg:grid lg:grid-cols-5 lg:gap-12">
                        
                        {/* ========== 1. Shipping & Payment Forms (Left Column: 3/5 width) ========== */}
                        <div className="lg:col-span-3 space-y-10">
                            
                            {/* --- Shipping Address --- */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-100 dark:border-gray-700">
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                    <FaMapMarkedAlt className="text-pink-600"/> 1. Shipping Address
                                </h2>
                                {/* Use simple form fields, connect to state */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Full Name" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white" onChange={(e) => setShippingDetails({...shippingDetails, name: e.target.value})} />
                                    <input required type="email" placeholder="Email Address" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white" onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})} />
                                    <input required type="text" placeholder="Street Address" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white md:col-span-2" onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})} />
                                    <input required type="text" placeholder="City" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white" onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})} />
                                    <input required type="text" placeholder="Postal Code" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white" onChange={(e) => setShippingDetails({...shippingDetails, zip: e.target.value})} />
                                </div>
                            </div>
                            
                            {/* --- Payment Details --- */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-100 dark:border-gray-700">
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                    <FaCreditCard className="text-pink-600"/> 2. Payment Method
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                                    <FaLock/> All transactions are secure and encrypted.
                                </p>
                                {/* Credit Card Form Mock */}
                                <div className="space-y-4">
                                    <input required type="text" placeholder="Name on Card" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white w-full" onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})} />
                                    <input required type="text" placeholder="Card Number" maxLength="16" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white w-full" onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input required type="text" placeholder="MM/YY" maxLength="5" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white" onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})} />
                                        <input required type="text" placeholder="CVC" maxLength="4" className="p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white" onChange={(e) => setPaymentDetails({...paymentDetails, cvc: e.target.value})} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ========== 2. Order Summary (Right Column: 2/5 width) ========== */}
                        <div className="lg:col-span-2 mt-8 lg:mt-0">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl h-fit sticky lg:top-28 border border-pink-100 dark:border-gray-700">
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white border-b pb-4 mb-6 flex items-center gap-2">
                                    <FaShoppingCart className="text-pink-600"/> Order Summary
                                </h2>

                                {/* Totals Breakdown */}
                                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                    <div className="flex justify-between text-lg">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg">
                                        <span>Shipping</span>
                                        <span className="text-green-500">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-lg">
                                        <span>Estimated Tax (5%)</span>
                                        <span>${estimatedTax.toFixed(2)}</span>
                                    </div>
                                    
                                    {/* Final Total */}
                                    <div className="flex justify-between text-2xl font-bold pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <span>Total Due</span>
                                        <span className="text-pink-600">${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    type="submit"
                                    className="mt-8 w-full text-center px-6 py-4 bg-pink-600 text-white text-xl font-bold rounded-full shadow-xl hover:bg-pink-700 transition transform hover:scale-[1.02] flex items-center justify-center gap-3"
                                >
                                    <FaLock />
                                    Place Order Securely
                                </button>

                                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                    By placing an order, you agree to our Terms and Conditions.
                                </p>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Checkout;