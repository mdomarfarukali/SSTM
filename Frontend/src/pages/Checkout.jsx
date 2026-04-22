import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaLock, FaCreditCard, FaMapMarkedAlt, FaShoppingCart, FaWallet, FaUniversity, FaMobileAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';


function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCartContext();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



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



  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate('/products');
      return;
    }

    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item.id, // ⚠️ must exist
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          finalPrice: item.price,
          image: item.image,
        })),

        shippingAddress: selectedAddress,

        paymentMethod: paymentMethod.toUpperCase(),

        itemsPrice: cartTotal,
        taxPrice: cartTotal * 0.05,
        shippingPrice: 0,
        totalPrice: cartTotal + cartTotal * 0.05,

      };

      const response = await axios.post(
        "/API/orders",
        orderData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order saved:", response.data);

      clearCart();
      navigate("/order-success");

    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      alert("Order failed. Try again.");
    }
    console.log("Cart Items:", cartItems);
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



  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/API/addresses", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });


        const data = await res.json();
        setAddresses(data.addresses || []);

        // auto-select first address
        if (data.addresses?.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);





  if (loading) {
    return <p>Loading checkout...</p>;
  }
  return (
    <div className="min-h-screen bg-brand-light transition-colors duration-500 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-serif font-extrabold bg-brand-warning mb-10 text-center">
          Secure Checkout 🔒
        </h1>

        {selectedAddress && (
          <div style={{
            border: "2px solid green",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            background: "#f0fff0"
          }}>
            <h3>Delivering to:</h3>
            <p><strong>{selectedAddress.fullName}</strong></p>
            <p>{selectedAddress.addressLine1}, {selectedAddress.city}</p>
            <p>{selectedAddress.state}, {selectedAddress.postalCode}</p>
            <p>{selectedAddress.phone}</p>

            <button
              onClick={() => setSelectedAddress(null)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                background: "orange",
                border: "none",
                cursor: "pointer"
              }}
            >
              Change Address
            </button>
          </div>
        )}
        {!selectedAddress && <h2>Select Shipping Address</h2>}

        {!selectedAddress && (
          addresses.length === 0 ? (
            <p>No address found</p>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr._id}
                style={{
                  border:
                    selectedAddress?._id === addr._id
                      ? "2px solid green"
                      : "1px solid gray",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p><strong>{addr.fullName}</strong></p>
                <p>{addr.addressLine1}, {addr.city}</p>
                <p>{addr.state}, {addr.postalCode}</p>
                <p>{addr.phone}</p>

                <button
                  onClick={() => setSelectedAddress(addr)}
                  disabled={selectedAddress?._id === addr._id}
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px",
                    background:
                      selectedAddress?._id === addr._id ? "gray" : "green",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {selectedAddress?._id === addr._id
                    ? "Selected"
                    : "Use this address"}
                </button>
              </div>
            ))
          ))}
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold text-brand-info mb-6">
              Your order has been placed! Redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="lg:grid lg:grid-cols-5 lg:gap-12">
            {/* Left Column */}

            {/* Payment Details */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">

              <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                💳 Payment Method
              </h2>

              <p className="text-sm text-gray-500 flex items-center gap-2">
                🔒 All transactions are secure and encrypted
              </p>

              <div className="space-y-4">

                {/* CARD OPTION */}
                <label className={`block rounded-xl border p-4 cursor-pointer transition-all duration-300
      ${paymentMethod === 'card'
                    ? 'border-red-500 bg-red-50 shadow-lg scale-[1.02]'
                    : 'border-gray-200 hover:border-red-300 hover:shadow-md'}`}>

                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span className="text-xl">💳</span>
                    <div>
                      <p className="font-semibold">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">Visa, MasterCard, Amex</p>
                    </div>
                  </div>

                  {/* 👇 SHOW ONLY WHEN SELECTED */}
                  <div className={`overflow-hidden transition-all duration-500 ${paymentMethod === 'card' ? 'max-h-96 mt-4' : 'max-h-0'
                    }`}>

                    <div className="grid gap-3 mt-3">

                      <input
                        type="text"
                        placeholder="Card Number"
                        className="p-3 border rounded-lg w-full"
                      />

                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="p-3 border rounded-lg w-full"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="p-3 border rounded-lg w-full"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Card Holder Name"
                        className="p-3 border rounded-lg w-full"
                      />

                    </div>
                  </div>
                </label>

                {/* UPI */}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300
      ${paymentMethod === 'upi'
                    ? 'border-red-500 bg-red-50 shadow-lg scale-[1.02]'
                    : 'border-gray-200 hover:border-red-300 hover:shadow-md'}`}>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />

                  <span className="text-xl">📱</span>

                  <div>
                    <p className="font-semibold">UPI Payment</p>
                    <p className="text-sm text-gray-500">GPay, PhonePe</p>
                  </div>
                </label>

                {/* COD */}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300
      ${paymentMethod === 'cod'
                    ? 'border-red-500 bg-red-50 shadow-lg scale-[1.02]'
                    : 'border-gray-200 hover:border-red-300 hover:shadow-md'}`}>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />

                  <span className="text-xl">💵</span>

                  <div>
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when delivered</p>
                  </div>
                </label>

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
