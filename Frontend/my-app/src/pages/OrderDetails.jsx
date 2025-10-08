import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTruck, FaClock, FaCalendarAlt, FaMapMarkerAlt, FaFileInvoiceDollar } from 'react-icons/fa';

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
            price: 499.00,
            quantity: 1,
            size: 'US 7',
            image: 'https://images.unsplash.com/photo-1600185365483-26d7c0e9d0e7?auto=format&fit=crop&w=200&q=60',
        },
        {
            name: 'Pearl Drop Earrings',
            price: 150.00,
            quantity: 2,
            size: 'N/A',
            image: 'https://images.unsplash.com/photo-1581579214941-3d1b636bcd3a?auto=format&fit=crop&w=200&q=60',
        },
    ],
    subtotal: 799.00,
    shipping: 0.00,
    tax: 40.00,
    total: 839.00,
};

function OrderDetails() {
    // Get the orderId from the URL (e.g., /account/orders/DIVA-202402)
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    // Simulate fetching order data based on ID
    useEffect(() => {
        // In a real app: fetch(`/api/orders/${orderId}`).then(res => setOrder(res.data));
        
        // For this mock, we only have one detail object
        if (orderId === mockOrderDetail.id) {
            setOrder(mockOrderDetail);
        } else {
            // Simulate fetching an arbitrary order detail
            setOrder(mockOrderDetail);
        }
    }, [orderId]);

    if (!order) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Loading Order {orderId}...</h2>
            </div>
        );
    }

    // Determine status color
    const statusColor = 
        order.status === 'Delivered' ? 'bg-green-500' :
        order.status === 'Shipped' ? 'bg-blue-500' :
        'bg-yellow-500';

    return (
        <div className="p-2">
            <h2 className="text-3xl font-serif font-bold text-gray-800 dark:text-white mb-6 border-b pb-3">
                Order Details: <span className="text-pink-600">{order.id}</span>
            </h2>

            {/* Order Status and Tracking */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-inner border border-gray-200 dark:border-gray-600 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <FaClock className="w-6 h-6 text-pink-600" />
                        <span className="text-lg font-semibold text-gray-800 dark:text-white">Current Status:</span>
                        <span className={`px-4 py-1 text-sm font-bold text-white rounded-full ${statusColor}`}>
                            {order.status}
                        </span>
                    </div>
                    <Link to="/account/orders" className="text-pink-600 hover:underline text-sm font-medium">
                        ← Back to History
                    </Link>
                </div>
                
                {order.status === 'Shipped' && (
                    <div className="mt-4 border-t border-gray-200 dark:border-gray-600 pt-3 flex items-center justify-between text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                            <FaTruck className="w-5 h-5 text-pink-600" />
                            <span className="font-medium">Tracking Number:</span>
                            <span className="font-bold">{order.trackingNumber}</span>
                        </div>
                        <span className="text-sm">
                            Estimated Delivery: {order.estimatedDelivery}
                        </span>
                    </div>
                )}
            </div>

            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                
                {/* ========== 1. Items Ordered (2/3 width) ========== */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Items in This Order</h3>
                    {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            <div className="flex-grow">
                                <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-900 dark:text-white hover:text-pink-600">{item.name}</Link>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Size: {item.size} • Qty: {item.quantity}</p>
                            </div>
                            <span className="text-lg font-bold text-pink-600">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                {/* ========== 2. Summary and Address (1/3 width) ========== */}
                <div className="lg:col-span-1 mt-8 lg:mt-0 space-y-6">

                    {/* Address Box */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-pink-600" /> Shipping To
                        </h3>
                        <p className="font-medium text-gray-900 dark:text-white">{order.shippingAddress.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">{order.shippingAddress.street}</p>
                        <p className="text-gray-600 dark:text-gray-400">{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                        <p className="text-gray-600 dark:text-gray-400">{order.shippingAddress.country}</p>
                    </div>

                    {/* Pricing Summary */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                            <FaFileInvoiceDollar className="text-pink-600" /> Final Summary
                        </h3>
                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <div className="flex justify-between"><span>Subtotal:</span><span>${order.subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Shipping:</span><span className="text-green-500">FREE</span></div>
                            <div className="flex justify-between"><span>Tax:</span><span>${order.tax.toFixed(2)}</span></div>
                            <div className="flex justify-between pt-3 border-t font-bold text-xl border-gray-200 dark:border-gray-600">
                                <span>Total Paid:</span>
                                <span className="text-pink-600">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrderDetails;