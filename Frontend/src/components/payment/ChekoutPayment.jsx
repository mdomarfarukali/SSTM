import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaMapMarkedAlt, FaShoppingCart } from 'react-icons/fa';
import { useCartContext } from '../../context/CartContext';
import StripeProvider from './StripeProvider';
import StripePaymentForm from './StripePaymentForm';

function ChekoutPayment() {
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
  const [orderMessage, setOrderMessage] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);

  const shippingComplete = useMemo(
    () => [shippingDetails.name, shippingDetails.email, shippingDetails.address, shippingDetails.city, shippingDetails.zip].every(Boolean),
    [shippingDetails],
  );

  const handlePaymentSuccess = (paymentMethod) => {
    setPaymentComplete(true);
    setOrderMessage('Payment completed successfully. Your order is confirmed.');
    console.log('Stripe payment method:', paymentMethod);
    clearCart();
    setTimeout(() => {
      navigate('/order-success');
    }, 900);
  };

  const handlePaymentError = (message) => {
    setOrderMessage(message || 'Payment could not be processed.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-brand">Your cart is empty.</h2>
          <p className="mt-4 text-brand-muted">Add items to your cart before completing payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-serif font-extrabold bg-brand-warning inline-block px-6 py-4 rounded-3xl">
            Checkout Payment
          </h1>
          <p className="mt-4 text-brand-muted">Complete your purchase with secure Stripe payment.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-brand p-8 rounded-xl shadow-lg border border-brand-muted">
              <h2 className="text-3xl font-semibold text-brand mb-6 flex items-center gap-3">
                <FaMapMarkedAlt className="text-brand-primary" /> Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 border border-brand-muted rounded-lg bg-brand-dark text-brand placeholder:text-brand-muted focus:ring-brand-primary focus:border-brand-primary"
                  value={shippingDetails.name}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-3 border border-brand-muted rounded-lg bg-brand-dark text-brand placeholder:text-brand-muted focus:ring-brand-primary focus:border-brand-primary"
                  value={shippingDetails.email}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  className="p-3 border border-brand-muted rounded-lg bg-brand-dark text-brand placeholder:text-brand-muted focus:ring-brand-primary focus:border-brand-primary md:col-span-2"
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="p-3 border border-brand-muted rounded-lg bg-brand-dark text-brand placeholder:text-brand-muted focus:ring-brand-primary focus:border-brand-primary"
                  value={shippingDetails.city}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="p-3 border border-brand-muted rounded-lg bg-brand-dark text-brand placeholder:text-brand-muted focus:ring-brand-primary focus:border-brand-primary"
                  value={shippingDetails.zip}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, zip: e.target.value })}
                />
              </div>
            </div>

            <StripeProvider>
              <StripePaymentForm
                amount={cartTotal}
                currency="USD"
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                disabled={!shippingComplete}
              />
            </StripeProvider>

            {orderMessage && (
              <div className="rounded-2xl border border-brand-muted bg-brand-dark p-4 text-brand-muted">
                <p className="text-brand">{paymentComplete ? 'Success' : 'Note'}</p>
                <p>{orderMessage}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-brand p-8 rounded-xl shadow-2xl border border-brand-muted">
              <h2 className="text-3xl font-semibold text-brand border-b pb-4 mb-6 flex items-center gap-2">
                <FaShoppingCart className="text-brand-primary" /> Order Summary
              </h2>
              <div className="space-y-3 text-brand-muted">
                <div className="flex justify-between text-lg">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span className="text-brand-success">FREE</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Estimated Tax (5%)</span>
                  <span>${(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold pt-4 border-t border-brand-muted">
                  <span>Total Due</span>
                  <span className="text-brand-primary">${(cartTotal * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChekoutPayment;
