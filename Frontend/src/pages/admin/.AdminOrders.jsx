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
              <tr key={order.id} className="hover:bg-admin-secondary transition">
                <td className="px-6 py-4 text-admin">{order.id}</td>
                <td className="px-6 py-4 text-admin">{order.customer}</td>
                <td className="px-6 py-4 text-admin">₹ {order.total.toLocaleString()}</td>
                <td className={`px-6 py-4 font-semibold ${
                  order.status === "Completed"
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
