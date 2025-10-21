import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Package, ShoppingCart, BarChart2 } from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-admin-light">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-admin rounded-r-lg shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-admin-muted">
          <h1 className={`text-2xl font-bold text-admin-primary ${sidebarOpen ? "block" : "hidden"}`}>
            Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-admin-secondary transition"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 p-3 hover:bg-admin-secondary text-admin font-medium rounded transition"
              >
                <BarChart2 size={18} />
                {sidebarOpen && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 p-3 hover:bg-admin-secondary text-admin font-medium rounded transition"
              >
                <Package size={18} />
                {sidebarOpen && "Products"}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 p-3 hover:bg-admin-secondary text-admin font-medium rounded transition"
              >
                <ShoppingCart size={18} />
                {sidebarOpen && "Orders"}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 p-3 hover:bg-admin-secondary text-admin font-medium rounded transition"
              >
                <Users size={18} />
                {sidebarOpen && "Users"}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto bg-admin-light">
        <h2 className="text-3xl font-bold text-admin mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cards */}
          <div className="p-6 bg-admin rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-admin-muted">Total Products</h3>
            <p className="mt-2 text-2xl font-bold text-admin-primary">120</p>
          </div>
          <div className="p-6 bg-admin rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-admin-muted">Total Orders</h3>
            <p className="mt-2 text-2xl font-bold text-admin-primary">58</p>
          </div>
          <div className="p-6 bg-admin rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-admin-muted">Total Users</h3>
            <p className="mt-2 text-2xl font-bold text-admin-primary">342</p>
          </div>
          <div className="p-6 bg-admin rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-admin-muted">Revenue</h3>
            <p className="mt-2 text-2xl font-bold text-admin-primary">₹ 12,50,000</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mt-10 bg-admin rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-admin-muted">
            <thead className="bg-admin-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-admin-light uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-admin-light uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-admin-light uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-admin-light uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-muted">
              <tr className="hover:bg-admin-secondary transition">
                <td className="px-6 py-4 whitespace-nowrap">#1023</td>
                <td className="px-6 py-4 whitespace-nowrap">Alice</td>
                <td className="px-6 py-4 whitespace-nowrap">₹ 5,600</td>
                <td className="px-6 py-4 whitespace-nowrap text-admin-success font-semibold">Completed</td>
              </tr>
              <tr className="hover:bg-admin-secondary transition">
                <td className="px-6 py-4 whitespace-nowrap">#1024</td>
                <td className="px-6 py-4 whitespace-nowrap">Bob</td>
                <td className="px-6 py-4 whitespace-nowrap">₹ 3,200</td>
                <td className="px-6 py-4 whitespace-nowrap text-admin-warning font-semibold">Pending</td>
              </tr>
              <tr className="hover:bg-admin-secondary transition">
                <td className="px-6 py-4 whitespace-nowrap">#1025</td>
                <td className="px-6 py-4 whitespace-nowrap">Charlie</td>
                <td className="px-6 py-4 whitespace-nowrap">₹ 12,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-admin-info font-semibold">Shipped</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
