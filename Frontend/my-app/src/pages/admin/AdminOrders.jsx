import { useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    { id: 1023, customer: "Alice", total: 5600, status: "Completed" },
    { id: 1024, customer: "Bob", total: 3200, status: "Pending" },
  ]);

  const handleUpdateStatus = (id, status) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Orders Management</h2>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-pink-50">
          <tr>
            <th className="px-6 py-3">Order ID</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-pink-50 transition">
              <td className="px-6 py-4">{order.id}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4">₹ {order.total.toLocaleString()}</td>
              <td className="px-6 py-4">{order.status}</td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleUpdateStatus(order.id, "Completed")}
                >
                  Complete
                </button>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
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
  );
}
