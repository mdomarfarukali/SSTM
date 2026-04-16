import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaMapMarkedAlt, FaShoppingCart, FaWallet, FaUniversity, FaMobileAlt, FaMoneyBillWave } from 'react-icons/fa';
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

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentDetails, setPaymentDetails] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        upiId: '',
        bankName: '',
        accountNumber: '',
        walletProvider: '',
        voucherCode: '',
    });

    const generateOrderId = () => `DIVA-${Math.floor(100000 + Math.random() * 900000)}`;

    const saveOrderHistory = (order) => {
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        storedOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(storedOrders));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty! Cannot place an order.");
            navigate('/products');
            return;
        }

        if (Object.values(shippingDetails).some(v => v === '')) {
            alert("Please fill out all required shipping fields.");
            return;
        }

        const validatePayment = () => {
            if (paymentMethod === 'card') {
                return [paymentDetails.cardName, paymentDetails.cardNumber, paymentDetails.expiry, paymentDetails.cvc].every(v => v.trim() !== '');
            }
            if (paymentMethod === 'upi') {
                return paymentDetails.upiId.trim() !== '';
            }
            if (paymentMethod === 'netbanking') {
                return paymentDetails.bankName.trim() !== '' && paymentDetails.accountNumber.trim() !== '';
            }
            if (paymentMethod === 'wallet') {
                return paymentDetails.walletProvider.trim() !== '';
            }
            return true; // COD needs no extra fields
        };

        if (!validatePayment()) {
            alert("Please fill out all required payment information for the selected method.");
            return;
        }

        const orderId = generateOrderId();
        const orderTotal = Number(cartTotal + cartTotal * 0.05).toFixed(2);
        const order = {
            id: orderId,
            date: new Date().toLocaleString(),
            items: cartItems,
            shippingDetails,
            paymentMethod,
            paymentDetails: paymentMethod === 'card'
                ? {
                      cardName: paymentDetails.cardName,
                      last4: paymentDetails.cardNumber.slice(-4),
                      expiry: paymentDetails.expiry,
                  }
                : paymentMethod === 'upi'
                ? { upiId: paymentDetails.upiId }
                : paymentMethod === 'netbanking'
                ? { bankName: paymentDetails.bankName }
                : paymentMethod === 'wallet'
                ? { walletProvider: paymentDetails.walletProvider }
                : { paymentType: 'Cash on Delivery' },
            total: orderTotal,
            status: 'Processing',
        };

        saveOrderHistory(order);

        const orderPayload = {
            ...order,
            cartItems,
        };

        console.log("Processing Order:", orderPayload);
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
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand placeholder:text-brand-muted hover:placeholder:text-brand"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                                    />
                                    <input
                                        required type="email" placeholder="Email Address"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand placeholder:text-brand-muted hover:placeholder:text-brand"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                                    />
                                    <input
                                        required type="text" placeholder="Street Address"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand placeholder:text-brand-muted hover:placeholder:text-brand md:col-span-2"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                                    />
                                    <input
                                        required type="text" placeholder="City"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand placeholder:text-brand-muted hover:placeholder:text-brand"
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                                    />
                                    <input
                                        required type="text" placeholder="Postal Code"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand placeholder:text-brand-muted hover:placeholder:text-brand"
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

                                <div className="grid gap-3 mb-6">
                                    <label className={`cursor-pointer rounded-2xl border px-4 py-3 flex items-center gap-3 ${paymentMethod === 'card' ? 'border-brand-primary bg-brand-dark' : 'border-brand-muted bg-brand'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                            className="sr-only"
                                        />
                                        <FaCreditCard className="text-brand-primary w-5 h-5" />
                                        <div>
                                            <div className="font-semibold">Credit / Debit Card</div>
                                            <div className="text-sm text-brand-muted">Visa, MasterCard, Amex</div>
                                        </div>
                                    </label>

                                    <label className={`cursor-pointer rounded-2xl border px-4 py-3 flex items-center gap-3 ${paymentMethod === 'upi' ? 'border-brand-primary bg-brand-dark' : 'border-brand-muted bg-brand'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="upi"
                                            checked={paymentMethod === 'upi'}
                                            onChange={() => setPaymentMethod('upi')}
                                            className="sr-only"
                                        />
                                        <FaMobileAlt className="text-brand-primary w-5 h-5" />
                                        <div>
                                            <div className="font-semibold">UPI / QR Payment</div>
                                            <div className="text-sm text-brand-muted">Google Pay, PhonePe, Paytm</div>
                                        </div>
                                    </label>

                                    <label className={`cursor-pointer rounded-2xl border px-4 py-3 flex items-center gap-3 ${paymentMethod === 'netbanking' ? 'border-brand-primary bg-brand-dark' : 'border-brand-muted bg-brand'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="netbanking"
                                            checked={paymentMethod === 'netbanking'}
                                            onChange={() => setPaymentMethod('netbanking')}
                                            className="sr-only"
                                        />
                                        <FaUniversity className="text-brand-primary w-5 h-5" />
                                        <div>
                                            <div className="font-semibold">Net Banking</div>
                                            <div className="text-sm text-brand-muted">Secure bank transfer</div>
                                        </div>
                                    </label>

                                    <label className={`cursor-pointer rounded-2xl border px-4 py-3 flex items-center gap-3 ${paymentMethod === 'wallet' ? 'border-brand-primary bg-brand-dark' : 'border-brand-muted bg-brand'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="wallet"
                                            checked={paymentMethod === 'wallet'}
                                            onChange={() => setPaymentMethod('wallet')}
                                            className="sr-only"
                                        />
                                        <FaWallet className="text-brand-primary w-5 h-5" />
                                        <div>
                                            <div className="font-semibold">Wallet</div>
                                            <div className="text-sm text-brand-muted">Amazon Pay, Paytm, Mobikwik</div>
                                        </div>
                                    </label>

                                    <label className={`cursor-pointer rounded-2xl border px-4 py-3 flex items-center gap-3 ${paymentMethod === 'cod' ? 'border-brand-primary bg-brand-dark' : 'border-brand-muted bg-brand'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                            className="sr-only"
                                        />
                                        <FaMoneyBillWave className="text-brand-primary w-5 h-5" />
                                        <div>
                                            <div className="font-semibold">Cash on Delivery</div>
                                            <div className="text-sm text-brand-muted">Pay when your package arrives</div>
                                        </div>
                                    </label>
                                </div>

                                <div className="space-y-4">
                                    {paymentMethod === 'card' && (
                                        <>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Name on Card"
                                                className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand w-full"
                                                value={paymentDetails.cardName}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                                            />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Card Number"
                                                maxLength="16"
                                                className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand placeholder:text-brand-muted hover:placeholder:text-brand w-full"
                                                value={paymentDetails.cardNumber}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value.replace(/[^0-9]/g, '') })}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                    className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand"
                                                    value={paymentDetails.expiry}
                                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                                                />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="CVC"
                                                    maxLength="4"
                                                    className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand"
                                                    value={paymentDetails.cvc}
                                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value.replace(/[^0-9]/g, '') })}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <>
                                            <label className="text-sm text-brand-muted">Enter your UPI ID</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="example@upi"
                                                className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand w-full"
                                                value={paymentDetails.upiId}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                                            />
                                            <p className="text-sm text-brand-success">Quick, secure UPI checkout with zero card entry.</p>
                                        </>
                                    )}

                                    {paymentMethod === 'netbanking' && (
                                        <>
                                            <label className="text-sm text-brand-muted">Choose your bank</label>
                                            <select
                                                required
                                                className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand w-full"
                                                value={paymentDetails.bankName}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
                                            >
                                                <option value="">Select bank</option>
                                                <option>State Bank of India</option>
                                                <option>HDFC Bank</option>
                                                <option>ICICI Bank</option>
                                                <option>Axis Bank</option>
                                                <option>Yes Bank</option>
                                            </select>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Account Number"
                                                className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand w-full"
                                                value={paymentDetails.accountNumber}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value.replace(/[^0-9]/g, '') })}
                                            />
                                        </>
                                    )}

                                    {paymentMethod === 'wallet' && (
                                        <>
                                            <label className="text-sm text-brand-muted">Select wallet provider</label>
                                            <select
                                                required
                                                className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand w-full"
                                                value={paymentDetails.walletProvider}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, walletProvider: e.target.value })}
                                            >
                                                <option value="">Select wallet</option>
                                                <option>Paytm</option>
                                                <option>Amazon Pay</option>
                                                <option>Mobikwik</option>
                                                <option>PhonePe Wallet</option>
                                            </select>
                                            <p className="text-sm text-brand-muted">You’ll be redirected to your wallet app to complete payment.</p>
                                        </>
                                    )}

                                    {paymentMethod === 'cod' && (
                                        <div className="rounded-2xl border border-brand-muted bg-brand-dark p-4 text-brand-muted">
                                            <p className="font-semibold text-brand">Cash on Delivery selected</p>
                                            <p>Pay when your order is delivered. Keep exact change ready for a faster handoff.</p>
                                        </div>
                                    )}

                                    <input
                                        type="text"
                                        placeholder="Promo Code (optional)"
                                        className="p-3 border border-brand-muted rounded-lg focus:ring-brand-primary focus:border-brand-primary bg-brand-dark text-brand w-full"
                                        value={paymentDetails.voucherCode}
                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, voucherCode: e.target.value })}
                                    />
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
