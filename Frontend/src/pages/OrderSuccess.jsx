import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaPrint, FaEnvelope } from 'react-icons/fa';

function OrderSuccess() {
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        const newOrderId = 'DIVA-' + Math.floor(100000 + Math.random() * 900000);
        setOrderId(newOrderId);
        window.scrollTo(0, 0);
    }, []);

    const customerEmail = "your.customer@example.com";

    return (
        <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Main Confirmation Card */}
                <div className="bg-brand p-10 rounded-xl shadow-2xl text-center border-t-8 border-brand-success">
                    
                    <FaCheckCircle className="w-20 h-20 text-brand-success mx-auto mb-6" />
                    
                    <h1 className="text-5xl font-serif font-extrabold text-brand mb-4">
                        Order Placed Successfully!
                    </h1>
                    
                    <p className="text-2xl text-brand-muted mb-8">
                        Thank you for your purchase. We're getting your sparkle ready!
                    </p>
                    
                    {/* Order ID and Summary */}
                    <div className="bg-brand-light p-6 rounded-lg border border-brand-muted mx-auto max-w-sm">
                        <p className="text-sm text-brand-muted font-medium uppercase">
                            Your Order ID
                        </p>
                        <p className="text-3xl font-bold text-brand-primary mt-1">
                            {orderId}
                        </p>
                    </div>

                    {/* Next Steps */}
                    <div className="mt-10 space-y-4">
                        <p className="text-brand-muted flex items-center justify-center gap-2">
                            <FaEnvelope className="text-brand-primary" />
                            A detailed confirmation has been sent to <strong className="text-brand">{customerEmail}</strong>.
                        </p>
                        <p className="text-brand-muted">
                            You can track your order status in your account dashboard.
                        </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to="/account/orders" 
                            className="px-6 py-3 bg-brand-primary text-brand-highlight font-semibold rounded-full shadow-lg hover:bg-brand-dark transition flex items-center justify-center gap-2"
                        >
                            View Order Status
                        </Link>
                        <Link 
                            to="/products" 
                            className="px-6 py-3 border border-brand-primary text-brand-primary font-semibold rounded-full hover:bg-brand-light transition flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-3 border border-brand-muted text-brand-muted font-semibold rounded-full hover:bg-brand-light transition flex items-center justify-center gap-2"
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
