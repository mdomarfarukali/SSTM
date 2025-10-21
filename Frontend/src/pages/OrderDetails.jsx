import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaTruck,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFileInvoiceDollar,
} from 'react-icons/fa';

// ⭐️ MOCK DATA: Simulating a detailed order response from an API ⭐️
const mockOrderDetail = {
  id: 'DIVA-202402',
  date: '2024-10-01',
  status: 'Shipped',
  trackingNumber: 'TRK-987654321',
  estimatedDelivery: 'October 10, 2025',
  shippingAddress: {
    name: 'Jane Doe',
    street: '123 Sparkle Lane',
    city: 'Mumbai',
    zip: '400001',
    country: 'India',
  },
  items: [
    {
      name: 'Diamond Solitaire Ring',
      price: 499.0,
      quantity: 1,
      size: 'US 7',
      image:
        'https://images.unsplash.com/photo-1600185365483-26d7c0e9d0e7?auto=format&fit=crop&w=200&q=60',
    },
    {
      name: 'Pearl Drop Earrings',
      price: 150.0,
      quantity: 2,
      size: 'N/A',
      image:
        'https://images.unsplash.com/photo-1581579214941-3d1b636bcd3a?auto=format&fit=crop&w=200&q=60',
    },
  ],
  subtotal: 799.0,
  shipping: 0.0,
  tax: 40.0,
  total: 839.0,
};

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId === mockOrderDetail.id) {
      setOrder(mockOrderDetail);
    } else {
      setOrder(mockOrderDetail);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-brand-muted">
          Loading Order {orderId}...
        </h2>
      </div>
    );
  }

  const statusColor =
    order.status === 'Delivered'
      ? 'bg-brand-success'
      : order.status === 'Shipped'
      ? 'bg-brand-info'
      : 'bg-brand-warning';

  return (
    <div className="p-2 bg-brand-light min-h-screen">
      <h2 className="text-3xl font-serif font-bold text-brand mb-6 border-b border-brand-muted pb-3">
        Order Details: <span className="text-brand-primary">{order.id}</span>
      </h2>

      {/* Order Status and Tracking */}
      <div className="bg-brand p-6 rounded-xl shadow-inner border border-brand-muted mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <FaClock className="w-6 h-6 text-brand-primary" />
            <span className="text-lg font-semibold text-brand">Current Status:</span>
            <span className={`px-4 py-1 text-sm font-bold text-white rounded-full ${statusColor}`}>
              {order.status}
            </span>
          </div>
          <Link
            to="/account/orders"
            className="text-brand-primary hover:underline text-sm font-medium"
          >
            ← Back to History
          </Link>
        </div>

        {order.status === 'Shipped' && (
          <div className="mt-4 border-t border-brand-muted pt-3 flex items-center justify-between text-brand-muted">
            <div className="flex items-center gap-2">
              <FaTruck className="w-5 h-5 text-brand-primary" />
              <span className="font-medium">Tracking Number:</span>
              <span className="font-bold text-brand">{order.trackingNumber}</span>
            </div>
            <span className="text-sm text-brand-muted">
              Estimated Delivery: {order.estimatedDelivery}
            </span>
          </div>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* 1. Items Ordered */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-2xl font-semibold text-brand mb-4">Items in This Order</h3>
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-brand p-4 rounded-lg shadow-sm border border-brand-muted"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-grow">
                <Link
                  to={`/product/${item.id}`}
                  className="text-lg font-medium text-brand hover:text-brand-primary"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-brand-muted">
                  Size: {item.size} • Qty: {item.quantity}
                </p>
              </div>
              <span className="text-lg font-bold text-brand-primary">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* 2. Summary and Address */}
        <div className="lg:col-span-1 mt-8 lg:mt-0 space-y-6">
          {/* Shipping Address */}
          <div className="bg-brand p-5 rounded-xl shadow-md border border-brand-muted">
            <h3 className="text-xl font-semibold text-brand mb-3 flex items-center gap-2">
              <FaMapMarkerAlt className="text-brand-primary" /> Shipping To
            </h3>
            <p className="font-medium text-brand">{order.shippingAddress.name}</p>
            <p className="text-brand-muted">{order.shippingAddress.street}</p>
            <p className="text-brand-muted">
              {order.shippingAddress.city}, {order.shippingAddress.zip}
            </p>
            <p className="text-brand-muted">{order.shippingAddress.country}</p>
          </div>

          {/* Order Summary */}
          <div className="bg-brand p-5 rounded-xl shadow-md border border-brand-muted">
            <h3 className="text-xl font-semibold text-brand mb-3 flex items-center gap-2">
              <FaFileInvoiceDollar className="text-brand-primary" /> Final Summary
            </h3>
            <div className="space-y-2 text-brand-muted">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-brand-success">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t font-bold text-xl border-brand-muted">
                <span>Total Paid:</span>
                <span className="text-brand-primary">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
