import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaMapMarkedAlt, FaShoppingCart } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';

function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCartContext();
    const navigate = useNavigate();

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

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty! Cannot place an order.");
            navigate('/products');
            return;
        }

        if (Object.values(shippingDetails).some(v => v === '') || Object.values(paymentDetails).some(v => v === '')) {
            alert("Please fill out all required shipping and payment fields.");
            return;
        }

        console.log("Processing Order:", shippingDetails, paymentDetails);
        clearCart();
        navigate('/order-success');
    };

    if (cartItems.length === 0 && cartTotal > 0) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-3xl font-bold">Redirecting to shopping...</h2>
            </div>
        );
    }

    const subtotal = cartTotal;
    const shippingFee = 0.00;
    const estimatedTax = subtotal * 0.05;
    const finalTotal = subtotal + shippingFee + estimatedTax;

    return (
        <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-5xl font-serif font-extrabold bg-brand-warning mb-10 text-center">
                    Secure Checkout 🔒
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl font-semibold text-brand-info mb-6">
                            Your order has been placed! Redirecting...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handlePlaceOrder} className="lg:grid lg:grid-cols-5 lg:gap-12">
                        {/* Left Column */}
                        <div className="lg:col-span-3 space-y-10">
                            {/* Shipping Address */}
                            <div className="bg-brand p-8 rounded-xl shadow-lg border border-brand-muted">
                                <h2 className="text-3xl font-semibold text-brand mb-6 flex items-center gap-3">
                                    <FaMapMarkedAlt className="text-brand-primary" /> 1. Shipping Address
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        required type="text" placeholder="Full Name"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                                    />
                                    <input
                                        required type="email" placeholder="Email Address"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                                    />
                                    <input
                                        required type="text" placeholder="Street Address"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight md:col-span-2"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                                    />
                                    <input
                                        required type="text" placeholder="City"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                                    />
                                    <input
                                        required type="text" placeholder="Postal Code"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, zip: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="bg-brand p-8 rounded-xl shadow-lg border border-brand-muted">
                                <h2 className="text-3xl font-semibold text-brand mb-6 flex items-center gap-3">
                                    <FaCreditCard className="text-brand-primary" /> 2. Payment Method
                                </h2>
                                <p className="text-sm text-brand-muted mb-4 flex items-center gap-2">
                                    <FaLock /> All transactions are secure and encrypted.
                                </p>
                                <div className="space-y-4">
                                    <input
                                        required type="text" placeholder="Name on Card"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight w-full"
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                                    />
                                    <input
                                        required type="text" placeholder="Card Number" maxLength="16"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight w-full"
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            required type="text" placeholder="MM/YY" maxLength="5"
                                            className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight"
                                            onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                                        />
                                        <input
                                            required type="text" placeholder="CVC" maxLength="4"
                                            className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand-highlight"
                                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 mt-8 lg:mt-0">
                            <div className="bg-brand p-8 rounded-xl shadow-2xl h-fit sticky lg:top-28 border border-brand-muted">
                                <h2 className="text-3xl font-semibold text-brand border-b pb-4 mb-6 flex items-center gap-2">
                                    <FaShoppingCart className="text-brand-primary" /> Order Summary
                                </h2>

                                <div className="space-y-3 text-brand-muted">
                                    <div className="flex justify-between text-lg">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg">
                                        <span>Shipping</span>
                                        <span className="text-brand-success">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-lg">
                                        <span>Estimated Tax (5%)</span>
                                        <span>${estimatedTax.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-2xl font-bold pt-4 border-t border-brand-muted">
                                        <span>Total Due</span>
                                        <span className="text-brand-primary">${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-8 w-full text-center px-6 py-4 bg-brand-primary text-brand-highlight text-xl font-bold rounded-full shadow-xl hover:bg-brand transition transform hover:scale-[1.02] flex items-center justify-center gap-3"
                                >
                                    <FaLock />
                                    Place Order Securely
                                </button>

                                <p className="mt-4 text-center text-sm text-brand-muted">
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
