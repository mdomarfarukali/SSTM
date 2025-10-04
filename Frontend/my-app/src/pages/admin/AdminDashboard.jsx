import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Package, ShoppingCart, BarChart2 } from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1
            className={`text-2xl font-bold text-pink-600 ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-gray-200"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 p-3 hover:bg-pink-50 text-gray-700 font-medium rounded"
              >
                <BarChart2 size={18} />
                {sidebarOpen && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 p-3 hover:bg-pink-50 text-gray-700 font-medium rounded"
              >
                <Package size={18} />
                {sidebarOpen && "Products"}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 p-3 hover:bg-pink-50 text-gray-700 font-medium rounded"
              >
                <ShoppingCart size={18} />
                {sidebarOpen && "Orders"}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 p-3 hover:bg-pink-50 text-gray-700 font-medium rounded"
              >
                <Users size={18} />
                {sidebarOpen && "Users"}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cards */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
            <p className="mt-2 text-2xl font-bold text-pink-600">120</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
            <p className="mt-2 text-2xl font-bold text-pink-600">58</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            <p className="mt-2 text-2xl font-bold text-pink-600">342</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
            <p className="mt-2 text-2xl font-bold text-pink-600">₹ 12,50,000</p>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mt-10 bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-pink-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">#1023</td>
                <td className="px-6 py-4 whitespace-nowrap">Alice</td>
                <td className="px-6 py-4 whitespace-nowrap">₹ 5,600</td>
                <td className="px-6 py-4 whitespace-nowrap">Completed</td>
              </tr>
              <tr className="hover:bg-pink-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">#1024</td>
                <td className="px-6 py-4 whitespace-nowrap">Bob</td>
                <td className="px-6 py-4 whitespace-nowrap">₹ 3,200</td>
                <td className="px-6 py-4 whitespace-nowrap">Pending</td>
              </tr>
              <tr className="hover:bg-pink-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">#1025</td>
                <td className="px-6 py-4 whitespace-nowrap">Charlie</td>
                <td className="px-6 py-4 whitespace-nowrap">₹ 12,000</td>
                <td className="px-6 py-4 whitespace-nowrap">Shipped</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}