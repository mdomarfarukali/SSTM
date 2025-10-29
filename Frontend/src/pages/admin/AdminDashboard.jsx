import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";

// This component displays the key metrics (cards) and a snapshot 
// of recent orders, providing the main overview for the dashboard.
export default function AdminDashboard() {
    // 1. State for Metric Data (simulating data fetched from an API)
    const [metrics, setMetrics] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
    });

    // 2. State for Recent Orders Data
    const [recentOrders, setRecentOrders] = useState([]);

    // Simulate fetching recent orders from an API
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const overView = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found!");
                    return;
                }

                const productsRes = await axios.get("/API/products");
                const ordersRes = await axios.get("/API/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const usersRes = await axios.get("/API/auth/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update metrics based on fetched data
                setMetrics({
                    totalProducts: productsRes.data.products.length,
                    totalOrders: ordersRes.data.orders.length,
                    totalUsers: usersRes.data.users.length,
                    totalRevenue: ordersRes.data.orders.reduce((sum, order) => sum + order.totalPrice, 0),
                });
            } catch (error) {
                console.error("❌ Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        overView();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found!");
                    return;
                }

                const res = await axios.get("/API/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // console.log("✅ Full API Response:", res.data);
                // console.log("✅ Orders Array:", res.data.orders);

                // Set orders to state
                setRecentOrders(res.data.orders.slice(0, 5));
            } catch (error) {
                console.error("❌ Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // 3. Utility function to determine status styling classes
    const getStatusClasses = (status) => {
        switch (status) {
            case "Completed":
                return "text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-full text-xs";
            case "Pending":
                return "text-yellow-700 font-semibold bg-yellow-100 px-3 py-1 rounded-full text-xs";
            case "Shipped":
                return "text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-full text-xs";
            default:
                return "text-gray-700 font-semibold bg-gray-100 px-3 py-1 rounded-full text-xs";
        }
    };

    if (loading) {
        return (
            // <div className="flex items-center justify-center min-h-screen text-gray-600">
            //     Loading users...
            // </div>
            <LoadingSpinner />
        );
    }

    return (
        <div className="space-y-10">
            {/* Main Dashboard Title */}
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

            {/* --- 1. Metric Cards (now pulling from state) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Total Products Card */}
                <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                    <h3 className="text-lg font-semibold text-gray-500">Total Products</h3>
                    <p className="mt-2 text-3xl font-bold text-indigo-600">{metrics.totalProducts}</p>
                </div>

                {/* Total Orders Card */}
                <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                    <h3 className="text-lg font-semibold text-gray-500">Total Orders</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-600">{metrics.totalOrders}</p>
                </div>

                {/* Total Users Card */}
                <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                    <h3 className="text-lg font-semibold text-gray-500">Total Users</h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">{metrics.totalUsers}</p>
                </div>

                {/* Revenue Card */}
                <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                    <h3 className="text-lg font-semibold text-gray-500">Revenue</h3>
                    <p className="mt-2 text-3xl font-bold text-purple-600">
                        {/* Use toLocaleString to format the large number */}
                        ₹ {metrics.totalRevenue.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            {/* --- 2. Recent Orders Table (now mapping state) --- */}
            <h3 className="text-2xl font-bold text-gray-800 mt-10">Recent Orders</h3>

            <div className="mt-4 bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">#{order._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.user?.name || order.shippingAddress?.name || "Unknown User"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                    ₹ {order.totalPrice.toLocaleString('en-IN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusClasses(order.orderStatus)}>{order.orderStatus}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
