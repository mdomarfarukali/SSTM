import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaClock, FaCheckCircle } from "react-icons/fa";

function OrderHistory() {
    const [orders, setOrders] = useState([]);

    // Fetch orders (mock or from localStorage)
    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 px-6 md:px-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
                    Order History
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center py-24">
                        <FaShoppingBag className="text-6xl text-gray-400 mx-auto mb-6" />
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            You have no orders yet.
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Explore our <Link to="/products" className="text-pink-600 hover:underline">collections</Link> and place your first order.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition bg-gray-50 dark:bg-gray-800 p-6"
                            >
                                {/* Order Header */}
                                <div className="flex flex-wrap justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Order #{order.id || index + 1}
                                    </h2>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <FaClock />
                                        <span>{order.date || "Recently placed"}</span>
                                    </div>
                                </div>

                                {/* Ordered Items */}
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col sm:flex-row items-center gap-4 py-4"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Size: {item.selectedSize}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-lg font-bold text-pink-600">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className="mt-6 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <FaCheckCircle />
                                        <span className="font-medium">Delivered</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        Total: $
                                        {order.items
                                            .reduce(
                                                (total, item) => total + item.price * item.quantity,
                                                0
                                            )
                                            .toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderHistory;
