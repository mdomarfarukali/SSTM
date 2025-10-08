import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaPrint, FaEnvelope } from 'react-icons/fa';

function OrderSuccess() {
    // ⭐️ State for dynamic order ID and cleanup ⭐️
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // Generate a random-looking Order ID for display purposes
        const newOrderId = 'DIVA-' + Math.floor(100000 + Math.random() * 900000);
        setOrderId(newOrderId);
        
        // IMPORTANT: In a real application, you would fetch and display the 
        // actual order confirmation details passed from the server or local state 
        // immediately after the successful payment API call.
        
        // Optional: Scroll to the top on page load
        window.scrollTo(0, 0); 
    }, []);

    // NOTE: Replace "john.doe@example.com" with the user's actual email if stored in context
    const customerEmail = "your.customer@example.com"; 

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Main Confirmation Card */}
                <div className="bg-green-50 dark:bg-gray-800 p-10 rounded-xl shadow-2xl text-center border-t-8 border-green-500">
                    
                    <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    
                    <h1 className="text-5xl font-serif font-extrabold text-gray-900 dark:text-white mb-4">
                        Order Placed Successfully!
                    </h1>
                    
                    <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
                        Thank you for your purchase. We're getting your sparkle ready!
                    </p>
                    
                    {/* Order ID and Summary */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mx-auto max-w-sm">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase">
                            Your Order ID
                        </p>
                        <p className="text-3xl font-bold text-pink-600 mt-1">
                            {orderId}
                        </p>
                    </div>

                    {/* Next Steps */}
                    <div className="mt-10 space-y-4">
                        <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                            <FaEnvelope className="text-pink-600" />
                            A detailed confirmation has been sent to <strong className="text-gray-900 dark:text-white">{customerEmail}</strong>.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            You can track your order status in your account dashboard.
                        </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to="/account/orders" 
                            className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-lg hover:bg-pink-700 transition flex items-center justify-center gap-2"
                        >
                            View Order Status
                        </Link>
                        <Link 
                            to="/products" 
                            className="px-6 py-3 border border-pink-600 text-pink-600 font-semibold rounded-full hover:bg-pink-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-700 font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
                        >
                            <FaPrint /> Print Receipt
                        </button>
                    </div>

                </div>
                
            </div>
            {/* NOTE: Include your <Footer /> component here */}
        </div>
    );
}

export default OrderSuccess;