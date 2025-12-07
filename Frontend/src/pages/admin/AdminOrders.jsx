import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    // const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setOrders(res.data.orders);
            } catch (error) {
                console.error("❌ Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // // ✅ Log orders after they’re set
    // useEffect(() => {
    //     if (orders.length > 0) {
    //         console.log("📦 Orders in State:", orders);
    //         console.log("👤 First Order’s User:", orders[0].user.name);
    //     }
    // }, [orders]);

    if (loading) {
        return (
            // <div className="flex items-center justify-center min-h-screen text-gray-600">
            //     Loading users...
            // </div>
            <LoadingSpinner />
        );
    }

    const handleUpdateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("userToken"); // get admin token

            const res = await axios.put(
                `http://localhost:5000/API/orders/${id}/status`,
                { status: status },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message || "Status updated successfully");

            // 🌀 update status locally
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating status:", error.response?.data || error.message);
            alert("Failed to update order status");
        }
    };

    return (
        <div className="p-8 bg-admin min-h-screen">
            <h2 className="text-3xl font-bold text-admin mb-6">Orders Management</h2>

            <div className="overflow-x-auto bg-admin-light shadow rounded-lg">
                <table className="min-w-full divide-y divide-admin-muted">
                    <thead className="bg-admin-primary">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-admin-light uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-admin-light uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-admin-light uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-admin-light uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-admin-light uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-admin-muted">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-admin-secondary transition">
                                <td className="px-6 py-4 text-admin">{order._id}</td>
                                <td className="px-6 py-4 text-admin">{order.user?.name || order.shippingAddress?.name || "Unknown User"}</td>
                                <td className="px-6 py-4 text-admin">₹ {order.totalPrice.toLocaleString()}</td>
                                <td className={`px-6 py-4 font-semibold ${order.orderStatus === "Completed"
                                    ? "text-admin-success"
                                    : "text-admin-warning"
                                    }`}>
                                    {order.status}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        className="px-3 py-1 bg-admin-success text-admin-light rounded hover:brightness-90 transition"
                                        onClick={() => handleUpdateStatus(order.id, "Completed")}
                                    >
                                        Complete
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-admin-warning text-admin-light rounded hover:brightness-90 transition"
                                        onClick={() => handleUpdateStatus(order.id, "Pending")}
                                    >
                                        Pending
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
